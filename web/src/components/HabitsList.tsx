import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import dayjs from "dayjs";

interface IHabitList {
  date: Date;
  onCompletedChange: (_completed: number) => void;
}

interface IHabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[];
}

export function HabitsList({ date, onCompletedChange }: IHabitList) {
  const [habitsInfo, setHabitsInfo] = useState<IHabitsInfo>();

  const isPast = dayjs(date).endOf("day").isBefore(new Date());

  const handleToggleHabit = async (habitId: string) => {
    const isHabitAlreadyCompleted =
      habitsInfo!.completedHabits.includes(habitId);

    api.patch(`/habits/${habitId}/toggle`);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    });

    onCompletedChange(completedHabits.length);

  };

  useEffect(() => {
    api
      .get("/day", {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => {
        setHabitsInfo(response.data);
      });
  }, []);

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map((habit) => {
        return (
          <Checkbox.Root
            key={habit.id}
            disabled={isPast}
            onCheckedChange={() => {
              handleToggleHabit(habit.id);
            }}
            checked={habitsInfo.completedHabits.includes(habit.id)}
            className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 transition-colors group-data-[state=checked]:border-green-500 group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-900 ring-offset-2 ring-offset-background">
              <Checkbox.Indicator>
                <Check size={20} color="white" />
              </Checkbox.Indicator>
            </div>

            <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
              {habit.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </div>
  );
}
