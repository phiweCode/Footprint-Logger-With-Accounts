import React from 'react'; 
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter, 
  SheetClose
} from "@/components/ui/sheet"; 
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';


function Profile({...props}) { 

  const {profileData} = props
  return (
 <Sheet>
      <SheetTrigger asChild>
        <Button variant="primary" className="w-full border-0 rounded-none text-start ">Profile</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">First Name</Label>
            <Input id="sheet-demo-name" defaultValue={profileData.firstName} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Last Name</Label>
            <Input id="sheet-demo-name" defaultValue={profileData.lastName} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Email</Label>
            <Input id="sheet-demo-name" defaultValue={profileData.email} />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default Profile
