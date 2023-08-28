export function calcScore(pCards: number[]) {
  const res = []; // 双层数组
  // 如果数字能连在一起，只统计上最小的数字作为分数，比如：3，4，5，7，最终分数为3+7=10
  const cards = [...pCards];
  cards.sort((a, b) => a - b);
  for (let i = 0; i < cards.length; i++) {
    let j = i;
    while (j + 1 < cards.length && cards[j + 1] === cards[j] + 1) {
      j++;
    }
    const arr = [];
    for (let k = i; k <= j; k++) {
      arr.push(cards[k]);
    }
    res.push(arr);
    i = j;
  }
  let score = 0;

  res.forEach(arr => {
    score += arr[0];
  });
  return score;
}

// 从min到min中随机一个数字
export function getRand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const tightLeftOffset = 20;
const space = 54;
const cardWidth = 121;
const scaleRate = 0.4;
const smallCardWidth = cardWidth * scaleRate;
const groupPreLineLimit = 4;
const topOffset = 90;

export function generateCards() {
  const cards = [];
  for (let i = 0; i <= 104; i++) {
    cards.push(i);
  }
  let n = 80;
  while (n-- > 0) {
    const index = getRand(0, cards.length);
    cards.splice(index, 1);
  }
  return cards;
}

export function calcHandCardPosition(pCards: number[]) {
  const cards = [...pCards];
  cards.sort((a, b) => a - b);
  // const offset = 26;
  let totalLeftOffset = 0;
  const resCards = [];
  for (let i = 0; i < cards.length; i++) {
    let j = i;
    while (j + 1 < cards.length && cards[j + 1] === cards[j] + 1) {
      j++;
    }
    if (i > 0) totalLeftOffset += space;
    resCards.push({
      number: cards[i],
      left: totalLeftOffset,
    });
    for (let k = i + 1; k <= j; k++) {
      // totalLeftOffset += k === i + 1 ? offset : tightLeftOffset;
      totalLeftOffset += tightLeftOffset;
      resCards.push({
        number: cards[k],
        left: totalLeftOffset,
      });
    }
    i = j;
  }
  return {
    cards: resCards,
    totalWidth: totalLeftOffset + smallCardWidth,
  }
}

export function calcPlayerCardPosition(pCards: number[]) {
  const cards = [...pCards];

  cards.sort((a, b) => a - b);
  const resCards = [];
  let groupCount = 0;
  const baseLeftOffset = 0;
  let totalLeftOffset = baseLeftOffset;
  let maxLeftOffset = 0;
  let totalTopOffset = -topOffset;
  for (let i = 0; i < cards.length; i++) {
    let j = i;
    while (j + 1 < cards.length && cards[j + 1] === cards[j] + 1) {
      j++;
    }
    if (groupCount % groupPreLineLimit === 0) {
      totalTopOffset += topOffset;
      totalLeftOffset = baseLeftOffset;
    } else {
      if (i > 0) totalLeftOffset += space;
    }
    maxLeftOffset = Math.max(maxLeftOffset, totalLeftOffset);
    groupCount++;

    resCards.push({
      number: cards[i],
      left: totalLeftOffset,
      top: totalTopOffset,
    });
    for (let k = i + 1; k <= j; k++) {
      totalLeftOffset += tightLeftOffset;
      resCards.push({
        number: cards[k],
        left: totalLeftOffset,
        top: totalTopOffset,
      });

      maxLeftOffset = Math.max(maxLeftOffset, totalLeftOffset);
    }
    i = j;
  }
  return {
    cards: resCards,
    totalWidth: maxLeftOffset + smallCardWidth,
    totalHeight: totalTopOffset,
  }
}

// 在数字number的range范围内的卡牌设置up=true属性
export function activeRangeCard(cards: any[], number:number, range = 3) {
  let offset = 1;
  while (offset <= range) {
    const found = cards.find(card => card.number === number + offset);
    if (found) {
      found.up = true;
      break;
    }
    offset++;
  }
  offset = 1;
  while (offset <= range) {
    const found = cards.find(card => card.number === number - offset);
    if (found) {
      found.up = true;
      break;
    }
    offset++;
  }
}