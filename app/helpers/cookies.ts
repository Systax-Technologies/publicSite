import { Cart } from "../helpers/type-helper.server"
import { CookiesProvider } from 'react-cookie';

export function getSiteCookie(cart: Cart){
  CookiesProvider. =
  "cart=" + Buffer.from(JSON.stringify(cart)).toString("base64") + "; SameSite=true;";
  var start = document.cookie.indexOf("cart") + "cart".length + 1;
  var encoded = document.cookie.substring(start, document.cookie.indexOf(" ", start) - 1);
  var cart2 = JSON.parse(Buffer.from(encoded, "base64").toString("ascii"));
  return cart2
}