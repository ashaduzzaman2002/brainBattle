import { StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './screens/Splash';
import Home from './screens/Home';
import Quiz from './screens/Quiz';
import Result from './screens/Result';
import Category from './screens/Category';

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Splash}
          name="Splash"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={Home}
          name="Home"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={Category}
          name="Category"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={Quiz}
          name="Quiz"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={Result}
          name="Result"
          options={{ headerShown: false }}
        />
      </Stack.Navigator>

      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fff"
      />
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
