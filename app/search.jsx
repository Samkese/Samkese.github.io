import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
import { exerciseNameTranslation, bodyimage } from '../constants';
import { Image } from 'expo-image';
import BottomMenu from '../components/BottomMenu';
import { fetchAllExercises } from '../api/exerciseDB';

export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  const normalizeText = useCallback(
    (text) => (text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(),
    []
  );

  const loadExercises = useCallback(async () => {
    try {
      const allExercises = await fetchAllExercises();
      setExercises(allExercises);
    } catch (error) {
      console.error('Erro ao carregar exercícios:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExercises();
  }, [loadExercises]);

  const filteredSuggestions = exercises.filter((ex) => {
    const translatedName = exerciseNameTranslation[ex.name] || ex.name;
    return normalizeText(translatedName).includes(normalizeText(search));
  });

  const renderExercises = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#fff" style={{ marginTop: 30 }} />;
    }

    if (search.length === 0) {
      return (
        <>
          <Text style={styles.title}>Exercícios por grupo</Text>
          <FlatList
            data={bodyimage}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContent}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <BodyPartCard item={item} router={router} />}
          />
        </>
      );
    }

    return filteredSuggestions.length > 0 ? (
      <FlatList
        data={filteredSuggestions}
        numColumns={2}
        keyExtractor={(item) => item.id?.toString()}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ExercicioCard item={item} router={router} />}
      />
    ) : (
      <Text style={styles.emptyMessage}>Nenhum exercício encontrado.</Text>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar exercício"
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />
      {renderExercises()}
      <BottomMenu />
    </View>
  );
}

// COMPONENTES AUXILIARES

const ExercicioCard = ({ item, router }) => (
  <View style={{ marginBottom: 16 }}>
    <TouchableOpacity
      onPress={() => router.push({ pathname: '/exercicioDetalhes', params: item })}
      style={styles.exerciseCard}
    >
      <Image
        source={{ uri: item.gifUrl }}
        resizeMode="contain"
        style={styles.exerciseImage}
      />
      <View style={{ paddingVertical: 8, paddingHorizontal: 6 }}>
        <Text style={styles.exerciseText}>
          {exerciseNameTranslation[item.name] || item.name}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

const BodyPartCard = ({ item, router }) => (
  <View style={{ marginBottom: 16 }}>
    <TouchableOpacity
      onPress={() => router.push({ pathname: '/exercicio', params: { id: item.id } })}
      style={styles.bodyCard}
    >
      <Image
        source={item.image}
        style={styles.bodyImage}
      />
      <View style={styles.bodyOverlay}>
        <Text style={styles.bodyText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

// ESTILOS

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 10,
    paddingTop: hp(5),
  },
  searchInput: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: hp(2),
    marginBottom: 8,
  },
  title: {
    fontSize: hp(3),
    fontWeight: 'bold',
    color: '#fff',
  },
  flatListContent: {
    paddingBottom: 50,
    paddingTop: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  exerciseCard: {
    width: wp(44),
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
  },
  exerciseImage: {
    width: '100%',
    height: hp(20),
    backgroundColor: '#333',
  },
  exerciseText: {
    fontSize: hp(2.4),
    color: '#fff',
    textAlign: 'center',
  },
  bodyCard: {
    width: wp(44),
    height: wp(44),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  bodyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    borderWidth: 2,
    contentFit: 'cover',
  },
  bodyOverlay: {
    position: 'absolute',
    width: '100%',
    height: '40%',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  bodyText: {
    fontSize: hp(2.3),
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 1,
  },
  emptyMessage: {
    color: '#bbb',
    fontStyle: 'italic',
    marginTop: 20,
    textAlign: 'center',
  },
};
