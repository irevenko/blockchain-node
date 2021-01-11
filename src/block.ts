import { SHA256 } from 'crypto-js';
import Transaction from './transaction';

class Block {
  height: number;
  transactions: any;
  timestamp: string;
  prevHash: string;
  hash: string;
  nonce: number;

  constructor(
    height: number,
    transactions: any,
    timestamp: string,
    prevHash?: string
  ) {
    this.height = height;
    this.transactions = transactions;
    this.timestamp = timestamp;
    this.prevHash = prevHash;

    this.hash = this.calcHash();
    this.nonce = 0;
  }

  calcHash() { 
    return SHA256(
      this.height + this.prevHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce
    ).toString();
  }

  mineBlock(difficulty) { 
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calcHash();
    }
    console.log(`Mined Block: ${this.hash}`);
  }

  hasValidTransactions() { 
    for (const trans of this.transactions) { 
      if (!trans.isValidTransaction()) { 
        return false;
      }
    }
    return true;
  }
}

export default Block;
