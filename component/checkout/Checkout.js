import React, { Fragment } from 'react'
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
import * as Yup from "yup"

const Checkout = () => {
    let countries = Country.getAllCountries()
    let states = States.getAllStates()
    let citys = City.getAllCities()
    const [country, setContry] = useState([])
    const [city, setCity] = useState([])
    const [state, setState] = useState([])
    const [billingState, setBillingState] = useState([])
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

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

    const handleBillingContry = (e) => {
        const { name, value } = e.target;
        setShippingAddress({ ...shippingAddress, [name]: value })
        const dt = states.filter((item) => item.countryCode == value)
        setBillingState(dt);
        setCity(null)
    }


    const handleState = (e) => {
        const { name, value } = e.target;
        setShippingAddress({ ...shippingAddress, [name]: value })
        const citydata = citys.filter((item) => item.stateCode == value)
        setCity(citydata)
    }

    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setShippingAddress({ ...shippingAddress, [name]: value })
    }

    useEffect(() => {
        setContry(countries)
        setIsSubmit(true);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(shippingAddress);
        }
    }, [formErrors])

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.cname) {
            errors.cname = "Company name is required!";
        }
        if (!values.fname) {
            errors.fname = "First name is required!";
        }
        if (!values.lname) {
            errors.lname = "Last name is required!";
        }
        if (!values.address) {
            errors.address = "Address is required!";
        }
        if (!values.cityCode) {
            errors.cityCode = "City is required!";
        }
        if (!values.stateCode) {
            errors.stateCode = "state is required!";
        }
        if (!values.postCode) {
            errors.postCode = "postalcode is required!";
        }
        if (!values.countryCode) {
            errors.countryCode = "country is required!";
        }
        if (!values.phone) {
            errors.phone = "phone is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }

        if (!values.billingAddressCompanyName) {
            errors.billingAddressCompanyName = "company name is required!";
        }
        if (!values.billingAddressFirstName) {
            errors.billingAddressFirstName = "first name is required!";
        }
        if (!values.billingAddressLastName) {
            errors.billingAddressLastName = "Last name is required!";
        }
        if (!values.billingAddressone) {
            errors.billingAddressone = "Address1 is required!";
        }
        if (!values.billingAddressCityCode) {
            errors.billingAddressCityCode = "City is required!";
        }
        if (!values.billingAddressStateCode) {
            errors.billingAddressStateCode = "statecode is required!";
        }
        if (!values.billingAddressPostalCode) {
            errors.billingAddressPostalCode = "postalcode is required!";
        }
        if (!values.billingAddressCountrycode) {
            errors.billingAddressCountrycode = "country is required!";
        }
        if (!values.billingAddressPhone) {
            errors.billingAddressPhone = "phone is required!";
        }
        if (!values.billingAddressEmail) {
            errors.billingAddressEmail = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.billingAddressEmail = "This is not a valid email format!";
        }


        return errors;
    };

    const handleCopy = (e) => {
        e.preventDefault();
        setFormErrors(validate(shippingAddress));
        setShippingAddress({
            ...shippingAddress,
            billingAddressCompanyName: shippingAddress.cname,
            billingAddressEmail: shippingAddress.email,
            billingAddressFirstName: shippingAddress.fname,
            billingAddressLastName: shippingAddress.lname,
            billingAddressPostalCode: shippingAddress.postCode,
            billingAddressLastName: shippingAddress.lname,
            billingAddressPhone: shippingAddress.phone,
            billingAddressone: shippingAddress.address,
            billingAddressCountrycode: shippingAddress.countryCode,
            billingAddressCityCode: shippingAddress.cityCode,
            billingAddressStateCode: shippingAddress.stateCode,
        })
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
                            <form onClick={handleCopy}>
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
                                                            <p style={{ color: "red" }}> {formErrors.cname}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>First Name</label>
                                                        <input type="text" name="fname" value={shippingAddress.fname} placeholder='First name' onChange={handleInputChange} className='form-control' />
                                                        <p style={{ color: "red" }}> {formErrors.fname}</p>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>Last Name</label>
                                                        <input type="text" name="lname" value={shippingAddress.lname} placeholder='Last name' onChange={handleInputChange} className='form-control' />
                                                        <p style={{ color: "red" }}> {formErrors.fname}</p>
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className={styles.inputfield}>
                                                        <div className='col-12'>
                                                            <label>Address</label>
                                                            <input type="text" name="address" value={shippingAddress.address} onChange={handleInputChange} placeholder='Address' className='form-control' />
                                                            <p style={{ color: "red" }}> {formErrors.address}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>City</label>
                                                        <input type="text" name="cityCode" value={shippingAddress.cityCode} onChange={handleInputChange} placeholder='City name' className='form-control' />
                                                        <p style={{ color: "red" }}> {formErrors.cityCode}</p>
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
                                                        <p style={{ color: "red" }}> {formErrors.stateCode}</p>
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>Postal code</label>
                                                        <input type="text" name="postCode" value={shippingAddress.postCode} className='form-control' onChange={handleInputChange} placeholder='Postal code' />
                                                        <p style={{ color: "red" }}> {formErrors.stateCode}</p>
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
                                                                            <Fragment key={index}>
                                                                                <option key={index} value={ctr.isoCode}>{ctr.name}</option>
                                                                            </Fragment>
                                                                        )
                                                                    }) : "Nocountry"
                                                            }
                                                        </select>
                                                        <p style={{ color: "red" }}> {formErrors.countryCode}</p>
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>Phone</label>
                                                        <input type="text" name="phone" value={shippingAddress.phone} placeholder='phone number' onChange={handleInputChange} className='form-control' />
                                                        <p style={{ color: "red" }}> {formErrors.phone}</p>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>Email</label>
                                                        <input type="text" name="email" value={shippingAddress.email} placeholder='Enter email' onChange={handleInputChange} className='form-control' />
                                                        <p style={{ color: "red" }}> {formErrors.email}</p>
                                                    </div>
                                                </div>
                                                <div className='btn-wrap d-none d-md-block'>
                                                    <button className="btn btn-primary text-white" >
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
                                                            <input type="text" name="billingAddressCompanyName" value={shippingAddress.billingAddressCompanyName} onChange={handleInputChange} className='form-control' placeholder='Company name' />
                                                            <p style={{ color: "red" }}> {formErrors.billingAddressCompanyName}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>First Name</label>
                                                        <input type="text" name="billingAddressFirstName" value={shippingAddress.billingAddressFirstName} onChange={handleInputChange} className='form-control' placeholder='First name' />
                                                        <p style={{ color: "red" }}> {formErrors.billingAddressFirstName}</p>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>Last Name</label>
                                                        <input type="text" name="billingAddressLastName" value={shippingAddress.billingAddressLastName} onChange={handleInputChange} className='form-control' placeholder='Last name' />
                                                        <p style={{ color: "red" }}> {formErrors.billingAddressLastName}</p>
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className={styles.inputfield}>
                                                        <div className='col-12'>
                                                            <label>Address</label>
                                                            <input type="text" name="billingAddressone" value={shippingAddress.billingAddressone} onChange={handleInputChange} className='form-control' placeholder='Address Line' />
                                                            <p style={{ color: "red" }}> {formErrors.billingAddressone}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>City</label>
                                                        <input type="text" name="billingAddressCityCode" value={shippingAddress.billingAddressCityCode} onChange={handleInputChange} className='form-control' placeholder='City name' />
                                                        <p style={{ color: "red" }}> {formErrors.billingAddressCityCode}</p>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>State</label>
                                                        <select type="text" name="billingAddressStateCode" className='form-control' value={shippingAddress.billingAddressStateCode} onChange={handleState}>
                                                            <option value="0">Select state</option>
                                                            {
                                                                billingState &&
                                                                    billingState !== undefined ?
                                                                    billingState.map((ctr, index) => {
                                                                        return (
                                                                            <>
                                                                                <option key={index} value={ctr.isoCode}>{ctr.name}</option>
                                                                            </>
                                                                        )
                                                                    }) : "Nocountry"
                                                            }
                                                        </select>
                                                        <p style={{ color: "red" }}> {formErrors.billingAddressStateCode}</p>
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>Postal code</label>
                                                        <input type="text" name="billingAddressPostalCode" className='form-control' value={shippingAddress.billingAddressPostalCode} onChange={handleInputChange} placeholder='Postal code' />
                                                        <p style={{ color: "red" }}> {formErrors.billingAddressPostalCode}</p>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>Country code</label>
                                                        <select type="text" name="billingAddressCountrycode" value={shippingAddress.billingAddressCountrycode} className='form-control' onChange={handleBillingContry}>
                                                            <option value="0">Select Country</option>
                                                            {
                                                                country &&
                                                                    country !== undefined ?
                                                                    country.map((ctr, index) => {
                                                                        return (
                                                                            <Fragment key={index}>
                                                                                <option key={index} value={ctr.isoCode}>{ctr.name}</option>
                                                                            </Fragment>
                                                                        )
                                                                    }) : "Nocountry"
                                                            }
                                                        </select>
                                                        <p style={{ color: "red" }}> {formErrors.billingAddressCountrycode}</p>
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>Phone</label>
                                                        <input type="text" name="billingAddressPhone" value={shippingAddress.billingAddressPhone} onChange={handleInputChange} className='form-control' placeholder='Company name' />
                                                        <p style={{ color: "red" }}> {formErrors.billingAddressPhone}</p>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>Email</label>
                                                        <input type="text" name="billingAddressEmail" value={shippingAddress.billingAddressEmail} onChange={handleInputChange} className='form-control' placeholder='Enter Email ' />
                                                        <p style={{ color: "red" }}> {formErrors.billingAddressEmail}</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`row justify-content-md-center ${styles['mt-50']}`}>
                                    <div className='col-md-8'>
                                        <div className={styles['checkout-content']}>
                                            <div className='form-wrap'>
                                                <h4 className={styles.title}>
                                                    <strong>Payment</strong>
                                                    method
                                                    <span className={`price ${styles['pull-right']}`}>
                                                        <span className='order_total'>Total $64.96</span>
                                                    </span>
                                                </h4>
                                                <div className={styles['form-inside']}>
                                                    <div className={styles['inner-wrap']}>
                                                        <div className={`form-row justify-center ${styles['payment-options']}`}>
                                                            <div className={`${styles['form-check']} form-check-inline`}>
                                                                <input type="radio" name="payment_method_type" value="card" className='form-check-input' onChange={handleInputChange} />
                                                                <label className='form-check-label'>Credit card</label>
                                                            </div>
                                                            <div className={`${styles['form-check']} form-check-inline`}>
                                                                <input type="radio" name="payment_method_type" value="paypal" className='form-check-input' onChange={handleInputChange} />
                                                                <label className='form-check-label'>Paypal</label>
                                                            </div>
                                                            <div className={`${styles['form-check']} form-check-inline`}>
                                                                <input type="radio" name="payment_method_type" value="Affirm" className='form-check-input' onChange={handleInputChange} />
                                                                <label className='form-check-label'>Affirm</label>
                                                            </div>
                                                            <div className={`${styles['form-check']} form-check-inline`}>
                                                                <input type="radio" name="payment_method_type" value="check" className='form-check-input' onChange={handleInputChange} />
                                                                <label className='form-check-label'>Check/Po</label>
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
            </section >
            <Footer />
        </>
    )
}

export default Checkout


