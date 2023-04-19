import { faker } from "@faker-js/faker";
import { Things } from "../Class/Thing.interface";

export const generateThings=(qty: number,) => {
    const things: Things[] = []
    for (let index = 0; index < qty; index++) {
        things.push({
            item: faker.commerce.product(),
            weight: +faker.finance.amount(10,50)
        })
    }
    return things
}

