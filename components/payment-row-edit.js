import { React, useState, useEffect } from 'react'
import Select from 'react-select'
import NumberFormat from 'react-number-format'

function PaymentRowEdit(props) {
    const { options, change, paymentEdit, number, gt } = props;
    const [inputData, setInputData] = useState({});
    const [payment, setPayment] = useState(paymentEdit[number] ? { value: paymentEdit[number]["payment"], label: paymentEdit[number]["payment"]["name"] } : {})
    const [nominal, setNominal] = useState(paymentEdit[number] ? paymentEdit[number]["nominal"] : null)
    const [kembali, setKembali] = useState(paymentEdit[number] ? paymentEdit[number]["kembali"] : null)
    const [name, setName] = useState(paymentEdit[number] ? paymentEdit[number]["payment"]["name"] : null)
    const [paymentLoad, setPaymentLoad] = useState(paymentEdit[number] ? { payment: paymentEdit[number]["payment"] } : {})

    useEffect(() => {
        if (inputData.nominal == null) {
            return;
        }
        props.onChangeValue({ [props.number]: inputData });
    }, [inputData, gt]);


    useEffect(() => {
        if (nominal == null) {
            return;
        }
        var obj = {};
        if (paymentLoad) {
            obj = { ...obj, ...paymentLoad };
        }
        obj = { ...obj, nominal: nominal, kembali: kembali };

        setTimeout(function () {
            setInputData(obj);

        }, 1000 * parseInt(props.number));


    }, [])

    function handleSelectChange(e) {

        const { name, value } = e;
        setInputData({ ...inputData, [name]: value });
    }

    function absoluteChange() {
        if (!isNaN(change) && change < 0) {
            return Math.abs(change);
        }

        return 0

    }

    const handleChange = (e) => {

        const { name, value } = e;
        setInputData({ ...inputData, [name]: value });
    }

    return (
        <div>
            <div className='grid grid-cols-3 gap-3 w-full mb-1'>
                {payment && <Select onChange={(e) => handleSelectChange({ ...e, name: "payment" })} id="payment-type" instanceId="payment-type" options={options} defaultValue={payment} />}
                <NumberFormat isNumericString={true} thousandSeparator={"."} decimalSeparator=',' prefix={'Rp'} onValueChange={(values) => handleChange({ name: "nominal", value: values.value })} name="nominal" className='border w-full h-10 p-2' placeholder='Nominal' defaultValue={nominal} />
                {inputData?.payment?.name.toLowerCase() == "cash" && kembali && <NumberFormat prefix={'Kembali: Rp'} thousandSeparator={"."} decimalSeparator=',' onValueChange={(values) => handleChange({ name: "kembali", value: values.value })} value={absoluteChange()} defaultValue={kembali} name="kembali" className='border w-full h-10 p-2' placeholder='Kembalian' />}
            </div>
        </div>

    )
}

export default PaymentRowEdit
