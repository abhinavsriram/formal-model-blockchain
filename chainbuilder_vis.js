function makeBlockDiv(fblock) {
    var block = document.createElement("div")
    block.style.width = "150px"
    block.style.height = "445px"
    block.style.border = "thin solid black"
    block.style.display = "flex"
    block.style.margin = "5px"
    block.style.padding = "3px"
    block.style['flex-direction'] = "column"
    block.style['font-size'] = "12px"
    block.style['align-items'] = "center"
    block.style['justify-content'] = "center"
    block.innerHTML = "Block " + fblock.toString()[fblock.toString().length - 1]
    return block
}

function makeHeaderDiv(blockHeader) {
    var header = document.createElement("div")
    header.style.width = "130px"
    header.style.height = "110px"
    header.style.border = "thin solid black"
    header.style.display = "flex"
    header.style.margin = "5px"
    header.style.padding = "3px"
    header.style['flex-direction'] = "column"
    header.style['font-size'] = "8px"

    var blockHeaderNameDiv = document.createElement("div")
    blockHeaderNameDiv.style.width = "auto"
    blockHeaderNameDiv.style.height = "auto"
    blockHeaderNameDiv.style.border = "thin solid black"
    blockHeaderNameDiv.style.display = "flex"
    blockHeaderNameDiv.style.margin = "5px"
    blockHeaderNameDiv.style.padding = "3px"
    blockHeaderNameDiv.style['align-items'] = "center"
    blockHeaderNameDiv.style['justify-content'] = "center"
    blockHeaderNameDiv.append("Block Header")
    header.append(blockHeaderNameDiv)

    var versionDiv = document.createElement("div")
    versionDiv.append("Version: " + blockHeader.join(version) + "\n")
    header.append(versionDiv)

    var timeDiv = document.createElement("div")
    timeDiv.append("Created at: " + blockHeader.join(time) + "\n")
    header.append(timeDiv)

    var nonceDiv = document.createElement("div")
    nonceDiv.append("Nonce: " + blockHeader.join(nonce) + "\n")
    header.append(nonceDiv)

    var blockSizeDiv = document.createElement("div")
    blockSizeDiv.append("Block Size: " + blockHeader.join(blocksize) + "\n")
    header.append(blockSizeDiv)

    var prevHashDiv = document.createElement("div")
    prevHashDiv.append("Prev Block Hash: " + blockHeader.join(prevBlockHash) + "\n")
    header.append(prevHashDiv)

    var merkleHashDiv = document.createElement("div")
    merkleHashDiv.append("Merkle Root Hash: " + blockHeader.join(merkleRootHash) + "\n")
    header.append(merkleHashDiv)

    return header
}

function makeApprovalDiv(blockApproved, blockVotes) {
    var approval = document.createElement("div")
    approval.style.width = "130px"
    approval.style.height = "20px"
    approval.style.border = "thin solid black"
    approval.style.display = "flex"
    approval.style.margin = "5px"
    approval.style.padding = "3px"
    approval.style['flex-direction'] = "column"
    approval.style['font-size'] = "8px"
    var blockApprovedFormatted = "Not"
    if (blockApproved == 1) {
        blockApprovedFormatted = ""
    }
    approval.append(blockApprovedFormatted + " Approved With " + blockVotes + " of " + Miners.join(allMiners).tuples().length + " Votes")
    return approval
}

function makeTransactionsDiv(blockTransactions) {
    var txs = document.createElement("div")
    txs.style.width = "130px"
    txs.style.height = "215px"
    txs.style.border = "thin solid black"
    txs.style.display = "flex"
    txs.style.margin = "5px"
    txs.style.padding = "3px"
    txs.style['flex-direction'] = "column"
    txs.style['font-size'] = "8px"

    var txNameDiv = document.createElement("div")
    txNameDiv.style.width = "auto"
    txNameDiv.style.height = "auto"
    txNameDiv.style.border = "thin solid black"
    txNameDiv.style.display = "flex"
    txNameDiv.style.margin = "5px"
    txNameDiv.style.padding = "3px"
    txNameDiv.style['align-items'] = "center"
    txNameDiv.style['justify-content'] = "center"
    txNameDiv.append("Transactions")
    txs.append(txNameDiv)

    for (const tx in blockTransactions.tuples()) {
        var txDiv = document.createElement("div")
        txDiv.append(blockTransactions.tuples()[tx] + '\n')
        txs.append(txDiv)
    }
    return txs
}

