import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  }, []);
  
  return (
    <View style={styles.container}>
      <Image source={require('../images/quiz.png')} style={styles.logo} />
      <Text style={styles.title}>Brain Battle</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00BCD4',
  },
  logo: {
    width: 100,
    height: 100,
    tintColor: '#fff',
  },
  title: { color: '#fff', fontSize: 20, fontWeight: '800', marginTop: 20 },
});
