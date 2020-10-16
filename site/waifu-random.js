function roll() {
    let n = Math.floor(Math.random() * WAIFULIST.length);
    let picked = WAIFULIST[n];
    if (picked) {
        display.textContent = picked.join("\n");
        WAIFULIST.splice(n, 1);
    }
    else display.textContent = "You're out of waifus and husbandos!";
}

var WAIFULIST_FULL = []; // I doubt this matters but you never know. Be nice to your hosts...
var WAIFULIST = [];
const display = document.getElementById("result");
document.getElementById("generate").addEventListener("click", roll);
document.getElementById("reset").addEventListener("click", reset);
window.addEventListener("beforeunload", () => localStorage.setItem("rng-waifu-picker", JSON.stringify(WAIFULIST)));
load();

function load() {
    let data = localStorage.getItem("rng-waifu-picker");
    if (data) {
        WAIFULIST = JSON.parse(data);
        roll();
    }
    else getWaifus().then(roll);
}

function getWaifus() {
    return fetch("../waifus.csv")
        .then(r => r.text())
        .then(t => {
            t.split(/\r?\n+/).forEach((e, i) => {
                if (i != 0 && e != "") {
                    WAIFULIST_FULL.push(e.match(/(?! )[^,"]+(?<! )/g));
                    WAIFULIST = Array.from(WAIFULIST_FULL);
                }
            });
        });
}

function reset() {
    localStorage.removeItem("rng-waifu-picker");
    WAIFULIST_FULL.length ? WAIFULIST = WAIFULIST_FULL : getWaifus();
    display.textContent = "Rolls reset!";
}
