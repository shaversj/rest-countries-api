import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className={"bg-[#fafafa] antialiased"}>
      <header className={"shadow-header border-header-custom flex h-[80px] items-center bg-white px-4 lg:px-[80px]"}>
        <h1 className={"text-header"}>Where in the world?</h1>
        <div className={"ml-auto flex items-center gap-x-2"}>
          <img className={"size-[16px] lg:size-[20px]"} src={"/moon.svg"} alt={"Dark Mode"} />
          <h2 className={"text-header-sm"}>Dark Mode</h2>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
