import CustomDrawer from './CustomDrawer';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomePage from '../../Screens/Home/HomePage';
import SectionListScreen from '../../Screens/Section/SectionListScreen';
import InfinitePage from '../../Screens/Infinte/InfinitePage';

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="HomePage"
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="HomePage"
        component={HomePage}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="SectionListScreen"
        component={SectionListScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="InfinitePage"
        component={InfinitePage}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
