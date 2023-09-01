import { z } from "zod";
import { fromZodError } from "zod-validation-error"

// type User = {
//   username: string
// }

type User = z.infer<typeof UserSchema>

// enum Hobbies {
//   Progamming = "Progamming",
//   // WeighLifing,
//   // Guitar,
// }

const hobbies = ["Programming", "Weight Lifting", "Guitar"] as const

const UserSchema = z.object({
  username: z.string().min(3, "min length must be 3"),
  age: z.number().default(Math.random),
  birthday: z.date().nullish(),
  // isProgrammer: z.boolean().optional().nullable().default(true),
  isProgrammer: z.boolean().default(true),
  // hobby: z.enum(["Programming", "Weight Lifting", "Guitar"]),
  // hobby: z.nativeEnum(Hobbies),
  hobby: z.enum(hobbies),
  friends: z.array(z.string()).nonempty(),
  coords: z.tuple([z.string(), z.date()]).rest(z.number()),
  // id: z.union([z.string(), z.number()]),
  id: z.discriminatedUnion("status", [
    z.object({ status: z.literal("success"), data: z.string() }),
    z.object({ status: z.literal("failed"), error: z.instanceof(Error) }),
  ])
})
// .partial()
// .pick({ username: true })
// .omit({ age: true })
// .deepPartial()
// .extend({ lastname: z.string() })
// .merge(z.object({ name: z.string() }))
// .passthrough()
// .strict()

// const user = { username: "Adil"}
// const user = { username: 1}

// const user: User = { username: 1}
const user: User = {
  username: "Ad",
  age: 20,
  birthday: new Date(),
  // birthday: undefined,
  // birthday: null,
  isProgrammer: false,
  // isProgrammer: null,
  hobby: "Programming",
  // hobby: Hobbies.Progamming, 
  // name: "Kyle",
  friends: ["Kyle", "Julie"],
  // friends: [],
  coords: ["test", new Date(), 1, 4, 6],
  // id: 2 + "adil",
  id: { status: "success", data: "dlliskej" },
}
// console.log(UserSchema.parse(user))

// console.log(UserSchema.safeParse(user))

// console.log(UserSchema.safeParse(user).success)
// console.log(UserSchema.shape)
// console.log(UserSchema.parse(user))

// const UserMap = z.record(z.string(), z.number())
const UserMap = z.map(z.string(), z.object({
  name: z.string()
}))

// const client = {
//   sdkll: 1
// }

const client2 = new Map([
  ["id-john", { name: "John" }],
  ["id-kyle", { name: "Kyle" }],
])

// console.log(UserMap.parse(client))
console.log(UserMap.parse(client2))

const PromiseSchema = z.promise(z.string())

const p = Promise.resolve("kkskdfj")
console.log(PromiseSchema.parse(p));

const brandEmail = z
  .string()
  .email()
  .refine(val => val.endsWith("@gmail.com"), {
    message: "Email must end with @gmail.com !",
  })

const email = "test@gmail.com"
// console.log(brandEmail.safeParse(email))

// const results = brandEmail.safeParse(email)
const results = UserSchema.safeParse(user)

if (!results.success) {
  // console.log(results.error);
  console.log(fromZodError(results.error));
}
