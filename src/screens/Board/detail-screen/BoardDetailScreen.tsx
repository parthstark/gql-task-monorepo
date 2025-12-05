import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@apollo/client/react';
import { Board } from '../../../graphql/types/board';
import { GET_BOARD } from './GET_BOARD';
import Loader from '../../../components/Loader';
import { BoardStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<BoardStackParamList, 'BoardDetailScreen'>;

const BoardDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { boardKey } = route.params;

  const { data, loading, error } = useQuery<{ board?: Board }>(GET_BOARD, {
    variables: { key: boardKey },
  });

  if (loading) return <Loader />;
  if (error || !data?.board) return <Text>Error loading board</Text>;

  const { board } = data;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{board.title}</Text>
      {board.description ? (
        <Text style={styles.desc}>{board.description}</Text>
      ) : null}

      <Text style={styles.section}>Owner: {board.owner.name}</Text>

      <Text style={styles.section}>Tasks:</Text>

      <FlatList
        data={board.tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.task}
            onPress={() =>
              navigation.navigate('TaskDetailScreen', { taskKey: item.key })
            }
          >
            <Text style={styles.taskTitle}>
              {item.title} ({item.status})
            </Text>
            <Text style={styles.assignee}>
              {item.assignee?.name || 'Unassigned'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold' },
  desc: { fontSize: 16, marginVertical: 8 },
  section: { fontSize: 18, fontWeight: '600', marginTop: 16 },
  task: { paddingVertical: 8, borderBottomWidth: 0.5, borderColor: '#ccc' },
  taskTitle: { fontSize: 16 },
  assignee: { fontSize: 14, color: 'gray' },
});

export default BoardDetailScreen;
