import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  getUserFollowers,
  getUserFollowing,
  followUser,
} from "../../../api/follow"; // Adjust the import path as needed
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { getAuth } from "firebase/auth";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const FriendsScreen = () => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [activeTab, setActiveTab] = useState("Followers");
  const { uid } = useLocalSearchParams();
  const auth = getAuth();

  useEffect(() => {
    if (activeTab === "Followers") {
      fetchFollowers();
    } else {
      fetchFollowing();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFollowers = async () => {
    try {
      if (typeof uid === "string") {
        const followersList = await getUserFollowers(uid);
        setFollowers(followersList);
      } else {
        console.error("Invalid uid:", uid);
      }
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  const fetchFollowing = async () => {
    try {
      if (typeof uid === "string") {
        const followingList = await getUserFollowing(uid);
        setFollowing(followingList);
      } else {
        console.error("Invalid uid:", uid);
      }
    } catch (error) {
      console.error("Error fetching following:", error);
    }
  };

  const handleFollow = async (followerId: string) => {
    try {
      await followUser(followerId);
      // Update the UI to reflect the new follow status
      // This might involve refetching the followers list or updating the local state
    } catch (error) {
      console.error("Error following user:", error);
    }
  };
  const renderFollowItem = ({
    item,
  }: {
    item: {
      id: string;
      photoURL: string;
      name: string;
      following: number;
      followers: number;
    };
  }) => (
    <View style={styles.followerItem}>
      {item.photoURL ? (
        <Image
          source={{ uri: item.photoURL }}
          placeholder={blurhash}
          contentFit={"cover"}
          style={styles.avatar}
        />
      ) : (
        <Image
          source={{ blurhash }}
          contentFit={"cover"}
          style={styles.avatar}
        />
      )}
      <Image source={{ uri: item.photoURL }} style={styles.avatar} />
      <View style={styles.followerInfo}>
        <Text style={styles.followerName}>{item.name}</Text>
        <Text style={styles.followerStats}>
          {item.following} Following | {item.followers} Followers
        </Text>
      </View>
      <TouchableOpacity
        style={styles.followButton}
        onPress={() => handleFollow(item.id)}
      >
        <Text style={styles.followButtonText}>+ Follow</Text>
      </TouchableOpacity>
    </View>
  );

  const isOwnProfile = auth.currentUser ? true : false;
  const displayName = isOwnProfile ? `${auth.currentUser?.displayName}` : "User";

  const renderContent = () => {
    if (isOwnProfile && followers.length === 0 && activeTab === "Followers") {
      return (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateTitle}>No Followers Yet 😊</Text>
          <Text style={styles.emptyStateText}>
            It looks like you don't have any followers at the moment. Start connecting with others to grow your network!
          </Text>
          <TouchableOpacity style={styles.addFriendsButton}>
            <Text style={styles.addFriendsButtonText}>+ Add Friends</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      const data = activeTab === "Followers" ? followers : following;
      return data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderFollowItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateTitle}>Be the first to follow!</Text>
          <Text style={styles.emptyStateText}>
            {displayName} is just getting started on this platform. Be the first to show your support and follow our account.
          </Text>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>+ Follow</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jane's Friends</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Followers" && styles.activeTab]}
          onPress={() => setActiveTab("Followers")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Followers" && styles.activeTabText,
            ]}
          >
            Followers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Following" && styles.activeTab]}
          onPress={() => setActiveTab("Following")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Following" && styles.activeTabText,
            ]}
          >
            Following
          </Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "green",
  },
  tabText: {
    fontSize: 16,
    color: "#888",
  },
  activeTabText: {
    color: "green",
    fontWeight: "bold",
  },
  followerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  followerInfo: {
    flex: 1,
  },
  followerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  followerStats: {
    fontSize: 14,
    color: "#888",
  },
  followButton: {
    backgroundColor: "green",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  followButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  addFriendsButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addFriendsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

});

export default FriendsScreen;
