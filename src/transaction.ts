import { SHA256 } from 'crypto-js';
import EC from 'elliptic/lib/elliptic/ec';
const ec = new EC('secp256k1');

class Transaction { 
  fromAddress: string;
  toAddress: string;
  amount: number;
  signature: string;
  timestamp: string;
  
  constructor(fromAddress: string, toAddress: string, amount: number) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    this.timestamp = Date.now().toString();
  }

  calcHash() { 
    return SHA256(
      this.fromAddress + this.toAddress + this.amount + this.timestamp
    ).toString();
  }

  signTransaction(key) { 
    if (key.getPublic('hex') !== this.fromAddress) { 
      throw new Error('Can"t sign transactions for other wallets');
    }

    const transactionHash = this.calcHash();
    const signature = key.sign(transactionHash, 'base64');
    this.signature = signature.toDER('hex');
  }

  isValidTransaction() { 
    if (this.fromAddress === null) {
      return true;
    }

    if (!this.signature || this.signature.length === 0) { 
      throw new Error('Missing signature for this transaction');
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
    return publicKey.verify(this.calcHash(), this.signature);
  }
}

export default Transaction;
