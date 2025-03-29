import { CompletedChallenge } from "@/models/completedChallenge";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constants/ColoresPropios";
import globalStyles from "@/styles/global";

interface CompletedChallengePostProps {
  completedChallenge : CompletedChallenge
  onLikePress?: () => void;
}

const CompletedChallengePost: React.FC<CompletedChallengePostProps> = ({
  completedChallenge,
  onLikePress,
}) => {
  return (
    <View style={styles.container}>
      {/* Header section with profile photo, username and mission completed text */}
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
              style={
                [globalStyles.mediumBodyRegular,{ color: Colors.colors.gray[500] },]
              }
            >
              ha completado una misión
            </Text>
          </View>
        </View>
        <Text
          style={
            [globalStyles.smallBodyRegular, { color: Colors.colors.gray[400] }]
          }
        >
          {completedChallenge.completed_at?.toDateString()}
        </Text>
      </View>

      {/* Post content section */}
      <View style={styles.contentContainer}>
        {/* Challenge image */}
        <Image
          source={{
            uri:
              completedChallenge.proof_photo_url ||
              "https://media-cdn.tripadvisor.com/media/photo-s/0a/79/b3/86/helado-de-la-gelateria.jpg",
          }}
          style={styles.postImage}
        />

        {/* Likes section */}
        <View style={styles.likesContainer}>
          <TouchableOpacity onPress={onLikePress}>
            <Feather
              name="heart"
              size={16}
              color={Colors.colors.error[100]}
            />
          </TouchableOpacity>
          <Text
            style={ 
                [ globalStyles.mediumBodyRegular, { color: Colors.colors.gray[500] },]
            }
          >
            Le gusta a{" "}
            <Text
              style={
                [globalStyles.mediumBodySemiBold, { color: Colors.colors.gray[500] },]
              }
            >
              7 viajeros
            </Text>
          </Text>
        </View>

        {/* Challenge title and location */}
        <View style={styles.challengeTitleContainer}>
          <Text
            style={[globalStyles.largeBodySemiBold, { color: Colors.colors.gray[500] },]}
          >
            {completedChallenge.challenge?.title}
          </Text>
          <View style={styles.locationContainer}>
            <Feather name="map-pin" size={16} color={Colors.colors.gray[500]} />
            <Text
              style={[globalStyles.mediumBodyRegular,{ color: Colors.colors.gray[500] },]}
            >
              {/*Hay que poner mediumBody/medium*/}
              {completedChallenge.challenge?.destination?.city}
            </Text>
          </View>
        </View>

        {/* Comment */}
        <Text
          style={[globalStyles.mediumBodyRegular, { color: Colors.colors.gray[500] },]}
        >
          {completedChallenge.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  headerContainer: {
    width: "100%",
    height: "auto",
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
    borderRadius: 50,
  },
  contentContainer: {
    width: "100%",
    height: "auto",
    gap: 8,
  },
  postImage: {
    width: "100%",
    height: 358,
    borderRadius: 8,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  challengeTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: Colors.colors.gray[100],
    borderRadius: 8,
  },
});

export default CompletedChallengePost;
