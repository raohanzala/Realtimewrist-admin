import SideBar from "../components/SideBar";
import Header from "../components/Header";

function AppLayout({ children }) {

  return (
    <div className="h-screen scrollbar-hide overflow-scroll">
        <p className="bg-[red] text-white text-sm w-full flex justify-center">You are currently offline please wait for internet</p>
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <main className="flex flex-col w-full h-full">
        <Header />
        <div className=" max-w-screen-xl w-full mx-auto overflow-y-auto scrollbar-hide bg-[#f9fafb] py-8 px-8">
          {children}
        </div>
      </main>
    </div>
    </div>
  );
}

export default AppLayout;
