import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AdminHeader, ConfirmModal } from '@/components/AdminComponents';
import { useBooks, VoiceIssue } from '@/context/BooksContext';
import { useToast } from '@/context/ToastContext';

export default function ManageVoiceScreen() {
  const router = useRouter();
  const { voiceBooks, deleteBook } = useBooks();
  const { showToast } = useToast();
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [selectedIssue, setSelectedIssue] = React.useState<VoiceIssue | null>(null);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

  const handleConfirmDelete = async () => {
    if (!selectedIssue) return;
    setDeletingId(selectedIssue.id);
    try {
      await deleteBook('voice', selectedIssue.id);
      showToast(`"${selectedIssue.title}" deleted successfully!`, 'success');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showToast('Failed to delete issue', 'error');
    } finally {
      setDeletingId(null);
      setSelectedIssue(null);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <AdminHeader 
        title="Manage Voice issues" 
        showBack 
        onBack={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace('/admin');
          }
        }} 
      />

      <ScrollView 
        className="flex-1 bg-[#F8F9FB]" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <View className="px-6 mt-6">
           <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-4 ml-1">Voice of Pentecost issues</Text>
           
           {voiceBooks.length > 0 ? (
             voiceBooks.map((issue) => (
               <View 
                 key={issue.id} 
                 className="bg-white p-4 rounded-3xl flex-row items-center mb-4 shadow-sm border border-gray-100"
               >
                  {/* Thumbnail */}
                  <View className="w-14 h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                    <Image 
                      source={{ uri: issue.imageUri || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&auto=format&fit=crop' }}
                      className="flex-1"
                      resizeMode="cover"
                    />
                  </View>

                  <View className="flex-1 ml-4">
                    <Text className="text-gray-400 text-[9px] font-black uppercase tracking-tighter">{issue.month} {issue.year}</Text>
                    <Text className="text-[#203A81] font-bold text-sm" numberOfLines={2}>{issue.title}</Text>
                  </View>

                  <View className="flex-row">
                    <TouchableOpacity 
                      className="p-3 bg-blue-50 rounded-full ml-2"
                      onPress={() => router.push({
                        pathname: '/admin/upload',
                        params: {
                          id: issue.id,
                          type: 'voice',
                          title: issue.title,
                          month: issue.month,
                          year: issue.year,
                          subtitle: issue.subtitle || '',
                          description: issue.description || '',
                          imageUri: issue.imageUri || '',
                          fileUrl: issue.fileUrl || ''
                        }
                      })}
                    >
                      <MaterialCommunityIcons 
                        name="pencil-outline" 
                        size={20} 
                        color="#203A81" 
                      />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      className={`p-3 bg-red-50 rounded-full ml-2 ${deletingId === issue.id ? 'opacity-50' : ''}`}
                      onPress={() => {
                        if (!deletingId) {
                          setSelectedIssue(issue);
                          setIsConfirmVisible(true);
                        }
                      }}
                      disabled={!!deletingId}
                    >
                      <MaterialCommunityIcons 
                        name={deletingId === issue.id ? "timer-sand" : "delete-outline"} 
                        size={20} 
                        color="#EF4444" 
                      />
                    </TouchableOpacity>
                  </View>
               </View>
             ))
           ) : (
             <View className="items-center justify-center py-20">
               <MaterialCommunityIcons name="library-shelves" size={48} color="#D1D5DB" />
               <Text className="text-gray-400 font-bold mt-4">No issues uploaded yet</Text>
             </View>
           )}
        </View>
      </ScrollView>
      <ConfirmModal
        isVisible={isConfirmVisible}
        onClose={() => setIsConfirmVisible(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Issue"
        message={`Are you sure you want to delete this issue: "${selectedIssue?.title}"? This action cannot be undone.`}
      />
    </SafeAreaView>
  );
}
