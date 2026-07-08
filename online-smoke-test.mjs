import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

class FakeClassList {
  constructor() {
    this.tokens = new Set();
  }
  add(...names) {
    names.forEach((name) => this.tokens.add(name));
  }
  remove(...names) {
    names.forEach((name) => this.tokens.delete(name));
  }
  contains(name) {
    return this.tokens.has(name);
  }
  toggle(name, force) {
    if (force === true) {
      this.tokens.add(name);
      return true;
    }
    if (force === false) {
      this.tokens.delete(name);
      return false;
    }
    if (this.tokens.has(name)) {
      this.tokens.delete(name);
      return false;
    }
    this.tokens.add(name);
    return true;
  }
}

class FakeElement {
  constructor(selector = "") {
    this.selector = selector;
    this._innerHTML = "";
    this.textContent = "";
    this.children = [];
    this.dataset = {};
    this.className = "";
    this.classList = new FakeClassList();
    this.disabled = false;
    this.style = {};
    this.title = "";
    this.href = "";
    this.download = "";
    this.attributes = {};
    this.listeners = {};
  }
  set innerHTML(value) {
    this._innerHTML = value;
    this.children = [];
  }
  get innerHTML() {
    return this._innerHTML;
  }
  appendChild(child) {
    this.children.push(child);
    return child;
  }
  addEventListener(type, listener) {
    this.listeners[type] = this.listeners[type] || [];
    this.listeners[type].push(listener);
  }
  click() {
    (this.listeners.click || []).forEach((listener) => listener({ target: this }));
  }
  remove() {}
  setAttribute(name, value) {
    this.attributes[name] = String(value);
  }
  select() {}
  querySelector() {
    return null;
  }
  querySelectorAll() {
    return [];
  }
}

class FakeEmitter {
  constructor() {
    this.listeners = new Map();
  }
  on(type, listener) {
    const list = this.listeners.get(type) || [];
    list.push(listener);
    this.listeners.set(type, list);
    return this;
  }
  emit(type, ...args) {
    (this.listeners.get(type) || []).forEach((listener) => listener(...args));
  }
}

class FakeDataConnection extends FakeEmitter {
  constructor(options = {}) {
    super();
    this.options = options;
    this.open = false;
    this.pair = null;
  }
  send(message) {
    if (!this.open) throw new Error("Connection is not open");
    const size = Buffer.byteLength(JSON.stringify(message), "utf8");
    if (this.options.serialization === "json" && size > 16300) {
      throw new Error(`Message too big for JSON channel (${size} bytes)`);
    }
    setTimeout(() => this.pair?.emit("data", JSON.parse(JSON.stringify(message))), 0);
  }
  close() {
    this.open = false;
    this.emit("close");
  }
}

