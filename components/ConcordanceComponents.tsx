import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

/**
 * Concordance Header
 */
export const ConcordanceHeader = () => {
  const router = useRouter();
  return (
    <View className="flex-row items-center justify-between px-6 py-4 bg-white">
      <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
        <MaterialCommunityIcons name="chevron-left" size={28} color="#203A81" />
      </TouchableOpacity>
      <Text className="text-[#203A81] text-lg font-black tracking-widest uppercase">Concordance</Text>
      <TouchableOpacity className="p-2 -mr-2">
        <MaterialCommunityIcons name="bookmark-outline" size={24} color="#203A81" />
      </TouchableOpacity>
    </View>
  );
};

/**
 * Version Chip (KJV, NIV, etc)
 */
export const VersionChip = ({ label, active = false }: { label: string, active?: boolean }) => {
  return (
    <TouchableOpacity 
      className={`px-8 py-2 rounded-xl mr-2 ${active ? 'bg-white shadow-sm border border-gray-100' : 'bg-transparent'}`}
    >
      <Text className={`font-bold text-xs ${active ? 'text-[#203A81]' : 'text-gray-400'}`}>{label}</Text>
    </TouchableOpacity>
  );
};

/**
 * Verse Result Card
 */
export const VerseCard = ({ 
  reference, 
  version, 
  text, 
  highlight 
}: { 
  reference: string, 
  version: string, 
  text: string, 
  highlight: string 
}) => {
  // Simple highlight logic
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  
  return (
    <View className="bg-white rounded-3xl p-5 mb-4 shadow-lg shadow-blue-900/5 border border-gray-50">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-[#203A81] font-bold text-base">{reference}</Text>
        <View className="bg-blue-50 px-2 py-0.5 rounded">
           <Text className="text-blue-500 text-[8px] font-black">{version}</Text>
        </View>
      </View>
      
      <Text className="text-gray-600 leading-6 text-sm italic mb-5">
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Text key={i} className="bg-yellow-100 font-bold text-[#203A81]">{part}</Text>
          ) : part
        )}
      </Text>

      <View className="flex-row items-center justify-end">
        <TouchableOpacity className="flex-row items-center mr-6">
          <MaterialCommunityIcons name="content-copy" size={16} color="#9CA3AF" />
          <Text className="text-gray-400 font-bold text-[10px] ml-1">Copy</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center">
          <MaterialCommunityIcons name="share-variant" size={16} color="#9CA3AF" />
          <Text className="text-gray-400 font-bold text-[10px] ml-1">Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
