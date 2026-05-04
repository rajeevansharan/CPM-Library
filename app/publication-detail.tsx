import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useBooks } from '@/context/BooksContext';
import { useAuth } from '@/context/AuthContext';
import { 
  PublicationHeader, 
  StatItem, 
  ActionButton, 
  ReflectionBox 
} from '@/components/PublicationComponents';

export default function PublicationDetailScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { savedBooks, toggleSaveBook } = useBooks();
  const { id, title, fileUrl, description, author, imageUri, category, type } = useLocalSearchParams();

  const isSaved = savedBooks.some((b: any) => b.id === id);

  const handleSaveToggle = () => {
    if (user?.id && id && type) {
      toggleSaveBook(user.id, id as string, type as string);
    } else if (!user) {
      alert('Please log in to save books');
    }
  };

  const handleReadOnline = () => {
    if (!fileUrl) {
      alert("No file available for this publication");
      return;
    }

    router.push({
      pathname: '/pdf-viewer',
      params: { 
        url: fileUrl as string,
        title: title as string
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <PublicationHeader isSaved={isSaved} onSavePress={handleSaveToggle} />

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        {/* Cover Image */}
        <View className="items-center mt-8 mb-6">
           <View className="shadow-2xl shadow-blue-900/40 rounded-3xl">
              <Image 
                 source={{ uri: (imageUri as string) || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop' }} 
                 className="w-56 h-80 rounded-3xl border-4 border-white"
                 resizeMode="cover"
              />
           </View>
        </View>

        {/* Title & Info */}
        <View className="items-center px-8 mb-8">
           <View className="bg-gray-100 px-4 py-1.5 rounded-full mb-3">
              <Text className="text-gray-400 text-[9px] font-black uppercase tracking-widest">{category || 'Publication'}</Text>
           </View>
           <Text className="text-[#203A81] text-2xl font-black text-center mb-1">{title || 'The Power of Faith'}</Text>
           <Text className="text-[#8D7A4D] font-bold text-sm">{author || 'Ceylon Pentecostal Mission'}</Text>
        </View>

        {/* Stats Section */}
        <View className="flex-row justify-around items-center px-10 mb-10 py-6 border-y border-gray-50">
           <StatItem label="Pages" value="--" />
           <View className="w-[1px] h-8 bg-gray-100" />
           <StatItem label="Language" value="English" />
           <View className="w-[1px] h-8 bg-gray-100" />
           <StatItem label="Format" value="PDF" />
        </View>

        {/* Description Section */}
        <View className="px-8 mb-8">
           <Text className="text-gray-400 text-[10px] font-black uppercase tracking-[2px] mb-4">About This Publication</Text>
           <Text className="text-gray-500 text-sm leading-6">
              {description || 'Discover the foundational principles of faith and spiritual teachings in this publication.'}
           </Text>
           <TouchableOpacity className="flex-row items-center mt-3">
              <Text className="text-[#203A81] font-black text-[10px] uppercase tracking-widest">Read More</Text>
              <View className="ml-1">
                 <MaterialCommunityIcons name="chevron-down" size={16} color="#203A81" />
              </View>
           </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View className="px-8 space-y-4 mb-10">
           <ActionButton 
              icon="book-open-outline" 
              label="Read Online" 
              primary={true} 
              onPress={handleReadOnline}
           />
           <View className="flex-row space-x-4 mt-4">
              <ActionButton icon="cloud-download-outline" label="Download" />
              <View className="w-4" /> {/* Spacer */}
              <ActionButton icon="share-variant-outline" label="Share" />
           </View>
        </View>

        {/* Reflections Section */}
        <View className="px-8">
           <ReflectionBox />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
