const numpadButtons = { 'percent': '&#37;', 'clear-entry': 'CE', 'clear': 'C', 'backspace': '&#8592;', 'fraction': '&#185;&#8725;&#8339;', 'power': '&#8339;&#178;', 'square-root': '&#8730;', 'division': '&#247;', 'seven': 7, 'eight': 8, 'nine': 9, 'multiple':'&#215;', 'four': 4, 'five': 5, 'six': 6, 'subtract': '&#8722;', 'one': 1, 'two': 2, 'three': 3, 'plus': '&#43;', 'sign': '&#43;&#8725;&#8722;', 'zero': 0, 'dot': '.', 'ans': '&#61;'};
const numpadNames = Object.keys(numpadButtons);
const numpadSymbols = Object.values(numpadButtons);

const numpad = document.getElementById('user-interfaces');

for (let i = 0; i < 6; i += 1) {
    let row = document.createElement('div');
    row.className = 'row';
    let height = (100 - 6) / 6;
    row.setAttribute('style', `width: 100%; height: ${height}%;`)
    for (let j = 0; j < 4; j += 1) {
        let btn = document.createElement('button');
        let width = (100 - 5) / 4;
        btn.setAttribute('style', `width: ${width}%; height: 100%;`)
        btn.type = 'button';
        btn.className = 'numpad';
        let index = i * 3 + j + i;
        let numpadValue = numpadSymbols[index];
        let numpadName = numpadNames[index];
        btn.name = numpadName;
        btn.innerHTML = numpadValue;
        if (!(isNaN(numpadValue))) {
            btn.value = numpadValue;
        } else {
            btn.value = numpadName;
        }
        row.appendChild(btn);
    }
    numpad.appendChild(row);
}
