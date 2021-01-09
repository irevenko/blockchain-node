import Block from './block';
import BlockChain from './blockchain';

const coin = new BlockChain();

coin.createBlock(new Block(1, 'money: 20$', Date.now().toString()));
coin.createBlock(new Block(2, 'sugar: 10g', Date.now().toString()));


console.log(JSON.stringify(coin, null, 2));