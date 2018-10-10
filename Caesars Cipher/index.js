// CAESARS CIPHER

function rot13(str) {

    let re = /[A-Z]/;
    let newStr = "";

    for(let i in str) {
        let code = str.charCodeAt(i);
        let newCode = (code + 13 <= 90) ? code + 13 : code + 13 - 26;
        newStr += str.charAt(i).replace(re, String.fromCharCode(newCode));
    }
  
    return newStr;
}

// rot13("SERR PBQR PNZC") should decode to FREE CODE CAMP
// rot13("SERR CVMMN!") should decode to FREE PIZZA!
// rot13("SERR YBIR?") should decode to FREE LOVE?
// rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.")
//     should decode to THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.