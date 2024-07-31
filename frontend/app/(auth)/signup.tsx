import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { router } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  onSignup,
  onGoogleSignUp,
  onContinueAnonymously,
} from "../../api/auth";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "489135632905-iu340mh7lub0iis2q18upvus42fa2roo.apps.googleusercontent.com",
    });

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAnonymous(user.isAnonymous);
      }
    });

    return () => unsubscribe();
  }, []);

  const screenHeight = useWindowDimensions().height;

  return (
    <KeyboardAvoidingView className="flex-1 bg-white">
      <SafeAreaView className="justify-center px-4 flex-1">
        <ScrollView className="h-screen">
          <View
            className="justify-between"
            style={{ height: screenHeight - 100 }}
          >
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
                  outlineStyle={{ borderColor: "#000" }}
                  theme={{ roundness: 9999, colors: { background: "#fff" } }}
                  textColor="#000"
                  left={<TextInput.Icon icon="at" color={"#000"} />}
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
                  outlineStyle={{ borderColor: "#000" }}
                  theme={{ roundness: 9999, colors: { background: "#fff" } }}
                  textColor="#000"
                  left={<TextInput.Icon icon="account" color={"#000"} />}
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
                  outlineStyle={{ borderColor: "#000" }}
                  theme={{ roundness: 9999, colors: { background: "#fff" } }}
                  textColor="#000"
                  left={<TextInput.Icon icon="lock" color={"#000"} />}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? "eye-off" : "eye"}
                      onPress={() => setShowPassword(!showPassword)}
                      color={"#000"}
                    />
                  }
                />
              </View>
              <TouchableOpacity
                onPress={() => onSignup(email, password, name)}
                className="bg-primary rounded-full p-4 hover:bg-primary/90 mt-8 border shadow-sm"
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
                className="flex flex-row items-center justify-center bg-white border border-black rounded-full p-4 shadow-sm"
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
                <Text className="text-onPrimaryContainer text-xl font-bold">
                  Already helping our planet?
                </Text>
                <TouchableOpacity onPress={() => router.navigate("/login")}>
                  <Text className="underline text-onPrimaryContainer text-xl font-bold">
                    Log In
                  </Text>
                </TouchableOpacity>
              </View>
              {isAnonymous ? (
                <View className="mt-4 px-4">
                  <Text className="text-center text-lg text-gray-700">
                    Create an account to save your progress, access all
                    features, and continue making a real impact on the
                    environment!
                  </Text>
                </View>
              ) : (
                <View className="mt-4 flex flex-row items-center justify-center gap-8">
                  <TouchableOpacity onPress={onContinueAnonymously}>
                    <Text className="underline text-onPrimaryContainer text-xl font-bold">
                      Or continue as guest
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
