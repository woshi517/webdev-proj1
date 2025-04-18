document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const dateField = document.querySelector("#date");
    const timeField = document.querySelector("#timeticket");
    const visitorsField = document.querySelector("#people");
    const submitButton = form.querySelector('[type="submit"]');
    const resetButton = form.querySelector('[type="reset"]');
    const reservation = document.querySelector(".reservation");

    function clearErrors() {
        const errorMsg = reservation.querySelectorAll(".error, .success");
        errorMsg.forEach(msg => msg.remove());
    }

    function displayMessage(message, isError = true) {
        const msgText = document.createElement("div");
        msgText.textContent = message;
        msgText.classList.add(isError? "error" : "success");
        const submitButton = reservation.querySelector("fieldset input[type='submit']");
        submitButton.parentNode.insertBefore(msgText, submitButton);
    }

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        clearErrors();
        const date = dateField.value.trim();
        const time = timeField.value.trim();
        const visitor_num = visitorsField.value.trim();

        if (date === "" || time === "" || visitor_num === "") {
            displayMessage("Data not completed; please re-enter");
            return;
        }

        const visitors = parseInt(visitor_num, 10);
        if (isNaN(visitors) || visitors < 1) {
            displayMessage("Please enter a valid number of people!");
            return;
        }

        const result = reserve(date, time, visitors);
        if (result) {
            displayMessage("Your reservation is successful!", false);
        } 
        else {
            displayMessage("Sorry, the reservation is full!");
            }
           
    });
    
    resetButton.addEventListener("click", () => {
        clearErrors();
    });
});
