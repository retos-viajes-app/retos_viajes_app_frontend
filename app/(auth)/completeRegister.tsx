// React & React Native Imports
import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

// Component Imports
import PrimaryButton from "@/components/buttons/PrimaryButton";
import TextAreaWithCounter from "@/components/forms/TextAreaWithCounter";
import StyledTextInput from "@/components/forms/StyledTextInput";
import ErrorText from "@/components/text/ErrorText";
import TitleParagraph from "@/components/text/TitleParagraph"
import ViewInputs from "@/components/views/ViewInputs";
import ViewContentContinue from "@/components/views/ViewForContinueButton";
import PaddingView from "@/components/views/PaddingView";

// Hook Imports
import { useAuth } from "@/hooks/useAuth";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useValidations } from "@/hooks/useValidations";

// Utility Imports

import { useTranslation } from "react-i18next";
import ViewForm from "@/components/views/ViewForm";



export default  function RegisterScreen() {
  const { finishRegister } = useAuth();
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const validations = useValidations();
  
  const { errors, validateForm } = useFormValidation({
    name: validations.name,
    username: validations.username,
    bio: validations.bio,
  });

  const handleSaveProfile = async () => {
    setErrorMessage("");
    const isValid = validateForm({ name, username, bio });
    if (!isValid) return;

    const { success, error } = await finishRegister(username, bio, name);

    if (!success) {
      setErrorMessage(error);
      setLoading(false);
      return;
    }
    Toast.show({type: "success", text1: "XPerfil Completado",});
    router.replace("/main");
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 68 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
        <ScrollView
           contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <PaddingView>
              <ViewForm>
                <TitleParagraph
                  title={t("auth.completeRegister.title")}
                  paragraph={t("auth.completeRegister.paragraph")}
                />

                {/* Profile Picture Section */}
                <TouchableOpacity style={styles.imagePickerButton}>
                  <Image
                    style={styles.profileImage}
                    source={require("@/assets/images/profile-placeholder.png")}
                  />
                </TouchableOpacity>
                {errorMessage ? <ErrorText text={errorMessage} /> : null}
                <ViewInputs>
                  {/* Nombre Input */}
                  <StyledTextInput
                    placeholder={t("auth.completeRegister.name")}
                    value={name}
                    onChangeText={setName}
                    errorMessage={errors.name}
                  />
                  <StyledTextInput
                    value={username}
                    autoCapitalize="none"
                    onChangeText={setUsername}
                    placeholder={t("auth.completeRegister.username")}
                    errorMessage={errors.username}
                  />
                  <TextAreaWithCounter
                    bio={bio}
                    setBio={setBio}
                    errorMessage={errors.bio}
                  />
                </ViewInputs>
              </ViewForm>
          </PaddingView>
        </ScrollView>
        <View style={styles.buttonWrapper}>
          <PrimaryButton
            title={t("continue")}
            onPress={handleSaveProfile}
            loading={loading}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  scrollContent: {
    //padding: 16,
    paddingBottom: 80,
    flexGrow: 1,
  },
  buttonWrapper: {
    paddingHorizontal: 16,
  },
  imagePickerButton: {
    alignSelf: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 60,
  },

});


