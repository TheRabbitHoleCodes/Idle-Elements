git clone https://github.com/username/username.github.io

var v = 1.0;
var player = {
    money: { water: 0, fire: 0, aire: 0, earth: 0 },
    pixels: { water: { max: 0, cur: 0 }, fire: { max: 0, cur: 0 }, air: { max: 0, cur: 0 }, earth: { max: 0, cur: 0 },
    level: { water: 0, fire: 0, air: 0, earth: 0},
    unlock: false,
    spliced: { water: 0, fire: 0, air: 0, earth: 0 },
    currency: 0,
    specced: 0,
    currencyLevel: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1],
    options: { fast: false, fps: 50, notation: "Default" },
    currencyTimer: 0,
    wastedTime: 0,
    sleepingTime:0,
    previousCurrency: [{ time: 0, amount: 0}, { time: 0, amount: 0}, { time: 0, amount: 0}, { time: 0, amount: 0}, { time: 0, amount: 0}],
    lastUpdate: Date.now(),
    prism: { active: false, potency: { points: 0, total: 0, water: -1, fire: -1, air: -1, earth: -1 }, specbar: { water: false, fire: false, air: false, earth: false }, potencyEff: { water: 1 / 256, fire: 1 / 256, air: 1 / 256, earth: 1 / 256 }, cost: 0,},
    specbar: { water: false, fire: false, air: false, earth: false},
    elements: 0,
    AB: { water: true, fire: true, air: true, earth: true },
    CM: 1,
    progress: [],
    advSpec: { unlock: false, multi: 1, max: 50, reduce: 0.1, time: 0, active: false, gain: 0, SR: 0 },
    potencyEff: {water:1/256, fire:1/256,air:1/256,earth:1/256},
}
let resetplayer;
  
var p3 = true;
var p10 = 0;
var ABInt = {water:2000,fire:2000,air:2000,earth:2000};
var Cores = 1;
var Clock = 1;
var RUM = 1;
var tab = "Elements";
var subtab = {shop:"Upgrades"}
var price = { water: 10, fire: 20, air: 40, earth: 80 };
var income = {water:0, fire:0, air: 0, earth: 0};
var click = 10;
var auto = 0;
var RSS = 0;
var PD = 0;
var BPD = 0;
var SR = 0;
var SR5 = 0;
var ShopPrice = [1, 1, 3, 5, 5, 7, 10, 30, 50, 75, 300, 500, 1500, 2500, 25000, 100000, 1e10, 1e13, 1e25, 1e35, 1e50];

function bar(n,w,f,a,e,elemid) {
    this.name = n;
    this.element = [w, f, a, e];
    this.width = 0;
    this.element = document.getElementById(elemid);
    this.mouse = 0;
    this.draw = function (dif) {
        if (this.mouse == 1) {
            player.CM += 10 * (dif / 1000);
            increase(Log.multi(Log.multi(click, 50), (dif / 1000)),dif);
        } else if (this.name == "water" && player.CM > 1 && player.currencyLevel[3] === 0) {
            player.CM -= 7.5 * (dif / 1000);
            player.CM = Math.max(player.CM, 1);
        }
        if (Log.get((this.name == "water" ? Log.multi(Log.add(Log.div(auto, 1000 / player.options.fps), (player.bars.water.mouse === 1 ? click : 0)) this.element.style.width = "100%";
        else this.element.style.width = Log.get(Log.div(this.width,2.56),"num") + "%";
        this.element.style.background = RGBstring(this.color);
    }
    this.setup = function () {
        var temp = this.name;
        this.element.parentNode.onmousedown = function () { press(temp, 1) };
        this.element.parentNode.onmouseup = function () { press(temp, 0) };
        this.element.parentNode.onmouseleave = function () { press(temp, 0) };
        this.element.parentNode.ontouchstart = function () { press(temp, 1) };
        this.element.parentNode.ontouchstop = function () { press(temp, 0) };
        this.element.parentNode.ontouchcancel = function () { press(temp, 0) };
    }
}
                     
      function init() {
    resetplayer = Object.assign({version:v},player);
    setupPlayer();
    for (var i = 0; i < Object.keys(player.bars).length ; i++) player.bars[Object.keys(player.bars)[i]].draw();
    setInterval(save, 3000);
    window.mainLoop = setInterval(gameLoop, 1000 / player.options.fps);
    window.ABLoop = setInterval(autoBuyer, 10);
    window.ABcount = 0;
}
  
  function gameLoop() {
    var dif = Date.now() - player.lastUpdate;
    player.lastUpdate = Date.now();
    player.currencyTimer += dif;
    player.wastedTime += dif;
    if (Date.now() % (player.advElement.unlock ? 1000 : 60000) < dif) CalcSRgain();
    updateStats()
    increase(Log.multi(auto, (dif / 1000)), dif);
    for (var i = 0; i < Object.keys(player.bars).length ; i++) player.bars[Object.keys(player.bars)[i]].draw(dif);
    if (SumOf(player.currencyLevel) >= 9) document.getElementsByClassName("switch")[5].classList.remove("hidden");
    if (player.element.active) document.getElementsByClassName("switch")[6].classList.remove("hidden");
    if (player.money.water >= 1) document.getElementsByClassName("switch")[1].classList.remove("hidden");
    if (player.specced > 0) {
        document.getElementsByClassName("switch")[1].classList.remove("hidden");
        document.getElementsByClassName("switch")[3].classList.remove("hidden");
        document.getElementById("tabElements").childNodes[1].classList.add("hidden");
        document.getElementById("tabElements").childNodes[3].classList.remove("hidden");
    }
    render[tab]();
    if (tab == "Shop") render[subtab.shop]();
}
  
  
