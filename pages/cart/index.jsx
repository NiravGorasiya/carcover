import React, { Fragment } from 'react'
import Link from 'next/link'
import Header from '../../component/Header/Header'
import Footer from '../../component/Footer/Footer'
import CartBanner from '../../component/cartbanner/CartBanner'
import styles from "./cart.module.css"
import { useEffect } from 'react'
import axios from 'axios'
import url from "../../api/Apiservices"
import { useState } from 'react'

const Cart = () => {
    const [date, setDate] = useState([])
    const [coupon, setCoupon] = useState("")
    const [respose, setResponse] = useState("")
    const [error, setError] = useState("")
    const [productData, setProductData] = useState([])
    const [cartToral, setCarTotal] = useState([])
    const [deliverydate, setDeliveryDate] = useState({})
    const [qty, setQty] = useState(1)
    const [deliveryDateValue, setDeliveryDateValue] = useState('')


    const dateList = async () => {
        try {
            const response = await axios.get(`${url}/cart/Delivery_Date`, {
                withCredentials: true
            })
            setDate(response.data.result)
        } catch (error) {
            console.log(error);
        }
    }


    const productDataList = async () => {
        try {
            axios.get(`${url}/cart/all`, {
                withCredentials: true
            })
                .then((response) => {
                    setProductData(response.data.result.data)

                })
        } catch (error) {
            console.log(error);
        }
    }

    const deliveryDate = (item) => {
        setDeliveryDate(item)
        item?.Delivery_fee?.map((item) => {
            setDeliveryDateValue(item.value)

        })
    }


    const cartToatal = async () => {
        axios.get(`${url}/cart/carts_total`, {
            withCredentials: true
        })
            .then((response) => {
                setCarTotal(response.data.result.CART_TOTALS)
            })
    }

    const updateproduct = (id, qty) => {
        setQty(qty)
        axios.put(`${url}/cart/update/${id}`, {
            quantity: qty
        }).then((response) => {
            productDataList()
            console.log(response, 'response');
        })
            .catch((err) => {
                console.log(err);
            })
    }

    const couponHandle = async (e) => {
        e.preventDefault();
        try {
            const data = { coupon_code: coupon }
            await axios.post(`${url}/coupon/get`, data, {
                withCredentials: true
            })
                .then((res) => {
                    setResponse(res.data.result);
                    setError("")
                    cartToatal()
                })
                .catch((err) => {
                    setError(err.response.data.messge)
                    setResponse("")
                })
        } catch (error) {

        }
    }


    useEffect(() => {
        productDataList()
        dateList()
        cartToatal()
    }, [qty])
    console.log(typeof deliveryDateValue == "string");

    console.log((typeof deliveryDateValue) == Number ? (655) : (552));
    return (
        <>
            <Header />
            <CartBanner />
            <section className={`${styles['single-wrapper-glob']} ${styles['cart-wapper']}`}>
                <div className='container'>
                    <div className={`${styles['information-wrap']}`}>
                        <div className={styles.content}>
                            <div className={styles.holder}>
                                <div className={`${styles['inner-wrapper']}`}>
                                    <form>
                                        <table className={`${styles['product-listing']} cart-info`}>
                                            <thead>
                                                <tr>
                                                    <th>image</th>
                                                    <th>product Name</th>
                                                    <th>Model</th>
                                                    <th>Quantity</th>
                                                    <th>Unit price</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    productData.map((item) => (
                                                        <tr>
                                                            <td>
                                                                <Link href="df">
                                                                    <img src={`http://localhost:5500/${item.image}`}></img>
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    <Link href="sadf">
                                                                        {
                                                                            item?.Produt?.map((item1) => (
                                                                                <>
                                                                                    <h6 style={{ color: "green", listStyle: "none ", fontSize: "23px", textTransform: "capitalize" }}>{item1.product_name}</h6>
                                                                                    <ul>
                                                                                        <li>year {item1.year}</li>
                                                                                        <li> Make {item1.make}</li>
                                                                                        <li> Model {item1.model}</li>
                                                                                        <li> Body {item1.body}</li>
                                                                                    </ul>
                                                                                </>
                                                                            ))
                                                                        }
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div>CARCF-25</div>
                                                            </td>
                                                            <td className={`${styles.quantity} ${styles["entry-quantity"]}`} style={{ minWidth: "140px" }}>
                                                                <div className={`input-group' ${styles.quantityp}`} style={{ minWidth: "140px" }}>
                                                                    <span className={styles['input-group-btn']} style={{ border: "solid 1px", borderRadius: "0" }}>
                                                                        <button className={`btn ${styles['btn-default minus']}`} id="" type="button" onClick={() => updateproduct(item._id, item.quantity - 1)}>
                                                                            <span className='fa fa-minus'>
                                                                            </span>
                                                                        </button>
                                                                    </span>
                                                                    <input type="text"
                                                                        value={item.quantity}
                                                                        className='form-control txtQuanity text-center p-0'
                                                                    />
                                                                    <span className='input-group-btn' style={{ border: "solid 1px", borderRadius: "0" }}>
                                                                        <button className='btn btn-default minus' id="" type="button" onClick={() => updateproduct(item._id, item.quantity + 1)}>
                                                                            <span className='fa fa-plus'>
                                                                            </span>
                                                                        </button>
                                                                    </span>
                                                                </div>
                                                                {/* <Link href={"sdaf"} style={{ position: 'absolute', top: "51%", left: "56%" }}>
                                                                    <input type="hidden" value="33" />
                                                                    <i className='fa fa-times-circle text-danger fa-lg'>

                                                                    </i>
                                                                </Link> */}
                                                            </td>
                                                            <td>${item.price}</td>
                                                            <td>${item.total}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </form>
                                </div>
                                <div className={styles['coupon-wrap']} id="coupon">
                                    <form >
                                        <input type="hidden" name='next' value="coupon" />
                                        <input type="text" className={`${styles['form-control']}`} name="coupon" placeholder="Enter your coupon here" onChange={(e) => setCoupon(e.target.value)} />
                                        <button className={`btn btn-blue ${styles.btnCoupon}`} onClick={couponHandle}>Apply</button>
                                    </form>
                                </div>
                                {respose ? (<h6 style={{ color: 'green' }}>{respose}</h6>) : (<div style={{ clear: "both" }}><h6 style={{ color: "red" }}>{error}</h6></div>)}

                                <div className={styles['cart-footer']}>
                                    <div className='row'>
                                        <div className='col-md-7'>
                                            <div id={styles["guaranteed-shipping-holder"]}>
                                                <p className={styles.dtitle}>Choose your guaranteed Delivery Date</p>
                                                <div className={styles['date-select-wrap']}>
                                                    <ul className={styles.dselects}>
                                                        {
                                                            date.map((item) => (
                                                                <Fragment key={item.day}>
                                                                    <li className='delivery-day-box-dev' onClick={() => deliveryDate(item)}>
                                                                        <span className='check'>
                                                                            <i className='fa fa-check'></i>
                                                                        </span>
                                                                        <div className={styles['delivery-date']}>
                                                                            {item.day}
                                                                            <span>{item.monthName} {item.year}</span>
                                                                            <span>{item.dayName}</span>
                                                                        </div>
                                                                        {item.Delivery_fee.map((item) => (
                                                                            <Fragment key={item.text}>
                                                                                <div className={styles.delivery_price}>{item.text}</div>
                                                                            </Fragment>
                                                                        ))
                                                                        }
                                                                    </li>
                                                                </Fragment>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                                {Object.keys(deliverydate).length !== 0 && (
                                                    <div className={styles.guaranteeBox}>
                                                        <i className='fa fa-check-cirle'></i>
                                                        We Guarantee Products to be Delivered On:
                                                        <strong id="guaranteed-delivery-date-span">{deliverydate.dayName} {deliverydate.monthName} {deliverydate.day} {deliverydate.year}</strong>
                                                    </div>
                                                )}
                                            </div>
                                            <div id="ship-wraning"></div>
                                            <div className='clearfix'>

                                            </div>
                                            <div className='add_charge_message mb-3'>
                                                Note: An extra Shipping Fee of $30 will be required to the states of Hawaii, Alaska, & Puerto Rico.
                                            </div>
                                        </div>
                                        <div className='col-md-5'>
                                            <div className={styles['cart-total']}>
                                                <h4 className={styles['entry-title']}>
                                                    <strong>Cart</strong>
                                                    total
                                                </h4>
                                                <table id="total" style={{ widh: "100%", cellpadding: "0", cellpadding: "0" }}>
                                                    <tbody>
                                                        {
                                                            cartToral?.map((item) => (
                                                                item?.sub_total.map((item1) => (
                                                                    <tr>
                                                                        <td>
                                                                            <h6 style={{ fontWeight: "bold" }}>
                                                                                Sub-total
                                                                            </h6>
                                                                        </td>
                                                                        <td>${item1.value}</td>
                                                                    </tr>
                                                                ))
                                                            ))
                                                        }


                                                        {Object.keys(deliverydate).length !== 0 && (
                                                            <tr >
                                                                <td>
                                                                    <h6 style={{ fontWeight: "bold" }}>
                                                                        <>
                                                                            Delivery Date:
                                                                            <br></br>
                                                                            -{deliverydate?.dayName?.substring(0, 3)} {deliverydate?.day} {deliverydate?.monthName?.substring(0, 3)},{deliverydate?.year}
                                                                        </>
                                                                    </h6>

                                                                </td>
                                                                <td>
                                                                    {deliveryDateValue}
                                                                </td>
                                                            </tr>
                                                        )}

                                                        {
                                                            cartToral.map((item) => (
                                                                item?.coupon.map((item1, k) => (
                                                                    <tr >
                                                                        <td>
                                                                            <h6 style={{ fontWeight: "bold" }}>
                                                                                {item1.text}
                                                                                <br></br>
                                                                            </h6>
                                                                        </td>
                                                                        <td>
                                                                            ${item1.value}
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            ))
                                                        }
                                                        {
                                                            cartToral.map((item) => (
                                                                item?.Total?.map((item1) => (

                                                                    <tr>
                                                                        <td>
                                                                            <b>Total</b>
                                                                        </td>

                                                                        {(typeof deliveryDateValue == "string") ? (<>${item1.value - 0}</>) : (<td>${item1.value + deliveryDateValue}</td>)}

                                                                    </tr>
                                                                ))
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                                <div className={styles['entry-footer']}>
                                                    <Link href="/" className={styles['btn-grey']}>Continue Shopping</Link>
                                                    <Link href="/checkout" className={styles['btn-blue']}>
                                                        Checkout &nbsp;
                                                        <span className='fa fa-share-square-o'></span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Cart
