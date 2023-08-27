import { Middleware } from "koa";

import {
    InitRoomRequest, InitRoomResponse
} from "../../../../client/shared/httpMsg/InitRoomMsg";
import { Room } from "../../models/RoomModel";

const roomInit: Middleware = async (ctx, next) => {
  const req = ctx.request.body as InitRoomRequest;
  const { roomNumber } = req;

  const room = Room.getRoom(roomNumber);

  const res: InitRoomResponse = {
    status: 200,
    msg: "ok",
    data: {
      status: room.status,
      creatorId: room.creatorID,
      players: room.getPlayers(),
      gameInfo: {
        boardCard: room.cards.currentCard,
        money: room.dealerMoney,
        leftCardNumber: room.cards.left,
        creatorId: room.creatorID,
        currentPlayerId: room.currentPlayer.id,
        isFinished: room.cards.isFinished(),
      }
    },
  };

  ctx.body = res;
};

export default roomInit;
