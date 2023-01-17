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
list.sort((a,b)=> a.market.price - b.market.price)
for (let i in list){
		console.log(list[i].date,list[i].type,list[i].shard,list[i].market.price,list[i].market.roomName,list[i].market.targetRoomName)
}
