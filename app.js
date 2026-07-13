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

const STORAGE_KEY = "jungle-law-match-archive-v2";
const MAX_ARCHIVE_MATCHES = 24;
const BALANCE_PATCH_NOTES = [
  "开局资源改成先手 5、后手 2。",
  "环境牌改为暗抽，固定 2 食物并自动发动。",
  "鹰眼改成 2 食物。",
  "每回合最多复工 1 只动物。",
  "可选动作和 AI 不再死盯便宜功能牌。",
  "打玩家时，如果对手场上有生物，要多花 1 食物。",
  "每回合最多护场 1 次，玩家不能无限替动物承受打击。",
  "攻击玩家费用为攻击力 -1（最低 1），有防守场面时再 +1。",
  "每回合最多发动 1 次主动技能。",
  "同一动物第 4 次被普通压制会退场。",
];
const OPENING_CUES = {
  waterline: {
    id: "waterline",
    label: "水线开局",
    shortLabel: "抢水位",
    routeLabel: "先下水线",
  },
  highground: {
    id: "highground",
    label: "高位开场",
    shortLabel: "占高位",
    routeLabel: "先占高位",
  },
  landrush: {
    id: "landrush",
    label: "陆地压场",
    shortLabel: "站陆地",
    routeLabel: "先站陆地",
  },
  pocket: {
    id: "pocket",
    label: "先翻口袋",
    shortLabel: "翻口袋",
    routeLabel: "先补家底",
  },
};
const FEATURED_CARD_ROLES = {
  鹰: {
    label: "高空情报员",
    tone: "trick",
    blurb: "先偷情报再下嘴，通常是拿来开路的。",
    summonNote: "《鹰》更像高空情报员，先站高位会把偷情报和压制都带出来。",
  },
  猴子: {
    label: "后勤猴",
    tone: "support",
    blurb: "往地面一放，整局都会像在给后面攒口粮。",
    summonNote: "《猴子》是后勤猴，先落地通常不是为了打人，是为了把后手养起来。",
  },
  刺猬: {
    label: "地钉",
    tone: "anchor",
    blurb: "先把第一波卡住，别指望它一个人演到大结局。",
    summonNote: "《刺猬》像颗地钉，先站住能帮你把第一波节奏撑下来。",
  },
  潜海依霖: {
    label: "水线教练",
    tone: "support",
    blurb: "它一蹲水位，后面的水线通常都会舒服很多。",
    summonNote: "《潜海依霖》是水线教练，先把它丢进水里，后排整条线都会更像样。",
  },
  企鹅兔: {
    label: "滑水墙",
    tone: "anchor",
    blurb: "能卡线也能滑位，是很会拖住场面的两栖位。",
    summonNote: "《企鹅兔》更像滑水墙，先把线卡住，再决定下一口往哪边滑。",
  },
  巴西红耳龟: {
    label: "混线壳",
    tone: "anchor",
    blurb: "哪里有坑就先去占，主打一个便宜补位。",
    summonNote: "《巴西红耳龟》像个混线壳，先补空位比指望它输出靠谱得多。",
  },
  海豚: {
    label: "水线打手",
    tone: "attack",
    blurb: "先占水位，后面靠它把节奏推起来。",
    summonNote: "《海豚》是水线打手，早点下去会更像在抢主动权。",
  },
  非洲豹: {
    label: "终结豹",
    tone: "attack",
    blurb: "一旦落地，大家都会默认它迟早要收头。",
    summonNote: "《非洲豹》更像终结豹，先把它摆出来，本身就是一种压力。",
  },
  苏格兰折耳猫: {
    label: "试探位",
    tone: "support",
    blurb: "成本低，适合先把第一口和第一波防守试出来。",
    summonNote: "《苏格兰折耳猫》更像试探位，先顶上去看看对面准备怎么回。",
  },
  乌龟: {
    label: "壳位",
    tone: "anchor",
    blurb: "更像撑线拖回合，不太像拿来抢头的。",
    summonNote: "《乌龟》像个壳位，先站好更多是在替后面的选手争时间。",
  },
  骆驼: {
    label: "耐揍前排",
    tone: "anchor",
    blurb: "不华丽，但很会替后面的人争一口气。",
    summonNote: "《骆驼》更像耐揍前排，先顶上来能把地面节奏稳住。",
  },
  企鹅: {
    label: "滑步前哨",
    tone: "trick",
    blurb: "两栖跳点，适合先去把线位踩出来。",
    summonNote: "《企鹅》像滑步前哨，早点下去更容易把换线路线铺开。",
  },
  长颈鹿: {
    label: "高架前排",
    tone: "anchor",
    blurb: "站住就不难看，但重点是替别人把场子垫起来。",
    summonNote: "《长颈鹿》更像高架前排，先放上去会把地面局面垫得更稳。",
  },
};
const HYPE_THRESHOLDS = [4, 7];
const TURN_QUESTS = [
  { id: "sky_strike", title: "空袭秀", note: "让天空生物发动一次攻击", rewardType: "food", rewardAmount: 1, rewardLabel: "+1 食物" },
  { id: "party_disaster", title: "节目效果拉满", note: "抽并发动 1 张环境牌", rewardType: "draw_private", rewardAmount: 1, rewardLabel: "抽 1 张私有牌" },
  { id: "move_and_hit", title: "换线偷袭", note: "先移动，再让同一只生物发动攻击", rewardType: "food", rewardAmount: 1, rewardLabel: "+1 食物" },
  { id: "big_game_hunter", title: "狩猎大货", note: "击倒 1 只 A 类生物", rewardType: "heal", rewardAmount: 1, rewardLabel: "回 1 血" },
  { id: "skill_show", title: "整点绝活", note: "发动 1 次主动技能", rewardType: "draw_private", rewardAmount: 1, rewardLabel: "抽 1 张私有牌" },
  { id: "waterline_pressure", title: "水线埋伏", note: "让水生线的生物发动一次攻击", rewardType: "food", rewardAmount: 1, rewardLabel: "+1 食物" },
  { id: "wolf_hunt", title: "狼群围猎", note: "让狼种完成一次击杀", rewardType: "heal", rewardAmount: 1, rewardLabel: "回 1 血" },
];
const AI_PERSONAS = [
  {
    id: "steady",
    label: "稳健派",
    blurb: "先站场，再收头。",
    attackBias: 0.15,
    faceBias: 0,
    disasterBias: 0.05,
    skillBias: 0.05,
    moveBias: 0.05,
    blockBias: 0.15,
    drawBias: 0.15,
    summonBias: 0.25,
    sacrificeBias: -0.2,
    chaos: 0.12,
  },
  {
    id: "bruiser",
    label: "莽夫流",
    blurb: "能打脸就绝不多想。",
    attackBias: 0.7,
    faceBias: 0.8,
    disasterBias: -0.1,
    skillBias: -0.1,
    moveBias: 0.1,
    blockBias: -0.2,
    drawBias: -0.1,
    summonBias: 0.1,
    sacrificeBias: 0.15,
    chaos: 0.24,
  },
  {
    id: "schemer",
    label: "老六流",
    blurb: "最爱换线阴人和节目效果。",
    attackBias: 0.05,
    faceBias: -0.15,
    disasterBias: 0.75,
    skillBias: 0.7,
    moveBias: 0.75,
    blockBias: 0.35,
    drawBias: 0.1,
    summonBias: 0,
    sacrificeBias: -0.15,
    chaos: 0.18,
  },
  {
    id: "戏精流",
    label: "戏精流",
    blurb: "有节目效果就非得演满。",
    attackBias: 0.2,
    faceBias: 0.35,
    disasterBias: 1,
    skillBias: 0.45,
    moveBias: 0.3,
    blockBias: -0.05,
    drawBias: -0.05,
    summonBias: 0.05,
    sacrificeBias: 0.35,
    chaos: 0.6,
  },
];
const STAGE_TAB_KEYS = ["quest", "hype", "showtime"];
const INTEL_TAB_KEYS = ["report", "disaster", "pool"];
const ACTION_BAND_KEYS = ["resource", "tactics", "pressure", "defense"];
const PRIVATE_DECK_SIZE = 28;
const OPENING_HAND_SIZE = 5;
const MAX_HAND_SIZE = 6;
const DISASTER_DRAW_COST = 2;
const COMBAT_FLASH_MS = 980;
const PRIVATE_DECK_SPACE_TARGETS = {
  陆地: 12,
  天空: 5,
  水生: 5,
  两栖: 5,
};
const PRIVATE_DECK_FILL_SPACES = ["水生", "两栖", "天空", "陆地"];

let allCards = [];
let allDisasters = [];
let allSkills = [];
let game = null;
let selected = null;
let vsAI = true;
let aiThinking = false;
let aiPersona = "steady";
let savedArchive = [];
let pendingDefense = null;
let questResolving = false;
let hypeResolving = false;
let announcerState = null;
let autoPersonaContext = null;
let activeStageTab = "quest";
let activeIntelTab = "report";
let stageTabPinned = false;
let intelTabPinned = false;
let mobileActionBand = "";
let mobileActionBandScope = "";
let playbookPeekExpanded = false;
let playbookPeekScope = "";
let endTurnConfirmScope = "";
let damageFlashUids = new Set();
let combatFlash = null;
let combatFlashTimer = null;
let pendingDiscard = null;
const ONLINE_PROTOCOL = "jungle-law-peer-v1";
const ONLINE_DATA_CONNECTION_OPTIONS = {
  reliable: true,
};
let onlineSession = {
  role: "offline",
  localPlayerId: 0,
  peer: null,
  conn: null,
  peerId: "",
  inviteUrl: "",
  status: "offline",
  detail: "",
  rev: 0,
  applyingRemote: false,
  remoteActorId: null,
};

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
  handPeek: document.querySelector("#handPeek"),
  opponentHandFan: document.querySelector("#opponentHandFan"),
  p1Deck: document.querySelector("#p1Deck"),
  p2Deck: document.querySelector("#p2Deck"),
  p1Hand: document.querySelector("#p1Hand"),
  p2Hand: document.querySelector("#p2Hand"),
  p1Grave: document.querySelector("#p1Grave"),
  p2Grave: document.querySelector("#p2Grave"),
  p1Hype: document.querySelector("#p1Hype"),
  p2Hype: document.querySelector("#p2Hype"),
  p1Cue: document.querySelector("#p1Cue"),
  p2Cue: document.querySelector("#p2Cue"),
  player1Label: document.querySelector("#player1Label"),
  selfZoneTitle: document.querySelector("#selfZoneTitle"),
  selfZoneHint: document.querySelector("#selfZoneHint"),
  modeBtn: document.querySelector("#modeBtn"),
  aiPersonaBtn: document.querySelector("#aiPersonaBtn"),
  player2Label: document.querySelector("#player2Label"),
  opponentZoneTitle: document.querySelector("#opponentZoneTitle"),
  opponentZoneHint: document.querySelector("#opponentZoneHint"),
  turnMood: document.querySelector("#turnMood"),
  turnHint: document.querySelector("#turnHint"),
  turnHintTitle: document.querySelector("#turnHintTitle"),
  turnHintDetail: document.querySelector("#turnHintDetail"),
  turnHintChips: document.querySelector("#turnHintChips"),
  routeStrip: document.querySelector("#routeStrip"),
  saveStatus: document.querySelector("#saveStatus"),
  coachNote: document.querySelector("#coachNote"),
  coachTag: document.querySelector("#coachTag"),
  coachTitle: document.querySelector("#coachTitle"),
  coachDetail: document.querySelector("#coachDetail"),
  coachAside: document.querySelector("#coachAside"),
  actionStinger: document.querySelector("#actionStinger"),
  liveReaction: document.querySelector("#liveReaction"),
  momentumStrip: document.querySelector("#momentumStrip"),
  momentRack: document.querySelector("#momentRack"),
  starterRail: document.querySelector("#starterRail"),
  guideActions: document.querySelector("#guideActions"),
  guideCue: document.querySelector("#guideCue"),
  guideShortcut: document.querySelector("#guideShortcut"),
  guidePrimaryBtn: document.querySelector("#guidePrimaryBtn"),
  guideMeta: document.querySelector("#guideMeta"),
  guidePayoff: document.querySelector("#guidePayoff"),
  guideFocus: document.querySelector("#guideFocus"),
  mobileGuide: document.querySelector("#mobileGuide"),
  mobileGuideBadge: document.querySelector("#mobileGuideBadge"),
  mobileGuideSummary: document.querySelector("#mobileGuideSummary"),
  mobileGuidePayoff: document.querySelector("#mobileGuidePayoff"),
  mobileGuidePrimaryBtn: document.querySelector("#mobileGuidePrimaryBtn"),
  stageDeck: document.querySelector("#stageDeck"),
  stageTabPlaybook: document.querySelector("#stageTabPlaybook"),
  stageTabQuest: document.querySelector("#stageTabQuest"),
  stageTabHype: document.querySelector("#stageTabHype"),
  stageTabShowtime: document.querySelector("#stageTabShowtime"),
  stagePlaybookMeta: document.querySelector("#stagePlaybookMeta"),
  stageQuestMeta: document.querySelector("#stageQuestMeta"),
  stageHypeMeta: document.querySelector("#stageHypeMeta"),
  stageShowtimeMeta: document.querySelector("#stageShowtimeMeta"),
  stageSheetPlaybook: document.querySelector("#stageSheetPlaybook"),
  stageSheetQuest: document.querySelector("#stageSheetQuest"),
  stageSheetHype: document.querySelector("#stageSheetHype"),
  stageSheetShowtime: document.querySelector("#stageSheetShowtime"),
  recordBlurb: document.querySelector("#recordBlurb"),
  archiveShelf: document.querySelector("#archiveShelf"),
  intelTabReport: document.querySelector("#intelTabReport"),
  intelTabDisaster: document.querySelector("#intelTabDisaster"),
  intelTabPool: document.querySelector("#intelTabPool"),
  intelReportMeta: document.querySelector("#intelReportMeta"),
  intelDisasterMeta: document.querySelector("#intelDisasterMeta"),
  intelPoolMeta: document.querySelector("#intelPoolMeta"),
  publicPanel: document.querySelector("#publicPanel"),
  chaosPanel: document.querySelector("#chaosPanel"),
  logPanel: document.querySelector("#logPanel"),
  disasterMeta: document.querySelector("#disasterMeta"),
  disasterCard: document.querySelector("#disasterCard"),
  disasterTip: document.querySelector("#disasterTip"),
  questMeta: document.querySelector("#questMeta"),
  questCard: document.querySelector("#questCard"),
  questTip: document.querySelector("#questTip"),
  hypeBox: document.querySelector("#hypeBox"),
  hypeMeta: document.querySelector("#hypeMeta"),
  hypeFill: document.querySelector("#hypeFill"),
  hypeAlert: document.querySelector("#hypeAlert"),
  hypeTip: document.querySelector("#hypeTip"),
  showtimeMeta: document.querySelector("#showtimeMeta"),
  showtimeScore: document.querySelector("#showtimeScore"),
  showtimeTitle: document.querySelector("#showtimeTitle"),
  showtimeChips: document.querySelector("#showtimeChips"),
  showtimeRewardsWrap: document.querySelector("#showtimeRewardsWrap"),
  showtimeRewards: document.querySelector("#showtimeRewards"),
  showtimeReplayWrap: document.querySelector("#showtimeReplayWrap"),
  showtimeReplay: document.querySelector("#showtimeReplay"),
  showtimeTip: document.querySelector("#showtimeTip"),
  playbookMeta: document.querySelector("#playbookMeta"),
  playbookList: document.querySelector("#playbookList"),
  playbookTip: document.querySelector("#playbookTip"),
  actionResourceBand: document.querySelector("#actionResourceBand"),
  actionTacticsBand: document.querySelector("#actionTacticsBand"),
  actionPressureBand: document.querySelector("#actionPressureBand"),
  actionDefenseBand: document.querySelector("#actionDefenseBand"),
  resourceMeta: document.querySelector("#resourceMeta"),
  tacticsMeta: document.querySelector("#tacticsMeta"),
  pressureMeta: document.querySelector("#pressureMeta"),
  defenseMeta: document.querySelector("#defenseMeta"),
  resourceCue: document.querySelector("#resourceCue"),
  tacticsCue: document.querySelector("#tacticsCue"),
  pressureCue: document.querySelector("#pressureCue"),
  defenseCue: document.querySelector("#defenseCue"),
  tacticsLock: document.querySelector("#tacticsLock"),
  pressureLock: document.querySelector("#pressureLock"),
  exportCurrentBtn: document.querySelector("#exportCurrentBtn"),
  exportArchiveBtn: document.querySelector("#exportArchiveBtn"),
  onlineHostBtn: document.querySelector("#onlineHostBtn"),
  onlineCopyBtn: document.querySelector("#onlineCopyBtn"),
  onlineLeaveBtn: document.querySelector("#onlineLeaveBtn"),
};

function isOnlineMode() {
  return onlineSession.role === "host" || onlineSession.role === "guest";
}

function isOnlineHost() {
  return onlineSession.role === "host";
}

function onlineLocalPlayerId() {
  return onlineSession.localPlayerId ?? 0;
}

function onlineOpponentPlayerId(playerId = onlineLocalPlayerId()) {
  return playerId === 0 ? 1 : 0;
}

function tableViewPlayers() {
  if (!game) return { self: null, opponent: null };
  if (isOnlineMode()) {
    const localId = onlineLocalPlayerId();
    return {
      self: game.players[localId] || game.players[0],
      opponent: game.players[onlineOpponentPlayerId(localId)] || game.players[1],
    };
  }
  return {
    self: game.players[0],
    opponent: game.players[1],
  };
}

function onlineRoleLabel(player) {
  if (!player) return "玩家";
  return player.id === 0 ? "房主" : "朋友";
}

function tablePanelLabel(player, side) {
  if (!player) return "玩家";
  if (isOnlineMode()) {
    const role = onlineRoleLabel(player);
    return side === "self" ? `你 / ${role}` : role;
  }
  if (side === "self") return "你 / 玩家一";
  return vsAI ? `AI 对手 · ${currentAIPersona().label}` : "玩家二";
}

function faceAttackActionLabel() {
  if (isOnlineMode()) return "攻击对手";
  return vsAI ? "攻击 AI" : "攻击玩家";
}

function onlineInputActorId() {
  return onlineSession.remoteActorId ?? onlineLocalPlayerId();
}

function onlineCanControlCurrentDecision(actorId = onlineInputActorId()) {
  if (!isOnlineMode()) return true;
  if (!game || game.winner !== null) return false;
  if (pendingDiscard) return pendingDiscard.playerId === actorId;
  if (pendingDefense) return pendingDefense.defenderId === actorId;
  return game.active === actorId;
}

function onlineWaitingDetail(actorId = onlineLocalPlayerId()) {
  if (!isOnlineMode()) return "";
  if (!game) return "在线房间还没同步完成。";
  if (!onlineSession.conn?.open) return isOnlineHost() ? "等朋友打开邀请链接。" : "正在连接房主。";
  if (pendingDiscard) {
    return pendingDiscard.playerId === actorId ? "轮到你从满手里弃 1 张。" : `等 ${game.players[pendingDiscard.playerId]?.name || "对方"} 弃 1 张满手牌。`;
  }
  if (pendingDefense) {
    return pendingDefense.defenderId === actorId ? "轮到你处理防守。" : `等 ${game.players[pendingDefense.defenderId]?.name || "对方"} 处理防守。`;
  }
  return game.active === actorId ? "轮到你行动。" : `等 ${activePlayer()?.name || "对方"} 行动。`;
}

function onlineClone(value) {
  if (value === undefined) return null;
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return null;
  }
}

function onlineSelectedPayload() {
  if (!selected) return null;
  return {
    type: selected.type || "",
    uid: selected.uid || "",
    playerId: Number.isFinite(selected.playerId) ? selected.playerId : null,
    lane: selected.lane || "",
    slotIndex: Number.isFinite(selected.slotIndex) ? selected.slotIndex : null,
    mode: selected.mode || "",
  };
}

function onlineApplySelectedPayload(payload) {
  if (!payload?.uid && payload?.type !== "empty") {
    selected = null;
    return;
  }
  selected = {
    type: payload.type,
    uid: payload.uid,
    playerId: Number.isFinite(payload.playerId) ? payload.playerId : onlineInputActorId(),
    lane: payload.lane || undefined,
    slotIndex: Number.isFinite(payload.slotIndex) ? payload.slotIndex : undefined,
    mode: payload.mode || undefined,
  };
}

function onlineSanitizeSelected() {
  if (!selected?.uid) return;
  if (!findCardLocation(selected.uid)) selected = null;
}

function onlinePeerOptions() {
  const config = typeof window !== "undefined" ? window.JUNGLE_PEER_CONFIG : null;
  if (config && typeof config === "object") return { ...config };
  return {};
}

function onlineDataConnectionOptions() {
  // PeerJS' JSON serializer does not chunk large payloads. The full game state is
  // bigger than a single JSON data-channel message, so keep the default binary
  // serializer and let PeerJS chunk state sync packets.
  return { ...ONLINE_DATA_CONNECTION_OPTIONS };
}

function onlineInviteUrl(peerId) {
  const url = new URL(window.location.href);
  url.searchParams.set("room", peerId);
  return url.toString();
}

function onlineStatusText() {
  if (!isOnlineMode()) return "双人链接未开启";
  const role = isOnlineHost() ? "房主" : "朋友";
  if (onlineSession.status === "connected") return `${role}在线 · ${onlineWaitingDetail()}`;
  if (onlineSession.status === "opening") return "正在开房间...";
  if (onlineSession.status === "joining") return "正在加入房间...";
  if (onlineSession.status === "ready") return isOnlineHost() ? "房间已开，等朋友进来。" : "已找到房间，等同步。";
  if (onlineSession.status === "error") return onlineSession.detail || "在线连接失败。";
  return onlineSession.detail || `${role}在线`;
}

function renderOnlineControls() {
  if (!els.onlineHostBtn || !els.onlineCopyBtn || !els.onlineLeaveBtn) return;
  const online = isOnlineMode();
  els.onlineHostBtn.classList.toggle("hidden", online);
  els.onlineCopyBtn.classList.toggle("hidden", !online || !isOnlineHost());
  els.onlineLeaveBtn.classList.toggle("hidden", !online);
  els.onlineHostBtn.disabled = onlineSession.status === "opening" || onlineSession.status === "joining";
  els.onlineCopyBtn.disabled = !onlineSession.inviteUrl;
  els.onlineHostBtn.textContent = "开双人链接";
  els.onlineCopyBtn.textContent = onlineSession.conn?.open ? "复制邀请" : "复制邀请";
  els.onlineCopyBtn.title = onlineSession.inviteUrl || "房间创建成功后可复制邀请链接。";
  els.onlineLeaveBtn.textContent = online ? onlineStatusText() : "离开在线";
  els.onlineLeaveBtn.title = online ? "离开 PeerJS 在线房间，当前局会留在本地热座模式。" : "";
  if (els.saveStatus && online) els.saveStatus.textContent = onlineStatusText();
  if (els.modeBtn) els.modeBtn.disabled = online || aiThinking || canHumanResolveDefense();
  if (els.aiPersonaBtn && online) els.aiPersonaBtn.disabled = true;
}

function onlineCloseTransport() {
  try {
    onlineSession.conn?.close?.();
  } catch {}
  try {
    onlineSession.peer?.destroy?.();
  } catch {}
  onlineSession.conn = null;
  onlineSession.peer = null;
}

function leaveOnlineMode(options = {}) {
  onlineCloseTransport();
  onlineSession = {
    role: "offline",
    localPlayerId: 0,
    peer: null,
    conn: null,
    peerId: "",
    inviteUrl: "",
    status: "offline",
    detail: "",
    rev: 0,
    applyingRemote: false,
    remoteActorId: null,
  };
  if (!options.silent && game) {
    addLog("已经离开在线房间，当前页面回到本地模式。");
    render();
  } else {
    renderOnlineControls();
  }
}

function onlineEnsurePeer() {
  if (typeof Peer === "function") return true;
  if (game) {
    addLog("PeerJS 没有加载成功。请确认 vendor/peerjs.min.js 已经随站点一起部署。");
    render();
  }
  return false;
}

function onlineSend(conn, message) {
  if (!conn?.open) return false;
  try {
    conn.send({
      protocol: ONLINE_PROTOCOL,
      sentAt: Date.now(),
      ...message,
    });
    return true;
  } catch (error) {
    onlineSession.status = "error";
    onlineSession.detail = `在线消息发送失败：${error?.message || error}`;
    if (game) addLog(onlineSession.detail);
    return false;
  }
}

function onlineBroadcastState(reason = "state") {
  if (!isOnlineHost() || !onlineSession.conn?.open || !game) return false;
  onlineSession.rev += 1;
  return onlineSend(onlineSession.conn, {
    type: "state",
    reason,
    rev: onlineSession.rev,
    game: onlineClone(game),
    pendingDefense: onlineClone(pendingDefense),
    pendingDiscard: onlineClone(pendingDiscard),
    aiPersona,
  });
}

function onlineAfterHostAction(reason = "action") {
  if (!isOnlineHost()) return;
  onlineBroadcastState(reason);
  renderOnlineControls();
}

function onlineApplyRemoteState(message) {
  if (!message?.game) return;
  game = message.game;
  pendingDefense = message.pendingDefense || null;
  pendingDiscard = message.pendingDiscard || null;
  aiPersona = message.aiPersona || aiPersona;
  vsAI = false;
  aiThinking = false;
  endTurnConfirmScope = "";
  onlineSession.rev = Math.max(onlineSession.rev || 0, message.rev || 0);
  onlineSession.status = "connected";
  onlineSession.detail = "已同步房主牌桌。";
  onlineSanitizeSelected();
  render();
}

function onlineHandleMessage(message) {
  if (!message || message.protocol !== ONLINE_PROTOCOL) return;
  if (message.type === "state" && onlineSession.role === "guest") {
    onlineApplyRemoteState(message);
    return;
  }
  if (message.type === "action" && isOnlineHost()) {
    onlineApplyHostRequest(message.request || {});
    return;
  }
  if (message.type === "hello" && isOnlineHost()) {
    onlineBroadcastState("hello");
  }
}

function onlineBindConnection(conn) {
  if (!conn) return;
  onlineSession.conn = conn;
  conn.on("open", () => {
    onlineSession.status = "connected";
    onlineSession.detail = isOnlineHost() ? "朋友已进房。" : "已连上房主。";
    if (isOnlineHost()) {
      addLog("朋友已经加入在线房间。");
      onlineSend(conn, { type: "welcome", playerId: 1 });
      onlineBroadcastState("connected");
    } else {
      onlineSend(conn, { type: "hello", playerId: onlineLocalPlayerId() });
    }
    render();
  });
  conn.on("data", onlineHandleMessage);
  conn.on("close", () => {
    onlineSession.status = "ready";
    onlineSession.detail = isOnlineHost() ? "朋友断开了，可以重新复制链接邀请。" : "已和房主断开。";
    if (game) {
      addLog(onlineSession.detail);
      render();
    } else {
      renderOnlineControls();
    }
  });
  conn.on("error", (error) => {
    onlineSession.status = "error";
    onlineSession.detail = `Peer 连接出错：${error?.message || error}`;
    if (game) {
      addLog(onlineSession.detail);
      render();
    } else {
      renderOnlineControls();
    }
  });
}

function startOnlineHost() {
  if (!onlineEnsurePeer()) return;
  leaveOnlineMode({ silent: true });
  onlineSession.role = "host";
  onlineSession.localPlayerId = 0;
  onlineSession.status = "opening";
  onlineSession.detail = "正在向 PeerServer 注册房间。";
  vsAI = false;
  createGame();
  if (game) game.mode = "online_peer";
  const peer = new Peer(onlinePeerOptions());
  onlineSession.peer = peer;
  peer.on("open", (id) => {
    onlineSession.peerId = id;
    onlineSession.inviteUrl = onlineInviteUrl(id);
    onlineSession.status = "ready";
    onlineSession.detail = "房间已开，复制邀请发给朋友。";
    addLog("在线房间已开启。复制邀请链接给朋友，对方打开后会自动加入。");
    render();
  });
  peer.on("connection", (conn) => {
    if (onlineSession.conn && onlineSession.conn !== conn) onlineSession.conn.close();
    onlineBindConnection(conn);
  });
  peer.on("error", (error) => {
    onlineSession.status = "error";
    onlineSession.detail = `PeerServer 连接失败：${error?.message || error}`;
    addLog(onlineSession.detail);
    render();
  });
  render();
}

function joinOnlineRoom(roomId) {
  if (!roomId || !onlineEnsurePeer()) return;
  leaveOnlineMode({ silent: true });
  onlineSession.role = "guest";
  onlineSession.localPlayerId = 1;
  onlineSession.peerId = roomId;
  onlineSession.status = "joining";
  onlineSession.detail = "正在连接房主。";
  vsAI = false;
  if (game) {
    game.mode = "online_peer";
    render();
  }
  const peer = new Peer(onlinePeerOptions());
  onlineSession.peer = peer;
  peer.on("open", () => {
    const conn = peer.connect(roomId, onlineDataConnectionOptions());
    onlineBindConnection(conn);
  });
  peer.on("error", (error) => {
    onlineSession.status = "error";
    onlineSession.detail = `加入房间失败：${error?.message || error}`;
    if (game) {
      addLog(onlineSession.detail);
      render();
    } else {
      renderOnlineControls();
    }
  });
}

function onlineMaybeSendAction(request) {
  if (!isOnlineMode() || isOnlineHost()) return false;
  const actorId = onlineLocalPlayerId();
  if (!onlineCanControlCurrentDecision(actorId)) {
    addLog(onlineWaitingDetail(actorId));
    render();
    return true;
  }
  if (!onlineSession.conn?.open) {
    addLog("还没连上房主，动作先别急。");
    render();
    return true;
  }
  const sent = onlineSend(onlineSession.conn, {
    type: "action",
    request: {
      id: uid(),
      playerId: actorId,
      selected: onlineSelectedPayload(),
      ...onlineClone(request),
    },
  });
  if (sent) onlineSession.detail = "动作已发给房主，等牌桌同步。";
  renderOnlineControls();
  return true;
}

function onlineApplyHostRequest(request) {
  if (!isOnlineHost() || !request) return;
  const actorId = Number(request.playerId);
  if (request.kind === "newGame") {
    createGame();
    if (game) game.mode = "online_peer";
    onlineAfterHostAction("newGame");
    return;
  }
  if (!Number.isFinite(actorId) || !onlineCanControlCurrentDecision(actorId)) {
    onlineBroadcastState("rejected");
    return;
  }
  onlineSession.applyingRemote = true;
  onlineSession.remoteActorId = actorId;
  onlineApplySelectedPayload(request.selected || null);
  try {
    if (request.kind === "slotClick") {
      const player = game.players[request.targetPlayerId];
      if (player) handleSlotClick(player, request.lane, request.slotIndex);
    } else if (request.kind === "discard") {
      resolveDiscardChoice(request.uid, actorId);
    } else if (request.kind === "button") {
      runActionButton(request.action, { sync: false });
    } else if (request.kind === "hint") {
      runHintQuickAction(request.actionId);
    } else if (request.kind === "playbook") {
      runPlaybookSuggestion(request.suggestion);
    } else if (request.kind === "endTurn") {
      endTurn();
    }
  } finally {
    onlineSession.remoteActorId = null;
    onlineSession.applyingRemote = false;
    onlineAfterHostAction(request.kind || "remote");
  }
}

async function copyOnlineInvite() {
  if (!onlineSession.inviteUrl) return;
  const fallbackCopy = () => {
    const textarea = document.createElement("textarea");
    textarea.value = onlineSession.inviteUrl;
    textarea.setAttribute("readonly", "readonly");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }
    textarea.remove();
    return copied;
  };
  try {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
    await Promise.race([
      navigator.clipboard.writeText(onlineSession.inviteUrl),
      new Promise((_, reject) => window.setTimeout(() => reject(new Error("Clipboard timeout")), 900)),
    ]);
    onlineSession.detail = "邀请链接已复制。";
  } catch {
    if (fallbackCopy()) {
      onlineSession.detail = "邀请链接已复制。";
    } else {
      window.prompt("复制这个邀请链接发给朋友：", onlineSession.inviteUrl);
      onlineSession.detail = "邀请链接已显示。";
    }
  }
  renderOnlineControls();
}

function onlineAutoJoinFromUrl() {
  const roomId = new URLSearchParams(window.location.search).get("room");
  if (roomId) joinOnlineRoom(roomId);
}

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

function groupCardsBySpace(cards) {
  return cards.reduce((groups, card) => {
    const space = card.space || "未知";
    if (!groups[space]) groups[space] = [];
    groups[space].push(card);
    return groups;
  }, {});
}

function takeFromFirstAvailableSpace(groups, spaces) {
  for (const space of spaces) {
    const bucket = groups[space];
    if (bucket?.length) return bucket.shift();
  }
  return null;
}

function arrangeOpeningDeck(cards) {
  const groups = groupCardsBySpace(shuffle(cards));
  const opening = [];
  const rest = [];
  const used = new Set();

  const addOpeningCard = (card) => {
    if (!card || used.has(card)) return false;
    opening.push(card);
    used.add(card);
    return true;
  };

  addOpeningCard(takeFromFirstAvailableSpace(groups, shuffle(["水生", "两栖"])));
  addOpeningCard(takeFromFirstAvailableSpace(groups, ["陆地"]));

  const remaining = shuffle(Object.values(groups).flat());
  for (const card of remaining) {
    if (opening.length >= OPENING_HAND_SIZE) break;
    const landCount = opening.filter((item) => item.space === "陆地").length;
    const nonLandCount = opening.length - landCount;
    if (card.space === "陆地" && landCount >= 3) continue;
    if (card.space === "陆地" && nonLandCount < 2) continue;
    addOpeningCard(card);
  }

  for (const card of remaining) {
    if (opening.length >= OPENING_HAND_SIZE) break;
    addOpeningCard(card);
  }

  for (const card of cards) {
    if (!used.has(card)) rest.push(card);
  }

  return [...opening, ...shuffle(rest)];
}

function buildBalancedPrivatePool() {
  const groups = groupCardsBySpace(allCards);
  Object.keys(groups).forEach((space) => {
    groups[space] = shuffle(groups[space]);
  });

  const picked = [];
  const used = new Set();
  const take = (space, count) => {
    const bucket = groups[space] || [];
    while (bucket.length && picked.length < PRIVATE_DECK_SIZE && count > 0) {
      const card = bucket.shift();
      picked.push(card);
      used.add(card);
      count -= 1;
    }
  };

  Object.entries(PRIVATE_DECK_SPACE_TARGETS).forEach(([space, count]) => take(space, count));

  while (picked.length < PRIVATE_DECK_SIZE) {
    const spaces = shuffle(PRIVATE_DECK_FILL_SPACES);
    const card = takeFromFirstAvailableSpace(groups, spaces);
    if (!card) break;
    if (used.has(card)) continue;
    picked.push(card);
    used.add(card);
  }

  if (picked.length < PRIVATE_DECK_SIZE) {
    const fallback = shuffle(allCards.filter((card) => !used.has(card)));
    while (picked.length < PRIVATE_DECK_SIZE && fallback.length) picked.push(fallback.shift());
  }

  return arrangeOpeningDeck(picked).map(makeInstance);
}

function makeInstance(card) {
  return {
    ...card,
    uid: uid(),
    state: "ready",
    justSummoned: false,
    skillUsedTurn: 0,
    tauntTurns: 0,
    venomStrike: false,
    kingChallenge: false,
    pressureWounds: 0,
    lane: null,
    owner: null,
  };
}

function spaceOf(card) {
  return card?.space || card?.["空间"] || "未知";
}

function makeDisasterInstance(disaster) {
  return {
    ...disaster,
    uid: uid(),
  };
}

function makePlayer(id, name, initialFood) {
  const privatePool = buildBalancedPrivatePool();
  return {
    id,
    name,
    hp: 20,
    food: initialFood,
    turnsTaken: 0,
    openingCue: null,
    turnSacrifices: 0,
    turnRecovers: 0,
    turnProtects: 0,
    turnSkills: 0,
    turnMoves: 0,
    status: {
      roarThisTurn: false,
      roarNextOwnTurn: false,
    },
    deck: privatePool,
    hand: [],
    grave: [],
    turnDisaster: null,
    turnDisasterUsed: false,
    turnQuest: null,
    turnHype: 0,
    turnHypeClaims: [],
    turnHypeRewards: [],
    board: {
      sky: [null, null, null],
      land: [null, null, null],
      water: [null, null, null],
    },
  };
}

function createGame() {
  const online = isOnlineMode();
  const mode = online ? "online_peer" : (vsAI ? "vs_ai" : "hotseat");
  const p1Name = online ? "房主" : "玩家一";
  const p2Name = online ? "朋友" : (vsAI ? "AI 对手" : "玩家二");
  game = {
    matchId: uid(),
    startedAt: new Date().toISOString(),
    mode,
    players: [makePlayer(0, p1Name, 5), makePlayer(1, p2Name, 2)],
    active: 0,
    turn: 1,
    winner: null,
    saved: false,
    publicPiles: {
      A: shuffle(allCards.filter((c) => c.level === "A")).map(makeInstance),
      B: shuffle(allCards.filter((c) => c.level === "B")).map(makeInstance),
      C: shuffle(allCards.filter((c) => c.level === "C")).map(makeInstance),
    },
    log: [],
    history: [],
    step: 0,
  };

  game.players.forEach((player) => {
    for (let i = 0; i < 5; i += 1) drawFromDeck(player, false);
    player.openingCue = determineOpeningCue(player);
  });
  rollTurnDisaster(game.players[0]);
  rollTurnQuest(game.players[0]);

  selected = null;
  aiThinking = false;
  pendingDefense = null;
  pendingDiscard = null;
  combatFlash = null;
  if (combatFlashTimer) {
    clearTimeout(combatFlashTimer);
    combatFlashTimer = null;
  }
  announcerState = null;
  activeStageTab = "quest";
  activeIntelTab = "report";
  stageTabPinned = false;
  intelTabPinned = false;
  mobileActionBand = "";
  mobileActionBandScope = "";
  playbookPeekExpanded = false;
  playbookPeekScope = "";
  endTurnConfirmScope = "";
  const opponentIntro = vsAI && !online ? `AI 人格是“${currentAIPersona().label}”。` : "这是双人在线对局。";
  addLog(`新的一局开始。${game.players[0].name}先手，初始 5 食物；${game.players[1].name} 初始 2 食物。${opponentIntro}${game.players[0].name}这把像“${openingCueLabel(game.players[0])}”，${game.players[1].name} 像“${openingCueLabel(game.players[1])}”。本回合环境牌是暗牌，花 ${DISASTER_DRAW_COST} 食物抽到后自动发动；骚操作任务是《${game.players[0].turnQuest?.title || "暂无"}》。`, {
    action: "match_start",
    actor: "系统",
  });
  addLog("规则速记：攻击动物花攻击力食物；攻击玩家花攻击力 -1 食物（最低 1），如果对方场上有动物再 +1；水线生物不能直接攻击玩家，只能咬生物或参与护攻；每回合可免费换线 1 次；普通压制会留下压伤，同一动物第 4 次被压制会退场；动物格挡花防御力食物；玩家每回合最多护场 1 次来替动物承受打击；水生位每只动物在回合开始 +1 食物，最多 +3。", {
    action: "rule_tip",
    actor: "系统",
  });
  render();
}

function activePlayer() {
  return game.players[game.active];
}

function opponentPlayer() {
  return game.players[game.active === 0 ? 1 : 0];
}

function isAIActorEvent(event) {
  return !!(vsAI && game?.players?.[1]?.name && event?.actor === game.players[1].name);
}

function aiIntentSeed(event, message = "") {
  const extra = event?.extra || {};
  return [
    game?.matchId || "demo",
    game?.turn || 0,
    game?.step || 0,
    currentAIPersona().id,
    event?.action || "",
    event?.target || "",
    extra.attackerCard || extra.cardName || "",
    message,
  ].join(":");
}

function aiActionReadForEvent(event, message = "") {
  if (!isAIActorEvent(event)) return null;
  const action = event?.action || "";
  const extra = event?.extra || {};
  const seed = aiIntentSeed(event, message);
  const persona = currentAIPersona();
  const actor = extra.attackerCard || extra.cardName || event?.target || "这一步";
  const target = event?.target || extra.targetCard || "目标";

  if (action === "disaster_cast") {
    const own = extra.ownVictims?.length || 0;
    const enemy = extra.enemyVictims?.length || 0;
    return {
      label: enemy > own ? "炸赚交换" : "抢环境牌",
      detail: enemy > own
        ? `它愿意赔掉己方 ${own} 个，是因为对面会倒 ${enemy} 个；这步主要在清线和抢节目效果。`
        : `它这手不图体面，先把${laneLabel(extra.lane)}线搅乱，再看后面有没有便宜可捡。`,
    };
  }

  if (typeof action === "string" && action.startsWith("skill")) {
    const skill = extra.cardSkill || extra.skillName || "";
    const skillReads = {
      "采摘": ["续命再拖", `它先把血线抬起来，后面才敢继续跟你换资源。`],
      "偷盗": ["拆你手牌", `它不是在打血量，是先把你的手牌选择变少。`],
      "鹰眼": ["偷看再偷", `它先确认你兜里有什么，再顺走一张最烦人的拼图。`],
      "吸引": ["立嘲讽点", `它把《${target}》推到前面，想逼你的攻击先撞到这里。`],
      "毒牙": ["铺下一口", `它先给《${target}》挂毒，下一次咬不死也能把目标压进休息。`],
      "百兽王吼": ["压陆地线", `它先把你的陆地生物喊软，让这一轮交换更偏向它。`],
      "谁是百兽王？": ["养核心怪", `它把《${target}》养成麻烦核心，后面每一口都会更有存在感。`],
    };
    const picked = skillReads[skill] || ["先开绝活", `它这手更像先把技能价值拿出来，再等下一拍接攻击或补场。`];
    return { label: picked[0], detail: picked[1] };
  }

  if (action === "move") {
    if (extra.to === "water") {
      return {
        label: "蹭水生线",
        detail: `它把《${actor}》挪到水生线，多半是想要下一回合多一点食物，也顺便换个攻击角度。`,
      };
    }
    return {
      label: "换线找口",
      detail: `它让《${actor}》从${laneLabel(extra.from)}去${laneLabel(extra.to)}，重点不是走位本身，而是给下一口找角度。`,
    };
  }

  if (action === "attack_face") {
    const damage = Number(extra.damage) || 0;
    const defender = game?.players?.find((player) => player.name === event.target) || null;
    const remaining = defender ? Math.max(0, defender.hp) : null;
    if (remaining === 0) {
      return {
        label: "冲斩杀",
        detail: `它看到血线已经够低，直接让《${actor}》收比赛。`,
      };
    }
    return {
      label: damage >= 4 ? "压血线" : "蹭脸压迫",
      detail: `它选择打玩家，是想把你压到更难安心铺场的血线；这口之后你会更难无视它。`,
    };
  }

  if (action === "attack_face_guard" || action === "attack_face_guard_unstoppable") {
    return {
      label: action === "attack_face_guard_unstoppable" ? "格挡仍漏血" : "逼你格挡",
      detail: `它这口冲脸是在逼防守方交格挡资源；就算没直接掉血，也会让你的场面变窄。`,
    };
  }

  if (action === "attack_creature_kill") {
    const levelRead = extra.targetLevel === "A" ? "处理大货" : "清关键怪";
    return {
      label: levelRead,
      detail: `它让《${actor}》收掉《${target}》，是为了把你的可用攻击点先从桌面上拿掉。`,
    };
  }

  if (action === "attack_creature_injure" || action === "attack_creature_venom") {
    return {
      label: action === "attack_creature_venom" ? "毒休目标" : "压休目标",
      detail: `它没一定要击杀《${target}》，先让这只下回合慢一拍，也是在拆你的行动路线。`,
    };
  }

  if (action === "attack_creature_player_guard") {
    return {
      label: "逼你承伤",
      detail: `它瞄准《${target}》，就是想让防守方在玩家承受打击和让动物受伤之间难受二选一。`,
    };
  }

  if (action === "recover") {
    return {
      label: "叫醒战力",
      detail: `它愿意花 1 食物叫醒《${target}》，说明这只后面还有出手价值。`,
    };
  }

  if (action === "summon") {
    if (extra.lane === "water" && (extra.cardSpace === "水生" || extra.cardSpace === "两栖")) {
      return {
        label: "铺经济点",
        detail: `它把《${target}》放到水生线，是在补站场，也是在给之后的回合多攒一点食物。`,
      };
    }
    if (extra.cardSkill) {
      return {
        label: "铺技能点",
        detail: `它先把带技能的《${target}》摆出来，下一拍就更容易接绝活或逼交换。`,
      };
    }
    return {
      label: extra.cardLevel === "A" ? "压大身材" : "补站场",
      detail: stablePickByKey([
        `它现在先补《${target}》，是为了让场上有东西能接下一口。`,
        `这手看着老实，其实是在把后面的攻击和防守格子先占住。`,
      ], seed),
    };
  }

  if (action === "draw_private") {
    return {
      label: "找拼图",
      detail: `它现在先抽私有牌，多半是场上路线不够顺，想找下一张能接上的牌。`,
    };
  }

  if (String(action).startsWith("draw_public_")) {
    const level = String(action).replace("draw_public_", "");
    return {
      label: level === "A" ? "找强牌" : "补公共牌",
      detail: `它花资源翻公共 ${level} 类，是想用公开牌池补一张更稳定的后续选择。`,
    };
  }

  if (action === "sacrifice") {
    return {
      label: "凑口粮",
      detail: `它把《${target}》换成 1 食物，通常是为了让后面的关键按钮亮起来。`,
    };
  }

  if (action === "end_turn") {
    return {
      label: "收手保粮",
      detail: `${persona.label} 这拍没有更赚的按钮了，先把资源和场面留到下一轮。`,
    };
  }

  return null;
}

function enrichEventForHistory(message, event) {
  if (!event) return null;
  const aiRead = aiActionReadForEvent(event, message);
  if (!aiRead) return event;
  return {
    ...event,
    extra: {
      ...(event.extra || {}),
      aiIntent: aiRead.label,
      aiReason: aiRead.detail,
    },
  };
}

function addLog(message, event = null) {
  if (!game) return;
  game.log.unshift(message);
  game.log = game.log.slice(0, 80);
  const eventForHistory = enrichEventForHistory(message, event);
  const announcer = announcerFromEvent(message, eventForHistory);
  if (announcer) setAnnouncer(announcer);
  if (eventForHistory) {
    game.step += 1;
    game.history.push({
      step: game.step,
      turn: game.turn,
      active: activePlayer()?.name || null,
      action: eventForHistory.action || "log",
      detail: message,
      actor: eventForHistory.actor || null,
      target: eventForHistory.target || null,
      cost: eventForHistory.cost ?? null,
      extra: eventForHistory.extra || null,
      snapshot: snapshotGameState(),
      ts: new Date().toISOString(),
    });
    nudgeDeckTabsFromEvent(eventForHistory);
    processTurnQuestEvent(eventForHistory);
    processTurnHypeEvent(eventForHistory);
  }
}

function setStageTab(tab, options = {}) {
  if (!STAGE_TAB_KEYS.includes(tab)) return;
  activeStageTab = tab;
  if (options.manual) stageTabPinned = true;
  renderDeckShell();
}

function setIntelTab(tab, options = {}) {
  if (!INTEL_TAB_KEYS.includes(tab)) return;
  activeIntelTab = tab;
  if (options.manual) intelTabPinned = true;
  renderDeckShell();
}

function currentMobileActionBandScopeKey({ focus = currentRouteFocus() } = {}) {
  return [
    game?.turn ?? 0,
    game?.active ?? 0,
    game?.winner ?? "play",
    pendingDefense?.kind || "",
    pendingDefense?.selectedBlockerUid || "",
    selected?.type || "",
    selected?.uid || "",
    selected?.mode || "",
    focus?.band || "",
  ].join("|");
}

function preferredMobileActionBand({ player = activePlayer(), focus = currentRouteFocus(), reactionMode = canHumanResolveDefense() } = {}) {
  if (reactionMode) return "defense";
  if (focus?.band && ACTION_BAND_KEYS.includes(focus.band)) return focus.band;
  const selectedLoc = currentSelectedLocation();
  if (selectedLoc?.type === "hand") return "tactics";
  if (selectedLoc?.type === "board" && selectedLoc?.player?.id === player?.id) return "tactics";
  if (!boardCards(player).length) return "resource";
  return "resource";
}

function currentMobileActionBand({ player = activePlayer(), focus = currentRouteFocus(), reactionMode = canHumanResolveDefense() } = {}) {
  const scope = currentMobileActionBandScopeKey({ focus });
  const preferred = preferredMobileActionBand({ player, focus, reactionMode });
  if (!ACTION_BAND_KEYS.includes(mobileActionBand) || mobileActionBandScope !== scope) {
    mobileActionBand = preferred;
    mobileActionBandScope = scope;
  }
  if (!ACTION_BAND_KEYS.includes(mobileActionBand)) mobileActionBand = preferred;
  return mobileActionBand;
}

function setMobileActionBand(key, { focus = currentRouteFocus() } = {}) {
  if (!ACTION_BAND_KEYS.includes(key)) return;
  mobileActionBand = key;
  mobileActionBandScope = currentMobileActionBandScopeKey({ focus });
}

function shouldCompressOpeningPlaybook(player = activePlayer(), suggestions = buildPlaybookSuggestions()) {
  if (!game || !player || pendingDefense) return false;
  if (vsAI && game.active === 1) return false;
  if (selected) return false;
  if (game.turn > 2) return false;
  if ((player.turnsTaken || 0) > 1) return false;
  if ((boardCards(player).length || 0) > 1) return false;
  return (suggestions?.length || 0) > 1;
}

function isOpeningFastTrackMoment(player = activePlayer(), suggestion = currentPrimarySuggestion()) {
  if (!game || !player || game.winner !== null || pendingDefense) return false;
  if (vsAI && game.active === 1) return false;
  if (player.id !== activePlayer()?.id) return false;
  if (game.turn > 2) return false;
  if ((player.turnsTaken || 0) > 1) return false;
  if ((boardCards(player).length || 0) > 1) return false;
  return !!suggestion;
}

function shouldQuietOpeningIntel(player = activePlayer()) {
  if (!game || !player || game.winner !== null || pendingDefense) return false;
  if (vsAI && game.active === 1) return false;
  if (player.id !== activePlayer()?.id) return false;
  if (game.turn > 2) return false;
  if ((player.turnsTaken || 0) > 1) return false;
  return boardCards(player).length === 0;
}

function shouldSpotlightOpeningPrimary(player = activePlayer(), suggestion = currentPrimarySuggestion()) {
  if (!suggestion || !isOpeningFastTrackMoment(player, suggestion)) return false;
  return !currentSelectedLocation();
}

function compactFastTrackStepTitle(title = "", index = 0) {
  if (!title) return "";
  if (title.startsWith("抽完再看")) return "再看新机会";
  if (title.startsWith("确认你真的不想再动")) return "先确认要不要收手";

  const cleaned = title
    .replace(/^点手牌里的《/, "点《")
    .replace(/^先点你的《/, "点《")
    .replace(/^先点《/, "点《")
    .replace(/^再点右侧的《/, "点《")
    .replace(/^最后再点《/, "点《")
    .replace(/^再点“/, "点")
    .replace(/^最后点“/, "点")
    .replace(/^点“/, "点")
    .replace(/^再点 /, "点")
    .replace(/^最后点 /, "点")
    .replace(/^最后再点 /, "点")
    .replace(/^点 /, "点")
    .replace(/”/g, "")
    .trim();

  if (!cleaned) return "";
  const prefix = index === 0 ? "先" : index === 1 ? "再" : "最后";
  if (cleaned.startsWith("先") || cleaned.startsWith("再") || cleaned.startsWith("最后")) return cleaned;
  return `${prefix}${cleaned}`;
}

function openingFastTrackTitles(suggestion) {
  const plan = manualPlanFromSuggestion(suggestion);
  return (plan?.steps || [])
    .map((step, index) => compactFastTrackStepTitle(step?.title || "", index))
    .filter(Boolean)
    .slice(0, 3);
}

function openingFastTrackRoute(suggestion) {
  return openingFastTrackTitles(suggestion).join(" -> ");
}

function buildOpeningIntelPeek(canSave = canUseStorage(), persona = currentAIPersona()) {
  const suggestion = currentPrimarySuggestion();
  const route = openingFastTrackRoute(suggestion);
  const cue = activeOpeningCue(activePlayer());
  return {
    tone: "support",
    badge: "战报先别抢麦",
    meta: `第 ${game?.turn || 1} 回合`,
    title: route ? "先把上面这条打出去" : "先打一手再看回放",
    detail: route
      ? `照这个顺序点：${route}。`
      : "等你第一手真正落地，这里才开始滚实时高光。",
    chips: [
      cue?.label ? `开场 ${cue.label}` : "",
      vsAI ? `AI ${persona.label}` : "双人对局",
      canSave ? `已存 ${savedArchive.length} 局` : "可导出 JSON",
    ].filter(Boolean).slice(0, 3),
    next: route
      ? "第一只动物一落地，高光、掉落和复盘都会自己开麦。"
      : "第一手打出去后，这里会自动切回实时高光。",
    aside: canSave
      ? "旧局都还在本地，先别被它们拉走注意力。"
      : "当前环境不能自动存档，但仍然可以导出整局 JSON。",
  };
}

function playbookPeekScopeKey(player = activePlayer(), suggestions = buildPlaybookSuggestions()) {
  const first = suggestions?.[0] || null;
  return [
    game?.turn ?? 0,
    game?.active ?? 0,
    pendingDefense?.kind || "",
    selected?.type || "",
    selected?.uid || "",
    player?.turnsTaken || 0,
    boardCards(player).length,
    first?.key || "",
    suggestions?.length || 0,
  ].join("|");
}

function isPlaybookPeekExpanded(player = activePlayer(), suggestions = buildPlaybookSuggestions()) {
  const scope = playbookPeekScopeKey(player, suggestions);
  if (playbookPeekScope !== scope) {
    playbookPeekScope = scope;
    playbookPeekExpanded = false;
  }
  return playbookPeekExpanded;
}

function setPlaybookPeekExpanded(value, player = activePlayer(), suggestions = buildPlaybookSuggestions()) {
  playbookPeekScope = playbookPeekScopeKey(player, suggestions);
  playbookPeekExpanded = !!value;
}

function nudgeDeckTabsFromEvent(event = null) {
  if (!event) return;
  const action = event.action || "";
  if (!stageTabPinned) {
    if (action === "match_start" || action === "end_turn") activeStageTab = "quest";
    else if (action === "quest_complete") activeStageTab = "quest";
    else if (action === "hype_reward") activeStageTab = "hype";
    else if (
      action === "summon"
      || action === "move"
      || action === "disaster_cast"
      || action === "attack_face"
      || action === "attack_face_guard"
      || action === "attack_face_guard_unstoppable"
      || action === "attack_creature_kill"
      || action === "attack_creature_pressure_kill"
      || action === "attack_creature_injure"
      || action === "attack_creature_venom"
      || action === "attack_creature_player_guard"
      || typeof action === "string" && action.startsWith("skill")
    ) activeStageTab = "showtime";
  }
  if (!intelTabPinned) {
    if (action === "disaster_cast" || action === "disaster_fizzle" || action === "end_turn") activeIntelTab = "disaster";
    else if (action === "draw_private" || String(action).startsWith("draw_public_")) activeIntelTab = "pool";
    else activeIntelTab = "report";
  }
}

function canUseStorage() {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    return false;
  }
}

function loadArchive() {
  if (!canUseStorage()) return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    savedArchive = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(savedArchive)) savedArchive = [];
  } catch {
    savedArchive = [];
  }
}

function saveArchive() {
  if (!canUseStorage()) return false;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedArchive));
    return true;
  } catch {
    return false;
  }
}

function snapshotPlayer(player) {
  return {
    name: player.name,
    hp: player.hp,
    food: player.food,
    turnsTaken: player.turnsTaken || 0,
    openingCue: player.openingCue || null,
    hand: player.hand.length,
    deck: player.deck.length,
    grave: player.grave.length,
    turnSacrifices: player.turnSacrifices,
    turnRecovers: player.turnRecovers,
    turnProtects: player.turnProtects,
    turnSkills: player.turnSkills,
    turnDisaster: player.turnDisaster ? `${player.turnDisaster["卡名"]}|${player.turnDisasterUsed ? "used" : "fresh"}` : null,
    turnQuest: player.turnQuest
      ? {
          id: player.turnQuest.id,
          title: player.turnQuest.title,
          completed: !!player.turnQuest.completed,
          reward: player.turnQuest.rewardLabel,
          progress: player.turnQuest.progress || {},
        }
      : null,
    turnHype: {
      current: player.turnHype || 0,
      claims: [...(player.turnHypeClaims || [])],
      rewards: [...(player.turnHypeRewards || [])],
    },
    board: {
      sky: player.board.sky.map((card) => (card ? `${card.name}|${card.atk}/${card.def}|${card.state}` : null)),
      land: player.board.land.map((card) => (card ? `${card.name}|${card.atk}/${card.def}|${card.state}` : null)),
      water: player.board.water.map((card) => (card ? `${card.name}|${card.atk}/${card.def}|${card.state}` : null)),
    },
  };
}

function snapshotGameState() {
  if (!game) return null;
  return {
    matchId: game.matchId,
    mode: game.mode,
    turn: game.turn,
    active: activePlayer()?.name || null,
    winner: game.winner !== null ? game.players[game.winner].name : null,
    publicPiles: {
      A: game.publicPiles.A.length,
      B: game.publicPiles.B.length,
      C: game.publicPiles.C.length,
    },
    pendingDefense: pendingDefense
      ? {
          kind: pendingDefense.kind,
          defender: game.players[pendingDefense.defenderId]?.name || null,
          attackerUid: pendingDefense.attackerUid,
          targetUid: pendingDefense.targetUid || null,
          blockerUid: pendingDefense.selectedBlockerUid || null,
        }
      : null,
    players: game.players.map(snapshotPlayer),
  };
}

function formatTimestamp(value) {
  return value.replace(/[:.]/g, "-");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildMatchRecord(includeHistory = true) {
  if (!game) return null;
  const winner = game.winner !== null ? game.players[game.winner] : null;
  const flavorSummary = buildMatchFlavorSummary();
  return {
    id: game.matchId,
    mode: game.mode,
    aiPersona: game.mode === "vs_ai" ? currentAIPersona().id : null,
    players: game.players.map((player) => player.name),
    startedAt: game.startedAt,
    finishedAt: winner ? new Date().toISOString() : null,
    winner: winner ? winner.name : null,
    turns: game.turn,
    steps: game.history.length,
    balancePatch: BALANCE_PATCH_NOTES,
    flavorSummary,
    finalState: snapshotGameState(),
    history: includeHistory ? game.history.slice() : [],
  };
}

function persistFinishedMatch() {
  if (!game || game.winner === null || game.saved) return;
  const record = buildMatchRecord(true);
  if (!record) return;
  savedArchive = [record, ...savedArchive.filter((entry) => entry.id !== record.id)].slice(0, MAX_ARCHIVE_MATCHES);
  game.saved = saveArchive();
}

function downloadJson(filename, payload) {
  if (typeof Blob === "undefined" || typeof URL === "undefined" || !document.createElement) return false;
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  return true;
}

function exportCurrentMatch() {
  if (!game) return;
  const record = buildMatchRecord(true);
  if (!record) return;
  downloadJson(`jungle-law-match-${formatTimestamp(record.startedAt)}.json`, record);
  addLog("本局战报已导出。");
  render();
}

function exportArchive() {
  const payload = {
    exportedAt: new Date().toISOString(),
    count: savedArchive.length,
    notes: BALANCE_PATCH_NOTES,
    matches: savedArchive,
  };
  downloadJson(`jungle-law-archive-${formatTimestamp(payload.exportedAt)}.json`, payload);
  addLog("全部本地战报已导出。");
  render();
}

function currentSelectedLocation() {
  if (!selected?.uid) return null;
  return findCardLocation(selected.uid);
}

function isDefenseDecisionOpen() {
  return !!pendingDefense;
}

function defendingPlayer() {
  return pendingDefense ? game.players[pendingDefense.defenderId] : null;
}

function attackerFromPendingDefense() {
  if (!pendingDefense) return null;
  return findCardLocation(pendingDefense.attackerUid);
}

function selectedGuardBlocker() {
  if (!pendingDefense?.selectedBlockerUid) return null;
  return findCardLocation(pendingDefense.selectedBlockerUid);
}

function defendingTargetCreature() {
  if (!pendingDefense?.targetUid) return null;
  return findCardLocation(pendingDefense.targetUid);
}

function legalPendingFaceBlockers(attackerLoc = attackerFromPendingDefense(), defender = defendingPlayer()) {
  if (!attackerLoc?.card || !defender || pendingDefense?.kind !== "face") return [];
  return legalFaceBlockers(attackerLoc, defender)
    .filter((loc) => defender.food >= faceBlockCost(defender, loc));
}

function faceDefenseShortcutState(attackerLoc = attackerFromPendingDefense(), defender = defendingPlayer()) {
  if (!attackerLoc?.card || !defender || pendingDefense?.kind !== "face") return null;
  const legal = legalPendingFaceBlockers(attackerLoc, defender);
  if (!legal.length) return null;
  const selectedBlocker = selectedGuardBlocker();
  if (selectedBlocker?.card) {
    return {
      blockerLoc: selectedBlocker,
      legal,
      mode: "selected",
      legalCount: legal.length,
      guardCost: faceBlockCost(defender, selectedBlocker),
      leak: faceGuardDamageLeak(attackerLoc.card),
    };
  }

  const fallbackUid = bestDefenseSuggestion()[0]?.blockerUid || "";
  const chosen = legal.find((loc) => loc.card.uid === fallbackUid) || legal[0];
  if (!chosen?.card) return null;
  return {
    blockerLoc: chosen,
    legal,
    mode: legal.length === 1 ? "only" : "recommended",
    legalCount: legal.length,
    guardCost: faceBlockCost(defender, chosen),
    leak: faceGuardDamageLeak(attackerLoc.card),
  };
}

function buildPendingDefenseState() {
  if (!pendingDefense) return null;
  if (pendingDefense.kind === "face") {
    const defender = defendingPlayer();
    const attackerLoc = attackerFromPendingDefense();
    const shortcut = faceDefenseShortcutState(attackerLoc, defender);
    const blockerLoc = selectedGuardBlocker() || shortcut?.blockerLoc || null;
    return {
      kind: "face",
      defender,
      attackerLoc,
      shortcut,
      blockerLoc,
      attackValue: pendingDefense.attackValue || 0,
      leak: attackerLoc?.card ? faceGuardDamageLeak(attackerLoc.card) : 0,
      legalCount: shortcut?.legalCount || 0,
      canSwapBlocker: (shortcut?.legalCount || 0) > 1,
      guardCost: blockerLoc?.card && defender ? faceBlockCost(defender, blockerLoc) : 0,
    };
  }
  const attackerLoc = attackerFromPendingDefense();
  const targetLoc = defendingTargetCreature();
  const snapshot = creatureGuardSnapshot(attackerLoc, targetLoc);
  return {
    kind: "creature",
    attackerLoc,
    targetLoc,
    snapshot,
    attackValue: pendingDefense.attackValue || 0,
    targetName: targetLoc?.card?.name || "它",
    venom: !!attackerLoc?.card?.venomStrike,
  };
}

function pendingDefenseResultText(state = buildPendingDefenseState()) {
  if (!state) return "";
  if (state.kind === "face") {
    if (!state.blockerLoc?.card) return `玩家 -${state.attackValue}`;
    return state.leak ? `挡住也会漏 ${state.leak}` : `《${state.blockerLoc.card.name}》会顶这口`;
  }
  if (state.snapshot?.dies) return `《${state.targetName}》会退场`;
  if (state.snapshot?.rests) return `《${state.targetName}》会进休息`;
  return `《${state.targetName}》按普通战斗结算`;
}

function pendingDefenseGuideShortcut(state = buildPendingDefenseState()) {
  if (!state) return "";
  if (state.kind === "face") {
    if (!state.blockerLoc?.card) return "这口没有动物能格挡，只能玩家承受打击。";
    return state.canSwapBlocker
      ? "可以动物格挡，也可以玩家承受打击；想换格挡动物就点桌上黄框。"
      : `可以动物格挡，也可以玩家承受打击；《${state.blockerLoc.card.name}》能格挡这口。`;
  }
  return `玩家承受打击 -${state.attackValue} 可保住《${state.targetName}》；也可以让动物承受伤害。`;
}

function canHumanResolveDefense() {
  if (isOnlineMode()) return !!pendingDefense && pendingDefense.defenderId === onlineInputActorId();
  return !!pendingDefense && (!vsAI || pendingDefense.defenderId === 0);
}

function canHumanResolveDiscard() {
  if (!pendingDiscard) return false;
  if (isOnlineMode()) return pendingDiscard.playerId === onlineInputActorId();
  return !vsAI || pendingDiscard.playerId === 0;
}

function currentSelectedHand(player) {
  const loc = currentSelectedLocation();
  if (!loc || loc.type !== "hand" || loc.player.id !== player.id) return null;
  return loc;
}

function currentSelectedBoard(player) {
  const loc = currentSelectedLocation();
  if (!loc || loc.type !== "board" || loc.player.id !== player.id) return null;
  return loc;
}

function faceAttackTax(defender) {
  return boardCards(defender).length > 0 ? 1 : 0;
}

function faceAttackCost(attacker, defender) {
  return attackSpendCost(game.players[attacker.owner], attacker, defender);
}

function attackReadyError(player, card, cost, label = "攻击") {
  return attackReadyErrorWithFood(player, card, cost, label, player.food);
}

function faceAttackRuleError(card) {
  if (card?.lane === "water") return "水线生物只能攻击生物或参与护攻，不能直接攻击玩家。";
  return "";
}

function faceAttackReadyErrorWithFood(player, card, defender, availableFood = player.food) {
  const cost = attackSpendCost(player, card, defender);
  const readiness = attackReadyErrorWithFood(player, card, cost, "打玩家", availableFood);
  if (readiness) return readiness;
  return faceAttackRuleError(card);
}

function faceAttackReadyError(player, card, defender) {
  return faceAttackReadyErrorWithFood(player, card, defender, player.food);
}

function creatureAttackTargetError(player, attacker, targetLoc) {
  const cost = attackSpendCost(player, attacker);
  const readiness = attackReadyError(player, attacker, cost, "攻击");
  if (readiness) return readiness;
  if (!targetLoc || targetLoc.player.id === player.id || targetLoc.type !== "board") {
    return "请点击对方场上的目标生物。";
  }
  const taunts = availableTaunts(targetLoc.player, attacker);
  if (taunts.length && !taunts.some((loc) => loc.card.uid === targetLoc.card.uid)) {
    return `${attacker.name} 被嘲讽吸住了，只能先打会招摇的家伙。`;
  }
  if (!canReach(attacker, targetLoc.lane)) {
    return `${attacker.name} 不能攻击${laneLabel(targetLoc.lane)}空间的 ${targetLoc.card.name}。`;
  }
  const attackValue = effectiveAttack(player, attacker);
  const defenseValue = targetLoc.card.state === "rest" ? 0 : effectiveDefense(targetLoc.player, targetLoc.card);
  if (attackValue * 2 <= defenseValue && !attacker.venomStrike) {
    return `${attacker.name} 攻击力不足，无法攻击 ${targetLoc.card.name}。`;
  }
  return "";
}

function isCreatureAttackReady(player, attacker, targetLoc) {
  return !creatureAttackTargetError(player, attacker, targetLoc);
}

function canSummonHere(player, card, lane, slotIndex) {
  return !player.board[lane][slotIndex] && canPlace(card, lane);
}

function legalCreatureTargets(sourceLoc, defenderOwner) {
  return boardCards(defenderOwner).filter((targetLoc) => isCreatureAttackReady(sourceLoc.player, sourceLoc.card, targetLoc));
}

function skillInfo(skillName) {
  return allSkills.find((item) => item["技能名称"] === skillName) || null;
}

function skillCost(card) {
  return Number(skillInfo(card?.skill)?.["食物消耗"] || 0);
}

function cardHasActiveSkill(card) {
  return !!card?.skill && skillInfo(card.skill)?.["触发方式"] === "主动";
}

function skillPreview(skillName) {
  const previews = {
    偷盗: "随机顺走对手 1 张手牌。",
    鹰眼: "先看光对手手牌，再随机顺走 1 张。",
    吸引: "逼能打到它的敌人先来揍它。",
    毒牙: "下一次咬生物时，打不死也能让对方休息。",
    采摘: "试玩版先简化成给自己回 1 血。",
    百兽王吼: "压制对手陆地生物，本回合和对方下回合都生效。",
    "谁是百兽王？": "进入兽王状态，持续到它阵亡。",
    美味: "被击杀后，攻击方玩家回 1 血。",
    超级美味: "被击杀后，攻击方玩家回 2 血。",
    狼群: "场上凑够 3 只狼后，全体狼攻击 +1。",
    毒腺: "被击杀后，攻击者立刻休息。",
    猛毒: "被击杀后，攻击者也会阵亡。",
    携带病毒: "被击杀后，有概率把攻击者放倒。",
    天空攻击指挥官: "己方天空生物攻击 +1，但攻击花费仍按原攻算。",
    海洋防御指挥官: "己方水生/水里的两栖生物攻击 +1，但攻击花费仍按原攻算。",
  };
  return previews[skillName] || skillInfo(skillName)?.效果 || "";
}

function inferCardRole(card) {
  if (!card) {
    return {
      label: "自由人",
      tone: "support",
      blurb: "这只更适合看场面临时安排。",
      summonNote: "",
    };
  }
  const featured = FEATURED_CARD_ROLES[card.name];
  if (featured) return featured;

  const atk = Number(card.atk) || 0;
  const def = Number(card.def) || 0;
  if (card.skill === "海洋防御指挥官") {
    return {
      label: "水生加成",
      tone: "support",
      blurb: "它更像是来把整条水线带顺的。",
      summonNote: `《${card.name}》有水生加成，先放到水生线更容易发挥。`,
    };
  }
  if (card.skill === "天空攻击指挥官") {
    return {
      label: "天空加成",
      tone: "support",
      blurb: "先占高位，后面一整排天空位都像被带起来了。",
      summonNote: `《${card.name}》有天空加成，先占住天空会带动后续压制。`,
    };
  }
  if (card.skill === "毒牙") {
    return {
      label: "毒牙牌",
      tone: "trick",
      blurb: "重点不是硬伤害，是让对面不敢安心站场。",
      summonNote: `《${card.name}》有毒牙，先摆出来会让对面更难安心进攻。`,
    };
  }
  if (card.skill === "偷盗" || card.skill === "鹰眼") {
    return {
      label: "偷牌技能",
      tone: "trick",
      blurb: "它上场的意义往往不在正面，而在偷看和偷走。",
      summonNote: `《${card.name}》有偷牌/看牌技能，先站住会打开资源路线。`,
    };
  }
  if (isWolfCard(card)) {
    return {
      label: "狼群牌",
      tone: "attack",
      blurb: "单看一般，凑多了就会突然变得很烦。",
      summonNote: `《${card.name}》是狼群牌，越早点上桌，后面越容易滚出群体加成。`,
    };
  }
  if (card.space === "两栖" && canMoveCard(card) && atk >= 2) {
    return {
      label: "可移动",
      tone: "trick",
      blurb: "它最烦人的地方通常不在身材，而在下一步准备跳哪条线。",
      summonNote: `《${card.name}》可以换线，先摆出来，下一步就能调整位置。`,
    };
  }
  if (card.space === "水生" && atk >= 2) {
    return {
      label: "水生攻击",
      tone: "attack",
      blurb: "早点下水，后面更容易又拿资源又压人。",
      summonNote: `《${card.name}》适合水生线，先蹲水位会让节奏更主动。`,
    };
  }
  if (card.space === "天空" && atk >= 3) {
    return {
      label: "天空攻击",
      tone: "attack",
      blurb: "它更适合站高位找空档，不是站地上硬磨。",
      summonNote: `《${card.name}》适合天空位，先占高位会让后面的攻击更自然。`,
    };
  }
  if (atk >= 4) {
    return {
      label: "高攻牌",
      tone: "attack",
      blurb: "它的存在本身就是一种压场。",
      summonNote: `《${card.name}》攻击高，先摆出来会给对面压力。`,
    };
  }
  if (atk <= 1 && def >= 3) {
    return {
      label: "高防牌",
      tone: "anchor",
      blurb: "它最擅长的不是表演，而是把别人绊住。",
      summonNote: `《${card.name}》防御高，先站住是在替后面的牌争时间。`,
    };
  }
  if (atk === 0 && def <= 1) {
    return {
      label: "低费牌",
      tone: "support",
      blurb: "便宜补格，重点是先把位置和节奏铺开。",
      summonNote: `《${card.name}》费用低，先占住空格通常比空过更稳。`,
    };
  }
  if (def >= 3) {
    return {
      label: "高防牌",
      tone: "anchor",
      blurb: "更像用来撑线，不像拿来抢收头。",
      summonNote: `《${card.name}》防御高，先放上去能让场面更稳。`,
    };
  }
  if (atk >= 2) {
    return {
      label: "攻击牌",
      tone: "attack",
      blurb: "它更适合拿去推节奏，不太适合长期摆着发呆。",
      summonNote: `《${card.name}》有攻击力，早点上去更容易逼出交换。`,
    };
  }
  return {
    label: "通用牌",
    tone: "support",
    blurb: "这只没有特别偏科，更适合按场面灵活安排。",
    summonNote: `《${card.name}》用途比较通用，哪里缺位就先把它补上。`,
  };
}

function disasterLaneKey(disaster) {
  if (!disaster) return "";
  if (disaster["空间"] === "天空") return "sky";
  if (disaster["空间"] === "陆地") return "land";
  if (disaster["空间"] === "水生") return "water";
  return "";
}

function disasterLaneLabel(disaster) {
  return laneLabel(disasterLaneKey(disaster));
}

function disasterKillCount(disaster) {
  const effect = disaster?.["效果"] || "";
  if (effect.includes("全部")) return Infinity;
  if (effect.includes("2名")) return 2;
  return 1;
}

function disasterCost(disaster) {
  return DISASTER_DRAW_COST;
}

function disasterPreview(disaster) {
  if (!disaster) return "这回合暂时还没有节目效果。";
  const count = disasterKillCount(disaster);
  const scope = count === Infinity ? "双方该空间全灭" : `双方该空间各倒最多 ${count} 只`;
  return `${scope}。试玩版会自动优先炸掉你这边较亏少的、对面较值钱的。`;
}

function currentTurnDisaster(player = activePlayer()) {
  return player?.turnDisaster || null;
}

function drawRandomDisaster(excludeName = "") {
  const pool = allDisasters.filter((item) => item["卡名"] !== excludeName);
  const sourcePool = pool.length ? pool : allDisasters;
  if (!sourcePool.length) return null;
  const source = sourcePool[Math.floor(Math.random() * sourcePool.length)] || null;
  return source ? makeDisasterInstance(source) : null;
}

function rollTurnDisaster(player) {
  player.turnDisaster = null;
  player.turnDisasterUsed = false;
  return player.turnDisaster;
}

function questTemplateById(id) {
  return TURN_QUESTS.find((quest) => quest.id === id) || null;
}

function makeQuestInstance(template) {
  if (!template) return null;
  return {
    ...template,
    completed: false,
    progress: {},
    startedTurn: game?.turn ?? 0,
  };
}

function currentTurnQuest(player = activePlayer()) {
  return player?.turnQuest || null;
}

function currentTurnHype(player = activePlayer()) {
  return Math.max(0, Number(player?.turnHype) || 0);
}

function resetTurnHype(player) {
  if (!player) return;
  player.turnHype = 0;
  player.turnHypeClaims = [];
  player.turnHypeRewards = [];
}

function personaById(id) {
  return AI_PERSONAS.find((item) => item.id === id) || AI_PERSONAS[0];
}

function normalizePersonaId(id) {
  return personaById(id).id;
}

function currentAIPersona() {
  return personaById(aiPersona);
}

function personaSwingFor(persona, scale = 0.2) {
  return (Math.random() - 0.5) * 2 * scale * (1 + persona.chaos);
}

function personaSwing(scale = 0.2) {
  return personaSwingFor(currentAIPersona(), scale);
}

function withAIPersona(id, callback) {
  const previous = aiPersona;
  aiPersona = normalizePersonaId(id);
  try {
    return callback();
  } finally {
    aiPersona = previous;
  }
}

function optionsAutoPersonaIdFor(playerId) {
  if (!autoPersonaContext) return null;
  return autoPersonaContext[playerId] || null;
}

function nextAIPersonaId() {
  const index = AI_PERSONAS.findIndex((item) => item.id === aiPersona);
  return AI_PERSONAS[(index + 1) % AI_PERSONAS.length]?.id || AI_PERSONAS[0].id;
}

function setAIPersona(id, announce = false) {
  const persona = personaById(id);
  aiPersona = persona.id;
  if (announce && game) {
    addLog(`AI 今天切到“${persona.label}”人格：${persona.blurb}`);
  }
  render();
}

function setAnnouncer(config) {
  if (!config) {
    announcerState = null;
    return;
  }
  announcerState = {
    tone: config.tone || "neutral",
    label: config.label || "场边播报",
    title: config.title || "",
    detail: config.detail || "",
    turn: game?.turn ?? 0,
    active: game?.active ?? 0,
    step: game?.step ?? 0,
  };
}

function flavorPick(options, salt = 0) {
  if (!options?.length) return "";
  const seed = ((game?.turn || 0) * 37 + (game?.step || 0) * 17 + (game?.active || 0) * 13 + salt) % options.length;
  return options[(seed + options.length) % options.length];
}

function summarizeAIPersonaTurn(player = game?.players?.[1] || null) {
  const persona = currentAIPersona();
  if (!player || !game) return persona.blurb;
  const hints = [];
  const disasterBeat = aiDisasterIntentScore(player, persona, { preview: true });

  if (disasterBeat.ready && persona.disasterBias > 0.35 && disasterBeat.score > disasterBeat.threshold) {
    hints.push("盯着暗置环境牌找节目效果");
  }
  if (boardCards(player).some((loc) => !activeSkillReadyError(player, loc.card)) && persona.skillBias > 0.25) {
    hints.push("想先开一手特技");
  }
  if (boardCards(player).some((loc) => moveReadyError(player, loc) === "") && persona.moveBias > 0.25) {
    hints.push("可能会突然换线阴人");
  }
  if (persona.faceBias > 0.75) hints.push("一看见空档就会冲脸");
  if (persona.summonBias > 0.15 && player.hand.length) hints.push("会优先补站场");
  return hints.slice(0, 2).join("，") || persona.blurb;
}

function recordedTurnForActor(player) {
  if (!game || !player?.name) return 0;
  let latest = 0;
  game.history.forEach((event) => {
    if (event?.actor === player.name) latest = Math.max(latest, Number(event.turn) || 0);
  });
  return latest;
}

function turnEventsForActor(player, turn = game?.turn ?? 0) {
  if (!game || !player?.name || !turn) return [];
  return game.history.filter((event) => event?.actor === player.name && event.turn === turn);
}

function aiDisasterIntentScore(player, persona = currentAIPersona(), options = {}) {
  const error = disasterReadyError(player, null, null);
  if (error) {
    return {
      ready: false,
      score: -Infinity,
      threshold: 2.75 - (persona?.disasterBias || 0) * 0.7,
      disaster: null,
      plan: null,
    };
  }
  const candidates = allDisasters
    .map((disaster) => ({ disaster, plan: disasterVictimPlan(player, disaster) }))
    .filter((item) => item.plan?.ownVictims?.length && item.plan?.enemyVictims?.length);
  if (!candidates.length) {
    return {
      ready: false,
      score: -Infinity,
      threshold: 2.75 - (persona?.disasterBias || 0) * 0.7,
      disaster: null,
      plan: null,
    };
  }
  const expected = candidates.reduce((sum, item) => {
    const plan = item.plan;
    return sum
      + plan.enemyLoss - plan.ownLoss
      + plan.enemyVictims.length * 0.7
      + (plan.enemyVictims.some((loc) => loc.card.tauntTurns > 0) ? 1.1 : 0)
      + (plan.enemyVictims.some((loc) => loc.card.skill === "天空攻击指挥官" || loc.card.skill === "海洋防御指挥官") ? 1.2 : 0);
  }, 0) / candidates.length;
  const best = [...candidates].sort((a, b) => disasterSwing(b.plan) - disasterSwing(a.plan))[0] || candidates[0];
  const score = expected - disasterCost(null) * 0.55
    + (persona?.disasterBias || 0) * 1.25
    + (options.preview ? 0 : personaSwingFor(persona || currentAIPersona(), 0.28));
  return {
    ready: true,
    score,
    threshold: 2.75 - (persona?.disasterBias || 0) * 0.7,
    disaster: best.disaster,
    plan: best.plan,
  };
}

function aiSkillIntentScore(player, loc, enemy = game?.players?.[player?.id === 0 ? 1 : 0]) {
  if (!player || !loc?.card || !enemy) return 0;
  let score = 0;
  if (loc.card.skill === "采摘" && player.hp <= 16) score = 5.5;
  if (loc.card.skill === "偷盗" && enemy.hand.length) score = 5 + enemy.hand.length * 0.3;
  if (loc.card.skill === "鹰眼") {
    if (enemy.hand.length >= 4) score = 4.2 + enemy.hand.length * 0.22;
    else if (enemy.hand.length === 3) score = 3.5;
    else score = 0;
  }
  if (loc.card.skill === "吸引" && !loc.card.tauntTurns && boardCards(enemy).some((enemyLoc) => canReach(enemyLoc.card, loc.lane))) score = 4.8;
  if (loc.card.skill === "毒牙" && !loc.card.venomStrike) score = 4.4;
  if (loc.card.skill === "百兽王吼" && enemy.board.land.filter(Boolean).length >= 1 && !enemy.status.roarThisTurn && !enemy.status.roarNextOwnTurn) {
    score = 6.2 + enemy.board.land.filter(Boolean).length;
  }
  if (loc.card.skill === "谁是百兽王？" && !loc.card.kingChallenge) score = 4.2;
  if (score <= 0) return 0;
  return Math.max(0, score - Math.max(0, skillCost(loc.card) - 1) * 0.95);
}

function buildAIDirectorBeat(player = game?.players?.[1] || null) {
  const persona = currentAIPersona();
  if (!game || !player) {
    return {
      tone: "ai",
      badge: "AI 剧本",
      title: `${persona.label} 正在待机`,
      detail: persona.blurb,
      chips: [{ label: persona.label, tone: "trick" }],
      phase: 2,
      liveCount: 0,
      latestEvent: null,
    };
  }

  const enemy = game.players[player.id === 0 ? 1 : 0];
  const activeAiTurn = vsAI && game.active === player.id;
  const preview = activeAiTurn ? buildAIPreviewSuggestion(player) : null;
  const previewWatch = activeAiTurn ? buildAIPreviewState(player, preview) : null;
  const pressureRead = activeAiTurn ? buildAIPressureRead(player, preview || previewWatch?.suggestion) : null;
  const trackedTurn = activeAiTurn ? game.turn : recordedTurnForActor(player);
  const trackedEvents = turnEventsForActor(player, trackedTurn)
    .filter((event) => event?.action !== "setup_draw" && event?.action !== "match_start");
  const liveEvents = trackedEvents.filter((event) => event?.action !== "end_turn");
  const liveCount = liveEvents.length;
  const latestEvent = liveEvents[liveEvents.length - 1] || null;
  const currentHype = currentTurnHype(player);
  const attackSources = aiLegalAttackSources(player);
  const faceAttackers = attackSources.filter((loc) => canFaceAttackNow(player, loc.card, enemy));
  const summonPreview = player.hand.length ? findBestSummonSuggestion(player) : null;
  const moveLoc = boardCards(player).find((loc) => moveReadyError(player, loc) === "") || null;
  const skillOptions = boardCards(player)
    .filter((loc) => !activeSkillReadyError(player, loc.card))
    .map((loc) => ({ loc, score: aiSkillIntentScore(player, loc, enemy) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
  const topSkill = skillOptions[0] || null;
  const disasterBeat = aiDisasterIntentScore(player, persona, { preview: true });

  let tone = "ai";
  let badge = activeAiTurn ? "AI 剧本" : "下回合脾气";
  let title = activeAiTurn ? `${persona.label} 正在盘算` : `${persona.label} 下回合还像要搞事`;
  let detail = summarizeAIPersonaTurn(player);
  let phase = 2;
  const chips = [{ label: persona.label, tone: "trick" }];

  if (activeAiTurn && aiThinking) {
    chips.push({ label: liveCount ? `已演 ${liveCount} 手` : "刚开麦", tone: "support" });
  } else if (liveCount) {
    chips.push({ label: `上回合 ${liveCount} 手`, tone: "support" });
  }

  if (disasterBeat.ready && disasterBeat.score >= disasterBeat.threshold) {
    tone = "hot";
    badge = "想炸场";
    title = "暗置环境牌像要上镜";
    detail = `它这拍更像先抽环境牌。对面现在有 ${disasterBeat.plan.enemyVictims.length} 个目标可能被环境命中，节目效果会比平时更足。`;
    phase = 2;
    chips.push({ label: `可炸 ${disasterBeat.plan.enemyVictims.length}`, tone: "attack" });
  } else if (topSkill && persona.skillBias > 0.18) {
    tone = "trick";
    badge = "想开绝活";
    title = `《${topSkill.loc.card.name}》像要先放 ${topSkill.loc.card.skill}`;
    detail = `它这拍更像先让《${topSkill.loc.card.name}》整活。${skillPreview(topSkill.loc.card.skill) || "这手通常会顺便把场面垫起来。"} `;
    phase = 2;
    chips.push({ label: `绝活 ${topSkill.loc.card.skill}`, tone: "trick" });
  } else if (moveLoc && persona.moveBias > 0.25) {
    tone = "trick";
    badge = "想绕后";
    title = `《${moveLoc.card.name}》像要换线找角度`;
    detail = "它场上已经有能换线的家伙，站位一改就可能开始阴人。";
    phase = 1;
    chips.push({ label: "可换线", tone: "trick" });
  } else if (faceAttackers.length && (enemy.hp <= 7 + persona.faceBias * 2 || persona.faceBias > 0.75)) {
    tone = "attack";
    badge = "想冲脸";
    title = "一有空档就往脸上扑";
    detail = `它场上有 ${faceAttackers.length} 只已经够得到你，血线一松就更像直接贴脸。`;
    phase = 2;
    chips.push({ label: `可冲脸 ${faceAttackers.length}`, tone: "attack" });
  } else if (attackSources.length) {
    tone = "attack";
    badge = "想清场";
    title = "更像先找你前排的麻烦";
    detail = `它场上有 ${attackSources.length} 只可出手，通常会先咬住你更值钱的前排。`;
    phase = 2;
    chips.push({ label: `可出手 ${attackSources.length}`, tone: "attack" });
  } else if (summonPreview) {
    tone = "support";
    badge = "想补站场";
    title = `《${cardNameFromUid(summonPreview.cardUid, "这只")}》像要进组`;
    detail = `它手里还有 ${player.hand.length} 张牌，这拍更像先把舞台垫起来，再等下一口发力。`;
    phase = 1;
    chips.push({ label: `手牌 ${player.hand.length}`, tone: "support" });
  } else if (player.food >= 1 && player.deck.length) {
    tone = "support";
    badge = "想翻口袋";
    title = "它像在找下一张怪招";
    detail = "这拍场上不算太热闹，先补牌会更像它现在的风格。";
    phase = 0;
    chips.push({ label: `私有 ${player.deck.length}`, tone: "support" });
  }

  if (currentHype > 0) chips.push({ label: `热度 ${currentHype}/7`, tone: "reward" });
  if (previewWatch?.suggestion) {
    chips.push({
      label: previewWatch.badge || "下一拍",
      tone: previewWatch.tone === "hot" ? "reward" : (previewWatch.tone || "ai"),
    });
  }
  if (activeAiTurn && aiThinking && latestEvent) {
    detail = `刚刚${logTitleForEvent(latestEvent)}。${detail}`.trim();
  } else if (!activeAiTurn && latestEvent) {
    detail = `上回合它刚刚${logTitleForEvent(latestEvent)}。${detail}`.trim();
  } else if (activeAiTurn && previewWatch?.detail) {
    detail = previewWatch.detail;
  }

  if (activeAiTurn && pressureRead) {
    if (pressureRead.tone === "reward") badge = pressureRead.badge || badge;
    if ((tone === "support" || tone === "ai") && pressureRead.tone) tone = pressureRead.tone;
    if (pressureRead.tail && !detail.includes(pressureRead.tail)) detail = `${detail} ${pressureRead.tail}`.trim();
    chips.push(...(pressureRead.chips || []));
  }
  const tell = buildAIPersonaTell(player, {
    persona,
    watch: previewWatch,
    pressureRead,
    suggestion: preview || previewWatch?.suggestion || null,
  });

  return {
    tone,
    badge,
    title,
    detail,
    tell,
    chips: uniquePayoffChips(chips).slice(0, 4),
    phase,
    liveCount,
    latestEvent,
    previewSuggestion: preview,
    previewWatch,
  };
}

function aiPreviewSkillSuggestion(player) {
  if (!game || !player) return null;
  const enemy = game.players[player.id === 0 ? 1 : 0];
  let best = null;
  boardCards(player).forEach((loc) => {
    const error = activeSkillReadyError(player, loc.card);
    if (error) return;
    const score = aiSkillIntentScore(player, loc, enemy);
    if (score <= 0) return;
    const candidate = {
      key: suggestionKey("ai-skill", loc.card.uid),
      kind: "skill",
      score: score + currentAIPersona().skillBias * 0.95,
      cardUid: loc.card.uid,
      label: `${loc.card.name} 放 ${loc.card.skill}`,
      note: skillPreview(loc.card.skill) || "这手通常会先把场面搅热。",
      title: `花 ${skillCost(loc.card)} 食物发动 ${loc.card.name} 的 ${loc.card.skill}。`,
    };
    if (!best || candidate.score > best.score) best = candidate;
  });
  return best;
}

function aiPreviewMoveSuggestion(player) {
  if (!game || !player || (player.turnMoves || 0) >= 1) return null;
  const persona = currentAIPersona();
  const enemy = game.players[player.id === 0 ? 1 : 0];
  let best = null;

  boardCards(player).forEach((loc) => {
    if (!canMoveCard(loc.card)) return;
    const currentTargets = legalTargetsForCardState(player, loc.card, enemy);
    moveSlotsFor(player, loc).forEach((slot) => {
      const movedCard = { ...loc.card, lane: slot.lane };
      const newTargets = legalTargetsForCardState(player, movedCard, enemy);
      const newTargetValue = newTargets.reduce((sum, target) => sum + cardValue(target.card), 0);
      const currentTargetValue = currentTargets.reduce((sum, target) => sum + cardValue(target.card), 0);
      const targetGain = newTargetValue - currentTargetValue;
      const waterGain = slot.lane === "water" && loc.lane !== "water" ? 0.9 : 0;
      const waterLoss = loc.lane === "water" && slot.lane !== "water" ? -0.75 : 0;
      const skyCommanderGain = loc.card.skill === "天空攻击指挥官" && slot.lane === "sky" && loc.lane !== "sky"
        ? boardCards(player).filter((ally) => ally.card.space === "天空" && ally.card.uid !== loc.card.uid).length * 0.95
        : 0;
      const waterCommanderGain = loc.card.skill === "海洋防御指挥官" && slot.lane === "water" && loc.lane !== "water"
        ? boardCards(player).filter((ally) => ally.card.uid !== loc.card.uid && (ally.card.space === "水生" || ally.card.space === "两栖") && ally.card.lane === "water").length * 0.8
        : 0;
      const reachUnlock = currentTargets.length === 0 && newTargets.length > 0 ? 1.6 : 0;
      const moveScore = targetGain * 0.35 + waterGain + waterLoss + skyCommanderGain + waterCommanderGain + reachUnlock + persona.moveBias * 0.8;
      if (moveScore <= 1.05 - persona.moveBias * 0.18) return;

      let candidate = {
        key: suggestionKey("move", loc.card.uid, slot.lane, String(slot.slotIndex)),
        kind: "move",
        score: moveScore,
        cardUid: loc.card.uid,
        lane: slot.lane,
        slotIndex: slot.slotIndex,
        label: `${loc.card.name} 去${laneLabel(slot.lane)}`,
        note: `先挪到${laneLabel(slot.lane)}，它的出手角度会顺很多。`,
        title: `免费让 ${loc.card.name} 从${laneLabel(loc.lane)}挪到${laneLabel(slot.lane)}，每回合限 1 次。`,
      };

      const remainingFood = player.food;
      if (canFaceAttackNow(player, movedCard, enemy, remainingFood)) {
        const faceScore = moveScore + effectiveAttack(player, movedCard) * 0.22 + (effectiveAttack(player, movedCard) >= enemy.hp ? 1.8 : 0);
        candidate = {
          key: suggestionKey("move-face", loc.card.uid, slot.lane, String(slot.slotIndex)),
          kind: "move_attack_face",
          score: faceScore,
          cardUid: loc.card.uid,
          lane: slot.lane,
          slotIndex: slot.slotIndex,
          label: `${loc.card.name} 换线冲脸`,
          note: `先挪到${laneLabel(slot.lane)}，再直接打玩家。`,
          title: "一键完成移动并攻击玩家。",
        };
      }

      legalTargetsForCard(player, movedCard, enemy, remainingFood).forEach((targetLoc) => {
        const defenseValue = targetLoc.card.state === "rest" ? 0 : effectiveDefense(enemy, targetLoc.card);
        const kill = effectiveAttack(player, movedCard) > defenseValue;
        const attackScore = moveScore + cardValue(targetLoc.card) * 0.3 + (kill ? 1.9 : 0.8);
        const movedAttack = {
          key: suggestionKey("move-hit", loc.card.uid, slot.lane, String(slot.slotIndex), targetLoc.card.uid),
          kind: "move_attack_creature",
          score: attackScore,
          cardUid: loc.card.uid,
          lane: slot.lane,
          slotIndex: slot.slotIndex,
          targetUid: targetLoc.card.uid,
          label: `${loc.card.name} 换线偷袭`,
          note: `先挪到${laneLabel(slot.lane)}，再去收《${targetLoc.card.name}》。`,
          title: "一键完成移动并攻击目标生物。",
        };
        if (!candidate || movedAttack.score > candidate.score) candidate = movedAttack;
      });

      if (!best || candidate.score > best.score) best = candidate;
    });
  });

  return best;
}

function aiPreviewRecoverSuggestion(player) {
  if (!game || !player || player.turnRecovers >= 1 || player.food < 1) return null;
  const enemy = game.players[player.id === 0 ? 1 : 0];
  const restCards = boardCards(player)
    .filter((loc) => loc.card.state === "rest")
    .sort((a, b) => cardValue(b.card) - cardValue(a.card));
  const loc = restCards[0] || null;
  if (!loc || recoverReadyError(player, loc)) return null;
  const worth = cardValue(loc.card);
  const enemyPressure = boardCards(enemy).reduce((sum, enemyLoc) => sum + effectiveAttack(enemy, enemyLoc.card), 0);
  if (worth < 5.1 && player.food <= 3) return null;
  if (worth < 4.2 && enemyPressure < player.hp * 0.6) return null;
  return {
    key: suggestionKey("recover", loc.card.uid),
    kind: "recover",
    score: worth + enemyPressure * 0.08,
    cardUid: loc.card.uid,
    label: `叫醒 ${loc.card.name}`,
    note: `先把《${loc.card.name}》复工，这只后面通常还跟得上下一拍。`,
    title: `花 1 食物，使 ${loc.card.name} 恢复为战斗状态。`,
  };
}

function aiPreviewSacrificeSuggestion(player) {
  if (!game || !player || player.turnSacrifices >= 1 || player.food > 1 + Math.max(0, currentAIPersona().sacrificeBias)) return null;
  const candidates = boardCards(player)
    .filter((loc) => loc.card.atk === 0 || cardValue(loc.card) < 2.4)
    .sort((a, b) => cardValue(a.card) - cardValue(b.card));
  const loc = candidates[0] || null;
  if (!loc) return null;
  return {
    key: suggestionKey("sacrifice", loc.card.uid),
    kind: "sacrifice",
    score: 2.4 - cardValue(loc.card) * 0.18,
    cardUid: loc.card.uid,
    label: `${loc.card.name} 换口粮`,
    note: `它像在给后面的动作凑饭，这手多少有点黑色幽默。`,
    title: `让 ${loc.card.name} 离场并获得 1 食物。`,
  };
}

function buildAIPreviewSuggestion(player = activePlayer()) {
  if (!game || !player || !vsAI || game.active !== player.id || pendingDefense) return null;
  const persona = currentAIPersona();
  const disasterBeat = aiDisasterIntentScore(player, persona, { preview: true });
  if (disasterBeat.ready && disasterBeat.score >= disasterBeat.threshold) {
    return findBestDisasterSuggestion(player) || {
      key: suggestionKey("disaster", disasterBeat.disaster?.uid || disasterBeat.disaster?.["卡名"] || "preview"),
      kind: "disaster",
      score: disasterBeat.score,
      label: "抽环境牌",
      note: "它这拍更像先炸场。",
      title: `花 ${disasterCost(null)} 食物抽暗置环境牌，抽到后自动发动。`,
    };
  }

  const skill = aiPreviewSkillSuggestion(player);
  if (skill) return skill;

  const move = aiPreviewMoveSuggestion(player);
  if (move) return move;

  const attack = findBestAttackSuggestion(player);
  if (attack) return attack;

  const recover = aiPreviewRecoverSuggestion(player);
  if (recover) return recover;

  const summon = findBestSummonSuggestion(player);
  if (summon) return summon;

  const draw = findBestDrawSuggestion(player);
  if (draw) return draw;

  return aiPreviewSacrificeSuggestion(player);
}

function buildAIPressureRead(player = activePlayer(), suggestion = buildAIPreviewSuggestion(player)) {
  if (!game || !player || !suggestion) return null;
  const summary = buildShowtimeSummary(player);
  const scoreSummary = summary.scoreSummary || buildShowtimeScoreSummary(player);
  const moment = currentHypeMoment(player, suggestion);
  const latestReward = (player.turnHypeRewards || []).slice(-1)[0] || null;
  const nextRank = nextShowtimeRankState(scoreSummary.score);
  const scoreGain = suggestionShowtimeGain(player, suggestion);
  const projectedScore = scoreSummary.score + Math.max(0, scoreGain);

  if (latestReward && moment?.nextThreshold && !moment.maxed) {
    return {
      tone: "reward",
      badge: "想续掉落",
      title: "它像还想把掉落再往上串",
      detail: `它这回合已经拿到“${latestReward.label || compactRewardLabel(latestReward, "hype")}”，多半还想再闹 ${moment.remaining} 点，把“${moment.reward?.label || "下一份奖励"}”也顺手接走。`,
      tail: "它不像满足于这口，多半还想把掉落继续往上串。",
      chips: [
        { label: `刚掉 ${compactRewardLabel(latestReward, "hype")}`, tone: "reward" },
        { label: `再闹 ${moment.remaining}`, tone: "reward" },
      ],
    };
  }
  if (moment?.crosses && !moment.maxed) {
    return {
      tone: "reward",
      badge: "想抢掉落",
      title: `它像想先抢“${moment.reward?.label || "喝彩奖励"}”`,
      detail: `它这口如果按出来，热度会先过 ${moment.nextThreshold} 线，多半就是冲着“${moment.reward?.label || "喝彩奖励"}”去的。`,
      tail: "它这拍更像是在抢这层掉落。",
      chips: [
        { label: `掉 ${compactRewardLabel(moment.reward || {}, "hype")}`, tone: "reward" },
      ],
    };
  }
  if (nextRank && projectedScore >= nextRank.min) {
    return {
      tone: nextRank.tone || "support",
      badge: "想升节目档",
      title: `它像想把节目分顶到“${nextRank.label}”`,
      detail: `这手一做完，节目分大概率会从“${scoreSummary.rank?.label || "热身"}”抬到“${nextRank.label}”。`,
      tail: "它这拍也像是在冲节目分升档。",
      chips: [
        { label: `节目档 ${nextRank.label}`, tone: nextRank.tone || "support" },
      ],
    };
  }
  return null;
}

function withAIPressureRead(state, pressureRead = null) {
  if (!state || !pressureRead) return state;
  return {
    ...state,
    badge: pressureRead.tone === "reward" ? (pressureRead.badge || state.badge) : state.badge,
    detail: pressureRead.tail ? `${state.detail || ""} ${pressureRead.tail}`.trim() : (pressureRead.detail || state.detail),
    chips: uniquePayoffChips([...(state.chips || []), ...(pressureRead.chips || [])]).slice(0, 4),
  };
}

function buildAIPersonaTell(player = activePlayer(), options = {}) {
  if (!game || !player) return "";
  const persona = options.persona || currentAIPersona();
  const watch = options.watch || null;
  const pressureRead = options.pressureRead || null;
  const suggestion = options.suggestion || watch?.suggestion || null;
  const intent = pressureRead?.badge === "想续掉落"
    ? "reward_chain"
    : pressureRead?.badge === "想抢掉落"
      ? "reward_snipe"
      : pressureRead?.badge === "想升节目档"
        ? "showtime_push"
        : suggestion?.kind === "skill"
          ? "skill"
          : suggestion?.kind === "disaster"
            ? "disaster"
            : suggestion?.kind === "attack_face"
              ? "face"
              : suggestion?.kind === "attack_creature"
                ? "clear"
                : suggestion?.kind === "move" || suggestion?.kind === "move_attack_face" || suggestion?.kind === "move_attack_creature"
                  ? "move"
                  : suggestion?.kind === "summon"
                    ? "setup"
                    : suggestion?.kind === "draw_private"
                      ? "draw"
                      : "default";
  const seed = `${game.matchId || "demo"}:${game.turn}:${game.step}:${player.id}:${persona.id}:${intent}:${pressureRead?.badge || ""}:${suggestion?.kind || ""}`;
  const generic = {
    reward_chain: [
      "它这表情通常不是拿一层就走。",
      "这拍看着像小赚，往往其实还在图后手。",
    ],
    reward_snipe: [
      "它八成已经闻到这层掉落味了。",
      "这回合它更像先把顺手的奖励拿走。",
    ],
    showtime_push: [
      "它现在图的不只是交换，更像要把这一段演到够看。",
      "它这拍更像在把这一回合的镜头做满。",
    ],
    skill: [
      "这种起手通常不是结尾，后面多半还有一句。",
      "它现在不像随手点技能，更像在给后面的坏事搭台。",
    ],
    disaster: [
      "这类按钮一亮，它通常就不打算再体面了。",
      "环境牌一旦真抽出来，后面就很少会安静。",
    ],
    face: [
      "这口要是真咬出去，气氛通常会立刻变坏。",
      "它现在不像想讲道理，更像想逼你立刻表态。",
    ],
    clear: [
      "它更像先把碍事的那只清掉，再谈别的。",
      "这类手通常是在替后面的路线腾地方。",
    ],
    move: [
      "它现在更像在找最烦人的角度。",
      "这类走位多半不是散步，是在给下一口上强度。",
    ],
    setup: [
      "它现在像在垫舞台，真正的脏活多半还在后面。",
      "这口看着老实，但通常是在给下一拍养势。",
    ],
    draw: [
      "它现在像在翻下一张更讨厌的牌。",
      "补这一张，多半是为了让下一手更像话。",
    ],
    default: [
      "它这拍像在憋一句后话。",
      "别被它现在的表情骗了，这类回合往往还有后手。",
    ],
  };
  const personaLines = {
    steady: {
      reward_chain: [
        "稳健派一旦闻到掉落味，通常会先把最稳那口拿干净。",
        "它看着不吵，但这种奖励链它往往会算得很细。",
      ],
      reward_snipe: [
        "稳健派平时不爱赌，但送到嘴边的掉落它也不会装没看见。",
      ],
      showtime_push: [
        "它像想先把这一回合演完整，再决定要不要继续凶。",
      ],
      skill: [
        "稳健派难得想先抖绝活，多半说明这口真的划算。",
      ],
      setup: [
        "它像先把台子搭稳，后面才好一口一口往前压。",
      ],
    },
    bruiser: {
      reward_chain: [
        "它平时懒得算账，但白送的投喂它也不会客气。",
      ],
      reward_snipe: [
        "这位一闻到便宜就会顺手抡过去。",
      ],
      showtime_push: [
        "它不是在讲节目感，是想顺手把场面也砸疼。",
      ],
      face: [
        "这位的礼貌差不多到此为止了，下一口很像还想往脸上补。",
      ],
      clear: [
        "它更像先把挡路的踹开，再找地方继续上嘴。",
      ],
    },
    schemer: {
      reward_chain: [
        "老六流最烦人的地方，就是它常常不只拿一层。",
        "它这种表情，通常说明后面还藏着一手。",
      ],
      reward_snipe: [
        "老六流闻到掉落味，基本不会装作没看见。",
        "它八成在假装路过，其实是冲着这口奖励来的。",
      ],
      showtime_push: [
        "它很爱把一段正常回合演成事故回放。",
      ],
      skill: [
        "老六流一抖绝活，通常只是前菜。",
      ],
      move: [
        "它现在像在找最讨厌人的角度，不太像只想走一步。",
      ],
      draw: [
        "它一补牌，往往不是缺资源，是缺一张更坏的拼图。",
      ],
    },
    戏精流: {
      reward_chain: [
        "只要观众会投喂，它就会忍不住把这一段演满。",
      ],
      reward_snipe: [
        "戏精流看到掉落线，脑子里已经响起返场音乐了。",
      ],
      showtime_push: [
        "它现在图的已经不是赢，是要把这段剪进花絮。",
      ],
      skill: [
        "这种人格只要能整活，就不太在乎别人受不受得了。",
      ],
      disaster: [
        "它要是真抽环境牌，多半还会顺手给自己配个谢幕动作。",
      ],
    },
  };
  return stablePickByKey([
    ...(personaLines[persona.id]?.[intent] || []),
    ...(generic[intent] || []),
  ], seed) || "";
}

function buildAIPreviewState(player = activePlayer(), suggestion = buildAIPreviewSuggestion(player)) {
  if (!game || !player) {
    return {
      suggestion: null,
      tone: "ai",
      badge: "AI 待机",
      title: `${currentAIPersona().label} 还没开麦`,
      detail: currentAIPersona().blurb,
      chips: [{ label: currentAIPersona().label, tone: "trick" }],
    };
  }

  const pressureRead = buildAIPressureRead(player, suggestion);
  const decorate = (state) => withAIPressureRead(state, pressureRead);

  if (!suggestion) {
    return decorate({
      suggestion: null,
      tone: "ai",
      badge: "先看起手",
      title: `${currentAIPersona().label} 还没露底`,
      detail: "它第一手交出来以后，路线条、黄标和动作区都会说得更具体。",
      chips: [{ label: currentAIPersona().label, tone: "trick" }],
    });
  }

  const actor = cardNameFromUid(suggestion.cardUid, "这只");
  const target = cardNameFromUid(suggestion.targetUid, "目标");
  const laneText = suggestion.lane ? slotLabelText(suggestion.lane, suggestion.slotIndex) : "";
  const sourceLoc = suggestion.cardUid ? findCardLocation(suggestion.cardUid) : null;
  const disaster = currentTurnDisaster(player);
  const chips = uniquePayoffChips([
    { label: currentAIPersona().label, tone: "trick" },
    ...buildSuggestionPayoffChips(player, suggestion),
  ]).slice(0, 4);

  if (suggestion.kind === "summon") {
    return decorate({
      suggestion,
      tone: "support",
      badge: "像补站场",
      title: `《${actor}》像要先进组`,
      detail: laneText ? `手牌对你隐藏，但它更像把《${actor}》落到 ${laneText}。盯那一格就够了。` : `手牌对你隐藏，但它更像先把《${actor}》摆上来。`,
      chips,
    });
  }
  if (suggestion.kind === "draw_private") {
    return decorate({
      suggestion,
      tone: "support",
      badge: "像翻口袋",
      title: "它更像先补一张",
      detail: "这一拍大多是在找拼图。补完牌之后，它下一手通常会更明确。",
      chips,
    });
  }
  if (suggestion.kind === "disaster") {
    return decorate({
      suggestion,
      tone: "hot",
      badge: "像炸场",
      title: "暗置环境牌像要先开",
      detail: "盯中间环境牌区；真按下去以后，棋盘和日志会一起大换气。",
      chips,
    });
  }
  if (suggestion.kind === "skill") {
    return decorate({
      suggestion,
      tone: "trick",
      badge: "像开绝活",
      title: `《${actor}》像要先放 ${sourceLoc?.card?.skill || "技能"}`,
      detail: `先盯《${actor}》这只。它一开技，下一拍通常就会开始带邪门味。`,
      chips,
    });
  }
  if (suggestion.kind === "attack_face") {
    return decorate({
      suggestion,
      tone: "attack",
      badge: "像冲脸",
      title: `《${actor}》像要直接压血线`,
      detail: `先盯《${actor}》这只；如果你能挡，这一下会立刻把防守组叫醒。`,
      chips,
    });
  }
  if (suggestion.kind === "attack_creature") {
    return decorate({
      suggestion,
      tone: "attack",
      badge: "像清场",
      title: `《${actor}》像要去咬《${target}》`,
      detail: `盯住红框目标《${target}》。这回合它更像先处理这只。`,
      chips,
    });
  }
  if (suggestion.kind === "move_attack_face") {
    return decorate({
      suggestion,
      tone: "trick",
      badge: "像绕后",
      title: `《${actor}》像要先挪去 ${laneText || laneLabel(suggestion.lane)}`,
      detail: "它多半会先换线，再找机会直接往脸上扑。",
      chips,
    });
  }
  if (suggestion.kind === "move_attack_creature") {
    return decorate({
      suggestion,
      tone: "trick",
      badge: "像绕后",
      title: `《${actor}》像要先挪去 ${laneText || laneLabel(suggestion.lane)}`,
      detail: `挪完更像去打《${target}》。先盯落点，再盯那只目标。`,
      chips,
    });
  }
  if (suggestion.kind === "move") {
    return decorate({
      suggestion,
      tone: "trick",
      badge: "像找角度",
      title: `《${actor}》像要先换线`,
      detail: laneText ? `它更像先去 ${laneText}。位置一变，后面的攻击路线就会更明朗。` : `它更像先给《${actor}》换个位置。`,
      chips,
    });
  }
  if (suggestion.kind === "recover") {
    return decorate({
      suggestion,
      tone: "support",
      badge: "像叫返场",
      title: `《${actor}》像要先复工`,
      detail: `先把《${actor}》叫醒，它后面才更像继续出手。`,
      chips,
    });
  }
  if (suggestion.kind === "sacrifice") {
    return decorate({
      suggestion,
      tone: "reward",
      badge: "像换口粮",
      title: `《${actor}》像要先换粮`,
      detail: "这手不体面，但通常是在给后面的动作凑饭。",
      chips,
    });
  }

  return decorate({
    suggestion,
    tone: actionCueToneForSuggestion(suggestion),
    badge: "它像先来这手",
    title: suggestion.label || "下一拍",
    detail: suggestion.note || "这一手就是它眼下最像先做的事。",
    chips,
  });
}

function buildAIPreviewRouteSteps(player = activePlayer(), watch = buildAIPreviewState(player)) {
  const suggestion = watch?.suggestion || null;
  if (!suggestion) {
    return [
      { kicker: "就现在", title: watch?.title || "先看它起手", detail: watch?.detail || "它第一手出来后，桌面的字幕会更具体。", tone: watch?.tone || "ai", active: true },
      { kicker: "留意", title: "看棋盘和日志同步跳", detail: "它每交一手，右边场地和战报都会一起更新。", tone: "ai" },
      { kicker: "轮到你", title: "等按钮重新亮起", detail: "它这回合交完之后，你的路线条会立刻切回人类模式。", tone: "support" },
    ];
  }

  const actor = cardNameFromUid(suggestion.cardUid, "这只");
  const target = cardNameFromUid(suggestion.targetUid, "目标");
  const laneText = suggestion.lane ? slotLabelText(suggestion.lane, suggestion.slotIndex) : "";

  if (suggestion.kind === "summon") {
    return [
      { kicker: "就现在", title: `它更像把《${actor}》落到 ${laneText || "发亮空格"}`, detail: "手牌对你隐藏，所以盯格子比盯手更有用。", tone: "support", active: true },
      { kicker: "看这里", title: `盯 ${laneText || "那格空位"}`, detail: "这格一亮，它多半就是先把第一只摆上来。", tone: "ai" },
      { kicker: "然后", title: "落地后再看下一拍", detail: "站场一补上，它的技能或攻击路线就会更清楚。", tone: "support" },
    ];
  }
  if (suggestion.kind === "draw_private") {
    return [
      { kicker: "就现在", title: "它更像先补一张", detail: "这一拍多数是在找下一手的拼图。", tone: "support", active: true },
      { kicker: "留意", title: "看资源和手牌数变化", detail: "手牌虽然不公开，但补完以后它的路线会更像样。", tone: "ai" },
      { kicker: "然后", title: "补完再看棋盘", detail: "它下一手更可能是补场、开技或直接动手。", tone: "support" },
    ];
  }
  if (suggestion.kind === "disaster") {
    return [
      { kicker: "就现在", title: "它更像先抽环境牌", detail: "这下多半是先冲着节目效果去的。", tone: "warning", active: true },
      { kicker: "看这里", title: "盯中间环境牌区", detail: "真正发动时，棋盘和日志会一起改口。", tone: "ai" },
      { kicker: "然后", title: "炸完立刻回看棋盘", detail: "台上的倒下名单和后续空档会马上变清楚。", tone: "support" },
    ];
  }
  if (suggestion.kind === "skill") {
    return [
      { kicker: "就现在", title: `它更像让《${actor}》先开 ${findCardLocation(suggestion.cardUid)?.card?.skill || "技能"}`, detail: "先盯这只，它一出手日志就会报效果。", tone: "trick", active: true },
      { kicker: "留意", title: `盯住《${actor}》`, detail: "这类动作往往是在给后面的攻击或任务铺路。", tone: "ai" },
      { kicker: "然后", title: "技能落地后再看下一拍", detail: "绝活一交，它的第二手通常会更露骨。", tone: "support" },
    ];
  }
  if (suggestion.kind === "attack_face") {
    return [
      { kicker: "就现在", title: `它更像让《${actor}》直接冲脸`, detail: "这下如果能挡，防守组会立刻接管。", tone: "attack", active: true },
      { kicker: "留意", title: `盯住《${actor}》`, detail: "它一亮红，就说明这只已经准备下口。", tone: "ai" },
      { kicker: "然后", title: "防守选择由你决定", detail: "如果弹出防守提示，先处理这次攻击再继续看。", tone: "support" },
    ];
  }
  if (suggestion.kind === "attack_creature") {
    return [
      { kicker: "就现在", title: `它更像让《${actor}》去打《${target}》`, detail: "先盯源头，再盯红框目标。", tone: "attack", active: true },
      { kicker: "看这里", title: `红框大概率会落在《${target}》`, detail: "这回合它更像先处理这只。", tone: "ai" },
      { kicker: "然后", title: "打完再看有没有第二口", detail: "如果它还有粮和别的生物，后面通常还会继续接。", tone: "support" },
    ];
  }
  if (suggestion.kind === "move_attack_face" || suggestion.kind === "move_attack_creature") {
    return [
      { kicker: "就现在", title: `它更像先挪《${actor}》去 ${laneText || laneLabel(suggestion.lane)}`, detail: "这一拍先看落点，不急着只盯目标。", tone: "trick", active: true },
      { kicker: "看这里", title: `先盯 ${laneText || "发亮格子"}`, detail: suggestion.kind === "move_attack_face" ? "落位以后它多半会直接冲脸。" : `落位以后更像去打《${target}》。`, tone: "ai" },
      { kicker: "然后", title: suggestion.kind === "move_attack_face" ? "再看它往脸上扑" : `再看它盯《${target}》`, detail: "这类手通常是换线后马上接第二拍。", tone: "support" },
    ];
  }
  if (suggestion.kind === "move") {
    return [
      { kicker: "就现在", title: `它更像先给《${actor}》换线`, detail: "这一步主要是在找下一口的角度。", tone: "trick", active: true },
      { kicker: "看这里", title: `盯 ${laneText || "那格新位置"}`, detail: "位置一变，后面的压力线就会更清楚。", tone: "ai" },
      { kicker: "然后", title: "挪完再看红框去哪边", detail: "它常常是先转身位，再决定咬谁。", tone: "support" },
    ];
  }
  if (suggestion.kind === "recover") {
    return [
      { kicker: "就现在", title: `它更像先把《${actor}》叫醒`, detail: "这是在给后面的出手窗口续命。", tone: "support", active: true },
      { kicker: "留意", title: `看《${actor}》从休息回战斗`, detail: "它一复工，下一拍通常就会更主动。", tone: "ai" },
      { kicker: "然后", title: "叫醒后再看它会不会继续动", detail: "这类手一般不是终点，而是铺垫。", tone: "support" },
    ];
  }
  if (suggestion.kind === "sacrifice") {
    return [
      { kicker: "就现在", title: `它更像让《${actor}》换口粮`, detail: "这手不体面，但常常是在给后面的动作凑饭。", tone: "reward", active: true },
      { kicker: "留意", title: `看《${actor}》离场`, detail: "食物一回上来，它后面的按钮就会更亮。", tone: "ai" },
      { kicker: "然后", title: "换粮后再看下一拍", detail: "通常下一手才是它真正想做的事。", tone: "support" },
    ];
  }

  return [
    { kicker: "就现在", title: watch.title || suggestion.label || "它像先来这手", detail: watch.detail || suggestion.note || "", tone: watch.tone || "ai", active: true },
    { kicker: "留意", title: "看场地和日志同步跳", detail: "它每交一手，旁边的提示都会一起更新。", tone: "ai" },
    { kicker: "轮到你", title: "等按钮重新亮起", detail: "它这回合交完后，你再重新接管。", tone: "support" },
  ];
}

function announcerFromEvent(message, event) {
  if (!game) return null;
  const action = event?.action || "";
  const target = event?.target || "";

  if (!action) {
    if (typeof message === "string" && message.startsWith("AI 开始思考")) {
      const beat = buildAIDirectorBeat(game.players[1]);
      return {
        tone: beat.tone || "ai",
        label: beat.badge || "AI 上麦",
        title: beat.title || `${currentAIPersona().label} 正在盘算`,
        detail: beat.detail || summarizeAIPersonaTurn(game.players[1]),
      };
    }
    if (typeof message === "string" && message.startsWith("AI 今天切到")) {
      return {
        tone: "ai",
        label: "人格切换",
        title: "AI 换了个脾气",
        detail: message,
      };
    }
    return null;
  }

  if (action === "match_start") {
    return {
      tone: "turn",
      label: "开局",
      title: "第一回合开打",
      detail: "先读手牌和亮格，自己决定第一只动物怎么上桌。",
    };
  }
  if (action === "end_turn") {
    const incoming = activePlayer();
    const isAIIncoming = vsAI && incoming?.id === 1;
    const beat = isAIIncoming ? buildAIDirectorBeat(incoming) : null;
    return {
      tone: isAIIncoming ? "ai" : "turn",
      label: isAIIncoming ? "AI 回合" : "轮到你了",
      title: isAIIncoming ? (beat?.title || `${currentAIPersona().label} 开始接管牌桌`) : `${incoming?.name || "当前玩家"} 可以行动了`,
      detail: isAIIncoming ? (beat?.detail || summarizeAIPersonaTurn(incoming)) : "先看手牌、食物和场上空位，再决定抽牌、落子或开打。",
    };
  }
  if (action === "guard_prompt") {
    const defense = buildPendingDefenseState();
    return {
      tone: "danger",
      label: "防守时刻",
      title: defense?.blockerLoc?.card ? "这一口先决定是否格挡" : "这口只能玩家承受",
      detail: defense?.blockerLoc?.card
        ? defense.canSwapBlocker
          ? "可以动物格挡，也可以玩家承受打击；想换格挡动物就点黄框。"
          : `动物格挡会让《${defense.blockerLoc.card.name}》承受攻击；玩家承受打击则生命 -${defense.attackValue}。`
        : `这口没有动物能格挡，只会玩家 -${defense?.attackValue || 0}。`,
    };
  }
  if (action === "creature_guard_prompt") {
    const defense = buildPendingDefenseState();
    return {
      tone: "danger",
      label: "保命选择",
      title: `先判《${defense?.targetName || "它"}》值不值 ${defense?.attackValue || 0} 血`,
      detail: defense?.venom
        ? "玩家承受打击会顺手挡掉这次附带特技。"
        : `玩家承受打击会让玩家 -${defense?.attackValue || 0} 并保住动物；让动物承受伤害会按普通战斗结算。`,
    };
  }
  if (action === "hype_reward") {
    const threshold = Number(event?.extra?.threshold) || HYPE_THRESHOLDS[0];
    return {
      tone: "hot",
      label: "热度奖励",
      title: event?.extra?.rewardHeadline || (threshold >= HYPE_THRESHOLDS[1] ? "全场开始拍桌了" : "观众开始起哄了"),
      detail: message,
    };
  }
  if (action === "quest_complete") {
    return {
      tone: "quest",
      label: "骚操作达成",
      title: `《${target || "本回合支线"}》自动领奖`,
      detail: message,
    };
  }
  if (action === "disaster_cast") {
    return {
      tone: "hot",
      label: "节目效果",
      title: `《${target || "环境牌"}》炸场`,
      detail: message,
    };
  }
  if (action === "attack_creature_kill") {
    return {
      tone: "danger",
      label: "击杀",
      title: `《${target || "目标"}》被带走了`,
      detail: message,
    };
  }
  if (action === "attack_face_guard") {
    return {
      tone: "support",
      label: "格挡成功",
      title: `《${event?.extra?.blocker || "格挡动物"}》把这口接住了`,
      detail: message,
    };
  }
  if (action === "attack_face_guard_unstoppable") {
    return {
      tone: "danger",
      label: "格挡仍漏",
      title: `《${event?.extra?.blocker || "格挡动物"}》接了，但还是漏了 ${event?.extra?.leak || 0}`,
      detail: message,
    };
  }
  if (action === "attack_creature_player_guard") {
    return {
      tone: "support",
      label: "玩家承受",
      title: `《${target || event?.extra?.targetCard || "目标"}》被硬保下来了`,
      detail: message,
    };
  }
  if (action === "attack_face" || action === "attack_face_guard" || action === "attack_face_guard_unstoppable") {
    return {
      tone: "danger",
      label: "冲脸",
      title: "有人在直接压血线",
      detail: message,
    };
  }
  if (action === "summon") {
    return {
      tone: "turn",
      label: "新选手进场",
      title: `《${target || "这只生物"}》上桌了`,
      detail: message,
    };
  }
  if (action === "move") {
    return {
      tone: "ai",
      label: "换线",
      title: `《${target || "这只生物"}》在调位`,
      detail: message,
    };
  }
  if (action === "draw_private" || action.startsWith("draw_public_")) {
    return {
      tone: "turn",
      label: "补牌",
      title: "家底又厚了一点",
      detail: message,
    };
  }
  if (action === "sacrifice") {
    return {
      tone: "danger",
      label: "口粮转换",
      title: "有人被拿去换食物了",
      detail: message,
    };
  }
  if (typeof action === "string" && action.startsWith("skill")) {
    return {
      tone: "hot",
      label: "绝活",
      title: `《${target || "这只生物"}》开始整活`,
      detail: message,
    };
  }
  return null;
}

function grantStructuredReward(player, rewardType, rewardAmount, fallbackFood = 1) {
  const amount = Number(rewardAmount) || 0;
  if (rewardType === "food") {
    player.food += amount;
    return `+${amount} 食物`;
  }
  if (rewardType === "heal") {
    const healed = Math.max(0, Math.min(20, player.hp + amount) - player.hp);
    if (healed > 0) {
      player.hp += healed;
      return `回 ${healed} 血`;
    }
    player.food += fallbackFood;
    return `生命已满，改成 +${fallbackFood} 食物`;
  }
  if (rewardType === "draw_private") {
    const card = player.deck.shift();
    if (!card) {
      player.food += fallbackFood;
      return `私有牌库空了，改成 +${fallbackFood} 食物`;
    }
    card.owner = player.id;
    player.hand.push(card);
    enforceHandLimit(player);
    return `抽到《${card.name}》`;
  }
  return "已结算";
}

function isWolfCard(card) {
  return card?.name?.includes("狼");
}

function livingCardsInLane(player, lane) {
  return player.board[lane].filter(Boolean);
}

function hasActiveCommander(player, lane) {
  if (lane === "sky") {
    return livingCardsInLane(player, "sky").some((card) => card.skill === "天空攻击指挥官");
  }
  if (lane === "water") {
    return livingCardsInLane(player, "water").some((card) => card.skill === "海洋防御指挥官");
  }
  return false;
}

function roarActive(player) {
  return !!player?.status && (player.status.roarThisTurn || (game.active === player.id && player.status.roarNextOwnTurn));
}

function roarAttackPenalty(player, card) {
  return roarActive(player) && card.space === "陆地" ? 2 : 0;
}

function roarDefensePenalty(player, card) {
  return roarActive(player) && card.space === "陆地" ? 1 : 0;
}

function commanderAttackBonus(player, card) {
  if (!card) return 0;
  if (card.space === "天空" && hasActiveCommander(player, "sky")) return 1;
  if ((card.space === "水生" || card.space === "两栖") && card.lane === "water" && hasActiveCommander(player, "water")) return 1;
  return 0;
}

function wolfPackBonus(player, card) {
  if (!isWolfCard(card)) return 0;
  const wolves = boardCards(player).filter((loc) => isWolfCard(loc.card));
  return wolves.length >= 3 ? 1 : 0;
}

function kingBuffBonus(card) {
  return card.skill === "谁是百兽王？" && card.kingChallenge ? 2 : 0;
}

function effectiveAttack(player, card) {
  if (!card) return 0;
  const base = Number(card.atk) || 0;
  const buff = commanderAttackBonus(player, card) + wolfPackBonus(player, card) + kingBuffBonus(card);
  return Math.max(0, base + buff - roarAttackPenalty(player, card));
}

function effectiveDefense(player, card) {
  if (!card) return 0;
  const base = Number(card.def) || 0;
  return Math.max(0, base + kingBuffBonus(card) - roarDefensePenalty(player, card));
}

function attackSpendCost(player, card, defender = null) {
  if (!card) return 0;
  const base = Number(card.atk) || 0;
  const effective = effectiveAttack(player, card);
  let cost = defender ? Math.max(1, base - 1) + faceAttackTax(defender) : base;
  if (effective <= 0) return cost;
  return cost;
}

function attackReadyErrorWithFood(player, card, cost, label = "攻击", availableFood = player.food) {
  if (card.state !== "ready") return `${card.name} 当前是${STATE_LABELS[card.state]}状态，不能${label}。`;
  if (card.justSummoned) return `${card.name} 本回合刚上场，不能${label}。`;
  if (effectiveAttack(player, card) <= 0) return `${card.name} 现在几乎没有攻击力，不能${label}。`;
  if (availableFood < cost) return `${player.name} 食物不足，${card.name} ${label}需要 ${cost} 食物。`;
  return "";
}

function activeSkillReadyError(player, card) {
  if (!card?.skill) return `${card?.name || "这只生物"} 没有可发动的主动技能。`;
  const info = skillInfo(card.skill);
  if (!info || info["触发方式"] !== "主动") return `${card.name} 的技能是被动效果，不用手点。`;
  if (card.state === "rest") return `${card.name} 还在休息，先让它醒一醒。`;
  if ((player.turnSkills || 0) >= 1) return `${player.name} 这回合已经发动过 1 次主动技能。`;
  if (card.skillUsedTurn === game.turn && player.id === game.active) return `${card.name} 这回合已经秀过一次特技了。`;
  const cost = skillCost(card);
  if (player.food < cost) return `${player.name} 食物不足，${card.name} 发动特技需要 ${cost} 食物。`;
  return "";
}

function availableTaunts(defender, attackerCard) {
  return boardCards(defender).filter((loc) => loc.card.tauntTurns > 0 && canReach(attackerCard, loc.lane));
}

function legalTargetsForCard(player, card, defender, availableFood = player.food) {
  const attackCost = attackSpendCost(player, card);
  if (attackReadyErrorWithFood(player, card, attackCost, "攻击", availableFood)) return [];
  const taunts = availableTaunts(defender, card);
  return boardCards(defender).filter((targetLoc) => {
    if (taunts.length && !taunts.some((loc) => loc.card.uid === targetLoc.card.uid)) return false;
    if (!canReach(card, targetLoc.lane)) return false;
    const defenseValue = targetLoc.card.state === "rest" ? 0 : effectiveDefense(defender, targetLoc.card);
    return effectiveAttack(player, card) * 2 > defenseValue || card.venomStrike;
  });
}

function canFaceAttackNow(player, card, defender, availableFood = player.food) {
  if (faceAttackReadyErrorWithFood(player, card, defender, availableFood)) return false;
  return availableTaunts(defender, card).length === 0;
}

function canAttackNow(player, loc, availableFood = player.food) {
  if (!loc?.card) return false;
  const defender = game.players[player.id === 0 ? 1 : 0];
  return canFaceAttackNow(player, loc.card, defender, availableFood) || legalTargetsForCard(player, loc.card, defender, availableFood).length > 0;
}

function killableTargetsForCard(player, card, defender, availableFood = player.food) {
  return legalTargetsForCard(player, card, defender, availableFood).filter((targetLoc) => {
    const defenseValue = targetLoc.card.state === "rest" ? 0 : effectiveDefense(defender, targetLoc.card);
    return effectiveAttack(player, card) > defenseValue;
  });
}

function canMoveAndAttack(player, loc) {
  if (moveReadyError(player, loc)) return false;
  const enemy = game.players[player.id === 0 ? 1 : 0];
  const remainingFood = Math.max(0, player.food - 1);
  return moveSlotsFor(player, loc).some((slot) => {
    const movedCard = { ...loc.card, lane: slot.lane };
    return canFaceAttackNow(player, movedCard, enemy, remainingFood) || legalTargetsForCard(player, movedCard, enemy, remainingFood).length > 0;
  });
}

function eligibleQuestPool(player) {
  if (!game || !player) return [];
  const enemy = game.players[player.id === 0 ? 1 : 0];
  const ownBoard = boardCards(player);
  return TURN_QUESTS.filter((quest) => {
    if (quest.id === "party_disaster") {
      return !!findBestDisasterSuggestion(player);
    }
    if (quest.id === "skill_show") {
      return ownBoard.some((loc) => !activeSkillReadyError(player, loc.card));
    }
    if (quest.id === "move_and_hit") {
      return ownBoard.some((loc) => canMoveAndAttack(player, loc));
    }
    if (quest.id === "sky_strike") {
      return ownBoard.some((loc) => loc.card.space === "天空" && canAttackNow(player, loc));
    }
    if (quest.id === "waterline_pressure") {
      return ownBoard.some((loc) => loc.lane === "water" && canAttackNow(player, loc));
    }
    if (quest.id === "big_game_hunter") {
      return ownBoard.some((loc) => killableTargetsForCard(player, loc.card, enemy).some((targetLoc) => targetLoc.card.level === "A"));
    }
    if (quest.id === "wolf_hunt") {
      return ownBoard.some((loc) => isWolfCard(loc.card) && killableTargetsForCard(player, loc.card, enemy).length > 0);
    }
    return false;
  });
}

function rollTurnQuest(player) {
  const previousId = player.turnQuest?.id || "";
  const pool = eligibleQuestPool(player);
  if (!pool.length) {
    player.turnQuest = null;
    return null;
  }
  const filteredPool = pool.filter((quest) => quest.id !== previousId);
  const sourcePool = filteredPool.length ? filteredPool : pool;
  const template = sourcePool[Math.floor(Math.random() * sourcePool.length)] || null;
  player.turnQuest = makeQuestInstance(template);
  return player.turnQuest;
}

function grantQuestReward(player, quest) {
  return `奖励：${grantStructuredReward(player, quest?.rewardType, quest?.rewardAmount, 1)}`;
}

function completeTurnQuest(player, quest, reasonText) {
  if (!player || !quest || quest.completed) return false;
  quest.completed = true;
  quest.completedTurn = game.turn;
  quest.completedStep = game.step + 1;
  questResolving = true;
  try {
    const rewardText = grantQuestReward(player, quest);
    addLog(`${player.name} 完成骚操作《${quest.title}》：${reasonText}。${rewardText}。`, {
      action: "quest_complete",
      actor: player.name,
      target: quest.title,
      cost: 0,
      extra: {
        questId: quest.id,
        reason: reasonText,
        rewardType: quest.rewardType,
        rewardAmount: quest.rewardAmount,
      },
    });
  } finally {
    questResolving = false;
  }
  return true;
}

function processTurnQuestEvent(event) {
  if (!game || !event || questResolving) return;
  const player = activePlayer();
  const quest = currentTurnQuest(player);
  if (!player || !quest || quest.completed) return;
  if (!quest.progress) quest.progress = {};
  const attackAction = typeof event.action === "string" && event.action.startsWith("attack_");
  const extra = event.extra || {};

  if (event.action === "move" && extra.cardUid) {
    const moved = new Set(quest.progress.movedUids || []);
    moved.add(extra.cardUid);
    quest.progress.movedUids = [...moved];
  }

  if (quest.id === "party_disaster" && event.action === "disaster_cast") {
    completeTurnQuest(player, quest, `环境牌《${event.target || "未知环境"}》成功登场`);
    return;
  }
  if (quest.id === "skill_show" && typeof event.action === "string" && event.action.startsWith("skill")) {
    completeTurnQuest(player, quest, `《${event.target || "某只生物"}》亮出了特技`);
    return;
  }
  if (quest.id === "move_and_hit" && attackAction && extra.attackerUid && (quest.progress.movedUids || []).includes(extra.attackerUid)) {
    completeTurnQuest(player, quest, `${extra.attackerCard || "这只生物"} 换线后立刻出手`);
    return;
  }
  if (quest.id === "sky_strike" && attackAction && extra.attackerSpace === "天空") {
    completeTurnQuest(player, quest, `${extra.attackerCard || "天空生物"} 完成了一次空袭`);
    return;
  }
  if (quest.id === "waterline_pressure" && attackAction && extra.attackerLane === "water") {
    completeTurnQuest(player, quest, `${extra.attackerCard || "水线生物"} 从水线发起了攻击`);
    return;
  }
  if (quest.id === "big_game_hunter" && (event.action === "attack_creature_kill" || event.action === "attack_creature_pressure_kill") && extra.targetLevel === "A") {
    completeTurnQuest(player, quest, `${extra.attackerCard || "某只生物"} 干掉了 A 类《${extra.targetCard || event.target || "目标"}》`);
    return;
  }
  if (quest.id === "wolf_hunt" && (event.action === "attack_creature_kill" || event.action === "attack_creature_pressure_kill") && extra.attackerIsWolf) {
    completeTurnQuest(player, quest, `狼种《${extra.attackerCard || "猎手"}》完成了一次击杀`);
  }
}

function hypeGainForEvent(event) {
  if (!event?.action) return 0;
  if (event.action === "summon") return 1;
  if (event.action === "move") return 1;
  if (event.action === "disaster_cast") return 3;
  if (event.action === "quest_complete") return 2;
  if (event.action === "attack_creature_kill" || event.action === "attack_creature_pressure_kill") return 2;
  if (event.action === "attack_creature_injure" || event.action === "attack_creature_venom") return 1;
  if (event.action === "attack_face" || event.action === "attack_face_guard" || event.action === "attack_face_guard_unstoppable") return 1;
  if (typeof event.action === "string" && event.action.startsWith("skill")) return 2;
  return 0;
}

function stableTextHash(value) {
  let hash = 0;
  const text = String(value || "");
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 33 + text.charCodeAt(i)) >>> 0;
  }
  return hash >>> 0;
}

function stablePickByKey(items, key) {
  if (!items?.length) return null;
  return items[stableTextHash(key) % items.length];
}

function decorateHypeReward(player, threshold, baseReward, triggerEvent = null) {
  const action = triggerEvent?.action || "";
  const attacker = triggerEvent?.extra?.attackerCard || triggerEvent?.target || "";
  const cue = activeOpeningCue(player)?.id || player?.openingCue || "freeplay";
  const seed = `${game.turn}:${game.step}:${player.id}:${threshold}:${action}:${attacker}:${cue}:${baseReward.rewardType}:${baseReward.rewardAmount}`;

  if (threshold === HYPE_THRESHOLDS[0]) {
    const variants = {
      attack: [
        { headline: "前排突然敲起铁盆", label: "观众丢来一把肉干", flavor: "你这口压得够凶，台下决定先喂你一口。", dropTone: "support" },
        { headline: "看台开始摇尖叫鸡", label: "后排传来半袋薯片", flavor: "大家觉得这手很有节目，于是先给点零食。", dropTone: "support" },
      ],
      trick: [
        { headline: "主持人差点把词忘了", label: "场记递来一小盒口粮", flavor: "刚才那下挺邪门，后台决定给你续一下命。", dropTone: "support" },
        { headline: "观众席开始乱喊安可", label: "赞助摊位塞来一包饼干", flavor: "这手虽然离谱，但居然还挺讨喜。", dropTone: "support" },
      ],
      setup: [
        { headline: "台下开始认人了", label: "粉丝会先垫了点伙食", flavor: "选手刚进组，观众已经先给你添了口粮。", dropTone: "support" },
        { headline: "观众突然举起自制灯牌", label: "看台滚来一袋坚果", flavor: "刚开场就有点像样子了，台下先赏你一口。", dropTone: "support" },
      ],
    };
    const bucket = action === "attack_creature_kill" || action === "attack_creature_pressure_kill" || action === "attack_face" || action === "attack_face_guard" || action === "attack_face_guard_unstoppable"
      ? "attack"
      : action === "disaster_cast" || String(action).startsWith("skill") || action === "move"
        ? "trick"
        : "setup";
    return {
      ...baseReward,
      ...stablePickByKey(variants[bucket], seed),
    };
  }

  if (baseReward.rewardType === "draw_private") {
    return {
      ...baseReward,
      ...stablePickByKey([
        { headline: "场记把流程本撕了一页给你", label: "后台塞来一张私房牌", flavor: "大家默认你接下来还要继续整，所以先给你一张底牌。", dropTone: "trick" },
        { headline: "前排有人把应援板翻到了背面", label: "看台滑来一张怪招小抄", flavor: "这波已经不像正常比赛了，观众决定继续拱火。", dropTone: "trick" },
      ], seed),
    };
  }
  if (baseReward.rewardType === "heal") {
    return {
      ...baseReward,
      ...stablePickByKey([
        { headline: "主持人硬夸这波是艺术", label: "全场给你回了一口气", flavor: "听完这顿胡吹，你本人都稍微振作了一点。", dropTone: "reward" },
        { headline: "观众席突然集体点头", label: "气氛把你奶回了 1 血", flavor: "这下虽然抽象，但抽象得很体面。", dropTone: "reward" },
      ], seed),
    };
  }
  return {
    ...baseReward,
    ...stablePickByKey([
      { headline: "赞助商临时开始撒料", label: "台下空投双份口粮", flavor: "这波一热闹，连后勤都忍不住给你多塞两份。", dropTone: "reward" },
      { headline: "看台边缘有人在乱发便当", label: "观众硬给你凑了两口饭", flavor: "你还没收手，台下已经先把补给续上了。", dropTone: "reward" },
    ], seed),
  };
}

function hypeRewardForTier(player, threshold, triggerEvent = null) {
  if (threshold === HYPE_THRESHOLDS[0]) {
    return decorateHypeReward(player, threshold, {
      rewardType: "food",
      rewardAmount: 1,
    }, triggerEvent);
  }
  const bigRewards = [
    {
      rewardType: "draw_private",
      rewardAmount: 1,
    },
    {
      rewardType: "heal",
      rewardAmount: 1,
    },
    {
      rewardType: "food",
      rewardAmount: 2,
    },
  ];
  return decorateHypeReward(player, threshold, bigRewards[(game.turn + player.id + game.step) % bigRewards.length], triggerEvent);
}

function triggerHypeReward(player, threshold, triggerEvent = null) {
  if (!player) return false;
  const reward = hypeRewardForTier(player, threshold, triggerEvent);
  if (!reward) return false;
  player.turnHypeClaims = [...(player.turnHypeClaims || []), threshold];
  player.turnHypeRewards = [
    ...(player.turnHypeRewards || []),
    {
      threshold,
      label: reward.label,
      headline: reward.headline,
      flavor: reward.flavor || "",
      rewardType: reward.rewardType,
      rewardAmount: reward.rewardAmount,
      tone: reward.dropTone || "reward",
    },
  ];
  hypeResolving = true;
  try {
    const payout = grantStructuredReward(player, reward.rewardType, reward.rewardAmount, 1);
    addLog(`${reward.headline}：${reward.label}，${player.name} 获得 ${payout}。${reward.flavor || ""}`, {
      action: "hype_reward",
      actor: "观众",
      target: player.name,
      cost: 0,
      extra: {
        threshold,
        rewardType: reward.rewardType,
        rewardAmount: reward.rewardAmount,
        rewardLabel: reward.label,
        rewardHeadline: reward.headline,
        rewardFlavor: reward.flavor || "",
        rewardTone: reward.dropTone || "reward",
      },
    });
  } finally {
    hypeResolving = false;
  }
  return true;
}

function processTurnHypeEvent(event) {
  if (!game || !event || hypeResolving) return;
  const player = activePlayer();
  if (!player) return;
  const gain = hypeGainForEvent(event);
  if (!gain) return;
  const before = currentTurnHype(player);
  const cap = HYPE_THRESHOLDS[HYPE_THRESHOLDS.length - 1];
  const after = Math.min(cap, before + gain);
  player.turnHype = after;
  HYPE_THRESHOLDS.forEach((threshold) => {
    const alreadyClaimed = (player.turnHypeClaims || []).includes(threshold);
    if (!alreadyClaimed && before < threshold && after >= threshold) {
      triggerHypeReward(player, threshold, event);
    }
  });
}

function buildMoveEventExtra(card, fromLane, toLane) {
  return {
    cardUid: card.uid,
    cardName: card.name,
    cardSpace: card.space,
    from: fromLane,
    to: toLane,
  };
}

function buildSummonEventExtra(card, lane, slotIndex = null) {
  return {
    cardUid: card.uid,
    cardName: card.name,
    cardSpace: card.space,
    cardLevel: card.level,
    cardAtk: Number(card.atk) || 0,
    cardDef: Number(card.def) || 0,
    cardSkill: card.skill || "",
    lane,
    slotIndex,
  };
}

function buildAttackEventExtra(attackerLoc, targetLoc = null) {
  const extra = {
    attackerUid: attackerLoc.card.uid,
    attackerCard: attackerLoc.card.name,
    attackerSpace: attackerLoc.card.space,
    attackerLane: attackerLoc.card.lane,
    attackerIsWolf: isWolfCard(attackerLoc.card),
    attackerSkill: attackerLoc.card.skill || "",
  };
  if (targetLoc?.card) {
    extra.targetUid = targetLoc.card.uid;
    extra.targetCard = targetLoc.card.name;
    extra.targetLevel = targetLoc.card.level;
    extra.targetLane = targetLoc.lane;
  }
  return extra;
}

function suggestionKey(prefix, ...parts) {
  return [prefix, ...parts.filter(Boolean)].join(":");
}

function bestSlotForSummon(player, card, slots) {
  const ranked = [...slots].sort((a, b) => {
    const score = (slot) => {
      let value = 0;
      if (card.space === "水生" && slot.lane === "water") value += 2;
      if (card.space === "两栖" && slot.lane === "water") value += 1.6;
      if (card.space === "天空" && slot.lane === "sky") value += 1.3;
      if (slot.lane === "land") value += 0.3;
      value += openingCueSlotBias(player, card, slot);
      value += slot.slotIndex === 1 ? 0.15 : 0;
      return value;
    };
    return score(b) - score(a);
  });
  return ranked[0] || null;
}

function attackSuggestionFromSource(player, sourceLoc, options = {}) {
  if (!sourceLoc?.card) return null;
  const enemy = game.players[player.id === 0 ? 1 : 0];
  const faceCost = faceAttackCost(sourceLoc.card, enemy);
  const faceReady = !options.noFace && !faceAttackReadyError(player, sourceLoc.card, enemy) && !availableTaunts(enemy, sourceLoc.card).length;
  const attackValue = effectiveAttack(player, sourceLoc.card);
  let best = null;

  if (faceReady) {
    const score = attackValue * 1.4 - faceCost * 0.35 + (attackValue >= enemy.hp ? 8 : 0);
    best = {
      key: suggestionKey("attack-face", sourceLoc.card.uid),
      kind: "attack_face",
      score,
      cardUid: sourceLoc.card.uid,
      label: `${sourceLoc.card.name} 冲脸`,
      note: attackValue >= enemy.hp ? `这一口能直接收掉 ${enemy.name}。` : `直接打 ${enemy.name}，造成 ${attackValue} 点伤害。`,
      title: `花 ${faceCost} 食物让 ${sourceLoc.card.name} 攻击玩家。`,
    };
  }

  legalCreatureTargets(sourceLoc, enemy)
    .filter((targetLoc) => !options.onlyLane || sourceLoc.lane === options.onlyLane)
    .filter((targetLoc) => !options.onlySky || sourceLoc.card.space === "天空")
    .filter((targetLoc) => !options.onlyWolf || isWolfCard(sourceLoc.card))
    .filter((targetLoc) => !options.onlyKillA || (targetLoc.card.level === "A" && attackValue > (targetLoc.card.state === "rest" ? 0 : effectiveDefense(enemy, targetLoc.card))))
    .forEach((targetLoc) => {
      const defenseValue = targetLoc.card.state === "rest" ? 0 : effectiveDefense(enemy, targetLoc.card);
      const kill = attackValue > defenseValue;
      if (options.onlyKill && !kill) return;
      const cost = attackSpendCost(player, sourceLoc.card);
      const score = cardValue(targetLoc.card) + (kill ? 3.4 : 1.25) - cost * 0.35 + (targetLoc.card.tauntTurns > 0 ? 0.7 : 0);
      const candidate = {
        key: suggestionKey("attack-creature", sourceLoc.card.uid, targetLoc.card.uid),
        kind: "attack_creature",
        score,
        cardUid: sourceLoc.card.uid,
        targetUid: targetLoc.card.uid,
        label: `${sourceLoc.card.name} 打 ${targetLoc.card.name}`,
        note: kill ? `大概率能把《${targetLoc.card.name}》直接带走。` : `先把《${targetLoc.card.name}》按到休息，更稳。`,
        title: `花 ${cost} 食物，让 ${sourceLoc.card.name} 攻击 ${targetLoc.card.name}。`,
      };
      if (!best || candidate.score > best.score) best = candidate;
    });

  if (options.onlyLane && sourceLoc.lane !== options.onlyLane) return null;
  if (options.onlySky && sourceLoc.card.space !== "天空") return null;
  if (options.onlyWolf && !isWolfCard(sourceLoc.card)) return null;
  return best;
}

function findBestAttackSuggestion(player, options = {}) {
  const chosen = options.preferredUid ? findCardLocation(options.preferredUid) : null;
  const sources = chosen?.type === "board" && chosen.player.id === player.id ? [chosen] : boardCards(player);
  let best = null;
  sources.forEach((sourceLoc) => {
    const candidate = attackSuggestionFromSource(player, sourceLoc, options);
    if (candidate && (!best || candidate.score > best.score)) best = candidate;
  });
  return best;
}

function findBestSummonSuggestion(player) {
  const chosen = currentSelectedHand(player);
  const hand = chosen ? [chosen.card] : player.hand;
  let best = null;
  hand.forEach((card) => {
    const role = inferCardRole(card);
    const cost = summonCost(card);
    if (player.food < cost) return;
    const slots = emptySlotsFor(player, card);
    if (!slots.length) return;
    const slot = bestSlotForSummon(player, card, slots);
    if (!slot) return;
    const openingBonus = boardCards(player).length === 0 ? 1.4 : 0;
    const selectedBonus = chosen?.card?.uid === card.uid ? 1.2 : 0;
    const cueBonus = openingCueSummonBonus(player, card, slot);
    const tempoBonus = summonTempoAdjustment(player, card, slot);
    const score = cardValue(card) - cost * 0.45 + openingBonus + selectedBonus + cueBonus + tempoBonus - summonHeuristicPenalty(card);
    const candidate = {
      key: suggestionKey("summon", card.uid, slot.lane, String(slot.slotIndex)),
      kind: "summon",
      score,
      cardUid: card.uid,
      lane: slot.lane,
      slotIndex: slot.slotIndex,
      label: `上 ${card.name}`,
      note: openingCueSummonNote(player, card, slot)
        || role.summonNote
        || (tempoBonus >= 0.2
          ? `这只一上去就更像在推进场面，不容易把节奏聊死。`
          : `${laneLabel(slot.lane)}空间现在最顺手，上去就能开始站场。`),
      title: `花 ${cost} 食物，把 ${card.name} 放到${laneLabel(slot.lane)}。`,
    };
    if (!best || candidate.score > best.score) best = candidate;
  });
  return best;
}

function skillSuggestionScore(player, loc) {
  const enemy = game.players[player.id === 0 ? 1 : 0];
  let score = 3;
  if (loc.card.skill === "采摘") score = player.hp <= 17 ? 5.2 : 2.2;
  if (loc.card.skill === "偷盗") score = enemy.hand.length ? 5 + enemy.hand.length * 0.25 : 0;
  if (loc.card.skill === "鹰眼") {
    if (enemy.hand.length >= 4) score = 4.1 + enemy.hand.length * 0.2;
    else if (enemy.hand.length === 3) score = 3.4;
    else score = 0;
  }
  if (loc.card.skill === "吸引") score = !loc.card.tauntTurns && boardCards(enemy).some((enemyLoc) => canReach(enemyLoc.card, loc.lane)) ? 4.3 : 0;
  if (loc.card.skill === "毒牙") score = !loc.card.venomStrike ? 4.7 : 0;
  if (loc.card.skill === "百兽王吼") score = enemy.board.land.filter(Boolean).length ? 6 + enemy.board.land.filter(Boolean).length * 0.5 : 0;
  if (loc.card.skill === "谁是百兽王？") score = !loc.card.kingChallenge ? 4.1 : 0;
  if (score <= 0) return 0;
  return Math.max(0, score - Math.max(0, skillCost(loc.card) - 1) * 0.9);
}

function findBestSkillSuggestion(player) {
  const chosen = currentSelectedBoard(player);
  const sources = chosen ? [chosen] : boardCards(player);
  let best = null;
  sources.forEach((loc) => {
    const error = activeSkillReadyError(player, loc.card);
    if (error) return;
    const candidate = {
      key: suggestionKey("skill", loc.card.uid),
      kind: "skill",
      score: skillSuggestionScore(player, loc),
      cardUid: loc.card.uid,
      label: `${loc.card.name} 放 ${loc.card.skill}`,
      note: skillPreview(loc.card.skill) || "这招通常能让场面更顺。",
      title: `花 ${skillCost(loc.card)} 食物发动 ${loc.card.name} 的 ${loc.card.skill}。`,
    };
    if (!best || candidate.score > best.score) best = candidate;
  });
  return best;
}

function findBestDisasterSuggestion(player) {
  const error = disasterReadyError(player, null, null);
  if (error) return null;
  const candidates = allDisasters
    .map((disaster) => ({ disaster, plan: disasterVictimPlan(player, disaster) }))
    .filter((item) => item.plan?.ownVictims?.length && item.plan?.enemyVictims?.length);
  if (!candidates.length) return null;
  const best = [...candidates].sort((a, b) => disasterSwing(b.plan) - disasterSwing(a.plan))[0] || candidates[0];
  const expected = candidates.reduce((sum, item) => sum + disasterSwing(item.plan), 0) / candidates.length;
  const value = expected - Math.max(0, disasterCost(null) - 1) * 0.6;
  if (value < 1) return null;
  return {
    key: suggestionKey("disaster", "hidden", String(player.turnDisasterUsed)),
    kind: "disaster",
    score: value,
    label: "抽环境牌",
    note: `当前场面有环境牌命中窗口，最好情况会影响${disasterLaneLabel(best.disaster)}空间。`,
    title: `花 ${disasterCost(null)} 食物抽 1 张暗置环境牌，抽到后自动发动。`,
  };
}

function findBestDrawSuggestion(player) {
  if (player.food < 1 || !player.deck.length) return null;
  const urgency = player.hand.length <= 2 ? 4.5 : player.hand.length <= 4 ? 3.2 : 1.8;
  const cue = activeOpeningCue(player);
  return {
    key: suggestionKey("draw", "private"),
    kind: "draw_private",
    score: urgency + currentAIPersona().drawBias * 0.3 + openingCueDrawBonus(player),
    label: "补一张私有牌",
    note: cue?.id === "pocket"
      ? "这手起手更像缺一块拼图。先翻口袋，后面的落点和绝活会清楚很多。"
      : player.hand.length <= 2
        ? "手快空了，先把手牌厚度补回来。"
        : "先摸一张，后面能选的路会多不少。",
    title: "花 1 食物抽 1 张私有牌。",
  };
}

function projectedHypeAfterSuggestion(player, suggestion) {
  const current = currentTurnHype(player);
  if (!suggestion) return current;
  const gainByKind = {
    summon: 1,
    skill: 2,
    disaster: 3,
    attack_face: 1,
    attack_creature: 2,
    draw_private: 0,
    draw_public_A: 0,
    draw_public_B: 0,
    draw_public_C: 0,
    move_attack_face: 2,
    move_attack_creature: 3,
    move: 0,
    recover: 0,
    sacrifice: 0,
    end_turn: 0,
    defense_block: 0,
    defense_pass: 0,
    creature_guard: 0,
    creature_pass: 0,
  };
  return Math.min(HYPE_THRESHOLDS[HYPE_THRESHOLDS.length - 1], current + (gainByKind[suggestion.kind] || 0));
}

function currentHypeMoment(player = activePlayer(), suggestion = currentPrimarySuggestion()) {
  if (!player) return null;
  const current = currentTurnHype(player);
  const max = HYPE_THRESHOLDS[HYPE_THRESHOLDS.length - 1];
  const nextThreshold = HYPE_THRESHOLDS.find((value) => !(player.turnHypeClaims || []).includes(value) && current < value) || null;
  const reward = nextThreshold ? hypeRewardForTier(player, nextThreshold) : null;
  const projected = suggestion ? projectedHypeAfterSuggestion(player, suggestion) : current;
  const remaining = nextThreshold ? nextThreshold - current : 0;
  const crosses = !!suggestion && !!nextThreshold && projected >= nextThreshold;
  const near = !!nextThreshold && remaining <= 2;
  const maxed = current >= max;
  return {
    current,
    max,
    nextThreshold,
    reward,
    projected,
    remaining,
    crosses,
    near,
    maxed,
    suggestion,
  };
}

function nextHypeRewardState(player, options = {}) {
  if (!player) return null;
  const current = Number.isFinite(options.current) ? options.current : currentTurnHype(player);
  const afterThreshold = Math.max(0, Number(options.afterThreshold) || 0);
  const assumedClaims = Array.isArray(options.assumedClaims) ? options.assumedClaims : [];
  const claimed = new Set([...(player.turnHypeClaims || []), ...assumedClaims]);
  const threshold = HYPE_THRESHOLDS.find((value) => value > afterThreshold && !claimed.has(value)) || null;
  if (!threshold) return null;
  return {
    threshold,
    reward: hypeRewardForTier(player, threshold),
    remaining: Math.max(0, threshold - current),
  };
}

function buildHypeRewardSteps(player = activePlayer(), moment = currentHypeMoment(player)) {
  if (!player || !moment) return [];
  const claimedThresholds = new Set(player.turnHypeClaims || []);
  return HYPE_THRESHOLDS.map((threshold) => {
    const claimedReward = (player.turnHypeRewards || []).find((item) => item.threshold === threshold) || null;
    const previewReward = claimedReward || hypeRewardForTier(player, threshold);
    const claimed = claimedThresholds.has(threshold);
    const isNext = moment.nextThreshold === threshold;
    const futureRemaining = Math.max(0, threshold - moment.projected);
    const followUp = nextHypeRewardState(player, {
      afterThreshold: threshold,
      assumedClaims: !claimed && isNext && moment.crosses ? [threshold] : [],
      current: claimed ? moment.current : moment.projected,
    });
    let badge = `${threshold} 热度线`;
    let status = `差 ${Math.max(0, threshold - moment.current)}`;
    let tone = previewReward?.tone || previewReward?.dropTone || "support";
    let state = "future";
    let detail = claimedReward?.headline || previewReward?.headline || "";

    if (claimed) {
      status = "已掉";
      state = "claimed";
      tone = previewReward?.tone || previewReward?.dropTone || "reward";
      detail = followUp
        ? `${detail}${detail ? "。" : ""}已经买账，再闹 ${followUp.remaining} 点会轮到“${followUp.reward?.label || "下一份奖励"}”。`
        : `${detail}${detail ? "。" : ""}上层已经掉完，后面就只剩纯节目效果。`;
    } else if (isNext && moment.crosses) {
      status = "这手掉";
      state = "ready";
      tone = "reward";
      if (followUp) detail = `${detail}${detail ? "。" : ""}这份一掉，再闹 ${followUp.remaining} 点就会轮到“${followUp.reward?.label || "下一份奖励"}”。`;
    } else if (isNext) {
      status = `差 ${moment.remaining}`;
      state = moment.near ? "near" : "future";
      tone = moment.near ? "reward" : tone;
      detail = `${detail}${detail ? "。" : ""}再闹 ${moment.remaining} 点就轮到这份。`;
    } else if (moment.crosses && threshold > (moment.nextThreshold || 0)) {
      status = `掉完还差 ${futureRemaining}`;
      state = "future";
      tone = "trick";
      detail = `${detail}${detail ? "。" : ""}前一层掉完以后，这层还差 ${futureRemaining} 点。`;
    }

    return {
      threshold,
      badge,
      status,
      title: previewReward?.label || compactRewardLabel(previewReward, "hype"),
      detail,
      tone,
      state,
    };
  });
}

function findBestMoveAttackSuggestion(player, options = {}) {
  if (player.food < 1 || (player.turnMoves || 0) >= 1) return null;
  const chosen = options.preferredUid ? findCardLocation(options.preferredUid) : null;
  const sources = chosen?.type === "board" && chosen.player.id === player.id ? [chosen] : boardCards(player);
  const enemy = game.players[player.id === 0 ? 1 : 0];
  let best = null;
  sources.forEach((loc) => {
    if (moveReadyError(player, loc)) return;
    moveSlotsFor(player, loc).forEach((slot) => {
      const movedCard = { ...loc.card, lane: slot.lane };
      const remainingFood = player.food;
      const faceReady = canFaceAttackNow(player, movedCard, enemy, remainingFood);
      const creatureTargets = legalTargetsForCard(player, movedCard, enemy, remainingFood);
      let candidate = null;
      if (faceReady) {
        const attackValue = effectiveAttack(player, movedCard);
        candidate = {
          key: suggestionKey("move-face", loc.card.uid, slot.lane, String(slot.slotIndex)),
          kind: "move_attack_face",
          score: attackValue * 1.3 - 0.3,
          cardUid: loc.card.uid,
          lane: slot.lane,
          slotIndex: slot.slotIndex,
          label: `${loc.card.name} 换线冲脸`,
          note: `先挪到${laneLabel(slot.lane)}，再直接打玩家。`,
          title: "一键完成移动并攻击玩家。",
        };
      }
      creatureTargets.forEach((targetLoc) => {
        const attackValue = effectiveAttack(player, movedCard);
        const defenseValue = targetLoc.card.state === "rest" ? 0 : effectiveDefense(enemy, targetLoc.card);
        const kill = attackValue > defenseValue;
        const challenger = {
          key: suggestionKey("move-hit", loc.card.uid, slot.lane, String(slot.slotIndex), targetLoc.card.uid),
          kind: "move_attack_creature",
          score: cardValue(targetLoc.card) + (kill ? 3.5 : 1.2),
          cardUid: loc.card.uid,
          lane: slot.lane,
          slotIndex: slot.slotIndex,
          targetUid: targetLoc.card.uid,
          label: `${loc.card.name} 换线偷袭`,
          note: `先挪到${laneLabel(slot.lane)}，再去收《${targetLoc.card.name}》。`,
          title: "一键完成移动并攻击目标生物。",
        };
        if (!candidate || challenger.score > candidate.score) candidate = challenger;
      });
      if (candidate && (!best || candidate.score > best.score)) best = candidate;
    });
  });
  return best;
}

function bestDefenseSuggestion() {
  if (!pendingDefense || !canHumanResolveDefense()) return [];
  if (pendingDefense.kind === "face") {
    const defender = defendingPlayer();
    const attackerLoc = attackerFromPendingDefense();
    const blockers = legalFaceBlockers(attackerLoc, defender)
      .filter((loc) => defender.food >= faceBlockCost(defender, loc))
      .sort((a, b) => cardValue(a.card) - cardValue(b.card));
    if (blockers.length) {
      return [
        {
          key: suggestionKey("defense-block", blockers[0].card.uid),
          kind: "defense_block",
          blockerUid: blockers[0].card.uid,
          label: `让 ${blockers[0].card.name} 格挡`,
          note: `先用代价最低的动物接下这次攻击。`,
          title: `${blockers[0].card.name} 会替你吃这一下。`,
          score: 6,
        },
        {
          key: suggestionKey("defense-pass"),
          kind: "defense_pass",
          label: "这口先挨了",
          note: "如果这只生物太贵，直接掉血可能更值。",
          title: "不派动物格挡，直接让玩家承受伤害。",
          score: 3,
        },
      ];
    }
    return [
      {
        key: suggestionKey("defense-pass"),
        kind: "defense_pass",
        label: "只能硬吃",
        note: "现在没有合法格挡动物，只能先扛住这一下。",
        title: "没有能挡的生物，直接结算伤害。",
        score: 5,
      },
    ];
  }
  const attackerLoc = attackerFromPendingDefense();
  const targetLoc = defendingTargetCreature();
  const guardScore = creatureGuardDecisionScore(attackerLoc, targetLoc);
  const snapshot = creatureGuardSnapshot(attackerLoc, targetLoc);
  const worthGuarding = guardScore > 1.15;
  const dangerText = snapshot?.dies
    ? "这一下大概率会直接带走它。"
    : snapshot?.rests
      ? "这一下多半会把它按进休息。"
      : "这一下对它的长期影响没那么大。";
  const guardNote = worthGuarding
    ? `${dangerText} 这只后续价值还在，让玩家承受这次打击通常更赚。`
    : `${dangerText} 这只当前更像过渡位，除非你很想留它。`;
  const passNote = worthGuarding
    ? "如果你想保血线，也可以故意放掉，留后手再重铺。"
    : "这只现在不太值你掉这么多血，通常直接放掉更省。";
  const guardItem = {
    key: suggestionKey("creature-guard", targetLoc?.card?.uid),
    kind: "creature_guard",
    label: `玩家承受打击保 ${targetLoc?.card?.name || "它"}`,
    note: guardNote,
    title: "由玩家承受伤害，保住目标动物。",
    score: worthGuarding ? 5.8 : 3.1,
  };
  const passItem = {
    key: suggestionKey("creature-pass"),
    kind: "creature_pass",
    label: "让动物承受伤害",
    note: passNote,
    title: "按普通战斗结算。",
    score: worthGuarding ? 3.4 : 5.5,
  };
  return worthGuarding ? [guardItem, passItem] : [passItem, guardItem];
}

function bestQuestSuggestion(player, quest) {
  if (!quest || quest.completed) return null;
  if (quest.id === "party_disaster") return findBestDisasterSuggestion(player);
  if (quest.id === "skill_show") return findBestSkillSuggestion(player);
  if (quest.id === "move_and_hit") return findBestMoveAttackSuggestion(player);
  if (quest.id === "sky_strike") return findBestAttackSuggestion(player, { onlySky: true });
  if (quest.id === "waterline_pressure") return findBestAttackSuggestion(player, { onlyLane: "water" });
  if (quest.id === "big_game_hunter") return findBestAttackSuggestion(player, { onlyKillA: true });
  if (quest.id === "wolf_hunt") return findBestAttackSuggestion(player, { onlyWolf: true, onlyKill: true });
  return null;
}

function applySelectedBoardFocusToSuggestion(player, selectedBoard, suggestion) {
  if (!player || !selectedBoard?.card || !suggestion || suggestion.cardUid !== selectedBoard.card.uid) return suggestion;
  const bonusByKind = {
    skill: 1.45,
    attack_face: 1.2,
    attack_creature: 1.2,
    move_attack_face: 1.55,
    move_attack_creature: 1.55,
    recover: 1.3,
    move: 1.05,
    sacrifice: 0.55,
  };
  const bonus = bonusByKind[suggestion.kind] || 0.85;
  return {
    ...suggestion,
    score: (suggestion.score || 0) + bonus,
    selectedFocus: true,
  };
}

function finalizePlaybookSuggestion(player, selectedBoard, suggestion) {
  if (!suggestion) return null;
  suggestion = applySelectedBoardFocusToSuggestion(player, selectedBoard, suggestion);
  const projected = projectedHypeAfterSuggestion(player, suggestion);
  const current = currentTurnHype(player);
  const nextThreshold = HYPE_THRESHOLDS.find((value) => current < value && projected >= value);
  if (!nextThreshold) return suggestion;
  const reward = hypeRewardForTier(player, nextThreshold);
  return {
    ...suggestion,
    score: (suggestion.score || 0) + 1.6,
    ribbon: suggestion.ribbon || "冲奖",
    note: `${suggestion.note} 这步还能把热度推到 ${nextThreshold}，顺手拿“${reward?.label || "喝彩奖励"}”。`,
  };
}

function buildSelectedBoardPrimarySuggestion(player, selectedBoard, fallbackSuggestion = null) {
  if (!player || !selectedBoard?.card) return null;

  const candidates = uniqueSuggestions([
    findBestSkillSuggestion(player),
    findBestMoveAttackSuggestion(player, { preferredUid: selectedBoard.card.uid }),
    findBestAttackSuggestion(player, { preferredUid: selectedBoard.card.uid }),
    buildRecoverCueSuggestion(player, selectedBoard),
    buildMoveCueSuggestion(player, selectedBoard),
    buildSacrificeCueSuggestion(player, selectedBoard),
  ].filter(Boolean))
    .map((suggestion) => finalizePlaybookSuggestion(player, selectedBoard, suggestion))
    .sort((a, b) => (b.score || 0) - (a.score || 0));

  const best = candidates[0] || null;
  if (!best) return null;

  if (["skill", "attack_face", "attack_creature", "move_attack_face", "move_attack_creature", "recover"].includes(best.kind)) {
    return best;
  }

  if (best.kind === "move") {
    return (best.score || 0) >= Math.max(2.2, (fallbackSuggestion?.score || 0) - 1.3) ? best : null;
  }

  if (best.kind === "sacrifice") {
    const emergencyWindow = player.food <= 1 || fallbackSuggestion?.kind === "end_turn";
    return emergencyWindow && (best.score || 0) >= Math.max(1.4, (fallbackSuggestion?.score || 0) - 0.85) ? best : null;
  }

  return null;
}

function uniqueSuggestions(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item?.key || seen.has(item.key)) return false;
    seen.add(item.key);
    return true;
  });
}

function buildPlaybookSuggestions() {
  if (!game) return [];
  if (pendingDiscard) return [];
  if (pendingDefense) return isOnlineMode() && !onlineCanControlCurrentDecision() ? [] : bestDefenseSuggestion();
  if (isOnlineMode() && !onlineCanControlCurrentDecision()) return [];
  if (vsAI && game.active === 1) return [];

  const player = activePlayer();
  const quest = currentTurnQuest(player);
  const cue = activeOpeningCue(player);
  const suggestions = [];
  const questSuggestion = bestQuestSuggestion(player, quest);
  if (questSuggestion) {
    suggestions.push({
      ...questSuggestion,
      score: (questSuggestion.score || 0) + 4,
      ribbon: "任务线",
      note: `${questSuggestion.note} 做完这步立刻拿${quest?.rewardLabel || "奖励"}。`,
    });
  }

  const selectedHand = currentSelectedHand(player);
  const selectedBoard = currentSelectedBoard(player);

  suggestions.push(findBestDisasterSuggestion(player));
  suggestions.push(findBestSkillSuggestion(player));
  suggestions.push(findBestMoveAttackSuggestion(player, selectedBoard ? { preferredUid: selectedBoard.card.uid } : {}));
  suggestions.push(findBestAttackSuggestion(player, selectedBoard ? { preferredUid: selectedBoard.card.uid } : {}));
  suggestions.push(findBestSummonSuggestion(player));
  suggestions.push(findBestDrawSuggestion(player));
  if (selectedBoard) {
    suggestions.push(buildRecoverCueSuggestion(player, selectedBoard));
    suggestions.push(buildMoveCueSuggestion(player, selectedBoard));
    suggestions.push(buildSacrificeCueSuggestion(player, selectedBoard));
  }

  if (!selectedHand && !selectedBoard && !boardCards(player).length && player.hand.length) {
    const opener = findBestSummonSuggestion(player);
    const draw = findBestDrawSuggestion(player);
    if (opener) opener.score += cue?.id === "pocket" ? 0.4 : 2.5;
    if (draw && cue?.id === "pocket") draw.score += 1.1;
  }

  if (!selectedHand && !selectedBoard && boardCards(player).length && player.food <= 1) {
    const draw = findBestDrawSuggestion(player);
    if (draw) draw.score -= 1;
  }

  const rankedSuggestions = uniqueSuggestions(suggestions.filter(Boolean))
    .map((suggestion) => finalizePlaybookSuggestion(player, selectedBoard, suggestion))
    .sort((a, b) => (b.score || 0) - (a.score || 0));

  const selectedPrimary = selectedBoard ? buildSelectedBoardPrimarySuggestion(player, selectedBoard, rankedSuggestions[0] || null) : null;
  let finalList = selectedPrimary
    ? [
      selectedPrimary,
      ...rankedSuggestions.filter((item) => item.key !== selectedPrimary.key),
    ]
    : rankedSuggestions;

  finalList = finalList.slice(0, 3);

  if (!selectedPrimary && selectedBoard && finalList.length > 1) {
    const focusedPrimary = finalList.find((item) => item?.selectedFocus);
    const currentPrimary = finalList[0] || null;
    if (
      focusedPrimary
      && currentPrimary
      && focusedPrimary.key !== currentPrimary.key
      && (focusedPrimary.score || 0) >= Math.max(2, (currentPrimary.score || 0) - 1.75)
    ) {
      return [
        focusedPrimary,
        ...finalList.filter((item) => item.key !== focusedPrimary.key),
      ].slice(0, 3);
    }
  }

  if (!finalList.length && game.winner === null) {
    return [
      {
        key: suggestionKey("end-turn"),
        kind: "end_turn",
        score: 1,
        label: "先结束回合",
        note: "这回合值得做的动作不多，留资源给下一轮。",
        title: "结束回合。",
      },
    ];
  }
  return finalList;
}

function runPlaybookSuggestion(suggestion) {
  if (!suggestion || game.winner !== null) return false;
  if (suggestion.kind === "defense_block") {
    pendingDefense.selectedBlockerUid = suggestion.blockerUid;
    return resolveDefenseDecision(true);
  }
  if (suggestion.kind === "defense_pass" || suggestion.kind === "creature_pass") {
    return resolveDefenseDecision(false);
  }
  if (suggestion.kind === "creature_guard") {
    return resolveDefenseDecision(true);
  }
  if (suggestion.kind === "draw_private") {
    drawFromDeck(activePlayer(), true);
    render();
    return true;
  }
  if (suggestion.kind === "disaster") {
    const ok = useTurnDisaster();
    render();
    return ok;
  }
  if (suggestion.kind === "skill") {
    const loc = findCardLocation(suggestion.cardUid);
    if (!loc) return false;
    const ok = useSkillFromLocation(loc);
    render();
    return ok;
  }
  if (suggestion.kind === "summon") {
    const loc = findCardLocation(suggestion.cardUid);
    if (!loc || loc.type !== "hand") return false;
    selected = { type: "hand", uid: loc.card.uid, playerId: loc.player.id };
    summonSelected(suggestion.lane, suggestion.slotIndex);
    return true;
  }
  if (suggestion.kind === "attack_face") {
    const loc = findCardLocation(suggestion.cardUid);
    if (!loc) return false;
    const ok = resolveDirectPlayerAttack(loc);
    render();
    return ok;
  }
  if (suggestion.kind === "attack_creature") {
    const loc = findCardLocation(suggestion.cardUid);
    const targetLoc = findCardLocation(suggestion.targetUid);
    if (!loc || !targetLoc) return false;
    const ok = resolveDirectCreatureAttack(loc, targetLoc);
    render();
    return ok;
  }
  if (suggestion.kind === "move_attack_face" || suggestion.kind === "move_attack_creature") {
    const loc = findCardLocation(suggestion.cardUid);
    if (!loc) return false;
    selected = { type: "board", uid: loc.card.uid, playerId: loc.player.id, lane: loc.lane, slotIndex: loc.slotIndex };
    const moved = moveSelected(suggestion.lane, suggestion.slotIndex);
    if (!moved) return false;
    const movedLoc = findCardLocation(suggestion.cardUid);
    if (!movedLoc) return false;
    const ok = suggestion.kind === "move_attack_face"
      ? resolveDirectPlayerAttack(movedLoc)
      : resolveDirectCreatureAttack(movedLoc, findCardLocation(suggestion.targetUid));
    render();
    return ok;
  }
  if (suggestion.kind === "end_turn") {
    endTurn();
    return true;
  }
  return false;
}

function currentPrimarySuggestion() {
  if (!game || (vsAI && game.active === 1 && !pendingDefense)) return null;
  return buildPlaybookSuggestions()[0] || null;
}

function playbookBadgeText(suggestion, index = 0) {
  if (!suggestion) return index === 0 ? "推荐" : "备选";
  const cue = activeOpeningCue(activePlayer());
  if (suggestion.ribbon === "任务线") return "顺手领奖";
  if (suggestion.ribbon === "冲奖") {
    const player = activePlayer();
    const current = player ? currentTurnHype(player) : 0;
    const nextThreshold = player ? HYPE_THRESHOLDS.find((value) => current < value && !(player.turnHypeClaims || []).includes(value)) : null;
    if (nextThreshold) {
      const remaining = nextThreshold - current;
      if (remaining === 1) return "差1点";
      return `冲${nextThreshold}`;
    }
    return "冲热度";
  }
  if (suggestion.selectedFocus) return index === 0 ? "就这只" : "接着演";
  if (suggestion.kind === "draw_private" && cue?.id === "pocket") return "先翻口袋";
  if (suggestion.kind === "summon" && cue?.id === "waterline") return "抢水位";
  if (suggestion.kind === "summon" && cue?.id === "highground") return "占高位";
  if (suggestion.kind === "summon" && cue?.id === "landrush") return index === 0 ? "先铺陆" : "补陆线";
  if (suggestion.kind === "summon") return index === 0 ? "先落地" : "补站场";
  if (suggestion.kind === "disaster") return "炸一下";
  if (suggestion.kind === "skill") return "开绝活";
  if (suggestion.kind === "attack_face") return "压血线";
  if (suggestion.kind === "attack_creature") return "先清场";
  if (suggestion.kind === "move_attack_face" || suggestion.kind === "move_attack_creature") return "绕后";
  if (suggestion.kind === "draw_private") return "补家底";
  if (suggestion.kind === "draw_public_A") return "抽强牌";
  if (suggestion.kind === "draw_public_B") return "抽中牌";
  if (suggestion.kind === "draw_public_C") return "抽小牌";
  if (suggestion.kind === "move") return "换线";
  if (suggestion.kind === "recover") return "复工";
  if (suggestion.kind === "sacrifice") return "开饭";
  if (suggestion.kind === "end_turn") return "先别贪";
  if (suggestion.kind === "defense_block") return "挡一下";
  if (suggestion.kind === "creature_guard") return "玩家承受";
  if (suggestion.kind === "defense_pass" || suggestion.kind === "creature_pass") return "硬吃";
  return index === 0 ? "主秀" : "备选";
}

function guidePrimaryLabel(suggestion) {
  if (!suggestion) return "这回合先自己来";
  if (suggestion.kind === "summon") return `上 ${cardNameFromUid(suggestion.cardUid, "这只")}`;
  if (suggestion.kind === "draw_private") return suggestion.note?.includes("翻口袋") ? "先翻口袋" : "补 1 张牌";
  if (suggestion.kind === "disaster") return "抽环境牌";
  if (suggestion.kind === "skill") return `开 ${cardNameFromUid(suggestion.cardUid, "这只")} 的绝活`;
  if (suggestion.kind === "attack_face") return `${cardNameFromUid(suggestion.cardUid, "它")} 冲脸`;
  if (suggestion.kind === "attack_creature") return `打 ${cardNameFromUid(suggestion.targetUid, "目标")}`;
  if (suggestion.kind === "move_attack_face" || suggestion.kind === "move_attack_creature") return suggestion.label || "换线出手";
  if (suggestion.kind === "defense_block") return `让 ${cardNameFromUid(suggestion.blockerUid, "它")} 格挡`;
  if (suggestion.kind === "defense_pass") return "这口先挨了";
  if (suggestion.kind === "creature_guard") return `玩家承受打击保 ${cardNameFromUid(suggestion.targetUid, "它")}`;
  if (suggestion.kind === "creature_pass") return "让动物承受伤害";
  if (suggestion.kind === "end_turn") return "结束回合";
  return suggestion.label || "走第一手";
}

function guidePrimaryMeta(player, suggestion) {
  if (!game) return "新开一局后，这里会显示当前可执行动作。";
  if (pendingDefense) {
    const defense = buildPendingDefenseState();
    if (defense?.kind === "face") {
      if (!defense.blockerLoc?.card) return `这口没有动物能格挡，只会直接让玩家 -${defense.attackValue}。`;
      return defense.canSwapBlocker
        ? `按下去只会结这一口。可以用《${defense.blockerLoc.card.name}》格挡，想换动物就点黄框。`
        : `按下去只会结这一口。动物格挡是《${defense.blockerLoc.card.name}》，玩家承受打击是 -${defense.attackValue}。`;
    }
    return `按下去只会结这一口。玩家承受打击 -${defense?.attackValue || 0} 可保《${defense?.targetName || "它"}》；否则让动物承受伤害。`;
  }
  if (vsAI && game.active === 1) {
    const beat = buildAIDirectorBeat(activePlayer());
    const watch = beat.previewWatch || buildAIPreviewState(activePlayer(), beat.previewSuggestion);
    return watch.detail || beat.detail || "现在先看右边和日志，等 AI 出完牌，你再接管。";
  }
  if (!suggestion) return "这回合没有明显标准答案。你可以按自己的感觉来。";
  if (!currentSelectedLocation() && isOpeningFastTrackMoment(player, suggestion)) {
    const route = openingFastTrackRoute(suggestion);
    if (route) return `第一把可以先按这个顺序试：${route}。做完以后再看新的亮格和资源。`;
  }
  const cue = activeOpeningCue(player);
  const role = suggestion.kind === "summon" ? inferCardRole(findCardLocation(suggestion.cardUid)?.card) : null;
  if (suggestion.ribbon === "任务线") return "这步会直接顺手领奖，是否现在拿由你判断。";
  if (suggestion.ribbon === "冲奖") return "这步大多还能把热度顶过线，属于又赚又热闹的那种。";
  if (suggestion.selectedFocus) return "你已经点了这只，按下去会直接执行它当前能做的一拍。";
  if (cue?.id === "pocket" && suggestion.kind === "draw_private") return "这把更像差一块拼图。先摸一张，再决定往哪条线发力。";
  if (cue?.id && suggestion.kind === "summon") {
    return role
      ? `当前开场路线是“${cue.label}”。这只更像${role.label}，会把这条戏路直接铺开。`
      : `当前开场路线是“${cue.label}”。这一步会把这条戏路直接铺开。`;
  }
  if (suggestion.kind === "summon" && role) return `这一步是在先把${role.label}摆上去。${role.blurb}`;
  return "这是当前可执行的一步，不会替你自动打完整个回合。";
}

function mobileGuideSummary(player, suggestion) {
  if (!game) return "新开局后，这里会显示当前可执行的一拍。";
  if (game.winner !== null) return "这局已经打完了，先看结算，想继续就点上面的新开一局。";
  if (pendingDefense) {
    const defense = buildPendingDefenseState();
    if (defense?.kind === "face") {
      if (!defense.blockerLoc?.card) return `这口没有动物能格挡，只会玩家 -${defense.attackValue}。`;
      return defense.canSwapBlocker
        ? `只判这一口：动物格挡或玩家承受打击，黄框还能换格挡动物。`
        : `只判这一口：动物格挡是《${defense.blockerLoc.card.name}》，玩家承受打击是 -${defense.attackValue}。`;
    }
    return `只判《${defense?.targetName || "它"}》值不值 ${defense?.attackValue || 0} 血。玩家可承受打击保住它，结完回主回合。`;
  }
  if (vsAI && game.active === 1) {
    const beat = buildAIDirectorBeat(activePlayer());
    const watch = beat.previewWatch || buildAIPreviewState(activePlayer(), beat.previewSuggestion);
    return watch.detail || beat.detail || (aiThinking ? "AI 正在盘算，等它交完动作你再接管。" : "先看 AI 演，等它出完你再接。");
  }
  if (!suggestion) return "这回合没有硬性标准答案，先补牌、补场或收手都说得过去。";
  if (!currentSelectedLocation() && isOpeningFastTrackMoment(player, suggestion)) {
    const route = openingFastTrackRoute(suggestion);
    if (route) return `先照这条点：${route}。`;
  }

  const cardName = cardNameFromUid(suggestion.cardUid, "这只");
  if (suggestion.selectedFocus) {
    if (suggestion.kind === "skill") return `锁定《${cardName}》，这拍按下去就会直接开 ${findCardLocation(suggestion.cardUid)?.card?.skill || "绝活"}。`;
    if (suggestion.kind === "move_attack_face" || suggestion.kind === "move_attack_creature") return `锁定《${cardName}》，这拍先换线再出手，路线已经替你挑好了。`;
    if (suggestion.kind === "attack_face") return `锁定《${cardName}》，这拍更像直接冲脸，把血线压下去。`;
    if (suggestion.kind === "attack_creature") return `锁定《${cardName}》，这拍更像先收一个关键目标。`;
    if (suggestion.kind === "recover") return `锁定《${cardName}》，先把它叫醒，这拍才能继续开工。`;
    if (suggestion.kind === "move") return `锁定《${cardName}》，先给它挪个位置，后面的进攻角度会顺很多。`;
    if (suggestion.kind === "sacrifice") return `锁定《${cardName}》，这手偏黑色幽默，通常是断粮时的应急方案。`;
  }

  if (suggestion.ribbon === "任务线") return "这拍做完会直接领奖，属于当前最省脑的一步。";
  if (suggestion.ribbon === "冲奖") return "这拍大多还能顺手把热度顶过线，台下已经准备扔奖励了。";
  if (suggestion.kind === "summon") return `点下去会直接把《${cardName}》送上桌，路线也会一起铺开。`;
  if (suggestion.kind === "draw_private") return "先补一张私有牌，把后面的路线刷得更清楚一点。";
  if (suggestion.kind === "disaster") return "这拍节目效果最足，而且大多不只是热闹。";
  if (suggestion.kind === "skill") return `这拍更像先让《${cardName}》整活，很多时候会顺手带热度。`;
  if (suggestion.kind === "attack_face" || suggestion.kind === "move_attack_face") return "这拍更像直接冲玩家，把节奏往终结方向推。";
  if (suggestion.kind === "attack_creature" || suggestion.kind === "move_attack_creature") return "这拍更像先抢场面，按住对面的关键怪。";
  if (suggestion.kind === "end_turn") return "这一轮已经差不多了，别为了热闹白送资源。";
  return suggestion.note || "不想自己想的话，照着这手往下走基本不会太亏。";
}

function skillPreviewAction(card) {
  if (!card?.skill) return "skill";
  if (card.skill === "采摘") return "skill_harvest";
  if (card.skill === "偷盗") return "skill_steal";
  if (card.skill === "鹰眼") return "skill_eagle_eye";
  if (card.skill === "吸引") return "skill_taunt";
  if (card.skill === "毒牙") return "skill_venom";
  if (card.skill === "百兽王吼") return "skill_roar";
  if (card.skill === "谁是百兽王？") return "skill_king";
  return "skill";
}

function previewCombatAction(player, attackerCard, targetLoc) {
  if (!player || !attackerCard || !targetLoc?.card || !targetLoc?.player) return "attack_creature_injure";
  const attackValue = effectiveAttack(player, attackerCard);
  const defenseValue = targetLoc.card.state === "rest" ? 0 : effectiveDefense(targetLoc.player, targetLoc.card);
  if (attackValue > defenseValue) return "attack_creature_kill";
  if (attackerCard.venomStrike || attackerCard.skill === "毒牙") return "attack_creature_venom";
  return "attack_creature_injure";
}

function previewSuggestionEvents(player, suggestion) {
  if (!player || !suggestion) return [];
  const sourceLoc = suggestion.cardUid ? findCardLocation(suggestion.cardUid) : null;
  const movedCard = sourceLoc?.card && (suggestion.kind === "move_attack_face" || suggestion.kind === "move_attack_creature")
    ? { ...sourceLoc.card, lane: suggestion.lane }
    : sourceLoc?.card || null;
  const targetLoc = suggestion.targetUid ? findCardLocation(suggestion.targetUid) : null;
  const movedLoc = sourceLoc?.card && (suggestion.kind === "move_attack_face" || suggestion.kind === "move_attack_creature")
    ? {
        ...sourceLoc,
        lane: suggestion.lane,
        slotIndex: suggestion.slotIndex,
        card: movedCard,
      }
    : null;

  if (suggestion.kind === "summon") {
    const card = sourceLoc?.card || allCards.find((item) => item.uid === suggestion.cardUid) || null;
    return card ? [{
      action: "summon",
      actor: player.name,
      target: card.name,
      extra: buildSummonEventExtra(card, suggestion.lane, suggestion.slotIndex),
    }] : [{ action: "summon" }];
  }
  if (suggestion.kind === "draw_private") return [{ action: "draw_private" }];
  if (suggestion.kind === "draw_public_A" || suggestion.kind === "draw_public_B" || suggestion.kind === "draw_public_C") return [{ action: suggestion.kind }];
  if (suggestion.kind === "disaster") {
    const disaster = currentTurnDisaster(player);
    const plan = disasterVictimPlan(player, disaster);
    return [{
      action: "disaster_cast",
      actor: player.name,
      target: disaster?.["卡名"] || "环境牌",
      extra: {
        ownVictims: plan?.ownVictims || [],
        enemyVictims: plan?.enemyVictims || [],
      },
    }];
  }
  if (suggestion.kind === "skill") {
    return [{
      action: skillPreviewAction(sourceLoc?.card || null),
      actor: player.name,
      target: sourceLoc?.card?.name || "",
      extra: {
        ...(sourceLoc?.card ? buildAttackEventExtra(sourceLoc) : {}),
        cardSkill: sourceLoc?.card?.skill || "",
        skillName: sourceLoc?.card?.skill || "",
      },
    }];
  }
  if (suggestion.kind === "attack_face" && sourceLoc?.card) {
    return [{
      action: "attack_face",
      actor: player.name,
      target: opponentPlayer()?.name || "对手",
      extra: {
        ...buildAttackEventExtra(sourceLoc),
        damage: effectiveAttack(player, sourceLoc.card),
      },
    }];
  }
  if (suggestion.kind === "attack_creature" && sourceLoc?.card && targetLoc) {
    return [{
      action: previewCombatAction(player, sourceLoc.card, targetLoc),
      actor: player.name,
      target: targetLoc.card.name,
      extra: buildAttackEventExtra(sourceLoc, targetLoc),
    }];
  }
  if (suggestion.kind === "move_attack_face" && movedCard && movedLoc) {
    return [
      {
        action: "move",
        actor: player.name,
        target: movedCard.name,
        extra: buildMoveEventExtra(sourceLoc.card, sourceLoc.lane, suggestion.lane),
      },
      {
        action: "attack_face",
        actor: player.name,
        target: opponentPlayer()?.name || "对手",
        extra: {
          ...buildAttackEventExtra(movedLoc),
          damage: effectiveAttack(player, movedCard),
        },
      },
    ];
  }
  if (suggestion.kind === "move_attack_creature" && movedCard && targetLoc && movedLoc) {
    return [
      {
        action: "move",
        actor: player.name,
        target: movedCard.name,
        extra: buildMoveEventExtra(sourceLoc.card, sourceLoc.lane, suggestion.lane),
      },
      {
        action: previewCombatAction(player, movedCard, targetLoc),
        actor: player.name,
        target: targetLoc.card.name,
        extra: buildAttackEventExtra(movedLoc, targetLoc),
      },
    ];
  }
  if (suggestion.kind === "move" && sourceLoc?.card) {
    return [{
      action: "move",
      actor: player.name,
      target: sourceLoc.card.name,
      extra: buildMoveEventExtra(sourceLoc.card, sourceLoc.lane, suggestion.lane),
    }];
  }
  if (suggestion.kind === "recover") return [{ action: "recover", actor: player.name, target: sourceLoc?.card?.name || "" }];
  if (suggestion.kind === "sacrifice") return [{ action: "sacrifice", actor: player.name, target: sourceLoc?.card?.name || "" }];
  return [];
}

function suggestionShowtimeGain(player, suggestion) {
  return previewSuggestionEvents(player, suggestion)
    .reduce((total, event) => total + showtimePointsForEvent(event), 0);
}

function previewQuestCompletionForEvents(player, events = []) {
  const quest = currentTurnQuest(player);
  if (!player || !quest || quest.completed || !events.length) return null;
  const movedUids = new Set(quest.progress?.movedUids || []);

  for (const event of events) {
    const action = event?.action || "";
    const extra = event?.extra || {};
    const attackAction = typeof action === "string" && action.startsWith("attack_");

    if (action === "move" && extra.cardUid) movedUids.add(extra.cardUid);

    if (quest.id === "party_disaster" && action === "disaster_cast") return quest;
    if (quest.id === "skill_show" && typeof action === "string" && action.startsWith("skill")) return quest;
    if (quest.id === "move_and_hit" && attackAction && extra.attackerUid && movedUids.has(extra.attackerUid)) return quest;
    if (quest.id === "sky_strike" && attackAction && extra.attackerSpace === "天空") return quest;
    if (quest.id === "waterline_pressure" && attackAction && extra.attackerLane === "water") return quest;
    if (quest.id === "big_game_hunter" && (action === "attack_creature_kill" || action === "attack_creature_pressure_kill") && extra.targetLevel === "A") return quest;
    if (quest.id === "wolf_hunt" && (action === "attack_creature_kill" || action === "attack_creature_pressure_kill") && extra.attackerIsWolf) return quest;
  }

  return null;
}

function previewHypeRewardForSuggestion(player, suggestion) {
  if (!player || !suggestion) return null;
  const current = currentTurnHype(player);
  const projected = projectedHypeAfterSuggestion(player, suggestion);
  const nextThreshold = HYPE_THRESHOLDS.find((value) => current < value && projected >= value && !(player.turnHypeClaims || []).includes(value)) || null;
  if (!nextThreshold) return null;
  const triggerEvent = [...previewSuggestionEvents(player, suggestion)]
    .reverse()
    .find((event) => hypeGainForEvent(event) > 0) || null;
  return {
    threshold: nextThreshold,
    reward: hypeRewardForTier(player, nextThreshold, triggerEvent),
  };
}

function buildSuggestionExcitementCues(player = activePlayer(), suggestion = currentPrimarySuggestion(), options = {}) {
  if (!player || !suggestion) return [];
  const limit = Math.max(1, Number(options.limit) || 1);
  const includeFallbackHype = options.includeFallbackHype !== false;
  const cues = [];
  const previewEvents = previewSuggestionEvents(player, suggestion);
  const quest = previewQuestCompletionForEvents(player, previewEvents);
  const hypeDrop = previewHypeRewardForSuggestion(player, suggestion);
  const scoreSummary = buildShowtimeScoreSummary(player);
  const nextRank = nextShowtimeRankState(scoreSummary.score);
  const scoreGain = suggestionShowtimeGain(player, suggestion);
  const projectedScore = scoreSummary.score + Math.max(0, scoreGain);
  const crossesRank = !!nextRank && projectedScore >= nextRank.min;
  const current = currentTurnHype(player);
  const projected = projectedHypeAfterSuggestion(player, suggestion);
  const hypeGain = Math.max(0, projected - current);

  if (quest) cues.push({ label: `领 ${shortQuestReward(quest)}`, tone: "reward" });
  if (hypeDrop?.reward) cues.push({ label: `掉 ${compactRewardLabel(hypeDrop.reward, "hype")}`, tone: "reward" });
  if (crossesRank) cues.push({ label: `冲 ${nextRank.label}`, tone: nextRank.tone || "support" });
  if (!cues.length && includeFallbackHype && hypeGain > 0) {
    cues.push({ label: `热度 +${hypeGain}`, tone: suggestion.ribbon === "冲奖" ? "reward" : "support" });
  }
  return uniquePayoffChips(cues).slice(0, limit);
}

function excitementCueSentence(cue) {
  if (!cue?.label) return "";
  if (cue.label.startsWith("冲 ")) return `还能把节目档顶到“${cue.label.slice(2)}”`;
  if (cue.label.startsWith("热度 +")) return `还能${cue.label}`;
  return `顺手${cue.label}`;
}

function compactExcitementDetail(cue) {
  if (!cue?.label) return "";
  if (cue.label.startsWith("热度 +")) return cue.label;
  return `顺手${cue.label}`;
}

function firstExcitementDetail(player, suggestion, options = {}) {
  const cue = buildSuggestionExcitementCues(player, suggestion, {
    limit: 1,
    includeFallbackHype: options.includeFallbackHype !== false,
  })[0] || null;
  return cue ? compactExcitementDetail(cue) : "";
}

function suggestionSpendPreview(player, suggestion) {
  if (!player || !suggestion) return null;
  if (suggestion.kind === "summon") {
    const card = findCardLocation(suggestion.cardUid)?.card || null;
    return card ? { label: `-${summonCost(card)} 食物`, tone: "support" } : null;
  }
  if (suggestion.kind === "draw_private") return { label: "-1 食物", tone: "support" };
  if (suggestion.kind === "draw_public_A") return { label: "-3 食物", tone: "support" };
  if (suggestion.kind === "draw_public_B") return { label: "-2 食物", tone: "support" };
  if (suggestion.kind === "draw_public_C") return { label: "-2 食物", tone: "support" };
  if (suggestion.kind === "disaster") {
    const disaster = currentTurnDisaster(player);
    return disaster ? { label: `-${disasterCost(disaster)} 食物`, tone: "trick" } : null;
  }
  if (suggestion.kind === "skill") {
    const card = findCardLocation(suggestion.cardUid)?.card || null;
    return card ? { label: `-${skillCost(card)} 食物`, tone: "trick" } : null;
  }
  if (suggestion.kind === "attack_face") {
    const card = findCardLocation(suggestion.cardUid)?.card || null;
    return card ? { label: `-${faceAttackCost(card, opponentPlayer())} 食物`, tone: "attack" } : null;
  }
  if (suggestion.kind === "attack_creature") {
    const loc = findCardLocation(suggestion.cardUid);
    return loc?.card ? { label: `-${attackSpendCost(player, loc.card)} 食物`, tone: "attack" } : null;
  }
  if (suggestion.kind === "move_attack_face") {
    const card = findCardLocation(suggestion.cardUid)?.card || null;
    return card ? { label: `-${1 + faceAttackCost(card, opponentPlayer())} 食物`, tone: "trick" } : { label: "-1 食物", tone: "trick" };
  }
  if (suggestion.kind === "move_attack_creature") {
    const loc = findCardLocation(suggestion.cardUid);
    return loc?.card ? { label: `-${1 + attackSpendCost(player, loc.card)} 食物`, tone: "trick" } : { label: "-1 食物", tone: "trick" };
  }
  if (suggestion.kind === "move") return { label: "-1 食物", tone: "trick" };
  if (suggestion.kind === "recover") return { label: "-1 食物", tone: "support" };
  if (suggestion.kind === "sacrifice") return { label: "食物 +1", tone: "reward" };
  if (suggestion.kind === "defense_block") {
    const blockerLoc = suggestion.blockerUid ? findCardLocation(suggestion.blockerUid) : null;
    const defender = defendingPlayer();
    return blockerLoc && defender ? { label: `-${faceBlockCost(defender, blockerLoc)} 食物`, tone: "support" } : null;
  }
  if (suggestion.kind === "defense_pass" && pendingDefense?.attackValue) return { label: `掉血 -${pendingDefense.attackValue}`, tone: "attack" };
  if (suggestion.kind === "creature_guard" && pendingDefense?.attackValue) return { label: `玩家 -${pendingDefense.attackValue} 血`, tone: "attack" };
  if (suggestion.kind === "creature_pass") {
    const snapshot = creatureGuardSnapshot(attackerFromPendingDefense(), defendingTargetCreature());
    if (snapshot?.dies) return { label: "这只会退场", tone: "attack" };
    if (snapshot?.rests) return { label: "这只会休息", tone: "attack" };
  }
  return null;
}

function uniquePayoffChips(chips = []) {
  const dedupe = new Set();
  return chips.filter((chip) => {
    const label = chip?.label || "";
    const tone = chip?.tone || "";
    const key = `${tone}:${label}`;
    if (!label || dedupe.has(key)) return false;
    dedupe.add(key);
    return true;
  });
}

function attackOutcomeChipFromPreview(preview, toneOverride = "") {
  if (!preview) return null;
  const label = preview.detailLabel || (
    preview.verdict === "收A" || preview.verdict === "收掉"
      ? "收掉 · 目标退场"
      : preview.verdict === "毒翻"
        ? "毒翻 · 不死也躺"
        : "压休 · 下回合缓一拍"
  );
  return {
    label,
    tone: toneOverride || preview.tone || "attack",
  };
}

function drawOutcomePreview(player) {
  const handCount = player?.hand?.length || 0;
  if (handCount >= MAX_HAND_SIZE) return { label: "抽后要弃 1", tone: "warning" };
  if (handCount === 5) return { label: "抽后满手", tone: "support" };
  return { label: "手牌 +1", tone: "support" };
}

function faceAttackOutcomePreview(player, sourceLoc) {
  if (!player || !sourceLoc?.card) return null;
  const defender = game.players[player.id === 0 ? 1 : 0];
  if (!defender) return null;
  const blockers = legalFaceBlockers(sourceLoc, defender)
    .filter((loc) => defender.food >= faceBlockCost(defender, loc));
  const attackValue = effectiveAttack(player, sourceLoc.card);
  const leak = faceGuardDamageLeak(sourceLoc.card);
  if (blockers.length) {
    const leakLethal = leak >= defender.hp;
    const label = leak
      ? leakLethal ? `挡也斩杀 · 漏 ${leak}` : `挡也漏 ${leak}`
      : "会进入防守选择";
    return {
      label,
      tone: "attack",
      attackValue,
      blocked: true,
      blockers: blockers.length,
      leak,
      lethal: leakLethal,
      detailLabel: leak
        ? `${label} · 先选格挡动物`
        : `防守选择 · ${blockers.length} 个能接`,
      pressureLabel: leak
        ? `点下去会先进入防守选择；就算格挡也会漏 ${leak} 血。`
        : `点下去会先进入防守选择，对面有 ${blockers.length} 个能接。`,
    };
  }
  const lethal = attackValue >= defender.hp;
  const label = lethal ? `斩杀线 · 对手 -${attackValue}` : `压血线 · 对手 -${attackValue}`;
  return {
    label,
    tone: "attack",
    attackValue,
    blocked: false,
    blockers: 0,
    leak: 0,
    lethal,
    detailLabel: label,
    pressureLabel: lethal
      ? `这一口如果打到脸，能直接收掉 ${defender.name}。`
      : `这一口能把 ${defender.name} 压低 ${attackValue} 血。`,
  };
}

function suggestionOutcomePreview(player, suggestion) {
  if (!player || !suggestion) return null;
  if (suggestion.kind === "draw_private" || suggestion.kind === "draw_public_A" || suggestion.kind === "draw_public_B" || suggestion.kind === "draw_public_C") {
    return drawOutcomePreview(player);
  }
  if (suggestion.kind === "disaster") {
    const plan = disasterVictimPlan(player, currentTurnDisaster(player));
    if (!plan) return null;
    if (plan.enemyVictims.length && plan.ownVictims.length) return { label: `炸 ${plan.enemyVictims.length} 敌 · 伤 ${plan.ownVictims.length} 我`, tone: "trick" };
    if (plan.enemyVictims.length) return { label: `炸 ${plan.enemyVictims.length} 敌`, tone: "trick" };
    return null;
  }
  if (suggestion.kind === "attack_creature") {
    const sourceLoc = findCardLocation(suggestion.cardUid);
    const targetLoc = findCardLocation(suggestion.targetUid);
    return attackOutcomeChipFromPreview(buildAttackTargetPreview(sourceLoc, targetLoc), "attack");
  }
  if (suggestion.kind === "move_attack_creature") {
    const sourceLoc = findCardLocation(suggestion.cardUid);
    const targetLoc = findCardLocation(suggestion.targetUid);
    if (!sourceLoc?.card || !targetLoc?.card) return null;
    const movedLoc = {
      ...sourceLoc,
      lane: suggestion.lane,
      slotIndex: suggestion.slotIndex,
      card: { ...sourceLoc.card, lane: suggestion.lane },
    };
    return attackOutcomeChipFromPreview(buildAttackTargetPreview(movedLoc, targetLoc), "attack");
  }
  if (suggestion.kind === "attack_face") {
    const sourceLoc = findCardLocation(suggestion.cardUid);
    return faceAttackOutcomePreview(player, sourceLoc);
  }
  if (suggestion.kind === "move_attack_face") {
    const sourceLoc = findCardLocation(suggestion.cardUid);
    if (!sourceLoc?.card) return null;
    const movedLoc = {
      ...sourceLoc,
      lane: suggestion.lane,
      slotIndex: suggestion.slotIndex,
      card: { ...sourceLoc.card, lane: suggestion.lane },
    };
    return faceAttackOutcomePreview(player, movedLoc);
  }
  if (suggestion.kind === "recover") return { label: "这只会醒", tone: "support" };
  if (suggestion.kind === "sacrifice") return { label: "这只会退场", tone: "reward" };
  if (suggestion.kind === "defense_block") {
    const attackerLoc = attackerFromPendingDefense();
    const leak = attackerLoc?.card ? faceGuardDamageLeak(attackerLoc.card) : 0;
    return { label: leak ? `会挡住 · 漏 ${leak}` : "这只会顶住", tone: "support" };
  }
  if (suggestion.kind === "creature_guard") return { label: "这只会保住", tone: "support" };
  if (suggestion.kind === "creature_pass") {
    const snapshot = creatureGuardSnapshot(attackerFromPendingDefense(), defendingTargetCreature());
    if (snapshot?.dies) return { label: "这只会退场", tone: "attack" };
    if (snapshot?.rests) return { label: "这只会休息", tone: "attack" };
  }
  return null;
}

function compactSkillOutcomeLabel(card) {
  if (!card?.skill) return "";
  const compact = {
    偷盗: "偷 1 张牌",
    鹰眼: "看牌再偷 1",
    吸引: "挂嘲讽",
    毒牙: "下次咬人会压休",
    采摘: "玩家回 1 血",
    百兽王吼: "陆地敌人变弱",
    "谁是百兽王？": "自己进兽王态",
  };
  return compact[card.skill] || skillPreview(card.skill) || "";
}

function moveButtonDetail(player, selectedBoard, moveMode = false) {
  if (!player || !selectedBoard?.card) return "";
  const suggestion = currentPrimarySuggestion();
  if (
    suggestion
    && suggestion.cardUid === selectedBoard.card.uid
    && ["move", "move_attack_face", "move_attack_creature"].includes(suggestion.kind)
  ) {
    return suggestion.lane ? `去 ${slotLabelText(suggestion.lane, suggestion.slotIndex)}` : "先换线";
  }
  return moveMode ? "点发亮空格" : "先换线";
}

function buildActionPreviewSuggestion(action, {
  player = activePlayer(),
  selectedBoard = currentSelectedBoard(activePlayer()),
  shortcut = null,
} = {}) {
  if (!player) return null;
  if (action === "drawPrivate") return { kind: "draw_private" };
  if (action === "drawA") return { kind: "draw_public_A" };
  if (action === "drawB") return { kind: "draw_public_B" };
  if (action === "drawC") return { kind: "draw_public_C" };
  if (action === "disaster") return { kind: "disaster" };
  if (!selectedBoard?.card) return null;
  if (action === "skill") return { kind: "skill", cardUid: selectedBoard.card.uid };
  if (action === "recover") return { kind: "recover", cardUid: selectedBoard.card.uid };
  if (action === "sacrifice") return { kind: "sacrifice", cardUid: selectedBoard.card.uid };
  if (action === "attackPlayer") return { kind: "attack_face", cardUid: selectedBoard.card.uid };
  if (action === "attackCreature" && shortcut?.targetLoc?.card) {
    return {
      kind: "attack_creature",
      cardUid: selectedBoard.card.uid,
      targetUid: shortcut.targetLoc.card.uid,
    };
  }
  return null;
}

function mergeActionButtonDetail(primary, extra) {
  if (!primary?.label) return extra?.label ? extra : null;
  if (!extra?.label) return primary;
  return {
    label: `${primary.label} · ${extra.label}`,
    tone: primary.tone || extra.tone || "support",
  };
}

function actionButtonDetailState(action, {
  player = activePlayer(),
  enemy = opponentPlayer(),
  selectedBoard = currentSelectedBoard(activePlayer()),
  shortcut = null,
  disasterPlan = null,
  reactionMode = false,
  guardDefender = defendingPlayer(),
  guardBlocker = selectedGuardBlocker(),
  guardTarget = defendingTargetCreature(),
  faceDefenseShortcut = pendingDefense?.kind === "face" ? faceDefenseShortcutState() : null,
  moveMode = false,
} = {}) {
  if (reactionMode) {
    if (action === "confirmGuard" && pendingDefense?.kind === "face") {
      const blocker = guardBlocker || faceDefenseShortcut?.blockerLoc || null;
      const leak = attackerFromPendingDefense()?.card ? faceGuardDamageLeak(attackerFromPendingDefense().card) : 0;
      if (!blocker?.card) return { label: "这口没人能接", tone: "attack" };
      return { label: leak ? `会挡住 · 漏 ${leak}` : "会替你顶住", tone: "support" };
    }
    if (action === "confirmGuard" && pendingDefense?.kind === "creature") {
      return { label: pendingDefense?.attackValue ? `玩家 -${pendingDefense.attackValue} 血 · 这只会保住` : "这只会保住", tone: "support" };
    }
    if (action === "letThrough" && pendingDefense?.kind === "face" && pendingDefense?.attackValue) {
      return { label: `玩家 -${pendingDefense.attackValue} 血`, tone: "attack" };
    }
    if (action === "letThrough" && pendingDefense?.kind === "creature") {
      const snapshot = creatureGuardSnapshot(attackerFromPendingDefense(), guardTarget);
      if (snapshot?.dies) return { label: "这只会退场", tone: "attack" };
      if (snapshot?.rests) return { label: "这只会休息", tone: "attack" };
    }
    return null;
  }

  let base = null;
  if (action === "drawPrivate" || action === "drawA" || action === "drawB" || action === "drawC") {
    base = drawOutcomePreview(player);
  }
  if (action === "disaster") {
    if (!disasterPlan) return { label: "随机环境", tone: "trick" };
    if (disasterPlan.enemyVictims.length && disasterPlan.ownVictims.length) base = { label: `炸 ${disasterPlan.enemyVictims.length} 敌 · 伤 ${disasterPlan.ownVictims.length} 我`, tone: "trick" };
    else if (disasterPlan.enemyVictims.length) base = { label: `炸 ${disasterPlan.enemyVictims.length} 敌`, tone: "trick" };
    else return null;
  }
  if (action === "skill" && selectedBoard?.card) {
    const label = compactSkillOutcomeLabel(selectedBoard.card);
    base = label ? { label, tone: "trick" } : null;
  }
  if (action === "recover" && selectedBoard?.card) base = { label: "这只会醒", tone: "support" };
  if (action === "move" && selectedBoard?.card) base = { label: moveButtonDetail(player, selectedBoard, moveMode), tone: "trick" };
  if (action === "sacrifice" && selectedBoard?.card) base = { label: "这只会退场", tone: "reward" };
  if (action === "attackPlayer" && selectedBoard?.card) {
    const facePreview = faceAttackOutcomePreview(player, selectedBoard);
    base = facePreview?.detailLabel
      ? { ...facePreview, label: facePreview.detailLabel }
      : facePreview;
  }
  if (action === "attackCreature" && shortcut?.preview) {
    base = attackOutcomeChipFromPreview(shortcut.preview, "attack");
  }
  const excitement = buildSuggestionExcitementCues(
    player,
    buildActionPreviewSuggestion(action, {
      player,
      selectedBoard,
      shortcut,
    }),
    { limit: 1 },
  )[0] || null;
  return mergeActionButtonDetail(base, excitement);
}

function applyActionButtonDetail(button, detail) {
  if (!button) return;
  if (!detail?.label) {
    delete button.dataset.actionDetail;
    delete button.dataset.actionDetailTone;
    button.classList.remove("has-action-detail", "has-blocked-detail");
    return;
  }
  button.dataset.actionDetail = detail.label;
  button.dataset.actionDetailTone = detail.tone || "support";
  button.classList.add("has-action-detail");
}

function compactDisabledActionReason(title = "") {
  const text = String(title || "").trim().replace(/[。.!！]+$/u, "");
  if (!text) return "";
  if (/先完成或取消这次移动/.test(text)) return "先完成移动";
  if (/只有在防守时刻/.test(text)) return "防守时才会亮";
  if (/当前没有选中的牌/.test(text)) return "还没选牌";
  if (/先选你场上的一只生物|先选一只己方生物/.test(text)) return "先选己方生物";
  if (/没有可发动的主动|没有主动技能/.test(text)) return "没有主动技能";
  if (/没在休息|已经是战斗状态/.test(text)) return "没在休息";
  if (/这回合已经献祭/.test(text)) return "本回合献祭过了";
  if (/这回合已经发动过|已经使用过|已经用过/.test(text)) return "这回合用过了";
  if (/刚上场/.test(text)) return "刚上场不能动";
  if (/当前是(.+?)状态/.test(text)) return `现在${text.match(/当前是(.+?)状态/)?.[1] || "不在战斗"}，不能用`;
  if (/不是会换线的家伙/.test(text)) return "不能换线";
  if (/对面有嘲讽/.test(text)) return "先处理嘲讽";
  if (/够不到对面任何生物/.test(text)) return "够不到目标";
  if (/私有卡组已经空|卡组已空/.test(text)) return "私有牌堆空了";
  if (/A 类公共牌抽空/.test(text)) return "A 牌堆空了";
  if (/B 类公共牌抽空/.test(text)) return "B 牌堆空了";
  if (/C 类公共牌抽空/.test(text)) return "C 牌堆空了";
  const explicitNeed = text.match(/需要(?:至少)?\s*(\d+) 食物/);
  if (explicitNeed) return `食物不够 · 要 ${explicitNeed[1]}`;
  if (/食物不足/.test(text)) {
    const need = text.match(/需要\s*(\d+) 食物/);
    return need ? `食物不够 · 要 ${need[1]}` : "食物不够";
  }
  if (/这回合已经抽过环境牌|这回合已经抽过环境/.test(text)) return "本回合已抽环境";
  return text.length > 14 ? `${text.slice(0, 14)}...` : text;
}

function disabledActionDetail(title = "") {
  const label = compactDisabledActionReason(title);
  return label ? { label, tone: "muted" } : null;
}

function actionBandKey(action = "") {
  if (["drawPrivate", "drawA", "drawB", "drawC"].includes(action)) return "resource";
  if (["disaster", "skill", "move", "recover", "sacrifice", "cancelSelection"].includes(action)) return "tactics";
  if (["attackPlayer", "attackCreature"].includes(action)) return "pressure";
  if (["confirmGuard", "letThrough"].includes(action)) return "defense";
  if (action === "endTurn") return "top";
  return "";
}

function currentActionButtonSpotlight(player = activePlayer(), focus = currentRouteFocus()) {
  if (!game || !player || !focus?.suggestion || game.winner !== null) return null;
  if (vsAI && game.active === 1 && !pendingDefense) return null;

  const suggestion = focus.suggestion;
  const selectedLoc = currentSelectedLocation();
  const sourceSelected = suggestion.cardUid
    && selectedLoc?.player?.id === player.id
    && selectedLoc.card?.uid === suggestion.cardUid;
  const moveMode = !!(sourceSelected && selected?.mode === "move");
  const guardSelected = !!pendingDefense?.selectedBlockerUid;
  const cta = (actionKey, tone = "support", cueText = "") => ({
    actionKey,
    band: actionBandKey(actionKey),
    tone,
    cueText,
  });

  if (suggestion.kind === "draw_private") return cta("drawPrivate", "support", "现在先点下面那颗补牌按钮");
  if (suggestion.kind === "disaster") return cta("disaster", "trick", "现在先点下面那颗事件按钮");
  if (suggestion.kind === "end_turn") return cta("endTurn", "support", "这回合差不多了，上面那颗收手按钮最顺");
  if (suggestion.kind === "creature_guard") return cta("confirmGuard", "support", "现在先点下面那颗玩家承受打击按钮");
  if (suggestion.kind === "defense_pass" || suggestion.kind === "creature_pass") return cta("letThrough", "attack", "现在先点下面那颗玩家承受打击按钮");
  if (suggestion.kind === "defense_block") {
    return guardSelected ? cta("confirmGuard", "support", "现在先点下面那颗动物格挡按钮") : null;
  }
  if (suggestion.kind === "skill") {
    return sourceSelected ? cta("skill", "trick", "现在先点下面那颗绝活按钮") : null;
  }
  if (suggestion.kind === "attack_face") {
    return sourceSelected ? cta("attackPlayer", "attack", "现在先点下面那颗冲脸按钮") : null;
  }
  if (suggestion.kind === "recover") {
    return sourceSelected ? cta("recover", "support", "现在先点下面那颗复工按钮") : null;
  }
  if (suggestion.kind === "sacrifice") {
    return sourceSelected ? cta("sacrifice", "reward", "现在先点下面那颗开饭按钮") : null;
  }
  if (suggestion.kind === "move" || suggestion.kind === "move_attack_face" || suggestion.kind === "move_attack_creature") {
    return sourceSelected && !moveMode ? cta("move", "trick", "现在先点下面那颗换线按钮") : null;
  }
  return null;
}

function currentDirectInteractionSpotlight(player = activePlayer(), focus = currentRouteFocus()) {
  if (!game || !player || !focus?.suggestion || game.winner !== null) return null;
  if (vsAI && game.active === 1 && !pendingDefense) return null;
  if (shouldSpotlightOpeningPrimary(player, focus.suggestion)) return null;
  if (currentActionButtonSpotlight(player, focus)) return null;

  const suggestion = focus.suggestion;
  const selectedLoc = currentSelectedLocation();
  const sourceSelected = suggestion.cardUid
    && selectedLoc?.player?.id === player.id
    && selectedLoc.card?.uid === suggestion.cardUid;
  const moveMode = !!(sourceSelected && selected?.mode === "move");
  const cue = (kind, cueText, fields = {}) => ({ kind, cueText, ...fields });
  const sourceName = cardNameFromUid(suggestion.cardUid, "这只");
  const targetName = cardNameFromUid(suggestion.targetUid, "目标");

  if (suggestion.kind === "summon") {
    if (!sourceSelected) {
      return cue("hand", `现在先点手里的《${sourceName}》`, {
        handUid: suggestion.cardUid,
      });
    }
    return cue("slot", `现在直接点 ${slotLabelText(suggestion.lane, suggestion.slotIndex)}`, {
      slotKey: slotKey(player.id, suggestion.lane, suggestion.slotIndex),
    });
  }

  if (suggestion.kind === "skill" || suggestion.kind === "attack_face" || suggestion.kind === "recover" || suggestion.kind === "sacrifice") {
    if (!sourceSelected) {
      return cue("board", `现在先点你的《${sourceName}》`, {
        boardUid: suggestion.cardUid,
      });
    }
    return null;
  }

  if (suggestion.kind === "attack_creature") {
    if (!sourceSelected) {
      return cue("board", `现在先点你的《${sourceName}》`, {
        boardUid: suggestion.cardUid,
      });
    }
    return cue("target", `现在直接点对面的《${targetName}》`, {
      targetUid: suggestion.targetUid,
    });
  }

  if (suggestion.kind === "move" || suggestion.kind === "move_attack_face" || suggestion.kind === "move_attack_creature") {
    if (!sourceSelected) {
      return cue("board", `现在先点你的《${sourceName}》`, {
        boardUid: suggestion.cardUid,
      });
    }
    if (moveMode) {
      return cue("slot", `现在直接点 ${slotLabelText(suggestion.lane, suggestion.slotIndex)}`, {
        slotKey: slotKey(player.id, suggestion.lane, suggestion.slotIndex),
      });
    }
    return null;
  }

  if (suggestion.kind === "defense_block") {
    if (!pendingDefense?.selectedBlockerUid && suggestion.blockerUid) {
      return cue("board", `现在先点《${cardNameFromUid(suggestion.blockerUid, "格挡动物")}》`, {
        boardUid: suggestion.blockerUid,
      });
    }
    return null;
  }

  return null;
}

function currentRouteCueText(player = activePlayer(), focus = currentRouteFocus()) {
  if (!player) return "";
  const actionCue = currentActionButtonSpotlight(player, focus);
  if (actionCue?.cueText) return actionCue.cueText;
  const directCue = currentDirectInteractionSpotlight(player, focus);
  if (directCue?.cueText) return directCue.cueText;
  return "";
}

function fallbackRouteCueText(player = activePlayer()) {
  const loc = currentSelectedLocation();
  if (pendingDefense) return "中间那两颗按钮就是这口的两个答案";
  if (selected?.type === "board" && selected?.mode === "move") return "去点你这边发亮的空格，或者点“取消选择”";
  if (loc?.type === "hand" && loc.player.id === player?.id) return "去点你这边发亮的空格";
  if (loc?.type === "board" && loc.player.id !== player?.id) return "先回你这边点一只生物，再回来挑目标";
  if (loc?.type === "board" && loc.player.id === player?.id) {
    if (!activeSkillReadyError(player, loc.card)) return `想整活就点下面那颗“发动 ${loc.card.skill}”`;
    if (!moveReadyError(player, loc)) return "想换线就点下面那颗“免费换线”";
    if (canFaceAttackNow(player, loc.card, opponentPlayer())) return `想冲脸就点下面那颗“${faceAttackActionLabel()}”`;
    if (legalTargetsForCard(player, loc.card, opponentPlayer()).length) return "想开打就去点右边亮起来的目标";
  }
  return "";
}

function withFriendlyCue(message, { player = activePlayer(), fallback = "" } = {}) {
  const cue = currentRouteCueText(player) || fallback || fallbackRouteCueText(player);
  if (!cue) return message;
  return `${message} ${/[。！？]$/.test(cue) ? cue : `${cue}。`}`;
}

function friendlySummonError(player, card, lane, slotIndex) {
  if (!card) return withFriendlyCue("先从手里拎一张牌出来。", { player });
  if (!canPlace(card, lane)) {
    return withFriendlyCue(`《${card.name}》走的是${placementText(card)}线，这格不接它。`, {
      player,
      fallback: "换个发亮空格就行",
    });
  }
  if (player.board[lane][slotIndex]) {
    return withFriendlyCue(`${slotLabelText(lane, slotIndex)}已经有人蹲着了。`, {
      player,
      fallback: "换个发亮空格就行",
    });
  }
  return "";
}

function friendlyMoveReadyFeedback(player, loc) {
  if (!loc?.card) return withFriendlyCue("先点一只你自己的生物，再谈换线。", { player });
  if (!canMoveCard(loc.card)) return withFriendlyCue(`《${loc.card.name}》不是会换线的那类选手。`, { player });
  if ((player.turnMoves || 0) >= 1) {
    return withFriendlyCue(`《${loc.card.name}》这回合不能再换线了。`, {
      player,
      fallback: "每回合只有一次免费换线，先用别的动作收尾",
    });
  }
  if (!moveSlotsFor(player, loc).length) return withFriendlyCue(`《${loc.card.name}》这拍没新位置可跳。`, { player });
  return "";
}

function friendlyAttackReadyFeedback(player, card, cost, label = "攻击") {
  if (!card) return withFriendlyCue("先点一只你自己的生物。", { player });
  if (card.state !== "ready") return withFriendlyCue(`《${card.name}》还在${STATE_LABELS[card.state]}，先别催它${label}。`, { player });
  if (card.justSummoned) return withFriendlyCue(`《${card.name}》这回合刚进组，先别催它立刻${label}。`, { player });
  if (effectiveAttack(player, card) <= 0) return withFriendlyCue(`《${card.name}》这口打不出有效伤害，先换个活。`, { player });
  if (player.food < cost) {
    return withFriendlyCue(`口粮还差 ${cost - player.food}，《${card.name}》${label}得要 ${cost} 食物。`, {
      player,
      fallback: "先补点食物再回来出手",
    });
  }
  if (label === "打玩家") {
    const ruleError = faceAttackRuleError(card);
    if (ruleError) return withFriendlyCue(ruleError, { player });
  }
  return attackReadyErrorWithFood(player, card, cost, label, player.food);
}

function friendlySkillReadyFeedback(player, card) {
  if (!card?.skill) return withFriendlyCue("这只没有主动绝活可以点。", { player });
  const info = skillInfo(card.skill);
  if (!info || info["触发方式"] !== "主动") return withFriendlyCue(`《${card.name}》这个是被动本事，会自己触发。`, { player });
  if (card.state === "rest") return withFriendlyCue(`《${card.name}》还在休息，先把它叫醒。`, { player });
  if (card.skillUsedTurn === game.turn && player.id === game.active) return withFriendlyCue(`《${card.name}》这回合已经秀过一次了。`, { player });
  const cost = skillCost(card);
  if (player.food < cost) {
    return withFriendlyCue(`口粮还差 ${cost - player.food}，《${card.name}》的绝活先憋一拍。`, {
      player,
      fallback: "先补点食物再回来开绝活",
    });
  }
  return activeSkillReadyError(player, card);
}

function friendlyCreatureAttackTargetFeedback(player, attacker, targetLoc) {
  const cost = attackSpendCost(player, attacker);
  const readiness = friendlyAttackReadyFeedback(player, attacker, cost, "攻击");
  if (readiness) return readiness;
  if (!targetLoc || targetLoc.player.id === player.id || targetLoc.type !== "board") {
    return withFriendlyCue("空白格不算目标，先点对面的生物。", {
      player,
      fallback: "先回你这边点一只生物，再回来挑目标",
    });
  }
  const taunts = availableTaunts(targetLoc.player, attacker);
  if (taunts.length && !taunts.some((loc) => loc.card.uid === targetLoc.card.uid)) {
    return withFriendlyCue(`《${attacker.name}》先被《${taunts[0].card.name}》拽住了，得先处理它。`, { player });
  }
  if (!canReach(attacker, targetLoc.lane)) {
    return withFriendlyCue(`《${attacker.name}》够不到${laneLabel(targetLoc.lane)}的《${targetLoc.card.name}》。`, { player });
  }
  const attackValue = effectiveAttack(player, attacker);
  const defenseValue = targetLoc.card.state === "rest" ? 0 : effectiveDefense(targetLoc.player, targetLoc.card);
  if (attackValue * 2 <= defenseValue && !attacker.venomStrike) {
    return withFriendlyCue(`这口啃不动《${targetLoc.card.name}》。换个更软的目标会更顺。`, { player });
  }
  return "";
}

function friendlySpendFoodError(player, amount, context = {}) {
  const short = Math.max(0, amount - player.food);
  const cardName = context.card?.name || "";
  if (context.reason === "summon" && cardName) {
    return withFriendlyCue(`口粮还差 ${short}，《${cardName}》上桌得要 ${amount} 食物。`, {
      player,
      fallback: "先补点食物，或者换一张更便宜的牌",
    });
  }
  if (context.reason === "recover" && cardName) {
    return withFriendlyCue(`口粮还差 ${short}，想叫醒《${cardName}》得先留 1 食物。`, {
      player,
      fallback: "先补点食物再回来复工",
    });
  }
  if (context.reason === "skill" && cardName) {
    return withFriendlyCue(`口粮还差 ${short}，《${cardName}》的绝活要 ${amount} 食物。`, {
      player,
      fallback: "先补点食物再回来开绝活",
    });
  }
  if (context.reason === "disaster" && context.disasterName) {
    return withFriendlyCue(`口粮还差 ${short}，《${context.disasterName}》这档节目还开不了。`, {
      player,
      fallback: "先补点食物，再回来放节目",
    });
  }
  if (context.reason === "draw_private") {
    return "口粮不够，这拍先别急着补牌。";
  }
  if (String(context.reason || "").startsWith("draw_public_")) {
    return "口粮不够，公共牌这拍先别硬抽。";
  }
  return withFriendlyCue(`${player.name} 口粮不够，还差 ${short}。`, {
    player,
    fallback: "先补点食物再继续",
  });
}

function friendlyDefenseBoardClickFeedback(player, lane, slotIndex) {
  const state = buildPendingDefenseState();
  if (!state || !pendingDefense) return "";
  const card = player?.board?.[lane]?.[slotIndex] || null;
  if (state.kind === "creature") {
    return `这口先别点桌面，直接在下面二选一：玩家替《${state.targetName || "它"}》扛 ${state.attackValue || 0} 血，或者让它自己挨。`;
  }

  const blockerName = state.blockerLoc?.card?.name || "这只";
  const legal = legalPendingFaceBlockers(state.attackerLoc, state.defender);
  const canUseClickedCard = !!card && legal.some((loc) => loc.card.uid === card.uid);
  if (canUseClickedCard) return "";

  if (!legal.length) {
    if (player.id !== pendingDefense.defenderId) {
      return `这口已经没有动物能格挡了，对面先别点。直接按下面“玩家承受打击 -${state.attackValue || 0}”。`;
    }
    if (!card) {
      return `空格不能格挡，而且这口已经没有动物能接了。直接按下面“玩家承受打击 -${state.attackValue || 0}”。`;
    }
    return `《${card.name}》这次也不能格挡，而且场上已经没有动物能接了。直接按下面“玩家承受打击 -${state.attackValue || 0}”。`;
  }

  if (player.id !== pendingDefense.defenderId) {
    return state.canSwapBlocker
      ? `这口只看你这边谁格挡，先别点对面。去点黄框动物，或者按下面“玩家承受打击 ${state.attackValue || 0}”。`
      : `这口先别点对面，能格挡的就是《${blockerName}》。点它，或者按下面“玩家承受打击 ${state.attackValue || 0}”。`;
  }
  if (!card) {
    return state.canSwapBlocker
      ? `空格不能格挡。去点黄框动物，或者按下面“玩家承受打击 ${state.attackValue || 0}”。`
      : `空格不能格挡。能接的就是《${blockerName}》，不想挡就按下面“玩家承受打击”。`;
  }
  return state.canSwapBlocker
    ? `《${card.name}》不能格挡这口。换个黄框动物，或者按下面“玩家承受打击”。`
    : `《${card.name}》不能格挡这口。现在能接的就是《${blockerName}》，不想挡就按下面“玩家承受打击”。`;
}

function buildSuggestionPayoffChips(player = activePlayer(), suggestion = currentPrimarySuggestion()) {
  if (!player || !suggestion) return [];
  const chips = [];
  const spend = suggestionSpendPreview(player, suggestion);
  if (spend) chips.push(spend);
  const outcome = suggestionOutcomePreview(player, suggestion);
  if (outcome) chips.push(outcome);

  const current = currentTurnHype(player);
  const projected = projectedHypeAfterSuggestion(player, suggestion);
  const hypeGain = Math.max(0, projected - current);
  const nextThreshold = HYPE_THRESHOLDS.find((value) => current < value && projected >= value && !(player.turnHypeClaims || []).includes(value)) || null;
  if (nextThreshold) {
    const reward = hypeRewardForTier(player, nextThreshold);
    chips.push({ label: `掉 ${reward?.label || "奖励"}`, tone: "reward" });
  }

  const quest = currentTurnQuest(player);
  if (suggestion.ribbon === "任务线" && quest && !quest.completed) chips.push({ label: `任务 ${shortQuestReward(quest)}`, tone: "reward" });
  if (hypeGain > 0) chips.push({ label: `热度 +${hypeGain}`, tone: suggestion.ribbon === "冲奖" ? "reward" : "support" });

  const scoreGain = suggestionShowtimeGain(player, suggestion);
  if (scoreGain > 0) {
    let tone = "support";
    if (["disaster", "skill", "move_attack_face", "move_attack_creature"].includes(suggestion.kind)) tone = "trick";
    if (["attack_face", "attack_creature"].includes(suggestion.kind)) tone = "attack";
    chips.push({ label: `节目分约 +${scoreGain}`, tone });
  }

  return uniquePayoffChips(chips).slice(0, 4);
}

function payoffChipMarkup(chips = []) {
  return chips
    .filter((chip) => chip?.label)
    .map((chip) => `<span class="payoff-chip tone-${escapeHtml(chip.tone || "support")}">${escapeHtml(chip.label)}</span>`)
    .join("");
}

function buildPublicDrawCueSuggestions(player) {
  if (!player || !game) return [];
  const configs = [
    {
      pile: "A",
      cost: 3,
      baseScore: 2.75,
      label: "抽强牌A",
      note: "想直接摸狠货，可以去 A 池捞高费大哥。",
    },
    {
      pile: "B",
      cost: 2,
      baseScore: 3,
      label: "抽中牌B",
      note: "B 池最稳，很多时候补完就能直接接动作。",
    },
    {
      pile: "C",
      cost: 2,
      baseScore: 2.65,
      label: "抽小牌C",
      note: "C 池更像补位和凑人数，没灵感时也挺顺手。",
    },
  ];
  return configs
    .filter((config) => player.food >= config.cost && game.publicPiles[config.pile]?.length)
    .map((config) => ({
      key: suggestionKey("draw-public", config.pile),
      kind: `draw_public_${config.pile}`,
      score: config.baseScore
        + (player.hand.length <= 2 ? 0.45 : 0)
        + (config.pile === "A" && player.food >= 6 ? 0.2 : 0)
        + (config.pile === "C" && boardCards(player).length >= 2 ? 0.15 : 0),
      label: config.label,
      note: config.note,
      title: `花 ${config.cost} 食物抽 1 张 ${config.pile} 类公共牌。`,
    }));
}

function decorateSuggestionForCue(player, suggestion) {
  if (!player || !suggestion) return suggestion;
  let decorated = { ...suggestion };
  const quest = currentTurnQuest(player);
  const questSuggestion = bestQuestSuggestion(player, quest);
  if (questSuggestion?.key === suggestion.key) {
    decorated = {
      ...decorated,
      score: (decorated.score || 0) + 4,
      ribbon: decorated.ribbon || "任务线",
      note: String(decorated.note || "").includes(quest?.rewardLabel || "")
        ? decorated.note
        : `${decorated.note || "这步现在很值。"} 做完这步立刻拿${quest?.rewardLabel || "奖励"}。`,
    };
  }

  const current = currentTurnHype(player);
  const projected = projectedHypeAfterSuggestion(player, decorated);
  const nextThreshold = HYPE_THRESHOLDS.find((value) => current < value && projected >= value && !(player.turnHypeClaims || []).includes(value));
  if (nextThreshold) {
    const reward = hypeRewardForTier(player, nextThreshold);
    decorated = {
      ...decorated,
      score: (decorated.score || 0) + 1.6,
      ribbon: decorated.ribbon || "冲奖",
      note: String(decorated.note || "").includes("热度推到")
        ? decorated.note
        : `${decorated.note || "这步现在很值。"} 这步还能把热度推到 ${nextThreshold}，顺手拿“${reward?.label || "喝彩奖励"}”。`,
    };
  }
  return decorated;
}

function findBestResourceCueSuggestion(player) {
  return [findBestDrawSuggestion(player), ...buildPublicDrawCueSuggestions(player)]
    .filter(Boolean)
    .map((candidate) => decorateSuggestionForCue(player, candidate))
    .sort((a, b) => (b.score || 0) - (a.score || 0))[0] || null;
}

function buildRecoverCueSuggestion(player, loc) {
  if (!player || !loc?.card) return null;
  if (recoverReadyError(player, loc)) return null;
  return {
    key: suggestionKey("recover", loc.card.uid),
    kind: "recover",
    score: 2.55 + (player.food <= 2 ? 0.15 : 0),
    cardUid: loc.card.uid,
    label: `叫醒 ${loc.card.name}`,
    note: `它现在在休息。先花 1 粮把它叫回台上，后面才有活可整。`,
    title: `花 1 食物让 ${loc.card.name} 复工。`,
  };
}

function buildMoveCueSuggestion(player, loc) {
  if (!player || !loc?.card) return null;
  if (moveReadyError(player, loc)) return null;
  const slots = moveSlotsFor(player, loc);
  if (!slots.length) return null;
  const slot = slots[0];
  return {
    key: suggestionKey("move", loc.card.uid, slot.lane, String(slot.slotIndex)),
    kind: "move",
    score: 2.4 + slots.length * 0.12,
    cardUid: loc.card.uid,
    lane: slot.lane,
    slotIndex: slot.slotIndex,
    label: `${loc.card.name} 换线找位`,
    note: `先挪去${laneLabel(slot.lane)}找角度，很多时候右边攻击路线就会自己亮。`,
    title: `免费移动 ${loc.card.name}，每回合限 1 次。`,
  };
}

function buildSacrificeCueSuggestion(player, loc) {
  if (!player || !loc?.card || player.turnSacrifices >= 1) return null;
  return {
    key: suggestionKey("sacrifice", loc.card.uid),
    kind: "sacrifice",
    score: 0.9 + (player.food <= 1 ? 1.3 : 0) + (loc.card.state === "rest" ? 0.25 : 0),
    cardUid: loc.card.uid,
    label: `${loc.card.name} 当食物`,
    note: "这步有点黑色幽默，但能马上回 1 粮，适合断粮时救火。",
    title: `让 ${loc.card.name} 离场并获得 1 食物。`,
  };
}

function findBestTacticsCueSuggestion(player) {
  if (!player) return null;
  const selectedBoard = currentSelectedBoard(player);
  return [
    findBestDisasterSuggestion(player),
    findBestSkillSuggestion(player),
    findBestMoveAttackSuggestion(player, selectedBoard ? { preferredUid: selectedBoard.card.uid } : {}),
    buildRecoverCueSuggestion(player, selectedBoard),
    buildMoveCueSuggestion(player, selectedBoard),
    buildSacrificeCueSuggestion(player, selectedBoard),
  ]
    .filter(Boolean)
    .map((candidate) => decorateSuggestionForCue(player, candidate))
    .sort((a, b) => (b.score || 0) - (a.score || 0))[0] || null;
}

function actionCueToneForSuggestion(suggestion) {
  if (!suggestion) return "support";
  if (suggestion.ribbon === "任务线" || suggestion.ribbon === "冲奖" || suggestion.kind === "sacrifice") return "reward";
  if (["attack_face", "attack_creature", "defense_pass", "creature_pass"].includes(suggestion.kind)) return "attack";
  if (["disaster", "skill", "move_attack_face", "move_attack_creature", "move"].includes(suggestion.kind)) return "trick";
  return "support";
}

function actionCueMessageState({ badge = "提示", title = "", note = "", tone = "support", chips = [] } = {}) {
  return {
    badge,
    title,
    note,
    tone,
    chips: uniquePayoffChips(chips).slice(0, 4),
  };
}

function actionCueStateFromSuggestion(player, suggestion, overrides = {}) {
  if (!suggestion) return null;
  return actionCueMessageState({
    badge: overrides.badge || playbookBadgeText(suggestion, 0),
    title: overrides.title || suggestion.label || "这步现在最顺",
    note: overrides.note ?? suggestion.note ?? "",
    tone: overrides.tone || actionCueToneForSuggestion(suggestion),
    chips: overrides.chips || buildSuggestionPayoffChips(player, suggestion),
  });
}

function buildActionBandCueStates(player = activePlayer()) {
  if (!game || !player) {
    return {
      resource: actionCueMessageState({ badge: "待机", title: "先开一局", note: "新开局后，这里会告诉你每组按钮现在更适合干嘛。", tone: "support" }),
      tactics: actionCueMessageState({ badge: "待机", title: "先开一局", note: "新开局后，这里会告诉你每组按钮现在更适合干嘛。", tone: "support" }),
      pressure: actionCueMessageState({ badge: "待机", title: "先开一局", note: "新开局后，这里会告诉你每组按钮现在更适合干嘛。", tone: "support" }),
      defense: actionCueMessageState({ badge: "待机", title: "先开一局", note: "新开局后，这里会告诉你每组按钮现在更适合干嘛。", tone: "support" }),
    };
  }

  const selectedHand = currentSelectedHand(player);
  const selectedBoard = currentSelectedBoard(player);
  const reactionMode = canHumanResolveDefense();
  const moveMode = selected?.type === "board" && selected?.uid === selectedBoard?.card?.uid && selected?.mode === "move";
  const ownBoardCount = boardCards(player).length;
  const enemy = opponentPlayer();
  const resourceSuggestion = findBestResourceCueSuggestion(player);
  const tacticsSuggestion = findBestTacticsCueSuggestion(player);
  const pressureSuggestion = decorateSuggestionForCue(player, findBestAttackSuggestion(player, selectedBoard ? { preferredUid: selectedBoard.card.uid } : {}));
  const moveAttackSuggestion = selectedBoard
    ? decorateSuggestionForCue(player, findBestMoveAttackSuggestion(player, { preferredUid: selectedBoard.card.uid }))
    : null;
  const defenseSuggestion = reactionMode ? bestDefenseSuggestion()[0] || null : null;

  if (vsAI && game.active === 1 && !pendingDefense) {
    const watch = buildAIPreviewState(player);
    const suggestion = watch.suggestion;
    const resource = suggestion?.kind === "draw_private"
      ? actionCueStateFromSuggestion(player, suggestion, {
          badge: "它像补牌",
          title: "这组先看它翻口袋",
          note: "手牌虽然对你隐藏，但补完以后它下一手通常会更清楚。",
          tone: "support",
        })
      : suggestion?.kind === "summon"
        ? actionCueStateFromSuggestion(player, suggestion, {
            badge: "它像补场",
            title: "这组现在主要在看它会不会补站场",
            note: "手牌不公开，所以重点盯棋盘发亮空格。",
            tone: "support",
          })
        : actionCueMessageState({
            badge: "观战",
            title: "资源组现在只负责报风向",
            note: "轮到你之前，不需要按；它更像是在决定补牌还是补场。",
            tone: "support",
            chips: watch.chips,
          });
    const tactics = ["disaster", "skill", "move", "move_attack_face", "move_attack_creature", "recover", "sacrifice"].includes(suggestion?.kind)
      ? actionCueMessageState({
          badge: watch.badge || "它像整活",
          title: watch.title || "先看它的花活",
          note: watch.detail || "这一组会先把它准备动的那几处讲清楚。",
          tone: watch.tone === "hot" ? "reward" : (watch.tone || "trick"),
          chips: watch.chips,
        })
      : actionCueMessageState({
          badge: "观战",
          title: "整活组现在只是字幕机",
          note: "如果它准备开绝活、换线或抽环境牌，这里会先说人话。",
          tone: "trick",
          chips: watch.chips,
        });
    const pressure = ["attack_face", "attack_creature", "move_attack_face", "move_attack_creature"].includes(suggestion?.kind)
      ? actionCueMessageState({
          badge: watch.badge || "它像开咬",
          title: watch.title || "它更像往这边下口",
          note: suggestion?.kind === "attack_face" || suggestion?.kind === "move_attack_face"
            ? "只要真的要冲脸，防守选择会立刻接管这次攻击。"
            : "盯住红框目标，基本就是它这拍最像先处理的对象。",
          tone: "attack",
          chips: watch.chips,
        })
      : actionCueMessageState({
          badge: "观战",
          title: "压力组先帮你盯红框",
          note: "它真准备咬人的时候，这里和棋盘会一起亮目标。",
          tone: "attack",
          chips: watch.chips,
        });
    const defense = actionCueMessageState({
      badge: "待机",
      title: "只有你被点名时才会亮",
      note: "它一旦冲脸或触发保护动物结算，这组就会临时接管镜头。",
      tone: "support",
    });
    return { resource, tactics, pressure, defense };
  }

  let resource = actionCueMessageState({
    badge: "补牌",
    title: "这组现在不急",
    note: "食物和手牌都还行，先做别的也很正常。",
    tone: "support",
  });
  if (reactionMode) {
    resource = actionCueMessageState({
      badge: "暂停",
      title: "先把防守结完",
      note: "这会儿镜头锁在防守流程，补牌按钮先让路。",
      tone: "support",
    });
  } else if (moveMode) {
    resource = actionCueMessageState({
      badge: "先走位",
      title: "先把这次移动落位",
      note: "点棋盘发亮空格，或者取消选择。落位后再回来补牌。",
      tone: "support",
    });
  } else if (selectedHand) {
    resource = actionCueMessageState({
      badge: "先落位",
      title: `先把《${selectedHand.card.name}》放上去`,
      note: "点棋盘发亮空格让它进组，落地后再考虑补牌更清楚。",
      tone: "support",
    });
  } else if (resourceSuggestion) {
    resource = actionCueStateFromSuggestion(player, resourceSuggestion);
  } else if (player.food < 1) {
    resource = actionCueMessageState({
      badge: "缺粮",
      title: "现在没食物补牌",
      note: "先靠任务、献祭或下一轮回粮，再来开抽。",
      tone: "support",
    });
  } else {
    resource = actionCueMessageState({
      badge: "见底了",
      title: "这组能摸的牌不多了",
      note: "私有和公共池都快见底，先把场上资源榨干也行。",
      tone: "support",
    });
  }

  let tactics = actionCueMessageState({
    badge: "整活",
    title: "这组现在没特别顺的主秀",
    note: "没必要为了热闹硬点，先看站场或补牌也行。",
    tone: "trick",
  });
  if (reactionMode) {
    tactics = actionCueMessageState({
      badge: "暂停",
      title: "这会儿先别整活",
      note: "防守流程没结完之前，这组只是观众席。",
      tone: "support",
    });
  } else if (selectedHand) {
    tactics = actionCueMessageState({
      badge: "先上台",
      title: `先让《${selectedHand.card.name}》进组`,
      note: "场上有演员以后，绝活和换线按钮才会更像回事。",
      tone: "support",
    });
  } else if (moveMode) {
    tactics = actionCueMessageState({
      badge: "移动中",
      title: "现在就去点发亮空格",
      note: "先把位置落下去。想反悔就点“取消选择”。",
      tone: "trick",
      chips: [{ label: "-1 食物", tone: "trick" }, { label: "节目分约 +10", tone: "trick" }],
    });
  } else if (tacticsSuggestion) {
    if (tacticsSuggestion.kind === "move_attack_face" || tacticsSuggestion.kind === "move_attack_creature") {
      tactics = actionCueStateFromSuggestion(player, tacticsSuggestion, {
        title: `先点移动，让 ${cardNameFromUid(tacticsSuggestion.cardUid, "这只")} 换线`,
        note: tacticsSuggestion.kind === "move_attack_face"
          ? `先挪到${laneLabel(tacticsSuggestion.lane)}，右边就更像能直接冲脸。`
          : `先挪到${laneLabel(tacticsSuggestion.lane)}，右边通常就会亮出能收的目标。`,
      });
    } else {
      tactics = actionCueStateFromSuggestion(player, tacticsSuggestion);
    }
  } else if (!ownBoardCount && player.hand.length) {
    tactics = actionCueMessageState({
      badge: "先开场",
      title: "先让一只动物上桌",
      note: "场上还没人，这组大多数按钮都还没轮到表演。",
      tone: "support",
    });
  } else if (!selectedBoard) {
    tactics = actionCueMessageState({
      badge: "先点它",
      title: "先选一只己方生物",
      note: "大多数整活都得先锁定台上的一只，环境牌除外。",
      tone: "support",
    });
  } else {
    tactics = actionCueMessageState({
      badge: "换人",
      title: `《${selectedBoard.card.name}》这会儿没太多活`,
      note: "你可以换别的生物来整，或者干脆先打、先补牌。",
      tone: "support",
    });
  }

  let pressure = actionCueMessageState({
    badge: "开打",
    title: "右边现在不急着按",
    note: "这回合可以先补牌、调度，等线路亮了再压。",
    tone: "attack",
  });
  if (reactionMode) {
    pressure = actionCueMessageState({
      badge: "暂停",
      title: "先把这波防守结掉",
      note: "等这一下挨完或挡完，再回来谈进攻。",
      tone: "support",
    });
  } else if (selectedHand) {
    pressure = actionCueMessageState({
      badge: "先上台",
      title: `先把《${selectedHand.card.name}》放上去`,
      note: "生物没落地，右侧的攻击路线不会亮。",
      tone: "support",
    });
  } else if (moveMode) {
    pressure = actionCueMessageState({
      badge: "先落位",
      title: "先把这次移动走完",
      note: "位置站稳以后，右边目标才会按新的线路亮起来。",
      tone: "support",
    });
  } else if (pressureSuggestion) {
    pressure = actionCueStateFromSuggestion(player, pressureSuggestion);
  } else if (!ownBoardCount && player.hand.length) {
    pressure = actionCueMessageState({
      badge: "先开场",
      title: "先让一只动物进组",
      note: "场上没人时，右边这组只会看起来很认真。",
      tone: "support",
    });
  } else if (!selectedBoard) {
    pressure = actionCueMessageState({
      badge: "先点它",
      title: "先选一只己方生物",
      note: "右侧能打的按钮和目标，会跟着你选中的生物一起亮。",
      tone: "support",
    });
  } else if (moveAttackSuggestion) {
    pressure = actionCueStateFromSuggestion(player, moveAttackSuggestion, {
      badge: "差个身位",
      title: `先给《${selectedBoard.card.name}》换个位置`,
      note: moveAttackSuggestion.kind === "move_attack_face"
        ? `左边先点“免费换线”，挪完去${laneLabel(moveAttackSuggestion.lane)}，这口就能冲脸。`
        : `左边先点“免费换线”，挪完去${laneLabel(moveAttackSuggestion.lane)}，回来就更像能收人。`,
    });
  } else if (availableTaunts(enemy, selectedBoard.card).length > 0) {
    const taunt = availableTaunts(enemy, selectedBoard.card)[0];
    pressure = actionCueMessageState({
      badge: "先拆墙",
      title: `先处理《${taunt.card.name}》`,
      note: "对面有嘲讽挡着，这只现在还不能直接冲脸。",
      tone: "attack",
    });
  } else {
    pressure = actionCueMessageState({
      badge: "够不到",
      title: `《${selectedBoard.card.name}》现在暂时够不到`,
      note: "换别的生物试试，或者先去左边调个位置。",
      tone: "support",
    });
  }

  const defensePlayer = defendingPlayer() || player;
  const defense = defenseSuggestion
    ? actionCueStateFromSuggestion(defensePlayer, defenseSuggestion, { tone: actionCueToneForSuggestion(defenseSuggestion) })
    : actionCueMessageState({
      badge: "待机",
      title: "被点名时才会亮",
      note: "只有动物格挡、玩家承受打击这些时刻，防守组才会接管镜头。",
      tone: "support",
    });

  return { resource, tactics, pressure, defense };
}

function renderActionBandCues() {
  if (!els.resourceCue || !els.tacticsCue || !els.pressureCue || !els.defenseCue) return;
  const states = buildActionBandCueStates(activePlayer());
  [
    [els.resourceCue, states.resource],
    [els.tacticsCue, states.tactics],
    [els.pressureCue, states.pressure],
    [els.defenseCue, states.defense],
  ].forEach(([element, state]) => {
    const chips = payoffChipMarkup(state?.chips || []);
    element.className = `action-cue tone-${escapeHtml(state?.tone || "support")}`;
    element.innerHTML = `
      <div class="action-cue-head">
        <span class="action-cue-badge">${escapeHtml(state?.badge || "提示")}</span>
        <strong class="action-cue-title">${escapeHtml(state?.title || "")}</strong>
      </div>
      ${state?.note ? `<div class="action-cue-note">${escapeHtml(state.note)}</div>` : ""}
      ${chips ? `<div class="action-cue-payoff payoff-strip">${chips}</div>` : ""}
    `;
  });
}

function slotLabelText(lane, slotIndex) {
  if (!lane && lane !== "") return "";
  if (slotIndex === undefined || slotIndex === null) return laneLabel(lane);
  return `${laneLabel(lane)}第${Number(slotIndex) + 1}格`;
}

function buildGuideFocusState(player, suggestion) {
  if (!game) {
    return {
      tone: "support",
      label: "导播台待机",
      title: "新开一局后，这里会直接说人话。",
      detail: "先开局，再看手牌、亮格和战报自己决定路线。",
      chips: ["新开一局", "自己来", "也能乱来"],
    };
  }
  if (pendingDefense?.kind === "face") {
    const defense = buildPendingDefenseState();
    const blocker = defense?.blockerLoc;
    return {
      tone: "danger",
      mode: "decision",
      label: "这一口只看中间",
      title: blocker?.card
        ? `先定《${blocker.card.name}》是否动物格挡`
        : `这口没有动物能格挡，只剩玩家 -${defense?.attackValue || 0}`,
      detail: blocker?.card
        ? defense?.canSwapBlocker
          ? "想换格挡动物就点桌上黄框；不换就直接在中间做决定。"
          : `动物格挡是《${blocker.card.name}》；玩家承受打击会直接掉 ${defense?.attackValue || 0} 血。`
        : "这下只剩直接结算，结完就会自己回主回合。",
      chips: blocker?.card
        ? [
            `动物格挡：${blocker.card.name}`,
            `玩家承受：-${defense?.attackValue || 0}`,
            defense?.canSwapBlocker ? "黄框 = 换人" : (defense?.leak ? `漏 ${defense.leak}` : "只结这一口"),
          ]
        : [`玩家 -${defense?.attackValue || 0}`, "结完回主回合"],
    };
  }
  if (pendingDefense?.kind === "creature") {
    const defense = buildPendingDefenseState();
    return {
      tone: "danger",
      mode: "decision",
      label: "这一口只判保不保",
      title: `《${defense?.targetName || "它"}》值不值 ${defense?.attackValue || 0} 血`,
      detail: defense?.venom
        ? "玩家承受打击会顺手把这口附带特技也一起扛掉。"
        : "玩家承受打击保住动物；让动物承受伤害则按普通战斗结算。",
      chips: [
        `玩家承受：-${defense?.attackValue || 0}`,
        defense?.snapshot?.dies ? "动物承受：退场" : (defense?.snapshot?.rests ? "动物承受：休息" : "动物承受：照常结算"),
        "结完回主回合",
      ],
    };
  }
  if (vsAI && game.active === 1) {
    const beat = buildAIDirectorBeat(activePlayer());
    const watch = beat.previewWatch || buildAIPreviewState(activePlayer(), beat.previewSuggestion);
    return {
      tone: watch.tone || beat.tone || "ai",
      label: watch.badge || beat.badge || "镜头给到 AI",
      title: watch.title || beat.title || `${currentAIPersona().label} 正在盘算下一手`,
      detail: watch.detail || beat.detail || `${currentAIPersona().blurb} 先看右边场地和日志，它交完动作后你再接管。`,
      chips: (watch.chips || beat.chips || []).map((chip) => chip.label || chip).slice(0, 3),
    };
  }

  const selectedLoc = currentSelectedLocation();
  if (!selectedLoc) {
    if (!suggestion) {
      return {
        tone: "support",
        label: "镜头还没锁定",
        title: "这回合没有唯一标准答案。",
        detail: "你可以自己挑一手，也可以先摸牌、补场，或者干脆留资源。",
        chips: ["先看手牌", "自己试怪招", "没灵感就结束回合"],
      };
    }

    if (suggestion.kind === "summon") {
      const card = findCardLocation(suggestion.cardUid)?.card;
      const role = inferCardRole(card);
      const slotText = slotLabelText(suggestion.lane, suggestion.slotIndex);
      if (isOpeningFastTrackMoment(player, suggestion)) {
        return {
          tone: role.tone || "support",
          label: `第一把先上《${card?.name || "这只动物"}》`,
          title: `先点《${card?.name || "这只动物"}》，再点 ${slotText}`,
          detail: suggestion.note || role.blurb,
          chips: ["就两下", `推荐 ${slotText}`, "做完再看下一拍"],
        };
      }
      return {
        tone: role.tone || "support",
          label: `《${card?.name || "这只动物"}》可以上场`,
          title: `${role.label} · 可放 ${slotText}`,
          detail: suggestion.note || role.blurb,
          chips: ["点手牌", `点 ${slotText}`, "也可以换别的牌"],
      };
    }
    if (suggestion.kind === "draw_private") {
      return {
        tone: "support",
        label: "现在可以补牌",
        title: suggestion.label,
        detail: suggestion.note || "先补一张，后面的路线会清楚很多。",
        chips: ["抽自己牌 -1", "看新手牌", "有时候怪招就差这张"],
      };
    }
    if (suggestion.kind === "skill") {
      const card = findCardLocation(suggestion.cardUid)?.card;
      return {
        tone: "trick",
        label: `《${card?.name || "这只生物"}》有技能窗口`,
        title: `可开 ${card?.skill || "绝活"}`,
        detail: suggestion.note || "这手通常能顺便把热度和路线都带起来。",
        chips: [`先点《${card?.name || "它"}》`, `发动 ${card?.skill || "技能"}`, "很多时候会顺手领奖"],
      };
    }
    if (suggestion.kind === "attack_face" || suggestion.kind === "move_attack_face") {
      return {
        tone: "attack",
        label: "有压血机会",
        title: suggestion.label,
        detail: suggestion.note || "这手更像直接冲玩家，先把血线压下去。",
        chips: ["先点己方生物", `再点${faceAttackActionLabel()}`, "有嘲讽要先清掉"],
      };
    }
    if (suggestion.kind === "attack_creature" || suggestion.kind === "move_attack_creature") {
      return {
        tone: "attack",
        label: "有清场机会",
        title: suggestion.label,
        detail: suggestion.note || "这手更像先把对面的关键怪按住。",
        chips: ["先点己方生物", "再点亮起目标", "结算后通常会继续连招"],
      };
    }
    if (suggestion.kind === "disaster") {
      const disaster = currentTurnDisaster(player);
      return {
        tone: "hot",
        label: "镜头先给节目效果",
        title: "环境牌现在值得赌一炸",
        detail: suggestion.note || "这手不只是热闹，多半还能顺手赚场面。",
        chips: ["抽环境牌", "暗抽自动发动", "炸完再接下一手"],
      };
    }
    return {
      tone: "support",
      label: "当前可选动作",
      title: suggestion.label || "这步现在最顺",
      detail: suggestion.note || "这只是一个可执行动作，你也可以从手牌、场地或补牌重新起手。",
      chips: ["看亮格", "看费用", "可以换思路"],
    };
  }

  if (selectedLoc.type === "hand") {
    const role = inferCardRole(selectedLoc.card);
    const recommendedSlot = suggestion?.kind === "summon" && suggestion.cardUid === selectedLoc.card.uid
      ? slotLabelText(suggestion.lane, suggestion.slotIndex)
      : "";
    return {
      tone: role.tone || "support",
      label: `手里正捏着《${selectedLoc.card.name}》`,
      title: `${role.label} · 上场费 ${summonCost(selectedLoc.card)}`,
      detail: recommendedSlot
        ? `${role.blurb} 它现在能去 ${placementText(selectedLoc.card)}，其中 ${recommendedSlot} 的节奏最顺。`
        : `${role.blurb} 它现在能去 ${placementText(selectedLoc.card)}。`,
      chips: [
        "点发亮空格",
        recommendedSlot ? `推荐 ${recommendedSlot}` : `可放 ${placementText(selectedLoc.card)}`,
        "不想下就取消选择",
      ],
    };
  }

  if (selectedLoc.player.id === player.id) {
    const role = inferCardRole(selectedLoc.card);
    const enemy = opponentPlayer();
    const freshStinger = currentFreshActionStingerEvent();
    const chips = [];
    if (!activeSkillReadyError(player, selectedLoc.card)) chips.push(`发动 ${selectedLoc.card.skill} -${skillCost(selectedLoc.card)}`);
    if (moveReadyError(player, selectedLoc) === "") chips.push("免费换线");
    const targets = legalCreatureTargets(selectedLoc, enemy);
    if (targets.length) chips.push(`打目标 x${targets.length}`);
    if (canFaceAttackNow(player, selectedLoc.card, enemy)) chips.push(`冲脸 -${faceAttackCost(selectedLoc.card, enemy)}`);
    if (!recoverReadyError(player, selectedLoc)) chips.push("复工 -1");
    if (chips.length < 3 && player.turnSacrifices < 1) chips.push("当食物 +1");
    const recommendedText = suggestion?.cardUid === selectedLoc.card.uid
      ? suggestion.label
      : "";
    if (freshStinger) {
      return {
        tone: recommendedText ? (actionCueToneForSuggestion(suggestion) || role.tone || "support") : (role.tone || "support"),
        mode: "quiet",
        label: `《${selectedLoc.card.name}》已经开麦`,
        title: recommendedText ? `现在直接点：${recommendedText}` : "现在先看下面亮起动作",
        detail: recommendedText
          ? "不用再对流程，下面亮起的动作会直接把这一口结掉。"
          : "先按下面亮起的动作就行，不用回头再把设定说明读一遍。",
        chips: chips.length ? chips.slice(0, 3) : ["亮起动作可直接走", "结完再看下一拍", "不想演了再考虑收手"],
      };
    }
    return {
      tone: role.tone || "support",
      label: `镜头给到你的《${selectedLoc.card.name}》`,
      title: `${role.label} · ${slotLabelText(selectedLoc.lane, selectedLoc.slotIndex)}`,
      detail: recommendedText
        ? `${role.blurb} 这只现在最顺的动作是：${recommendedText}。`
        : role.blurb,
      chips: chips.length ? chips.slice(0, 3) : ["这只现在不太适合出手", "可以换别的生物", "或者先取消选择"],
    };
  }

  return {
    tone: "trick",
    label: `你正在盯《${selectedLoc.card.name}》`,
    title: "它现在只是个目标，不是自己人。",
    detail: "先回左边选一只己方生物，再回来点它，这样才会真正出手。",
    chips: ["先选己方生物", "再点这个目标", "右侧亮起时就能打"],
  };
}

function renderGuideFocus(player, suggestion) {
  if (!els.guideFocus) return;
  if (game && !pendingDefense && !(vsAI && game.active === 1) && !currentSelectedLocation() && shouldQuietOpeningIntel(player) && suggestion) {
    els.guideFocus.className = "guide-focus hidden";
    els.guideFocus.innerHTML = "";
    return;
  }
  const focus = buildGuideFocusState(player, suggestion);
  const chips = (focus.chips || [])
    .filter(Boolean)
    .map((chip) => `<span class="guide-focus-chip">${escapeHtml(chip)}</span>`)
    .join("");
  els.guideFocus.className = `guide-focus tone-${focus.tone || "support"}${focus.mode ? ` is-${focus.mode}` : ""}`;
  els.guideFocus.innerHTML = `
    <div class="guide-focus-label">${escapeHtml(focus.label || "镜头待定")}</div>
    <strong class="guide-focus-title">${escapeHtml(focus.title || "")}</strong>
    <div class="guide-focus-detail">${escapeHtml(focus.detail || "")}</div>
    ${chips ? `<div class="guide-focus-chips">${chips}</div>` : ""}
  `;
}

function renderGuideActions() {
  if (!els.guideActions || !els.guidePrimaryBtn || !els.guideMeta || !els.guidePayoff || !els.guideCue || !els.guideShortcut) return;
  const player = activePlayer();
  renderCuePill(els.guideCue, player);
  els.guideActions.classList.toggle("is-opening-spotlight", false);
  els.guidePrimaryBtn.classList.toggle("is-opening-spotlight", false);

  if (!game) {
    els.guidePrimaryBtn.disabled = true;
    els.guidePrimaryBtn.textContent = "等待开局";
    els.guidePrimaryBtn.className = "guide-primary";
    els.guideMeta.textContent = "新开一局后，这里会显示当前可执行动作。";
    els.guidePayoff.innerHTML = "";
    els.guideShortcut.textContent = "";
    renderGuideFocus(player, null);
    return;
  }

  if (isOnlineMode() && !onlineCanControlCurrentDecision()) {
    els.guidePrimaryBtn.disabled = true;
    els.guidePrimaryBtn.textContent = pendingDefense ? "等对方防守" : "等对方行动";
    els.guidePrimaryBtn.className = "guide-primary";
    els.guideMeta.textContent = onlineWaitingDetail();
    els.guidePayoff.innerHTML = "";
    els.guideShortcut.textContent = onlineSession.conn?.open ? "在线房间会在对方动作后自动同步。" : "等连接建立后再开始对局。";
    renderGuideFocus(player, null);
    return;
  }

  if (vsAI && game.active === 1 && !pendingDefense) {
    const beat = buildAIDirectorBeat(activePlayer());
    const watch = beat.previewWatch || buildAIPreviewState(activePlayer(), beat.previewSuggestion);
    els.guidePrimaryBtn.disabled = true;
    els.guidePrimaryBtn.textContent = aiThinking ? "看 AI 行动" : "当前是 AI 回合";
    els.guidePrimaryBtn.className = "guide-primary";
    els.guideMeta.textContent = watch.detail || beat.detail || "现在先看右边和日志，等它交完动作再接管。";
    els.guidePayoff.innerHTML = payoffChipMarkup(watch.chips || beat.chips || []);
    els.guideShortcut.textContent = watch.suggestion
      ? "盯住右侧场地的高亮，基本就是它眼下最可能动的几处。"
      : beat.liveCount
        ? `它已经演了 ${beat.liveCount} 手，别眨眼。`
        : "先看它起手，马上就知道这回合什么路数。";
    renderGuideFocus(player, null);
    return;
  }

  const suggestion = currentPrimarySuggestion();
  const spotlight = shouldSpotlightOpeningPrimary(player, suggestion);
  const actionSpotlight = !spotlight ? currentActionButtonSpotlight(player) : null;
  const directSpotlight = !spotlight && !actionSpotlight ? currentDirectInteractionSpotlight(player) : null;
  els.guideActions.classList.toggle("is-opening-spotlight", spotlight);
  els.guidePrimaryBtn.className = "guide-primary";
  els.guidePrimaryBtn.classList.toggle("is-opening-spotlight", spotlight);
  if (suggestion?.ribbon === "任务线") els.guidePrimaryBtn.classList.add("is-quest");
  if (suggestion?.ribbon === "冲奖") els.guidePrimaryBtn.classList.add("is-hype");
  if (pendingDefense) els.guidePrimaryBtn.classList.add("is-defense");

  els.guidePrimaryBtn.textContent = guidePrimaryLabel(suggestion);
  els.guidePrimaryBtn.disabled = !suggestion || game.winner !== null || aiThinking;
  els.guideMeta.textContent = guidePrimaryMeta(player, suggestion);
  els.guidePayoff.innerHTML = payoffChipMarkup(buildSuggestionPayoffChips(player, suggestion));
  els.guideShortcut.textContent = pendingDefense
    ? pendingDefenseGuideShortcut()
    : spotlight
      ? "这颗可直接执行；空格也能走"
    : actionSpotlight?.cueText
      ? actionSpotlight.cueText
    : directSpotlight?.cueText
      ? directSpotlight.cueText
    : suggestion
      ? "桌面端按空格也能走这手"
      : "没有明显动作时，就按自己的节奏来";
  renderGuideFocus(player, suggestion);
}

function renderMobileGuide() {
  if (!els.mobileGuide || !els.mobileGuideBadge || !els.mobileGuideSummary || !els.mobileGuidePayoff || !els.mobileGuidePrimaryBtn) return;

  const player = activePlayer();
  let badge = "下一拍";
  let buttonLabel = "执行动作";
  let summary = "新开局后，这里会显示当前可执行的一拍。";
  let chips = [];
  let disabled = true;

  els.mobileGuide.className = "mobile-guide tone-support";
  els.mobileGuidePrimaryBtn.className = "guide-primary mobile-guide-primary";

  if (!game) {
    badge = "待开局";
    buttonLabel = "等待开局";
    summary = "新开一局后，这里会显示当前可执行的一拍。";
  } else if (game.winner !== null) {
    const winner = game.players[game.winner];
    badge = "本局收官";
    buttonLabel = "本局已结束";
    summary = `${winner?.name || "有人"} 已经拿下这一局，先看上面的收官总结。`;
    chips = [{ label: "战报已入柜", tone: "reward" }];
    els.mobileGuide.classList.add("tone-reward");
  } else if (isOnlineMode() && !onlineCanControlCurrentDecision()) {
    badge = pendingDefense ? "等对方防守" : "等对方行动";
    buttonLabel = "在线观战中";
    summary = onlineWaitingDetail();
    chips = [{ label: onlineSession.conn?.open ? "已连接" : "连接中", tone: "support" }];
  } else if (pendingDefense) {
    const suggestion = currentPrimarySuggestion();
    badge = pendingDefense.kind === "face" ? "先挡这口" : "先判保护";
    buttonLabel = guidePrimaryLabel(suggestion);
    summary = mobileGuideSummary(player, suggestion);
    chips = buildSuggestionPayoffChips(player, suggestion).slice(0, 2);
    disabled = !suggestion || aiThinking;
    els.mobileGuide.classList.add("tone-warning");
    els.mobileGuidePrimaryBtn.classList.add("is-defense");
  } else if (vsAI && game.active === 1) {
    const beat = buildAIDirectorBeat(player);
    const watch = beat.previewWatch || buildAIPreviewState(player, beat.previewSuggestion);
    badge = watch.badge || beat.badge || "AI 回合";
    buttonLabel = aiThinking ? "看它先演" : "当前是 AI 回合";
    summary = watch.detail || beat.detail || mobileGuideSummary(player, null);
    chips = watch.chips || beat.chips || [];
    if (watch.tone === "attack" || beat.tone === "attack") els.mobileGuide.classList.add("tone-attack");
    else if (watch.tone === "hot" || beat.tone === "hot" || beat.tone === "warning") els.mobileGuide.classList.add("tone-warning");
    else els.mobileGuide.classList.add(`tone-${watch.tone || beat.tone || "ai"}`);
  } else {
    const suggestion = currentPrimarySuggestion();
    badge = suggestion ? playbookBadgeText(suggestion, 0) : "自由发挥";
    buttonLabel = suggestion ? guidePrimaryLabel(suggestion) : "这回合先自己来";
    summary = mobileGuideSummary(player, suggestion);
    chips = suggestion ? buildSuggestionPayoffChips(player, suggestion).slice(0, 2) : [];
    disabled = !suggestion || aiThinking;
    if (suggestion?.ribbon === "任务线") {
      els.mobileGuide.classList.add("tone-reward");
      els.mobileGuidePrimaryBtn.classList.add("is-quest");
    } else if (suggestion?.ribbon === "冲奖") {
      els.mobileGuide.classList.add("tone-warning");
      els.mobileGuidePrimaryBtn.classList.add("is-hype");
    } else if (suggestion?.selectedFocus) {
      els.mobileGuide.classList.add("tone-trick");
    } else if (suggestion) {
      els.mobileGuide.classList.add(`tone-${actionCueToneForSuggestion(suggestion)}`);
    }
  }

  els.mobileGuideBadge.textContent = badge;
  els.mobileGuideSummary.textContent = summary;
  els.mobileGuidePrimaryBtn.textContent = buttonLabel;
  els.mobileGuidePrimaryBtn.disabled = disabled;
  els.mobileGuidePayoff.innerHTML = payoffChipMarkup(chips);
}

function starterPills() {
  if (!game) return [];
  if (pendingDefense?.kind === "face") {
    const defense = buildPendingDefenseState();
    return [
      { label: "只判这一口", tone: "warning" },
      { label: defense?.blockerLoc?.card ? "格挡 / 承受" : `只能承受 ${defense?.attackValue || 0}` },
      { label: defense?.canSwapBlocker ? "黄框 = 换动物" : "结完回主回合" },
    ];
  }
  if (pendingDefense?.kind === "creature") {
    const defense = buildPendingDefenseState();
    return [
      { label: "只判这只", tone: "warning" },
      { label: `玩家承受 / 动物承受 · ${defense?.attackValue || 0} 血` },
      { label: defense?.venom ? "玩家承受会顺手挡毒" : "结完回主回合" },
    ];
  }
  if (vsAI && game.active === 1) {
    const beat = buildAIDirectorBeat(activePlayer());
    const watch = beat.previewWatch || buildAIPreviewState(activePlayer(), beat.previewSuggestion);
    return [
      { label: "先看 AI 出手", tone: "current" },
      { label: watch.badge || beat.badge || "对面在搞事" },
      { label: watch.suggestion ? "黄标 = 它眼下最像动" : (beat.liveCount ? `已演 ${beat.liveCount} 手` : "轮到你再接管") },
    ];
  }
  const suggestion = currentPrimarySuggestion();
  const loc = currentSelectedLocation();
  if (!selected && isOpeningFastTrackMoment(activePlayer(), suggestion)) {
    const titles = openingFastTrackTitles(suggestion);
    if (titles.length) {
      const pills = titles.slice(0, 3).map((label, index) => ({
        label,
        tone: index === 0 ? "current" : "",
      }));
      while (pills.length < 3) {
        pills.push({ label: pills.length === 1 ? "做完再看新机会" : "绿框亮了就继续点" });
      }
      return pills.slice(0, 3);
    }
  }
  if (!selected && game.turn <= 2) {
    return [
      { label: "先看手牌和亮格", tone: "current" },
      { label: "绿框 = 能下 / 能动" },
      { label: "红框 = 能打 / 能咬" },
    ];
  }
  if (loc?.type === "hand") {
    return [
      { label: `正在准备上《${loc.card.name}》`, tone: "current" },
      { label: "点发亮空格就能落子" },
      { label: "不想下就取消选择" },
    ];
  }
  if (loc?.type === "board" && loc.player.id === activePlayer().id) {
    return [
      { label: `《${loc.card.name}》已待命`, tone: "current" },
      { label: "右侧亮起 = 它打得到" },
      { label: "换线 / 复工 / 当食物也都在下面" },
    ];
  }
  if (suggestion) {
    return [
      { label: guidePrimaryLabel(suggestion), tone: "current" },
      { label: "亮起的地方就是这步能走的地方" },
      { label: "卡住了就看战报摘要下一拍" },
    ];
  }
  return [
    { label: "先看手牌和场地", tone: "current" },
    { label: "没赚头也可以补牌" },
    { label: "真没事做就结束回合" },
  ];
}

function renderStarterRail() {
  if (!els.starterRail) return;
  const pills = starterPills();
  els.starterRail.classList.toggle("hidden", pills.length === 0);
  els.starterRail.innerHTML = pills
    .map((pill) => `<span class="starter-pill ${pill.tone || ""}">${escapeHtml(pill.label)}</span>`)
    .join("");
}

function shortQuestReward(quest) {
  if (!quest) return "待做";
  if (quest.rewardType === "food") return "+1 粮";
  if (quest.rewardType === "draw_private") return "抽 1";
  if (quest.rewardType === "heal") return "回 1";
  return quest.rewardLabel || "待做";
}

function stageTabStatus(player = activePlayer()) {
  if (!game || !player) {
    return {
      playbook: { meta: "待开局", live: false },
      quest: { meta: "待翻", live: false },
      hype: { meta: "0 / 7", live: false },
      showtime: { meta: "热身", live: false },
    };
  }
  const suggestions = buildPlaybookSuggestions();
  const first = suggestions[0] || null;
  const quest = currentTurnQuest(player);
  const current = currentTurnHype(player);
  const nextThreshold = HYPE_THRESHOLDS.find((value) => !(player.turnHypeClaims || []).includes(value) && current < value);
  const combo = currentTurnShowtimeEvents(player).length;
  const showtimeScore = buildShowtimeScoreSummary(player);
  return {
    playbook: pendingDefense
      ? { meta: "先挡", live: true }
      : first?.ribbon === "任务线"
        ? { meta: "领奖", live: true }
        : first?.ribbon === "冲奖"
          ? { meta: "冲奖", live: true }
          : first?.kind === "summon"
            ? { meta: "先上", live: false }
            : first?.kind === "draw_private"
              ? { meta: "补牌", live: false }
              : first?.kind === "end_turn"
                ? { meta: "收手", live: false }
                : first
                  ? { meta: "可动", live: ["skill", "attack_face", "attack_creature", "move_attack_face", "move_attack_creature"].includes(first.kind) }
                  : { meta: "自由", live: false },
    quest: !quest
      ? { meta: "休整", live: false }
      : quest.completed
        ? { meta: "已领", live: true }
        : { meta: shortQuestReward(quest), live: false },
    hype: current >= HYPE_THRESHOLDS[HYPE_THRESHOLDS.length - 1]
      ? { meta: "拍桌了", live: true }
      : nextThreshold && nextThreshold - current === 1
        ? { meta: "差 1 点", live: true }
        : { meta: `${current} / ${HYPE_THRESHOLDS[HYPE_THRESHOLDS.length - 1]}`, live: current > 0 },
    showtime: combo > 0
      ? { meta: showtimeScore.tabMeta, live: true }
      : { meta: "热身", live: false },
  };
}

function intelTabStatus(player = activePlayer()) {
  if (!game) {
    return {
      report: { meta: "待开场", live: false },
      disaster: { meta: "待翻", live: false },
      pool: { meta: "A/B/C", live: false },
    };
  }
  const latest = game.history[game.history.length - 1] || null;
  const disaster = player ? currentTurnDisaster(player) : null;
  const poolCounts = `${game.publicPiles.A.length}/${game.publicPiles.B.length}/${game.publicPiles.C.length}`;
  let disasterMeta = "待抽";
  let disasterLive = false;
  if (player) {
    const ready = disasterReadyError(player, disaster, disasterVictimPlan(player, disaster)) === "";
    disasterMeta = player.turnDisasterUsed ? "已抽" : (ready ? "可抽" : `-${disasterCost(null)}`);
    disasterLive = ready;
  }
  return {
    report: latest
      ? { meta: logBadgeForAction(latest.action), live: isSpotlightAction(latest.action) }
      : { meta: "待开场", live: false },
    disaster: { meta: disasterMeta, live: disasterLive },
    pool: {
      meta: poolCounts,
      live: [game.publicPiles.A.length, game.publicPiles.B.length, game.publicPiles.C.length].some((count) => count <= 6),
    },
  };
}

function renderDeckShell() {
  const player = activePlayer();
  const stageStatus = stageTabStatus(player);
  const intelStatus = intelTabStatus(player);
  const stageEntries = [
    { key: "playbook", button: els.stageTabPlaybook, meta: els.stagePlaybookMeta, sheet: els.stageSheetPlaybook },
    { key: "quest", button: els.stageTabQuest, meta: els.stageQuestMeta, sheet: els.stageSheetQuest },
    { key: "hype", button: els.stageTabHype, meta: els.stageHypeMeta, sheet: els.stageSheetHype },
    { key: "showtime", button: els.stageTabShowtime, meta: els.stageShowtimeMeta, sheet: els.stageSheetShowtime },
  ];
  stageEntries.forEach((entry) => {
    if (entry.meta) entry.meta.textContent = stageStatus[entry.key]?.meta || "";
    if (entry.button) {
      entry.button.classList.toggle("is-active", activeStageTab === entry.key);
      entry.button.classList.toggle("is-live", !!stageStatus[entry.key]?.live);
    }
    if (entry.sheet) entry.sheet.classList.toggle("hidden", activeStageTab !== entry.key);
  });

  const intelEntries = [
    { key: "report", button: els.intelTabReport, meta: els.intelReportMeta, panel: els.logPanel },
    { key: "disaster", button: els.intelTabDisaster, meta: els.intelDisasterMeta, panel: els.chaosPanel },
    { key: "pool", button: els.intelTabPool, meta: els.intelPoolMeta, panel: els.publicPanel },
  ];
  intelEntries.forEach((entry) => {
    if (entry.meta) entry.meta.textContent = intelStatus[entry.key]?.meta || "";
    if (entry.button) {
      entry.button.classList.toggle("is-active", activeIntelTab === entry.key);
      entry.button.classList.toggle("is-live", !!intelStatus[entry.key]?.live);
    }
    if (entry.panel) entry.panel.classList.toggle("hidden", activeIntelTab !== entry.key);
  });
}

function isInteractiveHotkeyTarget(target) {
  const tag = String(target?.tagName || "").toUpperCase();
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "BUTTON") return true;
  return !!target?.isContentEditable;
}

function runPrimaryPlaybookShortcut() {
  if (!game || game.winner !== null) return false;
  if (pendingDiscard) return false;
  if (aiThinking || (vsAI && game.active === 1 && !pendingDefense)) return false;
  if (isOnlineMode() && !onlineCanControlCurrentDecision()) return false;
  const suggestion = currentPrimarySuggestion();
  if (!suggestion) return false;
  if (onlineMaybeSendAction({ kind: "playbook", suggestion })) return true;
  const ok = runPlaybookSuggestion(suggestion);
  if (ok) onlineAfterHostAction("playbook");
  return ok;
}

function slotKey(playerId, lane, slotIndex) {
  return `${playerId}:${lane}:${slotIndex}`;
}

function routeMarker(label, tone = "support") {
  return label ? { label, tone } : null;
}

function clearRouteMarker(element) {
  if (!element) return;
  delete element.dataset.routeTag;
  delete element.dataset.routeTone;
  element.classList.remove("route-marked", "route-marked-support", "route-marked-trick", "route-marked-attack", "route-marked-reward", "route-marked-warning", "route-marked-ai");
}

function applyRouteMarker(element, marker) {
  if (!element) return;
  clearRouteMarker(element);
  if (!marker?.label) return;
  const tone = marker.tone || "support";
  element.dataset.routeTag = marker.label;
  element.dataset.routeTone = tone;
  element.classList.add("route-marked", `route-marked-${tone}`);
}

function currentRouteFocus() {
  const observerMode = vsAI && game?.active === 1 && !pendingDefense;
  const suggestion = observerMode ? buildAIPreviewSuggestion(activePlayer()) : currentPrimarySuggestion();
  const focus = {
    suggestion,
    band: "",
    actionKeys: new Set(),
    handUids: new Set(),
    boardUids: new Set(),
    targetUids: new Set(),
    slotKeys: new Set(),
    handMarkers: new Map(),
    boardMarkers: new Map(),
    targetMarkers: new Map(),
    slotMarkers: new Map(),
    actionMarkers: new Map(),
  };
  if (!suggestion || !game) return focus;
  const activeId = activePlayer().id;
  const selectedLoc = observerMode ? null : currentSelectedLocation();
  const sourceSelected = suggestion.cardUid && selectedLoc?.player?.id === activeId && selectedLoc.card?.uid === suggestion.cardUid;
  const movePrimed = !!(sourceSelected && selected?.mode === "move");
  const sourceMarker = (tone = "support") => routeMarker(observerMode ? "它先" : (sourceSelected ? "就这只" : "先点"), observerMode ? "ai" : tone);
  const nextMarker = (tone = "support") => routeMarker(observerMode ? "它去" : (sourceSelected ? "落这里" : "再点"), observerMode ? "ai" : tone);
  const targetMarker = (tone = "attack") => routeMarker(observerMode ? "它盯" : (sourceSelected ? "点它" : "再点"), observerMode ? "ai" : tone);
  const actionMarker = (label = "点这里", tone = "support") => routeMarker(observerMode ? label : label, observerMode ? "ai" : tone);

  if (suggestion.kind === "summon") {
    if (!observerMode) {
      focus.handUids.add(suggestion.cardUid);
      focus.handMarkers.set(suggestion.cardUid, routeMarker(sourceSelected ? "已选" : "先点"));
    }
    focus.slotKeys.add(slotKey(activeId, suggestion.lane, suggestion.slotIndex));
    focus.slotMarkers.set(slotKey(activeId, suggestion.lane, suggestion.slotIndex), routeMarker(observerMode ? "它落" : (sourceSelected ? "落这里" : "再点"), observerMode ? "ai" : "support"));
    return focus;
  }
  if (suggestion.kind === "draw_private") {
    focus.band = "resource";
    if (!observerMode) {
      focus.actionKeys.add("drawPrivate");
      focus.actionMarkers.set("drawPrivate", actionMarker("点这里"));
    }
    return focus;
  }
  if (suggestion.kind === "disaster") {
    focus.band = "tactics";
    if (!observerMode) {
      focus.actionKeys.add("disaster");
      focus.actionMarkers.set("disaster", actionMarker("点这里", "trick"));
    }
    return focus;
  }
  if (suggestion.kind === "skill") {
    focus.band = "tactics";
    focus.boardUids.add(suggestion.cardUid);
    focus.boardMarkers.set(suggestion.cardUid, observerMode ? routeMarker("它用", "ai") : sourceMarker("trick"));
    if (!observerMode) {
      focus.actionKeys.add("skill");
      focus.actionMarkers.set("skill", actionMarker(sourceSelected ? "点这里" : "再点", "trick"));
    }
    return focus;
  }
  if (suggestion.kind === "attack_face") {
    focus.band = "pressure";
    focus.boardUids.add(suggestion.cardUid);
    focus.boardMarkers.set(suggestion.cardUid, observerMode ? routeMarker("它冲", "ai") : sourceMarker("attack"));
    if (!observerMode) {
      focus.actionKeys.add("attackPlayer");
      focus.actionMarkers.set("attackPlayer", actionMarker(sourceSelected ? "点这里" : "再点", "attack"));
    }
    return focus;
  }
  if (suggestion.kind === "attack_creature") {
    focus.band = "pressure";
    focus.boardUids.add(suggestion.cardUid);
    focus.targetUids.add(suggestion.targetUid);
    focus.boardMarkers.set(suggestion.cardUid, observerMode ? routeMarker("它咬", "ai") : sourceMarker("attack"));
    focus.targetMarkers.set(suggestion.targetUid, observerMode ? routeMarker("它盯", "ai") : targetMarker("attack"));
    return focus;
  }
  if (suggestion.kind === "move_attack_face") {
    focus.band = "tactics";
    focus.boardUids.add(suggestion.cardUid);
    focus.slotKeys.add(slotKey(activeId, suggestion.lane, suggestion.slotIndex));
    focus.boardMarkers.set(suggestion.cardUid, observerMode ? routeMarker("它挪", "ai") : sourceMarker("trick"));
    focus.slotMarkers.set(slotKey(activeId, suggestion.lane, suggestion.slotIndex), observerMode ? routeMarker("它去", "ai") : nextMarker("trick"));
    if (!observerMode) {
      focus.actionKeys.add("move");
      focus.actionKeys.add("attackPlayer");
      focus.actionMarkers.set("move", actionMarker(movePrimed ? "点格子" : (sourceSelected ? "点这里" : "再点"), "trick"));
      focus.actionMarkers.set("attackPlayer", actionMarker(movePrimed ? "最后点" : "收尾", "attack"));
    }
    return focus;
  }
  if (suggestion.kind === "move_attack_creature") {
    focus.band = "tactics";
    focus.boardUids.add(suggestion.cardUid);
    focus.targetUids.add(suggestion.targetUid);
    focus.slotKeys.add(slotKey(activeId, suggestion.lane, suggestion.slotIndex));
    focus.boardMarkers.set(suggestion.cardUid, observerMode ? routeMarker("它挪", "ai") : sourceMarker("trick"));
    focus.slotMarkers.set(slotKey(activeId, suggestion.lane, suggestion.slotIndex), observerMode ? routeMarker("它去", "ai") : nextMarker("trick"));
    focus.targetMarkers.set(suggestion.targetUid, observerMode ? routeMarker("它打", "ai") : routeMarker(movePrimed ? "最后点" : "收尾", "attack"));
    if (!observerMode) {
      focus.actionKeys.add("move");
      focus.actionMarkers.set("move", actionMarker(movePrimed ? "点格子" : (sourceSelected ? "点这里" : "再点"), "trick"));
    }
    return focus;
  }
  if (suggestion.kind === "move") {
    focus.band = "tactics";
    focus.boardUids.add(suggestion.cardUid);
    focus.slotKeys.add(slotKey(activeId, suggestion.lane, suggestion.slotIndex));
    focus.boardMarkers.set(suggestion.cardUid, observerMode ? routeMarker("它挪", "ai") : sourceMarker("trick"));
    focus.slotMarkers.set(slotKey(activeId, suggestion.lane, suggestion.slotIndex), observerMode ? routeMarker("它去", "ai") : nextMarker("trick"));
    if (!observerMode) {
      focus.actionKeys.add("move");
      focus.actionMarkers.set("move", actionMarker(movePrimed ? "点格子" : (sourceSelected ? "点这里" : "再点"), "trick"));
    }
    return focus;
  }
  if (suggestion.kind === "recover") {
    focus.band = "tactics";
    focus.boardUids.add(suggestion.cardUid);
    focus.boardMarkers.set(suggestion.cardUid, observerMode ? routeMarker("它醒", "ai") : sourceMarker("support"));
    if (!observerMode) {
      focus.actionKeys.add("recover");
      focus.actionMarkers.set("recover", actionMarker(sourceSelected ? "点这里" : "再点"));
    }
    return focus;
  }
  if (suggestion.kind === "sacrifice") {
    focus.band = "tactics";
    focus.boardUids.add(suggestion.cardUid);
    focus.boardMarkers.set(suggestion.cardUid, observerMode ? routeMarker("它卖", "ai") : sourceMarker("reward"));
    if (!observerMode) {
      focus.actionKeys.add("sacrifice");
      focus.actionMarkers.set("sacrifice", actionMarker(sourceSelected ? "点这里" : "再点", "reward"));
    }
    return focus;
  }
  if (suggestion.kind === "defense_block" || suggestion.kind === "creature_guard") {
    focus.band = "defense";
    focus.actionKeys.add("confirmGuard");
    focus.actionMarkers.set("confirmGuard", routeMarker("点这里"));
    if (suggestion.blockerUid) {
      focus.boardUids.add(suggestion.blockerUid);
      focus.boardMarkers.set(suggestion.blockerUid, routeMarker(pendingDefense?.selectedBlockerUid === suggestion.blockerUid ? "已选" : "先选"));
    }
    return focus;
  }
  if (suggestion.kind === "defense_pass" || suggestion.kind === "creature_pass") {
    focus.band = "defense";
    focus.actionKeys.add("letThrough");
    focus.actionMarkers.set("letThrough", routeMarker("点这里", "attack"));
    return focus;
  }
  if (suggestion.kind === "end_turn") {
    focus.band = "pressure";
    focus.actionMarkers.set("endTurn", routeMarker("点这里"));
  }
  return focus;
}

function showtimeChipForAction(action) {
  if (action === "summon") return { label: "上场", tone: "setup" };
  if (action === "move") return { label: "换线", tone: "trick" };
  if (action === "disaster_cast") return { label: "环境牌", tone: "trick" };
  if (action === "recover") return { label: "复工", tone: "support" };
  if (action === "sacrifice") return { label: "开饭", tone: "support" };
  if (action === "quest_complete") return { label: "领奖", tone: "reward" };
  if (action === "hype_reward") return { label: "喝彩", tone: "reward" };
  if (action === "attack_creature_kill" || action === "attack_creature_pressure_kill") return { label: "击杀", tone: "attack" };
  if (action === "attack_creature_injure" || action === "attack_creature_venom" || action === "attack_creature_skill") return { label: "压制", tone: "attack" };
  if (action === "attack_creature_player_guard") return { label: "保护动物", tone: "support" };
  if (action === "attack_face" || action === "attack_face_guard" || action === "attack_face_guard_unstoppable") return { label: "冲脸", tone: "attack" };
  if (action === "draw_private" || action.startsWith("draw_public_")) return { label: "补牌", tone: "support" };
  if (typeof action === "string" && action.startsWith("skill")) return { label: "绝活", tone: "trick" };
  return null;
}

function currentTurnShowtimeEvents(player = activePlayer()) {
  if (!game || !player) return [];
  return game.history
    .filter((event) => event.turn === game.turn && event.actor === player.name)
    .map((event) => ({ ...event, chip: showtimeChipForAction(event.action) }))
    .filter((event) => event.chip);
}

function showtimePointsForEvent(event) {
  const action = event?.action || "";
  const extra = event?.extra || {};
  if (action === "summon") return 12;
  if (action === "move") return 10;
  if (action === "disaster_cast") {
    const swing = Math.max(0, (extra.enemyVictims?.length || 0) - (extra.ownVictims?.length || 0));
    return 26 + Math.min(6, swing * 2);
  }
  if (action === "recover") return 10;
  if (action === "sacrifice") return 8;
  if (action === "quest_complete") return 22;
  if (action === "hype_reward") return (extra.threshold || 0) >= HYPE_THRESHOLDS[HYPE_THRESHOLDS.length - 1] ? 24 : 18;
  if (action === "attack_creature_kill" || action === "attack_creature_pressure_kill") return 24;
  if (action === "attack_creature_injure") return 16;
  if (action === "attack_creature_venom") return 18;
  if (action === "attack_creature_player_guard") return 14;
  if (action === "attack_face") return 16 + Math.min(4, Number(extra.damage) || 0);
  if (action === "attack_face_guard") return 16;
  if (action === "attack_face_guard_unstoppable") return 20;
  if (action === "draw_private" || String(action).startsWith("draw_public_")) return 8;
  if (action === "skill_king") return 22;
  if (action === "skill_steal" || action === "skill_peek_steal") return 22;
  if (action === "skill_venom") return 20;
  if (action === "skill_roar" || action === "skill_taunt") return 18;
  if (action === "skill_heal") return 15;
  if (typeof action === "string" && action.startsWith("skill")) return 18;
  return 10;
}

function showtimeRankForScore(score = 0) {
  if (score >= 100) return { label: "全场要报警", tab: "报警中", tone: "attack" };
  if (score >= 72) return { label: "全桌拍桌", tab: "拍桌了", tone: "reward" };
  if (score >= 44) return { label: "开始离谱", tab: "离谱了", tone: "trick" };
  if (score >= 18) return { label: "有点东西", tab: "有料", tone: "support" };
  return { label: "热身", tab: "热身", tone: "support" };
}

function nextShowtimeRankState(score = 0) {
  const stops = [
    { min: 18, label: "有点东西", tone: "support" },
    { min: 44, label: "开始离谱", tone: "trick" },
    { min: 72, label: "全桌拍桌", tone: "reward" },
    { min: 100, label: "全场要报警", tone: "attack" },
  ];
  const next = stops.find((stop) => score < stop.min) || null;
  return next
    ? { ...next, remaining: Math.max(0, next.min - score) }
    : null;
}

function buildShowtimeScoreSummary(player = activePlayer()) {
  const events = currentTurnShowtimeEvents(player);
  const labels = events.map((event) => event?.chip?.label).filter(Boolean);
  const uniqueLabels = [...new Set(labels)];
  const mix = {
    events: events.length,
    variety: uniqueLabels.length,
    kills: 0,
    faceHits: 0,
    disasters: 0,
    skills: 0,
    rewards: 0,
    quests: 0,
  };
  let score = events.reduce((total, event) => total + showtimePointsForEvent(event), 0);

  events.forEach((event) => {
    const action = event?.action || "";
    if (action === "attack_creature_kill" || action === "attack_creature_pressure_kill") mix.kills += 1;
    if (action === "attack_face" || action === "attack_face_guard" || action === "attack_face_guard_unstoppable") mix.faceHits += 1;
    if (action === "disaster_cast") mix.disasters += 1;
    if (action === "quest_complete") mix.quests += 1;
    if (action === "hype_reward") mix.rewards += 1;
    if (typeof action === "string" && action.startsWith("skill")) mix.skills += 1;
  });

  const bonusPool = [];
  const comboBonus = mix.events >= 2 ? Math.min(18, (mix.events - 1) * 4) : 0;
  if (comboBonus) bonusPool.push({ label: `串烧 +${comboBonus}`, tone: "trick", points: comboBonus });
  const varietyBonus = mix.variety >= 2 ? (mix.variety - 1) * 5 : 0;
  if (varietyBonus) bonusPool.push({ label: `花样 +${varietyBonus}`, tone: "support", points: varietyBonus });
  const killBonus = mix.kills > 0 ? mix.kills * 6 : 0;
  if (killBonus) bonusPool.push({ label: `收头 +${killBonus}`, tone: "attack", points: killBonus });
  const rewardBonus = mix.rewards > 0 ? mix.rewards * 5 : 0;
  if (rewardBonus) bonusPool.push({ label: `买账 +${rewardBonus}`, tone: "reward", points: rewardBonus });
  const faceBonus = !killBonus && mix.faceHits > 0 ? mix.faceHits * 4 : 0;
  if (faceBonus) bonusPool.push({ label: `贴脸 +${faceBonus}`, tone: "attack", points: faceBonus });
  const chaosBonus = mix.disasters > 0 && (mix.skills > 0 || mix.faceHits > 0 || mix.kills > 0) ? 4 : 0;
  if (chaosBonus) bonusPool.push({ label: `炸场 +${chaosBonus}`, tone: "trick", points: chaosBonus });

  score += bonusPool.reduce((total, entry) => total + entry.points, 0);
  const rank = showtimeRankForScore(score);
  const seed = `${player?.name || "nobody"}:${game?.turn || 0}:${score}:${labels.join("|")}`;
  const detailBits = [];
  if (!mix.events) {
    detailBits.push("0 手串烧");
  } else {
    detailBits.push(`${mix.events} 手串烧`);
    if (mix.variety > 1) detailBits.push(`${mix.variety} 种花样`);
    if (mix.kills > 0) detailBits.push(`收头 ${mix.kills} 次`);
    else if (mix.faceHits > 0) detailBits.push(`贴脸 ${mix.faceHits} 次`);
    else if (mix.skills > 0) detailBits.push(`绝活 ${mix.skills} 次`);
    if (mix.rewards > 0) detailBits.push(`观众买账 ${mix.rewards} 次`);
  }

  let note = "先落第一只动物，节目分才会开始滚起来。";
  if (mix.events > 0) {
    if (rank.label === "全场要报警") {
      note = stablePickByKey([
        "这回合已经不是操作问题了，像节目组得写事故复盘。",
        "台下已经从起哄变成拍桌，导播现在只想先把这一段存档。",
      ], `${seed}:panic`);
    } else if (rank.label === "全桌拍桌") {
      note = stablePickByKey([
        "观众已经彻底买账了，再往下多半就是整局名场面。",
        "这回合的空气已经不讲道理，谁都想把镜头多停一秒。",
      ], `${seed}:clap`);
    } else if (mix.rewards > 0 || mix.quests > 0) {
      note = stablePickByKey([
        "你这回合不只是有动作，连观众都开始往台上扔奖励了。",
        "节目效果已经兑成真东西了，这就是大家最爱看的那种手顺。",
      ], `${seed}:cash`);
    } else if (mix.kills > 0 && mix.variety >= 3) {
      note = stablePickByKey([
        "这波从铺垫到收头都很完整，已经像一段故意剪好的高光。",
        "不只是赢一口，连节奏和镜头都被你一起拿走了。",
      ], `${seed}:kill`);
    } else if (mix.skills > 0 && mix.faceHits > 0) {
      note = stablePickByKey([
        "绝活抖出来以后还敢贴脸，这种手最容易让朋友当场骂出声。",
        "先秀再打脸，节目分通常就是这么突然窜上去的。",
      ], `${seed}:skillface`);
    } else {
      note = stablePickByKey([
        "这回合已经有味道了，再补一拍就容易开始上头。",
        "现在还算可控，但镜头已经明显愿意跟着你走了。",
      ], `${seed}:default`);
    }
  }

  return {
    score,
    rank,
    detail: detailBits.join(" · "),
    note,
    bonuses: bonusPool.sort((a, b) => b.points - a.points).slice(0, 3),
    mix,
    tabMeta: mix.events === 0 ? "热身" : score >= 72 ? rank.tab : `${score} 分`,
  };
}

function showtimeTitleFromLabels(labels) {
  const unique = [...new Set(labels)];
  const has = (label) => unique.includes(label);
  if (!labels.length) return "还没开演";
  if (has("环境牌") && has("击杀")) return "天灾封神现场";
  if (has("换线") && has("绝活") && has("击杀")) return "老六绕后秀";
  if (has("上场") && has("冲脸")) return "刚落地就开冲";
  if (unique.length >= 4) return "全桌动物音乐节";
  if (unique.length === 3) return "离谱三重奏";
  if (unique.length === 2) return "热场双响";
  if (has("击杀")) return "狩猎现场";
  if (has("冲脸")) return "冲脸单曲循环";
  if (has("绝活")) return "绝活预备役";
  if (has("上场")) return "动物进组";
  if (has("补牌")) return "翻包找活";
  return `${labels[labels.length - 1]}热身局`;
}

function showtimeReplayBadge(action) {
  if (action === "summon") return "进组";
  if (action === "move") return "换线";
  if (action === "disaster_cast") return "炸场";
  if (action === "recover") return "返场";
  if (action === "sacrifice") return "开饭";
  if (action === "attack_face") return "冲脸";
  if (action === "attack_face_guard" || action === "attack_face_guard_unstoppable") return "格挡";
  if (action === "attack_creature_pressure_kill") return "压退";
  if (action === "attack_creature_kill") return "收头";
  if (action === "attack_creature_injure") return "压场";
  if (action === "attack_creature_venom") return "阴到";
  if (action === "attack_creature_player_guard") return "保护";
  if (typeof action === "string" && action.startsWith("skill")) return "绝活";
  if (action === "draw_private" || String(action).startsWith("draw_public_")) return "补牌";
  return "回放";
}

function showtimeReplayTone(action) {
  if (action === "summon" || action === "recover" || action === "draw_private" || String(action).startsWith("draw_public_")) return "support";
  if (action === "sacrifice") return "reward";
  if (action === "disaster_cast" || action === "move" || typeof action === "string" && action.startsWith("skill")) return "trick";
  return "attack";
}

function showtimeReplayTitle(event) {
  const action = event?.action || "";
  const extra = event?.extra || {};
  if (action === "summon") return `《${event.target || extra.cardName || "这只动物"}》正式进组`;
  if (action === "move") return `《${extra.cardName || event.target || "这只动物"}》开始换线搞事`;
  if (action === "disaster_cast") return `《${event.target || "环境牌"}》把场子炸热了`;
  if (action === "recover") return `《${event.target || "这只动物"}》重新上岗`;
  if (action === "sacrifice") return `《${event.target || "这只动物"}》被端上桌了`;
  if (action === "attack_face") return `${event.target || "对手"} 被突然冲脸`;
  if (action === "attack_face_guard") return `${extra.blocker || "格挡动物"} 把这口接住了`;
  if (action === "attack_face_guard_unstoppable") return `${extra.blocker || "格挡动物"} 格挡了，但还是漏血`;
  if (action === "attack_creature_pressure_kill") return `《${event.target || extra.targetCard || "目标"}》被连续压制退场`;
  if (action === "attack_creature_kill") return `《${extra.attackerCard || event.actor || "这只生物"}》一口收掉《${event.target || extra.targetCard || "目标"}》`;
  if (action === "attack_creature_injure") return `《${event.target || extra.targetCard || "目标"}》被按进休息`;
  if (action === "attack_creature_venom") return `《${extra.attackerCard || "这只生物"}》把毒牙挂上去了`;
  if (action === "attack_creature_player_guard") return `${extra.defender || "防守方"} 承受打击保下《${event.target || extra.targetCard || "目标"}》`;
  if (action === "skill_taunt") return `《${event.target || "这只动物"}》开始疯狂开屏`;
  if (action === "skill_venom") return `《${event.target || "这只动物"}》牙上带毒`;
  if (action === "skill_roar") return `《${event.target || "这只动物"}》一嗓子把场面喊软`;
  if (action === "skill_king") return `《${event.target || "这只动物"}》开始自封兽王`;
  if (action === "skill_heal") return `《${event.target || "这只动物"}》先给自己续了一口`;
  if (action === "skill_steal" || action === "skill_peek_steal") return `《${event.target || "这只动物"}》把手伸进了对面口袋`;
  if (action === "draw_private") return `口袋里翻出了《${event.target || "这张牌"}》`;
  if (String(action).startsWith("draw_public_")) return `公共池翻到了《${event.target || "这张牌"}》`;
  return event?.detail || "这一步刚刚发生。";
}

function showtimeReplayDetail(event) {
  const action = event?.action || "";
  const extra = event?.extra || {};
  if (action === "summon") {
    const sourceCard = allCards.find((card) => card.name === (extra.cardName || event.target))
      || {
        name: extra.cardName || event.target || "",
        space: extra.cardSpace || "",
        level: extra.cardLevel || "",
        atk: extra.cardAtk || 0,
        def: extra.cardDef || 0,
        skill: extra.cardSkill || "",
      };
    const role = inferCardRole(sourceCard);
    return `${event.actor} 先把 ${role.label} 摆出来，后面的路线开始有样子了。`;
  }
  if (action === "move") return `它从${laneLabel(extra.from)}挪到${laneLabel(extra.to)}，下一口通常不会老老实实来。`;
  if (action === "disaster_cast") {
    const own = extra.ownVictims?.length || 0;
    const enemy = extra.enemyVictims?.length || 0;
    return `${laneLabel(extra.lane)}空间当场鸡飞狗跳。己方倒 ${own}，对面倒 ${enemy}。`;
  }
  if (action === "recover") return "花 1 食物把它叫醒，通常是在给下一口出手做铺垫。";
  if (action === "sacrifice") return "它被当成临时口粮了。这步不光补资源，也很有黑色幽默。";
  if (action === "attack_face") return `${event.target} 直接掉了 ${extra.damage || 0} 血。血线一松，气氛就会开始变坏。`;
  if (action === "attack_face_guard") return `${extra.blocker || "格挡动物"} 花 ${extra.guardCost || 0} 食物顶住了这一下。`;
  if (action === "attack_face_guard_unstoppable") return `${extra.blocker || "格挡动物"} 虽然格挡了，但还是漏了 ${extra.leak || 0} 血。`;
  if (action === "attack_creature_pressure_kill") return `${event.target} 连续被压住，终于退场。复工循环到这里会被切断。`;
  if (action === "attack_creature_kill") return `${event.target} 当场退场，这通常会顺手把后面的路线也清干净。`;
  if (action === "attack_creature_injure") return `${event.target} 被按进休息，接下来一轮都得先缓一口。`;
  if (action === "attack_creature_venom") return "正常伤害没打穿，但毒牙还是把对面逼去休息了。";
  if (action === "attack_creature_player_guard") return `${extra.defender || "防守方"} 自己掉了 ${extra.damage || 0} 血，硬把这只保了下来。`;
  if (action === "skill_taunt") return "接下来凡是够得到它的家伙，都得先冲着它来。";
  if (action === "skill_venom") return "下一次出手就算咬不死，对面大概率也得先躺一会儿。";
  if (action === "skill_roar") return "这嗓子主要不是为了好听，是为了让对面陆地线一起腿软。";
  if (action === "skill_king") return "从这一刻起，它都不打算再低调了。";
  if (action === "skill_heal") return "先把命续上，后面很多离谱动作才有底气继续按。";
  if (action === "skill_steal" || action === "skill_peek_steal") return "这手最烦人的从来不是伤害，而是你开始不知道自己少了什么。";
  if (action === "draw_private" || String(action).startsWith("draw_public_")) return `《${event.target || "这张牌"}》已经进手，下一条路线可能马上就会变样。`;
  return event?.detail || "";
}

function showtimeReplayChips(event) {
  const chips = [];
  const action = event?.action || "";
  const extra = event?.extra || {};
  if (typeof event?.cost === "number" && event.cost > 0) chips.push(`-${event.cost} 食物`);
  if (action === "summon" && extra.lane) chips.push(slotLabelText(extra.lane, extra.slotIndex));
  if (action === "move" && extra.from && extra.to) chips.push(`${laneLabel(extra.from)}→${laneLabel(extra.to)}`);
  if (action === "disaster_cast") {
    if (extra.lane) chips.push(laneLabel(extra.lane));
    chips.push(`己倒 ${extra.ownVictims?.length || 0}`);
    chips.push(`对倒 ${extra.enemyVictims?.length || 0}`);
  }
  if (action === "attack_face" && extra.damage) chips.push(`掉血 ${extra.damage}`);
  if ((action === "attack_face_guard" || action === "attack_face_guard_unstoppable") && extra.blocker) chips.push(`格挡 ${extra.blocker}`);
  if (action === "attack_face_guard_unstoppable" && extra.leak) chips.push(`漏 ${extra.leak} 血`);
  if (action === "attack_creature_kill" || action === "attack_creature_pressure_kill" || action === "attack_creature_injure" || action === "attack_creature_venom") chips.push(`目标 ${event.target || extra.targetCard || "对面"}`);
  if (action === "attack_creature_player_guard" && extra.damage) chips.push(`玩家承受 ${extra.damage}`);
  if (typeof action === "string" && action.startsWith("skill") && extra.cardSkill) chips.push(extra.cardSkill);
  if (chips.length < 3 && event?.target && !chips.some((chip) => chip.includes(event.target))) chips.push(`主角 ${event.target}`);
  return chips.slice(0, 3);
}

function showtimeReplayItems(player = activePlayer()) {
  return currentTurnShowtimeEvents(player)
    .filter((event) => !["quest_complete", "hype_reward"].includes(event.action))
    .slice(-2)
    .reverse()
    .map((event) => ({
      tone: showtimeReplayTone(event.action),
      badge: showtimeReplayBadge(event.action),
      title: showtimeReplayTitle(event),
      detail: showtimeReplayDetail(event),
      chips: showtimeReplayChips(event),
    }));
}

function buildShowtimeSummary(player = activePlayer()) {
  const events = currentTurnShowtimeEvents(player);
  const labels = events.map((event) => event.chip.label);
  const current = currentTurnHype(player);
  const nextThreshold = HYPE_THRESHOLDS.find((value) => !(player.turnHypeClaims || []).includes(value) && current < value);
  const suggestion = currentPrimarySuggestion();
  const rewards = [...(player?.turnHypeRewards || [])];
  const latestReward = rewards[rewards.length - 1] || null;
  const scoreSummary = buildShowtimeScoreSummary(player);
  let tip = "自己开一手，热度和连段会在这里记账。";
  if (current >= HYPE_THRESHOLDS[HYPE_THRESHOLDS.length - 1]) {
    tip = "观众已经拍桌了，这回合后面全是纯节目效果。";
  } else if (latestReward) {
    tip = `刚才刚掉了“${latestReward.label}”。${latestReward.flavor || "这回合还有空间继续闹。"} `;
  } else if (!labels.length && suggestion?.kind === "summon") {
    tip = "这回合还没开演；上场、技能、击杀和环境牌都会把这里点亮。";
  } else if (nextThreshold) {
    tip = `再来 ${nextThreshold - current} 点热度，就会掉“${hypeRewardForTier(player, nextThreshold).label}”。`;
  }
  return {
    chips: events.slice(-6).map((event) => event.chip),
    replay: showtimeReplayItems(player),
    rewards,
    title: showtimeTitleFromLabels(labels),
    meta: `连段 ${events.length} 手 · 热度 ${current}/${HYPE_THRESHOLDS[HYPE_THRESHOLDS.length - 1]}`,
    scoreSummary,
    tip,
  };
}

function buildShowtimeForecast(player = activePlayer(), summary = buildShowtimeSummary(player), suggestion = currentPrimarySuggestion()) {
  if (!player || !summary) return null;
  const scoreSummary = summary.scoreSummary || buildShowtimeScoreSummary(player);
  const nextRank = nextShowtimeRankState(scoreSummary.score);
  const moment = currentHypeMoment(player, suggestion);
  const scoreGain = suggestion ? suggestionShowtimeGain(player, suggestion) : 0;
  const projectedScore = scoreSummary.score + Math.max(0, scoreGain);
  const crossesRank = !!nextRank && projectedScore >= nextRank.min;
  const suggestionLabel = suggestion ? guidePrimaryLabel(suggestion) : "";
  const latestReward = (summary.rewards || []).slice(-1)[0] || null;
  const followUpAfterLatestReward = latestReward
    ? nextHypeRewardState(player, {
        afterThreshold: latestReward.threshold || 0,
        current: moment?.current || currentTurnHype(player),
      })
    : null;
  const followUpAfterProjectedDrop = moment?.nextThreshold && !moment.maxed
    ? nextHypeRewardState(player, {
        afterThreshold: moment.nextThreshold,
        assumedClaims: [moment.nextThreshold],
        current: moment.projected,
      })
    : null;
  const items = [];

  if (nextRank) {
    items.push({
      label: crossesRank
        ? `这手约冲到 ${nextRank.label}`
        : `约差 ${nextRank.remaining} 分到 ${nextRank.label}`,
      tone: crossesRank ? nextRank.tone : "support",
    });
  }
  if (moment?.nextThreshold && !moment.maxed) {
    items.push({
      label: moment.crosses
        ? `这手掉 ${moment.reward?.label || "喝彩奖励"}`
        : `差 ${moment.remaining} 热度掉 ${moment.reward?.label || "喝彩奖励"}`,
      tone: moment.crosses ? "reward" : "support",
    });
  }
  if (latestReward && followUpAfterLatestReward && !moment?.maxed) {
    items.push({
      label: `刚掉 ${compactRewardLabel(latestReward, "hype")}`,
      tone: latestReward.tone || "reward",
    });
  }
  if (moment?.crosses && followUpAfterProjectedDrop) {
    items.push({
      label: `掉完再闹 ${followUpAfterProjectedDrop.remaining} 点接 ${compactRewardLabel(followUpAfterProjectedDrop.reward || {}, "hype")}`,
      tone: "reward",
    });
  } else if (latestReward && followUpAfterLatestReward && !moment?.maxed) {
    items.push({
      label: `再闹 ${followUpAfterLatestReward.remaining} 点接 ${compactRewardLabel(followUpAfterLatestReward.reward || {}, "hype")}`,
      tone: "reward",
    });
  }
  if (suggestionLabel) {
    items.push({
      label: `可选 ${suggestionLabel}`,
      tone: suggestion?.ribbon === "冲奖" ? "reward" : actionCueToneForSuggestion(suggestion),
    });
  }

  const uniqueItems = [];
  const seen = new Set();
  for (const item of items) {
    const key = `${item.tone || "support"}:${item.label || ""}`;
    if (!item.label || seen.has(key)) continue;
    seen.add(key);
    uniqueItems.push(item);
    if (uniqueItems.length >= 3) break;
  }

  let title = "先把节目味续上";
  let detail = summary.tip || "先续一拍，后面通常会更像样。";

  if (moment?.maxed) {
    title = "再闹就是纯赚镜头";
    detail = "热度已经满了，现在继续演基本只看你想多离谱。";
  } else if (latestReward && moment?.crosses) {
    title = "刚掉一层，这手还能把下一层也接住";
    detail = `这回合刚拿到“${latestReward.label || "前一份奖励"}”，如果继续把热度顶上去，大概率又会把“${moment.reward?.label || "下一份喝彩"}”也扔上来。`;
  } else if (latestReward && followUpAfterLatestReward && !moment?.maxed) {
    title = "刚掉一层，再补就追下一层";
    detail = `这回合刚刚拿到“${latestReward.label || "前一份奖励"}”，再闹 ${followUpAfterLatestReward.remaining} 点就会轮到“${followUpAfterLatestReward.reward?.label || "下一份喝彩"}”。`;
  } else if (moment?.crosses && crossesRank) {
    title = "这手像边升档边掉零食";
    detail = `按这口走，节目分和掉落大概率会一起往上窜。`;
  } else if (moment?.crosses && followUpAfterProjectedDrop) {
    title = "这手像先掉一层，再把下层喊出来";
    detail = `这一手先会掉“${moment.reward?.label || "喝彩奖励"}”，掉完还差 ${followUpAfterProjectedDrop.remaining} 点就会轮到“${followUpAfterProjectedDrop.reward?.label || "下一份奖励"}”。`;
  } else if (moment?.crosses) {
    title = "这手像观众会立刻投喂";
    detail = `这条路线如果打出去，台下大概率马上把“${moment.reward?.label || "喝彩奖励"}”扔上来。`;
  } else if (crossesRank) {
    title = "这手能把节目味再顶一档";
    detail = `再补这一拍，节目分大概率就会从“${scoreSummary.rank?.label || "热身"}”抬到“${nextRank?.label || "下一档"}”。`;
  } else if (scoreSummary.score >= 44) {
    title = "现在收手反而有点亏";
    detail = "气氛已经起来了，通常再补一拍就会更像一段完整高光。";
  } else if (moment?.near) {
    title = "再闹一下，台下就更吵了";
    detail = `还差 ${moment.remaining} 点热度，离掉“${moment.reward?.label || "喝彩奖励"}”已经很近。`;
  }

  return {
    title,
    detail,
    items: uniqueItems,
  };
}

function faceGuardDamageLeak(attackerCard) {
  return attackerCard?.skill === "势不可挡" ? 2 : 0;
}

function legalFaceBlockers(attackerLoc, defender) {
  if (!attackerLoc || !defender) return [];
  return boardCards(defender).filter((loc) => loc.card.state !== "rest" && effectiveDefense(defender, loc.card) > 0 && canReach(attackerLoc.card, loc.lane));
}

function faceBlockCost(defender, blockerLoc) {
  if (!defender || !blockerLoc?.card) return 0;
  return effectiveDefense(defender, blockerLoc.card);
}

function faceGuardReadyError(defender, blockerLoc, attackerLoc = attackerFromPendingDefense()) {
  if (!pendingDefense || pendingDefense.kind !== "face") return "当前没有要结算的格挡。";
  if (!attackerLoc?.card) return "这次攻击已经失效了。";
  if (!blockerLoc?.card) return "先选一只亮起来的己方动物格挡。";
  const legal = legalFaceBlockers(attackerLoc, defender).some((loc) => loc.card.uid === blockerLoc.card.uid);
  if (!legal) return `${blockerLoc.card.name} 这次挡不到。`;
  const cost = faceBlockCost(defender, blockerLoc);
  if (defender.food < cost) return `${defender.name} 食物不足，${blockerLoc.card.name} 格挡需要 ${cost} 食物。`;
  return "";
}

function clearDefenseDecision() {
  pendingDefense = null;
}

function finishAttackCommit(attacker) {
  if (!attacker) return;
  attacker.state = "spent";
  attacker.justSummoned = false;
  attacker.venomStrike = false;
}

function markCardDamaged(card) {
  if (!card?.uid) return;
  damageFlashUids.add(card.uid);
  setTimeout(() => {
    damageFlashUids.delete(card.uid);
    if (game) render();
  }, 760);
}

function markCombatFlash({ attackerLoc = null, targetLoc = null, targetPlayerId = null, damage = 0, kind = "attack" } = {}) {
  if (combatFlashTimer) {
    clearTimeout(combatFlashTimer);
    combatFlashTimer = null;
  }
  combatFlash = {
    kind,
    attackerUid: attackerLoc?.card?.uid || null,
    attackerSlotKey: attackerLoc ? slotKey(attackerLoc.player.id, attackerLoc.lane, attackerLoc.slotIndex) : "",
    targetUid: targetLoc?.card?.uid || null,
    targetSlotKey: targetLoc ? slotKey(targetLoc.player.id, targetLoc.lane, targetLoc.slotIndex) : "",
    targetPlayerId: Number.isFinite(targetPlayerId) ? targetPlayerId : null,
    damage: Math.max(0, Number(damage) || 0),
    stamp: Date.now(),
  };
  combatFlashTimer = setTimeout(() => {
    combatFlash = null;
    combatFlashTimer = null;
    if (game) render();
  }, COMBAT_FLASH_MS);
}

function canUsePlayerCreatureGuard(attackerLoc, targetLoc) {
  if (!attackerLoc?.card || !targetLoc?.card) return false;
  const defender = targetLoc.player;
  const attackValue = effectiveAttack(attackerLoc.player, attackerLoc.card);
  return defender.hp > attackValue && (defender.turnProtects || 0) < 1;
}

function creatureGuardSnapshot(attackerLoc, targetLoc) {
  if (!attackerLoc?.card || !targetLoc?.card) return null;
  const defender = targetLoc.player;
  const attackValue = effectiveAttack(attackerLoc.player, attackerLoc.card);
  const defenseValue = targetLoc.card.state === "rest" ? 0 : effectiveDefense(defender, targetLoc.card);
  const dies = attackValue > defenseValue;
  const rests = !dies && (attackValue * 2 > defenseValue || attackerLoc.card.venomStrike);
  let savedValue = dies ? cardValue(targetLoc.card) : rests ? cardValue(targetLoc.card) * 0.45 : 0;
  if ((Number(targetLoc.card.atk) || 0) <= 1 && !cardHasActiveSkill(targetLoc.card)) savedValue *= 0.78;
  if (!targetLoc.card.skill && (Number(targetLoc.card.atk) || 0) === 0) savedValue *= 0.7;
  if (targetLoc.card.tauntTurns > 0) savedValue += 0.35;
  return {
    attackValue,
    defenseValue,
    dies,
    rests,
    savedValue,
  };
}

function creatureGuardDecisionScore(attackerLoc, targetLoc, persona = null) {
  const snapshot = creatureGuardSnapshot(attackerLoc, targetLoc);
  if (!snapshot) return Number.NEGATIVE_INFINITY;
  const defender = targetLoc.player;
  if (defender.hp <= snapshot.attackValue) return Number.NEGATIVE_INFINITY;
  const hpAfter = defender.hp - snapshot.attackValue;
  const lethalPenalty = hpAfter <= 0 ? 5 : hpAfter <= 2 ? 1.25 : hpAfter <= 4 ? 0.35 : 0;
  return snapshot.savedValue
    - snapshot.attackValue * 1.18
    - lethalPenalty
    + (persona?.blockBias || 0) * 0.9
    + (persona ? personaSwingFor(persona, 0.14) : 0);
}

function disasterVictimPlan(player, disaster) {
  if (!player || !disaster) return null;
  const lane = disasterLaneKey(disaster);
  const enemy = game.players[player.id === 0 ? 1 : 0];
  const ownLaneCards = boardCards(player).filter((loc) => loc.lane === lane);
  const enemyLaneCards = boardCards(enemy).filter((loc) => loc.lane === lane);
  if (!ownLaneCards.length || !enemyLaneCards.length) {
    return {
      lane,
      ownVictims: [],
      enemyVictims: [],
      ownLoss: 0,
      enemyLoss: 0,
    };
  }
  const limit = disasterKillCount(disaster);
  const ownVictims = [...ownLaneCards]
    .sort((a, b) => cardValue(a.card) - cardValue(b.card))
    .slice(0, Math.min(limit, ownLaneCards.length));
  const enemyVictims = [...enemyLaneCards]
    .sort((a, b) => cardValue(b.card) - cardValue(a.card))
    .slice(0, Math.min(limit, enemyLaneCards.length));
  return {
    lane,
    ownVictims,
    enemyVictims,
    ownLoss: ownVictims.reduce((sum, loc) => sum + cardValue(loc.card), 0),
    enemyLoss: enemyVictims.reduce((sum, loc) => sum + cardValue(loc.card), 0),
  };
}

function disasterReadyError(player, disaster, plan = disasterVictimPlan(player, disaster)) {
  if (player.turnDisasterUsed) return player.turnDisaster ? `《${player.turnDisaster["卡名"]}》这回合已经演完了。` : "这回合已经抽过环境牌。";
  const cost = disasterCost(disaster);
  if (player.food < cost) return `${player.name} 食物不足，抽环境牌需要 ${cost} 食物。`;
  return "";
}

function disasterSwing(plan) {
  if (!plan) return 0;
  return plan.enemyLoss - plan.ownLoss;
}

function removeCreature(loc, cause = "remove") {
  if (!loc?.card) return null;
  loc.player.board[loc.lane][loc.slotIndex] = null;
  loc.player.grave.push(loc.card);
  return {
    player: loc.player.name,
    lane: loc.lane,
    cause,
    card: loc.card.name,
  };
}

function useTurnDisaster(player = activePlayer(), actorLabel = null) {
  const previous = player.turnDisaster?.["卡名"] || "";
  const error = disasterReadyError(player, null, null);
  if (error) {
    if (player.id === game.active) addLog(error);
    return false;
  }
  const cost = disasterCost(null);
  if (!spendFood(player, cost, { reason: "disaster", disasterName: "环境牌" })) return false;

  const actorName = actorLabel || player.name;
  const disaster = drawRandomDisaster(previous);
  player.turnDisaster = disaster;
  player.turnDisasterUsed = true;
  if (!disaster) {
    addLog(`${actorName} 抽环境牌，但牌堆暂时没有可用事件。`, {
      action: "disaster_fizzle",
      actor: player.name,
      target: "环境牌",
      cost,
    });
    return true;
  }
  const plan = disasterVictimPlan(player, disaster);
  if (!plan || !plan.ownVictims.length || !plan.enemyVictims.length) {
    addLog(`${actorName} 抽到环境牌《${disaster["卡名"]}》，${disasterLaneLabel(disaster)}空间没有双方同时站人，这张牌自动发动但没有命中目标。`, {
      action: "disaster_fizzle",
      actor: player.name,
      target: disaster["卡名"],
      cost,
      extra: {
        lane: plan?.lane || disasterLaneKey(disaster),
        ownVictims: [],
        enemyVictims: [],
      },
    });
    checkWinner();
    return true;
  }
  const ownHits = plan.ownVictims.map((loc) => removeCreature(loc, "disaster")).filter(Boolean);
  const enemyHits = plan.enemyVictims.map((loc) => removeCreature(loc, "disaster")).filter(Boolean);

  const ownText = ownHits.map((item) => item.card).join("、");
  const enemyText = enemyHits.map((item) => item.card).join("、");
  addLog(`${actorName} 抽到环境牌《${disaster["卡名"]}》并自动发动，${disasterLaneLabel(disaster)}空间一阵鸡飞狗跳。己方倒下：${ownText}；对面倒下：${enemyText}。`, {
    action: "disaster_cast",
    actor: player.name,
    target: disaster["卡名"],
    cost,
    extra: {
      lane: plan.lane,
      ownVictims: ownHits.map((item) => item.card),
      enemyVictims: enemyHits.map((item) => item.card),
    },
  });
  checkWinner();
  return true;
}

function applyOnKillPassives(attackerLoc, defenderLoc, trigger) {
  const attackerOwner = attackerLoc.player;
  const defenderOwner = defenderLoc.player;
  const attacker = attackerLoc.card;
  const defender = defenderLoc.card;
  const bonusLogs = [];

  if (defender.skill === "美味") {
    attackerOwner.hp += 1;
    bonusLogs.push(`${defender.name} 太下饭了，${attackerOwner.name} 回复 1 生命。`);
  }
  if (defender.skill === "超级美味") {
    attackerOwner.hp += 2;
    bonusLogs.push(`${defender.name} 简直是限定自助，${attackerOwner.name} 回复 2 生命。`);
  }
  if (defender.skill === "毒腺") {
    attacker.state = "rest";
    bonusLogs.push(`${defender.name} 临走前喷了一脸毒，${attacker.name} 进入休息状态。`);
  }
  if (defender.skill === "猛毒") {
    attackerOwner.board[attackerLoc.lane][attackerLoc.slotIndex] = null;
    attackerOwner.grave.push(attacker);
    bonusLogs.push(`${defender.name} 反手就是绝命毒液，${attacker.name} 当场暴毙。`);
  }
  if (defender.skill === "携带病毒" && Math.random() < 0.5 && attackerOwner.board[attackerLoc.lane][attackerLoc.slotIndex]) {
    attacker.state = "rest";
    bonusLogs.push(`${defender.name} 留下了神秘病毒，${attacker.name} 立刻蔫了。`);
  }

  if (bonusLogs.length) {
    addLog(`${trigger} ${bonusLogs.join("")}`, {
      action: "kill_passive",
      actor: defenderOwner.name,
      target: attackerOwner.name,
      extra: { defender: defender.name, attacker: attacker.name },
    });
  }
}

function useSkillFromLocation(sourceLoc, actorLabel = null) {
  const player = sourceLoc.player;
  const card = sourceLoc.card;
  const error = activeSkillReadyError(player, card);
  if (error) {
    if (player.id === game.active) addLog(friendlySkillReadyFeedback(player, card));
    return false;
  }

  const cost = skillCost(card);
  if (!spendFood(player, cost, { reason: "skill", card })) return false;
  card.skillUsedTurn = game.turn;
  const actorName = actorLabel || player.name;
  let message = "";
  let action = "skill";

  if (card.skill === "采摘") {
    const before = player.hp;
    player.hp = Math.min(20, player.hp + 1);
    if (player.hp === before) {
      player.food += cost;
      card.skillUsedTurn = 0;
      message = `${card.name} 左看右看，发现大家都满血，摘了个寂寞。`;
      if (player.id === game.active) addLog(message);
      return false;
    }
    action = "skill_harvest";
    message = `${actorName} 发动 ${card.name} 的“采摘”，给自己回了 1 点生命。`;
  } else if (card.skill === "偷盗") {
    const enemy = game.players[player.id === 0 ? 1 : 0];
    if (!enemy.hand.length) {
      player.food += cost;
      card.skillUsedTurn = 0;
      message = `${card.name} 扑了个空，对面一张手牌都没有。`;
      if (player.id === game.active) addLog(message);
      return false;
    }
    const pick = Math.floor(Math.random() * enemy.hand.length);
    const [stolen] = enemy.hand.splice(pick, 1);
    stolen.owner = player.id;
    player.hand.push(stolen);
    enforceHandLimit(player);
    action = "skill_steal";
    message = `${actorName} 发动 ${card.name} 的“偷盗”，顺走了 ${enemy.name} 的《${stolen.name}》。`;
  } else if (card.skill === "鹰眼") {
    const enemy = game.players[player.id === 0 ? 1 : 0];
    const seen = enemy.hand.map((item) => item.name).join("、") || "空空如也";
    if (!enemy.hand.length) {
      player.food += cost;
      card.skillUsedTurn = 0;
      message = `${card.name} 俯冲侦察一圈，发现对面兜里比脸还干净。`;
      if (player.id === game.active) addLog(message);
      return false;
    }
    const pick = Math.floor(Math.random() * enemy.hand.length);
    const [stolen] = enemy.hand.splice(pick, 1);
    stolen.owner = player.id;
    player.hand.push(stolen);
    enforceHandLimit(player);
    action = "skill_eagle_eye";
    message = `${actorName} 发动 ${card.name} 的“鹰眼”，先看见了 ${enemy.name} 手牌：${seen}，又顺走了《${stolen.name}》。`;
  } else if (card.skill === "吸引") {
    card.tauntTurns = 1;
    action = "skill_taunt";
    message = `${actorName} 让 ${card.name} 开始疯狂开屏。接下来敌人能打到它时，得先冲它来。`;
  } else if (card.skill === "毒牙") {
    card.venomStrike = true;
    action = "skill_venom";
    message = `${actorName} 给 ${card.name} 上了“毒牙”。下一次出手，哪怕咬不死也能把对手放倒。`;
  } else if (card.skill === "百兽王吼") {
    const enemy = game.players[player.id === 0 ? 1 : 0];
    enemy.status.roarThisTurn = true;
    enemy.status.roarNextOwnTurn = true;
    action = "skill_roar";
    message = `${actorName} 发动 ${card.name} 的“百兽王吼”，对面陆地生物瞬间腿软了。`;
  } else if (card.skill === "谁是百兽王？") {
    card.kingChallenge = true;
    action = "skill_king";
    message = `${actorName} 发动 ${card.name} 的“谁是百兽王？”，它从现在开始一路嚣张到倒下为止。`;
  } else {
    player.food += cost;
    card.skillUsedTurn = 0;
    if (player.id === game.active) {
      addLog(`${card.name} 的技能这版还没接上，先留个悬念。`);
    }
    return false;
  }

  player.turnSkills = (player.turnSkills || 0) + 1;
  addLog(message, {
    action,
    actor: player.name,
    target: card.name,
    cost,
    extra: {
      cardUid: card.uid,
      cardSkill: card.skill,
    },
  });
  checkWinner();
  return true;
}

function useSelectedSkill() {
  const player = activePlayer();
  const sourceLoc = currentSelectedBoard(player);
  if (!sourceLoc) {
    addLog("先选你场上的一只会整活的动物。");
    render();
    return;
  }
  useSkillFromLocation(sourceLoc);
  render();
}

function drawFromDeck(player, paid = true, action = paid ? "draw_private" : "setup_draw") {
  if (paid && !spendFood(player, 1, { reason: "draw_private" })) return false;
  const card = player.deck.shift();
  if (!card) {
    addLog(`${player.name} 的私有卡组已空。`);
    return false;
  }
  card.owner = player.id;
  player.hand.push(card);
  addLog(`${player.name} 从私有卡组抽到 ${card.name}。`, {
    action,
    actor: player.name,
    target: card.name,
    cost: paid ? 1 : 0,
  });
  enforceHandLimit(player);
  return true;
}

function drawFromPublic(level) {
  const player = activePlayer();
  const cost = level === "A" ? 3 : 2;
  if (!spendFood(player, cost, { reason: `draw_public_${level}` })) return;
  const pile = game.publicPiles[level];
  const card = pile.shift();
  if (!card) {
    player.food += cost;
    addLog(`${level} 类公共牌堆已经抽空。`);
    render();
    return;
  }
  card.owner = player.id;
  player.hand.push(card);
  addLog(`${player.name} 花费 ${cost} 食物，从公共 ${level} 类抽到 ${card.name}。`, {
    action: `draw_public_${level}`,
    actor: player.name,
    target: card.name,
    cost,
  });
  enforceHandLimit(player);
  render();
}

function shouldAutoResolveDiscard(player) {
  return !!(vsAI && !isOnlineMode() && player?.id === 1);
}

function autoDiscardIndex(player) {
  if (!player?.hand?.length) return -1;
  return player.hand
    .map((card, index) => ({
      index,
      score: cardValue(card) + Math.max(0, summonCost(card) - player.food) * 0.25,
    }))
    .sort((a, b) => a.score - b.score || a.index - b.index)[0]?.index ?? -1;
}

function discardHandCard(player, handIndex, action = "discard_choice") {
  if (!player || handIndex < 0 || handIndex >= player.hand.length) return null;
  const [discarded] = player.hand.splice(handIndex, 1);
  player.grave.push(discarded);
  addLog(`${player.name} 手牌满了，选择弃掉 ${discarded.name}。`, {
    action,
    actor: player.name,
    target: discarded.name,
  });
  return discarded;
}

function beginDiscardChoice(player, reason = "手牌超过上限") {
  if (!player || player.hand.length <= MAX_HAND_SIZE) {
    if (pendingDiscard?.playerId === player?.id) pendingDiscard = null;
    return false;
  }
  if (shouldAutoResolveDiscard(player)) {
    while (player.hand.length > MAX_HAND_SIZE) {
      const index = autoDiscardIndex(player);
      if (index < 0) break;
      discardHandCard(player, index, "discard_overflow");
    }
    return false;
  }
  pendingDiscard = {
    playerId: player.id,
    reason,
    handSize: player.hand.length,
  };
  selected = null;
  addLog(`${player.name} 手牌超过 ${MAX_HAND_SIZE} 张，请选择 1 张弃掉。`, {
    action: "discard_prompt",
    actor: player.name,
    target: "手牌上限",
  });
  return true;
}

function resolveDiscardChoice(cardUid, actorId = pendingDiscard?.playerId) {
  if (!pendingDiscard) return false;
  const player = game.players[pendingDiscard.playerId];
  if (!player || actorId !== player.id) return false;
  const handIndex = player.hand.findIndex((card) => card.uid === cardUid);
  if (handIndex < 0) {
    addLog("这张牌已经不在手里了，重新选一张要弃的牌。");
    render();
    return false;
  }
  discardHandCard(player, handIndex, "discard_choice");
  if (player.hand.length > MAX_HAND_SIZE) {
    beginDiscardChoice(player, pendingDiscard.reason);
  } else {
    pendingDiscard = null;
  }
  selected = null;
  render();
  return true;
}

function enforceHandLimit(player, reason = "手牌超过上限") {
  return beginDiscardChoice(player, reason);
}

function spendFood(player, amount, context = {}) {
  if (amount < 0) return false;
  if (player.food < amount) {
    addLog(friendlySpendFoodError(player, amount, context));
    render();
    return false;
  }
  player.food -= amount;
  return true;
}

function recoverReadyError(player, loc, availableFood = player.food) {
  if (!loc?.card) return "先选一只己方生物。";
  if (loc.card.state !== "rest") return `${loc.card.name} 这会儿没在休息。`;
  if (player.turnRecovers >= 1) return `${player.name} 这回合已经复工过 1 次了。`;
  if (availableFood < 1) return `${player.name} 食物不足，复工需要 1 食物。`;
  return "";
}

function summonCost(card) {
  return Math.max(1, Math.min(Number(card.atk) || 0, Number(card.def) || 0));
}

function cardValue(card) {
  if (!card) return 0;
  const levelBonus = card.level === "A" ? 3 : card.level === "B" ? 1.2 : 0;
  const skillBonus = card.skill ? 1.6 : 0;
  const waterBonus = card.space === "水生" || card.space === "两栖" ? 0.6 : 0;
  const owner = card.owner === null ? null : game.players[card.owner];
  const attack = owner ? effectiveAttack(owner, card) : Number(card.atk) || 0;
  const defense = owner ? effectiveDefense(owner, card) : Number(card.def) || 0;
  const tauntBonus = card.tauntTurns > 0 ? 0.8 : 0;
  return attack * 1.35 + defense + levelBonus + skillBonus + waterBonus + tauntBonus;
}

function summonHeuristicPenalty(card) {
  if (!card) return 0;
  const atk = Number(card.atk) || 0;
  const def = Number(card.def) || 0;
  let penalty = 0;
  if (card.skill === "天空攻击指挥官" || card.skill === "海洋防御指挥官") penalty += 1;
  if (card.skill === "采摘" && card.level === "C") penalty += 0.65;
  if (card.level !== "A" && atk <= 1 && def >= 3) penalty += 0.55;
  if ((card.space === "水生" || card.space === "两栖") && card.level === "C" && atk <= 1) penalty += 0.18;
  return penalty;
}

function summonTempoAdjustment(player, card, slot = null) {
  if (!player || !card) return 0;
  const atk = Number(card.atk) || 0;
  const def = Number(card.def) || 0;
  const ownBoard = boardCards(player);
  const currentPressure = ownBoard.reduce((sum, loc) => sum + Math.max(0, effectiveAttack(player, loc.card)), 0);
  const sleepyBodies = ownBoard.filter((loc) => (Number(loc.card.atk) || 0) <= 1 && !cardHasActiveSkill(loc.card)).length;
  const activeSkill = cardHasActiveSkill(card);
  let adjust = 0;

  if (!ownBoard.length && atk >= 3) adjust += 0.18;
  if (currentPressure <= 2 && atk >= 2) adjust += 0.24;
  if (currentPressure <= 2 && atk <= 1 && def >= 2 && !activeSkill) adjust -= 0.24;
  if (currentPressure <= 2 && atk === 0 && !card.skill) adjust -= 0.44;
  if (sleepyBodies >= 1 && atk <= 1 && !activeSkill) adjust -= 0.18;
  if (!card.skill && atk === 0 && def <= 1) adjust -= 0.22;
  if ((card.skill === "天空攻击指挥官" || card.skill === "海洋防御指挥官") && ownBoard.length === 0) adjust -= 0.22;
  if (card.skill === "采摘" && player.hp >= 18) adjust -= 0.22;
  if (card.skill === "吸引" && currentPressure <= 2) adjust -= 0.12;
  if (slot && player.board[slot.lane].filter(Boolean).length >= 2 && atk <= 1 && !activeSkill) adjust -= 0.12;
  return adjust;
}

function boardCards(player) {
  const cards = [];
  for (const lane of LANES) {
    player.board[lane.key].forEach((card, slotIndex) => {
      if (card) cards.push({ type: "board", player, lane: lane.key, slotIndex, card });
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

function openingCueMeta(cueId) {
  return cueId ? OPENING_CUES[cueId] || null : null;
}

function openingCueLabel(player) {
  return openingCueMeta(player?.openingCue)?.label || "见招拆招";
}

function activeOpeningCue(player) {
  if (!player || (player.turnsTaken || 0) >= 2) return null;
  return openingCueMeta(player.openingCue);
}

function openingSummonBaseScore(card) {
  return cardValue(card) - summonCost(card) * 0.45 - summonHeuristicPenalty(card);
}

function openingCueCardScore(card, cueId) {
  if (!card) return Number.NEGATIVE_INFINITY;
  const base = openingSummonBaseScore(card);
  if (cueId === "waterline") {
    if (card.space !== "水生" && card.space !== "两栖") return Number.NEGATIVE_INFINITY;
    return base + (card.space === "水生" ? 2.2 : 1.9) + (card.skill === "海洋防御指挥官" ? 0.55 : 0);
  }
  if (cueId === "highground") {
    if (card.space !== "天空") return Number.NEGATIVE_INFINITY;
    return base + 2.05 + (card.skill === "天空攻击指挥官" ? 0.55 : 0) + ((Number(card.atk) || 0) >= 3 ? 0.2 : 0);
  }
  if (cueId === "landrush") {
    if (card.space !== "陆地") return Number.NEGATIVE_INFINITY;
    return base + 1.95 + ((Number(card.atk) || 0) >= 3 ? 0.35 : 0) + (card.skill === "毒牙" ? 0.2 : 0);
  }
  return Number.NEGATIVE_INFINITY;
}

function determineOpeningCue(player) {
  if (!player?.hand?.length) return "pocket";
  const affordable = player.hand.filter((card) => summonCost(card) <= player.food);
  if (!affordable.length) return "pocket";

  const baseScores = affordable.map((card) => ({ card, score: openingSummonBaseScore(card) }));
  const bestAffordable = baseScores.reduce((best, item) => (!best || item.score > best.score ? item : best), null);
  const expensiveCount = player.hand.filter((card) => summonCost(card) > player.food).length;
  const supportCount = player.hand.filter((card) => ["采摘", "偷盗", "鹰眼"].includes(card.skill)).length;

  if (bestAffordable && bestAffordable.score < 4.1 && expensiveCount >= 2) return "pocket";
  if (bestAffordable && bestAffordable.score < 4.7 && expensiveCount >= 4 && supportCount >= 1) return "pocket";

  const laneBest = ["waterline", "highground", "landrush"]
    .map((cueId) => ({
      cueId,
      score: affordable.reduce((best, card) => Math.max(best, openingCueCardScore(card, cueId)), Number.NEGATIVE_INFINITY),
    }))
    .sort((a, b) => b.score - a.score)[0];

  if (!laneBest || !Number.isFinite(laneBest.score)) return "pocket";
  if (laneBest.score < 4 && supportCount >= 1 && expensiveCount >= 2) return "pocket";
  return laneBest.cueId;
}

function openingCueSlotBias(player, card, slot) {
  const cue = activeOpeningCue(player);
  if (!cue || !card || !slot) return 0;
  if (cue.id === "waterline") {
    if ((card.space === "水生" || card.space === "两栖") && slot.lane === "water") return 0.55;
    if (card.space === "两栖" && slot.lane === "land") return 0.1;
  }
  if (cue.id === "highground") {
    if (card.space === "天空" && slot.lane === "sky") return 0.5;
    if (card.space === "天空" && slot.lane === "land") return 0.08;
  }
  if (cue.id === "landrush") {
    if (card.space === "陆地" && slot.lane === "land") return 0.42;
  }
  return 0;
}

function openingCueSummonBonus(player, card, slot) {
  const cue = activeOpeningCue(player);
  if (!cue || !card) return 0;
  if (cue.id === "pocket") {
    return openingSummonBaseScore(card) < 4.4 ? -0.4 : -0.12;
  }

  let bonus = openingCueSlotBias(player, card, slot);
  if (cue.id === "waterline" && (card.space === "水生" || card.space === "两栖")) bonus += slot?.lane === "water" ? 0.42 : 0.14;
  if (cue.id === "highground" && card.space === "天空") bonus += slot?.lane === "sky" ? 0.38 : 0.12;
  if (cue.id === "landrush" && card.space === "陆地") bonus += 0.34;
  if (boardCards(player).length === 0 && cue.id !== "pocket") bonus += 0.18;
  return bonus;
}

function openingCueDrawBonus(player) {
  const cue = activeOpeningCue(player);
  if (!cue || cue.id !== "pocket") return 0;
  const affordableScores = player.hand
    .filter((card) => summonCost(card) <= player.food)
    .map((card) => openingSummonBaseScore(card));
  const bestAffordable = affordableScores.length ? Math.max(...affordableScores) : 0;
  const expensiveCount = player.hand.filter((card) => summonCost(card) > player.food).length;
  let bonus = 1.25 + Math.max(0, expensiveCount - 1) * 0.12;
  if (bestAffordable < 4) bonus += 0.35;
  if (boardCards(player).length > 0) bonus -= 0.2;
  return bonus;
}

function openingCueSummonNote(player, card, slot) {
  const cue = activeOpeningCue(player);
  if (!cue || !card || !slot) return "";
  if (cue.id === "waterline" && slot.lane === "water") return "这手像是在先抢水位，后面回粮和蹲线都会更舒服。";
  if (cue.id === "highground" && slot.lane === "sky") return "先把高位站住，后面的冲脸和视野都会顺很多。";
  if (cue.id === "landrush" && slot.lane === "land") return "先把陆地人数铺出来，这局会更像正面压场。";
  return "";
}

function openingCueGuide(player, ownBoard) {
  const cue = activeOpeningCue(player);
  if (!cue) return null;
  if (cue.id === "pocket" && player.food >= 1 && player.deck.length && ownBoard.length === 0) {
    return {
      mood: "先翻口袋找路线",
      note: "这手起手更像在等下一张。先摸 1 张，再决定站哪条线会清楚很多。",
      phase: 0,
    };
  }
  if (cue.id === "waterline" && player.hand.length && ownBoard.length <= 1) {
    return {
      mood: ownBoard.length ? "水线别断" : "先把水线抢下来",
      note: ownBoard.length ? "如果手里还有能下水的牌，先把水位补厚，后面回粮会更顺。" : "点一张水生或两栖牌，再点你的水生空格。前两回合先吃住水位通常不亏。",
      phase: 1,
    };
  }
  if (cue.id === "highground" && player.hand.length && ownBoard.length <= 1) {
    return {
      mood: ownBoard.length ? "高位继续发育" : "先占高位",
      note: ownBoard.length ? "再补一只高位选手，后面很多冲脸路线会自己亮出来。" : "先把天空位站住，后面的压制和偷线都会更自然。",
      phase: 1,
    };
  }
  if (cue.id === "landrush" && player.hand.length && ownBoard.length <= 1) {
    return {
      mood: ownBoard.length ? "陆地继续压场" : "先把陆地铺开",
      note: ownBoard.length ? "这局更像靠陆地压过去，先把地面人数堆起来再考虑换招。" : "先把陆地站稳，这把的节奏更像正面推场。",
      phase: 1,
    };
  }
  return null;
}

function openingCueBadgeState(player) {
  const cue = activeOpeningCue(player);
  if (cue) {
    return {
      text: `开场：${cue.label}`,
      className: cue.id === "pocket" ? "cue-pill is-pocket" : "cue-pill",
    };
  }
  return {
    text: "中盘：自由发挥",
    className: "cue-pill is-expired",
  };
}

function renderCuePill(element, player) {
  if (!element) return;
  const state = openingCueBadgeState(player);
  element.textContent = state.text;
  element.className = state.className;
}

function canMoveCard(card) {
  return card?.space === "天空" || card?.space === "两栖";
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
  const loc = currentSelectedHand(player);
  if (!loc) {
    addLog(withFriendlyCue("先从手里拎一张牌出来。", { player }));
    render();
    return;
  }
  const card = loc.card;
  const placementError = friendlySummonError(player, card, lane, slotIndex);
  if (placementError) {
    addLog(placementError);
    render();
    return;
  }
  const cost = summonCost(card);
  if (!spendFood(player, cost, { reason: "summon", card })) return;
  player.hand.splice(loc.handIndex, 1);
  card.state = "ready";
  card.justSummoned = true;
  card.lane = lane;
  card.owner = player.id;
  player.board[lane][slotIndex] = card;
  selected = { type: "board", uid: card.uid, playerId: player.id, lane, slotIndex };
  addLog(`${player.name} 花费 ${cost} 食物，将 ${card.name} 放到${laneLabel(lane)}空间。`, {
    action: "summon",
    actor: player.name,
    target: card.name,
    cost,
    extra: buildSummonEventExtra(card, lane, slotIndex),
  });
  render();
}

function moveSlotsFor(player, loc) {
  if (!loc?.card || !canMoveCard(loc.card)) return [];
  const slots = [];
  for (const lane of LANES) {
    if (lane.key === loc.lane) continue;
    if (!canPlace(loc.card, lane.key)) continue;
    player.board[lane.key].forEach((existing, slotIndex) => {
      if (!existing) slots.push({ lane: lane.key, slotIndex });
    });
  }
  return slots;
}

function moveReadyError(player, loc) {
  if (!loc?.card) return "先选一只己方生物。";
  if (!canMoveCard(loc.card)) return `${loc.card.name} 不是会换线的家伙。`;
  if ((player.turnMoves || 0) >= 1) return `${player.name} 这回合已经移动过 1 次了。`;
  if (!moveSlotsFor(player, loc).length) return `${loc.card.name} 现在没有能去的新空间。`;
  return "";
}

function useMoveMode() {
  const player = activePlayer();
  const loc = currentSelectedBoard(player);
  const error = moveReadyError(player, loc);
  if (error) {
    addLog(friendlyMoveReadyFeedback(player, loc));
    render();
    return false;
  }
  selected = { ...selected, mode: selected?.mode === "move" ? undefined : "move" };
  render();
  return true;
}

function moveSelected(lane, slotIndex) {
  const player = activePlayer();
  const loc = currentSelectedBoard(player);
  const error = moveReadyError(player, loc);
  if (error) {
    addLog(friendlyMoveReadyFeedback(player, loc));
    render();
    return false;
  }
  const legal = moveSlotsFor(player, loc).some((slot) => slot.lane === lane && slot.slotIndex === slotIndex);
  if (!legal) {
    addLog(withFriendlyCue(`《${loc.card.name}》这步跳不到那里。`, {
      player,
      fallback: "去点发亮空格就行",
    }));
    render();
    return false;
  }
  player.board[loc.lane][loc.slotIndex] = null;
  loc.card.lane = lane;
  player.board[lane][slotIndex] = loc.card;
  player.turnMoves = (player.turnMoves || 0) + 1;
  selected = {
    type: "board",
    uid: loc.card.uid,
    playerId: player.id,
    lane,
    slotIndex,
  };
  addLog(`${player.name} 免费移动，让 ${loc.card.name} 从${laneLabel(loc.lane)}挪到${laneLabel(lane)}。`, {
    action: "move",
    actor: player.name,
    target: loc.card.name,
    cost: 0,
    extra: buildMoveEventExtra(loc.card, loc.lane, lane),
  });
  render();
  return true;
}

function recoverSelected() {
  const player = activePlayer();
  const loc = currentSelectedBoard(player);
  const error = recoverReadyError(player, loc);
  if (error) {
    addLog(error);
    render();
    return;
  }
  if (!spendFood(player, 1, { reason: "recover", card: loc.card })) return;
  loc.card.state = "ready";
  player.turnRecovers += 1;
  addLog(`${player.name} 花费 1 食物，使 ${loc.card.name} 恢复为战斗状态。`, {
    action: "recover",
    actor: player.name,
    target: loc.card.name,
    cost: 1,
  });
  render();
}

function sacrificeSelected() {
  const player = activePlayer();
  const loc = currentSelectedBoard(player);
  if (!loc) return;
  if (player.turnSacrifices >= 1) {
    addLog(`${player.name} 本回合已经把一只动物端上桌了。`);
    render();
    return;
  }
  const card = loc.card;
  player.board[loc.lane][loc.slotIndex] = null;
  player.grave.push(card);
  player.food += 1;
  player.turnSacrifices += 1;
  selected = null;
  addLog(`${player.name} 将 ${card.name} 当作食物消耗，获得 1 食物。`, {
    action: "sacrifice",
    actor: player.name,
    target: card.name,
    cost: -1,
  });
  render();
}

function queueFaceDefense(attackerLoc, defender, attackValue, attackCost) {
  pendingDefense = {
    kind: "face",
    attackerUid: attackerLoc.card.uid,
    defenderId: defender.id,
    attackValue,
    attackCost,
    selectedBlockerUid: null,
  };
  addLog(`${attackerLoc.player.name} 用 ${attackerLoc.card.name} 攻击 ${defender.name}。请选择：用动物格挡，或由玩家承受打击。`, {
    action: "guard_prompt",
    actor: attackerLoc.player.name,
    target: defender.name,
    cost: 0,
    extra: { attacker: attackerLoc.card.name, damage: attackValue },
  });
}

function queueCreatureDefense(attackerLoc, targetLoc, attackValue, attackCost) {
  pendingDefense = {
    kind: "creature",
    attackerUid: attackerLoc.card.uid,
    defenderId: targetLoc.player.id,
    targetUid: targetLoc.card.uid,
    attackValue,
    attackCost,
    selectedBlockerUid: null,
  };
  addLog(`${attackerLoc.player.name} 用 ${attackerLoc.card.name} 攻击 ${targetLoc.player.name} 的 ${targetLoc.card.name}。请选择：玩家承受打击保住它，或让动物承受伤害。`, {
    action: "creature_guard_prompt",
    actor: attackerLoc.player.name,
    target: targetLoc.card.name,
    cost: 0,
    extra: { attacker: attackerLoc.card.name, damage: attackValue },
  });
}

function resolveFaceAttack(attackerLoc, defender, attackCost, attackValue) {
  if (!spendFood(attackerLoc.player, attackCost)) return false;
  defender.hp -= attackValue;
  markCombatFlash({ attackerLoc, targetPlayerId: defender.id, damage: attackValue, kind: "face" });
  finishAttackCommit(attackerLoc.card);
  addLog(`${attackerLoc.player.name} 的 ${attackerLoc.card.name} 攻击玩家，${defender.name} 生命 -${attackValue}。${faceAttackTax(defender) ? "（对方场上有动物，攻击玩家额外 +1 食物）" : ""}`, {
    action: "attack_face",
    actor: attackerLoc.player.name,
    target: defender.name,
    cost: attackCost,
    extra: {
      ...buildAttackEventExtra(attackerLoc),
      pressure: faceAttackTax(defender),
      damage: attackValue,
      blocked: false,
    },
  });
  checkWinner();
  return true;
}

function resolveFaceGuard(attackerLoc, defender, blockerLoc, attackCost, attackValue) {
  const guardCost = faceBlockCost(defender, blockerLoc);
  if (!spendFood(attackerLoc.player, attackCost)) return false;
  if (!spendFood(defender, guardCost)) {
    attackerLoc.player.food += attackCost;
    return false;
  }

  const blockDefense = effectiveDefense(defender, blockerLoc.card);
  const leak = Math.min(faceGuardDamageLeak(attackerLoc.card), Math.max(0, defender.hp));
  let result = "";
  let action = "attack_face_guard";
  if (attackValue > blockDefense) {
    markCardDamaged(blockerLoc.card);
    defender.board[blockerLoc.lane][blockerLoc.slotIndex] = null;
    defender.grave.push(blockerLoc.card);
    result = `${blockerLoc.card.name} 顶上去后当场阵亡。`;
    applyOnKillPassives(attackerLoc, blockerLoc, `${attackerLoc.player.name} 的 ${attackerLoc.card.name} 撞穿了格挡的 ${blockerLoc.card.name}。`);
  } else if (attackerLoc.card.venomStrike) {
    blockerLoc.card.state = "rest";
    markCardDamaged(blockerLoc.card);
    result = `${blockerLoc.card.name} 虽然挡住了，但还是被毒得去休息。`;
  } else {
    result = `${blockerLoc.card.name} 把这下稳稳吃住。`;
  }

  if (leak > 0) {
    defender.hp -= leak;
    result += ` ${attackerLoc.card.name} 还自带“势不可挡”，${defender.name} 仍然掉了 ${leak} 血。`;
    action = "attack_face_guard_unstoppable";
  }

  markCombatFlash({ attackerLoc, targetLoc: blockerLoc, targetPlayerId: leak > 0 ? defender.id : null, damage: leak || attackValue, kind: "guard" });
  finishAttackCommit(attackerLoc.card);
  addLog(`${attackerLoc.player.name} 的 ${attackerLoc.card.name} 攻击玩家，被 ${defender.name} 的 ${blockerLoc.card.name} 挡下。${result}`, {
    action,
    actor: attackerLoc.player.name,
    target: defender.name,
    cost: attackCost + guardCost,
    extra: {
      ...buildAttackEventExtra(attackerLoc, blockerLoc),
      blocker: blockerLoc.card.name,
      damage: attackValue,
      leak,
      guardCost,
      blockDefense,
    },
  });
  checkWinner();
  return true;
}

function resolveCreaturePlayerGuard(attackerLoc, targetLoc, attackCost, attackValue) {
  if (!spendFood(attackerLoc.player, attackCost)) return false;
  const defender = targetLoc.player;
  defender.hp -= attackValue;
  defender.turnProtects = (defender.turnProtects || 0) + 1;
  markCombatFlash({ attackerLoc, targetLoc, targetPlayerId: defender.id, damage: attackValue, kind: "protect" });
  finishAttackCommit(attackerLoc.card);
  addLog(`${attackerLoc.player.name} 的 ${attackerLoc.card.name} 攻击 ${targetLoc.card.name}，但 ${defender.name} 选择自己扛下这口，生命 -${attackValue}。${targetLoc.card.name} 毫发无伤。本回合护场次数已用完。`, {
    action: "attack_creature_player_guard",
    actor: attackerLoc.player.name,
    target: targetLoc.card.name,
    cost: attackCost,
    extra: {
      ...buildAttackEventExtra(attackerLoc, targetLoc),
      guardedByPlayer: true,
      damage: attackValue,
      defender: defender.name,
      protectUsed: defender.turnProtects,
    },
  });
  checkWinner();
  return true;
}

function shouldAIPlayerGuardCreature(attackerLoc, targetLoc, personaId = null) {
  const persona = personaId ? personaById(personaId) : currentAIPersona();
  const defender = targetLoc.player;
  const attackValue = effectiveAttack(attackerLoc.player, attackerLoc.card);
  if (defender.hp <= attackValue) return false;
  const defenseValue = targetLoc.card.state === "rest" ? 0 : effectiveDefense(defender, targetLoc.card);
  const dies = attackValue > defenseValue;
  const rests = !dies && (attackValue * 2 > defenseValue || attackerLoc.card.venomStrike);
  const savedValue = dies ? cardValue(targetLoc.card) : rests ? cardValue(targetLoc.card) * 0.45 : 0;
  if (savedValue < 4.4 && defender.hp > 8) return false;
  const lethalPenalty = defender.hp <= attackValue ? 4.2 : 0;
  const score = savedValue - attackValue * 1.08 - lethalPenalty + persona.blockBias * 0.9 + personaSwingFor(persona, 0.14);
  return score > 1.45;
}

function aiChooseFaceBlocker(attackerLoc, defender, attackValue, personaId = null) {
  const persona = personaId ? personaById(personaId) : currentAIPersona();
  const leak = faceGuardDamageLeak(attackerLoc.card);
  if (defender.hp <= leak) return null;
  const candidates = legalFaceBlockers(attackerLoc, defender)
    .filter((loc) => defender.food >= faceBlockCost(defender, loc))
    .map((loc) => {
      const guardCost = faceBlockCost(defender, loc);
      const blockDefense = effectiveDefense(defender, loc.card);
      const dies = attackValue > blockDefense;
      const restPenalty = !dies && attackerLoc.card.venomStrike ? cardValue(loc.card) * 0.35 : 0;
      const loss = dies ? cardValue(loc.card) : restPenalty;
      const prevented = Math.max(0, attackValue - leak);
      const lethalSave = defender.hp <= attackValue && defender.hp > leak ? 3.8 : 0;
      const score = prevented * 1.55 + lethalSave - loss - guardCost * 0.55 + persona.blockBias * 1.2 + personaSwingFor(persona, 0.16);
      return { loc, score, dies, guardCost };
    })
    .sort((a, b) => b.score - a.score);
  if (!candidates.length) return null;
  if (candidates[0].score < 0.9 && defender.hp > attackValue + 2) return null;
  return candidates[0].loc;
}

function beginPlayerAttack(sourceLoc, options = {}) {
  const attackerOwner = sourceLoc.player;
  const defender = game.players[attackerOwner.id === 0 ? 1 : 0];
  const attacker = sourceLoc.card;
  const totalCost = faceAttackCost(attacker, defender);
  if (faceAttackReadyError(attackerOwner, attacker, defender)) return false;
  const taunts = availableTaunts(defender, attacker);
  if (taunts.length) return false;
  const attackValue = effectiveAttack(attackerOwner, attacker);
  const blockers = legalFaceBlockers(sourceLoc, defender);

  if (blockers.length) {
    if (!vsAI || defender.id === 0) {
      queueFaceDefense(sourceLoc, defender, attackValue, totalCost);
      return true;
    }
    const aiBlocker = aiChooseFaceBlocker(sourceLoc, defender, attackValue, options.defenderAutoPersonaId || null);
    if (aiBlocker) return resolveFaceGuard(sourceLoc, defender, aiBlocker, totalCost, attackValue);
  }

  return resolveFaceAttack(sourceLoc, defender, totalCost, attackValue);
}

function resolveDefenseDecision(block = false) {
  if (!pendingDefense) return false;
  const kind = pendingDefense.kind;
  const defender = defendingPlayer();
  const attackerLoc = attackerFromPendingDefense();
  const blockerLoc = selectedGuardBlocker();
  const targetLoc = defendingTargetCreature();
  const attackCost = pendingDefense.attackCost;
  const attackValue = pendingDefense.attackValue;
  const error = kind === "face" && block ? faceGuardReadyError(defender, blockerLoc, attackerLoc) : "";
  if (kind === "face" && block && error) {
    addLog(error);
    render();
    return false;
  }
  if (kind === "creature" && block && (!attackerLoc?.card || !targetLoc?.card)) {
    clearDefenseDecision();
    addLog("这次由玩家替动物承受打击的结算已经失效了。");
    render();
    return false;
  }

  clearDefenseDecision();
  const resolved = kind === "face"
    ? (block ? resolveFaceGuard(attackerLoc, defender, blockerLoc, attackCost, attackValue) : resolveFaceAttack(attackerLoc, defender, attackCost, attackValue))
    : (block ? resolveCreaturePlayerGuard(attackerLoc, targetLoc, attackCost, attackValue) : resolveDirectCreatureAttack(attackerLoc, targetLoc));
  render();
  return resolved;
}

function confirmDefenseShortcut() {
  if (!pendingDefense) return false;
  if (pendingDefense.kind === "face" && !pendingDefense.selectedBlockerUid) {
    const shortcut = faceDefenseShortcutState();
    if (shortcut?.blockerLoc?.card) pendingDefense.selectedBlockerUid = shortcut.blockerLoc.card.uid;
  }
  return resolveDefenseDecision(true);
}

function attackPlayer() {
  const attackerOwner = activePlayer();
  const defender = opponentPlayer();
  const loc = currentSelectedBoard(attackerOwner);
  if (!loc) return;
  const attacker = loc.card;
  const totalCost = faceAttackCost(attacker, defender);
  const faceError = faceAttackReadyError(attackerOwner, attacker, defender);
  if (faceError) {
    addLog(friendlyAttackReadyFeedback(attackerOwner, attacker, totalCost, "打玩家"));
    render();
    return;
  }
  const taunts = availableTaunts(defender, attacker);
  if (taunts.length) {
    addLog(withFriendlyCue(`想冲脸得先把拦路的《${taunts[0].card.name}》处理掉。`, { player: attackerOwner }));
    render();
    return;
  }
  beginPlayerAttack(loc);
  render();
}

function beginCreatureAttack(sourceLoc, targetLoc, options = {}) {
  if (!sourceLoc?.card || !targetLoc?.card) return false;
  const attackerOwner = sourceLoc.player;
  const defenderOwner = targetLoc.player;
  const error = creatureAttackTargetError(attackerOwner, sourceLoc.card, targetLoc);
  if (error) {
    if (options.emitErrors !== false) addLog(friendlyCreatureAttackTargetFeedback(attackerOwner, sourceLoc.card, targetLoc));
    return false;
  }
  const attackValue = effectiveAttack(attackerOwner, sourceLoc.card);
  const attackCost = attackSpendCost(attackerOwner, sourceLoc.card);
  if (canUsePlayerCreatureGuard(sourceLoc, targetLoc)) {
    if (!vsAI || defenderOwner.id === 0) {
      queueCreatureDefense(sourceLoc, targetLoc, attackValue, attackCost);
      return true;
    }
    if (shouldAIPlayerGuardCreature(sourceLoc, targetLoc, options.defenderAutoPersonaId || null)) {
      return resolveCreaturePlayerGuard(sourceLoc, targetLoc, attackCost, attackValue);
    }
  }
  return resolveDirectCreatureAttack(sourceLoc, targetLoc);
}

function attackCreature(targetLoc) {
  const attackerOwner = activePlayer();
  const sourceLoc = currentSelectedBoard(attackerOwner);
  if (!sourceLoc) return;
  beginCreatureAttack(sourceLoc, targetLoc);
  render();
}

function useAttackCreatureShortcut() {
  const attackerOwner = activePlayer();
  const sourceLoc = currentSelectedBoard(attackerOwner);
  if (!sourceLoc) return false;
  const shortcut = creatureAttackShortcutState(sourceLoc, opponentPlayer());
  if (!shortcut?.targetLoc) {
    addLog("对面能挨打的目标已经亮起来了，直接点右侧生物就行。");
    render();
    return false;
  }
  beginCreatureAttack(sourceLoc, shortcut.targetLoc);
  render();
  return true;
}

function canAttack(player, card, cost = Number(card.atk) || 0, label = "攻击") {
  const error = attackReadyError(player, card, cost, label);
  if (error) {
    addLog(friendlyAttackReadyFeedback(player, card, cost, label));
    render();
    return false;
  }
  return true;
}

function selectedBoardCard(player) {
  return currentSelectedBoard(player);
}

function checkWinner() {
  const dead = game.players.find((player) => player.hp <= 0);
  if (dead) {
    const winner = game.players.find((player) => player.id !== dead.id);
    game.winner = winner.id;
    clearDefenseDecision();
    addLog(`${winner.name} 获胜。`, {
      action: "winner",
      actor: winner.name,
      target: dead.name,
    });
    persistFinishedMatch();
  }
}

function resolveDirectCreatureAttack(sourceLoc, targetLoc) {
  const attackerOwner = sourceLoc.player;
  const defenderOwner = targetLoc.player;
  const attacker = sourceLoc.card;
  const defender = targetLoc.card;
  if (!canReach(attacker, targetLoc.lane)) return false;
  const attackValue = effectiveAttack(attackerOwner, attacker);
  const attackCost = attackSpendCost(attackerOwner, attacker);
  const defenseValue = defender.state === "rest" ? 0 : effectiveDefense(defenderOwner, defender);
  if (attackReadyError(attackerOwner, attacker, attackCost, "攻击")) return false;
  if (attackValue * 2 <= defenseValue && !attacker.venomStrike) return false;
  attackerOwner.food -= attackCost;
  markCombatFlash({ attackerLoc: sourceLoc, targetLoc, damage: attackValue, kind: "creature" });
  let action = "attack_creature";
  if (attackValue > defenseValue) {
    markCardDamaged(defender);
    defenderOwner.board[targetLoc.lane][targetLoc.slotIndex] = null;
    defenderOwner.grave.push(defender);
    applyOnKillPassives(sourceLoc, targetLoc, `${attackerOwner.name} 的 ${attacker.name} 把 ${defender.name} 吞了。`);
    addLog(`${attackerOwner.name} 的 ${attacker.name} 攻击 ${defender.name}，${defender.name} 阵亡。`, {
      action: "attack_creature_kill",
      actor: attackerOwner.name,
      target: defender.name,
      cost: attackCost,
      extra: buildAttackEventExtra(sourceLoc, targetLoc),
    });
  } else if (attackValue * 2 > defenseValue) {
    if ((defender.pressureWounds || 0) >= 3) {
      markCardDamaged(defender);
      defenderOwner.board[targetLoc.lane][targetLoc.slotIndex] = null;
      defenderOwner.grave.push(defender);
      applyOnKillPassives(sourceLoc, targetLoc, `${attackerOwner.name} 的 ${attacker.name} 连续压制 ${defender.name}，把它逼下场。`);
      addLog(`${attackerOwner.name} 的 ${attacker.name} 再次压制 ${defender.name}，${defender.name} 伤势叠满并退场。`, {
        action: "attack_creature_pressure_kill",
        actor: attackerOwner.name,
        target: defender.name,
        cost: attackCost,
        extra: {
          ...buildAttackEventExtra(sourceLoc, targetLoc),
          pressureWounds: defender.pressureWounds || 0,
        },
      });
    } else {
      defender.pressureWounds = (defender.pressureWounds || 0) + 1;
      defender.state = "rest";
      markCardDamaged(defender);
      addLog(`${attackerOwner.name} 的 ${attacker.name} 攻击 ${defender.name}，${defender.name} 受伤并进入休息。`, {
        action: "attack_creature_injure",
        actor: attackerOwner.name,
        target: defender.name,
        cost: attackCost,
        extra: {
          ...buildAttackEventExtra(sourceLoc, targetLoc),
          pressureWounds: defender.pressureWounds,
        },
      });
    }
  } else if (attacker.venomStrike) {
    defender.state = "rest";
    markCardDamaged(defender);
    addLog(`${attackerOwner.name} 的 ${attacker.name} 用毒牙压住 ${defender.name}，${defender.name} 被迫休息。`, {
      action: "attack_creature_venom",
      actor: attackerOwner.name,
      target: defender.name,
      cost: attackCost,
      extra: buildAttackEventExtra(sourceLoc, targetLoc),
    });
  } else {
    action = "attack_creature_skill";
    addLog(`${attackerOwner.name} 的 ${attacker.name} 依靠特技攻击 ${defender.name}，普通伤害未造成影响。`, {
      action,
      actor: attackerOwner.name,
      target: defender.name,
      cost: attackCost,
      extra: buildAttackEventExtra(sourceLoc, targetLoc),
    });
  }
  attacker.state = "spent";
  attacker.justSummoned = false;
  attacker.venomStrike = false;
  checkWinner();
  return true;
}

function resolveDirectPlayerAttack(sourceLoc, options = {}) {
  return beginPlayerAttack(sourceLoc, options);
}

function aiRecover(player) {
  const enemy = game.players[player.id === 0 ? 1 : 0];
  if (player.turnRecovers >= 1) return false;
  const restCards = boardCards(player)
    .filter((loc) => loc.card.state === "rest")
    .sort((a, b) => cardValue(b.card) - cardValue(a.card));
  if (!restCards.length || player.food < 1) return false;
  const loc = restCards[0];
  if (recoverReadyError(player, loc)) return false;
  const worth = cardValue(loc.card);
  const enemyPressure = boardCards(enemy).reduce((sum, enemyLoc) => sum + effectiveAttack(enemy, enemyLoc.card), 0);
  if (worth < 5.1 && player.food <= 3) return false;
  if (worth < 4.2 && enemyPressure < player.hp * 0.6) return false;
  player.food -= 1;
  loc.card.state = "ready";
  player.turnRecovers += 1;
  addLog(`${player.name} 花费 1 食物，使 ${loc.card.name} 恢复为战斗状态。`, {
    action: "recover",
    actor: player.name,
    target: loc.card.name,
    cost: 1,
  });
  return true;
}

function aiLegalAttackSources(player) {
  return boardCards(player).filter((loc) => {
    const card = loc.card;
    const cost = attackSpendCost(player, card);
    return card.state === "ready" && !card.justSummoned && effectiveAttack(player, card) > 0 && player.food >= cost;
  });
}

function legalTargetsForCardState(player, card, defender) {
  if (attackReadyError(player, card, attackSpendCost(player, card), "攻击")) return [];
  return boardCards(defender).filter((targetLoc) => {
    if (!canReach(card, targetLoc.lane)) return false;
    const defenseValue = targetLoc.card.state === "rest" ? 0 : effectiveDefense(defender, targetLoc.card);
    return effectiveAttack(player, card) * 2 > defenseValue || card.venomStrike;
  });
}

function aiMove(player) {
  const persona = currentAIPersona();
  if ((player.turnMoves || 0) >= 1) return false;
  const enemy = game.players[player.id === 0 ? 1 : 0];
  const options = [];

  for (const loc of boardCards(player)) {
    if (!canMoveCard(loc.card)) continue;
    const currentTargets = legalTargetsForCardState(player, loc.card, enemy);
    for (const slot of moveSlotsFor(player, loc)) {
      const movedCard = { ...loc.card, lane: slot.lane };
      const newTargets = legalTargetsForCardState(player, movedCard, enemy);
      const newTargetValue = newTargets.reduce((sum, target) => sum + cardValue(target.card), 0);
      const currentTargetValue = currentTargets.reduce((sum, target) => sum + cardValue(target.card), 0);
      const targetGain = newTargetValue - currentTargetValue;
      const waterGain = slot.lane === "water" && loc.lane !== "water" ? 0.9 : 0;
      const waterLoss = loc.lane === "water" && slot.lane !== "water" ? -0.75 : 0;
      const skyCommanderGain = loc.card.skill === "天空攻击指挥官" && slot.lane === "sky" && loc.lane !== "sky"
        ? boardCards(player).filter((ally) => ally.card.space === "天空" && ally.card.uid !== loc.card.uid).length * 0.95
        : 0;
      const waterCommanderGain = loc.card.skill === "海洋防御指挥官" && slot.lane === "water" && loc.lane !== "water"
        ? boardCards(player).filter((ally) => ally.card.uid !== loc.card.uid && (ally.card.space === "水生" || ally.card.space === "两栖") && ally.card.lane === "water").length * 0.8
        : 0;
      const reachUnlock = currentTargets.length === 0 && newTargets.length > 0 ? 1.6 : 0;
      const score = targetGain * 0.35 + waterGain + waterLoss + skyCommanderGain + waterCommanderGain + reachUnlock + persona.moveBias * 0.8 + personaSwing(0.12);
      if (score > 1.05 - persona.moveBias * 0.18) options.push({ score, loc, slot });
    }
  }

  options.sort((a, b) => b.score - a.score);
  const pick = options[0];
  if (!pick) return false;
  pick.loc.player.board[pick.loc.lane][pick.loc.slotIndex] = null;
  pick.loc.card.lane = pick.slot.lane;
  pick.loc.player.board[pick.slot.lane][pick.slot.slotIndex] = pick.loc.card;
  player.turnMoves = (player.turnMoves || 0) + 1;
  addLog(`${player.name} 免费移动，让 ${pick.loc.card.name} 从${laneLabel(pick.loc.lane)}挪到${laneLabel(pick.slot.lane)}。`, {
    action: "move",
    actor: player.name,
    target: pick.loc.card.name,
    cost: 0,
    extra: buildMoveEventExtra(pick.loc.card, pick.loc.lane, pick.slot.lane),
  });
  return true;
}

function aiUseDisaster(player) {
  const persona = currentAIPersona();
  const beat = aiDisasterIntentScore(player, persona);
  if (!beat.ready || beat.score < beat.threshold) return false;
  return useTurnDisaster(player, player.name);
}

function aiUseSkill(player) {
  const persona = currentAIPersona();
  const enemy = game.players[player.id === 0 ? 1 : 0];
  const options = [];

  for (const loc of boardCards(player)) {
    const error = activeSkillReadyError(player, loc.card);
    if (error) continue;
    const score = aiSkillIntentScore(player, loc, enemy);
    if (score > 0) options.push({ score: score + persona.skillBias * 0.95 + personaSwing(0.16), loc });
  }

  options.sort((a, b) => b.score - a.score);
  if (!options.length) return false;
  return useSkillFromLocation(options[0].loc, player.name);
}

function aiAttack(player) {
  const persona = currentAIPersona();
  const enemy = game.players[player.id === 0 ? 1 : 0];
  const defenderPersonaId = optionsAutoPersonaIdFor(enemy.id);
  const sources = aiLegalAttackSources(player);
  if (!sources.length) return false;

  const lethal = sources
    .filter((loc) => canFaceAttackNow(player, loc.card, enemy) && effectiveAttack(player, loc.card) >= enemy.hp)
    .sort((a, b) => effectiveAttack(player, a.card) - effectiveAttack(player, b.card))[0];
  if (lethal && resolveDirectPlayerAttack(lethal, { defenderAutoPersonaId: defenderPersonaId })) return true;

  const targetOptions = [];
  for (const source of sources) {
    const faceCost = faceAttackCost(source.card, enemy);
    const shouldScoreFaceAttack = vsAI && player.id === 1;
    if (shouldScoreFaceAttack && canFaceAttackNow(player, source.card, enemy)) {
      const attackValue = effectiveAttack(player, source.card);
      const enemyBoardCount = boardCards(enemy).length;
      const pressureBonus = Math.max(0, 10 - enemy.hp) * 0.42;
      const openBoardBonus = enemyBoardCount === 0 ? 4.2 : Math.max(0, 3 - enemyBoardCount) * 0.85;
      const lowFaceStyleBonus = Math.max(0, 0.25 - persona.faceBias) * 1.35;
      const closingBonus = enemy.hp <= 13 ? Math.max(0, 13 - enemy.hp) * 0.34 + lowFaceStyleBonus : 0;
      const schemerAmbushBonus = persona.id === "schemer" && enemy.hp <= 16
        ? 1.05 + Math.max(0, 16 - enemy.hp) * 0.22 + Math.min(1.1, attackValue * 0.18)
        : 0;
      const score = attackValue * 1.45 - faceCost * 0.28 + pressureBonus + closingBonus + schemerAmbushBonus + openBoardBonus + persona.faceBias * 2.1 + persona.attackBias * 0.55 + personaSwing(0.2);
      targetOptions.push({ score, source, face: true });
    }
    const forcedTargets = availableTaunts(enemy, source.card);
    const candidateTargets = forcedTargets.length ? forcedTargets : boardCards(enemy);
    for (const target of candidateTargets) {
      if (!canReach(source.card, target.lane)) continue;
      const attackValue = effectiveAttack(player, source.card);
      const defenseValue = target.card.state === "rest" ? 0 : effectiveDefense(enemy, target.card);
      if (attackValue * 2 <= defenseValue && !source.card.venomStrike) continue;
      const killBonus = attackValue > defenseValue ? 8 : 3;
      const score = killBonus + cardValue(target.card) - attackValue * 0.35 + (target.card.tauntTurns > 0 ? 0.6 : 0) + persona.attackBias * 0.9 + personaSwing(0.22);
      targetOptions.push({ score, source, target });
    }
  }
  targetOptions.sort((a, b) => b.score - a.score);
  if (targetOptions[0] && targetOptions[0].score > 4.5) {
    if (targetOptions[0].face) {
      if (resolveDirectPlayerAttack(targetOptions[0].source, { defenderAutoPersonaId: defenderPersonaId })) return true;
    } else if (beginCreatureAttack(targetOptions[0].source, targetOptions[0].target, { defenderAutoPersonaId: defenderPersonaId, emitErrors: false })) {
      return true;
    }
  }

  const bestFace = sources
    .filter((loc) => canFaceAttackNow(player, loc.card, enemy))
    .sort((a, b) => effectiveAttack(player, b.card) - effectiveAttack(player, a.card))[0];
  if (bestFace && (enemy.hp <= 7 + persona.faceBias * 2 || boardCards(enemy).length === 0 || (persona.faceBias > 0.8 && Math.random() < 0.22))) {
    return resolveDirectPlayerAttack(bestFace, { defenderAutoPersonaId: defenderPersonaId });
  }
  return false;
}

function aiSummon(player) {
  const persona = currentAIPersona();
  const cue = activeOpeningCue(player);
  const candidates = [];
  player.hand.forEach((card, handIndex) => {
    const cost = summonCost(card);
    if (player.food < cost) return;
    const slots = emptySlotsFor(player, card);
    if (!slots.length) return;
    const slot = bestSlotForSummon(player, card, slots);
    if (!slot) return;
    const auraBonus = ["天空攻击指挥官", "海洋防御指挥官", "百兽王吼"].includes(card.skill) ? 0.75 : 0;
    const cueBonusRaw = openingCueSummonBonus(player, card, slot);
    const cueBonus = cue?.id === "pocket" ? cueBonusRaw * 0.35 : cueBonusRaw;
    const score = cardValue(card) - cost * 0.45 + (card.space === "水生" ? 0.7 : 0) + auraBonus + cueBonus - summonHeuristicPenalty(card) + persona.summonBias * 0.8 + personaSwing(0.15);
    candidates.push({ score, handIndex, card, slot, cost });
  });
  candidates.sort((a, b) => b.score - a.score);
  const pick = candidates[0];
  if (!pick) return false;
  if (pick.score < 2.2 && player.food < 3) return false;
  player.food -= pick.cost;
  player.hand.splice(pick.handIndex, 1);
  pick.card.state = "ready";
  pick.card.justSummoned = true;
  pick.card.lane = pick.slot.lane;
  pick.card.owner = player.id;
  player.board[pick.slot.lane][pick.slot.slotIndex] = pick.card;
  addLog(`${player.name} 花费 ${pick.cost} 食物，将 ${pick.card.name} 放到${laneLabel(pick.slot.lane)}空间。`, {
    action: "summon",
    actor: player.name,
    target: pick.card.name,
    cost: pick.cost,
    extra: buildSummonEventExtra(pick.card, pick.slot.lane, pick.slot.slotIndex),
  });
  return true;
}

function aiDraw(player) {
  const persona = currentAIPersona();
  const cue = activeOpeningCue(player);
  if (player.hand.length <= 2 && player.food >= 1 && player.deck.length) return drawFromDeck(player, true);
  if (cue?.id === "pocket" && player.food >= 1 && player.deck.length && boardCards(player).length === 0 && Math.random() < 0.46 + persona.drawBias * 0.04) {
    return drawFromDeck(player, true);
  }
  if (player.food >= 3 && game.publicPiles.A.length && Math.random() < 0.24 + persona.drawBias * 0.05) return drawFromPublicFor(player, "A");
  if (player.food >= 2 && game.publicPiles.B.length && Math.random() < 0.26 + persona.drawBias * 0.06) return drawFromPublicFor(player, "B");
  if (player.food >= 2 && game.publicPiles.C.length && Math.random() < 0.2 + Math.max(0, persona.sacrificeBias) * 0.03) return drawFromPublicFor(player, "C");
  if (player.food >= 1 && player.deck.length && player.hand.length < 5 && Math.random() < 0.42 + persona.drawBias * 0.08) return drawFromDeck(player, true);
  return false;
}

function drawFromPublicFor(player, level) {
  const cost = level === "A" ? 3 : 2;
  if (player.food < cost || !game.publicPiles[level].length) return false;
  player.food -= cost;
  const card = game.publicPiles[level].shift();
  card.owner = player.id;
  player.hand.push(card);
  addLog(`${player.name} 花费 ${cost} 食物，从公共 ${level} 类抽到 ${card.name}。`, {
    action: `draw_public_${level}`,
    actor: player.name,
    target: card.name,
    cost,
  });
  enforceHandLimit(player);
  return true;
}

function aiSacrifice(player) {
  const persona = currentAIPersona();
  if (player.turnSacrifices >= 1 || player.food > 1 + Math.max(0, persona.sacrificeBias)) return false;
  const candidates = boardCards(player)
    .filter((loc) => loc.card.atk === 0 || cardValue(loc.card) < 2.4)
    .sort((a, b) => cardValue(a.card) - cardValue(b.card));
  if (!candidates.length) return false;
  const loc = candidates[0];
  player.board[loc.lane][loc.slotIndex] = null;
  player.grave.push(loc.card);
  player.food += 1;
  player.turnSacrifices += 1;
  addLog(`${player.name} 将 ${loc.card.name} 当作食物消耗，获得 1 食物。`, {
    action: "sacrifice",
    actor: player.name,
    target: loc.card.name,
    cost: -1,
  });
  return true;
}

function runAITurn() {
  if (!vsAI || !game || game.winner !== null || game.active !== 1 || aiThinking) return;
  aiThinking = true;
  let actions = 0;
  const player = activePlayer();
  addLog(`AI 开始思考。${summarizeAIPersonaTurn(player)}。`);
  const interval = window.setInterval(() => {
    if (!game || game.winner !== null || game.active !== 1) {
      window.clearInterval(interval);
      aiThinking = false;
      render();
      return;
    }
    if (pendingDefense) {
      render();
      return;
    }
    let acted = false;
    if (actions < 10) {
      acted = aiUseDisaster(player) || aiUseSkill(player) || aiMove(player) || aiAttack(player) || aiRecover(player) || aiSummon(player) || aiDraw(player) || aiSacrifice(player);
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

function resolveAutoDefense(personaByPlayerId = null) {
  if (!pendingDefense) return false;
  const defender = defendingPlayer();
  const attackerLoc = attackerFromPendingDefense();
  const targetLoc = defendingTargetCreature();
  const personaId = personaByPlayerId?.[defender?.id] || optionsAutoPersonaIdFor(defender?.id) || aiPersona;
  return withAIPersona(personaId, () => {
    if (pendingDefense.kind === "face") {
      const blocker = aiChooseFaceBlocker(attackerLoc, defender, pendingDefense.attackValue, personaId);
      pendingDefense.selectedBlockerUid = blocker?.card?.uid || null;
      return resolveDefenseDecision(!!blocker);
    }
    if (!attackerLoc?.card || !targetLoc?.card) return resolveDefenseDecision(false);
    return resolveDefenseDecision(shouldAIPlayerGuardCreature(attackerLoc, targetLoc, personaId));
  });
}

function runAutoTurnSync(personaByPlayerId = null, options = {}) {
  if (!game || game.winner !== null) return false;
  const actorId = activePlayer().id;
  const actor = activePlayer();
  const personaId = personaByPlayerId?.[actorId] || aiPersona;
  const shouldLog = options.log !== false;
  const previousContext = autoPersonaContext;
  autoPersonaContext = personaByPlayerId || autoPersonaContext;

  try {
    if (shouldLog) {
      withAIPersona(personaId, () => {
        addLog(`${actor.name} 开始思考。${summarizeAIPersonaTurn(actor)}。`);
      });
    }

    let actions = 0;
    let actedAny = false;
    while (game && game.winner === null && game.active === actorId) {
      if (pendingDefense) {
        const defended = resolveAutoDefense(personaByPlayerId);
        actedAny = actedAny || defended;
        if (!defended || game.winner !== null || game.active !== actorId) break;
        continue;
      }

      let acted = false;
      withAIPersona(personaId, () => {
        acted = aiUseDisaster(actor) || aiUseSkill(actor) || aiMove(actor) || aiAttack(actor) || aiRecover(actor) || aiSummon(actor) || aiDraw(actor) || aiSacrifice(actor);
      });
      actions += 1;
      actedAny = actedAny || acted;
      if (!acted || actions >= 10 || game.winner !== null || game.active !== actorId) break;
    }

    while (pendingDefense && game.winner === null && game.active === actorId) {
      const defended = resolveAutoDefense(personaByPlayerId);
      actedAny = actedAny || defended;
      if (!defended) break;
    }

    if (game.winner === null && game.active === actorId) {
      if (shouldLog) addLog(`${activePlayer().name} 结束回合。`);
      endTurn({ skipAutoAI: true });
    }
    return actedAny;
  } finally {
    autoPersonaContext = previousContext;
  }
}

function endTurn(options = {}) {
  if (game.winner !== null) return;
  if (pendingDiscard) {
    addLog("手牌超过上限，先弃 1 张再结束回合。");
    render();
    return;
  }
  endTurnConfirmScope = "";
  const outgoing = activePlayer();
  outgoing.turnsTaken = (outgoing.turnsTaken || 0) + 1;
  for (const lane of LANES) {
    outgoing.board[lane.key].forEach((card) => {
      if (!card) return;
      if (card.state === "spent") card.state = "ready";
      card.justSummoned = false;
      card.venomStrike = false;
    });
  }
  game.players.forEach((player) => {
    player.status.roarThisTurn = false;
  });
  if (outgoing.status.roarNextOwnTurn) outgoing.status.roarNextOwnTurn = false;
  resetTurnHype(outgoing);

  game.active = game.active === 0 ? 1 : 0;
  if (game.active === 0) game.turn += 1;

  const incoming = activePlayer();
  const waterBonus = incoming.board.water.filter(Boolean).length;
  const cappedWaterBonus = Math.min(3, waterBonus);
  const gain = 3 + cappedWaterBonus;
  incoming.turnSacrifices = 0;
  incoming.turnRecovers = 0;
  incoming.turnProtects = 0;
  incoming.turnSkills = 0;
  incoming.turnMoves = 0;
  for (const lane of LANES) {
    incoming.board[lane.key].forEach((card) => {
      if (!card) return;
      if (card.tauntTurns > 0) card.tauntTurns -= 1;
    });
  }
  incoming.food += gain;
  rollTurnDisaster(incoming);
  rollTurnQuest(incoming);
  resetTurnHype(incoming);
  selected = null;
  addLog(`${outgoing.name} 回合结束。${incoming.name} 获得 ${gain} 食物（基础 3 + 水生 ${cappedWaterBonus}）。本回合环境牌重新暗置，抽到后自动发动；骚操作任务是《${incoming.turnQuest?.title || "先发育"}》。`, {
    action: "end_turn",
    actor: outgoing.name,
    target: incoming.name,
    cost: 0,
    extra: {
      waterBonus,
      disaster: null,
      quest: incoming.turnQuest?.id || null,
    },
  });
  render();
  if (!options.skipAutoAI) runAITurn();
}

function laneLabel(lane) {
  return LANES.find((item) => item.key === lane)?.label || lane;
}

function skillBadgeText(player, card) {
  const bits = [];
  if (card.tauntTurns > 0) bits.push("嘲讽");
  if (card.venomStrike) bits.push("毒牙待发");
  if (card.kingChallenge) bits.push("兽王上头");
  if (card.pressureWounds > 0) bits.push(`压伤 ${card.pressureWounds}/4`);
  if (commanderAttackBonus(player, card) > 0) bits.push("指挥官加攻");
  if (wolfPackBonus(player, card) > 0) bits.push("狼群加攻");
  if (roarAttackPenalty(player, card) > 0 || roarDefensePenalty(player, card) > 0) bits.push("被虎啸压制");
  return bits.join(" · ");
}

function cardSpriteStyle(card) {
  const atlas = window.JUNGLE_SPRITE_ATLAS;
  const sprite = atlas?.cards?.[card?.name || ""];
  if (!sprite || !atlas?.cols || !atlas?.rows) return "";
  const scaleX = atlas.cols * 100;
  const scaleY = atlas.rows * 100;
  const posX = atlas.cols <= 1 ? 0 : (sprite.x / (atlas.cols - 1)) * 100;
  const posY = atlas.rows <= 1 ? 0 : (sprite.y / (atlas.rows - 1)) * 100;
  return `--sprite-bg-size:${scaleX}% ${scaleY}%;--sprite-x:${posX}%;--sprite-y:${posY}%;`;
}

function cardArtMarkup(card, compact = false) {
  if (!card) return "";
  const style = cardSpriteStyle(card);
  const classes = [
    "card-art",
    `space-${SPACE_LABELS[card.space] || "unknown"}`,
    `level-${String(card.level || "c").toLowerCase()}`,
    compact ? "compact" : "",
  ].filter(Boolean).join(" ");
  return `<span class="${classes}" style="${escapeHtml(style)}" aria-hidden="true"></span>`;
}

function cardMarkup(card, compact = false) {
  if (!card) return "";
  const owner = card.owner === null ? null : game.players[card.owner];
  const shownAttack = owner ? effectiveAttack(owner, card) : Number(card.atk) || 0;
  const shownDefense = owner ? effectiveDefense(owner, card) : Number(card.def) || 0;
  const badge = owner ? skillBadgeText(owner, card) : "";
  return `
    ${cardArtMarkup(card, compact)}
    <div class="name">${card.name}</div>
    <div class="meta">${card.level} 类 · ${card.space}</div>
    <div class="stats">
      <span class="stat atk"><span class="stat-label">攻</span><strong>${shownAttack}</strong></span>
      <span class="stat def"><span class="stat-label">防</span><strong>${shownDefense}</strong></span>
    </div>
    ${compact ? "" : `<span class="state">${STATE_LABELS[card.state] || "手牌"}</span>`}
    ${card.skill ? `<div class="skill">特技：${card.skill}</div>` : ""}
    ${badge ? `<div class="skill">${badge}</div>` : ""}
  `;
}

function handSummonStatus(player, card) {
  if (!player || !card) return { label: "", tone: "muted", title: "" };
  const cost = summonCost(card);
  const slots = emptySlotsFor(player, card);
  if (player.food < cost) {
    const gap = cost - player.food;
    return {
      label: `差 ${gap} 粮`,
      tone: "blocked",
      title: `上场要 ${cost} 食物，现在只有 ${player.food}。`,
    };
  }
  if (!slots.length) {
    return {
      label: "没空位",
      tone: "blocked",
      title: `${placementText(card)}已经没有空格。`,
    };
  }
  return {
    label: `可上 · ${slots.length} 格`,
    tone: "ready",
    title: `现在能放到 ${slots.length} 个合法空格。`,
  };
}

function renderBoard(container, player, side = "self") {
  container.innerHTML = "";
  // Keep both boards in the same visual orientation so players can compare lanes at a glance.
  const rowOrder = LANES;
  const boardLabel = side === "self"
    ? "你的场地"
    : (vsAI ? "AI 场地" : (isOnlineMode() ? "对方场地" : "玩家二场地"));
  const active = activePlayer();
  const focus = currentRouteFocus();
  const directSpotlight = currentDirectInteractionSpotlight(active, focus);
  const activeHand = currentSelectedHand(active);
  const activeBoard = currentSelectedBoard(active);
  const attackableUids = activeBoard && player.id !== active.id ? new Set(legalCreatureTargets(activeBoard, player).map((loc) => loc.card.uid)) : null;
  const attackPreviewMap = activeBoard && player.id !== active.id ? buildAttackTargetPreviewMap(activeBoard, player) : null;
  const reacting = pendingDefense && player.id === pendingDefense.defenderId && pendingDefense.kind === "face" ? new Set(legalFaceBlockers(attackerFromPendingDefense(), player).map((loc) => loc.card.uid)) : null;
  const guardedTargetUid = pendingDefense?.kind === "creature" ? pendingDefense.targetUid : null;
  const movableSlots = selected?.type === "board" && selected?.mode === "move" && activeBoard ? new Set(moveSlotsFor(active, activeBoard).map((slot) => `${slot.lane}:${slot.slotIndex}`)) : null;
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
      const slotMarkerKey = slotKey(player.id, lane.key, index);
      if (selected?.type === "board" && selected.uid === card?.uid) button.classList.add("selected");
      if (pendingDefense?.selectedBlockerUid && pendingDefense.selectedBlockerUid === card?.uid) button.classList.add("selected");
      if (card?.state) button.classList.add(`state-${card.state}`);
      if (card?.uid && damageFlashUids.has(card.uid)) button.classList.add("damage-flash");
      if ((card?.uid && combatFlash?.attackerUid === card.uid) || (combatFlash?.attackerSlotKey && combatFlash.attackerSlotKey === slotMarkerKey)) button.classList.add("combat-attacker");
      if ((card?.uid && combatFlash?.targetUid === card.uid) || (combatFlash?.targetSlotKey && combatFlash.targetSlotKey === slotMarkerKey)) button.classList.add("combat-target");
      if (guardedTargetUid && guardedTargetUid === card?.uid) button.classList.add("guardtarget");
      if (!card && activeHand && player.id === active.id && canSummonHere(player, activeHand.card, lane.key, index)) button.classList.add("summonable");
      if (!card && movableSlots?.has(`${lane.key}:${index}`) && player.id === active.id) button.classList.add("movable");
      if (card && attackableUids?.has(card.uid)) button.classList.add("attackable");
      if (card && reacting?.has(card.uid)) button.classList.add("guardable");
      if (card && focus.boardUids.has(card.uid)) button.classList.add("route-source");
      if (card && focus.targetUids.has(card.uid)) button.classList.add("route-target");
      if (!card && focus.slotKeys.has(slotMarkerKey)) button.classList.add("route-slot");
      const isDirectSpotlight = card
        ? (
          (directSpotlight?.kind === "board" && directSpotlight.boardUid === card.uid)
          || (directSpotlight?.kind === "target" && directSpotlight.targetUid === card.uid)
        )
        : (directSpotlight?.kind === "slot" && directSpotlight.slotKey === slotMarkerKey);
      let isDirectMuted = false;
      if (!isDirectSpotlight && directSpotlight?.kind === "board" && card) {
        const defensePeer = reacting?.has(card.uid) || false;
        const ownBoardPeer = !pendingDefense && player.id === active.id;
        isDirectMuted = defensePeer || ownBoardPeer;
      }
      if (!isDirectSpotlight && directSpotlight?.kind === "target" && card && attackableUids?.has(card.uid)) {
        isDirectMuted = true;
      }
      if (!isDirectSpotlight && directSpotlight?.kind === "slot" && !card && player.id === active.id) {
        const summonPeer = !!(activeHand && canSummonHere(player, activeHand.card, lane.key, index));
        const movePeer = movableSlots?.has(`${lane.key}:${index}`) || false;
        isDirectMuted = summonPeer || movePeer;
      }
      button.classList.toggle("is-direct-cta-spotlight", isDirectSpotlight);
      button.classList.toggle("is-direct-cta-muted", isDirectMuted);
      const targetPreview = card ? attackPreviewMap?.get(card.uid) : null;
      const boardCardMarkup = card
        ? `<div class="slot-card slot-card-face">${cardMarkup(card, true)}</div>`
        : `<span class="slot-card"></span>`;
      button.innerHTML = `<span class="slot-label">${index + 1}</span>${boardCardMarkup}${targetPreview ? attackTargetPreviewMarkup(targetPreview) : ""}`;
      const cardLabel = card
        ? `${card.name}，攻击 ${Number(card.atk) || 0}，防御 ${Number(card.def) || 0}`
        : "空位";
      if (typeof button.setAttribute === "function") {
        button.setAttribute("aria-label", `${boardLabel}，${lane.label}，第 ${index + 1} 格，${cardLabel}`);
      }
      const routeMarkerState = card
        ? (focus.targetMarkers.get(card.uid) || focus.boardMarkers.get(card.uid) || null)
        : (focus.slotMarkers.get(slotMarkerKey) || null);
      applyRouteMarker(button, routeMarkerState);
      if (card) {
        const detail = card.skill ? `｜${card.skill}：${skillPreview(card.skill)}` : "";
        const guardText = reacting?.has(card.uid) ? `｜格挡费 ${faceBlockCost(player, { card })}` : "";
        const targetText = targetPreview ? `｜这口：${targetPreview.note}` : "";
        button.title = `${card.name}｜攻 ${Number(card.atk) || 0} / 防 ${Number(card.def) || 0}${guardText}${detail}${targetText}`;
      } else {
        button.title = "";
      }
      button.addEventListener("click", () => {
        handleSlotClick(player, lane.key, index);
        onlineAfterHostAction("slotClick");
      });
      row.appendChild(button);
    });
    container.appendChild(row);
  });
}

function renderHand() {
  const player = isOnlineMode() ? game.players[onlineLocalPlayerId()] : activePlayer();
  const focus = currentRouteFocus();
  const directSpotlight = currentDirectInteractionSpotlight(player, focus);
  const discardMode = pendingDiscard?.playerId === player.id;
  const canUseHand = !isOnlineMode() || onlineCanControlCurrentDecision(player.id);
  els.handTitle.textContent = isOnlineMode() ? `你的手牌 · ${player.name}` : (vsAI ? "你的手牌" : `${player.name}手牌`);
  els.hand.innerHTML = "";
  if (!isOnlineMode() && vsAI && player.id === 1) {
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
    if (discardMode) button.classList.add("is-discard-choice");
    if (focus.handUids.has(card.uid)) button.classList.add("route-source");
    button.classList.toggle("is-direct-cta-spotlight", directSpotlight?.kind === "hand" && directSpotlight.handUid === card.uid);
    button.classList.toggle("is-direct-cta-muted", directSpotlight?.kind === "hand" && directSpotlight.handUid !== card.uid);
    applyRouteMarker(button, focus.handMarkers.get(card.uid) || null);
    const summonStatus = handSummonStatus(player, card);
    button.classList.toggle("is-hand-playable", !discardMode && summonStatus.tone === "ready");
    button.classList.toggle("is-hand-blocked", !discardMode && summonStatus.tone === "blocked");
    const skillText = skillInfo(card.skill)?.["触发方式"] === "主动" ? ` · 技能费 ${skillCost(card)}` : "";
    button.innerHTML = `
      ${cardMarkup(card, true)}
      <span class="hand-summon-chip tone-${escapeHtml(discardMode ? "discard" : summonStatus.tone)}">${escapeHtml(discardMode ? "弃这张" : summonStatus.label)}</span>
      <span class="state">${discardMode ? "满手弃牌" : `上场费 ${summonCost(card)}${skillText}`}</span>
    `;
    if (typeof button.setAttribute === "function") {
      button.setAttribute(
        "aria-label",
        `${card.name}，攻击 ${Number(card.atk) || 0}，防御 ${Number(card.def) || 0}，${discardMode ? "选择弃掉这张牌" : summonStatus.label}`,
      );
    }
    button.title = [
      `${card.name}｜攻 ${Number(card.atk) || 0} / 防 ${Number(card.def) || 0}｜上场费 ${summonCost(card)}`,
      discardMode ? "手牌超过上限。点这张会把它弃掉，然后继续本回合。" : summonStatus.title,
      card.skill ? `${card.skill}：${skillPreview(card.skill)}` : `${card.name} 没有主动特技。`,
    ].filter(Boolean).join("｜");
    button.addEventListener("click", () => {
      if (discardMode) {
        if (!canUseHand) {
          addLog(onlineWaitingDetail(player.id));
          render();
          return;
        }
        if (isOnlineMode() && !isOnlineHost()) {
          onlineMaybeSendAction({ kind: "discard", uid: card.uid });
          return;
        }
        resolveDiscardChoice(card.uid, player.id);
        onlineAfterHostAction("discard");
        return;
      }
      if (!canUseHand) {
        addLog(onlineWaitingDetail(player.id));
        render();
        return;
      }
      selected = { type: "hand", uid: card.uid, playerId: player.id };
      render();
    });
    els.hand.appendChild(button);
  });
}

function handleSlotClick(player, lane, slotIndex) {
  if (isOnlineMode() && !isOnlineHost()) {
    const actorId = onlineLocalPlayerId();
    if (pendingDiscard) {
      addLog(onlineWaitingDetail(actorId));
      render();
      return;
    }
    const card = player.board[lane][slotIndex];
    const selectedHand = currentSelectedHand(game.players[actorId]);
    const selectedBoard = currentSelectedBoard(game.players[actorId]);
    const moveMode = selected?.type === "board" && selected?.mode === "move";
    const mutatingClick = !!pendingDefense
      || !!selectedHand
      || moveMode
      || (selectedBoard && player.id !== actorId && !!card);
    if (mutatingClick) {
      onlineMaybeSendAction({ kind: "slotClick", targetPlayerId: player.id, lane, slotIndex });
      return;
    }
    if (!onlineCanControlCurrentDecision(actorId)) {
      addLog(onlineWaitingDetail(actorId));
      render();
      return;
    }
    if (card && player.id === actorId) {
      selected = { type: "board", uid: card.uid, playerId: player.id, lane, slotIndex };
    } else {
      selected = null;
    }
    render();
    return;
  }
  if (pendingDiscard) {
    addLog(pendingDiscard.playerId === player.id ? "先从手牌里选 1 张弃掉，才能继续操作场面。" : "对方正在处理满手弃牌，先等这一步结完。");
    render();
    return;
  }
  if (pendingDefense) {
    if (isOnlineMode() && !onlineCanControlCurrentDecision()) {
      addLog(onlineWaitingDetail());
      render();
      return;
    }
    if (pendingDefense.kind === "face") {
      const card = player.board[lane][slotIndex];
      const defender = defendingPlayer();
      const legal = player.id === pendingDefense.defenderId ? legalPendingFaceBlockers(attackerFromPendingDefense(), defender) : [];
      if (card && legal.some((loc) => loc.card.uid === card.uid)) {
        pendingDefense.selectedBlockerUid = pendingDefense.selectedBlockerUid === card.uid ? null : card.uid;
        render();
        return;
      }
      addLog(friendlyDefenseBoardClickFeedback(player, lane, slotIndex));
      render();
      return;
    }
    addLog(friendlyDefenseBoardClickFeedback(player, lane, slotIndex));
    render();
    return;
  }
  if (vsAI && game.active === 1) return;
  const human = activePlayer();
  const card = player.board[lane][slotIndex];
  const selectedHand = currentSelectedHand(human);
  const selectedBoard = currentSelectedBoard(human);
  if (selected?.type === "board" && selected?.mode === "move") {
    if (player.id === activePlayer().id && !card) {
      moveSelected(lane, slotIndex);
    } else {
      addLog(withFriendlyCue("换线模式里只认发亮空格。", {
        player: human,
        fallback: "去点你这边发亮的空格，或者点“取消选择”",
      }));
      render();
    }
    return;
  }
  if (selectedHand) {
    if (player.id !== human.id) {
      addLog(withFriendlyCue(`《${selectedHand.card.name}》还在手里，先别往对面比划。`, {
        player: human,
        fallback: "先把它落到你这边发亮的空格",
      }));
      render();
      return;
    }
    if (card) {
      addLog(withFriendlyCue(`${slotLabelText(lane, slotIndex)}已经有人蹲着了。`, {
        player: human,
        fallback: "换个发亮空格就行",
      }));
      render();
      return;
    }
    summonSelected(lane, slotIndex);
    return;
  }
  if (selectedBoard && player.id !== human.id && !card) {
    addLog(withFriendlyCue("空白格不算目标，先点对面的生物。", {
      player: human,
      fallback: "先回你这边点一只生物，再回来挑目标",
    }));
    render();
    return;
  }
  if (selectedBoard && player.id === human.id && !card) {
    addLog(withFriendlyCue("这会儿空格不会自己结算动作。", {
      player: human,
      fallback: "想换线的话，先点下面那颗“免费换线”",
    }));
    render();
    return;
  }
  if (selectedBoard && player.id !== human.id && card) {
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
  const { self, opponent } = tableViewPlayers();
  const persona = currentAIPersona();
  const statusText = (player) => `❤️ ${player.hp} · 🍖 ${player.food} · ✨ ${player.turnSkills || 0}/1 · ↔️ ${player.turnMoves || 0}/1 · 🍽️ ${player.turnSacrifices}/1 · 🔄 ${player.turnRecovers}/1 · 🛡️ ${player.turnProtects || 0}/1${roarActive(player) ? " · 🐯 被虎啸" : ""}`;
  const statusMarkup = (player) => `
    <span class="status-primary">
      <span class="status-stat status-hp">❤️ <b>${player.hp}</b></span>
      <span class="status-stat status-food">🍖 <b>${player.food}</b></span>
    </span>
    <span class="status-secondary">✨ ${player.turnSkills || 0}/1 · ↔️ ${player.turnMoves || 0}/1 · 🍽️ ${player.turnSacrifices}/1 · 🔄 ${player.turnRecovers}/1 · 🛡️ ${player.turnProtects || 0}/1${roarActive(player) ? " · 🐯 被虎啸" : ""}</span>
  `;
  els.p1Panel.classList.toggle("active", game.active === self.id);
  els.p2Panel.classList.toggle("active", game.active === opponent.id);
  els.p1Panel.classList.toggle("reacting", pendingDefense?.defenderId === self.id);
  els.p2Panel.classList.toggle("reacting", pendingDefense?.defenderId === opponent.id);
  els.p1Panel.classList.toggle("combat-damaged", combatFlash?.targetPlayerId === self.id);
  els.p2Panel.classList.toggle("combat-damaged", combatFlash?.targetPlayerId === opponent.id);
  [
    [els.p1Panel, els.p1Status, self],
    [els.p2Panel, els.p2Status, opponent],
  ].forEach(([panel, status, player]) => {
    const isTurn = game.active === player.id;
    panel.classList.toggle("is-turn", isTurn);
    panel.classList.toggle("is-waiting", !isTurn);
    panel.dataset.turnState = isTurn
      ? (panel === els.p1Panel ? "你的回合" : (vsAI ? "AI 回合" : "对方回合"))
      : "等待中";
    if (status) {
      status.innerHTML = statusMarkup(player);
      if (typeof status.setAttribute === "function") status.setAttribute("aria-label", statusText(player));
    }
  });
  els.p1Deck.textContent = `🎴 ${self.deck.length}`;
  els.p2Deck.textContent = `🎴 ${opponent.deck.length}`;
  els.p1Hand.textContent = `🖐️ ${self.hand.length}`;
  els.p2Hand.textContent = `🖐️ ${opponent.hand.length}`;
  els.p1Grave.textContent = `☠️ ${self.grave.length}`;
  els.p2Grave.textContent = `☠️ ${opponent.grave.length}`;
  if (els.p1Hype) els.p1Hype.textContent = `🔥 ${currentTurnHype(self)}/${HYPE_THRESHOLDS[1]}`;
  if (els.p2Hype) els.p2Hype.textContent = `🔥 ${currentTurnHype(opponent)}/${HYPE_THRESHOLDS[1]}`;
  renderCuePill(els.p1Cue, self);
  renderCuePill(els.p2Cue, opponent);
  els.turnLabel.textContent = `第 ${game.turn} 回合 · ${activePlayer().name}`;
  els.publicCounts.textContent = `A ${game.publicPiles.A.length} · B ${game.publicPiles.B.length} · C ${game.publicPiles.C.length}`;
  renderPublicPilePreviews();
  if (els.player1Label) {
    els.player1Label.textContent = tablePanelLabel(self, "self");
  }
  els.player2Label.textContent = tablePanelLabel(opponent, "opponent");
  if (els.selfZoneTitle) els.selfZoneTitle.textContent = isOnlineMode() ? `你的场地 · ${onlineRoleLabel(self)}` : "你的场地";
  if (els.selfZoneHint) els.selfZoneHint.textContent = "选手牌后点空格上场";
  if (els.opponentZoneTitle) {
    els.opponentZoneTitle.textContent = isOnlineMode()
      ? `对方场地 · ${onlineRoleLabel(opponent)}`
      : (vsAI ? "AI 场地" : "对手场地");
  }
  if (els.opponentZoneHint) {
    els.opponentZoneHint.textContent = isOnlineMode()
      ? "选己方生物后点对方生物攻击"
      : (vsAI ? "选己方生物后点 AI 生物攻击" : "选己方生物后点对方生物攻击");
  }
  els.modeBtn.textContent = isOnlineMode() ? "模式：双人在线" : (vsAI ? "模式：对战 AI" : "模式：双人热座");
  if (els.aiPersonaBtn) {
    els.aiPersonaBtn.textContent = isOnlineMode() ? "AI 脾气：在线关闭" : (vsAI ? `AI 脾气：${persona.label}` : "AI 脾气：双人模式");
    els.aiPersonaBtn.title = isOnlineMode() ? "在线双人模式下不会启用 AI 人格。" : (vsAI ? persona.blurb : "双人模式下不会启用 AI 人格。");
  }
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.disabled = game.winner !== null || aiThinking || !!pendingDiscard || (vsAI && game.active === 1);
  });
  document.querySelector("#endTurnBtn").disabled = game.winner !== null || aiThinking || !!pendingDiscard || (vsAI && game.active === 1);
}

function renderOpponentHandFan() {
  if (!els.opponentHandFan || !game) return;
  const { opponent } = tableViewPlayers();
  const count = opponent?.hand?.length || 0;
  const shown = Math.min(count, 8);
  els.opponentHandFan.classList.toggle("is-empty", count === 0);
  els.opponentHandFan.innerHTML = `
    <span class="opponent-hand-label">对方手牌 <b>${count}</b></span>
    <div class="opponent-hand-cards" style="--hand-count:${shown || 1}">
      ${Array.from({ length: shown }, (_, index) => `
        <span class="card-back" style="--i:${index};--tilt:${shown <= 1 ? 0 : (index - ((shown - 1) / 2)) * 2.4}deg"></span>
      `).join("")}
      ${count > shown ? `<span class="card-back-more">+${count - shown}</span>` : ""}
    </div>
  `;
}

function publicDrawCost(level) {
  return level === "A" ? 3 : 2;
}

function publicTopCard(level) {
  return game?.publicPiles?.[level]?.[0] || null;
}

function drawButtonPreviewMarkup({ label, cost, card = null, count = 0, level = "", privateDeck = false }) {
  const safeLevel = escapeHtml(level || "");
  const safeLabel = escapeHtml(label || "");
  const countLabel = privateDeck ? `私有牌堆 ${count} 张` : `${safeLevel} 池剩余 ${count} 张`;
  const preview = card
    ? `<span class="card draw-preview-card">${cardMarkup(card, true)}</span>`
    : `<span class="draw-preview-card draw-preview-empty">${privateDeck ? "暗牌" : "已空"}</span>`;
  return `
    <span class="draw-button-head">
      <strong>${safeLabel}</strong>
      <em>-${Number(cost) || 0} 食物</em>
    </span>
    ${preview}
    <span class="draw-button-foot">${escapeHtml(countLabel)}</span>
  `;
}

function renderPublicPilePreviews() {
  if (!game) return;
  ["A", "B", "C"].forEach((level) => {
    const element = document.querySelector(`.pile.level-${level.toLowerCase()}`);
    if (!element) return;
    const card = publicTopCard(level);
    const count = game.publicPiles[level]?.length || 0;
    element.classList.toggle("is-empty", !card);
    element.innerHTML = card
      ? `
        <span class="pile-level">${level}</span>
        ${cardArtMarkup(card, true)}
        <strong>${escapeHtml(card.name)}</strong>
        <span>${escapeHtml(spaceOf(card))} · ${escapeHtml(card.level || level)} · ${escapeHtml(card.atk)}/${escapeHtml(card.def)}</span>
        <small>${count} 张 · 抽取 -${publicDrawCost(level)}</small>
      `
      : `
        <span class="pile-level">${level}</span>
        <strong>已抽空</strong>
        <span>没有可抽公共牌</span>
        <small>0 张</small>
      `;
  });
}

function countActionableAttackers(player) {
  const enemy = game.players[player.id === 0 ? 1 : 0];
  return boardCards(player).filter((loc) => {
    const faceCost = faceAttackCost(loc.card, enemy);
    const faceReady = !faceAttackReadyError(player, loc.card, enemy) && !availableTaunts(enemy, loc.card).length;
    return faceReady || legalCreatureTargets(loc, enemy).length > 0;
  });
}

function opponentFaceThreatSummary(player = activePlayer()) {
  if (!game || !player) return null;
  const enemy = game.players[player.id === 0 ? 1 : 0];
  if (!enemy) return null;
  const nextFood = enemy.food + 3 + Math.min(3, enemy.board.water.filter(Boolean).length);
  let budget = nextFood;
  const faceOptions = boardCards(enemy)
    .map((loc) => {
      const card = loc.card;
      const cost = attackSpendCost(enemy, card, player);
      if (faceAttackReadyErrorWithFood(enemy, card, player, nextFood)) return null;
      if (availableTaunts(player, card).length) return null;
      const damage = effectiveAttack(enemy, card);
      if (damage <= 0) return null;
      return { card, cost, damage };
    })
    .filter(Boolean)
    .sort((a, b) => b.damage - a.damage || a.cost - b.cost);
  let damage = 0;
  let attackers = 0;
  for (const option of faceOptions) {
    if (budget < option.cost) continue;
    budget -= option.cost;
    damage += option.damage;
    attackers += 1;
  }
  if (!attackers || !damage) return null;
  return {
    damage,
    attackers,
    lethal: damage >= player.hp,
    label: `打脸风险：最多 ${damage} 血`,
    detail: `${attackers} 只动物下回合可能直接攻击玩家`,
  };
}

function buildTurnHintState(player = activePlayer()) {
  if (!game || !player) {
    return {
      tone: "support",
      title: "先开一局",
      detail: "开局后这里会显示本回合还能做什么。",
      chips: [],
    };
  }
  if (game.winner !== null) {
    return {
      tone: "reward",
      title: "本局结束",
      detail: "战报已经记下来了，可以新开一局继续测。",
      chips: [`第 ${game.turn} 回合`, `${game.history.length} 步`],
    };
  }
  if (pendingDiscard) {
    const discardPlayer = game.players[pendingDiscard.playerId] || player;
    const isMine = discardPlayer?.id === (isOnlineMode() ? onlineLocalPlayerId() : player?.id);
    return {
      tone: "warning",
      title: "手牌满了，先弃 1 张",
      detail: isMine ? "直接点下面任意一张手牌，把它丢进弃牌区。" : `等 ${discardPlayer?.name || "对方"} 从满手里弃 1 张。`,
      chips: [`上限 ${MAX_HAND_SIZE}`, `当前 ${discardPlayer?.hand?.length || 0}`],
    };
  }
  if (isOnlineMode() && !onlineCanControlCurrentDecision()) {
    return {
      tone: "support",
      title: pendingDefense ? "等对方防守" : "在线等对方行动",
      detail: onlineWaitingDetail(),
      chips: [
        onlineSession.conn?.open ? "已连接" : "连接中",
        `你是${game.players[onlineLocalPlayerId()]?.name || "本机玩家"}`,
      ],
    };
  }
  if (pendingDefense) {
    const state = buildPendingDefenseState();
    return {
      tone: "danger",
      title: pendingDefense.kind === "creature" ? "先决定要不要保护动物" : "先决定这一口怎么挡",
      detail: pendingDefense.kind === "creature"
        ? `对方正在攻击《${state?.targetName || "目标"}》：你可以让玩家承受打击保住它，也可以让动物自己承受伤害。护场每回合只能用 1 次。`
        : `对方正在攻击玩家：选择动物格挡，或让玩家直接承受 ${state?.attackValue || pendingDefense.attackValue || 0} 点打击。`,
      chips: [
        pendingDefense.kind === "creature" ? "动物被攻击" : "玩家被攻击",
        `伤害 ${state?.attackValue || pendingDefense.attackValue || 0}`,
        "先处理防守",
      ],
    };
  }
  if (vsAI && game.active === 1) {
    return {
      tone: "support",
      title: `AI 回合 · ${currentAIPersona().label}`,
      detail: "先看右侧场地和战斗日志。AI 会连续尝试技能、攻击、移动、上场和补牌。",
      chips: [`食物 ${player.food}`, `手牌 ${player.hand.length}`, `场上 ${boardCards(player).length}`],
    };
  }

  const selectedHand = currentSelectedHand(player);
  const selectedBoard = currentSelectedBoard(player);
  const summonable = player.hand.filter((card) => summonCost(card) <= player.food && emptySlotsFor(player, card).length > 0);
  const attackers = countActionableAttackers(player);
  const skillReady = boardCards(player).filter((loc) => !activeSkillReadyError(player, loc.card));
  const movable = boardCards(player).filter((loc) => !moveReadyError(player, loc));
  const recoverable = boardCards(player).filter((loc) => !recoverReadyError(player, loc));
  const justSummoned = boardCards(player).filter((loc) => loc.card.justSummoned);
  const spent = boardCards(player).filter((loc) => loc.card.state === "spent");
  const drawOptions = [
    player.food >= 1 && player.deck.length > 0 ? "私有" : "",
    player.food >= 3 && game.publicPiles.A.length > 0 ? "A" : "",
    player.food >= 2 && game.publicPiles.B.length > 0 ? "B" : "",
    player.food >= 2 && game.publicPiles.C.length > 0 ? "C" : "",
  ].filter(Boolean);
  const threat = opponentFaceThreatSummary(player);

  const chips = [
    `食物 ${player.food}`,
    threat?.label || "",
    threat?.lethal ? "斩杀风险" : "",
    summonable.length ? `可上场 ${summonable.length}` : "",
    attackers.length ? `可攻击 ${attackers.length}` : "",
    skillReady.length ? `可技能 ${skillReady.length}` : "",
    movable.length ? `可移动 ${movable.length}` : "",
    recoverable.length ? `可复工 ${recoverable.length}` : "",
    drawOptions.length ? `可补牌 ${drawOptions.length}` : "",
  ].filter(Boolean);

  if (selectedHand?.card) {
    const slots = emptySlotsFor(player, selectedHand.card);
    return {
      tone: "support",
      title: `已选《${selectedHand.card.name}》`,
      detail: slots.length
        ? `点你场上发亮的空格让它上场。上场后如果还有食物，仍然可以继续上别的动物、补牌或发动场上动物的技能。`
        : "这张牌现在没有合法空位；可以取消选择，换一张牌或先挪位置。",
      chips: [`上场费 ${summonCost(selectedHand.card)}`, slots.length ? `可放 ${slots.length} 格` : "无空位", ...chips.slice(0, 4)],
    };
  }

  if (selectedBoard?.card) {
    const card = selectedBoard.card;
    const actions = buildSelectedBoardHintActions(player, selectedBoard).filter((action) => action.id !== "cancelSelection");
    return {
      tone: attackers.some((loc) => loc.card.uid === card.uid) ? "attack" : "support",
      title: `已选《${card.name}》`,
      detail: card.justSummoned
        ? "它本回合刚上场，不能攻击；但如果它有主动技能且食物够，仍然可以发动技能，也可以继续操作其他动物。"
        : actions.length
          ? `这只现在有 ${actions.length} 个可用动作。攻击后只有它会进入备战，其他战斗状态动物仍可继续行动。`
          : "这只现在没有好动作；可以换选别的动物、继续上场、补牌，或者结束回合。",
      chips: [`状态 ${STATE_LABELS[card.state] || card.state}`, `攻 ${effectiveAttack(player, card)}`, `防 ${effectiveDefense(player, card)}`, ...chips.slice(0, 4)],
    };
  }

  if (!boardCards(player).length && summonable.length) {
    return {
      tone: "support",
      title: "先把动物放上场",
      detail: `你现在有 ${summonable.length} 张牌能上场。第一回合可以连续上多只动物，只要食物够；刚上场的动物下回合才会攻击。`,
      chips,
    };
  }

  if (attackers.length) {
    return {
      tone: "attack",
      title: `还能攻击：${attackers.length} 只动物`,
      detail: "一只动物攻击后会进入备战，但其他战斗状态动物还能继续攻击、移动或发动技能。别急着结束回合。",
      chips,
    };
  }

  if (summonable.length || skillReady.length || movable.length || recoverable.length || drawOptions.length) {
    return {
      tone: "support",
      title: "本回合还没空",
      detail: [
        summonable.length ? `还有 ${summonable.length} 张手牌能上场` : "",
        skillReady.length ? `${skillReady.length} 只动物能发动主动技能` : "",
        movable.length ? `${movable.length} 只动物能移动` : "",
        recoverable.length ? `${recoverable.length} 只动物能复工` : "",
        drawOptions.length ? "还可以补牌" : "",
      ].filter(Boolean).join("；") + "。",
      chips,
    };
  }

  return {
    tone: "support",
    title: "可以收手",
    detail: justSummoned.length
      ? `本回合新上场的 ${justSummoned.length} 只动物不能立刻攻击。等下回合它们进入战斗状态再开打。`
      : spent.length
        ? "能动的动物已经行动过了，结束回合后备战动物会恢复为战斗状态。"
        : "当前没有可用动作，结束回合是合理选择。",
    chips: [`食物 ${player.food}`, justSummoned.length ? `刚上场 ${justSummoned.length}` : "", spent.length ? `备战 ${spent.length}` : ""].filter(Boolean),
  };
}

function renderTurnHint() {
  if (!els.turnHint || !els.turnHintTitle || !els.turnHintDetail || !els.turnHintChips) return;
  const state = buildTurnHintState(activePlayer());
  const suggestion = currentPrimarySuggestion();
  const suggestionChip = suggestion && !(vsAI && game?.active === 1)
    ? `亮起：${guidePrimaryLabel(suggestion)}`
    : "";
  const chips = [
    suggestionChip,
    ...(state.chips || []),
  ].filter(Boolean);
  els.turnHint.className = `turn-hint tone-${escapeHtml(state.tone || "support")}`;
  els.turnHintTitle.textContent = state.title || "本回合提示";
  els.turnHintDetail.textContent = state.detail || "";
  els.turnHintChips.innerHTML = chips
    .slice(0, 7)
    .map((chip) => {
      let chipClass = "";
      if (String(chip).startsWith("亮起：")) chipClass = "is-suggested";
      if (String(chip).startsWith("打脸风险")) chipClass = "is-warning";
      if (String(chip) === "斩杀风险") chipClass = "is-danger";
      return `<span${chipClass ? ` class="${chipClass}"` : ""}>${escapeHtml(chip)}</span>`;
    })
    .join("");
}

function renderHandPeek() {
  if (!els.handPeek || !game) return;
  const player = isOnlineMode() ? game.players[onlineLocalPlayerId()] : game.players[0];
  const selectedHand = currentSelectedHand(player);
  const cards = player.hand.slice(0, 3);
  const extra = player.hand.length - cards.length;
  if (!cards.length) {
    els.handPeek.classList.add("hidden");
    els.handPeek.innerHTML = "";
    return;
  }
  els.handPeek.classList.remove("hidden");
  const items = cards
    .map((card) => {
      const summonStatus = handSummonStatus(player, card);
      return `
      <button
        type="button"
        class="hand-peek-chip hand-peek-action tone-${escapeHtml(summonStatus.tone)}${selectedHand?.card?.uid === card.uid ? " is-selected" : ""}"
        data-hand-peek-uid="${escapeHtml(card.uid)}"
        title="点一下就能直接拿起《${escapeHtml(card.name)}》。${escapeHtml(summonStatus.title)}"
      >
        <strong class="hand-peek-name">《${escapeHtml(card.name)}》</strong>
        <span class="hand-peek-meta">${escapeHtml(card.space || "任意")} · ${summonCost(card)} · ${escapeHtml(summonStatus.label)}</span>
      </button>
    `;
    })
    .join("");
  els.handPeek.innerHTML = `
    <span class="hand-peek-label">手牌快照 · ${player.hand.length} 张</span>
    <div class="hand-peek-list">
      ${items}
      ${extra > 0 ? `<span class="hand-peek-chip more">+${extra} 张</span>` : ""}
    </div>
  `;
  els.handPeek.querySelectorAll("[data-hand-peek-uid]").forEach((button) => {
    button.addEventListener("click", () => {
      const uid = button.dataset.handPeekUid;
      if (!uid) return;
      selected = { type: "hand", uid, playerId: player.id };
      render();
    });
  });
}

function hintStep(title, detail, tone = "") {
  return { title, detail, tone };
}

function hintAction(id, label, tone = "support", title = "", detail = "") {
  return { id, label, tone, title, detail };
}

function cardNameFromUid(uid, fallback = "这张牌") {
  if (!uid) return fallback;
  return findCardLocation(uid)?.card?.name || fallback;
}

function buildAttackTargetPreview(sourceLoc, targetLoc) {
  if (!sourceLoc?.card || !targetLoc?.card || !sourceLoc?.player || !targetLoc?.player) return null;
  const attacker = sourceLoc.card;
  const defender = targetLoc.card;
  const attackerOwner = sourceLoc.player;
  const defenderOwner = targetLoc.player;
  const attackValue = effectiveAttack(attackerOwner, attacker);
  const defenseValue = defender.state === "rest" ? 0 : effectiveDefense(defenderOwner, defender);
  const cost = attackSpendCost(attackerOwner, attacker);
  const kill = attackValue > defenseValue;
  const rest = !kill && attackValue * 2 > defenseValue;
  const venom = !kill && !rest && attacker.venomStrike;
  if (!kill && !rest && !venom) return null;

  const verdict = kill ? (defender.level === "A" ? "收A" : "收掉") : rest ? "压休" : "毒翻";
  const resultChip = kill ? "退场" : rest ? "休息" : "毒休";
  const detailLabel = kill
    ? `${verdict} · 目标退场`
    : rest
      ? "压休 · 下回合缓一拍"
      : "毒翻 · 不死也躺";
  const pressureLabel = kill
    ? `点下去会让《${defender.name}》退场。`
    : rest
      ? `点下去会让《${defender.name}》进入休息。`
      : `点下去靠毒牙把《${defender.name}》压进休息。`;
  const note = kill
    ? `这口能直接带走《${defender.name}》。`
    : rest
      ? `这口会把《${defender.name}》按进休息。`
      : `这口靠毒牙也能把《${defender.name}》压去休息。`;
  const actionLabel = `${kill ? "收" : rest ? "压" : "毒"} ${defender.name}`;
  const tag = defender.tauntTurns > 0 ? "拆嘲讽" : defender.level === "A" ? "高费" : defender.state === "rest" ? "躺着" : "";
  const tone = venom ? "trick" : "attack";
  const score = cardValue(defender) + (kill ? 3.4 : rest ? 1.25 : 0.9) - cost * 0.35 + (defender.tauntTurns > 0 ? 0.7 : 0);
  const suggestion = currentPrimarySuggestion();
  const recommended = suggestion?.cardUid === attacker.uid && suggestion?.targetUid === defender.uid;
  return {
    uid: defender.uid,
    tone,
    verdict,
    resultChip,
    detailLabel,
    pressureLabel,
    targetName: defender.name,
    attackValue,
    defenseValue,
    cost,
    tag,
    note,
    actionLabel,
    score: score + (recommended ? 0.3 : 0),
    recommended,
  };
}

function buildAttackTargetPreviewMap(sourceLoc, defenderOwner) {
  if (!sourceLoc?.card || !defenderOwner) return new Map();
  return new Map(
    legalCreatureTargets(sourceLoc, defenderOwner)
      .map((targetLoc) => [targetLoc.card.uid, buildAttackTargetPreview(sourceLoc, targetLoc)])
      .filter(([, preview]) => !!preview),
  );
}

function attackTargetPreviewMarkup(preview) {
  if (!preview) return "";
  return `
    <span class="slot-target-preview">
      <span class="target-preview-chip tone-${escapeHtml(preview.tone || "attack")}">${escapeHtml(preview.verdict || "可打")}</span>
      ${preview.resultChip ? `<span class="target-preview-chip tone-result">${escapeHtml(preview.resultChip)}</span>` : ""}
      ${preview.tag ? `<span class="target-preview-chip tone-muted">${escapeHtml(preview.tag)}</span>` : ""}
      ${preview.recommended ? `<span class="target-preview-chip tone-reward">可选</span>` : ""}
    </span>
  `;
}

function creatureAttackShortcutState(sourceLoc, defenderOwner = opponentPlayer()) {
  if (!sourceLoc?.card || !defenderOwner) return null;
  const targets = legalCreatureTargets(sourceLoc, defenderOwner);
  if (!targets.length) return null;
  const targetByUid = new Map(targets.map((targetLoc) => [targetLoc.card.uid, targetLoc]));
  const previewMap = buildAttackTargetPreviewMap(sourceLoc, defenderOwner);
  const suggestion = currentPrimarySuggestion();

  if (
    suggestion
    && (suggestion.kind === "attack_creature" || suggestion.kind === "move_attack_creature")
    && suggestion.cardUid === sourceLoc.card.uid
    && targetByUid.has(suggestion.targetUid)
  ) {
    const targetLoc = targetByUid.get(suggestion.targetUid);
    const preview = previewMap.get(suggestion.targetUid) || buildAttackTargetPreview(sourceLoc, targetLoc);
    return {
      targetLoc,
      preview,
      mode: "suggested",
      label: preview?.actionLabel || `打 ${targetLoc.card.name}`,
      title: `这拍更像先处理《${targetLoc.card.name}》。你也可以直接点右侧目标。`,
    };
  }

  if (targets.length === 1) {
    const targetLoc = targets[0];
    const preview = previewMap.get(targetLoc.card.uid) || buildAttackTargetPreview(sourceLoc, targetLoc);
    return {
      targetLoc,
      preview,
      mode: "only",
      label: preview?.actionLabel || `打 ${targetLoc.card.name}`,
      title: `这只现在只够得到《${targetLoc.card.name}》，按一下就会直接打过去。`,
    };
  }

  return null;
}

function parseHintPositionAction(actionId, prefix) {
  if (!actionId || !actionId.startsWith(`${prefix}:`)) return null;
  const [, lane, rawSlotIndex] = actionId.split(":");
  const slotIndex = Number(rawSlotIndex);
  if (!lane || Number.isNaN(slotIndex)) return null;
  return { lane, slotIndex };
}

function buildSelectedHandHintActions(player, loc) {
  if (!player || !loc?.card) return [];
  const suggestion = currentPrimarySuggestion();
  const recommendedKey = suggestion?.kind === "summon" && suggestion.cardUid === loc.card.uid
    ? `${suggestion.lane}:${suggestion.slotIndex}`
    : "";
  const slotActions = emptySlotsFor(player, loc.card)
    .map((slot) => {
      const key = `${slot.lane}:${slot.slotIndex}`;
      return hintAction(
        `summon:${slot.lane}:${slot.slotIndex}`,
        slotLabelText(slot.lane, slot.slotIndex),
        key === recommendedKey ? "reward" : "support",
        key === recommendedKey ? "这格现在节奏最顺。" : `把它放到${slotLabelText(slot.lane, slot.slotIndex)}。`,
      );
    });
  return [...slotActions, hintAction("cancelSelection", "取消选择")];
}

function buildMovingHintActions(player, loc) {
  if (!player || !loc?.card) return [];
  const actions = moveSlotsFor(player, loc)
    .map((slot) => hintAction(
      `move:${slot.lane}:${slot.slotIndex}`,
      slotLabelText(slot.lane, slot.slotIndex),
      "trick",
      `把${loc.card.name}挪到${slotLabelText(slot.lane, slot.slotIndex)}。`,
    ));
  actions.push(hintAction("cancelSelection", "取消选择"));
  return actions;
}

function buildSelectedBoardHintActions(player, loc) {
  if (!player || !loc?.card) return [];
  const enemy = opponentPlayer();
  const actions = [];
  const faceCost = faceAttackCost(loc.card, enemy);
  const faceReady = faceAttackReadyError(player, loc.card, enemy) === "" && availableTaunts(enemy, loc.card).length === 0;
  const skillError = activeSkillReadyError(player, loc.card);
  const moveError = moveReadyError(player, loc);
  const recoverError = recoverReadyError(player, loc);
  const legalTargets = [...buildAttackTargetPreviewMap(loc, enemy).values()].sort((a, b) => (b.score || 0) - (a.score || 0));
  const fallbackSuggestion = currentPrimarySuggestion();
  const selectedPrimary = buildSelectedBoardPrimarySuggestion(player, loc, fallbackSuggestion);
  const moveSuggestion = selectedPrimary && ["move", "move_attack_face", "move_attack_creature"].includes(selectedPrimary.kind)
    ? selectedPrimary
    : buildMoveCueSuggestion(player, loc);

  if (!skillError) {
    actions.push(hintAction(
      "skill",
      `发动 ${loc.card.skill}`,
      "trick",
      skillPreview(loc.card.skill) || `发动${loc.card.skill}。`,
      firstExcitementDetail(player, { kind: "skill", cardUid: loc.card.uid }),
    ));
  }
  if (faceReady) {
    const facePreview = faceAttackOutcomePreview(player, loc);
    const excitement = firstExcitementDetail(player, { kind: "attack_face", cardUid: loc.card.uid });
    actions.push(hintAction(
      "attackPlayer",
      `${vsAI ? "冲 AI" : "冲脸"} -${faceCost}`,
      "attack",
      facePreview?.pressureLabel || `直接让${loc.card.name}去打玩家。`,
      [facePreview?.detailLabel || facePreview?.label || "", excitement].filter(Boolean).join(" · "),
    ));
  }
  legalTargets.slice(0, 3).forEach((preview) => {
    const excitement = firstExcitementDetail(player, { kind: "attack_creature", cardUid: loc.card.uid, targetUid: preview.uid });
    actions.push(hintAction(
      `attackTarget:${preview.uid}`,
      preview.actionLabel,
      preview.tone,
      preview.note,
      [preview.detailLabel || "", excitement].filter(Boolean).join(" · "),
    ));
  });
  if (!moveError) {
    actions.push(hintAction(
      "moveMode",
      "移动 -1",
      "trick",
      `给${loc.card.name}换个位置。`,
      firstExcitementDetail(player, moveSuggestion),
    ));
  }
  if (!recoverError) {
    actions.push(hintAction(
      "recover",
      "复工 -1",
      "support",
      `花 1 食物让${loc.card.name}回到战斗状态。`,
      firstExcitementDetail(player, { kind: "recover", cardUid: loc.card.uid }),
    ));
  }
  if (player.turnSacrifices < 1) {
    actions.push(hintAction(
      "sacrifice",
      "当食物 +1",
      "reward",
      `把${loc.card.name}吃掉换 1 食物。`,
      firstExcitementDetail(player, { kind: "sacrifice", cardUid: loc.card.uid }, { includeFallbackHype: false }),
    ));
  }
  actions.push(hintAction("cancelSelection", "取消选择"));
  return actions;
}

function buildPendingDefenseHintActions() {
  if (!pendingDefense) return [];
  if (pendingDefense.kind === "face") {
    const attackerLoc = attackerFromPendingDefense();
    const defender = defendingPlayer();
    const shortcut = faceDefenseShortcutState(attackerLoc, defender);
    const blockerLoc = selectedGuardBlocker() || shortcut?.blockerLoc || null;
    const leak = attackerLoc?.card ? faceGuardDamageLeak(attackerLoc.card) : 0;
    if (!blockerLoc?.card) {
      return [
        hintAction(
          "letThrough",
          pendingDefense.attackValue ? `玩家承受打击 ${pendingDefense.attackValue}` : "玩家承受打击",
          "attack",
          "现在没有合法格挡动物，只能由玩家承受这一下。",
          pendingDefense.attackValue ? `玩家 -${pendingDefense.attackValue} 血` : "直接结算伤害",
        ),
      ];
    }
    const guardCost = faceBlockCost(defender, blockerLoc);
    return [
      hintAction(
        "confirmGuard",
          `${pendingDefense.selectedBlockerUid ? "用" : shortcut?.mode === "recommended" ? "可用" : "用"} ${blockerLoc.card.name} 格挡 -${guardCost}`,
        pendingDefense.selectedBlockerUid ? "support" : "reward",
          `${blockerLoc.card.name} 会替玩家承受这次攻击。`,
        leak ? `会挡住 · 漏 ${leak}` : "这只会顶住",
      ),
      hintAction(
          "letThrough",
          pendingDefense.attackValue ? `玩家承受打击 ${pendingDefense.attackValue}` : "玩家承受打击",
        "attack",
          "不派动物格挡，直接由玩家结算伤害。",
        pendingDefense.attackValue ? `玩家 -${pendingDefense.attackValue} 血` : "直接结算伤害",
      ),
    ];
  }
  const targetLoc = defendingTargetCreature();
  const snapshot = creatureGuardSnapshot(attackerFromPendingDefense(), targetLoc);
  return [
    hintAction(
      "confirmGuard",
      `玩家承受打击 · 保住${targetLoc?.card?.name || "它"}`,
      "support",
      "由玩家自己掉血，保住目标动物。",
      "这只会保住",
    ),
    hintAction(
      "letThrough",
      `让动物承受伤害 · ${targetLoc?.card?.name || "它"}`,
      "attack",
      "由被攻击的动物按普通战斗结算。",
      snapshot?.dies ? "这只会退场" : (snapshot?.rests ? "这只会休息" : "按普通战斗结算"),
    ),
  ];
}

function runHintQuickAction(actionId) {
  if (!actionId || !game || game.winner !== null) return false;
  if (actionId === "runPrimary") return runPrimaryPlaybookShortcut();

  if (pendingDefense) {
    if (!canHumanResolveDefense()) return false;
    if (actionId.startsWith("guardSelect:")) {
      const blockerUid = actionId.split(":")[1] || "";
      if (!blockerUid) return false;
      pendingDefense.selectedBlockerUid = pendingDefense.selectedBlockerUid === blockerUid ? null : blockerUid;
      render();
      return true;
    }
    if (actionId === "confirmGuard") return confirmDefenseShortcut();
    if (actionId === "letThrough") return resolveDefenseDecision(false);
  }

  if (aiThinking || (vsAI && game.active === 1)) return false;

  if (actionId === "cancelSelection") {
    selected = null;
    render();
    return true;
  }

  const summon = parseHintPositionAction(actionId, "summon");
  if (summon) {
    summonSelected(summon.lane, summon.slotIndex);
    return true;
  }

  if (actionId === "moveMode") return useMoveMode();

  const move = parseHintPositionAction(actionId, "move");
  if (move) return moveSelected(move.lane, move.slotIndex);

  if (actionId === "skill") {
    const loc = currentSelectedBoard(activePlayer());
    return loc ? useSkillFromLocation(loc) : false;
  }
  if (actionId === "attackPlayer") {
    const loc = currentSelectedBoard(activePlayer());
    return loc ? resolveDirectPlayerAttack(loc) : false;
  }
  if (actionId.startsWith("attackTarget:")) {
    const targetUid = actionId.split(":")[1] || "";
    const sourceLoc = currentSelectedBoard(activePlayer());
    const targetLoc = findCardLocation(targetUid);
    return sourceLoc && targetLoc ? resolveDirectCreatureAttack(sourceLoc, targetLoc) : false;
  }
  if (actionId === "recover") {
    recoverSelected();
    return true;
  }
  if (actionId === "sacrifice") {
    sacrificeSelected();
    return true;
  }
  return false;
}

function renderHintCard({ lead, body, steps = [], compact = false, aside = "", actions = [], mode = "" }) {
  if (!els.selectionHint) return;
  const openingMuted = shouldSpotlightOpeningPrimary(activePlayer(), currentPrimarySuggestion());
  const actionHtml = actions
    .filter((action) => action?.id && action?.label)
    .map((action) => `
      <button
        type="button"
        class="hint-action tone-${escapeHtml(action.tone || "support")}${action.detail ? " has-detail" : ""}"
        data-hint-action="${escapeHtml(action.id)}"
        title="${escapeHtml(action.title || "")}"
      >
        <span class="hint-action-main">${escapeHtml(action.label)}</span>
        ${action.detail ? `<span class="hint-action-detail">${escapeHtml(action.detail)}</span>` : ""}
      </button>
    `)
    .join("");
  const stepHtml = steps
    .filter(Boolean)
    .map((step, index) => `
      <div class="hint-step ${step.tone || ""}">
        <span class="hint-step-index">${index + 1}</span>
        <div class="hint-step-copy">
          <strong>${escapeHtml(step.title || "")}</strong>
          <span>${escapeHtml(step.detail || "")}</span>
        </div>
      </div>
    `)
    .join("");
  els.selectionHint.className = [
    "hint-box",
    compact ? "compact" : "",
    mode ? `is-${mode}` : "",
    openingMuted ? "is-opening-muted" : "",
  ].filter(Boolean).join(" ");
  els.selectionHint.innerHTML = `
    <div class="hint-lead">${escapeHtml(lead || "下一步")}</div>
    <div class="hint-body">${escapeHtml(body || "")}</div>
    ${actionHtml ? `<div class="hint-actions">${actionHtml}</div>` : ""}
    ${stepHtml ? `<div class="hint-steps">${stepHtml}</div>` : ""}
    ${aside ? `<div class="hint-aside">${escapeHtml(aside)}</div>` : ""}
  `;
  els.selectionHint.querySelectorAll("[data-hint-action]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.disabled) return;
      const actionId = button.dataset.hintAction;
      if (onlineMaybeSendAction({ kind: "hint", actionId })) return;
      const ok = runHintQuickAction(actionId);
      if (ok) onlineAfterHostAction("hint");
    });
  });
}

function manualPlanFromSuggestion(suggestion) {
  if (!suggestion) return null;
  const actor = cardNameFromUid(suggestion.cardUid, "这只生物");
  const target = cardNameFromUid(suggestion.targetUid, "目标");
  const laneText = suggestion.lane ? `${laneLabel(suggestion.lane)}第${Number(suggestion.slotIndex) + 1}格` : "";
  const sourceLoc = suggestion.cardUid ? findCardLocation(suggestion.cardUid) : null;
  const role = sourceLoc?.card ? inferCardRole(sourceLoc.card) : null;
  const skillName = sourceLoc?.card?.skill || "技能";
  const cue = activeOpeningCue(activePlayer());

  if (suggestion.kind === "summon") {
    const cueLead = cue?.id === "waterline"
      ? "先把水线抢下来"
      : cue?.id === "highground"
        ? "先把高位站住"
        : cue?.id === "landrush"
        ? "先把陆地铺开"
        : "现在最顺的一步";
    const roleTail = role ? `《${actor}》更像${role.label}，${role.blurb}` : "";
    const cueBody = cue?.id === "waterline"
      ? `先把《${actor}》落到水线，后面的回粮和埋伏都会顺很多。${roleTail}`
      : cue?.id === "highground"
        ? `先让《${actor}》占住高位，接下来的冲脸和压制会更自然。${roleTail}`
        : cue?.id === "landrush"
          ? `先把《${actor}》摆上陆地，这把更像靠正面压场去赢。${roleTail}`
          : roleTail || `先把《${actor}》摆上去，后面的打法会顺很多。`;
    return {
      lead: cueLead,
      body: cueBody,
      compact: true,
      steps: [
        hintStep(`点手牌里的《${actor}》`, "选中后，你这边能下的位置会发亮。", "current"),
        hintStep(`点 ${laneText}`, role ? `${role.label}放这里最顺，落下去就能开始站场。` : "这格现在最稳，落下去就能开始站场。"),
      ],
      aside: "也可以不走这条线，换一张手牌重新想。",
    };
  }
  if (suggestion.kind === "disaster") {
    return {
      lead: "环境牌值得赌一手",
      body: suggestion.note || "这张暗置环境牌现在值得赌一手。",
      compact: true,
      steps: [
        hintStep("抽暗置环境", "抽之前不知道是哪张，付费后会自动发动。", "current"),
        hintStep("看自动结算", "命中时会直接结算双方对应空间的倒下名单。"),
      ],
      aside: "炸完之后局面会立刻刷新，通常还能顺手追一手。",
    };
  }
  if (suggestion.kind === "skill") {
    return {
      lead: "现在适合整点绝活",
      body: suggestion.note || `《${actor}》这回合的技能已经开窗了。`,
      compact: true,
      steps: [
        hintStep(`先点你的《${actor}》`, "选中它后，技能按钮会变成具体名字。", "current"),
        hintStep(`再点“发动 ${skillName}”`, "食物够的话，这步会立刻结算效果。"),
      ],
      aside: "很多技能会顺手把任务或热度一起顶亮，记得看中间奖励区。",
    };
  }
  if (suggestion.kind === "attack_face") {
    return {
      lead: "现在能直接压血线",
      body: suggestion.note || `《${actor}》现在有机会直接打脸。`,
      compact: true,
      steps: [
        hintStep(`先点你的《${actor}》`, "确认是这只出手。", "current"),
        hintStep(`再点“${faceAttackActionLabel()}”`, "如果对面有能格挡的动物，会先进入防守选择。"),
      ],
      aside: "要是弹出防守提示，不用慌，按中间说明决定挡不挡就行。",
    };
  }
  if (suggestion.kind === "attack_creature") {
    return {
      lead: "现在先抢场面更值",
      body: suggestion.note || `《${actor}》现在最好先处理《${target}》。`,
      compact: true,
      steps: [
        hintStep(`先点你的《${actor}》`, "右边能打到的目标会亮起来。", "current"),
        hintStep(`再点右侧的《${target}》`, "这一下会直接走战斗结算。"),
      ],
      aside: "想稳一点就先看红色目标和费用，再决定要不要打出去。",
    };
  }
  if (suggestion.kind === "move_attack_face" || suggestion.kind === "move_attack_creature") {
    return {
      lead: "现在适合换线偷袭",
      body: suggestion.note || `《${actor}》先换到更好的线位，再立刻出手。`,
      compact: true,
      steps: [
        hintStep(`先点你的《${actor}》`, "它必须先被选中。", "current"),
        hintStep("再点“免费换线”", "然后把它挪到亮起来的新位置。"),
        hintStep(
          suggestion.kind === "move_attack_face" ? `最后点“${faceAttackActionLabel()}”` : `最后再点《${target}》`,
          suggestion.kind === "move_attack_face" ? "这步通常是换线后直接冲脸。" : "这步是换线后立刻咬目标。",
        ),
      ],
    };
  }
  if (suggestion.kind === "draw_private") {
    return {
      lead: cue?.id === "pocket" ? "先翻口袋找路线" : "先把家底摸厚一点",
      body: suggestion.note || (cue?.id === "pocket"
        ? "这手起手更像在等下一张，先补牌通常比硬上小身材更像样。"
        : "现在先补 1 张牌，后面可选动作会明显多起来。"),
      compact: true,
      steps: [
        hintStep("点“抽自己牌 -1”", "这回合先把选择面拉开。", "current"),
        hintStep("抽完再看新机会", "通常会立刻多出更明确的选择。"),
      ],
    };
  }
  if (suggestion.kind === "recover") {
    return {
      lead: "先把这只叫醒",
      body: suggestion.note || `《${actor}》现在更像先复工，再接后面的事。`,
      compact: true,
      steps: [
        hintStep(`先点你的《${actor}》`, "选中它后，复工按钮会亮。", "current"),
        hintStep("再点“复工 -1”", "花 1 食物让它回到战斗状态。"),
      ],
      aside: "复工完局面会立刻刷新，通常会继续围绕这只往下打。",
    };
  }
  if (suggestion.kind === "move") {
    return {
      lead: "先给它换个机位",
      body: suggestion.note || `《${actor}》现在更像先挪位，再看下一口从哪边出。`,
      compact: true,
      steps: [
        hintStep(`先点你的《${actor}》`, "它必须先被选中。", "current"),
        hintStep("再点“免费换线”", "亮起来的新位置就是它能跳过去的格子。"),
        hintStep("最后点发亮空格", "挪完之后，这回合的攻击角度通常会顺很多。"),
      ],
      aside: "这种手大多是在偷线路，挪完别忘了重新看右边能打谁。",
    };
  }
  if (suggestion.kind === "sacrifice") {
    return {
      lead: "这手偏黑色幽默",
      body: suggestion.note || `《${actor}》现在更像拿来当口粮，先把资源续上。`,
      compact: true,
      steps: [
        hintStep(`先点你的《${actor}》`, "确认是它离场。", "current"),
        hintStep("再点“当食物 +1”", "这步会让它退场，同时回 1 食物。"),
      ],
      aside: "通常只有断粮时才会这么演，但真缺口粮的时候这手很救命。",
    };
  }
  if (suggestion.kind === "end_turn") {
    return {
      lead: "这回合可以收一收",
      body: suggestion.note || "现在没有特别赚的动作，别硬点。",
      compact: true,
      steps: [
        hintStep("确认你真的不想再动", "手牌、技能、环境牌都可以再看一眼。", "current"),
        hintStep("点“结束回合”", "把资源留给下一轮通常更舒服。"),
      ],
    };
  }
  return null;
}

function renderHint() {
  if (pendingDiscard) {
    const player = game.players[pendingDiscard.playerId];
    renderHintCard({
      lead: "手牌满了",
      body: `${player?.name || "玩家"} 手牌超过 ${MAX_HAND_SIZE} 张。现在直接点下面一张手牌弃掉，之后继续当前回合。`,
      aside: "这次不会自动丢新牌，你可以自己决定保留哪张。",
      compact: true,
      mode: "decision",
    });
    return;
  }
  if (pendingDefense?.kind === "face") {
    const defender = defendingPlayer();
    const attackerLoc = attackerFromPendingDefense();
    const shortcut = faceDefenseShortcutState(attackerLoc, defender);
    const blockerLoc = selectedGuardBlocker() || shortcut?.blockerLoc || null;
    const leak = attackerLoc?.card ? faceGuardDamageLeak(attackerLoc.card) : 0;
    const attackValue = pendingDefense.attackValue || 0;
    const legalCount = shortcut?.legal?.length || 0;
    const body = blockerLoc?.card
      ? `《${attackerLoc?.card?.name || "生物"}》要直接冲 ${defender.name} ${attackValue} 血。现在就定：让《${blockerLoc.card.name}》接，还是直接掉血。`
      : `《${attackerLoc?.card?.name || "生物"}》这口会直接让 ${defender.name} 掉 ${attackValue} 血。`;
    const aside = blockerLoc?.card
      ? [
          !pendingDefense.selectedBlockerUid && legalCount > 1 ? "想换格挡动物，直接点桌上黄框。" : "",
          !pendingDefense.selectedBlockerUid && legalCount <= 1 ? "这只就是现在唯一能接这口的格挡动物。" : "",
          leak ? `这口会漏 ${leak} 血。` : "",
        ].filter(Boolean).join(" ")
      : "场上没人能接，只能直接结算这一下。";
    renderHintCard({
      lead: blockerLoc?.card ? "这口先决定挡不挡" : "这口只能硬吃",
      body,
      aside,
      actions: buildPendingDefenseHintActions(),
      mode: "decision",
    });
    return;
  }
  if (pendingDefense?.kind === "creature") {
    const attackerLoc = attackerFromPendingDefense();
    const targetLoc = defendingTargetCreature();
    const snapshot = creatureGuardSnapshot(attackerLoc, targetLoc);
    renderHintCard({
      lead: "这口先决定保不保",
      body: `《${attackerLoc?.card?.name || "生物"}》正在咬《${targetLoc?.card?.name || "生物"}》。保它要玩家掉 ${pendingDefense.attackValue} 血；不保的话${snapshot?.dies ? "它大概率会直接退场" : (snapshot?.rests ? "它多半会被按进休息" : "就按普通战斗结算")}。`,
      aside: attackerLoc?.card?.venomStrike ? "这口带毒，玩家承受打击会顺手把附带特技一起扛掉。" : "",
      actions: buildPendingDefenseHintActions(),
      mode: "decision",
    });
    return;
  }
  if (!selected) {
    if (vsAI && game.active === 1) {
      const watch = buildAIPreviewState(activePlayer());
      renderHintCard({
        lead: aiThinking ? "AI 正在行动" : "当前是 AI 回合",
        body: watch.detail || (aiThinking ? `${currentAIPersona().label} 正在盘算。` : "先看右边场面和日志，等它交完动作。"),
        compact: true,
        steps: watch.suggestion
          ? buildAIPreviewRouteSteps(activePlayer(), watch).slice(0, 2).map((step, index) => hintStep(
            step.title,
            step.detail,
            index === 0 ? "current" : step.tone,
          ))
          : [
              hintStep("看右侧场地", "它每出一手，右边和日志都会同步变化。", "current"),
              hintStep("轮到你时再接管", "你的按钮会恢复，手牌和场地会重新亮起来。"),
            ],
        aside: watch.suggestion
          ? "桌上的“它先 / 它去 / 它打”黄标，就是这回合最值得盯的几处。"
          : "如果它在准备环境牌、换线或冲脸，中间播报条会先替你说人话。",
      });
      return;
    }
    const guide = getTurnGuide();
    renderHintCard({
      lead: "自由行动",
      body: `${guide.note} 先看手牌、食物、亮格和对面站位，自己挑一条路线。`,
      compact: true,
      steps: [
        hintStep("读手牌", "可上的牌会写清楚食物和位置，缺粮或没空位也会直接标出来。", "current"),
        hintStep("看亮格", "绿色高亮能落子，红色高亮能攻击；没有好机会就抽牌或收手。"),
      ],
    });
    return;
  }

  const loc = currentSelectedLocation();
  if (!loc) {
    selected = null;
    renderHintCard({
      lead: "选择失效了",
      body: "这张牌刚刚已经不在原来的位置，重新点一下就好。",
      steps: [hintStep("重新选一张手牌或生物", "画面会马上把可操作的位置重新亮出来。", "current")],
    });
    return;
  }

  if (loc.type === "hand") {
    renderHintCard({
      lead: "正在落子",
      body: `已选《${loc.card.name}》。它能放到 ${placementText(loc.card)}，上场费 ${summonCost(loc.card)} 食物。`,
      actions: buildSelectedHandHintActions(activePlayer(), loc),
      steps: [
        hintStep("看你这边发亮的空格", "只有这些位置是它现在能去的地方。", "current"),
        hintStep("点一个空格完成上场", "落下去后，它会直接切换成场上单位。"),
        hintStep("不想下了也能撤回", "点“取消选择”就能换别的牌。"),
      ],
    });
    return;
  }

  if (loc.player.id === activePlayer().id) {
    const faceCost = faceAttackCost(loc.card, opponentPlayer());
    const moving = selected?.type === "board" && selected?.uid === loc.card.uid && selected?.mode === "move";
    const legalTargets = legalCreatureTargets(loc, opponentPlayer());
    if (moving) {
      renderHintCard({
        lead: "正在换线",
        body: `《${loc.card.name}》这拍先换位，亮起来的格子就是它现在能去的点。`,
        compact: true,
        actions: buildMovingHintActions(activePlayer(), loc),
        steps: [
          hintStep("先点亮起空格", "挪过去以后，新的攻击和技能路线会立刻刷新。", "current"),
          hintStep("不想换就取消", "这只是试跑线路，换个主意完全来得及。"),
        ],
      });
      return;
    }
    if (loc.card.state === "rest") {
      renderHintCard({
        lead: "这只在歇着",
        body: `《${loc.card.name}》现在不能打，花 1 食物能把它叫醒。`,
        compact: true,
        actions: buildSelectedBoardHintActions(activePlayer(), loc),
        steps: [
          hintStep("想继续用它就复工", "点“复工 -1”，醒来后这只才会重新开工。", "current"),
          hintStep("不值这个价就先换人", "别硬救，先让别的动物接活也很正常。"),
        ],
      });
      return;
    }
    if (!activeSkillReadyError(activePlayer(), loc.card)) {
      const faceReady = faceAttackReadyError(activePlayer(), loc.card, opponentPlayer()) === "" && availableTaunts(opponentPlayer(), loc.card).length === 0;
      renderHintCard({
        lead: "这只现在能整活",
        body: legalTargets.length
          ? `《${loc.card.name}》能放 ${loc.card.skill}，右边还有 ${legalTargets.length} 个能碰的目标。`
          : faceReady
            ? `《${loc.card.name}》能放 ${loc.card.skill}，而且这拍也能直接冲脸。`
            : `《${loc.card.name}》的 ${loc.card.skill} 已经开窗，现在更像先演一手。`,
        compact: true,
        actions: buildSelectedBoardHintActions(activePlayer(), loc),
        steps: [
          hintStep(`可以发动“${loc.card.skill}”`, skillPreview(loc.card.skill) || "这步会立刻结算技能效果。", "current"),
          hintStep(
            legalTargets.length
              ? "想开打也行"
              : faceReady
                ? "想压血线也行"
                : "想稳一点也行",
            legalTargets.length
              ? "直接去点右边亮起来的目标，卡面会写收掉 / 压休 / 毒翻。"
              : faceReady
                ? `点“${faceAttackActionLabel()}”，这拍就能直接上脸。`
                : "也可以先补牌、换线或把资源留给下一轮。",
          ),
        ],
        aside: "这只现在已经开麦了，别让它干站着。",
      });
      return;
    }
    renderHintCard({
      lead: "这只已经待命",
      body: legalTargets.length
        ? `《${loc.card.name}》已经站好位，右边亮了 ${legalTargets.length} 个能碰的目标。`
        : `《${loc.card.name}》已经站好位。想冲脸要 ${faceCost} 食物，想换线或开饭也都行。`,
      compact: true,
      actions: buildSelectedBoardHintActions(activePlayer(), loc),
      steps: [
        hintStep(
          legalTargets.length ? "想打就直接点目标" : `想冲脸就点“${faceAttackActionLabel()}”`,
          legalTargets.length
            ? "右边卡面会直接写收掉 / 压休 / 毒翻，不用自己算半天。"
            : "如果对面有格挡动物或嘲讽，系统会先把你拦下来。",
          "current",
        ),
        hintStep("想蓄一拍也行", "移动、当食物和取消选择都只会作用在这只身上。"),
      ],
      aside: "这只已经在场上了，接下来就是选它怎么出节目。",
    });
    return;
  }

  renderHintCard({
    lead: "你现在看到的是敌方目标",
    body: `《${loc.card.name}》是 ${loc.player.name} 的牌，先选你的生物才能打它。`,
    actions: [hintAction("cancelSelection", "取消选择")],
    steps: [
      hintStep("先回到你这边选一只生物", "被选中的己方牌会有更明显的外框。", "current"),
      hintStep(`再回来点《${loc.card.name}》`, "如果这只够得到它，就会直接走战斗。"),
    ],
  });
}

function placementText(card) {
  if (card.space === "天空") return "天空或陆地";
  if (card.space === "陆地") return "陆地";
  if (card.space === "水生") return "水生";
  if (card.space === "两栖") return "陆地或水生";
  return card.space;
}

function getTurnGuide() {
  if (!game) {
    return { mood: "准备开局", note: "点击新开一局后就可以开始搞事情。", phase: 0 };
  }
  if (game.winner !== null) {
    return { mood: "战报已定", note: "导出本局记录，再开一把。", phase: 2 };
  }
  if (pendingDefense?.kind === "face") {
    const defender = defendingPlayer();
    const attackerLoc = attackerFromPendingDefense();
    return {
      mood: "防守时刻",
      note: `${defender?.name || "防守方"} 现在可以决定：派一只生物挡下 ${attackerLoc?.card.name || "这次攻击"}，或者放行吃伤害。`,
      phase: 2,
    };
  }
  if (pendingDefense?.kind === "creature") {
    const defender = defendingPlayer();
    const targetLoc = defendingTargetCreature();
    return {
      mood: "保不保它？",
      note: `${defender?.name || "防守方"} 现在可以决定：自己掉血保住《${targetLoc?.card.name || "这只生物"}》，或者让它照常挨打。`,
      phase: 2,
    };
  }
  if (vsAI && game.active === 1) {
    const beat = buildAIDirectorBeat(activePlayer());
    return {
      mood: aiThinking ? beat.title : "AI 回合",
      note: beat.detail,
      phase: beat.phase ?? 2,
    };
  }

  const player = activePlayer();
  const ownBoard = boardCards(player);
  const selectedLoc = currentSelectedLocation();
  const disaster = currentTurnDisaster(player);
  const disasterPlan = disasterVictimPlan(player, disaster);
  const disasterSuggestion = findBestDisasterSuggestion(player);
  const summonable = player.hand.some((card) => emptySlotsFor(player, card).length > 0);
  const movableBoard = ownBoard.some((loc) => moveReadyError(player, loc) === "");
  const readyToFace = ownBoard.some((loc) => faceAttackReadyError(player, loc.card, opponentPlayer()) === "");
  const readyToTrade = ownBoard.some((loc) => attackReadyError(player, loc.card, attackSpendCost(player, loc.card), "攻击") === "");

  if (!selectedLoc) {
    if (disasterSuggestion) {
      return {
        mood: "环境牌突然值得赌",
        note: "当前场面有环境命中窗口，点中间“抽环境”会付费抽暗牌并自动发动。",
        phase: 2,
      };
    }
    if (ownBoard.some((loc) => !activeSkillReadyError(player, loc.card))) {
      return { mood: "你有牌在憋大招", note: "先选场上的生物，再点“发动技能”按钮。", phase: 1 };
    }
    const cueGuide = openingCueGuide(player, ownBoard);
    if (cueGuide) return cueGuide;
    if (!ownBoard.length && player.hand.length) {
      return { mood: "先把第一只动物叫上场", note: "点一张手牌，再点你的空格。", phase: 1 };
    }
    if (movableBoard) {
      return { mood: "有人想偷偷换线", note: "先选一只天空或两栖生物，再点“免费换线”。", phase: 1 };
    }
    if (summonable) {
      return { mood: "继续摆阵", note: "绿色高亮的空格就是能落子的地方。", phase: 1 };
    }
    if (readyToFace || readyToTrade) {
      return { mood: "可以开打了", note: "先选一只生物，再去点对面目标。", phase: 2 };
    }
    if (player.food >= 3 && player.deck.length) {
      return { mood: "手里还能再攒点", note: "先抽牌，补一点家底。", phase: 0 };
    }
    return { mood: "稳一手也行", note: "没有好动作时，结束回合就可以。", phase: 2 };
  }

  if (selectedLoc.type === "hand") {
    return {
      mood: `把《${selectedLoc.card.name}》放上桌`,
      note: `可放位置：${placementText(selectedLoc.card)}。亮起的空格就是能去的地方。`,
      phase: 1,
    };
  }

  if (selectedLoc.player.id === player.id) {
    if (selected?.type === "board" && selected?.uid === selectedLoc.card.uid && selected?.mode === "move") {
      return {
        mood: `《${selectedLoc.card.name}》准备换线`,
        note: "亮起来的空格就是它现在能跳过去的位置。",
        phase: 1,
      };
    }
    const legalTargets = legalCreatureTargets(selectedLoc, opponentPlayer());
    if (!activeSkillReadyError(player, selectedLoc.card)) {
      return {
        mood: `《${selectedLoc.card.name}》准备整活`,
        note: `${selectedLoc.card.skill}：${skillPreview(selectedLoc.card.skill)}`,
        phase: 1,
      };
    }
    if (legalTargets.length) {
      return {
        mood: `盯上了《${selectedLoc.card.name}》`,
        note: "对面亮起的目标可以直接点，先抢场面通常更划算。",
        phase: 2,
      };
    }
    if (selectedLoc.card.state === "rest") {
      return {
        mood: "这只在休息",
        note: "花 1 食物可以把它叫回战斗状态。",
        phase: 1,
      };
    }
    if (readyToFace) {
      return {
        mood: "可以直冲玩家",
        note: "打脸时如果对手场上有人，会额外多耗 1 食物。",
        phase: 2,
      };
    }
    return {
      mood: "换个选手试试",
      note: "这只暂时不适合出手，或者先换别的动物。 ",
      phase: 0,
    };
  }

  return {
    mood: `看上了《${selectedLoc.card.name}》`,
    note: "先选你的生物，再点它。敌方目标会亮出来。",
    phase: 2,
  };
}

function routeToneFromHintTone(tone = "", fallback = "support") {
  if (tone === "urgent" || tone === "danger") return "warning";
  if (tone === "current") return fallback || "support";
  return tone || fallback || "support";
}

function routePayoffSummary(chips = [], limit = 2) {
  return (chips || [])
    .map((chip) => chip?.label || "")
    .filter(Boolean)
    .slice(0, limit)
    .join(" · ");
}

function routeStepKicker(index, kind = "action") {
  if (kind === "payoff") return "做完赚";
  if (index === 0) return "就现在";
  if (index === 1) return "再一下";
  return "收尾";
}

function buildSelectedRouteStatusStep(player, suggestion) {
  const loc = currentSelectedLocation();
  if (!player || !suggestion || !loc || loc.player?.id !== player.id) return null;
  if (suggestion.kind === "summon" && loc.type === "hand" && loc.card.uid === suggestion.cardUid) {
    return {
      title: `《${loc.card.name}》已经选好`,
      detail: `直接点 ${slotLabelText(suggestion.lane, suggestion.slotIndex)} 就能落子。`,
      tone: "current",
    };
  }
  if (loc.type !== "board" || loc.card.uid !== suggestion.cardUid) return null;
  if (suggestion.kind === "skill") {
    return {
      title: `《${loc.card.name}》已经待命`,
      detail: `直接点“发动 ${loc.card.skill || "绝活"}”就会结算。`,
      tone: "current",
    };
  }
  if (suggestion.kind === "attack_face") {
    return {
      title: `《${loc.card.name}》已经锁定`,
      detail: `直接点“${faceAttackActionLabel()}”就能压血线。`,
      tone: "current",
    };
  }
  if (suggestion.kind === "attack_creature") {
    return {
      title: `《${loc.card.name}》已经锁定`,
      detail: "右侧亮起来的目标现在都能直接点。",
      tone: "current",
    };
  }
  if (suggestion.kind === "move_attack_face" || suggestion.kind === "move_attack_creature" || suggestion.kind === "move") {
    return {
      title: `《${loc.card.name}》已经锁定`,
      detail: "先点“免费换线”，亮起的新位置就是这步入口。",
      tone: "current",
    };
  }
  if (suggestion.kind === "recover") {
    return {
      title: `《${loc.card.name}》已经锁定`,
      detail: "直接点“复工 -1”就能把它叫回战斗状态。",
      tone: "current",
    };
  }
  if (suggestion.kind === "sacrifice") {
    return {
      title: `《${loc.card.name}》已经锁定`,
      detail: "直接点“当食物 +1”就会把它换成口粮。",
      tone: "current",
    };
  }
  return null;
}

function buildRouteStripState() {
  const guide = getTurnGuide();
  if (!game) {
    return {
      mood: guide.mood,
      steps: [
        { kicker: "先开局", title: "点“新开一局”", detail: "发完牌后，手牌、场地和按钮都会亮出可执行动作。", tone: "support", active: true },
        { kicker: "认高亮", title: "看绿色和红色", detail: "绿色能下或能动，红色就是能打到的地方。", tone: "support" },
        { kicker: "先试手", title: "看亮格起第一拍", detail: "绿色能下或能动，红色能打，费用会写在按钮上。", tone: "reward" },
      ],
    };
  }

  if (pendingDefense?.kind === "face") {
    const defense = buildPendingDefenseState();
    const blocker = defense?.blockerLoc;
    return {
      mood: guide.mood,
      steps: blocker?.card
        ? [
            {
              kicker: "这口",
              title: "动物格挡或玩家承受",
              detail: `动物格挡会让《${blocker.card.name}》承受攻击；玩家承受打击会直接 -${defense?.attackValue || 0}。`,
              tone: "warning",
              active: true,
            },
            {
              kicker: defense?.canSwapBlocker ? "黄框" : "补充",
              title: defense?.canSwapBlocker ? "想换动物就点桌上黄框" : `《${blocker.card.name}》能格挡这口`,
              detail: defense?.canSwapBlocker ? "桌上发黄标的己方动物，都能临时换来格挡这一下。" : (defense?.leak ? `就算格挡，也还会漏 ${defense.leak} 血。` : "格挡完这下，镜头就会回到主回合。"),
              tone: "support",
            },
            {
              kicker: "结完",
              title: "这里只结这一口",
              detail: defense?.leak ? `挡住也会漏 ${defense.leak} 血。` : "算完这下，主回合按钮会自己回来。",
              tone: "reward",
            },
          ]
        : [
            { kicker: "这口", title: `没人能接，只剩玩家 -${defense?.attackValue || 0}`, detail: "这次没有格挡动物，别的组先都不用管。", tone: "warning", active: true },
            { kicker: "就现在", title: "点“玩家承受打击”结算", detail: "这里只剩直接结算伤害这一种处理。", tone: "attack" },
            { kicker: "结完", title: "这下算完就回主回合", detail: "不用多想别的流程，处理完这一口就继续。", tone: "reward" },
          ],
    };
  }

  if (pendingDefense?.kind === "creature") {
    const defense = buildPendingDefenseState();
    return {
      mood: guide.mood,
      steps: [
        { kicker: "这口", title: `《${defense?.targetName || "它"}》值不值 ${defense?.attackValue || 0} 血`, detail: "玩家承受打击保动物；让动物承受伤害则按普通战斗结算。", tone: "warning", active: true },
        { kicker: "保住它", title: `玩家 -${defense?.attackValue || 0} 保《${defense?.targetName || "它"}》`, detail: defense?.venom ? "玩家承受会顺手把这口附带特技也一起扛掉。" : "这只会留在场上，继续等你下回合使唤。", tone: "support" },
        { kicker: "让它挨", title: defense?.snapshot?.dies ? `动物承受后《${defense?.targetName || "它"}》退场` : (defense?.snapshot?.rests ? `动物承受后《${defense?.targetName || "它"}》休息` : "让动物按普通战斗结算"), detail: "这下打完，镜头就会自己回主回合。", tone: "attack" },
      ],
    };
  }

  if (vsAI && game.active === 1) {
    const beat = buildAIDirectorBeat(activePlayer());
    const watch = beat.previewWatch || buildAIPreviewState(activePlayer(), beat.previewSuggestion);
    return {
      mood: guide.mood,
      steps: buildAIPreviewRouteSteps(activePlayer(), watch),
    };
  }

  const player = activePlayer();
  const suggestions = buildPlaybookSuggestions();
  const suggestion = suggestions[0] || null;
  if (!suggestion) {
    return {
      mood: guide.mood,
      steps: [
        { kicker: "先扫一眼", title: "看手牌和场面", detail: "这回合没有唯一标准答案，先看看哪条线最顺。", tone: "support", active: true },
        { kicker: "没赚头也行", title: "抽牌或补场都合理", detail: "有时候先把选择面拉开，比硬点一手更舒服。", tone: "support" },
        { kicker: "真没事做", title: "结束回合也不丢人", detail: "留资源给下一轮，通常比空转更像样。", tone: "reward" },
      ],
    };
  }

  const plan = manualPlanFromSuggestion(suggestion);
  const payoffSummary = routePayoffSummary(buildSuggestionPayoffChips(player, suggestion));
  const selectionStatus = buildSelectedRouteStatusStep(player, suggestion);
  const rawSteps = plan?.steps?.map((step) => ({ ...step })) || [];
  const actionSteps = selectionStatus ? [selectionStatus, ...rawSteps.slice(1)] : rawSteps;
  const steps = actionSteps.slice(0, 3).map((step, index, list) => {
    const routeTone = routeToneFromHintTone(step.tone, index === 0 ? actionCueToneForSuggestion(suggestion) : "support");
    let detail = step.detail || "";
    if (payoffSummary && list.length >= 3 && index === list.length - 1) {
      detail = `${detail}${detail ? " " : ""}收益：${payoffSummary}。`;
    }
    return {
      kicker: routeStepKicker(index),
      title: step.title || "",
      detail,
      tone: routeTone,
      active: index === 0,
      hypeCall: suggestion.ribbon === "冲奖" && index === list.length - 1,
    };
  });

  if (steps.length < 3) {
    steps.push({
      kicker: routeStepKicker(steps.length, "payoff"),
      title: payoffSummary || "做完再看下一拍",
      detail: payoffSummary
        ? "结完这一口后，下一步会立刻换成新的可选动作。"
        : "这手走完之后，桌面会重新亮出后续选择。",
      tone: suggestion.ribbon === "任务线" || suggestion.ribbon === "冲奖" ? "reward" : actionCueToneForSuggestion(suggestion),
      active: steps.length === 0,
      hypeCall: suggestion.ribbon === "冲奖",
    });
  }

  while (steps.length < 3) {
    steps.push({
      kicker: routeStepKicker(steps.length, "payoff"),
      title: "做完再看下一拍",
      detail: "这条只负责把你送进下一拍，不会替你自动把整回合演完。",
      tone: "support",
    });
  }

  return { mood: guide.mood, steps: steps.slice(0, 3) };
}

function renderRouteStrip() {
  const state = buildRouteStripState();
  els.turnMood.textContent = state.mood;
  els.routeStrip.innerHTML = "";
  (state.steps || []).forEach((step, index) => {
    const item = document.createElement("div");
    item.className = "route-step";
    if (step.active) item.classList.add("active");
    if (step.hypeCall) item.classList.add("hype-call");
    if (step.tone) item.classList.add(`tone-${step.tone}`);
    item.innerHTML = `
      <span class="route-step-kicker">${escapeHtml(step.kicker || `${index + 1}`)}</span>
      <strong>${escapeHtml(step.title || "")}</strong>
      <span class="route-step-detail">${escapeHtml(step.detail || "")}</span>
    `;
    els.routeStrip.appendChild(item);
  });
}

function buildFallbackAnnouncer() {
  const guide = getTurnGuide();
  const selectedLoc = currentSelectedLocation();
  if (pendingDefense?.kind === "face") {
    const defense = buildPendingDefenseState();
    return {
      tone: "danger",
      label: "防守时刻",
      title: defense?.blockerLoc?.card ? "这一口先决定是否格挡" : "这口只能玩家承受",
      detail: defense?.blockerLoc?.card
        ? defense.canSwapBlocker
          ? "可以动物格挡，也可以玩家承受打击；想换格挡动物就点黄框。"
          : `动物格挡会让《${defense.blockerLoc.card.name}》承受攻击；玩家承受打击则生命 -${defense.attackValue}。`
        : `这口没有动物能格挡，只会玩家 -${defense?.attackValue || 0}。`,
    };
  }
  if (pendingDefense?.kind === "creature") {
    const defense = buildPendingDefenseState();
    return {
      tone: "danger",
      label: "保命选择",
      title: `先判《${defense?.targetName || "它"}》值不值 ${defense?.attackValue || 0} 血`,
      detail: defense?.venom
        ? "玩家承受打击会顺手扛掉这口附带特技。"
        : `玩家承受打击会让玩家 -${defense?.attackValue || 0} 并保住动物；让动物承受伤害会按普通战斗结算。`,
    };
  }
  if (vsAI && game.active === 1) {
    const beat = buildAIDirectorBeat(activePlayer());
    return {
      tone: beat.tone || "ai",
      label: beat.badge || "AI 上麦",
      title: beat.title || `${currentAIPersona().label} 正在搞事`,
      detail: beat.detail || summarizeAIPersonaTurn(activePlayer()),
    };
  }
  if (selectedLoc?.type === "hand") {
    return {
      tone: "turn",
      label: "正在落子",
      title: `把《${selectedLoc.card.name}》放上桌`,
      detail: `亮起来的空格就是它现在能落的位置。`,
    };
  }
  if (selectedLoc?.type === "board" && selectedLoc.player.id === activePlayer().id) {
    if (selected?.mode === "move") {
      return {
        tone: "ai",
        label: "换线中",
        title: `《${selectedLoc.card.name}》准备调位`,
        detail: "点发亮的新空格完成移动。",
      };
    }
    if (!activeSkillReadyError(activePlayer(), selectedLoc.card)) {
      return {
        tone: "hot",
        label: "绝活窗口",
        title: `《${selectedLoc.card.name}》可以整活`,
        detail: skillPreview(selectedLoc.card.skill) || guide.note,
      };
    }
  }
  const suggestion = buildPlaybookSuggestions()[0];
  const plan = manualPlanFromSuggestion(suggestion);
  if (plan) {
    const openingRoute = !selectedLoc && isOpeningFastTrackMoment(activePlayer(), suggestion)
      ? openingFastTrackRoute(suggestion)
      : "";
    return {
      tone: suggestion?.ribbon === "任务线" ? "quest" : suggestion?.ribbon === "冲奖" ? "hot" : "neutral",
      label: suggestion?.ribbon || "场边提示",
      title: openingRoute ? "第一把先照着点" : plan.lead,
      detail: openingRoute ? `照这个顺序：${openingRoute}。` : plan.body,
    };
  }
  return {
    tone: "turn",
    label: "回合提示",
    title: guide.mood,
    detail: guide.note,
  };
}

function buildCoachAside(current) {
  if (!game) return "";
  const player = activePlayer();
  const cue = activeOpeningCue(player);
  const suggestion = currentPrimarySuggestion();
  const quest = currentTurnQuest(player);
  const hypeMoment = currentHypeMoment(player, suggestion);
  const hype = hypeMoment?.current || currentTurnHype(player);

  if (pendingDefense?.kind === "face") {
    return flavorPick([
      "台下已经开始喊：这口脸到底值不值得你挡。",
      "主持人提醒：这一挡，通常比表面上更有戏。",
    ], 3);
  }
  if (pendingDefense?.kind === "creature") {
    return flavorPick([
      "观众席正在投票：这只到底值不值你的血。",
      "导播耳返：舍不得它的话，现在就得咬牙。",
    ], 4);
  }
  if (vsAI && game.active === 1) {
    const beat = buildAIDirectorBeat(activePlayer());
    return beat.tell || flavorPick([
      `台下押注：${beat.badge || currentAIPersona().label} 多半是真的。`,
      `观众席在碎嘴：${beat.title || "先看它闹"}，别急着替它思考人生。`,
    ], 5);
  }
  if (hype >= HYPE_THRESHOLDS[1]) {
    return flavorPick([
      "台下已经拍桌：继续离谱，别突然开始讲道理。",
      "主持人提醒：你现在做的已经不只是动作，是节目。",
    ], 6);
  }
  if (hypeMoment?.crosses) {
    return flavorPick([
      `再来这一手，台下就会把“${hypeMoment.reward?.label || "奖励"}”扔上台。`,
      "观众已经开始数拍子了，现在停手会显得很没有节目精神。",
    ], 17);
  }
  if (hypeMoment?.near) {
    return flavorPick([
      `差 ${hypeMoment.remaining} 点热度，台下已经有人站起来了。`,
      "主持人提醒：这种差一口气的时候，最适合顺手再闹一下。",
    ], 18);
  }
  if (suggestion?.ribbon === "任务线") {
    return flavorPick([
      `场边提示：这手做完就能拿 ${quest?.rewardLabel || "奖励"}。`,
      "旁边已经有人在催：先把奖领了，再研究优雅。",
    ], 7);
  }
  if (suggestion?.ribbon === "冲奖") {
    return flavorPick([
      "台下已经准备扔奖励了，就差你再闹一下。",
      "主持人提醒：热度差一点点的时候，最容易上头。",
    ], 8);
  }
  if (cue?.id === "waterline") {
    return flavorPick([
      "场边提示：这把先吃住水位，后面食物和埋伏都会自然很多。",
      "台下已经默认你要先把水线立起来了，别让他们白等。",
    ], 19);
  }
  if (cue?.id === "highground") {
    return flavorPick([
      "主持人提醒：高位一旦先站住，很多邪门路线都会自己长出来。",
      "场边提示：这把像是先抢视野，再看谁先心虚。",
    ], 20);
  }
  if (cue?.id === "landrush") {
    return flavorPick([
      "台下建议：先把地面人数铺起来，这把更像硬压过去。",
      "主持人提醒：陆地一旦站稳，后面换招也会显得特别像早有预谋。",
    ], 21);
  }
  if (cue?.id === "pocket") {
    return flavorPick([
      "场边提示：这手先翻口袋，不用急着拿小身材硬撑场面。",
      "观众席在小声提醒：很多好戏，都是先摸到那一张才开始的。",
    ], 22);
  }
  if (suggestion?.kind === "summon") {
    return flavorPick([
      "台下建议：先把第一只请上台，牌桌才会热起来。",
      "别捏着不下，动物在手里待久了也会尴尬。",
    ], 9);
  }
  if (suggestion?.kind === "disaster") {
    return flavorPick([
      "环境牌这种东西，通常是抽出来以后才显得自己很有想法。",
      "主持人友情提示：这一炸多半不亏，亏的是气氛。",
    ], 10);
  }
  if (suggestion?.kind === "skill") {
    return flavorPick([
      "这手绝活一开，空气一般会立刻复杂起来。",
      "台下已经把“来点邪门的”四个字写在脸上了。",
    ], 11);
  }
  if (suggestion?.kind === "attack_face") {
    return flavorPick([
      "观众最爱看的，通常就是有人突然开始冲脸。",
      "主持人提醒：血线一旦松动，大家都会开始不讲武德。",
    ], 12);
  }
  if (suggestion?.kind === "attack_creature" || suggestion?.kind === "move_attack_creature") {
    return flavorPick([
      "先清场这件事看起来职业，实际上也很容易上头。",
      "别小看这口压制，它经常是一连串怪事的开头。",
    ], 13);
  }
  if (suggestion?.kind === "draw_private") {
    return flavorPick([
      "翻翻口袋，灵感经常就躲在下一张。",
      "台下友情提醒：很多离谱操作，一开始都长得像补牌。",
    ], 14);
  }
  if (selected?.type === "hand") {
    return flavorPick([
      "亮起来的格子就是舞台，别让它久等。",
      "观众已经默认你是要把这只放下来了。",
    ], 15);
  }
  return flavorPick([
    "可选动作只是参考，怪招常常更有故事。",
    "这游戏对离谱操作一直挺宽容，你可以大胆一点。",
  ], 16);
}

function renderAnnouncer() {
  if (!els.coachNote || !els.coachTag || !els.coachTitle || !els.coachDetail) return;
  const current = announcerState && announcerState.turn === game?.turn && announcerState.active === game?.active
    ? announcerState
    : buildFallbackAnnouncer();
  els.coachNote.className = `coach-note tone-${current.tone || "neutral"}`;
  els.coachTag.textContent = current.label || "场边播报";
  els.coachTitle.textContent = current.title || "";
  els.coachDetail.textContent = current.detail || "";
  if (els.coachAside) els.coachAside.textContent = buildCoachAside(current);
}

function reactionToneForAction(action = "") {
  if (action === "winner" || action === "quest_complete" || action === "hype_reward") return "reward";
  if (action === "attack_face" || action === "attack_face_guard" || action === "attack_face_guard_unstoppable" || action === "attack_creature_kill" || action === "attack_creature_pressure_kill" || action === "attack_creature_injure" || action === "attack_creature_venom" || action === "attack_creature_player_guard" || action === "kill_passive") return "attack";
  if (action === "disaster_cast" || action === "move" || action === "guard_prompt" || action === "creature_guard_prompt" || typeof action === "string" && action.startsWith("skill")) return "trick";
  if (action === "end_turn") return "turn";
  return "support";
}

function finishReactionLine(text = "") {
  const line = String(text || "").trim();
  if (!line) return "";
  return /[。！？.!?]$/.test(line) ? line : `${line}。`;
}

function followUpActionLabel(suggestion, player = activePlayer()) {
  if (!suggestion) return "";
  const actor = cardNameFromUid(suggestion.cardUid, "这只");
  const target = cardNameFromUid(suggestion.targetUid, "目标");
  const disaster = player ? currentTurnDisaster(player) : null;
  const skill = findCardLocation(suggestion.cardUid)?.card?.skill || "绝活";

  if (suggestion.kind === "summon") return `上《${actor}》`;
  if (suggestion.kind === "draw_private") return "翻口袋";
  if (suggestion.kind === "draw_public_A") return "摸 A 池";
  if (suggestion.kind === "draw_public_B") return "摸 B 池";
  if (suggestion.kind === "draw_public_C") return "摸 C 池";
  if (suggestion.kind === "disaster") return "抽环境牌";
  if (suggestion.kind === "skill") return `让《${actor}》开 ${skill}`;
  if (suggestion.kind === "attack_face") return `让《${actor}》冲脸`;
  if (suggestion.kind === "attack_creature") return `让《${actor}》打《${target}》`;
  if (suggestion.kind === "move_attack_face" || suggestion.kind === "move_attack_creature") return suggestion.label ? `走“${suggestion.label}”` : "先换线再动手";
  if (suggestion.kind === "move") return `让《${actor}》换线`;
  if (suggestion.kind === "recover") return `叫醒《${actor}》`;
  if (suggestion.kind === "sacrifice") return `把《${actor}》开饭`;
  if (suggestion.kind === "defense_block") return `让《${cardNameFromUid(suggestion.blockerUid, "它")}》格挡`;
  if (suggestion.kind === "defense_pass") return "这口先吃了";
  if (suggestion.kind === "creature_guard") return `玩家承受打击保《${target}》`;
  if (suggestion.kind === "creature_pass") return "让动物承受伤害";
  if (suggestion.kind === "end_turn") return "先收手";
  return suggestion.label || "";
}

function endTurnNextActionLabel(suggestion, player = activePlayer()) {
  if (!suggestion) return "";
  const actor = cardNameFromUid(suggestion.cardUid, "这只");
  const target = cardNameFromUid(suggestion.targetUid, "目标");
  const disaster = player ? currentTurnDisaster(player) : null;

  if (suggestion.kind === "summon") return `上《${actor}》`;
  if (suggestion.kind === "draw_private") return "摸 1 张";
  if (suggestion.kind === "draw_public_A") return "摸 A 池";
  if (suggestion.kind === "draw_public_B") return "摸 B 池";
  if (suggestion.kind === "draw_public_C") return "摸 C 池";
  if (suggestion.kind === "disaster") return "抽环境牌";
  if (suggestion.kind === "skill") return `《${actor}》开绝活`;
  if (suggestion.kind === "attack_face") return `《${actor}》冲脸`;
  if (suggestion.kind === "attack_creature") return `《${actor}》打《${target}》`;
  if (suggestion.kind === "move_attack_face" || suggestion.kind === "move_attack_creature") return `《${actor}》绕后`;
  if (suggestion.kind === "move") return `《${actor}》换线`;
  if (suggestion.kind === "recover") return `叫醒《${actor}》`;
  if (suggestion.kind === "sacrifice") return `《${actor}》开饭`;
  if (suggestion.kind === "defense_block") return `《${cardNameFromUid(suggestion.blockerUid, "它")}》格挡`;
  if (suggestion.kind === "defense_pass") return "这口先吃了";
  if (suggestion.kind === "creature_guard") return `玩家承受打击保《${target}》`;
  if (suggestion.kind === "creature_pass") return "让动物承受伤害";
  if (suggestion.kind === "end_turn") return "收手";
  return suggestion.label || "";
}

function buildSpotlightFollowUpCue(event, player = activePlayer()) {
  if (!game || game.winner !== null) return null;

  if (pendingDefense?.kind === "face" || pendingDefense?.kind === "creature") {
    return {
      label: "下一口",
      tone: pendingDefense.kind === "face" ? "attack" : "support",
      detail: finishReactionLine(pendingDefenseGuideShortcut()),
    };
  }

  if (vsAI && game.active === 1) {
    const aiPlayer = player || activePlayer();
    const beat = buildAIDirectorBeat(aiPlayer);
    return {
      label: "下一拍",
      tone: beat.tone === "hot" ? "reward" : (beat.tone || "trick"),
      detail: finishReactionLine(`先看 ${aiPlayer?.name || "AI"} 怎么演，${beat.tell || beat.previewWatch?.detail || beat.detail || "等它交完动作再接管"}`),
    };
  }

  if (!player) return null;
  const suggestion = currentPrimarySuggestion();
  const route = followUpActionLabel(suggestion, player);
  const moment = currentHypeMoment(player, suggestion);
  const latestReward = (player?.turnHypeRewards || []).slice(-1)[0] || null;
  const nextReward = latestReward
    ? nextHypeRewardState(player, {
        afterThreshold: latestReward.threshold || 0,
        current: moment?.current || currentTurnHype(player),
      })
    : null;
  const scoreSummary = buildShowtimeScoreSummary(player);
  const nextRank = nextShowtimeRankState(scoreSummary.score || 0);
  const scoreGain = suggestion ? suggestionShowtimeGain(player, suggestion) : 0;
  const crossesRank = !!nextRank && (scoreSummary.score || 0) + Math.max(0, scoreGain) >= nextRank.min;
  const previewEvents = suggestion ? previewSuggestionEvents(player, suggestion) : [];
  const quest = suggestion ? previewQuestCompletionForEvents(player, previewEvents) : null;
  const cues = suggestion
    ? buildSuggestionExcitementCues(player, suggestion, {
        limit: 2,
        includeFallbackHype: false,
      })
    : [];
  const enemy = opponentPlayer();
  const enemyBoardCount = enemy ? boardCards(enemy).length : 0;

  let label = "下一口";
  let tone = suggestion ? actionCueToneForSuggestion(suggestion) : "support";
  let detail = "";

  if (latestReward && nextReward && !moment?.maxed) {
    label = "续杯线";
    tone = "reward";
    detail = `再闹 ${nextReward.remaining} 点，就轮到“${nextReward.reward?.label || "下一份奖励"}”`;
  } else if (suggestion?.kind === "end_turn") {
    detail = "这段先收在这里也不亏，下一回合再开新的";
  } else if ((event?.action === "attack_creature_kill" || event?.action === "attack_creature_pressure_kill") && enemyBoardCount === 0 && route && ["attack_face", "move_attack_face"].includes(suggestion?.kind)) {
    label = "压血窗口";
    tone = "attack";
    detail = `这下前排已经空了，接着 ${route} 通常最痛`;
  } else if (route && quest && moment?.crosses && !moment?.maxed) {
    label = "续杯线";
    tone = "reward";
    detail = `接着 ${route}，顺手领 ${shortQuestReward(quest)}，还会掉“${moment.reward?.label || "喝彩奖励"}”`;
  } else if (route && moment?.crosses && crossesRank && !moment?.maxed) {
    label = "续杯线";
    tone = "reward";
    detail = `接着 ${route}，这口边冲“${nextRank?.label || "下一档"}”边掉“${moment.reward?.label || "喝彩奖励"}”`;
  } else if (route && quest) {
    label = "顺手领奖";
    tone = "reward";
    detail = `接着 ${route}，顺手领 ${shortQuestReward(quest)}`;
  } else if (route && moment?.crosses && !moment?.maxed) {
    label = "掉落线";
    tone = "reward";
    detail = `接着 ${route}，这口就会掉“${moment.reward?.label || "喝彩奖励"}”`;
  } else if (route && crossesRank) {
    label = "节目档";
    tone = nextRank?.tone || tone;
    detail = `接着 ${route}，节目分再补一口就升到“${nextRank?.label || "下一档"}”`;
  } else if (route && moment?.near && !moment?.maxed) {
    label = "掉落线";
    tone = "reward";
    detail = `接着 ${route}，再闹 ${moment.remaining} 点就掉“${moment.reward?.label || "喝彩奖励"}”`;
  } else if (route && cues[0]) {
    tone = cues[0].tone || tone;
    detail = `接着 ${route}，${excitementCueSentence(cues[0])}`;
  } else if (route) {
    detail = `下一口最像 ${route}`;
  } else if (moment?.near && !moment?.maxed) {
    label = "掉落线";
    tone = "reward";
    detail = `再闹 ${moment.remaining} 点就掉“${moment.reward?.label || "喝彩奖励"}”`;
  } else if ((scoreSummary.score || 0) >= 44 && nextRank) {
    label = "节目档";
    tone = nextRank.tone || tone;
    detail = "节目味已经起来了，再补一口更像完整一段";
  }

  if (!detail) return null;
  return {
    label,
    tone,
    detail: finishReactionLine(detail),
  };
}

function currentFreshActionStingerEvent() {
  if (!game) return null;
  const latest = [...game.history].reverse().find((event) => isSpotlightAction(event.action) && !["match_start", "end_turn", "guard_prompt", "creature_guard_prompt"].includes(event.action)) || null;
  if (!latest || latest.step !== game.step || latest.step <= 0) return null;
  return buildActionStingerFromEvent(latest) ? latest : null;
}

function endTurnConfirmKey() {
  if (!game) return "";
  const suggestion = currentPrimarySuggestion();
  return [
    game.matchId || "",
    game.turn,
    game.active,
    game.step,
    suggestion?.key || suggestion?.kind || "free",
  ].join(":");
}

function shouldConfirmEndTurn(state = buildEndTurnButtonState()) {
  if (!game || pendingDefense || game.winner !== null || (vsAI && game.active === 1)) return false;
  return state?.stateClass === "is-caution";
}

function remainingMajorActionSummary(player = activePlayer()) {
  if (!game || !player) return null;
  const enemy = game.players[player.id === 0 ? 1 : 0];
  const attackSources = boardCards(player).filter((loc) => {
    if (!loc?.card) return false;
    if (canFaceAttackNow(player, loc.card, enemy)) return true;
    return legalCreatureTargets(loc, enemy).length > 0;
  });
  const skillSources = boardCards(player).filter((loc) => !activeSkillReadyError(player, loc.card));
  const recoverSources = boardCards(player).filter((loc) => !recoverReadyError(player, loc));
  const summonables = player.hand.filter((card) => player.food >= summonCost(card) && emptySlotsFor(player, card).length);
  const pieces = [];
  if (attackSources.length) pieces.push(`${attackSources.length} 只动物还能攻击`);
  if (skillSources.length) pieces.push(`${skillSources.length} 个主动技能可用`);
  if (summonables.length) pieces.push(`${summonables.length} 张手牌能上场`);
  if (recoverSources.length) pieces.push(`${recoverSources.length} 只动物能复工`);
  if (!pieces.length) return null;
  return {
    attackSources,
    skillSources,
    summonables,
    recoverSources,
    label: pieces.slice(0, 2).join("，"),
    detail: pieces.join("；"),
  };
}

function handleEndTurnClick() {
  if (!game || game.winner !== null || aiThinking || canHumanResolveDefense() || (vsAI && game.active === 1)) return;
  if (pendingDiscard) {
    addLog(pendingDiscard.playerId === onlineInputActorId() ? "先处理满手弃牌，再结束回合。" : onlineWaitingDetail());
    render();
    return;
  }
  if (isOnlineMode() && !onlineCanControlCurrentDecision()) {
    addLog(onlineWaitingDetail());
    render();
    return;
  }
  const state = buildEndTurnButtonState();
  const key = endTurnConfirmKey();
  if (shouldConfirmEndTurn(state) && endTurnConfirmScope !== key) {
    endTurnConfirmScope = key;
    render();
    return;
  }
  if (onlineMaybeSendAction({ kind: "endTurn" })) return;
  endTurnConfirmScope = "";
  endTurn();
  onlineAfterHostAction("endTurn");
}

function buildEndTurnButtonState() {
  const base = {
    label: vsAI ? "交给 AI" : "结束回合",
    title: "结束当前回合。",
    detail: null,
    variant: "secondary",
    stateClass: "is-neutral",
  };
  if (!game) return { ...base, label: "结束回合", variant: "primary" };
  if (pendingDiscard) {
    return {
      ...base,
      label: "先弃 1 张",
      title: "手牌超过上限，必须先选择一张弃掉。",
      detail: { label: "满手弃牌中", tone: "warning" },
      variant: "secondary",
      stateClass: "is-blocked",
    };
  }
  if (pendingDefense) {
    return {
      ...base,
      label: "先判这一口",
      title: "当前必须先处理这一下，结完才会回主回合。",
      detail: { label: "处理完才回主回合", tone: "support" },
      variant: "secondary",
      stateClass: "is-blocked",
    };
  }
  if (vsAI && game.active === 1) {
    return {
      ...base,
      label: aiThinking ? "AI 演中" : "等 AI 演",
      title: "现在轮到 AI，等它交完动作你再接管。",
      detail: { label: "等它演完再接", tone: "support" },
      variant: "secondary",
      stateClass: "is-waiting",
    };
  }

  const player = activePlayer();
  const suggestion = currentPrimarySuggestion();
  const remaining = remainingMajorActionSummary(player);
  const moment = currentHypeMoment(player, suggestion);
  const quest = currentTurnQuest(player);
  const nextAction = endTurnNextActionLabel(suggestion, player);
  const cues = suggestion
    ? buildSuggestionExcitementCues(player, suggestion, {
        limit: 1,
        includeFallbackHype: false,
      })
    : [];
  const cue = cues[0] || null;
  const confirming = endTurnConfirmScope === endTurnConfirmKey();
  const withConfirm = (state) => {
    if (!confirming || state?.stateClass !== "is-caution") return state;
    return {
      ...state,
      label: vsAI ? "再点交给 AI" : "再点确认收手",
      title: `再点才会结束回合。${state.title || "想继续就按亮起动作。"}`,
      detail: { label: "再点才收手", tone: "warning" },
    };
  };

  if (!suggestion || suggestion.kind === "end_turn") {
    if (remaining) {
      return withConfirm({
        ...base,
        label: vsAI ? "先别交给 AI" : "先别结束",
        title: `这回合还有可用动作：${remaining.detail}。`,
        detail: {
          label: remaining.label,
          tone: remaining.attackSources.length ? "attack" : (remaining.skillSources.length ? "trick" : "support"),
        },
        stateClass: "is-caution",
      });
    }
    return {
      ...base,
      label: vsAI ? "收一手给 AI" : "结束回合",
      title: suggestion?.note || "这轮已经差不多了，先把资源留到下一轮。",
      detail: {
        label: player.food > 0 ? `留 ${player.food} 食物下轮` : "这轮先收手",
        tone: "reward",
      },
      variant: "primary",
      stateClass: "is-ready",
    };
  }

  if (moment?.crosses && !moment?.maxed) {
    return withConfirm({
      ...base,
      label: vsAI ? "先别交给 AI" : "先别结束",
      title: `再来一手就会掉“${moment.reward?.label || "喝彩奖励"}”。`,
      detail: {
        label: nextAction
          ? `先${nextAction} · 掉 ${compactRewardLabel(moment.reward || {}, "hype")}`
          : `差 ${moment.remaining} 热度掉奖励`,
        tone: "reward",
      },
      stateClass: "is-caution",
    });
  }

  if (suggestion.ribbon === "任务线" && quest && !quest.completed) {
    return withConfirm({
      ...base,
      label: vsAI ? "先别交给 AI" : "先别结束",
      title: "这手做完会自动领奖，通常比现在收手更赚。",
      detail: {
        label: nextAction ? `先${nextAction} · 领 ${shortQuestReward(quest)}` : `先领 ${shortQuestReward(quest)}`,
        tone: "reward",
      },
      stateClass: "is-caution",
    });
  }

  if (cue) {
    return withConfirm({
      ...base,
      label: vsAI ? "先别交给 AI" : "先别结束",
      title: "这回合还有顺手赚头，先把这一下打出去更值。",
      detail: {
        label: [
          nextAction ? `先${nextAction}` : "",
          cue.label,
          remaining?.label ? `还有 ${remaining.label}` : "",
        ].filter(Boolean).join(" · "),
        tone: cue.tone || actionCueToneForSuggestion(suggestion),
      },
      stateClass: "is-caution",
    });
  }

  if (remaining && !cue && !moment?.crosses) {
    return withConfirm({
      ...base,
      label: vsAI ? "先别交给 AI" : "先别结束",
      title: `你不一定要全做完，但现在还有：${remaining.detail}。`,
      detail: {
        label: remaining.label,
        tone: remaining.attackSources.length ? "attack" : (remaining.skillSources.length ? "trick" : "support"),
      },
      stateClass: "is-caution",
    });
  }

  if (moment?.near && !moment?.maxed) {
    return withConfirm({
      ...base,
      label: vsAI ? "交给 AI" : "结束回合",
      title: "现在收手也行，只是离掉落线已经很近了。",
      detail: {
        label: nextAction ? `先${nextAction} · 差 ${moment.remaining} 热度` : `差 ${moment.remaining} 热度`,
        tone: "reward",
      },
      stateClass: "is-caution",
    });
  }

  return withConfirm({
    ...base,
    title: nextAction ? `真想收也行，但这拍更像先${nextAction}。` : "结束当前回合。",
    detail: {
      label: nextAction ? `可选 ${nextAction}` : (player.food > 0 ? `留 ${player.food} 食物下轮` : "这轮先收手"),
      tone: nextAction ? actionCueToneForSuggestion(suggestion) : "support",
    },
    stateClass: nextAction ? "is-caution" : "is-neutral",
  });
}

function buildLiveReactionFromEvent(event) {
  const action = event?.action || "";
  const extra = event?.extra || {};
  const tone = reactionToneForAction(action);
  const seed = `${game?.matchId || "demo"}:${event?.turn || 0}:${event?.step || 0}:${action}:${event?.target || ""}:${extra?.attackerCard || ""}`;
  const chips = logChipsForEvent(event).slice(0, 3);
  const followUp = buildSpotlightFollowUpCue(event);

  if (action === "match_start") {
    return {
      tone: "turn",
      badge: "开场字幕",
      kicker: `第 ${event.turn || 1} 回合`,
      title: stablePickByKey([
        "台下刚把椅子拖正",
        "导播刚把镜头推上来",
        "看台正在认真打量这桌人",
      ], seed),
      copy: `这把像“${openingCueLabel(game.players[0])}”对上“${openingCueLabel(game.players[1])}”。先让第一只动物落地，气氛才会真正开始冒出来。`,
      chant: stablePickByKey([
        "场边闲话：开局看着平静，往往只是因为离谱还没轮到自己出场。",
        "节目组判词：先看手牌和亮格，第一拍别把自己想累了。",
      ], `${seed}:chant`),
      chips: [`环境暗牌 -${DISASTER_DRAW_COST}`],
      followUp,
    };
  }
  if (action === "summon") {
    const role = inferCardRole(allCards.find((card) => card.name === (extra.cardName || event.target)) || findCardLocation(extra.cardUid)?.card || null);
    return {
      tone: role.tone || tone,
      badge: "现场反应",
      kicker: "新选手进灯",
      title: stablePickByKey([
        "前排已经开始认人了",
        "镜头自己就推过去了",
        "全场默认这只要搞事",
      ], seed),
      copy: `《${event.target || extra.cardName || "这只动物"}》刚刚上桌，${role.label}味已经出来了。`,
      chant: stablePickByKey([
        `节目组判词：${role.blurb}`,
        `主持人口播：${role.label}位进场，别让它原地发呆。`,
      ], `${seed}:chant`),
      chips,
      followUp,
    };
  }
  if (action === "attack_creature_kill" || action === "attack_creature_pressure_kill") {
    return {
      tone,
      badge: "现场反应",
      kicker: "名场面预定",
      title: stablePickByKey([
        "前排突然倒吸一口凉皮",
        "主持人差点把台本甩飞",
        "看台有人已经站起来了",
      ], seed),
      copy: action === "attack_creature_pressure_kill"
        ? `《${event.target || extra.targetCard || "目标"}》被连续压制到退场，这口把复工循环切断了。`
        : `《${extra.attackerCard || event.actor || "这只生物"}》刚把《${event.target || extra.targetCard || "目标"}》拍下台，这口够狠。`,
      chant: stablePickByKey([
        "节目组判词：这下不补一刀都像对不起镜头。",
        "场边闲话：对面刚想喘口气，结果被你直接收头。",
      ], `${seed}:chant`),
      chips,
      followUp,
    };
  }
  if (action === "attack_face_guard") {
    return {
      tone: "support",
      badge: "格挡成功",
      kicker: "这口被硬接住了",
      title: stablePickByKey([
        "前排刚刚把这口脸接了下来",
        "看台有人替这次格挡鼓了下掌",
        "主持人承认这口接得很硬",
      ], seed),
      copy: `《${extra.blocker || "格挡动物"}》扑上去把这下接住了，${event.target || extra.defender || "防守方"} 这口命先续住了。`,
      chant: stablePickByKey([
        "节目组判词：会不会赢先不说，先把命续住本身就很有节目感。",
        "场边闲话：能把脸接下来，桌面就还没轮到认输那一步。",
      ], `${seed}:chant`),
      chips,
      followUp,
    };
  }
  if (action === "attack_face_guard_unstoppable") {
    return {
      tone: "attack",
      badge: "漏血警报",
      kicker: "挡住了，但没全挡住",
      title: stablePickByKey([
        "前排刚接住，血条还是抖了一下",
        "主持人刚夸完，血线又漏了一口",
        "这口明明接住了，却还是疼到了脸上",
      ], seed),
      copy: `《${extra.blocker || "格挡动物"}》已经顶上去了，但《${extra.attackerCard || event.actor || "这只生物"}》还是硬蹭进了 ${extra.leak || 0} 血。`,
      chant: stablePickByKey([
        "节目组判词：最烦人的不是打得疼，是你明明挡了它还要疼。",
        "场边闲话：这种漏血最会把人心态往综艺区拽。",
      ], `${seed}:chant`),
      chips,
      followUp,
    };
  }
  if (action === "attack_creature_player_guard") {
    return {
      tone: "support",
      badge: "玩家承受",
      kicker: "这只硬是留住了",
      title: stablePickByKey([
        "看台默认这只是不能现在走的",
        "主持人刚刚认定这口血花得值",
        "全场都看见有人替这只扛了账",
      ], seed),
      copy: `${extra.defender || "防守方"} 自己掉了 ${extra.damage || 0} 血，硬把《${event.target || extra.targetCard || "目标"}》保在了台上。`,
      chant: stablePickByKey([
        "节目组判词：愿意用玩家血量保护动物的回合，通常都没打算走普通路线。",
        "场边闲话：这口不只是保住动物，是在保后面整活的资格。",
      ], `${seed}:chant`),
      chips,
      followUp,
    };
  }
  if (action === "attack_face" || action === "attack_face_guard" || action === "attack_face_guard_unstoppable") {
    return {
      tone,
      badge: "血线警报",
      kicker: "有人开始抄近路",
      title: stablePickByKey([
        "看台开始一起拍扶手",
        "主持人嗓门突然高了半度",
        "全场注意力都被拖去血条了",
      ], seed),
      copy: event.detail || "刚刚有人直接往脸上招呼了。",
      chant: stablePickByKey([
        "节目组判词：压血这件事，永远比老实换怪更吓人。",
        "场边闲话：只要血线开始抖，气氛就会自己上来。",
      ], `${seed}:chant`),
      chips,
      followUp,
    };
  }
  if (action === "disaster_cast") {
    const laneName = laneLabel(extra.lane || "") || "这一排";
    return {
      tone,
      badge: "节目效果",
      kicker: "灯光组突然发疯",
      title: stablePickByKey([
        "全场刚刚一起缩了下脖子",
        "主持人把麦克风先拿远了",
        "后排已经开始找掩体了",
      ], seed),
      copy: `《${event.target || "环境牌"}》刚把${laneName}搅得鸡飞狗跳。`,
      chant: stablePickByKey([
        "节目组判词：自然灾害不讲武德，但很讲节目效果。",
        "场边闲话：这种按钮一按下去，朋友关系都会短暂紧张一下。",
      ], `${seed}:chant`),
      chips,
      followUp,
    };
  }
  if (action === "quest_complete") {
    return {
      tone,
      badge: "支线达成",
      kicker: "奖金从天而降",
      title: stablePickByKey([
        "节目组硬把红包拍你脸上",
        "看台默认你这下值得加鸡腿",
        "后台已经开始替你鼓掌了",
      ], seed),
      copy: `《${event.target || "骚操作"}》已经自动领奖，离谱得很合规。`,
      chant: stablePickByKey([
        "节目组判词：既然都做到这一步了，奖励当然得秒发。",
        "场边闲话：支线一完成，整局的脸色都会好看一点。",
      ], `${seed}:chant`),
      chips,
      followUp,
    };
  }
  if (action === "hype_reward") {
    return {
      tone,
      badge: "观众空投",
      kicker: `热度线 ${extra.threshold || HYPE_THRESHOLDS[0]} 已破`,
      title: extra.rewardHeadline || stablePickByKey([
        "看台已经开始乱扔补给",
        "赞助商突然冲上来塞吃的",
        "后台觉得你应该继续闹",
      ], seed),
      copy: `刚刚掉了“${extra.rewardLabel || event.target || "喝彩奖励"}”，观众还没看够。`,
      chant: stablePickByKey([
        "节目组判词：拿了补给就别收手，台下是会记仇的。",
        "场边闲话：奖励一掉下来，大家默认你还有后手。",
      ], `${seed}:chant`),
      chips,
      followUp,
    };
  }
  if (typeof action === "string" && action.startsWith("skill")) {
    return {
      tone,
      badge: "绝活镜头",
      kicker: "有人开始不按常理出牌",
      title: stablePickByKey([
        "主持人刚刚嗯了一声",
        "看台开始猜下一拍会多离谱",
        "镜头已经默认这是熟练犯案",
      ], seed),
      copy: event.detail || `《${event.target || "这只生物"}》刚把绝活甩出来了。`,
      chant: stablePickByKey([
        "节目组判词：绝活只要开了，气氛就不可能再正常回去。",
        "场边闲话：这手未必最稳，但一定最有故事。",
      ], `${seed}:chant`),
      chips,
      followUp,
    };
  }
  if (action === "move") {
    return {
      tone,
      badge: "镜头追拍",
      kicker: "它开始偷偷改道",
      title: stablePickByKey([
        "看台有人已经猜到要绕后了",
        "这只看起来不像准备老实待着",
        "主持人把地图都快看穿了",
      ], seed),
      copy: event.detail || `《${extra.cardName || event.target || "这只动物"}》刚换完线，像是在找麻烦。`,
      chant: stablePickByKey([
        "节目组判词：会走位的动物，脸色通常都不太善良。",
        "场边闲话：换线本身就很烦，更烦的是你还知道它要去哪。",
      ], `${seed}:chant`),
      chips,
      followUp,
    };
  }
  if (action === "end_turn") {
    return {
      tone,
      badge: "镜头切人",
      kicker: `轮到 ${event.target || "下一位"}`,
      title: stablePickByKey([
        "话筒被顺手塞给了下一位",
        "导播一个甩镜头把人切走了",
        "台上空气已经换了个人味",
      ], seed),
      copy: event.detail || `${event.target || "下一位"} 接过了这回合的话筒。`,
      chant: stablePickByKey([
        "节目组判词：别急，下一拍的离谱通常来得更快。",
        "场边闲话：每次换手，桌面其实都在偷偷换气氛。",
      ], `${seed}:chant`),
      chips,
      followUp,
    };
  }
  if (action === "winner") {
    return {
      tone,
      badge: "片尾字幕",
      kicker: "胜负已定",
      title: stablePickByKey([
        "看台终于肯把嗓子放下来了",
        "主持人决定认真念一遍名字",
        "这局的镜头到这里算是有交代了",
      ], seed),
      copy: event.detail || `${event.actor || "有人"} 刚刚把这局收进战报了。`,
      chant: stablePickByKey([
        "节目组判词：赢的人先别走，战报还等着被朋友拿去复盘。",
        "场边闲话：一局结束的时候，最离谱的操作才会开始被认真回味。",
      ], `${seed}:chant`),
      chips,
      followUp,
    };
  }
  return {
    tone,
    badge: "现场反应",
    kicker: "刚刚这一下",
    title: stablePickByKey([
      "看台有人轻轻拍了两下栏杆",
      "节目组默默把这段先存档了",
      "这步不一定最强，但肯定有人记住了",
    ], seed),
    copy: event.detail || "刚刚发生了一步新结算。",
    chant: stablePickByKey([
      "节目组判词：只要舞台还没凉，任何一步都可能翻篇成梗。",
      "场边闲话：这游戏最危险的时刻，往往就是大家开始觉得一切很正常的时候。",
    ], `${seed}:chant`),
    chips,
    followUp,
  };
}

function buildLiveReaction() {
  if (!game) {
    return {
      tone: "support",
      badge: "现场反应",
      kicker: "待开机",
      title: "台下还在找位置坐",
      copy: "新开一局后，这里会像综艺字幕一样替你夸张转播。",
      chant: "节目组判词：先别紧张，这桌比看起来更欢迎怪招。",
      chips: ["先开一局"],
      fresh: false,
    };
  }
  const latest = [...game.history].reverse().find((event) => isSpotlightAction(event.action)) || game.history[game.history.length - 1] || null;
  const freshStinger = currentFreshActionStingerEvent();
  if (!latest) {
    const suggestion = currentPrimarySuggestion();
    return {
      tone: "support",
      badge: "现场反应",
      kicker: `第 ${game.turn} 回合`,
      title: "观众还在热身",
      copy: suggestion ? `${guidePrimaryLabel(suggestion)} 这手看起来最像要起飞。` : "先随便起一手，节目效果会自己长出来。",
      chant: "节目组判词：别担心开场冷，第一只动物落地之后空气就会变。",
      chips: ["等第一手"],
      fresh: false,
    };
  }
  const base = buildLiveReactionFromEvent(latest);
  const compact = !!freshStinger && freshStinger.step === latest.step;
  return {
    ...base,
    followUp: compact ? null : base.followUp,
    chips: compact ? [] : (base.chips || []),
    compact,
    fresh: latest.step === game.step && latest.step > 0,
    flashClass: latest.step % 2 === 0 ? "flash-even" : "flash-odd",
  };
}

function buildActionStingerFromEvent(event) {
  const action = event?.action || "";
  const extra = event?.extra || {};
  const tone = reactionToneForAction(action);
  const seed = `${game?.matchId || "demo"}:${event?.turn || 0}:${event?.step || 0}:stinger:${action}:${event?.target || ""}:${extra?.attackerCard || ""}`;
  const chips = logChipsForEvent(event).slice(0, 3);
  const actor = extra.attackerCard || event?.target || event?.actor || "这一下";
  const followUp = buildSpotlightFollowUpCue(event);

  if (action === "summon") {
    return {
      tone: "support",
      badge: "新选手进灯",
      title: `上《${event.target || extra.cardName || "这只动物"}》`,
      copy: stablePickByKey([
        "刚落地，镜头就已经跟过去了。",
        "它一进组，台下默认这回合不会太老实。",
      ], seed),
      chips,
      followUp,
    };
  }
  if (action === "attack_creature_kill" || action === "attack_creature_pressure_kill") {
    return {
      tone: "attack",
      badge: action === "attack_creature_pressure_kill" ? "压退到手" : "收头到手",
      title: action === "attack_creature_pressure_kill"
        ? `《${event.target || extra.targetCard || "目标"}》连续被压退场`
        : `《${extra.attackerCard || "这只生物"}》收掉《${event.target || extra.targetCard || "目标"}》`,
      copy: stablePickByKey([
        "这一口够狠，整个桌面都会跟着松一截。",
        "前排刚倒，后面的怪招就会显得更有底气。",
      ], seed),
      chips,
      followUp,
    };
  }
  if (action === "attack_face_guard") {
    return {
      tone: "support",
      badge: "格挡到位",
      title: `《${extra.blocker || "格挡动物"}》把这口接住了`,
      copy: stablePickByKey([
        "这一口先续住，台下会默认你还没打算认怂。",
        "接住这一下以后，整桌空气都还能继续往后拖。",
      ], seed),
      chips,
      followUp,
    };
  }
  if (action === "attack_face_guard_unstoppable") {
    return {
      tone: "attack",
      badge: "挡了也疼",
      title: `《${extra.blocker || "格挡动物"}》顶了，但还是漏了 ${extra.leak || 0}`,
      copy: stablePickByKey([
        "最气人的从来不是没挡，是挡了还照样要疼。",
        "这一下明明有人接，血条却还是被它蹭开了。",
      ], seed),
      chips,
      followUp,
    };
  }
  if (action === "attack_creature_player_guard") {
    return {
      tone: "support",
      badge: "保护成功",
      title: `《${event.target || extra.targetCard || "这只生物"}》被硬保下来了`,
      copy: stablePickByKey([
        "这口血花出去，等于把后面的整活资格一起买回来了。",
        "先别急着心疼血量，这种硬保通常都在图后手。",
      ], seed),
      chips,
      followUp,
    };
  }
  if (action === "attack_face" || action === "attack_face_guard" || action === "attack_face_guard_unstoppable") {
    return {
      tone: "attack",
      badge: "血线警报",
      title: `${actor} 直接往脸上招呼`,
      copy: stablePickByKey([
        "只要血线开始抖，台下就会自动提高音量。",
        "这种贴脸通常比老实换怪更容易把人打上头。",
      ], seed),
      chips,
      followUp,
    };
  }
  if (action === "disaster_cast") {
    return {
      tone: "trick",
      badge: "炸场瞬间",
      title: `《${event.target || "环境牌"}》开演`,
      copy: stablePickByKey([
        "灯光组已经疯了，这一下本来就不是冲着体面来的。",
        "环境牌一抽出来，空气一般会立刻复杂起来。",
      ], seed),
      chips,
      followUp,
    };
  }
  if (typeof action === "string" && action.startsWith("skill")) {
    return {
      tone: "trick",
      badge: "绝活上镜",
      title: `《${event.target || extra.attackerCard || "这只动物"}》开了 ${extra.cardSkill || extra.skillName || "绝活"}`,
      copy: stablePickByKey([
        "邪门味已经冒出来了，后面很少会只是普通结算。",
        "只要绝活开始说话，观众一般就不愿意安静了。",
      ], seed),
      chips,
      followUp,
    };
  }
  if (action === "quest_complete") {
    return {
      tone: "reward",
      badge: "顺手领奖",
      title: `《${event.target || "任务"}》兑现`,
      copy: stablePickByKey([
        "最爽的永远是动作刚打完，奖励就自己滚下来。",
        "这下不只是好看，连账也一起赚到了。",
      ], seed),
      chips,
      followUp,
    };
  }
  if (action === "hype_reward") {
    return {
      tone: "reward",
      badge: "观众买账",
      title: extra.rewardLabel || "喝彩奖励到手",
      copy: stablePickByKey([
        "台下已经开始扔东西了，这说明刚才那手真的有味道。",
        "热度一过线，整桌人都会默认你该继续闹下去。",
      ], seed),
      chips,
      followUp,
    };
  }
  return null;
}

function actionStingerBurst(event) {
  const action = event?.action || "";
  const extra = event?.extra || {};
  const seed = `${game?.matchId || "demo"}:${event?.turn || 0}:${event?.step || 0}:burst:${action}:${event?.target || ""}:${extra?.attackerCard || ""}`;
  if (action === "summon") return stablePickByKey(["有请", "上桌", "入戏", "登场"], seed);
  if (action === "attack_creature_pressure_kill") return stablePickByKey(["压退", "下台", "别起", "收工"], seed);
  if (action === "attack_creature_kill") return stablePickByKey(["带走", "收头", "开饭", "下台"], seed);
  if (action === "attack_face_guard") return stablePickByKey(["接住", "顶住", "续命", "别倒"], seed);
  if (action === "attack_face_guard_unstoppable") return stablePickByKey(["漏了", "还疼", "蹭进", "不讲理"], seed);
  if (action === "attack_creature_player_guard") return stablePickByKey(["硬保", "别走", "留下", "顶账"], seed);
  if (action === "attack_face" || action === "attack_face_guard" || action === "attack_face_guard_unstoppable") {
    return stablePickByKey(["贴脸", "上嘴", "压它", "痛啊"], seed);
  }
  if (action === "disaster_cast") return stablePickByKey(["开炸", "乱来", "别躲", "起锅"], seed);
  if (typeof action === "string" && action.startsWith("skill")) return stablePickByKey(["整活", "邪门", "有戏", "来活"], seed);
  if (action === "quest_complete") return stablePickByKey(["兑奖", "赚到", "稳了", "顺手"], seed);
  if (action === "hype_reward") return stablePickByKey(["掉了", "加菜", "掌声", "再来"], seed);
  return stablePickByKey(["啪", "哐", "安可", "上镜"], seed);
}

function buildActionStinger() {
  if (!game) {
    return { visible: false };
  }
  const latest = currentFreshActionStingerEvent();
  if (!latest) {
    return { visible: false };
  }
  const card = buildActionStingerFromEvent(latest);
  if (!card) return { visible: false };
  return {
    ...card,
    visible: true,
    burst: actionStingerBurst(latest),
    flashClass: latest.step % 2 === 0 ? "flash-even" : "flash-odd",
  };
}

function momentumMeterStages(score = 0) {
  const stops = [
    { label: "热身", min: 0 },
    { label: "有料", min: 18 },
    { label: "离谱", min: 44 },
    { label: "拍桌", min: 72 },
    { label: "报警", min: 100 },
  ];
  return stops.map((stop, index) => {
    const nextMin = stops[index + 1]?.min ?? Infinity;
    return {
      label: stop.label,
      active: score >= stop.min,
      current: score >= stop.min && score < nextMin,
    };
  });
}

function settlementRewardLabel(extra = {}) {
  const amount = Math.max(1, Number(extra.rewardAmount) || 1);
  if (extra.rewardLabel) return extra.rewardLabel;
  if (extra.rewardType === "draw_private") return `抽 ${amount} 张私有牌`;
  if (extra.rewardType === "heal") return `回 ${amount} 血`;
  if (extra.rewardType === "food") return `+${amount} 食物`;
  return "自动领奖";
}

function compactRewardLabel(extra = {}, source = "generic") {
  const amount = Math.max(1, Number(extra.rewardAmount) || 1);
  if (extra.rewardType === "food") return `+${amount} 粮`;
  if (extra.rewardType === "heal") return `回 ${amount}`;
  if (extra.rewardType === "draw_private") return source === "hype" ? "私房牌" : `抽 ${amount}`;
  return extra.rewardLabel || "领奖";
}

function buildScoreSettlementItem(scoreSummary, eventCount = 0) {
  if (!scoreSummary || !(scoreSummary.bonuses || []).length || eventCount >= 2) return null;
  return {
    key: `score:${game.turn}:${game.step}`,
    tone: scoreSummary.rank?.tone || "support",
    badge: "节目记账",
    title: scoreSummary.bonuses.map((bonus) => bonus.label).slice(0, 2).join(" · "),
    detail: `${scoreSummary.detail || "0 手串烧"}。${scoreSummary.note || ""}`.trim(),
  };
}

function buildMomentumRouteItem(event) {
  const action = event?.action || "";
  const extra = event?.extra || {};
  const tone = reactionToneForAction(action);
  if (action === "summon") return { tone: "support", badge: "上场", title: event.target || extra.cardName || "这只动物" };
  if (action === "move") return { tone: "trick", badge: "换线", title: laneLabel(extra.to || "") ? `去${laneLabel(extra.to || "")}` : event.target || extra.cardName || "挪位" };
  if (action === "disaster_cast") return { tone: "trick", badge: "环境牌", title: event.target || "炸场" };
  if (action === "recover") return { tone: "support", badge: "复工", title: event.target || "返场" };
  if (action === "sacrifice") return { tone: "support", badge: "开饭", title: event.target || "当口粮" };
  if (action === "quest_complete") return { tone: "reward", badge: "领奖", title: compactRewardLabel(extra, "quest") };
  if (action === "hype_reward") return { tone: extra.rewardTone || "reward", badge: "喝彩", title: compactRewardLabel(extra, "hype") };
  if (action === "attack_creature_pressure_kill") return { tone: "attack", badge: "压退", title: event.target || extra.targetCard || "目标" };
  if (action === "attack_creature_kill") return { tone: "attack", badge: "收头", title: event.target || extra.targetCard || "目标" };
  if (action === "attack_creature_injure") return { tone: "attack", badge: "压场", title: event.target || extra.targetCard || "目标" };
  if (action === "attack_creature_venom") return { tone: "attack", badge: "阴到", title: event.target || extra.targetCard || "目标" };
  if (action === "attack_creature_player_guard") return { tone: "support", badge: "保护", title: event.target || extra.targetCard || "目标" };
  if (action === "attack_face" || action === "attack_face_guard" || action === "attack_face_guard_unstoppable") {
    const damage = Math.max(1, Number(extra.damage) || 1);
    return { tone: "attack", badge: "冲脸", title: `${damage} 血` };
  }
  if (action === "draw_private" || String(action).startsWith("draw_public_")) return { tone: "support", badge: "补牌", title: event.target || "翻到新牌" };
  if (typeof action === "string" && action.startsWith("skill")) {
    return {
      tone,
      badge: "绝活",
      title: extra.cardSkill || extra.skillName || event.target || extra.attackerCard || "开了",
    };
  }
  return null;
}

function buildMomentumRoute(player = activePlayer()) {
  if (!game || !player) return null;
  const routeItems = game.history
    .filter((event) => event.turn === game.turn)
    .filter((event) => {
      if (event.action === "hype_reward") return event.target === player.name;
      if (event.action === "quest_complete") return event.actor === player.name;
      return event.actor === player.name && !!showtimeChipForAction(event.action);
    })
    .map((event) => buildMomentumRouteItem(event))
    .filter(Boolean)
    .map((item, index) => ({ ...item, order: index + 1 }));
  if (routeItems.length < 2) return null;
  const visibleItems = routeItems.slice(-5);
  return {
    label: routeItems.length > visibleItems.length ? `最近 ${visibleItems.length} 拍` : "这手串法",
    items: visibleItems,
  };
}

function buildMomentumSettlementItems(player = activePlayer(), summary = buildShowtimeSummary(player)) {
  if (!game || !player || !summary) return [];
  const scoreSummary = summary.scoreSummary || buildShowtimeScoreSummary(player);
  const events = [...game.history]
    .filter((event) => event.turn === game.turn)
    .sort((left, right) => {
      const priority = {
        attack_creature_pressure_kill: 60,
        attack_creature_kill: 60,
        kill_passive: 54,
        disaster_cast: 48,
        quest_complete: 42,
        hype_reward: 36,
      };
      const leftPriority = priority[left.action] || 0;
      const rightPriority = priority[right.action] || 0;
      if (leftPriority !== rightPriority) return rightPriority - leftPriority;
      return (right.step || 0) - (left.step || 0);
    });
  const items = [];

  const eventBuilders = {
    hype_reward(event) {
      const extra = event.extra || {};
      const seed = `${game.turn}:${event.step}:reward:${extra.threshold || 0}:${extra.rewardType || ""}:${extra.rewardAmount || 0}`;
      return {
        key: `reward:${event.step}`,
        tone: extra.rewardTone || "reward",
        badge: "观众买账",
        title: `${settlementRewardLabel(extra)}${extra.threshold ? ` · ${extra.threshold} 热度线` : ""}`,
        detail: extra.rewardFlavor || stablePickByKey([
          "台下刚把补给顺手扔上来了。",
          "观众默认你还有活，所以先给你垫一口。",
        ], seed),
      };
    },
    quest_complete(event) {
      const extra = event.extra || {};
      const seed = `${game.turn}:${event.step}:quest:${extra.questId || event.target || ""}`;
      return {
        key: `quest:${event.step}`,
        tone: "reward",
        badge: "支线兑现",
        title: stablePickByKey([
          `《${event.target || "本回合任务"}》当场兑现`,
          `《${event.target || "本回合任务"}》已经领到`,
        ], seed),
        detail: `${extra.reason || "条件已经踩中"}。奖：${settlementRewardLabel(extra)}。`,
      };
    },
    attack_creature_pressure_kill(event) {
      const extra = event.extra || {};
      const attacker = extra.attackerCard || event.actor || "这只生物";
      const target = event.target || extra.targetCard || "目标";
      const seed = `${game.turn}:${event.step}:pressure-kill:${attacker}:${target}:${extra.targetLevel || ""}`;
      return {
        key: `pressure-kill:${event.step}`,
        tone: "attack",
        badge: "连续压退",
        title: stablePickByKey([
          `${target} 被压到退场`,
          `${attacker} 把 ${target} 压下台`,
        ], seed),
        detail: "第二次压制直接退场，复工循环被切断。",
      };
    },
    attack_creature_kill(event) {
      const extra = event.extra || {};
      const attacker = extra.attackerCard || event.actor || "这只生物";
      const target = event.target || extra.targetCard || "目标";
      const seed = `${game.turn}:${event.step}:kill:${attacker}:${target}:${extra.targetLevel || ""}`;
      return {
        key: `kill:${event.step}`,
        tone: "attack",
        badge: extra.targetLevel === "A" ? "大货落地" : "收头结算",
        title: stablePickByKey([
          `${attacker} 一口带走 ${target}`,
          `${attacker} 收掉 ${target}`,
          `${attacker} 把 ${target} 端下台`,
        ], seed),
        detail: stablePickByKey(
          extra.targetLevel === "A"
            ? [
              "大货一倒，台下默认这回合还没演完。",
              "这口不是换血，是把最大那块肉直接搬走了。",
            ]
            : [
              "这一口已经把对面抬下台了。",
              "收完这口，镜头都知道该跟着谁走了。",
            ],
          seed,
        ),
      };
    },
    kill_passive(event) {
      const extra = event.extra || {};
      const seed = `${game.turn}:${event.step}:passive:${extra.defender || event.actor || ""}`;
      return {
        key: `passive:${event.step}`,
        tone: "trick",
        badge: "余震对账",
        title: stablePickByKey([
          `${extra.defender || "这只生物"} 退场还想回头算账`,
          `${extra.defender || "这只生物"} 死后还在补最后一句`,
        ], seed),
        detail: stablePickByKey([
          "人都退场了，场子还在继续抖一下。",
          "对面刚下台，余震已经顺手把气氛再搅一遍。",
        ], seed),
      };
    },
    disaster_cast(event) {
      const extra = event.extra || {};
      const lane = laneLabel(extra.lane || "") || "这一排";
      const seed = `${game.turn}:${event.step}:disaster:${event.target || ""}:${lane}`;
      return {
        key: `disaster:${event.step}`,
        tone: "trick",
        badge: "炸场对账",
        title: stablePickByKey([
          `《${event.target || "环境牌"}》炸穿 ${lane}`,
          `《${event.target || "环境牌"}》把 ${lane} 闹起来了`,
        ], seed),
        detail: stablePickByKey([
          "环境牌一响，场面就开始自己长故事。",
          "这一下不是补刀，是整排一起开始出节目效果。",
        ], seed),
      };
    },
  };

  const seenKinds = new Set();
  for (const event of events) {
    if (!eventBuilders[event.action]) continue;
    if (seenKinds.has(event.action)) continue;
    seenKinds.add(event.action);
    const item = eventBuilders[event.action](event);
    if (item) items.push(item);
    if (items.length >= 3) break;
  }
  const scoreItem = buildScoreSettlementItem(scoreSummary, items.length);
  if (scoreItem && items.length < 3) items.push(scoreItem);
  return items.slice(0, 3);
}

function buildMomentumStrip(player = activePlayer()) {
  if (!game || !player) return { visible: false };
  const summary = buildShowtimeSummary(player);
  const scoreSummary = summary.scoreSummary || buildShowtimeScoreSummary(player);
  const moment = currentHypeMoment(player);
  const quest = currentTurnQuest(player);
  const latestReward = (summary.rewards || []).slice(-1)[0] || null;
  const nextRewardChain = latestReward
    ? nextHypeRewardState(player, {
        afterThreshold: latestReward.threshold || 0,
        current: moment?.current || currentTurnHype(player),
      })
    : null;
  const events = currentTurnShowtimeEvents(player);
  const latestSpotlight = [...game.history].reverse().find((event) => event.turn === game.turn && isSpotlightAction(event.action)) || null;
  const visible = game.winner !== null
    || events.length > 0
    || !!latestReward
    || !!quest?.completed
    || !!moment?.crosses
    || !!moment?.near;
  if (!visible) return { visible: false };

  let tone = scoreSummary.rank?.tone || "support";
  if (latestReward || quest?.completed || game.winner !== null) tone = "reward";
  else if (scoreSummary.mix.kills > 0 || scoreSummary.mix.faceHits > 0) tone = "attack";
  else if (scoreSummary.mix.disasters > 0 || scoreSummary.mix.skills > 0) tone = "trick";

  let badge = "上头进度";
  let title = summary.title;
  let copy = summary.tip || scoreSummary.note || "这回合已经开始有味道了。";

  if (game.winner !== null) {
    badge = "片尾彩蛋";
    title = `${summary.title} · ${scoreSummary.rank.label}`;
    copy = scoreSummary.note || "这局已经不是一手两手的问题，是整段都值得朋友复盘。";
    tone = "reward";
  } else if (latestReward && nextRewardChain && !moment?.maxed) {
    badge = "掉落追击";
    title = `${summary.title} · 刚掉 ${compactRewardLabel(latestReward, "hype")}`;
    copy = `这回合刚刚拿到“${latestReward.label || "前一份奖励"}”，再闹 ${nextRewardChain.remaining} 点就会轮到“${nextRewardChain.reward?.label || "下一份奖励"}”。`;
    tone = "reward";
  } else if (latestReward && scoreSummary.score >= 72) {
    badge = "全桌拍桌";
    title = `${summary.title} · ${scoreSummary.rank.label}`;
    copy = `这回合已经掉了“${latestReward.label}”，台下默认你还有后手。`;
    tone = "reward";
  } else if (latestReward) {
    badge = "观众买账";
    title = `${summary.title} · 刚掉 ${latestReward.label}`;
    copy = latestReward.flavor || scoreSummary.note || "观众已经往台上扔补给了，别突然开始讲道理。";
    tone = "reward";
  } else if (quest?.completed && (scoreSummary.mix.kills > 0 || scoreSummary.mix.skills > 0 || scoreSummary.mix.disasters > 0 || scoreSummary.mix.faceHits > 0)) {
    badge = "合法离谱";
    title = `${summary.title} · ${quest.title}`;
    copy = "奖励已经自动到手，这种手最容易一路滚到朋友开始拍桌。";
    tone = "reward";
  } else if (scoreSummary.rank.label === "全场要报警") {
    badge = "全场要报警";
    title = summary.title;
    copy = scoreSummary.note;
    tone = "attack";
  } else if (scoreSummary.rank.label === "全桌拍桌") {
    badge = "拍桌连击";
    title = summary.title;
    copy = scoreSummary.note;
    tone = "reward";
  } else if (scoreSummary.rank.label === "开始离谱") {
    badge = "离谱起来了";
    title = summary.title;
    copy = scoreSummary.note;
    if (tone === "support") tone = "trick";
  } else if (scoreSummary.rank.label === "有点东西") {
    badge = "节目开张";
    title = summary.title;
    copy = scoreSummary.note;
  } else if (moment?.crosses) {
    badge = "马上掉落";
    title = `再闹一下就掉 ${moment.reward?.label || "奖励"}`;
    copy = `当前热度 ${moment.current}/${moment.max}。这口通常已经有人开始拍扶手了。`;
    tone = "reward";
  } else if (moment?.near) {
    badge = "快到掉落线";
    title = `差 ${moment.remaining} 点热度就开闹`;
    copy = `技能、击杀、环境牌和连招都能补这口。现在停手会显得很没节目精神。`;
  }

  const chips = [];
  if (scoreSummary.mix.events > 0) chips.push({ label: `串烧 ${scoreSummary.mix.events}`, tone: "trick" });
  if (scoreSummary.mix.variety > 1) chips.push({ label: `花样 ${scoreSummary.mix.variety}`, tone: "support" });
  if (scoreSummary.mix.kills > 0) chips.push({ label: `收头 ${scoreSummary.mix.kills}`, tone: "attack" });
  else if (scoreSummary.mix.faceHits > 0) chips.push({ label: `贴脸 ${scoreSummary.mix.faceHits}`, tone: "attack" });
  if (quest?.completed) chips.push({ label: `已领 ${shortQuestReward(quest)}`, tone: "reward" });
  if (latestReward) chips.push({ label: `掉 ${latestReward.label}`, tone: latestReward.tone || "reward" });
  if (latestReward && nextRewardChain && !moment?.maxed) {
    chips.push({ label: `再闹 ${nextRewardChain.remaining} 接 ${compactRewardLabel(nextRewardChain.reward || {}, "hype")}`, tone: "reward" });
  }
  scoreSummary.bonuses.forEach((bonus) => chips.push({ label: bonus.label, tone: bonus.tone || "support" }));
  if (moment?.near && !moment?.crosses && !latestReward) chips.push({ label: `差 ${moment.remaining} 热度`, tone: "support" });

  const dedupe = new Set();
  const trimmedChips = chips.filter((chip) => {
    const key = `${chip.tone || "support"}:${chip.label || ""}`;
    if (!chip.label || dedupe.has(key)) return false;
    dedupe.add(key);
    return true;
  }).slice(0, 4);

  return {
    visible: true,
    tone,
    badge,
    kicker: `节目分 ${scoreSummary.score} · ${scoreSummary.rank?.label || "热身"}`,
    title,
    copy,
    chips: trimmedChips,
    fillPercent: Math.max(0, Math.min(100, scoreSummary.score || 0)),
    meter: momentumMeterStages(scoreSummary.score || 0),
    settlements: buildMomentumSettlementItems(player, summary),
    route: buildMomentumRoute(player),
    fresh: latestSpotlight?.step === game.step && latestSpotlight.step > 0,
    flashClass: latestSpotlight?.step ? (latestSpotlight.step % 2 === 0 ? "flash-even" : "flash-odd") : "",
  };
}

function renderLiveReaction() {
  if (!els.liveReaction) return;
  const reaction = buildLiveReaction();
  const chips = (reaction.chips || [])
    .filter(Boolean)
    .map((chip) => `<span class="live-reaction-chip">${escapeHtml(chip)}</span>`)
    .join("");
  const followUp = reaction.followUp?.detail
    ? `
      <div class="live-reaction-followup tone-${escapeHtml(reaction.followUp.tone || reaction.tone || "support")}">
        <span class="live-reaction-followup-label">${escapeHtml(reaction.followUp.label || "下一口")}</span>
        <span class="live-reaction-followup-text">${escapeHtml(reaction.followUp.detail || "")}</span>
      </div>
    `
    : "";
  els.liveReaction.className = `live-reaction tone-${reaction.tone || "support"} ${reaction.compact ? "is-compact" : ""} ${reaction.fresh ? `is-fresh ${reaction.flashClass || ""}` : ""}`.trim();
  els.liveReaction.innerHTML = `
    <div class="live-reaction-head">
      <span class="live-reaction-badge">${escapeHtml(reaction.badge || "现场反应")}</span>
      <span class="live-reaction-kicker">${escapeHtml(reaction.kicker || "")}</span>
    </div>
    <strong class="live-reaction-title">${escapeHtml(reaction.title || "")}</strong>
    <div class="live-reaction-copy">${escapeHtml(reaction.copy || "")}</div>
    <div class="live-reaction-chant">${escapeHtml(reaction.chant || "")}</div>
    ${followUp}
    ${chips ? `<div class="live-reaction-chips">${chips}</div>` : ""}
  `;
}

function renderActionStinger() {
  if (!els.actionStinger) return;
  const stinger = buildActionStinger();
  els.actionStinger.classList.toggle("hidden", !stinger.visible);
  if (!stinger.visible) {
    els.actionStinger.className = "action-stinger hidden";
    els.actionStinger.innerHTML = "";
    return;
  }
  const chips = (stinger.chips || [])
    .map((chip) => `<span class="action-stinger-chip">${escapeHtml(chip)}</span>`)
    .join("");
  const followUp = stinger.followUp?.detail
    ? `
      <div class="action-stinger-followup tone-${escapeHtml(stinger.followUp.tone || stinger.tone || "support")}">
        <span class="action-stinger-followup-label">${escapeHtml(stinger.followUp.label || "下一口")}</span>
        <span class="action-stinger-followup-text">${escapeHtml(stinger.followUp.detail || "")}</span>
      </div>
    `
    : "";
  els.actionStinger.className = `action-stinger tone-${stinger.tone || "support"} is-fresh ${stinger.flashClass || ""}`.trim();
  els.actionStinger.innerHTML = `
    <div class="action-stinger-head">
      <span class="action-stinger-badge">${escapeHtml(stinger.badge || "爆点")}</span>
      <span class="action-stinger-burst">${escapeHtml(stinger.burst || "上镜")}</span>
    </div>
    <strong class="action-stinger-title">${escapeHtml(stinger.title || "")}</strong>
    <div class="action-stinger-copy">${escapeHtml(stinger.copy || "")}</div>
    ${followUp}
    ${chips ? `<div class="action-stinger-chips">${chips}</div>` : ""}
  `;
}

function renderMomentumStrip() {
  if (!els.momentumStrip) return;
  const state = buildMomentumStrip();
  els.momentumStrip.classList.toggle("hidden", !state.visible);
  if (!state.visible) {
    els.momentumStrip.innerHTML = "";
    return;
  }
  const chips = (state.chips || [])
    .map((chip) => `<span class="momentum-chip tone-${escapeHtml(chip.tone || "support")}">${escapeHtml(chip.label || "")}</span>`)
    .join("");
  const meter = (state.meter || [])
    .map((item) => `<span class="momentum-stage ${item.active ? "is-active" : ""} ${item.current ? "is-current" : ""}">${escapeHtml(item.label || "")}</span>`)
    .join("");
  const settlements = (state.settlements || [])
    .map((item) => `
      <article class="momentum-settlement tone-${escapeHtml(item.tone || "support")}">
        <span class="momentum-settlement-badge">${escapeHtml(item.badge || "")}</span>
        <strong class="momentum-settlement-title">${escapeHtml(item.title || "")}</strong>
        <div class="momentum-settlement-detail">${escapeHtml(item.detail || "")}</div>
      </article>
    `)
    .join("");
  const route = state.route?.items?.length
    ? `
      <div class="momentum-route">
        <span class="momentum-route-label">${escapeHtml(state.route.label || "这手串法")}</span>
        <div class="momentum-route-steps">
          ${(state.route.items || []).map((item) => `
            <span class="momentum-route-step tone-${escapeHtml(item.tone || "support")}">
              <span class="momentum-route-order">${escapeHtml(String(item.order || ""))}</span>
              <span class="momentum-route-badge">${escapeHtml(item.badge || "")}</span>
              <strong class="momentum-route-title">${escapeHtml(item.title || "")}</strong>
            </span>
          `).join("")}
        </div>
      </div>
    `
    : "";
  els.momentumStrip.className = `momentum-strip tone-${state.tone || "support"} ${state.fresh ? `is-fresh ${state.flashClass || ""}` : ""}`.trim();
  els.momentumStrip.innerHTML = `
    <div class="momentum-head">
      <span class="momentum-badge">${escapeHtml(state.badge || "上头进度")}</span>
      <span class="momentum-kicker">${escapeHtml(state.kicker || "")}</span>
    </div>
    <strong class="momentum-title">${escapeHtml(state.title || "")}</strong>
    <div class="momentum-copy">${escapeHtml(state.copy || "")}</div>
    <div class="momentum-meter">
      <span class="momentum-fill" style="width: ${Number(state.fillPercent) || 0}%"></span>
    </div>
    ${meter ? `<div class="momentum-stages">${meter}</div>` : ""}
    ${chips ? `<div class="momentum-chips">${chips}</div>` : ""}
    ${route}
    ${settlements ? `<div class="momentum-settlements">${settlements}</div>` : ""}
  `;
}

function buildMomentStickerFromEvent(event) {
  const action = event?.action || "";
  const extra = event?.extra || {};
  const tone = reactionToneForAction(action);
  if (action === "summon") {
    const card = allCards.find((item) => item.name === (extra.cardName || event.target)) || null;
    const role = inferCardRole(card);
    return {
      key: `summon:${event.step}:${event.target}`,
      tone: role.tone || "support",
      label: "新选手进灯",
      title: event.target || extra.cardName || "刚落地",
      note: role.label,
    };
  }
  if (action === "attack_creature_kill" || action === "attack_creature_pressure_kill") {
    return {
      key: `${action === "attack_creature_pressure_kill" ? "pressure-kill" : "kill"}:${event.step}:${extra.attackerCard || event.actor}`,
      tone,
      label: action === "attack_creature_pressure_kill" ? "连续压退" : "一口带走",
      title: action === "attack_creature_pressure_kill" ? (event.target || extra.targetCard || "压退") : (extra.attackerCard || event.actor || "收头"),
      note: event.target || extra.targetCard || "目标退场",
    };
  }
  if (action === "attack_face" || action === "attack_face_guard" || action === "attack_face_guard_unstoppable") {
    return {
      key: `face:${event.step}:${extra.attackerCard || event.actor}`,
      tone,
      label: "血线施压",
      title: extra.attackerCard || event.actor || "冲脸",
      note: event.target || "有人掉血",
    };
  }
  if (action === "disaster_cast") {
    return {
      key: `disaster:${event.step}:${event.target}`,
      tone,
      label: "环境牌",
      title: event.target || "环境牌",
      note: laneLabel(extra.lane || "") || "炸场成功",
    };
  }
  if (action === "quest_complete") {
    return {
      key: `quest:${event.step}:${event.target}`,
      tone,
      label: "合法离谱",
      title: event.target || "骚操作",
      note: extra.rewardType ? `奖励 ${extra.rewardType}` : "自动领奖",
    };
  }
  if (action === "hype_reward") {
    return {
      key: `hype:${event.step}:${extra.threshold || 0}`,
      tone,
      label: "观众买账",
      title: extra.rewardLabel || "喝彩奖励",
      note: `${extra.threshold || HYPE_THRESHOLDS[0]} 热度线`,
    };
  }
  if (typeof action === "string" && action.startsWith("skill")) {
    return {
      key: `skill:${event.step}:${event.target}`,
      tone,
      label: "绝活亮相",
      title: event.target || extra.attackerCard || "技能已开",
      note: showtimeReplayBadge(action),
    };
  }
  if (action === "move") {
    return {
      key: `move:${event.step}:${extra.cardName || event.target}`,
      tone,
      label: "偷偷绕后",
      title: extra.cardName || event.target || "换线成功",
      note: laneLabel(extra.toLane || extra.lane || "") || "走位",
    };
  }
  if (action === "winner") {
    return {
      key: `winner:${event.step}:${event.actor}`,
      tone: "reward",
      label: "本局主角",
      title: event.actor || "拿下了",
      note: `击败 ${event.target || "对手"}`,
    };
  }
  return null;
}

function currentMomentStickers(limit = 4, scope = game?.winner === null ? "turn" : "match") {
  if (!game) return [];
  const source = [...game.history].reverse().filter((event) => {
    if (!isSpotlightAction(event.action)) return false;
    if (scope === "turn" && event.turn !== game.turn) return false;
    if (["end_turn", "guard_prompt", "creature_guard_prompt"].includes(event.action)) return false;
    return true;
  });
  const seen = new Set();
  const stickers = [];
  for (const event of source) {
    const sticker = buildMomentStickerFromEvent(event);
    if (!sticker) continue;
    const dedupeKey = `${sticker.label}:${sticker.title}`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);
    stickers.push(sticker);
    if (stickers.length >= limit) break;
  }
  return stickers;
}

function renderMomentRack() {
  if (!els.momentRack) return;
  const stickers = currentMomentStickers();
  els.momentRack.classList.toggle("hidden", stickers.length === 0);
  els.momentRack.innerHTML = stickers
    .map((sticker) => `
      <div class="moment-card tone-${escapeHtml(sticker.tone || "support")}">
        <span class="moment-card-label">${escapeHtml(sticker.label || "")}</span>
        <strong class="moment-card-title">${escapeHtml(sticker.title || "")}</strong>
        <span class="moment-card-note">${escapeHtml(sticker.note || "")}</span>
      </div>
    `)
    .join("");
}

function buildMatchMVP() {
  if (!game?.history?.length) return null;
  const scores = new Map();
  game.history.forEach((event) => {
    const action = event.action || "";
    const extra = event.extra || {};
    const add = (name, amount) => {
      if (!name) return;
      scores.set(name, (scores.get(name) || 0) + amount);
    };
    if (action === "summon") add(event.target || extra.cardName, 1);
    if (typeof action === "string" && action.startsWith("skill")) add(event.target || extra.attackerCard, 2);
    if (action === "move") add(extra.cardName || event.target, 1);
    if (action === "attack_face" || action === "attack_face_guard" || action === "attack_face_guard_unstoppable") add(extra.attackerCard || event.actor, 2);
    if (action === "attack_creature_kill" || action === "attack_creature_pressure_kill") add(extra.attackerCard || event.actor, 3);
    if (action === "attack_creature_injure" || action === "attack_creature_venom") add(extra.attackerCard || event.actor, 2);
    if (action === "quest_complete" || action === "hype_reward") add(event.actor, 1);
  });
  if (!scores.size) return null;
  return [...scores.entries()].sort((a, b) => b[1] - a[1])[0];
}

function summarizeMatchActionMix() {
  const mix = {
    summons: 0,
    faceHits: 0,
    kills: 0,
    disasters: 0,
    skills: 0,
    moves: 0,
    rewards: 0,
    quests: 0,
  };
  if (!game?.history?.length) return mix;
  game.history.forEach((event) => {
    const action = event.action || "";
    if (action === "summon") mix.summons += 1;
    if (action === "attack_face" || action === "attack_face_guard" || action === "attack_face_guard_unstoppable") mix.faceHits += 1;
    if (action === "attack_creature_kill" || action === "attack_creature_pressure_kill") mix.kills += 1;
    if (action === "disaster_cast") mix.disasters += 1;
    if (typeof action === "string" && action.startsWith("skill")) mix.skills += 1;
    if (action === "move") mix.moves += 1;
    if (action === "hype_reward") mix.rewards += 1;
    if (action === "quest_complete") mix.quests += 1;
  });
  return mix;
}

function buildMatchFlavorSummary() {
  if (!game) return null;
  const mix = summarizeMatchActionMix();
  const mvp = buildMatchMVP();
  const stickers = currentMomentStickers(6, "match");
  const finale = [...game.history].reverse().find((event) => event.action !== "winner") || null;
  let archetype = "正常里带点离谱局";
  if (mix.disasters >= 2 && (mix.kills >= 1 || mix.rewards >= 1)) archetype = "天灾综艺局";
  else if (mix.moves + mix.skills >= 4) archetype = "老六绕后局";
  else if (mix.faceHits >= 3) archetype = "贴脸催命局";
  else if (mix.kills >= 3) archetype = "收头教学局";
  else if (mix.rewards + mix.quests >= 3) archetype = "观众买账局";
  else if (mix.summons >= 6) archetype = "群演挤满局";
  const seed = `${game.matchId}:${archetype}:${game.turn}:${game.history.length}`;
  const review = stablePickByKey([
    `${archetype}，很难装成一局普通对局。`,
    `${archetype}，这桌从中盘开始就没人打算讲道理。`,
    `${archetype}，适合导出给朋友看完再互相阴阳两句。`,
  ], seed);
  return {
    archetype,
    review,
    finale: finale ? logTitleForEvent(finale) : "",
    mvp: mvp ? { name: mvp[0], score: mvp[1] } : null,
    stickers,
    mix,
  };
}

function buildWinnerSummary() {
  if (!game || game.winner === null) return null;
  const winner = game.players[game.winner];
  const loser = game.players.find((player) => player.id !== winner.id);
  const finale = [...game.history].reverse().find((event) => event.action !== "winner") || null;
  const flavor = buildMatchFlavorSummary();
  const mvp = flavor?.mvp ? [flavor.mvp.name, flavor.mvp.score] : null;
  const stickers = flavor?.stickers?.slice(0, 5) || currentMomentStickers(5, "match");
  const seed = `${game.matchId}:${winner.name}:${game.turn}:${game.history.length}`;
  const title = stablePickByKey([
    `${winner.name} 把这局演完了`,
    `${winner.name} 拿下整场镜头`,
    `${winner.name} 成了这桌的主角`,
  ], seed);
  const subtitle = finale
    ? `最后一拍是“${logTitleForEvent(finale)}”。${loser?.name || "对手"} 在这口之后彻底下台。`
    : `${winner.name} 把 ${loser?.name || "对手"} 顶下去了。`;
  const chips = [
    flavor?.archetype || "",
    `${winner.hp} 血存活`,
    `${winner.food} 食物收场`,
    `${game.turn} 回合`,
    `${game.history.length} 步`,
    mvp ? `MVP ${mvp[0]}` : "",
  ].filter(Boolean);
  const aside = vsAI && loser?.id === 1
    ? `${flavor?.review || ""} ${currentAIPersona().label} 这把已经记进本地战报，回头特别适合拿给朋友复盘。`.trim()
    : `${flavor?.review || ""} 这局战报已经自动存档，关键几步都还在下面的战斗日志里。`.trim();
  return {
    title,
    subtitle,
    chips,
    stickers,
    aside,
  };
}

function archiveToneForRecord(record) {
  const archetype = record?.flavorSummary?.archetype || "";
  if (archetype.includes("天灾") || archetype.includes("老六")) return "trick";
  if (archetype.includes("催命") || archetype.includes("收头")) return "attack";
  if (archetype.includes("买账")) return "reward";
  return "support";
}

function archiveOpponentLabel(record) {
  if (record?.mode !== "vs_ai") return "双人对局";
  const persona = personaById(record?.aiPersona || "steady");
  return `AI ${persona.label}`;
}

function buildArchiveShelfEntries(limit = 3) {
  return savedArchive
    .filter((record) => record && typeof record === "object")
    .slice(0, limit)
    .map((record, index) => {
      const flavor = record?.flavorSummary || {};
      const mvpName = flavor?.mvp?.name || "";
      const stickerLabels = Array.isArray(flavor?.stickers)
        ? flavor.stickers
            .map((sticker) => sticker?.label || sticker?.title || "")
            .filter(Boolean)
            .slice(0, 2)
        : [];
      const fresh = !!(game?.saved && record.id === game.matchId);
      return {
        key: record.id || `${record.winner || "match"}:${index}`,
        tone: archiveToneForRecord(record),
        badge: fresh ? "刚存好" : index === 0 ? "最近上头局" : index === 1 ? "上一局" : "再往前一局",
        title: flavor.archetype || "正常里带点离谱局",
        meta: `${record.winner || "未完"} · ${record.turns || 0} 回合 · ${record.steps || 0} 步`,
        detail: flavor.finale ? `片尾：${flavor.finale}` : flavor.review || "这局已经被塞进本地战报了。",
        chips: [
          archiveOpponentLabel(record),
          mvpName ? `MVP ${mvpName}` : "",
          ...stickerLabels,
        ].filter(Boolean).slice(0, 4),
      };
    });
}

function renderArchiveShelf() {
  if (!els.archiveShelf) return;
  const quiet = shouldQuietOpeningIntel();
  const cards = buildArchiveShelfEntries();
  if (quiet) {
    const top = cards[0] || null;
    els.archiveShelf.innerHTML = `
      <div class="archive-shelf-head">
        <strong>最近上头局</strong>
        <span>${savedArchive.length > 0 ? `已存 ${savedArchive.length} 局` : "先开打"}</span>
      </div>
      <div class="archive-empty is-opening-peek">
        ${top
          ? `旧局都还在。最近那局是“${escapeHtml(top.title || "正常里带点离谱局")}”，先把眼前这手打完，回头再翻旧账。`
          : "先把这一局打起来，打完这里才会开始自动入柜。"}
      </div>
    `;
    return;
  }
  if (!cards.length) {
    els.archiveShelf.innerHTML = `
      <div class="archive-shelf-head">
        <strong>最近上头局</strong>
        <span>自动入柜</span>
      </div>
      <div class="archive-empty">
        一局打完就会自动塞进这里。最适合回头翻的，通常都是那种天灾综艺局和贴脸催命局。
      </div>
    `;
    return;
  }
  const cardHtml = cards.map((card) => {
    const chips = (card.chips || [])
      .map((chip) => `<span class="archive-chip">${escapeHtml(chip)}</span>`)
      .join("");
    return `
      <article class="archive-card tone-${escapeHtml(card.tone || "support")}">
        <div class="archive-card-head">
          <span class="archive-badge">${escapeHtml(card.badge || "战报")}</span>
          <span class="archive-meta">${escapeHtml(card.meta || "")}</span>
        </div>
        <strong class="archive-title">${escapeHtml(card.title || "")}</strong>
        <div class="archive-detail">${escapeHtml(card.detail || "")}</div>
        ${chips ? `<div class="archive-chips">${chips}</div>` : ""}
      </article>
    `;
  }).join("");
  els.archiveShelf.innerHTML = `
    <div class="archive-shelf-head">
      <strong>最近上头局</strong>
      <span>已存 ${savedArchive.length} 局</span>
    </div>
    <div class="archive-grid">${cardHtml}</div>
  `;
}

function renderRecordStatus() {
  const canSave = canUseStorage();
  const persona = currentAIPersona();
  const quiet = shouldQuietOpeningIntel();
  const savedText = canSave ? `本地已存 ${savedArchive.length} 局` : "当前环境不能自动存档";
  const liveText = game
    ? game.winner !== null && game.saved
      ? " · 本局已自动存好"
      : game.winner !== null
        ? " · 本局可手动导出"
        : " · 本局结束后会自动存"
    : "";
  els.saveStatus.textContent = `${savedText}${liveText}`;
  if (els.logPanel) els.logPanel.classList.toggle("is-opening-peek", quiet);
  const recap = quiet ? buildOpeningIntelPeek(canSave, persona) : buildRecordRecap(canSave, persona);
  const chips = (recap.chips || [])
    .filter(Boolean)
    .map((chip) => `<span class="record-recap-chip">${escapeHtml(chip)}</span>`)
    .join("");
  els.recordBlurb.innerHTML = `
    <div class="record-recap tone-${recap.tone || "support"}${quiet ? " is-opening-peek" : ""}">
      <div class="record-recap-head">
        <span class="record-recap-badge">${escapeHtml(recap.badge || "战报摘要")}</span>
        <span class="record-recap-meta">${escapeHtml(recap.meta || "")}</span>
      </div>
      <strong class="record-recap-title">${escapeHtml(recap.title || "")}</strong>
      <div class="record-recap-detail">${escapeHtml(recap.detail || "")}</div>
      ${chips ? `<div class="record-recap-chips">${chips}</div>` : ""}
      <div class="record-recap-next">${escapeHtml(recap.next || "")}</div>
      <div class="record-recap-aside">${escapeHtml(recap.aside || "")}</div>
    </div>
  `;
}

function renderDisasterPanel() {
  const player = activePlayer();
  const disaster = currentTurnDisaster(player);
  const plan = disasterVictimPlan(player, disaster);
  const readyError = disasterReadyError(player, disaster, plan);
  const swing = disasterSwing(plan);
  if (!els.disasterCard || !els.disasterMeta || !els.disasterTip) return;

  if (!disaster) {
    const readyError = disasterReadyError(player, null, null);
    els.disasterMeta.textContent = player.turnDisasterUsed ? "这回合已抽过环境" : `${player.name} 的暗置环境牌`;
    els.disasterCard.innerHTML = `
      <div class="disaster-head">
        <strong class="disaster-name">暗置环境牌</strong>
        <span class="disaster-cost">-${disasterCost(null)}</span>
      </div>
      <div class="disaster-tags">
        <span class="lane-chip neutral">随机</span>
        <span class="lane-chip neutral">抽到自动发动</span>
        <span class="lane-chip neutral">${player.turnDisasterUsed ? "本回合已抽" : "本回合可抽"}</span>
      </div>
      <p class="disaster-effect">先付费抽 1 张环境牌。抽到后立即按牌面空间自动结算，可能命中，也可能空响。</p>
    `;
    els.disasterTip.textContent = readyError || `固定花费 ${disasterCost(null)} 食物；抽之前不会知道是哪一张。`;
    return;
  }

  const count = disasterKillCount(disaster);
  const lane = disasterLaneKey(disaster);
  const laneClass = `lane-${lane}`;
  const ownVictims = plan?.ownVictims?.map((loc) => loc.card.name).join("、") || "暂无";
  const enemyVictims = plan?.enemyVictims?.map((loc) => loc.card.name).join("、") || "暂无";
  els.disasterMeta.textContent = `${player.name} 本回合抽到的环境牌`;
  els.disasterCard.innerHTML = `
    <div class="disaster-head">
      <strong class="disaster-name">${disaster["卡名"]}</strong>
      <span class="disaster-cost">-${disasterCost(disaster)}</span>
    </div>
    <div class="disaster-tags">
      <span class="lane-chip ${laneClass}">${disasterLaneLabel(disaster)}</span>
      <span class="lane-chip neutral">${count === Infinity ? "全灭" : `各倒 ${count}`}</span>
      <span class="lane-chip neutral">${player.turnDisasterUsed ? "已自动发动" : "未发动"}</span>
    </div>
    <p class="disaster-effect">${disasterPreview(disaster)}</p>
  `;
  els.disasterTip.textContent = `本回合抽到的是《${disaster["卡名"]}》。己方倒：${ownVictims}；对面倒：${enemyVictims}。`;
}

function renderQuestPanel() {
  if (!els.questCard || !els.questMeta || !els.questTip) return;
  const player = activePlayer();
  const quest = currentTurnQuest(player);
  if (!quest) {
    els.questMeta.textContent = "这回合先发育";
    els.questCard.className = "quest-card empty";
    els.questCard.innerHTML = `
      <div class="quest-head">
        <strong class="quest-name">暂无骚操作任务</strong>
        <span class="quest-reward">休整</span>
      </div>
      <p class="quest-effect">这一回合先铺场、补牌或攒食物。等你有更好的操作空间，任务会自动冒出来。</p>
    `;
    els.questTip.textContent = "骚操作任务会在你这回合有明确可做的 combo 时自动出现，完成后立即发奖励。";
    return;
  }

  els.questMeta.textContent = quest.completed ? "已自动领奖" : `${player.name} 的本回合支线`;
  els.questCard.className = `quest-card ${quest.completed ? "completed" : "active"}`;
  els.questCard.innerHTML = `
    <div class="quest-head">
      <strong class="quest-name">${quest.title}</strong>
      <span class="quest-reward">${quest.rewardLabel}</span>
    </div>
    <div class="quest-tags">
      <span class="lane-chip neutral">${quest.completed ? "已完成" : "进行中"}</span>
      <span class="lane-chip neutral">自动结算</span>
    </div>
    <p class="quest-effect">${quest.note}</p>
  `;
  els.questTip.textContent = quest.completed
    ? "奖励已经自动发到手里了，这回合可以继续追击。"
    : "不用额外点按钮，条件一满足就会自动结算奖励。";
}

function renderHypePanel() {
  if (!els.hypeMeta || !els.hypeFill || !els.hypeTip || !els.hypeBox || !els.hypeAlert) return;
  const player = activePlayer();
  const moment = currentHypeMoment(player);
  const rewardSteps = buildHypeRewardSteps(player, moment);
  const current = moment.current;
  const max = moment.max;
  const nextThreshold = moment.nextThreshold;
  const fillPercent = Math.max(0, Math.min(100, Math.round((current / max) * 100)));
  els.hypeMeta.textContent = `${current} / ${max}`;
  els.hypeFill.style.width = `${fillPercent}%`;
  els.hypeBox.classList.toggle("near-reward", !!moment.near && !moment.crosses && !moment.maxed);
  els.hypeBox.classList.toggle("jackpot-ready", !!moment.crosses && !moment.maxed);
  els.hypeBox.classList.toggle("maxed", !!moment.maxed);
  const rewardRailMarkup = rewardSteps.length
    ? `
      <div class="hype-reward-rail">
        ${rewardSteps.map((step) => `
          <article class="hype-reward-step tone-${escapeHtml(step.tone || "support")} is-${escapeHtml(step.state || "future")}">
            <div class="hype-reward-step-head">
              <span class="hype-reward-badge">${escapeHtml(step.badge || "")}</span>
              <span class="hype-reward-status">${escapeHtml(step.status || "")}</span>
            </div>
            <strong class="hype-reward-title">${escapeHtml(step.title || "")}</strong>
            ${step.detail ? `<span class="hype-reward-detail">${escapeHtml(step.detail)}</span>` : ""}
          </article>
        `).join("")}
      </div>
    `
    : "";

  if (current >= max) {
    els.hypeAlert.textContent = "全场起立";
    els.hypeTip.innerHTML = `
      <div class="hype-tip-copy">这回合已经把观众喊起来了，后面再整活就是纯图节目效果。</div>
      ${rewardRailMarkup}
    `;
    return;
  }
  if (moment.crosses) {
    els.hypeAlert.textContent = `这一手就掉“${moment.reward?.label || "喝彩奖励"}”`;
    els.hypeTip.innerHTML = `
      <div class="hype-tip-copy">当前第一手做完就能过 ${moment.nextThreshold} 热度线。现在最适合顺手连招。</div>
      ${rewardRailMarkup}
    `;
    return;
  }
  if (moment.near) {
    els.hypeAlert.textContent = `差 ${moment.remaining} 点就开闹`;
    els.hypeTip.innerHTML = `
      <div class="hype-tip-copy">再来 ${moment.remaining} 点热度，就会掉“${moment.reward?.label || "喝彩奖励"}”。台下已经开始催了。</div>
      ${rewardRailMarkup}
    `;
    return;
  }
  if (nextThreshold) {
    const reward = moment.reward || hypeRewardForTier(player, nextThreshold);
    const remaining = nextThreshold - current;
    els.hypeAlert.textContent = "热场中";
    els.hypeTip.innerHTML = `
      <div class="hype-tip-copy">技能、击杀、环境牌和连招会涨热度。再来 ${remaining} 点，就能触发“${reward.label}”。</div>
      ${rewardRailMarkup}
    `;
    return;
  }
  els.hypeAlert.textContent = "热场中";
  els.hypeTip.innerHTML = `
    <div class="hype-tip-copy">热度每回合重置，别怕乱秀。</div>
    ${rewardRailMarkup}
  `;
}

function renderShowtimePanel() {
  if (!els.showtimeMeta || !els.showtimeScore || !els.showtimeTitle || !els.showtimeChips || !els.showtimeTip || !els.showtimeRewards || !els.showtimeRewardsWrap || !els.showtimeReplay || !els.showtimeReplayWrap) return;
  const player = activePlayer();
  const summary = buildShowtimeSummary(player);
  const scoreSummary = summary.scoreSummary || buildShowtimeScoreSummary(player);
  const forecast = buildShowtimeForecast(player, summary);
  const quietFreshReplay = !!currentFreshActionStingerEvent() && currentTurnShowtimeEvents(player).length <= 1;
  const bonusMarkup = (scoreSummary.bonuses || [])
    .map((item) => `<span class="showtime-score-bonus tone-${escapeHtml(item.tone || "support")}">${escapeHtml(item.label)}</span>`)
    .join("");
  els.showtimeMeta.textContent = summary.meta;
  els.showtimeScore.innerHTML = `
    <div class="showtime-score-card tone-${escapeHtml(scoreSummary.rank?.tone || "support")}">
      <div class="showtime-score-main">
        <span class="showtime-score-label">节目分</span>
        <strong class="showtime-score-value">${escapeHtml(String(scoreSummary.score || 0))}</strong>
      </div>
      <div class="showtime-score-copy">
        <strong class="showtime-score-rank">评级：${escapeHtml(scoreSummary.rank?.label || "热身")}</strong>
        <span class="showtime-score-detail">${escapeHtml(scoreSummary.detail || "0 手串烧")}</span>
        <span class="showtime-score-note">${escapeHtml(scoreSummary.note || "")}</span>
      </div>
      ${bonusMarkup ? `<div class="showtime-score-bonuses">${bonusMarkup}</div>` : ""}
    </div>
  `;
  els.showtimeTitle.textContent = summary.title;
  const forecastMarkup = (forecast?.items || [])
    .map((item) => `<span class="showtime-tip-chip tone-${escapeHtml(item.tone || "support")}">${escapeHtml(item.label || "")}</span>`)
    .join("");
  els.showtimeTip.innerHTML = `
    <div class="showtime-tip-head">
      <strong>${escapeHtml(forecast?.title || "先开一手")}</strong>
      <span>${escapeHtml(forecast?.detail || summary.tip || "")}</span>
    </div>
    ${forecastMarkup ? `<div class="showtime-tip-forecast">${forecastMarkup}</div>` : ""}
  `;
  els.showtimeChips.innerHTML = "";
  els.showtimeRewards.innerHTML = "";
  els.showtimeReplay.innerHTML = "";
  els.showtimeRewardsWrap.classList.toggle("hidden", !(summary.rewards || []).length);
  els.showtimeReplayWrap.classList.toggle("hidden", quietFreshReplay || !(summary.replay || []).length);

  if (!summary.chips.length) {
    const chip = document.createElement("span");
    chip.className = "showtime-chip tone-support";
    chip.textContent = "热场中";
    els.showtimeChips.appendChild(chip);
  } else {
    summary.chips.forEach((item) => {
      const chip = document.createElement("span");
      chip.className = `showtime-chip tone-${item.tone || "support"}`;
      chip.textContent = item.label;
      els.showtimeChips.appendChild(chip);
    });
  }

  (summary.rewards || []).forEach((item) => {
    const chip = document.createElement("span");
    chip.className = `showtime-drop tone-${item.tone || "reward"}`;
    chip.textContent = item.label;
    chip.title = item.flavor || item.headline || item.label;
    els.showtimeRewards.appendChild(chip);
  });

  if (!quietFreshReplay) {
    (summary.replay || []).forEach((item) => {
      const card = document.createElement("div");
      card.className = `showtime-replay-card tone-${item.tone || "support"}`;
      const chips = (item.chips || [])
        .map((chip) => `<span class="showtime-replay-chip">${escapeHtml(chip)}</span>`)
        .join("");
      card.innerHTML = `
        <div class="showtime-replay-head">
          <span class="showtime-replay-badge">${escapeHtml(item.badge || "回放")}</span>
          <strong>${escapeHtml(item.title || "")}</strong>
        </div>
        <div class="showtime-replay-detail">${escapeHtml(item.detail || "")}</div>
        ${chips ? `<div class="showtime-replay-chips">${chips}</div>` : ""}
      `;
      els.showtimeReplay.appendChild(card);
    });
  }
}

function renderPlaybookPanel() {
  if (!els.playbookList || !els.playbookMeta || !els.playbookTip) return;
  const suggestions = buildPlaybookSuggestions();
  const persona = currentAIPersona();
  const cue = activeOpeningCue(activePlayer());
  const first = suggestions[0] || null;
  const openingSpotlight = shouldSpotlightOpeningPrimary(activePlayer(), first);
  const hypeMoment = currentHypeMoment(activePlayer(), first);
  const compress = shouldCompressOpeningPlaybook(activePlayer(), suggestions);
  const expanded = !compress || isPlaybookPeekExpanded(activePlayer(), suggestions);
  const shownSuggestions = compress && !expanded ? suggestions.slice(0, 1) : suggestions;
  if (els.stageDeck) els.stageDeck.classList.toggle("is-opening-muted", false);
  els.playbookList.innerHTML = "";

  if (isOnlineMode() && !onlineCanControlCurrentDecision()) {
    els.playbookMeta.textContent = onlineSession.conn?.open ? "等对方行动" : "在线连接中";
    els.playbookTip.textContent = onlineWaitingDetail();
  } else if (pendingDefense) {
    els.playbookMeta.textContent = "现在先处理防守";
    els.playbookTip.textContent = "这里给的是偏保守建议，你也可以故意承伤或放掉动物赌后手。";
  } else if (vsAI && game.active === 1) {
    const beat = buildAIDirectorBeat(activePlayer());
    els.playbookMeta.textContent = `对面正在演 · ${beat.badge || persona.label}`;
    els.playbookTip.textContent = beat.tell
      ? `${beat.detail || `${persona.blurb} 看日志就能看出它这局想怎么搞事。`} ${beat.tell}`.trim()
      : (beat.detail || `${persona.blurb} 看日志就能看出它这局想怎么搞事。`);
  } else {
    if (!first) {
      els.playbookMeta.textContent = "先自己想一手";
      els.playbookTip.textContent = "如果你想自己试怪招，也完全可以无视这些备选动作。";
    } else if (cue?.id === "pocket" && first.kind === "draw_private") {
      els.playbookMeta.textContent = "可以先翻口袋";
      els.playbookTip.textContent = "这手起手更像在等下一张。先补牌，后面通常会马上刷出更像样的路线。";
    } else if (cue?.id === "waterline" && first.kind === "summon") {
      els.playbookMeta.textContent = "可以先把水线立起来";
      els.playbookTip.textContent = "前两回合先吃住水位，后面的食物节奏和埋伏空间都会舒服很多。";
    } else if (cue?.id === "highground" && first.kind === "summon") {
      els.playbookMeta.textContent = "可以先把高位站住";
      els.playbookTip.textContent = "先把天空位拿下来，很多冲脸和压制路线会自己亮出来。";
    } else if (cue?.id === "landrush" && first.kind === "summon") {
      els.playbookMeta.textContent = "可以先铺陆地正面";
      els.playbookTip.textContent = "先把陆地人数和身位站稳，这把更像靠正面推场去赢。";
    } else if (first.ribbon === "任务线") {
      els.playbookMeta.textContent = "这手做完能领奖";
      els.playbookTip.textContent = "这手做完奖励会立刻落袋，后面通常还能继续演。";
    } else if (first.ribbon === "冲奖") {
      els.playbookMeta.textContent = "观众在拱你再闹一下";
      els.playbookTip.textContent = "这手多半能把热度顶过线，台下已经准备扔奖励了。";
    } else if (first.kind === "summon") {
      els.playbookMeta.textContent = "可以先把场面支起来";
      els.playbookTip.textContent = `先把《${cardNameFromUid(first.cardUid, "这只动物")}》落下，后面的打法会顺很多。桌面端按空格也能直接走第一手。`;
    } else if (first.kind === "disaster") {
      els.playbookMeta.textContent = "环境牌现在有窗口";
      els.playbookTip.textContent = "这把的环境暗抽看起来不只是热闹，多半还能顺手赚钱。";
    } else if (first.kind === "skill") {
      els.playbookMeta.textContent = "特技现在有窗口";
      els.playbookTip.textContent = "先把特技甩出来，很多时候热度和任务会一起亮。";
    } else if (first.kind === "attack_face" || first.kind === "move_attack_face") {
      els.playbookMeta.textContent = "可以压血线";
      els.playbookTip.textContent = "这种时候突然冲脸，往往比老老实实交换更有节目。";
    } else if (first.kind === "attack_creature" || first.kind === "move_attack_creature") {
      els.playbookMeta.textContent = "可以先抢场面";
      els.playbookTip.textContent = "先把对面的关键怪按住，后面很多怪招都会更安全。";
    } else if (first.kind === "draw_private") {
      els.playbookMeta.textContent = "可以先翻翻家底";
      els.playbookTip.textContent = "很多离谱操作，开头都长得像先摸一张。";
    } else if (first.kind === "end_turn") {
      els.playbookMeta.textContent = "这回合可以先别贪";
      els.playbookTip.textContent = "没必要为了热闹硬送节奏，留资源给下一轮也很体面。";
    } else {
      els.playbookMeta.textContent = "这几手现在较顺";
      els.playbookTip.textContent = "这些按钮都是可选捷径，不会替你锁死打法。桌面端按空格也能直接走第一手。";
    }
  }

  if (compress && !expanded) {
    const route = openingFastTrackRoute(first);
    els.playbookTip.textContent = route
      ? `第一把先别看满屏，就照最上面：${route}。`
      : "第一把先盯最上面这一手就够了。想自己比路线，再点下面那条备选开关。";
  } else if (compress && expanded) {
    const route = openingFastTrackRoute(first);
    els.playbookTip.textContent = route
      ? `最上面这手仍然最直接：${route}。下面两手只是给你横着比一眼。`
      : "最上面这手最直接，下面两手是给你横向比一眼的，不用每次都全看完。";
  }

  if (!suggestions.length) {
    const empty = document.createElement("div");
    empty.className = "playbook-empty";
    empty.textContent = isOnlineMode() && !onlineCanControlCurrentDecision()
      ? "等对方操作完，这里会自动刷新。"
      : "这回合没有特别明显的标准答案。";
    els.playbookList.appendChild(empty);
    return;
  }

  shownSuggestions.forEach((suggestion, index) => {
    const button = document.createElement("button");
    const payoffMarkup = payoffChipMarkup(buildSuggestionPayoffChips(activePlayer(), suggestion));
    button.type = "button";
    button.className = `playbook-item ${index === 0 ? "primary" : "secondary"}`;
    if (suggestion.ribbon === "冲奖") button.classList.add("hype-call");
    if (index === 0 && hypeMoment?.crosses) button.classList.add("jackpot-ready");
    button.title = suggestion.title || suggestion.note || suggestion.label;
    button.disabled = game.winner !== null || aiThinking || (vsAI && game.active === 1 && !pendingDefense);
    button.innerHTML = `
      <div class="playbook-item-head">
        <strong>${suggestion.label}</strong>
        <span>${playbookBadgeText(suggestion, index)}</span>
      </div>
      ${payoffMarkup ? `<div class="playbook-item-payoff payoff-strip">${payoffMarkup}</div>` : ""}
      <div class="playbook-item-note">${suggestion.note || "这步现在通常不亏。"}</div>
    `;
    button.addEventListener("click", () => {
      if (button.disabled) return;
      if (onlineMaybeSendAction({ kind: "playbook", suggestion })) return;
      const ok = runPlaybookSuggestion(suggestion);
      if (ok) onlineAfterHostAction("playbook");
    });
    els.playbookList.appendChild(button);
  });

  if (compress) {
    const moreBtn = document.createElement("button");
    const hiddenCount = Math.max(0, suggestions.length - 1);
    moreBtn.type = "button";
    moreBtn.className = `playbook-more ${expanded ? "expanded" : "collapsed"}`;
    moreBtn.innerHTML = `
      <strong>${expanded ? "收起备选" : `再看 ${hiddenCount} 手备选`}</strong>
      <span>${expanded ? "先把第一手想清楚，别被备选卡住节奏。" : "第一把先别让太多建议同时开麦。"}</span>
    `;
    moreBtn.addEventListener("click", () => {
      setPlaybookPeekExpanded(!expanded, activePlayer(), suggestions);
      renderPlaybookPanel();
    });
    els.playbookList.appendChild(moreBtn);
  }
}

function renderActionDock() {
  if (!els.actionResourceBand || !els.actionTacticsBand || !els.actionPressureBand || !els.actionDefenseBand) return;
  const player = activePlayer();
  const enemy = opponentPlayer();
  const selectedHand = currentSelectedHand(player);
  const selectedBoard = currentSelectedBoard(player);
  const openingSuggestion = currentPrimarySuggestion();
  const openingSpotlight = shouldSpotlightOpeningPrimary(player, openingSuggestion);
  const ownBoardCount = boardCards(player).length;
  const reactionMode = canHumanResolveDefense();
  const guardDefender = defendingPlayer();
  const focus = currentRouteFocus();
  const actionSpotlight = !openingSpotlight ? currentActionButtonSpotlight(player, focus) : null;
  const legalTargets = selectedBoard ? legalCreatureTargets(selectedBoard, enemy) : [];
  const attackShortcut = selectedBoard ? creatureAttackShortcutState(selectedBoard, enemy) : null;
  const faceCost = selectedBoard ? faceAttackCost(selectedBoard.card, enemy) : 0;
  const skillReady = selectedBoard && !activeSkillReadyError(player, selectedBoard.card);
  const moveReady = selectedBoard && moveReadyError(player, selectedBoard) === "";
  const attackReady = selectedBoard && legalTargets.length > 0;
  const openingCompact = !reactionMode && ownBoardCount === 0;
  const openBand = currentMobileActionBand({ player, focus, reactionMode });
  const setBandLock = (element, message = "", tone = "support") => {
    if (!element) return;
    if (!message) {
      element.className = "action-band-lock hidden";
      element.textContent = "";
      return;
    }
    element.className = `action-band-lock tone-${tone}`;
    element.textContent = message;
  };

  els.actionDefenseBand.classList.toggle("hidden", !reactionMode);
  els.actionDefenseBand.classList.toggle("is-reaction-decision", reactionMode);
  els.actionTacticsBand.classList.toggle("is-opening-compact", openingCompact);
  els.actionPressureBand.classList.toggle("is-opening-compact", openingCompact);
  [
    ["resource", els.actionResourceBand],
    ["tactics", els.actionTacticsBand],
    ["pressure", els.actionPressureBand],
    ["defense", els.actionDefenseBand],
  ].forEach(([band, element]) => {
    element.classList.toggle("route-focus", focus.band === band);
    element.classList.toggle("has-cta-spotlight", actionSpotlight?.band === band);
    const visible = !(band === "defense" && !reactionMode);
    const isOpen = visible && band === openBand;
    const openingMuted = visible && openingSpotlight && band !== "defense" && (!focus.band || focus.band !== band);
    element.classList.toggle("mobile-open", isOpen);
    element.classList.toggle("mobile-collapsed", visible && !isOpen);
    element.classList.toggle("is-opening-muted", openingMuted);
    const head = typeof element.querySelector === "function"
      ? element.querySelector("[data-mobile-band-toggle]")
      : null;
    if (head) {
      head.dataset.mobileBandState = isOpen ? "open" : "closed";
      head.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
  });

  if (reactionMode) {
    const faceShortcut = pendingDefense?.kind === "face" ? faceDefenseShortcutState() : null;
    const creatureTarget = pendingDefense?.kind === "creature" ? defendingTargetCreature() : null;
    const creatureSnapshot = pendingDefense?.kind === "creature"
      ? creatureGuardSnapshot(attackerFromPendingDefense(), creatureTarget)
      : null;
    setBandLock(els.tacticsLock);
    setBandLock(els.pressureLock);
    els.resourceMeta.textContent = "先别补牌，只处理眼前这一口。";
    els.tacticsMeta.textContent = "中间两颗按钮就是全部选择。";
    els.pressureMeta.textContent = "结完这一口，进攻节奏会自己接回来。";
    if (pendingDefense?.kind === "creature") {
      els.defenseMeta.textContent = creatureSnapshot?.dies
        ? `玩家承受打击 -${pendingDefense.attackValue} 可保《${creatureTarget?.card?.name || "它"}》；否则它会退场。`
        : creatureSnapshot?.rests
          ? `玩家承受打击 -${pendingDefense.attackValue} 可保《${creatureTarget?.card?.name || "它"}》；否则它会进休息。`
          : `玩家承受打击可保住《${creatureTarget?.card?.name || "它"}》，也可以让动物承受伤害。`;
    } else {
      els.defenseMeta.textContent = faceShortcut?.blockerLoc?.card
        ? `动物格挡：《${faceShortcut.blockerLoc.card.name}》-${faceShortcut.guardCost}；玩家承受打击：-${pendingDefense.attackValue || 0}。`
        : `没有动物能格挡；只能玩家承受打击 -${pendingDefense.attackValue || 0}。`;
    }
    return;
  }

  if (isOnlineMode() && !onlineCanControlCurrentDecision()) {
    setBandLock(els.tacticsLock, onlineWaitingDetail(), "support");
    setBandLock(els.pressureLock, "对方行动时先观战，轮到你后按钮会自动亮。", "support");
    els.resourceMeta.textContent = onlineSession.conn?.open ? "在线同步中，等对方走完这一拍。" : onlineWaitingDetail();
    els.tacticsMeta.textContent = onlineWaitingDetail();
    els.pressureMeta.textContent = "轮到你时，选己方生物后这里会显示攻击选择。";
    els.defenseMeta.textContent = "只有轮到你防守时，这组才会亮。";
    return;
  }

  if (vsAI && game.active === 1) {
    const watch = buildAIPreviewState(player);
    const suggestion = watch.suggestion;
    setBandLock(
      els.tacticsLock,
      suggestion
        ? "观战模式：这回合先别按按钮，盯桌上的“它先 / 它去 / 它打”黄标就行。"
        : "观战模式：先看它起手，桌面会在它露出路数后把重点圈出来。",
      watch.tone === "attack" ? "attack" : (watch.tone === "reward" || watch.tone === "hot" ? "reward" : "trick"),
    );
    setBandLock(
      els.pressureLock,
      suggestion && ["attack_face", "attack_creature", "move_attack_face", "move_attack_creature"].includes(suggestion.kind)
        ? "红框一亮，基本就是它准备下口的位置。"
        : "等它真准备咬人的时候，这组和棋盘会一起亮目标。",
      "attack",
    );
    els.defenseMeta.textContent = "只有它打到你或进入保护动物结算时，这组才会临时接管。";
    if (suggestion?.kind === "draw_private") {
      els.resourceMeta.textContent = "它这拍更像先补一张。手牌对你隐藏，所以盯资源变化和后续高亮更有用。";
    } else if (suggestion?.kind === "summon") {
      els.resourceMeta.textContent = "它这拍更像先补站场。别盯手牌，直接看哪格被圈出来。";
    } else {
      els.resourceMeta.textContent = "现在是对手回合，这组主要帮你判断它更像补牌还是补场。";
    }
    if (["disaster", "skill", "move", "move_attack_face", "move_attack_creature", "recover", "sacrifice"].includes(suggestion?.kind)) {
      els.tacticsMeta.textContent = watch.detail || "这回合它更像先整活。";
    } else {
      els.tacticsMeta.textContent = "它如果准备开绝活、换线或抽环境牌，这组会先替你翻译成人话。";
    }
    if (["attack_face", "attack_creature", "move_attack_face", "move_attack_creature"].includes(suggestion?.kind)) {
      els.pressureMeta.textContent = watch.detail || "这回合它更像先往这边下口。";
    } else {
      els.pressureMeta.textContent = "它真要开咬时，红框和路线条会一起把目标指出来。";
    }
    return;
  }

  els.defenseMeta.textContent = "只有被打到脸或需要保护动物时，这组才会亮。";
  els.resourceMeta.textContent = player.hand.length >= 6
    ? "手牌已满，再抽会先拿进手里，然后由你选择弃掉 1 张。"
    : player.hand.length === 5
      ? "再补一张就满手，继续连抽前最好先想好谁要上桌。"
      : player.hand.length <= 2
        ? "手牌偏薄，先补一口通常最稳。"
        : `你现在有 ${player.food} 食物，补牌和囤货都从这组走。`;

  if (openingCompact) {
    setBandLock(
      els.tacticsLock,
      selectedHand
        ? `把《${selectedHand.card.name}》放上去，这组就开麦。`
        : player.hand.length
          ? "先让第一只动物进组，整活组再开麦。"
          : "先补牌找第一只动物，这组再开始整活。",
      "support",
    );
    setBandLock(
      els.pressureLock,
      selectedHand
        ? "落地以后，右边这组才会亮灯。"
        : "场上还没人，开打组先收麦。",
      "support",
    );
  } else {
    setBandLock(els.tacticsLock);
    setBandLock(els.pressureLock);
  }

  if (selectedHand) {
    els.tacticsMeta.textContent = `已选《${selectedHand.card.name}》。这会儿别找按钮，直接去点棋盘发亮空格。`;
    els.pressureMeta.textContent = "生物先上桌，攻击线路才会亮起来。";
    return;
  }

  if (!selectedBoard) {
    els.tacticsMeta.textContent = "大多需要先点一只己方生物；环境牌除外。";
    els.pressureMeta.textContent = "先选一只己方生物，右边能打的目标才会亮。";
    return;
  }
  const focusedSuggestion = buildSelectedBoardPrimarySuggestion(player, selectedBoard, currentPrimarySuggestion());
  const focusedCue = focusedSuggestion
    ? buildSuggestionExcitementCues(player, focusedSuggestion, { limit: 1 })[0] || null
    : null;
  const targetPreviewMap = buildAttackTargetPreviewMap(selectedBoard, enemy);
  const bestTargetPreview = [...targetPreviewMap.values()].sort((a, b) => (b.score || 0) - (a.score || 0))[0] || null;
  const shortcutPressure = attackShortcut?.preview?.pressureLabel || "";
  const bestTargetPressure = bestTargetPreview?.pressureLabel || "";
  const creatureExcitementTail = focusedSuggestion?.kind === "attack_creature" && focusedCue ? ` 这口多半${excitementCueSentence(focusedCue)}。` : "";
  const faceReadyNow = canFaceAttackNow(player, selectedBoard.card, enemy);
  const facePreview = faceReadyNow ? faceAttackOutcomePreview(player, selectedBoard) : null;
  const faceBlockers = availableTaunts(enemy, selectedBoard.card);
  const faceBlockedReason = faceBlockers.length
    ? `对面有嘲讽，得先处理 ${faceBlockers[0].card.name}。`
    : faceAttackReadyError(player, selectedBoard.card, enemy);
  const faceBlockedShort = compactDisabledActionReason(faceBlockedReason);
  const faceExcitementTail = focusedSuggestion?.kind === "attack_face" && focusedCue ? ` 直接压出去多半${excitementCueSentence(focusedCue)}。` : "";

  if (skillReady) {
    els.tacticsMeta.textContent = `《${selectedBoard.card.name}》可放 ${selectedBoard.card.skill}，也能继续调位。${focusedSuggestion?.kind === "skill" && focusedCue ? ` 这拍多半${excitementCueSentence(focusedCue)}。` : ""}`.trim();
  } else if (moveReady) {
    els.tacticsMeta.textContent = `《${selectedBoard.card.name}》能换线，或者你也可以直接把它拿去开饭。${["move", "move_attack_face", "move_attack_creature"].includes(focusedSuggestion?.kind) && focusedCue ? ` 这条线多半${excitementCueSentence(focusedCue)}。` : ""}`.trim();
  } else if (selectedBoard.card.state === "rest") {
    els.tacticsMeta.textContent = `《${selectedBoard.card.name}》正在休息，花 1 食物能把它叫回场。`;
  } else {
    els.tacticsMeta.textContent = `当前锁定《${selectedBoard.card.name}》，这里能做的是恢复、献祭或取消选择。`;
  }

  if (attackReady) {
    els.pressureMeta.textContent = attackShortcut?.targetLoc
      ? attackShortcut.mode === "only"
        ? `《${selectedBoard.card.name}》现在只够得到《${attackShortcut.targetLoc.card.name}》，按下面按钮就能直接打出去。${shortcutPressure ? ` ${shortcutPressure}` : ""}${creatureExcitementTail}`.trim()
        : `《${selectedBoard.card.name}》这拍最顺手的目标是《${attackShortcut.targetLoc.card.name}》，你也可以直接点右侧目标。${shortcutPressure ? ` ${shortcutPressure}` : ""}${creatureExcitementTail}`.trim()
      : `《${selectedBoard.card.name}》现在够得到 ${legalTargets.length} 个目标，右侧会直接亮出来。${bestTargetPressure ? ` 最清楚的一口：${bestTargetPressure}` : ""}`.trim();
  } else if (faceReadyNow && facePreview) {
    els.pressureMeta.textContent = `冲脸按钮可用，花 ${faceCost} 食物。${facePreview.pressureLabel || facePreview.label}${faceExcitementTail}`.trim();
  } else {
    els.pressureMeta.textContent = faceBlockedShort
      ? `现在不能冲脸：${faceBlockedShort}。右边没亮时，先看整活、复工或换别的生物。${faceExcitementTail}`.trim()
      : `它打玩家要 ${faceCost} 食物；如果右边没亮，说明这只暂时够不到。${faceExcitementTail}`.trim();
  }
}

function renderActionButtons() {
  const player = activePlayer();
  const enemy = opponentPlayer();
  const selectedBoard = currentSelectedBoard(player);
  const disaster = currentTurnDisaster(player);
  const disasterPlan = disasterVictimPlan(player, disaster);
  const reactionMode = canHumanResolveDefense();
  const guardDefender = defendingPlayer();
  const guardBlocker = selectedGuardBlocker();
  const guardTarget = defendingTargetCreature();
  const faceDefenseShortcut = pendingDefense?.kind === "face" ? faceDefenseShortcutState() : null;
  const moveMode = selected?.type === "board" && selected?.uid === selectedBoard?.card?.uid && selected?.mode === "move";
  const onlineLocked = isOnlineMode() && !onlineCanControlCurrentDecision();
  const locked = !reactionMode && (game.winner !== null || aiThinking || !!pendingDiscard || (vsAI && game.active === 1) || onlineLocked);
  const lockedReason = onlineLocked
    ? onlineWaitingDetail()
    : pendingDiscard
      ? "先从手牌里选 1 张弃掉。"
      : aiThinking
        ? "AI 正在行动。"
        : (vsAI && game.active === 1)
          ? "AI 回合中，先观战。"
          : game.winner !== null
            ? "本局已经结束。"
            : "当前暂不可用。";
  const focus = currentRouteFocus();
  const actionSpotlight = currentActionButtonSpotlight(player, focus);

  document.querySelectorAll("[data-action]").forEach((button) => {
    const action = button.dataset.action;
    const buttonBand = actionBandKey(action);
    let disabled = locked;
    let label = action === "attackPlayer" ? faceAttackActionLabel() : button.textContent;
    let title = "";
    let detail = null;
    let buttonMarkup = "";
    const reactionChoice = reactionMode && ["confirmGuard", "letThrough"].includes(action);
    if (reactionMode) {
      if (action === "confirmGuard" && pendingDefense?.kind === "face") {
        const blocker = guardBlocker || faceDefenseShortcut?.blockerLoc || null;
        const guardCost = blocker ? faceBlockCost(guardDefender, blocker) : 0;
        disabled = blocker ? !!faceGuardReadyError(guardDefender, blocker) : true;
        label = blocker
          ? `动物格挡 · ${blocker.card.name} -${guardCost}`
          : "动物格挡 · 先选动物";
        title = blocker
          ? disabled
            ? faceGuardReadyError(guardDefender, blocker)
            : `${blocker.card.name} 会替玩家承受这次攻击。格挡费用等于它的防御力：${guardCost} 食物。`
          : "当前没有可格挡的动物。";
      } else if (action === "confirmGuard" && pendingDefense?.kind === "creature") {
        disabled = false;
        label = `玩家承受打击 · 保住${guardTarget?.card?.name || "它"} -${pendingDefense?.attackValue || 0}`;
        title = `由 ${guardDefender?.name || "玩家"} 自己掉血，保住 ${guardTarget?.card?.name || "目标生物"}，并无视这次攻击附带特技。`;
      } else if (action === "letThrough") {
        disabled = false;
        label = pendingDefense?.kind === "creature"
          ? `让动物承受伤害 · ${guardTarget?.card?.name || "它"}`
          : faceDefenseShortcut?.blockerLoc?.card
            ? `玩家承受打击 · -${pendingDefense?.attackValue || 0}`
            : `玩家承受打击 · -${pendingDefense?.attackValue || 0}`;
        title = pendingDefense?.kind === "creature" ? "不由玩家保护它，按普通战斗结算。" : "不派动物格挡，直接吃这下伤害。";
      } else {
        disabled = true;
      }
      detail = actionButtonDetailState(action, {
        reactionMode,
        guardDefender,
        guardBlocker,
        guardTarget,
        faceDefenseShortcut,
      });
    } else if (!locked) {
      if (action === "drawPrivate") {
        disabled = player.food < 1 || player.deck.length === 0;
        label = "抽自己牌 -1";
        buttonMarkup = drawButtonPreviewMarkup({
          label: "抽自己牌",
          cost: 1,
          count: player.deck.length,
          privateDeck: true,
        });
        title = disabled
          ? (player.deck.length === 0 ? "私有卡组已经空了。" : "需要至少 1 食物。")
          : player.hand.length >= 6
            ? "手牌已满，抽完会由你选择弃掉 1 张。"
            : player.hand.length === 5
              ? "从私有卡组补 1 张牌，抽完刚好满手。"
              : "从你的私有卡组补 1 张牌。";
      }
      if (action === "drawA") {
        const topCard = publicTopCard("A");
        disabled = player.food < 3 || game.publicPiles.A.length === 0;
        label = `抽A：${topCard?.name || "已空"} -3`;
        buttonMarkup = drawButtonPreviewMarkup({
          label: "抽 A 池",
          cost: 3,
          card: topCard,
          count: game.publicPiles.A.length,
          level: "A",
        });
        title = disabled
          ? (game.publicPiles.A.length === 0 ? "A 类公共牌抽空了。" : "需要 3 食物。")
          : player.hand.length >= 6
            ? `手牌已满，抽到《${topCard?.name || "A 牌"}》后需要选择弃掉 1 张。${topCard ? ` ${spaceOf(topCard)} · ${topCard.atk}/${topCard.def}` : ""}`
            : player.hand.length === 5
              ? `高费强卡，抽到《${topCard?.name || "A 牌"}》后刚好满手。${topCard ? ` ${spaceOf(topCard)} · ${topCard.atk}/${topCard.def}` : ""}`
              : `公共 A 池顶牌是《${topCard?.name || "A 牌"}》。${topCard ? `${spaceOf(topCard)} · ${topCard.atk}/${topCard.def}。` : ""}爆发更猛。`;
      }
      if (action === "drawB") {
        const topCard = publicTopCard("B");
        disabled = player.food < 2 || game.publicPiles.B.length === 0;
        label = `抽B：${topCard?.name || "已空"} -2`;
        buttonMarkup = drawButtonPreviewMarkup({
          label: "抽 B 池",
          cost: 2,
          card: topCard,
          count: game.publicPiles.B.length,
          level: "B",
        });
        title = disabled
          ? (game.publicPiles.B.length === 0 ? "B 类公共牌抽空了。" : "需要 2 食物。")
          : player.hand.length >= 6
            ? `手牌已满，抽到《${topCard?.name || "B 牌"}》后需要选择弃掉 1 张。${topCard ? ` ${spaceOf(topCard)} · ${topCard.atk}/${topCard.def}` : ""}`
            : player.hand.length === 5
              ? `中坚牌，抽到《${topCard?.name || "B 牌"}》后刚好满手。${topCard ? ` ${spaceOf(topCard)} · ${topCard.atk}/${topCard.def}` : ""}`
              : `公共 B 池顶牌是《${topCard?.name || "B 牌"}》。${topCard ? `${spaceOf(topCard)} · ${topCard.atk}/${topCard.def}。` : ""}通常比较稳。`;
      }
      if (action === "drawC") {
        const topCard = publicTopCard("C");
        disabled = player.food < 2 || game.publicPiles.C.length === 0;
        label = `抽C：${topCard?.name || "已空"} -2`;
        buttonMarkup = drawButtonPreviewMarkup({
          label: "抽 C 池",
          cost: 2,
          card: topCard,
          count: game.publicPiles.C.length,
          level: "C",
        });
        title = disabled
          ? (game.publicPiles.C.length === 0 ? "C 类公共牌抽空了。" : "需要 2 食物。")
          : player.hand.length >= 6
            ? `手牌已满，抽到《${topCard?.name || "C 牌"}》后需要选择弃掉 1 张。${topCard ? ` ${spaceOf(topCard)} · ${topCard.atk}/${topCard.def}` : ""}`
            : player.hand.length === 5
              ? `补位小牌，抽到《${topCard?.name || "C 牌"}》后刚好满手。${topCard ? ` ${spaceOf(topCard)} · ${topCard.atk}/${topCard.def}` : ""}`
              : `公共 C 池顶牌是《${topCard?.name || "C 牌"}》。${topCard ? `${spaceOf(topCard)} · ${topCard.atk}/${topCard.def}。` : ""}适合补位。`;
      }
      if (action === "disaster") {
        const disasterError = disasterReadyError(player, disaster, disasterPlan);
        disabled = !!disasterError;
        label = player.turnDisasterUsed && disaster ? `已抽 ${disaster["卡名"]}` : `抽环境 -${disasterCost(null)}`;
        title = disabled ? disasterError : `花 ${disasterCost(null)} 食物抽 1 张暗置环境牌，抽到后自动发动。`;
      }
      if (action === "skill") {
        const skillName = selectedBoard?.card?.skill;
        const skillSpend = selectedBoard ? skillCost(selectedBoard.card) : 0;
        disabled = !selectedBoard || !!activeSkillReadyError(player, selectedBoard.card);
        label = skillName ? `发动 ${skillName} -${skillSpend}` : "发动技能";
        title = selectedBoard
          ? (disabled ? activeSkillReadyError(player, selectedBoard.card) : skillPreview(skillName))
          : "先选你场上的一只生物。";
      }
      if (action === "cancelSelection") {
        disabled = !selected;
        label = "取消选择";
        title = selected ? "撤回当前选择，重新来。" : "当前没有选中的牌。";
      }
      if (action === "recover") {
        const error = recoverReadyError(player, selectedBoard);
        disabled = !!error;
        label = "复工 -1";
        title = disabled
          ? error
          : `把 ${selectedBoard.card.name} 叫回战斗状态。`;
      }
      if (action === "move") {
        disabled = !selectedBoard || !!moveReadyError(player, selectedBoard);
        label = moveMode ? "点亮格子换线" : "免费换线 1/1";
        title = !selectedBoard
          ? "先选一只己方生物。"
          : disabled
            ? moveReadyError(player, selectedBoard)
            : `${selectedBoard.card.name} 可以在合法空间之间换线。`;
      }
      if (action === "sacrifice") {
        disabled = !selectedBoard || player.turnSacrifices >= 1;
        label = "当食物 +1";
        title = disabled
          ? (!selectedBoard ? "先选一只己方生物。" : "这回合已经献祭过 1 次了。")
          : `把 ${selectedBoard.card.name} 吃掉，换 1 食物。`;
      }
      if (action === "attackPlayer") {
        const attackCost = selectedBoard ? faceAttackCost(selectedBoard.card, enemy) : 0;
        const tax = selectedBoard ? faceAttackTax(enemy) : 0;
        const faceError = selectedBoard ? faceAttackReadyError(player, selectedBoard.card, enemy) : "";
        disabled = !selectedBoard || faceError !== "" || availableTaunts(enemy, selectedBoard.card).length > 0;
        label = `${faceAttackActionLabel()}${selectedBoard ? ` -${attackCost}` : ""}`;
        title = !selectedBoard
          ? "先选一只己方生物。"
          : disabled
            ? availableTaunts(enemy, selectedBoard.card).length > 0
              ? `对面有嘲讽，得先处理 ${availableTaunts(enemy, selectedBoard.card)[0].card.name}。`
              : faceError
            : tax > 0
              ? `直接打玩家。费用 ${attackCost} 食物 = 攻击力 ${Number(selectedBoard.card.atk) || 0} + 对方场上有动物额外 ${tax}。`
              : `直接打玩家。费用 ${attackCost} 食物 = 攻击力 ${Number(selectedBoard.card.atk) || 0}。`;
      }
      if (action === "attackCreature") {
        const targets = selectedBoard ? legalCreatureTargets(selectedBoard, enemy) : [];
        const shortcut = selectedBoard ? creatureAttackShortcutState(selectedBoard, enemy) : null;
        disabled = !selectedBoard || targets.length === 0;
        label = shortcut?.targetLoc ? shortcut.label : targets.length ? `点右侧目标 (${targets.length})` : "攻击动物";
        title = !selectedBoard
          ? "先选一只己方生物。"
          : disabled
            ? "这只现在够不到对面任何生物。"
            : shortcut?.title || "对面亮起来的生物都可以直接点。";
      }
      if (action === "confirmGuard") {
        disabled = true;
        label = "动物格挡";
        title = "只有在防守时刻才会用到。";
      }
      if (action === "letThrough") {
        disabled = true;
        label = "玩家承受打击";
        title = "只有在防守时刻才会用到。";
      }
      if (moveMode && !["move", "cancelSelection"].includes(action)) {
        disabled = true;
        title = "先完成或取消这次移动。";
      }
      detail = actionButtonDetailState(action, {
        player,
        enemy,
        selectedBoard,
        shortcut: action === "attackCreature" ? creatureAttackShortcutState(selectedBoard, enemy) : null,
        disasterPlan,
        moveMode,
      });
    }
    if (locked && !reactionMode) title = lockedReason;
    button.disabled = disabled;
    button.classList.toggle("draw-preview-button", !!buttonMarkup);
    if (buttonMarkup) {
      button.textContent = label;
      button.innerHTML = buttonMarkup;
    } else {
      button.textContent = label;
    }
    if (typeof button.setAttribute === "function") {
      button.setAttribute("aria-label", title ? `${label}。${title}` : label);
    }
    button.title = title;
    const blockedDetail = disabled && !reactionMode ? disabledActionDetail(title) : null;
    applyActionButtonDetail(button, blockedDetail || detail);
    button.classList.toggle("has-blocked-detail", !!blockedDetail);
    button.classList.toggle("is-reaction-choice", reactionChoice);
    button.classList.toggle("is-reaction-left", reactionChoice && action === "confirmGuard");
    button.classList.toggle("is-reaction-right", reactionChoice && action === "letThrough");
      if (reactionChoice) {
        button.dataset.reactionSide = action === "confirmGuard"
        ? (pendingDefense?.kind === "creature" ? "玩家承受打击" : "动物格挡")
        : (pendingDefense?.kind === "creature" ? "让动物承受伤害" : "玩家承受打击");
    } else {
      delete button.dataset.reactionSide;
    }
    button.classList.toggle("suggested", focus.actionKeys.has(action));
    button.classList.toggle("is-cta-spotlight", !disabled && actionSpotlight?.actionKey === action);
    button.classList.toggle(
      "is-cta-muted",
      !disabled
      && !!actionSpotlight?.actionKey
      && actionSpotlight.actionKey !== action
      && actionSpotlight.band === buttonBand,
    );
    applyRouteMarker(button, focus.actionMarkers.get(action) || null);
  });

  const actionBands = [
    ["resource", els.actionResourceBand],
    ["tactics", els.actionTacticsBand],
    ["pressure", els.actionPressureBand],
    ["defense", els.actionDefenseBand],
  ];
  actionBands.forEach(([bandKey, band]) => {
    if (!band) return;
    const enabled = [...band.querySelectorAll("[data-action]")].some((button) => !button.disabled);
    band.classList.toggle("has-enabled-action", enabled);
    band.classList.toggle("is-waiting", !enabled);
    band.dataset.actionState = enabled ? "ready" : "waiting";
    band.dataset.bandKey = bandKey;
  });

  const endTurnBtn = document.querySelector("#endTurnBtn");
  if (endTurnBtn) {
    const endTurnState = buildEndTurnButtonState();
    endTurnBtn.disabled = locked || reactionMode;
    endTurnBtn.textContent = endTurnState.label || (vsAI ? "交给 AI" : "结束回合");
    endTurnBtn.title = endTurnState.title || "结束当前回合。";
    endTurnBtn.classList.remove("primary", "secondary", "is-ready", "is-caution", "is-neutral", "is-waiting", "is-blocked");
    endTurnBtn.classList.add(endTurnState.variant === "primary" ? "primary" : "secondary");
    if (endTurnState.stateClass) endTurnBtn.classList.add(endTurnState.stateClass);
    endTurnBtn.classList.toggle("is-cta-spotlight", !endTurnBtn.disabled && actionSpotlight?.actionKey === "endTurn");
    applyActionButtonDetail(endTurnBtn, locked || reactionMode ? null : endTurnState.detail);
    applyRouteMarker(endTurnBtn, focus.actionMarkers.get("endTurn") || null);
  }
  document.querySelector("#newGameBtn").disabled = aiThinking || reactionMode || !!pendingDiscard || (isOnlineMode() && !isOnlineHost() && !onlineSession.conn?.open);
  document.querySelector("#modeBtn").disabled = isOnlineMode() || aiThinking || reactionMode || !!pendingDiscard;
  if (els.aiPersonaBtn) els.aiPersonaBtn.disabled = isOnlineMode() || !vsAI || aiThinking || reactionMode || !!pendingDiscard;
  if (els.exportCurrentBtn) els.exportCurrentBtn.disabled = !game;
  if (els.exportArchiveBtn) els.exportArchiveBtn.disabled = savedArchive.length === 0;
}

function logToneForAction(action = "") {
  if (action === "winner" || action === "quest_complete" || action === "hype_reward") return "reward";
  if (action === "attack_face" || action === "attack_face_guard" || action === "attack_face_guard_unstoppable" || action === "attack_creature_kill" || action === "attack_creature_pressure_kill" || action === "attack_creature_injure" || action === "attack_creature_venom" || action === "attack_creature_player_guard" || action === "kill_passive") return "attack";
  if (action === "disaster_cast" || action === "disaster_fizzle" || action === "move" || action === "guard_prompt" || action === "creature_guard_prompt" || typeof action === "string" && action.startsWith("skill")) return "trick";
  if (action === "match_start" || action === "end_turn" || action === "summon" || action === "recover" || action === "draw_private" || action === "setup_draw" || String(action).startsWith("draw_public_") || action === "sacrifice" || action === "discard_choice" || action === "discard_prompt" || action === "discard_overflow") return "support";
  return "neutral";
}

function logBadgeForAction(action = "") {
  if (action === "match_start") return "开局";
  if (action === "rule_tip") return "规则";
  if (action === "end_turn") return "换手";
  if (action === "quest_complete") return "任务";
  if (action === "hype_reward") return "掉落";
  if (action === "winner") return "胜负";
  if (action === "guard_prompt" || action === "creature_guard_prompt") return "防守";
  if (action === "kill_passive") return "余震";
  if (action === "discard_overflow" || action === "discard_choice" || action === "discard_prompt") return "弃牌";
  if (action === "disaster_fizzle") return "环境";
  return showtimeReplayBadge(action);
}

function logTitleForEvent(event) {
  const action = event?.action || "";
  const extra = event?.extra || {};
  if (action === "match_start") return "新的一局开演";
  if (action === "rule_tip") return "第一局费用速记";
  if (action === "end_turn") return `轮到 ${event.target || "下一位"} 了`;
  if (action === "quest_complete") return `《${event.target || "任务"}》已经领奖`;
  if (action === "hype_reward") return `${event.actor || "观众"} 把奖励扔上台了`;
  if (action === "winner") return `${event.actor || "有人"} 拿下这一局`;
  if (action === "guard_prompt") return "选择是否用动物格挡";
  if (action === "creature_guard_prompt") return `选择是否保住《${event.target || "这只动物"}》`;
  if (action === "kill_passive") return `《${extra.defender || event.target || "这只生物"}》死后还在算账`;
  if (action === "discard_overflow" || action === "discard_choice") return `《${event.target || "这张牌"}》被弃掉了`;
  if (action === "discard_prompt") return "手牌超过上限";
  if (action === "disaster_fizzle") return `《${event.target || "环境牌"}》空响`;
  return showtimeReplayTitle(event);
}

function logChipsForEvent(event) {
  const action = event?.action || "";
  const extra = event?.extra || {};
  const chips = [];
  if (extra.aiIntent) chips.push(`AI ${extra.aiIntent}`);
  if (typeof event?.cost === "number" && event.cost > 0) chips.push(`-${event.cost} 食物`);
  if (typeof event?.cost === "number" && event.cost < 0) chips.push(`+${Math.abs(event.cost)} 食物`);
  showtimeReplayChips(event).forEach((chip) => {
    if (!chips.includes(chip)) chips.push(chip);
  });
  if (action === "hype_reward" && extra.rewardLabel && !chips.includes(extra.rewardLabel)) chips.push(extra.rewardLabel);
  if (action === "quest_complete" && extra.rewardType) chips.push(`奖励 ${extra.rewardType}`);
  if (action === "end_turn" && extra.disaster) chips.push(`翻到 ${extra.disaster}`);
  if (chips.length < 3 && event?.actor && !chips.includes(event.actor)) chips.push(event.actor);
  return chips.slice(0, 4);
}

function isSpotlightAction(action = "") {
  return action === "winner"
    || action === "quest_complete"
    || action === "hype_reward"
    || action === "end_turn"
    || action === "disaster_cast"
    || action === "summon"
    || action === "attack_face"
    || action === "attack_face_guard"
    || action === "attack_face_guard_unstoppable"
    || action === "attack_creature_kill"
    || action === "attack_creature_pressure_kill"
    || action === "attack_creature_injure"
    || action === "attack_creature_venom"
    || action === "attack_creature_player_guard"
    || action === "kill_passive"
    || typeof action === "string" && action.startsWith("skill");
}

function buildNextBeatLine() {
  if (!game) return "新开一局后，这里会开始滚动实时摘要。";
  if (pendingDiscard) return `下一拍：${game.players[pendingDiscard.playerId]?.name || "玩家"} 先从满手里弃 1 张。`;
  if (pendingDefense?.kind === "face") return `下一拍：${pendingDefenseGuideShortcut()}`;
  if (pendingDefense?.kind === "creature") return `下一拍：${pendingDefenseGuideShortcut()}`;
  if (vsAI && game.active === 1) {
    const player = activePlayer();
    const beat = buildAIDirectorBeat(player);
    return `下一拍：先看 ${player.name} 怎么演，${beat.tell || beat.detail || "等它交完动作再接管。"}`
      .replace(/。?$/, "。");
  }
  const player = activePlayer();
  const suggestion = currentPrimarySuggestion();
  const moment = currentHypeMoment(player, suggestion);
  const latestReward = (player?.turnHypeRewards || []).slice(-1)[0] || null;
  const nextReward = latestReward
    ? nextHypeRewardState(player, {
        afterThreshold: latestReward.threshold || 0,
        current: moment?.current || currentTurnHype(player),
      })
    : null;
  if (latestReward && nextReward && !moment?.maxed) {
    return `下一拍：热度还差 ${nextReward.remaining} 点到下一份奖励，追不追看你的场面。`;
  }
  if (moment?.crosses && !moment?.maxed) {
    return `下一拍：你已经摸到“${moment.reward?.label || "喝彩奖励"}”的边了，可以贪，也可以先稳。`;
  }
  if (moment?.near && !moment?.maxed) {
    return `下一拍：热度差 ${moment.remaining} 点到下一档，但要不要追由你自己判断。`;
  }
  return "下一拍：看手牌、食物、亮格和对面站位，自己挑一条路。";
}

function buildRecordRecap(canSave = canUseStorage(), persona = currentAIPersona()) {
  if (!game) {
    return {
      tone: "support",
      badge: "战报摘要",
      meta: "待开局",
      title: `AI 对手是 ${persona.label}`,
      detail: persona.blurb,
      chips: ["热度 4 / 7 掉落", "每回合 1 张环境牌"],
      next: "新开一局后，这里会变成实时回合高光。",
      aside: canSave
        ? `自动存档已开，浏览器里现在有 ${savedArchive.length} 局本地记录。`
        : "当前环境不能自动存档，但仍然可以导出整局 JSON。",
    };
  }
  const latest = game.history[game.history.length - 1] || null;
  const latestTurn = latest?.turn ?? game.turn;
  const sameTurnEvents = game.history.filter((event) => event.turn === latestTurn);
  const highlight = [...sameTurnEvents].reverse().find((event) => isSpotlightAction(event.action)) || latest;
  if (!highlight) {
    return {
      tone: "support",
      badge: "战报摘要",
      meta: `第 ${game.turn} 回合`,
      title: "这局刚刚开场",
      detail: "第一手落下去后，这里就会开始滚动高光和下一拍提示。",
      chips: [`AI ${persona.label}`, "热度 4 / 7 掉落"],
      next: buildNextBeatLine(),
      aside: canSave
        ? `本局结束后会自动存进当前浏览器。平衡补丁：${BALANCE_PATCH_NOTES.join(" ")}`
        : `当前环境不能自动存档，但仍可导出 JSON。平衡补丁：${BALANCE_PATCH_NOTES.join(" ")}`,
    };
  }
  const tone = logToneForAction(highlight.action) === "neutral" ? "support" : logToneForAction(highlight.action);
  const chips = logChipsForEvent(highlight).slice(0, 3);
  return {
    tone,
    badge: isSpotlightAction(highlight.action) ? "本回合高光" : "战报摘要",
    meta: `第 ${highlight.turn} 回合 · ${highlight.actor || "系统"}`,
    title: logTitleForEvent(highlight),
    detail: highlight.detail || "刚刚发生了一步结算。",
    chips,
    next: buildNextBeatLine(),
    aside: canSave
      ? `自动存档已开，浏览器里现在有 ${savedArchive.length} 局本地记录。AI 人格：${persona.label}。`
      : `当前环境不能自动存档，但仍可导出 JSON。AI 人格：${persona.label}。`,
  };
}

function buildLogFeedEntries(limit = 10) {
  const buckets = new Map();
  [...game.history].reverse().forEach((event) => {
    const key = event.detail;
    const list = buckets.get(key) || [];
    list.push(event);
    buckets.set(key, list);
  });
  return game.log.slice(0, limit).map((message, index) => {
    const matched = buckets.get(message);
    const event = matched?.shift() || null;
    return event
      ? { kind: "event", event }
      : { kind: "plain", text: message, index };
  });
}

function compactLogText(value = "", maxLength = 92) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (!text) return "";
  const sentence = text.match(/^(.{1,88}?[。！？!?])/u)?.[1] || text;
  return sentence.length > maxLength ? `${sentence.slice(0, maxLength - 3)}...` : sentence;
}

function logMark(tag, value, className = "") {
  const safe = escapeHtml(value);
  const classAttr = className ? ` class="${className}"` : "";
  return `<${tag}${classAttr}>${safe}</${tag}>`;
}

function logName(value) {
  return logMark("strong", value || "未知");
}

function logAction(value) {
  return logMark("u", value || "行动");
}

function logEffect(value) {
  return logMark("em", value || "");
}

function logCostMarkup(cost) {
  if (typeof cost !== "number" || cost === 0) return "";
  return cost > 0 ? logEffect(`-${cost} 食物`) : logEffect(`+${Math.abs(cost)} 食物`);
}

function logTurnPrefix(event) {
  if (!event?.turn) return "";
  return `<span class="log-turn">第 ${escapeHtml(event.turn)} 回合：</span>`;
}

function logLaneText(extra = {}) {
  if (!extra.lane) return "";
  const slot = typeof extra.slotIndex === "number" ? `第${extra.slotIndex + 1}格` : "";
  return `${laneLabel(extra.lane)}${slot}`;
}

function ensureLogPeriod(markup = "") {
  return /[。！？.!?]\s*$/.test(markup.replace(/<[^>]*>/g, "")) ? markup : `${markup}。`;
}

function simpleLogSentenceForEvent(event) {
  const action = event?.action || "";
  const extra = event?.extra || {};
  const actor = event?.actor || event?.active || "系统";
  const target = event?.target || extra.targetCard || "";
  const prefix = action === "rule_tip" ? "" : logTurnPrefix(event);
  const cost = logCostMarkup(event?.cost);
  const attacker = extra.attackerCard || extra.attacker || "动物";
  const lane = logLaneText(extra);
  const damage = extra.damage || event?.detail?.match(/生命 -(\d+)/)?.[1] || "";
  const gain = event?.detail?.match(/获得 (\d+) 食物/)?.[1] || "";
  const drawLevel = String(action).startsWith("draw_public_") ? action.replace("draw_public_", "") : "";

  if (action === "rule_tip") {
    return `${logName("规则")}：攻击玩家费用 ${logEffect("攻击力 -1")}，遇到场上有动物 ${logEffect("+1 食物")}；水线不能直接攻击玩家；环境牌 ${logEffect(`-${DISASTER_DRAW_COST} 食物`)} 暗抽后自动发动；普通压制留下 ${logEffect("压伤")}，同一动物第 ${logEffect("4 次")} 被压制会退场；每回合最多 ${logEffect("护场 1 次")}；水生位每只动物回合开始 ${logEffect("+1 食物")}，最多 ${logEffect("+3")}。`;
  }
  if (action === "match_start") {
    return `${prefix}${logName("开局")}，先手 ${logEffect("5 食物")}，后手 ${logEffect("2 食物")}，环境牌暗置。`;
  }
  if (action === "end_turn") {
    return `${prefix}${logName(actor)} ${logAction("结束回合")}，${logName(target || "下一位")} 获得 ${logEffect(`+${gain || "?"} 食物`)}。`;
  }
  if (action === "draw_private" || action === "setup_draw") {
    const drawAction = action === "setup_draw" ? "起手抽牌" : "抽私有牌";
    return `${prefix}${logName(actor)} ${logAction(drawAction)}，得到 ${logName(target || "一张牌")}${cost ? `，${cost}` : ""}。`;
  }
  if (drawLevel) {
    return `${prefix}${logName(actor)} ${logAction(`抽公共 ${drawLevel}`)}，得到 ${logName(target || "一张牌")}${cost ? `，${cost}` : ""}。`;
  }
  if (action === "discard_overflow") {
    return `${prefix}${logName(actor)} 手牌满了，${logName(target || "一张牌")} ${logAction("被弃掉")}。`;
  }
  if (action === "discard_choice") {
    return `${prefix}${logName(actor)} 手牌满了，选择弃掉 ${logName(target || "一张牌")}。`;
  }
  if (action === "discard_prompt") {
    return `${prefix}${logName(actor)} 手牌超过上限，需要先弃 1 张。`;
  }
  if (action === "summon") {
    return `${prefix}${logName(actor)} ${logAction("上场")} ${logName(extra.cardName || target || "动物")}${lane ? ` 到 ${logName(lane)}` : ""}${cost ? `，${cost}` : ""}。`;
  }
  if (action === "move") {
    return `${prefix}${logName(actor)} ${logAction("移动")} ${logName(extra.cardName || target || "动物")}，${logName(laneLabel(extra.from))} 到 ${logName(laneLabel(extra.to))}${cost ? `，${cost}` : ""}。`;
  }
  if (action === "recover") {
    return `${prefix}${logName(actor)} ${logAction("复工")} ${logName(target || "动物")}${cost ? `，${cost}` : ""}。`;
  }
  if (action === "sacrifice") {
    return `${prefix}${logName(actor)} ${logAction("当食物")} ${logName(target || "动物")}，${logEffect("+1 食物")}。`;
  }
  if (action === "guard_prompt") {
    return `${prefix}${logName(actor)} 用 ${logName(attacker)} ${logAction("攻击玩家")}，请选择 ${logName("动物格挡")} 或 ${logEffect("玩家承受打击")}。`;
  }
  if (action === "creature_guard_prompt") {
    return `${prefix}${logName(actor)} 用 ${logName(attacker)} ${logAction("攻击")} ${logName(target || "动物")}，请选择 ${logEffect("玩家承受打击")} 或 ${logName("让动物承受伤害")}。`;
  }
  if (action === "attack_face") {
    return `${prefix}${logName(actor)} 用 ${logName(attacker)} ${logAction("攻击玩家")}，${logName(target || "对手")} ${logEffect(`-${damage || 0} 生命`)}${cost ? `，${cost}` : ""}。`;
  }
  if (action === "attack_face_guard" || action === "attack_face_guard_unstoppable") {
    const leak = extra.leak ? `，仍漏 ${logEffect(`-${extra.leak} 生命`)}` : "";
    return `${prefix}${logName(actor)} 用 ${logName(attacker)} 攻击玩家，${logName(extra.blocker || "动物")} ${logAction("动物格挡")}${leak}${cost ? `，${cost}` : ""}。`;
  }
  if (action === "attack_creature_player_guard") {
    return `${prefix}${logName(actor)} 用 ${logName(attacker)} 攻击 ${logName(target || extra.targetCard || "动物")}，${logName(extra.defender || "玩家")} ${logAction("玩家承受打击")}，${logEffect(`-${extra.damage || damage || 0} 生命`)}。`;
  }
  if (action === "attack_creature_kill") {
    return `${prefix}${logName(actor)} 用 ${logName(attacker)} ${logAction("攻击")} ${logName(target || extra.targetCard || "动物")}，目标 ${logEffect("阵亡")}${cost ? `，${cost}` : ""}。`;
  }
  if (action === "attack_creature_pressure_kill") {
    return `${prefix}${logName(actor)} 用 ${logName(attacker)} 连续${logAction("压制")} ${logName(target || extra.targetCard || "动物")}，目标 ${logEffect("退场")}${cost ? `，${cost}` : ""}。`;
  }
  if (action === "attack_creature_injure") {
    return `${prefix}${logName(actor)} 用 ${logName(attacker)} ${logAction("攻击")} ${logName(target || extra.targetCard || "动物")}，目标 ${logEffect("休息")}${cost ? `，${cost}` : ""}。`;
  }
  if (action === "attack_creature_venom") {
    return `${prefix}${logName(actor)} 用 ${logName(attacker)} ${logAction("毒牙")} ${logName(target || extra.targetCard || "动物")}，目标 ${logEffect("休息")}${cost ? `，${cost}` : ""}。`;
  }
  if (action === "attack_creature") {
    return `${prefix}${logName(actor)} 用 ${logName(attacker)} ${logAction("攻击")} ${logName(target || extra.targetCard || "动物")}${cost ? `，${cost}` : ""}。`;
  }
  if (action === "disaster_cast") {
    return `${prefix}${logName(actor)} ${logAction("抽环境")} ${logName(target || "环境牌")}，${logEffect(laneLabel(extra.lane) || "场地")} 自动结算。`;
  }
  if (action === "disaster_fizzle") {
    return `${prefix}${logName(actor)} ${logAction("抽环境")} ${logName(target || "环境牌")}，但这次没有命中目标。`;
  }
  if (typeof action === "string" && action.startsWith("skill")) {
    return `${prefix}${logName(actor)} 让 ${logName(target || extra.cardName || "动物")} ${logAction(extra.cardSkill || "发动技能")}${cost ? `，${cost}` : ""}。`;
  }
  if (action === "quest_complete") {
    return `${prefix}${logName(actor)} ${logAction("完成任务")} ${logName(target || "骚操作")}。`;
  }
  if (action === "hype_reward") {
    return `${prefix}${logName(actor)} ${logAction("获得热度奖励")}，${logEffect(extra.rewardLabel || target || "奖励")}。`;
  }
  if (action === "winner") {
    return `${prefix}${logName(actor)} ${logAction("获胜")}。`;
  }
  if (action === "kill_passive") {
    return `${prefix}${logName(extra.defender || target || "动物")} ${logAction("阵亡触发")}，${logEffect(compactLogText(event.detail, 48))}`;
  }
  return ensureLogPeriod(`${prefix}${logName(actor)} ${logAction(logTitleForEvent(event))}，${escapeHtml(compactLogText(event.detail || "", 72))}`);
}

function renderLog() {
  const quiet = shouldQuietOpeningIntel();
  if (els.logPanel) els.logPanel.classList.toggle("is-opening-peek", quiet);
  if (els.log) els.log.classList.toggle("is-opening-peek", quiet);
  els.log.innerHTML = "";
  buildLogFeedEntries(quiet ? 10 : 18).forEach((entry, index) => {
    const li = document.createElement("li");
    const latest = index === 0;
    if (entry.kind === "event") {
      const { event } = entry;
      const tone = logToneForAction(event.action);
      li.className = `log-entry tone-${tone}`;
      if (latest) li.classList.add("is-latest");
      if (isSpotlightAction(event.action)) li.classList.add("is-spotlight");
      li.innerHTML = `<span class="log-sentence">${simpleLogSentenceForEvent(event)}</span>`;
    } else {
      li.className = "log-entry tone-neutral plain";
      if (latest) li.classList.add("is-latest");
      li.innerHTML = `<span class="log-sentence">${ensureLogPeriod(escapeHtml(compactLogText(entry.text || "")))}</span>`;
    }
    els.log.appendChild(li);
  });
}

function renderWinner() {
  if (game.winner === null) {
    els.winnerBanner.classList.add("hidden");
    return;
  }
  const winner = game.players[game.winner];
  const summary = buildWinnerSummary();
  const stickerHtml = (summary?.stickers || [])
    .map((sticker) => `
      <span class="winner-sticker tone-${escapeHtml(sticker.tone || "support")}">
        <strong>${escapeHtml(sticker.label || "")}</strong>
        <span>${escapeHtml(sticker.title || "")}</span>
      </span>
    `)
    .join("");
  const chipHtml = (summary?.chips || [])
    .map((chip) => `<span class="winner-chip">${escapeHtml(chip)}</span>`)
    .join("");
  els.winnerBanner.innerHTML = `
    <div class="winner-head">
      <span class="winner-badge">本局收官</span>
      <span class="winner-meta">${escapeHtml(summary ? `第 ${game.turn} 回合 · ${game.history.length} 步` : "")}</span>
    </div>
    <strong class="winner-title">${escapeHtml(summary?.title || `${winner.name} 获胜`)}</strong>
    <div class="winner-copy">${escapeHtml(summary?.subtitle || `${winner.name} 获胜。`)}</div>
    ${chipHtml ? `<div class="winner-chips">${chipHtml}</div>` : ""}
    ${stickerHtml ? `<div class="winner-stickers">${stickerHtml}</div>` : ""}
    <div class="winner-aside">${escapeHtml(summary?.aside || "战报已经记进本地，可导出给朋友复盘。")}</div>
  `;
  els.winnerBanner.classList.remove("hidden");
}

function runActionButton(action, options = {}) {
  if (!game || game.winner !== null) return false;
  if (pendingDiscard) {
    addLog(pendingDiscard.playerId === onlineInputActorId() ? "先从手牌里点 1 张弃掉。" : onlineWaitingDetail());
    render();
    return false;
  }
  if (canHumanResolveDefense()) {
    let resolved = false;
    if (action === "confirmGuard") resolved = confirmDefenseShortcut();
    if (action === "letThrough") resolved = resolveDefenseDecision(false);
    if (resolved && options.sync !== false) onlineAfterHostAction(`button:${action}`);
    return resolved;
  }
  if (isOnlineMode() && !onlineCanControlCurrentDecision()) {
    addLog(onlineWaitingDetail());
    render();
    return false;
  }
  if (aiThinking || (vsAI && game.active === 1)) return false;

  let acted = false;
  if (action === "drawPrivate") {
    acted = drawFromDeck(activePlayer(), true);
    render();
  }
  if (action === "drawA") {
    drawFromPublic("A");
    acted = true;
  }
  if (action === "drawB") {
    drawFromPublic("B");
    acted = true;
  }
  if (action === "drawC") {
    drawFromPublic("C");
    acted = true;
  }
  if (action === "disaster") {
    acted = useTurnDisaster();
    render();
  }
  if (action === "skill") acted = useSelectedSkill() !== false;
  if (action === "cancelSelection") {
    selected = null;
    render();
    acted = true;
  }
  if (action === "recover") {
    recoverSelected();
    acted = true;
  }
  if (action === "move") acted = useMoveMode();
  if (action === "sacrifice") {
    sacrificeSelected();
    acted = true;
  }
  if (action === "attackPlayer") {
    attackPlayer();
    acted = true;
  }
  if (action === "attackCreature") acted = useAttackCreatureShortcut();
  if (action === "confirmGuard" || action === "letThrough") render();
  if (options.sync !== false) onlineAfterHostAction(`button:${action}`);
  return acted;
}

function render() {
  if (!game) return;
  renderPanels();
  renderTurnHint();
  renderHandPeek();
  renderRouteStrip();
  renderAnnouncer();
  renderOpponentHandFan();
  renderActionStinger();
  renderLiveReaction();
  renderMomentumStrip();
  renderMomentRack();
  renderGuideActions();
  renderMobileGuide();
  renderStarterRail();
  renderRecordStatus();
  renderArchiveShelf();
  renderDisasterPanel();
  renderQuestPanel();
  renderHypePanel();
  renderShowtimePanel();
  renderPlaybookPanel();
  renderActionDock();
  renderActionBandCues();
  renderActionButtons();
  const { self, opponent } = tableViewPlayers();
  renderBoard(els.p2Board, opponent, "opponent");
  renderBoard(els.p1Board, self, "self");
  renderHand();
  renderHint();
  renderLog();
  renderDeckShell();
  renderWinner();
  renderOnlineControls();
}

function bindActions() {
  if (els.guidePrimaryBtn) {
    els.guidePrimaryBtn.addEventListener("click", () => {
      if (!game || game.winner !== null) return;
      runPrimaryPlaybookShortcut();
    });
  }
  if (els.mobileGuidePrimaryBtn) {
    els.mobileGuidePrimaryBtn.addEventListener("click", () => {
      if (!game || game.winner !== null) return;
      runPrimaryPlaybookShortcut();
    });
  }
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (action === "cancelSelection" && isOnlineMode() && !isOnlineHost()) {
        selected = null;
        render();
        return;
      }
      if (onlineMaybeSendAction({ kind: "button", action })) return;
      runActionButton(action);
    });
  });
  document.querySelectorAll("[data-stage-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!game) return;
      setStageTab(button.dataset.stageTab, { manual: true });
    });
  });
  document.querySelectorAll("[data-intel-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!game) return;
      setIntelTab(button.dataset.intelTab, { manual: true });
    });
  });
  document.querySelectorAll("[data-mobile-band-toggle]").forEach((head) => {
    head.addEventListener("click", () => {
      const key = head.dataset.mobileBandToggle;
      if (!ACTION_BAND_KEYS.includes(key)) return;
      if (key === "defense" && !canHumanResolveDefense()) return;
      setMobileActionBand(key);
      renderActionDock();
    });
  });
  document.querySelector("#endTurnBtn").addEventListener("click", handleEndTurnClick);
  if (els.onlineHostBtn) els.onlineHostBtn.addEventListener("click", startOnlineHost);
  if (els.onlineCopyBtn) els.onlineCopyBtn.addEventListener("click", copyOnlineInvite);
  if (els.onlineLeaveBtn) els.onlineLeaveBtn.addEventListener("click", () => leaveOnlineMode());
  document.querySelector("#newGameBtn").addEventListener("click", () => {
    if (isOnlineMode() && !isOnlineHost()) {
      if (onlineSession.conn?.open) {
        onlineSend(onlineSession.conn, {
          type: "action",
          request: {
            id: uid(),
            playerId: onlineLocalPlayerId(),
            selected: null,
            kind: "newGame",
          },
        });
      }
      return;
    }
    createGame();
    if (game && isOnlineMode()) game.mode = "online_peer";
    onlineAfterHostAction("newGame");
  });
  document.querySelector("#modeBtn").addEventListener("click", () => {
    if (isOnlineMode()) return;
    if (aiThinking) return;
    vsAI = !vsAI;
    createGame();
  });
  if (els.aiPersonaBtn) {
    els.aiPersonaBtn.addEventListener("click", () => {
      if (!vsAI || aiThinking) return;
      setAIPersona(nextAIPersonaId(), true);
    });
  }
  document.querySelector("#clearLogBtn").addEventListener("click", () => {
    game.log = [];
    renderLog();
  });
  if (els.exportCurrentBtn) els.exportCurrentBtn.addEventListener("click", exportCurrentMatch);
  if (els.exportArchiveBtn) els.exportArchiveBtn.addEventListener("click", exportArchive);
  if (typeof document.addEventListener === "function") {
    document.addEventListener("keydown", (event) => {
      if (event.defaultPrevented) return;
      if (event.code !== "Space") return;
      if (isInteractiveHotkeyTarget(event.target)) return;
      if (runPrimaryPlaybookShortcut()) event.preventDefault();
    });
  }
}

async function init() {
  const data = window.JUNGLE_GAME_DATA;
  if (!data) throw new Error("缺少游戏数据 data.js");
  allCards = data.cards;
  allDisasters = data.disasters || [];
  allSkills = data.skills || [];
  loadArchive();
  bindActions();
  createGame();
  onlineAutoJoinFromUrl();
}

init().catch((error) => {
  document.body.innerHTML = `<pre>Demo 加载失败：${error.message}</pre>`;
});

if (typeof window !== "undefined") {
  window.__JUNGLE_DEBUG__ = {
    getGame: () => game,
    getSelected: () => selected,
    getPendingDefense: () => pendingDefense,
    getPendingDiscard: () => pendingDiscard,
    setSelected(uid) {
      const loc = findCardLocation(uid);
      if (!loc) return false;
      selected = {
        type: loc.type,
        uid: loc.card.uid,
        playerId: loc.player.id,
        lane: loc.lane,
        slotIndex: loc.slotIndex,
      };
      return true;
    },
    clearSelected() {
      selected = null;
    },
    createGame,
    render,
    makeInstance,
    cardByName(name) {
      return allCards.find((card) => card.name === name) || null;
    },
    boardCards,
    snapshotGameState,
    activeSkillReadyError,
    effectiveAttack,
    effectiveDefense,
    attackSpendCost,
    moveSlotsFor,
    moveReadyError,
    moveSelected,
    useSkillFromLocation,
    useTurnDisaster,
    disasterVictimPlan,
    disasterReadyError,
    disasterCost,
    rollTurnDisaster,
    rollTurnQuest,
    legalFaceBlockers,
    faceBlockCost,
    resolveDefenseDecision,
    resolveAutoDefense,
    resolveDiscardChoice,
    resolveDirectCreatureAttack,
    resolveDirectPlayerAttack,
    beginCreatureAttack,
    handleSlotClick,
    useAttackCreatureShortcut,
    endTurn,
    handleEndTurnClick,
    runAutoTurnSync,
    skillPreview,
    currentTurnQuest,
    questById: questTemplateById,
    currentAIPersona,
    setAIPersona,
    runPrimaryPlaybookShortcut,
    getAIPersonas() {
      return AI_PERSONAS.map((persona) => ({ id: persona.id, label: persona.label }));
    },
    getOnlineDataConnectionOptions: onlineDataConnectionOptions,
    getOnlineSession: () => ({
      role: onlineSession.role,
      localPlayerId: onlineSession.localPlayerId,
      peerId: onlineSession.peerId,
      inviteUrl: onlineSession.inviteUrl,
      status: onlineSession.status,
      detail: onlineSession.detail,
      rev: onlineSession.rev,
      hasOpenConnection: !!onlineSession.conn?.open,
    }),
    startOnlineHost,
    joinOnlineRoom,
    sendOnlineAction: onlineMaybeSendAction,
    runActionButton,
    buildMatchRecord,
    buildPlaybookSuggestions,
    runHintQuickAction,
    makeTurnQuest(id) {
      return makeQuestInstance(questTemplateById(id));
    },
  };
}
