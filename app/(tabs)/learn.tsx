import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function LearnScreen() {
    return (
        <ScrollView className="flex-1 bg-white">
            <View className="p-6">
                <View className="absolute w-[300px] h-[300px] bg-[#409858] rounded-full top-[150px] left-[-150px]" />
                <View className="absolute w-[300px] h-[300px] bg-[#409858] rounded-full top-[500px] left-[300px]" />

                <View className="flex items-center mt-8">
                    <Text className="text-5xl font-bold">
                        Forever<Text className="text-[#409858]">green</Text>
                    </Text>
                    <Text className="text-3xl font-bold">Learn</Text>
                </View>

                <View className="bg-[#eeeeee] mt-4 mb-6 p-4 rounded-2xl items-center">
                    <Text className="text-3xl font-bold text-center">Resources Guides</Text>
                    <Text className="text-xl text-center mb-2">Check out our resources guides with tons of info about how to live a more sustainable lifestyle!</Text>
                    <Link href="https://www.forevergreen.earth/" asChild>
                    <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#409858', borderRadius: 9999, alignItems: 'center', justifyContent: 'center', height: 40, width: 150 }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold', }}> Learn More </Text>
                    </TouchableOpacity>
                    </Link>
                </View>

                <View className="bg-[#eeeeee] mb-6 p-4 rounded-2xl items-center">
                    <Text className="text-3xl font-bold text-center">Course</Text>
                    <Text className="text-xl text-center mb-2">We have created some follow at your own pace courses about sustainable living!</Text>
                    <Link href="https://www.forevergreen.earth/" asChild>
                    <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#409858', borderRadius: 9999, alignItems: 'center', justifyContent: 'center', height: 40, width: 150 }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold', }}> Explore </Text>
                    </TouchableOpacity>
                    </Link>
                </View>

                <View className="bg-[#eeeeee] mb-6 p-4 rounded-2xl items-center">
                    <Text className="text-3xl font-bold text-center">Blogs</Text>
                    <Text className="text-xl text-center mb-2">We have tons of blogs about hot climate topics that are easy to read and educational!</Text>
                    <Link href="https://www.forevergreen.earth/blog" asChild>
                    <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#409858', borderRadius: 9999, alignItems: 'center', justifyContent: 'center', height: 40, width: 150 }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold', }}> Read Now </Text>
                    </TouchableOpacity>
                    </Link>
                </View>

                <View className="bg-[#eeeeee] mb-6 p-4 rounded-2xl items-center">
                    <Text className="text-3xl font-bold text-center">Fast Facts</Text>
                    <Text className="text-xl text-center mb-2">Want a quick fact about climate related topics to expand your view? Check out our fast facts now!</Text>
                    <Link href="https://www.forevergreen.earth/" asChild>
                    <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#409858', borderRadius: 9999, alignItems: 'center', justifyContent: 'center', height: 40, width: 150 }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold', }}> View </Text>
                    </TouchableOpacity>
                    </Link>
                </View>

                <View className="bg-[#eeeeee] mb-2 p-4 rounded-2xl items-center">
                    <Text className="text-3xl font-bold text-center">Newsletter Subscription</Text>
                    <Text className="text-xl text-center mb-2">By joining the newsletter you will be sent personalized info about your journey towards net-zero. This is a free an easy way to reduce your emissions.</Text>
                    <Link href="https://www.forevergreen.earth/waitlist" asChild>
                    <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#409858', borderRadius: 9999, alignItems: 'center', justifyContent: 'center', height: 40, width: 150 }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold', }}> Subscribe </Text>
                    </TouchableOpacity>
                    </Link>
                </View>

            </View>
        </ScrollView>
    );
}