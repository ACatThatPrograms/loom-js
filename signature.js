import nacl from 'tweetnacl';
import ripemd160 from 'ripemd160';
import { Writer, writeObject, registerType, TypeArray, TypeByte } from './wire';

const typeEd25519 = 0x01;

export const signatureLength = nacl.sign.signatureLength;
export const privateKeyLength = nacl.sign.privateKeyLength;
export const publicKeyLength = nacl.sign.publicKeyLength;

export class SignatureEd25519 {
    constructor(inner) {
        this.inner = inner;
    }
}

registerType(SignatureEd25519, [
    ['inner', TypeArray(TypeByte, signatureLength)],
], typeEd25519);

export class PubKeyEd25519 {
    constructor(inner) {
        this.inner = inner;
    }
}

registerType(PubKeyEd25519, [
    ['inner', TypeArray(TypeByte, publicKeyLength)],
], typeEd25519);

export function genPrivKey() {
    const pair = nacl.sign.keyPair();
    return pair.secretKey;
}

export function sign(msg, privKey) {
    const sigMsg = nacl.sign(msg, privKey);
    const sig = sigMsg.slice(0, signatureLength);
    return new SignatureEd25519(sig);
}

export function pubKeyAddress(pubKey) {
    const encKey = new Writer();
    writeObject(encKey, new Buffer(pubKey.inner));

    const hasher = new ripemd160();
    hasher.update(new Buffer([typeEd25519]));
    hasher.update(encKey.getBuffer());
    return new Uint8Array(hasher.digest())
}

export function pubKeyFromPrivKey(privKey) {
    const pair = nacl.sign.keyPair.fromSecretKey(privKey);
    return new PubKeyEd25519(pair.publicKey);
}
