import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useRouter } from 'next/router';
import Link from 'next/link'

const success = () => {
    const router = useRouter()
    const [dataOrder, setOrderData] = useState({})
    const paymentData = async () => {
        // if (!router.isReady) return;
        if (router.query.PayerID && router.query.paymentId) {
            try {
                const response = await axios.get(`http://localhost:5500/api/success?PayerID=${router.query.PayerID}&paymentId=${router.query.paymentId}`, {
                    withCredentials: true
                })
                console.log(response?.data?.result?.data);
                setOrderData(response?.data?.result?.data)
            } catch (error) {
                console.log(error);
            }
        }
    }
    useEffect(() => {
        paymentData();
    }, [router.query.PayerID, router.query.paymentId])

    return (
        <div>
            <section className="page-content single-wrapper">
                <div className="container">
                    <div className="inner-wrap" style={{ backgroundColor: "#fff" }}>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="https://www.carcoversfactory.com/">Home</a></li>
                                <li className="breadcrumb-item"><a href="https://www.carcoversfactory.com/cart?gcart=">Shopping Cart</a></li>
                                <li className="breadcrumb-item"><a href="https://www.carcoversfactory.com/checkout">Checkout</a></li>
                                <li className="breadcrumb-item"><a href="https://www.carcoversfactory.com/checkout-success">Success</a></li>
                            </ol>
                        </nav>

                        <div id="content">
                            <h1>Your Order Has Been Processed!</h1>
                            <div className="holder">
                                <div style={{ "fontsize": "12px", color: "#000000" }}>
                                    <div style={{ width: "680px", margin: "0 auto" }} className="receipt-table">
                                        <p style={{ marginTop: "0px", marginBottom: "20px", fontWeight: "bold", fontSize: "14px" }}>Thank you for your interest in CarCoversFactory.com products. A tracking number will be emailed to you once it has been generated.</p>
                                        <table style={{ borderCollapse: "collapse", width: "100%", borderTop: "1px solid #DDDDDD", borderLeft: "1px solid #DDDDDD", marginBottom: "20px" }}>
                                            <thead>
                                                <tr>
                                                    <td style={{ "fontSize": "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", backgroundColor: "#EFEFEF", fontWeight: "bold", textAlign: "left", padding: "7px", color: "#222222" }} colSpan="2">Order Details</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={{ fontSize: "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", textAlign: "left", padding: "7px" }}><b>Order ID:</b> {dataOrder?._id}<br />
                                                        <b>Date Added:</b> {dataOrder?.Date}<br />
                                                        <b>Payment Method:</b> {dataOrder?.payment_method}<br />
                                                        <b>Delivery Date:</b> {dataOrder?.delivery_date}<br />
                                                    </td>
                                                    {
                                                        dataOrder?.billing_address?.map((item) => (
                                                            <td style={{ fontSize: "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", textAlign: "left", padding: "7px" }}><b>Email:</b> {item?.e_mail}<br />
                                                                <b>Telephone:</b> {item?.phone}<br />
                                                            </td>
                                                        ))
                                                    }
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table style={{ borderCollapse: "collapse", width: "100%", borderTop: "1px solid #DDDDDD", borderLeft: "1px solid #DDDDDD", marginBottom: "20px" }}>
                                            <thead>
                                                <tr>
                                                    <td style={{ "fontSize": "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", backgroundColor: "#EFEFEF", fontWeight: "bold", textAlign: "left", padding: "7px", color: "#222222" }}>Instructions</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={{ fontSize: "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", textAlign: "left", padding: "7px" }}><b>Make Payable To: </b><br />ASA Brands Inc<br /><br /><b>Send To: </b><br />4000 Greenbriar Dr<br />Ste 200<br />Stafford, TX 77477<br /><br />Your order will not ship until we receive payment.<br /></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table style={{ borderCollapse: "collapse", width: "100%", borderTop: "1px solid #DDDDDD", borderLeft: "1px solid #DDDDDD", marginBottom: "20px" }}>
                                            <thead>
                                                <tr>
                                                    <td style={{ "fontSize": "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", backgroundColor: "#EFEFEF", fontWeight: "bold", textAlign: "left", padding: "7px", color: "#222222" }}>Billing Address</td>
                                                    <td style={{ "fontSize": "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", backgroundColor: "#EFEFEF", fontWeight: "bold", textAlign: "left", padding: "7px", color: "#222222" }}>Shipping Address</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={{ fontSize: "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", textAlign: "left", padding: "7px" }}>
                                                        {
                                                            dataOrder?.shipping_address?.map((item) => (
                                                                <>
                                                                    {item?.first_name}{item?.last_name}<br /> {item?.company_name}<br /> Address1 address2<br /> {item?.city}<br />{item?.postal_code}<br />{item?.state}<br />{item?.country}
                                                                </>
                                                            ))

                                                        }
                                                    </td>
                                                    <td style={{ fontSize: "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", textAlign: "left", padding: "7px" }}>
                                                        {
                                                            dataOrder?.billing_address?.map((item) => (
                                                                <>
                                                                    {item?.first_name} {item?.last_name} <br />{item?.company_name}  <br />Address1  address2 <br />{item?.city}<br />{item?.postal_code}<br />{item?.state}<br />{item?.country}
                                                                </>
                                                            ))

                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table style={{ borderCollapse: "collapse", width: "100%", borderTop: "1px solid #DDDDDD", borderLeft: "1px solid #DDDDDD", marginBottom: "20px" }}>
                                            <thead>
                                                <tr>
                                                    <td style={{ "fontSize": "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", backgroundColor: "#EFEFEF", fontWeight: "bold", textAlign: "left", padding: "7px", color: "#222222" }}>Product</td>
                                                    <td style={{ "fontSize": "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", backgroundColor: "#EFEFEF", fontWeight: "bold", textAlign: "left", padding: "7px", color: "#222222" }}>Model</td>
                                                    <td style={{ fontSize: "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", backgroundColor: "#EFEFEF", fontWeight: "bold", textAlign: "right", padding: "7px", color: "#222222" }}>Quantity</td>
                                                    <td style={{ fontSize: "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", backgroundColor: "#EFEFEF", fontWeight: "bold", textAlign: "right", padding: "7px", color: "#222222" }}>Price</td>
                                                    <td style={{ fontSize: "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", backgroundColor: "#EFEFEF", fontWeight: "bold", textAlign: "right", padding: "7px", color: "#222222" }}>Total</td>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    dataOrder?.products?.map((item) => (
                                                        <tr>
                                                            {
                                                                item?.Produt?.map((item1) => (

                                                                    <td style={{ fontSize: "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", textAlign: "left", padding: "7px" }}>{item1?.product_name} <br />
                                                                        &nbsp;<small> - Year: {item1?.year}</small>
                                                                        <br />
                                                                        &nbsp;<small> - Make: {item1?.make}</small>
                                                                        <br />
                                                                        &nbsp;<small> - Model: {item1?.model}</small>
                                                                        <br />
                                                                        &nbsp;<small> - Body: {item1?.body}</small>
                                                                    </td>
                                                                ))
                                                            }
                                                            <td style={{ fontSize: "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", textAlign: "left", padding: "7px" }}>{item?.model}</td>
                                                            <td style={{ fontSize: "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", textAlign: "right", padding: "7px" }}>{item?.quantity}</td>
                                                            <td style={{ fontSize: "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", textAlign: "right", padding: "7px" }}>${item?.price}</td>
                                                            <td style={{ fontSize: "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", textAlign: "right", padding: "7px" }}>${item?.total}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                            <tfoot>
                                                {
                                                    dataOrder?.total?.map((item) => (
                                                        <>
                                                            <tr>
                                                                <td style={{ fontSize: "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", textAlign: "right", padding: "7px", colSpan: "4" }} ><b>Sub-Total:</b></td>
                                                                <td style={{ fontSize: "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", textAlign: "right", padding: "7px" }}>${item?.sub_total?.value}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ fontSize: "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", textAlign: "right", padding: "7px" }}><b>{item?.shipping?.text}</b></td>
                                                                <td style={{ fontSize: "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", textAlign: "right", padding: "7px" }}>${item?.shipping?.value}</td>
                                                            </tr>
                                                        </>
                                                    ))
                                                }
                                                <tr>
                                                    <td style={{ fontSize: "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", textAlign: "right", padding: "7px", colSpan: "4" }} ><b>Total:</b></td>
                                                    <td style={{ fontSize: "12px", borderRight: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", textAlign: "right", padding: "7px" }}>${dataOrder?.total_price}</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>

                                <p>Your order has been successfully processed!</p><p>Thanks for shopping with us online!</p>

                                <div className="buttons">
                                    <div className="right">
                                        <Link href="/" className="btn btn-warning text-white">
                                            Continue Shopping
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default success
