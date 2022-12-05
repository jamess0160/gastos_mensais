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
			...dados.filter((item) => item.tipo == 1),
			...this.juntarParaGeral(dados)
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
		return [
			{
				descricao: "Inter Gerais",
				preco: pegarPreco(2),
				tipo: 1
			},
			{
				descricao: "Inter Transporte",
				preco: pegarPreco(4),
				tipo: 1
			},
			{
				descricao: "Inter Alimentação",
				preco: pegarPreco(6),
				tipo: 1
			},
			{
				descricao: "Nubank Gerais",
				preco: pegarPreco(3),
				tipo: 1
			},
			{
				descricao: "Nubank Transporte",
				preco: pegarPreco(5),
				tipo: 1
			},
			{
				descricao: "Nubank Alimentação",
				preco: pegarPreco(7),
				tipo: 1
			}
		]

		function pegarPreco(tipo: number): GLfloat {
			let total = 0
			dados.forEach((item) => {
				if (item.tipo !== tipo) {
					return
				}
				if (item.descricao.includes("*")) {
					return
				}
				total += item.preco
			})
			let totalFixed = total.toFixed(2)
			return parseFloat(totalFixed)
		}
	}
}
