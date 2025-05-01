// React & React Native Imports
import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

// Component Imports
import { LoadingScreen } from "@/components/LoadingScreen";
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
import { AuthContext } from "@/context/AuthContext";


export default  function RegisterScreen() {
  const { user } = useAuth();
  const { finishRegister } = useContext(AuthContext)!;
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const isValid = validateForm({ name, username, bio });
    if (!isValid){
      setLoading(false);
      return;
    }

    const { success, error } = await finishRegister(username, bio, name);

    if (!success) {
      setErrorMessage(error || "Hubo un problema al guardar el perfil.");
      setLoading(false);
      return;
    }

    router.replace("/"); // Redirige después de un registro exitoso
    setLoading(false);
  };

  

  return user ? (
    loading?<LoadingScreen />:
    <>
      <PaddingView>
        <ViewContentContinue>
          <ViewForm>
            <TitleParagraph
              title="!Dale personalidad a tu perfil"
              paragraph="Completa tu información para personalizar tu experiencia y contectarte con otros viajeros."
            />

            {/* Profile Picture Section */}
            <TouchableOpacity style={styles.imagePickerButton}>
              <Image
                style={styles.profileImage}
                source={require("@/assets/images/profile-placeholder.png")}
              />
            </TouchableOpacity>
            <ViewInputs>
              {/* Nombre Input */}
              <StyledTextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Nombre Completo"
                value={name}
                onChangeText={setName}
                errorMessage={errors.name}
              />
              <StyledTextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Nombre de usuario"
                errorMessage={errors.username}
              />
              <TextAreaWithCounter
                bio={bio}
                setBio={setBio}
                errorMessage={errors.bio}
              />

              {errorMessage ? <ErrorText text={errorMessage} /> : null}
            </ViewInputs>
          </ViewForm>
          {/* Save Button */}
          <PrimaryButton title="Continuar" onPress={handleSaveProfile} />
        </ViewContentContinue>
      </PaddingView>
    </>
  ) : <LoadingScreen />;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
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
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 60,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
  },
  bioInput: {
    height: 80,
  },
  saveButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  error: { color: "red", marginBottom: 10 },
});


