import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { 
  ProfileHeader, 
  ProfileInfo, 
  MenuItem, 
  SignOutButton 
} from '@/components/ProfileComponents';

export default function ProfileScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  const handleSignOut = () => {
    // Navigate back to login
    router.replace('/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FB]" edges={['top']}>
      <ProfileHeader />

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
      >
        {/* Profile User Info */}
        <ProfileInfo 
          name="Daniel Wickramasinghe" 
          memberId="Member ID: CPM-7782-SL" 
        />

        {/* My Library Section */}
        <View className="px-6 mb-8">
          <Text className="text-gray-400 text-[10px] font-black uppercase tracking-[1.5px] mb-4">My Library</Text>
          <View className="bg-white rounded-[32px] px-5 py-2 shadow-lg shadow-blue-900/5 border border-gray-50">
             <MenuItem icon="book-open-variant" title="Saved Books" />
             <MenuItem icon="bookmark-outline" title="My Bookmarks" />
             <MenuItem icon="cloud-download-outline" title="Download History" />
          </View>
        </View>

         {/* App Preferences Section */}
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

        {/* Administrative Section */}
        <View className="px-6 mb-8">
          <Text className="text-gray-400 text-[10px] font-black uppercase tracking-[1.5px] mb-4">Administrative</Text>
          <View className="bg-white rounded-[32px] px-5 py-2 shadow-lg shadow-blue-900/5 border border-gray-50">
             <MenuItem 
                icon="shield-account-outline" 
                title="Admin Portal" 
                subtitle="Manage library content"
                onPress={() => router.push('/admin')}
             />
          </View>
        </View>

        {/* Sign Out Action */}
        <SignOutButton onPress={handleSignOut} />

        {/* Footer Info */}
        <View className="items-center mt-12 mb-6">
            <MaterialCommunityIcons name="book-multiple" size={24} color="#D1D5DB" />
            <Text className="text-[#D1D5DB] text-[10px] font-black uppercase tracking-widest mt-3">
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
