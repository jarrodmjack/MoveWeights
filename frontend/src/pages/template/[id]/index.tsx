import Layout from "@/components/layout/Layout"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

const index = () => {
	const router = useRouter()

    
    useEffect(() => {
        // Fetch for template by id
    }, [router])

	return <Layout>template by id</Layout>
}

export default index
