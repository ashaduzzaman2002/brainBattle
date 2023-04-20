import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    BackHandler,
  } from 'react-native';
  import React, { useEffect } from 'react';
  import Title from '../components/Title';
  
  const Home = ({navigation}) => {
    const handleBackButton = () => {
      BackHandler.exitApp(); // Exit the app
      return true; // Prevent default back button behavior
    };

    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      };
    }, []);
    return (
      <View style={styles.container}>
      <Title title={'Brain Battle'} />
      <View style={styles.bannerContainer}>
        <Image
          source={require('../images/banner.jpg')}
          style={styles.banner}
        />
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Category')}>
        <Text style={styles.btnTxt}>Start</Text>
      </TouchableOpacity>
    </View>
    );
  };
  
  export default Home;
  const styles = StyleSheet.create({
    banner: {
      height: 300,
      width: 300,
    },
  
    bannerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    },

    container: {
      paddingHorizontal: 20,
      backgroundColor: "#fff",
      height: '100%'
    },

    btn: {
      width: '100%',
      backgroundColor: "#1a759f",
      padding: 20,
      borderRadius: 16,
      alignItems: 'center',
      marginBottom: 30
    },

    btnTxt: {
      fontSize: 24,
      fontWeight: '600',
      color: '#fff'
    }
  });
  