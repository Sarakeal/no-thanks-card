export function calcScore(pCards: number[]) {
  const res = []; // 双层数组
  // 如果数字能连在一起，只统计上最小的数字作为分数，比如：3，4，5，7，最终分数为3+7=10
  const cards = [...pCards];
  cards.sort();
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