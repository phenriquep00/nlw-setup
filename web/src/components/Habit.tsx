interface HabitProps {
  completed: number;
}

export function Habit({ completed }: HabitProps) {
  return <p>{completed}</p>;
}
