import React, { useState, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router'; // Import do router e useLocalSearchParams
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function IngredientesScreen() {
  const { id } = useLocalSearchParams(); // Recebe o ID da receita da tela anterior
  const [recipe, setRecipe] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<any>(null);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // Carrega a receita do AsyncStorage com base no ID
  const loadRecipe = async () => {
    try {
      const storedRecipes = await AsyncStorage.getItem('@RecipesApp:recipes');
      if (storedRecipes) {
        const recipes = JSON.parse(storedRecipes);
        const selectedRecipe = recipes.find((r: any) => r.id === Number(id));
        if (selectedRecipe) {
          setRecipe(selectedRecipe);
          setCurrentRecipe(selectedRecipe); // Define a receita atual para edição
        }
      }
    } catch (error) {
      console.error('Erro ao carregar a receita:', error);
    }
  };

  // Salva a receita atualizada no AsyncStorage
  const saveRecipe = async (updatedRecipe: any) => {
    try {
      const storedRecipes = await AsyncStorage.getItem('@RecipesApp:recipes');
      if (storedRecipes) {
        const recipes = JSON.parse(storedRecipes);
        const updatedRecipes = recipes.map((r: any) =>
          r.id === updatedRecipe.id ? updatedRecipe : r
        );
        await AsyncStorage.setItem('@RecipesApp:recipes', JSON.stringify(updatedRecipes));
        setRecipe(updatedRecipe); // Atualiza o estado local
        alert('Receita salva com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao salvar a receita:', error);
    }
  };

  // Exclui a receita
  const deleteRecipe = async () => {
    try {
      const storedRecipes = await AsyncStorage.getItem('@RecipesApp:recipes');
      if (storedRecipes) {
        const recipes = JSON.parse(storedRecipes);
        const updatedRecipes = recipes.filter((r: any) => r.id !== Number(id));
        await AsyncStorage.setItem('@RecipesApp:recipes', JSON.stringify(updatedRecipes));
        alert('Receita excluída com sucesso!');
        router.replace({ pathname: '/explore'}) // Volta para a tela anterior após excluir
      }
    } catch (error) {
      console.error('Erro ao excluir a receita:', error);
    }
  };

  // Abre o modal para editar a receita
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  // Fecha o modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Salva as alterações da receita
  const handleSaveRecipe = () => {
    if (currentRecipe.name && currentRecipe.ingredients && currentRecipe.steps) {
      saveRecipe(currentRecipe); // Salva no AsyncStorage
      handleCloseModal();
    } else {
      alert('Preencha todos os campos.');
    }
  };

  // Volta para a tela anterior
  const handleGoBack = () => {
    router.replace({ pathname: '/explore'});
  };

  useEffect(() => {
    loadRecipe(); // Carrega a receita ao abrir a tela
  }, [id]);

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
        <ThemedText type="title">Editar Receita</ThemedText>

        
      </ThemedView>

      {recipe && (
        <ScrollView style={dynamicStyles.recipeDetails}>
          <ThemedText style={dynamicStyles.recipeName}>{recipe.name}</ThemedText>
          <ThemedText style={dynamicStyles.recipeSteps}>
            Ingredientes: {recipe.ingredients}
          </ThemedText>
          <ThemedText style={dynamicStyles.recipeSteps}>
            Como fazer: {recipe.steps}
          </ThemedText>

          <View style={dynamicStyles.actionButtons}>
            <TouchableOpacity
              style={dynamicStyles.editButton}
              onPress={handleOpenModal}
            >
              <Text style={dynamicStyles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={dynamicStyles.deleteButton}
              onPress={deleteRecipe}
            >
              <Text style={dynamicStyles.buttonText}>Deletar</Text>
            </TouchableOpacity>
          </View>
          {/* Botão Voltar */}
        <TouchableOpacity
          style={dynamicStyles.backButton}
          onPress={handleGoBack}
        >
          <Text style={dynamicStyles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        </ScrollView>
      )}

      {/* Modal de Edição de Receita */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={dynamicStyles.modalOverlay}>
          <View style={dynamicStyles.modalContent}>
            <Text style={dynamicStyles.modalTitle}>Editar Receita</Text>
            <Text style={dynamicStyles.inputLabel}>Nome da Receita:</Text>
            <TextInput
              style={dynamicStyles.input}
              placeholder="Ex: Pizza Marguerita"
              placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
              value={currentRecipe?.name || ''}
              onChangeText={(text) =>
                setCurrentRecipe({ ...currentRecipe, name: text })
              }
            />
            <Text style={dynamicStyles.inputLabel}>Ingredientes:</Text>
            <TextInput
              style={dynamicStyles.input}
              placeholder="Ex: Farinha, molho de tomate, queijo..."
              placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
              value={currentRecipe?.ingredients || ''}
              onChangeText={(text) =>
                setCurrentRecipe({ ...currentRecipe, ingredients: text })
              }
            />
            <Text style={dynamicStyles.inputLabel}>Passo a Passo:</Text>
            <TextInput
              style={[dynamicStyles.input, dynamicStyles.textArea]}
              placeholder="Ex: Misture todos os ingredientes..."
              placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
              multiline
              value={currentRecipe?.steps || ''}
              onChangeText={(text) =>
                setCurrentRecipe({ ...currentRecipe, steps: text })
              }
            />
            <TouchableOpacity
              style={dynamicStyles.Button}
              onPress={handleSaveRecipe}
            >
              <Text style={dynamicStyles.ButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={dynamicStyles.modalButton}
              onPress={handleCloseModal}
            >
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
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
    },
    editButton: {
      backgroundColor: '#007BFF', // Azul para edição
      padding: 10,
      borderRadius: 8,
      flex: 1,
      marginRight: 8,
    },
    deleteButton: {
      backgroundColor: '#FF4C4C', // Vermelho para exclusão
      padding: 10,
      borderRadius: 8,
      flex: 1,
      marginLeft: 8,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
    backButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: isDarkMode ? '#555' : '#ddd',
      borderRadius: 5,
      alignItems: 'center',
    },
    backButtonText: {
      color: isDarkMode ? '#fff' : '#000',
      fontSize: 16,
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
    }
  });
