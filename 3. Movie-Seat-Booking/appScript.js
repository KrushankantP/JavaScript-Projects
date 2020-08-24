const container =document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect  = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


//update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // copy selected seats into array
    // Map through array
    // return a new array indexes.
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    // To SetItem to localstorage as in string by JSON.stringify.
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

}

// Get data from localStorage and populate UI
function populateUI(){

    //getItems from the local storage and converted into its original array's by using JSON.parse
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats!== null && selectedSeats.length > 0){
        seats.forEach((seat, index)=>{
            // (if there is no index that we are looking for than it will return -1) and index always start from 0,1,2,3...
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//seat Click event
container.addEventListener('click', e=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

// Movie Select event
movieSelect.addEventListener('change', e=>{
    ticketPrice= +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

//Initial count and total set (called on page load first)
updateSelectedCount()
