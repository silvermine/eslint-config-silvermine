/**
 * Test class that adheres to our ESLint rules for TypeScript
 * @param test
 */
export class TestClass {

   protected static _banana_sweetness: string;

   private static _apple_type: string;

   private readonly _appleColor: string;

   public constructor(appleColor: string, appleType: string, bananaSweetness: string) {
      this._appleColor = appleColor;
      TestClass._apple_type = appleType;
      TestClass._banana_sweetness = bananaSweetness;
   }

   public static get_apple_type(): string {
      return TestClass._apple_type;
   }

   public getOrange(): string {
      return this._headersContentTypeAsString();
   }

   public getApple(): string {
      return TestClass.get_apple_type();
   }

   protected _getBananaSweetness(): string {
      return TestClass._banana_sweetness;
   }

   protected get _getHeaders(): Record<string, unknown> {
      return {
         // This demonstrates how our rules allow for non-standard
         // object-literal property names, which are sometimes required
         // when working with 3rd party APIs that do not account for our
         // naming conventions.
         'Content-Type': 'application/json',
         'DC': 'test',
         TA: 'test',
         helloThere: 'test',
         HelloThere: 'test',
         MY_PROPERTY_NAME: 'test',
         '127.0.0.1': true,
         'aws:rep:deleting': true,
         'hello[a]': 'hello',
      };
   }

   private _headersContentTypeAsString(): string {
      return `${this._getHeaders['Content-Type']}`;
   }
}
