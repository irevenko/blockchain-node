import { SHA256 } from 'crypto-js';

class Block {
  height: number;
  timestamp: string;
  data: string;
  prevHash: string;
  hash: string;

  constructor(
    height: number,
    data: string,
    timestamp: string,
    prevHash: string = '',
  ) {
    this.height = height;
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;

    this.hash = this.calcHash();
  }

  calcHash() { 
    return SHA256(
      this.height + this.prevHash + this.timestamp + JSON.stringify(this.data)
    ).toString();
  }
}

export default Block;
