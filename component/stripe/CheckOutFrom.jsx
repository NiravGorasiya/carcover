import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from 'axios';


const CheckOutFrom = (props) => {
    const { cname, address, cityCode, countryCode, email, lname, phone, postCode, stateCode, fname, billingAddressCityCode, billingAddressCompanyName, billingAddressCountrycode, billingAddressEmail, billingAddressFirstName, billingAddressLastName, billingAddressPhone, billingAddressPostalCode, billingAddressStateCode, billingAddressone } = props?.props

    const stripe = useStripe();
    const elements = useElements();
    const [message, setMesage] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });
        const { id } = paymentMethod;

        const data = {
            payment_method: id,
            shipping_address: [{
                company_name: cname,
                e_mail: email,
                phone: phone,
                last_name: lname,
                state: stateCode,
                city: cityCode,
                postal_code: postCode,
                first_name: fname,
                country: countryCode
            }],
            billing_address: [{
                company_name: billingAddressCompanyName,
                last_name: billingAddressLastName,
                first_name: billingAddressFirstName,
                city: billingAddressCityCode,
                country: billingAddressCountrycode,
                e_mail: billingAddressEmail,
                postal_code: billingAddressPostalCode,
                state: billingAddressStateCode,
                phone: billingAddressPhone
            }],
            shipping: {
                name: 'Jenny Rosen',
                address: {
                    line1: '510 Townsend St',
                    postal_code: '98140',
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'US',
                },
            },
        }
        axios.post("http://localhost:5500/api/order", data, {
            withCredentials: true
        })
            .then((res) => {
                setMesage(res.data.messge)
            })
            .catch((err) => {
                console.log(err.repo, "der");
            })
    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
            <CardElement />
            {message ? (<h1 style={{ color: "green" }}>{message}</h1>) : (<h2></h2>)}
            <button className='btn btn-primary'>Pay</button>
        </form>
    )
}

export default CheckOutFrom

