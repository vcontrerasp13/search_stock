'use server'
export const getArticulo = async () => {
    try {
        const url = "http://localhost:3000/api/articulo"
        const response = await fetch(url);
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

