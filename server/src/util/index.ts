export function shuffle(cards) {
  const n = cards.length;
  for (let i = 0; i < n; i++) {
    const rand = getRand(i, n - 1);
    // swap
    const temp = cards[i];
    cards[i] = cards[rand];
    cards[rand] = temp;
  }
}

// 从min到min中随机一个数字
export function getRand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}