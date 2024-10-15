import { create } from 'zustand'

export const userStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || {},
    setUser: (data) => {
        localStorage.setItem('user', JSON.stringify(data)); // Guardar en localStorage
        set({ user: data });
    }
}))
