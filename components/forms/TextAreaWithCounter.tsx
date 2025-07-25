// React & React Native Imports
import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

// Style Imports
import globalStyles from "@/styles/global";
import inputStyles from "@/styles/inputs";

// Utility Imports
import { Colors } from "@/constants/Colors";
import { useTranslation } from "react-i18next";


interface TextAreaWithCounterProps {
  bio: string;
  setBio: (text: string) => void;
  errorMessage?: string; // Nueva prop para el mensaje de error
}

const TextAreaWithCounter: React.FC<TextAreaWithCounterProps> = ({
  bio,
  setBio,
  errorMessage,
}) => {
  const maxChars = 120;
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (inputText: string) => {
    if (inputText.length <= maxChars) {
      setBio(inputText);
    }
  };

  const inputStateStyles = [
    inputStyles.default,
    isFocused && inputStyles.focused,
    errorMessage && inputStyles.error,
  ];

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          inputStateStyles,
          styles.textArea,
        ]}
        multiline
        onFocus={handleFocus}
        onBlur={handleBlur}
        numberOfLines={5}
        placeholder={t("auth.completeRegister.bioPlaceholder")}
        placeholderTextColor={Colors.colors.text.primary}
        value={bio}
        onChangeText={handleChange}
      />
      <View style={styles.infoContainer}>
        <Text style={[styles.charCounter]}>
          {bio.length}/{maxChars} {t("auth.completeRegister.characters")}
        </Text>
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    marginBottom: 10,
  },
  textArea: {
    ...globalStyles.largeBodyMedium,
    padding: 10,
    color: Colors.colors.text.primary,
    width: "100%",
    minHeight: 100,
    textAlignVertical: "top",
  },
   infoContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 5,
  },
  charCounter: {
    ...globalStyles.smallBodyRegular,
    color: Colors.colors.text.secondary,
    alignSelf: "flex-end",
  },
  error: {
    borderColor: Colors.colors.error[100],
  },
  errorText: {
    color: Colors.colors.error[100],
    fontSize: 12,
    marginTop: 5,
  },
});

export default TextAreaWithCounter;
