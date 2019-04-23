export class Ingredient {
  public static count: number;
  public id: number;
  public name: string;
  public amount: number;

  constructor(name: string, amount: number) {
    this.id = Ingredient.count++;
    this.name = name;
    this.amount = amount;
  }
}
