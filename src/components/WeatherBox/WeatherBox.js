import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback, useState } from 'react';

const WeatherBox = props => {

  const [weather, setWeather] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback(e => {
    setError(false);
    setPending(true);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e}&appid=af4d14012a8f67a13e9dddb62cd091f3&units=metric`)
    .then(res => {
      if(res.status === 200) {
        return res.json()
          .then(data => {
            const weatherData = {
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].main
            };
            setPending(false); 
            setWeather(weatherData);
          })
      } else {
        setError(true);
      }
    })
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      { (weather && !pending) && <WeatherSummary {...weather} /> }
      { pending && !error && <Loader /> }
      { error && <ErrorBox /> }
    </section>
  )
};

export default WeatherBox;