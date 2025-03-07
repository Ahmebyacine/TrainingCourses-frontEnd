
import { ChevronDown, LogOut } from 'lucide-react';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

const UserMenu = () => {
    return (
        <div className="border-t p-4">
         <div className="flex items-center gap-3">
           <Avatar>
             <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
             <AvatarFallback>AD</AvatarFallback>
           </Avatar>
           <div className="flex-1 overflow-hidden">
             <p className="text-sm font-medium leading-none">Admin User</p>
             <p className="text-xs text-muted-foreground truncate">admin@admin.com</p>
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
                 <LogOut className="mr-2 h-4 w-4" />
                 Logout
               </DropdownMenuItem>
             </DropdownMenuContent>
           </DropdownMenu>
         </div>
       </div>
    );
}

export default UserMenu;
