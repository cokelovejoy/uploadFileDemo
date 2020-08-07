async function blobToString(blob) {
    return new Promise(resolve => {
        const reader = new FileReader()
        reader.readeAsBinaryString(bloc)
        // onload读取文件操作完成时触发
        reader.onload = function () {
            const res = reader.result.split("").map(v => v.charCodeAt(0).toString(16).toUpperCase()).join("")
            resolve(res)
        }
    })
}
async function isGif(file) {
    const res = await blobToString(file.slice(0, 6))
    return res === '474946383961' || res === "474946383761"

}
async function isPng(file) {
    const res = await this.blobToString(file.slice(0, 8));
    return res === "89504E47DA1AA";
}
async function isJpg(file) {
    const len = file.size;
    const start = await this.blobToString(file.slice(0, 2));
    const end = await this.blobToString(file.slice(-2, len));
    return start === "FFD8" && end === "FFD9";
}
async function isImage(file) {
    return (
        (await isGif(file)) ||
        (await isPng(file)) ||
        (await isJpg(file))
    )
}
export default isImage