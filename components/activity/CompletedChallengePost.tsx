// React & React Native Imports
import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Easing, TouchableWithoutFeedback } from "react-native";
import { Trans, useTranslation } from "react-i18next";

// Style Imports
import globalStyles from "@/styles/global";

// Utility Imports
import { Colors } from "@/constants/Colors";


// Icon Imports
import Feather from "@expo/vector-icons/Feather";
import { Ionicons } from "@expo/vector-icons";

// Model Imports
import { CompletedChallenge } from "@/models/completedChallenge";

// Hooks imports
import { useTimeAgo } from "@/hooks/useTimeAgo";

interface CompletedChallengePostProps {
  completedChallenge : CompletedChallenge
  onLikePress: () => void;
}

const DOUBLE_TAP_DELAY = 300;

const CompletedChallengePost: React.FC<CompletedChallengePostProps> = ({
  completedChallenge,
  onLikePress,
}) => {
  const getTimeAgoString = useTimeAgo();
  const timeAgo = completedChallenge.completed_at ? getTimeAgoString(completedChallenge.completed_at) : "";
  const { t } = useTranslation();
  const [showHeartOverlay, setShowHeartOverlay] = useState(false);
  const heartAnimation = useRef(new Animated.Value(0)).current;
  const [isLiked, setIsLiked] = useState(completedChallenge.is_liked_by_me);
  
  const lastTap = useRef<number | null>(null);

  useEffect(() => {
    setIsLiked(completedChallenge.is_liked_by_me);
  }, [completedChallenge.is_liked_by_me]);
  

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap.current && (now - lastTap.current) < DOUBLE_TAP_DELAY) {
      if (!isLiked) {
        onLikePress();
      }
      triggerHeartAnimation();
      lastTap.current = null; 
    } else {
      lastTap.current = now;
    }
  };

  const triggerHeartAnimation = () => {
    setShowHeartOverlay(true);
    heartAnimation.setValue(0.8);
    Animated.sequence([
      Animated.spring(heartAnimation, {
        toValue: 1.2,
        friction: 4,  
        tension: 120,
        useNativeDriver: true,
      }),
      Animated.timing(heartAnimation, {
        toValue: 1.05, 
        duration: 100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(heartAnimation, {
        toValue: 0,
        duration: 200,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setShowHeartOverlay(false);
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.headerContainer}>
        <View style={styles.userInfoContainer}>
          <Image
            source={{
              uri:
                completedChallenge.user?.profile_photo_url ||
                "https://thumbs.dreamstime.com/b/imagen-del-placeholder-perfil-silueta-gris-ninguna-foto-127393523.jpg",
            }}
            style={styles.profileImage}
          />
          <View>
            <Text
              style={[
                globalStyles.mediumBodyBold,
                { color: Colors.colors.primary[100] },
              ]}
            >
              {completedChallenge.user?.username}
            </Text>
            <Text
              style={[
                globalStyles.mediumBodyRegular,
                { color: Colors.colors.text.primary },
              ]}
            >
              {t("activity.posts.completedAMission")}
            </Text>
          </View>
        </View>
        <Text
          style={[
            globalStyles.smallBodyRegular,
            { color: Colors.colors.text.secondary },
          ]}
        >
          {timeAgo}
        </Text>
      </View>

      {/* Post content section */}
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <TouchableWithoutFeedback onPress={handleDoubleTap}>
            <View style={{ width: '100%', height: '100%'}}> 
              <Image
                source={{
                  uri:
                    completedChallenge.proof_photo_url ||
                    "https://media-cdn.tripadvisor.com/media/photo-s/0a/79/b3/86/helado-de-la-gelateria.jpg",
                }}
                style={styles.postImage}
              />
            </View>
          </TouchableWithoutFeedback>

          {showHeartOverlay && (
             <Animated.View
              style={[
                styles.heartOverlay,
                {
                  opacity: heartAnimation.interpolate({
                    inputRange: [0, 0.8, 1, 1.2],
                    outputRange: [0, 1, 1, 1],
                  }),
                  transform: [{scale: heartAnimation,},],
                },
              ]}
              pointerEvents="none" 
            >
             <Ionicons name="heart" size={80} color="white" />
            </Animated.View>
          )}
        </View>

        {/* Likes section */}
        <View style={styles.likesContainer}>
          <TouchableOpacity onPress={onLikePress} style={styles.likeButton}>
            {completedChallenge.is_liked_by_me
              ? <Ionicons name="heart" size={24} color={Colors.colors.error[500]} /> 
              : <Ionicons name="heart-outline" size={24} color={Colors.colors.text.primary} />
            }
          </TouchableOpacity>
          <Text style={[globalStyles.mediumBodyRegular,{ color: Colors.colors.text.primary },]}>
            <Trans
              i18nKey="activity.posts.likesText"
              count={completedChallenge.likes_count || 0}
              components={{
                bold: <Text style={[globalStyles.mediumBodySemiBold, { color: Colors.colors.text.primary }]} />,
              }}
            />
          </Text>
        </View>

        {/* Challenge title and location */}
        <View style={styles.challengeTitleContainer}>
          <Text
            style={[globalStyles.largeBodySemiBold,{ color: Colors.colors.text.primary },]}
            numberOfLines={1}
          >
            {completedChallenge.challenge?.title}
          </Text>
          <View style={styles.locationContainer}>
            <Feather name="map-pin" size={16} color={Colors.colors.text.primary} />
            <Text
              style={[
                globalStyles.mediumBodyRegular,
                { color: Colors.colors.text.primary },
              ]}
              numberOfLines={1}
            >
              {completedChallenge.challenge?.destination?.city}
            </Text>
          </View>
        </View>

        {/* Comment */}
        {completedChallenge.description && (
          <Text
            style={[ globalStyles.mediumBodyRegular, { color: Colors.colors.text.primary },]}
            numberOfLines={2}
          >
            {completedChallenge.description}
          </Text>
        )}
      </View>
    </View>
  );
};
export default CompletedChallengePost;

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  contentContainer: {
    width: "100%",
    gap: 10, 
  },
   imageContainer: {
    position: 'relative',
    width: "100%",
    height: 358, 
    borderRadius: 8,
    overflow: 'hidden', 
  },
  postImage: {
    width: "100%",
    height: "100%",
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 4,
  },
  likeButton: {
    padding: 4,
  },
  challengeTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: Colors.colors.background.default,
    borderRadius: 8,
    flexShrink: 1,
  },
  heartOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});