import {generateCards} from "@/utils/index";
import {AvatarType} from "../../shared/constants";

// setInterval(() => {
//   console.log('exe');
//   game.players[1].cards = generateCards();
//   game.gameInfo.boardCard = getRand(0, 104);
// }, 2000);

export const game = {
  gameInfo: {
    boardCard: 20,
    money: 10,
    leftCardNumber: 20,
    creatorId: '2',
    currentPlayerId: '2',
  },
  players: [
    {
      name: 'Tom',
      index: 0,
      id: '1',
      money: 10,
      score: 110,
      avatar: AvatarType.Bear,
      cards: generateCards(),
    },
    {
      name: 'Test1',
      index: 1,
      id: '0',
      money: 10,
      score: 110,
      avatar: AvatarType.Unicorn,
      cards: generateCards(),
    },
    {
      name: 'Test2',
      index: 2,
      id: '2',
      money: 10,
      score: 110,
      avatar: AvatarType.Clown,
      cards: generateCards(),
    },
    {
      name: 'Test3',
      index: 3,
      id: '0',
      money: 10,
      score: 110,
      avatar: AvatarType.Cow,
      cards: generateCards(),
    },
    {
      name: 'Test4',
      index: 4,
      id: '0',
      money: 10,
      score: 110,
      avatar: AvatarType.Owl,
      cards: generateCards(),
    },
    {
      name: 'Test5',
      index: 5,
      id: '0',
      money: 10,
      score: 110,
      avatar: AvatarType.Lion,
      cards: generateCards(),
    },
    {
      name: 'Test6',
      index: 6,
      id: '0',
      money: 10,
      score: 110,
      avatar: AvatarType.Cat,
      cards: generateCards(),
    },
    {
      name: 'Test7',
      index: 7,
      id: '0',
      money: 10,
      score: 110,
      avatar: AvatarType.Cat,
      cards: generateCards(),
    }
  ]
}