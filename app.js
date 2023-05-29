const numpadButtons = { 'percent': '&#37;', 'clear-entry': 'CE', 'clear': 'C', 'backspace': '&#8592;', 'fraction': '&#185;&#8725;&#8339;', 'power': '&#8339;&#178;', 'square-root': '&#8730;', 'divide': '&#247;', 'seven': 7, 'eight': 8, 'nine': 9, 'multiple': '&#215;', 'four': 4, 'five': 5, 'six': 6, 'subtract': '&#8722;', 'one': 1, 'two': 2, 'three': 3, 'add': '&#43;', 'sign': '&#43;&#8725;&#8722;', 'zero': 0, 'dot': '.', 'ans': '&#61;' };
const numpadNames = Object.keys(numpadButtons);
const numpadSymbols = Object.values(numpadButtons);
const userInterface = document.getElementById('user-interfaces');
const screenLine1 = document.getElementById('screen-line-1');
const screenLine2 = document.getElementById('screen-line-2');
var numA = 0;
var numB = 0;
// var maths = null;
// var mathsDisplay = null;
var mathsObj = {'maths': null, 'mathsExp': null};



for (let i = 0; i < 6; i += 1) {
    let features = ['clear-entry', 'clear', 'backspace', 'ans']
    let row = document.createElement('div');
    row.className = 'row';
    let height = (100 - 6) / 6;
    row.setAttribute('style', `width: 100%; height: ${height}%;`)
    for (let j = 0; j < 4; j += 1) {
        let btn = document.createElement('button');
        let width = (100 - 5) / 4;
        btn.setAttribute('style', `width: ${width}%; height: 100%;`)
        btn.type = 'button';
        let index = i * 3 + j + i;
        let numpadValue = numpadSymbols[index];
        let numpadName = numpadNames[index];
        btn.name = numpadName;
        btn.innerHTML = numpadValue;
        if (!(isNaN(numpadValue))) {
            btn.value = numpadValue;
            btn.className = 'numpad';
        } else {
            btn.value = numpadName;
            btn.className = 'operator'
        }

        if (features.includes(numpadName)) {
            btn.className = 'feature';
        }
        row.appendChild(btn);
    }
    userInterface.appendChild(row);
}
const btns = document.querySelectorAll('button');

class screenFuncs {
    varA = numA;
    varB = numB;
    operatorObj = mathsObj;
    constructor (varA, varB, operatorObj) {
        this.varA = parseInt(varA);
        this.varB = parseInt(varB);
        this.operatorObj = operatorObj;
    }

    screenDisplay () {
        if (this.varB != 0) {
            return `${this.varA} ${this.operatorObj['mathsExp']} ${this.varB}`;
        } else if (this.operatorObj['mathsExp'] != null) {
            return `${this.varA} ${this.operatorObj['mathsExp']}`;
        } else {
            return `${this.varA}`;
        }
    }

    calc () {
        if (this.operatorObj['maths'] == 'add') {
            return this.varA + this.varB;
        } else if (this.operatorObj['maths'] == 'subtract') {
            return this.varA - this.varB;
        } else if (this.operatorObj['maths'] == 'multiple') {
            return this.varA * this.varB;
        } else if (this.operatorObj['maths'] == 'divide') {
            return this.varA /  this.varB;
        }
    }

    update (a, b, newOperatorObj) {
        this.varA = parseInt(a);
        this.varB = parseInt(b);
        this.operatorObj = newOperatorObj;
    }
}

const screenValues = new screenFuncs(numA, numB, mathsObj);

function screenUpdate(text, btnType, btnValue) {
    let currentDisplay = screenLine2.innerHTML;
    let textLen = currentDisplay.length;
    if (btnType == 'numpad') {
        let numValue = parseInt(text);
        if (!isNaN(currentDisplay)) {
            numA = numA * 10 + numValue;
            screenValues.varA = numA;
        } else {
            if (mathsObj.maths != null) {
                numB = numB * 10 + numValue;
                screenValues.varB = numB;
            }
        }
    } else if (btnType == 'operator' && textLen > 0) {
        mathsObj.maths = btnValue;
        mathsObj.mathsExp = text;
        screenValues.operatorObj = mathsObj;
    }
    return screenValues.screenDisplay();
}



Array.from(btns).forEach(btn => {
    btn.addEventListener('click', () => {
        let btnType = btn.className;
        if (btnType == 'feature') {
            if (btn.value == 'ans') {
                screenLine1.innerHTML = screenValues.screenDisplay();
                let result = screenValues.calc();
                screenLine2.innerHTML = result;
                numA = result;
                numB = 0;
                mathsObj = {'maths': null, 'mathsExp': null};
                screenValues.update(numA, numB, mathsObj);
            }

        } else {
            screenLine2.innerHTML = screenUpdate(btn.innerHTML, btnType, btn.value);
        }
    })
})

