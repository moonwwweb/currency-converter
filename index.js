let resultSection = document.getElementById("resultSection");


async function createDropdown() {
    try {
        const data = await fetch("https://api.frankfurter.dev/v1/currencies")
        const currencies = await data.json()

        const selectFrom = document.getElementById("selectFrom")
        const selectTo = document.getElementById("selectTo")

        for(let code in currencies){

            const option1 = document.createElement('option');
            option1.value = code
            option1.textContent = `${code} - ${currencies[code]}`
            selectFrom.appendChild(option1)

            const option2 = option1.cloneNode(true);
            selectTo.appendChild(option2)
        }
    } catch (error) {       
        resultSection.innerHTML = "<h1>Oops! Couldn't fetch conversion data. Try again later.</h1>"
    }
}
createDropdown()

async function calculateCurrency() {
    const from = document.getElementById("selectFrom").value
    const to = document.getElementById("selectTo").value
    const quantity = document.getElementById("amount").value

    if (from === to) {
        resultSection.innerHTML = "<h1>Please Select Different Currencies</h1>" 
        return   
    }
    if (!quantity || quantity<=0){
        resultSection.innerHTML = "<h1>Please input a quantity</h1>" 
        return
    }
     resultSection.innerHTML = '<div class="spinner"></div>';
    try {
        let data = await fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
        let selections = await data.json()

        let rate = selections.rates[to]
        let convertedAmount = ((quantity * selections.amount)*rate).toFixed(3)

        resultSection.innerHTML=`<h1>${quantity} ${from} = ${convertedAmount} ${to}</h1>`      
    } 
    
    catch (error) {
        resultSection.innerHTML = "<h1>Oops! Couldn't fetch conversion data. Try again later.</h1>"
    }
}

document.getElementById("convert").addEventListener("click", calculateCurrency)