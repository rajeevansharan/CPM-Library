import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface PdfRendererProps {
  url: string;
  title?: string;
}

export default function PdfRenderer({ url, title }: PdfRendererProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <MaterialCommunityIcons name="file-alert-outline" size={48} color="#9CA3AF" />
        <Text style={styles.errorTitle}>Unable to load PDF</Text>
        <Text style={styles.errorText}>The document could not be displayed.</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => { setError(false); setLoading(true); }}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.openExternalButton}
          onPress={() => Linking.openURL(url)}
        >
          <Text style={styles.openExternalText}>Open in Browser</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color="#203A81" size="large" />
          <Text style={styles.loadingText}>Loading document...</Text>
        </View>
      )}
      <WebView
        source={{ uri: viewerUrl }}
        style={styles.webview}
        onLoadEnd={() => setLoading(false)}
        onError={() => { setLoading(false); setError(true); }}
        onHttpError={() => { setLoading(false); setError(true); }}
        startInLoadingState={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  webview: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
    zIndex: 10,
  },
  loadingText: {
    marginTop: 12,
    color: '#6B7280',
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
    padding: 24,
  },
  errorTitle: {
    color: '#203A81',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  errorText: {
    color: '#9CA3AF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  retryButton: {
    borderWidth: 1,
    borderColor: '#203A81',
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 999,
    marginBottom: 12,
  },
  retryText: {
    color: '#203A81',
    fontWeight: 'bold',
    fontSize: 14,
  },
  openExternalButton: {
    paddingHorizontal: 32,
    paddingVertical: 10,
  },
  openExternalText: {
    color: '#6B7280',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
});
