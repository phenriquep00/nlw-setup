import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, FormEventHandler, useState } from "react";
import { api } from "../lib/axios";

const weekDays_ = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  const createNewHabit = async (event: FormEvent) => {
    event.preventDefault();

    if (!title || weekDays.length === 0) return;

    await api.post("habits", {
      title,
      weekDays,
    });

    setTitle("");
    setWeekDays([]);

    alert("Hábito criado com sucesso");
  };

  const handleToggleWeekDay = (weekDay: number) => {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedDay = weekDays.filter((day) => day !== weekDay);
      setWeekDays(weekDaysWithRemovedDay);
    } else {
      const weekDaysWithAddedDay = [...weekDays, weekDay];
      setWeekDays(weekDaysWithAddedDay);
    }
  };

  return (
    <form
      onSubmit={createNewHabit}
      className="w-full flex flex-col mt-6 text-white"
    >
      <label className="font-semibold leading-tight" htmlFor="title">
        Qual seu comprometimento?
      </label>
      <input
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-900 ring-offset-2 ring-offset-zinc-900"
        type="text"
        name=""
        id="title"
        placeholder="ex.:Exercicios, dormir bem, etc..."
        autoFocus
        onChange={(event) => setTitle(event.target.value)}
        value={title}
      />

      <label className="font-semibold leading-tight mt-4" htmlFor="">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {weekDays_.map((day, index) => (
          <Checkbox.Root
            onCheckedChange={() => {
              handleToggleWeekDay(index);
            }}
            key={day}
            checked={weekDays.includes(index)}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-900 ring-offset-2 ring-offset-zinc-900">
              <Checkbox.Indicator>
                <Check size={20} color="white" />
              </Checkbox.Indicator>
            </div>

            <span className="text-white leading-tight">{day}</span>
          </Checkbox.Root>
        ))}
      </div>

      <button
        className="mt-6 rounded-lg p-4 flex items-center transition-colors justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 text-white"
        type="submit"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
