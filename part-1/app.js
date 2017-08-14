const express = require('express')

const app = express()

app.get('/api/shout/:word', (req, res) => {
	let input = req.params.word
	let response = input.toUpperCase() + '!!!'
	res.send(response)
})

app.post('/api/array/merge', (req, res) => {
	
})

app.listen(3000, () => {
	console.log('App is listening on port 3000!')
})