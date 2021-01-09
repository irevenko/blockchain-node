import Block from './block';

class BlockChain {
  private chain: Array<Block>;

  constructor() {
    this.chain = [this.generateGenesisBlock()];
  }

  generateGenesisBlock() { 
    return new Block(0, Date.now().toString(), 'Genesis block', '0');
  }

  getLastBlockHash() { 
    return this.chain[this.chain.length - 1].hash;
  }

  createBlock(newBlock: Block) {
    newBlock.prevHash = this.getLastBlockHash();
    newBlock.hash = newBlock.calcHash();
    this.chain.push(newBlock);
  }
}

export default BlockChain;
