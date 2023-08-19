import router from "../router";

export default function gameBegin() {
  setTimeout(() => {
    router.push({
      name: "playRoom",
    });
  }, 200);
}