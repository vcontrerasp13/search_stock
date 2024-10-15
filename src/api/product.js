export const getProduct = async ( ItemCode = "", wshCode = "") => {

    let url = `http://192.168.0.244:8060/api/Articulo/ConsultarStock?ItemCode=${ItemCode}&WshCode=${wshCode}`
    let result;
    try {
        const product = await fetch(url);
        const data = await product.json();
        result = data;
    } catch (error) {
        console.log(error.message);
        result = error.message;

    }

    return result;
}