import logo from "../assets/Logo.svg";
import { Plus } from "phosphor-react";

export function Header() {
  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={logo} alt="logo" />

      <button
        className="flex items-center gap-3 border border-violet-500 font-semibold rounded-lg px-6 py-4 hover:border-violet-300"
        type="button"
      >
        <Plus size={20} className="text-violet-500" />
        new habit
      </button>
    </div>
  );
}
