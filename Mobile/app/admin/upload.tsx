import { AdminHeader, AdminInput, GRADES, MONTHS, SelectionPicker, UploadZone } from '@/components/AdminComponents';
import { useBooks } from '@/context/BooksContext';
import { useToast } from '@/context/ToastContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UploadBookScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addScriptureBook, addVoiceBook, addPentecostBook, updateBook } = useBooks();
  const { showToast } = useToast();

  const editId = params.id as string;
  const isEditMode = !!editId;

  const [type, setType] = useState<'scripture' | 'voice' | 'pentecost'>('scripture');
  const [selectedLang, setSelectedLang] = useState<string>('English');
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    author: '',
    grade: 'Grade 1',
    level: 'Beginner',
    year: '2024',
    month: 'January',
    pentecostCategory: 'Doctrine'
  });

  const [isGradePickerVisible, setIsGradePickerVisible] = useState(false);
  const [isMonthPickerVisible, setIsMonthPickerVisible] = useState(false);

  const [isCategoryPickerVisible, setIsCategoryPickerVisible] = useState(false);

  const [coverImage, setCoverImage] = useState<any>(null);
  const [pdfFile, setPdfFile] = useState<any>(null);

  // Use refs for hidden file inputs (Web compatible)
  const imageInputRef = React.useRef<any>(null);
  const docInputRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (isEditMode) {
      setType((params.type as 'scripture' | 'voice' | 'pentecost') || 'scripture');
      setFormData({
        title: (params.title as string) || '',
        subtitle: (params.subtitle as string) || '',
        description: (params.description as string) || '',
        author: (params.author as string) || '',
        grade: (params.grade as string) || 'Grade 1',
        level: 'Beginner',
        year: (params.year as string) || '2024',
        month: (params.month as string) || 'January',
        pentecostCategory: (params.category as string) || 'Doctrine'
      });
      if (params.languages) {
        try {
          const parsed = JSON.parse(params.languages as string);
          setSelectedLang(Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : 'English');
        } catch {
          setSelectedLang((params.languages as string).split(',')[0]?.trim() || 'English');
        }
      } else {
        setSelectedLang('English');
      }
      if (params.imageUri) {
        setCoverImage({ name: 'Current Cover', uri: params.imageUri as string });
      } else {
        setCoverImage(null);
      }
      if (params.fileUrl) {
        setPdfFile({ name: 'Current Publication', uri: params.fileUrl as string });
      } else {
        setPdfFile(null);
      }
    }
  }, [editId]);

  const handlePickImage = () => {
    if (imageInputRef.current) imageInputRef.current.click();
  };

  const handlePickDocument = () => {
    if (docInputRef.current) docInputRef.current.click();
  };

  const onFileChange = (e: any, setFile: any) => {
    const file = e.target.files[0];
    if (file) {
      setFile({ name: file.name, uri: URL.createObjectURL(file), fileObject: file });
      showToast(`${file.name} ready for upload`, 'info');
    }
  };

  const handleUpload = async () => {
    if (!formData.title) {
      showToast("Please enter a title", 'error');
      return;
    }

    try {
      if (isEditMode) {
        let updateData: any = {};
        if (type === 'scripture') {
          updateData = {
            title: formData.title,
            grade: formData.grade,
            description: formData.description
          };
        } else if (type === 'voice') {
          updateData = {
            title: formData.title,
            month: formData.month,
            year: formData.year,
            subtitle: formData.subtitle,
            description: formData.description,
            languages: [selectedLang]
          };
        } else {
          updateData = {
            title: formData.title,
            author: formData.author,
            description: formData.description,
            category: formData.pentecostCategory,
            languages: [selectedLang]
          };
        }

        const newFile = pdfFile?.fileObject || null;
        const newCover = coverImage?.fileObject || null;

        await updateBook(type, editId, updateData, newFile, newCover);

        showToast(`${type === 'scripture' ? 'Book' : (type === 'voice' ? 'Issue' : 'Book')} updated successfully!`, 'success');
        router.back();
      } else {
        if (type === 'scripture') {
          await addScriptureBook({
            title: formData.title,
            grade: formData.grade,
            description: formData.description,
            category: 'Grade'
          }, pdfFile?.fileObject, coverImage?.fileObject);
        } else if (type === 'voice') {
          await addVoiceBook({
            title: formData.title,
            month: formData.month,
            year: formData.year,
            subtitle: formData.subtitle,
            description: formData.description,
            category: "Topic",
            languages: [selectedLang]
          }, pdfFile?.fileObject, coverImage?.fileObject);
        } else {
          await addPentecostBook({
            title: formData.title,
            author: formData.author,
            description: formData.description,
            category: formData.pentecostCategory,
            languages: [selectedLang]
          }, pdfFile?.fileObject, coverImage?.fileObject);
        }

        showToast(`${type === 'scripture' ? 'Book' : (type === 'voice' ? 'Issue' : 'Book')} uploaded successfully!`, 'success');
        router.back();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showToast(`Failed to ${isEditMode ? 'update' : 'upload'} publication`, 'error');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <AdminHeader
        title={isEditMode ? "Edit Publication" : "Upload Publication"}
        showBack
      />

      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        {/* Form Fields Container */}
        <View className="pb-10">
          {/* Type Selector Tabs */}
          <View className="flex-row bg-gray-50 p-1.5 rounded-2xl mb-6">
            {[
              { id: 'scripture', label: 'Scripture' },
              { id: 'voice', label: 'Voice' },
              { id: 'pentecost', label: 'Pentecost' }
            ].map((tab) => {
              const isActive = type === tab.id;
              return (
                <TouchableOpacity
                  key={tab.id}
                  disabled={isEditMode}
                  onPress={() => setType(tab.id as any)}
                  className={`flex-1 py-3 rounded-xl items-center ${isActive ? 'bg-[#203A81]' : 'bg-transparent'
                    } ${isEditMode ? 'opacity-50' : ''}`}
                >
                  <Text className={`text-xs font-black uppercase tracking-wider ${isActive ? 'text-white' : 'text-gray-400'}`}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Title & Common Info */}
          <AdminInput
            label="Publication Title"
            placeholder="e.g. Pentecostal Message"
            icon="book-open-page-variant"
            value={formData.title}
            onChangeText={(t) => setFormData({ ...formData, title: t })}
          />

          {type === 'voice' && (
            <AdminInput
              label="Issue Subtitle"
              placeholder="e.g. The Message of Pentecost"
              icon="text-short"
              value={formData.subtitle}
              onChangeText={(t) => setFormData({ ...formData, subtitle: t })}
            />
          )}

          {type === 'pentecost' && (
            <AdminInput
              label="Author Name"
              placeholder="e.g. Rev. C.K. John"
              icon="account-edit"
              value={formData.author}
              onChangeText={(t) => setFormData({ ...formData, author: t })}
            />
          )}

          <AdminInput
            label="Detailed Description"
            placeholder="Enter a brief summary of the content..."
            icon="text-subject"
            multiline
            value={formData.description}
            onChangeText={(t) => setFormData({ ...formData, description: t })}
          />

          {/* Type Specific Metadata */}
          <View className="flex-row mb-6">
            <View className={type === 'voice' ? "flex-1 mr-2" : "w-full"}>
              <Text className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest ml-1">
                {type === 'scripture' ? 'Grade' : (type === 'voice' ? 'Month' : 'Category')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (type === 'scripture') setIsGradePickerVisible(true);
                  else if (type === 'voice') setIsMonthPickerVisible(true);
                  else setIsCategoryPickerVisible(true);
                }}
                className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm flex-row justify-between items-center"
              >
                <Text className="text-[#203A81] text-sm font-bold">
                  {type === 'scripture' ? formData.grade : (type === 'voice' ? formData.month : formData.pentecostCategory)}
                </Text>
                <MaterialCommunityIcons name="chevron-down" size={18} color="#203A81" />
              </TouchableOpacity>
            </View>

            {type === 'voice' && (
              <View className="flex-1 ml-2">
                <AdminInput
                  label="Year"
                  placeholder="e.g. 2025"
                  icon="calendar"
                  value={formData.year}
                  onChangeText={(t) => setFormData({ ...formData, year: t })}
                />
              </View>
            )}
          </View>

          {/* Language Selector for Voice and Pentecost */}
          {(type === 'voice' || type === 'pentecost') && (
            <View className="mb-6">
              <Text className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest ml-1">Language</Text>
              <View className="flex-row">
                {['English', 'Sinhala', 'Tamil'].map((lang) => {
                  const isSelected = selectedLang === lang;
                  return (
                    <TouchableOpacity
                      key={lang}
                      onPress={() => setSelectedLang(lang)}
                      className={`flex-row items-center px-4 py-2.5 rounded-full mr-3 border ${isSelected
                        ? 'bg-[#203A81] border-[#203A81]'
                        : 'bg-white border-gray-100'
                        }`}
                      style={{
                        shadowColor: '#203A81',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: isSelected ? 0.1 : 0,
                        shadowRadius: 4,
                        elevation: isSelected ? 2 : 0
                      }}
                    >
                      <MaterialCommunityIcons
                        name={isSelected ? "check-circle" : "circle-outline"}
                        size={14}
                        color={isSelected ? 'white' : '#9CA3AF'}
                        style={{ marginRight: 6 }}
                      />
                      <Text className={`font-bold text-xs ${isSelected ? 'text-white' : 'text-gray-500'}`}>
                        {lang}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* File Uploads */}
          <View className="flex-row">
            <View className="flex-1 mr-2">
              <UploadZone
                label="Cover Image"
                icon="image-outline"
                sublabel="JPG, PNG (Max 5MB)"
                type="image"
                onPress={handlePickImage}
                fileName={coverImage?.name}
              />
            </View>
            <View className="flex-1 ml-2">
              <UploadZone
                label="Publication File"
                icon="file-pdf-box"
                sublabel="PDF, EPUB (Max 50MB)"
                onPress={handlePickDocument}
                fileName={pdfFile?.name}
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleUpload}
            className="bg-[#203A81] py-4 rounded-2xl items-center shadow-lg shadow-blue-900/20 active:opacity-90 mt-4"
          >
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="check-circle" size={20} color="white" className="mr-2" />
              <Text className="text-white font-black text-base uppercase tracking-widest ml-2">
                {isEditMode ? "Update Publication" : "Publish Publication"}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-4 py-4 items-center"
          >
            <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Discard Draft</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Hidden File Inputs for Web compatibility */}
      <View style={{ display: 'none' }}>
        <input
          type="file"
          ref={imageInputRef}
          accept="image/*"
          onChange={(e) => onFileChange(e, setCoverImage)}
        />
        <input
          type="file"
          ref={docInputRef}
          accept=".pdf,.epub"
          onChange={(e) => onFileChange(e, setPdfFile)}
        />
      </View>

      {/* Selectors Pickers */}
      <SelectionPicker
        isVisible={isGradePickerVisible}
        onClose={() => setIsGradePickerVisible(false)}
        options={GRADES}
        onSelect={(val) => setFormData({ ...formData, grade: val })}
        title="Select Grade"
      />
      <SelectionPicker
        isVisible={isMonthPickerVisible}
        onClose={() => setIsMonthPickerVisible(false)}
        options={MONTHS}
        onSelect={(val) => setFormData({ ...formData, month: val })}
        title="Select Month"
      />

      <SelectionPicker
        isVisible={isCategoryPickerVisible}
        onClose={() => setIsCategoryPickerVisible(false)}
        options={PENTECOST_CATEGORIES}
        onSelect={(val) => setFormData({ ...formData, pentecostCategory: val })}
        title="Select Category"
      />
    </SafeAreaView>
  );
}

const PENTECOST_CATEGORIES = [
  'Doctrine', 'Biography', 'Hymns', 'Publications', 'Scripture School', 'General'
];
