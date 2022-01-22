import { React, useState, useEffect } from 'react'

function NotaRowPesan(props) {

    NotaRowPesan.defaultProps = {
        qty: 0,
        harga: 0,
        total: 0
    }

    return (
        <div className='w-full flex text-left text-xs py-2 border-b'>
            <div className='ml-2 w-3/12'>{props.data.qty}</div>
            <div className='ml-2 w-3/12'>{props.data.nama}</div>
            <div className='w-2/12'>{props.data.berat}</div>
            <div className='w-2/12'>{props.data.kadar}</div>
            <div className='w-2/12'>{parseInt(props.data.harga).toLocaleString("id-ID")}</div>
            <div className='w-2/12'>0</div>
            <div className='mr-2 w-2/12 text-right'>{props.data.total.toLocaleString("id-ID")}</div>
        </div>
    )
}

export default NotaRowPesan
