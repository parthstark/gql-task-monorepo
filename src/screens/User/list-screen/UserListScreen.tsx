import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import UserCard from '../../../components/UserCard';
import Loader from '../../../components/Loader';
import { useQuery } from '@apollo/client/react';
import { GET_ALL_USERS } from './GET_ALL_USERS';
import { User } from '../../../graphql/types/user';
import { UserStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<UserStackParamList, 'UserListScreen'>;

const UserListScreen: React.FC<Props> = ({ navigation }) => {
  const { data, loading, error } = useQuery<{ users: User[] }>(GET_ALL_USERS);

  if (loading) return <Loader />;
  if (error)
    return (
      <View>
        <Text>Error loading users.</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <UserCard
            name={item.name}
            email={item.email}
            onPress={() =>
              navigation.navigate('UserProfileScreen', {
                userEmail: item.email,
              })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default UserListScreen;
