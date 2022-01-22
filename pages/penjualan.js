import { React, useState, useEffect, useRef, useCallback } from 'react'
import { FaPhoneAlt, FaPlusSquare, FaWindowClose, FaExchangeAlt, FaExpandAlt, FaClipboardCheck, FaFileInvoiceDollar, FaCompressAlt } from "react-icons/fa"
import AsyncSelect from 'react-select/async'
import axios from 'axios'
import nookies from 'nookies'
import ItemRow from '../components/item-row'
import NotaRow from '../components/item-row-nota'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PaymentRow from '../components/payment-row'
import Router from 'next/router'
import Webcam from "react-webcam"
import { useBarcode } from '@createnextapp/react-barcode'

function Penjualan() {

    const [count, setCount] = useState(1);
    const [payCount, setPayCount] = useState(1);
    const [cookies, setCookies] = useState({});
    const [total, setTotal] = useState({});
    const [grand, setGrand] = useState(0);
    const [customer, setCustomer] = useState({});
    const [userData, setUserData] = useState({});
    const [selectedCustomer, setSelectedCustomer] = useState({});
    const [selectedNota, setSelectedNota] = useState({});
    const [showPreview, setShowPreview] = useState(false);
    const [option, setOption] = useState([]);
    const [notaOption, setNotaOption] = useState([]);
    const [goldNameOption, setGoldNameOption] = useState([]);
    const [goldTypeOption, setGoldTypeOption] = useState([]);
    const [paymentTypeOption, setPaymentTypeOption] = useState([]);
    const [priceOption, setPriceOption] = useState([]);
    const [transactionTypeOption, setTransactionTypeOption] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [nomorNota, setNomorNota] = useState("123");
    const [payments, setPayments] = useState({});
    const [trxType, setTrxType] = useState("jual");
    const [catatan, setCatatan] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [capturedImage, setCapturedImage] = useState("");
    const [showWebcam, setShowWebcam] = useState(false);
    const [fileSize, setFileSize] = useState(0);
    const [ongkos, setOngkos] = useState("");
    const [dp, setDp] = useState("");
    const [tipeDp, setTipeDp] = useState("");
    const [sisaPelunasan, setSisaPelunasan] = useState("");

    useEffect(() => {
        const cks = nookies.get(null);
        setCookies(cks);
        getGoldName();
        getGoldType();
        getPrice();
        getTransactionType();
        getPaymentType();
        noNota();
    }, [])

    const { inputRef } = useBarcode({
        value: nomorNota
    });

    async function noNota() {
        var c = await axios.get(`/api/nota/count`);

        var nowDate = new Date();
        var date = nowDate.getFullYear() + '' + (nowDate.getMonth() + 1) + '' + nowDate.getDate();
        setNomorNota(date + "-" + parseInt(c.data.count + 1));
    }

    async function getGoldName() {
        try {
            let arr = [];
            let size = 100;
            var res = await axios.get(`/api/gold-name/get?size=${size}`);
            res.data.data.forEach(el => {
                arr.push({ value: el, label: `${el.name}` });
            });
            setGoldNameOption(arr);
        } catch (error) {
            console.log(error);
        }
    }
    const webcamRef = useRef(null);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const WebcamCapture = () => {
        function capture() {
            const imageSrc = webcamRef.current.getScreenshot();
            setFileSize(0);
            setCapturedImage(imageSrc);
            setShowWebcam(false);
        }

        return (
            <>
                <Webcam
                    audio={false}
                    height={720}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={1280}
                    videoConstraints={videoConstraints}
                />
                <button className='py-2 w-full text-white bg-green-500' onClick={() => capture()}>Ambil Gambar</button>
            </>
        );
    };

    async function getPaymentType(c) {
        try {
            let arr = [];
            let size = 100;
            var res = await axios.get(`/api/payment-type/get?size=${size}`);
            res.data.data.forEach(el => {
                arr.push({ value: el, label: `${el.name}` });
            });
            setPaymentTypeOption(arr);
            console.log(arr);
        } catch (error) {
            console.log(error);
        }
    }

    async function getGoldType() {
        try {
            let arr = [];
            let size = 100;
            var res = await axios.get(`/api/gold-type/get?size=${size}`);
            res.data.data.forEach(el => {
                arr.push({ value: el, label: `${el.name}` });
            });
            setGoldTypeOption(arr);
        } catch (error) {
            console.log(error);
        }
    }

    async function getTransactionType() {
        try {
            let arr = [];
            let size = 100;
            var res = await axios.get(`/api/transaction-type/get?size=${size}`);
            res.data.data.forEach(el => {
                arr.push({ value: el, label: `${el.nama}` });
            });
            setTransactionTypeOption(arr);
        } catch (error) {
            console.log(error);
        }
    }

    async function getPrice() {
        try {
            let arr = [];
            let size = 100;
            var res = await axios.get(`/api/price/get?size=${size}`);
            res.data.data.forEach(el => {
                arr.push({ value: el, label: `${el.Kadar}` });
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

    const onFileChange = event => {

        setFileSize(event.target.files[0].size)
        // Update the state
        setSelectedFile(event.target.files[0]);
        getBase64(event.target.files[0], (result) => {
            setCapturedImage(result);
        });

    };

    const onFileUpload = () => {

        const formData = new FormData();

        formData.append(
            "myFile",
            selectedFile,
            selectedFile.name
        );

        console.log(selectedFile);

        // Request made to the backend api
        // Send formData object
        //axios.post("api/uploadfile", formData);
    };

    function getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }


    const getCust = async (search) => {
        let size = 100;
        let arr = [];
        try {
            var res = await axios.get(`/api/customer/get?size=${size}&search=${search}`);
            res.data.data.forEach(el => {
                arr.push({ value: el, label: `${el.nama} - ${el.alamat ? el.alamat : "No Address"}` });
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
            var res = await axios.post('/api/customer/create', userData);
            toast.success("Customer berhasil ditambahkan");
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
            arr.push(<ItemRow trxType={trxType} key={index} number={index + 1} onChangeValue={handleChangeValue} goldNameOption={goldNameOption} goldTypeOption={goldTypeOption} transactionTypeOption={transactionTypeOption} priceOption={priceOption} />);
        }

        return arr;
    }

    async function saveNota() {
        var result = confirm("Nota tidak dapat diedit setelah disimpan, pastikan semua data sudah benar");
        if (!result) {
            return;
        }
        try {
            var res = await axios.post('/api/nota/create', {
                object: JSON.stringify({
                    payment: payments,
                    item: total,
                    customer: selectedCustomer
                }),
                customer: `${selectedCustomer.nama}-${selectedCustomer.no_hp}`,
                total: grand.toString(),
                nomor_nota: nomorNota,
                tipe: trxType,
                catatan: catatan,
                foto: capturedImage,
                dp: dp,
                tipe_dp: tipeDp,
                ongkos: ongkos,
                sisa_pelunasan: sisaPelunasan,
                nota_sebelum: selectedNota.id ?? "",
            });
            Router.push(`/print/${res.data.id}`);
            //getCust(cookies.jwt);
        } catch (err) {
            console.log(err);
        }
    }

    function handlePaymentChangeValue(e) {
        const newObj = Object.assign({}, payments, e);
        console.log(newObj);
        setPayments(newObj);
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
                arr.push(<NotaRow key={key} data={total[key]} tipe={trxType} />)
            }
        }

        return arr;
    }

    function changeType(val) {
        setTrxType(val);
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

    const getNota = async (search) => {
        let size = 100;
        let arr = [];
        try {
            var res = await axios.get(`/api/nota/get?size=${size}&search=${search}`);
            res.data.data.forEach(el => {
                if (el.tipe != "pelunasan") {
                    arr.push({ value: el, label: `${el.nomor_nota} - ${el.customer} - ${el.tipe.toUpperCase()}` });
                }
            });
            setNotaOption(arr);
            return;
        } catch (err) {
            console.log(err);
            return;
        }
    }

    async function loadOptions(inputValue, callback) {
        await getCust(inputValue);
        callback(option);
    }

    async function loadNotaOptions(inputValue, callback) {
        await getNota(inputValue);
        callback(notaOption);
    }

    function handleInputChange(e) {
        setSelectedCustomer(e.value)
    }

    function handleNotaInputChange(e) {
        setSelectedNota(e.value)
    }

    function previousNotaItems() {
        if (!selectedNota.object) {
            return;
        }
        const object = JSON.parse(selectedNota.object).item;
        let arr = [];
        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                const el = object[key];
                if (trxType == "pelunasan") {
                    arr.push(
                        <div key={key} className='border grid grid-cols-7 gap-3 p-3 bg-white text-xs'>
                            <div>{el.qty}</div>
                            <div>{el.nama}</div>
                            <div>{el.jenis}</div>
                            <div>{el.berat}</div>
                            <div>{el.kadar}</div>
                            <div>{el.harga}</div>
                            <div>{el.ongkos}</div>
                        </div>
                    )
                } else {
                    arr.push(
                        <div key={key} className='border grid grid-cols-6 gap-3 p-3 bg-white text-xs'>
                            <div>{el.qty}</div>
                            <div>{el.nama}</div>
                            <div>{el.jenis}</div>
                            <div>{el.berat}</div>
                            <div>{el.kadar}</div>
                            <div>{el.harga}</div>
                        </div>
                    )
                }

            }
        }

        return arr;
    }

    return (
        <div className='w-full'>
            <div className='flex justify-start my-5 border p-5 shadow-lg'>
                <div className="w-28 mr-3">
                    <div onClick={() => changeType("jual")} className={`text-center rounded-md flex justify-center p-5 cursor-pointer ${trxType == "jual" ? "bg-green-500" : "bg-gray-300"} mb-2`}>
                        <FaExpandAlt className='text-white' size={20} />
                    </div>
                    <div className={`text-center font-semibold ${trxType == "jual" ? "text-green-500" : "text-slate-400"}`}>Penjualan</div>
                </div>
                <div className="w-28 mr-3">
                    <div>
                        <div onClick={() => changeType("beli")} className={`text-center rounded-md flex justify-center p-5 cursor-pointer ${trxType == "beli" ? "bg-green-500" : "bg-gray-300"} mb-2`}>
                            <FaCompressAlt className='text-white' size={20} />
                        </div>
                        <div className={`text-center font-semibold ${trxType == "beli" ? "text-green-500" : "text-slate-400"}`}>Pembelian</div>
                    </div>

                </div>
                <div className="w-28 mr-3">
                    <div>
                        <div onClick={() => changeType("pesanan")} className={`text-center rounded-md flex justify-center p-5 cursor-pointer ${trxType == "pesanan" ? "bg-green-500" : "bg-gray-300"} mb-2`}>
                            <FaClipboardCheck className='text-white' size={20} />
                        </div>
                        <div className={`text-center font-semibold ${trxType == "pesanan" ? "text-green-500" : "text-slate-400"}`}>Pesanan</div>
                    </div>
                </div>
                <div className="w-28 mr-3">
                    <div>
                        <div onClick={() => changeType("pelunasan")} className={`text-center rounded-md flex justify-center p-5 cursor-pointer ${trxType == "pelunasan" ? "bg-green-500" : "bg-gray-300"} mb-2`}>
                            <FaFileInvoiceDollar className='text-white' size={20} />
                        </div>
                        <div className={`text-center font-semibold ${trxType == "pelunasan" ? "text-green-500" : "text-slate-400"}`}>Pelunasan</div>
                    </div>

                </div>
                <div className="w-28 mr-3">
                    <div onClick={() => changeType("tukar tambah")} className={`text-center rounded-md flex justify-center p-5 cursor-pointer ${trxType == "tukar tambah" ? "bg-green-500" : "bg-gray-300"} mb-2`}>
                        <FaExchangeAlt className='text-white' size={20} />
                    </div>
                    <div className={`text-center font-semibold ${trxType == "tukar tambah" ? "text-green-500" : "text-slate-400"}`}>TT</div>
                </div>
                <div className="w-28 mr-3">
                    <div onClick={() => changeType("tukar kurang")} className={`text-center rounded-md flex justify-center p-5 cursor-pointer ${trxType == "tukar kurang" ? "bg-green-500" : "bg-gray-300"} mb-2`}>
                        <FaExchangeAlt className='text-white' size={20} />
                    </div>
                    <div className={`text-center font-semibold ${trxType == "tukar kurang" ? "text-green-500" : "text-slate-400"}`}>TK</div>
                </div>
            </div>
            <div className='input-order border p-3 bg-white'>
                {trxType != "pelunasan" && <div>
                    <label className='flex items-center'>Pilih Customer <FaPlusSquare onClick={() => setShowAdd(true)} className='ml-2 cursor-pointer' /></label>
                    <AsyncSelect
                        id="customer-select" instanceId="customer-select"
                        cacheOptions
                        loadOptions={loadOptions}
                        defaultOptions={false}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>}

                {(trxType == "beli" || trxType == "pelunasan" || trxType == "tukar tambah" || trxType == "tukar kurang") && <div>
                    <label className='flex items-center mt-2'>Pilih/Scan Nota Sebelumnya</label>
                    <AsyncSelect
                        id="nota-select" instanceId="nota-select"
                        cacheOptions
                        loadOptions={loadNotaOptions}
                        defaultOptions={false}
                        onChange={(e) => handleNotaInputChange(e)}
                    />
                </div>}
                {(trxType == "beli" || trxType == "tukar tambah" || trxType == "tukar kurang") && selectedNota.object && <div className='p-3 border-orange-500 border-2 mt-3 bg-sky-50'>
                    <div className='text-xs font-bold mb-1'>Nota Sebelumnya</div>
                    <div className='grid grid-cols-6 gap-3 p-3 bg-gray-50 text-xs border'>
                        <div>Qty</div>
                        <div>Nama</div>
                        <div>Jenis</div>
                        <div>Berat</div>
                        <div>Kadar</div>
                        <div>Harga</div>
                    </div>
                    {previousNotaItems()}
                </div>}

                {trxType == "pelunasan" && selectedNota.object && <div className='p-3 border-orange-500 border-2 mt-3 bg-sky-50'>
                    <div className='text-xs font-bold mb-1'>Nota Sebelumnya</div>
                    <div className='grid grid-cols-7 gap-3 p-3 bg-gray-50 text-xs border'>
                        <div>Qty</div>
                        <div>Nama</div>
                        <div>Jenis</div>
                        <div>Berat</div>
                        <div>Kadar</div>
                        <div>Harga</div>
                        <div>Ongkos</div>
                    </div>
                    {previousNotaItems()}
                    <div className='text-sm mt-2 w-full p-3 bg-white'>Sisa Pelunasan: <span className='font-bold'>Rp {parseInt(selectedNota.sisa_pelunasan).toLocaleString("id-ID")}</span></div>
                </div>}

                {showAdd && <div className='bg-yellow-50 border shadow-xl p-5 my-5'>
                    <div className='flex justify-end cursor-pointer'>
                        <FaWindowClose onClick={() => setShowAdd(false)} size={20} />
                    </div>
                    <div className='w-full p-3 rounded'>
                        <p className='font-bold text-lg'>Buat Customer Baru</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='rounded p-3 grid grid-cols-2 gap-3'>
                            <input onChange={(e) => handleCustChange(e)} required placeholder='Nama' name="nama" className='p-2 border border-slate-500 rounded' />
                            <input onChange={(e) => handleCustChange(e)} required placeholder='No HP' name="no_hp" className='p-2 border border-slate-500 rounded' />
                            <input onChange={(e) => handleCustChange(e)} placeholder='Alamat' name='alamat' className='p-2 border border-slate-500 rounded' />
                            <input onChange={(e) => handleCustChange(e)} placeholder='Email' name='email' className='p-2 border border-slate-500 rounded' />
                            <div></div>
                            <button className='p-2 border rounded bg-green-400 text-white font-bold'>SIMPAN</button>
                        </div>
                    </form>
                </div>}
                {trxType != "pelunasan" && <div className='flex justify-between items-center mb-1 mt-5'>
                    <div className='text-sm '>Input Barang</div>
                    <div className='flex justify-end items-center'>
                        <button onClick={() => min()} className='bg-red-500 mr-1 text-white rounded h-5 w-5 flex items-center justify-center text-xs font-bold'>-</button>
                        <button onClick={() => add()} className='bg-green-500 text-white rounded h-5 w-5 flex items-center justify-center text-xs font-bold'>+</button>
                    </div>

                </div>}
                {trxType != "pelunasan" && <div className='border bg-white w-full mt-1'>
                    <table className='w-full bg-white'>
                        <thead>
                            <tr>
                                <th className="py-3 px-2 border-b border-gray-200 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">No</th>
                                <th className="py-3 px-2 border-b border-gray-200 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                                <th className="py-3 px-2 border-b border-gray-200 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Jenis Emas</th>
                                <th className="py-3 px-2 border-b border-gray-200 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Nama Barang</th>
                                <th className="py-3 px-2 border-b border-gray-200 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Berat</th>
                                {(trxType == "beli" || trxType == "tukar tambah") && <th className="py-3 px-2 border-b border-gray-200 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Harga Lama/gr</th>}
                                <th className="py-3 px-2 border-b border-gray-200 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Kadar</th>
                                <th className="py-3 px-2 border-b border-gray-200 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Harga/gr</th>
                                {trxType == "beli" && <th className="py-3 px-2 border-b border-gray-200 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Potongan</th>}
                                {trxType == "pesanan" && <th className="py-3 px-2 border-b border-gray-200 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Ongkos</th>}
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
                    <div className='p-3 bg-gray-50 mt-3 m-2'>
                        {trxType == "pesanan" && <div className='grid grid-cols-3 gap-3 mb-3'>
                            <div className=''>
                                <div className='font-bold text-xs mb-2'>Tipe DP</div>
                                <select onChange={(e) => setTipeDp(e.target.value)} className='w-full p-2 border'>
                                    <option>Gram</option>
                                    <option>Nominal</option>
                                </select>
                            </div>
                            <div className=''>
                                <div className='font-bold text-xs mb-2'>DP</div>
                                <input type="number" className='p-2 border w-full' placeholder='Down Payment' onChange={(e) => setDp(e.target.value)} />
                            </div>
                            <div className=''>
                                <div className='font-bold text-xs mb-2'>Sisa Pelunasan</div>
                                <input type="number" className='p-2 border w-full' placeholder='Sisa Pelunasan' onChange={(e) => setSisaPelunasan(e.target.value)} />
                            </div>

                        </div>}
                        <div className='font-bold text-xs mb-2'>Catatan</div>
                        <input className='p-2 border w-full' placeholder='catatan' onChange={(e) => setCatatan(e.target.value)} />

                    </div>


                    <div className='p-3 bg-gray-50 mt-3 m-2'>
                        <div className='font-bold text-xs mb-2'>Ambil Gambar</div>
                        <div className='flex items-center justify-between'>
                            <input className='border py-2 px-6' type="file" onChange={(e) => onFileChange(e)} />
                            <button className='py-2 px-6 bg-green-500 text-white' onClick={() => setShowWebcam(!showWebcam)}>Webcam</button>

                        </div>

                        {showWebcam && WebcamCapture()}
                        {capturedImage &&
                            <div className='mt-3 flex flex-col justify-center items-center w-6/12 mx-auto bg-white p-3 border'>
                                <img src={capturedImage} className='w-60' />
                                {fileSize > 0 && <div className='text-xs'>{Math.ceil(fileSize / 1000)}KB <span className='text-orange-500'>{fileSize > 300000 && "(disarankan kurang dari 300KB)"}</span></div>}
                            </div>}
                    </div>

                </div>}
                <div className='flex justify-between items-center text-sm mt-5 mb-1'>
                    <span>Pembayaran</span>
                    <div className='flex justify-end'>
                        <button onClick={() => minPay()} className='bg-red-500 mr-1 text-white rounded h-5 w-5 flex items-center justify-center font-bold text-xs'>-</button>
                        <button onClick={() => addPay()} className='bg-green-500 text-white rounded h-5 w-5 flex items-center justify-center font-bold text-xs'>+</button>
                    </div>
                </div>
                {paymentRows()}

            </div>

            {trxType != "pelunasan" && <div>
                <div className='text-lg font-bold mt-5 text-slate-600'>Preview Nota</div>

                <div className='bg-white border w-full mt-1 p-5 shadow-lg relative'>
                    <div className='flex justify-between text-center mb-3'>
                        <div className='w-4/12 text-slate-600'>
                            <img src='img/logo.png' className='w-36 mb-2 mx-auto' alt='logo' />
                            <p className='text-xs bg-amber-400 text-white uppercase font-bold'>jual beli & pemesanan</p>
                            <div className='text-xs flex items-center justify-center'>Jl Mahakan No.12 Jakarta Selatan <FaPhoneAlt size={8} className='mx-1' /> 0819928277</div>
                        </div>
                        <div className='text-left text-xs'>
                            <p>No: <span className='font-bold text-amber-600'>{nomorNota}</span></p>
                            <p>Jumat, 14 Januari 2022</p>
                            <p>Pelanggan: {selectedCustomer.nama != undefined ? selectedCustomer.nama : ""}</p>
                            <p> {selectedCustomer.nama != undefined ? selectedCustomer.alamat : ""}</p>
                            <p> {selectedCustomer.nama != undefined ? selectedCustomer.no_hp : ""}</p>

                        </div>
                        <div className='w-40 absolute top-0 right-52'>
                            <svg className='w-full' ref={inputRef} />
                        </div>
                    </div>

                    {trxType == "jual" && <div className='w-full border-t flex text-left text-xs font-bold py-2 border-b bg-amber-400 text-white'>
                        <div className='ml-2 w-2/12'>Banyaknya</div>
                        <div className='ml-2 w-4/12'>Nama Barang</div>
                        <div className='w-2/12'>Berat</div>
                        <div className='w-2/12'>Kadar</div>
                        <div className='w-2/12'>Harga Per Gram</div>
                        <div className='w-2/12 text-right mr-2'>Total Harga</div>
                    </div>}
                    {trxType == "tukar kurang" && <div className='w-full border-t flex text-left text-xs font-bold py-2 border-b bg-amber-400 text-white'>
                        <div className='ml-2 w-2/12'>Banyaknya</div>
                        <div className='ml-2 w-4/12'>Nama Barang</div>
                        <div className='w-2/12'>Berat</div>
                        <div className='w-2/12'>Kadar</div>
                        <div className='w-2/12'>Harga Per Gram</div>
                        <div className='w-2/12 text-right mr-2'>Total Harga</div>
                    </div>}
                    {trxType == "beli" && <div className='w-full border-t flex text-left text-xs font-bold py-2 border-b bg-amber-400 text-white'>
                        <div className='ml-2 w-2/12'>Banyaknya</div>
                        <div className='ml-2 w-2/12'>Nama Barang</div>
                        <div className='w-1/12'>Berat</div>
                        <div className='w-2/12'>Harga Lama</div>
                        <div className='w-1/12'>Kadar</div>
                        <div className='w-2/12'>Harga Per Gram</div>
                        <div className='w-1/12'>potongan</div>
                        <div className='w-1/12 text-right mr-2'>Total Harga</div>
                    </div>}
                    {trxType == "tukar tambah" && <div className='w-full border-t flex text-left text-xs font-bold py-2 border-b bg-amber-400 text-white'>
                        <div className='ml-2 w-2/12'>Banyaknya</div>
                        <div className='ml-2 w-2/12'>Nama Barang</div>
                        <div className='w-1/12'>Berat</div>
                        <div className='w-2/12'>Harga Lama</div>
                        <div className='w-1/12'>Kadar</div>
                        <div className='w-2/12'>Harga Per Gram</div>
                        <div className='w-1/12 text-right mr-2'>Total Harga</div>
                    </div>}
                    {trxType == "pesanan" && <div className='w-full border-t flex text-left text-xs font-bold py-2 border-b bg-amber-400 text-white'>
                        <div className='ml-2 w-2/12'>Banyaknya</div>
                        <div className='ml-2 w-2/12'>Nama Barang</div>
                        <div className='w-1/12'>Berat</div>
                        <div className='w-2/12'>Harga Sblm</div>
                        <div className='w-1/12'>Kadar</div>
                        <div className='w-2/12'>Harga Per Gram</div>
                        <div className='w-1/12'>Ongkos</div>
                        <div className='w-1/12 text-right mr-2'>Total Harga</div>
                    </div>}
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
            </div>}

            <div className='w-full flex justify-end mt-2'>
                <button onClick={() => saveNota()} className='rounded p-2 w-52 h-10 mt-2 bg-green-500 text-white'>Save & Print</button>

            </div>

        </div>
    )
}

export default Penjualan
