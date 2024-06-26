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

export default function Register() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  /* Function to sign up the user with the email and password */
  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert("Success", "User signed up successfully!");
        router.replace("/(tabs)/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error", `Code: ${errorCode}\nMessage: ${errorMessage}`);
      });
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
              />
              <Icon
                name="at"
                size={25}
                color={theme.colors.onBackground}
                className="absolute left-6 top-1/2 transform translate-y-1/5"
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
              />
              <Icon
                name="user-o"
                size={25}
                color={theme.colors.onBackground}
                className="absolute left-6 top-1/2 transform translate-y-1/3"
              />
            </View>
            <View className="relative">
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
                size={25}
                color={theme.colors.onBackground}
                className="absolute left-6 top-1/2 transform translate-y-1/3"
              />
            </View>
            <View className="bg-primary rounded-full p-4 hover:bg-primary/90 mt-8 border">
              <TouchableOpacity onPress={signUp}>
                <Text className="text-onPrimary text-center text-2xl font-bold">
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center my-4">
              <View className="flex-1 h-1 bg-black" />
              <Text className="px-4 text-black font-bold text-xl">Or</Text>
              <View className="flex-1 h-1 bg-black" />
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
            <View className="mt-4 flex flex-row items-center justify-center gap-8">
              <Text className="text-onPrimaryContainer text-lg font-bold">
                Already helping our planet?
              </Text>
              <Link href="/login" asChild>
                <TouchableOpacity>
                  <Text className="underline text-onPrimaryContainer text-lg font-bold">Log In</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
