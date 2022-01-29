import React from 'react'
import Link from 'next/link'
import { useRouter } from "next/router"
import { FaCashRegister, FaHistory, FaUserFriends, FaWallet, FaRegGem, FaExchangeAlt, FaChartPie, FaDatabase, FaBookOpen, FaSignInAlt } from "react-icons/fa"
import { MdPersonSearch } from "react-icons/md"

function Sidebar() {
    const router = useRouter();

    return (
        <div className="flex flex-col justify-between w-2/12 bg-transparent p-3 rounded-xl no-print">
            <div>
                <img src='/img/logo.png' className='w-36 mt-4 mb-10 mx-auto' alt='logo' />

                <ul className="space-y-2 text-sm cursor-pointer">

                    <li className={router.pathname == "/penjualan" ? "bg-green-500 text-white rounded-md transition" : "text-slate-800 hover:bg-gray-200 rounded-md transition"}>
                        <Link href="/penjualan" >
                            <div className="flex items-center space-x-3 p-2 rounded-md font-medium">
                                <span className="w-4">
                                    <FaCashRegister />
                                </span>
                                <span>Transaksi Kasir</span>
                            </div>
                        </Link>
                    </li>
                    <li className={router.pathname == "/nota" ? "bg-green-500 text-white rounded-md transition" : "text-slate-800 hover:bg-gray-200 rounded-md transition"}>
                        <Link href="/nota" >
                            <div className="flex items-center space-x-3 p-2 rounded-md font-medium">
                                <span className="w-4">
                                    <FaHistory />
                                </span>
                                <span>Transaksi</span>
                            </div>
                        </Link>
                    </li>
                    <li className={router.pathname == "/log-barang" ? "bg-green-500 text-white rounded-md transition" : "text-slate-800 hover:bg-gray-200 rounded-md transition"}>
                        <Link href="/log-barang" >
                            <div className="flex items-center space-x-3 p-2 rounded-md font-medium">
                                <span className="w-4">
                                    <FaHistory />
                                </span>
                                <span>Log Barang</span>
                            </div>
                        </Link>
                    </li>
                    <li className={router.pathname == "/customer" ? "bg-green-500 text-white rounded-md transition" : "text-slate-800 hover:bg-gray-200 rounded-md transition"}>
                        <Link href="/customer" >
                            <div className="flex items-center space-x-3 p-2 rounded-md font-medium">
                                <span className="w-4">
                                    <MdPersonSearch />
                                </span>
                                <span>Customer</span>
                            </div>
                        </Link>
                    </li>
                    <li className={router.pathname == "/stok-emas" ? "bg-green-500 text-white rounded-md transition" : "text-slate-800 hover:bg-gray-200 rounded-md transition"}>
                        <Link href="/stok-emas" >
                            <div className="flex items-center space-x-3 p-2 rounded-md font-medium">
                                <span className="w-4">
                                    <FaRegGem />
                                </span>
                                <span>Stok Barang</span>
                            </div>
                        </Link>
                    </li>
                    <li className={router.pathname == "/karyawan" ? "bg-green-500 text-white rounded-md transition" : "text-slate-800 hover:bg-gray-200 rounded-md transition"}>
                        <Link href="/karyawan" >
                            <div className="flex items-center space-x-3 p-2 rounded-md font-medium">
                                <span className="w-4">
                                    <FaUserFriends />
                                </span>
                                <span>Karyawan</span>
                            </div>
                        </Link>
                    </li>
                    <li className={router.pathname == "/finance" ? "bg-green-500 text-white rounded-md transition" : "text-slate-800 hover:bg-gray-200 rounded-md transition"}>
                        <Link href="/finance" >
                            <div className="flex items-center space-x-3 p-2 rounded-md font-medium">
                                <span className="w-4">
                                    <FaWallet />
                                </span>
                                <span>Finance</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <a href="#" className="flex items-center cursor-not-allowed space-x-3 p-2 rounded-md font-medium">
                            <span className="w-4">
                                <FaChartPie />
                            </span>
                            <span>Analytics</span>
                        </a>
                    </li>
                    <li className={router.pathname == "/master-data" ? "bg-green-500 text-white rounded-md transition" : "text-slate-800 hover:bg-gray-200 rounded-md transition"}>
                        <Link href="/master-data" >
                            <div className="flex items-center space-x-3 p-2 rounded-md font-medium">
                                <span className="w-4">
                                    <FaDatabase />
                                </span>
                                <span>Master Data</span>
                            </div>
                        </Link>

                    </li>
                    <li className={router.pathname == "/" ? "bg-green-500 text-white rounded-md transition" : "text-slate-800 hover:bg-gray-200 rounded-md transition"}>
                        <Link href="/" >
                            <div className="flex items-center space-x-3 p-2 rounded-md font-medium">
                                <span className="w-4">
                                    <FaSignInAlt />
                                </span>
                                <span>Login</span>
                            </div>
                        </Link>
                    </li>

                </ul>
            </div>

            <div className='text-sm text-sky-500'>©Digitif Indonesia</div>
        </div>
    )
}

export default Sidebar
