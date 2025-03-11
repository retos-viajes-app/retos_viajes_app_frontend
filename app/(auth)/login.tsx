import React from 'react';
import LoginForm from '@/components/forms/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import { LoadingScreen } from '@/components/LoadingScreen';
export default function LoginScreen() {

  
  const {user} =  useAuth();

  return (
    user? <LoadingScreen  />: (
        <LoginForm />
    )
  );
}