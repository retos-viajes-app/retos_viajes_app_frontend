// React & React Native Imports
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Style Imports
import globalStyles from '@/styles/global';

// Utility Imports
import { Colors } from '@/constants/Colors';
import { useTranslation } from 'react-i18next';
import { Clock, UserRoundPlus } from 'lucide-react-native';

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
                { backgroundColor: Colors.colors.background.hover },
              ]}
              onPress={onCancelRequest}
            >
              <>
                <Clock  strokeWidth={2.5} size={16} color={Colors.colors.text.secondary} />
                <Text
                  style={[
                    globalStyles.mediumBodySemiBold,
                    {color: Colors.colors.text.secondary},
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
                { backgroundColor: Colors.colors.backgroundButton.secondary },
              ]}
              onPress={onConnect}
            >
                <>
                  <UserRoundPlus 
                    strokeWidth={2.5}
                    size={16}
                    color={Colors.colors.primary[500]}
                  />
                  <Text
                    style={[
                      globalStyles.mediumBodySemiBold, {color: Colors.colors.primary[500]},
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
