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
    <Card
      style={{ marginBottom: 12, borderRadius: 14 }}
      onPress={() => navigateToBoard(item.key)}
    >
      <Card.Title
        title={item.title}
        subtitle={item.key}
        left={() => (
          <MaterialCommunityIcons
            name="view-dashboard"
            size={28}
            style={{ marginLeft: 10 }}
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
    <Card
      style={{ marginBottom: 12, borderRadius: 14 }}
      onPress={() => navigateToTask(item.key)}
    >
      <Card.Title
        title={item.title}
        subtitle={`Status: ${item.status}`}
        left={() => (
          <MaterialCommunityIcons
            name="clipboard-text"
            size={26}
            style={{ marginLeft: 10 }}
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
        <ScrollView style={{ padding: 16 }}>
          {/* User Header */}
          <Card style={{ padding: 20, borderRadius: 16, marginBottom: 20 }}>
            <View style={{ alignItems: 'center' }}>
              <Avatar.Icon size={80} icon="account" />

              <Text variant="headlineMedium" style={{ marginTop: 12 }}>
                {user.name}
              </Text>

              <Text variant="bodyMedium" style={{ color: '#555' }}>
                {user.email}
              </Text>
            </View>
          </Card>

          {/* Boards Section */}
          <Text variant="titleLarge" style={{ marginBottom: 10 }}>
            Boards
          </Text>

          <FlatList
            data={user.boards}
            keyExtractor={item => item.id}
            renderItem={renderBoard}
            ListEmptyComponent={
              <Text style={{ color: '#999' }}>No boards</Text>
            }
            scrollEnabled={false}
          />

          <Divider style={{ marginVertical: 20 }} />

          {/* Tasks Section */}
          <Text variant="titleLarge" style={{ marginBottom: 10 }}>
            Assigned Tasks
          </Text>

          <FlatList
            data={user.tasks}
            keyExtractor={item => item.id}
            renderItem={renderTask}
            ListEmptyComponent={<Text style={{ color: '#999' }}>No tasks</Text>}
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
});

export default UserProfileScreen;
