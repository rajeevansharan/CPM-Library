import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

/**
 * Custom Header for Scripture School
 */
export const ScriptureHeader = () => {
  const router = useRouter();
  return (
    <View className="flex-row items-center justify-between px-6 py-4 bg-white">
      <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
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
  level, 
  year, 
  badge, 
  imageUri,
  onDownloadPress
}: { 
  title: string, 
  level: string, 
  year: string, 
  badge?: string,
  imageUri?: string,
  onDownloadPress?: () => void
}) => {
  return (
    <TouchableOpacity className="bg-white rounded-3xl p-4 mb-4 flex-row items-center shadow-lg shadow-blue-900/5 border border-gray-50 mx-4">
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
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-[#203A81] font-bold text-base flex-1 mr-2" numberOfLines={1}>{title}</Text>
            {badge && (
              <View 
                className="px-2 py-0.5 rounded-full"
                style={{ backgroundColor: badge === 'NEW' ? '#EFF6FF' : '#FFF8E6' }}
              >
                <Text 
                  className="text-[8px] font-black uppercase"
                  style={{ color: badge === 'NEW' ? '#3B82F6' : '#C5A059' }}
                >
                  {badge}
                </Text>
              </View>
            )}
          </View>
          <Text className="text-gray-400 text-xs font-medium mb-4">{level} • {year}</Text>
        </View>

        <TouchableOpacity className="flex-row items-center" onPress={onDownloadPress}>
          <MaterialCommunityIcons name="download" size={14} color="#203A81" />
          <Text className="text-[#203A81] font-black text-[10px] ml-1 uppercase tracking-widest">Download PDF</Text>
        </TouchableOpacity>
      </View>

      {/* Chevron */}
      <MaterialCommunityIcons name="chevron-right" size={24} color="#D1D5DB" className="ml-2" />
    </TouchableOpacity>
  );
};
