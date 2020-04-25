"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var nfeProcessor2_1 = require("./processor/nfeProcessor2");
exports.NFeProcessor = nfeProcessor2_1.NFeProcessor;
var retornoProcessor_1 = require("./processor/retornoProcessor");
exports.RetornoProcessor = retornoProcessor_1.RetornoProcessor;
var statusServicoProcessor_1 = require("./processor/statusServicoProcessor");
exports.StatusServicoProcessor = statusServicoProcessor_1.StatusServicoProcessor;
var eventoProcessor_1 = require("./processor/eventoProcessor");
exports.EventoProcessor = eventoProcessor_1.EventoProcessor;
var inutilizaProcessor_1 = require("./processor/inutilizaProcessor");
exports.InutilizaProcessor = inutilizaProcessor_1.InutilizaProcessor;
__export(require("./interface"));
