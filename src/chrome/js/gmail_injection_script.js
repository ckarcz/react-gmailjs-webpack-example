"use strict";

console.log("Extension loading...");
const jQuery = require("jquery");
const GmailFactory = require("gmail-js");

const $ = jQuery;
const gmail = new GmailFactory.Gmail($);

window.gmail = gmail;

gmail.observe.on("load", () => {
  const userEmail = gmail.get.user_email();
  console.log("Hello, " + userEmail + ". This is your extension talking!");
});