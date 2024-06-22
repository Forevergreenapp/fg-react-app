import { useState } from "react";
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
import Icon from "react-native-vector-icons/FontAwesome";
import { Link } from "expo-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";

export default function App() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  /* Function to sign up the user with the email and password */
  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        Alert.alert("Success", "User signed up successfully!");
        router.replace("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error", errorMessage);
        // ..
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView className="flex-1 justify-center px-4 bg-background">
          <Text className="text-5xl font-bold text-center tracking-tighter my-10">
            Log <Text className="text-primary">in</Text>
          </Text>
          <View className="items-center">
            <Image
              className="w-80 h-40"
              source={require("../assets/images/tree-logo.png")}
            />
          </View>
          <View className="space-y-4 px-12 mt-6">
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
              />
              <Icon
                name="at"
                size={24}
                color={theme.colors.onBackground}
                className="absolute left-6 top-1/2 transform translate-y-1/5"
              />
            </View>
            <View className="relative mt-6">
              <Text className="mt-4 mb-2">Your Password</Text>
              <TextInput
                placeholder="Your Password"
                secureTextEntry
                className="w-full pl-16"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                dense={true}
                outlineStyle={{ borderColor: theme.colors.onBackground }}
                theme={{ roundness: 9999 }}
              />
              <Icon
                name="lock"
                size={24}
                color={theme.colors.onBackground}
                className="absolute left-6 top-1/2 transform translate-y-1/3"
              />
            </View>
            <View className="flex flex-row justify-end">
              <Link href="/forgot-password" className="text-primary">
                <Text className="text-lg font-bold mt-2">
                  Forgot Password?
                </Text>
              </Link>
            </View>
            <View className="bg-primary rounded-full p-4 hover:bg-primary/90 mt-8 border">
              <TouchableOpacity onPress={signUp}>
                <Text className="text-onPrimary text-center text-2xl font-bold">
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>
            {/* <Button title="Sign Up!" onPress={() => {}} /> */}
            <View className="flex flex-row items-center my-4">
              <View className="flex-1 h-1 bg-onBackground" />
              <Text className="mx-4 font-bold text-xl">Or</Text>
              <View className="flex-1 h-1 bg-onBackground" />
            </View>
            <View className="relative">
              <Link
                href="/register"
                asChild
                className="rounded-full p-4 border"
              >
                <Text className="text-center text-xl font-bold pl-8 tracking-wide">
                  Continue with Google
                </Text>
              </Link>
              <Icon
                name="google"
                size={24}
                color={theme.colors.onBackground}
                className="absolute left-10 top-1/2 transform -translate-y-1/2"
              />
            </View>
            <Text className="mt-4 text-xl text-center font-extrabold">
              Already helping our planet?{" "}
              <Link href="/login" className="mr-8">
                <Text className="font-extrabold underline">Log in</Text>
              </Link>
            </Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
