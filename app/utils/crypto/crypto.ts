import crypto from "crypto"
const ALGORITMA = "aes-256-cbc"
const SECRET_KEY = process.env.CHIPER_NOMOR_INDUK_KTP
const IV_LENGTH = 16


export function encrypted(text:string){
    const iv = crypto.randomBytes(IV_LENGTH)
    const chiper = crypto.createCipheriv(ALGORITMA,Buffer.alloc(32,SECRET_KEY,'utf-8'), iv)

    let encrypted = chiper.update(text)
    encrypted = Buffer.concat([encrypted,chiper.final()])

    return iv.toString("hex") + ":" + encrypted.toString("hex")
}

export function decrypted(text: string) {
    const [ivHex, encryptedHex] = text.split(":");
    if (!ivHex || !encryptedHex) throw new Error("Format enkripsi tidak valid");

    const key = Buffer.alloc(32, SECRET_KEY, 'utf-8');
    const iv = Buffer.from(ivHex, "hex");
    const encryptedText = Buffer.from(encryptedHex, "hex");

    const decipher = crypto.createDecipheriv(ALGORITMA, key, iv);
    
    let decrypt = decipher.update(encryptedText);
    decrypt = Buffer.concat([decrypt, decipher.final()]);

    return decrypt.toString();
}