function makeBlockHashDiv(blockHash) {
    var hash = document.createElement("div")
    hash.style.width = "130px"
    hash.style.height = "20px"
    hash.style.border = "thin solid black"
    hash.style.display = "flex"
    hash.style.margin = "5px"
    hash.style.padding = "3px"
    hash.style['flex-direction'] = "column"
    hash.style['font-size'] = "8px"
    hash.append("Block Hash: " + blockHash + "\n")
    return hash
}

function makeBlock(block) {
    const blockHash = block.join(hash)
    const blockHeader = block.join(header)
    const blockTransactions = block.join(blockTxs)
    const blockVotes = block.join(votes)
    const blockApproved = block.join(approved)

    blockDiv = makeBlockDiv(block)

    headerDiv = makeHeaderDiv(blockHeader)
    blockDiv.append(headerDiv)
    
    approvalDiv = makeApprovalDiv(blockApproved, blockVotes)
    blockDiv.append(approvalDiv)

    txsDiv = makeTransactionsDiv(blockTransactions)
    blockDiv.append(txsDiv)

    blockHashDiv = makeBlockHashDiv(blockHash)
    blockDiv.append(blockHashDiv)

    return blockDiv
}

function createBlockChain(state) {
    blockChainContainer = document.createElement("div")
    blockChainContainer.innerHTML = "Blocks"
    blockChainContainer.style.border = "thin solid black"
    blockChainContainer.style.width = "100%"
    blockChainContainer.style.height = "500px"
    blockChainContainer.style.margin = "5px"
    blockChainContainer.style.padding = "5px"
    blockChainContainer.style.display = "flex"
    blockChainContainer.style['flex-direction'] = "column"

    blockChainDiv = document.createElement("div")
    blockChainContainer.append(blockChainDiv)
    blockChainDiv.style.display = "flex"
    blockChainDiv.style['flex-direction'] = "row"
    blockChainDiv.style['flex-wrap'] = "wrap"
    
    firstIteration = true
    useReverse = false
    for (const ind in state.join(blockchain).join(allBlocks).tuples()) {
        if (firstIteration) {
            const firstBlock = state.join(blockchain).join(allBlocks).tuples()[ind]
            if (firstBlock.join(header).join(prevBlockHash).toString() != "") {
                useReverse = true
            }
            firstIteration = false
        }
        block = null
        if (useReverse) {
            reverseInd = state.join(blockchain).join(allBlocks).tuples().length - 1 - ind
            block = state.join(blockchain).join(allBlocks).tuples()[reverseInd]
        } else {
            block = state.join(blockchain).join(allBlocks).tuples()[ind]
        }
        blockChainDiv.append(makeBlock(block))
        blockConnectionWrapperDiv = document.createElement("div")
        blockConnectionWrapperDiv.style.width = "100px"
        blockConnectionWrapperDiv.style.height = "445px"
        blockConnectionWrapperDiv.style.margin = "5px"
        blockConnectionWrapperDiv.style.padding = "5px"
        blockConnectionWrapperDiv.style['padding-top'] = "35px"
        blockConnectionWrapperDiv.style.display = "flex"
        blockConnectionWrapperDiv.style['flex-direction'] = "column"

        const blockConnectionArrowURL = "https://i.ibb.co/7yDVW2C/blockconnectionarrow.png"
        blockConnectionArrow = document.createElement("img")
        blockConnectionArrow.src = blockConnectionArrowURL
        blockConnectionArrow.style.width = '100%'
        blockConnectionArrow.style.height = '97%'
        blockConnectionArrow.style['margin-top'] = "2px"
        blockConnectionArrow.style['margin-bottom'] = "2px"
        blockConnectionArrow.style.padding = "2px"
        blockConnectionWrapperDiv.append(blockConnectionArrow)
        if (ind != state.join(blockchain).join(allBlocks).tuples().length - 1) {
            blockChainDiv.append(blockConnectionWrapperDiv)
        }
    }
    
    return blockChainContainer
}

