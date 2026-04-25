import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

/**
 * Profile Header with Back button
 */
export const ProfileHeader = () => {
  const router = useRouter();
  return (
    <View className="flex-row items-center justify-between px-6 py-4 bg-white">
      <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
        <MaterialCommunityIcons name="chevron-left" size={28} color="#203A81" />
      </TouchableOpacity>
      <Text className="text-[#203A81] text-lg font-bold">Profile</Text>
      <View className="w-10" /> {/* Spacer for centering */}
    </View>
  );
};

/**
 * Profile Info Section
 */
export const ProfileInfo = ({ name, memberId }: { name: string, memberId: string }) => {
  return (
    <View className="items-center mt-6 mb-8 px-6">
      <View className="relative">
        <View className="w-32 h-32 rounded-full bg-[#F3D9C9] items-center justify-center border-4 border-white shadow-xl">
           <MaterialCommunityIcons name="account" size={80} color="#8D7A4D" />
        </View>
        <TouchableOpacity className="absolute bottom-1 right-1 bg-[#203A81] p-2 rounded-full border-2 border-white shadow-md">
          <MaterialCommunityIcons name="pencil" size={16} color="white" />
        </TouchableOpacity>
      </View>
      <Text className="text-[#203A81] text-2xl font-black mt-4">{name}</Text>
      <Text className="text-gray-400 text-xs font-bold tracking-wider mt-1">{memberId}</Text>
    </View>
  );
};

/**
 * Menu Item Component
 */
export const MenuItem = ({ 
  icon, 
  title, 
  subtitle, 
  showSwitch = false, 
  switchValue = false, 
  onSwitchChange,
  onPress
}: { 
  icon: string, 
  title: string, 
  subtitle?: string, 
  showSwitch?: boolean, 
  switchValue?: boolean, 
  onSwitchChange?: (val: boolean) => void,
  onPress?: () => void
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      disabled={showSwitch}
      className="flex-row items-center justify-between py-4 border-b border-gray-50"
    >
      <View className="flex-row items-center flex-1">
        <View className="bg-[#F0F4FF] p-2.5 rounded-xl mr-4">
          <MaterialCommunityIcons name={icon as any} size={22} color="#203A81" />
        </View>
        <View>
          <Text className="text-[#203A81] font-bold text-sm tracking-tight">{title}</Text>
          {subtitle && <Text className="text-blue-400 text-[10px] font-medium">{subtitle}</Text>}
        </View>
      </View>
      
      {showSwitch ? (
        <Switch 
          value={switchValue} 
          onValueChange={onSwitchChange} 
          trackColor={{ false: '#E5E7EB', true: '#203A81' }}
          thumbColor={switchValue ? '#white' : '#white'}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        />
      ) : (
        <MaterialCommunityIcons name="chevron-right" size={20} color="#D1D5DB" />
      )}
    </TouchableOpacity>
  );
};

/**
 * Sign Out Button
 */
export const SignOutButton = ({ onPress }: { onPress?: () => void }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="mx-6 mt-4 flex-row items-center justify-center bg-red-50 py-4 rounded-2xl border border-red-100 active:bg-red-100"
    >
      <MaterialCommunityIcons name="logout-variant" size={20} color="#FF4B4B" />
      <Text className="text-[#FF4B4B] font-black text-sm ml-2">Sign Out</Text>
    </TouchableOpacity>
  );
};
