(function () {
    const api_Url = "https://ai-customer-support-six-nu.vercel.app/api/chat";
    const scriptTag = document.currentScript;
    
    // Pull the ownerId from the data attribute
    const ownerId = scriptTag ? scriptTag.getAttribute("data-owner-id") : null; 

    if (!ownerId) {
        console.error("Chat Widget: owner-id not found on script tag.");
        return;
    }

    // 1. Inject Modern CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .chat-widget-btn {
            position: fixed; bottom: 24px; right: 24px; width: 56px; height: 56px;
            border-radius: 50%; background: #2563eb; color: #fff;
            display: flex; align-items: center; justify-content: center;
            font-size: 24px; cursor: pointer; z-index: 999999;
            box-shadow: 0 4px 14px rgba(0,0,0,0.15); transition: transform 0.2s;
        }
        .chat-widget-btn:hover { transform: scale(1.05); }
        .chat-widget-box {
            position: fixed; bottom: 90px; right: 24px; width: 340px; height: 480px;
            border-radius: 16px; background: #fff; display: none; flex-direction: column;
            z-index: 999999; box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            overflow: hidden; border: 1px solid #e5e7eb;
        }
        .chat-header {
            background: #2563eb; color: #fff; padding: 16px; font-weight: 600;
            display: flex; justify-content: space-between; align-items: center;
        }
        .chat-close { cursor: pointer; font-size: 16px; font-family: sans-serif; opacity: 0.8; transition: opacity 0.2s;}
        .chat-close:hover { opacity: 1; }
        .chat-messages {
            flex: 1; padding: 16px; overflow-y: auto; background: #f9fafb;
            display: flex; flex-direction: column; gap: 12px;
        }
        .chat-bubble {
            max-width: 80%; padding: 10px 14px; border-radius: 12px; 
            font-size: 14px; line-height: 1.4; word-wrap: break-word;
        }
        .chat-bubble.user {
            align-self: flex-end; background: #2563eb; color: #fff;
            border-bottom-right-radius: 4px;
        }
        .chat-bubble.ai {
            align-self: flex-start; background: #e5e7eb; color: #1f2937;
            border-bottom-left-radius: 4px;
        }
        .chat-typing {
            font-size: 12px; color: #6b7280; font-style: italic; padding: 0 16px 8px;
            display: none; background: #f9fafb;
        }
        .chat-input-area {
            display: flex; padding: 12px; border-top: 1px solid #e5e7eb; background: #fff; gap: 8px;
        }
        .chat-input {
            flex: 1; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 20px;
            outline: none; font-size: 14px; transition: border-color 0.2s;
        }
        .chat-input:focus { border-color: #2563eb; }
        .chat-send {
            background: #2563eb; color: #fff; border: none; border-radius: 20px;
            padding: 0 16px; font-weight: 600; cursor: pointer; transition: background 0.2s;
        }
        .chat-send:hover { background: #1d4ed8; }
        .chat-send:disabled { background: #9ca3af; cursor: not-allowed; }
    `;
    document.head.appendChild(style);

    // 2. Build DOM Elements
    const button = document.createElement('div');
    button.className = 'chat-widget-btn';
    button.innerHTML = "💬";
    document.body.appendChild(button);

    const box = document.createElement('div');
    box.className = 'chat-widget-box';
    box.innerHTML = `
        <div class="chat-header">
            <span>Customer Support</span>
            <span class="chat-close" id="chat-close">✕</span>
        </div>
        <div class="chat-messages" id="chat-messages">
            <div class="chat-bubble ai">Hello! How can we help you today?</div>
        </div>
        <div class="chat-typing" id="chat-typing">AI is typing...</div>
        <div class="chat-input-area">
            <input type="text" id="chat-input" class="chat-input" placeholder="Type a message..." autocomplete="off" />
            <button id="chat-send" class="chat-send">Send</button>
        </div>
    `;
    document.body.appendChild(box);

    // 3. Element Selectors
    const messagesContainer = box.querySelector('#chat-messages');
    const inputField = box.querySelector('#chat-input');
    const sendButton = box.querySelector('#chat-send');
    const closeButton = box.querySelector('#chat-close');
    const typingIndicator = box.querySelector('#chat-typing');

    // 4. Toggle UI Logic
    button.onclick = () => {
        box.style.display = box.style.display === "flex" ? "none" : "flex";
        if (box.style.display === "flex") inputField.focus();
    };

    closeButton.onclick = () => {
        box.style.display = "none";
    };

    // 5. Add Message Function
    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-bubble ${sender}`; // Fixed: Removed the backslashes here
        msgDiv.textContent = text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; 
    }

    // 6. Handle API Request
    async function handleSend() {
        const text = inputField.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        inputField.value = '';
        inputField.disabled = true;
        sendButton.disabled = true;
        typingIndicator.style.display = 'block';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            const response = await fetch(api_Url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, ownerId: ownerId })
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            const replyText = typeof data === 'string' ? data : (data.message || "No response received.");
            
            addMessage(replyText, 'ai');

        } catch (error) {
            console.error("Chat error:", error);
            addMessage("Sorry, I'm having trouble connecting right now.", 'ai');
        } finally {
            inputField.disabled = false;
            sendButton.disabled = false;
            typingIndicator.style.display = 'none';
            inputField.focus();
        }
    }

    // 7. Event Listeners
    sendButton.onclick = handleSend;
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    });

})();