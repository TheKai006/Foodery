import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from '../../Screens/login/LoginPage';
import BottomNavigation from '../Bottom/BottomNavigation';
import SectionListScreen from '../../Screens/Section/SectionListScreen';
import CustomDrawer from '../Drawer/CustomDrawer';
import DrawerNavigation from '../Drawer/DrawerNavigation';

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
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="BottomNavigation"
          component={BottomNavigation}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
            animationDuration: 600,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="CustomDrawer"
          component={CustomDrawer}
          options={{
            headerShown: false,
            animation: 'fade',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="DrawerNavigation"
          component={DrawerNavigation}
          options={{
            headerShown: false,
            animation: 'fade',
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
