import { View, Text, StyleSheet, Image, TouchableOpacity, BackHandler } from 'react-native';
import React from 'react';
import Title from '../components/Title';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import Victory from '../images/victory.png'
import Fail from '../images/fail.png'

const Result = ({ navigation }) => {
  const route = useRoute().params;
  const color = route.score > 30? '#4BB543': '#ff0000'

  
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
      <Title title={'Result'} />
      <View style={styles.score}>
        <Text style={[styles.scoreTxt, {color}]}>{route.score}%</Text>
      </View>
      <View style={styles.bannerContainer}>
        <Image
          source={route.score > 30? Victory: Fail}
          style={styles.banner}
        />
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.btnTxt}>GO TO HOME</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Result;
const styles = StyleSheet.create({
  banner: {
    height: 300,
    width: 300,
  },

  bannerContainer: {
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

  score: {
    alignItems: 'center',
    marginTop: 50
  },

  scoreTxt: {
    fontSize: 60,
    fontWeight: '600'
  }
});
