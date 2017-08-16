const promise = require('bluebird')

const options = {
	promiseLib: promise
}

const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/hotel'
const db = pgp(connectionString)

const listAllGuests = () => {
	return db.any('SELECT * FROM guests')
}

const listAllRooms = () => {
	return db.any('SELECT rooms.number, rooms.capacity, rooms.available FROM bookings LEFT JOIN rooms ON rooms.id = bookings.room_id GROUP BY rooms.number, rooms.capacity, rooms.available ORDER BY rooms.number ASC')
}

const listAvailableRooms = () => {
	return db.any('SELECT rooms.number, rooms.capacity, CASE WHEN bookings.check_in <= current_date AND current_date <= bookings.check_out THEN false ELSE true END AS available FROM rooms, bookings WHERE AVAILABLE = TRUE AND rooms.id = bookings.room_id')
}

const listUpcomingBookings = () => {
	return db.any('SELECT rooms.number, guests.name, bookings.check_in, bookings.check_out FROM rooms, guests, bookings WHERE rooms.id = bookings.room_id AND guests.id = bookings.guest_id AND bookings.check_out > CURRENT_DATE ORDER BY check_in')
}

const listBookingsPerRoom = (room) => {
	return db.any('SELECT rooms.number, guests.name, bookings.check_in, bookings.check_out FROM rooms, guests, bookings WHERE rooms.number = $1 AND rooms.id = bookings.room_id AND guests.id = bookings.guest_id AND bookings.check_out > current_date ORDER BY check_in', room)
}

module.exports = { listAllGuests, listAllRooms, listAvailableRooms, listUpcomingBookings, listBookingsPerRoom }