import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface UserCardProps {
  name: string;
  email: string;
  onPress: () => void;
}

const UserCard = ({ name, email, onPress }: UserCardProps) => {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Title
        title={name}
        subtitle={email}
        titleStyle={styles.title}
        left={() => (
          <Icon name="account-circle" size={28} style={styles.icon} />
        )}
        right={() => <IconButton icon="chevron-right" onPress={onPress} />}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 14,
  },
  icon: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
  },
});

export default UserCard;
