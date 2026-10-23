
const billingToggle = document.getElementById("billing-toggle");
const monthlyLabel = document.getElementById("monthly-label");
const yearlyLabel = document.getElementById("yearly-label");
const planCards = document.querySelectorAll(".plan-card");

let yearlyBilling = false;

function updatePricing() {
    billingToggle.setAttribute("aria-checked", String(yearlyBilling));

    monthlyLabel.classList.toggle("active", !yearlyBilling);
    yearlyLabel.classList.toggle("active", yearlyBilling);

    planCards.forEach(card => {
        const monthlyPrice = Number(card.dataset.monthly);
        const yearlyPrice = Number(card.dataset.yearly);

        const amount = card.querySelector(".amount");
        const period = card.querySelector(".period");
        const note = card.querySelector(".billing-note");

        if (yearlyBilling) {
            const effectiveMonthly = yearlyPrice / 12;

            amount.textContent = effectiveMonthly === 0
                ? "0"
                : effectiveMonthly.toFixed(2).replace(/\.?0+$/, "");

            period.textContent = "/month";
            note.textContent = yearlyPrice === 0
                ? card.dataset.period
                : `Billed $${yearlyPrice} annually`;
        } else {
            amount.textContent = monthlyPrice;
            period.textContent = "/month";
            note.textContent = card.dataset.period === "Free forever"
                ? "Free forever"
                : "Billed monthly";
        }
    });
}

billingToggle.addEventListener("click", () => {
    yearlyBilling = !yearlyBilling;
    updatePricing();
});

updatePricing();
