import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import fetchAdmins from "../lib/data/fetchAdmins";
import { Admin } from "../data/dummyTypes";

const activities = [
  "John Doe accepted a Request",
  "John Doe Reviewed an account",
  "John Doe Deactivated an account",
];

export default async function page() {
  const admins = await fetchAdmins();
  console.log(admins);

  return (
    <>
      <div>
        <h1>Admin</h1>
      </div>

      <div className="p-6">
        <div className="flex justify-end px-4 py-2">
          <Link href="/admin/sign-up">
            <Button className="rounded-md bg-[#FF7A45] px-4 py-2 font-medium text-white hover:bg-[#FF7A45]/90">
              Add New Admin
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr,300px]">
          <div className="overflow-hidden rounded-lg border border-blue-200">
            {admins.Success ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox />
                    </TableHead>
                    <TableHead>ADMIN NAME</TableHead>
                    <TableHead>ADMIN EMAIL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins.Data.map((admin: Admin) => (
                    <TableRow key={admin.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>{admin.full_name}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>Admins not found</p>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Last Activity Log</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {activities.map((activity, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {activity}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
