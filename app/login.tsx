import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { 
  InputField, 
  PrimaryButton, 
  SecondaryButton, 
  TabToggle, 
  GuestModeCard 
} from '../components/AuthComponents';
import { useAuth } from '@/context/AuthContext';

const LoginScreen = () => {
  const router = useRouter();
  const { setSession } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await setSession(data.user, data.token);
        if (data.user.role === 'ADMIN') {
          router.replace('/admin');
        } else {
          router.replace('/(tabs)');
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Could not connect to the server');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (response.ok) {
        await setSession(data.user, data.token);
        router.replace('/(tabs)');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Register error:', error);
      alert('Could not connect to the server');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestMode = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FB]" edges={['top']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          className="flex-1 px-6"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* Header Section */}
          <View className="items-center mt-12 mb-8">
            <View className="bg-white p-3 rounded-full shadow-lg relative mb-4">
              <View className="bg-white rounded-full items-center justify-center">
                 <MaterialCommunityIcons name="church" size={36} color="#C5A059" />
              </View>
              {/* Blue Badge Icon */}
              <View className="absolute -top-1 -right-1 bg-[#203A81] p-1 rounded-full border-2 border-white">
                <MaterialCommunityIcons name="star-four-points" size={12} color="white" />
              </View>
            </View>
            <Text className="text-[#203A81] text-2xl font-black tracking-tight uppercase">CPM LIBRARY</Text>
            <Text className="text-gray-400 text-sm italic mt-1">Feed your soul with the Word</Text>
          </View>

          {/* Main Auth Card */}
          <View className="bg-white rounded-[32px] p-6 shadow-xl elevation-5 border border-gray-50 mb-6">
            
            {/* Login/Register Toggle */}
            <TabToggle activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Form Fields */}
            {activeTab === 'register' && (
              <InputField 
                label="Full Name" 
                placeholder="e.g. John Doe" 
                icon="account-outline" 
                value={name}
                onChangeText={setName}
              />
            )}

            <InputField 
              label="Email Address" 
              placeholder="e.g. user@cpm.com" 
              icon="email-outline" 
              value={email}
              onChangeText={setEmail}
            />
            
            <InputField 
              label="Password" 
              placeholder="••••••••" 
              icon="lock-outline" 
              isPassword={true} 
              value={password}
              onChangeText={setPassword}
            />

            {/* Forgot Password (only on login) */}
            {activeTab === 'login' && (
              <TouchableOpacity className="items-end mb-6">
                <Text className="text-[#C5A059] text-xs font-bold">Forgot Password?</Text>
              </TouchableOpacity>
            )}

            {activeTab === 'login' && (
              <InputField 
                label="Church Member ID" 
                placeholder="CPM-XXXXX" 
                icon="card-account-details-outline" 
                optional={true} 
              />
            )}

            {/* Primary Action Button */}
            <View className="mt-2">
              <PrimaryButton 
                title={loading ? (activeTab === 'login' ? 'Signing In...' : 'Creating Account...') : (activeTab === 'login' ? 'Sign In' : 'Create Account')} 
                icon={activeTab === 'login' ? 'login-variant' : 'account-plus-outline'} 
                onPress={activeTab === 'login' ? handleSignIn : handleRegister} 
              />
            </View>

            {activeTab === 'login' && (
              <>
                {/* Or Divider */}
                <View className="flex-row items-center my-6">
                  <View className="flex-1 h-[1px] bg-gray-100" />
                  <Text className="mx-4 text-gray-300 text-[10px] font-bold">OR</Text>
                  <View className="flex-1 h-[1px] bg-gray-100" />
                </View>
                {/* OTP Button */}
                <SecondaryButton title="Login with OTP" />
              </>
            )}
          </View>

          {/* Guest Mode Section */}
          <GuestModeCard onPress={handleGuestMode} />

          {/* Footer Section */}
          <View className="items-center mb-12 mt-4">
            <View className="flex-row items-center mb-6 opacity-30">
                <View className="w-10 h-[1px] bg-gray-400 mx-2" />
                <MaterialCommunityIcons name="book-open-outline" size={16} color="gray" />
                <View className="w-10 h-[1px] bg-gray-400 mx-2" />
            </View>
            <Text className="text-gray-400 text-[9px] text-center leading-4">
              © 2024 Ceylon Pentecostal Mission.{"\n"}All Spiritual Rights Reserved.
            </Text>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
