import {ChangeStatusMsg} from "../../shared/wsMsg/ChangeStatus";

export default function changeStatus(msg: ChangeStatusMsg) {
  console.log(msg.timeout);
}
