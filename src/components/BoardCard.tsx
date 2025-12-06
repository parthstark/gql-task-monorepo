import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface BoardCardProps {
  title: string;
  onPress: () => void;
}

const BoardCard = ({ title, onPress }: BoardCardProps) => {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Title
        title={title}
        titleStyle={styles.title}
        left={() => (
          <MaterialCommunityIcons
            name="view-dashboard"
            size={30}
            style={styles.icon}
          />
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
    paddingTop: 3,
    fontSize: 18,
  },
});

export default BoardCard;
