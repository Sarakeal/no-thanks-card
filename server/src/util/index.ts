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

export function calcScore(pCards) {
  let res = []; // 双层数组
  // 如果数字能连在一起，只统计上最小的数字作为分数，比如：3，4，5，7，最终分数为3+7=10
  let cards = [...pCards];
  cards.sort();
  for (let i = 0; i < cards.length; i++) {
    let j = i;
    while (j + 1 < cards.length && cards[j + 1] === cards[j] + 1) {
      j++;
    }
    let arr = [];
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