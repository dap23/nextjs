import { GiMoneyStack } from "react-icons/gi";
import { getSession } from "next-auth/react";
import React from "react";
import Link from "next/link";
import {
  FaUserClock,
  FaFileSignature,
  FaExchangeAlt,
  FaAddressBook,
  FaMoneyBill,
  FaExpandAlt,
  FaClipboardCheck,
  FaFileInvoiceDollar,
  FaCompressAlt,
} from "react-icons/fa";
import { useUser } from "@auth0/nextjs-auth0";

export default function Home() {
  const { user } = useUser();
  return (
    <div>
      <h3 className="text-center text-xl text-bold">Informasi Akun</h3>
      {user && (
        <div className="grid grid-cols-1 gap-3 p-3">
          <img src={user.picture} className="rounded" />
          <div className="text-lg mt-5">Nama: {user.name}</div>
          <div className="text-lg mt-5">Nickname: {user.nickname}</div>
          <div className="text-lg mt-5">Email: {user.email}</div>
          <div className="text-lg mt-5">Login: {user.updated_at}</div>
        </div>
      )}
    </div>
  );
}
