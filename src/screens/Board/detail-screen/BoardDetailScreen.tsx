import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  Appbar,
  Card,
  Text,
  IconButton,
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
          contentContainerStyle={{ padding: 16 }}
          ListHeaderComponent={
            <>
              {/* Board Header Card */}
              <Card style={{ padding: 20, borderRadius: 16, marginBottom: 20 }}>
                <Text variant="headlineMedium">{board.title}</Text>
                {board.description && (
                  <Text style={{ marginTop: 8, color: '#666' }}>
                    {board.description}
                  </Text>
                )}

                <Text style={{ marginTop: 12 }} variant="titleSmall">
                  Owner
                </Text>
                <Text style={{ color: '#444' }}>{board.owner.name}</Text>
              </Card>

              <Text variant="titleLarge" style={{ marginBottom: 12 }}>
                Tasks
              </Text>

              {board.tasks.length === 0 && (
                <Text style={{ color: '#999', marginBottom: 20 }}>
                  No tasks
                </Text>
              )}
            </>
          }
          data={board.tasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card
              style={{
                marginBottom: 12,
                borderRadius: 14,
              }}
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
                    style={{ marginLeft: 10 }}
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
});

export default BoardDetailScreen;
