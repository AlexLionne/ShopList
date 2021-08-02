import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ShopList from '../screens/ShopList';
import AddList from '../screens/AddList';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ShopList"
          component={ShopList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddList"
          component={AddList}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
