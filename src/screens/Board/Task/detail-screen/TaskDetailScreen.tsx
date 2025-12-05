import React, { useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BoardStackParamList } from '../../../../navigation/types';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_TASK_BY_KEY } from './queries/GET_TASK_BY_KEY';
import { ADD_COMMENT } from './mutations/ADD_COMMENT';
import { ADD_SUBTASK } from './mutations/ADD_SUBTASK';
import { UPDATE_TASK } from './mutations/UPDATE_TASK';
import { Task } from '../../../../graphql/types/task';

type Props = NativeStackScreenProps<BoardStackParamList, 'TaskDetailScreen'>;

const TaskDetailScreen = ({ route }: Props) => {
  const { taskKey } = route.params;

  const { data, loading, error, refetch } = useQuery<{ task?: Task }>(
    GET_TASK_BY_KEY,
    {
      variables: { key: taskKey },
    },
  );

  const [updateTask] = useMutation<{}>(UPDATE_TASK, { onCompleted: refetch });
  const [addSubtask] = useMutation<{}>(ADD_SUBTASK, { onCompleted: refetch });
  const [addComment] = useMutation<{}>(ADD_COMMENT, { onCompleted: refetch });

  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [status, setStatus] = useState('');
  const [assigneeEmail, setAssignee] = useState('');

  const [subTitle, setSubTitle] = useState('');
  const [subAssignee, setSubAssignee] = useState('');

  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  if (loading) return <ActivityIndicator />;
  if (error || !data?.task) return <Text>Error loading task</Text>;

  const { task } = data;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>{task.title}</Text>
      <Text>Status: {task.status}</Text>
      <Text>Board: {task.board.title}</Text>
      {task.assignee && <Text>Assignee: {task.assignee.name}</Text>}

      {/* Update Task */}
      <Text style={styles.section}>Update Task</Text>
      <TextInput
        placeholder="New Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDesc}
        style={styles.input}
      />
      <TextInput
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
        style={styles.input}
      />
      <TextInput
        placeholder="Assignee Email"
        value={assigneeEmail}
        onChangeText={setAssignee}
        style={styles.input}
      />

      <Button
        title="Update Task"
        onPress={() =>
          updateTask({
            variables: {
              taskKey,
              title,
              description,
              status,
              assigneeEmail,
            },
          })
        }
      />

      {/* Subtasks */}
      <Text style={styles.section}>Subtasks</Text>
      {task.subTasks.map((st: any) => (
        <Text key={st.id}>
          • {st.title} ({st.status})
        </Text>
      ))}

      <TextInput
        placeholder="Subtask Title"
        value={subTitle}
        onChangeText={setSubTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Assignee Email"
        value={subAssignee}
        onChangeText={setSubAssignee}
        style={styles.input}
      />

      <Button
        title="Add Subtask"
        onPress={() =>
          addSubtask({
            variables: {
              title: subTitle,
              boardKey: task.board.key,
              parentTaskKey: task.key,
              assigneeEmail: subAssignee,
            },
          })
        }
      />

      {/* Comments */}
      <Text style={styles.section}>Comments</Text>
      {task.comments.map((c: any) => (
        <Text key={c.id}>
          • {c.text} — {c.author.name}
        </Text>
      ))}

      <TextInput
        placeholder="Comment"
        value={commentText}
        onChangeText={setCommentText}
        style={styles.input}
      />
      <TextInput
        placeholder="Author Email"
        value={commentAuthor}
        onChangeText={setCommentAuthor}
        style={styles.input}
      />

      <Button
        title="Add Comment"
        onPress={() =>
          addComment({
            variables: {
              taskKey,
              text: commentText,
              authorEmail: commentAuthor,
            },
          })
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  section: { marginTop: 20, fontSize: 18, fontWeight: '600' },
  input: { borderWidth: 1, padding: 8, borderRadius: 6, marginVertical: 6 },
});

export default TaskDetailScreen;
