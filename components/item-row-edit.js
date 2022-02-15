import { React, useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'
import axios from 'axios';

function ItemRowEdit(props) {
    const [qty, setQty] = useState(0);
    const [harga, setHarga] = useState(0);
    const [berat, setBerat] = useState(0);
    const [nama, setNama] = useState(0);
    const [kadar, setKadar] = useState(0);
    const [total, setTotal] = useState(0);
    const [inputData, setInputData] = useState({});
    const [goldNameOption, setGoldNameOption] = useState([]);
    const [selectedGoldName, setSelectedGoldName] = useState(null);
    const [item, setItem] = useState(props.item);
    const [number, setNumber] = useState(props.number);

    useEffect(() => {
        getGoldName();
    }, []);


    useEffect(() => {
        if (item[number]) {
            setTimeout(function () {
                setInputData({ ...inputData, nama: item[number]["nama"], qty: item[number]["qty"], kadar: item[number]["harga"], berat: item[number]["berat"], kadar: item[number]["kadar"], harga: item[number]["harga"] });


            }, 1000 * parseInt(props.number));
        }
    }, [item[number]["qty"], item[number]["harga"], item[number]["berat"], item[number]["berat"]])





    useEffect(() => {
        props.onChangeValue({ [props.number]: { total: getTotal(), nama: inputData.nama, kadar: inputData.kadar, jenis: inputData.jenis, berat: inputData.berat, harga: inputData.harga, qty: inputData.qty, potongan: inputData.potongan, grsebelum: inputData.grsebelum, ongkos: inputData.ongkos } });
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

        if (name == "nama") {
            setSelectedGoldName(e);
        }

        if (name == "jenis") {
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

        console.log({ [name]: val });


        setInputData({ ...inputData, [name]: val, harga: harga != 0 ? harga : inputData.harga });
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

    function selectedType() {
        if (item[number]) {
            var arr = props.goldTypeOption.filter(o => o.label == item[number]["jenis"]);
            return [...arr, ...props.goldTypeOption];
        } else {
            return props.goldTypeOption;
        }

    }

    function selectedName() {
        if (!goldNameOption) {
            return [];
        }
        if (item[number]) {
            var arr = goldNameOption.filter(o => o.label == item[number]["nama"]);
            return [...arr, ...goldNameOption];
        } else {
            return goldNameOption;
        }

    }

    function selectedKadar() {
        if (!props.priceOption) {
            return [];
        }
        if (item[number]) {
            var arr = props.priceOption.filter(o => o.label == item[number]["kadar"]);
            return [...arr, ...props.priceOption];
        } else {
            return props.priceOption;
        }

    }

    return (
        <tr className='text-xs'>
            <td className="py-4 px-2 text-left whitespace-no-wrap border-b border-gray-200">
                {props.number}
            </td>
            <td className="text-left py-4 whitespace-no-wrap border-b border-gray-200">
                <input onChange={(e) => handleChange(e)} name='qty' min={1} type="number" className='rounded p-2 w-full h-10 mr-2' defaultValue={item[number] ? item[number]["qty"] : 0} placeholder='Qty' />
            </td>
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">
                <Select onChange={(e) => handleSelectChange({ ...e, name: "jenis" })} id="gold-type" instanceId="gold-type" defaultValue={selectedType()[0]} options={selectedType()} />
            </td>
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">
                {selectedName().length > 0 && <Select
                    id="gold-name" instanceId="gold-name"
                    defaultValue={selectedName()[0]}
                    onChange={(e) => handleSelectChange({ ...e, name: "nama" })}
                    options={selectedName()}
                />}
            </td>
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">
                <input onChange={(e) => handleChange(e)} type="number" name='berat' className='rounded p-2 w-16 h-10 mr-2' placeholder='Berat' defaultValue={item[number] ? item[number]["berat"] : 0} />
            </td>
            {(props.trxType == "beli" || props.trxType == "tukar tambah") && <td className="text-center py-4 whitespace-no-wrap border-b border-gray-200">
                <input onChange={(e) => handleChange(e)} name='grsebelum' min={1} type="number" className='rounded p-2 w-full h-10 mr-2' placeholder='Harga/gr Sblmnya' />
            </td>}
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">
                <Select onChange={(e) => handleSelectChange({ ...e, name: "kadar" })} id="price" instanceId="price" options={selectedKadar()} defaultValue={selectedKadar()[0]} />
            </td>
            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200">
                <p>{inputData.harga}</p>
            </td>


            <td className="py-4 px-2 whitespace-no-wrap border-b border-gray-200 text-right">{getTotal().toLocaleString("id-ID")}</td>

        </tr>
    )
}

export default ItemRowEdit
