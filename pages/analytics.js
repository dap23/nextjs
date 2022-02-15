import { useEffect, useState, React } from "react";
import nookies from "nookies";
import axios from "axios";
import { FaPencilAlt, FaTrashAlt, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Analytics() {
  var date = new Date();
  // add a day
  date.setDate(date.getDate() + 7);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(date);
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
    getRecords();
  }, []);

  async function getRecords() {
    var result = await axios.get(
      `/api/barang/get-date?start=${startDate}&end=${endDate}`
    );
    setCustomer(result.data.data);
  }

  const api_url = "/api/barang/";
  const res_name = "Analytics";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
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

  async function getRecords() {
    var result = await axios.get(
      `/api/barang/get-date?start=${startDate}&end=${endDate}`
    );
    setCustomer(result.data.data);
  }

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
      var res = await axios.post(`${api_url}create`, userData);
      toast.success(`${res_name} berhasil ditambahkan`);
      getCust();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      var res = await axios.post(`${api_url}create`, editData);
      toast.success(`${res_name} berhasil diedit`);
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
    let t = 0;
    customer.forEach((el) => {
      if (
        (el.tipe == "jual" ||
          el.tipe == "tukar tambah" ||
          el.tipe == "pesanan") &&
        el.total != "NaN"
      ) {
        t = t + parseInt(el.total);
      }
    });
    return t.toLocaleString("id-ID");
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
          className="grid grid-cols-5 gap-3 text-left text-xs border-b py-3"
        >
          <div>{index + 1}</div>
          <div>{el.name}</div>
          <div>{el.berat}</div>
          <div>{el.qty}</div>
          <div>{el.tipe.toUpperCase()}</div>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="flex items-end justify-start border-b pb-2">
        <div className="mr-2">
          <div className="text-xs font-bold mb-1">Tanggal Awal</div>
          <DatePicker
            className="border p-2"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="mr-2">
          <div className="text-xs font-bold mb-1">Tanggal Akhir</div>
          <DatePicker
            className="border p-2"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
        <div>
          <button
            onClick={() => getRecords()}
            className="py-2 px-5 bg-green-500 text-white"
          >
            Terapkan
          </button>
        </div>
      </div>
      <div>
        <div className="rounded p-3">
          <div className="w-full rounded my-3">
            <p className="font-bold text-lg">Summary {res_name}</p>
          </div>
          <div className="grid grid-cols-2 gap-5 mt-5">
            <div className="bg-sky-500 flex flex-col items-center rounded p-10 text-white">
              <div className="font-bold text-sm">Total</div>
              <div className="font-bold text-2xl">Rp {getGrandTotal()}</div>
            </div>
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

          <div className="grid grid-cols-5 gap-3 text-left font-bold text-xs border-b border-t py-3">
            <div>No</div>
            <div>Nama</div>
            <div>Berat</div>
            <div>Qty</div>
            <div>Tipe</div>
          </div>
          {custRow()}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
