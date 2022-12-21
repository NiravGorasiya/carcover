import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from 'axios';


const CheckOutFrom = () => {
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
                company_name: "dsffs",
                city: "dsf",
                e_mail: "dfsa",
                phone: "dsfsda",
                last_name: "dfsdsfga",
                state: "sdfaf",
                city: "sdf",
                postal_code: "sdf",
                first_name: "dsf",
                country: "sdf"
            }],
            billing_address: [{
                company_name: "billingAddressCompanyName",
                last_name: "billingAddressLastName",
                first_name: "billingAddressFirstName",
                city: "billingAddressCityCode",
                country: "billingAddressCountrycode",
                e_mail: "billingAddressEmail",
                postal_code: "billingAddressPostalCode",
                state: "billingAddressStateCode",
                phone: "billingAddressPhone"
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

