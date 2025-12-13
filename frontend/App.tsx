import React from 'react';
import { View, StyleSheet } from 'react-native';
import { client } from './src/graphql/client';
import { ApolloProvider } from '@apollo/client/react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import Icon from './src/components/Icon';
import MobileWrapper from './src/components/MobileWrapper';

const App = () => {
  return (
    <MobileWrapper>
      <View style={styles.root}>
        <PaperProvider
          theme={MD3LightTheme}
          settings={{ icon: props => <Icon {...props} /> }}
        >
          <ApolloProvider client={client}>
            <NavigationContainer>
              <TabNavigator />
            </NavigationContainer>
          </ApolloProvider>
        </PaperProvider>
      </View>
    </MobileWrapper>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
