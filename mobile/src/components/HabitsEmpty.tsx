import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function HabitsEmpty() {
  const { navigate } = useNavigation();

  return (
    <View>
      <Text className="text-zinc-400 text-base">
        Você ainda não está monitorando nenhum hábito para este dia da semana
        <Text
          onPress={() => navigate("new")}
          className="text-violet-400 text-base underline active:text-violet-500"
        >
          toque aqui para cadastrar.
        </Text>
      </Text>
    </View>
  );
}
