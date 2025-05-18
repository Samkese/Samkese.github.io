import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker';
import BottomMenu from '../components/BottomMenu';
import { StatusBar } from 'expo-status-bar';

export default function CaloriesScreen() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('masculino');
  const [atividade, setAtividade] = useState('1.2');
  const [resultado, setResultado] = useState('');
  const [erro, setErro] = useState('');

  const calcularCalorias = () => {
    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaNum = parseFloat(altura.replace(',', '.'));
    const idadeNum = parseInt(idade);

    if (!pesoNum || !alturaNum || !idadeNum || pesoNum <= 0 || alturaNum <= 0 || idadeNum <= 0) {
      setErro('Por favor, preencha todos os campos corretamente.');
      setResultado('');
      return;
    }

    setErro('');

    // Fórmula Mifflin-St Jeor
    let tmb = 0;
    if (sexo === 'masculino') {
      tmb = (10 * pesoNum) + (6.25 * alturaNum) - (5 * idadeNum) + 5;
    } else {
      tmb = (10 * pesoNum) + (6.25 * alturaNum) - (5 * idadeNum) - 161;
    }

    const tdee = tmb * parseFloat(atividade);

    setResultado(`Seu gasto calórico diário é de aproximadamente ${Math.round(tdee)} calorias.`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      <SafeAreaView style={{ flex: 1, gap: 20 }} edges={['top']}>
        <StatusBar style="light" />
        
        <View style={{ marginHorizontal: 20 }}>
          <Text style={styles.title}>
            CALCULADORA DE <Text style={{ color: '#00FF00' }}>CALORIAS</Text>
          </Text>
        </View>

        <KeyboardAvoidingView behavior="padding" style={{ flex: 1, gap: 15, marginHorizontal: 20 }}>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="weight-kilogram" size={24} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Peso (kg)"
              keyboardType="numeric"
              placeholderTextColor="#888"
              value={peso}
              onChangeText={setPeso}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="human-male-height" size={24} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Altura (cm)"
              keyboardType="numeric"
              placeholderTextColor="#888"
              value={altura}
              onChangeText={setAltura}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="calendar-account" size={24} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Idade (anos)"
              keyboardType="numeric"
              placeholderTextColor="#888"
              value={idade}
              onChangeText={setIdade}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="gender-male-female" size={24} color="#555" />
            <Picker
              selectedValue={sexo}
              style={styles.picker}
              onValueChange={(itemValue) => setSexo(itemValue)}
              dropdownIconColor="#00FF00"
            >
              <Picker.Item label="Masculino" value="masculino" />
              <Picker.Item label="Feminino" value="feminino" />
            </Picker>
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="run" size={24} color="#555" />
            <Picker
              selectedValue={atividade}
              style={styles.picker}
              onValueChange={(itemValue) => setAtividade(itemValue)}
              dropdownIconColor="#00FF00"
            >
              <Picker.Item label="Sedentário" value="1.2" />
              <Picker.Item label="Levemente ativo" value="1.375" />
              <Picker.Item label="Moderadamente ativo" value="1.55" />
              <Picker.Item label="Muito ativo" value="1.725" />
              <Picker.Item label="Extremamente ativo" value="1.9" />
            </Picker>
          </View>

          {erro ? <Text style={styles.erro}>{erro}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={calcularCalorias}>
            <Text style={styles.buttonText}>Calcular Calorias</Text>
          </TouchableOpacity>

          {resultado ? (
            <View style={styles.card}>
              <Text style={styles.resultado}>{resultado}</Text>
            </View>
          ) : null}
        </KeyboardAvoidingView>
      </SafeAreaView>

      <BottomMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: hp(4),
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    fontSize: 18,
    color: 'white',
  },
  picker: {
    flex: 1,
    color: 'white',
    height: 50,
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
    backgroundColor: '#333',
    padding: 20,
    marginTop: 20,
    borderRadius: 12,
    elevation: 5,
  },
  resultado: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00FF00',
    textAlign: 'center',
  },
  erro: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
