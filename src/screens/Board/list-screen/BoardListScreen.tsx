import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  Card,
  Text,
  IconButton,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { GET_ALL_BOARDS } from './GET_ALL_BOARDS';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@apollo/client/react';
import { BoardStackParamList } from '../../../navigation/types';
import { Board } from '../../../graphql/types/board';

type Props = NativeStackScreenProps<BoardStackParamList, 'BoardListScreen'>;

const BoardListScreen = ({ navigation }: Props) => {
  const { data, loading, error } = useQuery<{ boards?: Board[] }>(
    GET_ALL_BOARDS,
  );

  const { boards } = data || {};

  return (
    <View style={styles.container}>
      {/* Appbar */}
      <Appbar.Header>
        <Appbar.Content title="Boards" />
      </Appbar.Header>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="small" />
        </View>
      )}

      {error && (
        <View style={styles.center}>
          <Text>Error loading boards</Text>
        </View>
      )}

      {Array.isArray(boards) && (
        <FlatList
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={
            <Text variant="titleLarge" style={styles.sectionTitle}>
              All Boards
            </Text>
          }
          data={boards}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card
              style={styles.boardCard}
              onPress={() =>
                navigation.navigate('BoardDetailScreen', { boardKey: item.key })
              }
            >
              <Card.Title
                title={item.title}
                subtitle={item.key}
                left={() => (
                  <MaterialCommunityIcons
                    name="view-dashboard"
                    size={30}
                    style={styles.boardIcon}
                  />
                )}
                right={() => (
                  <IconButton
                    icon="chevron-right"
                    onPress={() =>
                      navigation.navigate('BoardDetailScreen', {
                        boardKey: item.key,
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
  boardCard: {
    marginBottom: 12,
    borderRadius: 14,
  },
  boardIcon: {
    marginLeft: 10,
  },
  sectionTitle: {
    marginBottom: 16,
  },
});

export default BoardListScreen;
