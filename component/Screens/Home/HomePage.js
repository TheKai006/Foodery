import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {translation} from '../../assets/Lang/Languages';
import {fetchDataRequest} from '../reducers/DataReducer';
import Foundation from 'react-native-vector-icons/Foundation';

const HomePage = ({navigation}) => {
  const [data, setData] = useState([]);
  const [selectedLang, setSelectedLang] = useState(0);

  useEffect(() => {
    getLang();
  }, []);

  const getLang = async () => {
    try {
      setSelectedLang(parseInt(await AsyncStorage.getItem('LANG')) || 0);
    } catch (error) {
      console.error('AsyncStorage error:', error);
    }
  };

  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.theme?.isDarkMode);
  const language = useSelector(state => state.language.data);
  const respData = useSelector(state => state?.data);

  useEffect(() => {
    dispatch(fetchDataRequest());
  }, [dispatch]);

  useEffect(() => {
    if (respData?.data) {
      setData(respData.data);
    }
  }, [respData]);

  const light = StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      color: '#000000',
    },
  });

  const dark = StyleSheet.create({
    container: {
      backgroundColor: '#000000',
      color: '#ffffff',
    },
  });

  return (
    <View
      style={[styles.megaMain, isDarkMode ? dark.container : light.container]}>
      <View>
        {respData?.isLoading && (
          <ActivityIndicator color="#ff4500" size={'large'} />
        )}
        {respData?.error && <Text style={styles.error}>{respData?.error}</Text>}
      </View>

      {!respData?.isLoading && !respData?.error && (
        <>
          <View style={styles.headerMain}>
            <View
              style={[
                styles.headerView,
                {
                  gap:
                    selectedLang === 1
                      ? Platform.OS === 'ios'
                        ? moderateScale(80)
                        : moderateScale(50)
                      : Platform.OS === 'ios'
                      ? moderateScale(70)
                      : moderateScale(80),
                },
              ]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <Foundation
                  name="list"
                  size={100}
                  color={'#FFFFFF'}
                  style={styles.backTxt}
                />
              </TouchableOpacity>
              <Text style={[styles.Heading]}>
                {language === 'English'
                  ? translation[0].ProductList
                  : language === 'Italiano'
                  ? translation[1].ProductList
                  : language === 'عربي'
                  ? translation[2].ProductList
                  : null}
              </Text>
            </View>
          </View>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            style={styles.list}
            renderItem={({item}) => {
              return (
                <View
                  style={[
                    styles.Container,
                    {
                      backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
                      borderColor: '#FFFFFF',
                      borderWidth: moderateScale(1),
                      borderRadius: moderateScale(10),
                    },
                  ]}>
                  <Image
                    style={styles.image}
                    source={{uri: item.image}}
                    resizeMode="contain"
                  />
                  <View style={styles.dataTxtView}>
                    <Text
                      style={[
                        styles.name,
                        {
                          color: isDarkMode ? '#FFFFFF' : '#000000',
                        },
                      ]}>
                      {item.title}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </>
      )}
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  megaMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  error: {
    color: 'red',
    fontSize: moderateScale(20),
  },
  headerMain: {
    height: Platform.OS === 'ios' ? verticalScale(70) : verticalScale(50),
    backgroundColor: '#ff4500',
    width: '100%',
  },
  headerView: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    top: Platform.OS === 'ios' ? moderateScale(50) : moderateScale(20),
  },
  backTxt: {
    fontSize: moderateScale(16),
    marginHorizontal: moderateScale(20),
    bottom: moderateScale(4),
    fontWeight: '500',
    color: '#FFFFFF',
  },
  Heading: {
    fontSize: moderateScale(26),
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  list: {
    width: '100%',
  },
  Container: {
    height: moderateScale(250),
    marginTop: moderateScale(14),
    shadowOffset: {
      height: moderateScale(5),
      width: moderateScale(1),
    },
    shadowOpacity: moderateScale(0.5),
    shadowRadius: moderateScale(10),
    shadowColor: '#000000',
    elevation: moderateScale(10),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  image: {
    width: moderateScale(150),
    height: moderateScale(150),
    maxHeight: '100%',
    maxWidth: '100%',
  },
  dataTxtView: {
    marginTop: moderateScale(12),
    width: '70%',
  },
  name: {
    fontSize: moderateScale(15),
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: moderateScale(20),
    letterSpacing: 1,
  },
});
