export class Location{
  constructor(
    public x: number,
    public y: number,
    public name?: string
  ) {
  }
}

export class Coordinates{
  constructor(
    public x: number,
    public y: number
  ) {
  }
}

export class Person {
  constructor(
    public name: string = '',
    public location: Location = new Location(0, 0, ''),
    public coordinates: Coordinates = new Coordinates(0, 0),
    public height: number = 0,
    public passportID: string = '',
    public hairColor: string = '',
    public birthday: Date = new Date(),
    public eyesColor: string = '',
    public nationality: string = '',
    public id?: number,
    public creationDate?: Date
  ) {}
}
