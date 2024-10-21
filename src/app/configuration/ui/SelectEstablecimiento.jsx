'use client'
import { Loader } from '@/components/ui/Loader'
import { userStore } from '@/store/userStore'
import React, { useEffect, useState } from 'react'

export const SelectEstablecimiento = () => {

    const data_user = userStore(state => state.user)

    const [loading, setLoading] = useState(false);
    const [establec, setEstablec] = useState([]);

    useEffect(() => {
        setLoading(true);
        const user_establec = data_user.establecimientos;
        setEstablec(user_establec);
        setLoading(false);
    }, [data_user])


    return (
        <>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Establecimiento:</span>
                </div>

                {loading
                    ? (<Loader />)
                    : (<select className="select select-bordered w-full max-w-xs ">
                        {establec?.map(e => (

                            <option value={e.id} key={e.id}>{e.nombre}</option>
                        ))}
                    </select>)}

            </label>

        </>

    )
}
