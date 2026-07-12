import { Trash2, Search } from "lucide-react";

export default function UsersTable({
  users,
  search,
  onDelete,
}) {

  const filteredUsers = users.filter((user) => {

    const name =
      user.name?.toLowerCase() || "";

    const email =
      user.email?.toLowerCase() || "";

    return (
      name.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase())
    );

  });

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

      {/* Heading */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

        <div>

          <h2 className="text-3xl font-black text-white">
            👥 Users
          </h2>

          <p className="text-gray-400 mt-1">
            Registered users on WaveSights
          </p>

        </div>

        <div className="flex items-center gap-3 bg-[#0f172a] border border-white/10 rounded-2xl px-4 py-3">

          <Search
            size={18}
            className="text-gray-400"
          />

          <span className="text-gray-400">
            {filteredUsers.length} Users
          </span>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-white/10 text-gray-400">

              <th className="text-left py-4">
                User
              </th>

              <th className="text-left py-4">
                Email
              </th>

              <th className="text-left py-4">
                Joined
              </th>

              <th className="text-center py-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="text-center py-10 text-gray-500"
                >
                  No Users Found
                </td>

              </tr>

            ) : (

              filteredUsers.map((user) => (

                <tr
                  key={user.id}
                  className="border-b border-white/5 hover:bg-cyan-500/5 transition"
                >

                  {/* Avatar */}

                  <td className="py-5">

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-black font-black text-lg">

                        {user.name
                          ? user.name
                              .charAt(0)
                              .toUpperCase()
                          : "U"}

                      </div>

                      <div>

                        <h3 className="font-semibold text-white">

                          {user.name || "Unknown"}

                        </h3>

                        <p className="text-sm text-gray-500">

                          ID :
                          {" "}
                          {user.id.slice(0,8)}

                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Email */}

                  <td className="py-5 text-gray-300">

                    {user.email}

                  </td>

                  {/* Joined */}

                  <td className="py-5 text-gray-400">

                    {user.createdAt
                      ?.toDate?.()
                      ?.toLocaleDateString() ||
                      "N/A"}

                  </td>

                  {/* Delete */}

                  <td className="py-5 text-center">

                    <button

                      onClick={() =>
                        onDelete(user.id)
                      }

                      className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-xl"

                    >

                      <Trash2 size={18} />

                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}