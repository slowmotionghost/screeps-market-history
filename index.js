import dotenv from "dotenv"
dotenv.config()
import fetch from "node-fetch";
import * as fs from 'node:fs'
import jsonexport from "jsonexport";
let headers = {
		'X-Token': process.env.SCREEPS_TOKEN,
		'X-Username': process.env.SCREEPS_TOKEN
}
// const reader = fs.createReadStream('results.json');
// const writer = fs.createWriteStream('results.csv');
//
// reader.pipe(jsonexport()).pipe(writer);
getMarketHistory(0,1000)
async function getMarketHistory(start,end){
		let count = start
		let formattedDataArray = []
		let startHistory = await getPage(start)
		let endHistory = await getPage(end)
		if (startHistory === 'expired' || endHistory === 'expired'){
				console.log('data includes expired pages')
				return
		}
		let promises = []
		while (count <= end){
				console.log('requested page',count)
				let page = count
				let promise = new Promise(async (resolve, reject) => {
						let ret = await processPage(page,formattedDataArray)
						if (ret){
								console.log('resolve',page,ret)
								resolve()
						} else {
								console.log('ret',ret)
								reject()
						}
				}).catch((err)=>console.log(err))
				promises.push(promise)
				count++
				let timer = new Promise((resolve, reject) => {
						setTimeout(resolve, 100);
				});
				await timer
		}
		await Promise.all(promises).then(()=>console.log('all promises done'))
		console.log('pages returned:',formattedDataArray.length)
		let json = JSON.stringify(formattedDataArray)
		await fs.writeFile("./results.JSON",json, (err) => {
				if (err) throw err;
				console.log('The file has been saved!');
		})
		const reader = fs.createReadStream('results.json');
		const writer = fs.createWriteStream('results.csv');

		reader.pipe(jsonexport()).pipe(writer);
}

async function processPage(page,dataArray){
		return await getPage(page).then(async (ret)=> {
						if (ret === 'expired'){
								console.log('page', page, 'expired')
								return false
						} else if (ret.ok){
								console.log('page', page, 'received')
								try {
										dataArray.push(await ret.json())
								} catch (err){
										console.log(err)
										console.log(JSON.stringify(ret))
										return false
								}
								return true
						}
				}
		)
}
async function getPage(page,tryNumber){
		if (!page){
				page = 0
		}
		if (!tryNumber){
				tryNumber = 1
		} else {
				tryNumber++
		}
		if (tryNumber > 10){
				return 'expired'
		}
		let response = fetch(`https://screeps.com/api/user/money-history?page=${page}`,{
				'method':'get',
				'headers':headers
		})
		let timer = new Promise((resolve, reject) => {
				setTimeout(resolve, 10000*(tryNumber*10)+(Math.random()*1000), 'expired');
		});
		let timer2 = new Promise((resolve, reject) => {
				setTimeout(resolve, Math.ceil(Math.random()*200+50));
		});
		let ret;
		await Promise.race([response,timer]).then((value)=> ret = value)
		if (ret && (ret.status === 429 || !ret.ok)){
				await timer2
				if (!ret.ok){
						await timer
						console.log('retry page',page,tryNumber)
				}
				//console.log('retry page',page)
				ret = await getPage(page,tryNumber)
		}
		return ret
}