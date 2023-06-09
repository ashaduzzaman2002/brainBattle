import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Title = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: '600'
  },

  container: {
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center'
  }
})