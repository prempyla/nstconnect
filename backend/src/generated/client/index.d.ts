
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model AnonymousUser
 * 
 */
export type AnonymousUser = $Result.DefaultSelection<Prisma.$AnonymousUserPayload>
/**
 * Model Confession
 * 
 */
export type Confession = $Result.DefaultSelection<Prisma.$ConfessionPayload>
/**
 * Model Flag
 * 
 */
export type Flag = $Result.DefaultSelection<Prisma.$FlagPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AnonymousUsers
 * const anonymousUsers = await prisma.anonymousUser.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more AnonymousUsers
   * const anonymousUsers = await prisma.anonymousUser.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.anonymousUser`: Exposes CRUD operations for the **AnonymousUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AnonymousUsers
    * const anonymousUsers = await prisma.anonymousUser.findMany()
    * ```
    */
  get anonymousUser(): Prisma.AnonymousUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.confession`: Exposes CRUD operations for the **Confession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Confessions
    * const confessions = await prisma.confession.findMany()
    * ```
    */
  get confession(): Prisma.ConfessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.flag`: Exposes CRUD operations for the **Flag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Flags
    * const flags = await prisma.flag.findMany()
    * ```
    */
  get flag(): Prisma.FlagDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.0.0
   * Query Engine version: 0c19ccc313cf9911a90d99d2ac2eb0280c76c513
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    AnonymousUser: 'AnonymousUser',
    Confession: 'Confession',
    Flag: 'Flag'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "anonymousUser" | "confession" | "flag"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AnonymousUser: {
        payload: Prisma.$AnonymousUserPayload<ExtArgs>
        fields: Prisma.AnonymousUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnonymousUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnonymousUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousUserPayload>
          }
          findFirst: {
            args: Prisma.AnonymousUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnonymousUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousUserPayload>
          }
          findMany: {
            args: Prisma.AnonymousUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousUserPayload>[]
          }
          create: {
            args: Prisma.AnonymousUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousUserPayload>
          }
          createMany: {
            args: Prisma.AnonymousUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnonymousUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousUserPayload>[]
          }
          delete: {
            args: Prisma.AnonymousUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousUserPayload>
          }
          update: {
            args: Prisma.AnonymousUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousUserPayload>
          }
          deleteMany: {
            args: Prisma.AnonymousUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnonymousUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnonymousUserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousUserPayload>[]
          }
          upsert: {
            args: Prisma.AnonymousUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousUserPayload>
          }
          aggregate: {
            args: Prisma.AnonymousUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnonymousUser>
          }
          groupBy: {
            args: Prisma.AnonymousUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnonymousUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnonymousUserCountArgs<ExtArgs>
            result: $Utils.Optional<AnonymousUserCountAggregateOutputType> | number
          }
        }
      }
      Confession: {
        payload: Prisma.$ConfessionPayload<ExtArgs>
        fields: Prisma.ConfessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConfessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConfessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfessionPayload>
          }
          findFirst: {
            args: Prisma.ConfessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConfessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfessionPayload>
          }
          findMany: {
            args: Prisma.ConfessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfessionPayload>[]
          }
          create: {
            args: Prisma.ConfessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfessionPayload>
          }
          createMany: {
            args: Prisma.ConfessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConfessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfessionPayload>[]
          }
          delete: {
            args: Prisma.ConfessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfessionPayload>
          }
          update: {
            args: Prisma.ConfessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfessionPayload>
          }
          deleteMany: {
            args: Prisma.ConfessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConfessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConfessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfessionPayload>[]
          }
          upsert: {
            args: Prisma.ConfessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfessionPayload>
          }
          aggregate: {
            args: Prisma.ConfessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConfession>
          }
          groupBy: {
            args: Prisma.ConfessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConfessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConfessionCountArgs<ExtArgs>
            result: $Utils.Optional<ConfessionCountAggregateOutputType> | number
          }
        }
      }
      Flag: {
        payload: Prisma.$FlagPayload<ExtArgs>
        fields: Prisma.FlagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FlagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FlagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlagPayload>
          }
          findFirst: {
            args: Prisma.FlagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FlagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlagPayload>
          }
          findMany: {
            args: Prisma.FlagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlagPayload>[]
          }
          create: {
            args: Prisma.FlagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlagPayload>
          }
          createMany: {
            args: Prisma.FlagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FlagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlagPayload>[]
          }
          delete: {
            args: Prisma.FlagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlagPayload>
          }
          update: {
            args: Prisma.FlagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlagPayload>
          }
          deleteMany: {
            args: Prisma.FlagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FlagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FlagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlagPayload>[]
          }
          upsert: {
            args: Prisma.FlagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlagPayload>
          }
          aggregate: {
            args: Prisma.FlagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFlag>
          }
          groupBy: {
            args: Prisma.FlagGroupByArgs<ExtArgs>
            result: $Utils.Optional<FlagGroupByOutputType>[]
          }
          count: {
            args: Prisma.FlagCountArgs<ExtArgs>
            result: $Utils.Optional<FlagCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    anonymousUser?: AnonymousUserOmit
    confession?: ConfessionOmit
    flag?: FlagOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AnonymousUserCountOutputType
   */

  export type AnonymousUserCountOutputType = {
    confessions: number
    flags: number
  }

  export type AnonymousUserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    confessions?: boolean | AnonymousUserCountOutputTypeCountConfessionsArgs
    flags?: boolean | AnonymousUserCountOutputTypeCountFlagsArgs
  }

  // Custom InputTypes
  /**
   * AnonymousUserCountOutputType without action
   */
  export type AnonymousUserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUserCountOutputType
     */
    select?: AnonymousUserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AnonymousUserCountOutputType without action
   */
  export type AnonymousUserCountOutputTypeCountConfessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConfessionWhereInput
  }

  /**
   * AnonymousUserCountOutputType without action
   */
  export type AnonymousUserCountOutputTypeCountFlagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FlagWhereInput
  }


  /**
   * Models
   */

  /**
   * Model AnonymousUser
   */

  export type AggregateAnonymousUser = {
    _count: AnonymousUserCountAggregateOutputType | null
    _min: AnonymousUserMinAggregateOutputType | null
    _max: AnonymousUserMaxAggregateOutputType | null
  }

  export type AnonymousUserMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    lastActive: Date | null
  }

  export type AnonymousUserMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    lastActive: Date | null
  }

  export type AnonymousUserCountAggregateOutputType = {
    id: number
    createdAt: number
    lastActive: number
    _all: number
  }


  export type AnonymousUserMinAggregateInputType = {
    id?: true
    createdAt?: true
    lastActive?: true
  }

  export type AnonymousUserMaxAggregateInputType = {
    id?: true
    createdAt?: true
    lastActive?: true
  }

  export type AnonymousUserCountAggregateInputType = {
    id?: true
    createdAt?: true
    lastActive?: true
    _all?: true
  }

  export type AnonymousUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnonymousUser to aggregate.
     */
    where?: AnonymousUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnonymousUsers to fetch.
     */
    orderBy?: AnonymousUserOrderByWithRelationInput | AnonymousUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnonymousUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnonymousUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnonymousUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AnonymousUsers
    **/
    _count?: true | AnonymousUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnonymousUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnonymousUserMaxAggregateInputType
  }

  export type GetAnonymousUserAggregateType<T extends AnonymousUserAggregateArgs> = {
        [P in keyof T & keyof AggregateAnonymousUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnonymousUser[P]>
      : GetScalarType<T[P], AggregateAnonymousUser[P]>
  }




  export type AnonymousUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnonymousUserWhereInput
    orderBy?: AnonymousUserOrderByWithAggregationInput | AnonymousUserOrderByWithAggregationInput[]
    by: AnonymousUserScalarFieldEnum[] | AnonymousUserScalarFieldEnum
    having?: AnonymousUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnonymousUserCountAggregateInputType | true
    _min?: AnonymousUserMinAggregateInputType
    _max?: AnonymousUserMaxAggregateInputType
  }

  export type AnonymousUserGroupByOutputType = {
    id: string
    createdAt: Date
    lastActive: Date
    _count: AnonymousUserCountAggregateOutputType | null
    _min: AnonymousUserMinAggregateOutputType | null
    _max: AnonymousUserMaxAggregateOutputType | null
  }

  type GetAnonymousUserGroupByPayload<T extends AnonymousUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnonymousUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnonymousUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnonymousUserGroupByOutputType[P]>
            : GetScalarType<T[P], AnonymousUserGroupByOutputType[P]>
        }
      >
    >


  export type AnonymousUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    lastActive?: boolean
    confessions?: boolean | AnonymousUser$confessionsArgs<ExtArgs>
    flags?: boolean | AnonymousUser$flagsArgs<ExtArgs>
    _count?: boolean | AnonymousUserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["anonymousUser"]>

  export type AnonymousUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    lastActive?: boolean
  }, ExtArgs["result"]["anonymousUser"]>

  export type AnonymousUserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    lastActive?: boolean
  }, ExtArgs["result"]["anonymousUser"]>

  export type AnonymousUserSelectScalar = {
    id?: boolean
    createdAt?: boolean
    lastActive?: boolean
  }

  export type AnonymousUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "lastActive", ExtArgs["result"]["anonymousUser"]>
  export type AnonymousUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    confessions?: boolean | AnonymousUser$confessionsArgs<ExtArgs>
    flags?: boolean | AnonymousUser$flagsArgs<ExtArgs>
    _count?: boolean | AnonymousUserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AnonymousUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AnonymousUserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AnonymousUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AnonymousUser"
    objects: {
      confessions: Prisma.$ConfessionPayload<ExtArgs>[]
      flags: Prisma.$FlagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      lastActive: Date
    }, ExtArgs["result"]["anonymousUser"]>
    composites: {}
  }

  type AnonymousUserGetPayload<S extends boolean | null | undefined | AnonymousUserDefaultArgs> = $Result.GetResult<Prisma.$AnonymousUserPayload, S>

  type AnonymousUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnonymousUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnonymousUserCountAggregateInputType | true
    }

  export interface AnonymousUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AnonymousUser'], meta: { name: 'AnonymousUser' } }
    /**
     * Find zero or one AnonymousUser that matches the filter.
     * @param {AnonymousUserFindUniqueArgs} args - Arguments to find a AnonymousUser
     * @example
     * // Get one AnonymousUser
     * const anonymousUser = await prisma.anonymousUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnonymousUserFindUniqueArgs>(args: SelectSubset<T, AnonymousUserFindUniqueArgs<ExtArgs>>): Prisma__AnonymousUserClient<$Result.GetResult<Prisma.$AnonymousUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AnonymousUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnonymousUserFindUniqueOrThrowArgs} args - Arguments to find a AnonymousUser
     * @example
     * // Get one AnonymousUser
     * const anonymousUser = await prisma.anonymousUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnonymousUserFindUniqueOrThrowArgs>(args: SelectSubset<T, AnonymousUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnonymousUserClient<$Result.GetResult<Prisma.$AnonymousUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnonymousUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousUserFindFirstArgs} args - Arguments to find a AnonymousUser
     * @example
     * // Get one AnonymousUser
     * const anonymousUser = await prisma.anonymousUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnonymousUserFindFirstArgs>(args?: SelectSubset<T, AnonymousUserFindFirstArgs<ExtArgs>>): Prisma__AnonymousUserClient<$Result.GetResult<Prisma.$AnonymousUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnonymousUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousUserFindFirstOrThrowArgs} args - Arguments to find a AnonymousUser
     * @example
     * // Get one AnonymousUser
     * const anonymousUser = await prisma.anonymousUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnonymousUserFindFirstOrThrowArgs>(args?: SelectSubset<T, AnonymousUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnonymousUserClient<$Result.GetResult<Prisma.$AnonymousUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AnonymousUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AnonymousUsers
     * const anonymousUsers = await prisma.anonymousUser.findMany()
     * 
     * // Get first 10 AnonymousUsers
     * const anonymousUsers = await prisma.anonymousUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const anonymousUserWithIdOnly = await prisma.anonymousUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnonymousUserFindManyArgs>(args?: SelectSubset<T, AnonymousUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnonymousUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AnonymousUser.
     * @param {AnonymousUserCreateArgs} args - Arguments to create a AnonymousUser.
     * @example
     * // Create one AnonymousUser
     * const AnonymousUser = await prisma.anonymousUser.create({
     *   data: {
     *     // ... data to create a AnonymousUser
     *   }
     * })
     * 
     */
    create<T extends AnonymousUserCreateArgs>(args: SelectSubset<T, AnonymousUserCreateArgs<ExtArgs>>): Prisma__AnonymousUserClient<$Result.GetResult<Prisma.$AnonymousUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AnonymousUsers.
     * @param {AnonymousUserCreateManyArgs} args - Arguments to create many AnonymousUsers.
     * @example
     * // Create many AnonymousUsers
     * const anonymousUser = await prisma.anonymousUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnonymousUserCreateManyArgs>(args?: SelectSubset<T, AnonymousUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AnonymousUsers and returns the data saved in the database.
     * @param {AnonymousUserCreateManyAndReturnArgs} args - Arguments to create many AnonymousUsers.
     * @example
     * // Create many AnonymousUsers
     * const anonymousUser = await prisma.anonymousUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AnonymousUsers and only return the `id`
     * const anonymousUserWithIdOnly = await prisma.anonymousUser.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnonymousUserCreateManyAndReturnArgs>(args?: SelectSubset<T, AnonymousUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnonymousUserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AnonymousUser.
     * @param {AnonymousUserDeleteArgs} args - Arguments to delete one AnonymousUser.
     * @example
     * // Delete one AnonymousUser
     * const AnonymousUser = await prisma.anonymousUser.delete({
     *   where: {
     *     // ... filter to delete one AnonymousUser
     *   }
     * })
     * 
     */
    delete<T extends AnonymousUserDeleteArgs>(args: SelectSubset<T, AnonymousUserDeleteArgs<ExtArgs>>): Prisma__AnonymousUserClient<$Result.GetResult<Prisma.$AnonymousUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AnonymousUser.
     * @param {AnonymousUserUpdateArgs} args - Arguments to update one AnonymousUser.
     * @example
     * // Update one AnonymousUser
     * const anonymousUser = await prisma.anonymousUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnonymousUserUpdateArgs>(args: SelectSubset<T, AnonymousUserUpdateArgs<ExtArgs>>): Prisma__AnonymousUserClient<$Result.GetResult<Prisma.$AnonymousUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AnonymousUsers.
     * @param {AnonymousUserDeleteManyArgs} args - Arguments to filter AnonymousUsers to delete.
     * @example
     * // Delete a few AnonymousUsers
     * const { count } = await prisma.anonymousUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnonymousUserDeleteManyArgs>(args?: SelectSubset<T, AnonymousUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnonymousUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AnonymousUsers
     * const anonymousUser = await prisma.anonymousUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnonymousUserUpdateManyArgs>(args: SelectSubset<T, AnonymousUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnonymousUsers and returns the data updated in the database.
     * @param {AnonymousUserUpdateManyAndReturnArgs} args - Arguments to update many AnonymousUsers.
     * @example
     * // Update many AnonymousUsers
     * const anonymousUser = await prisma.anonymousUser.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AnonymousUsers and only return the `id`
     * const anonymousUserWithIdOnly = await prisma.anonymousUser.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnonymousUserUpdateManyAndReturnArgs>(args: SelectSubset<T, AnonymousUserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnonymousUserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AnonymousUser.
     * @param {AnonymousUserUpsertArgs} args - Arguments to update or create a AnonymousUser.
     * @example
     * // Update or create a AnonymousUser
     * const anonymousUser = await prisma.anonymousUser.upsert({
     *   create: {
     *     // ... data to create a AnonymousUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AnonymousUser we want to update
     *   }
     * })
     */
    upsert<T extends AnonymousUserUpsertArgs>(args: SelectSubset<T, AnonymousUserUpsertArgs<ExtArgs>>): Prisma__AnonymousUserClient<$Result.GetResult<Prisma.$AnonymousUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AnonymousUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousUserCountArgs} args - Arguments to filter AnonymousUsers to count.
     * @example
     * // Count the number of AnonymousUsers
     * const count = await prisma.anonymousUser.count({
     *   where: {
     *     // ... the filter for the AnonymousUsers we want to count
     *   }
     * })
    **/
    count<T extends AnonymousUserCountArgs>(
      args?: Subset<T, AnonymousUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnonymousUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AnonymousUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnonymousUserAggregateArgs>(args: Subset<T, AnonymousUserAggregateArgs>): Prisma.PrismaPromise<GetAnonymousUserAggregateType<T>>

    /**
     * Group by AnonymousUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnonymousUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnonymousUserGroupByArgs['orderBy'] }
        : { orderBy?: AnonymousUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnonymousUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnonymousUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AnonymousUser model
   */
  readonly fields: AnonymousUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AnonymousUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnonymousUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    confessions<T extends AnonymousUser$confessionsArgs<ExtArgs> = {}>(args?: Subset<T, AnonymousUser$confessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    flags<T extends AnonymousUser$flagsArgs<ExtArgs> = {}>(args?: Subset<T, AnonymousUser$flagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AnonymousUser model
   */
  interface AnonymousUserFieldRefs {
    readonly id: FieldRef<"AnonymousUser", 'String'>
    readonly createdAt: FieldRef<"AnonymousUser", 'DateTime'>
    readonly lastActive: FieldRef<"AnonymousUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AnonymousUser findUnique
   */
  export type AnonymousUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUser
     */
    select?: AnonymousUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUser
     */
    omit?: AnonymousUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnonymousUserInclude<ExtArgs> | null
    /**
     * Filter, which AnonymousUser to fetch.
     */
    where: AnonymousUserWhereUniqueInput
  }

  /**
   * AnonymousUser findUniqueOrThrow
   */
  export type AnonymousUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUser
     */
    select?: AnonymousUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUser
     */
    omit?: AnonymousUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnonymousUserInclude<ExtArgs> | null
    /**
     * Filter, which AnonymousUser to fetch.
     */
    where: AnonymousUserWhereUniqueInput
  }

  /**
   * AnonymousUser findFirst
   */
  export type AnonymousUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUser
     */
    select?: AnonymousUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUser
     */
    omit?: AnonymousUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnonymousUserInclude<ExtArgs> | null
    /**
     * Filter, which AnonymousUser to fetch.
     */
    where?: AnonymousUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnonymousUsers to fetch.
     */
    orderBy?: AnonymousUserOrderByWithRelationInput | AnonymousUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnonymousUsers.
     */
    cursor?: AnonymousUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnonymousUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnonymousUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnonymousUsers.
     */
    distinct?: AnonymousUserScalarFieldEnum | AnonymousUserScalarFieldEnum[]
  }

  /**
   * AnonymousUser findFirstOrThrow
   */
  export type AnonymousUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUser
     */
    select?: AnonymousUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUser
     */
    omit?: AnonymousUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnonymousUserInclude<ExtArgs> | null
    /**
     * Filter, which AnonymousUser to fetch.
     */
    where?: AnonymousUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnonymousUsers to fetch.
     */
    orderBy?: AnonymousUserOrderByWithRelationInput | AnonymousUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnonymousUsers.
     */
    cursor?: AnonymousUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnonymousUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnonymousUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnonymousUsers.
     */
    distinct?: AnonymousUserScalarFieldEnum | AnonymousUserScalarFieldEnum[]
  }

  /**
   * AnonymousUser findMany
   */
  export type AnonymousUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUser
     */
    select?: AnonymousUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUser
     */
    omit?: AnonymousUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnonymousUserInclude<ExtArgs> | null
    /**
     * Filter, which AnonymousUsers to fetch.
     */
    where?: AnonymousUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnonymousUsers to fetch.
     */
    orderBy?: AnonymousUserOrderByWithRelationInput | AnonymousUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AnonymousUsers.
     */
    cursor?: AnonymousUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnonymousUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnonymousUsers.
     */
    skip?: number
    distinct?: AnonymousUserScalarFieldEnum | AnonymousUserScalarFieldEnum[]
  }

  /**
   * AnonymousUser create
   */
  export type AnonymousUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUser
     */
    select?: AnonymousUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUser
     */
    omit?: AnonymousUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnonymousUserInclude<ExtArgs> | null
    /**
     * The data needed to create a AnonymousUser.
     */
    data: XOR<AnonymousUserCreateInput, AnonymousUserUncheckedCreateInput>
  }

  /**
   * AnonymousUser createMany
   */
  export type AnonymousUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AnonymousUsers.
     */
    data: AnonymousUserCreateManyInput | AnonymousUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnonymousUser createManyAndReturn
   */
  export type AnonymousUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUser
     */
    select?: AnonymousUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUser
     */
    omit?: AnonymousUserOmit<ExtArgs> | null
    /**
     * The data used to create many AnonymousUsers.
     */
    data: AnonymousUserCreateManyInput | AnonymousUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnonymousUser update
   */
  export type AnonymousUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUser
     */
    select?: AnonymousUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUser
     */
    omit?: AnonymousUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnonymousUserInclude<ExtArgs> | null
    /**
     * The data needed to update a AnonymousUser.
     */
    data: XOR<AnonymousUserUpdateInput, AnonymousUserUncheckedUpdateInput>
    /**
     * Choose, which AnonymousUser to update.
     */
    where: AnonymousUserWhereUniqueInput
  }

  /**
   * AnonymousUser updateMany
   */
  export type AnonymousUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AnonymousUsers.
     */
    data: XOR<AnonymousUserUpdateManyMutationInput, AnonymousUserUncheckedUpdateManyInput>
    /**
     * Filter which AnonymousUsers to update
     */
    where?: AnonymousUserWhereInput
    /**
     * Limit how many AnonymousUsers to update.
     */
    limit?: number
  }

  /**
   * AnonymousUser updateManyAndReturn
   */
  export type AnonymousUserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUser
     */
    select?: AnonymousUserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUser
     */
    omit?: AnonymousUserOmit<ExtArgs> | null
    /**
     * The data used to update AnonymousUsers.
     */
    data: XOR<AnonymousUserUpdateManyMutationInput, AnonymousUserUncheckedUpdateManyInput>
    /**
     * Filter which AnonymousUsers to update
     */
    where?: AnonymousUserWhereInput
    /**
     * Limit how many AnonymousUsers to update.
     */
    limit?: number
  }

  /**
   * AnonymousUser upsert
   */
  export type AnonymousUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUser
     */
    select?: AnonymousUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUser
     */
    omit?: AnonymousUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnonymousUserInclude<ExtArgs> | null
    /**
     * The filter to search for the AnonymousUser to update in case it exists.
     */
    where: AnonymousUserWhereUniqueInput
    /**
     * In case the AnonymousUser found by the `where` argument doesn't exist, create a new AnonymousUser with this data.
     */
    create: XOR<AnonymousUserCreateInput, AnonymousUserUncheckedCreateInput>
    /**
     * In case the AnonymousUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnonymousUserUpdateInput, AnonymousUserUncheckedUpdateInput>
  }

  /**
   * AnonymousUser delete
   */
  export type AnonymousUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUser
     */
    select?: AnonymousUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUser
     */
    omit?: AnonymousUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnonymousUserInclude<ExtArgs> | null
    /**
     * Filter which AnonymousUser to delete.
     */
    where: AnonymousUserWhereUniqueInput
  }

  /**
   * AnonymousUser deleteMany
   */
  export type AnonymousUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnonymousUsers to delete
     */
    where?: AnonymousUserWhereInput
    /**
     * Limit how many AnonymousUsers to delete.
     */
    limit?: number
  }

  /**
   * AnonymousUser.confessions
   */
  export type AnonymousUser$confessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confession
     */
    select?: ConfessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Confession
     */
    omit?: ConfessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfessionInclude<ExtArgs> | null
    where?: ConfessionWhereInput
    orderBy?: ConfessionOrderByWithRelationInput | ConfessionOrderByWithRelationInput[]
    cursor?: ConfessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConfessionScalarFieldEnum | ConfessionScalarFieldEnum[]
  }

  /**
   * AnonymousUser.flags
   */
  export type AnonymousUser$flagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flag
     */
    select?: FlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flag
     */
    omit?: FlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlagInclude<ExtArgs> | null
    where?: FlagWhereInput
    orderBy?: FlagOrderByWithRelationInput | FlagOrderByWithRelationInput[]
    cursor?: FlagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FlagScalarFieldEnum | FlagScalarFieldEnum[]
  }

  /**
   * AnonymousUser without action
   */
  export type AnonymousUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUser
     */
    select?: AnonymousUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUser
     */
    omit?: AnonymousUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnonymousUserInclude<ExtArgs> | null
  }


  /**
   * Model Confession
   */

  export type AggregateConfession = {
    _count: ConfessionCountAggregateOutputType | null
    _min: ConfessionMinAggregateOutputType | null
    _max: ConfessionMaxAggregateOutputType | null
  }

  export type ConfessionMinAggregateOutputType = {
    id: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type ConfessionMaxAggregateOutputType = {
    id: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type ConfessionCountAggregateOutputType = {
    id: number
    content: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type ConfessionMinAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type ConfessionMaxAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type ConfessionCountAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type ConfessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Confession to aggregate.
     */
    where?: ConfessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Confessions to fetch.
     */
    orderBy?: ConfessionOrderByWithRelationInput | ConfessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConfessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Confessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Confessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Confessions
    **/
    _count?: true | ConfessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConfessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConfessionMaxAggregateInputType
  }

  export type GetConfessionAggregateType<T extends ConfessionAggregateArgs> = {
        [P in keyof T & keyof AggregateConfession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConfession[P]>
      : GetScalarType<T[P], AggregateConfession[P]>
  }




  export type ConfessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConfessionWhereInput
    orderBy?: ConfessionOrderByWithAggregationInput | ConfessionOrderByWithAggregationInput[]
    by: ConfessionScalarFieldEnum[] | ConfessionScalarFieldEnum
    having?: ConfessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConfessionCountAggregateInputType | true
    _min?: ConfessionMinAggregateInputType
    _max?: ConfessionMaxAggregateInputType
  }

  export type ConfessionGroupByOutputType = {
    id: string
    content: string
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: ConfessionCountAggregateOutputType | null
    _min: ConfessionMinAggregateOutputType | null
    _max: ConfessionMaxAggregateOutputType | null
  }

  type GetConfessionGroupByPayload<T extends ConfessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConfessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConfessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConfessionGroupByOutputType[P]>
            : GetScalarType<T[P], ConfessionGroupByOutputType[P]>
        }
      >
    >


  export type ConfessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | AnonymousUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["confession"]>

  export type ConfessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | AnonymousUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["confession"]>

  export type ConfessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | AnonymousUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["confession"]>

  export type ConfessionSelectScalar = {
    id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type ConfessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["confession"]>
  export type ConfessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AnonymousUserDefaultArgs<ExtArgs>
  }
  export type ConfessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AnonymousUserDefaultArgs<ExtArgs>
  }
  export type ConfessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AnonymousUserDefaultArgs<ExtArgs>
  }

  export type $ConfessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Confession"
    objects: {
      user: Prisma.$AnonymousUserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["confession"]>
    composites: {}
  }

  type ConfessionGetPayload<S extends boolean | null | undefined | ConfessionDefaultArgs> = $Result.GetResult<Prisma.$ConfessionPayload, S>

  type ConfessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConfessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConfessionCountAggregateInputType | true
    }

  export interface ConfessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Confession'], meta: { name: 'Confession' } }
    /**
     * Find zero or one Confession that matches the filter.
     * @param {ConfessionFindUniqueArgs} args - Arguments to find a Confession
     * @example
     * // Get one Confession
     * const confession = await prisma.confession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConfessionFindUniqueArgs>(args: SelectSubset<T, ConfessionFindUniqueArgs<ExtArgs>>): Prisma__ConfessionClient<$Result.GetResult<Prisma.$ConfessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Confession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConfessionFindUniqueOrThrowArgs} args - Arguments to find a Confession
     * @example
     * // Get one Confession
     * const confession = await prisma.confession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConfessionFindUniqueOrThrowArgs>(args: SelectSubset<T, ConfessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConfessionClient<$Result.GetResult<Prisma.$ConfessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Confession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfessionFindFirstArgs} args - Arguments to find a Confession
     * @example
     * // Get one Confession
     * const confession = await prisma.confession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConfessionFindFirstArgs>(args?: SelectSubset<T, ConfessionFindFirstArgs<ExtArgs>>): Prisma__ConfessionClient<$Result.GetResult<Prisma.$ConfessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Confession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfessionFindFirstOrThrowArgs} args - Arguments to find a Confession
     * @example
     * // Get one Confession
     * const confession = await prisma.confession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConfessionFindFirstOrThrowArgs>(args?: SelectSubset<T, ConfessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConfessionClient<$Result.GetResult<Prisma.$ConfessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Confessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Confessions
     * const confessions = await prisma.confession.findMany()
     * 
     * // Get first 10 Confessions
     * const confessions = await prisma.confession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const confessionWithIdOnly = await prisma.confession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConfessionFindManyArgs>(args?: SelectSubset<T, ConfessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Confession.
     * @param {ConfessionCreateArgs} args - Arguments to create a Confession.
     * @example
     * // Create one Confession
     * const Confession = await prisma.confession.create({
     *   data: {
     *     // ... data to create a Confession
     *   }
     * })
     * 
     */
    create<T extends ConfessionCreateArgs>(args: SelectSubset<T, ConfessionCreateArgs<ExtArgs>>): Prisma__ConfessionClient<$Result.GetResult<Prisma.$ConfessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Confessions.
     * @param {ConfessionCreateManyArgs} args - Arguments to create many Confessions.
     * @example
     * // Create many Confessions
     * const confession = await prisma.confession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConfessionCreateManyArgs>(args?: SelectSubset<T, ConfessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Confessions and returns the data saved in the database.
     * @param {ConfessionCreateManyAndReturnArgs} args - Arguments to create many Confessions.
     * @example
     * // Create many Confessions
     * const confession = await prisma.confession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Confessions and only return the `id`
     * const confessionWithIdOnly = await prisma.confession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConfessionCreateManyAndReturnArgs>(args?: SelectSubset<T, ConfessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Confession.
     * @param {ConfessionDeleteArgs} args - Arguments to delete one Confession.
     * @example
     * // Delete one Confession
     * const Confession = await prisma.confession.delete({
     *   where: {
     *     // ... filter to delete one Confession
     *   }
     * })
     * 
     */
    delete<T extends ConfessionDeleteArgs>(args: SelectSubset<T, ConfessionDeleteArgs<ExtArgs>>): Prisma__ConfessionClient<$Result.GetResult<Prisma.$ConfessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Confession.
     * @param {ConfessionUpdateArgs} args - Arguments to update one Confession.
     * @example
     * // Update one Confession
     * const confession = await prisma.confession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConfessionUpdateArgs>(args: SelectSubset<T, ConfessionUpdateArgs<ExtArgs>>): Prisma__ConfessionClient<$Result.GetResult<Prisma.$ConfessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Confessions.
     * @param {ConfessionDeleteManyArgs} args - Arguments to filter Confessions to delete.
     * @example
     * // Delete a few Confessions
     * const { count } = await prisma.confession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConfessionDeleteManyArgs>(args?: SelectSubset<T, ConfessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Confessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Confessions
     * const confession = await prisma.confession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConfessionUpdateManyArgs>(args: SelectSubset<T, ConfessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Confessions and returns the data updated in the database.
     * @param {ConfessionUpdateManyAndReturnArgs} args - Arguments to update many Confessions.
     * @example
     * // Update many Confessions
     * const confession = await prisma.confession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Confessions and only return the `id`
     * const confessionWithIdOnly = await prisma.confession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConfessionUpdateManyAndReturnArgs>(args: SelectSubset<T, ConfessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Confession.
     * @param {ConfessionUpsertArgs} args - Arguments to update or create a Confession.
     * @example
     * // Update or create a Confession
     * const confession = await prisma.confession.upsert({
     *   create: {
     *     // ... data to create a Confession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Confession we want to update
     *   }
     * })
     */
    upsert<T extends ConfessionUpsertArgs>(args: SelectSubset<T, ConfessionUpsertArgs<ExtArgs>>): Prisma__ConfessionClient<$Result.GetResult<Prisma.$ConfessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Confessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfessionCountArgs} args - Arguments to filter Confessions to count.
     * @example
     * // Count the number of Confessions
     * const count = await prisma.confession.count({
     *   where: {
     *     // ... the filter for the Confessions we want to count
     *   }
     * })
    **/
    count<T extends ConfessionCountArgs>(
      args?: Subset<T, ConfessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConfessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Confession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConfessionAggregateArgs>(args: Subset<T, ConfessionAggregateArgs>): Prisma.PrismaPromise<GetConfessionAggregateType<T>>

    /**
     * Group by Confession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConfessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConfessionGroupByArgs['orderBy'] }
        : { orderBy?: ConfessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConfessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConfessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Confession model
   */
  readonly fields: ConfessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Confession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConfessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AnonymousUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnonymousUserDefaultArgs<ExtArgs>>): Prisma__AnonymousUserClient<$Result.GetResult<Prisma.$AnonymousUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Confession model
   */
  interface ConfessionFieldRefs {
    readonly id: FieldRef<"Confession", 'String'>
    readonly content: FieldRef<"Confession", 'String'>
    readonly createdAt: FieldRef<"Confession", 'DateTime'>
    readonly updatedAt: FieldRef<"Confession", 'DateTime'>
    readonly userId: FieldRef<"Confession", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Confession findUnique
   */
  export type ConfessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confession
     */
    select?: ConfessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Confession
     */
    omit?: ConfessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfessionInclude<ExtArgs> | null
    /**
     * Filter, which Confession to fetch.
     */
    where: ConfessionWhereUniqueInput
  }

  /**
   * Confession findUniqueOrThrow
   */
  export type ConfessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confession
     */
    select?: ConfessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Confession
     */
    omit?: ConfessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfessionInclude<ExtArgs> | null
    /**
     * Filter, which Confession to fetch.
     */
    where: ConfessionWhereUniqueInput
  }

  /**
   * Confession findFirst
   */
  export type ConfessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confession
     */
    select?: ConfessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Confession
     */
    omit?: ConfessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfessionInclude<ExtArgs> | null
    /**
     * Filter, which Confession to fetch.
     */
    where?: ConfessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Confessions to fetch.
     */
    orderBy?: ConfessionOrderByWithRelationInput | ConfessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Confessions.
     */
    cursor?: ConfessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Confessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Confessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Confessions.
     */
    distinct?: ConfessionScalarFieldEnum | ConfessionScalarFieldEnum[]
  }

  /**
   * Confession findFirstOrThrow
   */
  export type ConfessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confession
     */
    select?: ConfessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Confession
     */
    omit?: ConfessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfessionInclude<ExtArgs> | null
    /**
     * Filter, which Confession to fetch.
     */
    where?: ConfessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Confessions to fetch.
     */
    orderBy?: ConfessionOrderByWithRelationInput | ConfessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Confessions.
     */
    cursor?: ConfessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Confessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Confessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Confessions.
     */
    distinct?: ConfessionScalarFieldEnum | ConfessionScalarFieldEnum[]
  }

  /**
   * Confession findMany
   */
  export type ConfessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confession
     */
    select?: ConfessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Confession
     */
    omit?: ConfessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfessionInclude<ExtArgs> | null
    /**
     * Filter, which Confessions to fetch.
     */
    where?: ConfessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Confessions to fetch.
     */
    orderBy?: ConfessionOrderByWithRelationInput | ConfessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Confessions.
     */
    cursor?: ConfessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Confessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Confessions.
     */
    skip?: number
    distinct?: ConfessionScalarFieldEnum | ConfessionScalarFieldEnum[]
  }

  /**
   * Confession create
   */
  export type ConfessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confession
     */
    select?: ConfessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Confession
     */
    omit?: ConfessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Confession.
     */
    data: XOR<ConfessionCreateInput, ConfessionUncheckedCreateInput>
  }

  /**
   * Confession createMany
   */
  export type ConfessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Confessions.
     */
    data: ConfessionCreateManyInput | ConfessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Confession createManyAndReturn
   */
  export type ConfessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confession
     */
    select?: ConfessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Confession
     */
    omit?: ConfessionOmit<ExtArgs> | null
    /**
     * The data used to create many Confessions.
     */
    data: ConfessionCreateManyInput | ConfessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Confession update
   */
  export type ConfessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confession
     */
    select?: ConfessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Confession
     */
    omit?: ConfessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Confession.
     */
    data: XOR<ConfessionUpdateInput, ConfessionUncheckedUpdateInput>
    /**
     * Choose, which Confession to update.
     */
    where: ConfessionWhereUniqueInput
  }

  /**
   * Confession updateMany
   */
  export type ConfessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Confessions.
     */
    data: XOR<ConfessionUpdateManyMutationInput, ConfessionUncheckedUpdateManyInput>
    /**
     * Filter which Confessions to update
     */
    where?: ConfessionWhereInput
    /**
     * Limit how many Confessions to update.
     */
    limit?: number
  }

  /**
   * Confession updateManyAndReturn
   */
  export type ConfessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confession
     */
    select?: ConfessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Confession
     */
    omit?: ConfessionOmit<ExtArgs> | null
    /**
     * The data used to update Confessions.
     */
    data: XOR<ConfessionUpdateManyMutationInput, ConfessionUncheckedUpdateManyInput>
    /**
     * Filter which Confessions to update
     */
    where?: ConfessionWhereInput
    /**
     * Limit how many Confessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Confession upsert
   */
  export type ConfessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confession
     */
    select?: ConfessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Confession
     */
    omit?: ConfessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Confession to update in case it exists.
     */
    where: ConfessionWhereUniqueInput
    /**
     * In case the Confession found by the `where` argument doesn't exist, create a new Confession with this data.
     */
    create: XOR<ConfessionCreateInput, ConfessionUncheckedCreateInput>
    /**
     * In case the Confession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConfessionUpdateInput, ConfessionUncheckedUpdateInput>
  }

  /**
   * Confession delete
   */
  export type ConfessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confession
     */
    select?: ConfessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Confession
     */
    omit?: ConfessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfessionInclude<ExtArgs> | null
    /**
     * Filter which Confession to delete.
     */
    where: ConfessionWhereUniqueInput
  }

  /**
   * Confession deleteMany
   */
  export type ConfessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Confessions to delete
     */
    where?: ConfessionWhereInput
    /**
     * Limit how many Confessions to delete.
     */
    limit?: number
  }

  /**
   * Confession without action
   */
  export type ConfessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confession
     */
    select?: ConfessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Confession
     */
    omit?: ConfessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfessionInclude<ExtArgs> | null
  }


  /**
   * Model Flag
   */

  export type AggregateFlag = {
    _count: FlagCountAggregateOutputType | null
    _min: FlagMinAggregateOutputType | null
    _max: FlagMaxAggregateOutputType | null
  }

  export type FlagMinAggregateOutputType = {
    id: string | null
    contentType: string | null
    contentId: string | null
    reason: string | null
    createdAt: Date | null
    userId: string | null
  }

  export type FlagMaxAggregateOutputType = {
    id: string | null
    contentType: string | null
    contentId: string | null
    reason: string | null
    createdAt: Date | null
    userId: string | null
  }

  export type FlagCountAggregateOutputType = {
    id: number
    contentType: number
    contentId: number
    reason: number
    createdAt: number
    userId: number
    _all: number
  }


  export type FlagMinAggregateInputType = {
    id?: true
    contentType?: true
    contentId?: true
    reason?: true
    createdAt?: true
    userId?: true
  }

  export type FlagMaxAggregateInputType = {
    id?: true
    contentType?: true
    contentId?: true
    reason?: true
    createdAt?: true
    userId?: true
  }

  export type FlagCountAggregateInputType = {
    id?: true
    contentType?: true
    contentId?: true
    reason?: true
    createdAt?: true
    userId?: true
    _all?: true
  }

  export type FlagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Flag to aggregate.
     */
    where?: FlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Flags to fetch.
     */
    orderBy?: FlagOrderByWithRelationInput | FlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Flags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Flags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Flags
    **/
    _count?: true | FlagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FlagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FlagMaxAggregateInputType
  }

  export type GetFlagAggregateType<T extends FlagAggregateArgs> = {
        [P in keyof T & keyof AggregateFlag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFlag[P]>
      : GetScalarType<T[P], AggregateFlag[P]>
  }




  export type FlagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FlagWhereInput
    orderBy?: FlagOrderByWithAggregationInput | FlagOrderByWithAggregationInput[]
    by: FlagScalarFieldEnum[] | FlagScalarFieldEnum
    having?: FlagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FlagCountAggregateInputType | true
    _min?: FlagMinAggregateInputType
    _max?: FlagMaxAggregateInputType
  }

  export type FlagGroupByOutputType = {
    id: string
    contentType: string
    contentId: string
    reason: string | null
    createdAt: Date
    userId: string | null
    _count: FlagCountAggregateOutputType | null
    _min: FlagMinAggregateOutputType | null
    _max: FlagMaxAggregateOutputType | null
  }

  type GetFlagGroupByPayload<T extends FlagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FlagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FlagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FlagGroupByOutputType[P]>
            : GetScalarType<T[P], FlagGroupByOutputType[P]>
        }
      >
    >


  export type FlagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contentType?: boolean
    contentId?: boolean
    reason?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | Flag$userArgs<ExtArgs>
  }, ExtArgs["result"]["flag"]>

  export type FlagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contentType?: boolean
    contentId?: boolean
    reason?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | Flag$userArgs<ExtArgs>
  }, ExtArgs["result"]["flag"]>

  export type FlagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contentType?: boolean
    contentId?: boolean
    reason?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | Flag$userArgs<ExtArgs>
  }, ExtArgs["result"]["flag"]>

  export type FlagSelectScalar = {
    id?: boolean
    contentType?: boolean
    contentId?: boolean
    reason?: boolean
    createdAt?: boolean
    userId?: boolean
  }

  export type FlagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "contentType" | "contentId" | "reason" | "createdAt" | "userId", ExtArgs["result"]["flag"]>
  export type FlagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Flag$userArgs<ExtArgs>
  }
  export type FlagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Flag$userArgs<ExtArgs>
  }
  export type FlagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Flag$userArgs<ExtArgs>
  }

  export type $FlagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Flag"
    objects: {
      user: Prisma.$AnonymousUserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      contentType: string
      contentId: string
      reason: string | null
      createdAt: Date
      userId: string | null
    }, ExtArgs["result"]["flag"]>
    composites: {}
  }

  type FlagGetPayload<S extends boolean | null | undefined | FlagDefaultArgs> = $Result.GetResult<Prisma.$FlagPayload, S>

  type FlagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FlagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FlagCountAggregateInputType | true
    }

  export interface FlagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Flag'], meta: { name: 'Flag' } }
    /**
     * Find zero or one Flag that matches the filter.
     * @param {FlagFindUniqueArgs} args - Arguments to find a Flag
     * @example
     * // Get one Flag
     * const flag = await prisma.flag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FlagFindUniqueArgs>(args: SelectSubset<T, FlagFindUniqueArgs<ExtArgs>>): Prisma__FlagClient<$Result.GetResult<Prisma.$FlagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Flag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FlagFindUniqueOrThrowArgs} args - Arguments to find a Flag
     * @example
     * // Get one Flag
     * const flag = await prisma.flag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FlagFindUniqueOrThrowArgs>(args: SelectSubset<T, FlagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FlagClient<$Result.GetResult<Prisma.$FlagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Flag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlagFindFirstArgs} args - Arguments to find a Flag
     * @example
     * // Get one Flag
     * const flag = await prisma.flag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FlagFindFirstArgs>(args?: SelectSubset<T, FlagFindFirstArgs<ExtArgs>>): Prisma__FlagClient<$Result.GetResult<Prisma.$FlagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Flag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlagFindFirstOrThrowArgs} args - Arguments to find a Flag
     * @example
     * // Get one Flag
     * const flag = await prisma.flag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FlagFindFirstOrThrowArgs>(args?: SelectSubset<T, FlagFindFirstOrThrowArgs<ExtArgs>>): Prisma__FlagClient<$Result.GetResult<Prisma.$FlagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Flags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Flags
     * const flags = await prisma.flag.findMany()
     * 
     * // Get first 10 Flags
     * const flags = await prisma.flag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const flagWithIdOnly = await prisma.flag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FlagFindManyArgs>(args?: SelectSubset<T, FlagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Flag.
     * @param {FlagCreateArgs} args - Arguments to create a Flag.
     * @example
     * // Create one Flag
     * const Flag = await prisma.flag.create({
     *   data: {
     *     // ... data to create a Flag
     *   }
     * })
     * 
     */
    create<T extends FlagCreateArgs>(args: SelectSubset<T, FlagCreateArgs<ExtArgs>>): Prisma__FlagClient<$Result.GetResult<Prisma.$FlagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Flags.
     * @param {FlagCreateManyArgs} args - Arguments to create many Flags.
     * @example
     * // Create many Flags
     * const flag = await prisma.flag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FlagCreateManyArgs>(args?: SelectSubset<T, FlagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Flags and returns the data saved in the database.
     * @param {FlagCreateManyAndReturnArgs} args - Arguments to create many Flags.
     * @example
     * // Create many Flags
     * const flag = await prisma.flag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Flags and only return the `id`
     * const flagWithIdOnly = await prisma.flag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FlagCreateManyAndReturnArgs>(args?: SelectSubset<T, FlagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Flag.
     * @param {FlagDeleteArgs} args - Arguments to delete one Flag.
     * @example
     * // Delete one Flag
     * const Flag = await prisma.flag.delete({
     *   where: {
     *     // ... filter to delete one Flag
     *   }
     * })
     * 
     */
    delete<T extends FlagDeleteArgs>(args: SelectSubset<T, FlagDeleteArgs<ExtArgs>>): Prisma__FlagClient<$Result.GetResult<Prisma.$FlagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Flag.
     * @param {FlagUpdateArgs} args - Arguments to update one Flag.
     * @example
     * // Update one Flag
     * const flag = await prisma.flag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FlagUpdateArgs>(args: SelectSubset<T, FlagUpdateArgs<ExtArgs>>): Prisma__FlagClient<$Result.GetResult<Prisma.$FlagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Flags.
     * @param {FlagDeleteManyArgs} args - Arguments to filter Flags to delete.
     * @example
     * // Delete a few Flags
     * const { count } = await prisma.flag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FlagDeleteManyArgs>(args?: SelectSubset<T, FlagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Flags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Flags
     * const flag = await prisma.flag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FlagUpdateManyArgs>(args: SelectSubset<T, FlagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Flags and returns the data updated in the database.
     * @param {FlagUpdateManyAndReturnArgs} args - Arguments to update many Flags.
     * @example
     * // Update many Flags
     * const flag = await prisma.flag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Flags and only return the `id`
     * const flagWithIdOnly = await prisma.flag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FlagUpdateManyAndReturnArgs>(args: SelectSubset<T, FlagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Flag.
     * @param {FlagUpsertArgs} args - Arguments to update or create a Flag.
     * @example
     * // Update or create a Flag
     * const flag = await prisma.flag.upsert({
     *   create: {
     *     // ... data to create a Flag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Flag we want to update
     *   }
     * })
     */
    upsert<T extends FlagUpsertArgs>(args: SelectSubset<T, FlagUpsertArgs<ExtArgs>>): Prisma__FlagClient<$Result.GetResult<Prisma.$FlagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Flags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlagCountArgs} args - Arguments to filter Flags to count.
     * @example
     * // Count the number of Flags
     * const count = await prisma.flag.count({
     *   where: {
     *     // ... the filter for the Flags we want to count
     *   }
     * })
    **/
    count<T extends FlagCountArgs>(
      args?: Subset<T, FlagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FlagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Flag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FlagAggregateArgs>(args: Subset<T, FlagAggregateArgs>): Prisma.PrismaPromise<GetFlagAggregateType<T>>

    /**
     * Group by Flag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FlagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FlagGroupByArgs['orderBy'] }
        : { orderBy?: FlagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FlagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFlagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Flag model
   */
  readonly fields: FlagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Flag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FlagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Flag$userArgs<ExtArgs> = {}>(args?: Subset<T, Flag$userArgs<ExtArgs>>): Prisma__AnonymousUserClient<$Result.GetResult<Prisma.$AnonymousUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Flag model
   */
  interface FlagFieldRefs {
    readonly id: FieldRef<"Flag", 'String'>
    readonly contentType: FieldRef<"Flag", 'String'>
    readonly contentId: FieldRef<"Flag", 'String'>
    readonly reason: FieldRef<"Flag", 'String'>
    readonly createdAt: FieldRef<"Flag", 'DateTime'>
    readonly userId: FieldRef<"Flag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Flag findUnique
   */
  export type FlagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flag
     */
    select?: FlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flag
     */
    omit?: FlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlagInclude<ExtArgs> | null
    /**
     * Filter, which Flag to fetch.
     */
    where: FlagWhereUniqueInput
  }

  /**
   * Flag findUniqueOrThrow
   */
  export type FlagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flag
     */
    select?: FlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flag
     */
    omit?: FlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlagInclude<ExtArgs> | null
    /**
     * Filter, which Flag to fetch.
     */
    where: FlagWhereUniqueInput
  }

  /**
   * Flag findFirst
   */
  export type FlagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flag
     */
    select?: FlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flag
     */
    omit?: FlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlagInclude<ExtArgs> | null
    /**
     * Filter, which Flag to fetch.
     */
    where?: FlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Flags to fetch.
     */
    orderBy?: FlagOrderByWithRelationInput | FlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Flags.
     */
    cursor?: FlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Flags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Flags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Flags.
     */
    distinct?: FlagScalarFieldEnum | FlagScalarFieldEnum[]
  }

  /**
   * Flag findFirstOrThrow
   */
  export type FlagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flag
     */
    select?: FlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flag
     */
    omit?: FlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlagInclude<ExtArgs> | null
    /**
     * Filter, which Flag to fetch.
     */
    where?: FlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Flags to fetch.
     */
    orderBy?: FlagOrderByWithRelationInput | FlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Flags.
     */
    cursor?: FlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Flags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Flags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Flags.
     */
    distinct?: FlagScalarFieldEnum | FlagScalarFieldEnum[]
  }

  /**
   * Flag findMany
   */
  export type FlagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flag
     */
    select?: FlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flag
     */
    omit?: FlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlagInclude<ExtArgs> | null
    /**
     * Filter, which Flags to fetch.
     */
    where?: FlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Flags to fetch.
     */
    orderBy?: FlagOrderByWithRelationInput | FlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Flags.
     */
    cursor?: FlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Flags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Flags.
     */
    skip?: number
    distinct?: FlagScalarFieldEnum | FlagScalarFieldEnum[]
  }

  /**
   * Flag create
   */
  export type FlagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flag
     */
    select?: FlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flag
     */
    omit?: FlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlagInclude<ExtArgs> | null
    /**
     * The data needed to create a Flag.
     */
    data: XOR<FlagCreateInput, FlagUncheckedCreateInput>
  }

  /**
   * Flag createMany
   */
  export type FlagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Flags.
     */
    data: FlagCreateManyInput | FlagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Flag createManyAndReturn
   */
  export type FlagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flag
     */
    select?: FlagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Flag
     */
    omit?: FlagOmit<ExtArgs> | null
    /**
     * The data used to create many Flags.
     */
    data: FlagCreateManyInput | FlagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Flag update
   */
  export type FlagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flag
     */
    select?: FlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flag
     */
    omit?: FlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlagInclude<ExtArgs> | null
    /**
     * The data needed to update a Flag.
     */
    data: XOR<FlagUpdateInput, FlagUncheckedUpdateInput>
    /**
     * Choose, which Flag to update.
     */
    where: FlagWhereUniqueInput
  }

  /**
   * Flag updateMany
   */
  export type FlagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Flags.
     */
    data: XOR<FlagUpdateManyMutationInput, FlagUncheckedUpdateManyInput>
    /**
     * Filter which Flags to update
     */
    where?: FlagWhereInput
    /**
     * Limit how many Flags to update.
     */
    limit?: number
  }

  /**
   * Flag updateManyAndReturn
   */
  export type FlagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flag
     */
    select?: FlagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Flag
     */
    omit?: FlagOmit<ExtArgs> | null
    /**
     * The data used to update Flags.
     */
    data: XOR<FlagUpdateManyMutationInput, FlagUncheckedUpdateManyInput>
    /**
     * Filter which Flags to update
     */
    where?: FlagWhereInput
    /**
     * Limit how many Flags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlagIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Flag upsert
   */
  export type FlagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flag
     */
    select?: FlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flag
     */
    omit?: FlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlagInclude<ExtArgs> | null
    /**
     * The filter to search for the Flag to update in case it exists.
     */
    where: FlagWhereUniqueInput
    /**
     * In case the Flag found by the `where` argument doesn't exist, create a new Flag with this data.
     */
    create: XOR<FlagCreateInput, FlagUncheckedCreateInput>
    /**
     * In case the Flag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FlagUpdateInput, FlagUncheckedUpdateInput>
  }

  /**
   * Flag delete
   */
  export type FlagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flag
     */
    select?: FlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flag
     */
    omit?: FlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlagInclude<ExtArgs> | null
    /**
     * Filter which Flag to delete.
     */
    where: FlagWhereUniqueInput
  }

  /**
   * Flag deleteMany
   */
  export type FlagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Flags to delete
     */
    where?: FlagWhereInput
    /**
     * Limit how many Flags to delete.
     */
    limit?: number
  }

  /**
   * Flag.user
   */
  export type Flag$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUser
     */
    select?: AnonymousUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUser
     */
    omit?: AnonymousUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnonymousUserInclude<ExtArgs> | null
    where?: AnonymousUserWhereInput
  }

  /**
   * Flag without action
   */
  export type FlagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flag
     */
    select?: FlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flag
     */
    omit?: FlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlagInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AnonymousUserScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    lastActive: 'lastActive'
  };

  export type AnonymousUserScalarFieldEnum = (typeof AnonymousUserScalarFieldEnum)[keyof typeof AnonymousUserScalarFieldEnum]


  export const ConfessionScalarFieldEnum: {
    id: 'id',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type ConfessionScalarFieldEnum = (typeof ConfessionScalarFieldEnum)[keyof typeof ConfessionScalarFieldEnum]


  export const FlagScalarFieldEnum: {
    id: 'id',
    contentType: 'contentType',
    contentId: 'contentId',
    reason: 'reason',
    createdAt: 'createdAt',
    userId: 'userId'
  };

  export type FlagScalarFieldEnum = (typeof FlagScalarFieldEnum)[keyof typeof FlagScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type AnonymousUserWhereInput = {
    AND?: AnonymousUserWhereInput | AnonymousUserWhereInput[]
    OR?: AnonymousUserWhereInput[]
    NOT?: AnonymousUserWhereInput | AnonymousUserWhereInput[]
    id?: StringFilter<"AnonymousUser"> | string
    createdAt?: DateTimeFilter<"AnonymousUser"> | Date | string
    lastActive?: DateTimeFilter<"AnonymousUser"> | Date | string
    confessions?: ConfessionListRelationFilter
    flags?: FlagListRelationFilter
  }

  export type AnonymousUserOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    lastActive?: SortOrder
    confessions?: ConfessionOrderByRelationAggregateInput
    flags?: FlagOrderByRelationAggregateInput
  }

  export type AnonymousUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnonymousUserWhereInput | AnonymousUserWhereInput[]
    OR?: AnonymousUserWhereInput[]
    NOT?: AnonymousUserWhereInput | AnonymousUserWhereInput[]
    createdAt?: DateTimeFilter<"AnonymousUser"> | Date | string
    lastActive?: DateTimeFilter<"AnonymousUser"> | Date | string
    confessions?: ConfessionListRelationFilter
    flags?: FlagListRelationFilter
  }, "id">

  export type AnonymousUserOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    lastActive?: SortOrder
    _count?: AnonymousUserCountOrderByAggregateInput
    _max?: AnonymousUserMaxOrderByAggregateInput
    _min?: AnonymousUserMinOrderByAggregateInput
  }

  export type AnonymousUserScalarWhereWithAggregatesInput = {
    AND?: AnonymousUserScalarWhereWithAggregatesInput | AnonymousUserScalarWhereWithAggregatesInput[]
    OR?: AnonymousUserScalarWhereWithAggregatesInput[]
    NOT?: AnonymousUserScalarWhereWithAggregatesInput | AnonymousUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AnonymousUser"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AnonymousUser"> | Date | string
    lastActive?: DateTimeWithAggregatesFilter<"AnonymousUser"> | Date | string
  }

  export type ConfessionWhereInput = {
    AND?: ConfessionWhereInput | ConfessionWhereInput[]
    OR?: ConfessionWhereInput[]
    NOT?: ConfessionWhereInput | ConfessionWhereInput[]
    id?: StringFilter<"Confession"> | string
    content?: StringFilter<"Confession"> | string
    createdAt?: DateTimeFilter<"Confession"> | Date | string
    updatedAt?: DateTimeFilter<"Confession"> | Date | string
    userId?: StringFilter<"Confession"> | string
    user?: XOR<AnonymousUserScalarRelationFilter, AnonymousUserWhereInput>
  }

  export type ConfessionOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: AnonymousUserOrderByWithRelationInput
  }

  export type ConfessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConfessionWhereInput | ConfessionWhereInput[]
    OR?: ConfessionWhereInput[]
    NOT?: ConfessionWhereInput | ConfessionWhereInput[]
    content?: StringFilter<"Confession"> | string
    createdAt?: DateTimeFilter<"Confession"> | Date | string
    updatedAt?: DateTimeFilter<"Confession"> | Date | string
    userId?: StringFilter<"Confession"> | string
    user?: XOR<AnonymousUserScalarRelationFilter, AnonymousUserWhereInput>
  }, "id">

  export type ConfessionOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: ConfessionCountOrderByAggregateInput
    _max?: ConfessionMaxOrderByAggregateInput
    _min?: ConfessionMinOrderByAggregateInput
  }

  export type ConfessionScalarWhereWithAggregatesInput = {
    AND?: ConfessionScalarWhereWithAggregatesInput | ConfessionScalarWhereWithAggregatesInput[]
    OR?: ConfessionScalarWhereWithAggregatesInput[]
    NOT?: ConfessionScalarWhereWithAggregatesInput | ConfessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Confession"> | string
    content?: StringWithAggregatesFilter<"Confession"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Confession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Confession"> | Date | string
    userId?: StringWithAggregatesFilter<"Confession"> | string
  }

  export type FlagWhereInput = {
    AND?: FlagWhereInput | FlagWhereInput[]
    OR?: FlagWhereInput[]
    NOT?: FlagWhereInput | FlagWhereInput[]
    id?: StringFilter<"Flag"> | string
    contentType?: StringFilter<"Flag"> | string
    contentId?: StringFilter<"Flag"> | string
    reason?: StringNullableFilter<"Flag"> | string | null
    createdAt?: DateTimeFilter<"Flag"> | Date | string
    userId?: StringNullableFilter<"Flag"> | string | null
    user?: XOR<AnonymousUserNullableScalarRelationFilter, AnonymousUserWhereInput> | null
  }

  export type FlagOrderByWithRelationInput = {
    id?: SortOrder
    contentType?: SortOrder
    contentId?: SortOrder
    reason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    user?: AnonymousUserOrderByWithRelationInput
  }

  export type FlagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FlagWhereInput | FlagWhereInput[]
    OR?: FlagWhereInput[]
    NOT?: FlagWhereInput | FlagWhereInput[]
    contentType?: StringFilter<"Flag"> | string
    contentId?: StringFilter<"Flag"> | string
    reason?: StringNullableFilter<"Flag"> | string | null
    createdAt?: DateTimeFilter<"Flag"> | Date | string
    userId?: StringNullableFilter<"Flag"> | string | null
    user?: XOR<AnonymousUserNullableScalarRelationFilter, AnonymousUserWhereInput> | null
  }, "id">

  export type FlagOrderByWithAggregationInput = {
    id?: SortOrder
    contentType?: SortOrder
    contentId?: SortOrder
    reason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    _count?: FlagCountOrderByAggregateInput
    _max?: FlagMaxOrderByAggregateInput
    _min?: FlagMinOrderByAggregateInput
  }

  export type FlagScalarWhereWithAggregatesInput = {
    AND?: FlagScalarWhereWithAggregatesInput | FlagScalarWhereWithAggregatesInput[]
    OR?: FlagScalarWhereWithAggregatesInput[]
    NOT?: FlagScalarWhereWithAggregatesInput | FlagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Flag"> | string
    contentType?: StringWithAggregatesFilter<"Flag"> | string
    contentId?: StringWithAggregatesFilter<"Flag"> | string
    reason?: StringNullableWithAggregatesFilter<"Flag"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Flag"> | Date | string
    userId?: StringNullableWithAggregatesFilter<"Flag"> | string | null
  }

  export type AnonymousUserCreateInput = {
    id?: string
    createdAt?: Date | string
    lastActive?: Date | string
    confessions?: ConfessionCreateNestedManyWithoutUserInput
    flags?: FlagCreateNestedManyWithoutUserInput
  }

  export type AnonymousUserUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    lastActive?: Date | string
    confessions?: ConfessionUncheckedCreateNestedManyWithoutUserInput
    flags?: FlagUncheckedCreateNestedManyWithoutUserInput
  }

  export type AnonymousUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
    confessions?: ConfessionUpdateManyWithoutUserNestedInput
    flags?: FlagUpdateManyWithoutUserNestedInput
  }

  export type AnonymousUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
    confessions?: ConfessionUncheckedUpdateManyWithoutUserNestedInput
    flags?: FlagUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AnonymousUserCreateManyInput = {
    id?: string
    createdAt?: Date | string
    lastActive?: Date | string
  }

  export type AnonymousUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnonymousUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConfessionCreateInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: AnonymousUserCreateNestedOneWithoutConfessionsInput
  }

  export type ConfessionUncheckedCreateInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type ConfessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: AnonymousUserUpdateOneRequiredWithoutConfessionsNestedInput
  }

  export type ConfessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ConfessionCreateManyInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type ConfessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConfessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type FlagCreateInput = {
    id?: string
    contentType: string
    contentId: string
    reason?: string | null
    createdAt?: Date | string
    user?: AnonymousUserCreateNestedOneWithoutFlagsInput
  }

  export type FlagUncheckedCreateInput = {
    id?: string
    contentType: string
    contentId: string
    reason?: string | null
    createdAt?: Date | string
    userId?: string | null
  }

  export type FlagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    contentId?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: AnonymousUserUpdateOneWithoutFlagsNestedInput
  }

  export type FlagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    contentId?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FlagCreateManyInput = {
    id?: string
    contentType: string
    contentId: string
    reason?: string | null
    createdAt?: Date | string
    userId?: string | null
  }

  export type FlagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    contentId?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    contentId?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ConfessionListRelationFilter = {
    every?: ConfessionWhereInput
    some?: ConfessionWhereInput
    none?: ConfessionWhereInput
  }

  export type FlagListRelationFilter = {
    every?: FlagWhereInput
    some?: FlagWhereInput
    none?: FlagWhereInput
  }

  export type ConfessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FlagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnonymousUserCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    lastActive?: SortOrder
  }

  export type AnonymousUserMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    lastActive?: SortOrder
  }

  export type AnonymousUserMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    lastActive?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type AnonymousUserScalarRelationFilter = {
    is?: AnonymousUserWhereInput
    isNot?: AnonymousUserWhereInput
  }

  export type ConfessionCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ConfessionMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ConfessionMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type AnonymousUserNullableScalarRelationFilter = {
    is?: AnonymousUserWhereInput | null
    isNot?: AnonymousUserWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FlagCountOrderByAggregateInput = {
    id?: SortOrder
    contentType?: SortOrder
    contentId?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type FlagMaxOrderByAggregateInput = {
    id?: SortOrder
    contentType?: SortOrder
    contentId?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type FlagMinOrderByAggregateInput = {
    id?: SortOrder
    contentType?: SortOrder
    contentId?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ConfessionCreateNestedManyWithoutUserInput = {
    create?: XOR<ConfessionCreateWithoutUserInput, ConfessionUncheckedCreateWithoutUserInput> | ConfessionCreateWithoutUserInput[] | ConfessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConfessionCreateOrConnectWithoutUserInput | ConfessionCreateOrConnectWithoutUserInput[]
    createMany?: ConfessionCreateManyUserInputEnvelope
    connect?: ConfessionWhereUniqueInput | ConfessionWhereUniqueInput[]
  }

  export type FlagCreateNestedManyWithoutUserInput = {
    create?: XOR<FlagCreateWithoutUserInput, FlagUncheckedCreateWithoutUserInput> | FlagCreateWithoutUserInput[] | FlagUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FlagCreateOrConnectWithoutUserInput | FlagCreateOrConnectWithoutUserInput[]
    createMany?: FlagCreateManyUserInputEnvelope
    connect?: FlagWhereUniqueInput | FlagWhereUniqueInput[]
  }

  export type ConfessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ConfessionCreateWithoutUserInput, ConfessionUncheckedCreateWithoutUserInput> | ConfessionCreateWithoutUserInput[] | ConfessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConfessionCreateOrConnectWithoutUserInput | ConfessionCreateOrConnectWithoutUserInput[]
    createMany?: ConfessionCreateManyUserInputEnvelope
    connect?: ConfessionWhereUniqueInput | ConfessionWhereUniqueInput[]
  }

  export type FlagUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FlagCreateWithoutUserInput, FlagUncheckedCreateWithoutUserInput> | FlagCreateWithoutUserInput[] | FlagUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FlagCreateOrConnectWithoutUserInput | FlagCreateOrConnectWithoutUserInput[]
    createMany?: FlagCreateManyUserInputEnvelope
    connect?: FlagWhereUniqueInput | FlagWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ConfessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConfessionCreateWithoutUserInput, ConfessionUncheckedCreateWithoutUserInput> | ConfessionCreateWithoutUserInput[] | ConfessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConfessionCreateOrConnectWithoutUserInput | ConfessionCreateOrConnectWithoutUserInput[]
    upsert?: ConfessionUpsertWithWhereUniqueWithoutUserInput | ConfessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConfessionCreateManyUserInputEnvelope
    set?: ConfessionWhereUniqueInput | ConfessionWhereUniqueInput[]
    disconnect?: ConfessionWhereUniqueInput | ConfessionWhereUniqueInput[]
    delete?: ConfessionWhereUniqueInput | ConfessionWhereUniqueInput[]
    connect?: ConfessionWhereUniqueInput | ConfessionWhereUniqueInput[]
    update?: ConfessionUpdateWithWhereUniqueWithoutUserInput | ConfessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConfessionUpdateManyWithWhereWithoutUserInput | ConfessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConfessionScalarWhereInput | ConfessionScalarWhereInput[]
  }

  export type FlagUpdateManyWithoutUserNestedInput = {
    create?: XOR<FlagCreateWithoutUserInput, FlagUncheckedCreateWithoutUserInput> | FlagCreateWithoutUserInput[] | FlagUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FlagCreateOrConnectWithoutUserInput | FlagCreateOrConnectWithoutUserInput[]
    upsert?: FlagUpsertWithWhereUniqueWithoutUserInput | FlagUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FlagCreateManyUserInputEnvelope
    set?: FlagWhereUniqueInput | FlagWhereUniqueInput[]
    disconnect?: FlagWhereUniqueInput | FlagWhereUniqueInput[]
    delete?: FlagWhereUniqueInput | FlagWhereUniqueInput[]
    connect?: FlagWhereUniqueInput | FlagWhereUniqueInput[]
    update?: FlagUpdateWithWhereUniqueWithoutUserInput | FlagUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FlagUpdateManyWithWhereWithoutUserInput | FlagUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FlagScalarWhereInput | FlagScalarWhereInput[]
  }

  export type ConfessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConfessionCreateWithoutUserInput, ConfessionUncheckedCreateWithoutUserInput> | ConfessionCreateWithoutUserInput[] | ConfessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConfessionCreateOrConnectWithoutUserInput | ConfessionCreateOrConnectWithoutUserInput[]
    upsert?: ConfessionUpsertWithWhereUniqueWithoutUserInput | ConfessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConfessionCreateManyUserInputEnvelope
    set?: ConfessionWhereUniqueInput | ConfessionWhereUniqueInput[]
    disconnect?: ConfessionWhereUniqueInput | ConfessionWhereUniqueInput[]
    delete?: ConfessionWhereUniqueInput | ConfessionWhereUniqueInput[]
    connect?: ConfessionWhereUniqueInput | ConfessionWhereUniqueInput[]
    update?: ConfessionUpdateWithWhereUniqueWithoutUserInput | ConfessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConfessionUpdateManyWithWhereWithoutUserInput | ConfessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConfessionScalarWhereInput | ConfessionScalarWhereInput[]
  }

  export type FlagUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FlagCreateWithoutUserInput, FlagUncheckedCreateWithoutUserInput> | FlagCreateWithoutUserInput[] | FlagUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FlagCreateOrConnectWithoutUserInput | FlagCreateOrConnectWithoutUserInput[]
    upsert?: FlagUpsertWithWhereUniqueWithoutUserInput | FlagUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FlagCreateManyUserInputEnvelope
    set?: FlagWhereUniqueInput | FlagWhereUniqueInput[]
    disconnect?: FlagWhereUniqueInput | FlagWhereUniqueInput[]
    delete?: FlagWhereUniqueInput | FlagWhereUniqueInput[]
    connect?: FlagWhereUniqueInput | FlagWhereUniqueInput[]
    update?: FlagUpdateWithWhereUniqueWithoutUserInput | FlagUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FlagUpdateManyWithWhereWithoutUserInput | FlagUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FlagScalarWhereInput | FlagScalarWhereInput[]
  }

  export type AnonymousUserCreateNestedOneWithoutConfessionsInput = {
    create?: XOR<AnonymousUserCreateWithoutConfessionsInput, AnonymousUserUncheckedCreateWithoutConfessionsInput>
    connectOrCreate?: AnonymousUserCreateOrConnectWithoutConfessionsInput
    connect?: AnonymousUserWhereUniqueInput
  }

  export type AnonymousUserUpdateOneRequiredWithoutConfessionsNestedInput = {
    create?: XOR<AnonymousUserCreateWithoutConfessionsInput, AnonymousUserUncheckedCreateWithoutConfessionsInput>
    connectOrCreate?: AnonymousUserCreateOrConnectWithoutConfessionsInput
    upsert?: AnonymousUserUpsertWithoutConfessionsInput
    connect?: AnonymousUserWhereUniqueInput
    update?: XOR<XOR<AnonymousUserUpdateToOneWithWhereWithoutConfessionsInput, AnonymousUserUpdateWithoutConfessionsInput>, AnonymousUserUncheckedUpdateWithoutConfessionsInput>
  }

  export type AnonymousUserCreateNestedOneWithoutFlagsInput = {
    create?: XOR<AnonymousUserCreateWithoutFlagsInput, AnonymousUserUncheckedCreateWithoutFlagsInput>
    connectOrCreate?: AnonymousUserCreateOrConnectWithoutFlagsInput
    connect?: AnonymousUserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type AnonymousUserUpdateOneWithoutFlagsNestedInput = {
    create?: XOR<AnonymousUserCreateWithoutFlagsInput, AnonymousUserUncheckedCreateWithoutFlagsInput>
    connectOrCreate?: AnonymousUserCreateOrConnectWithoutFlagsInput
    upsert?: AnonymousUserUpsertWithoutFlagsInput
    disconnect?: AnonymousUserWhereInput | boolean
    delete?: AnonymousUserWhereInput | boolean
    connect?: AnonymousUserWhereUniqueInput
    update?: XOR<XOR<AnonymousUserUpdateToOneWithWhereWithoutFlagsInput, AnonymousUserUpdateWithoutFlagsInput>, AnonymousUserUncheckedUpdateWithoutFlagsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ConfessionCreateWithoutUserInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConfessionUncheckedCreateWithoutUserInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConfessionCreateOrConnectWithoutUserInput = {
    where: ConfessionWhereUniqueInput
    create: XOR<ConfessionCreateWithoutUserInput, ConfessionUncheckedCreateWithoutUserInput>
  }

  export type ConfessionCreateManyUserInputEnvelope = {
    data: ConfessionCreateManyUserInput | ConfessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FlagCreateWithoutUserInput = {
    id?: string
    contentType: string
    contentId: string
    reason?: string | null
    createdAt?: Date | string
  }

  export type FlagUncheckedCreateWithoutUserInput = {
    id?: string
    contentType: string
    contentId: string
    reason?: string | null
    createdAt?: Date | string
  }

  export type FlagCreateOrConnectWithoutUserInput = {
    where: FlagWhereUniqueInput
    create: XOR<FlagCreateWithoutUserInput, FlagUncheckedCreateWithoutUserInput>
  }

  export type FlagCreateManyUserInputEnvelope = {
    data: FlagCreateManyUserInput | FlagCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ConfessionUpsertWithWhereUniqueWithoutUserInput = {
    where: ConfessionWhereUniqueInput
    update: XOR<ConfessionUpdateWithoutUserInput, ConfessionUncheckedUpdateWithoutUserInput>
    create: XOR<ConfessionCreateWithoutUserInput, ConfessionUncheckedCreateWithoutUserInput>
  }

  export type ConfessionUpdateWithWhereUniqueWithoutUserInput = {
    where: ConfessionWhereUniqueInput
    data: XOR<ConfessionUpdateWithoutUserInput, ConfessionUncheckedUpdateWithoutUserInput>
  }

  export type ConfessionUpdateManyWithWhereWithoutUserInput = {
    where: ConfessionScalarWhereInput
    data: XOR<ConfessionUpdateManyMutationInput, ConfessionUncheckedUpdateManyWithoutUserInput>
  }

  export type ConfessionScalarWhereInput = {
    AND?: ConfessionScalarWhereInput | ConfessionScalarWhereInput[]
    OR?: ConfessionScalarWhereInput[]
    NOT?: ConfessionScalarWhereInput | ConfessionScalarWhereInput[]
    id?: StringFilter<"Confession"> | string
    content?: StringFilter<"Confession"> | string
    createdAt?: DateTimeFilter<"Confession"> | Date | string
    updatedAt?: DateTimeFilter<"Confession"> | Date | string
    userId?: StringFilter<"Confession"> | string
  }

  export type FlagUpsertWithWhereUniqueWithoutUserInput = {
    where: FlagWhereUniqueInput
    update: XOR<FlagUpdateWithoutUserInput, FlagUncheckedUpdateWithoutUserInput>
    create: XOR<FlagCreateWithoutUserInput, FlagUncheckedCreateWithoutUserInput>
  }

  export type FlagUpdateWithWhereUniqueWithoutUserInput = {
    where: FlagWhereUniqueInput
    data: XOR<FlagUpdateWithoutUserInput, FlagUncheckedUpdateWithoutUserInput>
  }

  export type FlagUpdateManyWithWhereWithoutUserInput = {
    where: FlagScalarWhereInput
    data: XOR<FlagUpdateManyMutationInput, FlagUncheckedUpdateManyWithoutUserInput>
  }

  export type FlagScalarWhereInput = {
    AND?: FlagScalarWhereInput | FlagScalarWhereInput[]
    OR?: FlagScalarWhereInput[]
    NOT?: FlagScalarWhereInput | FlagScalarWhereInput[]
    id?: StringFilter<"Flag"> | string
    contentType?: StringFilter<"Flag"> | string
    contentId?: StringFilter<"Flag"> | string
    reason?: StringNullableFilter<"Flag"> | string | null
    createdAt?: DateTimeFilter<"Flag"> | Date | string
    userId?: StringNullableFilter<"Flag"> | string | null
  }

  export type AnonymousUserCreateWithoutConfessionsInput = {
    id?: string
    createdAt?: Date | string
    lastActive?: Date | string
    flags?: FlagCreateNestedManyWithoutUserInput
  }

  export type AnonymousUserUncheckedCreateWithoutConfessionsInput = {
    id?: string
    createdAt?: Date | string
    lastActive?: Date | string
    flags?: FlagUncheckedCreateNestedManyWithoutUserInput
  }

  export type AnonymousUserCreateOrConnectWithoutConfessionsInput = {
    where: AnonymousUserWhereUniqueInput
    create: XOR<AnonymousUserCreateWithoutConfessionsInput, AnonymousUserUncheckedCreateWithoutConfessionsInput>
  }

  export type AnonymousUserUpsertWithoutConfessionsInput = {
    update: XOR<AnonymousUserUpdateWithoutConfessionsInput, AnonymousUserUncheckedUpdateWithoutConfessionsInput>
    create: XOR<AnonymousUserCreateWithoutConfessionsInput, AnonymousUserUncheckedCreateWithoutConfessionsInput>
    where?: AnonymousUserWhereInput
  }

  export type AnonymousUserUpdateToOneWithWhereWithoutConfessionsInput = {
    where?: AnonymousUserWhereInput
    data: XOR<AnonymousUserUpdateWithoutConfessionsInput, AnonymousUserUncheckedUpdateWithoutConfessionsInput>
  }

  export type AnonymousUserUpdateWithoutConfessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
    flags?: FlagUpdateManyWithoutUserNestedInput
  }

  export type AnonymousUserUncheckedUpdateWithoutConfessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
    flags?: FlagUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AnonymousUserCreateWithoutFlagsInput = {
    id?: string
    createdAt?: Date | string
    lastActive?: Date | string
    confessions?: ConfessionCreateNestedManyWithoutUserInput
  }

  export type AnonymousUserUncheckedCreateWithoutFlagsInput = {
    id?: string
    createdAt?: Date | string
    lastActive?: Date | string
    confessions?: ConfessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type AnonymousUserCreateOrConnectWithoutFlagsInput = {
    where: AnonymousUserWhereUniqueInput
    create: XOR<AnonymousUserCreateWithoutFlagsInput, AnonymousUserUncheckedCreateWithoutFlagsInput>
  }

  export type AnonymousUserUpsertWithoutFlagsInput = {
    update: XOR<AnonymousUserUpdateWithoutFlagsInput, AnonymousUserUncheckedUpdateWithoutFlagsInput>
    create: XOR<AnonymousUserCreateWithoutFlagsInput, AnonymousUserUncheckedCreateWithoutFlagsInput>
    where?: AnonymousUserWhereInput
  }

  export type AnonymousUserUpdateToOneWithWhereWithoutFlagsInput = {
    where?: AnonymousUserWhereInput
    data: XOR<AnonymousUserUpdateWithoutFlagsInput, AnonymousUserUncheckedUpdateWithoutFlagsInput>
  }

  export type AnonymousUserUpdateWithoutFlagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
    confessions?: ConfessionUpdateManyWithoutUserNestedInput
  }

  export type AnonymousUserUncheckedUpdateWithoutFlagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
    confessions?: ConfessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ConfessionCreateManyUserInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FlagCreateManyUserInput = {
    id?: string
    contentType: string
    contentId: string
    reason?: string | null
    createdAt?: Date | string
  }

  export type ConfessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConfessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConfessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlagUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    contentId?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlagUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    contentId?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlagUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    contentId?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}