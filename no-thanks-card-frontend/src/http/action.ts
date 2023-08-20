import {PlayerActRequest} from "../../shared/httpMsg/PlayerActMsg";
import request from "./_request";
import {HttpRes} from "../../shared/httpMsg/_httpResTemplate";


export async function playerAct(
  data: PlayerActRequest
): Promise<HttpRes> {
  const res = await request({
    url: "/game/act",
    method: "POST",
    data,
  });

  return res;
}