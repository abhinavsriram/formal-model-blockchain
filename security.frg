#lang forge

open "blockchain.frg"

// a block is added to the chain IFF a majority of miners approve the block
// a miner approves the block when Block.transactions in Miner.network.transactions
// increment Block.votes if a miner approves the block
// block is approved when Block.votes > Miners.allMiners.len/2 + 1
pred consensus[block: FBlock] {
    #{m: Miner | m in Miners.allMiners and (block.blockTxs in m.network.networkTxs)} >= add[divide[#{m: Miner | m in Miners.allMiners}, 2], 1] iff block.approved = 1   
}

pred reachConsensus {
    all b: FBlock {
        consensus[b]
    }
}

// simulating a 51% attack using majority bad miners that all use the same BadP2PNetwork
pred majorityAttack {
    // TODO
}