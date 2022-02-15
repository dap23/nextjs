import { useEffect, useState, React } from "react";
import nookies from "nookies";
import axios from "axios";
import { FaPencilAlt, FaTrashAlt, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Customer() {
  const [cookies, setCookies] = useState({});
  const [userData, setUserData] = useState({});
  const [customer, setCustomer] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editData, setEditData] = useState({});
  const [editId, setEditId] = useState(0);
  const [pagination, setPagination] = useState({});
  const [tanggalMasuk, setTanggalMasuk] = useState("");
  const [tanggalKeluar, setTanggalKeluar] = useState("");
  const [state, setState] = useState(new Date());

  useEffect(() => {
    const cks = nookies.get(null);
    setCookies(cks);
    getCust();
  }, []);

  const api_url = "/api/karyawan/";
  const res_name = "Karyawan";

  const handleChange = (e) => {
    const { name, value } = e.target;
    let obj = { ...userData };
    obj = { ...obj, [name]: value };

    //other
    if (name == "jenis_barang_hutang") {
      obj = { ...obj, nominal_uang_hutang: "", jenis_barang_other: "" };
    }

    setUserData(obj);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var res = await axios.post(`${api_url}create`, {
        ...userData,
        tanggal_masuk: tanggalMasuk,
        tanggal_keluar: tanggalKeluar,
      });
      toast.success(`${res_name} berhasil ditambahkan`);
      setState(new Date());
      getCust();
      setUserData({});
      setTanggalMasuk("");
      setTanggalKeluar("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      var res = await axios.post(`${api_url}create`, {
        ...editData,
        tanggal_masuk: tanggalMasuk,
        tanggal_keluar: tanggalKeluar,
      });
      toast.success(`${res_name} berhasil diedit`);
      getCust();
      setUserData({});
      setEditData({});
      setTanggalMasuk("");
      setTanggalKeluar("");
      setState(new Date());
    } catch (err) {
      console.log(err);
    }
  };

  async function editResource(id) {
    setEditId(id);
    try {
      var res = await axios.get(`${api_url}get?id=${id}`);
      setEditData(res.data.data);
      setTanggalMasuk(new Date(res.data.data.tanggal_masuk));
      setTanggalKeluar(
        res.data.data.tanggal_keluar != ""
          ? new Date(res.data.data.tanggal_keluar)
          : ""
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
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
        <div
          key={el.id}
          className="grid grid-cols-7 gap-3 text-left text-xs border-b py-3 items-center"
        >
          <div>{index + 1}</div>
          <div>{el.nama}</div>
          <div>{el.alamat}</div>
          <div>{el.bagian}</div>
          <div>{new Date(el.tanggal_masuk).toLocaleDateString()}</div>
          <div>
            {el.tanggal_keluar != ""
              ? new Date(el.tanggal_keluar).toLocaleDateString()
              : "-"}
          </div>
          <div className="flex justify-end w-full">
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
      <div>
        {editId == 0 && (
          <div>
            <div className="w-full p-3 rounded">
              <p className="font-bold text-lg">Buat {res_name} Baru</p>
            </div>
            <form key={state} onSubmit={handleSubmit}>
              <div className="w-full border border-green-500 border-l-4 bg-green-100 text-sm px-3 py-1 font-bold my-3">
                Data Umum
              </div>
              <div className="rounded p-3 grid grid-cols-3 gap-3">
                <div>
                  <div className="text-sm">Nama</div>
                  <input
                    onChange={(e) => handleChange(e)}
                    required
                    placeholder="Nama"
                    name="nama"
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <div className="text-sm">Alamat</div>
                  <input
                    onChange={(e) => handleChange(e)}
                    required
                    placeholder="Alamat"
                    name="alamat"
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <div className="text-sm">Bagian</div>
                  <input
                    onChange={(e) => handleChange(e)}
                    placeholder="Bagian"
                    name="bagian"
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <div className="text-sm">Password</div>
                  <input
                    onChange={(e) => handleChange(e)}
                    placeholder="Password"
                    name="password"
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <div className="text-sm">Tanggal Masuk</div>
                  <DatePicker
                    selected={tanggalMasuk}
                    placeholderText="Tanggal Masuk"
                    className="p-2 w-full border"
                    onChange={(date) => setTanggalMasuk(date)}
                  />
                </div>
                <div>
                  <div className="text-sm">Tanggal Keluar</div>
                  <DatePicker
                    selected={tanggalKeluar}
                    placeholderText="Tanggal Keluar"
                    className="p-2 w-full border"
                    onChange={(date) => setTanggalKeluar(date)}
                  />
                </div>
              </div>
              <div className="w-full border border-sky-500 border-l-4 bg-sky-100 text-sm px-3 py-1 font-bold my-3">
                Gaji
              </div>
              <div className="rounded p-3 grid grid-cols-3 gap-3">
                <div>
                  <div className="text-sm">Jumlah Gaji</div>
                  <input
                    onChange={(e) => handleChange(e)}
                    required
                    placeholder="Gaji"
                    name="gaji"
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <div className="text-sm">PPH</div>
                  <input
                    onChange={(e) => handleChange(e)}
                    required
                    placeholder="PPH"
                    name="pph"
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <div className="text-sm">Potongan</div>
                  <input
                    onChange={(e) => handleChange(e)}
                    placeholder="Potongan"
                    name="potongan_gaji"
                    className="p-2 border rounded w-full"
                  />
                </div>
              </div>
              <div className="w-full border border-orange-500 border-l-4 bg-orange-100 text-sm px-3 py-1 font-bold my-3">
                Hutang
              </div>
              <div className="rounded p-3 grid grid-cols-3 gap-3">
                <div>
                  <div className="text-sm">Jenis Hutang</div>
                  <input
                    onChange={(e) => handleChange(e)}
                    required
                    placeholder="Jenis Hutang"
                    name="jenis_hutang"
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <div className="text-sm">Jenis Barang Hutang</div>
                  <select
                    name="jenis_barang_hutang"
                    className="w-full p-2 border"
                    onChange={(e) => handleChange(e)}
                  >
                    <option>Emas</option>
                    <option>Motor</option>
                    <option>Mobil</option>
                    <option>Rumah</option>
                    <option>Modal Nikah</option>
                    <option>Nominal Uang</option>
                    <option>Other</option>
                  </select>
                </div>

                {userData?.jenis_barang_hutang == "Other" && (
                  <div>
                    <div className="text-sm">Other</div>
                    <input
                      value={userData?.jenis_barang_other || ""}
                      onChange={(e) => handleChange(e)}
                      required
                      placeholder="Masukan jenis barang"
                      name="jenis_barang_other"
                      className="p-2 border rounded w-full"
                    />
                  </div>
                )}
                {userData?.jenis_barang_hutang == "Nominal Uang" && (
                  <div>
                    <div className="text-sm">Nominal Hutang</div>
                    <input
                      value={userData?.nominal_uang_hutang || ""}
                      onChange={(e) => handleChange(e)}
                      required
                      placeholder="Masukan nominal hutang"
                      name="nominal_uang_hutang"
                      className="p-2 border rounded w-full"
                    />
                  </div>
                )}
                <div>
                  <div className="text-sm">Jumlah Hutang</div>
                  <input
                    onChange={(e) => handleChange(e)}
                    placeholder="Jumlah Hutang"
                    name="jumlah_hutang"
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <div className="text-sm">Nominal Cicilan</div>
                  <input
                    onChange={(e) => handleChange(e)}
                    placeholder="Nominal Cicilan"
                    name="nominal_cicilan"
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <div className="text-sm">Lama Cicilan</div>
                  <input
                    type="number"
                    onChange={(e) => handleChange(e)}
                    placeholder="Lama Cicilan"
                    name="lama_cicilan"
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <div className="text-sm">Sisa Hutang</div>
                  <input
                    onChange={(e) => handleChange(e)}
                    placeholder="Sisa Hutang"
                    name="sisa_hutang"
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
              <div className="w-full border border-green-500 border-l-4 bg-green-100 text-sm px-3 py-1 font-bold my-3">
                Data Umum
              </div>
              <div className="rounded p-3 grid grid-cols-3 gap-3">
                <div>
                  <div className="text-sm">Nama</div>
                  <input
                    value={editData?.nama || ""}
                    onChange={(e) => handleUpdateChange(e)}
                    required
                    placeholder="Nama"
                    name="nama"
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <div className="text-sm">Alamat</div>
                  <input
                    value={editData?.alamat || ""}
                    onChange={(e) => handleUpdateChange(e)}
                    required
                    placeholder="Alamat"
                    name="alamat"
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <div className="text-sm">Bagian</div>
                  <input
                    value={editData?.bagian || ""}
                    onChange={(e) => handleUpdateChange(e)}
                    placeholder="Bagian"
                    name="bagian"
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <div className="text-sm">Password</div>
                  <input
                    value={editData?.password || ""}
                    onChange={(e) => handleUpdateChange(e)}
                    placeholder="Password"
                    name="password"
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <div className="text-sm">Tanggal Masuk</div>
                  <DatePicker
                    selected={tanggalMasuk}
                    placeholderText="Tanggal Masuk"
                    className="p-2 w-full border"
                    onChange={(date) => setTanggalMasuk(date)}
                  />
                </div>
                <div>
                  <div className="text-sm">Tanggal Keluar</div>
                  <DatePicker
                    selected={tanggalKeluar}
                    placeholderText="Tanggal Keluar"
                    className="p-2 w-full border"
                    onChange={(date) => setTanggalKeluar(date)}
                  />
                </div>
              </div>
              <div className="w-full border border-sky-500 border-l-4 bg-sky-100 text-sm px-3 py-1 font-bold my-3">
                Gaji
              </div>
              <div className="rounded p-3 grid grid-cols-3 gap-3">
                <div>
                  <div className="text-sm">Jumlah Gaji</div>
                  <input
                    value={editData?.gaji || ""}
                    onChange={(e) => handleUpdateChange(e)}
                    required
                    placeholder="Gaji"
                    name="gaji"
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <div className="text-sm">PPH</div>
                  <input
                    value={editData?.pph || ""}
                    onChange={(e) => handleUpdateChange(e)}
                    required
                    placeholder="PPH"
                    name="pph"
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <div className="text-sm">Potongan</div>
                  <input
                    value={editData?.potongan_gaji || ""}
                    onChange={(e) => handleUpdateChange(e)}
                    placeholder="Potongan"
                    name="potongan_gaji"
                    className="p-2 border rounded w-full"
                  />
                </div>
              </div>
              <div className="w-full border border-orange-500 border-l-4 bg-orange-100 text-sm px-3 py-1 font-bold my-3">
                Hutang
              </div>
              <div className="rounded p-3 grid grid-cols-3 gap-3">
                <div>
                  <div className="text-sm">Jenis Hutang</div>
                  <input
                    value={editData?.jenis_hutang || ""}
                    onChange={(e) => handleUpdateChange(e)}
                    required
                    placeholder="Jenis Hutang"
                    name="jenis_hutang"
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <div className="text-sm">Jenis Barang Hutang</div>
                  <input
                    value={editData?.jenis_barang_hutang || ""}
                    onChange={(e) => handleUpdateChange(e)}
                    required
                    placeholder="Jenis Barang Hutang"
                    name="jenis_barang_hutang"
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <div className="text-sm">Jumlah Hutang</div>
                  <input
                    value={editData?.jumlah_hutang || ""}
                    onChange={(e) => handleUpdateChange(e)}
                    placeholder="Jumlah Hutang"
                    name="jumlah_hutang"
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <div className="text-sm">Nominal Cicilan</div>
                  <input
                    value={editData?.nominal_cicilan || ""}
                    onChange={(e) => handleUpdateChange(e)}
                    placeholder="Nominal Cicilan"
                    name="nominal_cicilan"
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <div className="text-sm">Lama Cicilan</div>
                  <input
                    type="number"
                    value={editData?.lama_cicilan || ""}
                    onChange={(e) => handleUpdateChange(e)}
                    placeholder="Lama Cicilan"
                    name="lama_cicilan"
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <div className="text-sm">Sisa Hutang</div>
                  <input
                    value={editData?.sisa_hutang || ""}
                    onChange={(e) => handleUpdateChange(e)}
                    placeholder="Sisa Hutang"
                    name="sisa_hutang"
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

        <hr />

        <div className="rounded p-3">
          <div className="w-full rounded my-3">
            <p className="font-bold text-lg">Daftar {res_name}</p>
          </div>
          <div className="mb-3 flex">
            <input
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Cari ${res_name}`}
              className="w-4/12 p-2 mr-2 border rounded"
            />
            <button
              onClick={() => getCust()}
              className="flex justify-center items-center p-2 border rounded bg-white text-slate-800 w-2/12"
            >
              <FaSearch className="mr-1" /> CARI
            </button>
          </div>
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

          <div className="grid grid-cols-7 gap-3 text-left font-bold text-xs border-b border-t py-3">
            <div>No</div>
            <div>Nama</div>
            <div>Alamat</div>
            <div>Bagian</div>
            <div>Tgl Masuk</div>
            <div>Tgl Keluar</div>
            <div className="text-right">Action</div>
          </div>
          {custRow()}
        </div>
      </div>
    </div>
  );
}

export default Customer;
