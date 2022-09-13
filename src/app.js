const express = require('express')
const path = require('path')
const viewsPath = path.join(__dirname, '../views/views')
const partialsPath = path.join(__dirname, '../views/partials')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// Define paths for express config
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Azw'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Azw'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message:'obrigado siuuuu',
        name: 'Azw'
    })
})

app.get('/weather', (req,res) => {
    
    if(!req.query.address){
        return res.send({
            error: 'Must provide a location'
        })
    }


    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    
        if(error){
            return res.send({ error })
        }
        
    
        forecast(longitude, latitude, (error, forecastData) => {
            
            if(error){
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    
    })

    
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Azw',
        errorMessage: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Azw',
        errorMessage: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is running on 3000')
})