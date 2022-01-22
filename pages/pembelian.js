import { React, useState, useEffect } from 'react'
import { FaPlus, FaPhoneAlt, FaSyncAlt, FaPlusSquare, FaWindowClose } from "react-icons/fa"
import AsyncSelect from 'react-select/async';
import axios from 'axios'
import nookies from 'nookies'
import ItemRowBeli from '../components/item-row-beli'
import NotaRow from '../components/item-row-nota'
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PaymentRow from '../components/payment-row';
import NotaRowBeli from '../components/item-row-nota-beli';

function Penjualan() {

    const [count, setCount] = useState(1);
    const [payCount, setPayCount] = useState(1);
    const [cookies, setCookies] = useState({});
    const [total, setTotal] = useState({});
    const [grand, setGrand] = useState(0);
    const [customer, setCustomer] = useState({});
    const [userData, setUserData] = useState({});
    const [selectedCustomer, setSelectedCustomer] = useState({});
    const [showPreview, setShowPreview] = useState(false);
    const [option, setOption] = useState([]);
    const [goldNameOption, setGoldNameOption] = useState([]);
    const [goldTypeOption, setGoldTypeOption] = useState([]);
    const [paymentTypeOption, setPaymentTypeOption] = useState([]);
    const [priceOption, setPriceOption] = useState([]);
    const [transactionTypeOption, setTransactionTypeOption] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [nomorNota, setNomorNota] = useState("");
    const [payments, setPayments] = useState({});

    useEffect(() => {
        const cks = nookies.get(null);
        setCookies(cks);
        getGoldName(cks.jwt);
        getGoldType(cks.jwt);
        getPrice(cks.jwt);
        getTransactionType(cks.jwt);
        getPaymentType(cks.jwt);
        var nowDate = new Date();
        var date = nowDate.getFullYear() + '' + (nowDate.getMonth() + 1) + '' + nowDate.getDate();
        setNomorNota(date);
        //getCust(cks.jwt);
    }, [])

    async function getGoldName(c, search = "") {
        try {
            let arr = [];
            let size = 100;
            var res = await axios.get(`${process.env.API_URL}/api/gold-names?pagination[pageSize]=${size}&pagination[page]=1`,
                {
                    headers: {
                        Authorization: 'Bearer ' + c
                    }
                });
            res.data.data.forEach(el => {
                arr.push({ value: el, label: `${el.attributes.name}` });
            });
            setGoldNameOption(arr);
        } catch (error) {
            console.log(error);
        }
    }

    async function getPaymentType(c) {
        try {
            let arr = [];
            let size = 100;
            var res = await axios.get(`${process.env.API_URL}/api/payment-types?pagination[pageSize]=${size}&pagination[page]=1`,
                {
                    headers: {
                        Authorization: 'Bearer ' + c
                    }
                });
            res.data.data.forEach(el => {
                arr.push({ value: el, label: `${el.attributes.name}` });
            });
            setPaymentTypeOption(arr);
            console.log(arr);
        } catch (error) {
            console.log(error);
        }
    }

    async function getGoldType(c, search = "") {
        try {
            let arr = [];
            let size = 100;
            var res = await axios.get(`${process.env.API_URL}/api/gold-types?pagination[pageSize]=${size}&pagination[page]=1`,
                {
                    headers: {
                        Authorization: 'Bearer ' + c
                    }
                });
            res.data.data.forEach(el => {
                arr.push({ value: el, label: `${el.attributes.name}` });
            });
            setGoldTypeOption(arr);
        } catch (error) {
            console.log(error);
        }
    }

    async function getTransactionType(c, search = "") {
        try {
            let arr = [];
            let size = 100;
            var res = await axios.get(`${process.env.API_URL}/api/transaction-types?pagination[pageSize]=${size}&pagination[page]=1`,
                {
                    headers: {
                        Authorization: 'Bearer ' + c
                    }
                });
            res.data.data.forEach(el => {
                arr.push({ value: el, label: `${el.attributes.nama}` });
            });
            setTransactionTypeOption(arr);
        } catch (error) {
            console.log(error);
        }
    }

    async function getPrice(c, search = "") {
        try {
            let arr = [];
            let size = 100;
            var res = await axios.get(`${process.env.API_URL}/api/prices?pagination[pageSize]=${size}&pagination[page]=1`,
                {
                    headers: {
                        Authorization: 'Bearer ' + c
                    }
                });
            res.data.data.forEach(el => {
                arr.push({ value: el, label: `${el.attributes.Kadar}` });
            });
            setPriceOption(arr);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCustChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }


    function add() {
        setCount(count + 1);
    }

    function min() {
        if (count > 1) {
            var gt = 0;
            let obj = { ...total };
            delete obj[count];
            setTotal(obj);
            for (const key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    const el = obj[key];
                    gt = gt + el.total;
                }
            }
            setGrand(gt);
            setCount(count - 1);
        }
    }

    function addPay() {
        setPayCount(payCount + 1);
    }

    function minPay() {
        if (payCount > 1) {
            let obj = { ...payments };
            delete obj[payCount];
            setPayments(obj);
            setPayCount(payCount - 1);

        }
    }

    const getCust = async (c, search) => {
        let size = 100;
        let arr = [];
        try {
            var res = await axios.get(`${process.env.API_URL}/api/customers?pagination[pageSize]=${size}&pagination[page]=1&filters[$or][0][no_hp][$containsi]=${search}&filters[$or][1][nama][$containsi]=${search}`,
                {
                    headers: {
                        Authorization: 'Bearer ' + c
                    }
                });
            res.data.data.forEach(el => {
                arr.push({ value: el, label: `${el.attributes.nama}-${el.attributes.alamat}` });
            });
            setOption(arr);
            setCustomer(res.data);
            return;
        } catch (err) {
            console.log(err);
            return;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            var res = await axios.post(process.env.API_URL + '/api/customers', { data: userData },
                {
                    headers: {
                        Authorization: 'Bearer ' + cookies.jwt
                    }
                });
            toast.success("Customer berhasil ditambahkan", { position: toast.POSITION.TOP_CENTER });
            //getCust(cookies.jwt);
            setShowAdd(false);
        } catch (err) {
            console.log(err);
        }
    }

    function handleChangeValue(e) {

        var gt = 0;
        const newObj = Object.assign({}, total, e);
        setTotal(newObj);
        for (const key in newObj) {
            if (Object.hasOwnProperty.call(newObj, key)) {
                const el = newObj[key];
                gt = gt + el.total;
            }
        }
        setGrand(gt);
    }


    function rows() {
        var arr = [];
        for (let index = 0; index < count; index++) {
            arr.push(<ItemRowBeli key={index} number={index + 1} onChangeValue={handleChangeValue} goldNameOption={goldNameOption} goldTypeOption={goldTypeOption} transactionTypeOption={transactionTypeOption} priceOption={priceOption} />);
        }

        return arr;
    }

    function handlePaymentChangeValue(e) {
        const newObj = Object.assign({}, payments, e);
        setPayments(newObj);
        console.log(newObj);
    }

    function paymentRows() {
        var arr = [];
        for (let index = 0; index < payCount; index++) {
            arr.push(<PaymentRow key={index} number={index + 1} onChangeValue={handlePaymentChangeValue} options={paymentTypeOption} />);
        }

        return arr;
    }

    function notaRow() {
        var arr = [];
        for (const key in total) {
            if (Object.hasOwnProperty.call(total, key)) {
                const el = total[key];
                arr.push(<NotaRowBeli key={key} data={total[key]} />)
            }
        }

        return arr;
    }

    function terbilang(bilangan) {

        bilangan = String(bilangan);
        var angka = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
        var kata = new Array('', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan');
        var tingkat = new Array('', 'Ribu', 'Juta', 'Milyar', 'Triliun');

        var panjang_bilangan = bilangan.length;

        /* pengujian panjang bilangan */
        if (panjang_bilangan > 15) {
            kaLimat = "Diluar Batas";
            return kaLimat;
        }

        /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
        for (let i = 1; i <= panjang_bilangan; i++) {
            angka[i] = bilangan.substr(-(i), 1);
        }

        let i = 1;
        let j = 0;
        let kaLimat = "";


        /* mulai proses iterasi terhadap array angka */
        while (i <= panjang_bilangan) {

            let subkaLimat = "";
            let kata1 = "";
            let kata2 = "";
            let kata3 = "";

            /* untuk Ratusan */
            if (angka[i + 2] != "0") {
                if (angka[i + 2] == "1") {
                    kata1 = "Seratus";
                } else {
                    kata1 = kata[angka[i + 2]] + " Ratus";
                }
            }

            /* untuk Puluhan atau Belasan */
            if (angka[i + 1] != "0") {
                if (angka[i + 1] == "1") {
                    if (angka[i] == "0") {
                        kata2 = "Sepuluh";
                    } else if (angka[i] == "1") {
                        kata2 = "Sebelas";
                    } else {
                        kata2 = kata[angka[i]] + " Belas";
                    }
                } else {
                    kata2 = kata[angka[i + 1]] + " Puluh";
                }
            }

            /* untuk Satuan */
            if (angka[i] != "0") {
                if (angka[i + 1] != "1") {
                    kata3 = kata[angka[i]];
                }
            }

            /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
            if ((angka[i] != "0") || (angka[i + 1] != "0") || (angka[i + 2] != "0")) {
                subkaLimat = kata1 + " " + kata2 + " " + kata3 + " " + tingkat[j] + " ";
            }

            /* gabungkan variabe sub kaLimat (untuk Satu blok 3 angka) ke variabel kaLimat */
            kaLimat = subkaLimat + kaLimat;
            i = i + 3;
            j = j + 1;

        }

        /* mengganti Satu Ribu jadi Seribu jika diperlukan */
        if ((angka[5] == "0") && (angka[6] == "0")) {
            kaLimat = kaLimat.replace("Satu Ribu", "Seribu");
        }

        return kaLimat + "Rupiah";
    }

    function loadOptions(inputValue, callback) {
        if (!cookies.jwt) {
            callback(option);
            return;
        }
        setTimeout(async () => {
            await getCust(cookies.jwt, inputValue);
            callback(option);

        }, 500);
    }

    function handleInputChange(e) {
        setSelectedCustomer(e.value)

    }

    return (
        <div className='w-full'>
            <ToastContainer />
            <div className='input-order border p-3 bg-white'>
                <label className='flex items-center'>Pilih Customer <FaPlusSquare onClick={() => setShowAdd(true)} className='ml-2 cursor-pointer' /></label>
                <AsyncSelect
                    id="customer-select" instanceId="customer-select"
                    cacheOptions
                    loadOptions={loadOptions}
                    defaultOptions
                    onChange={(e) => handleInputChange(e)}
                />
                {showAdd && <div className='bg-slate-50 p-5 my-5'>
                    <div className='flex justify-end cursor-pointer'>
                        <FaWindowClose onClick={() => setShowAdd(false)} size={20} />
                    </div>
                    <div className='w-full p-3 rounded'>
                        <p className='font-bold text-lg'>Buat Customer Baru</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='rounded p-3 grid grid-cols-2 gap-3'>
                            <input onChange={(e) => handleCustChange(e)} required placeholder='Nama' name="nama" className='p-2 border rounded' />
                            <input onChange={(e) => handleCustChange(e)} required placeholder='No HP' name="no_hp" className='p-2 border rounded' />
                            <input onChange={(e) => handleCustChange(e)} placeholder='Alamat' name='alamat' className='p-2 border rounded' />
                            <input onChange={(e) => handleCustChange(e)} placeholder='Email' name='email' className='p-2 border rounded' />
                            <div></div>
                            <button className='p-2 border rounded bg-green-400 text-white font-bold'>SIMPAN</button>
                        </div>
                    </form>
                </div>}
                <div className='flex justify-between items-center mb-1 mt-5'>
                    <div className='text-sm '>Input Barang</div>
                    <div className='flex justify-end items-center'>
                        <button onClick={() => min()} className='bg-red-500 mr-1 text-white rounded h-5 w-5 flex items-center justify-center text-xs font-bold'>-</button>
                        <button onClick={() => add()} className='bg-green-500 text-white rounded h-5 w-5 flex items-center justify-center text-xs font-bold'>+</button>
                    </div>

                </div>
                <div className='border bg-white w-full mt-1'>
                    <table className='w-full bg-white'>
                        <thead>
                            <tr>
                                <th className="py-3 px-2 border-b border-gray-200 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">No</th>
                                <th className="py-3 px-2 border-b border-gray-200 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Tipe</th>
                                <th className="py-3 px-2 border-b border-gray-200 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                                <th className="py-3 px-2 border-b border-gray-200 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Jenis Emas</th>
                                <th className="py-3 px-2 border-b border-gray-200 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Nama Barang</th>
                                <th className="py-3 px-2 border-b border-gray-200 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Berat</th>
                                <th className="py-3 px-2 border-b border-gray-200 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Kadar</th>
                                <th className="py-3 px-2 border-b border-gray-200 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Harga Lalu</th>
                                <th className="py-3 px-2 border-b border-gray-200 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Harga Skrg</th>
                                <th className="py-3 px-2 border-b border-gray-200 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Potongan</th>
                                <th className="py-3 px-2 border-b border-gray-200 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows()}
                            <tr>
                                <td className='py-3 px-2 border-b border-gray-200 text-left text-xs leading-4 font-medium text-slate-900 uppercase tracking-wider' colSpan={2}>Grand Total</td>
                                <td className='py-3 px-2 border-b border-gray-200 text-right text-xs leading-4 font-medium text-slate-900 uppercase tracking-wider' colSpan={8}>{grand.toLocaleString("id-ID")}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='flex justify-between items-center text-sm mt-5 mb-1'>
                    <span>Pembayaran</span>
                    <div className='flex justify-end'>
                        <button onClick={() => minPay()} className='bg-red-500 mr-1 text-white rounded h-5 w-5 flex items-center justify-center font-bold text-xs'>-</button>
                        <button onClick={() => addPay()} className='bg-green-500 text-white rounded h-5 w-5 flex items-center justify-center font-bold text-xs'>+</button>
                    </div>
                </div>
                {paymentRows()}

            </div>

            <div className='text-lg font-bold mt-5 text-slate-600'>Preview Nota</div>

            <div className='bg-white border w-full mt-1 p-5 shadow-lg'>
                <div className='flex justify-between text-center mb-3'>
                    <div className='w-4/12 text-slate-600'>
                        <p className='text-xs font-bold'>Toko Mas</p>
                        <div className='text-3xl font-bold text-green-400'>AGUNG JAYA</div>
                        <p className='text-xs bg-green-400 text-white uppercase font-bold'>jual beli & pemesanan</p>
                        <div className='text-xs flex items-center'>Jl Mahakan No.12 Jakarta Selatan <FaPhoneAlt size={10} className='mx-1' /> 0819928277</div>
                    </div>
                    <div className='text-left text-xs'>
                        <p>No: <span className='font-bold text-green-400'>{nomorNota}</span></p>
                        <p>Jumat, 14 Januari 2022</p>
                        <p>Pelanggan: {selectedCustomer.attributes != undefined ? selectedCustomer.attributes.nama : ""}</p>
                        <p> {selectedCustomer.attributes != undefined ? selectedCustomer.attributes.alamat : ""}</p>
                        <p> {selectedCustomer.attributes != undefined ? selectedCustomer.attributes.no_hp : ""}</p>
                    </div>
                </div>
                <div className='w-full border-t flex text-left text-xs font-bold py-2 border-b bg-green-400 text-white'>
                    <div className='ml-2 w-3/12'>Banyaknya</div>
                    <div className='ml-2 w-3/12'>Nama Barang</div>
                    <div className='w-2/12'>Berat</div>
                    <div className='w-2/12'>Kadar</div>
                    <div className='w-2/12'>Harga Lalu</div>
                    <div className='w-2/12'>Harga Skrg</div>
                    <div className='w-2/12'>Potongan</div>
                    <div className='w-2/12 text-right mr-2'>Total Harga</div>
                </div>
                <div className='w-full h-36 border-b'>
                    {notaRow()}
                </div>
                <div className='w-full flex text-left text-xs font-bold py-2'>
                    <div className='ml-2 w-4/12 font-bold'>Grand Total</div>
                    <div className='w-2/12'></div>
                    <div className='w-2/12'></div>
                    <div className='w-2/12'></div>
                    <div className='mr-2 w-2/12 font-bold text-right'>{grand.toLocaleString("id-ID")}</div>
                </div>
                <div className='w-full flex text-left text-xs font-bold py-2 bg-gray-100'>
                    <div className='ml-2 w-4/12 font-bold'>Terbilang</div>
                    <div className='mr-2 w-8/12 font-bold text-right'>{terbilang(grand)}</div>
                </div>
                <div className='flex justify-between'>
                    <div className='w-5/12 p-2 mt-3'>
                        <p className='font-bold text-xs uppercase'>Perhatian</p>
                        <ul className='text-xs'>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                        </ul>
                    </div>
                    <div className='w-3/12 p-2 mt-3 text-center flex flex-col justify-between'>
                        <p className='font-bold text-xs'>Hormat Kami</p>
                        <p className='font-bold text-xs'>Toko Mas Agung Jaya</p>

                    </div>
                </div>



            </div>

            <div className='w-full flex justify-end mt-2'>
                {!showPreview && <button onClick={() => setShowPreview(true)} className='rounded p-2 w-52 h-10 mt-2 bg-green-500 text-white'>Preview</button>}
                {showPreview && <button onClick={() => setShowPreview(false)} className='rounded p-2 w-52 h-10 mt-2 bg-slate-50'>Back</button>}
                {showPreview && <button onClick={() => setShowPreview(false)} className='rounded p-2 w-52 h-10 mt-2 bg-green-500 text-white ml-2'>Save & Print</button>}
            </div>

        </div>
    )
}

export default Penjualan
