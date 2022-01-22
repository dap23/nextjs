import { React, useState, useEffect } from 'react'

function NotaRow(props) {

    NotaRow.defaultProps = {
        qty: 0,
        harga: 0,
        total: 0
    }

    if (props.tipe == "jual") {
        return (
            <div className='w-full flex text-left text-xs py-2 border-b'>
                <div className='ml-2 w-2/12'>{props.data.qty}</div>
                <div className='ml-2 w-4/12'>{props.data.nama}</div>
                <div className='w-2/12'>{props.data.berat}</div>
                <div className='w-2/12'>{props.data.kadar}</div>
                <div className='w-2/12'>{parseInt(props.data.harga).toLocaleString("id-ID")}</div>
                <div className='mr-2 w-2/12 text-right'>{props.data.total.toLocaleString("id-ID")}</div>
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
            <div className='w-1/12'>{parseInt(props.data.potongan).toLocaleString("id-ID")}</div>
            <div className='w-1/12 text-right mr-2'>{parseInt(props.data.total).toLocaleString("id-ID")}</div>
        </div>)
    } else if (props.tipe == "pesanan") {
        return (<div className='w-full flex text-left text-xs py-2 border-b'>
            <div className='ml-2 w-2/12'>{props.data.qty}</div>
            <div className='ml-2 w-4/12'>{props.data.nama}</div>
            <div className='w-1/12'>{props.data.berat}</div>
            <div className='w-1/12'>{props.data.kadar}</div>
            <div className='w-2/12'>{parseInt(props.data.harga).toLocaleString("id-ID")}</div>
            <div className='w-1/12'>{parseInt(props.data.ongkos).toLocaleString("id-ID")}</div>
            <div className='w-1/12 text-right mr-2'>{parseInt(props.data.total).toLocaleString("id-ID")}</div>
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
                <div className='ml-2 w-4/12'>{props.data.nama}</div>
                <div className='w-2/12'>{props.data.berat}</div>
                <div className='w-2/12'>{props.data.kadar}</div>
                <div className='w-2/12'>{parseInt(props.data.harga).toLocaleString("id-ID")}</div>
                <div className='mr-2 w-2/12 text-right'>{props.data.total.toLocaleString("id-ID")}</div>
            </div>
        )
    }

    return null;


}

export default NotaRow
