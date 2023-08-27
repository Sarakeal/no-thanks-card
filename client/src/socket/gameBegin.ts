import router from "../router";
import {GameBeginMsg} from "../../shared/wsMsg/GameBegin";

export default function gameBegin(msg: GameBeginMsg) {
  setTimeout(() => {
    router.push({
      name: "playRoom",
      query: {
        number: msg.roomNumber,
      }
    });
  }, 200);
}