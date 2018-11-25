import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { filter, map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  endpoint = 'https://jsonplaceholder.typicode.com/todos/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getToDoTasks(): Observable<any> {
    return this.http.get(this.endpoint).pipe(map((task) => {
      var result = []
      for (let t of task) {
        if (t.completed == false) {
          result.push(t)
        }
      }
      return result
    }));
  }

  getDoneTasks(): Observable<any> {
    return this.http.get(this.endpoint).pipe(map((task) => {
      var result = []
      for (let t of task) {
        if (t.completed) {
          result.push(t)
        }
      }
      return result
    }));
  }

  // getTask(id): Observable<any> {
  //   return this.http.get(endpoint + 'tasks/' + id).pipe(
  //     map(this.extractData));
  // }

  // addTask (task): Observable<any> {
  //   console.log(task);
  //   return this.http.post<any>(endpoint + 'tasks', JSON.stringify(task), httpOptions).pipe(
  //     tap((task) => console.log(`added task w/ id=${task.id}`)),
  //     catchError(this.handleError<any>('addTask'))
  //   );
  // }
  //
  // updateTask (id, task): Observable<any> {
  //   return this.http.put(endpoint + 'tasks/' + id, JSON.stringify(task), httpOptions).pipe(
  //     tap(_ => console.log(`updated task id=${id}`)),
  //     catchError(this.handleError<any>('updateTask'))
  //   );
  // }
  //
  // deleteTask (id): Observable<any> {
  //   return this.http.delete<any>(endpoint + 'tasks/' + id, httpOptions).pipe(
  //     tap(_ => console.log(`deleted task id=${id}`)),
  //     catchError(this.handleError<any>('deleteTask'))
  //   );
  // }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
