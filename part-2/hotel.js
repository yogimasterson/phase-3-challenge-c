const promise = require('bluebird')

const options = {
	promiseLib: promise
}

const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/hotel'
const db = pgp(connectionString)

function guests() {
	return db.manyOrNone('SELECT * FROM guests')
}