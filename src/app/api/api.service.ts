import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { registro, entradas } from 'src/tipos';
import axios from 'axios';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private http: HttpClient) { }

	public async pegarEntradas(): Promise<entradas[]> {
		let { data: entradas } = await axios.get("http://localhost:3000/entradas")
		return entradas
	}

	public pegarGastos(): Promise<registro[]> {
		return new Promise((resolve) => {
			this.http.get("http://localhost:3000/gastos").forEach((item: any) => {
				resolve(item)
			})
		})
	}

	public pegarItem(id: string): Promise<registro> {
		return new Promise((resolve) => {
			this.http.get(`http://localhost:3000/gastos/unico/${id}`).forEach(([item]: any) => {
				resolve(item)
			})
		})
	}

	public criarGasto(body: registro): Observable<any> {
		return this.http.post(`http://localhost:3000/gastos`, body)
	}

	public atualizarGasto(id: number, body: registro): Observable<any> {
		return this.http.put(`http://localhost:3000/gastos/${id}`, body)
	}

	public deletarGasto(id: number): Observable<any> {
		return this.http.delete(`http://localhost:3000/gastos/${id}`)
	}

}
