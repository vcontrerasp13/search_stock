'use server'

export const articuloAction = async (id, description, codeBars) => {
    const url = 'http://localhost:3000/api/articulo'

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, description, codeBars })
        })
        if (response.ok) {
            return { success: true, message: data.message, data: data.user };
        } else {
            return { success: false, message: data.message };
        }
    } catch (e) {
        console.log(error)
    }
}