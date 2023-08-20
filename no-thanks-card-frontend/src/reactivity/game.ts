import {ref, Ref} from "vue";
import {PlayerDef} from "../../shared/ModelDefs";

export const players: Ref<PlayerDef[]> = ref([]);

// export const self = ref<PlayerDef>({
//     _id: "",
//
//     name: "",
//
//     index: 0,
// });