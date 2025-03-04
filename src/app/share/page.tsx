'use client'

import { shareCard } from '@/actions/shareCard'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useRouter } from "next/navigation";
import Image from 'next/image'

export default function SearchBar() {
    const params = useSearchParams()
    const router = useRouter()
    const search = params.get('id')

    useEffect(() => {
        if (search) {
            const par = new URLSearchParams();
            shareCard({ shareid: search })
            par.set("status", "added-new-card");
            router.push(
                `/?${par.toString()}`)
        }
    }, [router, search])

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <Image src="/loading-screen-cat.gif" alt="Success" width={400} height={400} className='mx-auto ' />
            <p>You've got a new contact!</p>
        </div>
    )
}