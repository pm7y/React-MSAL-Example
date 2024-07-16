import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";

export function Button({
  children,
  onClick,
  disabled,
}: {
  readonly children: React.ReactNode;
  readonly onClick: () => void;
  readonly disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className="px-4 py-2.5 leading-none flex items-center text-black dark:text-white justify-center text-base font-medium transition-colors bg-stone-100 border border-transparent rounded-md cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 duration-250 dark:bg-stone-800"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function ToggleThemeButton({
  disabled,
}: {
  readonly disabled?: boolean;
}) {
  const [themeMode, setThemeMode] = React.useState(
    localStorage.getItem("themeMode") ?? "dark"
  );

  const toggleThemeHandler = () => {
    const newThemeMode = themeMode === "dark" ? "light" : "dark";

    localStorage.setItem("themeMode", newThemeMode);
    setThemeMode(newThemeMode);
    document.querySelector("html")?.classList.toggle("dark");
  };

  useEffect(() => {
    if (themeMode === "dark") {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [themeMode]);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => toggleThemeHandler()}
      className="flex items-center gap-2 hover:scale-102 active:scale-98"
    >
      {themeMode === "dark" ? (
        <SunIcon className="size-5" />
      ) : (
        <MoonIcon className="size-5" />
      )}
    </button>
  );
}
