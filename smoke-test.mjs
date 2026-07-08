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
];
selectors.forEach((selector) => known.set(selector, new FakeElement(selector)));

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
const actionButtons = actionNames.map((action) => {
  const button = new FakeElement(`[data-action="${action}"]`);
  button.dataset.action = action;
  return button;
});

const stageTabNames = ["playbook", "quest", "hype", "showtime"];
const stageTabButtons = stageTabNames.map((tab) => {
  const button = new FakeElement(`[data-stage-tab="${tab}"]`);
  button.dataset.stageTab = tab;
  return button;
});

const intelTabNames = ["report", "disaster", "pool"];
const intelTabButtons = intelTabNames.map((tab) => {
  const button = new FakeElement(`[data-intel-tab="${tab}"]`);
  button.dataset.intelTab = tab;
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
    if (selector === "[data-stage-tab]") return stageTabButtons;
    if (selector === "[data-intel-tab]") return intelTabButtons;
    return [];
  },
  createElement(tagName = "div") {
    return new FakeElement(tagName);
  },
  addEventListener() {},
};

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
};
context.globalThis = context;

vm.createContext(context);
vm.runInContext(fs.readFileSync(new URL("./data.js", import.meta.url), "utf8"), context);
vm.runInContext(fs.readFileSync(new URL("./sprite-data.js", import.meta.url), "utf8"), context);
vm.runInContext(fs.readFileSync(new URL("./app.js", import.meta.url), "utf8"), context);

assert.equal(context.window.JUNGLE_GAME_DATA.cards.length, 111, "card count should stay stable");
const debug = context.window.__JUNGLE_DEBUG__;
assert.ok(debug, "debug hooks should be available");

const actionButtonByName = Object.fromEntries(actionButtons.map((button) => [button.dataset.action, button]));

function countBySpace(cards) {
  return cards.reduce((counts, card) => {
    counts[card.space] = (counts[card.space] || 0) + 1;
    return counts;
  }, {});
}

