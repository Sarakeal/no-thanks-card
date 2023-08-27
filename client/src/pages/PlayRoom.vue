<template>
  <div id="root" class="relative">
    <div class="select-none flex flex-col min-h-screen">
      <div class="flex-grow flex flex-col">
        <div class="pt-2 flex items-center justify-center">
          <span class="text-xl">No thanks card</span>
        </div>
        <div class="flex items-center justify-center text-l mt-4">
          <div class="mx-4">桌上筹码：<span class="text-xl font-bold text-orange-600">{{ gameInfo.money }}</span></div>
          <div class="mx-4">剩余卡牌：<span class="text-xl font-bold text-orange-600">{{
              gameInfo.leftCardNumber
            }}</span></div>
        </div>
        <div class="flex-grow flex justify-around mt-10">
          <div class="w-36 flex flex-col">
            <div v-for="(player, index) in gameInfo.lPlayers" :key="index"
                 class="flex flex-col items-center justify-center mb-24 relative text-xs">
              <div class="border-2 rounded-full relative">
                <img class="w-24 h-24" :src="require(`../assets/avatar/${player.avatar}.png`)" :ref="player.id"
                     :id="player.id"/>
                <div
                    :class="'bg-color-' + player.index"
                    class="player-index-tag absolute whitespace-nowrap px-2 translate-x-[-50%] rounded-full text-white text-sm">
                  {{ player.index }}
                </div>
                <div v-if="player.id === gameInfo.creatorId"
                     :class="'bg-color-' + player.index"
                     class="room-host-tag absolute whitespace-nowrap px-2 translate-x-[-50%] rounded-full text-white text-sm">
                  房主
                </div>
                <div v-if="player.id === gameInfo.currentPlayerId"
                     class="time-tag absolute whitespace-nowrap px-2 translate-x-[-50%] rounded-full text-white text-2xl">
                  ⏰
                </div>
              </div>
              <div class="text-xl font-bold" :class="'text-color-' + player.index">{{ player.name }}</div>
              <div>筹码：<span class="text-xl font-bold" :class="'text-color-' + player.index">{{ player.money }}</span>
              </div>
              <div>分数：<span class="text-xl font-bold" :class="'text-color-' + player.index">{{ player.score }}</span>
              </div>
              <div class="player-card-list left" :style="{top: player.cardsTop + 'px'}">
                <div v-for="(card, index) in player.cards" :key="index"
                     :style="{left: card.left + 'px', top: card.top + 'px'}"
                     :class="['card-' + card.number, {active: card.up}]"
                     class="card small-card"></div>
              </div>
            </div>
          </div>
          <div class="w-36 flex flex-col">
            <div v-for="(player, index) in gameInfo.rPlayers" :key="index"
                 class="flex flex-col items-center justify-center mb-24 relative text-xs">
              <div class="border-2 rounded-full relative">
                <img class="w-24 h-24" :src="require(`../assets/avatar/${player.avatar}.png`)" :ref="player.index"
                     :id="player.id"/>
                <div
                    :class="'bg-color-' + player.index"
                    class="player-index-tag absolute whitespace-nowrap px-2 translate-x-[-50%] rounded-full text-white text-sm">
                  {{ player.index }}
                </div>
                <div v-if="player.id === gameInfo.creatorId"
                     :class="'bg-color-' + player.index"
                     class="room-host-tag absolute whitespace-nowrap px-2 translate-x-[-50%] rounded-full text-white text-sm">
                  房主
                </div>
                <div v-if="player.id === gameInfo.currentPlayerId"
                     class="time-tag absolute whitespace-nowrap px-2 translate-x-[-50%] rounded-full text-white text-2xl">
                  ⏰
                </div>
              </div>
              <div class="text-xl font-bold" :class="'text-color-' + player.index">{{ player.name }}</div>
              <div>筹码：<span class="text-xl font-bold" :class="'text-color-' + player.index">{{ player.money }}</span>
              </div>
              <div>分数：<span class="text-xl font-bold" :class="'text-color-' + player.index">{{ player.score }}</span>
              </div>
              <div class="player-card-list" :style="{top: player.cardsTop + 'px', left: player.cardsLeft + 'px'}">
                <div v-for="(card, index) in player.cards" :key="index"
                     :style="{left: card.left + 'px', top: card.top + 'px'}"
                     :class="['card-' + card.number, {active: card.up}]"
                     class="card small-card"></div>
              </div>
            </div>
          </div>
          <div v-show="!gameInfo.isFinished" class="absolute top-1/2 board-card card-reverse color-3" ref="boardCard">
            <div id="boardCard" class="card" :class="'card-' + gameInfo.boardCard"></div>
          </div>
        </div>
        <div>
          <div class="flex justify-center items-center relative">
            <div class="flex justify-center items-center absolute -top-14">
              <button @click="accept"
                      v-show="selfPlayerID === gameInfo.currentPlayerId"
                      class="m-2 bg-green-500 hover:bg-green-600 active:bg-green-700  rounded-full py-2 px-8 text-white font-semibold shadow-md">
                Take it!
              </button>
              <button @click="reject"
                      v-show="selfPlayerID === gameInfo.currentPlayerId && gameInfo.selfPlayer.money > 0"
                      class="m-2 bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-full py-2 px-8 text-white font-semibold shadow-md">
                No thanks!
              </button>
            </div>
            <div class="mx-4">筹码：<span class="text-xl font-bold text-orange-600">{{gameInfo.selfPlayer.money }}</span></div>
            <div class="mx-4">分数：<span class="text-xl font-bold text-orange-600">{{gameInfo.selfPlayer.score }}</span></div>
          </div>
          <div class="card-list pb-10 mx-auto overflow-x-auto relative"
               :style="{width: gameInfo.totalWidth + 'px'}">
            <div v-for="(card, index) in gameInfo.cards" :key="index" class="card small-card"
                 :class="['card-' + card.number, {active: card.up}]"
                 :style="{left: card.left + 'px', top: '-30px'}"></div>
          </div>

        </div>
      </div>
    </div>
    <div v-if="actionType === Action.ACCEPT" class="card z-40" :class="'card-' + movedCard"
         :style="{left: animationConfig.left + 'px', top:animationConfig.top + 'px'}"></div>
    <div v-if="actionType === Action.REJECT" class="w-16 h-16 absolute rounded-full bg-red-600 border-4"
         :style="{left: animationConfig.left + 'px', top:animationConfig.top + 'px'}"></div>
  </div>
