import type { UserDto } from "../../../auth/types/userTypes";

interface Props {
  data: UserDto[];
}

export default function UsersTable({ data }: Props) {
  if (!data?.length) return <p>No users found.</p>;

  return (
    <table className="min-w-full border border-gray-200 rounded-md mt-4">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-2">ID</th>
          <th className="p-2">Email</th>
          <th className="p-2">Role</th>
        </tr>
      </thead>
      <tbody>
        {data.map((u) => (
          <tr key={u.id} className="border-t hover:bg-gray-50">
            <td className="p-2">{u.id}</td>
            <td className="p-2">{u.email}</td>
            <td className="p-2">{u.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
