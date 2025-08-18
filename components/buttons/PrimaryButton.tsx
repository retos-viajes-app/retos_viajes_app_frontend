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
  variant?: 'primary' | 'secondary';
}

const PrimaryButton: React.FC<ButtonProps> = ({ title, onPress, style = null, loading = false, disabled = false, variant = 'primary', }) => {

   const buttonStyles = [
    styles.button,
    styles[variant], // Aplica el estilo de la variante (styles.primary o styles.secondary)
    style,
    disabled && styles.disabledButton,
  ];
  const textStyles = [
    globalStyles.largeBodySemiBold,
    styles[`${variant}Text`], // Aplica el estilo de texto (styles.primaryText o styles.secondaryText)
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator size="small" color={styles[`${variant}Text`].color} />
      ) : (
        <Text style={textStyles}>{title}</Text>
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
    
  },
  primary: {
    backgroundColor: Colors.colors.primary[500],
    marginBottom: 16,
  },
  primaryText: {
    color: Colors.colors.textWhite.primary,
  },
  secondary: {
    backgroundColor: Colors.colors.primary[100],
  },
  secondaryText: {
    color: Colors.colors.primary[500]
  },
  disabledButton: {
    backgroundColor: Colors.colors.border.default,
  },
  disabledText: {
    color: Colors.colors.text.secondary,
  },
});

export default PrimaryButton;
