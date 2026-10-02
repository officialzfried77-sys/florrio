class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.name = 'Bloom';
    this.size = 19;
    this.speed = 220;
    this.health = 100;
    this.maxHealth = 100;
    this.dirX = 1;
    this.dirY = 0;
    this.level = 1;
    this.xp = 0;
    this.maxXp = 100;
    this.petals = [];
  }

  update(keys, dt, world) {
    let dx = 0;
    let dy = 0;

    if (keys['KeyW'] || keys['ArrowUp']) dy -= 1;
    if (keys['KeyS'] || keys['ArrowDown']) dy += 1;
    if (keys['KeyA'] || keys['ArrowLeft']) dx -= 1;
    if (keys['KeyD'] || keys['ArrowRight']) dx += 1;

    if (dx || dy) {
      const length = Math.hypot(dx, dy) || 1;
      dx /= length;
      dy /= length;
      this.x += dx * this.speed * dt;
      this.y += dy * this.speed * dt;
      this.dirX = dx;
      this.dirY = dy;
    }

    this.x = Math.max(this.size, Math.min(world.width - this.size, this.x));
    this.y = Math.max(this.size, Math.min(world.height - this.size, this.y));
  }
}

class Mob {
  constructor(x, y, color, name) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.name = name;
    this.size = 12 + Math.random() * 10;
    this.speed = 50 + Math.random() * 30;
    this.health = 20;
  }

  update(player, dt) {
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const dist = Math.hypot(dx, dy) || 1;

    if (dist < 260) {
      this.x += (dx / dist) * this.speed * dt;
      this.y += (dy / dist) * this.speed * dt;
    }
  }
}

class Petal {
  constructor(x, y, kind) {
    const data = PETAL_LIBRARY[kind] || PETAL_LIBRARY.Daisy;
    this.x = x;
    this.y = y;
    this.kind = kind;
    this.emoji = data.emoji;
    this.color = data.color;
    this.rarity = data.rarity;
    this.size = 11;
  }
}
