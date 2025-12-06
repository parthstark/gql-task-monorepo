import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { ActivityIndicator, Appbar, Text } from 'react-native-paper';

import { GET_ALL_BOARDS } from './GET_ALL_BOARDS';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@apollo/client/react';
import { BoardStackParamList } from '../../../navigation/types';
import { Board } from '../../../graphql/types/board';
import AddBoardForm from './components/AddBoardForm';
import BoardCard from '../../../components/BoardCard';

type Props = NativeStackScreenProps<BoardStackParamList, 'BoardListScreen'>;

const BoardListScreen = ({ navigation }: Props) => {
  const [showInputs, setShowInputs] = useState(false);

  const { data, loading, error } = useQuery<{ boards?: Board[] }>(
    GET_ALL_BOARDS,
  );

  const { boards } = data || {};

  return (
    <View style={styles.container}>
      {/* Appbar */}
      <Appbar.Header>
        <Appbar.Content title="Boards" />
        <Appbar.Action
          icon={showInputs ? 'close' : 'plus'}
          onPress={() => setShowInputs(!showInputs)}
        />
      </Appbar.Header>

      {showInputs && <AddBoardForm onSuccess={() => setShowInputs(false)} />}

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
            <BoardCard
              title={item.title}
              onPress={() =>
                navigation.navigate('BoardDetailScreen', { boardKey: item.key })
              }
            />
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
  sectionTitle: {
    marginBottom: 16,
  },
});

export default BoardListScreen;
