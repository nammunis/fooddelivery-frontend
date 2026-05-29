
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import UploadFile from '../utils/mediaUpload';



export default function TestPage() {

  const [file,setFile] = useState(null)

  function handleUpload(){


    UploadFile(file).then((url)=>{
      toast.success('Successfully Uploaded!')

    }).catch((err)=>{
      toast.error('Faild to Uploaded!')
      console.log(err)
    })}

    /*if(file==null){
      toast.error("Please Select a file to upload")
      return
    }
    // මෙකෙන් තමයි ෆයිල් එක දාගන්නෙ 
    supabase.storage.from('images').upload(file.name,file,{
      cacheControl:'3600',
      upsert:false
    }).then(
      (Response)=>{
        toast.success('Successfully Uploaded!')
        const publicUrl= supabase.storage.from('images').getPublicUrl(file.name).data.publicUrl // මෙකෙන් අප්ලොඩ් උන ෆයිල් එකෙ ලින්ක් එක ගන්න පුලුවන්
        console.log(publicUrl)
      }
      
    ).catch(
      (err)=>{
        toast.error('Faild to Uploaded!')
        console.log(err)
      }
    )

  */

  return (
    <div className='flex flex-col items-center justify-center'>
     <input type="file" accept='image/*' className='border-1 border-amber-600 rounded-2xl pt-1 pb-1 pl-2 pr-2 cursor-pointer' onChange={
      (e)=>{

        setFile(e.target.files[0])
      }
     }/>
     <button onClick={handleUpload} className='bg-amber-700 text-xl text-amber-50 cursor-pointer mt-1 pt-1 pb-1 pr-5 pl-5 boder-1 border-amber-300 rounded-2xl'>Upload</button>
    </div>
  )
}
