"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentType = void 0;
function getContentType(uf) {
  switch (uf) {
    case "GO":
      return "application/soap+xml";
    case "MG":
      return "application/soap+xml";
    default:
      return "text/xml;charset=utf-8";
  }
}
exports.getContentType = getContentType;
