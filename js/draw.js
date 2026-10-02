function drawBackground(ctx, world, camera, biomeName) {
  const { width, height } = world;
  const biome = BIOME_INFO[biomeName] || BIOME_INFO.Garden;

  ctx.fillStyle = '#0d1715';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(-camera.x, -camera.y);

  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, '#152b2d');
  bg.addColorStop(1, '#0a1114');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  for (let x = 0; x <= width; x += 80) {
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y <= height; y += 80) {
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  const core = { x: width * 0.5, y: height * 0.5 };
  const glow = ctx.createRadialGradient(core.x, core.y, 80, core.x, core.y, 540);
  glow.addColorStop(0, biome.color + '88');
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(core.x - 540, core.y - 540, 1080, 1080);

  for (let i = 0; i < 35; i++) {
    const x = (i * 131) % width;
    const y = (i * 97) % height;
    ctx.fillStyle = i % 2 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.06)';
    ctx.beginPath();
    ctx.arc(x, y, 3 + (i % 4), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawPetal(ctx, petal) {
  ctx.save();
  ctx.translate(petal.x, petal.y);
  ctx.fillStyle = petal.color;
  ctx.beginPath();
  ctx.moveTo(0, -10);
  ctx.quadraticCurveTo(8, 0, 0, 10);
  ctx.quadraticCurveTo(-8, 0, 0, -10);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = '11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(petal.emoji, 0, 3);
  ctx.restore();
}

function drawMob(ctx, mob) {
  ctx.save();
  ctx.translate(mob.x, mob.y);
  ctx.fillStyle = mob.color;
  ctx.beginPath();
  ctx.arc(0, 0, mob.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#100f14';
  ctx.fillRect(-mob.size * 0.6, -mob.size * 0.8, mob.size * 1.2, 3);
  ctx.restore();
}

function drawPlayer(ctx, player, camera) {
  const px = player.x - camera.x;
  const py = player.y - camera.y;

  ctx.save();
  ctx.translate(px, py);
  ctx.fillStyle = '#8ef3d9';
  ctx.beginPath();
  ctx.arc(0, 0, player.size, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#d8fff5';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(player.dirX * 18, player.dirY * 18);
  ctx.stroke();

  ctx.fillStyle = '#fff';
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(player.name || 'Bloom', 0, player.size + 18);
  ctx.restore();
}

function drawMinimap(mmCtx, world, player, mobs, petals) {
  const width = 210;
  const height = 115;

  mmCtx.clearRect(0, 0, width, height);
  mmCtx.fillStyle = '#0d1715';
  mmCtx.fillRect(0, 0, width, height);

  const scaleX = width / world.width;
  const scaleY = height / world.height;

  mmCtx.fillStyle = 'rgba(138, 230, 173, 0.3)';
  mmCtx.fillRect(0, 0, width, height);

  for (const p of petals) {
    mmCtx.fillStyle = p.color;
    mmCtx.fillRect(p.x * scaleX, p.y * scaleY, 3, 3);
  }

  for (const mob of mobs) {
    mmCtx.fillStyle = mob.color;
    mmCtx.fillRect(mob.x * scaleX, mob.y * scaleY, 4, 4);
  }

  mmCtx.fillStyle = '#eafef8';
  mmCtx.fillRect(player.x * scaleX - 4, player.y * scaleY - 4, 8, 8);
}

function updateHud(player, biomeName, taskText, taskPct, hpPct) {
  const hpFill = document.getElementById('hpFill');
  const hpText = document.getElementById('hpText');
  const hpName = document.getElementById('hpName');
  const xpFill = document.getElementById('xpFill');
  const lvlText = document.getElementById('lvlText');
  const taskFill = document.getElementById('taskFill');
  const taskPctEl = document.getElementById('taskPct');
  const biomeLabel = document.getElementById('biomeLabel');
  const taskTextEl = document.getElementById('taskText');
  const taskTitle = document.getElementById('taskTitle');

  hpFill.style.width = `${hpPct}%`;
  hpText.textContent = `${Math.max(0, Math.round(player.health))} / ${player.maxHealth}`;
  hpName.textContent = player.name || 'Bloom';
  xpFill.style.width = `${Math.min(100, (player.xp / player.maxXp) * 100)}%`;
  lvlText.textContent = `Lvl ${player.level}`;
  taskFill.style.width = `${Math.min(100, taskPct)}%`;
  taskPctEl.textContent = `${Math.round(taskPct)}%`;
  taskTextEl.textContent = taskText;
  taskTitle.textContent = biomeName;
  biomeLabel.textContent = biomeName;
}
