import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { registro } from 'src/tipos';
import memoria from '../memoria';

@Component({
	selector: 'app-tabela',
	templateUrl: './tabela.component.html',
	styleUrls: ['./tabela.component.scss']
})

export class TabelaComponent implements OnInit {

	constructor(private api: ApiService) { }

	@Input() styles: any
	@Input() dados: registro[] | undefined = []
	@Input() tipo: number | undefined = 0

	registros: registro[] = this.arrumarRegistros([])
	scroll: boolean = false

	totalFloat: GLfloat = 0
	totalVisual: string = ""
	totalSalario: string = ""

	idSelecionado = memoria.getMemoria("idSelecionado")

	ngOnInit(): void {
		setTimeout(() => {
			this.carregarDados()
			setInterval(this.carregarDados.bind(this), 1000)
		}, 100)
	}

	async carregarDados() {
		if (!this.dados) {
			return
		}

		this.idSelecionado = memoria.getMemoria("idSelecionado")
		this.registros = this.dados.length > 12 ? this.dados : this.arrumarRegistros(this.dados)
		this.scroll = this.dados.length > 12
		let precos = this.registros.map((item) => {
			if (item.descricao.includes("*")) {
				return 0
			}
			return item.preco
		})
		this.totalFloat = parseFloat(precos.reduce((anterior, atual) => anterior + atual).toString())
		
		let entradas = await this.api.pegarEntradas()
		let valorEntradas = entradas.map((item) => item.valor)
		let somaEntradas = valorEntradas.reduce((a, b) => a + b)

		this.totalSalario = (somaEntradas - this.totalFloat).toFixed(2)
		this.totalVisual = this.totalFloat.toFixed(2)
	}

	arrumarRegistros(data: registro[]): registro[] {
		let novosDados: registro[] = []
		for (let index = 0; index < 50; index++) {
			if (data[index]) {
				novosDados.push(data[index])
				continue
			}

			novosDados.push({
				id: 0,
				descricao: "",
				preco: 0,
				tipo: 0
			})
		}
		return novosDados
	}

	clicarLinha(evento: any) {
		let linha: HTMLTableRowElement = evento.path[2]

		let idAtual = linha.dataset["id"]
		if (!idAtual) {
			return
		}

		if (linha.classList.contains("selecionada")) {
			linha.classList.remove("selecionada")
			memoria.setMemoria("idSelecionado", undefined)
			return
		}

		linha.classList.add("selecionada")
		let idAnterior = memoria.getMemoria("idSelecionado")

		if (idAnterior && idAnterior !== idAtual) {
			let linhaAnterior: HTMLTableRowElement | null = document.querySelector(`[data-id="${idAnterior}"]`)
			linhaAnterior?.classList.remove("selecionada")
		}
		memoria.setMemoria("idSelecionado", idAtual)
	}
}
