const book = document.querySelectorAll('.book')
const quantity = document.querySelector('#quantity')
const modal = document.querySelector('#booking')
const modalRoomNumber = document.querySelector('#roomNumber')
const modalPrice = document.querySelector('#pricePerNight')
const modalTotal = document.querySelector('#total')
const close = document.querySelectorAll('.close')[0]

let room = []

for (let b of book) {
	b.addEventListener('click', () => {
		room.num = b.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML
		room.capacity = b.parentNode.previousElementSibling.previousElementSibling.innerHTML
		room.price = b.parentNode.previousElementSibling.innerHTML
		const bookingContents = () => {
			modalRoomNumber.innerHTML = 'Room ' + room.num
			modalPrice.innerHTML = room.price + '/ Night'
			modal.style.display = 'block'
		}
		bookingContents()
	})
}

close.addEventListener('click', () => {
	modal.style.display = 'none'
})

quantity.addEventListener('change', (e) => {
	e.preventDefault()
	let total = this.value * parseFloat(room.price.slice(1))
	modalTotal.innerHTML = '$ ' + total.toFixed(2)
})