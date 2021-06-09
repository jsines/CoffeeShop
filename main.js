// Initialize game data
var gameData = {
	// SAVE
	playerBeans: 0,
	playerBags: 0,
	playerMoney: 0,
	playerBeanflation: 1, // Amount of beans player gets per bean harvest
	playerAutoPickers: 0,
	playerFieldWorkers: 0,
	// COSTS
	XPCost: 100,
	autoPickerCost: 10,
	fieldWorkerCost: 500,
	// BPS VALUES
	autoPickerValue: 1,
	fieldWorkerValue: 5,
	// FLAGS
	hasBagged: false
}

// Overwrite game data with save if it exists
var savegame = JSON.parse(localStorage.getItem("beanSave"))
if (savegame !== null) {
	gameData = savegame
}

// Function to save to local storage
function saveGame(){
	localStorage.setItem("beanSave", JSON.stringify(gameData))
}

// Shop purchases operate once per second, game saves automatically every 15.
var gameLoop = window.setInterval(function(){
	const { playerAutoPickers, playerFieldWorkers, autoPickerValue, fieldWorkerValue } = gameData
	autoPickerAmount = playerAutoPickers * autoPickerValue
	fieldWorkerAmount = playerFieldWorkers * fieldWorkerValue
	var gatherAmount = autoPickerAmount + fieldWorkerAmount
	farmBeans(gatherAmount)
}, 1000)
var savePeriodically = window.setInterval(function() {
	saveGame()
}, 15000)

function renderPage(gameData){
	const { playerBeans, playerMoney, playerBeanflation,
			playerAutoPickers, playerFieldWorkers, playerBags } = gameData
	// Render player save data
	document.getElementById("saveBeans").innerHTML = `${format("#,##0.####", playerBeans)} Beans`
	if(gameData.hasBagged){
		document.getElementById("saveMoney").innerHTML = `${format("$#,##0.####", playerMoney)}`
		document.getElementById("saveBags").innerHTML = `Bags: ${playerBags}`
	}
	document.getElementById("saveLvl").innerHTML = `Lvl: ${playerBeanflation}`
	if(playerAutoPickers > 0){
		var bps = playerAutoPickers * gameData.autoPickerValue * playerBeanflation
		document.getElementById("saveAutoPickers").innerHTML = `AutoPickers: ${playerAutoPickers} (${bps} BPS)`
	}
	if(playerFieldWorkers > 0){
		var bps = playerFieldWorkers * gameData.fieldWorkerValue * playerBeanflation
		document.getElementById("saveFieldWorkers").innerHTML = `Field Workers: ${playerFieldWorkers} (${bps} BPS)`
	}
	// Below is DEFINITELY bad practice. These really don't need to be updating every second.
	// But I'm doing it anyway. Updates shop prices because they won't load when save file does.
	document.getElementById("AutoPicker").innerHTML = `AutoPicker (${gameData.autoPickerCost})`
	document.getElementById("FieldWorker").innerHTML = `Field Worker (${gameData.fieldWorkerCost})`
	document.getElementById("XPBoost").innerHTML = `EXP (\$${gameData.XPCost})`
}

function farmBeans(rate=1){
	gameData.playerBeans += (rate * gameData.playerBeanflation)
	renderPage(gameData)
}

function bagBeans(){
	if(gameData.playerBeans > 200){
		gameData.hasBagged = true
		gameData.playerBeans -= 200
		gameData.playerBags += 1
		renderPage(gameData)
	}
}

function sellBag(){
	if(gameData.playerBags > 0){
		gameData.playerBags -= 1
		gameData.playerMoney += 5
		renderPage(gameData)
	}
}