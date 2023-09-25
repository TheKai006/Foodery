import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {toggleTheme} from '../reducers/themeReducer';
import LanguageModal from '../../assets/Lang/LanguageModal';
import {translation} from '../../assets/Lang/Languages';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = ({navigation}) => {
  const imageRef = require('../../assets/images/loginBG.png');
  const [lock, setLock] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState({emailError: '', passwordError: ''});
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [selectedLang, setSelectedLang] = useState(0);

  const showHide = () => {
    lock ? setLock(false) : setLock(true);
  };

  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const language = useSelector(state => state.language.data);

  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

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

  const data = ['manekshahilraj1@gmail.com', 'manek0510'];

  const saveSelectedLAng = async index => {
    await AsyncStorage.setItem('LANG', index + '');
  };

  const submission = () => {
    if (email.length === 0) {
      setState({
        ...state,
        emailError: translation[selectedLang].EmptyEmailError,
      });
    } else if (password.length === 0) {
      setState({
        ...state,
        passwordError: translation[selectedLang].EmptyPassword,
      });
    } else if (email !== data[0]) {
      setState({
        ...state,
        emailError: translation[selectedLang].IncorrectEmail,
      });
    } else if (password !== data[1]) {
      setState({
        ...state,
        passwordError: translation[selectedLang].IncorrectPassword,
      });
    } else {
      setState({emailError: '', passwordError: ''});
      navigation.navigate('BottomNavigation');
    }
  };

  return (
    <View style={[styles.main, isDarkMode ? dark.container : light.container]}>
      <Image source={imageRef} style={styles.image} />

      <View style={styles.headerView}>
        <Text
          style={[styles.head, isDarkMode ? dark.container : light.container]}>
          {language === 'English'
            ? translation[0].SignIn
            : language === 'Italiano'
            ? translation[1].SignIn
            : language === 'عربي'
            ? translation[2].SignIn
            : null}
        </Text>
        <TouchableOpacity activeOpacity={0.7} onPress={handleToggle}>
          <Ionicons
            name={isDarkMode ? 'moon' : 'sunny-outline'}
            size={30}
            color={isDarkMode ? '#FFFFFF' : '#000000'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <View
          style={[
            styles.inputView,
            {
              backgroundColor: isDarkMode ? '#555555' : '#FFFFFF',
            },
          ]}>
          <TextInput
            placeholder={
              language === 'English'
                ? translation[0].Email
                : language === 'Italiano'
                ? translation[1].Email
                : language === 'عربي'
                ? translation[2].Email
                : null
            }
            placeholderTextColor={isDarkMode ? '#FFFFFF' : '#000000'}
            style={[
              styles.input,
              {textAlign: language == 'عربي' ? 'right' : 'left'},
            ]}
            autoCapitalize="none"
            autoCorrect={false}
            color={isDarkMode ? '#FFFFFF' : '#000000'}
            value={email}
            onChangeText={actualData => setEmail(actualData)}
          />
          <Fontisto
            name="email"
            size={25}
            color={isDarkMode ? '#FFFFFF' : '#000000'}
            style={styles.icons}
          />
        </View>

        <Text
          style={[
            styles.Err,
            {textAlign: selectedLang == 'عربي' ? 'right' : 'left'},
          ]}>
          {state.emailError}
        </Text>

        <View
          style={[
            styles.inputView,
            {
              backgroundColor: isDarkMode ? '#555555' : '#FFFFFF',
            },
          ]}>
          <TextInput
            placeholder={
              language === 'English'
                ? translation[0].Password
                : language === 'Italiano'
                ? translation[1].Password
                : language === 'عربي'
                ? translation[2].Password
                : null
            }
            placeholderTextColor={isDarkMode ? '#FFFFFF' : '#000000'}
            style={[
              styles.input,
              {textAlign: language == 'عربي' ? 'right' : 'left'},
            ]}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={lock}
            color={isDarkMode ? '#FFFFFF' : '#000000'}
            value={password}
            onChangeText={actualData => setPassword(actualData)}
          />
          <TouchableOpacity onPress={showHide} activeOpacity={0.7}>
            <Ionicons
              name={lock ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={isDarkMode ? '#FFFFFF' : '#000000'}
              style={styles.icons}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={[
            styles.Err,
            {textAlign: language == 'عربي' ? 'right' : 'left'},
          ]}>
          {state.passwordError}
        </Text>
      </View>
      <TouchableOpacity
        // onPress={submission}
        onPress={() => {
          navigation.navigate('BottomNavigation');
        }}
        style={styles.submit}
        activeOpacity={0.8}>
        <Text style={styles.submitText}>
          {language === 'English'
            ? translation[0].Continue
            : language === 'Italiano'
            ? translation[1].Continue
            : language === 'عربي'
            ? translation[2].Continue
            : null}
        </Text>
      </TouchableOpacity>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SectionListScreen');
          }}>
          <Text style={{color: 'cyan'}}>go to next</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.selectLanguageBtn,
            {borderColor: isDarkMode ? '#FFFFFF' : '#000000'},
          ]}
          activeOpacity={0.5}
          onPress={() => {
            setLangModalVisible(!langModalVisible);
          }}>
          <Text style={{color: isDarkMode ? '#FFFFFF' : '#000000'}}>
            {language === 'English'
              ? translation[0].SelectLanguage
              : language === 'Italiano'
              ? translation[1].SelectLanguage
              : language === 'عربي'
              ? translation[2].SelectLanguage
              : null}
          </Text>
        </TouchableOpacity>
        <LanguageModal
          langModalVisible={langModalVisible}
          setLangModalVisible={setLangModalVisible}
          onSelectedLang={x => {
            setSelectedLang(x);
            saveSelectedLAng(x);
          }}
        />
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  main: {
    height: moderateVerticalScale(790),
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  head: {
    fontSize: 40,
    fontWeight: '700',
    marginLeft: moderateScale(20),
    marginBottom: moderateVerticalScale(10),
  },

  inputContainer: {
    marginTop: moderateVerticalScale(10),
  },
  inputView: {
    width: moderateScale(300),
    paddingVertical: moderateScale(5),
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: moderateScale(7),
    borderRadius: moderateScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    shadowOffset: {
      height: moderateScale(-2),
      width: moderateScale(0.5),
    },
    shadowOpacity: moderateScale(0.5),
    shadowRadius: moderateScale(5),
    shadowColor: '#000000',
    elevation: moderateScale(10),
  },
  input: {
    width: moderateScale(250),
    fontSize: moderateScale(15),
  },
  icons: {
    marginVertical: verticalScale(5),
  },
  submit: {
    marginTop: moderateVerticalScale(30),
    backgroundColor: '#FF4500',
    padding: moderateVerticalScale(15),
    width: moderateScale(300),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(12),
  },
  submitText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  Err: {
    color: 'red',
    marginHorizontal: moderateScale(50),
    textAlign: 'right',
  },
  image: {
    height: moderateScale(300),
    width: moderateScale(400),
    backgroundColor: '#FF4500',
  },
  selectLanguageBtn: {
    width: '50%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    top: 100,
  },
});
