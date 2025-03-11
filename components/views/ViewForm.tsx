import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface PaddingViewProps {
  children: React.ReactNode;
}

const ViewForm: React.FC<PaddingViewProps> = ({ children }) => {
  return <View style={{  gap: 24, alignItems: 'center'}}>{children}</View>;
};


export default ViewForm;