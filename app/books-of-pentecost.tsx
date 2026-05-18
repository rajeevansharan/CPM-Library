import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  Modal,
  Pressable
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { 
  BooksHeader, 
  BookDetailCard 
} from '@/components/BookComponents';
import { useBooks } from '@/context/BooksContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

/**
 * Custom Selection Picker Modal
 */
const SelectionPicker = ({ 
  isVisible, 
  onClose, 
  options, 
  onSelect, 
  title 
}: { 
  isVisible: boolean, 
  onClose: () => void, 
  options: string[], 
  onSelect: (val: string) => void,
  title: string
}) => (
  <Modal 
    visible={isVisible} 
    transparent 
    animationType="fade" 
    onRequestClose={onClose}
  >
    <Pressable 
      className="flex-1 bg-black/60 justify-center items-center px-10" 
      onPress={onClose}
    >
      <View className="bg-white w-full rounded-[32px] overflow-hidden shadow-2xl">
        <View className="bg-[#203A81] py-5 items-center">
          <Text className="text-white font-black text-sm uppercase tracking-widest">{title}</Text>
        </View>
        <ScrollView className="max-h-80" showsVerticalScrollIndicator={false}>
          {options.map((opt) => (
            <TouchableOpacity 
              key={opt} 
              className="py-5 items-center border-b border-gray-50 active:bg-gray-50"
              onPress={() => { onSelect(opt); onClose(); }}
            >
              <Text className="text-[#203A81] font-bold text-base">{opt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity 
          className="py-5 items-center bg-gray-50" 
          onPress={onClose}
        >
          <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Cancel</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  </Modal>
);

export default function BooksOfPentecostScreen() {
  const { user } = useAuth();
  const { pentecostBooks, savedBooks, toggleSaveBook } = useBooks();
  const { showToast } = useToast();
  
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isLanguagePickerVisible, setIsLanguagePickerVisible] = useState(false);

  const isBookSaved = (bookId: string) => {
    return savedBooks.some((b: any) => b.id === bookId);
  };

  const handleSaveToggle = (bookId: string) => {
    if (user?.id) {
      toggleSaveBook(user.id, bookId, 'pentecost');
    } else {
      showToast('Please log in to save books', 'info');
    }
  };

  const filteredBooks = selectedLanguage
    ? pentecostBooks.filter(book => book.languages && book.languages.includes(selectedLanguage))
    : pentecostBooks;

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
        <View className="bg-white pb-6 pt-4 border-b border-gray-100 shadow-sm px-6">
           <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                 <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest mr-4">Language</Text>
                 <TouchableOpacity 
                   onPress={() => setIsLanguagePickerVisible(true)}
                   className="bg-blue-50/50 flex-row items-center px-4 py-2 rounded-xl border border-blue-100/50"
                 >
                    <Text className="text-[#203A81] text-[11px] font-black mr-2 uppercase tracking-tighter">
                      {selectedLanguage || 'All Languages'}
                    </Text>
                    <MaterialCommunityIcons name="chevron-down" size={16} color="#203A81" />
                 </TouchableOpacity>
              </View>
              {selectedLanguage && (
                <TouchableOpacity 
                  onPress={() => setSelectedLanguage(null)}
                  className="bg-rose-50 p-2 px-3 rounded-lg flex-row items-center border border-rose-100"
                >
                   <MaterialCommunityIcons name="close-circle-outline" size={12} color="#EF4444" style={{ marginRight: 4 }} />
                   <Text className="text-rose-500 text-[10px] font-black uppercase ml-1">Clear Filter</Text>
                </TouchableOpacity>
              )}
           </View>
        </View>

        {/* Books List Section */}
        <View className="px-6 pt-6">
           {filteredBooks.length > 0 ? (
             filteredBooks.map((book) => (
               <BookDetailCard 
                  key={book.id}
                  id={book.id}
                  type="pentecost"
                  title={book.title} 
                  author={book.author} 
                  description={book.description}
                  category={book.category.toUpperCase()} 
                  categoryColor="#C5A059"
                  languages={book.languages}
                  imageUri={book.imageUri}
                  fileUrl={book.fileUrl}
                  isSaved={isBookSaved(book.id)}
                  onSavePress={() => handleSaveToggle(book.id)}
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

      {/* Selectors Pickers */}
      <SelectionPicker 
        isVisible={isLanguagePickerVisible}
        onClose={() => setIsLanguagePickerVisible(false)}
        options={['English', 'Sinhala', 'Tamil']}
        onSelect={(lang) => setSelectedLanguage(lang)}
        title="Select Language"
      />
    </SafeAreaView>
  );
}
