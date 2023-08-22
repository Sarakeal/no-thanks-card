import {ref} from "vue";

export const dialog = ref<
  {
    isShow: boolean;
    content: string;
    showTime: number;
  }
>();


export function showDialog(
  content: string,
  showTime?: number
) {
  dialog.value = {
    isShow: true,
    content: content,
    showTime: showTime || 0,
  };
}
