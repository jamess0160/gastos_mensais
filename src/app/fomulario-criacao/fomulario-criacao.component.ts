import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-fomulario-criacao',
	templateUrl: './fomulario-criacao.component.html',
	styleUrls: ['./fomulario-criacao.component.scss']
})
export class FomularioCriacaoComponent implements OnInit {
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
	}
}
