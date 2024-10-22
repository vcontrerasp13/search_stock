import { userStore } from '@/store/userStore'
import React from 'react'

export const SelectEstablecimiento = () => {
const establecimientos=userStore(state=>state.user)

    return (
        <select className="select select-bordered w-full" value="">
            {

                establecimientos.map((e) => (
                    <option key={e.id} value={e.id}>{e.name}</option>
                ))
            }

        </select>
    )
}
