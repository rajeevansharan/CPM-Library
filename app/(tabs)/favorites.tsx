import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { MaterialCard } from '@/components/ScriptureSchoolComponents';
import { useBooks } from '@/context/BooksContext';
import { useAuth } from '@/context/AuthContext';

export default function SavedBooksScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { savedBooks, fetchSavedBooks, toggleSaveBook } = useBooks();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    if (user?.id) {
      setRefreshing(true);
      await fetchSavedBooks(user.id);
      setRefreshing(false);
    }
  };

  const handleViewPdf = (fileUrl: string, title: string) => {
    if (fileUrl) {
      router.push({
        pathname: '/pdf-viewer',
        params: { url: fileUrl, title }
      });
    }
  };

  const handleSaveToggle = (bookId: string, bookType: string) => {
    if (user?.id) {
      toggleSaveBook(user.id, bookId, bookType);
    }
  };

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={['top']}>
        <View className="flex-row items-center justify-center px-6 py-4 bg-white border-b border-gray-50">
          <Text className="text-[#203A81] text-lg font-black tracking-tight uppercase">Saved Books</Text>
        </View>
        <View className="flex-1 items-center justify-center p-10">
          <MaterialCommunityIcons name="account-lock-outline" size={80} color="#E5E7EB" />
          <Text className="text-[#203A81] text-xl font-bold mt-6 text-center">Login Required</Text>
          <Text className="text-gray-400 text-center mt-2 mb-8">Please login to view and manage your saved books collection.</Text>
          <TouchableOpacity 
            className="bg-[#203A81] px-10 py-3 rounded-full"
            onPress={() => router.push('/login')}
          >
            <Text className="text-white font-bold">Go to Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FB]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-50">
        <View className="w-10" />
        <Text className="text-[#203A81] text-lg font-black tracking-tight uppercase">Saved Books</Text>
        <TouchableOpacity className="p-2">
          <MaterialCommunityIcons name="dots-horizontal" size={24} color="#203A81" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#203A81']} />
        }
      >
        <View className="px-6 py-6">
          <Text className="text-gray-400 text-[10px] font-black uppercase tracking-[2px] mb-2">My Collection</Text>
          <Text className="text-[#203A81] text-2xl font-black">
            {savedBooks.length} {savedBooks.length === 1 ? 'Book' : 'Books'} Saved
          </Text>
        </View>

        {savedBooks.length > 0 ? (
          savedBooks.map((book: any) => (
            <MaterialCard 
              key={`${book.displayType}-${book.id}`}
              title={book.title} 
              grade={book.grade}
              author={book.author}
              subtitle={book.displayType === 'voice' ? `${book.month} ${book.year}` : (book.subtitle || book.category)}
              description={book.description}
              imageUri={book.imageUri}
              isSaved={true}
              onSavePress={() => handleSaveToggle(book.id, book.displayType)}
              onViewPress={() => handleViewPdf(book.fileUrl, book.title)}
              onDownloadPress={() => {/* Add download logic if needed */}}
            />
          ))
        ) : (
          <View className="flex-1 items-center justify-center p-10 mt-10">
            <View className="bg-white p-8 rounded-full shadow-sm mb-6">
              <MaterialCommunityIcons name="bookmark-outline" size={64} color="#D1D5DB" />
            </View>
            <Text className="text-[#203A81] text-lg font-bold">No saved books yet</Text>
            <Text className="text-gray-400 text-center mt-2 mb-8">Your saved publications will appear here for quick access.</Text>
            <TouchableOpacity 
              className="border border-[#203A81] px-8 py-2.5 rounded-full"
              onPress={() => router.push('/(tabs)/explore')}
            >
              <Text className="text-[#203A81] font-bold">Explore Library</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
