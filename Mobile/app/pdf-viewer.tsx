import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import PdfRenderer from '@/components/PdfRenderer';

export default function PdfViewerScreen() {
  const { url, title } = useLocalSearchParams();
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  if (!url) {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={['top']}>
        <View className="flex-row items-center px-6 py-4 border-b border-gray-100">
          <TouchableOpacity onPress={handleBack} className="p-2 -ml-2">
            <MaterialCommunityIcons name="chevron-left" size={28} color="#203A81" />
          </TouchableOpacity>
          <Text className="text-[#203A81] text-sm font-black ml-4 uppercase tracking-wider">Back</Text>
        </View>
        <View className="flex-1 items-center justify-center bg-[#F8F9FB] p-6">
          <MaterialCommunityIcons name="file-alert-outline" size={48} color="#9CA3AF" />
          <Text className="text-[#203A81] text-lg font-bold mt-4">File not found</Text>
          <Text className="text-gray-400 text-sm text-center mt-2 mb-6">This publication is currently unavailable.</Text>
          <TouchableOpacity onPress={handleBack} className="border border-[#203A81] px-8 py-2.5 rounded-full">
            <Text className="text-[#203A81] font-bold">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const pdfUrl = url as string;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
        <TouchableOpacity onPress={handleBack} className="p-2 -ml-2">
          <MaterialCommunityIcons name="chevron-left" size={28} color="#203A81" />
        </TouchableOpacity>
        <Text className="text-[#203A81] text-xs font-black flex-1 text-center px-4 uppercase tracking-wider" numberOfLines={1}>
          {title || 'Viewing Publication'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <View className="flex-1 bg-gray-100">
        <PdfRenderer url={pdfUrl} title={title as string} />
      </View>
    </SafeAreaView>
  );
}
