import React from 'react'
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import styles from "./Checkout.module.css"
let Country = require('country-state-city').Country;
let States = require('country-state-city').State;
let City = require('country-state-city').City;
import { useState, useEffect } from 'react';
import axios from 'axios';
import StripeContainer from '../stripe/StripeContainer';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutFrom from '../stripe/CheckOutFrom';
const PUBLIC_KEY = "pk_test_51IvdjGSBmFmiKlBdvjqb5Pb8TDJEkPZCy9yjdVTow4IC1RZWOQ0MnJJStkzWzZPyaU5p4h8ehxeR7njn5UdNWwet00pkZL315z";


const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Checkout = () => {
    let countries = Country.getAllCountries()
    let states = States.getAllStates()
    let citys = City.getAllCities()

    const [country, setContry] = useState([])
    const [countrycode, setCountryCode] = useState('')
    const [billingAddressCountrycode, setBillingAddressCountryCode] = useState("")
    const [state, setState] = useState([])
    const [statecode, setStateCode] = useState("")
    const [billingAddressStateCode, setBillingAddressStateCode] = useState("")
    const [city, setCity] = useState([])
    const [citycode, setCityCode] = useState([]);
    const [billingAddressCityCode, setBillingAddressCityCode] = useState("")
    const [cname, setCname] = useState("")
    const [billingAddressCompanyName, setBillingAddressCompanyName] = useState('')
    const [fname, setFname] = useState("")
    const [billingAddressFirstName, setBillingAddressFirstName] = useState("")
    const [lname, setLname] = useState("")
    const [billingAddressLastName, setBillingAddressLastName] = useState("")
    const [postCode, setPostalCode] = useState("")
    const [billingAddressPostalCode, setBillingAddressPostalCode] = useState("")
    const [phone, setPhone] = useState("")
    const [billingAddressPhone, setBillingAddressPhone] = useState("")
    const [email, setEmail] = useState("")
    const [billingAddressEmail, setBillingAddressEmail] = useState("")
    const [address, setAddress] = useState("")
    const [billingAddress, setBillingAddress] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")

    const handleContry = (code) => {
        setCountryCode(code)
        const dt = states.filter((item) => item.countryCode == code)
        setState(dt);
        setCity(null)
    }

    const handleState = (code) => {
        setStateCode(code);
        const citydata = citys.filter((item) => item.stateCode == code)
        setCity(citydata)
    }

    const handleCity = (code) => {
        console.log(code, "code");
        setCityCode(code)
    }
    useEffect(() => {
        setContry(countries)
    }, [])

    const handleCopy = (e) => {
        e.preventDefault();
        setBillingAddressCompanyName(cname)
        setBillingAddressFirstName(fname)
        setBillingAddressLastName(lname)
        setBillingAddressPhone(phone)
        setBillingAddressPostalCode(postCode)
        setBillingAddressEmail(email)
        setBillingAddress(address)
        setBillingAddressCountryCode(countrycode)
        setBillingAddressStateCode(statecode)
        setBillingAddressCityCode(citycode)
    }

    const orderData = (e) => {

        e.preventDefault()
        const data = {
            payment_method: "card",
            shipping_address: [{
                company_name: cname,
                city: city,
                e_mail: email,
                phone: phone,
                last_name: lname,
                state: statecode,
                city: citycode,
                postal_code: postCode,
                first_name: fname,
                country: billingAddressCountrycode
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
            }]
        }
        axios.post("http://localhost:5500/api/order", data, {
            withCredentials: true
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const handleSubmit = () => {
        console.log("hello");
    }
    return (
        <>
            <Header />
            <section className={styles["checkout-banner"]}>
                <div className='container'>
                    <div className={`${styles["page-banner"]} ${styles["page-banner-checkout"]}`}>
                        <div className={styles['entry-content']}>
                            <h1 className={styles['page-title']}>
                                checkout
                            </h1>
                            <div className={styles.description}>secure Checkout process</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={`${styles['single-wrapper-glob']} ${styles['cart-wrapper']}`}>
                <div className='container'>
                    <div className={styles['information-wrap']}>
                        <div className={`${styles['inner-wrapper']} checkout-form`}>
                            <div className='notification'></div>
                            <form>
                                <div className={`row ${styles['checkout-content']}`}>
                                    <div className={`col-md-6 ${styles.shipaddr}`}>
                                        <div className={styles['form-wrap']}>
                                            <h4 className={styles.title}>
                                                <strong>
                                                    shipping
                                                </strong>
                                                addr
                                            </h4>
                                            <div className={styles['from-inside']}>
                                                <div className={styles['from-row']}>
                                                    <div className='col-12'>
                                                        <label>Company name</label>
                                                        <input type="text" name="scompany" className='form-control' placeholder='company name' onChange={(e) => setCname(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>First Name</label>
                                                        <input type="text" name="scompany" className='form-control' placeholder='company name' onChange={(e) => setFname(e.target.value)} />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>Last Name</label>
                                                        <input type="text" name="scompany" className='form-control' placeholder='company name' onChange={(e) => setLname(e.target.value)} />
                                                    </div>

                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-12'>
                                                        <label>Address</label>
                                                        <input type="text" name="scompany" className='form-control' placeholder='company name' onChange={(e) => setAddress(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>City</label>
                                                        <select type="text" name="scompany" className='form-control' placeholder='company name' onChange={(e) => handleCity(e.target.value)}>
                                                            <option value="0">Select city</option>
                                                            {
                                                                city &&
                                                                    city !== undefined ?
                                                                    city.map((ctr, index) => {
                                                                        return (
                                                                            <>
                                                                                <option key={index}>{ctr.name}</option>
                                                                            </>
                                                                        )
                                                                    }) : "Nocountry"
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>State</label>
                                                        <select name="scompany" className='form-control' onChange={(e) => handleState(e.target.value)}>
                                                            <option value="0">Select state</option>
                                                            {
                                                                state &&
                                                                    state !== undefined ?
                                                                    state.map((ctr, index) => {
                                                                        return (
                                                                            <>
                                                                                <option key={index} value={ctr.isoCode}>{ctr.name}</option>
                                                                            </>
                                                                        )
                                                                    }) : "Nocountry"
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>Postal code</label>
                                                        <input type="text" name="scompany" className='form-control' onChange={(e) => setPostalCode(e.target.value)} placeholder='company name' />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>Country code</label>
                                                        <select name="scompany" className='form-control' onChange={(e) => handleContry(e.target.value)}>
                                                            <option value="0">Select Country</option>
                                                            {
                                                                country &&
                                                                    country !== undefined ?
                                                                    country.map((ctr, index) => {
                                                                        return (
                                                                            <>
                                                                                <option value={ctr.isoCode}>{ctr.name}</option>
                                                                            </>
                                                                        )
                                                                    }) : "Nocountry"
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>Phone</label>
                                                        <input type="text" name="scompany" className='form-control' placeholder='company name' onChange={(e) => setPhone(e.target.value)} />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>Email</label>
                                                        <input type="text" name="scompany" className='form-control' placeholder='company name' onChange={(e) => setEmail(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className='btn-wrap d-none d-md-block'>
                                                    <button className="btn btn-primary text-white" onClick={handleCopy}>
                                                        <span className='fa fa-files-0'>
                                                        </span>
                                                        copy billing Address
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`col-md-6 ${styles.billaddr} d-sm-none d-md-block`}>
                                        <div className={styles['form-wrap']}>
                                            <h4 className={styles.title}>
                                                <strong>
                                                    Billing
                                                </strong>
                                                addr
                                            </h4>
                                            <div className={styles['from-inside']}>
                                                <div className={styles['from-row']}>
                                                    <div className='col-12'>
                                                        <label>Company name</label>
                                                        <input type="text" name="scompany" value={billingAddressCompanyName} className='form-control' placeholder='company name' />
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>First Name</label>
                                                        <input type="text" name="scompany" value={billingAddressFirstName} className='form-control' placeholder='company name' />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>Last Name</label>
                                                        <input type="text" name="scompany" value={billingAddressLastName} className='form-control' placeholder='company name' />
                                                    </div>

                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-12'>
                                                        <label>Address</label>
                                                        <input type="text" name="scompany" value={billingAddress} className='form-control' placeholder='company name' />
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>City</label>
                                                        <select type="text" name="scompany" value={billingAddressCityCode} className='form-control' placeholder='company name' >
                                                            <option value="0">Select city</option>
                                                            {
                                                                city &&
                                                                    city !== undefined ?
                                                                    city.map((ctr, index) => {
                                                                        return (
                                                                            <>
                                                                                <option key={index}>{ctr.name}</option>
                                                                            </>
                                                                        )
                                                                    }) : "Nocountry"
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>State</label>
                                                        <select name="scompany" className='form-control' value={billingAddressStateCode} onChange={(e) => handleState(e.target.value)}>
                                                            <option value="0">Select state</option>
                                                            {
                                                                state &&
                                                                    state !== undefined ?
                                                                    state.map((ctr, index) => {
                                                                        return (
                                                                            <>
                                                                                <option key={index} value={ctr.isoCode}>{ctr.name}</option>
                                                                            </>
                                                                        )
                                                                    }) : "Nocountry"
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>Postal code</label>
                                                        <input type="text" name="scompany" className='form-control' value={billingAddressPostalCode} placeholder='company name' />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>Country code</label>
                                                        <select name="scompany" value={billingAddressCountrycode} className='form-control' onChange={(e) => handleContry(e.target.value)}>
                                                            <option value="0">Select Country</option>
                                                            {
                                                                country &&
                                                                    country !== undefined ?
                                                                    country.map((ctr, index) => {
                                                                        return (
                                                                            <>
                                                                                <option value={ctr.isoCode}>{ctr.name}</option>
                                                                            </>
                                                                        )
                                                                    }) : "Nocountry"
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>Phone</label>
                                                        <input type="text" name="scompany" value={billingAddressPhone} className='form-control' placeholder='company name' />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>Email</label>
                                                        <input type="text" name="scompany" value={billingAddressEmail} className='form-control' placeholder='company name' />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row justify-content-md-center mt-50'>
                                    <div className='col-md-8'>
                                        <div className='checkout-content'>
                                            <div className='form-wrap'>
                                                <h4 className='title'>
                                                    <strong>Payment</strong>
                                                    method
                                                    <span className='price pull-right'>
                                                        <span className='order_total'>$64.96</span>
                                                    </span>
                                                </h4>
                                                <div className='form-inside'>
                                                    <div className='inner-wrap'>
                                                        <div className='form-row justify-center payment-options'>
                                                            <div className='form-check form-check-inline active'>
                                                                <input type="radio" name="payment_method" className='form-check-input' />
                                                                <label className='form-check-label'>Credit card</label>
                                                            </div>
                                                            <div className='form-check form-check-inline active'>
                                                                <input type="radio" name="payment_method" className='form-check-input' />
                                                                <label className='form-check-label'>Paypal</label>
                                                            </div>
                                                            <div className='form-check form-check-inline active'>
                                                                <input type="radio" name="payment_method" className='form-check-input' />
                                                                <label className='form-check-label'>Affirm</label>
                                                            </div>
                                                            <div className='form-check form-check-inline active'>
                                                                <input type="radio" name="payment_method" className='form-check-input' />
                                                                <label className='form-check-label'>Checko ko   </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className='btn btn-primary' onClick={orderData} type="submit">Submit order</button>
                            </form>
                            <Elements stripe={stripeTestPromise}>
                                <CheckOutFrom />
                            </Elements>
                        </div>
                    </div>
                </div>

            </section>
            <Footer />
        </>
    )
}

export default Checkout
