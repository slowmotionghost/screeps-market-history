import { readFile } from 'fs/promises';
let parsed = await JSON.parse(
		await readFile(
				new URL('./results.json', import.meta.url)
		)
)
const filteredResources = ['machine']
let list = []
for (let i in parsed){
		let page = parsed[i]
		for (let j in page.list){
				let order = page.list[j]
				if (filteredResources.includes(order.market.resourceType)){
						list.push(order)
				}
		}
}
console.log(JSON.stringify(list))