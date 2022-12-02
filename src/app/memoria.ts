const memoria: any = {}

function getMemoria(chave: string) {
    return memoria[chave]
}

function setMemoria(chave: string, valor: any) {
    memoria[chave] = valor
    return "Sucesso"
}

export default {
    getMemoria,
    setMemoria
}