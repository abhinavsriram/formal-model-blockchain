# README

## The Model

### What are we modeling?
We are modeling a blockchain. Blockchains are inherently very complex due to the complete transparency they offer while being completely decentralized and yet simultaneously having strong security and consensus guarantees that are yet to fail (for major blockchains). However, many of these protocols make tradeoffs in order to achieve this; these tradeoffs range from high transaction fees to massive energy usage due to PoW consensus approaches etc. As we try to combat these negative externalities of a system with otherwise great promise, there is innovation everywhere; and sometimes not nearly enough time to verify new approaches (especially for consensus) leading to implementation without confirmation and thus investment of real money prematurely which, in the worst case scenario, ultimately results in the common man losing their assets simply because they wanted to support something that could change the world. A perfect example of this is the "bank run" that just took place (May 12 2022) on UST that caused the inevtiable death spiral that was proven as a flaw of the LUNA/Terra ecosystem architecture months after the market cap of its stable coin token was in the billions. Now, hundreds of thousands of people have lost money, some of whom have lost everything, simply because their model was not formally verified prior to being built. This would be the best way to summarize our interest in this topic.

### What is our objective with this model?
Modeling blockchains is an interesting topic for this specific class especially given the limitations of Forge because there will be significant abstraction. However, at the same time, because we had no way of estimating how much effort the entire modeling process would be, we wanted to create a model that was sufficiently detailed and extensible that it could be used to verify a wide range of properties if we had the time to do so. I think it will be clear that we struck this balance well, and potentially even erred a little too much on the side of the latter if you look at the number of sigs we have.

At a very minimum, what we were aiming for, was to generate traces of the chain building process, show coins not being double spent, miners receiving transactions, adding transactions to blocks, and verifying via distributed consensus. We also wanted to model a 51% attack on a blockchain and to specifically show that for such an attack to be successful, we did not just need a 51% majority of bad miners, but a 51% majority of coordinated bad miners. We were able to achieve these goals.

### How do you understand our Forge specification?
We have documented our modeling choices in detail using in-line comments in every single file. common.frg covers the various sigs we have defined for our model, and next to each sig we mention the frg file in which the sig is constrained. block.frg, blockchain.frg, hash.frg, miner.frg, network.frg, and transaction.frg constrain the various sigs we have defined and have a final wellformed predicate that encompasses every constraint on the respective sig. chainbuilder.frg describes traces of the chain building process, security.frg describes a 51% attack, and lastly, demonstration.frg has 2 run statements showing both the normal functioning of a blockchain as well as a 51% attack on a blockchain.

## Abstraction Choices

### What tradeoffs did you make in choosing your representation? What else did you try that didn’t work as well?

### What assumptions did you make about scope? What are the limits of your model?

### Did your goals change at all from your proposal? Did you realize anything you planned was unrealistic, or that anything you thought was unrealistic was doable?

## Understanding Instances and The Visualizer
The visualizer is a core part of our project. Without the visualizer, understanding instances is virtually impossible. The visualizer is also quite extensive and detailed and works for any trace generated using the traces predicate in chainbuilder.frg. However, one thing to note is that since our visualizer is so extensive and has so many elements, it will not look as intended and will be hard to understand unless you zoom out to 50% (or less) on most screens. After zooming out (using CTRL/CMD -) you can pinch to zoom on your trackpad to get a better look. It should look like this:


![alt text](https://raw.githubusercontent.com/abhinavsriram/cs1710-blockchain-fp-project/main/blockchain.png)


If you run the first run statement in demonstration.frg, it will produce 3 timesteps showing a blockchain being built

## Tests, Verification and Limitations

