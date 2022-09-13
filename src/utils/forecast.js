const request = require('request')

const forecast = (lat, lon, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=1460e525771e775fbdef82bd7b0bcd92&query='+ lat +','+ lon +'&units=f'
    request({url: url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.error) {
            callback('un', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently degrees " + 
            body.current.temperature + ". It feels like " + 
            body.current.feelslike + ". The humidity is at " + 
            body.current.humidity + "%.")
        }
    })
}

module.exports = forecast