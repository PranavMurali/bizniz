'use client'

import { shareCard } from '@/actions/shareCard'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useRouter } from "next/navigation";
import Image from 'next/image'
import { enqueueSnackbar } from 'notistack';

export default function Share() {
    const params = useSearchParams()
    const router = useRouter()
    const shareslug = params.get('id')

    useEffect(() => {
        async function handleShare() {
            if (shareslug) {
                try {
                    await shareCard({ shareslug })
                    enqueueSnackbar("Contact Added!", {
                        variant: "error",
                        autoHideDuration: 2000,
                    })
                }
                catch (error) {
                    enqueueSnackbar("Error getting card", {
                        variant: "error",
                        autoHideDuration: 2000,
                    })
                }
                router.push("/")
            }
        }
        handleShare()
    }, [router, shareslug])

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <Image src="/loading-screen-cat.gif" alt="Success" width={400} height={400} className='mx-auto ' />
            <p>You&apos;ve got a new contact!</p>
        </div>
    )
}