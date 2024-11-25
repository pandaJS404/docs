import { request } from "./config";

export function getArticleViewCount(id, pageUrl, call) {
  request.get(`xxxxxxx`, {}).then((result) => {
    call(process(result));
  });
}

function process(result) {
  if (result.code === 200) {
    return result.data;
  } else {
    console.log(result.msg);
  }
}
