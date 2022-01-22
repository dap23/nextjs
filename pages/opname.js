import { useState, React, useEffect } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'

function Opname() {
    var date = new Date();
    // add a day
    date.setDate(date.getDate() + 7);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(date);
    const [record, setRecord] = useState([]);

    useEffect(() => {
        getRecords();
    }, [])

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    async function getRecords() {
        var result = await axios.get(`/api/nota/get-date?start=${startDate}&end=${endDate}`);
        setRecord(result.data.data);
    }

    function getTotal() {
        let t = 0;
        record.forEach(el => {
            if ((el.tipe == "jual" || el.tipe == "tukar tambah" || el.tipe == "pesanan") && el.total != "NaN") {
                t = t + parseInt(el.total);
            }
        });

        return t.toLocaleString("id-ID");
    }

    function getTotalKeluar() {
        let t = 0;
        record.forEach(el => {
            if ((el.tipe == "beli" || el.tipe == "tukar kurang") && el.total != "NaN") {
                t = t + parseInt(el.total);
            }
        });

        return t.toLocaleString("id-ID");
    }


    function opnameRow() {
        return record.map((item, index) => {
            return (
                <div key={item.id} className={`flex justify-between items-center p-2 ${index % 2 == 0 ? "bg-slate-50" : "bg-white"}`}>
                    <div className='w-1/12'>{index + 1}</div>
                    <div className='w-2/12'>{item.nomor_nota}</div>
                    <div className='w-2/12'>{item.tipe.toUpperCase()}</div>
                    <div className='w-2/12'>{new Date(item.createdAt).toLocaleDateString('id-ID', dateOptions)}</div>
                    <div className='w-5/12 text-right'>{item.total != "NaN" ? parseInt(item.total).toLocaleString("id-ID") : "-"}</div>
                </div>
            )
        })
    }

    return <div>
        <div className='flex items-end justify-start border-b pb-2'>
            <div className='mr-2'>
                <div className='text-xs font-bold mb-1'>Tanggal Awal</div>
                <DatePicker className='border p-2' selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div className='mr-2'>
                <div className='text-xs font-bold mb-1'>Tanggal Akhir</div>
                <DatePicker className='border p-2' selected={endDate} onChange={(date) => setEndDate(date)} />
            </div>
            <div>
                <button onClick={() => getRecords()} className='py-2 px-5 bg-green-500 text-white'>Terapkan</button>
            </div>

        </div>
        <div className='grid grid-cols-3 gap-5 mt-5 text-white'>
            <div className='bg-sky-500 flex flex-col items-center rounded p-10'>
                <div className='font-bold text-sm'>Uang Masuk</div>
                <div className='font-bold text-2xl'>Rp {getTotal()}</div>
            </div>
            <div className='bg-green-500 flex flex-col items-center rounded p-10'>
                <div className='font-bold text-sm'>Uang Keluar</div>
                <div className='font-bold text-2xl'>Rp {getTotalKeluar()}</div>
            </div>
            <div className='bg-red-500 flex flex-col items-center rounded p-10'>
                <div className='font-bold text-sm'>Total</div>
                <div className='font-bold text-2xl'>Rp 0</div>
            </div>
        </div>
        <div>
            <div className='flex justify-between items-center font-bold bg-slate-100 p-2 mt-5'>
                <div className='w-1/12'>No</div>
                <div className='w-2/12'>Nota</div>
                <div className='w-2/12'>Jenis</div>
                <div className='w-2/12'>Tanggal</div>
                <div className='w-5/12 text-right'>Total</div>
            </div>
            {opnameRow()}
        </div>


    </div>;
}

export default Opname;
