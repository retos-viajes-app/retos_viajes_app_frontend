// React & React Native Imports
import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';



interface PaddingViewProps {
  children: React.ReactNode;
}

const PaddingView: React.FC<PaddingViewProps> = ({ children }) => {
  return <View style={[styles.container, {backgroundColor: Colors.colors.background.card}]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 16, 
    paddingTop: 16, // Seguramente haya que quitarlo
  } as ViewStyle,
});

export default PaddingView;
