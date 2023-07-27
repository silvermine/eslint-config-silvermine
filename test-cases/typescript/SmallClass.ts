export class SmallClass {
   private readonly _helloThere: string;

   public constructor(hello: string) {
      this._helloThere = hello;
   }

   public sayHello(): string {
      return this._helloThere;
   }
}
