'use client'
import { EstablecimientoItem } from '@/components/search/establecimientoItem'
import { establecimientoStore } from '@/store/establecimientoStore'
import React, { useEffect } from 'react'

export const Container = () => {
    const setEstablecimientos = establecimientoStore(state => state.setEstablecimientos);
    const establecimientos = establecimientoStore(state => state.establecimientos);

    useEffect(() => {
        setEstablecimientos()
    }, [])


    return (
        <div className='flex flex-col gap-2'>

            {establecimientos.map(e => <EstablecimientoItem e={e} key={e.id} />)}

        </div>
    )
}
