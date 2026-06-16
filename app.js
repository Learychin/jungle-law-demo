const LANES = [
  { key: "sky", label: "天空" },
  { key: "land", label: "陆地" },
  { key: "water", label: "水生" },
];

const SPACE_LABELS = {
  天空: "sky",
  陆地: "land",
  水生: "water",
  两栖: "amphibious",
};

const STATE_LABELS = {
  ready: "战斗",
  spent: "备战",
  rest: "休息",
};

let allCards = [];
let allDisasters = [];
let game = null;
let selected = null;
let vsAI = true;
let aiThinking = false;

const els = {
  p1Board: document.querySelector("#p1Board"),
  p2Board: document.querySelector("#p2Board"),
  hand: document.querySelector("#hand"),
  handTitle: document.querySelector("#handTitle"),
  turnLabel: document.querySelector("#turnLabel"),
  selectionHint: document.querySelector("#selectionHint"),
  publicCounts: document.querySelector("#publicCounts"),
  log: document.querySelector("#log"),
  winnerBanner: document.querySelector("#winnerBanner"),
  p1Panel: document.querySelector("#player1Panel"),
  p2Panel: document.querySelector("#player2Panel"),
  p1Status: document.querySelector("#p1Status"),
  p2Status: document.querySelector("#p2Status"),
  p1Deck: document.querySelector("#p1Deck"),
  p2Deck: document.querySelector("#p2Deck"),
  p1Hand: document.querySelector("#p1Hand"),
  p2Hand: document.querySelector("#p2Hand"),
  p1Grave: document.querySelector("#p1Grave"),
  p2Grave: document.querySelector("#p2Grave"),
  modeBtn: document.querySelector("#modeBtn"),
  player2Label: document.querySelector("#player2Label"),
};

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function shuffle(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function makeInstance(card) {
  return {
    ...card,
    uid: uid(),
    state: "ready",
    justSummoned: false,
    lane: null,
    owner: null,
  };
}

function makePlayer(id, name, initialFood) {
  const privatePool = shuffle(allCards).slice(0, 28).map(makeInstance);
  return {
    id,
    name,
    hp: 20,
    food: initialFood,
    deck: privatePool,
    hand: [],
    grave: [],
    board: {
      sky: [null, null, null],
      land: [null, null, null],
      water: [null, null, null],
    },
  };
}

function createGame() {
  game = {
    players: [makePlayer(0, "玩家一", 3), makePlayer(1, vsAI ? "AI 对手" : "玩家二", 4)],
    active: 0,
    turn: 1,
    winner: null,
    publicPiles: {
      A: shuffle(allCards.filter((c) => c.level === "A")).map(makeInstance),
      B: shuffle(allCards.filter((c) => c.level === "B")).map(makeInstance),
      C: shuffle(allCards.filter((c) => c.level === "C")).map(makeInstance),
    },
    log: [],
  };

  game.players.forEach((player) => {
    for (let i = 0; i < 5; i += 1) drawFromDeck(player, false);
  });

  selected = null;
  aiThinking = false;
  addLog(`新的一局开始。玩家一先手，初始 3 食物；${game.players[1].name} 初始 4 食物。`);
  render();
}

function activePlayer() {
  return game.players[game.active];
}

function opponentPlayer() {
  return game.players[game.active === 0 ? 1 : 0];
}

function addLog(message) {
  if (!game) return;
  game.log.unshift(message);
  game.log = game.log.slice(0, 80);
}

function drawFromDeck(player, paid = true) {
  if (paid && !spendFood(player, 1)) return false;
  const card = player.deck.shift();
  if (!card) {
    addLog(`${player.name} 的私有卡组已空。`);
    return false;
  }
  card.owner = player.id;
  player.hand.push(card);
  addLog(`${player.name} 从私有卡组抽到 ${card.name}。`);
  enforceHandLimit(player);
  return true;
}

function drawFromPublic(level) {
  const player = activePlayer();
  const cost = level === "A" ? 3 : 2;
  if (!spendFood(player, cost)) return;
  const pile = game.publicPiles[level];
  const card = pile.shift();
  if (!card) {
    player.food += cost;
    addLog(`${level} 类公共牌堆已经抽空。`);
    return;
  }
  card.owner = player.id;
  player.hand.push(card);
  addLog(`${player.name} 花费 ${cost} 食物，从公共 ${level} 类抽到 ${card.name}。`);
  enforceHandLimit(player);
  render();
}

function enforceHandLimit(player) {
  while (player.hand.length > 6) {
    const discarded = player.hand.pop();
    player.grave.push(discarded);
    addLog(`${player.name} 手牌超过上限，弃掉 ${discarded.name}。`);
  }
}

function spendFood(player, amount) {
  if (amount < 0) return false;
  if (player.food < amount) {
    addLog(`${player.name} 食物不足，需要 ${amount}，当前只有 ${player.food}。`);
    render();
    return false;
  }
  player.food -= amount;
  return true;
}

function summonCost(card) {
  return Math.max(1, Math.min(Number(card.atk) || 0, Number(card.def) || 0));
}

function cardValue(card) {
  if (!card) return 0;
  const levelBonus = card.level === "A" ? 3 : card.level === "B" ? 1.2 : 0;
  const skillBonus = card.skill ? 1.6 : 0;
  const waterBonus = card.space === "水生" || card.space === "两栖" ? 0.6 : 0;
  return (Number(card.atk) || 0) * 1.35 + (Number(card.def) || 0) + levelBonus + skillBonus + waterBonus;
}

function boardCards(player) {
  const cards = [];
  for (const lane of LANES) {
    player.board[lane.key].forEach((card, slotIndex) => {
      if (card) cards.push({ player, lane: lane.key, slotIndex, card });
    });
  }
  return cards;
}

function emptySlotsFor(player, card) {
  const slots = [];
  for (const lane of LANES) {
    if (!canPlace(card, lane.key)) continue;
    player.board[lane.key].forEach((existing, slotIndex) => {
      if (!existing) slots.push({ lane: lane.key, slotIndex });
    });
  }
  return slots;
}

function canPlace(card, lane) {
  if (card.space === "天空") return lane === "sky" || lane === "land";
  if (card.space === "陆地") return lane === "land";
  if (card.space === "水生") return lane === "water";
  if (card.space === "两栖") return lane === "land" || lane === "water";
  return false;
}

function canReach(attacker, targetLane) {
  if (attacker.space === "天空") return targetLane === "sky" || targetLane === "land";
  if (attacker.space === "陆地") return targetLane === "land";
  if (attacker.space === "水生") return targetLane === "water";
  if (attacker.space === "两栖") return attacker.lane === targetLane;
  return false;
}

function findCardLocation(cardUid) {
  for (const player of game.players) {
    const handIndex = player.hand.findIndex((card) => card.uid === cardUid);
    if (handIndex >= 0) return { type: "hand", player, handIndex, card: player.hand[handIndex] };
    for (const lane of LANES) {
      const slotIndex = player.board[lane.key].findIndex((card) => card?.uid === cardUid);
      if (slotIndex >= 0) {
        return {
          type: "board",
          player,
          lane: lane.key,
          slotIndex,
          card: player.board[lane.key][slotIndex],
        };
      }
    }
  }
  return null;
}

function summonSelected(lane, slotIndex) {
  const player = activePlayer();
  if (!selected || selected.type !== "hand" || selected.playerId !== player.id) {
    addLog("请先选择当前玩家的一张手牌。");
    render();
    return;
  }
  const loc = findCardLocation(selected.uid);
  if (!loc || loc.type !== "hand") return;
  const card = loc.card;
  if (!canPlace(card, lane)) {
    addLog(`${card.name} 是${card.space}生物，不能放到${laneLabel(lane)}空间。`);
    render();
    return;
  }
  if (player.board[lane][slotIndex]) {
    addLog(`${laneLabel(lane)}空间 ${slotIndex + 1} 已有生物。`);
    render();
    return;
  }
  const cost = summonCost(card);
  if (!spendFood(player, cost)) return;
  player.hand.splice(loc.handIndex, 1);
  card.state = "ready";
  card.justSummoned = true;
  card.lane = lane;
  card.owner = player.id;
  player.board[lane][slotIndex] = card;
  selected = { type: "board", uid: card.uid, playerId: player.id, lane, slotIndex };
  addLog(`${player.name} 花费 ${cost} 食物，将 ${card.name} 放到${laneLabel(lane)}空间。`);
  render();
}

function recoverSelected() {
  const player = activePlayer();
  const loc = selectedBoardCard(player);
  if (!loc) return;
  if (loc.card.state !== "rest") {
    addLog(`${loc.card.name} 不在休息状态。`);
    render();
    return;
  }
  if (!spendFood(player, 1)) return;
  loc.card.state = "ready";
  addLog(`${player.name} 花费 1 食物，使 ${loc.card.name} 恢复为战斗状态。`);
  render();
}

function sacrificeSelected() {
  const player = activePlayer();
  const loc = selectedBoardCard(player);
  if (!loc) return;
  const card = loc.card;
  player.board[loc.lane][loc.slotIndex] = null;
  player.grave.push(card);
  player.food += 1;
  selected = null;
  addLog(`${player.name} 将 ${card.name} 当作食物消耗，获得 1 食物。`);
  render();
}

function attackPlayer() {
  const attackerOwner = activePlayer();
  const defender = opponentPlayer();
  const loc = selectedBoardCard(attackerOwner);
  if (!loc) return;
  const attacker = loc.card;
  if (!canAttack(attackerOwner, attacker)) return;
  if (!spendFood(attackerOwner, Number(attacker.atk) || 0)) return;
  defender.hp -= Number(attacker.atk) || 0;
  attacker.state = "spent";
  attacker.justSummoned = false;
  addLog(`${attackerOwner.name} 的 ${attacker.name} 攻击玩家，${defender.name} 生命 -${attacker.atk}。`);
  checkWinner();
  render();
}

function attackCreature(targetLoc) {
  const attackerOwner = activePlayer();
  const defenderOwner = opponentPlayer();
  const sourceLoc = selectedBoardCard(attackerOwner);
  if (!sourceLoc) return;
  if (!targetLoc || targetLoc.player.id !== defenderOwner.id || targetLoc.type !== "board") {
    addLog("请点击对方场上的目标生物。");
    render();
    return;
  }
  const attacker = sourceLoc.card;
  const defender = targetLoc.card;
  if (!canAttack(attackerOwner, attacker)) return;
  if (!canReach(attacker, targetLoc.lane)) {
    addLog(`${attacker.name} 不能攻击${laneLabel(targetLoc.lane)}空间的 ${defender.name}。`);
    render();
    return;
  }
  const attackValue = Number(attacker.atk) || 0;
  const defenseValue = defender.state === "rest" ? 0 : Number(defender.def) || 0;
  if (attackValue * 2 <= defenseValue && !attacker.skill) {
    addLog(`${attacker.name} 攻击力不足，无法攻击 ${defender.name}。`);
    render();
    return;
  }
  if (!spendFood(attackerOwner, attackValue)) return;

  let result = "";
  if (attackValue > defenseValue) {
    defenderOwner.board[targetLoc.lane][targetLoc.slotIndex] = null;
    defenderOwner.grave.push(defender);
    result = `${defender.name} 阵亡。`;
  } else if (attackValue * 2 > defenseValue) {
    defender.state = "rest";
    result = `${defender.name} 受伤，进入休息状态。`;
  } else {
    result = `${attacker.name} 的特技允许攻击，普通伤害未造成影响。`;
  }

  attacker.state = "spent";
  attacker.justSummoned = false;
  addLog(`${attackerOwner.name} 的 ${attacker.name} 攻击 ${defender.name}。${result}`);
  render();
}

function canAttack(player, card) {
  if (card.state !== "ready") {
    addLog(`${card.name} 当前是${STATE_LABELS[card.state]}状态，不能攻击。`);
    render();
    return false;
  }
  if (card.justSummoned) {
    addLog(`${card.name} 本回合刚上场，不能攻击。`);
    render();
    return false;
  }
  if ((Number(card.atk) || 0) <= 0) {
    addLog(`${card.name} 攻击力为 0，不能宣告攻击。`);
    render();
    return false;
  }
  if (player.food < (Number(card.atk) || 0)) {
    addLog(`${player.name} 食物不足，${card.name} 攻击需要 ${card.atk} 食物。`);
    render();
    return false;
  }
  return true;
}

function selectedBoardCard(player) {
  if (!selected || selected.type !== "board" || selected.playerId !== player.id) {
    addLog("请先选择当前玩家场上的一只生物。");
    render();
    return null;
  }
  const loc = findCardLocation(selected.uid);
  if (!loc || loc.type !== "board" || loc.player.id !== player.id) {
    selected = null;
    render();
    return null;
  }
  return loc;
}

function checkWinner() {
  const dead = game.players.find((player) => player.hp <= 0);
  if (dead) {
    const winner = game.players.find((player) => player.id !== dead.id);
    game.winner = winner.id;
    addLog(`${winner.name} 获胜。`);
  }
}

function resolveDirectCreatureAttack(sourceLoc, targetLoc) {
  const attackerOwner = sourceLoc.player;
  const defenderOwner = targetLoc.player;
  const attacker = sourceLoc.card;
  const defender = targetLoc.card;
  if (!canReach(attacker, targetLoc.lane)) return false;
  const attackValue = Number(attacker.atk) || 0;
  const defenseValue = defender.state === "rest" ? 0 : Number(defender.def) || 0;
  if (attackValue <= 0 || attackerOwner.food < attackValue) return false;
  if (attackValue * 2 <= defenseValue && !attacker.skill) return false;
  attackerOwner.food -= attackValue;
  if (attackValue > defenseValue) {
    defenderOwner.board[targetLoc.lane][targetLoc.slotIndex] = null;
    defenderOwner.grave.push(defender);
    addLog(`${attackerOwner.name} 的 ${attacker.name} 攻击 ${defender.name}，${defender.name} 阵亡。`);
  } else if (attackValue * 2 > defenseValue) {
    defender.state = "rest";
    addLog(`${attackerOwner.name} 的 ${attacker.name} 攻击 ${defender.name}，${defender.name} 受伤并进入休息。`);
  } else {
    addLog(`${attackerOwner.name} 的 ${attacker.name} 依靠特技攻击 ${defender.name}，普通伤害未造成影响。`);
  }
  attacker.state = "spent";
  attacker.justSummoned = false;
  return true;
}

function resolveDirectPlayerAttack(sourceLoc) {
  const attackerOwner = sourceLoc.player;
  const defender = game.players[attackerOwner.id === 0 ? 1 : 0];
  const attacker = sourceLoc.card;
  const attackValue = Number(attacker.atk) || 0;
  if (attackValue <= 0 || attackerOwner.food < attackValue) return false;
  attackerOwner.food -= attackValue;
  defender.hp -= attackValue;
  attacker.state = "spent";
  attacker.justSummoned = false;
  addLog(`${attackerOwner.name} 的 ${attacker.name} 攻击玩家，${defender.name} 生命 -${attackValue}。`);
  checkWinner();
  return true;
}

function aiRecover(player) {
  const restCards = boardCards(player)
    .filter((loc) => loc.card.state === "rest")
    .sort((a, b) => cardValue(b.card) - cardValue(a.card));
  if (!restCards.length || player.food < 1) return false;
  const loc = restCards[0];
  player.food -= 1;
  loc.card.state = "ready";
  addLog(`${player.name} 花费 1 食物，使 ${loc.card.name} 恢复为战斗状态。`);
  return true;
}

function aiLegalAttackSources(player) {
  return boardCards(player).filter((loc) => {
    const card = loc.card;
    return card.state === "ready" && !card.justSummoned && (Number(card.atk) || 0) > 0 && player.food >= (Number(card.atk) || 0);
  });
}

function aiAttack(player) {
  const enemy = game.players[player.id === 0 ? 1 : 0];
  const sources = aiLegalAttackSources(player);
  if (!sources.length) return false;

  const lethal = sources
    .filter((loc) => (Number(loc.card.atk) || 0) >= enemy.hp)
    .sort((a, b) => (Number(a.card.atk) || 0) - (Number(b.card.atk) || 0))[0];
  if (lethal && resolveDirectPlayerAttack(lethal)) return true;

  const targetOptions = [];
  for (const source of sources) {
    for (const target of boardCards(enemy)) {
      if (!canReach(source.card, target.lane)) continue;
      const attackValue = Number(source.card.atk) || 0;
      const defenseValue = target.card.state === "rest" ? 0 : Number(target.card.def) || 0;
      if (attackValue * 2 <= defenseValue && !source.card.skill) continue;
      const killBonus = attackValue > defenseValue ? 8 : 3;
      const score = killBonus + cardValue(target.card) - attackValue * 0.35 + Math.random() * 0.3;
      targetOptions.push({ score, source, target });
    }
  }
  targetOptions.sort((a, b) => b.score - a.score);
  if (targetOptions[0] && targetOptions[0].score > 6 && resolveDirectCreatureAttack(targetOptions[0].source, targetOptions[0].target)) {
    return true;
  }

  const bestFace = sources.sort((a, b) => (Number(b.card.atk) || 0) - (Number(a.card.atk) || 0))[0];
  if (bestFace && (enemy.hp <= 10 || boardCards(enemy).length <= 2)) {
    return resolveDirectPlayerAttack(bestFace);
  }
  return false;
}

function aiSummon(player) {
  const candidates = [];
  player.hand.forEach((card, handIndex) => {
    const cost = summonCost(card);
    if (player.food < cost) return;
    const slots = emptySlotsFor(player, card);
    if (!slots.length) return;
    const score = cardValue(card) - cost * 0.45 + (card.space === "水生" ? 1.1 : 0) + Math.random() * 0.25;
    candidates.push({ score, handIndex, card, slots, cost });
  });
  candidates.sort((a, b) => b.score - a.score);
  const pick = candidates[0];
  if (!pick) return false;
  if (pick.score < 2.2 && player.food < 3) return false;
  const slot = pick.slots.sort((a, b) => {
    const aw = a.lane === "water" ? 1 : 0;
    const bw = b.lane === "water" ? 1 : 0;
    return bw - aw;
  })[0];
  player.food -= pick.cost;
  player.hand.splice(pick.handIndex, 1);
  pick.card.state = "ready";
  pick.card.justSummoned = true;
  pick.card.lane = slot.lane;
  pick.card.owner = player.id;
  player.board[slot.lane][slot.slotIndex] = pick.card;
  addLog(`${player.name} 花费 ${pick.cost} 食物，将 ${pick.card.name} 放到${laneLabel(slot.lane)}空间。`);
  return true;
}

function aiDraw(player) {
  if (player.hand.length <= 2 && player.food >= 1 && player.deck.length) return drawFromDeck(player, true);
  if (player.food >= 3 && game.publicPiles.A.length && Math.random() < 0.34) return drawFromPublicFor(player, "A");
  if (player.food >= 2 && game.publicPiles.B.length && Math.random() < 0.22) return drawFromPublicFor(player, "B");
  if (player.food >= 2 && game.publicPiles.C.length && Math.random() < 0.18) return drawFromPublicFor(player, "C");
  if (player.food >= 1 && player.deck.length && player.hand.length < 5 && Math.random() < 0.5) return drawFromDeck(player, true);
  return false;
}

function drawFromPublicFor(player, level) {
  const cost = level === "A" ? 3 : 2;
  if (player.food < cost || !game.publicPiles[level].length) return false;
  player.food -= cost;
  const card = game.publicPiles[level].shift();
  card.owner = player.id;
  player.hand.push(card);
  addLog(`${player.name} 花费 ${cost} 食物，从公共 ${level} 类抽到 ${card.name}。`);
  enforceHandLimit(player);
  return true;
}

function aiSacrifice(player) {
  if (player.food > 1) return false;
  const candidates = boardCards(player)
    .filter((loc) => loc.card.atk === 0 || cardValue(loc.card) < 2.4)
    .sort((a, b) => cardValue(a.card) - cardValue(b.card));
  if (!candidates.length) return false;
  const loc = candidates[0];
  player.board[loc.lane][loc.slotIndex] = null;
  player.grave.push(loc.card);
  player.food += 1;
  addLog(`${player.name} 将 ${loc.card.name} 当作食物消耗，获得 1 食物。`);
  return true;
}

function runAITurn() {
  if (!vsAI || !game || game.winner !== null || game.active !== 1 || aiThinking) return;
  aiThinking = true;
  addLog("AI 开始思考。");
  let actions = 0;
  const player = activePlayer();
  const interval = window.setInterval(() => {
    if (!game || game.winner !== null || game.active !== 1) {
      window.clearInterval(interval);
      aiThinking = false;
      render();
      return;
    }
    let acted = false;
    if (actions < 10) {
      acted = aiAttack(player) || aiRecover(player) || aiSummon(player) || aiDraw(player) || aiSacrifice(player);
    }
    actions += 1;
    render();
    if (!acted || actions >= 10 || game.winner !== null) {
      window.clearInterval(interval);
      aiThinking = false;
      if (game.winner === null && game.active === 1) {
        addLog("AI 结束回合。");
        endTurn();
      } else {
        render();
      }
    }
  }, 420);
}

function endTurn() {
  if (game.winner !== null) return;
  const outgoing = activePlayer();
  for (const lane of LANES) {
    outgoing.board[lane.key].forEach((card) => {
      if (!card) return;
      if (card.state === "spent") card.state = "ready";
      card.justSummoned = false;
    });
  }

  game.active = game.active === 0 ? 1 : 0;
  if (game.active === 0) game.turn += 1;

  const incoming = activePlayer();
  const waterBonus = incoming.board.water.filter(Boolean).length;
  const gain = 3 + Math.min(3, waterBonus);
  incoming.food += gain;
  selected = null;
  addLog(`${outgoing.name} 回合结束。${incoming.name} 获得 ${gain} 食物。`);
  render();
  runAITurn();
}

function laneLabel(lane) {
  return LANES.find((item) => item.key === lane)?.label || lane;
}

function cardMarkup(card, compact = false) {
  if (!card) return "";
  return `
    <div class="name">${card.name}</div>
    <div class="meta">${card.level} 类 · ${card.space}</div>
    <div class="stats">
      <span class="stat atk">攻 ${card.atk}</span>
      <span class="stat def">防 ${card.def}</span>
    </div>
    ${compact ? "" : `<span class="state">${STATE_LABELS[card.state] || "手牌"}</span>`}
    ${card.skill ? `<div class="skill">特技：${card.skill}</div>` : ""}
  `;
}

function renderBoard(container, player) {
  container.innerHTML = "";
  const rowOrder = player.id === 1 ? [...LANES].reverse() : LANES;
  rowOrder.forEach((lane) => {
    const row = document.createElement("div");
    row.className = `row ${lane.key}`;
    const rowName = document.createElement("div");
    rowName.className = "row-name";
    rowName.textContent = lane.label;
    row.appendChild(rowName);

    player.board[lane.key].forEach((card, index) => {
      const button = document.createElement("button");
      button.className = "slot";
      button.type = "button";
      if (selected?.type === "board" && selected.uid === card?.uid) button.classList.add("selected");
      button.innerHTML = `<span class="slot-label">${index + 1}</span><span class="slot-card">${cardMarkup(card)}</span>`;
      button.addEventListener("click", () => handleSlotClick(player, lane.key, index));
      row.appendChild(button);
    });
    container.appendChild(row);
  });
}

function renderHand() {
  const player = activePlayer();
  els.handTitle.textContent = vsAI ? "你的手牌" : `${player.name}手牌`;
  els.hand.innerHTML = "";
  if (vsAI && player.id === 1) {
    const note = document.createElement("div");
    note.className = "ai-hand-note";
    note.textContent = "AI 回合中，手牌已隐藏。请看战斗日志观察 AI 的行动。";
    els.hand.appendChild(note);
    return;
  }
  player.hand.forEach((card) => {
    const button = document.createElement("button");
    button.className = "card";
    if (selected?.type === "hand" && selected.uid === card.uid) button.classList.add("selected");
    button.innerHTML = `${cardMarkup(card, true)}<span class="state">上场费 ${summonCost(card)}</span>`;
    button.addEventListener("click", () => {
      selected = { type: "hand", uid: card.uid, playerId: player.id };
      render();
    });
    els.hand.appendChild(button);
  });
}

function handleSlotClick(player, lane, slotIndex) {
  if (vsAI && game.active === 1) return;
  const card = player.board[lane][slotIndex];
  if (selected?.type === "hand" && player.id === activePlayer().id && !card) {
    summonSelected(lane, slotIndex);
    return;
  }
  if (selected?.type === "board" && player.id !== activePlayer().id && card) {
    attackCreature({ type: "board", player, lane, slotIndex, card });
    return;
  }
  if (card) {
    selected = { type: "board", uid: card.uid, playerId: player.id, lane, slotIndex };
  } else {
    selected = null;
  }
  render();
}

function renderPanels() {
  const [p1, p2] = game.players;
  els.p1Panel.classList.toggle("active", game.active === 0);
  els.p2Panel.classList.toggle("active", game.active === 1);
  els.p1Status.textContent = `生命 ${p1.hp} · 食物 ${p1.food}`;
  els.p2Status.textContent = `生命 ${p2.hp} · 食物 ${p2.food}`;
  els.p1Deck.textContent = `私有 ${p1.deck.length}`;
  els.p2Deck.textContent = `私有 ${p2.deck.length}`;
  els.p1Hand.textContent = `手牌 ${p1.hand.length}`;
  els.p2Hand.textContent = `手牌 ${p2.hand.length}`;
  els.p1Grave.textContent = `阵亡 ${p1.grave.length}`;
  els.p2Grave.textContent = `阵亡 ${p2.grave.length}`;
  els.turnLabel.textContent = `第 ${game.turn} 回合 · ${activePlayer().name}`;
  els.publicCounts.textContent = `A ${game.publicPiles.A.length} · B ${game.publicPiles.B.length} · C ${game.publicPiles.C.length}`;
  els.player2Label.textContent = vsAI ? "AI 对手" : "玩家二";
  els.modeBtn.textContent = vsAI ? "模式：对战 AI" : "模式：双人热座";
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.disabled = game.winner !== null || aiThinking || (vsAI && game.active === 1);
  });
  document.querySelector("#endTurnBtn").disabled = game.winner !== null || aiThinking || (vsAI && game.active === 1);
}

