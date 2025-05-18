import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-virtualized-view';
import { exerciseNameTranslation } from "../constants";

export default function ExercicioDetalhes() {
  const item = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      {/* Imagem do exercício */}
      <View
        style={{
          backgroundColor: '#e5e5e5',
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Image
          source={{ uri: item.gifUrl }}
          contentFit='cover'
          style={{
            width: wp(100),
            height: hp(45),
          }}
        />
      </View>

      {/* Botão de voltar */}
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
        <Ionicons name="close" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Detalhes do exercício */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontSize: hp(2.4), fontWeight: '900', marginBottom: 10, color: '#fff' }}>
          {exerciseNameTranslation[item.name] || item.name}
        </Text>

        <Text style={{ fontSize: hp(2.4), fontWeight: '700', marginBottom: 5, color: '#fff' }}>
          Equipamentos: <Text style={{ fontWeight: 'normal'}}>{item.equipment}</Text>
        </Text>

        <Text style={{ fontSize: hp(2.4), fontWeight: '700', marginBottom: 5, color: '#fff' }}>
          Músculos Secundários: <Text style={{ fontWeight: 'normal' }}>{item.secondaryMuscles}</Text>
        </Text>

        <Text style={{ fontSize: hp(2.4), fontWeight: '700', marginBottom: 5, color: '#fff' }}>
          Objetivo: <Text style={{ fontWeight: 'normal' }}>{item.target}</Text>
        </Text>

        <Text style={{ fontSize: hp(3), fontWeight: '700', marginBottom: 10, color: '#fff' }}>
          Instruções:
        </Text>

        {item.instructions?.split(',').map((instruction, index) => (
          <Text
            key={index}
            style={{
              fontSize: hp(1.8),
              color: '#ccc',
              marginBottom: 5,
              textAlign: 'auto',
              lineHeight: hp(3.2),
            }}
          >
            • {instruction.trim()}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}
