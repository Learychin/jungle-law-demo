import fs from "node:fs";
import vm from "node:vm";

class FakeClassList {
  add() {}
  remove() {}
  toggle() {}
}

class FakeElement {
  constructor(selector = "") {
    this.selector = selector;
    this.innerHTML = "";
    this.textContent = "";
    this.children = [];
    this.dataset = {};
    this.className = "";
    this.classList = new FakeClassList();
  }
  appendChild(child) {
    this.children.push(child);
    return child;
  }
  addEventListener() {}
  querySelectorAll() {
    return [];
  }
}

const known = new Map();
const selectors = [
  "#p1Board",
  "#p2Board",
  "#hand",
  "#handTitle",
  "#turnLabel",
  "#selectionHint",
  "#publicCounts",
  "#log",
  "#winnerBanner",
  "#player1Panel",
  "#player2Panel",
  "#p1Status",
  "#p2Status",
  "#p1Deck",
  "#p2Deck",
  "#p1Hand",
  "#p2Hand",
  "#p1Grave",
  "#p2Grave",
  "#endTurnBtn",
  "#newGameBtn",
  "#clearLogBtn",
  "#modeBtn",
  "#player2Label",
];
selectors.forEach((selector) => known.set(selector, new FakeElement(selector)));

const document = {
  body: new FakeElement("body"),
  querySelector(selector) {
    if (!known.has(selector)) known.set(selector, new FakeElement(selector));
    return known.get(selector);
  },
  querySelectorAll() {
    return [];
  },
  createElement() {
    return new FakeElement();
  },
};

const context = {
  window: {},
  document,
  console,
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
};
context.globalThis = context;

vm.createContext(context);
vm.runInContext(fs.readFileSync(new URL("./data.js", import.meta.url), "utf8"), context);
vm.runInContext(fs.readFileSync(new URL("./app.js", import.meta.url), "utf8"), context);

if (!context.window.JUNGLE_GAME_DATA?.cards?.length) {
  throw new Error("No cards loaded");
}

console.log(`loaded ${context.window.JUNGLE_GAME_DATA.cards.length} cards`);
