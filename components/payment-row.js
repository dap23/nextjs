import { React, useState, useEffect } from 'react'
import Select from 'react-select'
import NumberFormat from 'react-number-format'

function PaymentRow(props) {
    const { options, change, paymentEdit, number } = props;
    const [inputData, setInputData] = useState({});

    useEffect(() => {
        props.onChangeValue({ [props.number]: inputData });
    }, [inputData]);

    function handleSelectChange(e) {
        const { name, value } = e;
        setInputData({ ...inputData, [name]: value });
    }

    function absoluteChange() {
        if (change != "NaN" && change < 0) {
            return Math.abs(change);
        }

        return 0

    }

    const handleChange = (e) => {

        const { name, value } = e;
        setInputData({ ...inputData, [name]: value });
    }

    return (
        <div className='grid grid-cols-3 gap-3 w-full mb-1'>
            <Select onChange={(e) => handleSelectChange({ ...e, name: "payment" })} id="payment-type" instanceId="payment-type" options={options} />
            <NumberFormat isNumericString={true} thousandSeparator={"."} decimalSeparator=',' prefix={'Rp'} onValueChange={(values) => handleChange({ name: "nominal", value: values.value })} name="nominal" className='border w-full h-10 p-2' placeholder='Nominal' />
            {inputData?.payment?.name.toLowerCase() == "cash" && <NumberFormat prefix={'Kembali: Rp'} thousandSeparator={"."} decimalSeparator=',' onValueChange={(values) => handleChange({ name: "kembali", value: values.value })} value={absoluteChange()} name="kembali" className='border w-full h-10 p-2' placeholder='Kembalian' disabled />}
        </div>
    )
}

export default PaymentRow
