import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { Image } from 'expo-image';
import { exerciseNameTranslation } from "../constants";

export default function ExerciciosList({ data }) {
  const router = useRouter();
  return (
    <View style={{ margin: 10 }}>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => <ExercicioCard item={item} router={router} />}
      />
    </View>
  );
}

const ExercicioCard = ({ item, router }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <TouchableOpacity
        onPress={() => router.push({ pathname: '/exercicioDetalhes', params:item})}
        style={{
          width: wp(44),
          backgroundColor: "#1E1E1E",
          borderRadius: 20,
          overflow: "hidden",
          alignItems: "center"
        }}
      >
        <Image
          source={{ uri: item.gifUrl }}
          resizeMode='contain'
          style={{
            width: '100%',
            height: hp(20),
            backgroundColor: '#333',
          }}
        />
        <View style={{
          paddingVertical: 8,
          paddingHorizontal: 6,
        }}>
          <Text
            style={{
              fontSize: hp(2.4),
              color: '#fff',
              textAlign: 'center'
            }}
          >
            {exerciseNameTranslation[item.name] || item.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
