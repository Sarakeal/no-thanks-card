import {calcHandCardPosition, calcPlayerCardPosition, calcScore} from "@/utils";
import {AvatarType} from "../../shared/constants";
import Vuex from 'vuex'
import Vue from "vue";
import {getSelfPlayerId} from "@/utils/token";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    players: [],
    gameInfo: {
      boardCard: 0,
      creatorId: '-',
      currentPlayerId: 0,
      money: 0,
      leftCardNumber: 0,
      isFinished: 0,
    },
    selfPlayerId: getSelfPlayerId(),
  },
  getters: {
    selfPlayer (state) {
      const sPlayer = {
        score: 0,
        money: 0,
        avatar: AvatarType.Clown,
        cards: [],
        totalWidth: 0,
      };
      const player = state.players.find(p => p.id === state.selfPlayerId)
      if (player) {
        const handCards = calcHandCardPosition(player.cards);
        sPlayer.score = calcScore(player.cards);
        sPlayer.money = player.money;
        sPlayer.avatar = player.avatar;
        sPlayer.cards = handCards.cards;
        sPlayer.totalWidth = handCards.totalWidth;
      }
      // console.log(sPlayer);
      return sPlayer;
    },
    lPlayers (state) {
      const lPlayers = [];
      let index = 0;
      for (let i = 0; i < state.players.length; i++) {
        const player = state.players[i];
        if (state.selfPlayerID === player.id) {
          continue;
        }
        if (index % 2 === 0) {
          const playersCards = calcPlayerCardPosition(player.cards);
          const itemPlayer = {
            id: '#',
            score: 0,
            money: 0,
            avatar: AvatarType.Clown,
            cards: [],
            cardsTop: 0,
            cardsLeft: 0,
          };
          itemPlayer.id = player.id;
          itemPlayer.money = player.money;
          itemPlayer.avatar = player.avatar;
          itemPlayer.score = calcScore(player.cards);
          itemPlayer.cards = playersCards.cards;
          itemPlayer.cardsTop = -playersCards.totalHeight / 4;
          itemPlayer.cardsLeft = -playersCards.totalWidth;
          lPlayers.push(itemPlayer);
        }
        index++;
      }
      return lPlayers;
    },
    rPlayers (state) {
      const rPlayers = [];
      let index = 0;

      for (let i = 0; i < state.players.length; i++) {
        const player = state.players[i];
        if (state.selfPlayerID === player.id) {
          continue;
        }
        if (index % 2 === 1) {
          const playersCards = calcPlayerCardPosition(player.cards);
          const itemPlayer = {
            id: '#',
            score: 0,
            money: 0,
            avatar: AvatarType.Clown,
            cards: [],
            cardsTop: 0,
            cardsLeft: 0,
          };
          itemPlayer.id = player.id;
          itemPlayer.money = player.money;
          itemPlayer.avatar = player.avatar;
          itemPlayer.score = calcScore(player.cards);
          itemPlayer.cards = playersCards.cards;
          itemPlayer.cardsTop = -playersCards.totalHeight / 4;
          itemPlayer.cardsLeft = -playersCards.totalWidth;
          rPlayers.push(itemPlayer);
        }
        index++;
      }
      return rPlayers;
    },
    gameInfo (state) {
      return {
        boardCard: state.gameInfo.boardCard,
        creatorId: state.gameInfo.creatorId,
        currentPlayerId: state.gameInfo.currentPlayerId,
        money: state.gameInfo.money,
        leftCardNumber: state.gameInfo.leftCardNumber,
        isFinished: state.gameInfo.isFinished,
      }
    }
  },
  mutations: {
    setPlayers (state, players) {
      state.players = players;
    },
    setGameInfo (state, gameInfo) {
      state.gameInfo = gameInfo;
    }
  }
});

export default store;