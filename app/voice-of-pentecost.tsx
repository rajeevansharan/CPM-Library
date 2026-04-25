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
  VoiceHeader, 
  IssueCard, 
  ArchiveRow 
} from '@/components/VoiceComponents';

const ISSUES_DATA = [
  { 
    id: '1', 
    title: "October 2023", 
    month: "October",
    year: "2023",
    subtitle: "The Power of Stillness", 
    category: "Topic",
    imageUri: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop",
    isNew: true
  },
  { 
    id: '2', 
    title: "September 2023", 
    month: "September",
    year: "2023",
    subtitle: "Walk by Faith", 
    category: "Topic",
    imageUri: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop"
  },
  { 
    id: '3', 
    title: "August 2023", 
    month: "August",
    year: "2023",
    subtitle: "A New Covenant", 
    category: "Topic",
    imageUri: "https://images.unsplash.com/photo-1532012197367-e43d0f467e9f?q=80&w=400&auto=format&fit=crop"
  },
  { 
    id: '4', 
    title: "July 2023", 
    month: "July",
    year: "2023",
    subtitle: "Praise and Worship", 
    category: "Topic",
    imageUri: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=400&auto=format&fit=crop"
  },
  { 
    id: '5', 
    title: "October 2022", 
    month: "October",
    year: "2022",
    subtitle: "The Apostolic Tradition", 
    category: "Topic",
    imageUri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
  },
  { 
    id: '6', 
    title: "September 2022", 
    month: "September",
    year: "2022",
    subtitle: "Virtuous Womanhood", 
    category: "Topic",
    imageUri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop"
  }
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const YEARS = ["2023", "2022", "2021", "2020"];

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

export default function VoiceOfPentecostScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedMonth, setSelectedMonth] = useState('October');
  const [selectedYear, setSelectedYear] = useState('2023');
  const [isMonthPickerVisible, setIsMonthPickerVisible] = useState(false);
  const [isYearPickerVisible, setIsYearPickerVisible] = useState(false);

  const filteredIssues = ISSUES_DATA.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          issue.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMonth = selectedMonth ? issue.month === selectedMonth : true;
    const matchesYear = selectedYear ? issue.year === selectedYear : true;
    
    return matchesSearch && matchesMonth && matchesYear;
  });

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <VoiceHeader />

      <ScrollView 
        className="flex-1 bg-[#F8F9FB]"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        {/* Search Input Section */}
        <View className="px-6 mt-4 mb-4">
           <View className="flex-row items-center bg-gray-100/50 rounded-2xl px-4 py-1 border border-gray-100">
              <MaterialCommunityIcons name="magnify" size={20} color="#9CA3AF" />
              <TextInput 
                 placeholder="Search by Title or Keyword..." 
                 value={searchQuery}
                 onChangeText={setSearchQuery}
                 className="flex-1 ml-2 text-gray-700 h-12 text-sm"
                 placeholderTextColor="#9CA3AF"
                 style={{ outlineStyle: 'none' } as any}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <MaterialCommunityIcons name="close-circle" size={18} color="#D1D5DB" />
                </TouchableOpacity>
              )}
           </View>
        </View>



        {/* Dropdown Selectors */}
        <View className="flex-row items-center px-6 mb-6 justify-between">
           <View className="flex-row">
              <TouchableOpacity 
                onPress={() => setIsMonthPickerVisible(true)}
                className="bg-blue-50/50 flex-row items-center px-4 py-2 rounded-xl border border-blue-100/50 mr-3"
              >
                 <Text className="text-[#203A81] text-[11px] font-black mr-2 uppercase tracking-tighter">{selectedMonth}</Text>
                 <MaterialCommunityIcons name="chevron-down" size={16} color="#203A81" />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setIsYearPickerVisible(true)}
                className="bg-blue-50/50 flex-row items-center px-4 py-2 rounded-xl border border-blue-100/50"
              >
                 <Text className="text-[#203A81] text-[11px] font-black mr-2 uppercase tracking-tighter">{selectedYear}</Text>
                 <MaterialCommunityIcons name="chevron-down" size={16} color="#203A81" />
              </TouchableOpacity>
           </View>
           <Text className="text-gray-300 text-[9px] font-black uppercase tracking-widest">{filteredIssues.length} Issues Found</Text>
        </View>

        {/* magazine Grid Section */}
        <View className="px-6 flex-row flex-wrap justify-between">
           {filteredIssues.length > 0 ? (
             filteredIssues.map(issue => (
               <IssueCard 
                 key={issue.id}
                 title={issue.title} 
                 subtitle={issue.subtitle} 
                 imageUri={issue.imageUri}
                 isNew={issue.isNew}
               />
             ))
           ) : (
             <View className="items-center justify-center w-full py-10">
               <MaterialCommunityIcons name="clipboard-text-search-outline" size={48} color="#E5E7EB" />
               <Text className="text-gray-400 font-bold mt-2">No issues found</Text>
             </View>
           )}
        </View>

        {/* Publication Archive Section */}
        <View className="px-6 mt-4">
           <View className="flex-row justify-between items-end mb-4">
              <Text className="text-[#203A81] text-lg font-black tracking-tight">Publication Archive</Text>
              <TouchableOpacity>
                 <Text className="text-[#C5A059] text-[10px] font-black uppercase tracking-widest">View All</Text>
              </TouchableOpacity>
           </View>
           
           <ArchiveRow title="2022 Collection" subtitle="12 Issues Available" />
           <ArchiveRow title="2021 Collection" subtitle="12 Issues Available" />
           <ArchiveRow title="2020 Collection" subtitle="Special Jubilee Edition" />
        </View>

      </ScrollView>

      {/* Selectors Pickers */}
      <SelectionPicker 
        isVisible={isMonthPickerVisible}
        onClose={() => setIsMonthPickerVisible(false)}
        options={MONTHS}
        onSelect={setSelectedMonth}
        title="Select Month"
      />
      <SelectionPicker 
        isVisible={isYearPickerVisible}
        onClose={() => setIsYearPickerVisible(false)}
        options={YEARS}
        onSelect={setSelectedYear}
        title="Select Year"
      />
    </SafeAreaView>
  );
}
