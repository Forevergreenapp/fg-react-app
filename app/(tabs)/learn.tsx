import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function LearnScreen() {
    return (
        <ScrollView className="flex-1 bg-white">
            <View className="p-6">

                {/* Header */}
                <View className="flex items-center mt-8 mb-6">
                    <Text className="text-5xl font-bold">
                        Forever<Text className="text-[#409858]">green</Text>
                    </Text>
                    <Text className="text-2xl font-bold ml-2">Learn</Text>
                </View>
            </View>
        </ScrollView>
    );
}