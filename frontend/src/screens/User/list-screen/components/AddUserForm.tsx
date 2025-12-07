import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useMutation } from '@apollo/client/react';
import { ADD_USER } from '../mutations/ADD_USER';
import { GET_ALL_USERS } from '../queries/GET_ALL_USERS';

interface AddUserFormProps {
  onSuccess: () => void;
}

const AddUserForm = ({ onSuccess }: AddUserFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [addUser, { loading }] = useMutation(ADD_USER, {
    refetchQueries: [{ query: GET_ALL_USERS }],
    onCompleted: () => {
      setName('');
      setEmail('');
      setErrorMessage('');
      onSuccess();
    },
    onError: error => {
      setErrorMessage(error.message || 'Failed to add user');
    },
  });

  const handleAddUser = () => {
    if (name.trim() && email.trim()) {
      setErrorMessage('');
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

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

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
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginVertical: 4,
  },
});

export default AddUserForm;
