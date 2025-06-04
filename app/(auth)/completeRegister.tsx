// React & React Native Imports
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

// Component Imports
import PrimaryButton from "@/components/buttons/PrimaryButton";
import TextAreaWithCounter from "@/components/forms/TextAreaWithCounter";
import StyledTextInput from "@/components/forms/StyledTextInput";
import ErrorText from "@/components/text/ErrorText";
import TitleParagraph from "@/components/text/TitleParagraph";
import ViewForm from "@/components/views/ViewInputs";
import ViewInputs from "@/components/views/ViewInputs";
import ViewContentContinue from "@/components/views/ViewForContinueButton";
import PaddingView from "@/components/views/PaddingView";

// Hook Imports
import { useAuth } from "@/hooks/useAuth";
import { useFormValidation } from "@/hooks/useFormValidation";


// Utility Imports
import { validations } from "@/utils/validations";
import { useTranslation } from "react-i18next";


export default  function RegisterScreen() {
  const { user, finishRegister } = useAuth();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { errors, validateForm } = useFormValidation({
    name: validations.name,
    username: validations.username,
    bio: validations.bio,
  });
  useEffect(() => {
    if (
      user?.is_verified && user.verification_type == "register"
    ) {
      Toast.show({
        type: "success",
        text1: "Email verificado",
        text2: "Completa tu perfil",
        position: "bottom",
        bottomOffset: 80,
      });
    }
  }, []);

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

    router.replace("/main"); // Redirigir a la pantalla de destinos
    setLoading(false);
  };

  return (
    <>
      <PaddingView>
        <ViewContentContinue>
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
                style={styles.input}
                placeholder={t("auth.completeRegister.name")}
                value={name}
                onChangeText={setName}
                errorMessage={errors.name}
              />
              <StyledTextInput
                style={styles.input}
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
          {/* Save Button */}
          <PrimaryButton 
            title={t("continue")}
            onPress={handleSaveProfile}
            loading={loading}
          />
        </ViewContentContinue>
      </PaddingView>
    </>
  );
};
const styles = StyleSheet.create({
  imagePickerButton: {
    alignSelf: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 60,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
  },
});


