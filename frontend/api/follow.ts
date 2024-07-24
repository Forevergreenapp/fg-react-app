import {
  getFirestore,
  doc,
  getDoc,
  arrayUnion,
  arrayRemove,
  increment,
  runTransaction,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Follow a user
export const followUser = async (targetUserId: string) => {
  const db = getFirestore();
  const auth = getAuth();

  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("No user logged in");
  }

  const currentUserId = currentUser.uid;
  const currentUserRef = doc(db, "users", currentUserId);
  const targetUserRef = doc(db, "users", targetUserId);

  try {
    await runTransaction(db, async (transaction) => {
      const currentUserDoc = await transaction.get(currentUserRef);
      const targetUserDoc = await transaction.get(targetUserRef);

      if (!currentUserDoc.exists() || !targetUserDoc.exists()) {
        throw new Error("User document not found");
      }

      const currentUserFollowing = currentUserDoc.data()?.following || [];

      if (!currentUserFollowing.includes(targetUserId)) {
        transaction.update(currentUserRef, {
          following: arrayUnion(targetUserId),
          followingCount: increment(1),
        });

        transaction.update(targetUserRef, {
          followers: arrayUnion(currentUserId),
          followerCount: increment(1),
        });
      }
    });

    console.log("Successfully followed user");
  } catch (error) {
    console.error("Error following user:", error);
    throw error;
  }
};

// Unfollow a user
export const unfollowUser = async (targetUserId: string) => {
  const db = getFirestore();
  const auth = getAuth();

  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("No user logged in");
  }

  const currentUserId = currentUser.uid;
  const currentUserRef = doc(db, "users", currentUserId);
  const targetUserRef = doc(db, "users", targetUserId);

  try {
    await runTransaction(db, async (transaction) => {
      const currentUserDoc = await transaction.get(currentUserRef);
      const targetUserDoc = await transaction.get(targetUserRef);

      if (!currentUserDoc.exists() || !targetUserDoc.exists()) {
        throw new Error("User document not found");
      }

      transaction.update(currentUserRef, {
        following: arrayRemove(targetUserId),
        followingCount: increment(-1),
      });

      transaction.update(targetUserRef, {
        followers: arrayRemove(currentUserId),
        followerCount: increment(-1),
      });
    });

    console.log("Successfully unfollowed user");
  } catch (error) {
    console.error("Error unfollowing user:", error);
    throw error;
  }
};

// Get a user's follower and following counts
export const getUserFollowCounts = async (userId: string) => {
  const db = getFirestore();

  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const { followerCount, followingCount } = userDoc.data();
      return { followerCount, followingCount };
    }
    throw new Error("User not found");
  } catch (error) {
    console.error("Error getting user follow counts:", error);
    return null;
  }
};

// Get a user's followers
export const getUserFollowers = async (userId: string) => {
  const db = getFirestore();

  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const { followers } = userDoc.data();
      return followers;
    }
    throw new Error("User not found");
  } catch (error) {
    console.error("Error getting user followers:", error);
    return null;
  }
};

// Get a user's following
export const getUserFollowing = async (userId: string) => {
  const db = getFirestore();

  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const { following } = userDoc.data();
      return following;
    }
    throw new Error("User not found");
  } catch (error) {
    console.error("Error getting user following:", error);
    return null;
  }
};
