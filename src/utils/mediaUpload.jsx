import { createClient } from '@supabase/supabase-js'

const url = 'https://bxtdfsyyzprsmicmrnvz.supabase.co'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4dGRmc3l5enByc21pY21ybnZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMDk2MDQsImV4cCI6MjA5NTU4NTYwNH0.21UbffPHzvQLo0arE7pdlkgewX_L6ldjT0DQcDVD5qw'

const supabase = createClient(url,key)


export default function UploadFile(file) {
    const promise = new Promise(
        (resolve,reject)=>{
            if(file==null){
                reject('Please select a file to upload !')
                return
            }
            const timeStamp = new Date().getTime()
            const fileName = timeStamp+'-'+file.name

            supabase.storage.from('images').upload(fileName,file,{
                cacheControl:'3600',
                upsert:false
            }).then(
                ()=>{
                    const publicUrl = supabase.storage.from('images').getPublicUrl(fileName).data.publicUrl
                    console.log('File public url: '+ publicUrl)
                    resolve(publicUrl)
                }
            ).catch(
                (err)=>{
                    console.err('Error uploading file',error)
                    reject('Fiald to upload file')
                }
            )
        }
    )
    return promise;
}
