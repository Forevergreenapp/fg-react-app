import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import ErrorBoundary from '../../components/ErrorBoundary'; // Make sure this path is correct

export default function Register() {
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    // Handle create account logic
  };

  const handleContinueWithGoogle = () => {
    // Handle continue with Google logic
  };

  return (
    <ErrorBoundary> {/* Wrap component with Error Boundary */}
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Sign <Text style={styles.primary}>Up</Text>
        </Text>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/tree-logo.png')}
          />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.iconInputContainer}>
              <Icon name="at" size={25} color={theme.colors.onBackground} style={styles.icon} />
              <TextInput
                placeholder="Ex. abc@example.com"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                dense={true}
                outlineStyle={{ borderColor: theme.colors.onBackground }}
                theme={{ roundness: 9999 }}
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Your Name</Text>
            <View style={styles.iconInputContainer}>
              <Icon name="user-o" size={25} color={theme.colors.onBackground} style={styles.icon} />
              <TextInput
                placeholder="Ex. John Smith"
                value={name}
                onChangeText={setName}
                mode="outlined"
                dense={true}
                outlineStyle={{ borderColor: theme.colors.onBackground }}
                theme={{ roundness: 9999 }}
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Your Password</Text>
            <View style={styles.iconInputContainer}>
              <Icon name="lock" size={25} color={theme.colors.onBackground} style={styles.icon} />
              <TextInput
                placeholder="Your Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                dense={true}
                outlineStyle={{ borderColor: theme.colors.onBackground }}
                theme={{ roundness: 9999 }}
                style={styles.input}
              />
            </View>
          </View>
          <Pressable
            onPress={handleCreateAccount}
            style={styles.createAccountButton}
          >
            <Text style={styles.createAccountText}>Create Account</Text>
          </Pressable>
          <View style={styles.separatorContainer}>
            <View style={styles.separator} />
            <Text style={styles.separatorText}>Or</Text>
            <View style={styles.separator} />
          </View>
          <Pressable
            onPress={handleContinueWithGoogle}
            style={styles.googleButton}
          >
            <Text style={styles.googleButtonText}>Continue with Google</Text>
            <Icon
              name="google"
              size={25}
              color={theme.colors.onBackground}
              style={styles.googleIcon}
            />
          </Pressable>
          <Text style={styles.loginText}>
            Already helping our planet?{' '}
            <Pressable onPress={() => { /* Navigate to login */ }}>
              <Text style={styles.loginLink}>Log in</Text>
            </Pressable>
          </Text>
        </View>
      </SafeAreaView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  primary: {
    color: '#409858',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 100,
  },
  formContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
  },
  iconInputContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    paddingLeft: 40,
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 18,
  },
  createAccountButton: {
    backgroundColor: '#409858',
    borderRadius: 50,
    paddingVertical: 15,
    marginVertical: 20,
    borderColor: '#409858',
    borderWidth: 1,
  },
  createAccountText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#d1d1d1',
  },
  separatorText: {
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    paddingVertical: 15,
    borderColor: '#409858',
    borderWidth: 1,
  },
  googleButtonText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 30,
  },
  googleIcon: {
    position: 'absolute',
    left: 20,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    color: '#409858',
    textDecorationLine: 'underline',
  },
});