function renderHint() {
  if (!selected) {
    if (vsAI && game.active === 1) {
      els.selectionHint.textContent = aiThinking ? "AI 正在行动，请稍等。" : "当前是 AI 回合。";
      return;
    }
    els.selectionHint.textContent = "你的回合：先抽牌补手牌，或点一张手牌再点你的空格上场；已有生物时，点场上生物后可攻击 AI / 攻击生物 / 恢复 / 当食物。最后点结束回合。";
    return;
  }
  const loc = findCardLocation(selected.uid);
  if (!loc) {
    selected = null;
    els.selectionHint.textContent = "选择已失效，请重新选择。";
    return;
  }
  if (loc.type === "hand") {
    els.selectionHint.textContent = `已选择手牌《${loc.card.name}》。下一步：点击你场地里的空格上场。可放置：${placementText(loc.card)}；上场费 ${summonCost(loc.card)} 食物。`;
  } else {
    if (loc.player.id === activePlayer().id) {
      els.selectionHint.textContent = `已选择你的《${loc.card.name}》（${laneLabel(loc.lane)}，${STATE_LABELS[loc.card.state]}）。下一步：点“攻击 AI”、点 AI 生物攻击，或选择恢复/当食物。`;
    } else {
      els.selectionHint.textContent = `已查看 ${loc.player.name} 的《${loc.card.name}》。要攻击它：先选择你的场上生物，再点击这张牌。`;
    }
  }
}

