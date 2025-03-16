'use client'

import { shareCard } from '@/actions/shareCard'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useRouter } from "next/navigation";
import Image from 'next/image'

export default function Share() {
    const params = useSearchParams()
    const router = useRouter()
    const shareslug = params.get('id')

    useEffect(() => {
        if (shareslug) {
            shareCard({ shareslug })
            router.push("/")
        }
    }, [router, shareslug])

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <Image src="/loading-screen-cat.gif" alt="Success" width={400} height={400} className='mx-auto ' />
            <p>You&apos;ve got a new contact!</p>
        </div>
    )
}