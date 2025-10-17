function GetRandomMessageforChat() {
  const messages = 
  [
    "Pick that video!",
    "Boo! pick another video!",
    "Stop pausing I want to want the video!",
    "Move over you are too close to me.",
    "Hey stop hovering over me. I am trying to watch the video.",
    "Pause the video I want to get some popcorn."
  ];

  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

function RequestUserName() {

  let userName = prompt("Enter a username so your friends can address you properly.");

  if (userName === null) {
    alert("Your user name can not be blank. Please enter a user name");

    let userName = prompt("Enter a username so your friends can address you properly.");
  }

  console.log(userName);

  return userName;
}

function GetCurrentTime() {
  const currentTime = new Date();
  let meridiem = "";
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();

  // if time has a single digit add 0 to front
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  // Set meridiem depending on hour
  if (hours < 12) {
    meridiem = 'AM';
  } else {
    meridiem = 'PM';
  }

  // Convert 24 hour time to 12 hour format.
  hours = hours % 12 || 12 ;

  const correctTime = `${hours}:${minutes} ${meridiem} `;

  return correctTime;
}

// This function will handle the input and output of the chat box.
// It will take the users input and create a message to display in the chat box.
// Will be changed down the line to also implement random messages from the characters watching with the user.
function ChatBoxAugmenting() {

  const chatDisplay = document.getElementById('chat-display');
  const chatInput = document.getElementById('chat-input');

  // Store userName variable for session
  let userName = null;

  // When user clicks chat input box prompt them to enter a username.
  // Only run click event is there is no stored username. (Ensures user can click off of chat box and click back without being prompted for username again)
  chatInput.addEventListener("click", () => {
    if (!userName) {
      userName = RequestUserName();
    }
  });

  // Executes when enter key is released
  chatInput.addEventListener("keyup", () => {

    if (event.key === "Enter") {
      event.preventDefault();

      const chatMessage = chatInput.value;
      const currentTime = GetCurrentTime();

      // If chat message is not empty display message in chatdisplay
      if (chatMessage !== "") {
        chatDisplay.innerHTML += `
          <p class="chat-message">
            <span class="chat-username">@${userName}</span>: 
            <span class="chat-text">${chatMessage}</span>
            <span class="chat-time">- ${currentTime}</span>
          </p>
        `;
        chatInput.value = ""; // Clear input after message is sent

        // ✅ Scroll to bottom
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
      }
    }
  });

  function TriggerRandomBotMessage() {
    const randomDelay = Math.floor(Math.random() * 8000) + 4000; // random between 4-12 seconds


    setTimeout(() => {
      const currentTime = GetCurrentTime();
      const botMessage = GetRandomMessageforChat();

      chatDisplay.innerHTML += `
          <p class="chat-message">
            <span class="chat-username bot">@TestBot</span>: 
            <span class="chat-text">${botMessage}</span>
            <span class="chat-time">- ${currentTime}</span>
          </p>
        `;

        // ✅ Scroll to bottom
        chatDisplay.scrollTop = chatDisplay.scrollHeight;

        TriggerRandomBotMessage(); // Schedule next bot message
    }, randomDelay);
  }

  TriggerRandomBotMessage();
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

    <input class="chat-input" id="chat-input" type="text" placeholder="Chat Here" autocomplete="off">
  </section> 
  `;
}

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM content loaded");

  GetHTMLStructure();
  ChatBoxAugmenting();
});