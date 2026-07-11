"use client";

import { useState } from "react";
import UploadModal from "../upload/UploadModal";
import { Button } from "@/components/ui/button";

import {
  Users,
  CheckCircle,
  XCircle,
  TrendingUp,
  Search,
} from "lucide-react";

export default function ImportSection() {
  const [open, setOpen] = useState(false);

  const [importedLeads, setImportedLeads] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [stats, setStats] = useState({
    total: 0,
    imported: 0,
    skipped: 0,
  });

  const successRate =
    stats.total === 0
      ? 0
      : Math.round((stats.imported / stats.total) * 100);

  const filteredLeads = importedLeads.filter((lead) =>
    `${lead.name} ${lead.email} ${lead.company}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      {/* Dashboard Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">Total Leads</p>
          <h2 className="mt-2 text-3xl font-bold">{stats.total}</h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">Imported</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {stats.imported}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">Skipped</p>
          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {stats.skipped}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">Success Rate</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {successRate}%
          </h2>
        </div>
      </div>

      {/* Import Section */}
      <section className="mt-8 rounded-xl bg-white p-8 shadow">
        <h2 className="text-2xl font-semibold">
          Import CSV
        </h2>

        <p className="mt-2 text-gray-500">
          Upload a CSV file to intelligently extract CRM leads using AI.
        </p>

        <Button
          onClick={() => setOpen(true)}
          size="lg"
          className="mt-6 rounded-xl bg-green-600 px-8 hover:bg-green-700"
        >
          Import CSV
        </Button>
      </section>

      <UploadModal
        open={open}
        onOpenChange={setOpen}
        onUploadSuccess={(response) => {
          setImportedLeads(response.geminiResponse);

          setStats({
            total: response.totalRows,
            imported: response.imported,
            skipped: response.skipped,
          });
        }}
      />

      {/* Imported Leads */}
      <section className="mt-8 rounded-xl bg-white p-8 shadow">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold">
            Imported Leads
          </h2>

          <input
            type="text"
            placeholder="🔍 Search name, email or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 md:w-80"
          />
        </div>

        {filteredLeads.length === 0 ? (
          <div className="py-12 text-center">
            <div className="text-6xl">📂</div>

            <h3 className="mt-4 text-xl font-semibold">
              No leads found
            </h3>

            <p className="mt-2 text-gray-500">
              Upload a CSV or change your search.
            </p>
          </div>
        ) : (
          <div className="max-h-[500px] overflow-auto rounded-lg border">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 z-10 bg-gray-100">
                <tr>
                  <th className="border p-3 text-left">Name</th>
                  <th className="border p-3 text-left">Email</th>
                  <th className="border p-3 text-left">Phone</th>
                  <th className="border p-3 text-left">Company</th>
                  <th className="border p-3 text-left">City</th>
                  <th className="border p-3 text-left">State</th>
                  <th className="border p-3 text-left">Country</th>
                  <th className="border p-3 text-left">Status</th>
                  <th className="border p-3 text-left">Source</th>
                </tr>
              </thead>

              <tbody>
                {filteredLeads.map((lead, index) => (
                  <tr
                    key={index}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="border p-3">
                      {lead.name || "-"}
                    </td>

                    <td className="border p-3">
                      {lead.email || "-"}
                    </td>

                    <td className="border p-3">
                      {lead.mobile_without_country_code || "-"}
                    </td>

                    <td className="border p-3">
                      {lead.company || "-"}
                    </td>

                    <td className="border p-3">
                      {lead.city || "-"}
                    </td>

                    <td className="border p-3">
                      {lead.state || "-"}
                    </td>

                    <td className="border p-3">
                      {lead.country || "-"}
                    </td>

                    <td className="border p-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold
                        ${
                          lead.crm_status === "GOOD_LEAD_FOLLOW_UP"
                            ? "bg-green-100 text-green-700"
                            : lead.crm_status === "BAD_LEAD"
                            ? "bg-red-100 text-red-700"
                            : lead.crm_status === "SALE_DONE"
                            ? "bg-blue-100 text-blue-700"
                            : lead.crm_status === "DID_NOT_CONNECT"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {lead.crm_status || "Unknown"}
                      </span>
                    </td>

                    <td className="border p-3">
                      {lead.data_source || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}