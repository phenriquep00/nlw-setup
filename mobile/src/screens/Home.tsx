import { View, Text, ScrollView, Alert } from "react-native";
import { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { api } from "../lib/axios";
import { generateRangeDatesFromYearStart } from "../utils/generate-range-between-dates";

import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const datesFromYearStart = generateRangeDatesFromYearStart();

const minimumSummaryDatesSize = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length;

type TSummary = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

export function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [summary, setSummary] = useState<TSummary | null>(null);
  const { navigate } = useNavigation();

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get("/summary");
      setSummary(response.data);
    } catch (error) {
      Alert.alert("Ops", "Não foi possível carregar o sumário de hábitos.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-4 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((day, index) => (
          <Text
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            key={`${weekDays}-${index}`}
            style={{ width: DAY_SIZE }}
          >
            {day}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {summary && (
          <View className="flex-row flex-wrap">
            {datesFromYearStart.map((date) => {
              const dayWithabits = summary.find((day) => {
                return dayjs(date).isSame(day.date, "day");
              });

              return (
                <HabitDay
                  date={date}
                  amount={dayWithabits?.amount}
                  completed={dayWithabits?.completed}
                  key={date.toISOString()}
                  onPress={() => {
                    navigate("habit", { date: date.toISOString() });
                  }}
                />
              );
            })}

            {amountOfDaysToFill > 0 &&
              Array.from({ length: amountOfDaysToFill }).map((_, index) => (
                <View
                  key={index}
                  className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                ></View>
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
