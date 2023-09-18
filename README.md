# React Weather App
## [Free Code Camp Project](https://www.youtube.com/watch?v=Reny0cTTv24&t=1s)

Built using ReactJS 18, Tailwind CSS and Sass, this project aims to compete with real weather forecast websites! Mobile friendly and fully responsive.


### Location and Weather API's
This project uses two different API's to fetch location and weather data, [GeoDB](https://rapidapi.com/wirefreethought/api/geodb-cities) and [OpenWeather](https://openweathermap.org/api).
For both API's a react hook was created, to encapsulate all the data preparation and fetch logic (fetch methods, type cheking, etc), private keys are required to make requests, and those were added via environment variables. This not only protects the public key, but also makes the hook reusable for any other project (using any other key).

