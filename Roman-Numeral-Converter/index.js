// ROMAN NUMERAL CONVERTER

// My solution is:
// - I break the Arab number into Ones, Tens, Hundreds, Thousands and More Thousands*:
//     891 => 1 + 90 + 800 + 0 + 0
// - then I do each conversion in reverse order:
//     800 => DCCC, 90 => XC, 1 => I
// - and write down each in turn: DCCCXCI

// *The biggest Arab number which can convert according to the role is 3999. 
// Above this number, forming Roman numbers you can use V, X, L, C, D, M characters 
// by placing a dash over the symbols, meaning "times 1000", 
// or you can write so many M than More Thousands are (4000 => MMMM). 
// In my code, I choose the second solution.


function convertToRoman(num) {
    const nums = {
        ones: [{a: 1, r:"I"}, {a: 5, r: "V"}],
        tens: [{a: 10, r:"X"}, {a: 50, r: "L"}],
        hundreds: [{a: 100, r: "C"}, {a: 500, r: "D"}],
        thousands: [{a: 1000, r: "M"}]
    }
  
    const ones = num % 10 || 0;
    const tens = (num - ones) % 100 || 0;
    const hundreds = (num - tens - ones) % 1000 || 0;
    const thousands = (num <= 3999) ? (num - hundreds - tens - ones) % 10000 : 0;
    const moreThousands = (num > 3999) ? num - hundreds - tens - ones : 0;
  
    const placeAndDigit = {
        moreThousands: moreThousands / 1000,
        thousands: thousands / 1000,
        hundreds: hundreds / 100,
        tens: tens / 10,
        ones: ones
    }
  
    const placeAndDigitKeys = Object.keys(placeAndDigit);
  
    let convert = (arabDigit, place) => {
        let romanDigit = "";
        
        if(place === "moreThousands") {
            romanDigit = nums.thousands[0].r.repeat(arabDigit);
            return romanDigit;
        }
        
        if(arabDigit <= 3) {
            romanDigit = nums[place][0].r.repeat(arabDigit)
        } else if(arabDigit === 4) {
            romanDigit = nums[place][0].r + nums[place][1].r;
        } else if(arabDigit === 5) {
            romanDigit = nums[place][1].r;
        } else if(arabDigit <= 8) {
            romanDigit = nums[place][1].r + nums[place][0].r.repeat(arabDigit - 5);
        } else if(arabDigit === 9) {
            let numsKeys = Object.keys(nums);
            let nextPlace = numsKeys[numsKeys.indexOf(place) + 1];
            romanDigit = nums[place][0].r + nums[nextPlace][0].r;
        }
  
        return romanDigit;
    }
  
    return placeAndDigitKeys.reduce((rn, place) => {
        rn += convert(placeAndDigit[place], place);
        return rn;
    }, "")
}
  
// convertToRoman(2) should return "II"
// convertToRoman(3) should return "III"
// convertToRoman(4) should return "IV"
// convertToRoman(5) should return "V"
// convertToRoman(9) should return "IX"
// convertToRoman(12) should return "XII"
// convertToRoman(16) should return "XVI"
// convertToRoman(29) should return "XXIX"
// convertToRoman(44) should return "XLIV"
// convertToRoman(45) should return "XLV"
// convertToRoman(68) should return "LXVIII"
// convertToRoman(83) should return "LXXXIII"
// convertToRoman(97) should return "XCVII"
// convertToRoman(99) should return "XCIX"
// convertToRoman(400) should return "CD"
// convertToRoman(500) should return "D"
// convertToRoman(501) should return "DI"
// convertToRoman(649) should return "DCXLIX"
// convertToRoman(798) should return "DCCXCVIII"
// convertToRoman(891) should return "DCCCXCI"
// convertToRoman(1000) should return "M"
// convertToRoman(1004) should return "MIV"
// convertToRoman(1006) should return "MVI"
// convertToRoman(1023) should return "MXXIII"
// convertToRoman(2014) should return "MMXIV"
// convertToRoman(3999) should return "MMMCMXCIX"