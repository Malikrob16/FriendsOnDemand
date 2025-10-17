const siteUser = "Malik Robinson";

function GetCurrentTime() {
  const currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds(); 

  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  const correctTime = `${hours}:${minutes}:${seconds}`;

  console.log(correctTime);

  return correctTime;

}

// This function will handle the input and output of the chat box.
// It will take the users input and create a message to display in the chat box.
// Will be changed down the line to also implement random messages from the characters watching with the user.
function ChatBoxAugmenting(siteUser) {
  const chatDisplay = document.getElementById('chat-display');
  const chatInput = document.getElementById('chat-input');

  chatInput.addEventListener("keyup", () => {

    if (event.key === "Enter") {
      event.preventDefault();

      const chatMessage = chatInput.value;

      if (chatMessage !== "") {
        chatDisplay.innerHTML += `
          <p>${siteUser}: ${chatMessage} . ${GetCurrentTime()}</p>
        `;
        chatInput.value = ""; // Clear input after message is sent
      }
    }
  });
}

function GetHTMLStructure() {
  const bodyTag = document.querySelector('body');

  bodyTag.innerHTML = `
  <header class="header">
    <h1>Friends On Demand</h1>
    <h2>H2 test this is an addition for test purposes</h2>

    <button>Test button</button>
    <a href="#">Test Anchor link</a>
  </header>

<!-- Test section to display of card container -->
  <section class="card-grid">
    <div class="card">
      <h3>H3 test</h3>
      <p>Brief description about this project goes here.</p>
    </div>
    <div class="card">
      <h3>H3 test</h3>
      <p>Some info about this project to show layout and contrast.</p>
    </div>
    <div class="card">
      <h3>H3 test</h3>
      <p>More placeholder content for visual comparison.</p>
    </div>
  </section>

  <section class="chat-container">
    <div class="chat-display" id="chat-display">
      <h4>Test for chat box</h4>
    </div>

    <input class="chat-input" id="chat-input" type="text" placeholder="Chat Here">
  </section>
  
  `;
}

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM content loaded");

  GetHTMLStructure();
  ChatBoxAugmenting();
  GetCurrentTime();
  
});