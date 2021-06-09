function buyXP(){
	if(gameData.playerMoney >= gameData.XPCost){
		gameData.playerMoney -= gameData.XPCost
		gameData.playerBeanflation *= 2
		gameData.XPCost = Math.round(gameData.XPCost *= 10)
		saveGame()
		renderPage(gameData)
	}
}

function buyAutoPicker(){
	if(gameData.playerBeans >= gameData.autoPickerCost){
		gameData.playerBeans -= gameData.autoPickerCost
		gameData.playerAutoPickers += 1
		gameData.autoPickerCost = Math.round(gameData.autoPickerCost *= 1.2)
		saveGame()
		renderPage(gameData)
	}
}

function buyFieldWorker(){
	if(gameData.playerBeans >= gameData.fieldWorkerCost){
		gameData.playerBeans -= gameData.fieldWorkerCost
		gameData.playerFieldWorkers += 1
		gameData.fieldWorkerCost = Math.round(gameData.fieldWorkerCost *= 1.2)
		saveGame()
		renderPage(gameData)
	}
}