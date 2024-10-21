import React from 'react'
import { NavSearch } from '../search/ui/NavSearch'
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Container } from './ui/Container';

const pageConfiguration = async () => {
    const session = await auth();
    if (!session) {
        return redirect('/auth/signin');
    }

    console.log(session, '👀👀')
    return (
        <div className='flex flex-col justify-center items-center gap-2 '>
            <NavSearch session={session} />
            {/* container */}
            <h2 className='text-3xl'>
                Bienvenido a Configuración
            </h2>

            <Container />



        </div>
    )
}

export default pageConfiguration