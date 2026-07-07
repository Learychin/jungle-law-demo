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
  querySelector() {
    return null;
  }
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
    "#winnerBanner", "#player1Panel", "#player2Panel", "#handPeek", "#p1Status", "#p2Status", "#p1Deck", "#p2Deck",
    "#p1Hand", "#p2Hand", "#p1Grave", "#p2Grave", "#p1Hype", "#p2Hype", "#p1Cue", "#p2Cue", "#endTurnBtn",
    "#newGameBtn", "#clearLogBtn", "#modeBtn", "#aiPersonaBtn", "#player2Label", "#turnMood", "#routeStrip",
    "#saveStatus", "#coachNote", "#coachTag", "#coachTitle", "#coachDetail", "#coachAside", "#actionStinger",
    "#liveReaction", "#momentumStrip", "#momentRack", "#starterRail", "#guideActions", "#guideCue", "#guideShortcut",
    "#guidePrimaryBtn", "#guideMeta", "#guidePayoff", "#guideFocus", "#stageDeck", "#mobileGuide",
    "#mobileGuideBadge", "#mobileGuideSummary", "#mobileGuidePayoff", "#mobileGuidePrimaryBtn", "#stageTabPlaybook",
    "#stageTabQuest", "#stageTabHype", "#stageTabShowtime", "#stagePlaybookMeta", "#stageQuestMeta", "#stageHypeMeta",
    "#stageShowtimeMeta", "#stageSheetPlaybook", "#stageSheetQuest", "#stageSheetHype", "#stageSheetShowtime",
    "#recordBlurb", "#archiveShelf", "#intelTabReport", "#intelTabDisaster", "#intelTabPool", "#intelReportMeta",
    "#intelDisasterMeta", "#intelPoolMeta", "#publicPanel", "#chaosPanel", "#logPanel", "#disasterMeta",
    "#disasterCard", "#disasterTip", "#questMeta", "#questCard", "#questTip", "#hypeBox", "#hypeMeta", "#hypeFill",
    "#hypeAlert", "#hypeTip", "#showtimeMeta", "#showtimeScore", "#showtimeTitle", "#showtimeChips",
    "#showtimeRewardsWrap", "#showtimeRewards", "#showtimeReplayWrap", "#showtimeReplay", "#showtimeTip",
    "#playbookMeta", "#playbookList", "#playbookTip", "#actionResourceBand", "#actionTacticsBand",
    "#actionPressureBand", "#actionDefenseBand", "#resourceMeta", "#tacticsMeta", "#pressureMeta", "#defenseMeta",
    "#resourceCue", "#tacticsCue", "#pressureCue", "#defenseCue", "#tacticsLock", "#pressureLock",
    "#exportCurrentBtn", "#exportArchiveBtn",
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

  const stageTabs = ["playbook", "quest", "hype", "showtime"].map((tab) => {
    const button = new FakeElement(`[data-stage-tab="${tab}"]`);
    button.dataset.stageTab = tab;
    return button;
  });
  const intelTabs = ["report", "disaster", "pool"].map((tab) => {
    const button = new FakeElement(`[data-intel-tab="${tab}"]`);
    button.dataset.intelTab = tab;
    return button;
  });
  const mobileBandToggles = ["resource", "tactics", "pressure", "defense"].map((band) => {
    const element = new FakeElement(`[data-mobile-band-toggle="${band}"]`);
    element.dataset.mobileBandToggle = band;
    return element;
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
      if (selector === "[data-stage-tab]") return stageTabs;
      if (selector === "[data-intel-tab]") return intelTabs;
      if (selector === "[data-mobile-band-toggle]") return mobileBandToggles;
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

function bump(object, key, amount = 1) {
  object[key || "未知"] = (object[key || "未知"] || 0) + amount;
}

function addCounts(target, source) {
  Object.entries(source || {}).forEach(([key, value]) => {
    bump(target, key, value);
  });
}

function sortCounts(counts) {
  return Object.fromEntries(Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "zh-Hans-CN")));
}

function percent(count, total) {
  return total ? Number((count / total * 100).toFixed(1)) : 0;
}

function cardSpace(debug, name) {
  return debug.cardByName(name)?.space || "未知";
}

