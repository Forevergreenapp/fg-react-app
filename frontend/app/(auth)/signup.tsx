import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, useTheme } from "react-native-paper";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { router } from "expo-router";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { fetchEmissionsData } from "../../api/emissions";
import { sendWelcomeEmail } from "../../api/email";

export default function SignupScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "489135632905-iu340mh7lub0iis2q18upvus42fa2roo.apps.googleusercontent.com",
    });
  }, []);

  /* Function to sign up the user with the email and password */
  const onSignup = async () => {
    const db = getFirestore();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      if (auth.currentUser) {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        await setDoc(userDocRef, {
          name: name,
          email: email,
          photoURL: null,
          createdAt: serverTimestamp(),
          followers: [],
          following: [],
          followerCount: 0,
          followingCount: 0,
        });

        await sendWelcomeEmail(email, name);

        const data = await fetchEmissionsData();
        if (!data) {
          router.replace("/pre-survey");
        } else {
          router.replace("/home");
        }
      } else {
        throw new Error("User not authenticated");
      }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert.alert("Error", `Code: ${errorCode}\nMessage: ${errorMessage}`);
    }
  };

  const onGoogleSignUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();

      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(user.idToken);
      const userCredential = await signInWithCredential(auth, credential);

      const db = getFirestore();
      if (userCredential.user) {
        const userDocRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userDocRef, {
          name: user.user.name,
          email: user.user.email,
          photoURL: user.user.photo,
          createdAt: serverTimestamp(),
          followers: [],
          following: [],
          followerCount: 0,
          followingCount: 0,
        });

        await sendWelcomeEmail(user.user.email, name);

        // Fetch emissions data after creating the user document
        const data = await fetchEmissionsData();
        if (!data) {
          // If no data for the current month, redirect to the carbon calculator
          router.replace("/pre-survey");
        } else {
          // If data exists for the current month, redirect to home
          router.replace("/home");
        }
      } else {
        throw new Error("User not authenticated");
      }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert.alert("Error", `Code: ${errorCode}\nMessage: ${errorMessage}`);
    }
  };

  return (
    <KeyboardAvoidingView>
      <SafeAreaView className="flex-1 justify-center px-4 bg-background">
        <ScrollView>
          <Text className="text-5xl font-bold text-center tracking-tighter my-10">
            Sign <Text className="text-primary">Up</Text>
          </Text>
          <View className="items-center">
            <Image
              className="w-80 h-40"
              source={require("../../assets/images/tree-logo.png")}
            />
          </View>
          <View className="space-y-4 px-12">
            <View className="relative">
              <Text className="mb-2">Email</Text>
              <TextInput
                placeholder="Ex. abc@example.com"
                className="w-full pl-16"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                dense={true}
                outlineStyle={{ borderColor: theme.colors.onBackground }}
                theme={{ roundness: 9999 }}
                left={<TextInput.Icon icon="at" />}
              />
            </View>
            <View className="relative">
              <Text className="mt-4 mb-2">Your Name</Text>
              <TextInput
                placeholder="Ex. John Smith"
                className="w-full pl-16"
                value={name}
                onChangeText={setName}
                mode="outlined"
                dense={true}
                outlineStyle={{ borderColor: theme.colors.onBackground }}
                theme={{ roundness: 9999 }}
                left={<TextInput.Icon icon="account" />}
              />
            </View>
            <View className="relative">
              <Text className="mt-4 mb-2">Your Password</Text>
              <TextInput
                placeholder="Your Password"
                secureTextEntry={!showPassword}
                className="w-full pl-16"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                dense={true}
                outlineStyle={{ borderColor: theme.colors.onBackground }}
                theme={{ roundness: 9999 }}
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />
            </View>
            <TouchableOpacity
              onPress={onSignup}
              className="bg-primary rounded-full p-4 hover:bg-primary/90 mt-8 border"
            >
              <Text className="text-onPrimary text-center text-2xl font-bold">
                Create Account
              </Text>
            </TouchableOpacity>
            <View className="flex-row items-center my-4">
              <View className="flex-1 h-1 bg-black" />
              <Text className="px-4 text-black font-bold text-xl">Or</Text>
              <View className="flex-1 h-1 bg-black" />
            </View>
            <TouchableOpacity
              onPress={() => {
                onGoogleSignUp();
              }}
              className="flex flex-row items-center justify-center bg-white border border-black rounded-full p-4 shadow-md"
            >
              <Image
                source={{
                  uri: "https://img.icons8.com/color/48/000000/google-logo.png",
                }}
                className="w-8 h-8 mr-4"
              />
              <Text className="text-center text-xl font-bold">
                Continue with Google
              </Text>
            </TouchableOpacity>
            <View className="mt-4 flex flex-row items-center justify-center gap-8">
              <Text className="text-onPrimaryContainer text-lg font-bold">
                Already helping our planet?
              </Text>
              <TouchableOpacity onPress={() => router.navigate("/login")}>
                <Text className="underline text-onPrimaryContainer text-lg font-bold">
                  Log In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
