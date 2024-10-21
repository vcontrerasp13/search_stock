'use client'

import React from 'react'
import { SelectEstablecimiento } from './SelectEstablecimiento'
import { useForm } from 'react-hook-form'

export const Container = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
    }


    return (
        <form className=' flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)} >
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Nombre:</span>
                </div>
                <input type="text"  className="input input-bordered w-full max-w-xs"  {...register("username", { required: true })} />

            </label>
            <SelectEstablecimiento />

            <button type='submit' className='btn btn-primary btn-block text-primary-content'>Guardar</button>
        </form>
    )
}
