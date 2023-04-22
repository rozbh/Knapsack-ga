import { KnapsackGA } from "./Class/knapsack-ga"
import { generateThings } from "./Extra/thing-generator"

const knapsackGA = new KnapsackGA(generateThings(30),100000,500,20)
knapsackGA.start()

