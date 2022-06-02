const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const clearButton = document.getElementById("clear-button");
const resultSection = document.getElementById("result-section");

const clearResultSection = () => {
  while (resultSection.firstChild) {
    resultSection.removeChild(resultSection.firstChild);
  }
};

const capitalise = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const punctuate = (string) => string + ".";

const format = (string, isFinal) =>
  isFinal ? punctuate(capitalise(string.trim())) : capitalise(string.trim());

const recognition = new webkitSpeechRecognition();
recognition.lang = "en-US";
recognition.continuous = true;
recognition.interimResults = true;

recognition.onstart = () => {
  console.log("starting");
};

recognition.onresult = (event) => {
  console.log("result", event);
  clearResultSection();

  for (let i = 0; i < event.results.length; i++) {
    const result = event.results[i];
    console.log(`result ${i}`, result);

    const paragraph = document.createElement("p");
    paragraph.innerText = format(result[0].transcript, result.isFinal);
    resultSection.appendChild(paragraph);
  }
};

recognition.onerror = (event) => {
  console.log("error", event);
};
recognition.onend = () => {
  console.log("end");
};

if (startButton) {
  startButton.onclick = () => {
    recognition.start();
  };
}

if (stopButton) {
  stopButton.onclick = () => {
    recognition.stop();
  };
}

if (clearButton) {
  clearButton.onclick = () => {
    clearResultSection();
  };
}
