import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

/**
 * Header with Search, Notification and Profile
 */
export const SearchHeader = () => {
  const router = useRouter();
  return (
    <View className="flex-row items-center justify-between px-4 mt-4 mb-6">
      <View className="flex-1 flex-row items-center bg-gray-100/80 rounded-2xl px-4 py-2 border border-gray-200">
        <MaterialCommunityIcons name="magnify" size={24} color="#9CA3AF" />
        <TextInput 
          placeholder="Search books, scripture..." 
          className="flex-1 ml-2 text-gray-700 h-10"
          placeholderTextColor="#9CA3AF"
          style={{ outlineStyle: 'none' } as any}
        />
      </View>
      <TouchableOpacity className="ml-3 bg-[#D9E2F7] p-3 rounded-2xl">
        <MaterialCommunityIcons name="bell-outline" size={22} color="#203A81" />
      </TouchableOpacity>
      <TouchableOpacity 
        className="ml-3"
        onPress={() => router.push('/profile')}
      >
        <View className="w-11 h-11 rounded-full bg-[#F3D9C9] items-center justify-center border-2 border-white shadow-sm overflow-hidden">
          <MaterialCommunityIcons name="account" size={30} color="#8D7A4D" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const VerseOfTheDay = () => {
  const [verse, setVerse] = React.useState({
    text: "Your word is a lamp to my feet and a light to my path.",
    reference: "Psalm 119:105"
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchVerse = async () => {
      try {
        // Fetching random verse from Bible API
        const response = await fetch('https://beta.ourmanna.com/api/v1/get?format=json&order=random');
        const data = await response.json();
        
        if (data?.verse?.details) {
          setVerse({
            text: data.verse.details.text,
            reference: data.verse.details.reference
          });
        }
      } catch (error) {
        console.error('Error fetching Bible verse:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerse();
  }, []);

  return (
    <View className="mx-4 bg-[#FFF8E6] rounded-3xl p-5 border border-[#F5E6BD] relative overflow-hidden mb-6 shadow-sm">
      <View className="absolute -right-4 -top-4 opacity-5">
        <MaterialCommunityIcons name="book-open-page-variant" size={150} color="#C5A059" />
      </View>
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-[#C5A059] text-[10px] font-black tracking-[2px] uppercase">Verse of the Day</Text>
        {loading && (
          <View className="bg-[#C5A059] px-2 py-0.5 rounded-full">
            <Text className="text-white text-[8px] font-bold">LOADING</Text>
          </View>
        )}
      </View>
      <Text className="text-[#203A81] text-lg font-bold italic leading-7 mb-2">
        &quot;{verse.text.trim()}&quot;
      </Text>
      <View className="flex-row items-center">
        <View className="h-[2px] w-4 bg-[#C5A059] mr-2 rounded-full" />
        <Text className="text-[#C5A059] font-bold text-xs">{verse.reference}</Text>
      </View>
    </View>
  );
};

/**
 * Quick Action Card
 */
export const ActionCard = ({ title, subtitle, icon, color, href }: { title: string, subtitle: string, icon: string, color: string, href?: string }) => {
  const content = (
    <View className="bg-white rounded-[32px] p-6 w-full h-[180px] shadow-lg shadow-blue-900/5 border border-gray-100 items-center justify-between">
      <View className="flex-1 items-center justify-center">
        <View className="w-14 h-14 rounded-2xl items-center justify-center mb-4 bg-[#F0F4FF]">
          <MaterialCommunityIcons name={icon as any} size={28} color="#203A81" />
        </View>
        <Text className="text-[#203A81] font-black text-center text-sm mb-1 leading-tight">{title}</Text>
        <Text className="text-gray-400 text-center text-[9px] uppercase font-bold tracking-widest">{subtitle}</Text>
      </View>
    </View>
  );

  if (href) {
    return (
      <Link href={href as any} asChild>
        <TouchableOpacity className="w-[48%] mb-4">
          {content}
        </TouchableOpacity>
      </Link>
    );
  }

  return (
    <TouchableOpacity className="w-[48%] mb-4">
      {content}
    </TouchableOpacity>
  );
};

/**
 * Category Chip
 */
export const CategoryChip = ({ label, active = false }: { label: string, active?: boolean }) => {
  return (
    <TouchableOpacity 
      className="px-6 py-2.5 rounded-full mr-2"
      style={{
        backgroundColor: active ? '#203A81' : '#FFFFFF',
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
 * Book Card for Recent Uploads
 */
export const BookCard = ({ title, author, imageUri }: { title: string, author: string, imageUri?: string }) => {
  return (
    <TouchableOpacity className="mr-5 w-32">
      <View className="w-32 h-44 bg-white rounded-2xl shadow-sm border border-gray-100 mb-3 overflow-hidden">
        <Image 
          source={{ uri: imageUri || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop' }}
          className="flex-1"
          resizeMode="cover"
        />
      </View>
      <Text className="text-[#203A81] font-bold text-sm mb-0.5" numberOfLines={1}>{title}</Text>
      <Text className="text-gray-400 text-[10px] font-medium" numberOfLines={1}>{author}</Text>
    </TouchableOpacity>
  );
};

/**
 * Featured Publication Card
 */
export const FeaturedCard = () => {
  return (
    <View className="bg-white rounded-[32px] p-5 shadow-xl shadow-blue-900/10 border border-gray-50 flex-row">
      <View className="w-28 h-40 bg-gray-50 rounded-2xl shadow-sm overflow-hidden">
         <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300&auto=format&fit=crop' }}
            className="flex-1"
            resizeMode="cover"
         />
      </View>
      <View className="flex-1 ml-5 justify-center">
        <Text className="text-[#C5A059] text-[9px] font-black uppercase tracking-[1.5px] mb-1">May 2024 Edition</Text>
        <Text className="text-[#203A81] text-lg font-bold leading-6 mb-2">The Power of Persistent Praise</Text>
        <Text className="text-gray-400 text-[10px] leading-4 mb-4" numberOfLines={2}>
          Explore the spiritual impact of devotion and the theological roots of CPM&apos;s praise...
        </Text>
        <TouchableOpacity className="bg-[#203A81] px-6 py-3 rounded-2xl self-start shadow-md shadow-blue-900/30 active:opacity-90">
          <Text className="text-white font-bold text-xs">Read Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};