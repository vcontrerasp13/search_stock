const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance; // Distancia en km
};


export const ordernarEstablecimientosDistancia = (establecimientos, origen) => {

    const establecimientos_sort = establecimientos.filter(e => e.lat && e.lon) // Filtra solo establecimientos con coordenadas
        .map(e => ({
            ...e, distancia: calculateDistance(origen.lat, origen.lon, parseFloat(e.lat), parseFloat(e.lon))
        })).sort((a, b) => a.distancia - b.distancia); // Ordena por distancia


    return establecimientos_sort.filter(e => e.distancia > 0)
}