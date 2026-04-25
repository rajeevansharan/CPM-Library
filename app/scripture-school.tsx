import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  Modal,
  Pressable 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { 
  ScriptureHeader, 
  FilterPill, 
  MaterialCard 
} from '@/components/ScriptureSchoolComponents';
import { ExportSettingsModal } from '@/components/ExportSettingsModal';

const MATERIALS = [
  {
    id: '1',
    title: "Grade 8: Understanding Faith", 
    level: "Intermediate", 
    year: "2024 Curriculum", 
    badge: "MOST DOWNLOADED",
    category: "Grade"
  },
  {
    id: '2',
    title: "Grade 12: Foundations of Truth", 
    level: "Advanced", 
    year: "2024 Curriculum", 
    badge: "NEW", 
    imageUri: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=300&auto=format&fit=crop",
    category: "Grade"
  },
  {
    id: '3',
    title: "Grade 2: The Loving Shepherd", 
    level: "Beginner", 
    year: "2023 Edition", 
    badge: "MOST DOWNLOADED",
    imageUri: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300&auto=format&fit=crop",
    category: "Grade"
  },
  {
    id: '4',
    title: "Church History & Doctrine", 
    level: "Intermediate", 
    year: "2024 Curriculum", 
    imageUri: "https://images.unsplash.com/photo-1532012197367-e43d0f467e9f?q=80&w=300&auto=format&fit=crop",
    category: "Category"
  },
  {
    id: '5',
    title: "Systematic Theology Vol 1", 
    level: "Advanced", 
    year: "2022 Archive", 
    imageUri: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=300&auto=format&fit=crop",
    category: "Category"
  },
  {
    id: '6',
    title: "Curriculum 2022: Old Testament", 
    level: "Intermediate", 
    year: "2022 Edition", 
    category: "Grade" // Changed to Grade for consistency in this view
  }
];

const GRADES = [
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 
  'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
];

/**
 * Custom Selection Picker Modal
 */
const SelectionPicker = ({ 
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

import { useBooks } from '@/context/BooksContext';

export default function ScriptureSchoolScreen() {
  const { scriptureBooks } = useBooks();
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [isGradePickerVisible, setIsGradePickerVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');

  const filteredMaterials = scriptureBooks.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.level.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedGrade === 'All') return matchesSearch;
    
    // Check if the title starts with the selected grade (e.g. "Grade 8")
    return matchesSearch && item.title.toLowerCase().includes(selectedGrade.toLowerCase());
  });

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FB]" edges={['top']}>
      {/* Header */}
      <ScriptureHeader />

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        {/* Search Bar section */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center bg-gray-100/80 rounded-2xl px-4 py-1 border border-gray-100">
            <MaterialCommunityIcons name="magnify" size={20} color="#9CA3AF" />
            <TextInput 
              placeholder="Search Sunday School books..." 
              className="flex-1 ml-2 text-gray-700 h-11 text-sm font-medium"
              placeholderTextColor="#9CA3AF"
              style={{ outlineStyle: 'none' } as any}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <MaterialCommunityIcons name="close-circle" size={18} color="#D1D5DB" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filter Selection Section */}
        <View className="mb-8 px-6">
          <View className="flex-row items-center">
            <FilterPill 
              label="All" 
              active={selectedGrade === 'All'}
              onPress={() => setSelectedGrade('All')}
            />
            
            <TouchableOpacity 
              onPress={() => setIsGradePickerVisible(true)}
              className="flex-1 bg-white border border-gray-100 rounded-2xl px-5 py-3 flex-row justify-between items-center shadow-sm"
            >
              <Text className={`font-bold text-sm ${selectedGrade !== 'All' ? 'text-[#203A81]' : 'text-gray-500'}`}>
                {selectedGrade === 'All' ? 'Select Grade' : selectedGrade}
              </Text>
              <MaterialCommunityIcons name="chevron-down" size={20} color="#203A81" />
            </TouchableOpacity>
          </View>
        </View>

        {/* List Header Section */}
        <View className="flex-row justify-between items-center px-6 mb-6">
          <View>
            <Text className="text-gray-400 text-[10px] font-black uppercase tracking-[1px]">Available Materials</Text>
            <Text className="text-gray-300 text-[9px] font-medium mt-1">{filteredMaterials.length} results found</Text>
          </View>
          <TouchableOpacity className="flex-row items-center">
            <MaterialCommunityIcons name="sort-variant" size={16} color="#203A81" />
            <Text className="text-[#203A81] text-[10px] font-bold ml-1">Alphabetical</Text>
          </TouchableOpacity>
        </View>

        {/* Materials List */}
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map(item => (
            <MaterialCard 
              key={item.id}
              title={item.title} 
              grade={item.grade}
              level={item.level} 
              year={item.year} 
              badge={item.badge} 
              imageUri={item.imageUri}
              onDownloadPress={() => setIsExportModalVisible(true)}
            />
          ))
        ) : (
          <View className="items-center justify-center py-20 px-10">
            <MaterialCommunityIcons name="book-search-outline" size={64} color="#E5E7EB" />
            <Text className="text-gray-400 font-bold text-base mt-4">No materials found</Text>
            <Text className="text-gray-300 text-sm text-center mt-2">Try adjusting your search or filters to find what you're looking for.</Text>
          </View>
        )}

      </ScrollView>

      <ExportSettingsModal 
        isVisible={isExportModalVisible} 
        onClose={() => setIsExportModalVisible(false)} 
      />

      <SelectionPicker 
        isVisible={isGradePickerVisible}
        onClose={() => setIsGradePickerVisible(false)}
        options={GRADES}
        onSelect={setSelectedGrade}
        title="Select Grade"
      />
    </SafeAreaView>
  );
}
