import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

/**
 * Custom Header for Scripture School
 */
export const ScriptureHeader = () => {
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
      <Text className="text-[#203A81] text-lg font-black tracking-tight uppercase">Scripture School</Text>
      <TouchableOpacity className="p-2 -mr-2">
        <MaterialCommunityIcons name="dots-horizontal" size={24} color="#203A81" />
      </TouchableOpacity>
    </View>
  );
};

/**
 * Filter Pill for Categories
 */
export const FilterPill = ({ 
  label, 
  active = false,
  onPress 
}: { 
  label: string, 
  active?: boolean,
  onPress?: () => void
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="px-8 py-3 rounded-2xl mr-3 border"
      style={{
        backgroundColor: active ? '#203A81' : '#FFFFFF',
        borderColor: active ? '#203A81' : '#F3F4F6',
      }}
    >
      <Text 
        className="font-bold text-sm"
        style={{ color: active ? '#FFFFFF' : '#6B7280' }}
      >{label}</Text>
    </TouchableOpacity>
  );
};

/**
 * Material Card (List Item)
 */
export const MaterialCard = ({ 
  title, 
  grade,
  level, 
  year, 
  badge, 
  imageUri,
  onDownloadPress,
  onViewPress
}: { 
  title: string, 
  grade?: string,
  level: string, 
  year: string, 
  badge?: string,
  imageUri?: string,
  onDownloadPress?: () => void,
  onViewPress?: () => void
}) => {
  return (
    <View className="bg-white rounded-3xl p-4 mb-4 flex-row items-center shadow-lg shadow-blue-900/5 border border-gray-50 mx-4">
      {/* Thumbnail */}
      <View className="w-20 h-28 bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
        <Image 
          source={{ uri: imageUri || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&auto=format&fit=crop' }}
          className="flex-1"
          resizeMode="cover"
        />
      </View>

      {/* Info */}
      <View className="flex-1 ml-4 justify-between py-1">
        <View>
          {grade && <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">{grade}</Text>}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-[#203A81] font-bold text-base flex-1 mr-2" numberOfLines={2}>{title}</Text>
          </View>
        </View>

        <View className="flex-row items-center">
          <TouchableOpacity className="flex-row items-center mr-6" onPress={onViewPress}>
            <MaterialCommunityIcons name="eye-outline" size={14} color="#C5A059" />
            <Text className="text-[#C5A059] font-black text-[10px] ml-1 uppercase tracking-widest">View PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center" onPress={onDownloadPress}>
            <MaterialCommunityIcons name="download" size={14} color="#203A81" />
            <Text className="text-[#203A81] font-black text-[10px] ml-1 uppercase tracking-widest">Download</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
