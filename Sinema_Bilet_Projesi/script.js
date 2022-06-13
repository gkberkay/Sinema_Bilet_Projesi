const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();
let ticketPrice = +movieSelect.value;

//Seçilen koltukların index'i ve fiyatının localstoragede tutulması
function setMovieData(movieIndex,moviePrice) {
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice)
}

//Koltuk seçtiğimizde fiyat arttırma fonksiyonu
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')

    const seatsIndex = [...selectedSeats].map(seat =>[...seats].indexOf(seat))

    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
    

    console.log(seatsIndex)
    

    const selectedSeatsCount = selectedSeats.length;
    console.log(selectedSeatsCount);
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//LocalStorage'den veriyi alıp ekranda tekrar gösterilmesi

function populateUI (){
    const selectedSeats =JSON.parse(localStorage.getItem('selectedSeats'));
    
    if(selectedSeats !==null &&selectedSeats.length >0){
        seats.forEach((seat,index) => {
            if(selectedSeats.indexOf(index) >-1){
                seat.classList.add('selected')
            }
        });
    }
    const selectedMovieIndex =localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !==null){
        movieSelect.selectedIndex =selectedMovieIndex;
    }
}

//Film seçme eventi
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value)
    updateSelectedCount();
})

//Boş koltukları seçme ve seçtikten sonra renk değiştirme eventi
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

//Seçilen koltukların fiyatlarının artması için çalışan fonksiyon

updateSelectedCount();