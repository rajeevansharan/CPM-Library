import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AdminHeader } from '@/components/AdminComponents';
import { useBooks, ScriptureMaterial } from '@/context/BooksContext';

import { Platform } from 'react-native';

export default function ManageBooksScreen() {
  const router = useRouter();
  const { scriptureBooks, deleteBook } = useBooks();

  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const handleDelete = async (book: ScriptureMaterial) => {
    const performDelete = async () => {
      setDeletingId(book.id);
      try {
        await deleteBook('scripture', book.id);
      } finally {
        setDeletingId(null);
      }
    };

    if (Platform.OS === 'web') {
      const confirmed = window.confirm(`Are you sure you want to delete "${book.title}"?`);
      if (confirmed) performDelete();
      return;
    }

    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete "${book.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: performDelete }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <AdminHeader 
        title="Manage Books" 
        showBack 
        onBack={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace('/admin');
          }
        }} 
      />

      <ScrollView 
        className="flex-1 bg-[#F8F9FB]" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <View className="px-6 mt-6">
           <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-4 ml-1">Current Scripture Library</Text>
           
           {scriptureBooks.length > 0 ? (
             scriptureBooks.map((book) => (
               <View 
                 key={book.id} 
                 className="bg-white p-4 rounded-3xl flex-row items-center mb-4 shadow-sm border border-gray-100"
               >
                  {/* Thumbnail */}
                  <View className="w-14 h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                    <Image 
                      source={{ uri: book.imageUri || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&auto=format&fit=crop' }}
                      className="flex-1"
                      resizeMode="cover"
                    />
                  </View>

                  <View className="flex-1 ml-4">
                    <Text className="text-gray-400 text-[9px] font-black uppercase tracking-tighter">{book.grade || 'N/A'}</Text>
                    <Text className="text-[#203A81] font-bold text-sm" numberOfLines={2}>{book.title}</Text>
                  </View>

                  <View className="flex-row">
                    <TouchableOpacity 
                      className={`p-3 bg-red-50 rounded-full ml-2 ${deletingId === book.id ? 'opacity-50' : ''}`}
                      onPress={() => !deletingId && handleDelete(book)}
                      disabled={!!deletingId}
                    >
                      <MaterialCommunityIcons 
                        name={deletingId === book.id ? "timer-sand" : "delete-outline"} 
                        size={20} 
                        color="#EF4444" 
                      />
                    </TouchableOpacity>
                  </View>
               </View>
             ))
           ) : (
             <View className="items-center justify-center py-20">
               <MaterialCommunityIcons name="book-outline" size={48} color="#D1D5DB" />
               <Text className="text-gray-400 font-bold mt-4">No books uploaded yet</Text>
             </View>
           )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
