// 4IT573 Základy Node.js
// 1. úkol

let maxVal = 11
let numGuesses = 3
let target = Math.floor(Math.random() * maxVal);
let success = false

let speech = "Myslím si číslo od 0 do " + (maxVal-1)+". Uhádnete jaké? Počet pokusů je " + numGuesses + "." //  +" Debug - číslo je: " + target

while(numGuesses > 0){
    numGuesses--
    let guess = prompt(speech)
    if(target == guess){
        success = true
        break
    }else{
	    if(guess == null) break // přestat hádat
        speech = "To bohužel není správně. Zkuste to znovu - číslo od 0 do " + (maxVal-1)+". Uhádnete jaké? Počet pokusů je " + numGuesses + ". "
    }
}

if(success){
    console.log("GRATULUJI! Skutečně to bylo číslo " + target +".");
}else{
    console.log("Bohužel jste neuhádl číslo v daném počtu pokusů. Prohrál jste.");
}