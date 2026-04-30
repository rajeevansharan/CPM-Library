import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
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
  subtitle,
  author,
  description,
  onDownloadPress,
  onViewPress
}: { 
  title: string, 
  grade?: string,
  level?: string, 
  year?: string, 
  badge?: string,
  imageUri?: string,
  subtitle?: string,
  author?: string,
  description?: string,
  onDownloadPress?: () => void,
  onViewPress?: () => void
}) => {
  return (
    <View className="bg-white rounded-3xl p-4 mb-4 flex-row items-center shadow-lg shadow-blue-900/5 border border-gray-50 mx-4">
      {/* Thumbnail */}
      <View className="w-24 h-32 bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
        <Image 
          source={{ uri: imageUri || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&auto=format&fit=crop' }}
          className="flex-1"
          resizeMode="cover"
        />
      </View>

      {/* Info */}
      <View className="flex-1 ml-4 justify-between py-1">
        <View>
          {(grade || author) && (
            <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">
              {grade || author}
            </Text>
          )}
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-[#203A81] font-bold text-base flex-1 mr-2" numberOfLines={2}>{title}</Text>
          </View>
          {subtitle && (
            <Text className="text-gray-500 text-xs font-medium mb-1 italic" numberOfLines={1}>{subtitle}</Text>
          )}
          {description && (
            <Text className="text-gray-400 text-[10px] mb-2 leading-relaxed" numberOfLines={2}>{description}</Text>
          )}
        </View>

        <View className="flex-row items-center mt-2">
          <TouchableOpacity 
            className="flex-row items-center mr-6 bg-[#C5A059]/10 px-3 py-1.5 rounded-full" 
            onPress={onViewPress}
          >
            <MaterialCommunityIcons name="eye-outline" size={14} color="#C5A059" />
            <Text className="text-[#C5A059] font-black text-[9px] ml-1 uppercase tracking-widest">View PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-row items-center bg-[#203A81]/5 px-3 py-1.5 rounded-full" 
            onPress={onDownloadPress}
          >
            <MaterialCommunityIcons name="download" size={14} color="#203A81" />
            <Text className="text-[#203A81] font-black text-[9px] ml-1 uppercase tracking-widest">Download</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
