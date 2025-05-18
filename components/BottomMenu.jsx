import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';

export default function BottomMenu() {
  const router = useRouter();

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#1E1E1E',
      paddingVertical: hp(1.5),
      borderTopWidth: 1,
      borderTopColor: '#333'
    }}>
      <TouchableOpacity onPress={() => router.push('/home')}>
        <Icon name="home" size={hp(3)} color="#00FF00" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/search')}>
        <Icon name="search" size={hp(3)} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/imc')}>
        <Icon name="activity" size={hp(3)} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/calorias')}>
        <Icon name="bar-chart" size={hp(3)} color="white" />
      </TouchableOpacity>
    </View>
  );
}
