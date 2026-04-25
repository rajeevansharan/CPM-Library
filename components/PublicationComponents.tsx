import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

/**
 * Publication Detail Header
 */
export const PublicationHeader = () => {
  const router = useRouter();
  return (
    <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-50">
      <TouchableOpacity 
        onPress={() => router.back()} 
        className="p-2 -ml-2"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <MaterialCommunityIcons name="chevron-left" size={28} color="#203A81" />
      </TouchableOpacity>
      <Text className="text-[#203A81] text-lg font-black tracking-tight text-center">Publication Detail</Text>
      <TouchableOpacity className="p-2 -mr-2">
        <MaterialCommunityIcons name="bookmark-outline" size={24} color="#203A81" />
      </TouchableOpacity>
    </View>
  );
};

/**
 * Metadata row item
 */
export const StatItem = ({ label, value }: { label: string, value: string }) => {
  return (
    <View className="items-center">
      <Text className="text-gray-300 text-[10px] font-black uppercase tracking-widest mb-1">{label}</Text>
      <Text className="text-[#203A81] font-black text-sm">{value}</Text>
    </View>
  );
};

/**
 * Action Button
 */
export const ActionButton = ({ 
  icon, 
  label, 
  primary = false 
}: { 
  icon: string, 
  label: string, 
  primary?: boolean 
}) => {
  return (
    <TouchableOpacity 
      className="flex-row items-center justify-center py-4 rounded-2xl"
      style={[
        {
          backgroundColor: primary ? '#203A81' : '#FFFFFF',
          borderWidth: primary ? 0 : 1,
          borderColor: '#F3F4F6',
          flex: primary ? undefined : 1,
        },
        primary ? {} : { elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3 }
      ]}
    >
      <MaterialCommunityIcons name={icon as any} size={20} color={primary ? 'white' : '#203A81'} />
      <Text 
        className="font-black text-sm ml-2"
        style={{ color: primary ? '#FFFFFF' : '#203A81' }}
      >{label}</Text>
    </TouchableOpacity>
  );
};

/**
 * Reflections Section
 */
export const ReflectionBox = () => {
  return (
    <View className="bg-gray-50/80 rounded-[32px] p-6 mb-8 border border-gray-100">
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="notebook-edit-outline" size={20} color="#203A81" />
          <Text className="text-[#203A81] font-black text-sm ml-2">Personal Reflections</Text>
        </View>
        <Text className="text-gray-400 text-[8px] font-black uppercase tracking-widest">Draft Saved</Text>
      </View>
      
      <TextInput 
        placeholder="Type your spiritual insights and study notes here..."
        multiline
        numberOfLines={4}
        className="text-gray-500 text-xs leading-5 min-h-[100px] text-left align-top"
        placeholderTextColor="#9CA3AF"
      />
      
      <View className="flex-row items-center justify-between mt-6 pt-4 border-t border-gray-100">
        <View className="flex-row space-x-6">
          <TouchableOpacity className="mr-4"><MaterialCommunityIcons name="format-bold" size={20} color="#9CA3AF" /></TouchableOpacity>
          <TouchableOpacity className="mr-4"><MaterialCommunityIcons name="format-italic" size={20} color="#9CA3AF" /></TouchableOpacity>
          <TouchableOpacity><MaterialCommunityIcons name="format-list-bulleted" size={20} color="#9CA3AF" /></TouchableOpacity>
        </View>
        <TouchableOpacity className="bg-[#203A81]/10 px-6 py-2 rounded-xl">
          <Text className="text-[#203A81] font-black text-[10px] uppercase tracking-wider">Save Note</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
