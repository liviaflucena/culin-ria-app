import React from 'react';
import { Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F1F1F1', dark: '#2D2D2D' }}
      headerImage={
        <Image
          source={require('@/assets/images/comida2.png')}
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Culinária: A Arte de Nutrir o Mundo</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Culinária no Mundo</ThemedText>
        <ThemedText>
          A culinária é um dos pilares da nossa cultura. Com ela, podemos experimentar novos sabores, explorar tradições e unir pessoas ao redor de uma boa refeição. Vamos conhecer mais sobre as receitas de diferentes culturas ao redor do mundo.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.imageCarouselContainer}>
        <ThemedText type="subtitle">Receitas Populares</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Image
            source={require('@/assets/images/comida3.png')}
            style={styles.carouselImage}
          />
          <Image
            source={require('@/assets/images/comida4.png')}
            style={styles.carouselImage}
          />
          <Image
            source={require('@/assets/images/comida5.png')}
            style={styles.carouselImage}
          />
        </ScrollView>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Dicas de Culinária</ThemedText>
        <ThemedText>
          Dicas essenciais para melhorar a sua experiência culinária:
          1. Aprenda a temperar bem os alimentos.
          2. Experimente receitas de diferentes culturas.
          3. Use ingredientes frescos sempre que possível.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    paddingHorizontal: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  headerImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  imageCarouselContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  carouselImage: {
    width: 250,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },
});
