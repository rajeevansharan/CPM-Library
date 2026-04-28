import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRouter } from 'expo-router';

/**
 * Custom Header for Books of Pentecost
 */
export const BooksHeader = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <View className="bg-[#203A81] pt-6 pb-6 px-4 flex-row items-center">
      <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-2">
        <MaterialCommunityIcons name="chevron-left" size={28} color="white" />
      </TouchableOpacity>
      <Text className="text-white text-xl font-bold flex-1">{title}</Text>
      <View className="flex-row items-center">
        <TouchableOpacity className="p-2">
          <MaterialCommunityIcons name="magnify" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="p-2 ml-1">
          <MaterialCommunityIcons name="bell-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

/**
 * Filter Chip for Topic/Language
 */
export const FilterChip = ({ 
  label, 
  active = false, 
  variant = 'topic' 
}: { 
  label: string, 
  active?: boolean, 
  variant?: 'topic' | 'language' 
}) => {
  if (variant === 'language') {
    return (
      <TouchableOpacity className="bg-gray-100 px-4 py-1.5 rounded-lg mr-2 border border-gray-100">
        <Text className="text-gray-500 text-[10px] font-bold">{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      className="px-6 py-2 rounded-full mr-2"
      style={{
        backgroundColor: active ? '#203A81' : '#F3F4F6',
        borderWidth: active ? 0 : 1,
        borderColor: '#F3F4F6',
      }}
    >
      <Text 
        className="font-bold text-xs"
        style={{ color: active ? '#FFFFFF' : '#6B7280' }}
      >{label}</Text>
    </TouchableOpacity>
  );
};

/**
 * Single Book Card Component
 */
export const BookDetailCard = ({ 
  title, 
  author, 
  description, 
  category, 
  categoryColor = '#C5A059',
  languages,
  coverColor = '#1B7A63',
  imageUri
}: { 
  title: string, 
  author: string, 
  description: string, 
  category: string, 
  categoryColor?: string,
  languages: string[],
  coverColor?: string,
  imageUri?: string
}) => {
  const router = useRouter();
  return (
    <TouchableOpacity className="bg-white rounded-[24px] mb-4 flex-row shadow-lg shadow-blue-900/5 items-stretch overflow-hidden border border-gray-50 h-52">
      {/* Cover Side */}
      <View style={{ backgroundColor: coverColor }} className="w-1/3 items-center justify-center relative">
         <View className="absolute top-2 left-2 z-10">
            <View style={{ backgroundColor: categoryColor }} className="px-2 py-1 rounded-md">
               <Text className="text-white text-[7px] font-black uppercase">{category}</Text>
            </View>
         </View>
         {imageUri ? (
           <Image source={{ uri: imageUri }} className="w-full h-full" resizeMode="cover" />
         ) : (
           <View className="p-3 w-full h-full items-center justify-center">
             <View className="bg-white/10 w-full h-full rounded-md border border-white/20 items-center justify-center">
                <View className="w-12 h-[2px] bg-white/30 mb-2" />
                <Text className="text-white text-[8px] font-serif text-center px-2 opacity-60 italic">{title}</Text>
             </View>
           </View>
         )}
      </View>

      {/* Content Side */}
      <View className="flex-1 p-4 justify-between">
        <View>
          <Text className="text-[#203A81] text-lg font-bold leading-6" numberOfLines={1}>{title}</Text>
          <Text className="text-gray-400 text-[10px] font-medium mb-2">{author}</Text>
          <Text className="text-gray-400 text-[10px] leading-4" numberOfLines={3}>{description}</Text>
        </View>

        <View className="flex-row items-center justify-between">
           <View className="flex-row items-center">
              <MaterialCommunityIcons name="translate" size={14} color="#9CA3AF" />
              <Text className="text-gray-400 text-[9px] ml-1 font-medium">{languages.join(', ')}</Text>
           </View>
           <TouchableOpacity 
              onPress={() => router.push('/publication-detail')}
              className="bg-[#203A81] px-5 py-2.5 rounded-xl"
           >
              <Text className="text-white font-bold text-xs">Read Now</Text>
           </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
