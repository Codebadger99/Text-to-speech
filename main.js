const text = document.querySelector('textarea')
const submit = document.querySelector('button')
const voice = document.querySelector('select')

let synth = speechSynthesis;
var isSpeaking = true

function voices(){
    for(let voice of synth.getVoices()){
        var option = `<option value= '${voice.name}'>${voice.name} (${voice.lang})</option>`
    }
    voice.insertAdjacentHTML("beforeend", option)
}

synth.addEventListener('voiceschanged',voices)

function textToSpeech(text){
    let utternance = new SpeechSynthesisUtterance(text)
    for(let voice of synth.getVoices()){
        if(voice.name === voice.value){
            utternance.voice = voice
        }
    }
    synth.speak(utternance)
}

submit.addEventListener('click', e => {
    e.preventDefault()
    if(text.value !== " "){
        if(!synth.speaking){
            textToSpeech(text.value)
        }

        if(text.value.length <= 80 || text.value.length >= 80){
            if(isSpeaking){
                synth.resume()
                isSpeaking = false
                submit.innerText = "Pause Speech"
            }else{
                synth.pause()
                isSpeaking = true
                submit.innerText = "Resume Speech"
            }

            setInterval(() => {
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true
                    submit.innerText = "Convert To Speech"
                }
            })
        }else{
            submit.innerText = "Convert To Speech"
        }
    }
})