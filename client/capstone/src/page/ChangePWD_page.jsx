import Changepwd from "../component/changepwdComponent";
export default function Changepwd_page() {
  return (
    <main className="bg-gradient-to-br from-[#171A1E] from-35%  to-[#776212] to-100% w-screen h-screen flex content-center items-center justify-center ">
      <div className="w-11/12  sm:w-2/3 md:w-2/3  lg:w-2/5  xl:w-1/3  bg-white bg-opacity-10 rounded-3xl flex content-center  ">
        <div className=" flex flex-col w-full p-10 lg:p-10 gap-5 ">
          <div className="flex justify-center">
            <h1 className="text-4xl text-white font-bold  ">Change Password</h1>
          </div>
          <Changepwd />
        </div>
      </div>
    </main>
  );
}
