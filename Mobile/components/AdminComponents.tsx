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
export const AdminHeader = ({ title, showBack = false, onBack, onLogout }: { title: string, showBack?: boolean, onBack?: () => void, onLogout?: () => void }) => (
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
    <View className="flex-row items-center">
      {onLogout && (
        <TouchableOpacity onPress={onLogout} className="bg-red-50 p-2 rounded-full mr-2">
          <MaterialCommunityIcons name="logout" size={18} color="#EF4444" />
        </TouchableOpacity>
      )}
      <TouchableOpacity className="bg-[#203A81] p-2 rounded-full shadow-lg shadow-blue-900/20">
        <MaterialCommunityIcons name="shield-check" size={18} color="white" />
      </TouchableOpacity>
    </View>
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
export const UploadZone = ({ label, icon, sublabel, type = "document", onPress, fileName }: { label: string, icon: string, sublabel: string, type?: 'image' | 'document', onPress?: () => void, fileName?: string }) => (
  <TouchableOpacity 
    onPress={onPress}
    className={`border-2 border-dashed ${fileName ? 'border-[#203A81] bg-blue-50/30' : 'border-gray-200 bg-gray-50/50'} rounded-3xl p-8 items-center justify-center mb-6 active:bg-gray-50`}
  >
    <View className="bg-white p-4 rounded-full shadow-sm mb-3">
      <MaterialCommunityIcons name={fileName ? (type === 'image' ? 'image-check' : 'file-check') : icon as any} size={32} color="#203A81" />
    </View>
    <Text className="text-[#203A81] font-bold text-sm text-center" numberOfLines={1}>{fileName || label}</Text>
    <Text className="text-gray-400 text-[10px] mt-1 text-center">{fileName ? 'Tap to change file' : sublabel}</Text>
    
    <View className="absolute bottom-4 right-4 bg-white p-1 rounded-full shadow-sm">
        <MaterialCommunityIcons name={fileName ? "pencil" : "plus-circle"} size={20} color="#C5A059" />
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
        style={{ outlineStyle: 'none' } as any}
      />
    </View>
  </View>
);

import { Modal, Pressable } from 'react-native';

/**
 * Custom Selection Picker Modal
 */
export const SelectionPicker = ({ 
  isVisible, 
  onClose, 
  options, 
  onSelect, 
  title 
}: { 
  isVisible: boolean, 
  onClose: () => void, 
  options: string[], 
  onSelect: (val: string) => void,
  title: string
}) => (
  <Modal 
    visible={isVisible} 
    transparent 
    animationType="fade" 
    onRequestClose={onClose}
  >
    <Pressable 
      className="flex-1 bg-black/60 justify-center items-center px-10" 
      onPress={onClose}
    >
      <View className="bg-white w-full rounded-[32px] overflow-hidden shadow-2xl">
        <View className="bg-[#203A81] py-5 items-center">
          <Text className="text-white font-black text-sm uppercase tracking-widest">{title}</Text>
        </View>
        <ScrollView className="max-h-80" showsVerticalScrollIndicator={false}>
          {options.map((opt) => (
            <TouchableOpacity 
              key={opt} 
              className="py-5 items-center border-b border-gray-50 active:bg-gray-50"
              onPress={() => { onSelect(opt); onClose(); }}
            >
              <Text className="text-[#203A81] font-bold text-base">{opt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity 
          className="py-5 items-center bg-gray-50" 
          onPress={onClose}
        >
          <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Cancel</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  </Modal>
);

export const GRADES = [
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 
  'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
];

export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const YEARS = ["2024", "2023", "2022", "2021", "2020"];

/**
 * Premium Custom Confirmation Dialog Modal Overlay
 */
export const ConfirmModal = ({
  isVisible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  isDanger = true
}: {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
}) => (
  <Modal 
    visible={isVisible} 
    transparent 
    animationType="fade" 
    onRequestClose={onClose}
  >
    <Pressable 
      className="flex-1 bg-black/60 justify-center items-center px-6" 
      onPress={onClose}
    >
      <Pressable 
        className="bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl p-6 border border-gray-100"
        onPress={(e) => e.stopPropagation()}
      >
        <View className="items-center mt-2">
          <View className={`p-4 rounded-full mb-4 ${isDanger ? 'bg-red-50' : 'bg-blue-50'}`}>
            <MaterialCommunityIcons 
              name={isDanger ? "delete-empty" : "help-circle-outline"} 
              size={36} 
              color={isDanger ? "#EF4444" : "#203A81"} 
            />
          </View>
          <Text className="text-[#203A81] font-black text-xl text-center px-2">{title}</Text>
          <Text className="text-gray-500 text-sm mt-3 text-center leading-relaxed px-4">{message}</Text>
        </View>

        <View className="flex-row mt-6 space-x-3 gap-3">
          <TouchableOpacity 
            className="flex-1 py-4 bg-gray-100 rounded-2xl items-center active:bg-gray-200" 
            onPress={onClose}
          >
            <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">{cancelText}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 py-4 rounded-2xl items-center active:opacity-90 shadow-sm ${isDanger ? 'bg-red-500 shadow-red-200' : 'bg-[#203A81] shadow-blue-200'}`} 
            onPress={() => { onConfirm(); onClose(); }}
          >
            <Text className="text-white font-black uppercase text-[10px] tracking-widest">{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Pressable>
  </Modal>
);
