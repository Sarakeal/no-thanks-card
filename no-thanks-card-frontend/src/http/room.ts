import request from "./_request";
import {CreateRoomRequest, CreateRoomResponse} from "../../shared/httpMsg/CreateRoomMsg";
import {InitRoomRequest, InitRoomResponse} from "../../shared/httpMsg/InitRoomMsg";

export async function createRoom(
    data: CreateRoomRequest
): Promise<CreateRoomResponse> {
    const res = (await request({
        url: "/room/create",
        method: "POST",
        data,
    })) as unknown;

    return res as CreateRoomResponse;
}

export async function initRoom(
  data: InitRoomRequest
): Promise<InitRoomResponse | null> {
    const res = (await request({
        url: "/room/init",
        method: "POST",
        data,
    })) as unknown;

    return res as InitRoomResponse;
}