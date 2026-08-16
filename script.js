/* =========================================================
   SANTAKRUPA PROVISION
   COMPLETE JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.querySelector(".mobile-menu-button");
const mobileNavigation = document.querySelector(".mobile-navigation");

if (menuButton && mobileNavigation) {

    menuButton.addEventListener("click", () => {

        mobileNavigation.classList.toggle("show");

        const icon = menuButton.querySelector("i");

        if (icon) {

            if (mobileNavigation.classList.contains("show")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });


    /* Close mobile menu after clicking a link */

    const mobileLinks =
        mobileNavigation.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileNavigation.classList.remove("show");

            const icon = menuButton.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    });

}



/* =========================================================
   CHATBOT ELEMENTS
========================================================= */

const chatbotButton =
    document.querySelector(".chatbot-button");

const chatbot =
    document.querySelector(".chatbot");

const chatbotClose =
    document.querySelector(".chatbot-header button");

const chatInput =
    document.querySelector(".chat-input-area input");

const chatSendButton =
    document.querySelector(".chat-input-area button");

const chatMessages =
    document.querySelector(".chat-messages");



/* =========================================================
   OPEN CHATBOT
========================================================= */

if (chatbotButton && chatbot) {

    chatbotButton.addEventListener("click", (event) => {

        event.stopPropagation();

        chatbot.classList.toggle("active");

    });

}



/* =========================================================
   CLOSE CHATBOT
========================================================= */

if (chatbotClose && chatbot) {

    chatbotClose.addEventListener("click", (event) => {

        event.stopPropagation();

        chatbot.classList.remove("active");

    });

}



/* =========================================================
   ADD USER MESSAGE
========================================================= */

function addUserMessage(message) {

    if (!chatMessages) {
        return;
    }

    const messageBox =
        document.createElement("div");

    messageBox.className = "user-message";

    messageBox.textContent = message;

    chatMessages.appendChild(messageBox);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}



/* =========================================================
   ADD AI MESSAGE
========================================================= */

function addBotMessage(message) {

    if (!chatMessages) {
        return;
    }

    const messageBox =
        document.createElement("div");

    messageBox.className = "bot-message";

    messageBox.textContent = message;

    chatMessages.appendChild(messageBox);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}



/* =========================================================
   AI TYPING MESSAGE
========================================================= */

function addTypingMessage() {

    if (!chatMessages) {
        return null;
    }

    const typingBox =
        document.createElement("div");

    typingBox.className = "bot-message";

    typingBox.textContent =
        "Typing...";

    typingBox.id =
        "ai-typing-message";

    chatMessages.appendChild(typingBox);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

    return typingBox;
}



/* =========================================================
   REMOVE TYPING MESSAGE
========================================================= */

function removeTypingMessage() {

    const typingMessage =
        document.getElementById(
            "ai-typing-message"
        );

    if (typingMessage) {

        typingMessage.remove();

    }

}



/* =========================================================
   SEND MESSAGE TO REAL AI BACKEND
========================================================= */

async function sendMessage() {

    if (!chatInput || !chatMessages) {
        return;
    }


    const message =
        chatInput.value.trim();


    /* Don't send empty message */

    if (message === "") {
        return;
    }


    /* Show user's message */

    addUserMessage(message);


    /* Clear input */

    chatInput.value = "";


    /* Show typing */

    addTypingMessage();


    try {

        const response =
            await fetch(
                "http://localhost:3000/api/chat",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        message: message
                    })
                }
            );


        /* Remove typing */

        removeTypingMessage();


        /* Check server response */

        if (!response.ok) {

            throw new Error(
                "Server returned an error"
            );

        }


        const data =
            await response.json();


        /* AI reply received */

        if (data.reply) {

            addBotMessage(
                data.reply
            );

        } else {

            addBotMessage(
                "Sorry, mujhe abhi response nahi mil pa raha. Please try again."
            );

        }


    } catch (error) {

        console.error(
            "Chatbot Error:",
            error
        );


        removeTypingMessage();


        addBotMessage(
            "AI assistant se connection nahi ho pa raha. Please make sure the AI server is running."
        );

    }

}



/* =========================================================
   SEND BUTTON
========================================================= */

if (chatSendButton) {

    chatSendButton.addEventListener(
        "click",
        sendMessage
    );

}



/* =========================================================
   ENTER KEY TO SEND
========================================================= */

if (chatInput) {

    chatInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                event.preventDefault();

                sendMessage();

            }

        }
    );

}



/* =========================================================
   CLOSE CHATBOT WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    (event) => {

        if (!chatbot || !chatbotButton) {
            return;
        }


        if (
            chatbot.classList.contains("active") &&
            !chatbot.contains(event.target) &&
            !chatbotButton.contains(event.target)
        ) {

            chatbot.classList.remove("active");

        }

    }
);



/* =========================================================
   ESC KEY TO CLOSE CHATBOT
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            chatbot
        ) {

            chatbot.classList.remove(
                "active"
            );

        }

    }
);



/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "Santakrupa Provision website loaded successfully."
);

console.log(
    "AI chatbot frontend is connected to the backend."
);