// React & React Native Imports
import React from 'react';

// Component Imports
import LoginForm from '@/components/forms/LoginForm';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function LoginScreen() {

  return (
  <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <LoginForm />
  </SafeAreaView>
  );
}