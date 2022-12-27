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

	formularioCriar: formRegistro = { data: new Date().getDate(), tipo: 0 }
	formularioEditar: formRegistro = { data: new Date().getDate(), tipo: 0 }

	constructor(private api: ApiService) { }

	ngOnInit(): void {
		classe = this
		let dialog: any = document.querySelector("#dialog")
		dialog.addEventListener('cancel', (event: any) => event.preventDefault())

		document.addEventListener('keyup', this.monitorarESC.bind(this))
	}

	monitorarESC(event: any) {
		let dialog: any = document.querySelector("#dialog")
		if (event.key !== "Escape" && event.key !== "Enter") {
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

	async navegar(chave: string) {
		let inicio: HTMLDivElement | null = document.querySelector("#inicio")
		if (!inicio) {
			return
		}

		if (chave == "#editar" && !await this.carregarEdicao()) {
			return
		}

		inicio.style.display = 'none'
		let destino: any = document.querySelector(chave)
		destino.style.display = "flex"
	}

	async carregarEdicao() {
		let id = memoria.getMemoria("idSelecionado")
		if (!id) {
			alert("Selecione uma linha para continuar")
			return false
		}

		let item = await this.api.pegarItem(id)
		if (item.descricao.includes(" - ")) {
			var [data, descricao] = item.descricao.split(" - ")
		} else {
			var descricao = item.descricao
			var data = ""
		}

		this.formularioEditar = {
			data: parseInt(data) || undefined,
			descricao: descricao,
			preco: item.preco,
			tipo: item.tipo
		}

		return true
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
			descricao: data ? `${(`00${data}`).slice(-2)} - ${descricao}` : descricao || "",
			preco: preco,
			tipo: tipo
		}).subscribe()
	}

	editar() {
		let id: number = memoria.getMemoria("idSelecionado")

		let { data, descricao, preco, tipo } = this.formularioEditar

		if (!descricao || !preco || !tipo) {
			return alert("Preencha os campos para continuar")
		}

		this.api.atualizarGasto(id, {
			descricao: data ? `${(`00${data}`).slice(-2)} - ${descricao}` : descricao || "",
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

	limpar() {
		this.formularioEditar = {tipo: 0}
		this.formularioCriar = {tipo: 0}
	}
}
