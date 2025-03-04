"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ProfileData {
  fullName: string
  email: string
  phone: string
  about: string
  country: string
  location: string
}

export default function Page() {
  const [profile, setProfile] = useState<ProfileData>({
    fullName: "Doe",
    email: "doe@gmail.com",
    phone: "+231 456 444 566",
    about: "",
    country: "Canada",
    location: "19th dema street, Canada",
  })

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    repeat: "",
  })

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle profile update logic here
    console.log("Profile updated:", profile)
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password change logic here
    console.log("Password changed:", passwords)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid gap-6 lg:grid-cols-[350px,1fr]">
        {/* Profile Card */}
        <div className="space-y-6">
          <Card className="border-blue-500">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-lg">Doe</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <div className="font-semibold">{profile.fullName}</div>
                  <div className="text-sm text-gray-500">Admin</div>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">COUNTRY:</div>
                  <div className="text-sm">{profile.country}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">LOCATION:</div>
                  <div className="text-sm">{profile.location}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">PHONE NUMBER:</div>
                  <div className="text-sm">{profile.phone}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">EMAIL ADDRESS:</div>
                  <div className="text-sm">{profile.email}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Login History</h3>
                <Button variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                  All Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Forms */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <h2 className="text-xl font-semibold">Edit Profile</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm" htmlFor="fullName">
                      Full Name
                    </label>
                    <Input
                      id="fullName"
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm" htmlFor="email">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm" htmlFor="phone">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm" htmlFor="about">
                      About me
                    </label>
                    <Textarea
                      id="about"
                      value={profile.about}
                      onChange={(e) => setProfile({ ...profile, about: e.target.value })}
                      rows={4}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" className="bg-[#FF7A45] hover:bg-[#FF7A45]/90">
                    update profile
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <form onSubmit={handlePasswordChange} className="space-y-6">
                <h2 className="text-xl font-semibold">Change Password</h2>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm" htmlFor="currentPassword">
                        Current password
                      </label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwords.current}
                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm" htmlFor="newPassword">
                        New password
                      </label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwords.new}
                        onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm" htmlFor="repeatPassword">
                      Repeat new password
                    </label>
                    <Input
                      id="repeatPassword"
                      type="password"
                      value={passwords.repeat}
                      onChange={(e) => setPasswords({ ...passwords, repeat: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" className="bg-[#FF7A45] hover:bg-[#FF7A45]/90">
                    change
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

