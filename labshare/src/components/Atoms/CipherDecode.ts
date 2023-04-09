import * as crypto from 'crypto'


function DecodeBase64(data: string): string {
    const key = crypto.scryptSync(process.env.AES_KEY  as string,process.env.SALT as string,32)
    // 受け取った暗号化文字列をバイナリに変換
    const buff = Buffer.from(data, 'base64');

    // iv値である、先頭16byteを取り出す
    const iv = buff.slice(0, 16);

    // iv値以降の、暗号化データを取り出す
    const encData = buff.slice(16);

    // 復号器作成
    const decipher = crypto.createDecipheriv(process.env.ALGORITHM as string, key, iv);

    // 暗号化データを復号化
    const decData = decipher.update(encData);

    // 末端処理 ＆ バイナリを文字列に戻す
    return Buffer.concat([decData, decipher.final()]).toString('utf8');
}
    
export default DecodeBase64