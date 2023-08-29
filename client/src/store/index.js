import {activeRangeCard, calcHandCardPosition, calcPlayerCardPosition, calcScore} from "@/utils";
import {AvatarType} from "../../shared/constants";
import Vuex from 'vuex'
import Vue from "vue";

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
      isFinished: true,
    },
  },
  getters: {
    getSelfPlayer: (state) => (selfPlayerId) => {
      const sPlayer = {
        score: 0,
        money: 0,
        name: '',
        avatar: AvatarType.Clown,
        cards: [],
        totalWidth: 0,
      };
      const player = state.players.find(p => p.id === selfPlayerId)
      if (player) {
        const handCards = calcHandCardPosition(player.cards);
        sPlayer.score = calcScore(player.cards);
        sPlayer.money = player.money;
        sPlayer.name = player.name;
        sPlayer.index = player.index;
        sPlayer.avatar = player.avatar;
        sPlayer.cards = handCards.cards;
        sPlayer.totalWidth = handCards.totalWidth;
        if (!store.getters.gameInfo.isFinished) {
          activeRangeCard(sPlayer.cards, store.getters.gameInfo.boardCard);
        }
      }
      return sPlayer;
    },
    getOtherPlayers: (state) => (selfPlayerId) => {
      const lPlayers = [];
      const rPlayers = [];
      let index = 0;
      for (let i = 0; i < state.players.length; i++) {
        const player = state.players[i];
        if (selfPlayerId === player.id) {
          continue;
        }

        const playersCards = calcPlayerCardPosition(player.cards);
        const itemPlayer = {
          id: '#',
          score: 0,
          money: 0,
          name: '',
          avatar: AvatarType.Clown,
          cards: [],
          cardsTop: 0,
          cardsLeft: 0,
        };
        itemPlayer.id = player.id;
        itemPlayer.index = player.index;
        itemPlayer.name = player.name;
        itemPlayer.money = player.money;
        itemPlayer.avatar = player.avatar;
        itemPlayer.score = calcScore(player.cards);
        itemPlayer.cards = playersCards.cards;
        itemPlayer.cardsTop = -playersCards.totalHeight / 4;
        itemPlayer.cardsLeft = -playersCards.totalWidth;
        if (!store.getters.gameInfo.isFinished) {
          activeRangeCard(itemPlayer.cards, store.getters.gameInfo.boardCard);
        }
        if (index % 2 === 0) {
          lPlayers.push(itemPlayer);
        } else {
          rPlayers.push(itemPlayer);
        }
        index++;
      }
      return {
        lPlayers: lPlayers,
        rPlayers: rPlayers,
      };
    },
    gameInfo(state) {
      return {
        boardCard: state.gameInfo.boardCard,
        creatorId: state.gameInfo.creatorId,
        currentPlayerId: state.gameInfo.currentPlayerId,
        money: state.gameInfo.money,
        leftCardNumber: state.gameInfo.leftCardNumber,
        isFinished: state.gameInfo.isFinished,
      }
    },
    isPlayer: (state) => (playerId) => {
      if (!playerId) return false;
      const player = state.players.find(p => p.id === playerId);
      return !!player;
    }
  },
  mutations: {
    setPlayers(state, players) {
      state.players = players;
    },
    setGameInfo(state, gameInfo) {
      state.gameInfo = gameInfo;
    }
  }
});

export default store;