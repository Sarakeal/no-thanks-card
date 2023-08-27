import {ref, Ref} from "vue";
import {PlayerDef} from "../../shared/ModelDefs";
import {AvatarType} from "../../shared/constants";
import {ChangeStatusMsg} from "../../shared/wsMsg/ChangeStatus";
import {ActionMsg} from "../../shared/wsMsg/Action";

export const players: Ref<PlayerDef[]> = ref([]);

export const selfPlayer = ref<PlayerDef>({
    id: "",

    name: "",

    index: 0,

    cards: [],

    money: 0,

    avatar: AvatarType.Bear,
});

export const currentPlayer = ref<PlayerDef>({
    id: "",

    name: "",

    index: 0,

    cards: [],

    money: 0,

    avatar: AvatarType.Bear,

});

export const gameInfo = ref<ChangeStatusMsg>();

export const playerAction = ref<ActionMsg>();