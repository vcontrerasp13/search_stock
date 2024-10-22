import { getEstabecimiento } from '@/actions/establecimiento';
import { create } from 'zustand'

export const establecimientoStore = create((set) => ({
    establecimientos: [],
    setEstablecimientos: async () => {
        const establecimientos = await getEstabecimiento();
        set({ establecimientos: establecimientos.data });
    },
   
}))
