'use server'

export const getUserFromDb = async (username, password) => {
    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        const data = await response.json();

        if (response.ok) {
            return { success: true, message: data.message, data: data };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.log("error", error)
    }
}