import { fetchNotifications } from "./notifications";

fetchNotifications()
  .then((data) => {
    console.log(data);
  })
  .catch(console.error);