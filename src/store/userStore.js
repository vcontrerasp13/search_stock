import { createUser, getAllUsers, getUserId, updateUserEstablecimiento } from '@/actions/user/userAction';
import { create } from 'zustand'

export const userStore = create((set) => ({
    userList: [],
    user: [],
    establec_access: [],
    establec_current: '',
    setDataUser: async (id) => {
        try {
            const response = await getUserId(id)
            // console.log({ id, response.data }, '🟢🟢');
            set({ user: response.data.user });
            set({ establec_access: response.data.establec_access });
            set({ establec_current: response.data.user.id_establec_current });

        } catch (error) {
            console.log(error)
        }
    },
    setUserEstablec: async (establecimiento, id_user) => {
        try {
            const userEstablec = await updateUserEstablecimiento(establecimiento, id_user);
            set({ establec_current: userEstablec.establec })

        } catch (error) {
            console.log(error);
        }
    },
    showUsers: async () => {
        try {
            const response = await getAllUsers();
            set({ userList: response.data.user })

            return response;
        } catch (error) {
            console.log(error);
        }
    },
    createUser: async (data) => {
        try {
            const response = await createUser(data)

        } catch (error) {

        }
    }
}))
