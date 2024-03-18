export default class FileInfo {
  
  public folder: string = ''
  public name: string | null = null
  public ACL: string = 'public-read'
  public ContentType: string = '' 
  public extension: string = ''
  public size: number = 0
  public lastModified: string = ''
  public source: any = null

  public folder_path: string = ''
  public get_presigned_url: string = '/api/user/file_upload/get_presigned_url'
  public status: string = 'Empty'
  public progress: number = 0
  public fileContentBlob: any = null
  
  public presigned_url: string = ''
  public file_path: string = ''
  public microtime: number = 0

  constructor(folder: string = '', ACL = 'public-read') {
    this.folder = folder
    this.ACL = ACL
    this.microtime = new Date().getTime()
  }
  
  public setFile(file: any) {
    this.name = file.name
    this.ContentType = file.type
    this.size = file.size
    this.lastModified = file.lastModified
    this.extension = this.name.split('.').pop() || ''
    this.source = file
    this.status = 'Selected'
  }

  public async upload() {
    try {
      await this.getPresignedUrl()
      await this.readFileAndUpload()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  public get getFilePath() {
    const sanitized =  this.name.replace(/[^a-z0-9\s\.]/gi, '').replace(/ /g, '_').replace(/_+/g, '_')
    return `${ this.folder }/${ this.microtime }_${ sanitized }`
  }

  private async getPresignedUrl() {
    try {
      const { data } = await useApi().post(this.get_presigned_url, { file_path: this.getFilePath })
      this.presigned_url = data.presigned_url
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  private readFileAndUpload(): Promise<void> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async (event: any) => {
        this.status = 'Preparing'
        this.fileContentBlob = event.target.result
        try {
          await this.uploadFileToAws()
          resolve()
        } catch (error) {
          this.status = 'Error'
          reject(error)
        }
      };

      reader.onerror = (error) => {
        this.status = 'Error'
        reject(error)
      }

      reader.readAsArrayBuffer(this.source)
    })
  }

  private uploadFileToAws(): Promise<void> {
    return new Promise((resolve, reject) => {

      this.status = 'Uploading'

      const xhr = new XMLHttpRequest()
      xhr.open('PUT', this.presigned_url, true)
      xhr.setRequestHeader('Content-Type', this.ContentType)

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percentage = (e.loaded / e.total) * 100
          this.progress = percentage
        }
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('File uploaded successfully.')
            this.status = 'Complete'
            resolve()
          } else {
            this.status = 'Error'
            console.error('File upload failed.')
            reject()
          }
        }
      }

      xhr.send(this.fileContentBlob)

    })
  }
  
}