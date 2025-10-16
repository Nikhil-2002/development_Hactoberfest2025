const currencyRates = {
  USD: { rate: 1, flag: "🇺🇸" },
  EUR: { rate: 0.92, flag: "🇪🇺" },
  INR: { rate: 83.0, flag: "🇮🇳" },
  GBP: { rate: 0.78, flag: "🇬🇧" },
  JPY: { rate: 149.3, flag: "🇯🇵" },
  AUD: { rate: 1.52, flag: "🇦🇺" },
  CAD: { rate: 1.37, flag: "🇨🇦" },
  AED: { rate: 3.67, flag: "🇦🇪" },
  CNY: { rate: 7.28, flag: "🇨🇳" }
};

const fromSelect = document.getElementById("fromCurrency");
const toSelect = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

for (let currency in currencyRates) {
  let option1 = document.createElement("option");
  option1.value = currency;
  option1.textContent = `${currencyRates[currency].flag} ${currency}`;
  fromSelect.appendChild(option1);

  let option2 = document.createElement("option");
  option2.value = currency;
  option2.textContent = `${currencyRates[currency].flag} ${currency}`;
  toSelect.appendChild(option2);
}

fromSelect.value = "USD";
toSelect.value = "INR";

function convert() {
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (isNaN(amount) || amount <= 0) {
    result.textContent = "⚠️ Please enter a valid amount!";
    return;
  }

  const converted = (amount / currencyRates[from].rate) * currencyRates[to].rate;
  result.innerHTML = `
    <strong>${currencyRates[from].flag} ${amount} ${from}</strong> =
    <strong>${currencyRates[to].flag} ${converted.toFixed(2)} ${to}</strong>
  `;
}

convertBtn.addEventListener("click", convert);

// Live update when dropdown changes
fromSelect.addEventListener("change", convert);
toSelect.addEventListener("change", convert);
