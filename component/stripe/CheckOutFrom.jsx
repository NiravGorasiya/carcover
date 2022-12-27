import React, { useMemo, useState } from "react"
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement
} from "@stripe/react-stripe-js";
import axios from "axios";
import styles from "./CheckOutForm.module.css"


const useOptions = () => {
    const options = useMemo(
        () => ({
            style: {
                base: {
                    color: "#424770",
                    letterSpacing: "0.025em"
                },
                invalid: {
                    color: "#9e2146"
                },

            }
        }),
    );

    return options;
};
const CheckOutFrom = (props) => {
    const { cname, address, cityCode, countryCode, email, lname, phone, postCode, stateCode, fname, billingAddressCityCode, billingAddressCompanyName, billingAddressCountrycode, billingAddressEmail, billingAddressFirstName, billingAddressLastName, billingAddressPhone, billingAddressPostalCode, billingAddressStateCode, billingAddressone } = props?.props

    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();
    const [message, setMesage] = useState("")
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();

    const handleCardDetailsChange = event => {
        event.error ? setCheckoutError(event.error.message) : setCheckoutError();
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const cardElement = elements.getElement(CardNumberElement)

        const billingDetails = {
            name: "John",
            email: "john@example.com",
            address: {
                city: "New York",
                line1: "896 Bell Street",
                state: "New York",
                postal_code: "	10022"
            }
        }

        const paymentMethodReq = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: billingDetails
        });

        const data = {
            payment_method: paymentMethodReq.paymentMethod.id,
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

        await axios.post("http://localhost:5500/api/order", data, {
            withCredentials: true
        })
            .then((res) => {
                setMesage(res.data.messge)
            })
            .catch((err) => {
                console.log(err, "der");
            })
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={styles.checkOutBox}>
                    <div className={styles.CheckOutFrom}>
                        <span>Card number</span>
                        <div className={styles.cardElement}>
                            <label>
                                <CardNumberElement options={options} className={styles.cardElement} onChange={handleCardDetailsChange} />
                            </label>
                        </div>
                        <span>Expiration date</span>
                        <div className={styles.cardElement}>
                            <label>
                                <CardExpiryElement options={options} className={styles.cardElement} onChange={handleCardDetailsChange} />
                            </label>
                        </div>
                        <span>CVC</span>
                        <div className={styles.cardElement}>
                            <label>
                                <CardCvcElement options={options} className={styles.cardElement} onChange={handleCardDetailsChange} />
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isProcessing || !stripe}
                        >
                            Checkout
                        </button>
                        <h6 style={{ color: "green" }}>{message}</h6>
                    </div>
                </div>
            </form>

        </>

    )
}

export default CheckOutFrom


