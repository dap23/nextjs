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
    const [selectedJenis, setSelectedJenis] = useState(null);

    useEffect(() => {
        getGoldName();
    }, []);

    useEffect(() => {
        reload();
    }, [props.state])

    async function reload() {
        if (props.toggle > 0) {
            await getGoldName(props.last);
            //setSelectedJenis({ ...selectedJenis });
            // handleSelectChange({ value: selectedGoldName, name: "nama", label: selectedGoldName?.value?.label });
        }

    }


    useEffect(() => {
        props.onChangeValue({ [props.number]: { total: getTotal(), nama: inputData.nama, kadar: inputData.kadar, jenis: inputData.jenis, berat: inputData.berat, harga: inputData.harga, qty: inputData.qty, potongan: inputData.potongan, id: inputData.id, grsebelum: inputData.grsebelum, ongkos: inputData.ongkos } });
    }, [inputData.qty, inputData.harga, inputData.berat, inputData.nama, inputData.kadar, inputData.jenis, inputData.potongan, inputData.ongkos]);

    function getTotal() {
        if (!inputData) {
            return 0;
        }
        return inputData.qty * inputData.harga * inputData.berat;
    }

    function handleSelectChange(e) {
        const { name, value } = e;
        let val;
        let harga = 0;
        let berat = inputData.berat ?? 0;
        let id = inputData.id ?? "";

        if (name == "nama") {
            if (parseInt(e.value.stock) < 1) {
                alert(`Stock "${e.value.name}" HABIS`);
                return;
            }
            berat = e.value.berat;
            id = e.value.id;
            setSelectedGoldName(e);
        }

        if (name == "jenis") {
            setSelectedJenis(e);
            getGoldName(false, value.id);
        }

        if (value?.name != undefined) {
            val = value.name;
        } else if (value?.nama != undefined) {
            val = value.nama;
        } else if (value?.Kadar != undefined) {
            val = value.Kadar;
            harga = value.Harga;
        }



        setInputData({ ...inputData, [name]: val, harga: harga != 0 ? harga : inputData.harga, berat: berat, id: id });
    }

    async function getGoldName(second = false, typeId = "") {
        try {
            let arr = [];
            let size = 100;
            let tid = typeId;
            var res = await axios.get(`/api/gold-name/get?size=${size}&typeId=${tid}`);
            res.data.data.forEach(el => {
                arr.push({ value: el, label: `${el.name}` });
            });
            setGoldNameOption(arr);

            if (second) {
                let selectedType = props.goldTypeOption.filter(i => {
                    return i.value.id == arr[0].value.type_id;
                })
                setSelectedGoldName(arr[0]);
                setSelectedJenis(selectedType[0]);
                setInputData({ ...inputData, nama: arr[0]["label"], berat: arr[0]["value"]["berat"] });
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
            <td className="py-4 px-2 text-left whitespace-no-wrap border-b border-gray-200">
                {props.number}
            </td>

            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">
                <Select value={selectedJenis} onChange={(e) => handleSelectChange({ ...e, name: "jenis" })} id="gold-type" instanceId="gold-type" options={props.goldTypeOption} />
            </td>
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">
                <CreatableSelect
                    id="gold-name" instanceId="gold-name"
                    value={selectedGoldName}
                    onChange={(e) => handleSelectChange({ ...e, name: "nama" })}
                    // onCreateOption={createBarang}
                    options={goldNameOption}
                />
            </td>
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">
                <input onChange={(e) => handleChange(e)} value={inputData?.berat || ""} type="number" step="0.1" name='berat' className='rounded p-2 w-16 h-10 mr-2' placeholder='Berat' disabled />
            </td>
            <td className="text-left py-4 whitespace-no-wrap border-b border-gray-200">
                <input onChange={(e) => handleChange(e)} name='qty' min={0} max={selectedGoldName?.value.stock} type="number" className='rounded p-2 w-full h-10 mr-2' placeholder='Qty' />
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
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200 text-right">{getTotal().toLocaleString("id-ID")}</td>

        </tr>
    )
}

export default ItemRow
