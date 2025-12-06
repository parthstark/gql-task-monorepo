import React from 'react';
import { View, FlatList, ScrollView, StyleSheet } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useQuery } from '@apollo/client/react';
import {
  ActivityIndicator,
  Avatar,
  Text,
  Divider,
  Appbar,
  Card,
} from 'react-native-paper';

import {
  UserStackParamList,
  RootTabParamList,
} from '../../../navigation/types';
import { GET_USER } from './GET_USER';
import { User } from '../../../graphql/types/user';
import BoardCard from '../../../components/BoardCard';
import TaskCard from '../../../components/TaskCard';

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
    <BoardCard title={item.title} onPress={() => navigateToBoard(item.key)} />
  );

  const navigateToTask = (taskKey: string) => {
    navigation.navigate('BoardsTab', {
      screen: 'TaskDetailScreen',
      params: { taskKey },
    });
  };

  const renderTask = ({ item }: any) => (
    <TaskCard
      title={item.title}
      status={item.status}
      onPress={() => navigateToTask(item.key)}
    />
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

              <Text variant="bodyMedium">{user.email}</Text>
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
            ListEmptyComponent={<Text>No boards</Text>}
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
            ListEmptyComponent={<Text>No tasks</Text>}
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
  sectionTitle: {
    marginBottom: 10,
  },
  divider: {
    marginVertical: 20,
  },
});

export default UserProfileScreen;
