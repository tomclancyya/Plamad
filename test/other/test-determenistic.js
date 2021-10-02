
// prove that js has diff results for math operations

function powAndAtan(){
    let a = 1.11;
    for (i = 0; i < 10000000; i++){
        a = ((Math.pow(a, 1.0000001)) + Math.atan(a)) / 2
    }
    console.log(a * Math.pow(10, 21));
}
//powAndAtan()
//opera, nodejs, chrome
21557361529671148
//safari, fiddle
21557361529656310

function pow(){
    let a = 1.11;
    for (i = 0; i < 100000000; i++){
        a = ((Math.pow(a, 1.00000001)) + Math.pow(a, -1.00000001))
    }
    console.log(a);
}
//pow()
//opera, nodejs, chrome
//3831218723.5377684
//safari, fiddle
//3831218723.460479

//https://github.com/MikeMcl/decimal.js-light#readme
const { Decimal } = require('decimal.js-light')

Decimal.set({
    precision: 20,
    rounding: Decimal.ROUND_HALF_UP,
    toExpNeg: -7,
    toExpPos: 21
  });

function powAndAtanDecimal(){
    size = 100000;
    
    let a1 = 1.11;
    for (i = 0; i < size; i++){
        a1 = ((Math.pow(a1, 1.00000001)) + Math.pow(a1, -1.00000001))
    }
    console.log("float: " + a1);   

    
    /*
    * @param {Decimal}
    */
    let a = new Decimal(1.11);
    for (i = 0; i < size; i++){
        let b = a.plus(0)
        a = a.toPower(1.00000001)
        b = b.toPower(-1.00000001)        
        a = a.plus(b)
    }
    console.log("decimal: " + a.toFixed(15));
}
powAndAtanDecimal()
//nodejs
//float: 448.5343863449308
//decimal: 448.534386352922559

//safari
//float: 448.5343863449289
//decimal: 448.534386352922559

function divAndMulti() {
    a = 1.00000000001

    for (j = 1.1; j < 100000000; j = j + 1.000001) {
        for (i = 1.1; i < 10; i = i + 1.00000001){
            a = (a) * i;
        }
        a = j / a
    }
    console.log(a);
}

//divAndMulti();
// save everywhere