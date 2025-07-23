const countDown = document.querySelector('.count-down-Div');
const clearButton = document.querySelector('.clearButton');
const dateAyi = document.querySelector('.enterDateInput');

window.addEventListener('DOMContentLoaded', ()=>{
    const savedData = localStorage.getItem('targetDate');
    if(!savedData){
        return;
    }

    dateAyi.value = savedData ;
    //const targetDate = new Date(savedData);
    const [yy, mm, dd] = savedData.split('-').map(Number);
    const targetDate = new Date(yy, mm - 1, dd, 0, 0, 0);
    updateCountDown(targetDate);
    clearInterval(window.countdownInterval);
    window.countdownInterval = setInterval(()=>updateCountDown(targetDate),1000 );
    countDown.classList.add('active');

    

});


dateAyi.addEventListener('change', () =>{
    //const targetDate = new Date(dateAyi.value);
    const [yy, mm, dd] = dateAyi.value.split('-').map(Number);
    const targetDate = new Date(yy, mm - 1, dd, 0, 0, 0);
    const datehuji = dateAyi.value;
    localStorage.setItem('targetDate', datehuji);
    updateCountDown(targetDate);
    
    clearInterval(window.countdownInterval);
    window.countdownInterval = setInterval(() => updateCountDown(targetDate),1000);
    countDown.classList.add("active");

});

clearButton.addEventListener('click', () => {
        
    displayTime(0,0,0,0);
    clearInterval(window.countdownInterval);
    countDown.classList.remove("active");
    localStorage.removeItem('targetDate');

    

});




function updateCountDown(targetDate){
    const currentDate = new Date();
    const diffInDate = (targetDate - currentDate);
    


    if(diffInDate <= 0){
        clearInterval(window.countdownInterval);
        displayTime(0,0,0,0);
        countDown.classList.remove("active");
        return;
    }

    const totalSeconds = Math.floor(diffInDate/1000);
    const daysLeft = Math.floor(totalSeconds/86400);
    const hrsLeft = Math.floor((totalSeconds%86400)/3600);
    const minLeft = Math.floor((totalSeconds%3600)/60);
    const secleft = Math.floor(totalSeconds%60);
    
    displayTime(daysLeft,hrsLeft,minLeft,secleft);
}

function displayTime(d,h,m,s){
    
    
    document.querySelector('.days-left').textContent = d;
    document.querySelector('.hrs-left').textContent = h;
    document.querySelector('.min-left').textContent = m;
    document.querySelector('.sec-left').textContent = s;

}


