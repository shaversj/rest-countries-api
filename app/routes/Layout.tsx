import { Outlet } from "react-router";
import { useState } from "react";

export default function Layout() {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  function toggleDarkMode() {
    setIsDarkModeEnabled(!isDarkModeEnabled);
    document.documentElement.classList.toggle("dark");
  }

  return (
    <div className={"dark:bg-very-dark-blue-bg min-h-screen bg-[#fafafa] antialiased"}>
      <header
        className={
          "shadow-header dark:bg-dark-blue-elements flex h-[80px] items-center border-[1.25px] border-white bg-white px-4 lg:px-[80px] dark:border-0"
        }
      >
        <h1 className={"text-header"}>Where in the world?</h1>
        <button onClick={() => toggleDarkMode()} className={"ml-auto flex items-center gap-x-2"}>
          <img className={"size-[16px] lg:size-[20px]"} src={"/moon.svg"} alt={"Dark Mode"} />
          <span className={"text-header-sm"}>{isDarkModeEnabled ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