function makeMiner(miner) {
    newMiner = document.createElement("div")
    newMiner.style.border = "thin solid black"
    newMiner.style.width = "55px"
    newMiner.style.height = "60px"
    newMiner.style.display = "flex"
    newMiner.style.margin = "10px"
    newMiner.style['flex-direction'] = "column"
    newMiner.style['font-size'] = "6px"
    newMiner.style['align-items'] = "center"
    newMiner.style['justify-content'] = "center"

    const minerHatImageURL = "https://thumbs.dreamstime.com/b/mining-helmet-lamp-vector-illustration-6109854.jpg"
    const minerHatImage = document.createElement("img")
    minerHatImage.src = minerHatImageURL
    minerHatImage.style.width = '90%'
    minerHatImage.style.height = '80%'
    minerHatImage.style['margin-top'] = "2px"
    minerHatImage.style['margin-bottom'] = "2px"
    minerHatImage.style.padding = "2px"
    newMiner.append(minerHatImage)

    const minerNameDiv = document.createElement("div")
    minerNameDiv.style.margin = "5px"
    if (miner.toString()[0] == "B" || miner.toString()[0] == "b") {
        minerNameDiv.innerHTML = "Bad Miner " + miner.toString()[miner.toString().length - 1]
    } else if (miner.toString()[0] == "G" || miner.toString()[0] == "g") {
        minerNameDiv.innerHTML = "Good Miner " + miner.toString()[miner.toString().length - 1]
    } else {
        minerNameDiv.innerHTML = "Miner " + miner.toString()[miner.toString().length - 1]
    }
    newMiner.append(minerNameDiv)
    
    return newMiner
}

function makeTxNameDiv(txName) {
    newTxNameDiv = document.createElement("div")
    newTxNameDiv.style['font-size'] = "8px"
    newTxNameDiv.innerHTML = "Transaction Name: " + txName
    return newTxNameDiv
}

function makeTxInputs(tx) {
    newTxInputDiv = document.createElement("div")
    newTxInputDiv.style['font-size'] = "8px"
    for (const ind in tx.join(inputs).tuples()) {
        const input = tx.join(inputs).tuples()[ind]
        var formattedInputString = input.toString()
        for (const ind2 in input.join(inputCoins).tuples()) {
            const coin = input.join(inputCoins).tuples()[ind2]
            if (formattedInputString == input.toString()) {
                formattedInputString += "(" + coin.toString()
            } else {
                formattedInputString += ", " + coin.toString()
            }
        }
        if (formattedInputString != input.toString()) {
            formattedInputString += ")"
        }
        if (newTxInputDiv.innerHTML == "") {
            newTxInputDiv.innerHTML = "Inputs: " + formattedInputString
        } else {
            newTxInputDiv.innerHTML += ", " + formattedInputString
        }
    }
    return newTxInputDiv
}

function makeTxOutputs(tx) {
    newTxOutputDiv = document.createElement("div")
    newTxOutputDiv.style['font-size'] = "8px"
    for (const ind in tx.join(outputs).tuples()) {
        const output = tx.join(outputs).tuples()[ind]
        var formattedOutputString = output.toString()
        for (const ind2 in output.join(outputCoins).tuples()) {
            const coin = output.join(outputCoins).tuples()[ind2]
            if (formattedOutputString == output.toString()) {
                formattedOutputString += "(" + coin.toString()
            } else {
                formattedOutputString += ", " + coin.toString()
            }
        }
        if (formattedOutputString != output.toString()) {
            formattedOutputString += ")"
        }
        if (newTxOutputDiv.innerHTML == "") {
            newTxOutputDiv.innerHTML = "Outputs: " + formattedOutputString
        } else {
            newTxOutputDiv.innerHTML += ", " + formattedOutputString
        }
    }
    return newTxOutputDiv
}

