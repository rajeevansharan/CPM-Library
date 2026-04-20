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

export default function BooksOfPentecostScreen() {
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
           {/* Topic Filters */}
           <View className="flex-row items-center px-6 mb-4">
              <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest mr-4">Topic</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                 <FilterChip label="All" active={true} />
                 <FilterChip label="Doctrine" />
                 <FilterChip label="Biography" />
                 <FilterChip label="Hymns" />
              </ScrollView>
           </View>

           {/* Language & Filter Selection */}
           <View className="flex-row items-center px-6 justify-between">
              <View className="flex-row items-center flex-1">
                 <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest mr-4">Language</Text>
                 <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FilterChip label="English" variant="language" />
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
           <BookDetailCard 
              title="Foundation of Faith" 
              author="by Pastor T. Frederick" 
              description="A comprehensive guide to the apostolic teachings and core beliefs of the mission."
              category="DOCTRINE" 
              categoryColor="#C5A059"
              languages={['English', 'Sinhala']}
              coverColor="#1B7A63"
           />
           <BookDetailCard 
              title="The Faith of Pioneers" 
              author="by CPM Historical Society" 
              description="Inspiring life stories of the founding fathers of the mission and their journey."
              category="BIOGRAPHY" 
              categoryColor="#85A1D6"
              languages={['English']}
              coverColor="#E6DCC5"
           />
           <BookDetailCard 
              title="Pentecostal Messenger" 
              author="Monthly Edition - October" 
              description="Official monthly publication featuring spiritual insights and missionary news."
              category="PUBLICATIONS" 
              categoryColor="#D68585"
              languages={['Tamil', 'Sinhala']}
              coverColor="#1B7A63"
           />
           <BookDetailCard 
              title="Junior Bible Studies" 
              author="Lesson Series 4" 
              description="Easy-to-follow Bible lessons designed for children and junior youth."
              category="SCRIPTURE SCHOOL" 
              categoryColor="#85D6A1"
              languages={['English']}
              coverColor="#E6DCC5"
           />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
