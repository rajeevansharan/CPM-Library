const fs = require('fs');
const path = require('path');

const targetFilePath = path.join(__dirname, 'app', 'admin', 'upload.tsx');
let content = fs.readFileSync(targetFilePath, 'utf8');

// Normalize line endings to LF for perfect string matching
content = content.replace(/\r\n/g, '\n');

// ─── Replacement 1: Update metadata destructuring inside handleUpload ───
const target1 = `        if (type === 'scripture') {
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
            description: formData.description
          };
        } else {
          updateData = {
            title: formData.title,
            author: formData.author,
            description: formData.description,
            category: formData.pentecostCategory,
            languages: formData.pentecostLanguages.split(',').map(l => l.trim()).filter(l => l !== '')
          };
        }`;

const replacement1 = `        if (type === 'scripture') {
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
            languages: selectedLangs
          };
        } else {
          updateData = {
            title: formData.title,
            author: formData.author,
            description: formData.description,
            category: formData.pentecostCategory,
            languages: selectedLangs
          };
        }`;

// ─── Replacement 2: Update addition method calls inside handleUpload ───
const target2 = `        if (type === 'scripture') {
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
            category: "Topic"
          }, pdfFile?.fileObject, coverImage?.fileObject);
        } else {
          await addPentecostBook({
            title: formData.title,
            author: formData.author,
            description: formData.description,
            category: formData.pentecostCategory,
            languages: formData.pentecostLanguages.split(',').map(l => l.trim()).filter(l => l !== '')
          }, pdfFile?.fileObject, coverImage?.fileObject);
        }`;

const replacement2 = `        if (type === 'scripture') {
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
            languages: selectedLangs
          }, pdfFile?.fileObject, coverImage?.fileObject);
        } else {
          await addPentecostBook({
            title: formData.title,
            author: formData.author,
            description: formData.description,
            category: formData.pentecostCategory,
            languages: selectedLangs
          }, pdfFile?.fileObject, coverImage?.fileObject);
        }`;

// ─── Replacement 3: Update Category Row and add multi-languages chips ───
const target3 = `            {/* Type Specific Metadata */}
            <View className="flex-row mb-6">
               <View className="flex-1 mr-2">
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
                    <Text className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest ml-1">Year</Text>
                    <TouchableOpacity 
                       onPress={() => setIsYearPickerVisible(true)}
                       className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm flex-row justify-between items-center"
                    >
                       <Text className="text-[#203A81] text-sm font-bold">{formData.year}</Text>
                       <MaterialCommunityIcons name="chevron-down" size={18} color="#203A81" />
                    </TouchableOpacity>
                 </View>
               )}

               {type === 'pentecost' && (
                 <View className="flex-1 ml-2">
                    <Text className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest ml-1">Languages</Text>
                    <TextInput 
                      placeholder="e.g. English, Sinhala" 
                      className="bg-white border border-gray-100 rounded-2xl px-4 py-2.5 shadow-sm text-[#203A81] text-xs font-bold"
                      value={formData.pentecostLanguages}
                      onChangeText={(t) => setFormData({...formData, pentecostLanguages: t})}
                      style={{ outlineStyle: 'none' } as any}
                    />
                 </View>
               )}
            </View>`;

const replacement3 = `            {/* Type Specific Metadata */}
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
                    <Text className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest ml-1">Year</Text>
                    <TouchableOpacity 
                       onPress={() => setIsYearPickerVisible(true)}
                       className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm flex-row justify-between items-center"
                    >
                       <Text className="text-[#203A81] text-sm font-bold">{formData.year}</Text>
                       <MaterialCommunityIcons name="chevron-down" size={18} color="#203A81" />
                    </TouchableOpacity>
                 </View>
               )}
            </View>

            {/* Language Selector for Voice and Pentecost */}
            {(type === 'voice' || type === 'pentecost') && (
              <View className="mb-6">
                <Text className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest ml-1">Languages (Select multiple)</Text>
                <View className="flex-row">
                  {['English', 'Sinhala', 'Tamil'].map((lang) => {
                    const isSelected = selectedLangs.includes(lang);
                    return (
                      <TouchableOpacity
                        key={lang}
                        onPress={() => {
                          if (isSelected) {
                            if (selectedLangs.length > 1) {
                              setSelectedLangs(selectedLangs.filter(l => l !== lang));
                            } else {
                              showToast("Please keep at least one language selected", "info");
                            }
                          } else {
                            setSelectedLangs([...selectedLangs, lang]);
                          }
                        }}
                        className={\`flex-row items-center px-4 py-2.5 rounded-full mr-3 border \${
                          isSelected 
                            ? 'bg-[#203A81] border-[#203A81]' 
                            : 'bg-white border-gray-100'
                        }\`}
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
                        <Text className={\`font-bold text-xs \${isSelected ? 'text-white' : 'text-gray-500'}\`}>
                          {lang}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}`;

let replaced = 0;
if (content.includes(target1)) {
  content = content.replace(target1, replacement1);
  replaced++;
} else {
  console.log('Target 1 not found');
}

if (content.includes(target2)) {
  content = content.replace(target2, replacement2);
  replaced++;
} else {
  console.log('Target 2 not found');
}

if (content.includes(target3)) {
  content = content.replace(target3, replacement3);
  replaced++;
} else {
  console.log('Target 3 not found');
}

if (replaced > 0) {
  fs.writeFileSync(targetFilePath, content, 'utf8');
  console.log(`Successfully completed ${replaced} replacements!`);
} else {
  console.log('No replacements were made.');
}
