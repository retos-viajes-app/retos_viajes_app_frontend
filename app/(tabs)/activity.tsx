import ConnectUsers from "@/components/ConnectUsers";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useAuth } from "@/hooks/useAuth";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet,Text,View,ScrollView, TouchableOpacity,} from "react-native";
import { Colors } from "@/constants/ColoresPropios";
import globalStyles from "@/styles/global";


export default function ActivityScreen() {

  const { user} = useAuth();
 
  return user ? (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerContainer}>
        <Text
          style={[
            globalStyles.title,
            { color: Colors.colors.gray[500] },
          ]}
        >
          No te pierdas nada
        </Text>
        <TouchableOpacity style={styles.notificationButton}>
          <MaterialCommunityIcons
            name="bell-badge-outline"
            size={24}
            color={Colors.colors.primary[100]}
          />
        </TouchableOpacity>
      </View>

      <View>
        <ConnectUsers />
      </View>
    </ScrollView>
  ) : (
    <LoadingScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 0,
    paddingTop: 20,
    backgroundColor: Colors.colors.neutral[100],
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 50,
    backgroundColor: Colors.colors.primary[400],
    alignItems: "center",
    justifyContent: "center",
  },
});