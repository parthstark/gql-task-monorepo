import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useMutation } from '@apollo/client/react';
import { ADD_BOARD } from '../mutations/ADD_BOARD';
import { GET_ALL_BOARDS } from '../GET_ALL_BOARDS';

interface AddBoardFormProps {
  onSuccess: () => void;
}

const AddBoardForm = ({ onSuccess }: AddBoardFormProps) => {
  const [title, setTitle] = useState('');
  const [key, setKey] = useState('');
  const [description, setDescription] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [addBoard, { loading }] = useMutation(ADD_BOARD, {
    refetchQueries: [{ query: GET_ALL_BOARDS }],
    onCompleted: () => {
      setTitle('');
      setKey('');
      setDescription('');
      setOwnerEmail('');
      setErrorMessage('');
      onSuccess();
    },
    onError: error => {
      setErrorMessage(error.message || 'Failed to add board');
    },
  });

  const handleAddBoard = () => {
    if (title.trim() && key.trim() && ownerEmail.trim()) {
      setErrorMessage('');
      addBoard({
        variables: {
          title: title.trim(),
          key: key.trim(),
          description: description.trim() || null,
          ownerEmail: ownerEmail.trim(),
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        dense
      />
      <TextInput
        label="Key"
        value={key}
        onChangeText={setKey}
        style={styles.input}
        dense
      />
      <TextInput
        label="Owner Email"
        value={ownerEmail}
        onChangeText={setOwnerEmail}
        keyboardType="email-address"
        style={styles.input}
        dense
      />
      <TextInput
        label="Description (Optional)"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        dense
      />

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <Button
        mode="contained"
        onPress={handleAddBoard}
        loading={loading}
        disabled={!title.trim() || !key.trim() || !ownerEmail.trim()}
        style={styles.button}
      >
        Add Board
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

export default AddBoardForm;
