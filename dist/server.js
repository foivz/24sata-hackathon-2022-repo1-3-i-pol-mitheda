"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_gateway_1 = __importDefault(require("express-gateway"));
// dok dodajete novi mikroservis:
// 1. dodajte ga u config/gateway.config.yml (pazite da port ne pripada nekom drugom mikroservisu)
// 2. importajte ga tu
// importanje servisa tu zapravo znaci da se ti servisi pokrecu kao normalan node server
// samo sto se svaki servis pokrece na razlicitom portu i express-gateway
// sve proxy-ja na jedan port, na taj nacin se moze jedan dio aplikacije
// brejkat bez da utjece na ostale 
require("./test/service");
(0, express_gateway_1.default)()
    .load(path_1.default.join(__dirname, '..', 'config'))
    .run();
