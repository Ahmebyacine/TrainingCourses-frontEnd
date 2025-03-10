import { getTokenData } from '@/services/auth';
import { ChevronDown } from 'lucide-react';
import React from 'react';
import LogoutButton from './LogoutBotton';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

const UserMenu = () => {
  const {name , email}= getTokenData();
    return (
        <div className="border-t p-4">
         <div className="flex items-center gap-3">
           <div className="flex-1 overflow-hidden">
             <p className="text-sm font-medium leading-none">{name || 'unknown user'}</p>
             <p className="text-xs text-muted-foreground truncate">{email || 'unknown user'}</p>
           </div>
           <DropdownMenu>
             <DropdownMenuTrigger asChild>
               <Button variant="ghost" size="icon">
                 <ChevronDown className="h-4 w-4" />
               </Button>
             </DropdownMenuTrigger>
             <DropdownMenuContent align="end">
               <DropdownMenuLabel>My Account</DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuItem>
                 <LogoutButton/>
               </DropdownMenuItem>
             </DropdownMenuContent>
           </DropdownMenu>
         </div>
       </div>
    );
}

export default UserMenu;
