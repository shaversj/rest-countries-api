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
        className={"shadow-header dark:bg-dark-blue-elements border-0.31 flex h-20 items-center border-white bg-white px-4 lg:px-20 dark:border-0"}
      >
        <h1 className={"text-header"}>Where in the world?</h1>
        <button onClick={() => toggleDarkMode()} className={"ml-auto flex items-center gap-x-2"}>
          <img className={"size-4 lg:size-5"} src={"/moon.svg"} alt={"Dark Mode"} />
          <span className={"text-header-sm"}>{isDarkModeEnabled ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
