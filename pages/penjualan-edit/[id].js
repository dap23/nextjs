import { React, useState, useEffect, useRef, useCallback } from 'react'
import { FaPhoneAlt, FaPlusSquare, FaWindowClose, FaExchangeAlt, FaExpandAlt, FaClipboardCheck, FaFileInvoiceDollar, FaCompressAlt } from "react-icons/fa"
import AsyncSelect from 'react-select/async'
import Select from 'react-select'
import axios from 'axios'
import nookies from 'nookies'
import ItemRow from '../../components/item-row'
import NotaRow from '../../components/item-row-nota'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PaymentRow from '../../components/payment-row'
import { useRouter } from 'next/router'
import Router from "next/router"
import Webcam from "react-webcam"
import { useBarcode } from '@createnextapp/react-barcode'
import CreatableSelect from 'react-select/creatable'
import PaymentRowEdit from '../../components/payment-row-edit'
import ItemRowEdit from '../../components/item-row-edit'
import NumberFormat from 'react-number-format'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

function PenjualanEdit() {

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
    const [ongkos, setOngkos] = useState(null);
    const [dp, setDp] = useState(null);
    const [tipeDp, setTipeDp] = useState("");
    const [sisaPelunasan, setSisaPelunasan] = useState(null);
    const [change, setChange] = useState(0);
    const [paymentEdit, setPaymentEdit] = useState(null);
    const [customerEdit, setCustomerEdit] = useState(null);
    const [itemEdit, setItemEdit] = useState(null);
    const [notaId, setNotaId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selesaiDate, setSelesaiDate] = useState("");


    const router = useRouter();

    useEffect(async () => {
        if (!router.isReady) return;
        const query = router.query;
        if (query.id != "undefined") {
            await getNotaData(query.id);
            setNotaId(query.id);
        }
    }, [router.isReady, router.query]);

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

    async function getNotaData(id) {
        let result = await axios.get(`/api/nota/get?id=${id}`)
        var data = result.data.data;
        var obj = JSON.parse(data.object);
        setOption([{ label: obj.customer.label, value: obj.customer.value }]);
        setSelectedCustomer({ label: obj.customer.label, value: obj.customer.value });
        await getCust();
        setPayCount(Object.keys(obj.payment).length);
        setCount(Object.keys(obj.item).length);
        setPaymentEdit(obj.payment);
        setItemEdit(obj.item);
        setCustomerEdit(obj.customer);
        setCatatan(data.catatan);
        setCapturedImage(data.foto);
        setTrxType(data.tipe);
        setOngkos(parseInt(data.ongkos));
        setTipeDp(data.tipe_dp);
        setGrand(parseInt(data.total));
        setSisaPelunasan(parseInt(data.sisa_pelunasan));
        setDp(parseInt(data.dp));
        setSelesaiDate(data.tanggal_selesai != "" ? new Date(data.tanggal_selesai) : "");
        setTimeout(
            () => setLoading(false),
            5000
        );
    }


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


    const getCust = async (search = "", second = false) => {
        let size = 5;
        let arr = [];
        try {
            var res = await axios.get(`/api/customer/get?size=${size}&search=${search}`);
            res.data.data.forEach(el => {
                arr.push({ value: el, label: `${el.nama} - ${el.alamat ? el.alamat : "No Address"}` });
            });
            setOption(arr);
            setCustomer(res.data);
            if (second) {
                setSelectedCustomer(arr[0]);
            }

            //console.log(res.data.data[0]);
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
            await getCust("", true);

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
        if (!itemEdit) {
            return;
        }
        var arr = [];
        for (let index = 0; index < count; index++) {
            arr.push(<ItemRowEdit item={itemEdit} trxType={trxType} key={index} number={index + 1} onChangeValue={handleChangeValue} goldNameOption={goldNameOption} goldTypeOption={goldTypeOption} transactionTypeOption={transactionTypeOption} priceOption={priceOption} />);
        }

        return arr;
    }

    async function saveNota() {
        var result = confirm("Simpan perubahan? Perubahan akan dicatat di log");
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
                id: notaId,
                customer: `${selectedCustomer.value.nama}-${selectedCustomer.value.no_hp}`,
                total: grand.toString(),
                nomor_nota: nomorNota,
                tipe: trxType,
                catatan: catatan,
                foto: capturedImage,
                dp: dp.toString(),
                tipe_dp: tipeDp,
                ongkos: ongkos.toString(),
                sisa_pelunasan: sisaPelunasan.toString(),
                tanggal_selesai: selesaiDate,
                nota_sebelum: selectedNota.id ?? "",
            });
            Router.push(`/print/${res.data.id}`);
            //getCust(cookies.jwt);
        } catch (err) {
            console.log(err);
        }
    }

    function handlePaymentChangeValue(e) {
        if (parseInt(e[Object.keys(e)[0]]["nominal"]) > 0) {
            var chg = 0;
            const newObj = Object.assign({}, payments, e);
            setPayments(newObj);
            for (const key in newObj) {
                if (Object.hasOwnProperty.call(newObj, key)) {
                    const el = newObj[key];
                    chg = chg + parseInt(el.nominal);
                }
            }
            if (trxType == "pesanan") {
                if (!isNaN(grand) && sisaPelunasan != null) {
                    chg = (grand + parseInt(ongkos)) - sisaPelunasan - chg;
                } else {
                    chg = 0;
                }
            } else {
                if (!isNaN(grand)) {
                    chg = grand - chg;
                } else {
                    chg = 0;
                }
            }

            setChange(chg);
        }

    }

    function paymentRows() {
        if (paymentEdit == null) {
            return;
        }
        if (paymentEdit) {
            var arr = [];
            for (let index = 0; index < payCount; index++) {
                arr.push(<PaymentRowEdit paymentEdit={paymentEdit} gt={grand} change={change} key={index} number={index + 1} onChangeValue={handlePaymentChangeValue} options={paymentTypeOption} />);
            }
            return arr;
        } else {
            return;
        }

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


    const getNota = async (search = "") => {
        let size = 5;
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

    function loadOptions(inputValue) {
        getCust(inputValue);
    }

    function loadNotaOptions(inputValue) {
        getNota(inputValue);
    }

    function changeGramDp(e) {
        setDp(e.target.value * total["1"]["harga"])
    }

    function handleInputChange(e) {
        setSelectedCustomer(e)
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
                        <div key={key} className='border grid grid-cols-6 gap-3 p-3 bg-white text-xs'>
                            <div>{el.qty}</div>
                            <div>{el.nama}</div>
                            <div>{el.jenis}</div>
                            <div>{el.berat}</div>
                            <div>{el.kadar}</div>
                            <div>{el.harga}</div>
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
        <div className='relative'>
            <div className={`absolute left-0 right-0 top-0 w-fit mx-auto pt-40 flex flex-col justify-start items-center ${loading ? "visible" : "invisible"}`}>
                <img src='/img/Gear-0.5s-200px.svg' className='w-20' />
                <span>Mempersiapkan Edit Nota</span>
            </div>
            <div className={`w-full ${loading ? "invisible" : "visible"}`}>
                <div className='p-5 bg-orange-100 border-l-8 border-orange-300 rounded mb-2'>
                    <div>Mengedit Nota <span className='font-bold'>{nomorNota}</span></div>
                    <div className='text-xs'>Aktifitas perubahan akan disimpan</div>
                </div>
                <div className='input-order border p-3 bg-white'>
                    {trxType != "pelunasan" && <div>
                        <label className='flex items-center'>Pilih Customer <FaPlusSquare onClick={() => setShowAdd(true)} className='ml-2 cursor-pointer' /></label>
                        <CreatableSelect
                            id="customer-select" instanceId="customer-select"
                            options={option}
                            value={selectedCustomer}
                            defaultValue={selectedCustomer}
                            onInputChange={e => loadOptions(e)}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>}

                    {(trxType == "beli" || trxType == "pelunasan" || trxType == "tukar tambah" || trxType == "tukar kurang") && <div>
                        <label className='flex items-center mt-2'>Pilih/Scan Nota Sebelumnya</label>
                        <CreatableSelect
                            id="nota-select" instanceId="nota-select"
                            options={notaOption}
                            onInputChange={e => loadNotaOptions(e)}
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
                        <div className='grid grid-cols-6 gap-3 p-3 bg-gray-50 text-xs border'>
                            <div>Qty</div>
                            <div>Nama</div>
                            <div>Jenis</div>
                            <div>Berat</div>
                            <div>Kadar</div>
                            <div>Harga</div>
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
                    {trxType != "pelunasan" && <div className='border w-full bg-white mt-1'>
                        <table className='w-full bg-white'>
                            <thead>
                                <tr>
                                    <th className="py-3 px-2 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">No</th>
                                    <th className="py-3 px-2 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider w-20">Qty</th>
                                    <th className="py-3 px-2 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider w-28">Jenis Emas</th>
                                    <th className="py-3 px-2 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider w-48">Nama Barang</th>
                                    <th className="py-3 px-2 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Berat</th>
                                    {(trxType == "beli" || trxType == "tukar tambah") && <th className="py-3 px-2 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Harga Lama/gr</th>}
                                    <th className="py-3 px-2 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider w-28">Kadar</th>
                                    <th className="py-3 px-2 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Harga/gr</th>
                                    <th className="py-3 px-2 border-b border-gray-200 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Total</th>
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
                                {ongkos && <div className=''>
                                    <div className='font-bold text-xs mb-2'>Ongkos</div>
                                    <NumberFormat isNumericString={true} thousandSeparator={"."} decimalSeparator=',' prefix={'Rp'} defaultValue={ongkos} className='p-2 border w-full' placeholder='Ongkos' onValueChange={(values) => setOngkos(values.value != "" ? parseInt(values.value) : 1)} />
                                </div>}
                                {tipeDp && <div className=''>
                                    <div className='font-bold text-xs mb-2'>Tipe DP </div>
                                    <select defaultValue={tipeDp} onChange={(e) => setTipeDp(e.target.value)} className='w-full p-2 border'>
                                        <option>Gram</option>
                                        <option>Nominal</option>
                                    </select>
                                </div>}
                                {tipeDp == "Nominal" && dp && <div className=''>
                                    <div className='font-bold text-xs mb-2'>Nominal DP</div>
                                    <NumberFormat isNumericString={true} thousandSeparator={"."} decimalSeparator=',' prefix={'Rp'} defaultValue={dp} className='p-2 border w-full' placeholder='Down Payment' onValueChange={(values) => setDp(values.value)} />
                                </div>}
                                {tipeDp == "Gram" && <div className=''>
                                    <div className='font-bold text-xs mb-2'>Input Gram</div>
                                    <input type="number" className='p-2 border w-full' placeholder='DP Gram' defaultValue={null} onChange={(e) => changeGramDp(e)} />
                                </div>}
                                {tipeDp == "Gram" && <div className=''>
                                    <div className='font-bold text-xs mb-2'>Nominal DP</div>
                                    <div className='p-2 w-full border bg-gray-50'>{dp?.toLocaleString("id-ID")}</div>
                                </div>}
                                {tipeDp == "Gram" && <div className=''>
                                    <div className='font-bold text-xs mb-2'>Sisa Pelunasan</div>
                                    <NumberFormat isNumericString={true} thousandSeparator={"."} decimalSeparator=',' prefix={'Rp'} className='p-2 border w-full' placeholder='Sisa Pelunasan' value={grand + ongkos - dp} onValueChange={(values) => setSisaPelunasan(values.value)} disabled />
                                </div>}
                                {tipeDp == "Nominal" && <div className=''>
                                    <div className='font-bold text-xs mb-2'>Sisa Pelunasan</div>
                                    <NumberFormat isNumericString={true} thousandSeparator={"."} decimalSeparator=',' prefix={'Rp'} className='p-2 border w-full' placeholder='Sisa Pelunasan' value={grand + ongkos - dp} onValueChange={(values) => setSisaPelunasan(values.value)} disabled />
                                </div>}
                                <div>
                                    <div className='font-bold text-xs mb-2'>Tanggal Selesai</div>
                                    <DatePicker className='p-2 w-full border' selected={selesaiDate} onChange={(date) => setSelesaiDate(date)} />

                                </div>

                            </div>}
                            <div className='font-bold text-xs mb-2'>Catatan</div>
                            <input className='p-2 border w-full' placeholder='catatan' onChange={(e) => setCatatan(e.target.value)} defaultValue={catatan} />

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
                        <div>Pembayaran <span className='text-orange-600'>{change != "NaN" && change > 0 ? `(Kurang Rp ${change.toLocaleString("id-ID")})` : ""}</span></div>
                        <div className='flex justify-end'>
                            <button onClick={() => minPay()} className='bg-red-500 mr-1 text-white rounded h-5 w-5 flex items-center justify-center font-bold text-xs'>-</button>
                            <button onClick={() => addPay()} className='bg-green-500 text-white rounded h-5 w-5 flex items-center justify-center font-bold text-xs'>+</button>
                        </div>
                    </div>
                    {paymentRows()}

                </div>

                <div className='w-full flex justify-end mt-2'>
                    <button onClick={() => saveNota()} className='rounded p-2 w-52 h-10 mt-2 bg-green-500 text-white'>Simpan Perubahan</button>

                </div>

            </div>
        </div>
    )
}

export default PenjualanEdit
