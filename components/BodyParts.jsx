import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { bodyimage } from "../constants/index";
import { useRouter } from 'expo-router';

export default function BodyParts() {
  const router = useRouter();   
  return (
    <View style={{ margin: 10 }}>
      <Text style={{ fontSize: hp(3), fontWeight: "bold", color: "white" }}>Exercícios</Text>

      <FlatList
        data={bodyimage}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => <BodyPartCard router={router} item={item} />}
      />
    </View>
  );
}

const BodyPartCard = ({ item, router }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <TouchableOpacity
       onPress={() => router.push({ pathname: '/exercicio', params: { id: item.id } })}
        style={{
          width: wp(44),
          height: wp(44), 
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20, 
          overflow: "hidden",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Image
          source={item.image}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 20,
            borderWidth: 2,
            resizeMode: "cover",
          }}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.6)"]}
          style={{
            position: "absolute",
            width: "100%",
            height: "40%",
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: hp(2.3),
              color: "white",
              fontWeight: "600",
              textAlign: "center",
              letterSpacing: 1,
            }}
          >
            {item.title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
