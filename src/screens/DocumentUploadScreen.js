import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Haptics from 'expo-haptics';

const DocumentUploadScreen = ({ navigation }) => {
  const [documents, setDocuments] = useState([
    { name: 'Business Plan', type: null, uri: null, size: null },
    { name: 'Pitch Deck', type: null, uri: null, size: null },
    { name: 'Prévisions Financières', type: null, uri: null, size: null },
    { name: 'Autres Documents', type: null, uri: null, size: null }
  ]);

  const pickDocument = async (index) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf', 
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
          'application/vnd.ms-excel'
        ],
        multiple: false
      });

      if (result.type === 'success') {
        const fileInfo = await FileSystem.getInfoAsync(result.uri);
        
        const updatedDocuments = [...documents];
        updatedDocuments[index] = {
          ...updatedDocuments[index],
          type: result.mimeType,
          uri: result.uri,
          size: `${(fileInfo.size / (1024 * 1024)).toFixed(2)} MB`
        };

        setDocuments(updatedDocuments);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de télécharger le document');
    }
  };

  const uploadDocuments = () => {
    const requiredDocumentsUploaded = documents.every(doc => doc.uri);
    
    if (requiredDocumentsUploaded) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      navigation.navigate('StartupDetail', { documents });
    } else {
      Alert.alert(
        'Documents incomplets', 
        'Veuillez télécharger tous les documents requis'
      );
    }
  };

  const renderDocumentItem = (doc, index) => (
    <TouchableOpacity 
      key={index} 
      style={styles.documentItem} 
      onPress={() => pickDocument(index)}
    >
      <View style={styles.documentIcon}>
        <MaterialIcons 
          name={
            doc.type === 'application/pdf' ? 'picture-as-pdf' : 
            doc.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? 'table-chart' : 
            'attach-file'
          } 
          size={24} 
          color="#4A148C" 
        />
      </View>
      <View style={styles.documentInfo}>
        <Text style={styles.documentName}>{doc.name}</Text>
        <Text style={styles.documentMeta}>
          {doc.uri 
            ? `${doc.type} • ${doc.size}` 
            : 'Aucun document téléchargé'}
        </Text>
      </View>
      <MaterialIcons 
        name={doc.uri ? 'check-circle' : 'add-circle'} 
        size={24} 
        color={doc.uri ? '#2ECC71' : '#4A148C'} 
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Téléchargement des Documents</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {documents.map(renderDocumentItem)}
        
        <TouchableOpacity 
          style={styles.uploadButton} 
          onPress={uploadDocuments}
        >
          <Text style={styles.uploadButtonText}>Finaliser l'inscription</Text>
          <MaterialIcons name="cloud-upload" size={24} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === 'ios' ? 44 : 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  documentIcon: {
    marginRight: 15,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  documentMeta: {
    fontSize: 12,
    color: '#757575',
  },
  uploadButton: {
    backgroundColor: '#4A148C',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  }
});

export default DocumentUploadScreen;