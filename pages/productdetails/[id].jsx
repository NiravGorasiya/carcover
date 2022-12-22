import React from 'react'
import Productdetails from '../../component/productdetail/Productdetails'
import { useRouter } from 'next/router'

const productdetails = () => {
    const router = useRouter()
    const categoryid = router.query.id
    return (
        <>
            <Productdetails />
        </>
    )
}

export default productdetails
