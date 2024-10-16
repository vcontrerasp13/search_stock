import { establecimientoAction } from '@/actions/establecimientoAction';
import { create } from 'zustand'

export const establecimientoStore = create((set) => ({
    establecimientos: [],
    setEstablecimientos: async () => {
        const establecimientos = await establecimientoAction();
        set({ establecimientos: establecimientos.data });
    }
}))
