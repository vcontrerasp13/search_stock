'use client'
import { Loader } from '@/components/ui/Loader'
import { userStore } from '@/store/userStore'
import React from 'react'

export const SelectEstablecimiento = ({ register, errors, establecCurrent, setEstablecCurrent }) => {
    const establec_access = userStore(state => state.establec_access);

    console.log(establecCurrent, '🟢')
    return (
        <>
            <label className="form-control w-full ">
                <div className="label">
                    <span className="label-text">Establecimiento:</span>
                </div>

                <select
                    className="select select-bordered w-full "
                    defaultValue={establecCurrent}
                    onChange={e => setEstablecCurrent(e.target.value)}
                    {...register("establecimiento", { required: true })}

                >
                    {establec_access?.map(e => (
                        <option value={e.id} key={e.id}>{e.nombre}</option>
                    ))}
                </select>

            </label >
        </>
    )
}
