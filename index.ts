import { KnapsackGA } from "./knapsack-ga";
import { generateThings } from "./thing-generator";

const knapsackGA = new KnapsackGA(generateThings(20),20,50)
knapsackGA.start()

