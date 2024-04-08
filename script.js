
// declaration

const form = document.querySelector("form");
const input = document.querySelector("input");
const meaning = document.querySelector("#meaning");
const example = document.querySelector("#example");
const searchIcon = document.querySelector("#search");
const removeIcon = document.querySelector("#remove");
const title = document.querySelector("#word");
const audio = document.querySelector("#audio");
let word = "";


async function fetchApi(word){
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try{
        const response = await fetch(url);
        const result = await response.json();
        word = result[0].word;;
        title.textContent = word;
        meaning.textContent = result[0].meanings[0].definitions[0].definition;
        let exampleJSON = result[0].meanings[0].definitions[0].example;
      if(exampleJSON != undefined) example.textContent = exampleJSON;
      else example.textContent = "No example found";

    }
    catch{

    }
}


function ui(){
    if(!word) input.value = "Please type a word";
    fetchApi(word);
}
function readWord(){
    if(word){
        const utterance = new SpeechSynthesisUtterance(word);
        window.speechSynthesis.speak(utterance);
    }

}

// event listener
form.addEventListener("submit" , (e) =>{
    e.preventDefault();
    word = input.value;
    ui();
})
searchIcon.addEventListener("click" , () =>{
    word = input.value;
    ui();
})
removeIcon.addEventListener("click" , () =>{
    word = "";
    word = input.value;
})

audio.addEventListener("click" , readWord)

onload = function(){
    word = "Dog";
    fetchApi(word);
}