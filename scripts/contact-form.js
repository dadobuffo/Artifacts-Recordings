function validateForm(name, email, message) {
  if (!name || !email || !message) {
    alert("Please fill out all required fields");
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address");
    return false;
  }

  return true;
}

async function submitForm(formData) {
  const response = await fetch("https://formspree.io/f/xbldaogz", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  });

  return response;
}

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!validateForm(name, email, message)) return;

  const formData = new FormData(contactForm);
  const submitButton = contactForm.querySelector("button[type='submit']");
  submitButton.disabled = true;

  try {
    const response = await submitForm(formData);

    if (response.ok) {
      alert("Thanks! I'll contact you as soon as possible");
      contactForm.reset();
    } else {
      alert(
        "An error occurred while sending the message. Please try again later."
      );
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while sending the message.");
  } finally {
    submitButton.disabled = false;
  }
});