function placementText(card) {
  if (card.space === "天空") return "天空或陆地";
  if (card.space === "陆地") return "陆地";
  if (card.space === "水生") return "水生";
  if (card.space === "两栖") return "陆地或水生";
  return card.space;
}

function renderLog() {
  els.log.innerHTML = "";
  game.log.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    els.log.appendChild(li);
  });
}

function renderWinner() {
  if (game.winner === null) {
    els.winnerBanner.classList.add("hidden");
    return;
  }
  const winner = game.players[game.winner];
  els.winnerBanner.textContent = `${winner.name} 获胜。点击“新开一局”重新开始。`;
  els.winnerBanner.classList.remove("hidden");
}

function render() {
  if (!game) return;
  renderPanels();
  renderBoard(els.p2Board, game.players[1]);
  renderBoard(els.p1Board, game.players[0]);
  renderHand();
  renderHint();
  renderLog();
  renderWinner();
}

function bindActions() {
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      if (game.winner !== null) return;
      if (aiThinking || (vsAI && game.active === 1)) return;
      const action = button.dataset.action;
      if (action === "drawPrivate") {
        drawFromDeck(activePlayer(), true);
        render();
      }
      if (action === "drawA") drawFromPublic("A");
      if (action === "drawB") drawFromPublic("B");
      if (action === "drawC") drawFromPublic("C");
      if (action === "summon") addLog("选择手牌后，直接点击空场地即可上场。");
      if (action === "recover") recoverSelected();
      if (action === "sacrifice") sacrificeSelected();
      if (action === "attackPlayer") attackPlayer();
      if (action === "attackCreature") {
        addLog("攻击生物：先点你场上的攻击生物，再点右侧 AI 场上的目标生物。");
        render();
      }
    });
  });
  document.querySelector("#endTurnBtn").addEventListener("click", endTurn);
  document.querySelector("#newGameBtn").addEventListener("click", createGame);
  document.querySelector("#modeBtn").addEventListener("click", () => {
    if (aiThinking) return;
    vsAI = !vsAI;
    createGame();
  });
  document.querySelector("#clearLogBtn").addEventListener("click", () => {
    game.log = [];
    renderLog();
  });
}

async function init() {
  const data = window.JUNGLE_GAME_DATA;
  if (!data) throw new Error("缺少游戏数据 data.js");
  allCards = data.cards;
  allDisasters = data.disasters || [];
  bindActions();
  createGame();
}

init().catch((error) => {
  document.body.innerHTML = `<pre>Demo 加载失败：${error.message}</pre>`;
});
