import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  Appbar,
  Card,
  Text,
  IconButton,
  Divider,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  BoardStackParamList,
  RootTabParamList,
} from '../../../navigation/types';
import { useQuery } from '@apollo/client/react';
import { GET_BOARD } from './GET_BOARD';
import { Board } from '../../../graphql/types/board';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type Props = CompositeScreenProps<
  NativeStackScreenProps<BoardStackParamList, 'BoardDetailScreen'>,
  BottomTabScreenProps<RootTabParamList>
>;

const statusIcons: Record<string, string> = {
  TODO: 'clipboard-text-outline',
  IN_PROGRESS: 'progress-clock',
  DONE: 'check-circle-outline',
  CANCELLED: 'close-circle-outline',
};

const BoardDetailScreen = ({ route, navigation }: Props) => {
  const { boardKey } = route.params;

  const { data, loading, error } = useQuery<{ board?: Board }>(GET_BOARD, {
    variables: { key: boardKey },
  });

  const { board } = data || {};

  // -----------------------
  // Group tasks outside return
  // -----------------------
  const groupedTasks = React.useMemo(() => {
    if (!board?.tasks) return {};

    return board.tasks.reduce((acc, task) => {
      if (!acc[task.status]) acc[task.status] = [];
      acc[task.status].push(task);
      return acc;
    }, {} as Record<string, typeof board.tasks>);
  }, [board]);
  // -----------------------

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={board?.title || 'Board'} />
      </Appbar.Header>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="small" />
        </View>
      )}

      {error && (
        <View style={styles.center}>
          <Text>Error loading board</Text>
        </View>
      )}

      {board && (
        <ScrollView contentContainerStyle={styles.content}>
          {board.description && (
            <Text style={styles.boardDescription}>{board.description}</Text>
          )}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UsersTab', {
                screen: 'UserProfileScreen',
                params: { userEmail: board.owner.email },
              });
            }}
          >
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Owner Details
            </Text>
            <Text>{board.owner.name}</Text>
            <Text>{board.owner.email}</Text>
          </TouchableOpacity>

          <Divider style={styles.divider} />

          {/* Tasks */}
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Tasks
          </Text>

          {board.tasks.length === 0 && (
            <Text style={styles.noTasks}>No tasks</Text>
          )}

          {/* Render grouped tasks */}
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <View key={status} style={styles.sectionBlock}>
              <Text variant="titleMedium" style={styles.statusHeader}>
                {status}
              </Text>

              {tasks.map(task => (
                <Card
                  key={task.id}
                  style={styles.taskCard}
                  onPress={() =>
                    navigation.navigate('TaskDetailScreen', {
                      taskKey: task.key,
                    })
                  }
                >
                  <Card.Title
                    title={task.title}
                    titleStyle={styles.cardTitle}
                    left={() => (
                      <MaterialCommunityIcons
                        name={statusIcons[task.status] || 'clipboard-text'}
                        size={28}
                        style={styles.taskIcon}
                      />
                    )}
                    right={() => (
                      <IconButton
                        icon="chevron-right"
                        onPress={() =>
                          navigation.navigate('TaskDetailScreen', {
                            taskKey: task.key,
                          })
                        }
                      />
                    )}
                  />
                </Card>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default BoardDetailScreen;

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
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  boardHeaderCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  boardDescription: {
    alignSelf: 'center',
    marginBottom: 24,
  },
  ownerLabel: {
    marginTop: 12,
  },
  sectionTitle: {
    marginBottom: 6,
  },
  divider: {
    marginVertical: 20,
  },
  noTasks: {
    marginBottom: 20,
  },
  sectionBlock: {
    marginBottom: 18,
  },
  statusHeader: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  taskCard: {
    marginBottom: 12,
    borderRadius: 14,
  },
  taskIcon: {
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 18,
  },
});
