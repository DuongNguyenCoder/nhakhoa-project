import SideBarDiscount from "@/components/SideBarDiscount";

export default function NewsLayout({ children }) {
  return (
    <div className="mx-auto w-full md:w-[760px] md:px-1 lg:flex lg:w-[970px] lg:px-3 xl:w-[1230px] 2xl:w-[1500px]">
      <div className="my-5 w-full px-4 lg:w-[72%]">{children}</div>

      <aside className="mt-6 flex w-full flex-col px-2 lg:mt-5 lg:w-[28%]">
        <SideBarDiscount />
      </aside>
    </div>
  );
}