</template>

<script>
import {activeRangeCard, calcHandCardPosition, calcPlayerCardPosition, calcScore} from "@/utils";
import {act} from "@/reactivity/playAction";
import {Action} from "../../shared/httpMsg/PlayerActMsg";
import {initRoom} from "@/http/room";
import {AnimationConfig, RoomStatus} from "../../shared/constants";
import router from "@/router";
import {joinRoomSocket} from "@/socket";
import {showDialog} from "@/reactivity/dialog";
import {gameInfo, playerAction} from "@/reactivity/game";
import {getSelfPlayerId} from "@/utils/token";
import {game} from "@/utils/data";

export default {
  name: "PlayRoom",
  components: {},
  data() {
    return {
      selfPlayerID: getSelfPlayerId(),
      actionType: null,
      animationConfig: {
        left: 0,
        top: 0,
      },
      movedCard: 0,
      playerAction: playerAction,
    }
  },
  methods: {
    async accept() {
      await act(Action.ACCEPT);
    },
    async reject() {
      await act(Action.REJECT);
    },
    animate(actionType, playerId, movedCard) {

      const boardCardElement = document.getElementById("boardCard");
      const bRect = boardCardElement?.getBoundingClientRect();

      const playerElement = document.getElementById(playerId);
      const pRect = playerElement.getBoundingClientRect();
      if (!bRect || !pRect) return;

      let startLeft = 0;
      let startTop = 0;
      let desLeft = 0;
      let desTop = 0;

      if (actionType === Action.ACCEPT) {
        this.movedCard = movedCard;
        startLeft = bRect.left;
        startTop = bRect.top;
        desLeft = pRect.left;
        desTop = pRect.top;
      } else {
        startLeft = pRect.left;
        startTop = pRect.top;
        desLeft = (bRect.left + bRect.right) / 2 - 32;  // 32是筹码的半径，这样让筹码移动到卡牌的中央
        desTop = (bRect.top + bRect.bottom) / 2 - 32;
      }

      let index = 0;
      const totalFrameNumber = AnimationConfig.frameNumber * AnimationConfig.animationTime / 1000;

      const timer = setInterval(() => {
        this.actionType = actionType;
        this.animationConfig.left = (desLeft - startLeft) / totalFrameNumber * index + startLeft;
        this.animationConfig.top = (desTop - startTop) / totalFrameNumber * index + startTop;
        index++;
      }, 1000 / AnimationConfig.frameNumber);
      setTimeout(() => {
        clearInterval(timer);
        this.actionType = null;
        this.animationConfig.left = startLeft;
        this.animationConfig.top = startTop;
      }, AnimationConfig.animationTime);
    }
  },
  async created() {
    let roomNumber = this.$route.query['number'];
    let password = this.$route.query['pw'];
    const res = await initRoom({roomNumber: roomNumber})
    if (res && res.status === 200) {
      const data = res.data;
      if (data.status === RoomStatus.Waiting) {
        await router.push({
          name: "waitRoom",
          query: {
            pw: password,
            number: roomNumber
          }
        });
      } else if (data.status === RoomStatus.Running || data.status === RoomStatus.End) {
        joinRoomSocket(roomNumber);
      } else {
        showDialog("房间不存在！");
      }
    }
  },
  watch: {
    playerAction: function (newValue) {
      if (newValue.playerId !== this.selfPlayerID) {
        this.animate(newValue.type, newValue.playerId, newValue.movedCard);
      }
    }
  },
  computed: {
    Action() {
      return Action
    },
    game() {
      return game
    },
    gameInfo() {
      let game = gameInfo.value;
      const lPlayers = [];
      const rPlayers = [];
      let selfPlayer = {};
      let cards = [];
      let totalWidth = 0;
      let index = 0;
      const boardCard = game.gameInfo.boardCard;

      for (let i = 0; i < game.players.length; i++) {
        let player = game.players[i];
        if (this.selfPlayerID === player.id) {
          let handCards = calcHandCardPosition(player.cards);
          player.score = calcScore(player.cards);
          cards = handCards.cards;
          totalWidth = handCards.totalWidth;
          activeRangeCard(cards, boardCard);
          selfPlayer = player;
          continue;
        }
        let playersCards = calcPlayerCardPosition(player.cards);
        player.score = calcScore(player.cards);
        player.cards = playersCards.cards;
        player.cardsTop = -playersCards.totalHeight / 4;
        player.cardsLeft = -playersCards.totalWidth;
        activeRangeCard(player.cards, boardCard);
        if (index % 2 === 0) {
          lPlayers.push(player);
        } else {
          rPlayers.push(player);
        }
        index++;
      }
      return {
        boardCard: boardCard || 0,
        creatorId: game.gameInfo.creatorId || '',
        currentPlayerId: game.gameInfo.currentPlayerId || '#',
        money: game.gameInfo.money || 0,
        leftCardNumber: game.gameInfo.leftCardNumber || 0,
        isFinished: game.gameInfo.isFinished,
        lPlayers: lPlayers || [],
        rPlayers: rPlayers || [],
        selfPlayer: selfPlayer || {},
        cards: cards || [],
        totalWidth: totalWidth || 0,
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#root {
  background-color: #f0f8e8;
}

.card {
  box-sizing: initial;
  background-image: url("../../src/assets/cards.png");
  width: 121px;
  height: 170px;
  position: absolute;
  border-radius: 11px;
  background-position: -48px -67px;
}

.small-card {
  transform: scale(0.4);
  transform-origin: left center;
}

.player-card-list {
  //transform: scale(0.6);
  position: absolute;
}

.player-card-list.left {
  left: 130px;
}

//.player-card-list.right {
//  left: -220px;
//}

.card-list {
  height: 170px;
}

.player-index-tag {
  left: 83px;
  top: 80px;
  z-index: 20;
}

.room-host-tag {
  left: 10px;
  top: -10px;
  z-index: 20;
}

.time-tag {
  top: -10px;
  left: 83px;
  z-index: 20;
}

.board-card {
  box-sizing: initial;
  height: 170px;
  left: 50%;
  padding: 8px;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
}

.board-card:after, .board-card:before {
  -webkit-animation-duration: 3s;
  animation-duration: 3s;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-name: uno-direction-1;
  animation-name: uno-direction-1;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  border: 2px solid transparent;
  border-radius: 10px;
  bottom: 0;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0
}

.board-card:after {
  -webkit-animation-delay: -1.5s;
  animation-delay: -1.5s
}

.board-card.color-3:after, .board-card.color-3:before {
  border-color: #0095da
}

.board-card.card-reverse:after, .board-card.card-reverse:before {
  -webkit-animation-name: uno-direction-0;
  animation-name: uno-direction-0
}

@-webkit-keyframes uno-direction-0 {
  0%, to {
    -webkit-clip-path: inset(0 0 95% 0);
    clip-path: inset(0 0 95% 0)
  }

  25% {
    -webkit-clip-path: inset(0 95% 0 0);
    clip-path: inset(0 95% 0 0)
  }

  50% {
    -webkit-clip-path: inset(95% 0 0 0);
    clip-path: inset(95% 0 0 0)
  }

  75% {
    -webkit-clip-path: inset(0 0 0 95%);
    clip-path: inset(0 0 0 95%)
  }
}

@keyframes uno-direction-0 {
  0%, to {
    -webkit-clip-path: inset(0 0 95% 0);
    clip-path: inset(0 0 95% 0)
  }

  25% {
    -webkit-clip-path: inset(0 95% 0 0);
    clip-path: inset(0 95% 0 0)
  }

  50% {
    -webkit-clip-path: inset(95% 0 0 0);
    clip-path: inset(95% 0 0 0)
  }

  75% {
    -webkit-clip-path: inset(0 0 0 95%);
    clip-path: inset(0 0 0 95%)
  }
}

@-webkit-keyframes uno-direction-1 {
  0%, to {
    -webkit-clip-path: inset(0 0 95% 0);
    clip-path: inset(0 0 95% 0)
  }

  25% {
    -webkit-clip-path: inset(0 0 0 95%);
    clip-path: inset(0 0 0 95%)
  }

  50% {
    -webkit-clip-path: inset(95% 0 0 0);
    clip-path: inset(95% 0 0 0)
  }

  75% {
    -webkit-clip-path: inset(0 95% 0 0);
    clip-path: inset(0 95% 0 0)
  }
}

@keyframes uno-direction-1 {
  0%, to {
    -webkit-clip-path: inset(0 0 95% 0);
    clip-path: inset(0 0 95% 0)
  }

  25% {
    -webkit-clip-path: inset(0 0 0 95%);
    clip-path: inset(0 0 0 95%)
  }

  50% {
    -webkit-clip-path: inset(95% 0 0 0);
    clip-path: inset(95% 0 0 0)
  }

  75% {
    -webkit-clip-path: inset(0 95% 0 0);
    clip-path: inset(0 95% 0 0)
  }
}

.active {
  animation: card-beat 2s infinite;
  z-index: 10;
}

@keyframes card-beat {
  0% {
    top: -30px;
  }
  50% {
    top: -50px;
  }
  100% {
    top: -30px;
  }
}

.bg-color-0 {
  background-color: #E43E16;
}

.bg-color-1 {
  background-color: #F47406;
}

.bg-color-2 {
  background-color: #F5A705;
}

.bg-color-3 {
  background-color: #DD7126;
}

.bg-color-4 {
  background-color: #7BCD23;
}

.bg-color-5 {
  background-color: #057161;
}

.bg-color-6 {
  background-color: #253292;
}

.bg-color-7 {
  background-color: #701769;
}

.text-color-0 {
  color: #E43E16;
}

.text-color-1 {
  color: #F47406;
}

.text-color-2 {
  color: #F5A705;
}

.text-color-3 {
  color: #DD7126;
}

.text-color-4 {
  color: #7BCD23;
}

.text-color-5 {
  color: #057161;
}

.text-color-6 {
  color: #253292;
}

.text-color-7 {
  color: #701769;
}

.card-0 {
  background-position: -48px -67px;
}

.card-1 {
  background-position: -192px -67px;
}

.card-2 {
  background-position: -336px -67px;
}

.card-3 {
  background-position: -480px -67px;
}

.card-4 {
  background-position: -624px -67px;
}

.card-5 {
  background-position: -768px -67px;
}

.card-6 {
  background-position: -912px -67px;
}

.card-7 {
  background-position: -1056px -67px;
}

.card-8 {
  background-position: -1200px -67px;
}

.card-9 {
  background-position: -1344px -67px;
}

.card-10 {
  background-position: -1488px -67px;
}

.card-11 {
  background-position: -192px -259px;
}

.card-12 {
  background-position: -336px -259px;
}

.card-13 {
  background-position: -480px -259px;
}

.card-14 {
  background-position: -624px -259px;
}

.card-15 {
  background-position: -768px -259px;
}

.card-16 {
  background-position: -912px -259px;
}

.card-17 {
  background-position: -1056px -259px;
}

.card-18 {
  background-position: -1200px -259px;
}

.card-19 {
  background-position: -1344px -259px;
}

.card-20 {
  background-position: -1488px -259px;
}

.card-21 {
  background-position: -192px -451px;
}

.card-22 {
  background-position: -336px -451px;
}

.card-23 {
  background-position: -480px -451px;
}

.card-24 {
  background-position: -624px -451px;
}

.card-25 {
  background-position: -768px -451px;
}

.card-26 {
  background-position: -912px -451px;
}

.card-27 {
  background-position: -1056px -451px;
}

.card-28 {
  background-position: -1200px -451px;
}

.card-29 {
  background-position: -1344px -451px;
}

.card-30 {
  background-position: -1488px -451px;
}

.card-31 {
  background-position: -192px -643px;
}

.card-32 {
  background-position: -336px -643px;
}

.card-33 {
  background-position: -480px -643px;
}

.card-34 {
  background-position: -624px -643px;
}

.card-35 {
  background-position: -768px -643px;
}

.card-36 {
  background-position: -912px -643px;
}

.card-37 {
  background-position: -1056px -643px;
}

.card-38 {
  background-position: -1200px -643px;
}

.card-39 {
  background-position: -1344px -643px;
}

.card-40 {
  background-position: -1488px -643px;
}

.card-41 {
  background-position: -192px -835px;
}

.card-42 {
  background-position: -336px -835px;
}

.card-43 {
  background-position: -480px -835px;
}

.card-44 {
  background-position: -624px -835px;
}

.card-45 {
  background-position: -768px -835px;
}

.card-46 {
  background-position: -912px -835px;
}

.card-47 {
  background-position: -1056px -835px;
}

.card-48 {
  background-position: -1200px -835px;
}

.card-49 {
  background-position: -1344px -835px;
}

.card-50 {
  background-position: -1488px -835px;
}

.card-51 {
  background-position: -192px -1027px;
}

.card-52 {
  background-position: -336px -1027px;
}

.card-53 {
  background-position: -480px -1027px;
}

.card-54 {
  background-position: -624px -1027px;
}

.card-55 {
  background-position: -768px -1027px;
}

.card-56 {
  background-position: -912px -1027px;
}

.card-57 {
  background-position: -1056px -1027px;
}

.card-58 {
  background-position: -1200px -1027px;
}

.card-59 {
  background-position: -1344px -1027px;
}

.card-60 {
  background-position: -1488px -1027px;
}

.card-61 {
  background-position: -192px -1219px;
}

.card-62 {
  background-position: -336px -1219px;
}

.card-63 {
  background-position: -480px -1219px;
}

.card-64 {
  background-position: -624px -1219px;
}

.card-65 {
  background-position: -768px -1219px;
}

.card-66 {
  background-position: -912px -1219px;
}

.card-67 {
  background-position: -1056px -1219px;
}

.card-68 {
  background-position: -1200px -1219px;
}

.card-69 {
  background-position: -1344px -1219px;
}

.card-70 {
  background-position: -1488px -1219px;
}

.card-71 {
  background-position: -192px -1411px;
}

.card-72 {
  background-position: -336px -1411px;
}

.card-73 {
  background-position: -480px -1411px;
}

.card-74 {
  background-position: -624px -1411px;
}

.card-75 {
  background-position: -768px -1411px;
}

.card-76 {
  background-position: -912px -1411px;
}

.card-77 {
  background-position: -1056px -1411px;
}

.card-78 {
  background-position: -1200px -1411px;
}

.card-79 {
  background-position: -1344px -1411px;
}

.card-80 {
  background-position: -1488px -1411px;
}

.card-81 {
  background-position: -192px -1603px;
}

.card-82 {
  background-position: -336px -1603px;
}

.card-83 {
  background-position: -480px -1603px;
}

.card-84 {
  background-position: -624px -1603px;
}

.card-85 {
  background-position: -768px -1603px;
}

.card-86 {
  background-position: -912px -1603px;
}

.card-87 {
  background-position: -1056px -1603px;
}

.card-88 {
  background-position: -1200px -1603px;
}

.card-89 {
  background-position: -1344px -1603px;
}

.card-90 {
  background-position: -1488px -1603px;
}

.card-91 {
  background-position: -192px -1795px;
}

.card-92 {
  background-position: -336px -1795px;
}

.card-93 {
  background-position: -480px -1795px;
}

.card-94 {
  background-position: -624px -1795px;
}

.card-95 {
  background-position: -768px -1795px;
}

.card-96 {
  background-position: -912px -1795px;
}

.card-97 {
  background-position: -1056px -1795px;
}

.card-98 {
  background-position: -1200px -1795px;
}

.card-99 {
  background-position: -1344px -1795px;
}

.card-100 {
  background-position: -1488px -1795px;
}

.card-101 {
  background-position: -192px -1987px;
}

.card-102 {
  background-position: -336px -1987px;
}

.card-103 {
  background-position: -480px -1987px;
}

.card-104 {
  background-position: -624px -1987px;
}
</style>