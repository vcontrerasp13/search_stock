'use client'
import { EstablecimientoItem } from '@/components/search/establecimientoItem'
import { Loader } from '@/components/ui/Loader'
import { establecimientoStore } from '@/store/establecimientoStore'
import React, { useEffect, useState } from 'react'

export const Container = () => {
    const setEstablecimientos = establecimientoStore(state => state.setEstablecimientos);
    const establecimientos = establecimientoStore(state => state.establecimientos);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setEstablecimientos()
        setLoading(false);
    }, [])


    return (
        <div className='flex flex-col gap-2 p-4'>
            <h2 className="text-3xl">Seleccionar Establecimiento</h2>
            {
                loading
                    ? (<Loader />)
                    : (establecimientos.map(e => <EstablecimientoItem e={e} key={e.id} />))
            }
        </div>
    )
}
