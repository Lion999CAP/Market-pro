"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = getClient;
/**
 * Returns a Mailgun client for sending emails.
 * Adminlocal2k24
 * @returns {Mailgun.Client} The Mailgun client instance.
 */
var form_data_1 = require("form-data");
var mailgun_js_1 = require("mailgun.js");
function getClient() {
    var mailgun = new mailgun_js_1.default(form_data_1.default);
    var client = mailgun.client({
        username: "api",
        key: process.env.MAILGUN_API_KEY || "",
    });
    return client;
}
