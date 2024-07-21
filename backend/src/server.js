"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var path_1 = require("path");
var express_1 = require("express");
var cors_1 = require("cors");
var prod_router_1 = require("./routers/prod.router");
var user_router_1 = require("./routers/user.router");
var order_router_1 = require("./routers/order.router");
var upload_router_1 = require("./routers/upload.router");
var database_config_1 = require("./configs/database.config");
(0, database_config_1.dbConnect)();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:4200"]
}));
//Implement everything on food.service
app.use("/api/foods", prod_router_1.default);
app.use("/api/users", user_router_1.default);
app.use("/api/orders", order_router_1.default);
app.use("/api/upload", upload_router_1.default);
app.use(express_1.default.static('public'));
app.get('*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, 'index.html'));
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Server started at http://localhost:" + port);
});
