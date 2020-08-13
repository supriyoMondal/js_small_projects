const container = document.querySelector('.container');
let seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

const setMovie = (index, price) => {
    localStorage.setItem('selectedMovieIndex', index);
    localStorage.setItem('selectedMoviePrice', price);
}

const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    total.innerText = ticketPrice * selectedSeatsCount;
    count.innerText = selectedSeatsCount;

    const seatsIndexes = [...selectedSeats].map(item => [...seats].indexOf(item));
    localStorage.setItem('seatsIndexes', JSON.stringify(seatsIndexes));
}

document.addEventListener('DOMContentLoaded', () => {
    ticketPrice = +localStorage.getItem('selectedMoviePrice') || 10;
    let selectedMovieIndex = localStorage.getItem('selectedMovieIndex') || 0;
    movieSelect.selectedIndex = selectedMovieIndex;
    let seatsIndexes = JSON.parse(localStorage.getItem('seatsIndexes')) || [];
    seats.forEach((seat, index) => {
        if (seatsIndexes.includes(index)) {
            seat.classList.add('selected')
        }
    })
    updateSelectedCount()
})

//movie change
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +movieSelect.value;
    setMovie(e.target.selectedIndex, e.target.value)
    updateSelectedCount();
})

//seat click 
container.addEventListener('click', e => {
    if (!e.target.classList.contains('seat') || e.target.classList.contains('occupied')) {
        return;
    }
    e.target.classList.toggle('selected');
    updateSelectedCount();
})