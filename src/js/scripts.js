const chatMessagesElement = document.getElementById('chatMessages');
const sendButton = document.getElementById('sendButton');
const userInputElement = document.getElementById('userInput');

const catIconImgPath = 'src/img/alexander-london-mJaD10XeD7w-unsplash.jpg';
const userIconImgPath = 'src/img/ben-sweet-2LowviVHZ-E-unsplash.jpg';

const catResponses = [
  'Meow!',
  'Purr...',
  'Mrow!',
  'Hiss!',
  'Chirp!',
  'Yowl!'
];

function getRandomCatResponse() {
  const randomIndex = Math.floor(Math.random() * catResponses.length);
  return catResponses[randomIndex];
}

function appendMessage(sender, message, isUser = false, imagePath = null) {
  const messageElement = document.createElement('div');
  const className = isUser ? 'user-message' : 'cat-message';
  messageElement.classList.add('message', className);

  let messageContent = '';
  if (!isUser) {
    const iconSrc = isUser ? userIconImgPath : catIconImgPath;
    messageContent = `<a href="pages/cat_detail.html"><img src="${iconSrc}" alt="Icon Image" class="icon"></a>`;
  }

  if (imagePath) {
    messageContent += `<br><img src="${imagePath}" alt="Attached Image">`;
  }

  messageContent += `<span class="message-content"> ${message}</span>`;
  
  messageElement.innerHTML = messageContent;
  chatMessagesElement.appendChild(messageElement);

  // Scroll to the bottom of the chat container
  chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
}

function simulateCatTyping() {
  chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
  return new Promise(resolve => {
    // Simulating a delay of 2 seconds (adjust as needed)
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

function checkInput() {
    if (userInputElement.value.trim() !== '') {
	sendButton.disabled = false;
	sendButton.style.opacity = 1;
	sendButton.style.pointerEvents = 'auto';
    } else {
	sendButton.disabled = true;
	sendButton.style.opacity = 0.5;
	sendButton.style.pointerEvents = 'none';
    }
}

async function sendMessage(event) {
  if (!event || event.key === 'Enter') {
    const userMessage = userInputElement.value;
    if (userMessage.trim() === '') return;

    appendMessage('You', userMessage, true);
    sendButton.disabled = true;
    sendButton.style.opacity = 0.5;
    sendButton.style.pointerEvents = 'none';

    // Simulate cat typing with blinking dots
    const dotsElement = document.createElement('span');
    dotsElement.classList.add('blinking-dots');
    dotsElement.textContent = '...';
    chatMessagesElement.appendChild(dotsElement);
    userInputElement.value = '';
    await simulateCatTyping();

    // Remove blinking dots and display cat's response
    chatMessagesElement.removeChild(dotsElement);
    const catResponse = getRandomCatResponse();
    appendMessage('Cat', catResponse);
  }
}
