import React from 'react';
import { StyleSheet, Image, View, Text, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import userImg from '../assets/julio.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function Header() {
  return (
    <View style={styles.container}>
      <View >
        <Text style={styles.greeting}>Olá</Text>
        <Text style={styles.username}>Julio Cesar</Text>
      </View>
      <Image source={userImg} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: Platform.OS === 'ios' ? getStatusBarHeight() : 30,
  },

  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },

  username: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },

  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },

})
