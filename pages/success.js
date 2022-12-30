import React, { useEffect } from 'react'
import axios from "axios"
import { useRouter } from 'next/router';

const success = () => {
    const router = useRouter()
    const paymentData = async () => {
        if (!router.isReady) return;
        console.log(router.query);
        try {
            const response = await axios.get(`http://localhost:5500/api/success?PayerID=${router.query.PayerID}&paymentId=${router.query.paymentId}`, {
                withCredentials: true
            })
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        console.log('i fire once');
        paymentData();
    }, [router.isReady])
    return (
        <div>
            hello
        </div >
    )
}

export default success
