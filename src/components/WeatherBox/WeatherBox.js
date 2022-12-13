import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = props => {

  const [weather, setWeather] = useState('');

  const handleCityChange = useCallback(e => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e}&appid=af4d14012a8f67a13e9dddb62cd091f3&units=metric`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const weatherData = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main
        };
        setWeather(weatherData);
      });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary {...weather} />
      <Loader />
    </section>
  )
};

export default WeatherBox;