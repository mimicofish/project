async function getWeather(cityName) {
    const response = await fetch(`/weather/${cityName}`);

    if (!response.ok) {
        const error = new Error('City not found');

        error.status = response.status;

        throw error;
    }

    return await response.json();
}

export { getWeather };