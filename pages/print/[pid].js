import { useState, React, useEffect } from 'react'
import { useRouter } from 'next/router'
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
    const [dp, setDp] = useState("")
    const [dpType, setDpType] = useState("")
    const [lunas, setLunas] = useState(false)
    const [notaLunas, setNotaLunas] = useState("")

    useEffect(() => {
        const { pid } = router.query
        getNota(pid);
    }, [])

    const { inputRef } = useBarcode({
        value: nomorNota
    });

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
                    <div key={el.payment.id} className='text-left'>

                        <div className='grid grid-cols-3 gap-3 text-left py-1'>
                            <div>{el.payment.name}</div>
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
                arr.push(<NotaRow key={key} data={total[key]} tipe={tipe} />)
            }
        }

        return arr;
    }

    return <div className='px-20 py-10 print-area'>
        <button onClick={() => router.back()} className='rounded bg-slate-100 text-slate-800 text-sm py-1 px-3 no-print'>Back</button>
        <button onClick={() => window.print()} className='rounded bg-green-500 text-white text-sm py-1 px-3 no-print ml-1'>Print Nota</button>

        <div className='bg-white border w-full mt-1 p-5 shadow-lg paper relative'>
            <div className='flex justify-between text-center mb-3'>
                <div className='w-4/12 text-slate-600'>
                    <img src='../img/logo.png' className='w-36 mb-2 mx-auto' alt='logo' />
                    <p className='text-xs bg-amber-400 text-white uppercase font-bold'>jual beli & pemesanan</p>
                    <div className='text-xs flex items-center justify-center'>Jl Mahakan No.12 Jakarta Selatan <FaPhoneAlt size={8} className='mx-1' /> 0819928277</div>
                </div>
                <div className='text-left text-xs'>
                    <p>No: <span className='font-bold text-amber-600'>{nomorNota}</span></p>
                    <p>Jumat, 14 Januari 2022</p>
                    <p>Pelanggan: {obj.customer?.nama}</p>
                    <p>{obj.customer?.alamat}</p>
                    <p>{obj.customer?.no_hp}</p>
                </div>
                <div className='w-40 absolute top-0 right-60 barcode'>
                    <svg className='w-full' ref={inputRef} />
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
        <div className='bg-white shadow-lg mt-2 p-5 no-print'>
            <div className='border-b font-bold mb-3'>Pembayaran</div>
            <div className='grid grid-cols-3 gap-3 font-bold border-b py-1 bg-slate-50'>
                <div>Jenis</div>
                <div>Nominal</div>
                <div>Kembali</div>
            </div>
            {PaymentRows()}
        </div>
        <div className='bg-white shadow-lg mt-2 p-5 no-print'>
            <div className='border-b font-bold mb-3'>Catatan</div>
            <div>{catatan}</div>
        </div>
        <div className='bg-white shadow-lg mt-2 p-5 no-print'>
            <div className='border-b font-bold mb-3'>Foto</div>
            <div><img src={foto} className='w-52' /></div>
        </div>
    </div>;
}

export default PrintNota;
