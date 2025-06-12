// React & React Native Imports
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from "react-native";

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
//import { BellDot } from 'lucide-react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Model Imports
import { CompletedChallenge } from "@/models/completedChallenge";
import { useRouter } from "expo-router";
import { useSuggestedUsers } from "@/hooks/useSuggestedUsers";
import { useTranslation } from "react-i18next";
import ErrorText from "@/components/text/ErrorText";



export default function ActivityScreen() {
  const [completedChallengesPosts, setCompletedChallengesPosts] = useState<CompletedChallenge[]>([]);
  const { pendingConnectionRequests, refreshSuggestedUsers } = useSuggestedUsers();
  const { user} = useAuth();
  
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isPaginating, setIsPaginating] = useState(false);

  
  
  const [paginationError, setPaginationError] = useState<string | null>(null);
  const [initialError, setInitialError] = useState<string | null>(null);

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  const fetchCompletedChallengesPosts = async (currentPage: number, isRefresh: boolean = false) => {
      if ((isPaginating && !isRefresh) || (!hasMore && !isRefresh && currentPage > 1)){
        if(isRefresh) setRefreshing(false);
        return
      }
      if (currentPage === 1) {
        if (!isRefresh) setInitialLoading(true);
        setInitialError(null);
      } else {
        setIsPaginating(true);
        setPaginationError(null);
      }
      try {
          const response = await getSuggestedCompletedChallenges(currentPage);
          setCompletedChallengesPosts((prevCompletedChallengesPosts: CompletedChallenge[]) =>
              currentPage === 1 ? response.completed_challenges : [...prevCompletedChallengesPosts, ...response.completed_challenges]
          );
          setHasMore(response.pagination.has_more);
          if (currentPage === 1) setPage(1);
      } catch (error) {
          const errorMessage = t("activity.errorLoadingPosts");
          if (currentPage > 1) {
            setPaginationError(errorMessage);
          } else {
            setInitialError(errorMessage);
            setHasMore(false)
          }
      } finally {
        if (currentPage === 1) setInitialLoading(false);
        else setIsPaginating(false);
        if (isRefresh) setRefreshing(false)
      }
  };

  useEffect(() => {
      fetchCompletedChallengesPosts(1);
  }, []);

   const handleLoadMore = () => {
    if (!isPaginating && hasMore && !refreshing && !initialLoading && !paginationError) {
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
  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    setPaginationError(null);
    setInitialError(null);
    await Promise.all([
      fetchCompletedChallengesPosts(1, true),
      refreshSuggestedUsers(),
    ]);
  };

   const handleRetryInitialLoad = () => {
    setInitialError(null);
    setHasMore(true);
    fetchCompletedChallengesPosts(1);
  }

   const renderListFooter = () => {
    if(initialLoading || initialError) return null;
    if (isPaginating) {
      return (
        <View style={styles.footerLoaderContainer}>
          <ActivityIndicator size="small" color={Colors.colors.primary[300]} />
          <Text style={styles.footerText}>{t("activity.loadingMore")}</Text>
        </View>
      );
    }
    if (paginationError && !isPaginating) {
      return (
        <View style={styles.footerErrorContainer}>
          <Text style={styles.footerErrorText}>{paginationError}</Text>
          <TouchableOpacity onPress={() => fetchCompletedChallengesPosts(page)} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>{t("retry")}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (!hasMore && !paginationError && !isPaginating && completedChallengesPosts.length > 0) {
      return (
        <View style={styles.footerMessageContainer}>
          <Text style={styles.footerText}>{t("activity.noMorePosts")}</Text>
        </View>
      );
    }
    return null;
  };

  const renderInitialContentArea = () => {
    if (initialLoading && !refreshing) { 
      return (
        <View style={styles.initialContentFeedbackContainer}>
          <ActivityIndicator size="large" color={Colors.colors.primary[300]} />
          <Text style={[styles.initialContentFeedbackText, { marginTop: 8 }]}>{t("activity.loadingPosts")}</Text>
        </View>
      );
    }
    if (initialError && !initialLoading && completedChallengesPosts.length === 0) {
      return (
        <View style={styles.initialContentFeedbackContainer}>
          <MaterialCommunityIcons name="alert-circle-outline" size={48} color={Colors.colors.error[200]} />
          <Text style={[styles.initialContentFeedbackText, styles.errorText]}>{initialError}</Text>
          <TouchableOpacity onPress={() => fetchCompletedChallengesPosts(1)} style={[styles.retryButton, {marginTop: 16}]}>
            <Text style={styles.retryButtonText}>{t("retry")}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (!initialLoading && !initialError && completedChallengesPosts.length === 0) {
      return (
        <View style={styles.initialContentFeedbackContainer}>
           <MaterialCommunityIcons name="format-list-bulleted" size={48} color={Colors.colors.gray[400]} />
          <Text style={styles.initialContentFeedbackText}>{t("activity.noPostsYet")}</Text>
        </View>
      );
    }
    return null;
  };

  if (initialLoading && !refreshing) {
    return <LoadingScreen />;
  }


  return user ? (
    <FlatList
      data={completedChallengesPosts}
      style={styles.container}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 100, flexGrow: 1  }} 
      keyExtractor={(item) => item.id!.toString()}
      showsVerticalScrollIndicator={false}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh}
          colors={[Colors.colors.primary[300]]} // Android
          tintColor={Colors.colors.primary[300]} // iOS
        />
      }
      ListHeaderComponent={
        <>
          <View style={styles.headerContainer}>
            <Text
              style={[globalStyles.title, { color: Colors.colors.gray[500] }]}
            >
             {t("activity.notificationsTitle")}
            </Text>
            <TouchableOpacity style={styles.notificationButton} onPress={() => router.push('/(tabs)/activity/notifications' as any)}>
              <MaterialCommunityIcons
                name="bell-alert"
                size={24}
                color={Colors.colors.primary[100]}
              />
               {pendingConnectionRequests.length > 0 && (
                <View style={styles.notificationDot} />
              )}
            </TouchableOpacity>
          </View>
          <ConnectUsers />
          {(!initialLoading && !initialError && completedChallengesPosts.length > 0) ? <View style={{ marginBottom: 16 }} /> : null}
          {renderInitialContentArea()}
        </>
      }
      ListFooterComponent={renderListFooter}
    />
  ) : (
    <LoadingScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.colors.neutral[100],
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 24,
    marginBottom: 16,
  },
  notificationButton: {
    position: "relative",
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
  notificationDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 4,
    backgroundColor: Colors.colors.error[200],
    borderWidth: 1,
    borderColor: Colors.colors.neutral[100],
  },
  footerLoaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    marginLeft: 10,
    fontSize: 14,
    color: Colors.colors.gray[400],
  },
  footerMessageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerErrorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  footerErrorText: {
    fontSize: 14,
    color: Colors.colors.error[100],
    marginBottom: 10,
    textAlign: 'center'
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.colors.primary[100],
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.colors.neutral[100],
    fontWeight: 'bold',
    fontSize: 14
  },
  initialContentFeedbackContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40, // More padding as it takes significant space
    paddingHorizontal: 16,
    minHeight: 150, // Ensure it has some visible height
  },
  initialContentFeedbackText: {
    fontSize: 16,
    color: Colors.colors.gray[500],
    textAlign: 'center',
    marginTop: 12,
  },
  errorText: { // General error text styling
    color: Colors.colors.error[100], // Darker error color for text
    fontWeight: '500',
  },

});