import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

export default function AddRecipeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme(); // Detecta o tema atual (claro ou escuro)

  const isDarkMode = colorScheme === 'dark';

  const handleSaveRecipe = () => {
    setModalVisible(true); // Exibe o modal ao salvar a receita
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Fecha o modal
  };

  const styles = dynamicStyles(isDarkMode); // Obtém os estilos baseados no tema

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Adicionar Receita</Text>

        {/* Campo de Nome da Receita */}
        <Text style={styles.inputLabel}>Nome da Receita:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Pizza Marguerita"
          placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
        />

        {/* Campo de Ingredientes */}
        <Text style={styles.inputLabel}>Ingredientes:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Farinha, molho de tomate, queijo..."
          placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
        />

        {/* Campo de Passo a Passo */}
        <Text style={styles.inputLabel}>Passo a Passo:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Ex: Misture todos os ingredientes..."
          placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
          multiline
        />

        <Button
          title="Salvar Receita"
          onPress={handleSaveRecipe}
          color={isDarkMode ? '#007BFF' : '#007BFF'} // Cor adaptável ao tema
        />
      </View>

      {/* Modal de confirmação */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Receita salva com sucesso!</Text>
            <Text style={styles.modalMessage}>
              Sua receita foi salva com sucesso. Agora você pode visualizá-la ou adicionar mais receitas.
            </Text>

            <TouchableOpacity onPress={handleCloseModal} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const dynamicStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: isDarkMode ? '#121212' : '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
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
    inputLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#333',
      marginBottom: 8,
      alignSelf: 'flex-start',
      marginLeft: 10,
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
    textArea: {
      height: 120,
      textAlignVertical: 'top',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      padding: 20,
      backgroundColor: isDarkMode ? '#333' : '#fff',
      borderRadius: 8,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: isDarkMode ? '#fff' : '#000',
    },
    modalMessage: {
      fontSize: 16,
      marginBottom: 20,
      textAlign: 'center',
      color: isDarkMode ? '#ccc' : '#333',
    },
    modalButton: {
      backgroundColor: isDarkMode ? '#007BFF' : '#007BFF',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    modalButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });