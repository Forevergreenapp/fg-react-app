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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";

export default function App() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  /* Function to sign up the user with the email and password */
  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert("Success", "User logged in successfully!");
        router.replace("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error", `Code: ${errorCode}\nMessage: ${errorMessage}`);
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
              source={require("../../assets/images/tree-logo.png")}
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
                <Text className="text-lg font-bold mt-2">Forgot Password?</Text>
              </Link>
            </View>
            <View className="bg-primary rounded-full p-4 hover:bg-primary/90 mt-8 border">
              <TouchableOpacity onPress={login}>
                <Text className="text-onPrimary text-center text-2xl font-bold">
                  Log in
                </Text>
              </TouchableOpacity>
            </View>
            {/* <Button title="Sign Up!" onPress={() => {}} /> */}
            <View className="flex flex-row items-center my-4">
              <View className="flex-1 h-1 bg-onBackground" />
              <Text className="mx-4 font-bold text-xl">Or</Text>
              <View className="flex-1 h-1 bg-onBackground" />
            </View>
            <View className="flex flex-row items-center justify-center bg-white border border-black rounded-full p-4 shadow-md">
              <TouchableOpacity>
                <Image
                  source={{
                    uri: "https://img.icons8.com/color/48/000000/google-logo.png",
                  }}
                  className="w-8 h-8 mr-4"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Text className="text-center text-xl font-bold">
                  Continue with Google
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center mt-8">
              <Link href="/register" asChild>
                <Text className="text-xl font-extrabold underline">
                  Back to Sign Up
                </Text>
              </Link>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
