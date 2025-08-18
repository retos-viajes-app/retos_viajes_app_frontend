import { Colors } from '@/constants/Colors';
import globalStyles from '@/styles/global';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Asumiendo que tienes estos archivos de configuración de estilos
// import { globalStyles } from './globalStyles';
// import { Colors } from './colors';

interface XPProgressBarProps {
  title: string;
  currentXp: number;
  totalXp: number;
}

export default function XPProgressBar({ title, currentXp, totalXp }: XPProgressBarProps) {
  // Calculamos el porcentaje de progreso para el ancho de la barra
  const progressPercentage = (currentXp / totalXp) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>

      <View style={styles.progressBarContainer}>
        {/* Barra de progreso llenada */}
        <View style={[styles.progressBarFilled, { width: `${progressPercentage}%` }]} />
        
        {/* Texto de XP superpuesto */}
        <View style={styles.xpTextWrapper}>
          <Text style={styles.xpText}>
            {currentXp}/{totalXp}XP
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    overflow: 'hidden',
    borderColor: Colors.colors.background.default,
    borderWidth: 1,
    backgroundColor: Colors.colors.secondary[50]
  },
  titleContainer: {
    backgroundColor: Colors.colors.secondary[900],
    padding: 4,
    gap: 4, 
    alignItems: 'center',
  },
  titleText: {
    ...globalStyles.largeBodySemiBold,
    color: Colors.colors.textWhite.primary
  },
  progressBarContainer: {
    height: 28,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  progressBarFilled: {
    backgroundColor: Colors.colors.secondary[300],
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  xpTextWrapper: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  xpText: {
    ...globalStyles.mediumBodyBold,
  },
});