function countCardsBySpace(cards = []) {
  const counts = {};
  cards.forEach((card) => bump(counts, card?.space || "未知"));
  return sortCounts(counts);
}

function summarizeBoard(player) {
  const result = {};
  for (const lane of ["sky", "land", "water"]) {
    result[lane] = (player.board[lane] || [])
      .filter(Boolean)
      .map((card) => `${card.name}/${card.space}/${card.state}`);
  }
  return result;
}

function summarizeGame(engine, gameIndex, seed, persona0, persona1, initial) {
  const { debug } = engine;
  const game = debug.getGame();
  const history = game.history || [];
  const drawnBySpace = { "玩家一": {}, "AI 对手": {} };
  const summonsByCardSpace = { "玩家一": {}, "AI 对手": {} };
  const summonsByLane = { "玩家一": {}, "AI 对手": {} };
  const publicDrawsByLevel = {};
  const eventCounts = {};
  const notable = [];

  history.forEach((entry) => {
    bump(eventCounts, entry.action);
    const actor = entry.actor || "";
    if ((entry.action === "setup_draw" || entry.action === "draw_private" || String(entry.action).startsWith("draw_public_")) && drawnBySpace[actor]) {
      bump(drawnBySpace[actor], cardSpace(debug, entry.target));
    }
    if (String(entry.action).startsWith("draw_public_")) bump(publicDrawsByLevel, entry.action.replace("draw_public_", ""));
    if (entry.action === "summon" && summonsByCardSpace[actor]) {
      const space = entry.extra?.cardSpace || cardSpace(debug, entry.target);
      bump(summonsByCardSpace[actor], space);
      bump(summonsByLane[actor], entry.extra?.lane || "未知");
    }
  });

  const totalSummons = Object.values(summonsByCardSpace).reduce((sum, row) => sum + Object.values(row).reduce((a, b) => a + b, 0), 0);
  const landSummons = (summonsByCardSpace["玩家一"]["陆地"] || 0) + (summonsByCardSpace["AI 对手"]["陆地"] || 0);
  if (landSummons >= Math.max(4, totalSummons * 0.62)) notable.push(`上场明显偏陆地：${landSummons}/${totalSummons}`);
  ["玩家一", "AI 对手"].forEach((name, id) => {
    const landInitial = initial.players[id].initialHandSpace["陆地"] || 0;
    if (landInitial >= 4) notable.push(`${name} 起手 ${landInitial}/5 是陆地`);
    const waterInitial = (initial.players[id].initialHandSpace["水生"] || 0) + (initial.players[id].initialHandSpace["两栖"] || 0);
    if (waterInitial === 0) notable.push(`${name} 起手没有水生/两栖`);
  });
  if ((eventCounts.attack_face || 0) < 2 && totalSummons > 8) notable.push("铺场多但冲脸少，节奏可能拖");

  return {
    game: gameIndex,
    seed,
    persona0,
    persona1,
    winner: game.winner === null ? "超时裁定" : game.players[game.winner].name,
    turns: game.turn,
    steps: history.length,
    timeout: game.winner === null,
    initial,
    drawnBySpace: {
      "玩家一": sortCounts(drawnBySpace["玩家一"]),
      "AI 对手": sortCounts(drawnBySpace["AI 对手"]),
    },
    summonsByCardSpace: {
      "玩家一": sortCounts(summonsByCardSpace["玩家一"]),
      "AI 对手": sortCounts(summonsByCardSpace["AI 对手"]),
    },
    summonsByLane: {
      "玩家一": sortCounts(summonsByLane["玩家一"]),
      "AI 对手": sortCounts(summonsByLane["AI 对手"]),
    },
    publicDrawsByLevel: sortCounts(publicDrawsByLevel),
    eventCounts: sortCounts(eventCounts),
    finalBoard: {
      "玩家一": summarizeBoard(game.players[0]),
      "AI 对手": summarizeBoard(game.players[1]),
    },
    notable,
    actions: history.map((entry, index) => ({
      step: index + 1,
      turn: entry.turn,
      actor: entry.actor,
      action: entry.action,
      target: entry.target,
      cost: entry.cost,
      detail: entry.detail,
      extra: entry.extra,
    })),
    first12Actions: history.slice(0, 12).map((entry) => ({
      turn: entry.turn,
      actor: entry.actor,
      action: entry.action,
      detail: entry.detail,
    })),
  };
}

