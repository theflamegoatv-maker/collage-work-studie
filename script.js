let cookies = 0;
let workers = 0;
let factories = 0;

let boostActive = false;
let superClickActive = false;
let realityBenderActive = false;

const scoreDisplay = document.getElementById("score");
const rarityDisplay = document.getElementById("rarity");
const cookieBtn = document.getElementById("cookie");
const workerBtn = document.getElementById("worker");
const factoryBtn = document.getElementById("factory");
const rarityList = document.getElementById("rarityList").getElementsByTagName("li");
const craftResult = document.getElementById("craftResult");
const skinSelector = document.getElementById("skinSelector");

const rarityCounts = {
  Common: 0,
  Epic: 0,
  Rare: 0,
  Legendary: 0,
  Mythical: 0,
  Cosmo: 0,
  Prizmatic: 0,
  "I̷̙̎̎m̵̎̌͜ȁ̶͔̓g̴͙̺̿̅i̷̧̙͑n̸̮̱̅a̷̤̳̒̑t̸̃ͅî̵͓͘ỏ̸͉̲n̷͍̐̔ͅ:̸͎͚̀:": 0,
  Crystallized: 0
};

cookieBtn.onclick = () => {
  let clickGain = superClickActive ? 5 : 1;
  cookies += clickGain;

  const rarity = getRarity();
  rarityCounts[rarity]++;
  rarityDisplay.textContent = rarity;
  updateRarityList();
  updateScore();

  if (rarity === "Cosmo") alert("You got COSMO: 0.5% Drop Chance");
  if (rarity === "Prizmatic") alert("You got PRIZMATIC: 0.10% Drop Chance");
  if (rarity === "I̷̙̎̎m̵̎̌͜ȁ̶͔̓g̴͙̺̿̅i̷̧̙͑n̸̮̱̅a̷̤̳̒̑t̸̃ͅî̵͓͘ỏ̸͉̲n̷͍̐̔ͅ:̸͎͚̀:") {
    alert("You got Imagination: 0.01% Drop Chance");
  }
  if (rarity === "Crystallized") {
    alert("You got Crystallized: 0.005% Drop Chance");
  }
};

workerBtn.onclick = () => {
  if (cookies >= 100) {
    cookies -= 100;
    workers += 1;
    updateScore();
  }
};

factoryBtn.onclick = () => {
  if (cookies >= 500) {
    cookies -= 500;
    factories += 1;
    updateScore();
  }
};

document.getElementById("craftBoost").onclick = () => {
  if (rarityCounts["Epic"] >= 1 && rarityCounts["Rare"] >= 1) {
    rarityCounts["Epic"] -= 1;
    rarityCounts["Rare"] -= 1;
    boostActive = true;
    craftResult.textContent = "Boost crafted! Auto-generation doubled.";
    updateRarityList();
  } else {
    craftResult.textContent = "Not enough Epic and Rare!";
  }
};

document.getElementById("craftSuperClick").onclick = () => {
  if (rarityCounts["Legendary"] >= 1 && rarityCounts["Mythical"] >= 1) {
    rarityCounts["Legendary"] -= 1;
    rarityCounts["Mythical"] -= 1;
    superClickActive = true;
    craftResult.textContent = "Super Click crafted! Each click gives +5 cookies.";
    updateRarityList();
  } else {
    craftResult.textContent = "Not enough Legendary and Mythical!";
  }
};

document.getElementById("craftRealityBender").onclick = () => {
  if (
    rarityCounts["Prizmatic"] >= 1 &&
    rarityCounts["I̷̙̎̎m̵̎̌͜ȁ̶͔̓g̴͙̺̿̅i̷̧̙͑n̸̮̱̅a̷̤̳̒̑t̸̃ͅî̵͓͘ỏ̸͉̲n̷͍̐̔ͅ:̸͎͚̀:"] >= 1
  ) {
    rarityCounts["Prizmatic"] -= 1;
    rarityCounts["I̷̙̎̎m̵̎̌͜ȁ̶͔̓g̴͙̺̿̅i̷̧̙͑n̸̮̱̅a̷̤̳̒̑t̸̃ͅî̵͓͘ỏ̸͉̲n̷͍̐̔ͅ:̸͎͚̀:"] -= 1;
    realityBenderActive = true;
    craftResult.textContent = "Reality Bender crafted! All rarities drop 2x more often.";
    updateRarityList();
  } else {
    craftResult.textContent = "Not enough Prizmatic and Imagination!";
  }
};

skinSelector.onchange = () => {
  cookieBtn.textContent = skinSelector.value;
};

function updateScore() {
  scoreDisplay.textContent = cookies;
}

function updateRarityList() {
  let i = 0;
  for (const key in rarityCounts) {
    rarityList[i].textContent = `${key}: ${rarityCounts[key]}`;
    i++;
  }
}

function getRarity() {
  const multiplier = realityBenderActive ? 2 : 1;
  const roll = Math.random() * 100;

  if (roll < 0.005 * multiplier) return "Crystallized";
  if (roll < 0.01 * multiplier) return "I̷̙̎̎m̵̎̌͜ȁ̶͔̓g̴͙̺̿̅i̷̧̙͑n̸̮̱̅a̷̤̳̒̑t̸̃ͅî̵͓͘ỏ̸͉̲n̷͍̐̔ͅ:̸͎͚̀:";
  if (roll < 0.11 * multiplier) return "Prizmatic";
  if (roll < 0.61 * multiplier) return "Cosmo";
  if (roll < 1.61 * multiplier) return "Mythical";
  if (roll < 7.61 * multiplier) return "Legendary";
  if (roll < 17.61 * multiplier) return "Rare";
  if (roll < 37.61 * multiplier) return "Epic";
  return "Common";
}

setInterval(() => {
  let autoGain = workers * 2 + factories * 10;
  if (boostActive) autoGain *= 2;
  cookies += autoGain;
  updateScore();
}, 1000);
