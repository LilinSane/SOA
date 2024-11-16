import {Person} from "./persons.model";

export class AdvancedPersonResponse {
  constructor(
    public page: number,
    public pageSize: number,
    public personResponses: Person[],
    public totalCount: number,
    public totalPages: number
  ) {
  }
}
