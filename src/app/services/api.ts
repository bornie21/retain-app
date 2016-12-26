/**
 * Created by bornie21 on 26/12/16.
 */
import {Headers, Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService{
    headers = new Headers({
        'Content-Type':'application/json',
        'Accept': 'application/json'
    }
    );
    api_url = 'http://localhost:3500';
    constructor(private http:Http){

    }
    private getJson(res: Response){
        return res.json();
    }

    private checkForError(resp: Response){
        if (resp.status >= 200 && resp.status <300){
            return resp;
        }else{
            const error = new Error(resp.statusText);
            error['response']= resp;
            console.error(error);
            throw error;
        }
    }
    get(path: string): Observable<any>{
        return this.http.get(`${this.api_url}${path}`,this.headers)
            .map(this.checkForError)
            .catch(err=>Observable.throw(err))
            .map(this.getJson);
    }
    post(path: string, body){
        return this.http.post(
            `${this.api_url}${path}`,
            JSON.stringify(body),
            {'headers':this.headers}
        )
            .map(this.checkForError)
            .catch(err=> Observable.throw(err))
            .map(this.getJson);
    }

    delete(path: string): Observable<any>{
        return this.http.delete(`${this.api_url}${path}`,this.headers)
            .map(this.checkForError)
            .catch(err=>Observable.throw(err))
            .map(this.getJson);
    }
}