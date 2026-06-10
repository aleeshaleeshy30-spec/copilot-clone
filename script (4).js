let chatHistory = [];
let currentChatId = null;

const suggestionsList = [
  "Write a professional email",
  "Explain quantum computing simply",
  "Help me plan a trip to Paris",
  "Summarize the latest AI news",
  "Generate creative story ideas"
];

function init() {
  loadHistory();
  showSuggestions();
  addWelcomeMessage();
}

function addWelcomeMessage() {
  const messages = document.getElementById('chat-messages');
  messages.innerHTML = `
    <div class="message bot">
      Hello! I'm Copilot, your AI assistant.<br>
      How can I help you today?
    </div>
  `;
}

function showSuggestions() {
  const container = document.getElementById('suggestions');
  container.innerHTML = suggestionsList.map(text => `
    <div class="suggestion" onclick="useSuggestion('${text}')">${text}</div>
  `).join('');
}

function useSuggestion(text) {
  document.getElementById('user-input').value = text;
  sendMessage();
}

function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  
  if (!message) return;

  const messagesDiv = document.getElementById('chat-messages');

  // User message
  messagesDiv.innerHTML += `
    <div class="message user">${message}</div>
  `;

  input.value = '';

  // Simulate AI response
  setTimeout(() => {
    const responses = [
      "That's an interesting question! Here's what I think...",
      "Great point. Let me help you with that.",
      "Here's a detailed answer based on current knowledge."
    ];
    
    const botReply = responses[Math.floor(Math.random() * responses.length)] + 
                     "<br><br><strong>Response to:</strong> " + message;

    messagesDiv.innerHTML += `
      <div class="message bot">${botReply}</div>
    `;
    
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    // Save to history
    saveToHistory(message);
  }, 800);

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function saveToHistory(title) {
  const historyItem = {
    id: Date.now(),
    title: title.substring(0, 40) + (title.length > 40 ? '...' : ''),
    timestamp: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
  };
  
  chatHistory.unshift(historyItem);
  renderHistory();
}

function renderHistory() {
  const container = document.getElementById('chat-history');
  container.innerHTML = chatHistory.map(item => `
    <div class="history-item" onclick="loadChat(${item.id})">
      ${item.title}
    </div>
  `).join('');
}

function loadChat(id) {
  alert("Chat loading feature (Demo)");
  // In full version, this would load previous conversation
}

function newChat() {
  document.getElementById('chat-messages').innerHTML = '';
  addWelcomeMessage();
}

function loadHistory() {
  // Load from localStorage in real version
  renderHistory();
}

// Initialize the app
window.onload = init;