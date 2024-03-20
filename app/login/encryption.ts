import sjcl from "sjcl";

export function encrypt(text: string, key: string) {
	const keyBitArray = sjcl.codec.utf8String.toBits(key);
	const encrypted = sjcl.encrypt(keyBitArray, text);
	return JSON.stringify(encrypted);
}

export function decrypt(encryptedText: string, key: string) {
	const keyBitArray = sjcl.codec.utf8String.toBits(key);
	const decrypted = sjcl.decrypt(keyBitArray, JSON.parse(encryptedText));
	return decrypted;
}

export function isValidJSON(str: string) {
	try {
	  JSON.parse(str);
	  return true;
	} catch (e) {
	  return false;
	}
  }