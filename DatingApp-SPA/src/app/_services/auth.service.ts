import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService} from '@auth0/angular-jwt';
import { environment } from '../../environments/environment.prod';
import { User } from '../_models/user';

// esta instruccion se crea porque un servicio no es un componenete y no puede hacer inyeccion de datos por si solo, 
// necesita especificarse que proveera de datos a una ruta, en este caso a la raiz (app.modules) 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // especificamos la url predeterminada de nuestra api que va consultar este servicio
  baseUrl = environment.apiUrl + 'auth/'; //'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) { }

  // metodo implementado para utilizar BehaviorSubject para actualizar foto de usuario en NavBar
  changeMemberPhoto(photoUrl: string){
    this.photoUrl.next(photoUrl);
  }

  // el metodo login() va hacer un post a la api para obtener el token y 
  // va mapear la respuesta para almacenarla en el localstorage y poder consultarla en cualquier momento
  login(model: any){
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if(user){
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
          //console.log(this.decodedToken);
        }
      }) 
    );
  }
  
  register(user: User){
    return this.http.post(this.baseUrl + 'register', user);
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
