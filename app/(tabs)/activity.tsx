import ConnectUsers from "@/components/ConnectUsers";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useAuth } from "@/hooks/useAuth";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet,Text,View,ScrollView, TouchableOpacity, FlatList,} from "react-native";
import { Colors } from "@/constants/ColoresPropios";
import globalStyles from "@/styles/global";
import { useEffect, useRef, useState } from "react";
import { CompletedChallenge } from "@/models/completedChallenge";
import { ActivityIndicator } from "react-native";


export default function ActivityScreen() {

    const [completedChallengesPosts, setCompletedChallengesPosts] = useState<CompletedChallenge[]>([]);
    const { user} = useAuth();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const flatListRef = useRef<FlatList>(null);
    const [hasMore, setHasMore] = useState(true);

    const fetchCompletedChallengesPosts = async (currentPage: number) => {
        if ((loading && currentPage > 1) || !hasMore) return;
        setLoading(true);
        /*
        try {
        const response = await getUserSuggestions(currentPage);
        const formattedUsers = response.users.map(
            (user: UserWithConnectionStatus) => ({
            ...user,
            connection_status: "none" as "none",
            })
        );
        setUsers((prevUsers: UserWithConnectionStatus[]) =>
            currentPage === 1 ? formattedUsers : [...prevUsers, ...formattedUsers]
        );
        setHasMore(response.pagination.has_more);
        setError(null);
        } catch (error) {
        setError("No se pudieron cargar los usuarios sugeridos");
        console.error("Error fetching user suggestions:", error);
        } finally {
        setLoading(false);
        setInitialLoading(false);
        }
        */
    };

    useEffect(() => {
        fetchCompletedChallengesPosts(1);
    }, []);

    const handleLoadMore = () => {
        /*
        if (!loading && hasMore) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchUsers(nextPage);
        }*/
    };
    const renderItem = ({ item }: { item: CompletedChallenge}) => (
        /*
        <CompletedChallengePost
        completedChallenge={item}
        /*onConnect={() => item.id && handleConnect(item.id)}
        onCancelRequest={() => item.id && handleCancelRequest(item.id)}*/
        // /> 
        <LoadingScreen />
    );
 
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
        <FlatList
                ref={flatListRef}
                data={completedChallengesPosts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id!.toString()}
                showsVerticalScrollIndicator={false}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListFooterComponent={
                loading && !initialLoading ? (
                    <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={"#0066CC"} />
                    </View>
                ) : null
                }
            />
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
  separator: {
    height: 24,
  },
  loaderContainer: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});