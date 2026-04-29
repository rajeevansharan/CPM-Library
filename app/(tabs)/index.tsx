import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  SearchHeader, 
  VerseOfTheDay, 
  ActionCard, 
  CategoryChip, 
  BookCard, 
  FeaturedCard 
} from '@/components/HomeComponents';

import { useBooks } from '@/context/BooksContext';

export default function HomeScreen() {
  const { scriptureBooks, voiceBooks, pentecostBooks } = useBooks();

  // Combine and sort by date (descending)
  const recentUploads = [
    ...scriptureBooks.map(b => ({ ...b, author: b.grade || 'Scripture School' })),
    ...pentecostBooks.map(b => ({ ...b, author: b.author || 'Pentecost Books' }))
  ]
  .sort((a, b) => {
    const dateA = new Date((a as any).createdAt || 0).getTime();
    const dateB = new Date((b as any).createdAt || 0).getTime();
    return dateB - dateA;
  })
  .slice(0, 10); // Take top 10 newest items across all categories

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FB]" edges={['top']}>
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
      >
        {/* Top Header */}
        <SearchHeader />

        {/* Verse of the Day Section */}
        <VerseOfTheDay />

        {/* Categories Grid (2x2) */}
        <View className="flex-row flex-wrap justify-between px-4 mb-6">
          <ActionCard 
            title="Scripture School" 
            subtitle="Lessons & Curriculum" 
            icon="school-outline" 
            color="#203A81"
            href="/scripture-school"
          />
          <ActionCard 
            title="Voice Of Pentecost" 
            subtitle="Archives & Periodicals" 
            icon="bullhorn-variant-outline" 
            color="#203A81"
            href="/voice-of-pentecost"
          />
          <ActionCard 
            title="Books of Pentecost" 
            subtitle="Spiritual Literature" 
            icon="book-open-variant" 
            color="#203A81"
            href="/books-of-pentecost"
          />
          <ActionCard 
            title="Concordance Bible" 
            subtitle="Study & References" 
            icon="format-list-bulleted" 
            color="#203A81"
            href="/concordance"
          />
        </View>

        {/* Recent Uploads Section */}
        <View className="px-4 mb-8">
          <View className="flex-row justify-between items-end mb-5">
            <Text className="text-[#203A81] text-xl font-bold">Recent Uploads</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recentUploads.length > 0 ? (
              recentUploads.map((book) => (
                <BookCard 
                  key={`${book.type}-${book.id}`} 
                  title={book.title} 
                  author={book.author} 
                  imageUri={(book as any).imageUri}
                />
              ))
            ) : (
              <View className="py-4 px-2">
                <Text className="text-gray-400 italic">No recent uploads available</Text>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Featured Publication Section */}
        <View className="px-4 mb-6">
          <Text className="text-[#203A81] text-lg font-bold mb-4">Monthly Featured Publication</Text>
          {(() => {
            const now = new Date();
            const currentMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][now.getMonth()];
            const currentYear = now.getFullYear().toString();

            // Find book for current month/year
            let featuredBook = voiceBooks.find(b => b.month === currentMonth && b.year === currentYear);
            
            // Fallback: If no book for current month, take the absolute newest Voice of Pentecost book
            if (!featuredBook && voiceBooks.length > 0) {
              featuredBook = [...voiceBooks].sort((a, b) => {
                const dateA = new Date((a as any).createdAt || 0).getTime();
                const dateB = new Date((b as any).createdAt || 0).getTime();
                return dateB - dateA;
              })[0];
            }

            return <FeaturedCard book={featuredBook} />;
          })()}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

