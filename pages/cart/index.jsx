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
import { useRouter } from 'next/router'

const Cart = () => {
    const [date, setDate] = useState([])
    const [coupon, setCoupon] = useState("")
    const [respose, setResponse] = useState("")
    const [error, setError] = useState("")
    const [productData, setProductData] = useState([])
    const [cartToral, setCarTotal] = useState({})
    const [id, setId] = useState('')
    const [deliverydate, setDeliveryDate] = useState({})
    const [qty, setQty] = useState(1)
    const [dDate, setdDate] = useState('')
    const [loding, setLoding] = useState(false)
    const [errorDate, setErrorDate] = useState("")
    const router = useRouter()
    const [productLength, setProductLength] = useState(0)

    const productDataList = async () => {
        try {
            axios.get(`${url}/cart/all`, {
                withCredentials: true
            })
                .then((response) => {
                    setId('')
                    setProductData(response.data.result.products)
                    setProductLength(response.data.result.products.length)
                })

        } catch (error) {
        }
    }

    const dateList = async () => {
        try {
            const response = await axios.get(`${url}/cart/delivery_data`, {
                withCredentials: true
            })
            setDate(response.data.result)
        } catch (error) {
        }
    }

    const deliveryDate = (item) => {
        const data = { id: item?.id }
        setId(item.id)
        axios.post(`${url}/cart/Delivery_Date`, data, {
            withCredentials: true
        })
            .then((response) => {
                cartToatal()
                setLoding(true)
            })
    }

    const cartToatal = async () => {
        try {
            await axios.get(`${url}/cart/carts_total`, {
                withCredentials: true
            })
                .then((response) => {
                    setCarTotal(response.data.result.carts_total)
                    if (response?.data?.result?.carts_total?.length != 0) {
                        const dateStr = response?.data?.result?.carts_total?.shipping?.text?.slice(2, 16)
                        setdDate(new Date(dateStr).getDate())
                    }
                    if (response?.data?.result?.cartToatal?.length != 0) {
                        setCoupon(response?.data?.result?.carts_total?.coupon?.text);
                    }
                })
        } catch (error) {

        }
    }

    const updateproduct = (id, qty) => {
        setQty(qty)
        axios.put(`${url}/cart/update/${id}`, {
            quantity: qty
        }, {
            withCredentials: true
        }).then((response) => {
            productDataList()
            setLoding(false)
        })
            .catch((err) => {

            })
    }

    const handleCheckout = (e) => {
        e.preventDefault();
        axios.get(`${url}/cart/checkout`, {
            withCredentials: true
        })
            .then((res) => {
                router?.push(`/checkout`)
            })
            .catch((err) => {
                setErrorDate(err?.response?.data);
            })
    }

    const deleteProduct = (id) => {
        axios.get(`${url}/cart/delete/${id}`)
            .then((respose) => {
                productDataList()
            })
            .catch((err) => {
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

        cartToatal()
        dateList()

    }, [qty])
    return (
        <>
            <Header />
            <CartBanner />
            {
                productData?.length != 0 ? (
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
                                                            productData?.map((item) => (
                                                                <Fragment key={item._id}>
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
                                                                                        item?.Produt?.map((item1, index) => (
                                                                                            <Fragment key={index}>
                                                                                                <h6 style={{ color: "green", listStyle: "none ", fontSize: "23px", textTransform: "capitalize" }}>{item1.product_name}</h6>
                                                                                                <ul>
                                                                                                    <li>year {item1.year}</li>
                                                                                                    <li> Make {item1.make}</li>
                                                                                                    <li> Model {item1.model}</li>
                                                                                                    <li> Body {item1.body}</li>
                                                                                                </ul>
                                                                                            </Fragment>
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
                                                                                    disabled
                                                                                />
                                                                                <span className='input-group-btn' style={{ border: "solid 1px", borderRadius: "0" }}>
                                                                                    <button className='btn btn-default minus' id="" type="button" onClick={() => updateproduct(item._id, item.quantity + 1)}>
                                                                                        <span className='fa fa-plus'>
                                                                                        </span>
                                                                                    </button>
                                                                                </span>
                                                                            </div>
                                                                            <span>
                                                                                <button type="button" style={{ border: "none" }} onClick={() => deleteProduct(item._id)}>
                                                                                    <i className='fa fa-times-circle text-danger fa-lg' style={{ marginLeft: "58px" }}>

                                                                                    </i>
                                                                                </button>
                                                                            </span>
                                                                        </td>
                                                                        <td>${item.price}</td>
                                                                        <td>${item.total}</td>
                                                                    </tr>
                                                                </Fragment>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </form>
                                        </div>
                                        <div className={styles['coupon-wrap']} id="coupon">
                                            <form>
                                                <input type="text" className={`${styles['form-control']}`} name="coupon" value={coupon} placeholder="Enter your coupon here" onChange={(e) => setCoupon(e.target.value)} />
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
                                                                    date.map((item, index) => {
                                                                        if (item.day == dDate) {
                                                                            return (<Fragment key={item.day}>
                                                                                <li className='delivery-day-box-dev' style={{ border: "4px solid #94b361" }} onClick={() => deliveryDate(item)}>
                                                                                    <span className='check'>
                                                                                        <i className='fa fa-check'></i>
                                                                                    </span>
                                                                                    <div className={styles['delivery-date']}>
                                                                                        {item.day}
                                                                                        <span>{item.monthName} {item.year}</span>
                                                                                        <span >{item.dayName}</span>
                                                                                    </div>
                                                                                    {item.Delivery_fee.map((item) => (
                                                                                        <Fragment key={item.text}>
                                                                                            <div className={styles.delivery_price}>{item.text}</div>
                                                                                        </Fragment>
                                                                                    ))
                                                                                    }
                                                                                </li>
                                                                            </Fragment>
                                                                            )
                                                                        } else {
                                                                            return (<Fragment key={item.day}>
                                                                                <li className='delivery-day-box-dev' onClick={() => deliveryDate(item)}>
                                                                                    <span className='check'>
                                                                                        <i className='fa fa-check'></i>
                                                                                    </span>
                                                                                    <div className={styles['delivery-date']}>
                                                                                        {item.day}
                                                                                        <span>{item.monthName} {item.year}</span>
                                                                                        <span >{item.dayName}</span>
                                                                                    </div>
                                                                                    {item.Delivery_fee.map((item) => (
                                                                                        <Fragment key={item.text}>
                                                                                            <div className={styles.delivery_price}>{item.text}</div>
                                                                                        </Fragment>
                                                                                    ))
                                                                                    }
                                                                                </li>
                                                                            </Fragment>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                        {Object.keys(deliverydate)?.length !== 0 && (
                                                            <div className={styles.guaranteeBox}>
                                                                <i className='fa fa-check-cirle'></i>
                                                                We Guarantee Products to be Delivered On:
                                                                <strong id="guaranteed-delivery-date-span">{deliverydate.dayName} {deliverydate.monthName} {deliverydate.day} {deliverydate.year}</strong>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div id="ship-wraning"></div>
                                                    <div className='clearfix'>
                                                        <h5 style={{ color: "red" }}>{errorDate}</h5>
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
                                                                <tr>
                                                                    <td>
                                                                        <h6 style={{ fontWeight: "bold" }}>
                                                                            Sub-total
                                                                        </h6>
                                                                    </td>
                                                                    <td>${cartToral?.sub_total?.value}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <h6 style={{ fontWeight: "bold" }}>
                                                                            {cartToral?.shipping?.text}
                                                                            <br></br>
                                                                        </h6>
                                                                    </td>
                                                                    <td>
                                                                        {(typeof cartToral?.shipping?.value == "string") ? (<h5>{cartToral?.shipping?.value}</h5>) : (<h5>{cartToral?.shipping?.value}</h5>)}

                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <h6 style={{ fontWeight: "bold" }}>
                                                                            Coupon({cartToral?.coupon?.text})
                                                                            <br></br>
                                                                        </h6>
                                                                    </td>
                                                                    <td>
                                                                        ${cartToral?.coupon?.value}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <b>Total</b>
                                                                    </td>
                                                                    <td>
                                                                        ${cartToral?.Total?.value}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <div className={styles['entry-footer']}>
                                                            <Link href="/" className={styles['btn-grey']}>Continue Shopping</Link>
                                                            <button className={styles['btn-blue']} onClick={handleCheckout}>
                                                                Checkout &nbsp;
                                                            </button>
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
                ) : (
                    <section className={`${styles['page-content']} ${styles['single-wrapper']}`}>
                        <div className='container'>
                            <div className={`${styles['inner-wrap']}`}>
                                <nav>
                                    <ol>
                                        <Link href="/">Home</Link>/
                                        <Link href="/cart">Shopping cart</Link>
                                    </ol>
                                </nav>
                                <div>
                                    <h1>Shopping Cart</h1>
                                    <h6>Your shopping cart is empty!</h6>
                                    <Link href="/">
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            <Footer />
        </>
    )
}

export default Cart

