    const chatMessagesElement = document.getElementById('chatMessages');
    const userInputElement = document.getElementById('userInput');

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
  const iconClass = isUser ? 'user-icon' : 'cat-icon';
  messageElement.classList.add('message', className, 'speech-bubble');
  
  let messageContent = `<span class="${iconClass}"></span><strong>${sender}:</strong>`;
  
  if (imagePath) {
    messageContent += `<br><img src="${imagePath}" alt="Attached Image">`;
  }
  
  messageContent += ` ${message}`;
  
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

    async function sendMessage(event) {
      if (!event || event.key === 'Enter') {
        const userMessage = userInputElement.value;
        if (userMessage.trim() === '') return;

        appendMessage('You', userMessage, true);

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
