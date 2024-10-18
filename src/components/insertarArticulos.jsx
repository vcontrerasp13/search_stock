'use client'
import { articulos } from "../../utils/data-articulo";

export const InsertArticulosButton = () => {

    const handleInsertArticulos = async () => {

        try {
            const response = await fetch('api/articulo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ articulos }),
            });

            const result = await response.json();

            if (result.success) {
                console.log("Artículos insertados:", result.data);
            } else {
                console.error("Error:", result.error);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };



    return <button onClick={handleInsertArticulos} className="btn btn-danger" >Insertar Artículos {articulos.length}</button>;
};

