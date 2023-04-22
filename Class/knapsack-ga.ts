import { shuffleArray } from "../Extra/shuffle";
import { onlyUnique } from "../Extra/unique";
import { Things } from "./Thing.interface";
export class KnapsackGA {
    things: Things[]
    evolvePool: string[]
    firstGenerationQty: number
    bagCapacity: number
    generationLength: number
    goodPool: string[]
    constructor(things: Things[], firstGenerationQty: number, bagCapacity: number, generationLength: number) {
        this.things = things
        this.evolvePool = []
        this.bagCapacity = bagCapacity
        this.firstGenerationQty = firstGenerationQty
        this.generationLength = generationLength
        this.goodPool = []
    }
    init() {
        let member = ''
        for (let index = 0; index < this.firstGenerationQty; index++) {
            for (let index = 0; index < this.things.length; index++) {
                member += String(Number(Math.random() > 0.5))
            }
            this.evolvePool.push(member)
            member = ''
        }
    }
    fitness() {
        const result: string[] = []
        for (let index = 0; index < this.evolvePool.length; index++) {
            const memberValue = this.calculateMember(this.evolvePool[index])
            if (memberValue > this.bagCapacity || memberValue < 0.9 * this.bagCapacity) continue
            result.push(this.evolvePool[index])
        }
        this.evolvePool = [...result, ...this.goodPool]
    }
    crossOver() {
        shuffleArray(this.evolvePool)
        const crossOverLen = Math.floor(Math.random() * this.things.length / 2)
        if (this.evolvePool.length % 2 != 0) {
            this.evolvePool.pop()
        }
        for (let index = 0; index < this.evolvePool.length; index += 2) {
            let first = [...this.evolvePool[index]]
            let second = [...this.evolvePool[index + 1]]
            let bitTemp
            for (let index2 = 0; index2 < crossOverLen; index2++) {
                bitTemp = first[first.length - 1 - index2]
                first[first.length - 1 - index2] = second[first.length - 1 - index2]
                second[first.length - 1 - index2] = bitTemp
            }
            this.evolvePool[index] = first.join('')
            this.evolvePool[index + 1] = second.join('')
        }
        this.evolvePool = [...this.evolvePool, ...this.goodPool]
        
    }
    mutilation() {
        for (let index = 0; index < this.evolvePool.length; index++) {
            const randomBit = Math.floor(Math.random() * this.things.length)
            let temp = [...this.evolvePool[index]]
            temp[randomBit] = String(Number(!+this.evolvePool[index][randomBit]));
            this.evolvePool[index] = temp.join('')
        }
    }
    calculateMember(member: string) {
        let temp = 0
        for (let index = 0; index < member.length; index++) {
            const bit = member[index];
            temp += (+bit) * this.things[index].weight
        }
        return +temp.toFixed(2)
    }
    decimalList() {
        const result: number[] = []
        for (let index = 0; index < this.evolvePool.length; index++) {
            result.push(this.calculateMember(this.evolvePool[index]))
        }
        return result
    }
    picker() {
        const data = this.decimalList()
        let max = 0
        let maxIndexes = 0
        for (let index = 0; index < data.length; index++) {
            if (max < data[index] && data[index] <= this.bagCapacity) {
                max = data[index]
                maxIndexes = index
            }
        }
        this.goodPool.push(this.evolvePool[maxIndexes])
    }
    start() {
        console.time('bench')
        this.init()
        for (let index = 0; index < this.generationLength; index++) {
            this.fitness()
            this.crossOver()
            this.picker()
            this.mutilation()
            this.fitness()
        }
        this.evolvePool =   this.evolvePool.filter(onlyUnique);
        console.table(this.evolvePool)
        console.table(this.decimalList())
        console.timeEnd('bench')
    }
}