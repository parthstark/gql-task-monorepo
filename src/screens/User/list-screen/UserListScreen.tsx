import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParamList } from '../../../navigation/types';
import { useQuery } from '@apollo/client/react';
import { Card, Text, ActivityIndicator, Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GET_ALL_USERS } from './GET_ALL_USERS';
import { User } from '../../../graphql/types/user';

type Props = NativeStackScreenProps<UserStackParamList, 'UserListScreen'>;

const UserListScreen = ({ navigation }: Props) => {
  const { data, loading, error } = useQuery<{ users?: User[] }>(GET_ALL_USERS);

  const { users } = data || {};

  return (
    <View style={styles.container}>
      {/* Appbar */}
      <Appbar.Header>
        <Appbar.Content title="Users" />
      </Appbar.Header>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="small" />
        </View>
      )}

      {error && (
        <View style={styles.center}>
          <Text>Error loading users</Text>
        </View>
      )}

      {Array.isArray(users) && (
        <FlatList
          data={users}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 12 }}
          renderItem={({ item }) => (
            <Card
              style={styles.card}
              mode="elevated"
              onPress={() =>
                navigation.navigate('UserProfileScreen', {
                  userEmail: item.email,
                })
              }
            >
              <Card.Title
                title={item.name}
                subtitle={item.email}
                left={props => (
                  <Icon {...props} name="account-circle" size={40} />
                )}
                right={props => (
                  <Icon {...props} name="chevron-right" size={28} />
                )}
              />
            </Card>
          )}
        />
      )}
    </View>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  search: {
    margin: 12,
    borderRadius: 12,
  },
  card: {
    marginBottom: 12,
    borderRadius: 14,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
