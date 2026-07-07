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
  contains(name) {
    return this.tokens.has(name);
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
  addEventListener() {}
  click() {}
  remove() {}
  querySelectorAll() {
    return [];
  }
}

function makeSeededMath(seedBox) {
  const math = Object.create(Math);
  math.random = () => {
    seedBox.value = (seedBox.value + 0x6d2b79f5) >>> 0;
    let t = seedBox.value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return math;
}

function buildEngine() {
  const known = new Map();
  const selectors = [
    "#p1Board", "#p2Board", "#hand", "#handTitle", "#turnLabel", "#selectionHint", "#publicCounts", "#log",
    "#winnerBanner", "#player1Panel", "#player2Panel", "#p1Status", "#p2Status", "#p1Deck", "#p2Deck",
    "#p1Hand", "#p2Hand", "#p1Grave", "#p2Grave", "#p1Hype", "#p2Hype", "#p1Cue", "#p2Cue", "#endTurnBtn", "#newGameBtn",
    "#clearLogBtn", "#modeBtn", "#aiPersonaBtn", "#player2Label", "#turnMood", "#routeStrip", "#saveStatus",
    "#coachNote", "#coachTag", "#coachTitle", "#coachDetail", "#coachAside", "#guideActions", "#guideCue", "#guideShortcut", "#guidePrimaryBtn", "#guideMeta", "#recordBlurb", "#disasterMeta", "#disasterCard",
    "#disasterTip", "#questMeta", "#questCard", "#questTip", "#hypeBox", "#hypeMeta", "#hypeFill", "#hypeAlert", "#hypeTip",
    "#showtimeMeta", "#showtimeTitle", "#showtimeChips", "#showtimeRewardsWrap", "#showtimeRewards", "#showtimeTip", "#playbookMeta", "#playbookList",
    "#playbookTip", "#actionResourceBand", "#actionTacticsBand", "#actionPressureBand", "#actionDefenseBand",
    "#resourceMeta", "#tacticsMeta", "#pressureMeta", "#defenseMeta", "#exportCurrentBtn", "#exportArchiveBtn",
  ];
  selectors.forEach((selector) => known.set(selector, new FakeElement(selector)));

  const actionNames = [
    "drawPrivate", "drawA", "drawB", "drawC", "disaster", "skill", "cancelSelection", "recover",
    "move", "sacrifice", "attackPlayer", "attackCreature", "confirmGuard", "letThrough",
  ];
  const actionButtons = actionNames.map((action) => {
    const button = new FakeElement(`[data-action="${action}"]`);
    button.dataset.action = action;
    return button;
  });

  const storage = new Map();
  const localStorage = {
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

  const document = {
    body: new FakeElement("body"),
    querySelector(selector) {
      if (!known.has(selector)) known.set(selector, new FakeElement(selector));
      return known.get(selector);
    },
    querySelectorAll(selector) {
      if (selector === "[data-action]") return actionButtons;
      return [];
    },
    createElement(tagName = "div") {
      return new FakeElement(tagName);
    },
  };

  const seedBox = { value: 1 };
  const seededMath = makeSeededMath(seedBox);
  const context = {
    window: {
      localStorage,
      setTimeout,
      clearTimeout,
      setInterval,
      clearInterval,
    },
    document,
    console,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    Blob,
    URL,
    Math: seededMath,
  };
  context.window.Math = seededMath;
  context.globalThis = context;

  vm.createContext(context);
  vm.runInContext(fs.readFileSync(new URL("./data.js", import.meta.url), "utf8"), context);
  vm.runInContext(fs.readFileSync(new URL("./app.js", import.meta.url), "utf8"), context);

  const debug = context.window.__JUNGLE_DEBUG__;
  if (!debug) throw new Error("missing __JUNGLE_DEBUG__");

  return {
    debug,
    setSeed(value) {
      seedBox.value = (Number(value) || 1) >>> 0 || 1;
    },
  };
}

function boardScore(debug, player) {
  return debug.boardCards(player).reduce((sum, loc) => {
    const levelBonus = loc.card.level === "A" ? 3 : loc.card.level === "B" ? 1.2 : 0;
    const skillBonus = loc.card.skill ? 1.6 : 0;
    return sum + debug.effectiveAttack(player, loc.card) * 1.35 + debug.effectiveDefense(player, loc.card) + levelBonus + skillBonus;
  }, 0);
}

function timeoutJudge(debug) {
  const game = debug.getGame();
  const score = (player) => {
    const board = boardScore(debug, player);
    return player.hp * 6 + board * 1.4 + player.food * 0.8 + player.hand.length * 0.3;
  };
  const [p0, p1] = game.players;
  return score(p0) >= score(p1) ? 0 : 1;
}

function summarizeMatch(game, persona0, persona1, timeoutWinner = null) {
  const history = game.history || [];
  const events = history.map((item) => item.action);
  return {
    winnerId: game.winner ?? timeoutWinner,
    turns: game.turn,
    steps: history.length,
    timeout: game.winner === null,
    events,
    history,
    persona0,
    persona1,
  };
}

function runMatch(engine, persona0, persona1, seed, maxTurns = 40) {
  const { debug, setSeed } = engine;
  setSeed(seed);
  debug.setAIPersona(persona0);
  debug.createGame();
  const personaMap = { 0: persona0, 1: persona1 };

  let safety = 0;
  while (debug.getGame().winner === null && debug.getGame().turn <= maxTurns && safety < maxTurns * 4) {
    debug.runAutoTurnSync(personaMap, { log: false });
    safety += 1;
  }

  const game = debug.getGame();
  if (game.winner === null) {
    const winnerId = timeoutJudge(debug);
    return summarizeMatch(game, persona0, persona1, winnerId);
  }
  return summarizeMatch(game, persona0, persona1, null);
}

function bump(map, key, amount = 1) {
  map.set(key, (map.get(key) || 0) + amount);
}

function collectStats(matches) {
  const matchup = new Map();
  const disasterCasts = new Map();
  const skillUses = new Map();
  const summons = new Map();
  const kills = new Map();
  const eventCounts = new Map();
  let totalTurns = 0;
  let totalSteps = 0;
  let timeouts = 0;
  let p0Wins = 0;

  matches.forEach((match) => {
    totalTurns += match.turns;
    totalSteps += match.steps;
    if (match.timeout) timeouts += 1;
    if (match.winnerId === 0) p0Wins += 1;

    const key = `${match.persona0} vs ${match.persona1}`;
    const row = matchup.get(key) || { games: 0, p0Wins: 0, p1Wins: 0, turns: 0, steps: 0, timeouts: 0 };
    row.games += 1;
    row.turns += match.turns;
    row.steps += match.steps;
    row.timeouts += match.timeout ? 1 : 0;
    if (match.winnerId === 0) row.p0Wins += 1;
    if (match.winnerId === 1) row.p1Wins += 1;
    matchup.set(key, row);

    match.history.forEach((entry) => {
      bump(eventCounts, entry.action);
      if (entry.action === "disaster_cast") bump(disasterCasts, entry.target);
      if (typeof entry.action === "string" && entry.action.startsWith("skill")) {
        bump(skillUses, entry.extra?.cardSkill || entry.target || "未知技能");
      }
      if (entry.action === "summon") bump(summons, entry.target);
      if (entry.action === "attack_creature_kill" && entry.extra?.attackerCard) bump(kills, entry.extra.attackerCard);
    });
  });

  const rows = [...matchup.entries()].map(([key, row]) => ({
    matchup: key,
    games: row.games,
    p0WinRate: Number((row.p0Wins / row.games).toFixed(3)),
    p1WinRate: Number((row.p1Wins / row.games).toFixed(3)),
    avgTurns: Number((row.turns / row.games).toFixed(2)),
    avgSteps: Number((row.steps / row.games).toFixed(1)),
    timeouts: row.timeouts,
  }));

  const topEntries = (map, limit = 8) => [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));

  return {
    games: matches.length,
    avgTurns: Number((totalTurns / matches.length).toFixed(2)),
    avgSteps: Number((totalSteps / matches.length).toFixed(1)),
    p0WinRate: Number((p0Wins / matches.length).toFixed(3)),
    timeouts,
    matchupRows: rows,
    topEvents: topEntries(eventCounts, 12),
    topDisasters: topEntries(disasterCasts),
    topSkills: topEntries(skillUses),
    topSummons: topEntries(summons, 12),
    topKills: topEntries(kills, 12),
  };
}

function printSection(title, rows) {
  console.log(`\n## ${title}`);
  rows.forEach((row) => console.log(typeof row === "string" ? row : JSON.stringify(row)));
}

const engine = buildEngine();
const personas = engine.debug.getAIPersonas().map((item) => item.id);
const matches = [];

for (const persona0 of personas) {
  for (const persona1 of personas) {
    for (let seed = 1; seed <= 12; seed += 1) {
      matches.push(runMatch(engine, persona0, persona1, seed));
    }
  }
}

const report = collectStats(matches);

console.log(JSON.stringify({
  games: report.games,
  avgTurns: report.avgTurns,
  avgSteps: report.avgSteps,
  p0WinRate: report.p0WinRate,
  timeouts: report.timeouts,
}, null, 2));
printSection("Matchups", report.matchupRows);
printSection("Top Events", report.topEvents);
printSection("Top Disasters", report.topDisasters);
printSection("Top Skills", report.topSkills);
printSection("Top Summons", report.topSummons);
printSection("Top Kills", report.topKills);
