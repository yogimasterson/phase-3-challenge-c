const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.get('/api/shout/:word', (req, res) => {
	let input = req.params.word
	let response = input.toUpperCase() + '!!!'
	res.send(response)
})

app.post('/api/array/merge', (req, res) => {
	const a = req.body.a
	const b = req.body.b
	const c = []

	if (Array.isArray(a) === true && Array.isArray(b) === true) {
		for (let i in a) {
			c.push(a[i], b[i])
		}
		res.send({
			"result": c
		})
	} else {
		res.status(400).send({
			"error": "Both keys in request body must be of type Array."
		})
	}
})

app.listen(3000, () => {
	console.log('App is listening on port 3000!')
})