"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
function delightfulMessage(param) {
    var obj = {
        "daro": "razvaljuje bmw i gume",
        "gazda": "razvaljuje pisoare",
        "keci": "razvaljuje minox",
        "pista": "razvaljuje bmw aha ne cek",
    };
    return obj[param];
}
app.get('/test', function (req, res, next) {
    var _a, _b;
    var msg = (_b = delightfulMessage((_a = req.query) === null || _a === void 0 ? void 0 : _a.ime)) !== null && _b !== void 0 ? _b : "nema poruke";
    res.status(200).send(msg);
});
app.listen(1337, function () {
    console.log('Test service started');
});
