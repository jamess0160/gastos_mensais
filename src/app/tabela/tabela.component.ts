import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';

type registro = {
	descricao: string,
	preco: GLfloat,
	tipo: number
}

@Component({
	selector: 'app-tabela',
	templateUrl: './tabela.component.html',
	styleUrls: ['./tabela.component.scss']
})

export class TabelaComponent implements OnInit {

	constructor(private api: ApiService) { }

	@Input() styles: any
	@Input() tipo: number = 0

	registros: registro[] = this.arrumarRegistros([])
	scroll: boolean = false

	total: number = 0

	ngOnInit(): void {
		this.api.pegarGastos(this.tipo).forEach((dados: registro[]) => {
			this.registros = dados.length > 12 ? dados : this.arrumarRegistros(dados)
			this.scroll = dados.length < 50
			let precos: number[] = this.registros.map((item) => item.preco)
			this.total = precos.reduce((anterior, atual) => anterior + atual)
		})
	}



	parseFloat(numero: number): String {
		return parseFloat(numero.toString()).toFixed(2)
	}

	arrumarRegistros(data: registro[]): registro[] {
		let novosDados: registro[] = []
		for (let index = 0; index < 50; index++) {
			if (data[index]) {
				novosDados.push(data[index])
				continue
			}
			novosDados.push({
				descricao: "",
				preco: 0,
				tipo: 0
			})
		}
		return novosDados
	}
}
