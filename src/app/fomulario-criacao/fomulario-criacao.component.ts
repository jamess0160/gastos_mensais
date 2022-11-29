import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';

@Component({
	selector: 'app-fomulario-criacao',
	templateUrl: './fomulario-criacao.component.html',
	styleUrls: ['./fomulario-criacao.component.scss']
})
export class FomularioCriacaoComponent implements OnInit {

	constructor(private api: ApiService) { }

	ngOnInit(): void {
		let dialog: any = document.querySelector("#dialog")
		dialog.showModal()
		document.documentElement.style.overflow = 'hidden';

		let inicio: HTMLDivElement | null = document.querySelector("#inicio")
		document.querySelectorAll("#inicio>button").forEach((item: any) => {
			item.addEventListener('click', () => {
				let { chave } = item.dataset
				if (!inicio) {
					return
				}
				inicio.style.display = 'none'
				document.querySelector(chave).style.display = "flex"
			})
		})

		document.querySelectorAll(".enviar").forEach((item: any) => {
			let { tipo } = item.dataset
			if (tipo == "delete") {
				return this.configurarDelete(item)
			}

			
		})
	}

	configurarDelete(item: any): void {

	}
}
