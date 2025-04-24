// React & React Native Imports
import React from 'react';

// Component Imports
import { LoadingScreen } from '@/components/LoadingScreen';
import LoginForm from '@/components/forms/LoginForm';

// Hook Imports
import { useAuth } from '@/hooks/useAuth';


export default function LoginScreen() {

  
  const {user} =  useAuth();

  return (
    user? <LoadingScreen  />: (
        <LoginForm />
    )
  );
}