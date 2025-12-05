import React from 'react';
import { View, FlatList, ScrollView, StyleSheet } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useQuery } from '@apollo/client/react';
import {
  ActivityIndicator,
  Avatar,
  Card,
  Text,
  IconButton,
  Divider,
  Appbar,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  UserStackParamList,
  RootTabParamList,
} from '../../../navigation/types';
import { GET_USER } from './GET_USER';
import { User } from '../../../graphql/types/user';

type Props = CompositeScreenProps<
  NativeStackScreenProps<UserStackParamList, 'UserProfileScreen'>,
  BottomTabScreenProps<RootTabParamList>
>;

const UserProfileScreen = ({ route, navigation }: Props) => {
  const { userEmail } = route.params;

  const { data, loading, error } = useQuery<{ user?: User }>(GET_USER, {
    variables: { email: userEmail },
  });

  const { user } = data || {};

  const navigateToBoard = (boardKey: string) => {
    navigation.navigate('BoardsTab', {
      screen: 'BoardDetailScreen',
      params: { boardKey },
    });
  };

  const renderBoard = ({ item }: any) => (
    <Card style={styles.itemCard} onPress={() => navigateToBoard(item.key)}>
      <Card.Title
        title={item.title}
        subtitle={item.key}
        left={() => (
          <MaterialCommunityIcons
            name="view-dashboard"
            size={28}
            style={styles.itemIcon}
          />
        )}
        right={() => (
          <IconButton
            icon="chevron-right"
            onPress={() => navigateToBoard(item.key)}
          />
        )}
      />
    </Card>
  );

  const navigateToTask = (taskKey: string) => {
    navigation.navigate('BoardsTab', {
      screen: 'TaskDetailScreen',
      params: { taskKey },
    });
  };

  const renderTask = ({ item }: any) => (
    <Card style={styles.itemCard} onPress={() => navigateToTask(item.key)}>
      <Card.Title
        title={item.title}
        subtitle={`Status: ${item.status}`}
        left={() => (
          <MaterialCommunityIcons
            name="clipboard-text"
            size={26}
            style={styles.itemIcon}
          />
        )}
        right={() => (
          <IconButton
            icon="chevron-right"
            onPress={() => navigateToTask(item.key)}
          />
        )}
      />
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Appbar */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Profile" />
      </Appbar.Header>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="small" />
        </View>
      )}

      {error && (
        <View style={styles.center}>
          <Text>Error loading user</Text>
        </View>
      )}

      {user && (
        <ScrollView style={styles.scrollContainer}>
          {/* User Header */}
          <Card style={styles.userHeaderCard}>
            <View style={styles.userHeaderContent}>
              <Avatar.Icon size={80} icon="account" />

              <Text variant="headlineMedium" style={styles.userName}>
                {user.name}
              </Text>

              <Text variant="bodyMedium" style={styles.userEmail}>
                {user.email}
              </Text>
            </View>
          </Card>

          {/* Boards Section */}
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Boards
          </Text>

          <FlatList
            data={user.boards}
            keyExtractor={item => item.id}
            renderItem={renderBoard}
            ListEmptyComponent={<Text style={styles.emptyText}>No boards</Text>}
            scrollEnabled={false}
          />

          <Divider style={styles.divider} />

          {/* Tasks Section */}
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Assigned Tasks
          </Text>

          <FlatList
            data={user.tasks}
            keyExtractor={item => item.id}
            renderItem={renderTask}
            ListEmptyComponent={<Text style={styles.emptyText}>No tasks</Text>}
            scrollEnabled={false}
          />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 16,
  },
  userHeaderCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  userHeaderContent: {
    alignItems: 'center',
  },
  userName: {
    marginTop: 12,
  },
  userEmail: {
    color: '#555',
  },
  sectionTitle: {
    marginBottom: 10,
  },
  emptyText: {
    color: '#999',
  },
  divider: {
    marginVertical: 20,
  },
  itemCard: {
    marginBottom: 12,
    borderRadius: 14,
  },
  itemIcon: {
    marginLeft: 10,
  },
});

export default UserProfileScreen;
