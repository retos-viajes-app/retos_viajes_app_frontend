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
        <ActivityIndicator size="small" color={Colors.colors.textWhite.primary} />
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
    backgroundColor: Colors.colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 16,
  },
  text: {
    color: Colors.colors.textWhite.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: Colors.colors.border.default,
  },
  disabledText: {
    color: Colors.colors.text.secondary,
  },
});

export default PrimaryButton;
