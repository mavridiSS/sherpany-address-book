import { SEED, BASE_API_URL, BATCH_SIZE } from "./../constants";
import IdleWatcher from "./idleWatcher";
export const getAPIurl = (page, settings) => {
  return `${BASE_API_URL}?page=${page}&results=${BATCH_SIZE}&seed=${SEED}&nat=${settings}`;
};

export const getObjPath = (path, obj) => {
  if (!path || !obj) {
    return null;
  }

  let value;

  if (path.indexOf(".") > -1) {
    path.split(".").forEach(field => {
      if (!value) {
        value = obj;
      }

      value = value[field];
    });
  } else {
    value = obj[path];
  }

  return value;
};

export default IdleWatcher;
