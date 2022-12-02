import { Component, OnInit } from '@angular/core';
import { dadosTabelas, registro } from 'src/tipos';
import { ApiService } from './api/api.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

	constructor(private api: ApiService) { }

	stylesPrimeiraTabela = {
		background: "linear-gradient(141.86deg, rgba(255, 122, 0, 0.75) 0%, rgba(138, 5, 190, 0.75) 100%)",
		width: "calc(75vw - 3rem)",
		height: "calc(75vh - 3rem)"
	}

	stylesTabelasInter = {
		backgroundColor: "#FF7A00",
		width: "30vw",
		height: "calc(75vh - 3rem)"
	}

	stylesTabelasNubank = {
		backgroundColor: "#8A05BE",
		width: "30vw",
		height: "calc(75vh - 3rem)"
	}

	dados: dadosTabelas | undefined = undefined

	async ngOnInit() {
		this.dados = await this.pegarGastos()
		setInterval(async () => {
			this.dados = await this.pegarGastos()
		}, 1000)
	}

	async pegarGastos(): Promise<dadosTabelas> {
		let dados = await this.api.pegarGastos()
		let dadosGerais = [
			...this.juntarParaGeral(dados),
			...dados.filter((item) => item.tipo == 1)
		]
		return {
			geral: dadosGerais,
			interGerais: dados.filter((item) => item.tipo == 2),
			nubankGerais: dados.filter((item) => item.tipo == 3),
			interTransporte: dados.filter((item) => item.tipo == 4),
			nubankTransporte: dados.filter((item) => item.tipo == 5),
			interAlimentacao: dados.filter((item) => item.tipo == 6),
			nubankAlimentacao: dados.filter((item) => item.tipo == 7)
		}
	}

	juntarParaGeral(dados: registro[]): registro[] {
		let precos = dados.map((item) => item.preco)

		return [
			{
				descricao: "0 - Inter Gerais",
				preco: pegarPreco(2),
				tipo: 1
			},
			{
				descricao: "0 - Nubank Gerais",
				preco: pegarPreco(3),
				tipo: 1
			},
			{
				descricao: "0 - Inter Transporte",
				preco: pegarPreco(4),
				tipo: 1
			},
			{
				descricao: "0 - Nubank Transporte",
				preco: pegarPreco(5),
				tipo: 1
			},
			{
				descricao: "0 - Inter Alimentação",
				preco: pegarPreco(6),
				tipo: 1
			},
			{
				descricao: "0 - Nubank Alimentação",
				preco: pegarPreco(7),
				tipo: 1
			}
		]

		function pegarPreco(tipo: number): GLfloat {
			let total = 0
			for (const index in precos) {
				let valor = precos[index]
				if (dados[index].tipo == tipo) {
					total += valor
				}
			}
			let totalFixed = total.toFixed(2)
			return parseFloat(totalFixed)
		}
	}
}
