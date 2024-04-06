import OSS from "ali-oss"
import { nanoid } from "nanoid"

const client = new OSS({
  // // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: import.meta.env.REGION,
  // 从环境变量中获取访问凭证。运行本代码示例之前，请确保已设置环境变量OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET。
  accessKeyId: import.meta.env.VITE_OSS_ACCESSKEYID,
  accessKeySecret: import.meta.env.VITE_OSS_ACCESSKEYSECRET,
  // yourbucketname填写存储空间名称。
  bucket: import.meta.env.VITE_OSS_BUCKET
})

// 获取所有的文件
export async function osslist() {
  // 不带任何参数，默认最多返回100个文件。
  const result = await client.list()
  return result
}

// 删除文件
export async function ossdel(path: string) {
  const result = await client.delete(path)
  return result
}

// 上传文件
export async function ossupload(path: string, file: any) {
  const result = await client.put(path, file)
  return result
}
