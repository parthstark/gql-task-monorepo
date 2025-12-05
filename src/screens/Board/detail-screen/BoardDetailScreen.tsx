import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
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

import { BoardStackParamList } from '../../../navigation/types';
import { useQuery } from '@apollo/client/react';
import { GET_BOARD } from './GET_BOARD';
import { Board } from '../../../graphql/types/board';

type Props = NativeStackScreenProps<BoardStackParamList, 'BoardDetailScreen'>;

const BoardDetailScreen = ({ route, navigation }: Props) => {
  const { boardKey } = route.params;

  const { data, loading, error } = useQuery<{ board?: Board }>(GET_BOARD, {
    variables: { key: boardKey },
  });

  const { board } = data || {};

  return (
    <View style={styles.container}>
      {/* Appbar */}
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
        <FlatList
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={
            <>
              {/* Board Header Card */}
              <Text variant="titleLarge" style={styles.sectionTitle}>
                Board Details
              </Text>

              <Card style={styles.boardHeaderCard}>
                <Text variant="headlineMedium">{board.title}</Text>
                {board.description && (
                  <Text style={styles.boardDescription}>
                    {board.description}
                  </Text>
                )}

                <Text style={styles.ownerLabel} variant="titleSmall">
                  Owner
                </Text>
                <Text style={styles.ownerName}>{board.owner.name}</Text>
              </Card>

              <Divider style={styles.divider} />

              <Text variant="titleLarge" style={styles.sectionTitle}>
                Tasks
              </Text>

              {board.tasks.length === 0 && (
                <Text style={styles.noTasks}>No tasks</Text>
              )}
            </>
          }
          data={board.tasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card
              style={styles.taskCard}
              onPress={() =>
                navigation.navigate('TaskDetailScreen', {
                  taskKey: item.key,
                })
              }
            >
              <Card.Title
                title={item.title}
                subtitle={`Status: ${item.status}`}
                left={() => (
                  <MaterialCommunityIcons
                    name="clipboard-check"
                    size={28}
                    style={styles.taskIcon}
                  />
                )}
                right={() => (
                  <IconButton
                    icon="chevron-right"
                    onPress={() =>
                      navigation.navigate('TaskDetailScreen', {
                        taskKey: item.key,
                      })
                    }
                  />
                )}
              />
            </Card>
          )}
        />
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
  listContainer: {
    padding: 16,
  },
  boardHeaderCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  boardDescription: {
    marginTop: 8,
    color: '#666',
  },
  ownerLabel: {
    marginTop: 12,
  },
  ownerName: {
    color: '#444',
  },
  sectionTitle: {
    marginBottom: 12,
  },
  divider: {
    marginVertical: 20,
  },
  noTasks: {
    color: '#999',
    marginBottom: 20,
  },
  taskCard: {
    marginBottom: 12,
    borderRadius: 14,
  },
  taskIcon: {
    marginLeft: 10,
  },
});

export default BoardDetailScreen;
