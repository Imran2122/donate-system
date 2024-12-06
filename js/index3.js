const allButtons = document.getElementsByClassName("donate-button");

for (const button of allButtons) {
  button.addEventListener("click", function () {
    const parentSection = button.closest(".hero-content"); // Get the parent section of the clicked button

    // Retrieve necessary elements dynamically
    const inputField = parentSection.querySelector("input");
    const cartBalanceElement = parentSection.querySelector(
      "[id^='cartBalance']"
    );
    const mainBalanceElement = document.getElementById("mainBalance");

    // Parse input values
    const donationAmount = parseFloat(inputField.value);
    if (isNaN(donationAmount) || donationAmount <= 0) {
      alert("Please enter a valid donation amount greater than 0.");
      return;
    }
    const currentCartBalance = parseFloat(cartBalanceElement.innerText);
    const currentMainBalance = parseFloat(mainBalanceElement.innerText);

    // Validate donation amount
    if (donationAmount <= 0 || donationAmount > currentMainBalance) {
      alert("Invalid donation amount or insufficient balance.");
      inputField.value = "";
      return;
    }

    // Update balances
    cartBalanceElement.innerText = currentCartBalance + donationAmount;
    mainBalanceElement.innerText = currentMainBalance - donationAmount;

    // Append donation history
    const title = parentSection.querySelector("h1").innerText;
    const appendContainer = document.getElementById("appendContent");

    const historyEntry = document.createElement("h3");
    historyEntry.style.fontSize = "20px";
    historyEntry.innerHTML = `
      Donated <b>${donationAmount} BDT</b> to ${title}  </br> at ${new Date().toLocaleTimeString()}
    `;
    appendContainer.appendChild(historyEntry);

    // Clear input field after donation
    inputField.value = "";
  });
}

const historyTab = document.getElementById("historyButton");
const donateTab = document.getElementById("DonationButton");
const donateHistory = document.getElementById("donateHistory");
const appendContent = document.getElementById("appendContent");

// Function to toggle active states
function activateTab(activeTab, inactiveTab) {
  activeTab.classList.add("btn-active", "btn-secondary");
  inactiveTab.classList.remove("btn-active", "btn-secondary");
}

// Function to toggle visibility of content
function toggleContent(showElement, hideElement) {
  showElement.classList.remove("hidden");
  hideElement.classList.add("hidden");
}

// Event listeners
historyTab.addEventListener("click", function () {
  activateTab(historyTab, donateTab);
  toggleContent(appendContent, donateHistory);
});

donateTab.addEventListener("click", function () {
  activateTab(donateTab, historyTab);
  toggleContent(donateHistory, appendContent);
});

// Redirect to another page when "addBlog" is clicked
document.getElementById("addBlog").addEventListener("click", function () {
  window.location.href = "/question.html";
});
