"use client";

import { userStore } from "@/store/userStore";
import React from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import { RiDeleteBinLine } from "react-icons/ri";
import { RiLockPasswordLine } from "react-icons/ri";

export const TableUser = ({ handleEdit, handleDelete }) => {
  const userList = userStore((state) => state.userList);

  console.log(userList, "💸");

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Estado </th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {/* row 4 */}
          {userList.map((user, i) => (
            <tr key={user.id}>
              <th>{i + 1}</th>
              <td>{user.user_name}</td>
              <td>{user.id_rol}</td>
              <td>{user.status ? "🟢 Activo" : "🔴 Inactivo"}</td>

              <td className="flex justify-center items-center gap-2">
                <LiaUserEditSolid
                  size={20}
                  className="text-warning cursor-pointer"
                  title="Editar"
                  onClick={() => handleEdit(user.id)}
                />
                <RiDeleteBinLine
                  size={20}
                  className="text-red-400 cursor-pointer"
                  title="Eliminar"
                  onClick={() => handleDelete(user.id)}
                />
                <RiLockPasswordLine
                  size={20}
                  className="text-blue-400 cursor-pointer"
                  title="Resetear Contraseña"
                  onClick={() => handleReset(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
