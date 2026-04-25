import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * Admin Dashboard Stat Card
 */
export const StatCard = ({ title, value, icon, color }: { title: string, value: string | number, icon: string, color: string }) => (
  <View className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-50 flex-1 mx-1">
    <View className="flex-row justify-between items-start mb-3">
      <View style={{ backgroundColor: `${color}15` }} className="p-2 rounded-xl">
        <MaterialCommunityIcons name={icon as any} size={20} color={color} />
      </View>
      <MaterialCommunityIcons name="trending-up" size={14} color="#10B981" />
    </View>
    <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{title}</Text>
    <Text className="text-[#203A81] text-xl font-black mt-1">{value}</Text>
  </View>
);

/**
 * Admin Header Component
 */
export const AdminHeader = ({ title, showBack = false, onBack }: { title: string, showBack?: boolean, onBack?: () => void }) => (
  <View className="px-6 pt-4 pb-2 bg-white flex-row items-center justify-between">
    <View className="flex-row items-center">
      {showBack && (
        <TouchableOpacity onPress={onBack} className="mr-4 bg-gray-50 p-2 rounded-full">
          <MaterialCommunityIcons name="arrow-left" size={20} color="#203A81" />
        </TouchableOpacity>
      )}
      <View>
        <Text className="text-[#203A81] text-xl font-black tracking-tight">{title}</Text>
        <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-0.5">Admin Management</Text>
      </View>
    </View>
    <TouchableOpacity className="bg-[#203A81] p-2 rounded-full shadow-lg shadow-blue-900/20">
      <MaterialCommunityIcons name="shield-check" size={18} color="white" />
    </TouchableOpacity>
  </View>
);

/**
 * Quick Action Button
 */
export const QuickAction = ({ title, icon, onPress, color = "#203A81" }: { title: string, icon: string, onPress: () => void, color?: string }) => (
  <TouchableOpacity 
    onPress={onPress}
    className="bg-white p-4 rounded-2xl flex-row items-center border border-gray-100 mb-3 shadow-sm active:bg-gray-50"
  >
    <View style={{ backgroundColor: `${color}10` }} className="p-3 rounded-xl mr-4">
      <MaterialCommunityIcons name={icon as any} size={24} color={color} />
    </View>
    <View className="flex-1">
      <Text className="text-[#203A81] font-bold text-base">{title}</Text>
      <Text className="text-gray-400 text-xs">Manage and update content</Text>
    </View>
    <MaterialCommunityIcons name="chevron-right" size={20} color="#D1D5DB" />
  </TouchableOpacity>
);

/**
 * Premium Upload Zone
 */
export const UploadZone = ({ label, icon, sublabel, type = "document" }: { label: string, icon: string, sublabel: string, type?: 'image' | 'document' }) => (
  <TouchableOpacity className="border-2 border-dashed border-gray-200 rounded-3xl p-8 items-center justify-center bg-gray-50/50 mb-6 active:bg-gray-50">
    <View className="bg-white p-4 rounded-full shadow-sm mb-3">
      <MaterialCommunityIcons name={icon as any} size={32} color="#203A81" />
    </View>
    <Text className="text-[#203A81] font-bold text-sm">{label}</Text>
    <Text className="text-gray-400 text-[10px] mt-1 text-center">{sublabel}</Text>
    
    <View className="absolute bottom-4 right-4 bg-white p-1 rounded-full shadow-sm">
        <MaterialCommunityIcons name="plus-circle" size={20} color="#C5A059" />
    </View>
  </TouchableOpacity>
);

/**
 * Admin Input Field
 */
export const AdminInput = ({ label, placeholder, icon, multiline = false, value, onChangeText }: { label: string, placeholder: string, icon?: string, multiline?: boolean, value?: string, onChangeText?: (t: string) => void }) => (
  <View className="mb-5">
    <Text className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest ml-1">{label}</Text>
    <View className={`flex-row items-start bg-white border border-gray-100 rounded-2xl px-4 py-3.5 shadow-sm ${multiline ? 'h-32' : ''}`}>
      {icon && <MaterialCommunityIcons name={icon as any} size={18} color="#9CA3AF" style={{ marginTop: multiline ? 2 : 0, marginRight: 10 }} />}
      <TextInput 
        placeholder={placeholder}
        className="flex-1 text-[#203A81] text-sm h-full"
        placeholderTextColor="#9CA3AF"
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  </View>
);
