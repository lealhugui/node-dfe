"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoEvento = exports.fromJsonixObj = exports.ServicosSefaz = void 0;
var ServicosSefaz;
(function (ServicosSefaz) {
    ServicosSefaz["autorizacao"] = "autorizacao";
    ServicosSefaz["retAutorizacao"] = "retAutorizacao";
    ServicosSefaz["consultarStatusServico"] = "consultarStatusServico";
    ServicosSefaz["evento"] = "recepcaoEvento";
    ServicosSefaz["inutilizacao"] = "inutilizacao";
    ServicosSefaz["protocolo"] = "consultarProtocolo";
    ServicosSefaz["cadastro"] = "consultarCadastro";
})(ServicosSefaz = exports.ServicosSefaz || (exports.ServicosSefaz = {}));
function fromJsonixObj(json) {
    return json;
}
exports.fromJsonixObj = fromJsonixObj;
var TipoEvento;
(function (TipoEvento) {
    TipoEvento["cancelamento"] = "110111";
    TipoEvento["cartaCorrecao"] = "110110";
    TipoEvento["manifestacaoConfirmacaoOperacao"] = "210200";
    TipoEvento["manifestacaoCienciaEmissao"] = "210210";
    TipoEvento["manifestacaoDesconhecimentoOperacao"] = "210220";
    TipoEvento["manifestacaoOperacaoNaoRealizada"] = "210240";
    TipoEvento["epec"] = "110140";
})(TipoEvento = exports.TipoEvento || (exports.TipoEvento = {}));
