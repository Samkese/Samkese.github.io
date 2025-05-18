import React, { useState } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Feather';
import ImageSlider from '../components/ImageSlider';
import BodyParts from '../components/BodyParts';
import BottomMenu from '../components/BottomMenu';

export default function Home() {
  const [search, setSearch] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      <SafeAreaView style={{ flex: 1, gap: 20 }} edges={['top']}>
        <StatusBar style="dark" />

        {/* Topo da Home */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 80 }}>
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: hp(3.6), fontWeight: '700', color: 'white' }}>
              PRONTO PARA <Text style={{ color: '#00FF00' }}>TREINAMENTO</Text>
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(2) }}>
            <View style={{
              backgroundColor: 'white',
              borderRadius: hp(7) / 2,
              padding: wp(2),
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: 'lightgrey',
              borderWidth: 3,
            }}>
              <Icon name="bell" size={hp(3)} color="#00FF00" />
            </View>
            <Image
              source={require('../assets/images/avatar.png')}
              style={{ height: hp(7), width: hp(7), borderColor: 'lightgrey', borderWidth: 3, borderRadius: hp(3.5) }}
            />
          </View>
        </View>
        {/* Carrossel de Imagens */}
        <View>
          <ImageSlider />
        </View>

        {/* Lista de Exercícios */}
        <View style={{ flex: 1 }}>
          <BodyParts searchTerm={search} />
        </View>
      </SafeAreaView>
      
      {/* Menu inferior fixo */}
      <BottomMenu />
    </View>
  );
}
