import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />

      {/* Fundo */}
      <Image
        source={require('../assets/images/welcome.png')}
        style={{
          position: 'absolute',
          width: wp(100),
          height: hp(100),
          resizeMode: 'cover',
        }}
      />

      {/* Gradiente */}
      <LinearGradient
        colors={['transparent', '#18181b']}
        style={{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: 20, paddingBottom: hp(8) }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.box}>
            <Text style={styles.title}>Entrar</Text>

            <TextInput
              placeholder="E-mail"
              placeholderTextColor="#ccc"
              keyboardType="email-address"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Senha"
              placeholderTextColor="#ccc"
              secureTextEntry
              style={styles.input}
              value={senha}
              onChangeText={setSenha}
            />

            <TouchableOpacity
              onPress={() => router.push('home')}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('cadastrar')} style={{ marginTop: 14 }}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>
                Não tem conta? <Text style={{ color: '#24b411', fontWeight: 'bold' }}>Cadastre-se</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
}

const styles = {
  box: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 20,
    borderRadius: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#fff',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#24b411',
  },
  primaryButton: {
    backgroundColor: '#24b411',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 2,
    marginTop: 6,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
};
