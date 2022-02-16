import { useEffect, useState, React } from "react";
import axios from "axios";
import { FaPencilAlt, FaTrashAlt, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import Sidebar from "../components/sidebar";

function Petty() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [customer, setCustomer] = useState([]);
  const [pettyData, setPettyData] = useState({});
  const [state, setState] = useState(new Date());
  const [userData, setUserData] = useState({});
  const [editId, setEditId] = useState(0);
  const [editData, setEditData] = useState({});

  const api_url = "/api/petty/";
  const res_name = "Petty";

  useEffect(() => {
    getCust();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var res = await axios.post(`${api_url}create`, {
        ...userData,
      });
      toast.success(`${res_name} berhasil ditambahkan`);
      setState(new Date());
      getCust();
      setPettyData({});
    } catch (err) {
      console.log(err);
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
      setPettyData({});
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

  function getGrandTotal() {
    let kas = 2000000;
    customer.forEach((el) => {
      if (el.nominal != 0) {
        kas = kas - parseInt(el.nominal);
      }
    });
    return kas.toLocaleString("id-ID");
  }

  function custRow() {
    var custArr = customer;
    if (custArr.length == 0) {
      return;
    }
    return custArr.map((el, index) => {
      return (
        <div
          key={el.id}
          className="grid grid-cols-5 gap-3 text-center text-xs border-b py-3 items-center"
        >
          <div>{index + 1}</div>
          <div>Rp {parseInt(el.nominal).toLocaleString("id-ID")}</div>
          <div>{el.keterangan}</div>
          <div>{el.createdAt}</div>
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
          <div className="font-bold text-sm">Uang Kas</div>
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
            </div>
            <div className="flex justify-end w-full p-3">
              <button className="py-2 px-10 border rounded bg-green-400 text-white font-bold">
                SIMPAN
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-5 gap-5 text-center text-xs font-bold border-b py-3 items-center">
        <div>No</div>
        <div>Nominal</div>
        <div>Keterangan</div>
        <div>Tanggal</div>
        <div>Action</div>
      </div>
      {custRow()}
    </div>
  );
}

export default Petty;
