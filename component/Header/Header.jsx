import React from 'react'
import Link from 'next/link'
import styles from "./Header.module.css"


const Header = () => {
    return (
        <>
            <div className={styles["header-wrapper"]}>
                <div className={styles["head-top"]}>
                    TODAY ONLY:FREE 3 DAY DELIVERY &
                    <span className='d-inline-block'>&nbsp; GET AN ADDITIONAL 10%  OFF ON YOUR ORDER.</span>
                    <span className='d-inline-block'>&nbsp; Use Code&nbsp;
                        <span className={styles.tntbn}>save10</span>
                    </span>
                </div>
                <div className='container'>
                    <div className={styles['secondary-wrap']} >
                        <div className='row'>
                            <div className='col-md col-md-4 col-6'>
                                <div className={styles['logo-wrap']}>
                                    <Link href="/" className={styles['list-item']}>
                                        <img src='https://d68my205fyswa.cloudfront.net/ccf-static-b3sfpdizd7ql254o8opo6c7zrq4t1p22r7pdp3241zkzjkzahu0k5a.png' style={{ maxHeight: "74px", margin: "6px 0" }} title='carcoverfactory.com' alt='carcoverfactory.com' />
                                    </Link>
                                </div>
                            </div>
                            <div className='col-lg-8 col-md-8 col-6'>
                                <div className={styles['content-area']}>
                                    <ul className={styles['entry-list']}>
                                        <li className={styles['review-wrap']}>
                                            <Link href="/">
                                                <img src='https://d68my205fyswa.cloudfront.net/ccf-static-t28cj8b22momaqtquvmbkyct6czmpsprr06nja05hmknmr3kjgfimg.png' style={{ maxHeight: "70px", margin: "6px 1px" }} />
                                            </Link>
                                        </li>
                                        <li className={styles['review-wrap']}>
                                            <div className={styles['card-warp']}>
                                                <Link href="/cart" >
                                                    <img src='https://d68my205fyswa.cloudfront.net/ccf-static-12wteslcufpclziv6jsdnos8d9r4zhrvoy736jwr0dl8ewcrqv2fiv.png' alt='carcoverfactory' style={{ display: "block", maxHeight: "40px" }} />
                                                    cart
                                                </Link>
                                            </div>
                                        </li>
                                        <li className='d-sm-block d-md-none' style={{ marginTop: 15, marginRight: 10 }}>
                                            <Link href={"aasdfasd"} title="sg" className={styles['list-item']}>
                                                <i className='fa fa-phone fa-3x' aria-hidden={true}></i>
                                            </Link>
                                        </li>
                                        <li className={styles['review-wrap']}>
                                            <div className={styles['chat-wrap chat-top c-pointer mt-3']}>
                                                <img src='https://d68my205fyswa.cloudfront.net/ccf-static-2zoj4rjoefbk310rnqpmq137m9m40jtmc1hpdcnjj5h445a9ack8ea.png' alt="chatcover" style={{ height: "58px" }} />
                                            </div>
                                        </li>
                                        <li>
                                            <div className={styles['contact-wrap']}>
                                                <div className={styles['oder-first']}>
                                                    <i className='fa fa-phone'></i>
                                                    call us to order 24/7
                                                </div>
                                                <div className={styles['entry-phone']}>
                                                    <Link href="/">(877) 300-9885</Link>
                                                </div>
                                                <div className={styles['entry-small']}>
                                                    customer sevice
                                                    <Link href='/'>5063566110</Link>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Header
