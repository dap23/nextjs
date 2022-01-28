import { GiMoneyStack } from "react-icons/gi";

export default function Home() {
  return (
    <main className="h-80 py-60 w-full flex items-center">
      <div className="w-4/12 mx-auto bg-white shadow-lg rounded-lg p-5 border-2 border-green-500">
        <div>
          <div className="text-sm mb-1 font-bold">Username</div>
          <input className="p-2 border border-black w-full rounded" />
        </div>
        <div className="mt-2">
          <div className="text-sm mb-1 font-bold">Password</div>
          <input type="password" className="p-2 border border-black w-full rounded" />
        </div>
        <div className="mt-4">
          <button className="p-2 w-full rounded bg-green-500 text-white">MASUK</button>
        </div>
      </div>
    </main>

  )
}
