import React from 'react';
import { client } from './src/graphql/client';
import { ApolloProvider } from '@apollo/client/react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const App = () => {
  return (
    <PaperProvider
      theme={MD3LightTheme}
      settings={{ icon: props => <MaterialCommunityIcons {...props} /> }}
    >
      <ApolloProvider client={client}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </PaperProvider>
  );
};

export default App;
