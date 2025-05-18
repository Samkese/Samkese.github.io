import { View, Text, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { fetchExercisesByBodyPart } from '../api/exerciseDB';
import { bodyimage, bodyPartTranslation, demoExercicios } from '../constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import {ScrollView} from 'react-native-virtualized-view';
import { Image } from 'react-native';

import ExerciciosList from '../components/ExerciciosList';

export default function Exercicio() {
  const router = useRouter();
  const [exercicios, setExercicios] = useState([demoExercicios]);
  const { id } = useLocalSearchParams();

  const item = bodyimage.find((i) => i.id === id);

  useEffect(() => {
    if (item?.title) getExercises(item.title);
  }, [item]);

  const getExercises = async (bodyPartPtBr) => {
    const traduzido = bodyPartTranslation[bodyPartPtBr];
    if (!traduzido) return console.warn('Sem tradução para:', bodyPartPtBr);

    try {
      const data = await fetchExercisesByBodyPart(traduzido);
      setExercicios(data);
    } catch (err) {
      console.log("Erro na API:", err.message);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#1E1E1E" }}>
      <StatusBar style='light' />

      {item?.image && (
        <View style={{ position: 'relative' }}>
          <Image
            source={item.image}
            style={{
              width: wp(100),
              height: hp(45),
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40
            }}
          />

          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              position: 'absolute',
              top: 40,
              left: 20,
              backgroundColor: 'rgba(55, 207, 62, 0.76)',
              borderRadius: 999,
              padding: 10,
            }}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: hp(3), fontWeight: 'bold', marginBottom: 10, color: '#fff' }}>
          Exercícios de {item?.title}
        </Text>
        <View style={{ marginBottom: 10}}>
          <ExerciciosList data={exercicios}/>
        </View>
      </View>
    </ScrollView>
  );
}
