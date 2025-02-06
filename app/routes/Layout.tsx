import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className={"w-[1440px] bg-[#fafafa] antialiased"}>
      <header className={"shadow-header border-header-custom flex h-[80px] items-center bg-white px-[80px]"}>
        <h1 className={"text-header-lg"}>Where in the world?</h1>
        <div className={"ml-auto flex gap-x-2"}>
          <img src={"/moon.svg"} alt={"Dark Mode"} />
          <h2 className={"text-header-sm"}>Dark Mode</h2>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
