import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@apollo/client/react';
import { Board } from '../../../graphql/types/board';
import { GET_ALL_BOARDS } from './GET_ALL_BOARDS';
import Loader from '../../../components/Loader';
import { BoardStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<BoardStackParamList, 'BoardListScreen'>;

const BoardListScreen: React.FC<Props> = ({ navigation }) => {
  const { data, loading, error } = useQuery<{
    boards: Board[];
  }>(GET_ALL_BOARDS);

  if (loading) return <Loader />;
  if (error || !data) return <Text>Error loading boards</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data.boards}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BoardDetailScreen', { boardKey: item.key })
            }
          >
            <Text style={styles.item}>{item.title}</Text>
            <Text style={styles.sub}>{item.owner.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  item: { fontSize: 18, fontWeight: 'bold', marginVertical: 4 },
  sub: { fontSize: 14, color: 'gray', marginBottom: 8 },
});

export default BoardListScreen;
