const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express()
const movieID = require('./utils/similar')


const viewsPath = path.join(__dirname, '../templates/views');
const publicDirectoryPath = path.join(__dirname, '../public')
console.log(publicDirectoryPath);

app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.get('', (req, res) => {
    res.render('index')
})

app.get('/similar', (req, res) => {
    if (!req.query.movie) {
        return res.send({
            error: 'You must provide an movie!'
        })
    }
    movieID(req.query.movie, (err, data) => {
        if (err) {
            return res.send(err)
        } else {
            res.send(data);
        }
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})