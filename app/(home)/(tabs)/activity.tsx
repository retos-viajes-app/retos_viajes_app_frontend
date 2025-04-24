// React & React Native Imports
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";

// Component Imports
import ConnectUsers from "@/components/SuggestedUsers";
import { LoadingScreen } from "@/components/LoadingScreen";
import CompletedChallengePost from "@/components/activity/CompletedChallengePost";

// Hook Imports
import { useAuth } from "@/hooks/useAuth";

// Style Imports
import globalStyles from "@/styles/global";

// Utility Imports
import { Colors } from "@/constants/Colors";
import { getSuggestedCompletedChallenges } from "@/services/completedChallengesService";

// Icon Imports
import { BellDot } from 'lucide-react-native';

// Model Imports
import { CompletedChallenge } from "@/models/completedChallenge";



export default function ActivityScreen() {
  const [completedChallengesPosts, setCompletedChallengesPosts] = useState<CompletedChallenge[]>([]);
  const { user} = useAuth();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchCompletedChallengesPosts = async (currentPage: number) => {
      if ((loading && currentPage > 1) || !hasMore) return;
      setLoading(true);
      try {
          const response = await getSuggestedCompletedChallenges(currentPage);
          setCompletedChallengesPosts((prevCompletedChallengesPosts: CompletedChallenge[]) =>
              currentPage === 1 ? response.completed_challenges : [...prevCompletedChallengesPosts, ...response.completed_challenges]
          );
          setHasMore(response.pagination.has_more);
          setError(null);
      } catch (error) {
          setError("No se pudieron cargar publicaciones");
      } finally {
          setLoading(false);
          setInitialLoading(false);
      }
  };

  useEffect(() => {
      fetchCompletedChallengesPosts(1);
  }, []);

  const handleLoadMore = () => {
      if (!loading && hasMore) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchCompletedChallengesPosts(nextPage);
      }
  };
  const handleLike = async (completedChallengeId : number) => {
      console.log("Like");
  }
  const renderItem = ({ item }: { item: CompletedChallenge}) => (
      <View style={{paddingHorizontal: 16}}>
          <CompletedChallengePost
              completedChallenge={item}
              onLikePress={() => item.id && handleLike(item.id)}
          /> 
      </View>
  );

  return user ? (
    <FlatList
      data={completedChallengesPosts}
      style={styles.container}
      renderItem={renderItem}
      keyExtractor={(item) => item.id!.toString()}
      showsVerticalScrollIndicator={false}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <>
          <View style={styles.headerContainer}>
            <Text
              style={[globalStyles.title, { color: Colors.colors.gray[500] }]}
            >
              No te pierdas nada
            </Text>
            <TouchableOpacity style={styles.notificationButton}>
              <BellDot
                strokeWidth={2}
                size={24}
                color={Colors.colors.primary[100]}
              />
            </TouchableOpacity>
          </View>
          <ConnectUsers />
          <View style={{ marginBottom: 16 }} />
        </>
      }
      ListFooterComponent={
        loading && !initialLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={"#0066CC"} />
          </View>
        ) : null
      }
    />
  ) : (
    <LoadingScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 0,
    paddingVertical: 24,
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