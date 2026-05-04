import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { 
  FilterPill, 
  MaterialCard 
} from '@/components/ScriptureSchoolComponents';
import { useBooks } from '@/context/BooksContext';
import { useAuth } from '@/context/AuthContext';

export default function LibraryScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { scriptureBooks, voiceBooks, pentecostBooks, refreshBooks, savedBooks, toggleSaveBook } = useBooks();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filters = ['All', 'Scripture', 'Voice', 'Pentecost'];

  const allBooks = useMemo(() => {
    const combined = [
      ...scriptureBooks.map(b => ({ ...b, displayType: 'Scripture' })),
      ...voiceBooks.map(b => ({ ...b, displayType: 'Voice' })),
      ...pentecostBooks.map(b => ({ ...b, displayType: 'Pentecost' }))
    ];
    return combined.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }, [scriptureBooks, voiceBooks, pentecostBooks]);

  const filteredBooks = useMemo(() => {
    return allBooks.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (book.author && book.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (book.description && book.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesFilter = activeFilter === 'All' || book.displayType === activeFilter;
      
      return matchesSearch && matchesFilter;
    });
  }, [allBooks, searchQuery, activeFilter]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshBooks();
    setIsRefreshing(false);
  };

  const handleViewPdf = (fileUrl: string, title: string) => {
    if (fileUrl) {
      router.push({
        pathname: '/pdf-viewer',
        params: { url: fileUrl, title }
      });
    }
  };

  const isBookSaved = (bookId: string) => {
    return savedBooks.some((b: any) => b.id === bookId);
  };

  const handleSaveToggle = (bookId: string, bookType: string) => {
    if (user?.id) {
      toggleSaveBook(user.id, bookId, bookType);
    } else {
      alert('Please log in to save books');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FB]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-50">
        <View className="w-10" />
        <Text className="text-[#203A81] text-lg font-black tracking-tight uppercase">Library</Text>
        <TouchableOpacity onPress={handleRefresh} disabled={isRefreshing}>
          {isRefreshing ? (
            <ActivityIndicator size="small" color="#203A81" />
          ) : (
            <MaterialCommunityIcons name="refresh" size={24} color="#203A81" />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        {/* Search Bar section */}
        <View className="px-6 mb-6 mt-4">
          <View className="flex-row items-center bg-white rounded-2xl px-4 py-1 shadow-sm border border-gray-100">
            <MaterialCommunityIcons name="magnify" size={22} color="#9CA3AF" />
            <TextInput 
              placeholder="Search by title, author or content..." 
              className="flex-1 ml-2 text-gray-700 h-12 text-sm font-medium"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{ outlineStyle: 'none' } as any}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <MaterialCommunityIcons name="close-circle" size={20} color="#D1D5DB" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filter Selection Section */}
        <View className="mb-6">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            {filters.map(filter => (
              <FilterPill 
                key={filter}
                label={filter} 
                active={activeFilter === filter} 
                onPress={() => setActiveFilter(filter)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Featured / Recent Section (Only if All is selected) */}
        {activeFilter === 'All' && searchQuery === '' && allBooks.length > 0 && (
          <View className="mb-8">
            <View className="px-6 mb-4">
              <Text className="text-[#203A81] text-sm font-black uppercase tracking-widest">Recently Added</Text>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
            >
              {allBooks.slice(0, 5).map((book: any) => (
                <TouchableOpacity 
                  key={book.id} 
                  className="mr-4 w-32"
                  onPress={() => handleViewPdf(book.fileUrl, book.title)}
                >
                  <View className="w-32 h-44 bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 mb-2">
                    <Image 
                      source={{ uri: book.imageUri || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&auto=format&fit=crop' }}
                      className="flex-1"
                      resizeMode="cover"
                    />
                  </View>
                  <Text className="text-[#203A81] font-bold text-[10px] uppercase mb-0.5" numberOfLines={1}>{book.displayType}</Text>
                  <Text className="text-gray-800 font-bold text-xs" numberOfLines={2}>{book.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* List Header Section */}
        <View className="flex-row justify-between items-center px-6 mb-4">
          <Text className="text-gray-400 text-[10px] font-black uppercase tracking-[1px]">
            {filteredBooks.length} Materials Available
          </Text>
          <TouchableOpacity className="flex-row items-center">
            <MaterialCommunityIcons name="sort-variant" size={16} color="#203A81" />
            <Text className="text-[#203A81] text-[10px] font-bold ml-1 uppercase">Sort</Text>
          </TouchableOpacity>
        </View>

        {/* Materials List */}
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book: any) => (
            <MaterialCard 
              key={book.id}
              title={book.title} 
              grade={book.grade}
              author={book.author}
              subtitle={book.type === 'voice' ? `${book.month} ${book.year}` : book.subtitle}
              description={book.description}
              imageUri={book.imageUri}
              isSaved={isBookSaved(book.id)}
              onSavePress={() => handleSaveToggle(book.id, book.type)}
              onViewPress={() => handleViewPdf(book.fileUrl, book.title)}
              onDownloadPress={() => {/* Add download logic if needed */}}
            />
          ))
        ) : (
          <View className="flex-1 items-center justify-center py-20 px-10">
            <MaterialCommunityIcons name="book-open-variant" size={64} color="#E5E7EB" />
            <Text className="text-gray-400 text-center mt-4 font-medium">No materials found matching your criteria.</Text>
            <TouchableOpacity 
              className="mt-6 px-6 py-2 bg-[#203A81] rounded-full"
              onPress={() => {
                setActiveFilter('All');
                setSearchQuery('');
              }}
            >
              <Text className="text-white font-bold text-xs">Clear Filters</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

