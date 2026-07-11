"use client";

import { useState } from "react";
import Papa from "papaparse";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import Dropzone from "./Dropzone";
import { uploadCSV } from "@/lib/api";

type UploadModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadSuccess: (response: any) => void;
};

export default function UploadModal({
  open,
  onOpenChange,
  onUploadSuccess,
}: UploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Generate CSV Preview
  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);

    if (!file) {
      setPreviewData([]);
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setPreviewData((results.data as any[]).slice(0, 5));
      },
    });
  };

  // Upload CSV
  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);

    try {
      const response = await uploadCSV(selectedFile);

      console.log(response);

      onUploadSuccess(response);

      setSelectedFile(null);
      setPreviewData([]);

      onOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        onOpenChange(isOpen);

        if (!isOpen) {
          setSelectedFile(null);
          setPreviewData([]);
        }
      }}
    >
      <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Import Leads via CSV
          </DialogTitle>

          <p className="text-sm text-gray-500">
            Upload a CSV file to bulk import leads into your CRM.
          </p>
        </DialogHeader>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto pr-2">
          <Dropzone onFileSelect={handleFileSelect} />

          {/* Selected File */}
          {selectedFile && (
            <div className="mt-6 rounded-xl border bg-gray-50 p-5">
              <div className="flex items-center gap-4">
                <div className="text-3xl">📄</div>

                <div>
                  <h3 className="font-semibold">
                    {selectedFile.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CSV Preview */}
          {previewData.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">
                CSV Preview
              </h3>

              <div className="max-h-64 overflow-auto rounded-lg border">
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 z-10 bg-gray-100">
                    <tr>
                      {Object.keys(previewData[0]).map((key) => (
                        <th
                          key={key}
                          className="border px-3 py-2 text-left"
                        >
                          {key.trim()}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {previewData.map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((value: any, i) => (
                          <td
                            key={i}
                            className="border px-3 py-2"
                          >
                            {String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Loading Section */}
          {loading && (
            <div className="mt-6 rounded-xl border bg-blue-50 p-5">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>

                <div>
                  <h3 className="font-semibold text-blue-900">
                    AI is extracting CRM fields...
                  </h3>

                  <p className="text-sm text-gray-600">
                    Please wait while we analyze your CSV.
                  </p>
                </div>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-full animate-pulse rounded-full bg-green-600"></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-end gap-3 border-t pt-4">
          <Button
            variant="outline"
            disabled={loading}
            onClick={() => {
              setSelectedFile(null);
              setPreviewData([]);
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>

          <Button
            className="bg-green-600 hover:bg-green-700"
            disabled={!selectedFile || loading}
            onClick={handleUpload}
          >
            {loading ? "Processing AI..." : "Continue"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}