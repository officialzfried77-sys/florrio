const PETAL_LIBRARY = {
  Daisy: { emoji: '🌼', color: '#ffe99a', rarity: 'Common' },
  Rose: { emoji: '🌹', color: '#ff7e92', rarity: 'Rare' },
  Violets: { emoji: '🟣', color: '#c8a2ff', rarity: 'Epic' },
  Lotus: { emoji: '🪷', color: '#a5f7d4', rarity: 'Rare' },
  Sun: { emoji: '🌞', color: '#ffd86b', rarity: 'Epic' },
  Ivy: { emoji: '🌿', color: '#8fe78d', rarity: 'Common' },
  Orchid: { emoji: '🦋', color: '#ffb8ea', rarity: 'Legendary' },
  Cactus: { emoji: '🌵', color: '#e5da8d', rarity: 'Uncommon' },
  Coral: { emoji: '🪸', color: '#ff9b72', rarity: 'Epic' }
};

const BIOME_INFO = {
  Garden: { color: '#7ee0b3', accent: '#84ffb2', task: 'Collect 12 petals', enemies: ['Bramble', 'Bee', 'Moth'] },
  Desert: { color: '#f4cd7d', accent: '#ffc96d', task: 'Gather 10 sun petals', enemies: ['Sirocco', 'Scorpion', 'Wasp'] },
  Ocean: { color: '#7ad3ff', accent: '#9be8ff', task: 'Harvest 9 coral blooms', enemies: ['Krill', 'Ray', 'Jelly'] },
  Jungle: { color: '#9ef39a', accent: '#b6ffa1', task: 'Chase 14 jungle blooms', enemies: ['Mantis', 'Sting', 'Hornet'] },
  Hel: { color: '#e6a6ff', accent: '#ffabf0', task: 'Defeat 8 infernal sprites', enemies: ['Abyss', 'Ash', 'Flare'] }
};

const TASKS = [
  'Find 3 rare petals',
  'Defeat 5 nearby mobs',
  'Harvest the biome bloom',
  'Scout the edge of the field',
  'Collect and craft a stronger petal'
];
