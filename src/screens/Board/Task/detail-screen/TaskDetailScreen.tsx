import React from 'react';
import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
import {
  Appbar,
  Card,
  Text,
  Chip,
  Divider,
  Avatar,
  ActivityIndicator,
} from 'react-native-paper';
import { GET_TASK_BY_KEY } from './queries/GET_TASK_BY_KEY';
import { useQuery } from '@apollo/client/react';
import { Task } from '../../../../graphql/types/task';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  BoardStackParamList,
  RootTabParamList,
} from '../../../../navigation/types';
import TaskCard from '../../../../components/TaskCard';
import UserCard from '../../../../components/UserCard';

type Props = CompositeScreenProps<
  NativeStackScreenProps<BoardStackParamList, 'TaskDetailScreen'>,
  BottomTabScreenProps<RootTabParamList>
>;

const TaskDetailScreen = ({ route, navigation }: Props) => {
  const { taskKey } = route.params;
  const { data, loading, error } = useQuery<{ task?: Task }>(GET_TASK_BY_KEY, {
    variables: { key: taskKey },
  });

  const { task } = data || {};

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Task Details" />
      </Appbar.Header>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="small" />
        </View>
      )}

      {error && (
        <View style={styles.center}>
          <Text>Error loading task</Text>
        </View>
      )}

      {task && (
        <ScrollView style={styles.scrollContainer}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Task Information
          </Text>

          {/* Header Card */}
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.taskInfoRow}>
                <View>
                  <Text style={styles.taskKey}>{task.key}</Text>
                  <Text>{task.title}</Text>
                </View>
                <Chip style={styles.chip}>
                  <View style={styles.chipStyle}>
                    <Text>{task.status}</Text>
                  </View>
                </Chip>
              </View>
              {task.description && (
                <Text style={styles.taskDescription}>{task.description}</Text>
              )}
              <Chip
                onPress={() =>
                  navigation.navigate('BoardDetailScreen', {
                    boardKey: task.board.key,
                  })
                }
              >
                <View style={styles.chipStyle}>
                  <Text>{task.board.title}</Text>
                </View>
              </Chip>
            </Card.Content>
          </Card>

          <Divider style={styles.sectionDivider} />

          <Text variant="titleLarge" style={styles.sectionTitle}>
            Assignee
          </Text>
          {!task.assignee && <Text>Unassigned</Text>}

          {/* Assignee */}
          {task.assignee && (
            <UserCard
              name={task.assignee.name}
              email={task.assignee.email}
              onPress={() =>
                navigation.navigate('UsersTab', {
                  screen: 'UserProfileScreen',
                  params: { userEmail: task.assignee?.email },
                })
              }
            />
          )}

          <Divider style={styles.sectionDivider} />

          <Text variant="titleLarge" style={styles.sectionTitle}>
            Sub Tasks
          </Text>

          {/* Subtasks */}
          {task.subTasks.length === 0 && <Text>No sub tasks</Text>}
          <FlatList
            data={task.subTasks}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TaskCard
                title={item.title}
                status={item.status}
                onPress={() =>
                  navigation.navigate('TaskDetailScreen', {
                    taskKey: item.key,
                  })
                }
              />
            )}
            scrollEnabled={false}
          />

          <Divider style={styles.sectionDivider} />

          <Text variant="titleLarge" style={styles.sectionTitle}>
            Comments
          </Text>
          {task.comments.length === 0 && <Text>No comments</Text>}

          {/* Comments */}
          <FlatList
            data={task.comments}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.commentContainer}>
                <View style={styles.commentHeader}>
                  <Avatar.Text size={34} label={item.author.name.charAt(0)} />
                  <View style={styles.commentAuthorInfo}>
                    <Text style={styles.commentAuthor}>{item.author.name}</Text>
                    <Text variant="bodySmall">{item.author.email}</Text>
                  </View>
                </View>
                <Text style={styles.commentText}>{item.text}</Text>
                <Divider style={styles.commentDivider} />
              </View>
            )}
            scrollEnabled={false}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default TaskDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 12,
  },
  card: {
    marginBottom: 16,
  },
  chip: {
    width: '40%',
    marginVertical: 6,
  },
  commentContainer: {
    marginBottom: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentAuthor: {
    fontWeight: '600',
  },
  commentText: {
    marginTop: 6,
  },
  commentAuthorInfo: {
    marginLeft: 10,
  },
  commentDivider: {
    marginVertical: 10,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  sectionDivider: {
    marginVertical: 20,
  },
  chipStyle: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 6,
  },
  taskInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskKey: {
    fontSize: 18,
  },
  taskDescription: {
    fontSize: 10,
    marginVertical: 8,
    marginBottom: 14,
  },
});
