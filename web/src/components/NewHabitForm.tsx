import { Check } from "phosphor-react";

export function NewHabitForm() {
  return (
    <form className="w-full flex flex-col mt-6 ">
      <label className="font-semibold leading-tight" htmlFor="title">
        Qual seu comprometimento?
      </label>
      <input
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        type="text"
        name=""
        id="title"
        placeholder="ex.:Exercicios, dormir bem, etc..."
        autoFocus
      />

      <label className="font-semibold leading-tight mt-4" htmlFor="">
        Qual a recorrência?
      </label>

      <button
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 text-white"
        type="submit"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