function makeFakePeerClass(registry) {
  return class FakePeer extends FakeEmitter {
    constructor() {
      super();
      this.id = `peer-${registry.nextId++}`;
      registry.peers.set(this.id, this);
      setTimeout(() => this.emit("open", this.id), 0);
    }
    connect(peerId, options = {}) {
      const remotePeer = registry.peers.get(peerId);
      if (!remotePeer) {
        const conn = new FakeDataConnection(options);
        setTimeout(() => this.emit("error", new Error(`missing peer ${peerId}`)), 0);
        return conn;
      }
      const local = new FakeDataConnection(options);
      const remote = new FakeDataConnection(options);
      local.pair = remote;
      remote.pair = local;
      setTimeout(() => {
        remotePeer.emit("connection", remote);
        setTimeout(() => {
          local.open = true;
          remote.open = true;
          local.emit("open");
          remote.emit("open");
        }, 0);
      }, 0);
      return local;
    }
    destroy() {
      registry.peers.delete(this.id);
      this.emit("close");
    }
  };
}

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
  "#handPeek",
  "#p1Status",
  "#p2Status",
  "#p1Deck",
  "#p2Deck",
  "#p1Hand",
  "#p2Hand",
  "#p1Grave",
  "#p2Grave",
  "#p1Hype",
  "#p2Hype",
  "#p1Cue",
  "#p2Cue",
  "#endTurnBtn",
  "#newGameBtn",
  "#clearLogBtn",
  "#modeBtn",
  "#aiPersonaBtn",
  "#player1Label",
  "#player2Label",
  "#turnMood",
  "#routeStrip",
  "#saveStatus",
  "#coachNote",
  "#coachTag",
  "#coachTitle",
  "#coachDetail",
  "#coachAside",
  "#actionStinger",
  "#liveReaction",
  "#momentumStrip",
  "#momentRack",
  "#starterRail",
  "#guideActions",
  "#guideCue",
  "#guideShortcut",
  "#guidePrimaryBtn",
  "#guideMeta",
  "#guidePayoff",
  "#guideFocus",
  "#stageDeck",
  "#mobileGuide",
  "#mobileGuideBadge",
  "#mobileGuideSummary",
  "#mobileGuidePayoff",
  "#mobileGuidePrimaryBtn",
  "#stageTabPlaybook",
  "#stageTabQuest",
  "#stageTabHype",
  "#stageTabShowtime",
  "#stagePlaybookMeta",
  "#stageQuestMeta",
  "#stageHypeMeta",
  "#stageShowtimeMeta",
  "#stageSheetPlaybook",
  "#stageSheetQuest",
  "#stageSheetHype",
  "#stageSheetShowtime",
  "#recordBlurb",
  "#archiveShelf",
  "#intelTabReport",
  "#intelTabDisaster",
  "#intelTabPool",
  "#intelReportMeta",
  "#intelDisasterMeta",
  "#intelPoolMeta",
  "#publicPanel",
  ".pile.level-a",
  ".pile.level-b",
  ".pile.level-c",
  "#chaosPanel",
  "#logPanel",
  "#disasterMeta",
  "#disasterCard",
  "#disasterTip",
  "#questMeta",
  "#questCard",
  "#questTip",
  "#hypeBox",
  "#hypeMeta",
  "#hypeFill",
  "#hypeAlert",
  "#hypeTip",
  "#showtimeMeta",
  "#showtimeScore",
  "#showtimeTitle",
  "#showtimeChips",
  "#showtimeRewardsWrap",
  "#showtimeRewards",
  "#showtimeReplayWrap",
  "#showtimeReplay",
  "#showtimeTip",
  "#playbookMeta",
  "#playbookList",
  "#playbookTip",
  "#actionResourceBand",
  "#actionTacticsBand",
  "#actionPressureBand",
  "#actionDefenseBand",
  "#resourceMeta",
  "#tacticsMeta",
  "#pressureMeta",
  "#defenseMeta",
  "#resourceCue",
  "#tacticsCue",
  "#pressureCue",
  "#defenseCue",
  "#tacticsLock",
  "#pressureLock",
  "#exportCurrentBtn",
  "#exportArchiveBtn",
  "#onlineHostBtn",
  "#onlineCopyBtn",
  "#onlineLeaveBtn",
];

const actionNames = [
  "drawPrivate",
  "drawA",
  "drawB",
  "drawC",
  "disaster",
  "skill",
  "cancelSelection",
  "recover",
  "move",
  "sacrifice",
  "attackPlayer",
  "attackCreature",
  "confirmGuard",
  "letThrough",
];

function makeStorage() {
  const storage = new Map();
  return {
    getItem(key) {
      return storage.has(key) ? storage.get(key) : null;
    },
    setItem(key, value) {
      storage.set(key, String(value));
    },
    removeItem(key) {
      storage.delete(key);
    },
  };
}

function makeDocument() {
  const known = new Map();
  selectors.forEach((selector) => known.set(selector, new FakeElement(selector)));

  const actionButtons = actionNames.map((action) => {
    const button = new FakeElement(`[data-action="${action}"]`);
    button.dataset.action = action;
    return button;
  });
  const stageTabButtons = ["playbook", "quest", "hype", "showtime"].map((tab) => {
    const button = new FakeElement(`[data-stage-tab="${tab}"]`);
    button.dataset.stageTab = tab;
    return button;
  });
  const intelTabButtons = ["report", "disaster", "pool"].map((tab) => {
    const button = new FakeElement(`[data-intel-tab="${tab}"]`);
    button.dataset.intelTab = tab;
    return button;
  });
  const mobileBandToggles = ["resource", "tactics", "pressure", "defense"].map((band) => {
    const head = new FakeElement(`[data-mobile-band-toggle="${band}"]`);
    head.dataset.mobileBandToggle = band;
    return head;
  });

  const document = {
    body: new FakeElement("body"),
    querySelector(selector) {
      if (!known.has(selector)) known.set(selector, new FakeElement(selector));
      return known.get(selector);
    },
    querySelectorAll(selector) {
      if (selector === "[data-action]") return actionButtons;
      if (selector === "[data-stage-tab]") return stageTabButtons;
      if (selector === "[data-intel-tab]") return intelTabButtons;
      if (selector === "[data-mobile-band-toggle]") return mobileBandToggles;
      return [];
    },
    createElement(tagName = "div") {
      return new FakeElement(tagName);
    },
    addEventListener() {},
    execCommand() {
      return false;
    },
  };
  return { document, known, actionButtons };
}

