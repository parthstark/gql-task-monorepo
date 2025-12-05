import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Appbar,
  Card,
  Text,
  Chip,
  Divider,
  Avatar,
  List,
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
            <Card.Title title={task.title} subtitle={`Key: ${task.key}`} />
            <Card.Content>
              <Text style={styles.label}>Status</Text>
              <Chip style={styles.chip}>{task.status}</Chip>

              {task.description ? (
                <>
                  <Text style={styles.label}>Description</Text>
                  <Text>{task.description}</Text>
                </>
              ) : null}

              <Text style={styles.label}>Board</Text>
              <Chip
                onPress={() =>
                  navigation.navigate('BoardDetailScreen', {
                    boardKey: task.board.key,
                  })
                }
              >
                {task.board.title}
              </Chip>
            </Card.Content>
          </Card>

          <Divider style={styles.sectionDivider} />

          <Text variant="titleLarge" style={styles.sectionTitle}>
            Assignment
          </Text>

          {/* Assignee */}
          <Card style={styles.card}>
            <Card.Title title="Assignee" />
            <Card.Content>
              {task.assignee ? (
                <List.Item
                  title={task.assignee.name}
                  description={task.assignee.email}
                  left={() => (
                    <Avatar.Text
                      label={task.assignee?.name.charAt(0) ?? 'NA'}
                      size={36}
                    />
                  )}
                  onPress={() =>
                    navigation.navigate('UsersTab', {
                      screen: 'UserProfileScreen',
                      params: { userEmail: task.assignee?.email },
                    })
                  }
                />
              ) : (
                <Text>Unassigned</Text>
              )}
            </Card.Content>
          </Card>

          <Divider style={styles.sectionDivider} />

          <Text variant="titleLarge" style={styles.sectionTitle}>
            Sub Tasks
          </Text>

          {/* Subtasks */}
          <Card style={styles.card}>
            <Card.Title title="Sub Tasks" />
            <Card.Content>
              {task.subTasks.length === 0 ? (
                <Text>No sub tasks</Text>
              ) : (
                task.subTasks.map(st => (
                  <List.Item
                    key={st.id}
                    title={st.title}
                    description={st.status}
                    left={() => <List.Icon icon="checkbox-marked-circle" />}
                    onPress={() =>
                      navigation.navigate('TaskDetailScreen', {
                        taskKey: st.key,
                      })
                    }
                  />
                ))
              )}
            </Card.Content>
          </Card>

          <Divider style={styles.sectionDivider} />

          <Text variant="titleLarge" style={styles.sectionTitle}>
            Comments
          </Text>

          {/* Comments */}
          <Card style={styles.card}>
            <Card.Title title="Comments" />
            <Card.Content>
              {task.comments.length === 0 ? (
                <Text>No comments</Text>
              ) : (
                task.comments.map(cm => (
                  <View key={cm.id} style={styles.commentContainer}>
                    <View style={styles.commentHeader}>
                      <Avatar.Text size={34} label={cm.author.name.charAt(0)} />
                      <View style={styles.commentAuthorInfo}>
                        <Text style={styles.commentAuthor}>
                          {cm.author.name}
                        </Text>
                        <Text>{cm.author.email}</Text>
                      </View>
                    </View>
                    <Text style={styles.commentText}>{cm.text}</Text>
                    <Divider style={styles.commentDivider} />
                  </View>
                ))
              )}
            </Card.Content>
          </Card>
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
  label: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  chip: {
    alignSelf: 'flex-start',
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
});