function runOne(engine, gameIndex, seed, persona0, persona1, maxTurns = 40) {
  const { debug, setSeed } = engine;
  setSeed(seed);
  debug.setAIPersona(persona0);
  debug.createGame();
  const game = debug.getGame();
  const initial = {
    players: game.players.map((player) => ({
      name: player.name,
      initialHand: player.hand.map((card) => `${card.name}/${card.space}/${card.level}`),
      initialHandSpace: countCardsBySpace(player.hand),
      privatePoolSpace: countCardsBySpace([...player.hand, ...player.deck]),
      openingCue: player.openingCue?.label || "",
    })),
  };

  const personaMap = { 0: persona0, 1: persona1 };
  let safety = 0;
  while (debug.getGame().winner === null && debug.getGame().turn <= maxTurns && safety < maxTurns * 4) {
    debug.runAutoTurnSync(personaMap, { log: false });
    safety += 1;
  }

  return summarizeGame(engine, gameIndex, seed, persona0, persona1, initial);
}

function aggregate(records, deckCounts) {
  const totals = {
    games: records.length,
    avgTurns: Number((records.reduce((sum, row) => sum + row.turns, 0) / records.length).toFixed(2)),
    avgSteps: Number((records.reduce((sum, row) => sum + row.steps, 0) / records.length).toFixed(1)),
    timeouts: records.filter((row) => row.timeout).length,
    winners: {},
    initialHandSpace: {},
    privatePoolSpace: {},
    drawnBySpace: {},
    summonsByCardSpace: {},
    summonsByLane: {},
    publicDrawsByLevel: {},
    eventCounts: {},
    notableCounts: {},
    personaMatrix: {},
    personaSummary: {},
  };

  records.forEach((record) => {
    bump(totals.winners, record.winner);
    const matrixKey = `${record.persona0} vs ${record.persona1}`;
    if (!totals.personaMatrix[matrixKey]) {
      totals.personaMatrix[matrixKey] = { games: 0, p1Wins: 0, aiWins: 0, timeouts: 0, turns: 0, steps: 0 };
    }
    const matrixRow = totals.personaMatrix[matrixKey];
    matrixRow.games += 1;
    matrixRow.turns += record.turns;
    matrixRow.steps += record.steps;
    if (record.winner === "玩家一") matrixRow.p1Wins += 1;
    else if (record.winner === "AI 对手") matrixRow.aiWins += 1;
    else matrixRow.timeouts += 1;

    [
      { side: "玩家一", persona: record.persona0, won: record.winner === "玩家一" },
      { side: "AI 对手", persona: record.persona1, won: record.winner === "AI 对手" },
    ].forEach((entry) => {
      if (!totals.personaSummary[entry.persona]) {
        totals.personaSummary[entry.persona] = { seats: 0, wins: 0, p1Seats: 0, aiSeats: 0, p1Wins: 0, aiWins: 0, turns: 0, steps: 0 };
      }
      const row = totals.personaSummary[entry.persona];
      row.seats += 1;
      row.wins += entry.won ? 1 : 0;
      row.turns += record.turns;
      row.steps += record.steps;
      if (entry.side === "玩家一") {
        row.p1Seats += 1;
        row.p1Wins += entry.won ? 1 : 0;
      } else {
        row.aiSeats += 1;
        row.aiWins += entry.won ? 1 : 0;
      }
    });
    record.initial.players.forEach((player) => {
      addCounts(totals.initialHandSpace, player.initialHandSpace);
      addCounts(totals.privatePoolSpace, player.privatePoolSpace);
    });
    Object.values(record.drawnBySpace).forEach((row) => addCounts(totals.drawnBySpace, row));
    Object.values(record.summonsByCardSpace).forEach((row) => addCounts(totals.summonsByCardSpace, row));
    Object.values(record.summonsByLane).forEach((row) => addCounts(totals.summonsByLane, row));
    addCounts(totals.publicDrawsByLevel, record.publicDrawsByLevel);
    addCounts(totals.eventCounts, record.eventCounts);
    record.notable.forEach((item) => bump(totals.notableCounts, item.replace(/：.*/, "")));
  });

  const totalDeck = Object.values(deckCounts).reduce((sum, value) => sum + value, 0);
  const totalInitial = Object.values(totals.initialHandSpace).reduce((sum, value) => sum + value, 0);
  const totalSummons = Object.values(totals.summonsByCardSpace).reduce((sum, value) => sum + value, 0);
  const events = totals.eventCounts;
  totals.derived = {
    attacksPerGame: Number((((events.attack_face || 0) + (events.attack_face_guard || 0) + (events.attack_face_guard_unstoppable || 0) + (events.attack_creature_kill || 0) + (events.attack_creature_pressure_kill || 0) + (events.attack_creature_injure || 0) + (events.attack_creature_venom || 0) + (events.attack_creature_player_guard || 0)) / records.length).toFixed(2)),
    faceAttacksPerGame: Number((((events.attack_face || 0) + (events.attack_face_guard || 0) + (events.attack_face_guard_unstoppable || 0)) / records.length).toFixed(2)),
    summonsPerGame: Number(((events.summon || 0) / records.length).toFixed(2)),
    skillsPerGame: Number((Object.entries(events).filter(([key]) => key.startsWith("skill")).reduce((sum, [, value]) => sum + value, 0) / records.length).toFixed(2)),
    movesPerGame: Number(((events.move || 0) / records.length).toFixed(2)),
    publicDrawsPerGame: Number((Object.entries(events).filter(([key]) => key.startsWith("draw_public")).reduce((sum, [, value]) => sum + value, 0) / records.length).toFixed(2)),
  };
  totals.deckSpace = Object.fromEntries(Object.entries(sortCounts(deckCounts)).map(([space, count]) => [space, { count, pct: percent(count, totalDeck) }]));
  totals.initialHandSpace = Object.fromEntries(Object.entries(sortCounts(totals.initialHandSpace)).map(([space, count]) => [space, { count, pct: percent(count, totalInitial) }]));
  totals.summonsByCardSpace = Object.fromEntries(Object.entries(sortCounts(totals.summonsByCardSpace)).map(([space, count]) => [space, { count, pct: percent(count, totalSummons) }]));
  totals.privatePoolSpace = sortCounts(totals.privatePoolSpace);
  totals.drawnBySpace = sortCounts(totals.drawnBySpace);
  totals.summonsByLane = sortCounts(totals.summonsByLane);
  totals.publicDrawsByLevel = sortCounts(totals.publicDrawsByLevel);
  totals.eventCounts = sortCounts(totals.eventCounts);
  totals.winners = sortCounts(totals.winners);
  totals.notableCounts = sortCounts(totals.notableCounts);
  totals.personaMatrix = Object.fromEntries(Object.entries(totals.personaMatrix).sort((a, b) => a[0].localeCompare(b[0], "zh-Hans-CN")).map(([key, value]) => [key, {
    ...value,
    p1WinPct: percent(value.p1Wins, value.games),
    aiWinPct: percent(value.aiWins, value.games),
    avgTurns: Number((value.turns / value.games).toFixed(2)),
    avgSteps: Number((value.steps / value.games).toFixed(1)),
  }]));
  totals.personaSummary = Object.fromEntries(Object.entries(totals.personaSummary).sort((a, b) => a[0].localeCompare(b[0], "zh-Hans-CN")).map(([key, value]) => [key, {
    ...value,
    winPct: percent(value.wins, value.seats),
    p1WinPct: percent(value.p1Wins, value.p1Seats),
    aiWinPct: percent(value.aiWins, value.aiSeats),
    avgTurns: Number((value.turns / value.seats).toFixed(2)),
    avgSteps: Number((value.steps / value.seats).toFixed(1)),
  }]));
  return totals;
}