function makeTransaction(tx) {
    newTxDiv = document.createElement("div")
    newTxDiv.style.width = "auto"
    newTxDiv.style.height = "auto"
    newTxDiv.style.border = "thin solid black"
    newTxDiv.style.display = "flex"
    newTxDiv.style.margin = "5px"
    newTxDiv.style.padding = "3px"
    newTxDiv.style['flex-direction'] = "column"
    newTxDiv.style['font-size'] = "8px"

    newTxDiv.append(makeTxNameDiv(tx.toString()))
    newTxDiv.append(makeTxInputs(tx))
    newTxDiv.append(makeTxOutputs(tx))

    return newTxDiv
}

function createGoodP2PNetwork() {
    goodP2PNetworkContainer = document.createElement("div")
    goodP2PNetworkContainer.innerHTML = "Good P2P Network"
    goodP2PNetworkContainer.style.border = "thin solid black"
    goodP2PNetworkContainer.style.padding = "5px"
    goodP2PNetworkContainer.style.height = "auto"
    goodP2PNetworkContainer.style.margin = "5px"
    goodP2PNetworkContainer.style.display = "flex"
    goodP2PNetworkContainer.style['flex-direction'] = "column"

    minerHeadingDiv = document.createElement("div")
    minerHeadingDiv.style['font-size'] = "12px"
    minerHeadingDiv.style.padding = "3px"
    minerHeadingDiv.append("Miners")
    goodP2PNetworkContainer.append(minerHeadingDiv)

    minerDiv = document.createElement("div")
    goodP2PNetworkContainer.append(minerDiv)
    minerDiv.style.display = "flex"
    minerDiv.style['flex-direction'] = "row"
    minerDiv.style['flex-wrap'] = "wrap"
    for (const ind in GoodMiner.tuples()) {
        const miner = GoodMiner.tuples()[ind]
        minerDiv.append(makeMiner(miner))
    }

    transactionHeadingDiv = document.createElement("div")
    transactionHeadingDiv.style['font-size'] = "12px"
    transactionHeadingDiv.style.padding = "3px"
    transactionHeadingDiv.append("Transactions")
    goodP2PNetworkContainer.append(transactionHeadingDiv)

    for (const ind in GoodP2PNetwork.join(networkTxs).tuples()) {
        tx = GoodP2PNetwork.join(networkTxs).tuples()[ind]
        goodP2PNetworkContainer.append(makeTransaction(tx))
    }

    return goodP2PNetworkContainer
}

function createBadP2PNetwork(badNetwork) {
    badP2PNetworkContainer = document.createElement("div")
    badP2PNetworkContainer.innerHTML = "Bad P2P Network " + badNetwork.toString()[badNetwork.toString().length - 1]
    badP2PNetworkContainer.style.border = "thin solid black"
    badP2PNetworkContainer.style.padding = "5px"
    badP2PNetworkContainer.style.height = "auto"
    badP2PNetworkContainer.style.margin = "5px"
    badP2PNetworkContainer.style.display = "flex"
    badP2PNetworkContainer.style['flex-direction'] = "column"

    minerHeadingDiv = document.createElement("div")
    minerHeadingDiv.style['font-size'] = "12px"
    minerHeadingDiv.style.padding = "3px"
    minerHeadingDiv.append("Miners")
    badP2PNetworkContainer.append(minerHeadingDiv)

    minerDiv = document.createElement("div")
    badP2PNetworkContainer.append(minerDiv)
    minerDiv.style.display = "flex"
    minerDiv.style['flex-direction'] = "row"
    minerDiv.style['flex-wrap'] = "wrap"
    for (const ind in BadMiner.tuples()) {
        const miner = BadMiner.tuples()[ind]
        console.log("testing")
        console.log(miner.join(network).tuples()[0].toString())
        console.log(badNetwork.toString())
        if (miner.join(network).tuples()[0].toString() == badNetwork.toString()) {
            minerDiv.append(makeMiner(miner))
        }
    }

    transactionHeadingDiv = document.createElement("div")
    transactionHeadingDiv.style['font-size'] = "12px"
    transactionHeadingDiv.style.padding = "3px"
    transactionHeadingDiv.append("Transactions")
    badP2PNetworkContainer.append(transactionHeadingDiv)

    for (const ind in badNetwork.join(networkTxs).tuples()) {
        tx = badNetwork.join(networkTxs).tuples()[ind]
        badP2PNetworkContainer.append(makeTransaction(tx))
    }

    return badP2PNetworkContainer
}

