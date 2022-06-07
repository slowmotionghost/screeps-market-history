import { readFile } from 'fs/promises';
let parsed = await JSON.parse(
		await readFile(
				new URL('./results.json', import.meta.url)
		)
)
let obj = {}
let globalObj = {}
for (let i in parsed){
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
		sorted.push(resourceObj)
}
sorted.sort((a,b)=>a.profit-b.profit)
console.log(JSON.stringify(sorted))
