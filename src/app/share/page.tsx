'use client'

import { shareCard } from '@/actions/shareCard'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function SearchBar() {
    const searchParams = useSearchParams()

    const search = searchParams.get('search')
    useEffect(() => {
        if (search) {
            shareCard({ shareid: search })
        }
    }, [search])
    return <>Search: {search}</>
}