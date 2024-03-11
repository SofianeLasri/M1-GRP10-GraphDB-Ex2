import {RESTDataSource} from "@apollo/datasource-rest";
import {AuthorModel, FilmModel, PeopleModel, TrackModel} from "../models.js";

export class TrackAPI extends RESTDataSource {
    baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";

    getTracks() {
        return this.get<TrackModel[]>('tracks')
    }

    getAuthorBy(id: string) {
        return this.get<AuthorModel>(`author/${id}`)
    }

    getFilms() {
        return this.get<FilmModel[]>('films')
    }

    getPeople() {
        return this.get<PeopleModel[]>('people')
    }
}