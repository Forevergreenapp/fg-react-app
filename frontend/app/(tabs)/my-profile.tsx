import { router, Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Image } from "expo-image";
import { LineChartBreakdown } from "../../components/breakdown";
import { getUserFollowCounts } from '../../api/follow';

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const MyProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const [followCounts, setFollowCounts] = useState({ followerCount: 0, followingCount: 0 });
  const auth = getAuth();
  const profileIcon = auth.currentUser?.photoURL;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchFollowCounts(currentUser.uid);
      } else {
        router.replace("/login");
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFollowCounts = async (userId: string) => {
    try {
      const counts = await getUserFollowCounts(userId);
      if (counts) {
        setFollowCounts(counts);
      }
    } catch (error) {
      console.error("Error fetching follow counts:", error);
      // Might want to show an error message to the user here
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate("/notifications")}>
          <Icon name={"bell"} size={40} style={styles.icon} />
          <View style={styles.indicator} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.navigate("/settings")}>
          <Icon name={"gear"} size={40} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.profile}>
        {/* <ProfileIcon /> */}
        {profileIcon ? (
          <Image
            source={profileIcon}
            placeholder={blurhash}
            contentFit={"cover"}
            style={styles.avatar}
          />
        ) : (
          <Icon name={"user"} style={styles.avatar} />
        )}
        <Text style={styles.name}>{user?.displayName || "Guest"}</Text>
        <View style={styles.followInfo}>
          <Link
            href={{
              pathname: "/friends/[uid]",
              params: { uid: user?.uid },
            }}
            asChild
          >
            <TouchableOpacity style={styles.followData}>
              <Text style={{ fontSize: 24 }}>{followCounts.followerCount}</Text>
              <Text style={{ fontSize: 24 }}>Followers</Text>
            </TouchableOpacity>
          </Link>
          <Link
            style={styles.followData}
            href={{
              pathname: "/friends/[uid]",
              params: { uid: user?.uid },
            }}
            asChild
          >
            <TouchableOpacity style={styles.followData}>
              <Text style={{ fontSize: 24 }}>{followCounts.followingCount}</Text>
              <Text style={{ fontSize: 24 }}>Following</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={styles.horizontalLine}></View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: "#fff", fontSize: 24 }}>+ Add Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: "#fff", fontSize: 24 }}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.breakdown}>
        <Text style={{ fontSize: 28, textAlign: "center", marginBottom: 16 }}>
          Your net-zero journey
        </Text>
        <LineChartBreakdown />
        <TouchableOpacity
          style={[styles.button, { marginHorizontal: "auto" }]}
          onPress={() => router.navigate("/offset-now")}
        >
          <Text style={{ color: "#fff", fontSize: 24, textAlign: "center" }}>
            Offset Now!
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 48,
    paddingHorizontal: 36,
  },
  icon: {
    width: 40,
    height: 40,
  },
  indicator: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#FF0000",
    width: 16,
    height: 16,
    borderRadius: 9999,
  },
  profile: {
    alignItems: "center",
  },
  avatar: {
    width: 192,
    height: 192,
    borderRadius: 9999,
  },
  name: {
    marginTop: 16,
    fontSize: 40,
    fontWeight: "bold",
  },
  followInfo: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    width: "100%",
  },
  followData: {
    flexDirection: "column",
    alignItems: "center",
  },
  horizontalLine: {
    marginTop: 20,
    width: 50,
    borderBottomColor: "#000",
    borderBottomWidth: 2,
  },
  buttons: {
    marginTop: 20,
    flexDirection: "row",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
    backgroundColor: "#409858",
    borderRadius: 50,
    color: "#fff",
  },
  breakdown: {
    marginVertical: 20,
    marginHorizontal: "auto",
    backgroundColor: "#EEEEEE",
    borderRadius: 18,
    padding: 16,
  },
});

export default MyProfileScreen;
