import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BoardStackParamList } from '../types';

import BoardListScreen from '../../screens/Board/list-screen/BoardListScreen';
import BoardDetailScreen from '../../screens/Board/detail-screen/BoardDetailScreen';
import TaskDetailScreen from '../../screens/Board/Task/detail-screen/TaskDetailScreen';

const BoardStack = createNativeStackNavigator<BoardStackParamList>();

const BoardStackNavigator = () => {
  return (
    <BoardStack.Navigator>
      <BoardStack.Screen name="BoardListScreen" component={BoardListScreen} />
      <BoardStack.Screen
        name="BoardDetailScreen"
        component={BoardDetailScreen}
      />
      <BoardStack.Screen name="TaskDetailScreen" component={TaskDetailScreen} />
    </BoardStack.Navigator>
  );
};

export default BoardStackNavigator;