function markdownTableFromCounts(title, counts) {
  const rows = Object.entries(counts);
  if (!rows.length) return `\n### ${title}\n\n无。\n`;
  const lines = [`\n### ${title}\n`, "| 项目 | 数量 | 占比 |", "| --- | ---: | ---: |"];
  const total = rows.reduce((sum, [, value]) => sum + (typeof value === "number" ? value : value.count || 0), 0);
  rows.forEach(([key, value]) => {
    const count = typeof value === "number" ? value : value.count;
    const pct = typeof value === "number" ? percent(value, total) : value.pct;
    lines.push(`| ${key} | ${count} | ${pct}% |`);
  });
  return `${lines.join("\n")}\n`;
}

function markdownPersonaSummary(title, rows) {
  const entries = Object.entries(rows || {});
  if (!entries.length) return `\n### ${title}\n\n无。\n`;
  const lines = [`\n### ${title}\n`, "| 风格 | 出场 | 总胜率 | 玩家位 | AI 位 | 平均回合 | 平均步数 |", "| --- | ---: | ---: | ---: | ---: | ---: | ---: |"];
  entries.forEach(([name, row]) => {
    lines.push(`| ${name} | ${row.seats} | ${row.winPct}% | ${row.p1Wins}/${row.p1Seats}（${row.p1WinPct}%） | ${row.aiWins}/${row.aiSeats}（${row.aiWinPct}%） | ${row.avgTurns} | ${row.avgSteps} |`);
  });
  return `${lines.join("\n")}\n`;
}

