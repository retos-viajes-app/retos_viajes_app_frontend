// React & React Native Imports
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Style Imports
import globalStyles from '@/styles/global';

// Utility Imports
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

// Icon Imports
//import { UserPlus,Clock } from 'lucide-react-native';

interface ButtonProps {
    connectionStatus: string;
    onConnect: () => void;
    onCancelRequest: () => void;
}

const ConnectButton: React.FC<ButtonProps> = ({ connectionStatus, onConnect, onCancelRequest}) => {
  const  { t } = useTranslation();
  return connectionStatus === "pending" ? (
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: Colors.colors.gray[100] },
              ]}
              onPress={onCancelRequest}
            >
              <>
                {/* <Clock  strokeWidth={3} size={16} color={Colors.colors.gray[400]} /> */}
                <Feather name="clock" size={16} color={Colors.colors.gray[400]} />
                <Text
                  style={[
                    globalStyles.mediumBodySemiBold,
                  ]}
                >
                  {t("suggestedUsers.pending")}
                </Text>
              </>
              
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: Colors.colors.primary[400] },
              ]}
              onPress={onConnect}
            >
                <>
                  {/* <UserPlus 
                    strokeWidth={3}
                    size={16}
                    color={Colors.colors.primary[100]}
                  /> */}
                  <Feather name="user-plus" size={16} color={Colors.colors.primary[100]} />
                  <Text
                    style={[
                      globalStyles.mediumBodySemiBold, {color: Colors.colors.primary[100]},
                    ]}
                  >
                    {t("suggestedUsers.connect")}
                  </Text>
                </>
            </TouchableOpacity>
          )
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 4, // Espacio entre el icono y el texto
  },
});

export default ConnectButton;
