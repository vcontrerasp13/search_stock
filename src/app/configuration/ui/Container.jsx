'use client'

import React, { useEffect, useState } from 'react'
import { SelectEstablecimiento } from './SelectEstablecimiento'
import { useForm } from 'react-hook-form'
import { userStore } from '@/store/userStore'
import { toast } from 'sonner'
import { updateUserEstablecimiento } from '@/actions/user/userAction'

export const Container = () => {

    const user = userStore(state => state.user);
    const establec_current = userStore(state => state.establec_current);
    const [establecCurrent, setEstablecCurrent] = useState(establec_current)
    const [loading, setLoading] = useState(false)
    console.log({ establec_current, establecCurrent }, '💀')

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: { establecimiento: establec_current }
    });

    // const handleSubmit = async () => {
    //     // cambiar establecimiento 
    //     try {
    //         setLoading(true);
    //         setEstablecCurrent(data.establecimiento)
    //         await updateUserEstablecimiento(establecCurrent, user.id_user)
    //         toast.success("Establecimiento cambiado");
    //     } catch (error) {
    //         // console.log(error.message)
    //         toast.error("Ocurrió un problema inesperado");
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    useEffect(() => {
        setValue('establecimiento', establec_current);
    }, [establec_current, setValue]);


    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await updateUserEstablecimiento(data.establecimiento, user.id_user);
            userStore.setState({ establec_current: data.establecimiento });
            toast.success("Establecimiento cambiado");
        } catch (error) {
            toast.error("Ocurrió un problema inesperado");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full">
            <h2 className='text-3xl text-center text-blue-500 font-bold'>Configuración</h2>
            <form className=' flex flex-col gap-4  w-full px-4' onSubmit={handleSubmit(onSubmit)} >
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Nombre:</span>
                    </div>
                    <input type="text" className="input input-bordered w-full " value={user?.username || ''} readOnly />
                </label>
                <SelectEstablecimiento register={register} errors={errors} establecCurrent={establecCurrent} setEstablecCurrent={setEstablecCurrent} />

                <button type='submit' className={`btn btn-primary btn-block text-primary-content ${loading ? 'loading' : ''}`} disabled={loading}>{loading ? 'Guardando...' : 'Guardar'}</button>
            </form>
        </div>
    )
}
