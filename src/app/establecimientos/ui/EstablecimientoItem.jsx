import React from 'react'
import { HiOutlineMapPin } from 'react-icons/hi2'

export const EstablecimientoItem = (e) => {
    return (
        < div className="btn btn-block btn-secondary uppercase" >
            <HiOutlineMapPin />
            {e.nombre}
        </div>
    )
}
