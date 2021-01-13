import EC from 'elliptic/lib/elliptic/ec';

const ec = new EC('secp256k1');
const key = ec.genKeyPair();

const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

console.log(privateKey);
console.log(publicKey);