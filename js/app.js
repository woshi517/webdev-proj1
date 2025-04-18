document.addEventListener("DOMContentLoaded", () => {
    const resultBody = document.getElementById("result-body");
    const submitButton = document.getElementById("submit-btn");
    const clearButton = document.getElementById("clear-btn");
    const submissionTime = document.getElementById("submission-time");
    const companiesAppliedCount = document.getElementById("totalcomps");
    const feedbackMessage = document.createElement("p");
    feedbackMessage.id = "feedback-message";
    document.querySelector(".resulting").appendChild(feedbackMessage);

    const ranks = Array(10).fill(null); // Keeps track of chosen ranks
    const companies = new Set(); // Keeps track of chosen companies

    const zoneMapping = {
        tech: "Technology Zone",
        innovation: "Innovation Zone",
        ecotech: "Ecology Zone"
    };

    // Get ordinal for numbers
    const getOrdinal = (n) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    const updateTable = () => {
        resultBody.innerHTML = "";
    
        for (let i = 0; i < ranks.length; i++) {
            const row = document.createElement("tr");
            const zoneCell = document.createElement("td");
            const companyCell = document.createElement("td");
            const rankCell = document.createElement("td");
    
            if (ranks[i]) {
                zoneCell.textContent = zoneMapping[ranks[i].zone] || ""; 
                companyCell.textContent = ranks[i].company || "";
            } else {
                zoneCell.textContent = "";
                companyCell.textContent = "";
            }
    
            rankCell.textContent = i + 1;
    
            row.appendChild(zoneCell);
            row.appendChild(companyCell);
            row.appendChild(rankCell);
    
            resultBody.appendChild(row);
        }
    
        companiesAppliedCount.textContent = `Total Number of Companies Applied: ${companies.size}`;
    };
    
    // Rank of choice
    document.querySelectorAll(".apply form").forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const company = form.querySelector("label").textContent.trim();
            const rankInput = form.querySelector("input").value.trim();
            const zone = form.closest("div").classList[0];
            const rank = parseInt(rankInput, 10);
            if (!rankInput || isNaN(rank)) {
                alert("Please enter the rank of chosen company.");
                return;
            }
            if (rank < 1 || rank > 10) {
                alert("Please enter the rank of chosen between 1 and 10.");
                return;
            }
            if (ranks[rank - 1]) {
                alert("You have already chosen this rank.");
                return;
            }
            if (companies.has(company)) {
                alert("You have already chosen this company.");
                return;
            }

            ranks[rank - 1] = { zone, company };
            companies.add(company);
            alert(`You have chosen ${company} as your ${getOrdinal(rank)} chosen company in ${zone} successfully`);
            updateTable();
        });
    });

    // Check for gaps
    const checkForGaps = (ranks) => {
        const gaps = [];
    
        for (let i = 0; i < ranks.length; i++) {
            if (ranks[i]) {
                for (let j = i - 1; j >= 0; j--) {
                    if (!ranks[j]) {
                        gaps.unshift(getOrdinal(j + 1));
                    } else {
                        break;
                    }
                }
            }
        }
        return gaps; 
    };
    
    // "Submit" button click
    submitButton.addEventListener("click", () => {
        const gaps = checkForGaps(ranks);
        if (companies.size === 0) {
            feedbackMessage.textContent = "You have not chosen any company.";
        } else if (gaps.length > 0) {
            feedbackMessage.textContent = `You have not chosen your ${gaps.join(", ")} Company. You cannot leave any gap between your chosen companies.`;
        } else {
            feedbackMessage.textContent = `You have successfully submitted your application at time: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" })} GMT +08 (China Standard Time).`;
            submissionTime.textContent = `Last change time: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" })} GMT +08 (China Standard Time)`;

        }
    });

    // "Clear" button click
    clearButton.addEventListener("click", () => {
        ranks.fill(null);
        companies.clear();
        updateTable();
    });
    
});
