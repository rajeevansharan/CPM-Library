import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

interface PdfRendererProps {
  url: string;
  title?: string;
}

export default function PdfRenderer({ url, title }: PdfRendererProps) {
  const [loading, setLoading] = useState(true);

  // Use Google Docs viewer for remote PDFs, direct URL for local/LAN
  const isLocalUrl = url.includes('localhost') || url.includes('127.0.0.1') || url.includes('192.168.') || url.includes('10.');
  const viewerUrl = isLocalUrl
    ? url
    : `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color="#203A81" size="large" />
        </View>
      )}
      <WebView
        source={{ uri: viewerUrl }}
        style={styles.webview}
        onLoadEnd={() => setLoading(false)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
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
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
    zIndex: 10,
  },
  webview: {
    flex: 1,
  },
});
