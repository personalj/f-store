function CalculateRate(...rates) {
    return {
        getRate() {
            return (rates[0] + rates[1] * 2 + rates[2] * 3 + rates[3] * 4 + rates[4] * 5) / (rates[0] + rates[1] + rates[2] + rates[3] + rates[4])
        },
        getCount() {
            return rates[0] + rates[1] + rates[2] + rates[3] + rates[4]
        }
    }
}

function GetRate(...rates) {
    return {
        rate: +new CalculateRate(...rates).getRate().toFixed(2),
        count: new CalculateRate(...rates).getCount()
    }
}

module.exports = GetRate