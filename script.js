const calculatorDisplay=document.querySelector('h1');
const inputbtns=document.querySelectorAll('button');
const clearbtn=document.getElementById('clear-btn');

let firstValue=0;
let operatorValue='';
let awaitingNextValue=false;

function sendNumberValue(number){
    //replace current display if first value is entered
    if(awaitingNextValue){
        calculatorDisplay.textContent=number;
        awaitingNextValue=false;
    }else{
    //calculatorDisplay.textContent=number;
    //if current display value is 0, replace it, if not add number
    const displayValue=calculatorDisplay.textContent;
    calculatorDisplay.textContent=displayValue === '0'? number : displayValue + number;
}
}
//calculate first and second value depending on the operator
const calculate={
    '/':(firstNumber, secondNumber) => firstNumber / secondNumber,
    '*':(firstNumber, secondNumber) => firstNumber * secondNumber,
    '+':(firstNumber, secondNumber) => firstNumber + secondNumber,
    '-':(firstNumber, secondNumber) => firstNumber - secondNumber,
    '=':(firstNumber, secondNumber) => secondNumber,
}

function useOperator(operator){
    const currentValue=Number(calculatorDisplay.textContent);
    //prevent multiple operators
    if(operatorValue && awaitingNextValue) 
    {
      operatorValue=operator;
        return;
    }
    //assign firstvalue if no value
    if(!firstValue){
        firstValue=currentValue;
    }else{
        console.log(firstValue, operatorValue, currentValue);
        const calculation=calculate[operatorValue](firstValue,currentValue);
       calculatorDisplay.textContent=calculation;
        firstValue=calculation;
    }
    //ready for next value, store operator
    awaitingNextValue=true;
    operatorValue=operator;
    
}

function addDecimal(){
    //if operator pressed, dont add decimal
    if(awaitingNextValue) return;
    //if no decimal, add one
    if(!calculatorDisplay.textContent.includes('.'))
    {
        calculatorDisplay.textContent=`${calculatorDisplay.textContent}.`;

    }
}
//add event Listeners for numbers,operators, decimal buttons

inputbtns.forEach((inputbtn) => {
if (inputbtn.classList.length==0){
    inputbtn.addEventListener('click', () => sendNumberValue(inputbtn.value));   
}
else if(inputbtn.classList.contains('operator')){
    inputbtn.addEventListener('click', () => useOperator(inputbtn.value));
}
else if(inputbtn.classList.contains('decimal')){
        inputbtn.addEventListener('click', () => addDecimal());
        

}

});

//reset display
function resetAll(){
    firstValue=0;
    operatorValue='';
    awaitingNextValue=false;
    calculatorDisplay.textContent='0';
}

//Event Listener
clearbtn.addEventListener('click', resetAll);