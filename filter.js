import { readFile } from 'fs/promises';
import {linePlotByRoom, linePlotOverMonth} from "./charts.js";
let parsed = await JSON.parse(
		await readFile(
				new URL('./results.json', import.meta.url)
		)
)
const filteredResources = ['energy']
let list = []
let marketData = []
for (let i in parsed){
		let page = parsed[i]
		for (let j in page.list){
				let order = page.list[j]
				if (filteredResources.includes(order.market.resourceType) && order.market && order.type === 'market.buy'){
						list.push(order)
						marketData.push(order.data)
				}
		}
}
linePlotOverMonth(list,'change')
//linePlotOverMonth(marketData,'amount')
linePlotByRoom(list,'change')