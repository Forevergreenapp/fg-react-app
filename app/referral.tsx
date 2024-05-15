import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
// import axios from 'axios';
// Import Firebase

// Configure Firebase

const ReferralForm = () => {
  const [friendName, setFriendName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');
  const [note, setNote] = useState('');

  const handleReferral = async () => {
    Alert.alert('Debug', 'Send referral to API here.');
    /* try {
      const response = await axios.post('http://your-flask-api-url/referral', {
        friend_name: friendName,
        friend_email: friendEmail,
        note: note,
      });
 
      // Store the referral in Firebase 
 
        Alert.alert('Success', 'Referral sent successfully!');

        // Clearn input fields after successful send
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send referral.');
    } */
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

    <View className="flex-1 bg-white p-4">
      <View className="absolute w-[300px] h-[300px] bg-[#409858] rounded-full top-[200px] left-[200px]" />
      <View className="absolute w-[200px] h-[200px] bg-[#409858] rounded-full bottom-[100px] right-[300px]" />

      <View className="flex items-center mt-8">
        <Text className="text-5xl font-bold my-2">
          Forever<Text className="text-[#409858]">green</Text>
        </Text>
        <Text className="text-3xl font-bold">Refer a Friend</Text>
        <Text className="text-xl mt-2">Help the Cause Today by Referring a Friend</Text>
      </View>

      <View className="bg-[#eeeeee] mt-8 p-4 rounded-3xl">
        <Text className="text-4xl mt-2 font-bold">Refer a Friend</Text>
        <View className="mt-8 p-4 bg-white rounded-3xl">
          <Text className="text-base font-bold text-black mb-4">Enter Your Friend’s Name Below:</Text>
          <TextInput className="bg-white p-2 rounded border-b border-black" placeholder="Your Answer" value={friendName} onChangeText={setFriendName} />
        </View>
        <View className="mt-4 p-4 bg-white rounded-3xl">
          <Text className="text-base font-bold text-black mb-4">Enter Your Friend’s Email Address Below:</Text>
          <TextInput className="bg-white p-2 rounded border-b border-black" placeholder="Your Answer" value={friendEmail} onChangeText={setFriendEmail} />
        </View>
        <View className="mt-4 p-4 bg-white rounded-3xl">
          <Text className="text-base font-bold text-black mb-4">Enter a Note or Leave Blank:</Text>
          <TextInput className="bg-white p-2 rounded border-b border-black" placeholder="Your Answer" value={note} onChangeText={setNote} />
        </View>
        {/* Could not get tailwind to work here */}
        <TouchableOpacity style={{ marginTop: 16, marginHorizontal: 90, paddingVertical: 12, paddingHorizontal: 32, backgroundColor: '#409858', borderRadius: 9999 }} onPress={handleReferral}>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 26, fontWeight: 'bold' }}> Submit </Text>
        </TouchableOpacity>
      </View>

    </View>

    </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ReferralForm;