function markdownPersonaMatrix(title, rows) {
  const entries = Object.entries(rows || {});
  if (!entries.length) return `\n### ${title}\n\n无。\n`;
  const lines = [`\n### ${title}\n`, "| 组合 | 局数 | 玩家胜 | AI 胜 | 超时 | 平均回合 | 平均步数 |", "| --- | ---: | ---: | ---: | ---: | ---: | ---: |"];
  entries.forEach(([name, row]) => {
    lines.push(`| ${name} | ${row.games} | ${row.p1Wins}（${row.p1WinPct}%） | ${row.aiWins}（${row.aiWinPct}%） | ${row.timeouts} | ${row.avgTurns} | ${row.avgSteps} |`);
  });
  return `${lines.join("\n")}\n`;
}

function buildReport(records, totals, options = {}) {
  const gameCount = options.gameCount || records.length;
  const label = options.label || `${gameCount} 局空间分布自动试玩`;
  const privatePoolTotal = Object.values(totals.privatePoolSpace).reduce((sum, value) => sum + value, 0);
  const initialHands = gameCount * 2;
  const initialCards = initialHands * 5;
  const lines = [
    `# 丛林法则 ${label}`,
    "",
    `生成时间：${new Date().toISOString()}`,
    "",
    "## 总览",
    "",
    `- 对局数：${totals.games}`,
    `- 平均回合：${totals.avgTurns}`,
    `- 平均事件步数：${totals.avgSteps}`,
    `- 超时局：${totals.timeouts}`,
    `- 胜者分布：${Object.entries(totals.winners).map(([key, value]) => `${key} ${value}`).join("；") || "无"}`,
    "",
    "## 关键观察",
    "",
    `- 原始总牌库陆地占比 ${totals.deckSpace["陆地"]?.pct ?? 0}%（${totals.deckSpace["陆地"]?.count ?? 0} 张）；如果直接随机切牌，玩家会自然偏陆地。`,
    `- 当前发牌补丁后，40 副私有牌组里陆地占比 ${percent(totals.privatePoolSpace["陆地"] || 0, Object.values(totals.privatePoolSpace).reduce((sum, value) => sum + value, 0))}%（${totals.privatePoolSpace["陆地"] || 0} 张）。`,
    `- ${gameCount} 局共 ${initialHands} 个起手、${initialCards} 张起手牌，陆地起手占比 ${totals.initialHandSpace["陆地"]?.pct ?? 0}%（${totals.initialHandSpace["陆地"]?.count ?? 0} 张）。`,
    `- 实际上场动物中，陆地占比 ${totals.summonsByCardSpace["陆地"]?.pct ?? 0}%（${totals.summonsByCardSpace["陆地"]?.count ?? 0} 次）；对照私有牌组陆地占比看，发牌偏差没有继续被 AI/费用放大。`,
    `- 水生 + 两栖总牌库占比 ${((totals.deckSpace["水生"]?.pct || 0) + (totals.deckSpace["两栖"]?.pct || 0)).toFixed(1)}%，起手占比 ${((totals.initialHandSpace["水生"]?.pct || 0) + (totals.initialHandSpace["两栖"]?.pct || 0)).toFixed(1)}%，实际召唤占比 ${((totals.summonsByCardSpace["水生"]?.pct || 0) + (totals.summonsByCardSpace["两栖"]?.pct || 0)).toFixed(1)}%。这是第一轮发牌补丁主动抬水线后的效果。`,
    `- 私有牌组陆地占比 ${percent(totals.privatePoolSpace["陆地"] || 0, privatePoolTotal)}%；平均每局攻击 ${totals.derived.attacksPerGame} 次，冲脸 ${totals.derived.faceAttacksPerGame} 次，技能 ${totals.derived.skillsPerGame} 次，移动 ${totals.derived.movesPerGame} 次。`,
    "",
    markdownTableFromCounts("总牌库空间", totals.deckSpace),
    markdownTableFromCounts("私有牌组空间", totals.privatePoolSpace),
    markdownTableFromCounts("起手牌空间", totals.initialHandSpace),
    markdownTableFromCounts("实际召唤卡牌空间", totals.summonsByCardSpace),
    markdownTableFromCounts("实际上场位置", totals.summonsByLane),
    markdownTableFromCounts("派生节奏指标", totals.derived),
    markdownTableFromCounts("事件计数 Top", Object.fromEntries(Object.entries(totals.eventCounts).slice(0, 12))),
    markdownPersonaSummary("风格总体表现", totals.personaSummary),
    markdownPersonaMatrix("风格对局矩阵", totals.personaMatrix),
    `## ${gameCount} 局逐局摘要`,
    "",
  ];

  records.forEach((record) => {
    lines.push(`### 第 ${record.game} 局：${record.persona0} vs ${record.persona1}`);
    lines.push("");
    lines.push(`- 胜者：${record.winner}；回合 ${record.turns}；步数 ${record.steps}${record.timeout ? "；超时裁定" : ""}`);
    lines.push(`- 玩家一起手：${record.initial.players[0].initialHand.join("、")}`);
    lines.push(`- AI 起手：${record.initial.players[1].initialHand.join("、")}`);
    lines.push(`- 上场空间：玩家一 ${JSON.stringify(record.summonsByCardSpace["玩家一"])}；AI ${JSON.stringify(record.summonsByCardSpace["AI 对手"])}`);
    lines.push(`- 位置选择：玩家一 ${JSON.stringify(record.summonsByLane["玩家一"])}；AI ${JSON.stringify(record.summonsByLane["AI 对手"])}`);
    if (record.notable.length) lines.push(`- 观察：${record.notable.join("；")}`);
    lines.push(`- 前 12 步：${record.first12Actions.map((entry) => entry.detail).join(" / ")}`);
    lines.push("");
  });

  return lines.join("\n");
}

