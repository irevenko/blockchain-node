import Block from './block';

class BlockChain {
  chain: Array<Block>;
  difficulty: number;

  constructor() {
    this.chain = [this.generateGenesisBlock()];
    this.difficulty = 4;
  }

  generateGenesisBlock() { 
    return new Block(0, 'Genesis block', Date.now().toString(), '0');
  }

  getLastBlockHash() { 
    return this.chain[this.chain.length - 1].hash;
  }

  createBlock(newBlock: Block) {
    newBlock.prevHash = this.getLastBlockHash();
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isValidChain() {
    for (let i = 1; i < this.chain.length; i++) { 
      const currBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];

      if (currBlock.hash !== currBlock.calcHash()) { 
        return false;
      }

      if (currBlock.prevHash !== prevBlock.hash) { 
        return false;
      }
    }
    return true;
  }
}

export default BlockChain;
