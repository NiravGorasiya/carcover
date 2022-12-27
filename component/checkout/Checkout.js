import React from 'react'
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import styles from "./Checkout.module.css"
let Country = require('country-state-city').Country;
let States = require('country-state-city').State;
let City = require('country-state-city').City;
import { useState, useEffect } from 'react';

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
    const [city, setCity] = useState([])
    const [state, setState] = useState([])

    const initialValues = {
        cname: "",
        fname: "",
        lname: "",
        postCode: "",
        phone: "",
        email: "",
        address: "",
        countryCode: "",
        stateCode: "",
        cityCode: "",
        billingAddressCompanyName: "",
        billingAddressEmail: "",
        billingAddressPhone: "",
        billingAddressPostalCode: "",
        billingAddressLastName: "",
        billingAddressFirstName: "",
        billingAddressone: "",
        billingAddressCountrycode: "",
        billingAddressStateCode: "",
        billingAddressCityCode: ""
    }
    const [shippingAddress, setShippingAddress] = useState(initialValues)


    const handleContry = (e) => {
        const { name, value } = e.target;
        setShippingAddress({ ...shippingAddress, [name]: value })
        const dt = states.filter((item) => item.countryCode == value)
        setState(dt);
        setCity(null)
    }

    const handleState = (e) => {
        const { name, value } = e.target;
        setShippingAddress({ ...shippingAddress, [name]: value })
        const citydata = citys.filter((item) => item.stateCode == value)
        setCity(citydata)
    }

    const handleCity = (e) => {
        const { name, value } = e.target;
        setShippingAddress({ ...shippingAddress, [name]: value })
    }

    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setShippingAddress({ ...shippingAddress, [name]: value })
    }


    useEffect(() => {
        setContry(countries)
    }, [])

    const handleCopy = (e) => {
        e.preventDefault();

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
                                                    <div className={styles.inputfield}>
                                                        <div className='col-12'>
                                                            <label>Company name</label>
                                                            <input type="text" name="cname" value={shippingAddress.cname} placeholder='Company name' onChange={handleInputChange} className='form-control' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>First Name</label>
                                                        <input type="text" name="fname" value={shippingAddress.fname} placeholder='First name' onChange={handleInputChange} className='form-control' />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>Last Name</label>
                                                        <input type="text" name="lname" value={shippingAddress.lname} placeholder='Last name' onChange={handleInputChange} className='form-control' />
                                                    </div>

                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className={styles.inputfield}>
                                                        <div className='col-12'>
                                                            <label>Address</label>
                                                            <input type="text" name="address" value={shippingAddress.address} onChange={handleInputChange} placeholder='Address' className='form-control' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>City</label>
                                                        <select type="text" name="cityCode" value={shippingAddress.cityCode} placeholder='company name' onChange={handleCity} className='form-control'>
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
                                                        <select type="text" name="stateCode" value={shippingAddress.stateCode} className='form-control' onChange={handleState}>
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
                                                        <input type="text" name="postCode" value={shippingAddress.postCode} className='form-control' onChange={handleInputChange} placeholder='postal code' />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>Country code</label>
                                                        <select type="text" name="countryCode" value={shippingAddress.countryCode} className='form-control' onChange={handleContry}>
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
                                                        <input type="text" name="phone" value={shippingAddress.phone} placeholder='phone number' onChange={handleInputChange} className='form-control' />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>Email</label>
                                                        <input type="text" name="email" value={shippingAddress.email} placeholder='Enter email' onChange={handleInputChange} className='form-control' />
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
                                                    <div className={styles.inputfield}>
                                                        <div className='col-12'>
                                                            <label>Company name</label>
                                                            <input type="text" name="billingAddressCompanyName" value={shippingAddress.billingAddressCompanyName} onChange={handleInputChange} className='form-control' placeholder='company name' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>First Name</label>
                                                        <input type="text" name="billingAddressFirstName" value={shippingAddress.billingAddressFirstName} onChange={handleInputChange} className='form-control' placeholder='First name' />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>Last Name</label>
                                                        <input type="text" name="billingAddressLastName" value={shippingAddress.billingAddressLastName} onChange={handleInputChange} className='form-control' placeholder='Last name' />
                                                    </div>

                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className={styles.inputfield}>
                                                        <div className='col-12'>
                                                            <label>Address</label>
                                                            <input type="text" name="billingAddressone" value={shippingAddress.billingAddressone} onChange={handleInputChange} className='form-control' placeholder='Address Line' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>City</label>
                                                        <select type="text" name="billingAddressCityCode" value={shippingAddress.billingAddressCityCode} className='form-control' onChange={handleCity} placeholder='company name' >
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
                                                        <select type="text" name="billingAddressStateCode" className='form-control' value={shippingAddress.billingAddressStateCode} onChange={handleState}>
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
                                                        <input type="text" name="billingAddressPostalCode" className='form-control' value={shippingAddress.billingAddressPostalCode} onChange={handleInputChange} placeholder='postal code' />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>Country code</label>
                                                        <select type="text" name="billingAddressCountrycode" value={shippingAddress.billingAddressCountrycode} className='form-control' onChange={handleContry}>
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
                                                        <input type="text" name="billingAddressPhone" value={shippingAddress.billingAddressPhone} onChange={handleInputChange} className='form-control' placeholder='company name' />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>Email</label>
                                                        <input type="text" name="billingAddressEmail" value={shippingAddress.billingAddressEmail} onChange={handleInputChange} className='form-control' placeholder='email name' />
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
                            </form>
                        </div>
                        <Elements stripe={stripeTestPromise}>
                            <CheckOutFrom props={shippingAddress} />
                        </Elements>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Checkout

