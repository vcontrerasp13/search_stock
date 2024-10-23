import React from 'react'
import { NavSearch } from '../search/ui/NavSearch'
import { auth } from '@/auth'
import { redirect } from 'next/dist/server/api-utils';
import { Container } from './ui/Container';

const pageMantenimientoUser = async () => {
    const session = await auth();

    if (!session) {
        redirect('/auth/signin')
    }

    return (
        <div>
            <NavSearch session={session} />


            <Container />
        </div>
    )
}

export default pageMantenimientoUser