import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDataRequest} from '../reducers/DataReducer';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FilterModal from './FilterModal';
import Foundation from 'react-native-vector-icons/Foundation';

const HomePage = ({navigation}) => {
  const [oldData, setOldData] = useState([]);
  const [data, setData] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [filterModalVisible, seFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState();
  const [recentFilter, setRecentFilter] = useState();

  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.theme?.isDarkMode);
  const respData = useSelector(state => state?.data);

  const onSearch = text => {
    if (text == '') {
      setData(oldData);
      setSelectedFilter(recentFilter);
    } else {
      let tempList = data.filter(item => {
        return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setData(tempList);
      setSelectedFilter(recentFilter);
    }
  };

  const strAscending = [...data].sort((a, b) => (a.title > b.title ? 1 : -1));
  const highToLow = [...data].sort((a, b) => b.price - a.price);
  const lowToHigh = [...data].sort((a, b) => a.price - b.price);
  const highRating = [...data].sort((a, b) => b.rating.rate - a.rating.rate);

  useEffect(() => {
    if (selectedFilter === 0) {
      setData(strAscending);
      setSelectedFilter(recentFilter);
    } else if (selectedFilter === 1) {
      setData(lowToHigh);
      setSelectedFilter(recentFilter);
    } else if (selectedFilter === 2) {
      setData(highToLow);
      setSelectedFilter(recentFilter);
    } else if (selectedFilter === 3) {
      setData(highRating);
      setSelectedFilter(recentFilter);
    } else {
      setData(data);
      setSelectedFilter(recentFilter);
    }
  }, [selectedFilter]);

  const searchVisibleToggle = () => {
    setSearchVisible(!searchVisible);
  };

  useEffect(() => {
    dispatch(fetchDataRequest());
  }, [dispatch]);

  useEffect(() => {
    if (respData?.data) {
      setData(respData.data);
      setOldData(respData.data);
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
            <View style={styles.headerView}>
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
              <Text style={[styles.Heading]}>Section List</Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => searchVisibleToggle()}>
                <AntDesign
                  name="search1"
                  size={25}
                  style={{marginRight: moderateScale(10), color: 'white'}}
                />
              </TouchableOpacity>
            </View>
          </View>
          {searchVisible === false ? null : (
            <View style={styles.searchMain}>
              <View
                style={[
                  styles.searchContainer,
                  {
                    backgroundColor: isDarkMode ? 'black' : 'white',
                    borderColor: isDarkMode ? 'white' : 'black',
                  },
                ]}>
                <TextInput
                  placeholder="Search..."
                  placeholderTextColor={isDarkMode ? 'white' : 'black'}
                  autoFocus
                  value={search}
                  onChangeText={txt => {
                    onSearch(txt);
                    setSearch(txt);
                  }}
                  style={[
                    styles.search,
                    {color: isDarkMode ? 'white' : 'black'},
                  ]}
                />
                {search == '' ? null : (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      setSearch('');
                      onSearch('');
                    }}>
                    <AntDesign
                      name="close"
                      size={15}
                      style={[
                        {marginRight: 10},
                        {color: isDarkMode ? 'white' : 'black'},
                      ]}
                    />
                  </TouchableOpacity>
                )}
              </View>

              <View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    seFilterModalVisible(!filterModalVisible);
                  }}>
                  <MaterialCommunityIcons
                    name="sort"
                    size={35}
                    style={[
                      {marginRight: 10},
                      {color: isDarkMode ? 'white' : 'black'},
                    ]}
                  />
                </TouchableOpacity>
                <FilterModal
                  filterModalVisible={filterModalVisible}
                  seFilterModalVisible={seFilterModalVisible}
                  onSelectedFilter={x => {
                    setSelectedFilter(x);
                    setRecentFilter(x);
                  }}
                />
              </View>
            </View>
          )}

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
    flexDirection: 'row',
    top: Platform.OS === 'ios' ? moderateScale(50) : moderateScale(20),
    gap: Platform.OS === 'ios' ? moderateScale(90) : moderateScale(90),
    alignSelf: 'flex-end',
  },
  backTxt: {
    fontSize: moderateScale(16),
    marginHorizontal: moderateScale(10),
    fontWeight: '500',
    color: '#FFFFFF',
    top: 10,
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
    height: moderateScale(120),
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

    width: '90%',
    textAlign: 'center',
    flexDirection: 'row',
  },
  image: {
    width: moderateScale(100),
    height: moderateScale(100),
    maxHeight: '100%',
    maxWidth: '100%',
    marginLeft: 10,
  },
  dataTxtView: {
    width: '70%',
    alignItems: 'center',
  },
  name: {
    fontSize: moderateScale(15),
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: moderateScale(20),
    letterSpacing: 1,
    width: '80%',
  },
  searchMain: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    width: '80%',
    justifyContent: 'space-between',
  },
  search: {
    marginLeft: 10,
    height: 30,
    width: '80%',
    fontSize: 20,
  },
});
