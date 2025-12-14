import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { Colors } from '@/constants/ColoresPropios';
import globalStyles from '@/styles/global';
interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: object;
}

const PrimaryButton: React.FC<ButtonProps> = ({ title, onPress, style = null }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[globalStyles.largeBodySemiBold,styles.text]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 16,
  },
  text: {
    color: Colors.colors.neutral[100],
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PrimaryButton;