function makeCoin(coin) {
    newCoin = document.createElement("div")
    newCoin.style.border = "thin solid black"
    newCoin.style.width = "60px"
    newCoin.style.height = "80px"
    newCoin.style.display = "flex"
    newCoin.style.margin = "5px"
    newCoin.style['flex-direction'] = "column"
    newCoin.style['font-size'] = "6px"
    newCoin.style['align-items'] = "center"
    newCoin.style['justify-content'] = "center"

    const coinImageURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7R6JPI2d0NJE4XbWWmGDiD_FdVU16Ge45Ll0eS_Qvgr8LP1FOuIPeTHqpNr-sdrsxxcM&usqp=CAU"
    const coinImage = document.createElement("img")
    coinImage.src = coinImageURL
    coinImage.style.width = '45px'
    coinImage.style.height = '45px'
    coinImage.style['margin-top'] = "1px"
    coinImage.style['margin-bottom'] = "1px"
    coinImage.style.padding = "2px"
    newCoin.append(coinImage)

    const coinNameDiv = document.createElement("div")
    coinNameDiv.innerHTML = "Coin Name: " + coin.toString()
    newCoin.append(coinNameDiv)

    const coinSpentDiv = document.createElement("div")
    coinSpentDiv.innerHTML = "Spent: " + coin.join(spent).toString()
    newCoin.append(coinSpentDiv)
    
    return newCoin
}

function createCoinsSet() {
    coinContainer = document.createElement("div")
    coinContainer.innerHTML = "Minted Coins"
    coinContainer.style.border = "thin solid black"
    coinContainer.style.padding = "3px"
    coinContainer.style.width = "auto"
    coinContainer.style.height = "auto"
    coinContainer.style.margin = "5px"
    coinContainer.style.display = "flex"
    coinContainer.style['flex-direction'] = "column"

    coinDiv = document.createElement("div")
    coinContainer.append(coinDiv)
    coinDiv.style.display = "flex"
    coinDiv.style['flex-direction'] = "row"
    coinDiv.style['flex-wrap'] = "wrap"
    for (const ind in Minted.join(coins).tuples()) {
        const coin = Minted.join(coins).tuples()[ind]
        coinDiv.append(makeCoin(coin))
    }

    return coinContainer
}

function createStateDiv(state) {
    outerDiv = document.createElement("div")
    outerDiv.innerHTML = "<h1> " + "Blockchain State at Timestep " + state.toString()[state.toString().length - 1] + "</h1>"
    outerDiv.style.display = "flex"
    outerDiv.style['flex-direction'] = "column"
    outerDiv.style.margin = "20px 5px"
    outerDiv.style.border = "medium solid black"
    outerDiv.style.padding = "5px"

    innerDiv = document.createElement("div")
    innerDiv.style.display = "flex"
    innerDiv.style['flex-direction'] = "row"
    innerDiv.style['flex-wrap'] = "wrap"
    innerDiv.append(createBlockChain(state))
    innerDiv.append(createGoodP2PNetwork())
    for (const ind in BadP2PNetwork.tuples()) {
        const badP2PNetwork = BadP2PNetwork.tuples()[ind]
        innerDiv.append(createBadP2PNetwork(badP2PNetwork))
    }
    innerDiv.append(createCoinsSet())
    outerDiv.append(innerDiv)
    return outerDiv
}

function createStates() {
    scrollableStates = document.createElement("div")
    scrollableStates.style.width = "100%"
    scrollableStates.style.height = "100%"
    scrollableStates.style.margin = "5px"
    for (const ind in TIME.tuples()) {
        const state = TIME.tuples()[ind]
        scrollableStates.append(createStateDiv(state))
    }
    div.append(scrollableStates)
}

div.replaceChildren()
div.style.overflow = "scroll"
div.style.maxHeight = (window.innerHeight - 100) + "px"
createStates()