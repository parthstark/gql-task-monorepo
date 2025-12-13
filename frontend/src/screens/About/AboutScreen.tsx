import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import AnimatedDiagram from '../../components/AnimatedDiagram';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="About" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>GQLTaskFlow</Text>
        <Text style={styles.subtitle}>GraphQL-powered Project Management</Text>

        <View style={styles.diagramContainer}>
          <AnimatedDiagram />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Model</Text>
          <InfoCard
            title="User"
            description="Team members who own boards and are assigned tasks"
            fields={['name', 'email', 'boards', 'tasks']}
          />
          <InfoCard
            title="Board"
            description="Project workspace containing tasks with unique key"
            fields={['title', 'key', 'description', 'owner', 'tasks']}
          />
          <InfoCard
            title="Task"
            description="Work items with status tracking and subtask support"
            fields={[
              'title',
              'key',
              'status',
              'board',
              'assignee',
              'comments',
              'subTasks',
            ]}
          />
          <InfoCard
            title="Comment"
            description="Discussion threads attached to tasks"
            fields={['text', 'author', 'task']}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <FeatureItem text="Real-time GraphQL queries and mutations" />
          <FeatureItem text="Hierarchical task management with subtasks" />
          <FeatureItem text="User assignment and ownership tracking" />
          <FeatureItem text="Board-based project organization" />
          <FeatureItem text="Comment threads on tasks" />
        </View>
      </ScrollView>
    </View>
  );
};

const InfoCard: React.FC<{
  title: string;
  description: string;
  fields: string[];
}> = ({ title, description, fields }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDescription}>{description}</Text>
    <Text style={styles.cardFields}>Fields: {fields.join(', ')}</Text>
  </View>
);

const FeatureItem: React.FC<{ text: string }> = ({ text }) => (
  <View style={styles.featureItem}>
    <Text style={styles.bullet}>•</Text>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  diagramContainer: {
    height: 280,
    marginBottom: 32,
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    overflow: 'hidden',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  cardFields: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
    color: '#333',
  },
  featureText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
});

export default AboutScreen;
