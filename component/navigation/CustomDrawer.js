import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {EnterEmail, EnterPass} from '../Screens/reducers/UserSlice';

const CustomDrawer = props => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.footerText}>
        <TouchableOpacity
          style={{flexDirection: 'row', gap: 10}}
          onPress={() => {
            navigation.navigate('LoginPage');
            dispatch(EnterEmail(null));
            dispatch(EnterPass(null));
          }}>
          <AntDesign name="logout" size={20} style={{marginTop: 3}} />
          <Text style={{fontSize: 20, fontWeight: '300'}}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  footerText: {
    borderTopWidth: 0.5,
    padding: 10,
  },
});