const engine = buildEngine();
const personas = engine.debug.getAIPersonas().map((item) => item.id);
const data = JSON.parse(fs.readFileSync(new URL("./game-data.json", import.meta.url), "utf8"));
const deckCounts = countCardsBySpace(data.cards);
const records = [];
const gameCount = Math.max(1, Number(process.env.PLAYTEST_GAMES || 20) || 20);
const seedBase = Number(process.env.PLAYTEST_SEED_BASE || 6200) || 6200;
const outputName = process.env.PLAYTEST_OUTPUT_NAME || `${gameCount}局空间分布自动试玩`;
const reportTitle = process.env.PLAYTEST_TITLE || `${gameCount} 局空间分布自动试玩`;

for (let i = 1; i <= gameCount; i += 1) {
  const persona0 = personas[(i - 1) % personas.length];
  const persona1 = personas[Math.floor((i - 1) / personas.length) % personas.length];
  records.push(runOne(engine, i, seedBase + i * 97, persona0, persona1));
}

const totals = aggregate(records, deckCounts);
const outputDir = new URL("../outputs/playtests/", import.meta.url);
fs.mkdirSync(outputDir, { recursive: true });
const jsonlPath = new URL(`${outputName}.jsonl`, outputDir);
const reportPath = new URL(`${outputName}.md`, outputDir);
fs.writeFileSync(jsonlPath, records.map((record) => JSON.stringify(record)).join("\n"));
fs.writeFileSync(reportPath, buildReport(records, totals, { gameCount, label: reportTitle }));

console.log(JSON.stringify({
  jsonl: jsonlPath.pathname,
  report: reportPath.pathname,
  totals,
}, null, 2));
