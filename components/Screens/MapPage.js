import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Polyline,
} from 'react-native-maps';

import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  StatusBar,
  ImageComponent,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';

const MapPage = ({navigation}) => {
  const [userLatitude, setUserLatitude] = useState(0);
  const [userLongitude, setUserLongitude] = useState(0);

  useEffect(() => {
    Geolocation.getCurrentPosition(data => {
      setUserLatitude(data.coords.latitude);
      setUserLongitude(data.coords.longitude);
    });
  }, []);

  const userLocation = {
    latitude: userLatitude,
    longitude: userLongitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };
  const destination = {
    latitude: 23.012623,
    longitude: 72.51754,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={userLocation}>
        <Marker
          coordinate={destination}
          image={require('../assets/images/shopIcon.png')}>
          <Callout>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{color: '#000000'}}>Real Paprika</Text>
                <Text style={{color: '#000000'}}>4.3</Text>
              </View>
            </View>
          </Callout>
        </Marker>
        <Polyline
          coordinates={[
            {latitude: userLatitude, longitude: userLongitude},
            {latitude: 23.012623, longitude: 72.51754},
          ]}
          strokeColor="green"
          strokeWidth={6}
        />
        <Circle
          center={userLocation}
          radius={4}
          fillColor="#FFFFFF"
          strokeWidth={10}
          strokeColor="#0abf69"
          zIndex={1}
        />
        <Circle
          center={userLocation}
          radius={15}
          fillColor="rgba(10, 191, 105,.2)"
          strokeWidth={0}
        />
      </MapView>
    </View>
  );
};

export default MapPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
