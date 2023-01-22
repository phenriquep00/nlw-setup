import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function New() {
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [title, setTitle] = useState("");

  const handleToggleWeekDay = (weekDayIndex: number) => {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  };

  async function handleCreateNewHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        return Alert.alert(
          "Novo hábito",
          "informe o nome do hábito e escolha a periodicidade!"
        );
      }

      await api.post("/habits", { title, weekDays });

      setTitle("");
      setWeekDays([]);

      Alert.alert("Novo hábito!", "hábito criado com sucesso");
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possível criar o novo hábito");
    }
  }

  return (
    <View className="flex-1 bg-background px-8 py-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento
        </Text>

        <TextInput
          onChangeText={setTitle}
          value={title}
          placeholder="Exercícios, Dormir bem, etc..."
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-zinc-800 border-2 focus:border-green-600"
          placeholderTextColor={colors.zinc[400]}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base ">
          Qual a recorrência?
        </Text>
        {availableWeekDays.map((day, index) => (
          <Checkbox
            title={day}
            checked={weekDays.includes(index)}
            key={`${day}+${index}`}
            onPress={() => handleToggleWeekDay(index)}
          />
        ))}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleCreateNewHabit}
          className="flex-row w-full h-14 items-center justify-center bg-green-600 rounded-md mt-6"
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="font-semibold text-base ml-2 text-white">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
