import React from 'react';
import { View, Text, Image, SafeAreaView, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SplashScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-8">
        
        {/* Logo Container */}
        <View className="items-center justify-center mb-10">
          <View className="bg-white p-2 rounded-full shadow-2xl elevation-10">
            <View className="w-36 h-36 rounded-full bg-[#9BAA7C] items-center justify-center border-4 border-white">
               {/* Placeholder for the Mission Logo */}
               <MaterialCommunityIcons name="pine-tree" size={50} color="white" />
               <Text className="text-white text-[10px] font-bold tracking-widest mt-1">MISSION</Text>
            </View>
          </View>
        </View>

        {/* Title Section */}
        <View className="items-center mb-6">
          <Text className="text-[#203A81] text-2xl font-serif text-center font-bold tracking-tight px-4 leading-8">
            CEYLON PENTECOSTAL{"\n"}MISSION LIBRARY
          </Text>
        </View>

        {/* Divider with Icon */}
        <View className="flex-row items-center w-full justify-center mb-6">
          <View className="h-[1px] bg-gray-200 w-16" />
          <View className="mx-4">
            <MaterialCommunityIcons name="book-open-variant" size={18} color="#C5A059" />
          </View>
          <View className="h-[1px] bg-gray-200 w-16" />
        </View>

        {/* Subtitle */}
        <View className="items-center mb-16">
          <Text className="text-[#C5A059] text-sm font-bold tracking-[3px] text-center uppercase leading-6">
            Spreading the word through{"\n"}knowledge
          </Text>
        </View>

        {/* Custom Progress Bar */}
        <View className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden mt-20">
          <View className="w-1/3 h-full bg-[#203A81] rounded-full" />
        </View>

        {/* Footer */}
        <View className="absolute bottom-10 items-center w-full">
          <MaterialCommunityIcons name="book" size={24} color="#A7B5CC" />
          <Text className="text-[#A7B5CC] text-[10px] font-bold tracking-widest mt-2 uppercase">
            Established 1923
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
