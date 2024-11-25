import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View, Image, useColorScheme } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const recipes = [
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
  {
    name: 'Tacos',
    ingredients: 'Tortillas, carne (geralmente carne moída ou de frango), vegetais (ex: alface, tomate, cebola), temperos (ex: pimenta, cominho, alho), guacamole (opcional) e salsa (opcional).',
    steps: 'Prepare tortillas e recheie com carne, vegetais e temperos. Sirva com guacamole ou salsa.',
  },
  {
    name: 'Croissant',
    ingredients: 'Massa folhada e manteiga',
    steps: 'Prepare uma massa folhada com camadas de manteiga e dobre várias vezes. Modele e asse até dourar.',
  },
  {
    name: 'Feijoada',
    ingredients: 'Feijão preto, carnes defumadas (como costelinha de porco), linguiças, temperos (ex: alho, cebola, louro).',
    steps: 'Cozinhe feijão preto com carnes defumadas, linguiças e temperos. Sirva com arroz, farofa e laranja.',
  },
];

export default function ExploreScreen() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const colorScheme = useColorScheme(); // Detecta o tema atual (claro ou escuro)
  const isDarkMode = colorScheme === 'dark';

  const toggleRecipeDetails = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
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
      }>
      <ThemedView style={dynamicStyles.titleContainer}>
        <ThemedText type="title">Suas Receitas</ThemedText>
      </ThemedView>

      <ScrollView style={dynamicStyles.recipeList}>
        {recipes.map((recipe, index) => (
          <ThemedView key={index} style={dynamicStyles.recipeCard}>
            <TouchableOpacity onPress={() => toggleRecipeDetails(index)}>
              <ThemedText style={dynamicStyles.recipeName}>{recipe.name}</ThemedText>
            </TouchableOpacity>

            {expandedIndex === index && (
              <View style={dynamicStyles.recipeDetails}>
                <ThemedText style={dynamicStyles.recipeSteps}>Ingredientes: {recipe.ingredients}</ThemedText>
                <ThemedText style={dynamicStyles.recipeSteps}>Como fazer: {recipe.steps}</ThemedText>
              </View>
            )}
          </ThemedView>
        ))}
      </ScrollView>
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
    recipeList: {
      paddingHorizontal: 16,
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
    recipeOrigin: {
      fontSize: 16,
      color: isDarkMode ? '#ccc' : '#666',
      marginBottom: 8,
    },
    recipeSteps: {
      fontSize: 16,
      color: isDarkMode ? '#ccc' : '#333',
      lineHeight: 24,
    },
  });