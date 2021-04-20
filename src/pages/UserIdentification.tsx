import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard
} from 'react-native'
import { useNavigation } from '@react-navigation/core';
import { Button } from '../components/Button';

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function UserIdentification() {

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();
  const navigation = useNavigation();

  function handleSubmit() {
    navigation.navigate('Confirmation');
  }

  function handleInputBlur() {
    setIsFocused(false);
    setName(!!name);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setName(value);

  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>
                  {isFilled ? '😄' : '😃'}
                </Text>
                <Text style={styles.title}>
                  Como podemos{'\n'}
            chamar você ?
          </Text>
                <TextInput
                  style={[
                    styles.input,
                    (isFocused || isFilled) && { borderColor: colors.green }
                  ]}
                  placeholder="Digite um nome"
                  onBlur={handleInputBlur}
                  onFocus={handleInputFocus}
                  onChangeText={handleInputChange}
                />
                <View style={styles.footer}>
                  {isFilled ? (
                    <Button
                      title="Confirmar"
                      onPress={handleSubmit}
                    />
                  ) : (
                    <Button
                      disabled={true}
                      title="Confirmar"
                      onPress={handleSubmit}
                      style={styles.buttonDisabled}
                    />
                  )}

                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  content: {
    flex: 1,
    width: '100%',
  },

  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 24,
  },

  emoji: {
    fontSize: 44,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
  },

  footer: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20,
  },

  header: {
    alignItems: 'center',
    width: '100%',
  },

  buttonDisabled: {
    backgroundColor: colors.gray,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
