import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {dataReducer} from './reducers/dataReducer';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {translation} from '../../assets/Lang/Languages';

const HomePage = ({navigation}) => {
  const [data, setData] = useState();
  const [selectedLang, setSelectedLang] = useState(0);
  useEffect(() => {
    getLang();
  }, []);

  const getLang = async () => {
    setSelectedLang(parseInt(await AsyncStorage.getItem('LANG')));
  };

  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.theme?.isDarkMode);

  const respData = useSelector(state => state.dataReducer);

  useEffect(() => {
    dispatch(dataReducer());
  }, []);

  useEffect(() => {
    if (respData?.data) {
      setData(respData?.data);
    }
  }, []);

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
                selectedLang === 1
                  ? {
                      gap:
                        Platform.OS === 'ios'
                          ? moderateScale(30)
                          : moderateScale(50),
                    }
                  : {
                      gap:
                        Platform.OS === 'ios'
                          ? moderateScale(80)
                          : moderateScale(90),
                    },
              ]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('LoginPage')}>
                <Text style={[styles.backTxt]}>
                  {selectedLang === 0
                    ? translation[0].Back
                    : selectedLang === 1
                    ? translation[1].Back
                    : selectedLang === 2
                    ? translation[2].Back
                    : null}
                </Text>
              </TouchableOpacity>
              <Text style={[styles.Heading]}>
                {selectedLang === 0
                  ? translation[0].ProductList
                  : selectedLang === 1
                  ? translation[1].ProductList
                  : selectedLang === 2
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
    gap: Platform.OS === 'ios' ? moderateScale(80) : moderateScale(90),
  },
  backTxt: {
    fontSize: moderateScale(16),
    marginLeft: moderateScale(8),
    fontWeight: '500',
    color: '#FFFFFF',
  },
  Heading: {
    fontSize: moderateScale(26),
    fontWeight: '600',
    color: '#FFFFFF',
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
    textAlign: 'center',
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
