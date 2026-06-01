import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AdminHeader, ConfirmModal } from '@/components/AdminComponents';
import { useBooks, PentecostBook } from '@/context/BooksContext';
import { useToast } from '@/context/ToastContext';

export default function ManagePentecostScreen() {
  const router = useRouter();
  const { pentecostBooks, deleteBook } = useBooks();
  const { showToast } = useToast();
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [selectedBook, setSelectedBook] = React.useState<PentecostBook | null>(null);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

  const handleConfirmDelete = async () => {
    if (!selectedBook) return;
    setDeletingId(selectedBook.id);
    try {
      await deleteBook('pentecost', selectedBook.id);
      showToast(`"${selectedBook.title}" deleted successfully!`, 'success');
    } catch (error) {
      showToast('Failed to delete book', 'error');
    } finally {
      setDeletingId(null);
      setSelectedBook(null);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <AdminHeader 
        title="Manage Pentecost Books" 
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
           <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-4 ml-1">Books of Pentecost Library</Text>
           
           {pentecostBooks.length > 0 ? (
             pentecostBooks.map((book) => (
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
                    <Text className="text-gray-400 text-[9px] font-black uppercase tracking-widest">{book.category}</Text>
                    <Text className="text-[#203A81] font-bold text-sm" numberOfLines={1}>{book.title}</Text>
                    <Text className="text-gray-400 text-[10px] mt-0.5">{book.author}</Text>
                  </View>

                  <View className="flex-row">
                    <TouchableOpacity 
                      className="p-3 bg-blue-50 rounded-full ml-2"
                      onPress={() => router.push({
                        pathname: '/admin/upload',
                        params: {
                          id: book.id,
                          type: 'pentecost',
                          title: book.title,
                          author: book.author || '',
                          description: book.description || '',
                          category: book.category,
                          languages: book.languages ? book.languages.join(', ') : '',
                          imageUri: book.imageUri || '',
                          fileUrl: book.fileUrl || ''
                        }
                      })}
                    >
                      <MaterialCommunityIcons 
                        name="pencil-outline" 
                        size={20} 
                        color="#203A81" 
                      />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      className={`p-3 bg-red-50 rounded-full ml-2 ${deletingId === book.id ? 'opacity-50' : ''}`}
                      onPress={() => {
                        if (!deletingId) {
                          setSelectedBook(book);
                          setIsConfirmVisible(true);
                        }
                      }}
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
               <MaterialCommunityIcons name="book-open-variant" size={48} color="#D1D5DB" />
               <Text className="text-gray-400 font-bold mt-4">No books uploaded yet</Text>
             </View>
           )}
        </View>
      </ScrollView>
      <ConfirmModal
        isVisible={isConfirmVisible}
        onClose={() => setIsConfirmVisible(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Book"
        message={`Are you sure you want to delete this book: "${selectedBook?.title}"? This action cannot be undone.`}
      />
    </SafeAreaView>
  );
}
