import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import {moderateScale, verticalScale} from 'react-native-size-matters';

const BaseUrl = 'https://source.unsplash.com/random?sig=';

const InfinitePage = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    fetchRandomImages();
  }, []);

  const fetchRandomImages = async () => {
    if (isLoadingMore || isRefreshing) return;

    setIsRefreshing(true);

    try {
      const randomImages = await Promise.all(
        Array.from({length: 20}).map(async (_, i) => {
          const randomSig = Math.floor(Math.random() * 1000) + 1;
          const imageUrl = `${BaseUrl}${randomSig}`;
          return imageUrl;
        }),
      );

      setData(prevData => [...prevData, ...randomImages]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsRefreshing(false);
      setIsLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!isLoadingMore && !isRefreshing) {
      setIsLoadingMore(true);
      fetchRandomImages();
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setData([]);
    fetchRandomImages();
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerMain}>
        <View style={styles.headerView}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Foundation
              name="list"
              size={22}
              color={'#FFFFFF'}
              style={styles.backTxt}
            />
          </TouchableOpacity>
          <Text style={[styles.Heading]}>Images</Text>
        </View>
      </View>
      <FlatList
        data={data}
        style={styles.list}
        numColumns={3}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        keyExtractor={(item, index) => `${item}-${index}`}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh} // Use handleRefresh for refreshing
          />
        }
        renderItem={({item}) => (
          <Image source={{uri: item}} style={styles.Image} />
        )}
      />
    </View>
  );
};

export default InfinitePage;

const styles = StyleSheet.create({
  list: {width: '100%'},
  Image: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
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
    marginHorizontal: 35,
  },
});
