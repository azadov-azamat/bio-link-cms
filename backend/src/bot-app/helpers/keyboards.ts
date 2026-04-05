import { Markup } from "telegraf";

import { botMessages } from "./messages.js";

export function createAuthorizeKeyboard(url: string) {
  return Markup.inlineKeyboard([
    Markup.button.url(botMessages.authorizeButton, url),
  ]);
}

export function createContactRequestKeyboard() {
  return Markup.keyboard([
    [Markup.button.contactRequest("Telefon raqamni yuborish")],
  ])
    .resize()
    .oneTime();
}

export function createRemoveKeyboard() {
  return Markup.removeKeyboard();
}
