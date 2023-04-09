import { readFile } from 'fs/promises';
import {plot} from "./blockcharts.js";
let parsed = await JSON.parse(
		await readFile(
				new URL('./results.json', import.meta.url)
		)
)
let obj = {}
let globalObj = {}
let start,end
let totalProfit = 0;
for (let i in parsed){
		if (!start){
				start = parsed[i].date
		}
		end = parsed[i].date
		let page = parsed[i]
		for (let j in page.list){
				let order = page.list[j]
				if (!obj[order.shard]){
						obj[order.shard] = {}
				}
				if (!obj[order.shard][order.market.resourceType]){
						obj[order.shard][order.market.resourceType] = {profit: 0,volume:0}
				}
				if (!globalObj[order.market.resourceType]){
						globalObj[order.market.resourceType] = {profit: 0,volume:0}
				}
				obj[order.shard][order.market.resourceType].profit += order.change
				globalObj[order.market.resourceType].profit += order.change
				if (order.type === 'sell'){
						obj[order.shard][order.market.resourceType].volume -= order.market.amount
						globalObj[order.market.resourceType].volume -= order.market.amount
				} else {
						obj[order.shard][order.market.resourceType].volume += order.market.amount
						globalObj[order.market.resourceType].volume += order.market.amount
				}
		}
}
let sorted = []
for (let i in globalObj){
		let resourceObj = globalObj[i]
		resourceObj.res = i
		if (resourceObj.res === 'undefined'){
				resourceObj.res = 'fees'
		}
		sorted.push(resourceObj)
		totalProfit += resourceObj.profit
}
sorted.sort((a,b)=>b.profit-a.profit)
console.log('profit:')
plot(sorted,'profit','res')
console.log('volume:')
plot(sorted,'volume','res')
for (let i in sorted){
		sorted[i] = JSON.stringify(sorted[i])
}
// console.log(sorted.join('\n'))
console.log(`total profit: ${totalProfit}`)