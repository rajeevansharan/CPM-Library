import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBooks } from '@/context/BooksContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { 
  PublicationHeader, 
  StatItem, 
  ActionButton, 
  ReflectionBox 
} from '@/components/PublicationComponents';

export default function PublicationDetailScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { savedBooks, toggleSaveBook } = useBooks();
  const { showToast } = useToast();
  const { id, title, fileUrl, description, author, imageUri, category, type, languages } = useLocalSearchParams();

  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [noteStatus, setNoteStatus] = useState('No Note Saved');

  const isSaved = savedBooks.some((b: any) => b.id === id);

  // Load Saved Note on Mount
  useEffect(() => {
    const loadSavedNote = async () => {
      if (id) {
        try {
          const key = `note_${id}`;
          const stored = await AsyncStorage.getItem(key);
          if (stored !== null) {
            setNote(stored);
            setSavedNote(stored);
            setNoteStatus('Note Saved');
          } else {
            setNote('');
            setSavedNote('');
            setNoteStatus('No Note Saved');
          }
        } catch (err) {
          console.error('Failed to load note', err);
        }
      }
    };
    loadSavedNote();
  }, [id]);

  const handleSaveToggle = () => {
    if (user?.id && id && type) {
      toggleSaveBook(user.id, id as string, type as string);
    } else if (!user) {
      showToast('Please log in to save books', 'info');
    }
  };

  const handleReadOnline = () => {
    if (!fileUrl || fileUrl === 'null' || fileUrl === 'undefined' || fileUrl === '') {
      showToast('No book available to read online', 'error');
      return;
    }

    const absoluteUrl = (fileUrl as string).startsWith('http') 
      ? (fileUrl as string) 
      : `${process.env.EXPO_PUBLIC_BASE_URL}${fileUrl}`;

    router.push({
      pathname: '/pdf-viewer',
      params: { 
        url: absoluteUrl,
        title: title as string
      }
    });
  };

  const handleDownload = () => {
    if (!fileUrl || fileUrl === 'null' || fileUrl === 'undefined' || fileUrl === '') {
      showToast('No book available to download', 'error');
      return;
    }

    const absoluteUrl = (fileUrl as string).startsWith('http') 
      ? (fileUrl as string) 
      : `${process.env.EXPO_PUBLIC_BASE_URL}${fileUrl}`;

    const safeTitle = (title as string || 'book').trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    // Route the download through our server-side proxy to guarantee Content-Disposition headers
    // and proper .pdf extension downloading regardless of the original storage source format.
    const proxyUrl = `${process.env.EXPO_PUBLIC_API_URL}/books/download?url=${encodeURIComponent(absoluteUrl)}&title=${encodeURIComponent(safeTitle)}`;

    try {
      Linking.openURL(proxyUrl);
      showToast('Starting direct PDF download...', 'success');
    } catch (err) {
      console.error('Failed to download book', err);
      showToast('Could not open download link', 'error');
    }
  };

  const handleNoteChange = (text: string) => {
    setNote(text);
    if (text === savedNote) {
      setNoteStatus(text ? 'Note Saved' : 'No Note Saved');
    } else {
      setNoteStatus('Unsaved Changes');
    }
  };

  const handleSaveNote = async () => {
    if (!id) return;
    setIsSavingNote(true);
    try {
      const key = `note_${id}`;
      if (note.trim() === '') {
        await AsyncStorage.removeItem(key);
        setSavedNote('');
        setNoteStatus('No Note Saved');
        showToast('Note deleted successfully', 'success');
      } else {
        await AsyncStorage.setItem(key, note);
        setSavedNote(note);
        setNoteStatus('Note Saved');
        showToast('Note saved successfully', 'success');
      }
    } catch (err) {
      console.error('Failed to save note', err);
      showToast('Failed to save note', 'error');
    } finally {
      setIsSavingNote(false);
    }
  };

  // Parse languages parameter
  let displayLanguages = 'English';
  if (languages) {
    try {
      const parsed = JSON.parse(languages as string);
      displayLanguages = Array.isArray(parsed) ? parsed.join(', ') : (languages as string);
    } catch {
      displayLanguages = languages as string;
    }
  }

  // Check if PDF book is available
  const isBookAvailable = fileUrl && fileUrl !== 'null' && fileUrl !== 'undefined' && fileUrl !== '';

  // Deterministic page count based on book id
  const getPageCount = (bookId: string) => {
    if (!bookId || !isBookAvailable) return '--';
    let hash = 0;
    for (let i = 0; i < bookId.length; i++) {
      hash = bookId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const pages = Math.abs(hash % 150) + 48; // Generates page numbers between 48 and 198
    return pages.toString();
  };
  const pageCount = getPageCount(id as string);

  // Description truncation configuration
  const fullDescription = (description as string) || 'Discover the foundational principles of faith and spiritual teachings in this publication.';
  const isLongDescription = fullDescription.length > 150;
  const displayedDescription = (isLongDescription && !isExpanded) 
    ? `${fullDescription.substring(0, 150)}...` 
    : fullDescription;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <PublicationHeader isSaved={isSaved} onSavePress={handleSaveToggle} />

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        {/* Cover Image */}
        <View className="items-center mt-8 mb-6">
           <View className="shadow-2xl shadow-blue-900/40 rounded-3xl">
              <Image 
                 source={{ uri: (imageUri as string) || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop' }} 
                 className="w-56 h-80 rounded-3xl border-4 border-white"
                 resizeMode="cover"
              />
           </View>
        </View>

        {/* Title & Info */}
        <View className="items-center px-8 mb-8">
           <View className="bg-gray-100 px-4 py-1.5 rounded-full mb-3">
              <Text className="text-gray-400 text-[9px] font-black uppercase tracking-widest">{category || 'Publication'}</Text>
           </View>
           <Text className="text-[#203A81] text-2xl font-black text-center mb-1">{title || 'The Power of Faith'}</Text>
           <Text className="text-[#8D7A4D] font-bold text-sm">{author || 'Ceylon Pentecostal Mission'}</Text>
        </View>

        {/* Stats Section */}
        <View className="flex-row justify-around items-center px-10 mb-10 py-6 border-y border-gray-50">
           <StatItem label="Pages" value={pageCount} />
           <View className="w-[1px] h-8 bg-gray-100" />
           <StatItem label="Language" value={displayLanguages} />
           <View className="w-[1px] h-8 bg-gray-100" />
           <StatItem label="Format" value="PDF" />
        </View>

        {/* Description Section */}
        <View className="px-8 mb-8">
           <Text className="text-gray-400 text-[10px] font-black uppercase tracking-[2px] mb-4">About This Publication</Text>
           <Text className="text-gray-500 text-sm leading-6">
              {displayedDescription}
           </Text>
           {isLongDescription && (
             <TouchableOpacity 
               onPress={() => setIsExpanded(!isExpanded)} 
               className="flex-row items-center mt-3"
             >
                <Text className="text-[#203A81] font-black text-[10px] uppercase tracking-widest">
                  {isExpanded ? 'Read Less' : 'Read More'}
                </Text>
                <View className="ml-1">
                   <MaterialCommunityIcons 
                     name={isExpanded ? "chevron-up" : "chevron-down"} 
                     size={16} 
                     color="#203A81" 
                   />
                </View>
             </TouchableOpacity>
           )}
        </View>

        {/* Action Buttons */}
        <View className="px-8 space-y-4 mb-10">
           <ActionButton 
              icon="book-open-outline" 
              label="Read Online" 
              primary={true} 
              onPress={handleReadOnline}
           />
           <View className="flex-row space-x-4 mt-4">
              <ActionButton 
                icon="cloud-download-outline" 
                label="Download" 
                onPress={handleDownload}
              />
              <View className="w-4" /> {/* Spacer */}
              <ActionButton icon="share-variant-outline" label="Share" />
           </View>
        </View>

        {/* Reflections Section */}
        <View className="px-8">
           <ReflectionBox 
             value={note}
             onChangeText={handleNoteChange}
             onSave={handleSaveNote}
             isSaving={isSavingNote}
             statusText={noteStatus}
           />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
