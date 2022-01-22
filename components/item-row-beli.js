import { React, useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'

function ItemRowBeli(props) {
    const [qty, setQty] = useState(0);
    const [harga, setHarga] = useState(0);
    const [berat, setBerat] = useState(0);
    const [nama, setNama] = useState(0);
    const [kadar, setKadar] = useState(0);
    const [total, setTotal] = useState(0);
    const [inputData, setInputData] = useState({});

    useEffect(() => {
        props.onChangeValue({ [props.number]: { total: inputData.qty * inputData.harga * inputData.berat, nama: inputData.nama, kadar: inputData.kadar, berat: inputData.berat, harga: inputData.harga, qty: inputData.qty } });
    }, [inputData.qty, inputData.harga, inputData.berat, inputData.nama, inputData.kadar]);

    function handleSelectChange(e) {
        const { name, value } = e;
        let val;
        let harga = 0;
        if (value.attributes.name != undefined) {
            val = value.attributes.name;
        } else if (value.attributes.nama != undefined) {
            val = value.attributes.nama;
        } else if (value.attributes.Kadar != undefined) {
            val = value.attributes.Kadar;
            harga = value.attributes.Harga;
        }

        setInputData({ ...inputData, [name]: val, harga: harga != 0 ? harga : inputData.harga });
    }

    function handleCreate(e) {
        console.log("create", e);
        setInputData({ ...inputData, nama: e });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    }

    // function handleChange(e) {
    //     if (e.target.name == "qty") {
    //         setQty(e.target.value);
    //     }
    //     if (e.target.name == "harga") {
    //         setHarga(e.target.value);
    //     }
    //     if (e.target.name == "berat") {
    //         setBerat(e.target.value);
    //     }
    //     if (e.target.name == "nama") {
    //         setNama(e.target.value);
    //     }
    //     if (e.target.name == "kadar") {
    //         setKadar(e.target.value);
    //     }
    // }
    return (
        <tr className='text-xs'>
            <td className="py-4 px-2 text-center whitespace-no-wrap border-b border-gray-200">
                {props.number}
            </td>
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">
                <Select onChange={(e) => handleSelectChange({ ...e, name: "transaksi" })} id="transaction-type" instanceId="transaction-type" options={props.transactionTypeOption} />
            </td>
            <td className="text-center py-4 whitespace-no-wrap border-b border-gray-200">
                <input onChange={(e) => handleChange(e)} name='qty' min={1} type="number" className='rounded p-2 w-full h-10 mr-2' placeholder='Qty' />
            </td>
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">
                <Select onChange={(e) => handleSelectChange({ ...e, name: "jenis" })} id="gold-type" instanceId="gold-type" options={props.goldTypeOption} />
            </td>
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">
                <CreatableSelect
                    isClearable
                    //isDisabled={isLoading}
                    //isLoading={isLoading}
                    value={inputData.nama}
                    onChange={(e) => handleSelectChange({ ...e, name: "nama" })}
                    onCreateOption={handleCreate}
                    options={props.goldNameOption}
                />
            </td>
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">
                <input onChange={(e) => handleChange(e)} type="number" name='berat' className='rounded p-2 w-16 h-10 mr-2' placeholder='Berat' />
            </td>
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">
                <Select onChange={(e) => handleSelectChange({ ...e, name: "kadar" })} id="price" instanceId="price" options={props.priceOption} />
            </td>
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">
                <input onChange={(e) => handleChange(e)} type="number" name='hargaLalu' className='rounded p-2 w-16 h-10 mr-2' placeholder='Harga Lalu' />

            </td>
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">
                <input onChange={(e) => handleChange(e)} type="number" name='hargaSekarang' className='rounded p-2 w-16 h-10 mr-2' placeholder='Harga Skrg' />
            </td>
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">
                <input onChange={(e) => handleChange(e)} type="number" name='potongan' className='rounded p-2 w-16 h-10 mr-2' placeholder='Potongan' />
            </td>
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">{(inputData.qty * inputData.harga * inputData.berat).toLocaleString("id-ID")}</td>

        </tr>
    )
}

export default ItemRowBeli
