import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

/**
 * Voice of Pentecost Header
 */
export const VoiceHeader = () => {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <View className="flex-row items-center justify-between px-6 py-4 bg-white">
      <TouchableOpacity onPress={handleBack} className="p-2 -ml-2">
        <MaterialCommunityIcons name="chevron-left" size={28} color="#203A81" />
      </TouchableOpacity>
      <Text className="text-[#203A81] text-lg font-black tracking-tight">Voice Of Pentecost</Text>
      <TouchableOpacity className="p-2 -mr-2">
        <MaterialCommunityIcons name="bookmark-outline" size={24} color="#203A81" />
      </TouchableOpacity>
    </View>
  );
};

/**
 * Magazine Issue Card
 */
export const IssueCard = ({ 
  title, 
  subtitle, 
  imageUri, 
  isNew = false,
  onPress
}: { 
  title: string, 
  subtitle: string, 
  imageUri: string, 
  isNew?: boolean,
  onPress?: () => void
}) => {
  return (
    <TouchableOpacity className="w-[48%] mb-6" onPress={onPress}>
      <View className="relative">
        <Image 
          source={{ uri: imageUri }} 
          className="w-full aspect-[3/4] rounded-2xl bg-gray-200"
          resizeMode="cover"
        />
      </View>
      <View className="mt-3">
        <Text className="text-[#203A81] font-bold text-sm">{title}</Text>
        <Text className="text-gray-400 text-xs mt-1" numberOfLines={1}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

/**
 * Archive Collection Row
 */
export const ArchiveRow = ({ 
  title, 
  subtitle 
}: { 
  title: string, 
  subtitle: string 
}) => {
  return (
    <TouchableOpacity className="flex-row items-center justify-between bg-white px-5 py-4 rounded-2xl mb-3 border border-gray-50 shadow-sm">
      <View className="flex-row items-center">
        <View className="bg-gray-100 p-2.5 rounded-xl mr-4">
          <MaterialCommunityIcons name="history" size={20} color="#203A81" />
        </View>
        <View>
          <Text className="text-[#203A81] font-bold text-sm">{title}</Text>
          <Text className="text-gray-400 text-[10px] mt-0.5">{subtitle}</Text>
        </View>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color="#D1D5DB" />
    </TouchableOpacity>
  );
};
