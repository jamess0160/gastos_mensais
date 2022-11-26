import { Component } from '@angular/core';

type registro = {
	descricao: string,
	preco: GLfloat,
	tipo: number
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {
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

	dadosTotal: registro[] = this.pegarRegistros(1)

	pegarRegistros(tipo: number): registro[] {
		let registrosSelecionados: registro[] = []

		return registrosSelecionados
	}
}
