function roll() {
    let picked = WAIFULIST[(Math.floor(Math.random() * WAIFULIST.length))];
    let [name, series, bday] = picked.match(/([^, ][^,]+)/g);
    display.textContent = `${name}${series ? `\n${series}` : ""}${bday ? `\n${bday}` : ""}`;
}

const display = document.getElementById("result");
document.getElementById("generate").addEventListener("click", roll);

fetch("../waifus.csv")
    .then(r => r.text())
    .then(t => {
        WAIFULIST = t.split(/\n+/).filter((e, i) => i != 0 && e != "");
        roll();
    })
