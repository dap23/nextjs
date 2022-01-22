import { useEffect, useState, React } from 'react'
import nookies from 'nookies'
import axios from 'axios'
import { FaPencilAlt, FaTrashAlt, FaSearch } from "react-icons/fa"
import { toast } from 'react-toastify'
import Router from 'next/router'

function Nota() {

    const [cookies, setCookies] = useState({});
    const [userData, setUserData] = useState({});
    const [customer, setCustomer] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [editData, setEditData] = useState({});
    const [editId, setEditId] = useState(0);
    const [pagination, setPagination] = useState({});

    useEffect(() => {
        const cks = nookies.get(null);
        setCookies(cks);
        getCust();
    }, [])

    const api_url = "/api/nota/";
    const res_name = "Nota";
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    }

    async function changePage(type) {
        if (type == "prev") {
            if (page > 1) {
                setPage(page - 1);
                getCust(page - 1);
            }
        } else {
            if (page < pagination.total_page) {
                setPage(page + 1);
                getCust(page + 1);
            }

        }
    }

    const getCust = async (p = page) => {
        let size = 10;
        if (search != "") {
            p = 1;
            size = 100;
        }
        try {
            var res = await axios.get(`${api_url}get?page=${p}&search=${search}`);
            setCustomer(res.data.data);
            setPagination(res.data.pagination);
        } catch (err) {
            console.log(err);
        }
    }

    const deleteResource = async (id) => {
        var result = confirm("Lanjutkan menghapus?");
        if (!result) {
            return;
        }
        try {
            var res = await axios.post(`${api_url}create`, {
                delete: id
            });
            toast.success(`${res_name} berhasil dihapus`);
            getCust();
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            var res = await axios.post(`${api_url}create`, userData);
            toast.success(`${res_name} berhasil ditambahkan`);
            getCust();
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            var res = await axios.post(`${api_url}create`, editData);
            toast.success(`${res_name} berhasil diedit`);
            getCust();
        } catch (err) {
            console.log(err);
        }
    }

    async function editResource(id) {
        setEditId(id);
        try {
            var res = await axios.get(`${api_url}get?id=${id}`);
            setEditData(res.data.data);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            console.log(err);
        }
    }

    function custRow() {
        var custArr = customer;

        if (custArr.length == 0) {
            return;
        }

        return custArr.map((el, index) => {
            let arr = [];
            let jenis = "";
            const items = JSON.parse(el.object).item;

            if (items) {
                for (const key in items) {

                    if (Object.hasOwnProperty.call(items, key)) {
                        const el = items[key];

                        if (el.jenis != undefined) {
                            arr.push(el.jenis);

                        }
                    }
                }
                jenis = arr.join(",");
            }

            return (
                <div key={el.id} className='grid grid-cols-8 gap-3 text-left text-xs border-b py-3 items-center'>
                    <div>{index + 1}</div>
                    <div>{el.tipe.toUpperCase()}</div>
                    <div>{el.nomor_nota}</div>
                    <div>{new Date(el.createdAt).toLocaleDateString('id-ID', dateOptions)} {new Date(el.createdAt).toLocaleTimeString('id-ID')}</div>
                    <div>{jenis}</div>
                    <div>{el.customer}</div>
                    <div>{parseInt(el.total).toLocaleString("id-ID")}</div>
                    <div className='flex justify-end w-full'>
                        <button onClick={() => deleteResource(el.id)} className='text-xs bg-red-500 py-1 rounded px-2 text-white flex item-center'><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg></button>
                        <button onClick={() => Router.push(`/print/${el.id}`)} className='text-xs bg-green-500 ml-1 py-1 px-2 rounded text-white flex items-center'><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg></button>
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            <div>

                <div className='rounded p-3'>
                    <div className='w-full rounded my-3'>
                        <p className='font-bold text-lg'>Daftar {res_name}</p>
                    </div>
                    <div className='mb-3 flex'>
                        <input onChange={(e) => setSearch(e.target.value)} placeholder={`Cari ${res_name}`} className='w-4/12 p-2 mr-2 border rounded' />
                        <button onClick={() => getCust()} className='flex justify-center items-center p-2 border rounded bg-white text-slate-800 w-2/12'><FaSearch className='mr-1' /> CARI</button>
                    </div>
                    <div className='flex flex-end items-center mb-2'>
                        <div className='w-full text-right text-xs'>
                            <span className="text-xs xs:text-sm text-gray-900">
                                Halaman {pagination.current_page} dari {pagination.total_page} halaman ({pagination.total_records} {res_name})
                            </span>
                        </div>
                        <div className='flex flex-end ml-2'>
                            <button onClick={() => changePage("prev")} className='border bg-white p-2 text-xs flex items-center'><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>Prev</button>
                            <button onClick={() => changePage("next")} className='border bg-white p-2 text-xs flex items-center'>Next<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg></button>
                        </div>
                    </div>

                    <div className='grid grid-cols-8 gap-3 text-left font-bold text-xs border-b border-t py-3'>
                        <div>No</div>
                        <div>Tipe</div>
                        <div>Nomor Nota</div>
                        <div>Tanggal</div>
                        <div>Jenis Emas</div>
                        <div>Customer</div>
                        <div>Total</div>
                        <div className='text-right'>Action</div>
                    </div>
                    {custRow()}
                </div>
            </div>
        </div>
    )
}

export default Nota
