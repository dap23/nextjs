import { useEffect, useState, React } from "react";
import axios from "axios";
import {
  FaPencilAlt,
  FaTrashAlt,
  FaSearch,
  FaClipboardCheck,
} from "react-icons/fa";
import { toast } from "react-toastify";

function Bank() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [customer, setCustomer] = useState([]);
  const [bankData, setBankData] = useState({});
  const [state, setState] = useState(new Date());
  const [userData, setUserData] = useState({});
  const [editId, setEditId] = useState(0);
  const [editData, setEditData] = useState({});
  const [pagination, setPagination] = useState({});

  const api_url = "/api/bank/";
  const res_name = "Bank";

  useEffect(() => {
    getCust();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var res = await axios.post(`${api_url}create`, {
        ...userData,
      });

      toast.success(`${res_name} berhasil ditambahkan`);
      setState(new Date());
      getCust();
      setBankData({});
    } catch (err) {
      console.log(err);
      toast.error(`nominal pemasukan ${res_name} harus diatas Rp50.000.000`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let obj = { ...userData };
    obj = { ...obj, [name]: value };

    setUserData(obj);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      var res = await axios.post(`${api_url}create`, {
        ...editData,
      });
      toast.success(`${res_name} berhasil diedit`);
      getCust();
      setBankData({});
      setEditData({});
      setState(new Date());
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const deleteResource = async (id) => {
    var result = confirm("Lanjutkan menghapus?");
    if (!result) {
      return;
    }
    try {
      var res = await axios.post(`${api_url}create`, {
        delete: id,
      });
      toast.success(`${res_name} berhasil dihapus`);
      getCust();
    } catch (err) {
      console.log(err);
    }
  };

  async function editResource(id) {
    setEditId(id);
    try {
      var res = await axios.get(`${api_url}get?id=${id}`);
      setEditData(res.data.data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.log(err);
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
  };

  function getTotal() {
    let t = 0;
    customer.forEach((el) => {
      if (el.tipe == "Pemasukan" && el.nominal != "NaN") {
        t = t + parseInt(el.nominal);
      }
    });
    return t.toLocaleString("id-ID");
  }

  function getTotalKeluar() {
    let t = 0;
    customer.forEach((el) => {
      if (el.tipe == "Pengeluaran" && el.nominal != "NaN") {
        t = t + parseInt(el.nominal);
      }
    });
    return t.toLocaleString("id-ID");
  }

  function getGrandTotal() {
    let t = 0;
    let k = 0;
    customer.forEach((el) => {
      if (el.tipe == "Pengeluaran" && el.nominal != "NaN") {
        k = k + parseInt(el.nominal);
      }
      if (el.tipe == "Pemasukan" && el.nominal != "NaN") {
        t = t + parseInt(el.nominal);
      }
    });

    let h = t - k;
    return h.toLocaleString("id-ID");
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

  function custRow() {
    var custArr = customer;
    if (custArr.length == 0) {
      return;
    }
    return custArr.map((el, index) => {
      if (el.tipe == "Pemasukan") {
        el.nominal <= 50000000;
      }
      return (
        <div
          key={el.id}
          className="grid grid-cols-6 gap-3 text-center text-xs border-b py-3 items-center"
        >
          <div>{index + 1}</div>
          <div>Rp {el.nominal}</div>
          <div>{el.keterangan}</div>
          <div>{el.createdAt}</div>
          <div>{el.tipe}</div>
          <div className="flex justify-center w-full">
            <button
              onClick={() => editResource(el.id)}
              className="text-xs bg-green-500 mr-1 p-1 rounded text-white"
            >
              <FaPencilAlt />
            </button>
            <button
              onClick={() => deleteResource(el.id)}
              className="text-xs bg-red-500 p-1 rounded text-white"
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      );
    });
  }
  return (
    <div>
      <div className="grid grid-cols-3 gap-5 mt-5 text-white">
        <div className="bg-sky-500 flex flex-col items-center rounded p-10">
          <div className="font-bold text-sm">Uang Masuk</div>
          <div className="font-bold text-2xl">Rp {getTotal()}</div>
        </div>
        <div className="bg-green-500 flex flex-col items-center rounded p-10">
          <div className="font-bold text-sm">Uang Keluar</div>
          <div className="font-bold text-2xl">Rp {getTotalKeluar()}</div>
        </div>
        <div className="bg-red-500 flex flex-col items-center rounded p-10">
          <div className="font-bold text-sm">Total</div>
          <div className="font-bold text-2xl">Rp {getGrandTotal()}</div>
        </div>
      </div>

      {editId == 0 && (
        <div>
          <form key={state} onSubmit={handleSubmit}>
            <div className="rounded p-3 grid grid-cols-1 gap-3">
              <div>
                <div className="text-sm">Nominal</div>
                <input
                  required
                  onChange={(e) => handleChange(e)}
                  placeholder="Nominal"
                  name="nominal"
                  className="p-2 border rounded w-full"
                />
              </div>

              <div>
                <div className="text-sm">Keterangan</div>
                <textarea
                  required
                  onChange={(e) => handleChange(e)}
                  placeholder="Keterangan"
                  rows={5}
                  name="keterangan"
                  className="p-2 border rounded w-full"
                />
              </div>
              <div>
                <div className="text-sm">Tipe</div>
                <select
                  name="tipe"
                  className="w-full p-2 border"
                  onChange={(e) => handleChange(e)}
                >
                  <option>Pemasukan</option>
                  <option>Pengeluaran</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end w-full p-3">
              <button className="py-2 px-10 border rounded bg-green-400 text-white font-bold">
                SIMPAN
              </button>
            </div>
          </form>
        </div>
      )}

      {editId != 0 && (
        <div>
          <div className="w-full p-3 rounded">
            <div className="font-bold text-lg">
              Edit {res_name}{" "}
              <button
                onClick={() => setEditId(0)}
                className="text-xs border p-1"
              >
                Buat Baru
              </button>
            </div>
          </div>
          <form key={state} onSubmit={handleUpdate}>
            <div className="rounded p-3 grid grid-cols-1 gap-3">
              <div>
                <div className="text-sm">Nominal</div>
                <input
                  required
                  onChange={(e) => handleUpdateChange(e)}
                  value={editData?.nominal || ""}
                  placeholder="Nominal"
                  name="nominal"
                  className="p-2 border rounded w-full"
                />
              </div>

              <div>
                <div className="text-sm">Keterangan</div>
                <textarea
                  required
                  onChange={(e) => handleUpdateChange(e)}
                  value={editData?.keterangan || ""}
                  placeholder="Keterangan"
                  rows={5}
                  name="keterangan"
                  className="p-2 border rounded w-full"
                />
              </div>
              <div>
                <div className="text-sm">Tipe</div>
                <select
                  name="tipe"
                  className="w-full p-2 border"
                  onChange={(e) => handleUpdateChange(e)}
                >
                  <option>Pemasukan</option>
                  <option>Pengeluaran</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end w-full p-3">
              <button className="py-2 px-10 border rounded bg-green-400 text-white font-bold">
                SIMPAN
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="flex flex-end items-center mb-2">
        <div className="w-full text-right text-xs">
          <span className="text-xs xs:text-sm text-gray-900">
            Halaman {pagination.current_page} dari {pagination.total_page}{" "}
            halaman ({pagination.total_records} {res_name})
          </span>
        </div>
        <div className="flex flex-end ml-2">
          <button
            onClick={() => changePage("prev")}
            className="border bg-white p-2 text-xs flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Prev
          </button>
          <button
            onClick={() => changePage("next")}
            className="border bg-white p-2 text-xs flex items-center"
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-5 text-center text-xs font-bold border-b py-3 items-center">
        <div>No</div>
        <div>Nominal</div>
        <div>Keterangan</div>
        <div>Tanggal</div>
        <div>Tipe</div>
        <div>Action</div>
      </div>
      {custRow()}
    </div>
  );
}

export default Bank;
