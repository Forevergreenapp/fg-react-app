import React from 'react';
import { View, Text, Button, StatusBar } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 bg-white items-center justify-center px-5">
      <StatusBar barStyle="dark-content" />
      <View className="grow items-center justify-center">
        <Text className="text-[80px] text-[#34C759]">🌲</Text>
        <Text className="text-2xl font-bold my-2">Forevergreen</Text>
      </View>
      <View className="w-full mb-8">
        <Button
          onPress={() => alert('Get Started')}
          title="Get Started"
          color="#34C759"
        />
        <Text className="mt-4 text-center text-base">
          Already helping our planet?{' '}
          <Text className="font-bold text-blue-500" onPress={() => alert('Log In')}>
            Log in
          </Text>
        </Text>
      </View>
    </View>
  );
}
