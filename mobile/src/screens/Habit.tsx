import { ScrollView, View, Text, Alert } from "react-native";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import HabitsEmpty from "../components/HabitsEmpty";
import clsx from "clsx";

interface Params {
  date: string;
}

interface IDayInfo {
  completedHabits: string[];
  possibleHabits: {
    id: string;
    title: string;
  }[];
}

export function Habit() {
  const route = useRoute();
  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");
  const isPast = parsedDate.endOf("day").isBefore(new Date());

  const [completedhabits, setCompletedHabits] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<IDayInfo | null>(null);

  const habitsProgress = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(
        dayInfo.possibleHabits.length,
        completedhabits.length
      )
    : 0;

  async function fetchHabits() {
    try {
      setLoading(true);

      const response = await api.get("/day", {
        params: {
          date,
        },
      });

      setDayInfo(response.data);
      setCompletedHabits(response.data.completedHabits);
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não conseguimos carregar as informaçoes do dia!");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleHabit(habitId: string) {
    try {
      if (completedhabits.includes(habitId)) {
        setCompletedHabits((prevState) =>
          prevState.filter((habit) => habit !== habitId)
        );
      } else {
        setCompletedHabits((prevState) => [...prevState, habitId]);
      }

      // toggle on api
      await api.patch(`/habits/${habitId}/toggle`);
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possível atualizar o status do hábito");
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) return <Loading />;

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

        <ProgressBar progress={habitsProgress} />

        <View
          className={clsx("mt-6", {
            ["opacity-40"]: isPast,
          })}
        >
          {dayInfo?.possibleHabits ? (
            dayInfo.possibleHabits.map((habit) => {
              return (
                <Checkbox
                  key={habit.id}
                  disabled={isPast}
                  onPress={() => {
                    handleToggleHabit(habit.id);
                  }}
                  title={habit.title}
                  checked={completedhabits.includes(habit.id)}
                />
              );
            })
          ) : (
            <HabitsEmpty />
          )}
        </View>

        {isPast && (
          <Text className="text-zinc-400 mt-10 text-center">
            Você não pode atualizar habitos em datas passadas!
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
