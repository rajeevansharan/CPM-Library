import React from 'react';
import { Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import Pdf from 'react-native-pdf';

interface PdfRendererProps {
  url: string;
  title?: string;
}

export default function PdfRenderer({ url, title }: PdfRendererProps) {
  const source = { uri: url, cache: true };

  return (
    <Pdf
      source={source}
      onLoadComplete={(numberOfPages: number) => {
        console.log(`Number of pages: ${numberOfPages}`);
      }}
      onPageChanged={(page: number) => {
        console.log(`Current page: ${page}`);
      }}
      onError={(error: any) => {
        console.log('PDF Error:', error);
      }}
      onPressLink={(uri: string) => {
        console.log(`Link pressed: ${uri}`);
      }}
      style={styles.pdf}
      renderActivityIndicator={() => (
        <ActivityIndicator color="#203A81" size="large" />
      )}
    />
  );
}

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#F8F9FB',
  },
});
