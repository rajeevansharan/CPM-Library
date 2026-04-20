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
  VoiceHeader, 
  IssueCard, 
  ArchiveRow 
} from '@/components/VoiceComponents';

export default function VoiceOfPentecostScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <VoiceHeader />

      <ScrollView 
        className="flex-1 bg-[#F8F9FB]"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        {/* Search Input Section */}
        <View className="px-6 mt-4 mb-4">
           <View className="flex-row items-center bg-gray-100/50 rounded-2xl px-4 py-1 border border-gray-100">
              <MaterialCommunityIcons name="magnify" size={20} color="#9CA3AF" />
              <TextInput 
                 placeholder="Search by Topic or Author..." 
                 className="flex-1 ml-2 text-gray-700 h-12 text-sm"
                 placeholderTextColor="#9CA3AF"
                 style={{ outlineStyle: 'none' } as any}
              />
           </View>
        </View>

        {/* Category Tabs */}
        <View className="px-6 mb-6">
           <View className="flex-row bg-white p-1 rounded-xl shadow-sm border border-gray-100">
              <TouchableOpacity className="flex-1 bg-[#203A81] py-2 rounded-lg items-center shadow-sm">
                 <Text className="text-white font-bold text-xs tracking-tight">Topic</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 py-2 items-center">
                 <Text className="text-gray-400 font-bold text-xs tracking-tight">Author</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 py-2 items-center">
                 <Text className="text-gray-400 font-bold text-xs tracking-tight">Scripture</Text>
              </TouchableOpacity>
           </View>
        </View>

        {/* Dropdown Selectors Placeholder */}
        <View className="flex-row items-center px-6 mb-6 justify-between">
           <View className="flex-row">
              <TouchableOpacity className="bg-blue-50/50 flex-row items-center px-3 py-1.5 rounded-lg border border-blue-50/80 mr-2">
                 <Text className="text-[#203A81] text-xs font-bold mr-2">October</Text>
                 <MaterialCommunityIcons name="chevron-down" size={16} color="#203A81" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-blue-50/50 flex-row items-center px-3 py-1.5 rounded-lg border border-blue-50/80">
                 <Text className="text-[#203A81] text-xs font-bold mr-2">2023</Text>
                 <MaterialCommunityIcons name="chevron-down" size={16} color="#203A81" />
              </TouchableOpacity>
           </View>
           <Text className="text-gray-300 text-[9px] font-black uppercase tracking-widest">Issues</Text>
        </View>

        {/* magazine Grid Section */}
        <View className="px-6 flex-row flex-wrap justify-between">
           <IssueCard 
              title="October 2023" 
              subtitle="The Power of Stillness" 
              imageUri="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop"
              isNew={true}
           />
           <IssueCard 
              title="September 2023" 
              subtitle="Walk by Faith" 
              imageUri="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop"
           />
           <IssueCard 
              title="August 2023" 
              subtitle="A New Covenant" 
              imageUri="https://images.unsplash.com/photo-1532012197367-e43d0f467e9f?q=80&w=400&auto=format&fit=crop"
           />
           <IssueCard 
              title="July 2023" 
              subtitle="Praise and Worship" 
              imageUri="https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=400&auto=format&fit=crop"
           />
        </View>

        {/* Publication Archive Section */}
        <View className="px-6 mt-4">
           <View className="flex-row justify-between items-end mb-4">
              <Text className="text-[#203A81] text-lg font-black tracking-tight">Publication Archive</Text>
              <TouchableOpacity>
                 <Text className="text-[#C5A059] text-[10px] font-black uppercase tracking-widest">View All</Text>
              </TouchableOpacity>
           </View>
           
           <ArchiveRow title="2022 Collection" subtitle="12 Issues Available" />
           <ArchiveRow title="2021 Collection" subtitle="12 Issues Available" />
           <ArchiveRow title="2020 Collection" subtitle="Special Jubilee Edition" />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
