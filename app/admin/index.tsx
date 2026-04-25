import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AdminHeader, StatCard, QuickAction } from '@/components/AdminComponents';
import { useBooks } from '@/context/BooksContext';

export default function AdminDashboard() {
  const router = useRouter();
  const { scriptureBooks, voiceBooks } = useBooks();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <AdminHeader title="Admin Dashboard" />

      <ScrollView 
        className="flex-1 bg-[#F8F9FB]" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Stats Section */}
        <View className="px-5 pt-6 flex-row">
           <StatCard 
             title="Scripture Books" 
             value={scriptureBooks.length} 
             icon="book-open-page-variant" 
             color="#203A81" 
           />
           <StatCard 
             title="Voice Issues" 
             value={voiceBooks.length} 
             icon="library-shelves" 
             color="#C5A059" 
           />
        </View>

        {/* Quick Actions */}
        <View className="px-6 mt-8">
           <Text className="text-[#203A81] text-lg font-black tracking-tight mb-4">Quick Actions</Text>
           
           <QuickAction 
             title="Upload New Publication" 
             icon="cloud-upload" 
             onPress={() => router.push('/admin/upload')}
             color="#203A81"
           />
           
           <QuickAction 
             title="Manage Categories" 
             icon="format-list-bulleted-type" 
             onPress={() => {}}
             color="#C5A059"
           />
           
           <QuickAction 
             title="User Analytics" 
             icon="chart-timeline-variant" 
             onPress={() => {}}
             color="#3B82F6"
           />
        </View>

        {/* Recent Activity Section */}
        <View className="px-6 mt-8">
           <View className="flex-row justify-between items-center mb-4">
              <Text className="text-[#203A81] text-lg font-black tracking-tight">Recent Uploads</Text>
              <TouchableOpacity>
                 <Text className="text-[#C5A059] text-[10px] font-black uppercase tracking-widest">See All</Text>
              </TouchableOpacity>
           </View>

           {/* Simple Activity List */}
           {[...scriptureBooks, ...voiceBooks].slice(0, 3).map((item, idx) => (
             <View key={idx} className="bg-white p-4 rounded-2xl mb-3 flex-row items-center border border-gray-50 shadow-sm">
                <View className="bg-gray-100 p-2 rounded-lg mr-3">
                   <MaterialCommunityIcons name="file-document-outline" size={18} color="#9CA3AF" />
                </View>
                <View className="flex-1">
                   <Text className="text-[#203A81] font-bold text-sm" numberOfLines={1}>{item.title}</Text>
                   <Text className="text-gray-400 text-[10px]">{('level' in item) ? 'Scripture School' : 'Voice of Pentecost'}</Text>
                </View>
                <Text className="text-gray-300 text-[9px] font-bold">2h ago</Text>
             </View>
           ))}
        </View>

        {/* System Status */}
        <View className="px-6 mt-6">
           <View className="bg-green-50/50 border border-green-100 p-4 rounded-2xl flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-green-500 mr-3" />
              <Text className="text-green-700 text-[11px] font-bold">System Status: All systems operational</Text>
           </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
