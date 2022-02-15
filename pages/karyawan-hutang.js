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

  function custRow() {
    var custArr = customer;

    if (custArr.length == 0) {
      return;
    }

    return custArr.map((el, index) => {
      return (
        <div
          key={el.id}
          className="grid grid-cols-6 gap-3 text-left text-xs border-b py-3 items-center"
        >
          <div>{index + 1}</div>
          <div>{el.nama}</div>
          <div>{el.jenis_hutang}</div>
          <div>{parseInt(el.jumlah_hutang)}</div>
          <div>{parseInt(el.nominal_cicilan)}</div>
          <div>{parseInt(el.gaji) - parseInt(el.nominal_cicilan)}</div>
        </div>
      );
    });
  }

  return (
    <div>
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

        <div className="grid grid-cols-6 gap-3 text-left font-bold text-xs border-b border-t py-3">
          <div>No</div>
          <div>Nama</div>
          <div>Jenis Hutang</div>
          <div>Jumlah Hutang</div>
          <div>Nominal Cicilan</div>
          <div>Gaji</div>
        </div>
        {custRow()}
      </div>
    </div>
  );
}

export default Customer;
