// React & React Native Imports
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

// Style Imports
import globalStyles from '@/styles/global';

// Utility Imports
import { Colors } from '@/constants/Colors';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  style?: object;
  loading?: boolean;
  disabled?: boolean;
}

const PrimaryButton: React.FC<ButtonProps> = ({ title, onPress, style = null, loading = false, disabled = false }) => {
  return (
    <TouchableOpacity style={[styles.button, style,  disabled && styles.disabledButton]} onPress={onPress}>
      {loading ? (
        <ActivityIndicator size="small" color={Colors.colors.neutral[100]} />
      ) : (
      <Text style={[
        globalStyles.largeBodySemiBold,
        styles.text,
        disabled && styles.disabledText,
      ]}>{title}</Text>
      )}
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
  disabledButton: {
    backgroundColor: Colors.colors.gray[200],
  },
  disabledText: {
    color: Colors.colors.gray[400],
  },
});

export default PrimaryButton;
