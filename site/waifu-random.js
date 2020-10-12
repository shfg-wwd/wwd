function roll() {
    let picked = WAIFULIST[(Math.floor(Math.random() * WAIFULIST.length))];
    let fields = picked.match(/([^, ][^,]+)/g);
    display.textContent = `${fields.join("\n")}`;
}

const display = document.getElementById("result");
document.getElementById("generate").addEventListener("click", roll);

fetch("../waifus.csv")
    .then(r => r.text())
    .then(t => {
        WAIFULIST = t.split(/\n+/).filter((e, i) => i != 0 && e != "");
        roll();
    })
