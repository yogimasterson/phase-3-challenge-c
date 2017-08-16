const { 
	listAllGuests, listAllRooms, listAvailableRooms, listUpcomingBookings, listBookingsPerRoom 
} = require('./database/database.js')

const command = process.argv[2]
const secondaryCommand = process.argv[3]

if (command === 'guests') {
	listAllGuests()
		.then((data) => {
			console.log('|----+-----------------------+--------------------------------|')
			console.log('| ID | Guest Name            | Email                          |')
			console.log('|----+-----------------------+--------------------------------|')
			data.forEach((guest) => {
				console.log('|  ' + guest.id + ' | ' + guest.name + ' | ' + guest.email + ' |')
			})
			console.log('|----+-----------------------+--------------------------------|')
			process.exit(0)
		})
} else if (command === 'rooms' && secondaryCommand == undefined) {
	listAllRooms()
		.then((data) => {
			console.log('|--------+----------+-----------|')
			console.log('| Room # | Capacity | Available |')
			console.log('|--------+----------+-----------|')
			data.forEach((room) => {
				console.log('| ' + room.number + '     | ' + room.capacity + '        | ' + room.available + '     |')
			})
			console.log('|--------+----------+-----------|')
			process.exit(0)
		})
} else if (command === 'rooms' && secondaryCommand === '--available') {
	listAvailableRooms()	
		.then((data) => {
			console.log('|--------+----------+-----------|')
			console.log('| Room # | Capacity | Available |')
			console.log('|--------+----------+-----------|')
			data.forEach((room) => {
				console.log('| ' + room.number + '     | ' + room.capacity + '        | ' + room.available + '     |')
			})
			console.log('|--------+----------+-----------|')
			process.exit(0)
		})
} else if (command === 'bookings' && secondaryCommand == undefined) {
	listUpcomingBookings()
		.then((data) => {
			console.log('|--------+--------------------+------------+-------------|')
			console.log('| Room # | Guest Name         | Check-In   | Check-Out   |')
			console.log('|--------+--------------------+------------+-------------|')
			data.forEach((booking) => {
				console.log('| ' + booking.number + '     | ' + booking.name + '        | ' + booking.check_in + '     |' + booking.check_out + ' |')
			})
			console.log('|--------+--------------------+------------+-------------|')
			process.exit(0)
		})
} else if (command === 'bookings' && secondaryCommand !== undefined) {
	listBookingsPerRoom('3B')
		.then((data) => {
			console.log('|--------+--------------------+------------+-------------|')
			console.log('| Room # | Guest Name         | Check-In   | Check-Out   |')
			console.log('|--------+--------------------+------------+-------------|')
			data.forEach((booking) => {
				console.log('| ' + booking.number + '     | ' + booking.name + '        | ' + booking.check_in + '     |' + booking.check_out + ' |')
			})
			console.log('|--------+--------------------+------------+-------------|')
			process.exit(0)
		})
} else {
	console.log('Please enter a valid command')
}