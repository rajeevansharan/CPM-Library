import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * Reusable Custom Input Component
 */
export const InputField = ({ 
  label, 
  placeholder, 
  icon, 
  value,
  onChangeText,
  isPassword = false, 
  optional = false 
}: { 
  label: string; 
  placeholder: string; 
  icon?: string; 
  value?: string;
  onChangeText?: (text: string) => void;
  isPassword?: boolean;
  optional?: boolean;
}) => {
  return (
    <View className="mb-4">
      <Text className="text-[10px] font-bold text-gray-400 mb-1 tracking-widest uppercase">
        {label} {optional && <Text className="normal-case font-normal">(OPTIONAL)</Text>}
      </Text>
      <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-lg px-3 py-3 shadow-sm">
        {icon && (
          <MaterialCommunityIcons 
            name={icon as any} 
            size={18} 
            color="#9CA3AF" 
            className="mr-2" 
          />
        )}
        <TextInput
          placeholder={placeholder}
          secureTextEntry={isPassword}
          value={value}
          onChangeText={onChangeText}
          className="flex-1 text-gray-700 text-sm h-5"
          placeholderTextColor="#9CA3AF"
          style={{ outlineStyle: 'none' } as any}
        />
      </View>
    </View>
  );
};

/**
 * Primary Blue Button
 */
export const PrimaryButton = ({ 
  title, 
  onPress, 
  icon 
}: { 
  title: string; 
  onPress?: () => void;
  icon?: string;
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="bg-[#203A81] rounded-lg py-4 flex-row justify-center items-center shadow-md active:opacity-90"
    >
      <Text className="text-white font-bold text-base mr-2">{title}</Text>
      {icon && <MaterialCommunityIcons name={icon as any} size={20} color="white" />}
    </TouchableOpacity>
  );
};

/**
 * Secondary Outline Button
 */
export const SecondaryButton = ({ 
  title, 
  onPress 
}: { 
  title: string; 
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="bg-white border border-gray-200 rounded-lg py-3 flex-row justify-center items-center active:bg-gray-50"
    >
      <Text className="text-[#203A81] font-medium text-sm">{title}</Text>
    </TouchableOpacity>
  );
};

/**
 * Tab Toggle Component
 */
export const TabToggle = ({ activeTab, onTabChange }: { activeTab: 'login' | 'register', onTabChange: (tab: 'login' | 'register') => void }) => {
  return (
    <View className="flex-row bg-gray-100 p-1 rounded-lg mb-6 shadow-inner">
      <TouchableOpacity 
        onPress={() => onTabChange('login')}
        className="flex-1 py-2.5 rounded-md items-center"
        style={activeTab === 'login' ? { backgroundColor: '#FFFFFF' } : {}}
      >
        <Text 
          className="font-bold text-sm"
          style={{ color: activeTab === 'login' ? '#203A81' : '#6B7280' }}
        >Login</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => onTabChange('register')}
        className="flex-1 py-2.5 rounded-md items-center"
        style={activeTab === 'register' ? { backgroundColor: '#FFFFFF' } : {}}
      >
        <Text 
          className="font-bold text-sm"
          style={{ color: activeTab === 'register' ? '#203A81' : '#6B7280' }}
        >Register</Text>
      </TouchableOpacity>
    </View>
  );
};

/**
 * Guest Mode Card
 */
export const GuestModeCard = ({ onPress }: { onPress?: () => void }) => {
  return (
    <View className="bg-[#F3F1E7] border border-[#E9E4D1] p-4 rounded-xl flex-row items-center justify-between mb-4 mt-6">
      <View className="flex-row items-center flex-1">
        <View className="bg-[#D8CDA8] p-2 rounded-full mr-3">
          <MaterialCommunityIcons name="eye-outline" size={20} color="#8D7A4D" />
        </View>
        <View>
          <Text className="font-bold text-[#4A4333] text-sm">Guest Mode</Text>
          <Text className="text-[#8D7A4D] text-[10px]">Read-only public access</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onPress} className="bg-white px-5 py-2 rounded-lg shadow-sm">
        <Text className="text-[#8D7A4D] font-black text-xs">ENTER</Text>
      </TouchableOpacity>
    </View>
  );
};
