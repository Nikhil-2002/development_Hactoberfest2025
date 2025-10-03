const textArea = document.querySelector("#text");
const speedBtn = document.querySelector("#speed");
const pauseBtn = document.querySelector(".pause");
const stopBtn = document.querySelector(".stop");
const readBtn = document.querySelector(".read");
let currentChar ;


readBtn.addEventListener("click" , function(){
    readText(textArea.value);
});

pauseBtn.addEventListener("click" , pauseText);

stopBtn.addEventListener("click" , stopText);

speedBtn.addEventListener("input",function(){
    stopText();
    readText(utterance.text.substring(currentChar));
})

const utterance = new SpeechSynthesisUtterance();
utterance.addEventListener("end", function(){
    textArea.disabled = false ;
});



//random voice generation
let voices;
function speakVoice() {
voices = this.getVoices();
utterance.voice = voices[7];
speechSynthesis.speak(utterance);
};

speechSynthesis.addEventListener('voiceschanged', speakVoice);
//random voice generation end





utterance.addEventListener("boundary" , function(e){
    currentChar = e.charIndex;
})

function readText(TEXT)
{
    if(speechSynthesis.paused && speechSynthesis.speaking)
    {
        return speechSynthesis.resume();
    }

    if(speechSynthesis.speaking)
    {
        return;
    }
    utterance.text = TEXT;
    utterance.rate = speedBtn.value || 1 ;
    textArea.disabled = true ;
    speechSynthesis.speak(utterance);
};

function pauseText()
{
    if(speechSynthesis.speaking)
    {
        speechSynthesis.pause();
    }
};

function stopText()
{
    speechSynthesis.resume();
    speechSynthesis.cancel();
    textArea.disabled = false;
}
