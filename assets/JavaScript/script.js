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

  videoCard.innerHTML = `
    <figure class="card-video">
      <img loading="lazy" src="${videoObject.thumbnail}" alt="${videoObject.alt}" || "Thumbnail unavailable">
    <figure>
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

// When video card is clicked set selected video to cover the entire projector screen.
// function SetVideoToPlay() {}

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
  ChatBoxAugmenting();
  displayVideos();
});