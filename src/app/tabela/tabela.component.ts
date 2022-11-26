import { Component, Input } from '@angular/core';

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

export class TabelaComponent {

	@Input() styles: any
	@Input() dados: registro[] = []


	registros = this.dados.length > 12 ? this.dados : this.arrumarRegistros(this.dados)
	scroll = this.dados.length < 50

	precos: number[] = this.registros.map((item) => item.preco)
	total: number = this.precos.reduce((anterior, atual) => anterior + atual)

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
