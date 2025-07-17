async function getDashboardData(query) {
    try {
        // Eseguo tutte le fetch in parallelo
        const [destinationRes, weatherRes, airportRes] = await Promise.all([
            fetch(`http://localhost:3333/destinations?search=${query}`),
            fetch(`http://localhost:3333/weathers?search=${query}`),
            fetch(`http://localhost:3333/airports?search=${query}`)
        ]);

        // Converto tutte le risposte in JSON in parallelo
        const [destinations, weathers, airports] = await Promise.all([
            destinationRes.json(),
            weatherRes.json(),
            airportRes.json()
        ]);

        const place = destinations[0];
        const weather = weathers[0];
        const airport = airports[0];

        return {

            city: place ? place.name : null,
            country: place ? place.country : null,
            temperature: weather ? weather.temperature : null,
            weather: weather ? weather.weather_description : null,
            airport: airport ? airport.name : null
        };
    } catch (error) {
        console.error(error)
    }

}

getDashboardData('Dubai')
    .then(data => {
        let frase = '';
        if (data.city !== null && data.country !== null) {
            console.log('Dashboard data:', data);
            console.log(frase = `${data.city} is in ${data.country}.\n`)
        }
        if (data.temperature !== null && data.weather !== null) {
            console.log(frase = `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`)
        }
        if (data.airport !== null) {
            console.log(frase = `The main airport is ${data.airport}.\n`)
        }

    })
    .catch(error => console.error(error));
