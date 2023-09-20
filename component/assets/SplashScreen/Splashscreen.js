import {View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';

const Splashscreen = ({setIsLoading}) => {
  return (
    <View style={{flex: 1, margin: 0}}>
      <Lottie
        source={require('./animation_lk2hrjl3.json')}
        autoPlay
        loop={false}
        duration={3270}
        onAnimationFinish={() => setIsLoading(false)}
      />
    </View>
  );
};

export default Splashscreen;
