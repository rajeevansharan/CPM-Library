import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  Pressable 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ExportSettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

/**
 * Premium Export Settings Modal - Fixed to avoid expo-blur dependency issues
 */
export const ExportSettingsModal = ({ isVisible, onClose }: ExportSettingsModalProps) => {
  const [includeDate, setIncludeDate] = useState(true);
  const [includePageRefs, setIncludePageRefs] = useState(true);
  const [includeBookCover, setIncludeBookCover] = useState(false);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center px-8">
        {/* Semi-transparent Overlay (Replaces BlurView to fix resolution error) */}
        <Pressable 
          className="absolute inset-0 bg-black/60" 
          onPress={onClose} 
        />

        <Pressable className="bg-white rounded-[24px] w-full overflow-hidden shadow-2xl">
          {/* Header */}
          <View className="bg-[#0B2556] px-5 py-4 flex-row justify-between items-center">
            <Text className="text-white text-base font-bold">Export Settings</Text>
            <MaterialCommunityIcons name="file-pdf-box" size={20} color="rgba(255,255,255,0.6)" />
          </View>

          <View className="p-6">
            <Text className="text-gray-400 text-xs font-medium mb-5">
              Choose what to include in your PDF document.
            </Text>

            {/* Options */}
            <View className="mb-6">
              <OptionRow 
                icon="calendar-blank" 
                label="Include Date" 
                value={includeDate} 
                onValueChange={setIncludeDate} 
              />
              <View className="h-px bg-gray-50 my-1 ml-12" />
              <OptionRow 
                icon="book-open-page-variant" 
                label="Include Page References" 
                value={includePageRefs} 
                onValueChange={setIncludePageRefs} 
              />
              <View className="h-px bg-gray-50 my-1 ml-12" />
              <OptionRow 
                icon="image" 
                label="Include Book Cover" 
                value={includeBookCover} 
                onValueChange={setIncludeBookCover} 
              />
            </View>

            {/* Generate Button */}
            <TouchableOpacity 
              activeOpacity={0.8}
              className="bg-[#FFD60A] py-4 rounded-xl flex-row justify-center items-center shadow-lg shadow-yellow-500/30 mb-6"
              onPress={() => {
                console.log('Generating PDF...');
                onClose();
              }}
            >
              <MaterialCommunityIcons name="download" size={18} color="#0B2556" />
              <Text className="text-[#0B2556] font-black ml-2 uppercase tracking-tight text-sm">Generate PDF</Text>
            </TouchableOpacity>

            {/* Share Directly */}
            <View className="items-center mb-6">
              <Text className="text-gray-400 text-[9px] font-black uppercase tracking-[1px] mb-3">Share Directly</Text>
              <View className="flex-row w-full">
                <TouchableOpacity 
                  activeOpacity={0.7}
                  className="flex-1 flex-row items-center justify-center border border-yellow-100/50 py-3 rounded-xl mr-2"
                >
                  <MaterialCommunityIcons name="whatsapp" size={16} color="#0B2556" />
                  <Text className="text-[#0B2556] font-bold text-[11px] ml-1.5">WhatsApp</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  activeOpacity={0.7}
                  className="flex-1 flex-row items-center justify-center border border-yellow-100/50 py-3 rounded-xl ml-2"
                >
                  <MaterialCommunityIcons name="email" size={16} color="#0B2556" />
                  <Text className="text-[#0B2556] font-bold text-[11px] ml-1.5">Email</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Cancel Button */}
            <TouchableOpacity onPress={onClose} className="items-center">
              <Text className="text-gray-400 font-bold text-xs">Cancel</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </View>
    </Modal>
  );
};

const OptionRow = ({ 
  icon, 
  label, 
  value, 
  onValueChange 
}: { 
  icon: any, 
  label: string, 
  value: boolean, 
  onValueChange: (v: boolean) => void 
}) => (
  <TouchableOpacity 
    activeOpacity={0.6}
    onPress={() => onValueChange(!value)}
    className="flex-row items-center justify-between py-2"
  >
    <View className="flex-row items-center">
      <View className="w-9 h-9 bg-gray-50 rounded-xl items-center justify-center mr-3">
        <MaterialCommunityIcons name={icon} size={18} color="#0B2556" />
      </View>
      <Text className="text-[#0B2556] font-bold text-sm tracking-tight">{label}</Text>
    </View>
    <View 
      className="w-6 h-6 rounded-md items-center justify-center border-2"
      style={{
        backgroundColor: value ? '#0B2556' : '#FFFFFF',
        borderColor: value ? '#0B2556' : '#F3F4F6',
      }}
    >
      {value && <MaterialCommunityIcons name="check" size={15} color="white" />}
    </View>
  </TouchableOpacity>
);
