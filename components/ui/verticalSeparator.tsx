import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { DimensionValue } from 'react-native';

interface VerticalDividerProps {
  /** Altura del divisor. Si no se indica, se ajusta al contenedor */
  height?: DimensionValue;
  /** Color del divisor (por defecto gris claro) */
  color?: string;
  /** Grosor del divisor (por defecto 1px) */
  thickness?: number;
  /** Opacidad (por defecto 0.5) */
  opacity?: number;
  /** Estilo adicional */
  style?: ViewStyle;
}

const VerticalDivider: React.FC<VerticalDividerProps> = ({
  height,
  color = '#FFFFFF',
  thickness = 2,
  opacity = 1,
  style,
}) => {
  return (
    <View
      style={[
        styles.divider,
        {
          height,
          backgroundColor: color,
          width: thickness,
          opacity,
          alignSelf: height ? 'center' : 'stretch', // 🔑 si no hay height, ocupa todo el alto
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 8,
  },
});

export default VerticalDivider;
