import React from 'react';
import { View } from 'react-native';

interface PdfRendererProps {
  url: string;
  title?: string;
}

export default function PdfRenderer({ url, title }: PdfRendererProps) {
  return (
    <View style={{ flex: 1 }}>
      <iframe
        src={url}
        style={{ width: '100%', height: '100%', border: 'none' }}
        title={title || 'PDF Viewer'}
      />
    </View>
  );
}
