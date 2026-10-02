function initMinimalUi() {
  const primRow = document.getElementById('primRow');
  const secRow = document.getElementById('secRow');
  const slotNames = ['🌼', '🌹', '🌿', '🌞', '🟣'];

  primRow.innerHTML = slotNames.map((s, i) => `<div class="slot ${i === 0 ? 'active' : ''}">${s}</div>`).join('');
  secRow.innerHTML = slotNames.map((s, i) => `<div class="slot ${i === 0 ? 'active' : ''}">${s}</div>`).join('');

  document.getElementById('invList').innerHTML = Object.entries(PETAL_LIBRARY)
    .map(([name, data]) => `
      <div class="invItem" title="${name}">
        <div class="emoji">${data.emoji}</div>
        <div>${name}</div>
        <small>${data.rarity}</small>
      </div>
    `)
    .join('');

  document.getElementById('statsBody').innerHTML = 'Health: 100<br>Attack: 12<br>Biome: Garden<br>Best run: 0';
  document.getElementById('boardBody').innerHTML = '1. Bloom<br>2. Seedling<br>3. Daisy';
}

function bindUiActions() {
  const readyBtn = document.getElementById('readyBtn');
  readyBtn.addEventListener('click', () => {
    const input = document.getElementById('nameInput');
    const playerName = (input.value || 'Bloom').trim().slice(0, 16);
    if (playerName) {
      gameState.player.name = playerName;
    }

    document.getElementById('menu').classList.add('hidden');
    document.getElementById('hud').classList.remove('hidden');
    gameState.started = true;
  });

  document.querySelectorAll('[data-b]').forEach(btn => {
    btn.addEventListener('click', () => {
      const biome = btn.dataset.b;
      gameState.biome = biome;
      document.querySelectorAll('[data-b]').forEach(b => b.style.borderColor = 'rgba(255,255,255,0.12)');
      btn.style.borderColor = BIOME_INFO[biome]?.color || '#7ee0b3';
      const taskText = BIOME_INFO[biome]?.task || 'Collect 12 petals';
      gameState.taskText = taskText;
      updateHud(gameState.player, biome, taskText, gameState.taskProgress, 100);
      showToast(`Loaded ${biome} biome`);
    });
  });

  document.getElementById('tbMenu').addEventListener('click', () => {
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('hud').classList.add('hidden');
  });

  document.getElementById('tbHelp').addEventListener('click', () => {
    document.getElementById('helpPanel').classList.toggle('hidden');
  });

  document.getElementById('tbStats').addEventListener('click', () => {
    document.getElementById('statsPanel').classList.toggle('hidden');
  });

  document.getElementById('tbBoard').addEventListener('click', () => {
    document.getElementById('boardPanel').classList.toggle('hidden');
  });

  document.getElementById('tbSettings').addEventListener('click', () => {
    document.getElementById('settingsPanel').classList.toggle('hidden');
  });

  document.getElementById('btnInv').addEventListener('click', () => {
    document.getElementById('invPanel').classList.toggle('hidden');
  });

  document.getElementById('btnCraft').addEventListener('click', () => {
    document.getElementById('craftPanel').classList.toggle('hidden');
  });

  document.getElementById('btnMob').addEventListener('click', () => {
    document.getElementById('mobPanel').classList.toggle('hidden');
  });

  document.querySelectorAll('.pclose').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.close;
      const panel = document.getElementById(`${target}Panel`);
      if (panel) panel.classList.add('hidden');
    });
  });

  document.getElementById('tbClose').addEventListener('click', () => {
    document.querySelectorAll('.panel').forEach(panel => panel.classList.add('hidden'));
  });
}

function showToast(text) {
  const toasts = document.getElementById('toasts');
  const div = document.createElement('div');
  div.className = 'toast';
  div.textContent = text;
  toasts.appendChild(div);
  setTimeout(() => div.remove(), 1800);
}
