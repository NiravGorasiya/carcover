import React from 'react'
import styles from "./Footer.module.css"

const Footer = () => {
    return (
        <>
            <footer className={styles["footer-wrapper"]}>
                <div className='container'>
                    <div className={styles['footer-top']}>
                        <div className='offset-md-2 col-md-4'>
                            <div className={styles["payment-card"]}>
                                <h4>Payment Options</h4>
                                <img src="https://d68my205fyswa.cloudfront.net/fit-in/380x39/ccf-2022082416614023805g0.png" className="img-fluid custom-lazy loaded" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={`${styles['subscribe-wrap']} text-center`}>
                                <h4>Exclusive offers</h4>
                                <form>
                                    <input type="email" placeholder="Email" className="form-control" id="exampleInputEmail" required />
                                    <input type="submit" value="sign up" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['widget-wrapper']}>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-4'>
                                <div className={styles['entry-widget']}>
                                    <h5 className={styles['widget-title']}>Car cover factory</h5>
                                    <p>
                                        At Car Covers Factory, we're proud to call ourselves an elite retailer in car covers. We offer some of the lowest  prices in the industry with top quality. Feel free to call us at (877) 300-9885 for any questions!
                                    </p>
                                </div>
                            </div>
                            <div className={`col-md-4 ${styles['border-1r']}`}>
                                <div className={styles['entry-widget']}>
                                    <h5 className={styles['widget-title']}>Customer care</h5>
                                    <ul className={styles['entry-lists']}>
                                        <li className={styles['entry-list']}>
                                            About us
                                        </li>
                                        <li className='entry-list'>
                                            Contact us
                                        </li>
                                        <li className='entry-list'>
                                            Returns
                                        </li>
                                        <li className='entry-list'>
                                            Site map
                                        </li>
                                        <li className='entry-list'>
                                            Privacy Policy
                                        </li>
                                        <li className='entry-list'>
                                            Terms  & Condition
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className={`${styles['entry-widget']} mb-3 mb-md-0`}>
                                    <h5 className={styles['widget-title']}>
                                        <li className={styles['contact-number']}>
                                            <p>(877) 300-9885</p>
                                        </li>
                                    </h5>
                                    <p>@ carcoversFactory.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </footer >
        </>
    )
}

export default Footer


