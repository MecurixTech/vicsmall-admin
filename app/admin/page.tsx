import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link"

interface Admin {
  id: string;
  name: string;
  status: "Active" | "Deactivated" | "Pending";
  lastLogin: string;
}

const admins: Admin[] = [
  {
    id: "#VICAD034",
    name: "John Doe",
    status: "Active",
    lastLogin: "02:23:56 | 11/12/2024",
  },
  {
    id: "#VICAD134",
    name: "John Doe",
    status: "Deactivated",
    lastLogin: "12:23:56 | 10/12/2024",
  },
  {
    id: "#VICAD134",
    name: "John Doe",
    status: "Pending",
    lastLogin: "-",
  },
  // Add more admins as needed...
];

const activities = [
  "John Doe accepted a Request",
  "John Doe Reviewed an account",
  "John Doe Deactivated an account",
];

export default function page() {
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead>ADMIN ID</TableHead>
                  <TableHead>ADMIN NAME</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>LAST LOGIN</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">{admin.id}</TableCell>
                    <TableCell>{admin.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          admin.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {admin.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{admin.lastLogin}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
