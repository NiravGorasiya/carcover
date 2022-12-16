import React from 'react'
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import styles from "./Checkout.module.css"
let Country = require('country-state-city').Country;
let States = require('country-state-city').State;
let City = require('country-state-city').City;
import { useState, useEffect } from 'react';

const Checkout = () => {
    let countries = Country.getAllCountries()
    let states = States.getAllStates()
    let citys = City.getAllCities()
    const [country, setContry] = useState([])
    const [countrycode, setCountryCode] = useState('')
    const [state, setState] = useState([])
    const [statecode, setStateCode] = useState('')
    const [city, setCity] = useState([])
    const [citycode, setCityCode] = useState([]);
    const [cname, setCname] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [postCode, setPostalCode] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

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
        setCityCode(code)
    }
    useEffect(() => {
        setContry(countries)
    }, [])

    const handleSubmit = () => {
        const data = { state: statecode, country: countrycode, city: citycode }
        axios.post('http://localhost:3200/travelplan/add', data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const orderData = (e) => {
        e.preventDefault()
        console.log();
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
                                                        <input type="text" name="scompany" className='form-control' placeholder='company name' />
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>First Name</label>
                                                        <input type="text" name="scompany" className='form-control' placeholder='company name' />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>Last Name</label>
                                                        <input type="text" name="scompany" className='form-control' placeholder='company name' />
                                                    </div>

                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-12'>
                                                        <label>Address</label>
                                                        <input type="text" name="scompany" className='form-control' placeholder='company name' />
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>City</label>
                                                        <select type="text" name="scompany" className='form-control' placeholder='company name' >
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
                                                        <input type="text" name="scompany" className='form-control' placeholder='company name' />
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
                                                        <input type="text" name="scompany" className='form-control' placeholder='company name' />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>Email</label>
                                                        <input type="text" name="scompany" className='form-control' placeholder='company n  ame' />
                                                    </div>
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
                                                        <input type="text" name="scompany" className='form-control' placeholder='company name' />
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>First Name</label>
                                                        <input type="text" name="scompany" className='form-control' placeholder='company name' />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>Last Name</label>
                                                        <input type="text" name="scompany" className='form-control' placeholder='company name' />
                                                    </div>

                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-12'>
                                                        <label>Address</label>
                                                        <input type="text" name="scompany" className='form-control' placeholder='company name' />
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>City</label>
                                                        <input type="text" name="scompany" className='form-control' placeholder='company name' />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>State</label>
                                                        <input type="text" name="scompany" className='form-control' placeholder='company name' />
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>Postal code</label>
                                                        <input type="text" name="scompany" className='form-control' placeholder='company name' />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>Country code</label>
                                                        <input type="text" name="scompany" className='form-control' placeholder='company name' />
                                                    </div>
                                                </div>
                                                <div className={styles['from-row']}>
                                                    <div className='col-md-6'>
                                                        <label>Phone</label>
                                                        <input type="text" name="scompany" className='form-control' placeholder='company name' />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label>Email</label>
                                                        <input type="text" name="scompany" className='form-control' placeholder='company name' />
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
                                                        Total
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
                                <button onClick={orderData}>Submit order</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Checkout
