import React from 'react'
import { useRouter } from "next/router"

const pageNo = () => {
    const router = useRouter();
    const pageno = router.query.pageNo
    console.log();

    return (
        <div>
            <h2>{pageno} key logic infotecth</h2>
        </div>
    )
}

export default pageNo
