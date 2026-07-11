function formatCity(city) {
    const normalizedCity = city.trim().toLowerCase();
    return normalizedCity.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') 
}

module.exports = {
    formatCity
};