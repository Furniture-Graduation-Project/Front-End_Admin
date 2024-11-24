import axios from 'axios'

const uploadFileCloudinary = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'rbwjv4cf') // Thay bằng upload preset của bạn
    formData.append('folder', 'test')
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dqing7vxx/image/upload', // Thay bằng cloudinary name của bạn
      formData
    )
    return response.data.url
  } catch (error) {
    console.error(error)
  }
}

export { uploadFileCloudinary }
