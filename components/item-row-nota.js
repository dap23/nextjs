import { React, useState, useEffect } from 'react'

function NotaRow(props) {

    NotaRow.defaultProps = {
        qty: 0,
        harga: 0,
        total: 0
    }

    if (props.tipe == "jual" || props.lunas) {
        return (
            <div className='pl-8 w-full flex text-left font-bold text-sm'>
                <div className='w-20  py-1 text-center'>{props.data.qty}</div>
                <div className='w-96 ml-2 py-1 text-left pl-2'>{props.data.nama}</div>
                <div className='w-24 py-1 text-left pl-1'>{props.data.berat} gr / {props.data.kadar}</div>
                <div className='ml-3 w-32 py-1 text-left pl-4'>{parseInt(props.data.harga).toLocaleString("id-ID")}</div>
                <div className='w-44 py-1 pr-5 text-right'>{props.data.total.toLocaleString("id-ID")}</div>
            </div>
        )
    } else if (props.tipe == "beli") {
        return (<div className='w-full flex text-left text-xs py-2 border-b'>
            <div className='ml-2 w-2/12'>{props.data.qty}</div>
            <div className='ml-2 w-2/12'>{props.data.nama}</div>
            <div className='w-1/12'>{props.data.berat}</div>
            <div className='w-2/12'>{parseInt(props.data.grsebelum).toLocaleString("id-ID")}</div>
            <div className='w-1/12'>{props.data.kadar}</div>
            <div className='w-2/12'>{parseInt(props.data.harga).toLocaleString("id-ID")}</div>
            <div className='w-1/12 text-right mr-2'>{parseInt(props.data.total).toLocaleString("id-ID")}</div>
        </div>)
    } else if (props.tipe == "pesanan") {
        return (<div className='w-full flex justify-start text-left text-xs py-1'>
            <div className='text-center' style={{ width: "90px" }}>{props.data.qty}</div>
            <div className='pl-2' style={{ width: "290px" }}>{props.data.nama}</div>
            <div className='text-center' style={{ width: "80px" }}>{props.data.berat}/{props.data.kadar}</div>
            <div className='text-center' style={{ width: "100px" }}>{parseInt(props.data.harga).toLocaleString("id-ID")}</div>
            <div className='text-right' style={{ width: "120px" }}>{parseInt(props.data.total).toLocaleString("id-ID")}</div>
        </div>)
    } else if (props.tipe == "tukar tambah") {
        return (<div className='w-full flex text-left text-xs py-2 border-b'>
            <div className='ml-2 w-2/12'>{props.data.qty}</div>
            <div className='ml-2 w-2/12'>{props.data.nama}</div>
            <div className='w-1/12'>{props.data.berat}</div>

            <div className='w-2/12'>{parseInt(props.data.grsebelum).toLocaleString("id-ID")}</div>
            <div className='w-1/12'>{props.data.kadar}</div>
            <div className='w-2/12'>{parseInt(props.data.harga).toLocaleString("id-ID")}</div>
            <div className='w-1/12 text-right mr-2'>{parseInt(props.data.total).toLocaleString("id-ID")}</div>
        </div>)
    } else if (props.tipe == "tukar kurang") {
        return (
            <div className='w-full flex text-left text-xs py-2 border-b'>
                <div className='ml-2 w-2/12'>{props.data.qty}</div>
                <div className='ml-2 w-2/12'>{props.data.nama}</div>
                <div className='w-1/12'>{props.data.berat}</div>
                <div className='w-2/12'>---</div>
                <div className='w-1/12'>{props.data.kadar}</div>
                <div className='w-2/12'>{parseInt(props.data.harga).toLocaleString("id-ID")}</div>
                <div className='mr-2 w-1/12 text-right'>{props.data.total.toLocaleString("id-ID")}</div>
            </div>
        )
    }

    return null;


}

export default NotaRow
