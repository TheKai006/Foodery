import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../../Screens/Home/HomePage';
import MapPage from '../../Screens/map/MapPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DrawerNavigation from '../Drawer/DrawerNavigation';

const Tab = createBottomTabNavigator();

const Icons = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    let iconName;
    if (route.name === 'DrawerNavigation') {
      iconName = focused ? 'ios-home' : 'ios-home-outline';
    } else {
      iconName = focused ? 'map' : 'map-outline';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: '#ff4500',
  tabBarInactiveTintColor: '#444444',
  tabBarShowLabel: false,
});

const BottomNavigation = () => {
  return (
    <Tab.Navigator screenOptions={Icons} initialRouteName="HomePage">
      <Tab.Screen
        name="DrawerNavigation"
        component={DrawerNavigation}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="MapPage"
        component={MapPage}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
