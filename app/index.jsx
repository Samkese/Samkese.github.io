import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import {useRouter} from 'expo-router';


export default function Index() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'flex-end', position: 'relative' }}>
      <StatusBar style="light" />

      <Image
        source={require("../assets/images/welcome.png")}
        style={{
          width: wp('100%'),
          height: hp('100%'),
          position: 'absolute',
          resizeMode: 'cover',
        }}
      />

      <LinearGradient
        colors={['transparent', '#18181b']}
        style={{ width: wp(100), height: hp(70), justifyContent: 'flex-end', paddingBottom: hp(8) }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
      >
        {/* Texto centralizado na parte inferior com animação FadeIn */}
        <Animated.View entering={FadeIn} exiting={FadeOut} style={{ alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
            Supere seus <Text style={{ color: '#00FF00' }}>limites todos os dias!</Text>
          </Text>
          <Text style={{ color: 'white', fontSize: 14, fontStyle: 'italic', textAlign: 'center' }}>
            Resultados vêm com dedicação. Vamos nessa?
          </Text>
        </Animated.View>
           <Text>
            
           </Text>
        <View style={{ alignItems: 'center' }}>
          {/* Botão com animação FadeIn */}
          <Animated.View entering={FadeIn} style={{ alignItems: 'center' }}>
            <TouchableOpacity
             onPress={()=> router.push("login")}
              style={{
                height: hp(7),
                width: wp(78),
                backgroundColor: '#24b411',
                borderColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
                borderWidth: 3,
              }}
            >
              <Text style={{ color: 'white', fontSize: 28, fontStyle: 'normal', fontWeight: '800', fontFamily: 'droid sans', textAlign: 'center' }}>
                Começa Treinamento
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </LinearGradient>
    </View>
  );
}
