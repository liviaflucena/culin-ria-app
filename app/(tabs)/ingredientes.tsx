import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Image,
  Modal,
  TextInput,
  useColorScheme,
} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function IngredientesScreen() {
  const [ingred, setIngred] = useState([
    {
      name: 'Leite animal',
      category: 'Laticínio.',
    },
    {
      name: 'Brócolis',
      category: 'Vegetais.',
    },
  ]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newIngred, setNewIngred] = useState({ name: '', category: '' });
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const toggleIngredDetails = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setNewIngred({ name: '', category: ''});
  };

  const handleSaveRecipe = () => {
    if (newIngred.name && newIngred.category) {
      setIngred([...ingred, newIngred]);
      handleCloseModal();
    } else {
      alert('Preencha todos os campos.');
    }
  };

  const dynamicStyles = createStyles(isDarkMode);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#fff', dark: '#4A3F35' }}
      headerImage={
        <Image
          source={require('@/assets/images/comida1.png')}
          style={dynamicStyles.headerImage}
        />
      }
    >
      <ThemedView style={dynamicStyles.titleContainer}>
        <ThemedText type="title">Seus Ingredientes</ThemedText>

        <TouchableOpacity style={dynamicStyles.addButton} onPress={handleOpenModal}>
          <Text style={dynamicStyles.addButtonText}>+ Adicionar alimentos</Text>
        </TouchableOpacity>
       
      </ThemedView>

      <ScrollView style={dynamicStyles.ingredList}>
        {ingred.map((ingred, index) => (
          <ThemedView key={index} style={dynamicStyles.ingredCard}>
            <TouchableOpacity onPress={() => toggleIngredDetails(index)}>
              <ThemedText style={dynamicStyles.ingredName}>{ingred.name}</ThemedText>
            </TouchableOpacity>

            {expandedIndex === index && (
              <View style={dynamicStyles.ingredDetails}>
                <ThemedText style={dynamicStyles.ingredSteps}>
                  Categoria: {ingred.category}
                </ThemedText>
              </View>
            )}
          </ThemedView>
        ))}
      </ScrollView>

      {/* Modal de Adição de Receita */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={dynamicStyles.modalOverlay}>
          <View style={dynamicStyles.modalContent}>
            <Text style={dynamicStyles.modalTitle}>Adicionar Ingredientes</Text>
            <Text style={dynamicStyles.inputLabel}>Nome do alimento:</Text>
            <TextInput
              style={dynamicStyles.input}
              placeholder="Ex: Arroz."
              placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
              value={newIngred.name}
              onChangeText={(text) => setNewIngred({ ...newIngred, name: text })}
            />
            <Text style={dynamicStyles.inputLabel}>Categoria:</Text>
            <TextInput
              style={dynamicStyles.input}
              placeholder="Ex: Grãos. "
              placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
              value={newIngred.category}
              onChangeText={(text) => setNewIngred({ ...newIngred, category: text })}
            />
           
           <TouchableOpacity style={dynamicStyles.Button} onPress={handleSaveRecipe}>
             <Text style={dynamicStyles.ButtonText}>Salvar</Text>
             </TouchableOpacity>
        
            <TouchableOpacity style={dynamicStyles.modalButton} onPress={handleCloseModal}>
              <Text style={dynamicStyles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
    </ParallaxScrollView>
  );

  
}


const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    headerImage: {
      height: 250,
      width: '100%',
      resizeMode: 'cover',
    },
    titleContainer: {
      marginBottom: 24,
      alignItems: 'center',
    },
    addButton: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 8,
      marginTop: 10,
    },
    addButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    ingredList: {
      paddingHorizontal: 16,
    },
    
    ingredName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#333',
      marginBottom: 8,
    },
    ingredDetails: {
      marginTop: 12,
      marginBottom: 8,
    },
    ingredSteps: {
      fontSize: 16,
      color: isDarkMode ? '#ccc' : '#333',
      lineHeight: 24,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '90%',
      padding: 20,
      backgroundColor: isDarkMode ? '#333' : '#fff',
      borderRadius: 8,
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#333',
      marginBottom: 8,
      alignSelf: 'flex-start',
      marginLeft: 10,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    
    textArea: {
      height: 100,
    },
    modalButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
    },
    modalButtonText: {
      color: '#007BFF',
      textAlign: 'center',
    },
   Button: {
      marginTop: 10,
      padding: 10,
      backgroundColor: '#007BFF',
      borderRadius: 8,
    },
   ButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 17,
    },
    formContainer: {
      width: '100%',
      maxWidth: 500,
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#333',
      marginBottom: 20,
      textAlign: 'center',
    },
    
    input: {
      height: 45,
      width: '100%',
      borderColor: isDarkMode ? '#444' : '#ddd',
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 10,
      borderRadius: 8,
      fontSize: 16,
      backgroundColor: isDarkMode ? '#1E1E1E' : '#f9f9f9',
      color: isDarkMode ? '#fff' : '#000',
    },
    
    
    modalMessage: {
      fontSize: 16,
      marginBottom: 20,
      textAlign: 'center',
      color: isDarkMode ? '#ccc' : '#333',
    },
    
      ingredCard: {
        backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: isDarkMode ? '#000' : '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
      },
   
      ingredOrigin: {
        fontSize: 16,
        color: isDarkMode ? '#ccc' : '#666',
        marginBottom: 8,
      },
     
    
    
  });
  
