const world = { width: 2000, height: 1400 };
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const minimap = document.getElementById('minimap');
const mmCtx = minimap.getContext('2d');

const gameState = {
  started: false,
  biome: 'Garden',
  taskProgress: 0,
  taskText: BIOME_INFO.Garden.task,
  camera: { x: 0, y: 0 },
  keys: {},
  lastTime: 0,
  mobs: [],
  petals: [],
  player: new Player(world.width / 2, world.height / 2),
  selectedPetal: 'Daisy'
};

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function spawnMobs() {
  const biomeNames = BIOME_INFO[gameState.biome]?.enemies || ['Bee', 'Moth'];
  const colors = ['#ff8c70', '#f6d365', '#b2f2bb', '#9ebdff', '#ff8fd8'];
  gameState.mobs = Array.from({ length: 9 }, (_, i) => {
    const angle = (i / 9) * Math.PI * 2;
    const radius = 180 + Math.random() * 260;
    const x = world.width / 2 + Math.cos(angle) * radius;
    const y = world.height / 2 + Math.sin(angle) * radius;
    const name = biomeNames[i % biomeNames.length];
    return new Mob(x, y, colors[i % colors.length], name);
  });
}

function spawnPetals() {
  const names = Object.keys(PETAL_LIBRARY);
  gameState.petals = Array.from({ length: 28 }, (_, i) => {
    const x = 60 + Math.random() * (world.width - 120);
    const y = 60 + Math.random() * (world.height - 120);
    return new Petal(x, y, names[i % names.length]);
  });
}

function handleInput() {
  gameState.player.update(gameState.keys, 1 / 60, world);
}

function updateCamera() {
  const cx = gameState.player.x - canvas.width / 2;
  const cy = gameState.player.y - canvas.height / 2;
  gameState.camera.x = Math.max(0, Math.min(world.width - canvas.width, cx));
  gameState.camera.y = Math.max(0, Math.min(world.height - canvas.height, cy));
}

function updateMobs(dt) {
  for (const mob of gameState.mobs) {
    mob.update(gameState.player, dt);

    const dist = Math.hypot(mob.x - gameState.player.x, mob.y - gameState.player.y);
    if (dist < mob.size + gameState.player.size + 10) {
      gameState.player.health = Math.max(0, gameState.player.health - 12 * dt);
      if (gameState.player.health <= 0) {
        document.getElementById('dname').textContent = mob.name;
        document.getElementById('death').classList.remove('hidden');
      }
    }
  }
}

function updatePetals() {
  for (let i = gameState.petals.length - 1; i >= 0; i--) {
    const petal = gameState.petals[i];
    const dist = Math.hypot(petal.x - gameState.player.x, petal.y - gameState.player.y);
    if (dist < petal.size + gameState.player.size) {
      gameState.playersPetals = (gameState.playersPetals || 0) + 1;
      gameState.taskProgress = Math.min(100, gameState.taskProgress + 8);
      gameState.petals.splice(i, 1);
      showToast(`Collected ${petal.kind}!`);
      if (gameState.taskProgress >= 100) {
        gameState.player.xp += 18;
        gameState.taskProgress = 0;
        showToast('Biome task complete!');
      }
    }
  }
}

function updateHudState() {
  updateHud(
    gameState.player,
    gameState.biome,
    gameState.taskText,
    gameState.taskProgress,
    (gameState.player.health / gameState.player.maxHealth) * 100
  );
}

function animate(ts) {
  const dt = Math.min(0.033, (ts - gameState.lastTime) / 1000 || 0.016);
  gameState.lastTime = ts;

  if (gameState.started) {
    handleInput();
    updateMobs(dt);
    updatePetals();
    updateCamera();
    updateHudState();
  }

  drawBackground(ctx, world, gameState.camera, gameState.biome);

  if (gameState.started) {
    for (const petal of gameState.petals) drawPetal(ctx, petal);
    for (const mob of gameState.mobs) drawMob(ctx, mob);
    drawPlayer(ctx, gameState.player, gameState.camera);
    drawMinimap(mmCtx, world, gameState.player, gameState.mobs, gameState.petals);
  }

  requestAnimationFrame(animate);
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'Enter') {
    const chatInput = document.getElementById('chatInput');
    chatInput.classList.toggle('hidden');
    if (!chatInput.classList.contains('hidden')) chatInput.focus();
  }
  gameState.keys[e.code] = true;
});

window.addEventListener('keyup', (e) => {
  gameState.keys[e.code] = false;
});

window.addEventListener('resize', resizeCanvas);

function initGame() {
  resizeCanvas();
  initMinimalUi();
  bindUiActions();
  spawnMobs();
  spawnPetals();
  gameState.taskText = BIOME_INFO[gameState.biome].task;
  updateHudState();
  requestAnimationFrame(animate);
}

initGame();
