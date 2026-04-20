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
  ConcordanceHeader, 
  VersionChip, 
  VerseCard 
} from '@/components/ConcordanceComponents';

export default function ConcordanceScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <ConcordanceHeader />

      <ScrollView 
        className="flex-1 bg-[#F8F9FB]"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        {/* Search Input Section */}
        <View className="px-6 mt-4 mb-4">
           <View className="flex-row items-center bg-gray-100/50 rounded-2xl px-4 py-1 border border-gray-100">
              <MaterialCommunityIcons name="magnify" size={20} color="#203A81" />
              <TextInput 
                 value="Faith"
                 className="flex-1 ml-2 text-[#203A81] h-12 font-bold"
                 placeholderTextColor="#9CA3AF"
                 style={{ outlineStyle: 'none' } as any}
              />
           </View>
        </View>

        {/* Language Tabs */}
        <View className="px-6 mb-4">
           <View className="flex-row bg-gray-100 p-1 rounded-xl">
              <TouchableOpacity className="flex-1 bg-[#203A81] py-2 rounded-lg items-center shadow-sm">
                 <Text className="text-white font-bold text-xs">English</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 py-2 items-center">
                 <Text className="text-gray-400 font-bold text-xs">தமிழ்</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 py-2 items-center">
                 <Text className="text-gray-400 font-bold text-xs">සිංහල</Text>
              </TouchableOpacity>
           </View>
        </View>

        {/* Version Horizontal Selector */}
        <View className="mb-6">
           <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
              className="bg-gray-100/40 py-2"
           >
              <VersionChip label="KJV" active={true} />
              <VersionChip label="NIV" />
              <VersionChip label="ESV" />
              <VersionChip label="NLT" />
           </ScrollView>
        </View>

        {/* Results Header */}
        <View className="flex-row justify-between items-center px-6 mb-4">
           <Text className="text-gray-400 text-[10px] font-black tracking-widest uppercase">12 Matches Found</Text>
           <TouchableOpacity className="flex-row items-center">
              <MaterialCommunityIcons name="sort-variant" size={16} color="#203A81" />
              <Text className="text-[#203A81] text-[10px] font-bold ml-1">Sort</Text>
           </TouchableOpacity>
        </View>

        {/* Results List */}
        <View className="px-6">
           <VerseCard 
              reference="Hebrews 11:1" 
              version="KJV" 
              text="Now faith is the substance of things hoped for, the evidence of things not seen."
              highlight="faith"
           />
           <VerseCard 
              reference="Matthew 17:20" 
              version="KJV" 
              text="And Jesus said unto them, Because of your unbelief: for verily I say unto you, If ye have faith as a grain of mustard seed, ye shall say unto this mountain, Remove hence..."
              highlight="faith"
           />
           <VerseCard 
              reference="Ephesians 2:8" 
              version="KJV" 
              text="For by grace are ye saved through faith; and that not of yourselves: it is the gift of God."
              highlight="faith"
           />
           <VerseCard 
              reference="Galatians 2:20" 
              version="KJV" 
              text="I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God..."
              highlight="faith"
           />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
