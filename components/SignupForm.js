import { View, Text, TextInput, Alert, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import firebase from '../firebase'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'


const SignupForm = ({ navigation }) => {

        const SignupFormSchema = Yup.object().shape({
            email: Yup.string().email().required("An email is required."),
            username: Yup.string().required().min(2,"A username is required."),
            password: Yup.string()
                .required()
                .min(6, 'Your password must be at least 8 characters long')
        })

        const onSignup = async (email,password,username) => {
          try {
           const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
           console.log("Success")
           fetch('https://social-backend-three.vercel.app/signup', {
            method: 'POST', 
            headers: {
              "Content-Type": 'application/json'
            }, 
            body: JSON.stringify({email: email, username: username, password: password})
           })
           .then(res => res.json()).then(
            data => {
              if(data.message === "User Registered Successfully!"){
                console.log("Credentials stored in database")
              }
            }
           )
          } catch(error) {
        console.log(error.message)
          }
        }
        
  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={(values) => {
          onSignup(values.email, values.password, values.username)
        }}
        validationSchema={SignupFormSchema}
        validateOnMount={true}

      >
        {({ handleChange, handleSubmit, handleBlur, values, isValid }) => (
          <>
            <View style={[
              styles.inputField,
              {
                borderColor:
                  values.email.length < 1 || Validator.validate(values.email)
                    ? '#ccc'
                    : 'red'
              }
            ]}>
              <TextInput
                placeholderTextColor='#444'
                placeholder='Phone Number, Username or Email'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus={true}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            <View style={[
              styles.inputField,
              {
                borderColor:
                  values.username.length || values.username.length > 2
                    ? '#ccc'
                    : 'red'
              }
            ]}>
              <TextInput
                placeholderTextColor='#444'
                placeholder='Username'
                autoCapitalize='none'
                textContentType='username'
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}

              />
            </View>
            <View style={[
              styles.inputField,
              {
                borderColor:
                  values.password.length || values.password.length > 6
                    ? '#ccc'
                    : 'red'
              }
            ]}>
              <TextInput
                placeholderTextColor='#444'
                placeholder='Password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                textContentType='password'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}

              />
            </View>
            <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
              <Text style={{ color: '#6BB0F5' }}>Forgot Password ?</Text>
            </View>
            <Pressable titleSize={20} style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid}>
              <Text style={styles.buttonText}>Signup</Text>
            </Pressable>
            <View style={styles.signupContainer}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: '#6BB0F5' }}>Login</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
    margin: 20,
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    borderWidth: 1,
  },
  button: isValid => ({
    backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4,
  }),
  buttonText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50,
  }
})
export default SignupForm