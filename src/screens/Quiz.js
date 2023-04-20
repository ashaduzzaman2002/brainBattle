import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { BackHandler } from 'react-native';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const Quiz = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [ques, setQues] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const {url, marks} = useRoute().params

  const getQuiz = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setQuestions(data.results);
    setOptions(generateOptionsAndSUffle(data.results[0]));
    setIsLoading(false);
  };
  useEffect(() => {
    getQuiz();
  }, []);

  const handleSubmit = () => {
    navigation.navigate('Result', { score: Math.round((score / marks) *100)});
  };

  const handleNextPage = () => {
    setQues(ques + 1);
    setOptions(generateOptionsAndSUffle(questions[ques + 1]));
  };



  const generateOptionsAndSUffle = (_question) => {
    const options = [..._question.incorrect_answers];
    options.push(_question.correct_answer);
    shuffleArray(options);
    return options;
  };

  const handleSelectedOption = (_option) => {
    if (_option === questions[ques].correct_answer) {
      setScore(score + 1);
    }

    if (ques !== marks - 1) {
      setQues(ques + 1);
      setOptions(generateOptionsAndSUffle(questions[ques + 1]));
    } else if (ques === marks - 1) {
      handleSubmit();
    }
  };

  const handleBackButton = () => {
    return true; // Prevent default back button behavior
  };

  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  });

  return (
    <View style={styles.container}>
      {!isLoading ? (
        <>
          <View style={styles.top}>
            <Text style={styles.question}>
              Q
              {`${Number(ques + 1)}. ${decodeURIComponent(
                questions[ques]?.question
              )}`}
            </Text>
          </View>

          <View style={styles.options}>
            {options?.map((item, i) => (
              <TouchableOpacity
                onPress={() => handleSelectedOption(item)}
                key={i}
                style={styles.optionBtn}
              >
                <Text style={styles.option}>{`${decodeURIComponent(
                  item
                )}`}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.btnGroup}>


            <Text>' '</Text>

            {ques !== marks - 1 ? (
              <TouchableOpacity onPress={handleNextPage} style={styles.btn}>
                <Text style={styles.btnTxt}>SKIP</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnTxt}>SUBMIT</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    height: '100%',
  },

  top: {
    marginVertical: 16,
  },

  options: {
    marginVertical: 16,
    flex: 1,
  },

  btnGroup: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  btn: {
    backgroundColor: '#1a759f',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },

  btnTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },

  question: {
    fontSize: 28,
  },

  option: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },

  optionBtn: {
    paddingVertical: 12,
    marginVertical: 6,
    backgroundColor: '#34a0a4',
    paddingHorizontal: 12,
    borderRadius: 12,
  },
});
