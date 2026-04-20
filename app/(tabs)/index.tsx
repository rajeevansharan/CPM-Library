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

export default function HomeScreen() {
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

        {/* Category Filters */}
        <View className="mb-8">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            <CategoryChip label="All Items" active={true} />
            <CategoryChip label="New Arrivals" />
            <CategoryChip label="Theology" />
            <CategoryChip label="History" />
            <CategoryChip label="Prophecy" />
          </ScrollView>
        </View>

        {/* Recent Uploads Section */}
        <View className="px-4 mb-8">
          <View className="flex-row justify-between items-end mb-5">
            <Text className="text-[#203A81] text-xl font-bold">Recent Uploads</Text>
            <TouchableOpacity>
              <Text className="text-[#203A81] text-sm font-bold">See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <BookCard title="Steps to Salvation" author="Ministry Staff" />
            <BookCard title="Early Church Truth" author="History Dept." />
            <BookCard title="The Holy Ghost" author="CPM Elders" />
            <BookCard title="Living Water" author="Archive Team" />
          </ScrollView>
        </View>

        {/* Featured Publication Section */}
        <View className="px-4 mb-6">
          <Text className="text-[#203A81] text-lg font-bold mb-4">Monthly Featured Publication</Text>
          <FeaturedCard />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

