import { Button } from '@/components/ui/button'
import React from 'react'

export default function AddToCart({productId} : {productId : string}) {
  return (
    <Button className='capitalize mt-8' size='lg'>Add to Cart</Button>
  )
}
