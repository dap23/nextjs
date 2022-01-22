import { React, useState, useEffect } from 'react'
import Select from 'react-select'

function PaymentRow(props) {
    const { options } = props;
    const [inputData, setInputData] = useState({});

    useEffect(() => {
        props.onChangeValue({ [props.number]: inputData });
    }, [inputData]);

    function handleSelectChange(e) {
        const { name, value } = e;
        setInputData({ ...inputData, [name]: value });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    }

    return (
        <div className='grid grid-cols-3 gap-3 w-full mb-1'>
            <Select onChange={(e) => handleSelectChange({ ...e, name: "payment" })} id="payment-type" instanceId="payment-type" options={options} />

            <input onChange={(e) => handleChange(e)} type="number" name="nominal" className='border w-full h-10 p-2' placeholder='Nominal' />
            {inputData?.payment?.name.toLowerCase() == "cash" && <input onChange={(e) => handleChange(e)} type="number" name="kembali" min={1} className='border w-full h-10 p-2' placeholder='Kembalian' />}

        </div>
    )
}

export default PaymentRow
