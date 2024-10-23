'use client'

import MultiSelect from "./MultiSelect";
import { toast } from "sonner";

export const ModalMantenimiento = ({ handleCloseModal, handleSave }) => {
    const options = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'];



    return (
        <dialog id="modal_user" className={`modal `} >
            <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="text-3xl">Nuevo Usuario</h3>
                <form action="" className="flex  flex-col gap-4 mt-4" onSubmit={(e) => handleSave(e)}>

                    <label className="input input-bordered flex items-center gap-2">
                        Usuario
                        <input type="text" className="grow" placeholder="John Doe" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Contraseña
                        <input type="password" className="grow" placeholder="*******" />
                    </label>




                    <div className="flex gap-4">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Tipo Doc</span>

                            </div>
                            <select className="select select-bordered">
                                <option>DNI</option>
                                <option>CEDULA</option>
                                <option>PASAPORTE</option>
                                <option>CARNET DE EXTRANJERIA</option>
                            </select>

                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Nro Doc.</span>
                            </div>
                            <input type="text" placeholder="12345678" className="input input-bordered w-full max-w-xs" />

                        </label>

                    </div>

                    {/* Establecimientos */}


                    <MultiSelect options={options} />

                    <div className="w-full flex gap-4  flex-row-reverse">
                        <button className="btn btn-primary text-primary-content" type="submit">Agregar</button>
                        <button className="btn" type="button" onClick={handleCloseModal} >Cerrar</button>
                    </div>
                </form>
            </div>
        </dialog>
    )
};
