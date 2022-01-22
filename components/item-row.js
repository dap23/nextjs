import { React, useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'
import axios from 'axios';

function ItemRow(props) {
    const [qty, setQty] = useState(0);
    const [harga, setHarga] = useState(0);
    const [berat, setBerat] = useState(0);
    const [nama, setNama] = useState(0);
    const [kadar, setKadar] = useState(0);
    const [total, setTotal] = useState(0);
    const [inputData, setInputData] = useState({});
    const [goldNameOption, setGoldNameOption] = useState([]);
    const [selectedGoldName, setSelectedGoldName] = useState(null);

    useEffect(() => {
        getGoldName();
    }, []);


    useEffect(() => {
        props.onChangeValue({ [props.number]: { total: getTotal(), nama: inputData.nama, kadar: inputData.kadar, jenis: inputData.jenis, berat: inputData.berat, harga: inputData.harga, qty: inputData.qty, potongan: inputData.potongan, grsebelum: inputData.grsebelum, ongkos: inputData.ongkos } });
    }, [inputData.qty, inputData.harga, inputData.berat, inputData.nama, inputData.kadar, inputData.jenis, inputData.potongan, inputData.ongkos]);

    function getTotal() {
        if (!inputData) {
            return 0;
        }
        if (props.trxType == "jual") {
            return inputData.qty * inputData.harga * inputData.berat;
        } else if (props.trxType == "beli") {
            return (inputData.qty * inputData.harga * inputData.berat) + parseInt(inputData.potongan);
        } else if (props.trxType == "pesanan") {
            return (inputData.qty * inputData.harga * inputData.berat) + parseInt(inputData.ongkos);
        } else if (props.trxType == "pelunasan") {
            return (inputData.qty * inputData.harga * inputData.berat);
        } else if (props.trxType == "tukar tambah") {
            return (inputData.qty * inputData.harga * inputData.berat);
        } else if (props.trxType == "tukar kurang") {
            return (inputData.qty * inputData.harga * inputData.berat);
        }
    }

    function handleSelectChange(e) {
        const { name, value } = e;
        let val;
        let harga = 0;

        if (name == "nama") {
            setSelectedGoldName(e);
        }

        if (value?.name != undefined) {
            val = value.name;
        } else if (value?.nama != undefined) {
            val = value.nama;
        } else if (value?.Kadar != undefined) {
            val = value.Kadar;
            harga = value.Harga;
        }


        setInputData({ ...inputData, [name]: val, harga: harga != 0 ? harga : inputData.harga });
    }

    async function getGoldName(second = false) {
        try {
            let arr = [];
            let size = 100;
            var res = await axios.get(`/api/gold-name/get?size=${size}`);
            res.data.data.forEach(el => {
                arr.push({ value: el, label: `${el.name}` });
            });
            setGoldNameOption(arr);

            if (second) {
                setSelectedGoldName(arr[0]);
                setInputData({ ...inputData, nama: arr[0]["label"] });
            }

        } catch (error) {
            console.log(error);
        }
    }

    async function createBarang(e) {
        try {
            let result = await axios.post(`/api/gold-name/create`, {
                name: e,
                stock: "1"
            })
            await getGoldName(true);

        } catch (error) {
            console.log(error)
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    }

    return (
        <tr className='text-xs'>
            <td className="py-4 px-2 text-center whitespace-no-wrap border-b border-gray-200">
                {props.number}
            </td>
            <td className="text-center py-4 whitespace-no-wrap border-b border-gray-200">
                <input onChange={(e) => handleChange(e)} name='qty' min={1} type="number" className='rounded p-2 w-full h-10 mr-2' placeholder='Qty' />
            </td>
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">
                <Select onChange={(e) => handleSelectChange({ ...e, name: "jenis" })} id="gold-type" instanceId="gold-type" options={props.goldTypeOption} />
            </td>
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">
                <CreatableSelect
                    id="gold-name" instanceId="gold-name"
                    isClearable

                    value={selectedGoldName}
                    onChange={(e) => handleSelectChange({ ...e, name: "nama" })}
                    onCreateOption={createBarang}
                    options={goldNameOption}
                />
            </td>
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">
                <input onChange={(e) => handleChange(e)} type="number" name='berat' className='rounded p-2 w-16 h-10 mr-2' placeholder='Berat' />
            </td>
            {(props.trxType == "beli" || props.trxType == "tukar tambah") && <td className="text-center py-4 whitespace-no-wrap border-b border-gray-200">
                <input onChange={(e) => handleChange(e)} name='grsebelum' min={1} type="number" className='rounded p-2 w-full h-10 mr-2' placeholder='Harga/gr Sblmnya' />
            </td>}
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">
                <Select onChange={(e) => handleSelectChange({ ...e, name: "kadar" })} id="price" instanceId="price" options={props.priceOption} />
            </td>
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">
                <p>{inputData.harga}</p>
            </td>
            {props.trxType == "beli" && <td className="text-center py-4 whitespace-no-wrap border-b border-gray-200">
                <input onChange={(e) => handleChange(e)} name='potongan' type="number" className='rounded p-2 w-full h-10 mr-2' placeholder='Potongan' />
            </td>}
            {props.trxType == "pesanan" && <td className="text-center py-4 whitespace-no-wrap border-b border-gray-200">
                <input onChange={(e) => handleChange(e)} name='ongkos' type="number" className='rounded p-2 w-full h-10 mr-2' placeholder='Ongkos' />
            </td>}
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">{getTotal().toLocaleString("id-ID")}</td>

        </tr>
    )
}

export default ItemRow
