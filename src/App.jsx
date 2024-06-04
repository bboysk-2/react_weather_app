// App.jsx

import Title from './components/Title.jsx'
import Form from './components/Form.jsx'
import Results from './components/Results.jsx'
import Loading from './components/Loading.jsx'
import { useState } from 'react'

const App = () => {
    const [city, setCity] = useState("")

    const [results, setResults] = useState({
        country: "",
        cityName: "",
        temperature: "",
        conditionText: "",
        icon: ""
    })

    const [loading, setLoading] = useState(false)

    const getWeather = (e) => {
        e.preventDefault()
        setLoading(true)
        fetch(`https://api.weatherapi.com/v1/current.json?key=bcdf1134aabc45829e5165118240306&q=${city}&aqi=no`)
        .then(res => res.json())
        .then(data => {
            setResults({
                country: data.location.country,
                cityName: data.location.name,
                temperature: data.current.temp_c,
                conditionText: data.current.condition.text,
                icon: data.current.condition.icon
            })
            setCity("")
            setLoading(false)
        })
        .catch(() => alert("エラーが発生しました。ページをリロードしてもう一度お試しください。"))
    }

  return (
      <div className='wrapper'>
          <div className='container'>
              <Title />
              <Form setCity={setCity} getWeather={getWeather} city={city}/>
              {loading ? <Loading /> : <Results  results={results}/>}
          </div>
      </div>
  )
}

export default App