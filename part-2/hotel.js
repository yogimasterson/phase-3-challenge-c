const promise = require('bluebird')

const options = {
	promiseLib: promise
}

const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/hotel'
const db = pgp(connectionString)

const command = process.argv[2]
const available = process.argv[3]

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
		return db.any('SELECT rooms.number, rooms.capacity, CASE WHEN s THEN false ELSE true END AS available FROM bookings JOIN rooms ON rooms.id = bookings.room_id')
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
} else if (command === 'rooms' && available === '--available') {
	const availableRooms = () => {
		return db.any('SELECT rooms.number, rooms.capacity, CASE WHEN bookings.check_in <= current_date AND current_date <= bookings.check_out THEN false ELSE true END AS available FROM rooms, bookings WHERE AVAILABLE = TRUE AND rooms.id = bookings.room_id')
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
	availableRooms()
	.then(() => {
		process.exit(0)
	})
} else if (command === 'bookings') {
	const upcomingBookings = () => {
		return db.any('SELECT rooms.number, guests.name, bookings.check_in, bookings.check_out FROM rooms, guests, bookings WHERE rooms.id = bookings.room_id AND guests.id = bookings.guest_id AND bookings.check_out > CURRENT_DATE ORDER BY check_in')
		.then((data) => {
			console.log('|--------+--------------------+------------+-------------|')
			console.log('| Room # | Guest Name         | Check-In   | Check-Out   |')
			console.log('|--------+--------------------+------------+-------------|')
			data.forEach((booking) => {
				console.log('| ' + booking.number + '     | ' + booking.name + '        | ' + booking.check_in + '     |' + booking.check_out + ' |')
			})
			console.log('|--------+--------------------+------------+-------------|')
		})
	}
	upcomingBookings()
	.then(() => {
		process.exit(0)
	})
}