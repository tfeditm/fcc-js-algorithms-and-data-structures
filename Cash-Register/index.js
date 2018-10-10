// CASH REGISTER

function checkCashRegister(price, cash, cid) {

  const amountOfCurrency = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
    ];

  let change = cash - price;
  let sumCash = 0;
  
  // Deal the precision error of JS (only for two decimal)
  let preciseSubtract = (x, y) => {
    x = (x * 1000 - y * 1000) / 1000
    return x;
  }

  return cid.reduceRight((statusAndChange, curr, i) => {
    statusAndChange.status = statusAndChange.status || "OPEN";
    statusAndChange.change = statusAndChange.change || [];
    sumCash += curr[1];

    amountOfCurrency.forEach(amount => {
      if(curr[0] === amount[0] && curr[1] !== 0) {
        if(change >= amount[1]) {
          if(change >= curr[1]) {
            statusAndChange.change.push([curr[0], curr[1]]);
            change = preciseSubtract(change, curr[1]);
            sumCash = preciseSubtract(sumCash, curr[1]);
          } else {
            let maxChangeInUnit = Math.floor(change / amount[1]) * amount[1];
            statusAndChange.change.push([curr[0], maxChangeInUnit]);
            change = preciseSubtract(change, maxChangeInUnit);
            sumCash = preciseSubtract(sumCash, maxChangeInUnit);
          }
        }
      }
    })
    if((sumCash < change) || (i === 0 && change > 0)) {
        statusAndChange.status = "INSUFFICIENT_FUNDS";
        statusAndChange.change = [];
    }
    if(change === 0 && sumCash === 0) {
       statusAndChange.status = "CLOSED";
       statusAndChange.change = [...cid];
    }
    return statusAndChange;
  }, {})
}


// checkCashRegister(19.5, 20, [
//   ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], 
//   ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], 
//   ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) 
//   should return an object.

// checkCashRegister(19.5, 20, [
//   ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], 
//   ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], 
//   ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) 
//   should return {status: "OPEN", change: [["QUARTER", 0.5]]}.

// checkCashRegister(3.26, 100, [
//   ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], 
//   ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], 
//   ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) 
//   should return {status: "OPEN", 
//   change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], 
//   ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.

// checkCashRegister(19.5, 20, [
//   ["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], 
//   ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], 
//   ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) 
//   should return {status: "INSUFFICIENT_FUNDS", change: []}.

// checkCashRegister(19.5, 20, [
//   ["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], 
//   ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], 
//   ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) 
//   should return {status: "INSUFFICIENT_FUNDS", change: []}.

// checkCashRegister(19.5, 20, [
//   ["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], 
//   ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], 
//   ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) 
//   should return {status: "CLOSED", 
//   change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], 
//   ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], 
//   ["TWENTY", 0], ["ONE HUNDRED", 0]]}