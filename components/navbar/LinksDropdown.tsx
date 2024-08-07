import React from 'react';
import { DropdownMenu , DropdownMenuContent , DropdownMenuItem , DropdownMenuTrigger , DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { LuAlignLeft } from 'react-icons/lu';
import Link from 'next/link';
import { Button } from '../ui/button';
import { links } from '@/app/utils/links';

function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex gap-4 max-w-[100px]'>
          <LuAlignLeft className='w-6 h-6' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-32 border rounded-lg px-4 py-2 cstm-dropdown dark:bg-black dark:color-white' align='start' sideOffset={12} >
        {links.map((link) => {
          return <DropdownMenuItem key={link.href}>
            <Link href={link.href} className='capitalize w-full'>
             {link.label}
            </Link>
          </DropdownMenuItem>
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinksDropdown