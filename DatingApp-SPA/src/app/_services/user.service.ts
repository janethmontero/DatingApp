import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../_models/user";
import { PaginatedResult } from "../_models/pagination";
import { map } from "rxjs/operators";
import { Message } from "../_models/message";

// se configuro envio de token globalmente en app.module
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: "root"
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(page?, itemsPerPage?, userParams?, likesParam?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    //PARAMETROS PARA PAGINACION
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }

    //PARAMETROS PARA FILTROS
    if (userParams != null) {
      params = params.append("minAge", userParams.minAge);
      params = params.append("maxAge", userParams.maxAge);
      params = params.append("gender", userParams.gender);
      params = params.append("orderBy", userParams.orderBy);
    }

    //FILTRAMOS LOS USUARIOS ME GUSTA
    if (likesParam === "Likers") {
      params = params.append("likers", "true");
    }

    if (likesParam === "Likees") {
      params = params.append("likees", "true");
    }

    //AGREGAMOS HEADER PARA OBTENER LOS REUSLTADOS DE LA PAGINACION DESEADA.
    return this.http
      .get<User[]>(this.baseUrl + "users", { observe: "response", params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get("Pagination") != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get("Pagination")
            );
          }
          return paginatedResult;
        })
      ); //,httpOptions
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + "users/" + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + "users/" + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(
      this.baseUrl + "users/" + userId + "/photos/" + id + "/setMain",
      {}
    );
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + "users/" + userId + "/photos/" + id);
  }

  sendLike(id: number, recipientId: number) {
    return this.http.post(
      this.baseUrl + "users/" + id + "/like/" + recipientId,
      {}
    );
  }

  getMessages(id: number, page?, itemsPerPage?, messageContainer?) {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();

    let params = new HttpParams();

    params = params.append("MessageContainer", messageContainer);
    //PARAMETROS PARA PAGINACION
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }

    //CARGA MENSAJES, ENVIA PARAMETROS Y RECIBE MENSAJES PAGINADOS.
    return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages', { observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if(response.headers.get('Pagination') !== null){
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  //CARGA HILO DE CONVERSACION CON UN USUARIO 
  getMessageThread(id: number, recipientId: number){
    return this.http.get<Message[]>(this.baseUrl + 'users/'+ id + '/messages/thread/' + recipientId);
  }

  //GUARDA MENSAJE
  sendMessage(id: number, message: Message){
    return this.http.post(this.baseUrl + 'users/' + id + '/messages', message);
  }

  // ACTIVA BANDERA DE MENSAJE ELIMINADO, 
  // SI LA BANDERA ESTA ACTIVA PARA SENDER Y RECIPIENT ELIMINA EL MENSAJE DE BD
  deleteMessage(id:number, userId: number){
    return this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + id, {})
  }

  // METODO QUE SERA LLAMADO EN MULTIPLES VECES PARA ACTUALIZAR TODOS LOS MENSAJES NO LEIDOS
  markAsRead(userId: number, messageId: number){
    this.http.post(this.baseUrl + 'users/' + userId +'/messages/' + messageId + '/read', {}).subscribe();
  }
}
