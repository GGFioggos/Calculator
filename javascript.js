let current_number = '';
let numbera = '';
let operand = '';

const buttons = document.querySelectorAll(".buttons button");
const displayOld = document.querySelector(".display-old");
const displayCurrent = document.querySelector(".display-current");


setupCalculator();


function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b != 0) {
        return (a / b).toFixed(2);
    }
    alert('You cannot divide with zero!');
    return numbera;
}

function handleDigit(digit) {
    try {
        if (current_number.toString().includes('.') && this.getAttribute('data-value') == '.') {
            alert('You have already placed a decimal');
        } else {
            current_number += this.getAttribute('data-value');

        }
    } catch (e) {
        if (e.name == 'TypeError') {
            console.log(digit);
            current_number += digit;
        }
    }
    displayCurrent.textContent = current_number;
}

function handleOperand() {
    if (this.classList.contains('clear')) { // CLEAR
        current_number = '';
        numbera = '';
        operand = '';
        displayCurrent.textContent = '0';
        displayOld.textContent = '­';
    } else if (this.classList.contains('delete')) { // DELETE
        current_number = current_number.toString().slice(0, -1);
        displayCurrent.textContent = current_number;
    } else if (this.classList.contains('operand') && this.getAttribute('data-value') != '=') { //OPERAND != '=' 
        if (numbera == '­' || numbera == '') {
            numbera = current_number;
            current_number = '';
            operand = this.getAttribute('data-value');
            displayOld.textContent = numbera + ' ' + operand;
            displayCurrent.textContent = current_number;
        } else {
            numbera = operate(operand, numbera, current_number);
            operand = this.getAttribute('data-value');
            displayOld.textContent = numbera + ' ' + operand;
            current_number = '';
            displayCurrent.textContent = current_number;
        }
    } else { // OPERAND == '='
        if (numbera == '' || current_number == '') {
            alert("Nothing to calculate");
        } else {
            displayOld.textContent = numbera + ' ' + operand + ' ' + current_number;
            current_number = operate(operand, numbera, current_number);
            displayCurrent.textContent = current_number;
            numbera = '';
        }
    }
}

function initializeScreen() {
    displayOld.textContent = '­';
    displayCurrent.textContent = '0';
}

function setupCalculator() {
    initializeScreen();
    keyboardSupport();
    setupButtons();
}

function keyboardSupport() {
    document.addEventListener('keydown', (event) => {
        keyboardEventListener();
        if (event.key == "0") { document.querySelector('[data-value="0"]').click() }
        else if (event.key == "1") { document.querySelector('[data-value="1"]').click()}
        else if (event.key == "2") { document.querySelector('[data-value="2"]').click() }
        else if (event.key == "3") { document.querySelector('[data-value="3"]').click() }
        else if (event.key == "4") { document.querySelector('[data-value="4"]').click() }
        else if (event.key == "5") { document.querySelector('[data-value="5"]').click() }
        else if (event.key == "6") { document.querySelector('[data-value="6"]').click() }
        else if (event.key == "7") { document.querySelector('[data-value="7"]').click() }
        else if (event.key == "8") { document.querySelector('[data-value="8"]').click() }
        else if (event.key == "9") { document.querySelector('[data-value="9"]').click() }
        else if (event.key == ".") { document.querySelector('[data-value="."]').click() }
        else if (event.key == "+") { document.querySelector('[data-value="+"]').click() }
        else if (event.key == "-") { document.querySelector('[data-value="-"]').click() }
        else if (event.key == "*") { document.querySelector('[data-value="*"]').click() }
        else if (event.key == "/") { document.querySelector('[data-value="/"]').click() }
        else if (event.key == "Enter") { document.querySelector('[data-value="="]').click() }
        else if (event.key == "Escape") { document.querySelector('.clear').click() }
        else if (event.key == "Backspace") { document.querySelector('.delete').click() }
    });
    document.addEventListener('keyup', (event) => {
        keyboardEventListener();
    });

}

function setupButtons() {
    buttons.forEach(button => {
        if (button.classList.contains("digit")) {
            button.onclick = handleDigit;
        } else if (button.classList.contains("operand")) {
            button.onclick = handleOperand;
        }
    })

    buttons.forEach(button => {
        button.addEventListener('mouseover', onHover);
        button.addEventListener('mouseout', onLeave);
    })
}

function onHover() {
    this.style.backgroundColor = "#ccc";
}

function onLeave() {
    this.style.backgroundColor = "white";
}

function keyboardEventListener() {
    try{ 
        test = document.querySelector(`[data-value="${event.key}"]`);
        test.classList.toggle('pressed');
    }catch (e){ 
        if (e.name == "TypeError"){
            if (event.key == "Backspace"){
                test = document.querySelector(".delete");
                test.classList.toggle('pressed');
            }else if (event.key == "Escape"){
                test = document.querySelector(".clear");
                test.classList.toggle('pressed');
            }
        }
    }
}