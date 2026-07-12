import { Eye, Trash2, Mail } from "lucide-react";

export default function ContactsTable({
  contacts,
  search,
  onDelete,
}) {

  const filteredContacts = contacts.filter((item) => {

    const name =
      item.name?.toLowerCase() || "";

    const email =
      item.email?.toLowerCase() || "";

    const message =
      item.message?.toLowerCase() || "";

    return (
      name.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase()) ||
      message.includes(search.toLowerCase())
    );

  });

  return (

    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-3xl font-black text-white">

            📩 Contact Messages

          </h2>

          <p className="text-gray-400 mt-2">

            Messages received from users

          </p>

        </div>

        <div className="bg-cyan-500/10 text-cyan-400 px-5 py-2 rounded-full font-semibold">

          {filteredContacts.length} Messages

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-white/10 text-gray-400">

              <th className="py-4 text-left">
                User
              </th>

              <th className="py-4 text-left">
                Email
              </th>

              <th className="py-4 text-left">
                Message
              </th>

              <th className="py-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredContacts.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="py-12 text-center text-gray-500"
                >

                  No Messages Found

                </td>

              </tr>

            ) : (

              filteredContacts.map((item) => (

                <tr
                  key={item.id}
                  className="border-b border-white/5 hover:bg-cyan-500/5 transition"
                >

                  {/* User */}

                  <td className="py-6">

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center font-black text-black">

                        {item.name
                          ? item.name
                              .charAt(0)
                              .toUpperCase()
                          : "U"}

                      </div>

                      <div>

                        <h3 className="font-semibold">

                          {item.name}

                        </h3>

                        <p className="text-gray-500 text-sm">

                          Contact Form

                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Email */}

                  <td className="py-6">

                    <div className="flex items-center gap-2 text-gray-300">

                      <Mail
                        size={16}
                      />

                      {item.email}

                    </div>

                  </td>

                  {/* Message */}

                  <td className="py-6">

                    <div className="max-w-md">

                      <p className="text-gray-300 line-clamp-2">

                        {item.message}

                      </p>

                    </div>

                  </td>

                  {/* Action */}

                  <td className="py-6">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() =>
                          alert(item.message)
                        }
                        className="w-10 h-10 rounded-xl bg-cyan-500 hover:bg-cyan-600 flex items-center justify-center transition"
                      >

                        <Eye size={18} />

                      </button>

                      <button
                        onClick={() =>
                          onDelete(item.id)
                        }
                        className="w-10 h-10 rounded-xl bg-red-500 hover:bg-red-600 flex items-center justify-center transition"
                      >

                        <Trash2 size={18} />

                      </button>

                    </div>

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