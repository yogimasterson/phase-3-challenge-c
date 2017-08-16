const book = document.querySelectorAll('.book')
const modal = document.querySelector('#booking')
const close = document.querySelectorAll('.close')[0]
const modalRoomNumber = document.querySelector('#roomNumber')
const modalPrice = document.querySelector('#pricePerNight')
const modalTotal = document.querySelector('#total')
const quantity = document.querySelector('#quantity')

let room = []

const bookingContents = () => {
	modalRoomNumber.innerHTML = 'Room ' + room.num
	modalPrice.innerHTML = room.price + '/ Night'
	modal.style.display = 'block'
}

for (let b of book) {
	b.addEventListener('click', () => {
		room.num = b.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML
		room.capacity = b.parentNode.previousElementSibling.previousElementSibling.innerHTML
		room.price = b.parentNode.previousElementSibling.innerHTML
		bookingContents()
	})
}

close.addEventListener('click', () => {
	modal.style.display = 'none'
})

quantity.addEventListener('change', function (e) {
	e.preventDefault()
	let total = this.value * parseFloat(room.price.slice(1))
	modalTotal.innerHTML = '$ ' + total.toFixed(2)
})