import {
  Trash2,
  Mail,
  Download,
} from "lucide-react";

export default function SubscribersTable({
  subscribers,
  search,
  onDelete,
}) {

  const filteredSubscribers =
    subscribers.filter((item) => {

      const email =
        item.email?.toLowerCase() || "";

      return email.includes(
        search.toLowerCase()
      );

    });

  // Export CSV

  const exportCSV = () => {

    if (filteredSubscribers.length === 0)
      return;

    const csv = [
      ["Email", "Subscribed Date"],

      ...filteredSubscribers.map((item) => [

        item.email,

        item.createdAt?.toDate?.().toLocaleDateString() ||
          "N/A",

      ]),
    ]
      .map((row) => row.join(","))

      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download =
      "wavesights_subscribers.csv";

    a.click();

    window.URL.revokeObjectURL(url);

  };

  return (

    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-8">

        <div>

          <h2 className="text-3xl font-black text-white">

            📧 Newsletter Subscribers

          </h2>

          <p className="text-gray-400 mt-2">

            Users subscribed to updates

          </p>

        </div>

        <button

          onClick={exportCSV}

          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-xl font-semibold transition"

        >

          <Download size={18} />

          Export CSV

        </button>

      </div>

      {/* Total */}

      <div className="mb-6">

        <span className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full font-semibold">

          {filteredSubscribers.length} Subscribers

        </span>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-white/10 text-gray-400">

              <th className="text-left py-4">

                Subscriber

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

            {filteredSubscribers.length ===
            0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="text-center py-12 text-gray-500"
                >

                  No Subscribers Found

                </td>

              </tr>

            ) : (

              filteredSubscribers.map(
                (item) => (

                  <tr
                    key={item.id}
                    className="border-b border-white/5 hover:bg-cyan-500/5 transition"
                  >

                    {/* Avatar */}

                    <td className="py-6">

                      <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">

                          <Mail
                            size={20}
                          />

                        </div>

                        <div>

                          <h3 className="font-semibold">

                            Subscriber

                          </h3>

                          <p className="text-gray-500 text-sm">

                            Newsletter

                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Email */}

                    <td className="py-6 text-gray-300">

                      {item.email}

                    </td>

                    {/* Joined */}

                    <td className="py-6 text-gray-400">

                      {item.createdAt
                        ?.toDate?.()
                        ?.toLocaleDateString() ||
                        "N/A"}

                    </td>

                    {/* Delete */}

                    <td className="py-6">

                      <div className="flex justify-center">

                        <button

                          onClick={() =>
                            onDelete(
                              item.id
                            )
                          }

                          className="w-10 h-10 rounded-xl bg-red-500 hover:bg-red-600 flex items-center justify-center transition"

                        >

                          <Trash2
                            size={18}
                          />

                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}