import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParamList } from '../../../navigation/types';
import { useQuery } from '@apollo/client/react';
import {
  Card,
  Text,
  ActivityIndicator,
  Appbar,
  IconButton,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GET_ALL_USERS } from './queries/GET_ALL_USERS';
import { User } from '../../../graphql/types/user';
import AddUserForm from './components/AddUserForm';

type Props = NativeStackScreenProps<UserStackParamList, 'UserListScreen'>;

const UserListScreen = ({ navigation }: Props) => {
  const [showInputs, setShowInputs] = useState(false);

  const { data, loading, error } = useQuery<{ users?: User[] }>(GET_ALL_USERS);
  const { users } = data || {};

  return (
    <View style={styles.container}>
      {/* Appbar */}
      <Appbar.Header>
        <Appbar.Content title="Users" />
        <Appbar.Action
          icon={showInputs ? 'close' : 'plus'}
          onPress={() => setShowInputs(!showInputs)}
        />
      </Appbar.Header>

      {showInputs && <AddUserForm onSuccess={() => setShowInputs(false)} />}

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
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={
            <Text variant="titleLarge" style={styles.sectionTitle}>
              All Users
            </Text>
          }
          renderItem={({ item }) => (
            <Card
              style={styles.card}
              onPress={() =>
                navigation.navigate('UserProfileScreen', {
                  userEmail: item.email,
                })
              }
            >
              <Card.Title
                title={item.name}
                subtitle={item.email}
                titleStyle={styles.cardTitle}
                left={() => (
                  <Icon
                    name="account-circle"
                    size={28}
                    style={styles.userIcon}
                  />
                )}
                right={() => (
                  <IconButton
                    icon="chevron-right"
                    onPress={() =>
                      navigation.navigate('UserProfileScreen', {
                        userEmail: item.email,
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
  listContainer: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  userIcon: {
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 18,
  },
});
