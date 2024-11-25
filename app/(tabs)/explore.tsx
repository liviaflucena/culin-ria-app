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

export default function ExploreScreen() {
  const [recipes, setRecipes] = useState([
    {
      name: 'Pizza Marguerita',
      ingredients: 'Farinha, água, fermento, sal, molho de tomate, mussarela e manjericão.',
      steps: 'Misture farinha, água, fermento e sal para a massa. Adicione molho de tomate, mussarela e manjericão. Asse em forno quente por 10 minutos.',
    },
    {
      name: 'Sushi',
      ingredients: 'Arroz para sushi, vinagre, algas, peixes frescos e pepino.',
      steps: 'Prepare arroz para sushi e adicione vinagre. Enrole com algas, peixes frescos e vegetais de sua escolha.',
    },
  ]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newRecipe, setNewRecipe] = useState({ name: '', ingredients: '', steps: '' });
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const toggleRecipeDetails = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setNewRecipe({ name: '', ingredients: '', steps: '' });
  };

  const handleSaveRecipe = () => {
    if (newRecipe.name && newRecipe.ingredients && newRecipe.steps) {
      setRecipes([...recipes, newRecipe]);
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
        <ThemedText type="title">Suas Receitas</ThemedText>

        <TouchableOpacity style={dynamicStyles.addButton} onPress={handleOpenModal}>
          <Text style={dynamicStyles.addButtonText}>+ Adicionar Receita</Text>
        </TouchableOpacity>
       
      </ThemedView>

      <ScrollView style={dynamicStyles.recipeList}>
        {recipes.map((recipe, index) => (
          <ThemedView key={index} style={dynamicStyles.recipeCard}>
            <TouchableOpacity onPress={() => toggleRecipeDetails(index)}>
              <ThemedText style={dynamicStyles.recipeName}>{recipe.name}</ThemedText>
            </TouchableOpacity>

            {expandedIndex === index && (
              <View style={dynamicStyles.recipeDetails}>
                <ThemedText style={dynamicStyles.recipeSteps}>
                  Ingredientes: {recipe.ingredients}
                </ThemedText>
                <ThemedText style={dynamicStyles.recipeSteps}>
                  Como fazer: {recipe.steps}
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
            <Text style={dynamicStyles.modalTitle}>Adicionar Receita</Text>
            <Text style={dynamicStyles.inputLabel}>Nome da Receita:</Text>
            <TextInput
              style={dynamicStyles.input}
              placeholder="Ex: Pizza Marguerita"
              placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
              value={newRecipe.name}
              onChangeText={(text) => setNewRecipe({ ...newRecipe, name: text })}
            />
            <Text style={dynamicStyles.inputLabel}>Ingredientes:</Text>
            <TextInput
              style={dynamicStyles.input}
              placeholder="Ex: Farinha, molho de tomate, queijo..."
              placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
              value={newRecipe.ingredients}
              onChangeText={(text) => setNewRecipe({ ...newRecipe, ingredients: text })}
            />
            <Text style={dynamicStyles.inputLabel}>Passo a Passo:</Text>
            <TextInput
              style={[dynamicStyles.input, dynamicStyles.textArea]}
              placeholder="Ex: Misture todos os ingredientes..."
              placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
              multiline
              value={newRecipe.steps}
              onChangeText={(text) => setNewRecipe({ ...newRecipe, steps: text })}
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
    recipeList: {
      paddingHorizontal: 16,
    },
    
    recipeName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#333',
      marginBottom: 8,
    },
    recipeDetails: {
      marginTop: 12,
      marginBottom: 8,
    },
    recipeSteps: {
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
    
      recipeCard: {
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
   
      recipeOrigin: {
        fontSize: 16,
        color: isDarkMode ? '#ccc' : '#666',
        marginBottom: 8,
      },
     
    
    
  });
  
