'use client'
import { userStore } from '@/store/userStore'
import React from 'react'

export const SelectEstablecimiento = () => {
    const user = userStore(state => state.user)
    console.log(user)
    return (
        <select className="select select-bordered w-full" value="">
            {

                user.establecimientos.map((e) => (
                    <option key={e.id} value={e.id}>{e.name}</option>
                ))
            }

        </select>
    )
}
