import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from '../Screens/login/LoginPage';
import BottomNavigation from './BottomNavigation';
import SectionListScreen from '../Screens/Section/SectionListScreen';
import MapPage from '../Screens/map/MapPage';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{
            headerShown: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="BottomNavigation"
          component={BottomNavigation}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
            animationDuration: 600,
          }}
        />
        <Stack.Screen
          name="SectionListScreen"
          component={SectionListScreen}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
            animationDuration: 600,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
