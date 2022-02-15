import { useState, React, useEffect } from 'react'
import { Router, useRouter } from 'next/router'
import NotaRow from '../../components/item-row-nota'
import { FaPhoneAlt, FaPlusSquare, FaWindowClose } from "react-icons/fa"
import axios from 'axios'
import PaymentRow from '../../components/payment-row'
import { useBarcode } from '@createnextapp/react-barcode'

function PrintNota() {
    const [total, setTotal] = useState({})
    const [gt, setGt] = useState("")
    const router = useRouter()
    const [obj, setObj] = useState({})
    const [nomorNota, setNomorNota] = useState("123")
    const [catatan, setCatatan] = useState("")
    const [foto, setFoto] = useState("")
    const [tipe, setTipe] = useState("")
    const [sisa, setSisa] = useState("")
    const [tanggalSelesai, setTanggalSelesai] = useState("")
    const [dp, setDp] = useState("")
    const [dpType, setDpType] = useState("")
    const [lunas, setLunas] = useState(false)
    const [notaLunas, setNotaLunas] = useState("")
    const [notaId, setNotaId] = useState("")
    const [editedNota, setEditedNota] = useState(null)
    const [editedNotaAttribute, setEditedNotaAttribute] = useState(null)
    const [ongkos, setOngkos] = useState(null)

    useEffect(() => {
        const { pid } = router.query
        getNota(pid);
        getNotaEdited(pid);
        setNotaId(pid);
    }, [])

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const { inputRef } = useBarcode({
        value: nomorNota,
        options: {
            displayValue: tipe == "pesanan" ? true : false,
            height: "50",
            background: 'transparent',
        }
    });

    async function getNotaEdited(id) {
        try {
            let result = await axios.get(`/api/nota/get-edited?id=${id}`)
            setEditedNota(JSON.parse(result.data.object));
            var attr = result.data;
            delete attr.object;
            setEditedNotaAttribute(attr);
        } catch (error) {

        }
    }

    async function getNota(id) {
        try {
            let result = await axios.get(`/api/nota/get?id=${id}`)

            if (result.data.data.tipe == "pelunasan") {
                setLunas(true);
                let prevId = result.data.data.nota_sebelum;
                setNotaLunas(result.data.data.nomor_nota);
                getNota(prevId);
                return;
            }
            setGt(result.data.data.total)
            setObj(JSON.parse(result.data.data.object))
            setNomorNota(result.data.data.nomor_nota)
            setCatatan(result.data.data.catatan)
            setFoto(result.data.data.foto)
            setTipe(result.data.data.tipe)
            setSisa(result.data.data.sisa_pelunasan)
            setDp(result.data.data.dp)
            setDpType(result.data.data.tipe_dp)
            setOngkos(result.data.data.ongkos)
            setTanggalSelesai(result.data.data.tanggal_selesai)

        } catch (error) {

        }
    }

    function PaymentRows() {
        if (!obj.payment) {
            return;
        }

        var arr = [];
        var newObj = obj.payment;

        for (const key in newObj) {
            if (Object.hasOwnProperty.call(newObj, key)) {
                const el = newObj[key];
                arr.push(
                    <div key={el.payment?.id} className='text-left'>

                        <div className='grid grid-cols-3 gap-3 text-left py-1'>
                            <div>{el.payment?.name}</div>
                            <div>{el.nominal}</div>
                            <div>{el.kembali ?? ""}</div>
                        </div>
                    </div>
                );
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

    function notaRow() {
        var total = obj.item;
        var arr = [];
        for (const key in total) {
            if (Object.hasOwnProperty.call(total, key)) {
                const el = total[key];
                arr.push(<NotaRow key={key} lunas={lunas} data={total[key]} tipe={tipe} />)
            }
        }

        return arr;
    }

    function originalPaymentRow() {

        if (editedNota != null) {
            var payment = editedNota.payment;
            var arr = [];
            for (const key in payment) {
                if (Object.hasOwnProperty.call(payment, key)) {
                    const el = payment[key];
                    arr.push(
                        <div key={key} className='grid grid-cols-3 gap-3'>
                            <div>{el.payment.name}</div>
                            <div>{parseInt(el.nominal).toLocaleString("id-ID")}</div>
                            <div>{el.kembali}</div>
                        </div>)
                }
            }

            return arr;
        } else {
            return;
        }
    }

    function originalItemRow() {

        if (editedNotaAttribute != null) {
            var payment = editedNota.item;
            var arr = [];
            for (const key in payment) {
                if (Object.hasOwnProperty.call(payment, key)) {
                    const el = payment[key];
                    arr.push(
                        <div key={key} className='grid grid-cols-6 gap-3'>
                            <div>{el.qty}</div>
                            <div>{el.nama}</div>
                            <div>{el.berat}</div>
                            <div>{el.kadar}</div>
                            <div>{el.harga}</div>
                            <div>{el.total}</div>
                        </div>)
                }
            }

            return arr;
        } else {
            return;
        }
    }

    return <div className='px-20 py-10 print-area'>
        <div className='mx-auto w-fit px-10'>
            <button onClick={() => router.push(`/nota`)} className='rounded bg-slate-100 text-slate-800 text-sm py-2 px-5 no-print'>Back</button>
            <button onClick={() => router.push(`/penjualan-edit/${notaId}`)} className='rounded bg-yellow-500 text-white text-sm py-2 px-5 no-print ml-1'>Edit</button>
            <button onClick={() => window.print()} className='rounded bg-green-500 text-white text-sm py-2 px-5 no-print ml-1'>Print</button>
        </div>


        <div className='bg-white border w-full mt-1 p-5 shadow-lg paper relative hidden'>
            <div className='flex justify-between text-center mb-3'>
                <div className='w-4/12 text-slate-600'>
                    <img src='../img/logo.png' className='w-36 mb-2 mx-auto' alt='logo' />
                    <p className='text-xs bg-amber-400 text-white uppercase font-bold'>jual beli & pemesanan</p>
                    <div className='text-xs flex items-center justify-center'>Jl Mahakan No.12 Jakarta Selatan <FaPhoneAlt size={8} className='mx-1' /> 0819928277</div>
                </div>
                <div className='text-left text-xs'>
                    <p>No: <span className='font-bold text-amber-600'>{nomorNota}</span></p>
                    <p>Jumat, 14 Januari 2022</p>
                    <p>Pelanggan: {obj.customer?.value?.nama}</p>
                    <p>{obj.customer?.value?.alamat}</p>
                    <p>{obj.customer?.value?.no_hp}</p>
                </div>
                <div className='w-40 absolute top-0 right-60 barcode'>

                </div>
            </div>
            {tipe == "jual" && <div className='w-full border-t flex text-left text-xs font-bold py-2 border-b bg-amber-400 text-white'>
                <div className='ml-2 w-2/12'>Banyaknya</div>
                <div className='ml-2 w-4/12'>Nama Barang</div>
                <div className='w-2/12'>Berat</div>
                <div className='w-2/12'>Kadar</div>
                <div className='w-2/12'>Harga Per Gram</div>
                <div className='w-2/12 text-right mr-2'>Total Harga</div>
            </div>}
            {tipe == "tukar kurang" && <div className='w-full border-t flex text-left text-xs font-bold py-2 border-b bg-amber-400 text-white'>
                <div className='ml-2 w-2/12'>Banyaknya</div>
                <div className='ml-2 w-4/12'>Nama Barang</div>
                <div className='w-2/12'>Berat</div>
                <div className='w-2/12'>Kadar</div>
                <div className='w-2/12'>Harga Per Gram</div>
                <div className='w-2/12 text-right mr-2'>Total Harga</div>
            </div>}
            {tipe == "beli" && <div className='w-full border-t flex text-left text-xs font-bold py-2 border-b bg-amber-400 text-white'>
                <div className='ml-2 w-2/12'>Banyaknya</div>
                <div className='ml-2 w-2/12'>Nama Barang</div>
                <div className='w-1/12'>Berat</div>
                <div className='w-2/12'>Harga Sblm</div>
                <div className='w-1/12'>Kadar</div>
                <div className='w-2/12'>Harga Per Gram</div>
                <div className='w-1/12'>potongan</div>
                <div className='w-1/12 text-right mr-2'>Total Harga</div>
            </div>}
            {tipe == "tukar tambah" && <div className='w-full border-t flex text-left text-xs font-bold py-2 border-b bg-amber-400 text-white'>
                <div className='ml-2 w-2/12'>Banyaknya</div>
                <div className='ml-2 w-2/12'>Nama Barang</div>
                <div className='w-1/12'>Berat</div>
                <div className='w-2/12'>Harga Lama/gr</div>
                <div className='w-1/12'>Kadar</div>
                <div className='w-2/12'>Harga Per Gram</div>
                <div className='w-1/12 text-right mr-2'>Total Harga</div>
            </div>}
            {tipe == "pesanan" && <div className='w-full border-t flex text-left text-xs font-bold py-2 border-b bg-amber-400 text-white'>
                <div className='ml-2 w-2/12'>Banyaknya</div>
                <div className='ml-2 w-4/12'>Nama Barang</div>
                <div className='w-1/12'>Berat</div>
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
                <div className='mr-2 w-2/12 font-bold text-right'>{parseInt(gt).toLocaleString("id-ID")}</div>
            </div>
            <div className='w-full justify-between flex text-left text-xs font-bold py-2 bg-gray-100 px-3'>
                <div className='font-bold'>Terbilang</div>
                <div className='font-bold text-right'>{terbilang(parseInt(gt))}</div>
            </div>
            {tipe == "pesanan" && !lunas && <div className='w-fit flex justify-start text-left text-xs px-3 py-2 bg-green-100 mt-1'>
                <div className='mr-2'>DP ({dpType}):</div>
                <div className='font-bold text-left border-r-2 border-slate-400 pr-2 mr-2'>{parseInt(dp).toLocaleString("id-ID")}</div>
                <div className='mr-2'>Sisa Pelunasan:</div>
                <div className='font-bold text-left'>{parseInt(sisa).toLocaleString("id-ID")}</div>
            </div>}

            {tipe == "pesanan" && lunas && <div className='w-fit flex justify-start text-left text-xs px-3 font-bold py-2 bg-green-50 border-green-500 border-2 mt-1'>
                <span>NOTA PELUNASAN: {notaLunas}</span>
            </div>}

        </div>
        <div className='h-3 w-full no-print'></div>
        {(tipe == "jual" || lunas) && <div className='relative w-max shadow-md mx-auto'>
            <img style={{ width: "940px" }} src='/img/nota-background.jpg' />
            <div className='absolute left-40 top-0 font-semibold text-2xl'>{nomorNota}</div>
            <div className='text-xs absolute top-3 right-5 font-bold w-64'>
                <p>Cileduk - {new Date().toLocaleDateString('id-ID', dateOptions)}</p>
                <p>Nama Pelanggan: {obj.customer?.value?.nama}</p>
            </div>
            <svg className='absolute h-20 left-2 top-10' ref={inputRef} />
            <div className='absolute font-bold bottom-24 right-12 -mb-1'>{parseInt(gt).toLocaleString("id-ID")}</div>
            <div className='absolute left-0 top-56'>{notaRow()}</div>
        </div>}

        {(tipe == "beli" || tipe == "tukar tambah" || tipe == "tukar kurang") && <div className='w-11/12 mx-auto shadow-md p-3'>
            <div className='flex items-center justify-between'>
                <div className='font-semibold text-2xl'>{nomorNota}</div>
                <svg className='h-20' ref={inputRef} />
            </div>
            <div className='text-xs font-bold w-64'>
                <p>{new Date().toLocaleDateString('id-ID', dateOptions)}</p>
                <p>Nama Pelanggan: {obj.customer?.value?.nama}</p>
            </div>
            <div className='font-bold'>Total: {parseInt(gt).toLocaleString("id-ID")}</div>
            <hr />
            <div className='w-full flex text-left text-xs py-2 border-b'>
                <div className='ml-2 w-2/12'>Qty</div>
                <div className='ml-2 w-2/12'>Nama</div>
                <div className='w-1/12'>Berat</div>
                <div className='w-2/12'>Harga Lama</div>
                <div className='w-1/12'>Kadar</div>
                <div className='w-2/12'>Harga/gr</div>
                <div className='w-1/12 text-right mr-2'>Total</div>
            </div>
            <div className='w-full'>{notaRow()}</div>

        </div>}
        <svg className='hidden' ref={inputRef} />

        {tipe == "pesanan" && !lunas && <div className='relative w-max shadow-md mx-auto font-semibold'>
            <img style={{ width: "940px" }} src='/img/nota-pesanan.jpg' />
            <div className='text-xs absolute pt-1 top-12 right-20 w-64'>
                <p>{obj.customer?.value?.nama}</p>
            </div>
            <div className='absolute top-20 right-64 text-xs w-20'>{obj.customer?.value?.no_hp}</div>
            <div className='absolute text-xs right-20 top-14'>{new Date().toLocaleDateString('id-ID')}</div>
            <div className='absolute text-xs right-20 top-24'>{new Date(tanggalSelesai).toLocaleDateString('id-ID')}</div>
            <div className='absolute text-xs right-64 w-20 top-24 pt-2'>{new Date().toLocaleDateString('id-ID')}</div>
            <svg className='absolute h-20 left-52 top-16' ref={inputRef} />
            <div className='absolute right-12' style={{ bottom: "85px" }}>{(parseInt(gt) + parseInt(ongkos)).toLocaleString("id-ID")}</div>
            <div className='absolute right-12' style={{ bottom: "117px" }}>{parseInt(ongkos).toLocaleString("id-ID")}</div>
            <div className='absolute right-12' style={{ bottom: "55px" }}>{parseInt(dp).toLocaleString("id-ID")}</div>
            <div className='absolute right-12' style={{ bottom: "25px" }}>{parseInt(sisa).toLocaleString("id-ID")}</div>
            <div className='absolute top-48' style={{ width: "690px", left: "213px" }}>{notaRow()}</div>
        </div>}

        <div className='bg-white shadow-lg mt-2 p-5 no-print w-11/12 mx-auto'>
            <div className='border-b font-bold mb-3'>Pembayaran</div>
            <div className='grid grid-cols-3 gap-3 font-bold border-b py-1 bg-slate-50'>
                <div>Jenis</div>
                <div>Nominal</div>
                <div>Kembali</div>
            </div>
            {PaymentRows()}
        </div>
        <div className='bg-white shadow-lg mt-2 p-5 no-print w-11/12 mx-auto'>
            <div className='border-b font-bold mb-3'>Catatan</div>
            <div>{catatan}</div>
        </div>
        <div className='bg-white shadow-lg mt-2 p-5 no-print w-11/12 mx-auto'>
            <div className='border-b font-bold mb-3'>Foto</div>
            <div><img src={foto} className='w-52' /></div>
        </div>
        {editedNotaAttribute && <div className='border-l-8 border-yellow-500 border-2 rounded-md shadow-lg mt-2 p-5 no-print w-11/12 mx-auto text-sm'>
            <div className='border-b font-bold mb-3'>Nota Sebelumnya</div>
            <div className='text-sm text-right'>Diedit oleh:</div>

            <div className='border-b font-bold'>
                Total: {parseInt(editedNotaAttribute?.total).toLocaleString("id-ID")}
            </div>
            <div className='mt-5'>
                <div className='font-bold'>Item</div>
                <div className='grid grid-cols-6 gap-3 border-b border-t font-bold'>
                    <div>Qty</div>
                    <div>Nama</div>
                    <div>Berat</div>
                    <div>Kadar</div>
                    <div>Harga</div>
                    <div>Total</div>
                </div>
                {originalItemRow()}
            </div>
            <div className='mt-5'>
                <div className='font-bold'>Pembayaran</div>
                <div className='grid grid-cols-3 gap-3 border-b border-t font-bold'>
                    <div>Nama</div>
                    <div>Nominal</div>
                    <div>Kembali</div>
                </div>
                {originalPaymentRow()}
            </div>
        </div>}
    </div>;
}

export default PrintNota;
