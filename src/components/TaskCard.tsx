import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface TaskCardProps {
  title: string;
  status: string;
  onPress: () => void;
}

const statusIcons: Record<string, string> = {
  TODO: 'clipboard-text-outline',
  IN_PROGRESS: 'progress-clock',
  DONE: 'check-circle-outline',
  CANCELLED: 'close-circle-outline',
};

const TaskCard = ({ title, status, onPress }: TaskCardProps) => {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Title
        title={title}
        titleStyle={styles.title}
        left={() => (
          <MaterialCommunityIcons
            name={statusIcons[status] || 'clipboard-text'}
            size={28}
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

export default TaskCard;
