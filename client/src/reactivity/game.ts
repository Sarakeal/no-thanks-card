import {ref, Ref} from "vue";
import {GameInfo, PlayerDef} from "../../shared/ModelDefs";
import {AvatarType} from "../../shared/constants";

export const players: Ref<PlayerDef[]> = ref([]);

export const selfPlayer = ref<PlayerDef>({
    _id: "",

    name: "",

    index: 0,

    cards: [],

    money: 0,

    avatar: AvatarType.Bear,
});

export const currentPlayer = ref<PlayerDef>({
    _id: "",

    name: "",

    index: 0,

    cards: [],

    money: 0,

    avatar: AvatarType.Bear,

});

export const gameInfo = ref<GameInfo>({
    dealerMoney: 0,
    timeout: 0,
    card: 0,
})