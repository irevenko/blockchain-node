import { SHA256 } from 'crypto-js';

class Block {
  height: number;
  data: string;
  timestamp: string;
  prevHash: string;
  hash: string;
  nonce: number;

  constructor(
    height: number,
    data: string,
    timestamp: string,
    prevHash?: string
  ) {
    this.height = height;
    this.data = data;
    this.timestamp = timestamp;
    this.prevHash = prevHash;

    this.hash = this.calcHash();
    this.nonce = 0;
  }

  calcHash() { 
    return SHA256(
      this.height + this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce
    ).toString();
  }

  mineBlock(difficulty) { 
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce += 1;
      this.hash = this.calcHash();
    }
    console.log(`Mined Block: ${this.hash}`);
  }
}

export default Block;
