import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  ProfileInfo, 
  MenuItem, 
  SignOutButton 
} from '@/components/ProfileComponents';

export default function ProfileTabScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  const handleSignOut = () => {
    router.replace('/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FB]" edges={['top']}>
      {/* Tab Header (No back button) */}
      <View className="flex-row items-center justify-center px-6 py-4 bg-white">
        <Text className="text-[#203A81] text-lg font-bold">Profile</Text>
      </View>

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
      >
        <ProfileInfo 
          name="Daniel Wickramasinghe" 
          memberId="Member ID: CPM-7782-SL" 
        />

        <View className="px-6 mb-8">
          <Text className="text-gray-400 text-[10px] font-black uppercase tracking-[1.5px] mb-4">My Library</Text>
          <View className="bg-white rounded-[32px] px-5 py-2 shadow-lg shadow-blue-900/5 border border-gray-50">
             <MenuItem icon="book-open-variant" title="Saved Books" />
             <MenuItem icon="bookmark-outline" title="My Bookmarks" />
             <MenuItem icon="cloud-download-outline" title="Download History" />
          </View>
        </View>

        <View className="px-6 mb-8">
          <Text className="text-gray-400 text-[10px] font-black uppercase tracking-[1.5px] mb-4">App Preferences</Text>
          <View className="bg-white rounded-[32px] px-5 py-2 shadow-lg shadow-blue-900/5 border border-gray-50">
             <MenuItem icon="bell-outline" title="Notification Preferences" />
             <MenuItem 
                icon="translate" 
                title="Language Selection" 
                subtitle="English (UK)" 
             />
             <MenuItem 
                icon="moon-waning-crescent" 
                title="Dark Mode" 
                showSwitch={true} 
                switchValue={darkMode}
                onSwitchChange={setDarkMode}
             />
          </View>
        </View>

        <SignOutButton onPress={handleSignOut} />

        <View className="items-center mt-12 mb-6">
            <View className="bg-gray-100 p-2 rounded-lg mb-3">
               <Text className="text-[#203A81] font-serif font-black text-xs">CPM</Text>
            </View>
            <Text className="text-[#D1D5DB] text-[10px] font-black uppercase tracking-widest text-center px-10">
              Ceylon Pentecostal Mission Library
            </Text>
            <Text className="text-gray-300 text-[8px] mt-1 font-bold">
              Version 2.1.0 (Build 56)
            </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

