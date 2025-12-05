import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@apollo/client/react';
import { GET_USER } from './GET_USER';
import Loader from '../../../components/Loader';
import { User } from '../../../graphql/types/user';
import { UserStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<UserStackParamList, 'UserProfileScreen'>;

const UserProfileScreen: React.FC<Props> = ({ route }) => {
  const { userEmail } = route.params;

  const { data, loading, error } = useQuery<{ user?: User }>(GET_USER, {
    variables: { email: userEmail },
  });

  if (loading) return <Loader />;
  if (error || !data?.user)
    return (
      <View style={styles.center}>
        <Text>Error loading user profile</Text>
      </View>
    );

  const { user } = data;

  return (
    <View style={styles.container}>
      {/* User Info */}
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      {/* Boards */}
      <Text style={styles.sectionTitle}>Boards</Text>
      <FlatList
        data={user.boards}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
        ListEmptyComponent={<Text>No boards found.</Text>}
      />

      {/* Tasks */}
      <Text style={styles.sectionTitle}>Tasks</Text>
      <FlatList
        data={user.tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.title} ({item.status}) - Board: {item.board?.title}
          </Text>
        )}
        ListEmptyComponent={<Text>No tasks assigned.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  name: { fontSize: 24, fontWeight: 'bold' },
  email: { fontSize: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 16 },
  item: { fontSize: 14, paddingVertical: 4 },
});

export default UserProfileScreen;
