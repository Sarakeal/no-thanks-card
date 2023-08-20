import {ref, Ref} from "vue";
import {PlayerDef} from "../../shared/ModelDefs";

export const players: Ref<PlayerDef[]> = ref([]);

export const selfPlayer = ref<PlayerDef>({
    _id: "",

    name: "",

    index: 0,

    cards: [],

    money: 0,
});

export const currentPlayer = ref<PlayerDef>({
    _id: "",

    name: "",

    index: 0,

    cards: [],

    money: 0,
});

export const dealerMoney = ref<number>();
export const card = ref<number>();