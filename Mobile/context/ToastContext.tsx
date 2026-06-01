import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info', duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error' | 'info'>('success');
  const [visible, setVisible] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const timeoutRef = useRef<any>(null);

  const showToast = (msg: string, t: 'success' | 'error' | 'info' = 'success', duration = 3000) => {
    // Clear any active dismiss timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setMessage(msg);
    setType(t);
    setVisible(true);

    // Fade in and slide down smoothly
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      })
    ]).start();

    // Auto-dismiss after duration
    timeoutRef.current = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start(() => {
        setVisible(false);
      });
    }, duration);
  };

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: '#E8F5E9',
          border: '#2E7D32',
          icon: 'checkbox-marked-circle' as any,
          color: '#2E7D32'
        };
      case 'error':
        return {
          bg: '#FFEBEE',
          border: '#D32F2F',
          icon: 'alert-circle' as any,
          color: '#D32F2F'
        };
      default:
        return {
          bg: '#E3F2FD',
          border: '#1565C0',
          icon: 'information' as any,
          color: '#1565C0'
        };
    }
  };

  const toastStyle = getToastStyles();

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && (
        <Animated.View
          style={[
            styles.toastContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <View 
            style={[
              styles.toastCard, 
              { 
                backgroundColor: toastStyle.bg, 
                borderLeftColor: toastStyle.border 
              }
            ]}
          >
            <View style={[styles.iconContainer, { backgroundColor: `${toastStyle.color}15` }]}>
              <MaterialCommunityIcons name={toastStyle.icon} size={20} color={toastStyle.color} />
            </View>
            <Text style={[styles.toastText, { color: '#1A1A1A' }]}>
              {message}
            </Text>
          </View>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 24 : 54,
    left: 0,
    right: 0,
    zIndex: 99999,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none', // Prevents capturing touches on active elements below
  },
  toastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderLeftWidth: 6,
    maxWidth: 420,
    width: Dimensions.get('window').width - 32,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.08)',
      }
    })
  },
  iconContainer: {
    padding: 6,
    borderRadius: 99,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastText: {
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
    letterSpacing: -0.1,
    ...Platform.select({
      web: {
        fontFamily: 'Inter, system-ui, sans-serif'
      }
    })
  }
});
