const col3 = document.getElementById('last-section');
const calc = document.getElementById('calc') as HTMLSelectElement; 
const val = document.getElementById('intVal') as HTMLInputElement;
function recalculate() {
    let v = Number(val.value);
    if(v < 0) {
        v = 1;
    }
    v = Math.round(v);
    let result: boolean;
    if(calc.value === 'prime') {
        result = isPrime(v)
    } else {
        result = isFibonacci([0,1], v);
    }
    col3.innerHTML = result.toString();
    val.value = v.toString();
}


function isPrime(num: number) {
    let sqrt = Math.floor(Math.sqrt(num));
    let prime = num != 1;
    for(let i=2; i<sqrt+1; i++) { 
        if(num % i == 0) {
            prime = false;
            break;
        }
    }
    return prime;
}

function isFibonacci(acc: [number, number], num: number) {
    if(num === 0 || num === 1) return true;
    const [v1, v2] = acc;
    if(v2 > num) {
        return false;
    }
    if(v2 === num) return true;
    return isFibonacci([v2, v2+v1], num);
}

val.addEventListener('change', recalculate);
calc.addEventListener('change', recalculate);
recalculate();