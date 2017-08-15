const promise = require('bluebird')

const options = {
	promiseLib: promise
}

const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/hotel'
const db = pgp(connectionString)

const command = process.argv[2]
const available = process.argv[3]

const today = new Date().toJSON().slice(0,10)

const updateAvailability = () => {
	console.log(today)
	return db.none('INSERT INTO rooms(available) VALUES(true) WHERE check_in <= $1 and check_out >= $1', today)
	.then(() => {
		console.log('we did it')
	})
}

updateAvailability()

if (command === 'guests') {
	const guests = () => {
		return db.manyOrNone('SELECT * FROM guests')
		.then((data) => {
			console.log('|----+-----------------------+--------------------------------|')
			console.log('| ID | Guest Name            | Email                          |')
			console.log('|----+-----------------------+--------------------------------|')
			data.forEach((guest) => {
				console.log('|  ' + guest.id + ' | ' + guest.name + ' | ' + guest.email + ' |')
			})
			console.log('|----+-----------------------+--------------------------------|')
		})
	}
	guests()
	.then(() => {
		process.exit(0)
	})
} else if (command === 'rooms' && available == undefined) {
	const rooms = () => {
		return db.any('SELECT * FROM rooms')
		.then((data) => {
			console.log('|--------+----------+-----------|')
			console.log('| Room # | Capacity | Available |')
			console.log('|--------+----------+-----------|')
			data.forEach((room) => {
				console.log('| ' + room.number + '     | ' + room.capacity + '        | ' + room.available + '     |')
			})
			console.log('|--------+----------+-----------|')
		})
	}
	rooms()
	.then(() => {
		process.exit(0)
	})
} else if (command === 'rows' && available === '--available') {
	// const availableRooms = () => {
	// 	return db.any
	// }
}