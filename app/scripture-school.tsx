import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { 
  ScriptureHeader, 
  FilterPill, 
  MaterialCard 
} from '@/components/ScriptureSchoolComponents';

export default function ScriptureSchoolScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FB]" edges={['top']}>
      {/* Header */}
      <ScriptureHeader />

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        {/* Search Bar section */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center bg-gray-100/80 rounded-2xl px-4 py-1 border border-gray-100">
            <MaterialCommunityIcons name="magnify" size={20} color="#9CA3AF" />
            <TextInput 
              placeholder="Search Sunday School books..." 
              className="flex-1 ml-2 text-gray-700 h-11 text-sm font-medium"
              placeholderTextColor="#9CA3AF"
              style={{ outlineStyle: 'none' } as any}
            />
          </View>
        </View>

        {/* Filter Selection Section */}
        <View className="mb-8">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            <FilterPill label="Grade" />
            <FilterPill label="Category" active={true} />
            <FilterPill label="Year" />
          </ScrollView>
        </View>

        {/* List Header Section */}
        <View className="flex-row justify-between items-center px-6 mb-6">
          <Text className="text-gray-400 text-[10px] font-black uppercase tracking-[1px]">Available Materials</Text>
          <TouchableOpacity className="flex-row items-center">
            <MaterialCommunityIcons name="sort-variant" size={16} color="#203A81" />
            <Text className="text-[#203A81] text-[10px] font-bold ml-1">Alphabetical</Text>
          </TouchableOpacity>
        </View>

        {/* Materials List */}
        <MaterialCard 
          title="Grade 8: Understanding Faith" 
          level="Intermediate" 
          year="2024 Curriculum" 
          badge="MOST DOWNLOADED" 
        />
        <MaterialCard 
          title="Grade 12: Foundations of Truth" 
          level="Advanced" 
          year="2024 Curriculum" 
          badge="NEW" 
          imageUri="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=300&auto=format&fit=crop"
        />
        <MaterialCard 
          title="Grade 2: The Loving Shepherd" 
          level="Beginner" 
          year="2023 Edition" 
          badge="MOST DOWNLOADED"
          imageUri="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300&auto=format&fit=crop"
        />
        <MaterialCard 
          title="Grade 5: The Life of David" 
          level="Intermediate" 
          year="2024 Curriculum" 
          imageUri="https://images.unsplash.com/photo-1532012197367-e43d0f467e9f?q=80&w=300&auto=format&fit=crop"
        />
        <MaterialCard 
          title="Grade 10: Prophetic Writings" 
          level="Advanced" 
          year="2022 Archive" 
          imageUri="https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=300&auto=format&fit=crop"
        />

      </ScrollView>
    </SafeAreaView>
  );
}
