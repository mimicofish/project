async function getWeather(cityName) {
    const response = await fetch(`/weather/${cityName}`);

    if (!response.ok) {
        throw new Error('City not found');
    }

    return await response.json();
}

export { getWeather };