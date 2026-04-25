import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { 
  ConcordanceHeader, 
  VersionChip, 
  VerseCard 
} from '@/components/ConcordanceComponents';

const VERSES_DATA = [
  { 
    id: '1', 
    reference: "Hebrews 11:1", 
    version: "KJV", 
    lang: "English", 
    text: "Now faith is the substance of things hoped for, the evidence of things not seen." 
  },
  { 
    id: '2', 
    reference: "Matthew 17:20", 
    version: "KJV", 
    lang: "English", 
    text: "And Jesus said unto them, Because of your unbelief: for verily I say unto you, If ye have faith as a grain of mustard seed, ye shall say unto this mountain, Remove hence..." 
  },
  { 
    id: '3', 
    reference: "Ephesians 2:8", 
    version: "KJV", 
    lang: "English", 
    text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God." 
  },
  { 
    id: '4', 
    reference: "Galatians 2:20", 
    version: "KJV", 
    lang: "English", 
    text: "I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God..." 
  },
  { 
    id: '5', 
    reference: "Romans 10:17", 
    version: "NIV", 
    lang: "English", 
    text: "Consequently, faith comes from hearing the message, and the message is heard through the word about Christ." 
  },
  { 
    id: '6', 
    reference: "எபிரேயர் 11:1", 
    version: "KJV", 
    lang: "தமிழ்", 
    text: "விசுவாசமானது நம்பப்படுகிறவைகளின் உறுதியும், காணப்படாதவைகளின் நிச்சயமுமாயிருக்கிறது." 
  },
  { 
    id: '7', 
    reference: "மத்தேயு 17:20", 
    version: "KJV", 
    lang: "தமிழ்", 
    text: "உங்களுக்குக் கடுகுவிதையளவு விசுவாசமிருந்தால் நீங்கள் இந்த மலையைப் பார்த்து, இவ்விடம்விட்டு அப்புறம்போ என்று சொல்ல அது அப்புறம்போம்; உங்களால் கூடாதது ஒன்றுமிராது என்று மெய்யாகவே உங்களுக்குச் சொல்லுகிறேன்." 
  }
];

export default function ConcordanceScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLang, setActiveLang] = useState('English');
  const [activeVersion, setActiveVersion] = useState('KJV');

  const filteredVerses = VERSES_DATA.filter(verse => {
    const matchesLang = verse.lang === activeLang;
    const matchesVersion = verse.version === activeVersion;
    const matchesSearch = verse.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          verse.reference.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLang && matchesVersion && matchesSearch;
  });

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <ConcordanceHeader />

      <ScrollView 
        className="flex-1 bg-[#F8F9FB]"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        {/* Search Input Section */}
        <View className="px-6 mt-4 mb-4">
           <View className="flex-row items-center bg-gray-100/50 rounded-2xl px-4 py-1 border border-gray-100">
              <MaterialCommunityIcons name="magnify" size={20} color="#203A81" />
              <TextInput 
                 placeholder="Search words or verses..."
                 value={searchQuery}
                 onChangeText={setSearchQuery}
                 className="flex-1 ml-2 text-[#203A81] h-12 font-bold"
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

        {/* Language Tabs */}
        <View className="px-6 mb-4">
           <View className="flex-row bg-gray-100 p-1 rounded-xl">
              {['English', 'தமிழ்', 'සිංහල'].map(lang => (
                <TouchableOpacity 
                  key={lang}
                  onPress={() => setActiveLang(lang)}
                  className="flex-1 py-2 rounded-lg items-center"
                  style={activeLang === lang ? { backgroundColor: '#203A81' } : {}}
                >
                   <Text 
                     className="font-bold text-xs"
                     style={{ color: activeLang === lang ? '#FFFFFF' : '#9CA3AF' }}
                   >{lang}</Text>
                </TouchableOpacity>
              ))}
           </View>
        </View>

        {/* Version Horizontal Selector */}
        <View className="mb-6">
           <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
              className="bg-gray-100/40 py-2"
           >
              {['KJV', 'NIV', 'ESV', 'NLT'].map(version => (
                <VersionChip 
                  key={version}
                  label={version} 
                  active={activeVersion === version} 
                  onPress={() => setActiveVersion(version)}
                />
              ))}
           </ScrollView>
        </View>

        {/* Results Header */}
        <View className="flex-row justify-between items-center px-6 mb-4">
           <Text className="text-gray-400 text-[10px] font-black tracking-widest uppercase">
             {filteredVerses.length} Matches Found
           </Text>
           <TouchableOpacity className="flex-row items-center">
              <MaterialCommunityIcons name="sort-variant" size={16} color="#203A81" />
              <Text className="text-[#203A81] text-[10px] font-bold ml-1">Sort</Text>
           </TouchableOpacity>
        </View>

        {/* Results List */}
        <View className="px-6">
           {filteredVerses.length > 0 ? (
             filteredVerses.map(verse => (
               <VerseCard 
                  key={verse.id}
                  reference={verse.reference} 
                  version={verse.version} 
                  text={verse.text}
                  highlight={searchQuery}
               />
             ))
           ) : (
             <View className="items-center justify-center py-20">
               <MaterialCommunityIcons name="book-open-blank-variant" size={64} color="#E5E7EB" />
               <Text className="text-gray-400 font-bold mt-4">No verses found</Text>
             </View>
           )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
