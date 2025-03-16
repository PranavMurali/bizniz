'use client'

import { Suspense } from 'react';
import { RootLayoutProps } from '../layout';


export default function ShareLayout({ children }: Readonly<RootLayoutProps>) {
    return (
        <Suspense>
            {children}
        </Suspense>
    )
}