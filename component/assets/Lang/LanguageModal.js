import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {changeLanguage} from '../../Screens/reducers/LanguageReducer';

const LanguageModal = ({
  langModalVisible,
  setLangModalVisible,
  onSelectedLang,
}) => {
  const [languages, setLanguages] = useState([
    {name: 'English', selected: true},
    {name: 'Italiano', selected: false},
    {name: 'عربي', selected: false},
  ]);

  const isDarkMode = useSelector(state => state.theme?.isDarkMode);
  const language = useSelector(state => state.language.data);
  const dispatch = useDispatch();

  const onSelect = index => {
    const temp = languages;
    temp.map((item, ind) => {
      if (index == ind) {
        if (item.selected == true) {
          item.selected = true;
          dispatch(changeLanguage(item.name));
        } else {
          item.selected = true;
          dispatch(changeLanguage(item.name));
        }
      } else {
        item.selected = false;
      }
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={langModalVisible}
      onRequestClose={() => {
        setLangModalVisible(!langModalVisible);
      }}>
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            {backgroundColor: isDarkMode ? '#222222' : '#FFFFFF'},
          ]}>
          <Text
            style={[styles.title, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
            Select Language
          </Text>
          <View style={{width: '100%'}}>
            <FlatList
              data={languages}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.languagesItem,
                      {borderColor: isDarkMode ? '#FFFFFF' : '#000000'},
                    ]}
                    activeOpacity={0.7}
                    onPress={() => {
                      onSelect(index);
                      setLangModalVisible(false);
                      onSelectedLang(index);
                    }}>
                    <Text
                      style={[
                        styles.languageText,
                        {color: isDarkMode ? '#FFFFFF' : '#000000'},
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LanguageModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#00000080',
  },
  modalView: {
    margin: 20,
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      height: 0,
      width: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  languagesItem: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingLeft: 10,
  },
  languageText: {
    marginLeft: 20,
    fontSize: 18,
  },
  icon: {},
});
