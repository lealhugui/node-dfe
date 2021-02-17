"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
var nfeProcessor2_1 = require("./processor/nfeProcessor2");
Object.defineProperty(exports, "NFeProcessor", { enumerable: true, get: function () { return nfeProcessor2_1.NFeProcessor; } });
var retornoProcessor_1 = require("./processor/retornoProcessor");
Object.defineProperty(exports, "RetornoProcessor", { enumerable: true, get: function () { return retornoProcessor_1.RetornoProcessor; } });
var statusServicoProcessor_1 = require("./processor/statusServicoProcessor");
Object.defineProperty(exports, "StatusServicoProcessor", { enumerable: true, get: function () { return statusServicoProcessor_1.StatusServicoProcessor; } });
var eventoProcessor_1 = require("./processor/eventoProcessor");
Object.defineProperty(exports, "EventoProcessor", { enumerable: true, get: function () { return eventoProcessor_1.EventoProcessor; } });
var inutilizaProcessor_1 = require("./processor/inutilizaProcessor");
Object.defineProperty(exports, "InutilizaProcessor", { enumerable: true, get: function () { return inutilizaProcessor_1.InutilizaProcessor; } });
__exportStar(require("./interface"), exports);
