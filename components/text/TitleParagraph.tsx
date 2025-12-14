import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '@/styles/global';

interface TitleParagraphProps {
  title: string;
  paragraph: string;
}

const TitleParagraph: React.FC<TitleParagraphProps> = ({ title, paragraph }) => {
  return (
    <View style={styles.container}>
      <Text style={[globalStyles.title, styles.title]}>{title}</Text>
      <Text style={[globalStyles.largeBodyMedium, styles.paragraph]}>{paragraph}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center', // Asegura que el texto del título esté centrado
  },
  paragraph: {
    textAlign: 'center', // Asegura que el texto del párrafo esté centrado
  },
});

export default TitleParagraph;

