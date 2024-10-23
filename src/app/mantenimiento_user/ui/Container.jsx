'use client'

import React, { useRef, useState } from 'react'
import { TableUser } from './TableUser'
import { IoIosSearch } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { ModalMantenimiento } from './ModalMantenimiento';
import { toast } from 'sonner';


export const Container = () => {

    const handleOpenModal = () => {

        document.getElementById('modal_user').showModal();
    }

    const handleCloseModal = () => {
        document.getElementById('modal_user').close();
    };


    const handleSave = (e) => {
        e.preventDefault();
        // enviar data a la BD


        // action=insert||update

        console.log("save")

    }


    const handleEdit = (id) => {
        console.log(id)
        handleOpenModal();



        // toast.success("Datos Actualizados con éxito");
    }

    const handleDelete = (id) => {

        console.log(id)
        toast.success("Usuario Eliminado con éxito");
    }

    return (
        <div className='p-4'>
            <h2 className='text-3xl'>Mantenimiento de usarios</h2>

            <div className="flex gap-2 w-full my-4">
                <label className="input  input-bordered flex items-center gap-2 w-full">
                    <input type="text" className="grow block" placeholder="Search" />
                    <IoIosSearch size={25} />
                </label>
                <button className='btn btn-primary text-primary-content' onClick={handleOpenModal} ><CiCirclePlus size={25} />Nuevo</button>
            </div>

            {/* TAble */}
            <TableUser handleDelete={handleDelete} handleEdit={handleEdit} />

            {/* Modal */}
            <ModalMantenimiento handleCloseModal={handleCloseModal} handleSave={handleSave} />
        </div>
    )
}
