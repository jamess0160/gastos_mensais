import { Component, OnInit } from '@angular/core';
import { formRegistro } from 'src/tipos';
import { ApiService } from '../api/api.service';
import memoria from '../memoria';

var classe: any;

@Component({
	selector: 'app-fomulario-criacao',
	templateUrl: './fomulario-criacao.component.html',
	styleUrls: ['./fomulario-criacao.component.scss']
})

export class FomularioCriacaoComponent implements OnInit {

	formularioCriar: formRegistro = { tipo: 0 }
	formularioEditar: formRegistro = { tipo: 0 }

	constructor(private api: ApiService) { }

	ngOnInit(): void {
		classe = this
		let dialog: any = document.querySelector("#dialog")
		dialog.addEventListener('cancel', (event: any) => event.preventDefault())

		document.addEventListener('keyup', this.monitorarESC.bind(this))
	}

	monitorarESC(event: any) {
		let dialog: any = document.querySelector("#dialog")
		if (event.key !== "Escape") {
			return
		}
		if (dialog.open) {
			return this.sair()
		}
		dialog.showModal()
		document.documentElement.style.overflow = 'hidden';
	}

	sair() {
		let dialog: any = document.querySelector("#dialog")
		dialog.close()
		document.documentElement.style.overflow = 'auto';
		let divs = document.querySelectorAll("#dialog>div")
		divs.forEach((div: any, index: number) => index == 0 ? div.style.display = 'flex' : div.style.display = 'none')
	}

	navegar(chave: string) {
		let inicio: HTMLDivElement | null = document.querySelector("#inicio")
		if (!inicio) {
			return
		}
		inicio.style.display = 'none'
		let destino: any = document.querySelector(chave)
		destino.style.display = "flex"

		if (chave == "#editar") {
			this.carregarEdicao()
		}
	}

	async carregarEdicao() {
		let id = memoria.getMemoria("idSelecionado")
		if (!id) {
			return
		}
		let item = await this.api.pegarItem(id)
		let [data, descricao] = item.descricao.split(" - ")
		this.formularioEditar = {
			data: parseInt(data),
			descricao: descricao,
			preco: item.preco,
			tipo: item.tipo
		}
	}

	voltar(event: Event) {
		let [_, pai]: any = event.composedPath()
		let inicio: HTMLDivElement | null = document.querySelector("#inicio")
		if (!inicio) {
			return
		}
		inicio.style.display = 'flex'
		pai.style.display = 'none'
	}

	criar() {
		let { data, descricao, preco, tipo } = this.formularioCriar

		if (!descricao || !preco || !tipo) {
			return alert("Preencha os campos para continuar")
		}

		this.api.criarGasto({
			descricao: data ? `${data} - ${descricao}` : descricao || "",
			preco: preco,
			tipo: tipo
		}).subscribe()
		this.formularioCriar = {}
	}

	editar() {
		let id: number = memoria.getMemoria("idSelecionado")
		if (!id) {
			return alert("Nenhuma linha selecionada")
		}

		let { data, descricao, preco, tipo } = this.formularioEditar

		if (!descricao || !preco || !tipo) {
			return alert("Preencha os campos para continuar")
		}

		this.api.atualizarGasto(id, {
			descricao: data ? `${data} - ${descricao}` : descricao || "",
			preco: preco,
			tipo: tipo
		}).subscribe()
		this.formularioEditar = {}
		this.sair()
	}

	deletar() {
		let id: number = memoria.getMemoria("idSelecionado")
		if (!id) {
			return alert("Nenhuma linha selecionada")
		}
		this.api.deletarGasto(id).subscribe()
		this.sair()
	}
}
