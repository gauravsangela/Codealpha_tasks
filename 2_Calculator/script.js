let input = document.getElementById('txt-field');
let buttons = document.querySelectorAll('button');
let expression = "";

let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML == '=') {
            expression = eval(expression);
            input.value = expression;
        } else if (e.target.innerHTML == 'AC') {
            expression = "";
            input.value = expression;
        }else if(e.target.innerHTML == 'DEL'){
            expression = expression.slice(0, -1);
            input.value = expression;
        } else {
            expression += e.target.innerHTML;
            input.value = expression;
        }

    })
})

document.addEventListener('keydown', (e) => {
    const key = e.key;
    e.preventDefault();

    if (!isNaN(key) || "+-*/%.".includes(key)) {
        expression += key;
        input.value = expression;
    } else if (key === 'Enter') {
        try {
            expression = eval(expression);
            input.value = expression;
        } catch {
            input.value = "Error";
            expression = "";
        }
    } else if (key === 'Backspace') {
        expression = expression.slice(0, -1);
        input.value = expression;
    } else if (key === 'Escape') {
        expression = '';
        input.value = '';
    }
});




// let input = document.getElementById('txt-field');
// let buttons = document.querySelectorAll('button');
// let expression = "";
// let arr = Array.from(buttons);

// arr.forEach(button => {
//     button.addEventListener('click', (e) => {
//         const value = e.target.innerHTML;

//         if (value == '=') {
//             try {
//                 expression = calculate(expression);
//                 input.value = expression;
//             } catch (error) {
//                 input.value = "Error";
//                 expression = "";
//             }
//         } else if (value == 'AC') {
//             expression = "";
//             input.value = expression;
//         } else if (value == 'DEL') {
//             expression = expression.slice(0, -1);
//             input.value = expression;
//         } else {
//             expression += value;
//             input.value = expression;
//         }
//     });
// });

// function calculate(str) {
//     let numbers = str.split(/[\+\-\*\/%]/).map(Number);
//     let operators = str.split(/[0-9\.]+/).filter(Boolean);

//     let result = numbers[0];

//     for (let i = 0; i < operators.length; i++) {
//         if (operators[i] === '+') {
//             result += numbers[i + 1];
//         } else if (operators[i] === '-') {
//             result -= numbers[i + 1];
//         } else if (operators[i] === '*') {
//             result *= numbers[i + 1];
//         } else if (operators[i] === '/') {
//             result /= numbers[i + 1];
//         } else if (operators[i] === '%') {
//             result %= numbers[i + 1];
//         }
//     }

//     return result.toexpression();
// }