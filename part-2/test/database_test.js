const chai = require('chai')
const expect = chai.expect
const db = require('../database/database.js')

describe('listAllGuests()', () => {
	it('Should return all of the guest that are booked at the hotel', () => {
		return db.listAllGuests()
		.then((result) => {
			expect(result[0].name).to.equal('Aurthur Velti')
			expect(result[0].email).to.equal('avelti0@live.com')
			expect(result.length).to.eql(20)
		})
	})
})

describe('listAllRooms()', () => {
	it('Should list all of the rooms and their current availability', () => {
		return db.listAllRooms()
		.then((result) => {
			expect(result[0].number).to.equal('2A')
			expect(result[0].capacity).to.equal(2)
			expect(result.length).to.eql(17)
		})
	})
})

describe('listUpcomingBookings()', () => {
	it('Should list all of the current and upcoming bookings', () => {
		return db.listUpcomingBookings() 
		.then((result) => {
			expect(result.length).to.eql(39)
		})
	})
})