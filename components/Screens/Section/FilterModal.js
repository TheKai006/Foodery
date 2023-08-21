import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

const FilterModal = ({
  filterModalVisible,
  seFilterModalVisible,
  onSelectedFilter,
}) => {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [filter, setFilter] = useState([
    {name: 'Sort By Name', selected: false},
    {name: 'Low To High Price', selected: false},
    {name: 'High To Low Price', selected: false},
    {name: 'Sort By Rating', selected: false},
  ]);

  const isDarkMode = useSelector(state => state.Call.isDarkMode);

  const onSelect = index => {
    const temp = filter;
    temp.map((item, ind) => {
      if (index == ind) {
        if (item.selected == true) {
          item.selected = true;
        } else {
          item.selected = true;
          setSelectedFilter(index);
        }
      } else {
        item.selected = false;
      }
    });
    let temp2 = [];
    temp.map(item => {
      temp2.push(item);
    });
    setFilter(temp2);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={filterModalVisible}
      onRequestClose={() => {
        seFilterModalVisible(!filterModalVisible);
      }}>
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            {backgroundColor: isDarkMode ? '#222222' : '#FFFFFF'},
          ]}>
          <View style={{width: '100%'}}>
            <FlatList
              data={filter}
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
                      seFilterModalVisible(false);
                      onSelectedFilter(index);
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

export default FilterModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  modalView: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 35,
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
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageText: {
    fontSize: 18,
  },
});