{
  const game = debug.getGame();
  debug.render();
  assert.equal(game.players[0].food, 5, "first player should start with 5 food after first-seat balance patch");
  assert.equal(game.players[1].food, 2, "second player should still start with 2 food");
  assert.ok(game.history.some((event) => event.action === "match_start" && /初始 5 食物/.test(event.detail)));
  assert.ok(game.history.some((event) => event.action === "rule_tip" && /免费换线 1 次/.test(event.detail)));
  assert.equal(
    Object.keys(context.window.JUNGLE_SPRITE_ATLAS.cards).length,
    new Set(context.window.JUNGLE_GAME_DATA.cards.map((card) => card.name)).size,
    "sprite atlas should map every unique card name",
  );
  assert.match(context.window.JUNGLE_SPRITE_ATLAS.source, /v3\.png$/, "sprite atlas should use the merged raster sheet");
  assert.equal(context.window.JUNGLE_SPRITE_ATLAS.cards["蓝鲸"].x, 4, "blue whale should use whale art column");
  assert.equal(context.window.JUNGLE_SPRITE_ATLAS.cards["蓝鲸"].y, 6, "blue whale should use whale art row");
  assert.equal(context.window.JUNGLE_SPRITE_ATLAS.cards["大白鲨"].x, 0, "great white shark should use shark art column");
  assert.equal(context.window.JUNGLE_SPRITE_ATLAS.cards["大白鲨"].y, 6, "great white shark should use shark art row");
  assert.equal(context.window.JUNGLE_SPRITE_ATLAS.cards["狮子"].x, 2, "lion should use lion art column");
  assert.equal(context.window.JUNGLE_SPRITE_ATLAS.cards["狮子"].y, 0, "lion should use lion art row");
  assert.equal(context.window.JUNGLE_SPRITE_ATLAS.cards["猫头鹰"].x, 3, "owl should use owl art column");
  assert.equal(context.window.JUNGLE_SPRITE_ATLAS.cards["猫头鹰"].y, 4, "owl should use owl art row");
  assert.equal(
    debug.getOnlineDataConnectionOptions().serialization,
    undefined,
    "online mode should keep PeerJS default chunked serializer for full game-state sync",
  );
  [
    "飞翔钱力",
    "泥烧鸽子",
    "潜海依霖",
    "天津河蟹",
    "龟虎",
    "巨翼熊",
    "蚣尾狼",
    "企鹅兔",
    "虎龟",
  ].forEach((name, index) => {
    assert.equal(context.window.JUNGLE_SPRITE_ATLAS.cards[name].x, index, `${name} should use its custom funny-creature art column`);
    assert.equal(context.window.JUNGLE_SPRITE_ATLAS.cards[name].y, 5, `${name} should use its custom funny-creature art row`);
  });
  assert.ok(known.get("#hand").children.some((child) => /class="card-art[^"]*"/.test(child.innerHTML)), "hand cards should include pixel animal art");
  assert.match(known.get(".pile.level-a").innerHTML, /<strong>.+<\/strong>/, "public A pile should reveal its top card");
  assert.match(known.get(".pile.level-a").innerHTML, /class="card-art[^"]*"/, "public A pile should include pixel animal art");
  assert.match(known.get(".pile.level-a").innerHTML, /\d+\/\d+/, "public A pile should show attack/defense");
  assert.match(actionButtonByName.drawA.textContent, /^抽A：.+ -3$/, "draw A button should include the visible top card");
  assert.match(actionButtonByName.drawB.textContent, /^抽B：.+ -2$/, "draw B button should include the visible top card");
  assert.match(actionButtonByName.drawC.textContent, /^抽C：.+ -2$/, "draw C button should include the visible top card");
  assert.match(
    document.querySelector("#turnHintChips").innerHTML,
    /class="is-suggested"[^>]*>亮起：/,
    "turn hint should expose the currently highlighted action",
  );
  game.players.forEach((player) => {
    const privatePool = [...player.hand, ...player.deck];
    const poolCounts = countBySpace(privatePool);
    const handCounts = countBySpace(player.hand);
    const handWaterline = (handCounts["水生"] || 0) + (handCounts["两栖"] || 0);
    const handNonLand = player.hand.length - (handCounts["陆地"] || 0);

    assert.equal(privatePool.length, 28, `${player.name} should have a 28-card private pool`);
    assert.ok((poolCounts["陆地"] || 0) <= 13, `${player.name} private pool should cap land cards`);
    assert.ok(((poolCounts["水生"] || 0) + (poolCounts["两栖"] || 0)) >= 10, `${player.name} private pool should include enough waterline cards`);
    assert.ok(handWaterline >= 1, `${player.name} opening hand should include a waterline card`);
    assert.ok(handNonLand >= 2, `${player.name} opening hand should include at least two non-land cards`);
    assert.ok((handCounts["陆地"] || 0) <= 3, `${player.name} opening hand should not be mostly land`);
  });
}

function makeCard(name, extra = {}) {
  const base = debug.cardByName(name);
  assert.ok(base, `missing card: ${name}`);
  return Object.assign(debug.makeInstance(base), extra);
}

function makeDisaster(name) {
  const base = context.window.JUNGLE_GAME_DATA.disasters.find((item) => item["卡名"] === name);
  assert.ok(base, `missing disaster: ${name}`);
  return { ...base };
}

function resetBoard(player) {
  player.hand = [];
  player.deck = [];
  player.grave = [];
  player.food = 10;
  player.hp = 20;
  player.turnsTaken = 0;
  player.openingCue = null;
  player.turnSacrifices = 0;
  player.turnRecovers = 0;
  player.turnProtects = 0;
  player.turnSkills = 0;
  player.status = {
    roarThisTurn: false,
    roarNextOwnTurn: false,
  };
  player.turnDisaster = null;
  player.turnDisasterUsed = false;
  player.turnQuest = null;
  player.turnHype = 0;
  player.turnHypeClaims = [];
  player.turnHypeRewards = [];
  player.board = {
    sky: [null, null, null],
    land: [null, null, null],
    water: [null, null, null],
  };
}

function setupGame({ active = 0, turn = 1, p1Food = 10, p2Food = 10 } = {}) {
  debug.createGame();
  const game = debug.getGame();
  game.active = active;
  game.turn = turn;
  game.winner = null;
  game.saved = false;
  game.log = [];
  game.history = [];
  game.step = 0;
  resetBoard(game.players[0]);
  resetBoard(game.players[1]);
  game.players[0].food = p1Food;
  game.players[1].food = p2Food;
  debug.clearSelected();
  return game;
}

function place(game, playerId, lane, slotIndex, name, extra = {}) {
  const card = makeCard(name, extra);
  card.owner = playerId;
  card.lane = lane;
  game.players[playerId].board[lane][slotIndex] = card;
  return card;
}

function selectCard(card) {
  assert.equal(debug.setSelected(card.uid), true, `should select ${card.name}`);
  debug.render();
}

function boardButtons(selector) {
  return known.get(selector).children.flatMap((row) => row.children.slice(1));
}

{
  const game = setupGame();
  const owl = place(game, 0, "sky", 0, "猫头鹰");
  selectCard(owl);
  assert.equal(actionButtonByName.skill.textContent, "发动 鹰眼 -2");
  assert.equal(actionButtonByName.skill.disabled, false);
  assert.match(actionButtonByName.skill.title, /看光对手手牌/);
  assert.match(known.get("#selectionHint").innerHTML, /发动 鹰眼/);
  assert.match(known.get("#selectionHint").innerHTML, /取消选择/);
}

{
  setupGame({ p1Food: 1 });
  debug.clearSelected();
  debug.render();
  assert.equal(actionButtonByName.skill.disabled, true);
  assert.match(actionButtonByName.skill.dataset.actionDetail || "", /先选己方生物/);
  assert.equal(actionButtonByName.skill.dataset.actionDetailTone, "muted");
  assert.equal(actionButtonByName.skill.classList.tokens.has("has-blocked-detail"), true);
  assert.equal(actionButtonByName.drawA.disabled, true);
  assert.match(actionButtonByName.drawA.dataset.actionDetail || "", /食物不够 · 要 3/);
  assert.equal(actionButtonByName.attackCreature.disabled, true);
  assert.match(actionButtonByName.attackCreature.dataset.actionDetail || "", /先选己方生物/);
}

{
  const game = setupGame({ p1Food: 6 });
  game.players[0].hand = ["猴子", "袋鼠", "马", "兔子", "松鼠"].map((name) => makeCard(name));
  game.players[0].deck = [makeCard("鸭")];
  debug.clearSelected();
  debug.render();
  assert.equal(actionButtonByName.drawPrivate.disabled, false);
  assert.match(actionButtonByName.drawPrivate.dataset.actionDetail || "", /抽后满手/);
  assert.equal(actionButtonByName.drawPrivate.dataset.actionDetailTone, "support");
  assert.match(actionButtonByName.drawPrivate.title, /抽完刚好满手/);
  assert.match(known.get("#resourceMeta").textContent, /再补一张就满手/);
}

{
  const game = setupGame({ p1Food: 6 });
  game.players[0].hand = ["猴子", "袋鼠", "马", "兔子", "松鼠", "鸭"].map((name) => makeCard(name));
  game.players[0].deck = [makeCard("孔雀鱼")];
  debug.clearSelected();
  debug.render();
  assert.equal(actionButtonByName.drawPrivate.disabled, false);
  assert.match(actionButtonByName.drawPrivate.dataset.actionDetail || "", /满手会弃新牌/);
  assert.equal(actionButtonByName.drawPrivate.dataset.actionDetailTone, "warning");
  assert.match(actionButtonByName.drawPrivate.title, /立刻进弃牌/);
  assert.match(known.get("#resourceMeta").textContent, /手牌已满/);
  assert.match(known.get("#resourceMeta").textContent, /挤进弃牌/);
}

{
  const game = setupGame({ p1Food: 10 });
  const dog = place(game, 0, "land", 0, "中华田园犬", { justSummoned: true });
  selectCard(dog);
  assert.equal(actionButtonByName.attackPlayer.disabled, true);
  assert.match(actionButtonByName.attackPlayer.dataset.actionDetail || "", /刚上场不能动/);
  assert.equal(actionButtonByName.attackPlayer.dataset.actionDetailTone, "muted");
  assert.equal(actionButtonByName.attackPlayer.classList.tokens.has("has-blocked-detail"), true);
  assert.match(actionButtonByName.skill.dataset.actionDetail || "", /没有主动技能/);
  assert.match(actionButtonByName.recover.dataset.actionDetail || "", /没在休息/);
  assert.match(actionButtonByName.move.dataset.actionDetail || "", /不能换线/);
  assert.match(known.get("#pressureMeta").textContent, /现在不能冲脸：刚上场不能动/);
}

{
  const game = setupGame({ p1Food: 6 });
  const dog = place(game, 0, "land", 0, "中华田园犬");
  const cat = place(game, 1, "land", 0, "苏格兰折耳猫", { state: "rest" });
  const monkey = place(game, 1, "land", 1, "猴子", { state: "rest" });
  selectCard(dog);
  assert.match(known.get("#selectionHint").innerHTML, /收 苏格兰折耳猫|收 猴子/);
  assert.match(known.get("#guideShortcut").textContent, /现在直接点对面的《苏格兰折耳猫》|现在直接点对面的《猴子》/);
  const enemyMarkup = known.get("#p2Board").children.flatMap((row) => row.children.map((child) => child.innerHTML || "")).join(" ");
  assert.match(enemyMarkup, /收掉/);
  assert.match(enemyMarkup, /退场|休息|毒休/);
  assert.match(known.get("#guidePayoff").innerHTML, /目标退场|下回合缓一拍|不死也躺/);
  assert.match(actionButtonByName.attackCreature.dataset.actionDetail || "", /目标退场|下回合缓一拍|不死也躺/);
  assert.ok(boardButtons("#p1Board").some((button) => button.dataset.routeTag === "就这只"));
  assert.ok(boardButtons("#p2Board").some((button) => button.dataset.routeTag === "点它"));
  assert.ok(boardButtons("#p2Board").some((button) => button.classList.tokens.has("is-direct-cta-spotlight")));
  assert.ok(boardButtons("#p2Board").some((button) => button.classList.tokens.has("is-direct-cta-muted")));
  assert.equal(debug.runHintQuickAction(`attackTarget:${cat.uid}`), true);
  assert.equal(game.players[1].board.land[0], null);
  assert.equal(game.players[1].grave.some((card) => card.uid === cat.uid), true);
}

{
  const game = setupGame({ p1Food: 10 });
  game.players[1].hp = 1;
  const dog = place(game, 0, "land", 0, "中华田园犬");
  selectCard(dog);
  assert.match(actionButtonByName.attackPlayer.dataset.actionDetail || "", /斩杀线 · 对手 -\d+/);
  assert.match(known.get("#pressureMeta").textContent, /冲脸按钮可用/);
  assert.match(known.get("#pressureMeta").textContent, /直接收掉/);
}

{
  const game = setupGame({ p1Food: 10, p2Food: 10 });
  const rhino = place(game, 0, "land", 0, "白犀牛");
  place(game, 1, "land", 0, "中华田园犬");
  selectCard(rhino);
  assert.match(actionButtonByName.attackPlayer.dataset.actionDetail || "", /挡也漏 2/);
}

{
  const game = setupGame({ p1Food: 5 });
  const penguin = place(game, 0, "land", 0, "企鹅");
  selectCard(penguin);
  assert.equal(actionButtonByName.move.textContent, "免费换线 1/1");
  assert.equal(actionButtonByName.move.disabled, false);
  assert.match(known.get("#selectionHint").innerHTML, /免费换线|换线/);
  assert.equal(debug.runHintQuickAction("moveMode"), true);
  assert.equal(debug.getSelected().mode, "move");
  assert.match(known.get("#selectionHint").innerHTML, /水生第2格/);
  assert.equal(debug.runHintQuickAction("move:water:1"), true);
  assert.equal(game.players[0].food, 5);
  assert.equal(game.players[0].turnMoves, 1);
  assert.equal(game.players[0].board.land[0], null);
  assert.equal(game.players[0].board.water[1]?.name, "企鹅");
  assert.equal(game.players[0].board.water[1]?.lane, "water");
  selectCard(penguin);
  assert.equal(actionButtonByName.move.disabled, true);
  assert.match(actionButtonByName.move.dataset.actionDetail || "", /移动过 1 次|这回合已经移动/);
}

{
  const game = setupGame({ p1Food: 6 });
  place(game, 0, "land", 0, "中华田园犬");
  game.players[0].hand = [makeCard("猴子")];
  assert.equal(debug.setSelected(game.players[0].hand[0].uid), true);
  debug.render();
  debug.handleSlotClick(game.players[0], "land", 0);
  assert.equal(debug.getSelected().type, "hand");
  assert.equal(debug.getSelected().uid, game.players[0].hand[0].uid);
  assert.match(game.log[0], /已经有人蹲着了/);
  assert.match(game.log[0], /现在直接点 .*第[123]格|发亮空格/);
}

{
  const game = setupGame({ p1Food: 5 });
  const penguin = place(game, 0, "land", 0, "企鹅");
  selectCard(penguin);
  assert.equal(debug.runHintQuickAction("moveMode"), true);
  debug.handleSlotClick(game.players[1], "land", 2);
  assert.equal(debug.getSelected().uid, penguin.uid);
  assert.equal(debug.getSelected().mode, "move");
  assert.match(game.log[0], /换线模式里只认发亮空格/);
  assert.match(game.log[0], /发亮空格|现在直接点 .*第[123]格/);
}

{
  const game = setupGame({ p1Food: 6 });
  const dog = place(game, 0, "land", 0, "中华田园犬");
  place(game, 1, "land", 0, "苏格兰折耳猫", { state: "rest" });
  selectCard(dog);
  debug.handleSlotClick(game.players[1], "land", 2);
  assert.equal(debug.getSelected().uid, dog.uid);
  assert.match(game.log[0], /空白格不算目标/);
  assert.match(game.log[0], /点对面的《苏格兰折耳猫》|先回你这边点一只生物/);
}

{
  const game = setupGame({ active: 1, p1Food: 4, p2Food: 6 });
  place(game, 0, "land", 0, "中华田园犬", { state: "ready", justSummoned: false });
  const attacker = place(game, 1, "land", 0, "狮子", { state: "ready", justSummoned: false });
  assert.equal(debug.resolveDirectPlayerAttack({
    type: "board",
    player: game.players[1],
    lane: "land",
    slotIndex: 0,
    card: attacker,
  }), true);
  debug.render();
  assert.equal(debug.getPendingDefense()?.kind, "face");
  debug.handleSlotClick(game.players[1], "land", 0);
  assert.equal(debug.getPendingDefense()?.kind, "face");
  assert.match(game.log[0], /先别点对面|这口只看你这边谁格挡/);
  assert.match(game.log[0], /能格挡|玩家承受打击/);
}

{
  const game = setupGame({ active: 1, p1Food: 4, p2Food: 6 });
  const target = place(game, 0, "land", 0, "苏格兰折耳猫", { state: "ready", justSummoned: false });
  const attacker = place(game, 1, "land", 0, "狮子", { state: "ready", justSummoned: false });
  assert.equal(debug.beginCreatureAttack({
    type: "board",
    player: game.players[1],
    lane: "land",
    slotIndex: 0,
    card: attacker,
  }, {
    type: "board",
    player: game.players[0],
    lane: "land",
    slotIndex: 0,
    card: target,
  }), true);
  debug.render();
  assert.equal(debug.getPendingDefense()?.kind, "creature");
  debug.handleSlotClick(game.players[0], "land", 1);
  assert.equal(debug.getPendingDefense()?.kind, "creature");
  assert.match(game.log[0], /这口先别点桌面/);
  assert.match(game.log[0], /二选一|让它自己挨|扛/);
}

{
  const game = setupGame({ p1Food: 5 });
  const dog = place(game, 0, "land", 0, "中华田园犬");
  const lion = place(game, 0, "land", 1, "狮子");
  const cat = place(game, 1, "land", 0, "苏格兰折耳猫");
  const rhino = place(game, 1, "land", 1, "白犀牛");
  game.players[0].turnDisaster = makeDisaster("干旱");
  game.players[0].turnDisasterUsed = false;
  debug.render();

  assert.equal(actionButtonByName.disaster.textContent, "发动 干旱 -2");
  assert.equal(actionButtonByName.disaster.disabled, false);
  assert.match(actionButtonByName.disaster.title, /双方该空间各倒最多 1 只/);

  assert.equal(debug.useTurnDisaster(game.players[0]), true);
  assert.equal(game.players[0].food, 3);
  assert.equal(game.players[0].board.land[0], null);
  assert.equal(game.players[0].board.land[1]?.name, lion.name);
  assert.equal(game.players[1].board.land[0]?.name, cat.name);
  assert.equal(game.players[1].board.land[1], null);
  assert.equal(game.players[0].turnDisasterUsed, true);
  assert.equal(game.players[0].turnHype, 3);
  assert.equal(game.players[0].food, 3, "disaster alone should not cash the first hype reward");
  debug.render();
  assert.match(known.get("#liveReaction").innerHTML, /节目效果/);
  assert.match(known.get("#liveReaction").innerHTML, /干旱/);
  assert.match(known.get("#momentRack").innerHTML, /节目卡/);
  assert.equal(known.get("#intelTabDisaster").classList.tokens.has("is-active"), true);
  assert.equal(known.get("#chaosPanel").classList.tokens.has("hidden"), false);
}

{
  const game = setupGame({ p1Food: 4 });
  const bat = place(game, 0, "sky", 0, "蝙蝠", { state: "rest" });
  const owl = place(game, 0, "sky", 1, "猫头鹰", { state: "rest" });

  selectCard(bat);
  assert.equal(actionButtonByName.recover.textContent, "复工 -1");
  assert.equal(actionButtonByName.recover.disabled, false);
  assert.match(known.get("#selectionHint").innerHTML, /复工 -1/);
  assert.equal(debug.runHintQuickAction("recover"), true);
  assert.equal(game.players[0].food, 3);
  assert.equal(game.players[0].turnRecovers, 1);
  assert.equal(bat.state, "ready");

  selectCard(owl);
  assert.equal(actionButtonByName.recover.disabled, true);
  assert.match(actionButtonByName.recover.title, /已经复工过 1 次/);
}

{
  const game = setupGame({ p1Food: 6 });
  game.players[0].hand = [makeCard("猴子")];
  assert.equal(debug.setSelected(game.players[0].hand[0].uid), true);
  debug.render();
  assert.match(known.get("#guideShortcut").textContent, /现在直接点 .*第1格|现在直接点 .*第2格|现在直接点 .*第3格/);
  assert.ok(boardButtons("#p1Board").some((button) => button.classList.tokens.has("is-direct-cta-spotlight")));
  assert.match(known.get("#selectionHint").innerHTML, /陆地第1格/);
  assert.match(known.get("#selectionHint").innerHTML, /取消选择/);
  assert.equal(debug.runHintQuickAction("summon:land:0"), true);
  assert.equal(game.players[0].hand.length, 0);
  assert.equal(game.players[0].board.land[0]?.name, "猴子");
}

{
  const game = setupGame({ p1Food: 6 });
  game.players[0].hand = [makeCard("猴子")];
  debug.clearSelected();
  debug.render();
  assert.match(known.get("#handPeek").innerHTML, /猴子/);
  assert.doesNotMatch(known.get("#handPeek").innerHTML, /先点/);
  assert.match(known.get("#selectionHint").className, /\bhint-box\b/);
  assert.match(known.get("#selectionHint").className, /\bcompact\b/);
  assert.match(known.get("#selectionHint").className, /\bis-opening-muted\b/);
  assert.doesNotMatch(known.get("#selectionHint").innerHTML, /懒得自己点|导演建议|照导演来/);
  assert.match(known.get("#resourceCue").innerHTML, /补一张私有牌|抽中牌B|抽强牌A|抽小牌C/);
  assert.match(known.get("#resourceCue").innerHTML, /节目分约 \+8/);
  assert.match(known.get("#tacticsCue").innerHTML, /先让一只动物上桌/);
  assert.match(known.get("#pressureCue").innerHTML, /先让一只动物进组/);
  assert.equal(known.get("#guideFocus").className, "guide-focus hidden");
  assert.equal(known.get("#guideFocus").innerHTML, "");
  assert.equal(known.get("#logPanel").classList.tokens.has("is-opening-peek"), true);
  assert.equal(known.get("#log").classList.tokens.has("is-opening-peek"), true);
  assert.match(known.get("#archiveShelf").innerHTML, /先开打|已存 \d+ 局/);
  assert.match(known.get("#archiveShelf").innerHTML, /先把这一局打起来|旧局都还在|先把眼前这手打完/);
  assert.equal(known.get("#actionResourceBand").classList.tokens.has("mobile-open"), true);
  assert.equal(known.get("#actionTacticsBand").classList.tokens.has("mobile-collapsed"), true);
  assert.equal(known.get("#actionPressureBand").classList.tokens.has("mobile-collapsed"), true);
  assert.equal(known.get("#actionTacticsBand").classList.tokens.has("is-opening-compact"), true);
  assert.equal(known.get("#actionPressureBand").classList.tokens.has("is-opening-compact"), true);
  assert.equal(known.get("#stageDeck").classList.tokens.has("is-opening-muted"), false);
  assert.equal(known.get("#actionResourceBand").classList.tokens.has("is-opening-muted"), true);
  assert.equal(known.get("#actionTacticsBand").classList.tokens.has("is-opening-muted"), true);
  assert.equal(known.get("#actionPressureBand").classList.tokens.has("is-opening-muted"), true);
  assert.match(known.get("#tacticsLock").textContent, /先让第一只动物进组|这组就开麦/);
  assert.match(known.get("#pressureLock").textContent, /开打组先收麦|才会亮灯/);
  assert.equal(known.get("#stageSheetPlaybook").classList.tokens.has("hidden"), true);
  assert.equal(known.get("#stageSheetQuest").classList.tokens.has("hidden"), false);
  assert.equal(known.get("#stageTabQuest").classList.tokens.has("is-active"), true);
  assert.equal(known.get("#logPanel").classList.tokens.has("hidden"), false);
  assert.equal(known.get("#publicPanel").classList.tokens.has("hidden"), true);
  assert.equal(debug.runPrimaryPlaybookShortcut(), true);
  assert.equal(game.players[0].hand.length, 0);
  assert.equal(game.players[0].board.land.some((card) => card?.name === "猴子"), true);
  assert.match(known.get("#log").children[0].innerHTML, /上场/);
  assert.match(known.get("#log").children[0].innerHTML, /第 1 回合/);
  assert.match(known.get("#log").children[0].innerHTML, /<strong>玩家一<\/strong>|<u>上场<\/u>|<em>-1 食物<\/em>/);
  assert.equal(known.get("#log").children[0].classList.tokens.has("is-latest"), true);
  assert.match(known.get("#actionStinger").innerHTML, /猴子/);
  assert.match(known.get("#actionStinger").innerHTML, /新选手进灯|进组|上《猴子》|上 猴子/);
  assert.match(known.get("#actionStinger").innerHTML, /有请|上桌|入戏|登场/);
  assert.match(known.get("#actionStinger").innerHTML, /猴子/);
  assert.match(known.get("#actionStinger").innerHTML, /采摘|绝活/);
  assert.match(known.get("#actionStinger").innerHTML, /接着|下一口最像|节目分再补一口/);
  assert.match(known.get("#liveReaction").innerHTML, /现场反应/);
  assert.match(known.get("#liveReaction").innerHTML, /猴子/);
  assert.match(known.get("#liveReaction").innerHTML, /进场|味已经出来了|主持人口播|原地发呆/);
  assert.doesNotMatch(known.get("#liveReaction").innerHTML, /节目分再补一口|下一口最像|接着/);
  assert.match(known.get("#momentRack").innerHTML, /新选手进灯/);
  assert.equal(known.get("#logPanel").classList.tokens.has("is-opening-peek"), false);
  assert.equal(known.get("#log").classList.tokens.has("is-opening-peek"), false);
  assert.match(known.get("#recordBlurb").innerHTML, /本回合高光/);
  assert.match(known.get("#recordBlurb").innerHTML, /正式进组/);
  assert.match(known.get("#recordBlurb").innerHTML, /下一拍：/);
  assert.equal(known.get("#selectionHint").className, "hint-box compact");
  assert.match(known.get("#selectionHint").innerHTML, /这只现在能整活|这只已经待命/);
  assert.match(known.get("#selectionHint").innerHTML, /发动 采摘/);
  assert.match(known.get("#guideShortcut").textContent, /现在先点下面那颗绝活按钮/);
  assert.equal(known.get("#guideActions").classList.tokens.has("is-opening-spotlight"), false);
  assert.equal(known.get("#guidePrimaryBtn").classList.tokens.has("is-opening-spotlight"), false);
  assert.equal(known.get("#actionTacticsBand").classList.tokens.has("mobile-open"), true);
  assert.equal(known.get("#actionTacticsBand").classList.tokens.has("has-cta-spotlight"), true);
  assert.equal(known.get("#actionResourceBand").classList.tokens.has("mobile-collapsed"), true);
  assert.equal(known.get("#stageDeck").classList.tokens.has("is-opening-muted"), false);
  assert.equal(known.get("#actionResourceBand").classList.tokens.has("is-opening-muted"), false);
  assert.equal(known.get("#actionTacticsBand").classList.tokens.has("is-opening-muted"), false);
  assert.equal(known.get("#actionPressureBand").classList.tokens.has("is-opening-muted"), false);
  assert.equal(actionButtonByName.skill.dataset.routeTag, "点这里");
  assert.equal(actionButtonByName.skill.classList.tokens.has("is-cta-spotlight"), true);
  assert.equal(actionButtonByName.cancelSelection.classList.tokens.has("is-cta-muted"), true);
  assert.ok(boardButtons("#p1Board").some((button) => button.dataset.routeTag === "就这只"));
  assert.match(known.get("#routeStrip").children[0].innerHTML, /猴子|已经待命|已经锁定/);
  assert.match(known.get("#routeStrip").children[1].innerHTML, /发动 采摘|点“发动 采摘”/);
  assert.match(known.get("#routeStrip").children[2].innerHTML, /热度 \+2|节目分约 \+24|做完赚/);
  assert.match(known.get("#guidePrimaryBtn").textContent, /猴子|绝活|采摘/);
  assert.doesNotMatch(known.get("#guidePrimaryBtn").textContent, /补 1 张牌/);
  assert.match(known.get("#endTurnBtn").textContent, /先别交给 AI|交给 AI|结束回合/);
  assert.match(known.get("#endTurnBtn").dataset.actionDetail || "", /猴子|采摘|有点东西|绝活/);
  assert.match(known.get("#guideFocus").innerHTML, /现在直接点|不用再对流程|直接把这一口结掉/);
  assert.match(known.get("#mobileGuideBadge").textContent, /就这只|接着演/);
  assert.match(known.get("#mobileGuideSummary").textContent, /锁定《猴子》/);
  assert.match(known.get("#mobileGuidePrimaryBtn").textContent, /猴子|绝活|采摘/);
  assert.doesNotMatch(known.get("#mobileGuidePrimaryBtn").textContent, /补 1 张牌/);
  assert.match(known.get("#mobileGuidePayoff").innerHTML, /热度 \+2/);
  assert.match(known.get("#momentumStrip").innerHTML, /节目分 12/);
  assert.match(known.get("#momentumStrip").innerHTML, /串烧 1/);
  assert.match(known.get("#archiveShelf").innerHTML, /最近上头局/);
  assert.match(known.get("#archiveShelf").innerHTML, /自动入柜/);
  assert.match(known.get("#showtimeScore").innerHTML, /节目分/);
  assert.match(known.get("#showtimeScore").innerHTML, /评级：热身/);
  assert.equal(known.get("#stageTabShowtime").classList.tokens.has("is-active"), true);
  assert.equal(known.get("#stageTabShowtime").classList.tokens.has("is-live"), true);
  assert.equal(known.get("#intelTabReport").classList.tokens.has("is-active"), true);
  assert.equal(game.active, 0);
  debug.handleEndTurnClick();
  assert.equal(game.active, 0);
  assert.match(known.get("#endTurnBtn").textContent, /再点/);
  assert.match(known.get("#endTurnBtn").dataset.actionDetail || "", /再点才收手/);
  assert.equal(known.get("#endTurnBtn").dataset.actionDetailTone, "warning");
  debug.handleEndTurnClick();
  assert.equal(game.active, 1);
}

{
  const game = setupGame({ p1Food: 6 });
  game.players[0].hand = [makeCard("龟虎")];
  debug.clearSelected();
  debug.render();
  assert.equal(debug.runPrimaryPlaybookShortcut(), true);
  debug.render();
  assert.equal(known.get("#showtimeReplayWrap").classList.tokens.has("hidden"), true);
  assert.equal(known.get("#showtimeReplay").children.length, 0);
}

{
  const game = setupGame({ p1Food: 6 });
  const snake = place(game, 0, "land", 0, "蛇");
  game.players[0].deck.push(makeCard("鸭"));
  game.players[0].turnQuest = debug.makeTurnQuest("skill_show");
  debug.render();

  assert.match(known.get("#questMeta").textContent, /本回合支线/);
  assert.match(known.get("#questCard").innerHTML, /整点绝活/);
  assert.equal(debug.buildPlaybookSuggestions()[0]?.kind, "skill");
  assert.equal(actionButtonByName.skill.classList.tokens.has("suggested"), true);
  assert.equal(actionButtonByName.skill.dataset.routeTag, "再点");
  assert.ok(boardButtons("#p1Board").some((button) => button.dataset.routeTag === "先点"));
  assert.match(known.get("#showtimeTitle").textContent, /还没开演/);
  assert.match(known.get("#showtimeScore").innerHTML, /节目分/);
  assert.match(known.get("#showtimeScore").innerHTML, /评级：热身/);
  assert.match(known.get("#guidePayoff").innerHTML, /任务 抽 1/);
  assert.match(known.get("#guidePayoff").innerHTML, /热度 \+2/);
  assert.match(known.get("#tacticsCue").innerHTML, /蛇 放 毒牙/);
  assert.match(known.get("#tacticsCue").innerHTML, /任务 抽 1/);
  selectCard(snake);
  assert.match(actionButtonByName.skill.dataset.actionDetail || "", /下次咬人会压休/);
  assert.match(actionButtonByName.skill.dataset.actionDetail || "", /领 抽 1/);
  assert.match(known.get("#tacticsMeta").textContent, /顺手领 抽 1|多半顺手领 抽 1/);
  assert.match(known.get("#selectionHint").innerHTML, /领 抽 1/);
  assert.equal(debug.useSkillFromLocation(debug.boardCards(game.players[0]).find((loc) => loc.card.uid === snake.uid)), true);
  debug.render();
  assert.equal(game.players[0].turnQuest.completed, true);
  assert.equal(game.players[0].turnHype, 4);
  assert.equal(JSON.stringify(game.players[0].turnHypeClaims), JSON.stringify([4]));
  assert.equal(game.players[0].turnHypeRewards.length, 1);
  assert.equal(game.players[0].food, 6, "skill cost 1, then first hype reward refunds 1 food");
  assert.equal(game.players[0].hand.length, 1);
  assert.equal(game.players[0].hand[0].name, "鸭");
  assert.match(known.get("#hypeMeta").textContent, /4 \/ 7/);
  assert.match(known.get("#hypeTip").innerHTML, /4 热度线/);
  assert.match(known.get("#hypeTip").innerHTML, /已掉/);
  assert.match(known.get("#hypeTip").innerHTML, /差 3|掉完还差 3/);
  assert.match(known.get("#hypeTip").innerHTML, /再闹 3 点会轮到|前一层掉完以后/);
  assert.equal(known.get("#coachTag").textContent, "热度奖励");
  assert.match(known.get("#coachTitle").textContent, /观众开始起哄了|敲起铁盆|摇尖叫鸡|把词忘了|乱喊安可|开始认人|自制灯牌/);
  assert.match(known.get("#showtimeTitle").textContent, /绝活|双响|三重奏|音乐节/);
  assert.match(known.get("#showtimeMeta").textContent, /连段/);
  assert.match(known.get("#showtimeScore").innerHTML, /节目分/);
  assert.match(known.get("#showtimeScore").innerHTML, /评级：有点东西|开始离谱|全桌拍桌|全场要报警/);
  assert.equal(known.get("#showtimeRewardsWrap").classList.tokens.has("hidden"), false);
  assert.equal(known.get("#showtimeRewards").children.length, 1);
  assert.match(known.get("#showtimeRewards").children[0].textContent, /薯片|肉干|口粮|饼干/);
  assert.match(known.get("#momentumStrip").innerHTML, /已领 抽 1/);
  assert.match(known.get("#momentumStrip").innerHTML, /节目分/);
  assert.match(known.get("#momentumStrip").innerHTML, /节目记账|支线兑现|观众买账/);
  assert.equal(known.get("#showtimeReplayWrap").classList.tokens.has("hidden"), false);
  assert.equal(known.get("#showtimeReplay").children.length >= 1, true);
  assert.match(known.get("#showtimeReplay").children[0].innerHTML, /毒牙|绝活|开屏|兽王/);
  assert.match(known.get("#showtimeTip").innerHTML, /可选|这手|约差|冲到|掉/);
  assert.match(known.get("#showtimeTip").innerHTML, /刚掉一层|再闹 3 点|下一份/);
  assert.match(known.get("#momentumStrip").innerHTML, /掉落追击|再闹 3 点/);
  assert.match(known.get("#recordBlurb").innerHTML, /热度还差 3 点|追不追看你的场面/);
  assert.match(known.get("#actionStinger").innerHTML, /绝活|毒牙|蛇|观众买账|口粮|奖励/);
  assert.match(known.get("#actionStinger").innerHTML, /续杯线|掉落线|下一口/);
  assert.match(known.get("#actionStinger").innerHTML, /再闹 3 点|轮到.*奖励|热度还差 3 点|追不追看你的场面/);
  assert.match(known.get("#liveReaction").innerHTML, /观众空投|奖励|看够|后手/);
  assert.doesNotMatch(known.get("#liveReaction").innerHTML, /再闹 3 点|轮到.*奖励|续杯线|掉落线/);
}

{
  const game = setupGame({ p1Food: 6 });
  place(game, 0, "land", 0, "猴子");
  place(game, 1, "land", 0, "蛇");
  game.players[0].turnQuest = debug.makeTurnQuest("skill_show");
  game.players[0].turnQuest.completed = true;
  game.players[0].turnQuest.completedTurn = game.turn;
  game.players[0].turnQuest.completedStep = 5;
  game.players[0].turnHype = 7;
  game.players[0].turnHypeClaims = [4, 7];
  game.players[0].turnHypeRewards = [
    {
      threshold: 7,
      label: "后台塞来一张私房牌",
      headline: "场记把流程本撕了一页给你",
      flavor: "大家默认你接下来还要继续整，所以先给你一张底牌。",
      rewardType: "draw_private",
      rewardAmount: 1,
      tone: "trick",
    },
  ];
  game.step = 5;
  game.history = [
    { step: 1, turn: game.turn, action: "summon", actor: "玩家一", target: "猴子", extra: { cardName: "猴子" } },
    { step: 2, turn: game.turn, action: "skill_venom", actor: "玩家一", target: "猴子", extra: { skillName: "毒牙" } },
    { step: 3, turn: game.turn, action: "attack_creature_kill", actor: "玩家一", target: "蛇", extra: { attackerCard: "猴子", targetCard: "蛇", targetLevel: "B" } },
    { step: 4, turn: game.turn, action: "quest_complete", actor: "玩家一", target: "整点绝活", extra: { questId: "skill_show", reason: "发动了 1 次主动技能", rewardType: "draw_private", rewardAmount: 1 } },
    { step: 5, turn: game.turn, action: "hype_reward", actor: "观众", target: "玩家一", extra: { threshold: 7, rewardType: "draw_private", rewardAmount: 1, rewardLabel: "后台塞来一张私房牌", rewardFlavor: "大家默认你接下来还要继续整，所以先给你一张底牌。", rewardTone: "trick" } },
  ];
  debug.render();
  const html = known.get("#momentumStrip").innerHTML;
  const routeStart = html.indexOf("momentum-route");
  const routeEnd = html.indexOf("momentum-settlements");
  const routeHtml = routeStart >= 0 ? html.slice(routeStart, routeEnd >= 0 ? routeEnd : undefined) : "";
  const killIndex = Math.max(html.indexOf("收头结算"), html.indexOf("大货落地"));
  const questIndex = html.indexOf("支线兑现");
  const rewardIndex = html.indexOf("观众买账");
  const routeLabelIndex = routeHtml.indexOf("这手串法");
  const routeSummonIndex = routeHtml.indexOf("上场");
  const routeSkillIndex = routeHtml.indexOf("绝活");
  const routeKillIndex = routeHtml.indexOf("收头");
  const routeQuestIndex = routeHtml.indexOf("领奖");
  const routeRewardIndex = routeHtml.indexOf("喝彩");
  assert.ok(killIndex >= 0);
  assert.ok(questIndex >= 0);
  assert.ok(rewardIndex >= 0);
  assert.ok(killIndex < questIndex);
  assert.ok(questIndex < rewardIndex);
  assert.ok(routeLabelIndex >= 0);
  assert.ok(routeSummonIndex >= 0);
  assert.ok(routeSkillIndex >= 0);
  assert.ok(routeKillIndex >= 0);
  assert.ok(routeQuestIndex >= 0);
  assert.ok(routeRewardIndex >= 0);
  assert.ok(routeSummonIndex < routeSkillIndex);
  assert.ok(routeSkillIndex < routeKillIndex);
  assert.ok(routeKillIndex < routeQuestIndex);
  assert.ok(routeQuestIndex < routeRewardIndex);
  assert.doesNotMatch(html, /节目记账/);
}

{
  const game = setupGame({ p1Food: 6 });
  const penguin = place(game, 0, "land", 0, "企鹅");
  const frog = place(game, 1, "water", 0, "蛙");
  game.players[0].turnQuest = debug.makeTurnQuest("move_and_hit");
  assert.equal(debug.setSelected(penguin.uid), true);
  assert.equal(debug.moveSelected("water", 1), true);

  const penguinLoc = debug.boardCards(game.players[0]).find((loc) => loc.card.uid === penguin.uid);
  const frogLoc = debug.boardCards(game.players[1]).find((loc) => loc.card.uid === frog.uid);
  assert.equal(debug.resolveDirectCreatureAttack(penguinLoc, frogLoc), true);
  debug.render();
  assert.equal(game.players[0].turnQuest.completed, true);
  assert.equal(game.players[0].turnHype, 4);
  assert.equal(JSON.stringify(game.players[0].turnHypeClaims), JSON.stringify([4]));
  assert.equal(game.players[0].food, 7, "free move + attack 1 + quest reward 1 + first hype reward 1");
}

{
  const game = setupGame({ p1Food: 4 });
  game.players[0].hand = [makeCard("袋鼠")];
  debug.render();
  const suggestions = debug.buildPlaybookSuggestions();
  assert.equal(suggestions[0]?.kind, "summon");
  assert.match(known.get("#playbookMeta").textContent, /可以|观众|这手|节目卡|特技/);
  assert.equal(known.get("#playbookList").children.length > 0, true);
  assert.equal(known.get("#coachTitle").textContent, "第一回合开打");
  assert.equal(known.get("#coachAside").textContent.length > 0, true);
  assert.match(known.get("#p1Cue").textContent, /开场：|中盘：/);
  assert.match(known.get("#selectionHint").innerHTML, /自由行动/);
  assert.match(known.get("#selectionHint").innerHTML, /读手牌|看亮格/);
  const lastHandCard = known.get("#hand").children[known.get("#hand").children.length - 1];
  assert.equal(lastHandCard.classList.tokens.has("route-source"), true);
  assert.equal(lastHandCard.dataset.routeTag, "先点");
  assert.ok(boardButtons("#p1Board").some((button) => button.dataset.routeTag === "再点"));
  assert.match(known.get("#showtimeTitle").textContent, /还没开演/);
  assert.match(known.get("#showtimeTip").innerHTML, /还没开演|自己开一手|上场/);
  assert.doesNotMatch(known.get("#showtimeTip").innerHTML, /导演建议|主推/);

  debug.setAIPersona("schemer");
  assert.match(known.get("#aiPersonaBtn").textContent, /AI 脾气：老六流/);
  debug.setAIPersona("steady");
}

{
  const game = setupGame({ p1Food: 6 });
  game.players[0].hand = [makeCard("袋鼠"), makeCard("猴子")];
  game.players[0].deck = [makeCard("羊")];
  debug.clearSelected();
  debug.render();
  const suggestions = debug.buildPlaybookSuggestions();
  assert.equal(suggestions.length > 1, true);
  assert.equal(known.get("#playbookList").children.length, 2);
  assert.match(known.get("#playbookList").children[0].innerHTML, /袋鼠|猴子|上/);
  assert.equal(known.get("#playbookList").children[1].className, "playbook-more collapsed");
  assert.match(known.get("#playbookList").children[1].innerHTML, /再看 1 手备选|第一把先别让太多建议同时开麦/);
  assert.match(known.get("#playbookTip").textContent, /第一把先别看满屏，就照最上面：/);
  assert.match(known.get("#playbookTip").textContent, /袋鼠|猴子/);
}

{
  const game = setupGame({ active: 1, turn: 2, p1Food: 6, p2Food: 6 });
  place(game, 1, "land", 0, "蛇");
  game.players[1].turnDisaster = null;
  game.players[1].hand = [];
  debug.setAIPersona("schemer");
  debug.clearSelected();
  debug.render();

  assert.match(known.get("#guideMeta").textContent, /蛇|毒牙|整活|绝活/);
  assert.match(known.get("#guidePayoff").innerHTML, /老六流/);
  assert.match(known.get("#guidePayoff").innerHTML, /热度 \+2|节目分约 \+20|食物/);
  assert.match(known.get("#guideShortcut").textContent, /右侧场地|高亮|可能动/);
  assert.match(known.get("#mobileGuideBadge").textContent, /像开绝活|想开绝活/);
  assert.match(known.get("#mobileGuideSummary").textContent, /蛇|毒牙|整活/);
  assert.match(known.get("#starterRail").innerHTML, /像开绝活|想开绝活/);
  assert.match(known.get("#playbookMeta").textContent, /想开绝活/);
  assert.match(known.get("#playbookTip").textContent, /蛇|毒牙|整活/);
  assert.match(known.get("#routeStrip").children[0].innerHTML, /蛇|毒牙|绝活/);
  assert.match(known.get("#routeStrip").children[1].innerHTML, /盯住《蛇》|先盯这只|留意/);
  assert.match(known.get("#tacticsMeta").textContent, /蛇|毒牙|邪门味|整活/);
  assert.match(known.get("#tacticsLock").textContent, /观战模式|黄标/);
  assert.ok(boardButtons("#p2Board").some((button) => button.dataset.routeTag === "它用"));
  debug.setAIPersona("steady");
}

{
  const game = setupGame({ active: 1, turn: 2, p1Food: 6, p2Food: 6 });
  place(game, 1, "land", 0, "蛇");
  game.players[1].turnDisaster = null;
  game.players[1].turnHype = 2;
  game.players[1].hand = [];
  debug.setAIPersona("schemer");
  debug.clearSelected();
  debug.render();

  assert.match(known.get("#playbookMeta").textContent, /想抢掉落/);
  assert.match(known.get("#playbookTip").textContent, /掉落|热度会先过 4 线|抢这层掉落/);
  assert.match(known.get("#mobileGuideBadge").textContent, /想抢掉落/);
  assert.match(known.get("#mobileGuideSummary").textContent, /掉落|热度会先过 4 线|抢这层掉落/);
  assert.match(known.get("#coachAside").textContent, /掉落|奖励|老六/);
  debug.setAIPersona("steady");
}

{
  const game = setupGame({ active: 1, turn: 2, p1Food: 6, p2Food: 6 });
  place(game, 1, "land", 0, "中华田园犬");
  place(game, 0, "land", 0, "苏格兰折耳猫");
  game.players[1].turnDisaster = null;
  game.players[1].hand = [];
  debug.setAIPersona("steady");
  debug.clearSelected();
  debug.render();

  assert.match(known.get("#routeStrip").children[0].innerHTML, /中华田园犬|苏格兰折耳猫|打|咬/);
  assert.match(known.get("#pressureMeta").textContent, /苏格兰折耳猫|红框|下口/);
  assert.match(known.get("#guidePayoff").innerHTML, /目标退场|下回合缓一拍|不死也躺/);
  assert.ok(boardButtons("#p2Board").some((button) => button.dataset.routeTag === "它咬"));
  assert.ok(boardButtons("#p1Board").some((button) => button.dataset.routeTag === "它盯"));
}

{
  const game = setupGame({ p1Food: 2 });
  game.players[0].turnsTaken = 2;
  game.players[0].openingCue = null;
  game.players[0].hand = [makeCard("马")];
  debug.render();

  const suggestions = debug.buildPlaybookSuggestions();
  assert.equal(suggestions[0]?.kind, "summon");
  assert.match(suggestions[0]?.note || "", /推进场面|有攻击力/);
}

{
  const game = setupGame({ p1Food: 6 });
  game.players[0].turnsTaken = 2;
  game.players[0].openingCue = null;
  game.players[0].hand = [makeCard("猴子")];
  debug.render();

  const handCard = known.get("#hand").children[0];
  const suggestions = debug.buildPlaybookSuggestions();
  assert.match(handCard.innerHTML, /stat-label">攻/);
  assert.match(handCard.innerHTML, /stat-label">防/);
  assert.match(handCard.innerHTML, /可上 · \d+ 格/);
  assert.match(handCard.title, /猴子｜攻 \d+ \/ 防 \d+｜上场费/);
  assert.match(handCard.title, /采摘/);
  assert.match(handCard.title, /现在能放到 \d+ 个合法空格/);
  assert.equal(handCard.classList.tokens.has("is-hand-playable"), true);
  assert.match(known.get("#handPeek").innerHTML, /可上 · \d+ 格/);
  assert.equal(suggestions[0]?.kind, "summon");
  assert.match(suggestions[0]?.note || "", /后勤猴/);
  assert.match(known.get("#selectionHint").innerHTML, /自由行动|读手牌|看亮格/);
}

{
  const game = setupGame({ p1Food: 1 });
  game.players[0].turnsTaken = 2;
  game.players[0].openingCue = null;
  game.players[0].hand = [makeCard("狮子")];
  debug.render();

  const handCard = known.get("#hand").children[0];
  assert.match(handCard.innerHTML, /差 2 粮/);
  assert.match(handCard.title, /上场要 3 食物/);
  assert.equal(handCard.classList.tokens.has("is-hand-blocked"), true);
  assert.match(known.get("#handPeek").innerHTML, /差 2 粮/);
}

{
  const game = setupGame({ p1Food: 10 });
  game.players[0].turnsTaken = 2;
  game.players[0].openingCue = null;
  place(game, 0, "land", 0, "猴子");
  place(game, 0, "land", 1, "袋鼠");
  place(game, 0, "land", 2, "马");
  game.players[0].hand = [makeCard("苏格兰折耳猫")];
  debug.render();

  const handCard = known.get("#hand").children[0];
  assert.match(handCard.innerHTML, /没空位/);
  assert.match(handCard.title, /没有空格/);
  assert.equal(handCard.classList.tokens.has("is-hand-blocked"), true);
}

{
  const game = setupGame({ p1Food: 6 });
  const snake = place(game, 0, "land", 0, "蛇");
  const cat = place(game, 1, "land", 0, "苏格兰折耳猫");
  assert.equal(debug.setSelected(snake.uid), true);
  debug.render();

  const guideFocus = known.get("#guideFocus").innerHTML;
  assert.match(guideFocus, /镜头给到你的《蛇》/);
  assert.match(guideFocus, /毒牙牌/);
  assert.match(guideFocus, /发动 毒牙 -1/);
  assert.match(guideFocus, /打目标 x1/);
}

{
  const game = setupGame({ p1Food: 4 });
  game.players[0].openingCue = "waterline";
  game.players[0].hand = [makeCard("企鹅")];
  debug.render();

  const suggestions = debug.buildPlaybookSuggestions();
  assert.equal(suggestions[0]?.kind, "summon");
  assert.equal(suggestions[0]?.lane, "water");
  assert.match(known.get("#playbookMeta").textContent, /水线/);
  assert.match(known.get("#selectionHint").innerHTML, /自由行动/);
  assert.match(known.get("#selectionHint").innerHTML, /水线|水位|读手牌|看亮格/);
}

{
  const game = setupGame({ p1Food: 2 });
  game.players[0].openingCue = "pocket";
  game.players[0].hand = [makeCard("兔子"), makeCard("松鼠"), makeCard("熊"), makeCard("狮子"), makeCard("大象")];
  game.players[0].deck = [makeCard("鸭"), makeCard("孔雀鱼")];
  debug.render();

  const suggestions = debug.buildPlaybookSuggestions();
  assert.equal(suggestions[0]?.kind, "draw_private");
  assert.match(known.get("#playbookMeta").textContent, /翻口袋/);
  assert.match(known.get("#selectionHint").innerHTML, /自由行动/);
  assert.match(known.get("#selectionHint").innerHTML, /先摸 1 张|读手牌|看亮格/);
}

{
  const game = setupGame({ p1Food: 4 });
  game.players[0].hand = [makeCard("袋鼠")];
  game.players[0].turnHype = 3;
  game.players[0].turnHypeClaims = [];
  debug.render();

  assert.match(known.get("#playbookMeta").textContent, /观众在拱/);
  assert.equal(known.get("#hypeBox").classList.tokens.has("jackpot-ready"), true);
  assert.match(known.get("#hypeAlert").textContent, /薯片|这一手就掉/);
  assert.match(known.get("#hypeTip").innerHTML, /这手掉|4 热度线/);
}

{
  const game = setupGame({ p1Food: 10 });
  const lion = place(game, 0, "land", 0, "狮子");
  const cat = place(game, 1, "land", 0, "苏格兰折耳猫");
  game.players[0].turnQuest = debug.makeTurnQuest("big_game_hunter");
  game.players[0].turnQuest.completed = true;
  game.players[0].turnHype = 5;
  game.players[0].turnHypeClaims = [4];
  debug.render();

  const dogLoc = debug.boardCards(game.players[0]).find((loc) => loc.card.uid === lion.uid);
  const catLoc = debug.boardCards(game.players[1]).find((loc) => loc.card.uid === cat.uid);
  assert.equal(debug.resolveDirectCreatureAttack(dogLoc, catLoc), true);
  debug.render();
  assert.equal(game.players[0].turnHype, 7);
  assert.equal(JSON.stringify(game.players[0].turnHypeClaims), JSON.stringify([4, 7]));
  assert.match(known.get("#hypeTip").innerHTML, /已经把观众喊起来了|节目效果/);
  assert.match(known.get("#hypeTip").innerHTML, /已掉/);
}

{
  const game = setupGame({ active: 1, p1Food: 3, p2Food: 10 });
  const guardDog = place(game, 0, "land", 0, "中华田园犬");
  const rhino = place(game, 1, "land", 0, "犀牛");
  const rhinoLoc = debug.boardCards(game.players[1]).find((loc) => loc.card.uid === rhino.uid);

  assert.equal(debug.resolveDirectPlayerAttack(rhinoLoc), true);
  debug.render();
  assert.equal(debug.getPendingDefense()?.kind, "face");
  assert.match(actionButtonByName.confirmGuard.textContent, /动物格挡 .*中华田园犬 -1|动物格挡/);
  assert.match(actionButtonByName.confirmGuard.dataset.actionDetail || "", /会替你顶住|会挡住|漏 2|格挡/);
  assert.match(actionButtonByName.letThrough.textContent, /玩家承受打击 .* -2|玩家承受打击/);
  assert.match(actionButtonByName.letThrough.dataset.actionDetail || "", /玩家 -2 血|玩家 -/);
  assert.equal(actionButtonByName.confirmGuard.disabled, false);
  assert.equal(actionButtonByName.letThrough.disabled, false);
  assert.equal(known.get("#actionDefenseBand").classList.tokens.has("is-reaction-decision"), true);
  assert.equal(actionButtonByName.confirmGuard.classList.tokens.has("is-reaction-choice"), true);
  assert.equal(actionButtonByName.confirmGuard.classList.tokens.has("is-reaction-left"), true);
  assert.equal(actionButtonByName.letThrough.classList.tokens.has("is-reaction-right"), true);
  assert.equal(known.get("#selectionHint").className, "hint-box is-decision");
  assert.match(known.get("#selectionHint").innerHTML, /中华田园犬|玩家承受打击/);
  assert.match(known.get("#selectionHint").innerHTML, /hint-action-detail/);
  assert.match(known.get("#selectionHint").innerHTML, /会挡住|这只会顶住/);
  assert.match(known.get("#guideMeta").textContent, /只会结这一口|动物格挡|玩家承受打击/);
  assert.match(known.get("#guideShortcut").textContent, /动物格挡|玩家承受打击|玩家 -2/);
  assert.equal(known.get("#guideFocus").className, "guide-focus tone-danger is-decision");
  assert.match(known.get("#guideFocus").innerHTML, /动物格挡|玩家 -2|漏 2/);
  assert.match(known.get("#coachDetail").textContent, /玩家承受打击|玩家 -2/);
  assert.match(known.get("#mobileGuideSummary").textContent, /只判这一口|玩家 -2/);
  assert.match(known.get("#starterRail").innerHTML, /只判这一口|动物格挡|玩家承受/);
  assert.match(known.get("#routeStrip").children[0].innerHTML, /动物格挡|玩家 -2/);
  assert.equal(known.get("#actionDefenseBand").classList.tokens.has("mobile-open"), true);
  assert.equal(known.get("#actionTacticsBand").classList.tokens.has("mobile-collapsed"), true);
  assert.equal(debug.runHintQuickAction("confirmGuard"), true);
  assert.equal(game.players[0].hp, 18, "unstoppable should still leak 2 damage");
  assert.equal(game.players[0].board.land[0], null, "blocker should die to rhino hit");
  assert.equal(game.players[1].board.land[0].state, "spent");
  assert.equal(debug.getPendingDefense(), null);
  assert.match(known.get("#actionStinger").innerHTML, /格挡到位|挡了也疼|中华田园犬|漏了 2/);
  assert.match(known.get("#actionStinger").innerHTML, /漏了|还疼|蹭进|不讲理/);
  assert.match(known.get("#liveReaction").innerHTML, /漏血警报|挡住了，但没全挡住|蹭进了 2 血|挡了它还要疼/);
}

{
  const game = setupGame({ active: 1, p1Food: 8, p2Food: 10 });
  const snake = place(game, 1, "land", 0, "蛇", { venomStrike: true });
  const whiteRhino = place(game, 0, "land", 0, "白犀牛");
  const whiteRhinoLoc = debug.boardCards(game.players[0]).find((loc) => loc.card.uid === whiteRhino.uid);

  assert.equal(debug.setSelected(snake.uid), true);
  context.attackCreature(whiteRhinoLoc);
  debug.render();
  assert.equal(debug.getPendingDefense()?.kind, "creature");
  assert.match(actionButtonByName.confirmGuard.textContent, /玩家承受打击 .*白犀牛 -2|玩家承受打击/);
  assert.match(actionButtonByName.letThrough.textContent, /让动物承受伤害 .*白犀牛|让动物承受伤害/);
  assert.match(actionButtonByName.confirmGuard.dataset.actionDetail || "", /玩家 -2 血 .*这只会保住|这只会保住/);
  assert.match(actionButtonByName.letThrough.dataset.actionDetail || "", /这只会休息|这只会退场/);
  assert.equal(known.get("#actionDefenseBand").classList.tokens.has("is-reaction-decision"), true);
  assert.equal(actionButtonByName.confirmGuard.classList.tokens.has("is-reaction-left"), true);
  assert.equal(actionButtonByName.letThrough.classList.tokens.has("is-reaction-right"), true);
  assert.equal(known.get("#selectionHint").className, "hint-box is-decision");
  assert.match(known.get("#selectionHint").innerHTML, /这只会保住/);
  assert.match(known.get("#selectionHint").innerHTML, /这只会休息|这只会退场/);
  assert.match(known.get("#guideMeta").textContent, /只会结这一口|玩家 -2 保/);
  assert.match(known.get("#guideShortcut").textContent, /玩家承受打击|值不值 2 血/);
  assert.equal(known.get("#guideFocus").className, "guide-focus tone-danger is-decision");
  assert.match(known.get("#guideFocus").innerHTML, /值不值 2 血|玩家承受：-2|结完回主回合/);
  assert.match(known.get("#coachDetail").textContent, /附带特技|玩家承受打击/);
  assert.match(known.get("#mobileGuideSummary").textContent, /值不值 2 血|玩家承受打击/);
  assert.match(known.get("#starterRail").innerHTML, /只判这只|玩家承受|动物承受/);
  assert.match(known.get("#routeStrip").children[0].innerHTML, /值不值 2 血/);
  assert.equal(known.get("#actionDefenseBand").classList.tokens.has("mobile-open"), true);
  assert.equal(known.get("#actionPressureBand").classList.tokens.has("mobile-collapsed"), true);

  assert.equal(debug.resolveDefenseDecision(true), true);
  assert.equal(game.players[0].hp, 18, "player should lose hp to protect creature");
  assert.equal(game.players[0].turnProtects, 1, "creature protection should consume the once-per-turn protect");
  assert.equal(game.players[0].board.land[0]?.name, "白犀牛");
  assert.equal(game.players[0].board.land[0]?.state, "ready", "creature guard should ignore venom and keep target ready");
  assert.equal(game.players[1].board.land[0]?.state, "spent");
  assert.equal(game.players[1].board.land[0]?.venomStrike, false);
  assert.equal(debug.getPendingDefense(), null);
  assert.match(known.get("#actionStinger").innerHTML, /保护成功|白犀牛|硬保下来了|硬保|留下|顶账/);
  assert.match(known.get("#liveReaction").innerHTML, /玩家承受|白犀牛|掉了 2 血|保后面整活的资格|硬把/);

  const tiger = place(game, 1, "land", 1, "虎");
  const tigerLoc = debug.boardCards(game.players[1]).find((loc) => loc.card.uid === tiger.uid);
  const protectedRhinoLoc = debug.boardCards(game.players[0]).find((loc) => loc.card.uid === whiteRhino.uid);
  assert.equal(debug.beginCreatureAttack(tigerLoc, protectedRhinoLoc), true);
  assert.equal(debug.getPendingDefense(), null, "second creature attack in the same turn should not offer another protect prompt");
  assert.equal(game.players[0].board.land[0]?.state, "rest", "second attack should resolve directly after protect is spent");
}

{
  const game = setupGame({ active: 1, p1Food: 8, p2Food: 10 });
  const tiger = place(game, 1, "land", 0, "虎");
  const sheep = place(game, 0, "land", 0, "羊");
  const tigerLoc = debug.boardCards(game.players[1]).find((loc) => loc.card.uid === tiger.uid);
  const sheepLoc = debug.boardCards(game.players[0]).find((loc) => loc.card.uid === sheep.uid);
  assert.equal(debug.beginCreatureAttack(tigerLoc, sheepLoc), true);
  debug.render();
  assert.equal(debug.getPendingDefense()?.kind, "creature");
  assert.match(known.get("#coachTag").textContent, /保命选择/);
}

{
  const game = setupGame({ active: 1, p1Food: 8, p2Food: 10 });
  const tiger = place(game, 1, "land", 0, "虎");
  const sheep = place(game, 0, "land", 0, "羊");
  const tigerLoc = debug.boardCards(game.players[1]).find((loc) => loc.card.uid === tiger.uid);
  const sheepLoc = debug.boardCards(game.players[0]).find((loc) => loc.card.uid === sheep.uid);

  assert.equal(debug.beginCreatureAttack(tigerLoc, sheepLoc), true);
  debug.render();
  assert.equal(debug.buildPlaybookSuggestions()[0]?.kind, "creature_pass");
  assert.match(known.get("#guidePrimaryBtn").textContent, /让动物承受伤害/);
}

{
  const game = setupGame({ active: 1, p1Food: 8, p2Food: 10 });
  const tiger = place(game, 1, "land", 0, "虎");
  const sheep = place(game, 0, "land", 0, "羊");
  const tigerLoc = debug.boardCards(game.players[1]).find((loc) => loc.card.uid === tiger.uid);
  const sheepLoc = debug.boardCards(game.players[0]).find((loc) => loc.card.uid === sheep.uid);

  assert.equal(debug.beginCreatureAttack(tigerLoc, sheepLoc), true);
  assert.equal(debug.resolveDefenseDecision(false), true);
  debug.render();

  const attackEvent = game.history.find((event) => event.action === "attack_creature_kill" || event.action === "attack_creature_injure");
  assert.ok(attackEvent?.extra?.aiIntent);
  assert.match(attackEvent.extra.aiReason, /可用攻击点|行动路线|下回合/);
  assert.equal(known.get("#log").children.some((child) => /log-ai-reason/.test(child.innerHTML)), false);
  assert.ok(known.get("#log").children.some((child) => /<strong>AI 对手<\/strong>|AI/.test(child.innerHTML)));
}

{
  const game = setupGame({ active: 1, p1Food: 12, p2Food: 10 });
  const tiger = place(game, 1, "land", 0, "虎");
  const rhino = place(game, 0, "land", 0, "白犀牛");
  const tigerLoc = debug.boardCards(game.players[1]).find((loc) => loc.card.uid === tiger.uid);
  const rhinoLoc = debug.boardCards(game.players[0]).find((loc) => loc.card.uid === rhino.uid);

  assert.equal(debug.beginCreatureAttack(tigerLoc, rhinoLoc), true);
  debug.render();
  assert.equal(debug.buildPlaybookSuggestions()[0]?.kind, "creature_guard");
  assert.match(known.get("#guidePrimaryBtn").textContent, /玩家承受打击/);
}

{
  const game = setupGame();
  const dog = place(game, 0, "land", 0, "中华田园犬");
  const peacock = place(game, 1, "land", 0, "孔雀", { tauntTurns: 1 });
  const sourceLoc = debug.boardCards(game.players[0]).find((loc) => loc.card.uid === dog.uid);
  assert.equal(debug.resolveDirectPlayerAttack(sourceLoc), false);
  assert.equal(game.players[1].hp, 20);
  assert.equal(peacock.tauntTurns, 1);
}

{
  const game = setupGame();
  const snake = place(game, 0, "land", 0, "蛇");
  const rhino = place(game, 1, "land", 0, "白犀牛");
  const snakeLoc = debug.boardCards(game.players[0]).find((loc) => loc.card.uid === snake.uid);
  const rhinoLoc = debug.boardCards(game.players[1]).find((loc) => loc.card.uid === rhino.uid);
  assert.equal(debug.useSkillFromLocation(snakeLoc), true);
  assert.equal(debug.resolveDirectCreatureAttack(snakeLoc, rhinoLoc), true);
  assert.equal(rhino.state, "rest");
  assert.equal(snake.venomStrike, false);
}

{
  const game = setupGame({ p1Food: 20, p2Food: 10 });
  const bear = place(game, 0, "land", 0, "熊");
  const rhino = place(game, 1, "land", 0, "白犀牛");
  const bearLoc = debug.boardCards(game.players[0]).find((loc) => loc.card.uid === bear.uid);
  const rhinoLoc = debug.boardCards(game.players[1]).find((loc) => loc.card.uid === rhino.uid);

  assert.equal(debug.resolveDirectCreatureAttack(bearLoc, rhinoLoc), true);
  assert.equal(rhino.state, "rest");
  assert.equal(rhino.pressureWounds, 1);

  bear.state = "ready";
  rhino.state = "ready";
  assert.equal(debug.resolveDirectCreatureAttack(bearLoc, rhinoLoc), true);
  assert.equal(rhino.state, "rest");
  assert.equal(rhino.pressureWounds, 2);
  assert.equal(game.players[1].board.land[0]?.name, "白犀牛");

  bear.state = "ready";
  rhino.state = "ready";
  assert.equal(debug.resolveDirectCreatureAttack(bearLoc, rhinoLoc), true);
  assert.equal(rhino.state, "rest");
  assert.equal(rhino.pressureWounds, 3);
  assert.equal(game.players[1].board.land[0]?.name, "白犀牛");

  bear.state = "ready";
  rhino.state = "ready";
  assert.equal(debug.resolveDirectCreatureAttack(bearLoc, rhinoLoc), true);
  assert.equal(game.players[1].board.land[0], null);
  assert.equal(game.players[1].grave.at(-1)?.name, "白犀牛");
  assert.ok(game.history.some((event) => event.action === "attack_creature_pressure_kill" && event.target === "白犀牛"));
}

{
  const game = setupGame({ p1Food: 10 });
  const snake = place(game, 0, "land", 0, "蛇");
  const tiger = place(game, 0, "land", 1, "东北虎");
  const snakeLoc = debug.boardCards(game.players[0]).find((loc) => loc.card.uid === snake.uid);
  const tigerLoc = debug.boardCards(game.players[0]).find((loc) => loc.card.uid === tiger.uid);

  assert.equal(debug.useSkillFromLocation(snakeLoc), true);
  assert.equal(game.players[0].turnSkills, 1);
  assert.match(debug.activeSkillReadyError(game.players[0], tiger), /已经发动过 1 次主动技能/);
  assert.equal(debug.useSkillFromLocation(tigerLoc), false);
  assert.equal(game.players[0].turnSkills, 1);

  debug.endTurn();
  debug.endTurn();
  assert.equal(game.players[0].turnSkills, 0);
  assert.equal(debug.activeSkillReadyError(game.players[0], tiger), "");
}

{
  const game = setupGame({ p1Food: 10 });
  const lion = place(game, 0, "land", 0, "狮子");
  game.players[1].hp = 2;
  const lionLoc = debug.boardCards(game.players[0]).find((loc) => loc.card.uid === lion.uid);
  assert.equal(debug.resolveDirectPlayerAttack(lionLoc), true);
  debug.render();
  const record = debug.buildMatchRecord(true);
  assert.equal(game.winner, 0);
  assert.equal(known.get("#winnerBanner").classList.tokens.has("hidden"), false);
  assert.match(known.get("#winnerBanner").innerHTML, /本局收官/);
  assert.match(known.get("#winnerBanner").innerHTML, /玩家一|你 \/ 玩家一/);
  assert.match(known.get("#winnerBanner").innerHTML, /MVP|狮子|本局主角|离谱局/);
  assert.match(known.get("#archiveShelf").innerHTML, /刚存好|最近上头局/);
  assert.match(known.get("#archiveShelf").innerHTML, /玩家一/);
  assert.match(known.get("#archiveShelf").innerHTML, /MVP|狮子|离谱局/);
  assert.match(known.get("#momentRack").innerHTML, /本局主角|血线施压/);
  assert.ok(record?.flavorSummary, "finished match should include flavor summary");
  assert.match(record.flavorSummary.review || "", /离谱|对局|朋友/);
  assert.equal(Array.isArray(record.flavorSummary.stickers), true);
  assert.match(context.window.localStorage.getItem("jungle-law-match-archive-v2") || "", /玩家一|狮子|离谱局/);
}

{
  const game = setupGame();
  const commander = place(game, 0, "sky", 0, "飞翔钱力");
  const owl = place(game, 0, "sky", 1, "猫头鹰");
  const wolfA = place(game, 0, "land", 0, "狼");
  const wolfB = place(game, 0, "land", 1, "狼");
  const wolfC = place(game, 0, "land", 2, "狼");

  assert.equal(debug.effectiveAttack(game.players[0], commander), Number(commander.atk) + 1);
  assert.equal(debug.effectiveAttack(game.players[0], owl), Number(owl.atk) + 1);
  assert.equal(debug.attackSpendCost(game.players[0], owl), Number(owl.atk));
  assert.equal(debug.effectiveAttack(game.players[0], wolfA), Number(wolfA.atk) + 1);
  assert.equal(debug.attackSpendCost(game.players[0], wolfA), Number(wolfA.atk));
  assert.equal(debug.effectiveAttack(game.players[0], wolfB), Number(wolfB.atk) + 1);
  assert.equal(debug.effectiveAttack(game.players[0], wolfC), Number(wolfC.atk) + 1);
}

{
  const game = setupGame({ active: 1, turn: 1, p1Food: 10, p2Food: 10 });
  const tiger = place(game, 1, "land", 0, "东北虎");
  const human = place(game, 0, "land", 0, "普通人类");
  const tigerLoc = debug.boardCards(game.players[1]).find((loc) => loc.card.uid === tiger.uid);

  assert.equal(debug.useSkillFromLocation(tigerLoc, "AI 对手"), true);
  assert.equal(debug.effectiveAttack(game.players[0], human), Math.max(0, Number(human.atk) - 2));
  assert.equal(debug.effectiveDefense(game.players[0], human), Math.max(0, Number(human.def) - 1));

  debug.endTurn();
  assert.equal(game.active, 0);
  assert.equal(game.turn, 2);
  assert.equal(debug.effectiveAttack(game.players[0], human), Math.max(0, Number(human.atk) - 2));

  debug.endTurn();
  assert.equal(game.active, 1);
  assert.equal(game.turn, 2);
  assert.equal(debug.effectiveAttack(game.players[0], human), Number(human.atk));
  assert.equal(debug.effectiveDefense(game.players[0], human), Number(human.def));
}

{
  const game = setupGame();
  const dog = place(game, 0, "land", 0, "中华田园犬");
  place(game, 1, "land", 0, "苏格兰折耳猫");
  game.players[0].turnHype = 3;
  selectCard(dog);
  assert.match(actionButtonByName.attackCreature.textContent, /收 苏格兰折耳猫|压 苏格兰折耳猫|毒 苏格兰折耳猫|打 苏格兰折耳猫/);
  assert.equal(actionButtonByName.attackCreature.disabled, false);
  assert.match(actionButtonByName.attackCreature.title, /直接打过去|这拍更像先处理/);
  assert.match(actionButtonByName.attackCreature.dataset.actionDetail || "", /目标退场|下回合缓一拍|不死也躺/);
  assert.match(actionButtonByName.attackCreature.dataset.actionDetail || "", /掉/);
  assert.match(known.get("#selectionHint").innerHTML, /想打就直接点目标/);
  assert.match(known.get("#selectionHint").innerHTML, /冲 AI|攻击 AI/);
  assert.match(known.get("#selectionHint").innerHTML, /顺手掉|掉/);
  assert.match(known.get("#pressureMeta").textContent, /直接打出去|只够得到|最顺手的目标/);
  assert.match(known.get("#pressureMeta").textContent, /顺手掉|掉/);
  assert.equal(debug.useAttackCreatureShortcut(), true);
  assert.equal(game.players[1].board.land[0]?.state, "rest");
}

{
  const game = setupGame({ p1Food: 0 });
  game.players[0].hand = [];
  game.players[0].deck = [];
  game.players[0].turnDisaster = null;
  debug.clearSelected();
  debug.render();

  assert.equal(debug.buildPlaybookSuggestions()[0]?.kind, "end_turn");
  assert.match(known.get("#endTurnBtn").textContent, /收一手给 AI|结束回合/);
  assert.match(known.get("#endTurnBtn").dataset.actionDetail || "", /这轮先收手|留 \d+ 食物下轮/);
  assert.equal(known.get("#endTurnBtn").dataset.routeTag, "点这里");
  assert.equal(game.active, 0);
  debug.handleEndTurnClick();
  assert.equal(game.active, 1);
}

{
  const game = setupGame({ p1Food: 10 });
  place(game, 0, "land", 0, "狼");
  place(game, 0, "land", 1, "中华田园犬");
  place(game, 1, "land", 0, "苏格兰折耳猫");
  debug.clearSelected();
  debug.render();

  assert.match(known.get("#endTurnBtn").textContent, /先别/);
  assert.match(known.get("#endTurnBtn").dataset.actionDetail || "", /动物还能攻击|主动技能可用|手牌能上场/);
  assert.equal(game.active, 0);
  debug.handleEndTurnClick();
  assert.equal(game.active, 0);
  assert.match(known.get("#endTurnBtn").textContent, /再点/);
}

{
  const game = setupGame({ p1Food: 3, p2Food: 2 });
  place(game, 1, "land", 0, "虎");
  debug.clearSelected();
  debug.render();

  assert.match(
    known.get("#turnHintChips").innerHTML,
    /class="is-warning"[^>]*>对手冲脸&lt;=\d+/,
    "turn hint should preview opponent face-threat ceiling",
  );

  game.players[0].hp = 3;
  debug.render();
  assert.match(
    known.get("#turnHintChips").innerHTML,
    /class="is-danger"[^>]*>斩杀风险/,
    "turn hint should mark lethal opponent face-threat",
  );
}

console.log("smoke test passed");
