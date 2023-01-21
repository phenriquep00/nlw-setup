import { ScrollView, View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";

interface Params {
  date: string;
}

export function Habit() {
  const route = useRoute();
  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
            {dayOfWeek}
        </Text>

        <Text className="mt-6 text-white font-extrabold text-3xl lowercase">
            {dayAndMonth}
        </Text>

        <ProgressBar progress={50}/>

        <View className="mt-6">
            <Checkbox title="Beber 2L de Água" checked={false}/>
            <Checkbox title="Exercícios" checked/>
        </View>
      </ScrollView>
    </View>
  );
}
