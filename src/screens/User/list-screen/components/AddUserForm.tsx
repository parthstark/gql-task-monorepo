import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useMutation } from '@apollo/client/react';
import { ADD_USER } from '../mutations/ADD_USER';
import { GET_ALL_USERS } from '../queries/GET_ALL_USERS';

interface AddUserFormProps {
  onSuccess: () => void;
}

const AddUserForm = ({ onSuccess }: AddUserFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [addUser, { loading }] = useMutation(ADD_USER, {
    refetchQueries: [{ query: GET_ALL_USERS }],
    onCompleted: () => {
      setName('');
      setEmail('');
      onSuccess();
    },
  });

  const handleAddUser = () => {
    if (name.trim() && email.trim()) {
      addUser({ variables: { name: name.trim(), email: email.trim() } });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        dense
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
        dense
      />
      <Button
        mode="contained"
        onPress={handleAddUser}
        loading={loading}
        disabled={!name.trim() || !email.trim()}
        style={styles.button}
      >
        Add User
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
  },
});

export default AddUserForm;
