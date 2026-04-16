import { Spinner } from '@/components/ui/spinner'
import { Loader2Icon, LoaderPinwheelIcon } from 'lucide-react'
import React from 'react'

export default function loading() {
  return (
    <div className='h-screen bg-main-color flex justify-center items-center'>
        <LoaderPinwheelIcon className='size-50' color='white'/>
    </div>
  )
}
