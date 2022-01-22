import { useEffect, useState, React } from 'react'
import nookies from 'nookies'
import axios from 'axios'
import { FaPencilAlt, FaTrashAlt, FaSearch } from "react-icons/fa"
import { toast } from 'react-toastify'

function JenisEmas() {

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

    const api_url = "/api/gold-type/";
    const res_name = "Jenis";


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
            return (
                <div key={el.id} className='grid grid-cols-3 gap-3 text-left text-xs border-b py-3'>
                    <div>{index + 1}</div>
                    <div>{el.name}</div>
                    <div className='flex justify-end w-full'>
                        <button onClick={() => editResource(el.id)} className='text-xs bg-green-500 mr-1 p-1 rounded text-white'><FaPencilAlt /></button>
                        <button onClick={() => deleteResource(el.id)} className='text-xs bg-red-500 p-1 rounded text-white'><FaTrashAlt /></button>
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            <div>
                {editId == 0 && <div>
                    <div className='w-full p-3 rounded'>
                        <p className='font-bold text-lg'>Buat {res_name} Baru</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='rounded p-3 grid grid-cols-2 gap-3'>
                            <input onChange={(e) => handleChange(e)} required placeholder='Nama' name="name" className='p-2 border rounded' />
                        </div>
                        <div className='flex justify-end w-full p-3'>
                            <button className='py-2 px-10 border rounded bg-green-400 text-white font-bold'>SIMPAN</button>
                        </div>
                    </form>
                </div>}

                {editId != 0 && <div>
                    <div className='w-full p-3 rounded'>
                        <div className='font-bold text-lg'>Edit {res_name} <button onClick={() => setEditId(0)} className='text-xs border p-1'>Buat Baru</button></div>
                    </div>
                    <form onSubmit={handleUpdate}>
                        <div className='rounded p-3 grid grid-cols-2 gap-3'>
                            <input onChange={(e) => handleUpdateChange(e)} required placeholder='Nama' value={editData?.name || ""} name="name" className='p-2 border rounded' />
                        </div>
                        <div className='flex justify-end w-full p-3'>
                            <button className='py-2 px-10 border rounded bg-green-400 text-white font-bold'>SIMPAN</button>
                        </div>

                    </form>
                </div>}

                <hr />

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

                    <div className='grid grid-cols-3 gap-3 text-left font-bold text-xs border-b border-t py-3'>
                        <div>No</div>
                        <div>Nama</div>
                        <div className='text-right'>Action</div>
                    </div>
                    {custRow()}
                </div>
            </div>
        </div>
    )
}

export default JenisEmas
