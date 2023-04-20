import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import { Picker } from '@react-native-picker/picker';
import { BackHandler } from 'react-native';

const Category = ({ navigation }) => {
  const [questions, setQuestions] = useState(10);
  const [category, setCategory] = useState('');

  const questionsList = [10, 30, 50];
  const categoryList = [
    { name: 'Any Category', value: '' },
    { name: 'Animals', value: 27 },
    { name: 'Art', value: 25 },
    { name: 'Celebrities', value: 26 },
    { name: 'Entertainment: Board Games', value: 16 },
    { name: 'Entertainment: Books', value: 10 },
    { name: 'Entertainment: Cartoon & Animations', value: 32 },
    { name: 'Entertainment: Comics', value: 29 },
    { name: 'Entertainment: Film', value: 11 },
    { name: 'Entertainment: Japanese Anime & Manga', value: 31 },
    { name: 'Entertainment: Music', value: 12 },
    { name: 'Entertainment: Musicals & Theatres', value: 13 },
    { name: 'Entertainment: Television', value: 14 },
    { name: 'Entertainment: Video Games', value: 15 },
    { name: 'General Knowledge', value: 9 },
    { name: 'Geography', value: 22 },
    { name: 'History', value: 23 },
    { name: 'Mythology', value: 20 },
    { name: 'Politics', value: 24 },
    { name: 'Science & Nature', value: 17 },
    { name: 'Science: Computers', value: 18 },
    { name: 'Science: Gadgets', value: 30 },
    { name: 'Science: Mathematics', value: 19 },
    { name: 'Sports', value: 21 },
    { name: 'Vehicles', value: 28 },
  ];

  const handleBackButton = () => {
    navigation.navigate('Home'); // Navigate to the Home screen
    return true; // Prevent default back button behavior
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []); 


  const url = `https://opentdb.com/api.php?amount=${questions}&category=${category}&difficulty=&encode=url3986`
  return (
    <View style={styles.container}>
      <Title title={'Brain Battle'} />
      <View style={styles.dropdownGrop}>
        {/* Number of question */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Number of Questions:</Text>
          <Picker
            selectedValue={questions}
            onValueChange={(itemValue, itemIndex) => setQuestions(itemValue)}
            style={styles.dropdown}
          >
            {questionsList?.map((item, i) => (
              <Picker.Item key={i} label={`${item}`} value={item} />
            ))}
          </Picker>
        </View>

        {/* Category */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Select an option:</Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
            style={styles.dropdown}
          >
            {categoryList?.map((item, i) => (
              <Picker.Item key={i} label={`${item.name}`} value={item.value} />
            ))}
          </Picker>
        </View>

       
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Quiz', {url, marks: questions})}
      >
        <Text style={styles.btnTxt}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  dropdownGrop: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  container: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    height: '100%',
  },

  btn: {
    width: '100%',
    backgroundColor: '#1a759f',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },

  btnTxt: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },

  dropdownContainer: {
    width: '80%',
    padding: 10,
    backgroundColor: '#fff',
  },
  dropdownLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#34a0a4',
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: '#fff',
    fontSize: 18,
  },
});
