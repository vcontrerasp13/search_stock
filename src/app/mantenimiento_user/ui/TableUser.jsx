import React from 'react'
import { LiaUserEditSolid } from "react-icons/lia";
import { RiDeleteBinLine } from "react-icons/ri";
export const TableUser = ({ handleEdit, handleDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Usuario</th>
                        <th>Establecimiento </th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                        <th>2</th>
                        <td>Hart Hagerty</td>
                        <td>Desktop Support Technician</td>
                        <td>Purple</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                        <th>3</th>
                        <td>Brice Swyre</td>
                        <td>Tax Accountant</td>
                        <td>Red</td>
                    </tr>
                    {/* row 4 */}
                    <tr>
                        <th>4</th>
                        <td>Brice Swyre</td>
                        <td>Tax Accountant</td>
                        <td className='flex justify-center items-center gap-2'>
                            <LiaUserEditSolid size={20} className='text-warning cursor-pointer' title='Editar' onClick={() => handleEdit("4")} />
                            <RiDeleteBinLine size={20} className='text-red-400 cursor-pointer' title='Eliminar' onClick={() => handleDelete("4")} />

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
