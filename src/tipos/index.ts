export type registro = {
    id?: number,
    descricao: string,
    preco: GLfloat,
    tipo: number
}

export type formRegistro = {
    data?: number,
    descricao?: string,
    preco?: GLfloat,
    tipo?: number
}

export type dadosTabelas = {
    geral: registro[],
    interGerais: registro[],
    nubankGerais: registro[],
    interTransporte: registro[],
    nubankTransporte: registro[],
    interAlimentacao: registro[],
    nubankAlimentacao: registro[]
}

export type entradas = {
    id: number,
    chave: string,
    valor: number
}