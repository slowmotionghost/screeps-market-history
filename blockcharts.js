const chartWidth = 200
import pkg from 'terminal-kit';
const {terminal} = pkg;
const block = '█'
export function plot(arr,x,y){
		arr = arr.sort((a,b)=>b[x]-a[x])
		for (let i in arr){
				if (!arr[i][x]){
						arr[i][x] = 0
				}
		}
		let range = arr[0][x]-arr[arr.length-1][x]
		let blockSize = range/chartWidth
		for (let i in arr){

				let blockAmount = Math.round(arr[i][x]/blockSize)
				if (blockAmount && blockAmount > 0){
						let string = block.repeat(blockAmount)
						terminal.green(string)
				} else if (blockAmount){
						let string = block.repeat(Math.abs(blockAmount))
						terminal.red(string)
				}
				console.log(arr[i][y],arr[i][x])
		}
}