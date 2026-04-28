import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { 
  BooksHeader, 
  FilterChip, 
  BookDetailCard 
} from '@/components/BookComponents';
import { useBooks } from '@/context/BooksContext';

export default function BooksOfPentecostScreen() {
  const { pentecostBooks } = useBooks();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header with blue background */}
      <BooksHeader title="Books of Pentecost" />

      <ScrollView 
        className="flex-1 bg-[#F8F9FB]"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        {/* Filters Section */}
        <View className="bg-white pb-6 pt-4 border-b border-gray-100 shadow-sm">
           {/* Language & Filter Selection */}
           <View className="flex-row items-center px-6 justify-between">
              <View className="flex-row items-center flex-1">
                 <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest mr-4">Language</Text>
                 <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FilterChip label="English" variant="language" active />
                    <FilterChip label="Sinhala" variant="language" />
                    <FilterChip label="Tamil" variant="language" />
                 </ScrollView>
              </View>
              <TouchableOpacity className="bg-gray-100/50 p-2 px-3 rounded-lg flex-row items-center border border-gray-100">
                 <MaterialCommunityIcons name="tune-variant" size={16} color="#203A81" />
                 <Text className="text-[#203A81] text-[10px] font-black ml-1 uppercase">Filter</Text>
              </TouchableOpacity>
           </View>
        </View>

        {/* Books List Section */}
        <View className="px-6 pt-6">
           {pentecostBooks.length > 0 ? (
             pentecostBooks.map((book) => (
               <BookDetailCard 
                  key={book.id}
                  title={book.title} 
                  author={book.author} 
                  description={book.description}
                  category={book.category.toUpperCase()} 
                  categoryColor="#C5A059"
                  languages={book.languages}
                  imageUri={book.imageUri}
               />
             ))
           ) : (
             <View className="items-center justify-center py-20">
                <MaterialCommunityIcons name="book-open-variant" size={48} color="#D1D5DB" />
                <Text className="text-gray-400 font-bold mt-4">No books available</Text>
             </View>
           )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
