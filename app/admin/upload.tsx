import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AdminHeader, AdminInput, UploadZone } from '@/components/AdminComponents';
import { useBooks } from '@/context/BooksContext';

export default function UploadBookScreen() {
  const router = useRouter();
  const { addScriptureBook, addVoiceBook } = useBooks();

  const [type, setType] = useState<'scripture' | 'voice'>('scripture');
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    grade: '',
    level: 'Beginner',
    year: '2024 Edition',
    month: 'January'
  });

  const handleUpload = () => {
    if (!formData.title) {
      Alert.alert("Error", "Please enter a title");
      return;
    }

    if (type === 'scripture') {
      addScriptureBook({
        title: formData.title,
        level: formData.level,
        year: formData.year,
        category: 'Grade',
        badge: 'NEW'
      });
    } else {
      addVoiceBook({
        title: formData.title,
        month: formData.month,
        year: formData.year.split(' ')[0], // Extract year
        subtitle: formData.subtitle || "The Power of Faith",
        category: "Topic",
        isNew: true
      });
    }

    Alert.alert(
      "Success", 
      `${type === 'scripture' ? 'Book' : 'Issue'} uploaded successfully!`,
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <AdminHeader title="Upload Publication" showBack onBack={() => router.back()} />

      <ScrollView 
        className="flex-1 bg-[#F8F9FB]" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Category Selector */}
        <View className="px-6 mt-6 mb-6">
           <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-3 ml-1">Select Publication Type</Text>
           <View className="flex-row bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
              <TouchableOpacity 
                onPress={() => setType('scripture')}
                className={`flex-1 py-3 rounded-xl flex-row justify-center items-center ${type === 'scripture' ? 'bg-[#203A81]' : ''}`}
              >
                 <MaterialCommunityIcons name="book-open-page-variant" size={18} color={type === 'scripture' ? 'white' : '#9CA3AF'} className="mr-2" />
                 <Text className={`font-bold text-sm ${type === 'scripture' ? 'text-white' : 'text-gray-400'}`}>Scripture School</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setType('voice')}
                className={`flex-1 py-3 rounded-xl flex-row justify-center items-center ${type === 'voice' ? 'bg-[#203A81]' : ''}`}
              >
                 <MaterialCommunityIcons name="library-shelves" size={18} color={type === 'voice' ? 'white' : '#9CA3AF'} className="mr-2" />
                 <Text className={`font-bold text-sm ${type === 'voice' ? 'text-white' : 'text-gray-400'}`}>Voice of Pentecost</Text>
              </TouchableOpacity>
           </View>
        </View>

        <View className="px-6">
           {/* Basic Metadata */}
           <AdminInput 
             label="Publication Title" 
             placeholder={type === 'scripture' ? "e.g. Grade 10: Faith and Action" : "e.g. October 2024"} 
             icon="format-title" 
             value={formData.title}
             onChangeText={(t) => setFormData({...formData, title: t})}
           />

           {type === 'voice' && (
             <AdminInput 
               label="Issue Subtitle" 
               placeholder="e.g. The Power of Stillness" 
               icon="text-short" 
               value={formData.subtitle}
               onChangeText={(t) => setFormData({...formData, subtitle: t})}
             />
           )}

           <AdminInput 
             label="Detailed Description" 
             placeholder="Enter a brief summary of the content..." 
             icon="text-subject" 
             multiline
             value={formData.description}
             onChangeText={(t) => setFormData({...formData, description: t})}
           />

           {/* Type Specific Metadata */}
           <View className="flex-row mb-6">
              <View className="flex-1 mr-2">
                 <Text className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest ml-1">
                   {type === 'scripture' ? 'Level' : 'Month'}
                 </Text>
                 <View className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm flex-row justify-between items-center">
                    <Text className="text-[#203A81] text-sm font-bold">
                      {type === 'scripture' ? formData.level : formData.month}
                    </Text>
                    <MaterialCommunityIcons name="chevron-down" size={18} color="#203A81" />
                 </View>
              </View>
              <View className="flex-1 ml-2">
                 <Text className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest ml-1">Year / Edition</Text>
                 <View className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm flex-row justify-between items-center">
                    <Text className="text-[#203A81] text-sm font-bold">{formData.year}</Text>
                    <MaterialCommunityIcons name="chevron-down" size={18} color="#203A81" />
                 </View>
              </View>
           </View>

           {/* File Uploads */}
           <View className="flex-row">
              <View className="flex-1 mr-2">
                 <UploadZone 
                    label="Cover Image" 
                    icon="image-outline" 
                    sublabel="JPG, PNG (Max 5MB)" 
                    type="image" 
                 />
              </View>
              <View className="flex-1 ml-2">
                 <UploadZone 
                    label="Publication File" 
                    icon="file-pdf-box" 
                    sublabel="PDF, EPUB (Max 50MB)" 
                 />
              </View>
           </View>

           {/* Submit Button */}
           <TouchableOpacity 
             onPress={handleUpload}
             className="bg-[#203A81] py-4 rounded-2xl items-center shadow-lg shadow-blue-900/20 active:opacity-90 mt-4"
           >
              <View className="flex-row items-center">
                 <MaterialCommunityIcons name="check-circle" size={20} color="white" className="mr-2" />
                 <Text className="text-white font-black text-base uppercase tracking-widest ml-2">Publish Publication</Text>
              </View>
           </TouchableOpacity>

           <TouchableOpacity 
             onPress={() => router.back()}
             className="mt-4 py-4 items-center"
           >
              <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Discard Draft</Text>
           </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
