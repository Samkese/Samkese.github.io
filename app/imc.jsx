import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import BottomMenu from '../components/BottomMenu';
import * as Progress from 'react-native-progress';

export default function ImcScreen() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState('');
  const [erro, setErro] = useState('');
  const [imc, setImc] = useState(null);

  const calcularIMC = () => {
    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaNum = parseFloat(altura.replace(',', '.'));

    if (!pesoNum || !alturaNum || pesoNum <= 0 || alturaNum <= 0) {
      setErro('Por favor, insira valores válidos para peso e altura.');
      setResultado('');
      setImc(null);
      return;
    }

    setErro('');
    const imcCalculado = pesoNum / (alturaNum * alturaNum);
    setImc(imcCalculado);

    let classificacao = '';

    if (imcCalculado < 18.5) {
      classificacao = 'Abaixo do peso';
    } else if (imcCalculado < 24.9) {
      classificacao = 'Peso normal';
    } else if (imcCalculado < 29.9) {
      classificacao = 'Sobrepeso';
    } else if (imcCalculado < 34.9) {
      classificacao = 'Obesidade grau 1';
    } else if (imcCalculado < 39.9) {
      classificacao = 'Obesidade grau 2';
    } else {
      classificacao = 'Obesidade grau 3';
    }

    setResultado(`Seu IMC é ${imcCalculado.toFixed(2)} (${classificacao})`);
  };

  const calcularProgresso = (valor) => {
    if (!valor) return 0;
    return Math.min(valor / 40, 1);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <StatusBar style="light" />

        {/* Título */}
        <View style={styles.topContainer}>
          <Text style={styles.title}>
            CALCULADORA DE <Text style={{ color: '#00FF00' }}>IMC</Text>
          </Text>
        </View>

        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          {/* Inputs */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="weight-kilogram" size={24} color="#00FF00" />
            <TextInput
              style={styles.input}
              placeholder="Peso (kg)"
              placeholderTextColor="gray"
              keyboardType="numeric"
              value={peso}
              onChangeText={setPeso}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="human-male-height" size={24} color="#00FF00" />
            <TextInput
              style={styles.input}
              placeholder="Altura (m)"
              placeholderTextColor="gray"
              keyboardType="numeric"
              value={altura}
              onChangeText={setAltura}
            />
          </View>

          {erro ? <Text style={styles.erro}>{erro}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={calcularIMC}>
            <Text style={styles.buttonText}>Calcular IMC</Text>
          </TouchableOpacity>

          {resultado ? (
            <View style={styles.card}>
              <Text style={styles.resultado}>{resultado}</Text>

              {/* Gráfico */}
              <Progress.Circle
                size={150}
                progress={calcularProgresso(imc)}
                showsText={true}
                formatText={() => imc ? `${imc.toFixed(1)}` : ''}
                color="#00FF00"
                thickness={10}
                borderWidth={2}
                unfilledColor="#3A3A3A"
                textStyle={{ color: 'white', fontWeight: 'bold' }}
                style={{ marginTop: 20 }}
              />
            </View>
          ) : null}
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Menu inferior */}
      <BottomMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 55,
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    fontSize: 18,
    color: 'white',
  },
  button: {
    backgroundColor: '#00FF00',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#1E1E1E',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#2C2C2C',
    padding: 20,
    marginTop: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  resultado: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  erro: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
