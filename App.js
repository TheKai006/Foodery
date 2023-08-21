import React, {useState} from 'react';
import Navigation from './components/Navigation';
import {StatusBar} from 'react-native';
import Splashscreen from './components/assets/SplashScreen/Splashscreen';

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
