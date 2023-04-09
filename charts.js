import pkg from 'asciichart';
const asciichart = pkg
export function linePlotOverMonth(arr,y){
		//plot certain things over a month such as profit
		//round to million to stop plot breaking
		let months = {}
		for (let i in arr){
				let date = new Date(arr[i].date)
				let day = date.getDate()
				let month = date.getMonth()
				if (!months[month]){
						months[month] = new Array(31)
				}
				if (arr[i][y]){
						if (!months[month][day]){
								months[month][day] = 0
						}
						months[month][day] += (arr[i][y]/1000000)
				}
		}
		for (let i in months){
				console.log('month',i)
				for (let j = 0;j < 32;j++){
						if (!months[i][j]){
								months[i][j] = 0
						}
						months[i][j] = Math.round(months[i][j])
				}
				console.log(asciichart.plot(months[i]))
		}
		console.log(JSON.stringify(months))
}
export function linePlotByRoom(arr,y){
		let rooms = {}
		for (let i in arr){
				let roomName = arr[i].market.roomName
				if (arr[i][y]){
						if (!rooms[roomName]){
								rooms[roomName] = 0
						}
						rooms[roomName] += (arr[i][y]/1000000)
				}
		}


				for (let i in rooms){
						if (!rooms[i]){
								rooms[i] = 0
						}
						rooms[i] = Math.round(rooms[i])
				}
		console.log(JSON.stringify(rooms))
}