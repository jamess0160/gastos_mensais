import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { registro } from 'src/tipos';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private http: HttpClient) { }

	public pegarGastos(tipo: number): Observable<any> {
		return this.http.get(`http://localhost:3000/gastos/${tipo}`)
	}

	public criarGasto(body: registro): Observable<any> {
		return this.http.post(`http://localhost:3000/gastos`, body)
	}
}
