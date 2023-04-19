import { Things } from "./Thing.interface";
import * as crypto from "crypto";
export class KnapsackGA {
    things: Things[]
    evolvePool: string[]
    firstGenerationQty: number
    bagCapasity: number
    constructor(things: Things[], firstGenerationQty: number, bagCapasity: number) {
        this.things = things
        this.evolvePool = []
        this.bagCapasity = bagCapasity
        this.firstGenerationQty = firstGenerationQty
    }
    init() {
        let member = ''
        for (let index = 0; index < this.firstGenerationQty; index++) {
            for (let index = 0; index < this.things.length; index++) {
                member += String(Number(Math.random() > 0.5))
            }
            this.evolvePool.push(member)
            member=''
        }
    }
    fitness() {

    }
    crossOver() {

    }
    mutilation() {

    }
    start() {
        this.init()
        console.log(this.evolvePool);

        /*     this.fitness()
            this.crossOver()
            this.mutilation() */
    }
}