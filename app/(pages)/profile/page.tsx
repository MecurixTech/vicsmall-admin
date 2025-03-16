"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import updateProfile from "../../lib/actions/updateProfile";
import axios from "axios";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Profile = {
  about_me: string;
  email: string;
  full_name: string;
  id: string;
  is_staff: boolean;
  is_superuser: boolean;
  phone_number: string;
};

export default function Page() {
  const auth =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("auth") || "{}");

  if (!auth.access) {
    redirect("/login");
  }

  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<Profile>();

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    about_me: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    repeat: "",
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    if (typeof window !== "undefined") {
      e.preventDefault();
      // Handle profile update logic here
      setIsLoading(true);

      const response = await updateProfile(formData, auth.access);
      if (response) {
        setIsLoading(false);
        if (response.Success) {
          toast.success(response.Message);
          window.location.reload();
        } else {
          toast.error(response.Message);
        }
        console.log(response);
      }
    }
    // console.log("Profile updated:", profile);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password change logic here
    console.log("Password changed:", passwords);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadingProfile = toast.loading("Loading profile details...");
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/admin-profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.access}`,
          },
        })
        .then((response) => {
          setProfile(response.data.Data);
          toast.success(response.data.Message);
        })
        .catch((error) => {
          console.log(error);
          toast.error("An error occurred!");
        })
        .finally(() => toast.dismiss(loadingProfile));
    }
  }, [auth.access]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid gap-6 lg:grid-cols-[350px,1fr]">
        {/* Profile Card */}
        <div className="space-y-6">
          <Card className="border-blue-500">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-lg">
                    {profile?.full_name
                      .split(" ")
                      .map((name: string) => name[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <div className="font-semibold">{profile?.full_name}</div>
                  <div className="text-sm text-gray-500">Admin</div>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">PHONE NUMBER:</div>
                  <div className="text-sm">{profile?.phone_number}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">EMAIL ADDRESS:</div>
                  <div className="text-sm">{profile?.email}</div>
                </div>
                {profile?.about_me && (
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">BIO:</div>
                    <div className="text-sm">{profile?.about_me}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Login History</h3>
                <Button
                  variant="secondary"
                  className="bg-purple-100 text-purple-700 hover:bg-purple-200"
                >
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
                      defaultValue={profile?.full_name}
                      onChange={(e) =>
                        setFormData({ ...formData, full_name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm" htmlFor="phone">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        defaultValue={profile?.phone_number}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone_number: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm" htmlFor="about">
                      About me
                    </label>
                    <Textarea
                      id="about"
                      defaultValue={profile?.about_me}
                      onChange={(e) =>
                        setFormData({ ...formData, about_me: e.target.value })
                      }
                      rows={4}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#FF7A45] hover:bg-[#FF7A45]/90 disabled:opacity-30"
                  >
                    {isLoading ? "Loading..." : "Update profile"}
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
                        onChange={(e) =>
                          setPasswords({
                            ...passwords,
                            current: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setPasswords({ ...passwords, new: e.target.value })
                        }
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
                      onChange={(e) =>
                        setPasswords({ ...passwords, repeat: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-[#FF7A45] hover:bg-[#FF7A45]/90"
                  >
                    change
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
