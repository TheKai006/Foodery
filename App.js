import 'react-native-gesture-handler';
import React, {useState} from 'react';
import Navigation from './component/navigation/Stack/Navigation';
import {StatusBar} from 'react-native';
import Splashscreen from './component/assets/SplashScreen/Splashscreen';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <StatusBar backgroundColor={'#ff4500'} barStyle={'light-content'} />
      {isLoading ? (
        <Splashscreen setIsLoading={setIsLoading} />
      ) : (
        <Navigation />
      )}
    </>
  );
};

export default App;
