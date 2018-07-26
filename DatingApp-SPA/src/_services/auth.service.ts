import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { map } from 'rxjs/operators';

// esta instruccion se crea porque un servicio no es un componenete y no puede hacer inyeccion de datos por si solo, 
// necesita especificarse que proveera de datos a una ruta, en este caso a la raiz (app.modules) 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // especificamos la url predeterminada de nuestra api que va consultar este servicio
  baseUrl = 'http://localhost:5000/api/auth/';

  constructor(private http: HttpClient) { }

  // el metodo login() va hacer un post a la api para obtener el token y 
  // va mapear la respuesta para almacenarla en el localstorage y poder consultarla en cualquier momento
  login(model: any){
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if(user){
          localStorage.setItem('token', user.token);
        }
      }) 
    );
  }
  
  register(model: any){
    return this.http.post(this.baseUrl + 'register', model);
  }
}
