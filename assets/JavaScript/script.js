function ToggleLightSwitch() {
  const lightSwitch = document.getElementById('light-switch');

  lightSwitch.addEventListener('click', () => {
    lightSwitch.classList.toggle('on');
    console.log("Light switch pressed. Turning lights off.");

    if (lightSwitch.classList.contains('on')) {
      document.body.classList.remove('dark-mode');

      // Light switch is on
      lightSwitch.innerHTML= `
      <svg aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="var(--textyellow)"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        >
        <path d="M18 6c0 2-2 2-2 4v10a2 2 0 01-2 2h-4a2 2 0 01-2-2V10c0-2-2-2-2-4V2h12z" />
        <line x1="6" y1="6" x2="18" y2="6" />
        <line x1="12" y1="12" x2="12" y2="12" />
      </svg>
      `;
    } else {

      document.body.classList.add('dark-mode');

      // Light switch is off
      lightSwitch.innerHTML= `
        <svg aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="var(--textyellow)"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          >
          <path d="M16 16v4a2 2 0 01-2 2h-4a2 2 0 01-2-2V10c0-2-2-2-2-4" />
          <path d="M7 2h11v4c0 2-2 2-2 4v1" />
          <line x1="11" y1="6" x2="18" y2="6" />
          <line x1="2" y1="2" x2="22" y2="22" />
        </svg>
      `;
    }
  });

  // Initialize site to dark mode
    document.body.classList.add('dark-mode');
    lightSwitch.classList.remove('on');

    // Set starting switch SVG to off (dark mode)
    lightSwitch.innerHTML=`
        <svg aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="var(--textyellow)"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          >
          <path d="M16 16v4a2 2 0 01-2 2h-4a2 2 0 01-2-2V10c0-2-2-2-2-4" />
          <path d="M7 2h11v4c0 2-2 2-2 4v1" />
          <line x1="11" y1="6" x2="18" y2="6" />
          <line x1="2" y1="2" x2="22" y2="22" />
        </svg>
    `;
}

// Fetch videos from local JSON file with async await function
// Console log videos fetched in object format
async function fetchVideosfromJSON() {
  try {
    const response = await fetch('./assets/videos.json');
    const data = await response.json();
    console.log("Videos fetched from JSON: ", data);
    return data.videos; // Assuming the JSON has a "videos" array
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
}

// Dynamically create video cards using videos fetched from JSON
function CreateVideoCard(videoObject) {
  const videoCard = document.createElement('button');
  videoCard.className = 'card';
  videoCard.id = 'card';

  videoCard.innerHTML = `
    <figure class="card-video">
      <img loading="lazy" src="${videoObject.thumbnail}" alt="${videoObject.alt}" || "Thumbnail unavailable">
    </figure>
    <h3>${videoObject.title || "Untitled Video"}</h3>
    <p>${videoObject.description || "No description available."}</p>
    `;

    return videoCard;
}

// Load and Display videos in grid
async function displayVideos() {
  const videos = await fetchVideosfromJSON();
  const cardGrid = document.getElementById('card-grid');

  if (videos && videos.length > 0) {
    videos.forEach(video => {
      const card = CreateVideoCard(video);
      cardGrid.appendChild(card); // append card to card-grid
    });
  } else {
    cardGrid.innerHTML = "<p>No videos available.</p>";
  }
}

// Create element to display on the projector screen
function displayClickedVideo() {
  return console.log("Function was called");
}

// When video card is clicked set selected video to cover the entire projector screen.
function SetVideoToPlay() {
  const cardGrid = document.getElementById('card-grid');
  cardGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return; // User clicked outside of a card
    console.log("Video was clicked", card);
    displayClickedVideo();
  });
}

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

  // Request username till user enters a non-empty username or they cancel the prompt.
  while(userName !== null && userName.trim() === "")  {
    alert("Your username cannot be blank. Please enter a username.");
    userName = prompt("Enter a username so your friends can address you properly.");
  }

  // If user cancels just return null so caller can handle it
  if (userName === null) {
    console.log("User cancelled the username prompt");
    return null;
  }

  console.log("Username entered:", userName);

  return userName.trim();
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
  const chatHeader = document.getElementById('chat-header');

  // Store userName variable for session
  let userName = null;

  function UpdateChatHeader() {
    if (!userName || userName.trim() === "") {
      chatHeader.innerHTML = `
        <p>Click or Tap Chat Here to enter a username!</p>
      `;
    } else {
      chatHeader.innerHTML = `
        <p>Hello ${userName}!</p>
      `;
    }
  }

  // Set initial chat header
  UpdateChatHeader(); 

  // When user clicks chat input box prompt them to enter a username.
  // Only run click event if there is no stored username. (Ensures user can click off of chat box and click back without being prompted for username again)
  chatInput.addEventListener("click", () => {
    if (!userName) {
      userName = RequestUserName();

      // If user cancels prompt, do not update header
      if (userName === null) return;
    }

    // call function to update header with username
    UpdateChatHeader();
  });

  // Start bots random messages when the user clicks on the chat input box
  chatInput.addEventListener("click", TriggerRandomBotMessage);

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

  // This functions lets the bot send random messages at random intervals
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
}

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM content loaded");
  ToggleLightSwitch();
  ChatBoxAugmenting();
  displayVideos();
  SetVideoToPlay();
});