'use server'
export const updateUserEstablecimiento = async (establecimiento, id_user) => {

    try {
        const url = "http://localhost:3000/api/users"
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ establecimiento, id_user })
        });
        const result = await response.json();

        if (response.ok) {
            return { success: true, data: result.data };
        } else {
            return { success: false, message: "error" };
        }


    } catch (error) {

        console.log(error.message);
    }
}

export const getUserId = async (id) => {
    try {
        const url = `http://localhost:3000/api/users?id=${id}`;
        const response = await fetch(url);
        const result = await response.json();

        if (response.ok) {
            return { success: true, data: result };
        } else {
            return { success: false, message: "error en el fetch" };
        }


    } catch (error) {

        console.log(error.message);
    }

}