function makeAppContext({ url, Peer }) {
  const { document, known, actionButtons } = makeDocument();
  const location = new URL(url);
  const window = {
    localStorage: makeStorage(),
    location,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    prompt() {},
    navigator: {},
  };
  const context = {
    window,
    document,
    console,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    Blob,
    URL,
    URLSearchParams,
    Peer,
  };
  context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(new URL("./data.js", import.meta.url), "utf8"), context);
  vm.runInContext(fs.readFileSync(new URL("./sprite-data.js", import.meta.url), "utf8"), context);
  vm.runInContext(fs.readFileSync(new URL("./app.js", import.meta.url), "utf8"), context);
  return { context, debug: context.window.__JUNGLE_DEBUG__, known, actionButtons };
}

function delay(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitFor(label, predicate, timeoutMs = 500) {
  const start = Date.now();
  let last;
  while (Date.now() - start < timeoutMs) {
    last = predicate();
    if (last) return last;
    await delay(5);
  }
  assert.fail(`${label} timed out; last=${JSON.stringify(last)}`);
}

function compactGame(debug) {
  const game = debug.getGame();
  return {
    mode: game.mode,
    active: game.active,
    turn: game.turn,
    p0: {
      name: game.players[0].name,
      hand: game.players[0].hand.length,
      food: game.players[0].food,
      hp: game.players[0].hp,
    },
    p1: {
      name: game.players[1].name,
      hand: game.players[1].hand.length,
      food: game.players[1].food,
      hp: game.players[1].hp,
    },
  };
}

const registry = { nextId: 1, peers: new Map() };
const Peer = makeFakePeerClass(registry);
const host = makeAppContext({ url: "https://example.test/jungle-law-demo/", Peer });
const guest = makeAppContext({ url: "https://example.test/jungle-law-demo/", Peer });

host.debug.startOnlineHost();
await waitFor("host invite", () => host.known.get("#onlineCopyBtn").title.includes("room="));
const invite = host.known.get("#onlineCopyBtn").title;
const roomId = new URL(invite).searchParams.get("room");
assert.ok(roomId, "host invite URL should include the room id");

guest.debug.joinOnlineRoom(roomId);
await waitFor("guest receives host state", () => guest.debug.getGame().mode === "online_peer" && guest.debug.getOnlineSession().status === "connected", 1000);
await delay(20);

assert.equal(host.debug.getOnlineDataConnectionOptions().serialization, undefined);
assert.equal(guest.debug.getOnlineDataConnectionOptions().serialization, undefined);
assert.equal(host.debug.getOnlineSession().status, "connected");
assert.equal(guest.debug.getOnlineSession().status, "connected");
assert.equal(guest.debug.getGame().players[0].name, "房主");
assert.equal(guest.debug.getGame().players[1].name, "朋友");
assert.equal(JSON.stringify(compactGame(host.debug)), JSON.stringify(compactGame(guest.debug)));

const statePacketBytes = Buffer.byteLength(JSON.stringify({
  protocol: "jungle-law-peer-v1",
  type: "state",
  game: host.debug.getGame(),
}), "utf8");
assert.ok(statePacketBytes > 16300, "full game-state sync should be large enough to require chunking");

host.debug.handleEndTurnClick();
host.debug.handleEndTurnClick();
await waitFor("guest sees player two turn", () => guest.debug.getGame().active === 1, 1000);

const guestHandBefore = host.debug.getGame().players[1].hand.length;
assert.equal(guest.debug.sendOnlineAction({ kind: "button", action: "drawPrivate" }), true);
await waitFor("host applies guest draw", () => host.debug.getGame().players[1].hand.length === guestHandBefore + 1, 1000);
await waitFor("guest receives post-action state", () => guest.debug.getGame().players[1].hand.length === guestHandBefore + 1, 1000);

assert.equal(JSON.stringify(compactGame(host.debug)), JSON.stringify(compactGame(guest.debug)));
assert.match(host.debug.getGame().log[0], /朋友|抽/);

console.log("online smoke test passed");
