"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

type DropzoneProps = {
  onFileSelect: (file: File) => void;
};

export default function Dropzone({
  onFileSelect,
}: DropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5 MB
  });

  return (
    <div
      {...getRootProps()}
      className={`
        mt-6
        min-h-[320px]
        rounded-xl
        border-2
        border-dashed
        p-16
        flex
        flex-col
        items-center
        justify-center
        text-center
        cursor-pointer
        transition-all
        duration-200
        ${
          isDragActive
            ? "border-green-600 bg-green-50"
            : "border-gray-300 hover:border-green-500 hover:bg-gray-50"
        }
      `}
    >
      <input {...getInputProps()} />

      <UploadCloud className="mb-6 h-16 w-16 text-green-600" />

      <h3 className="text-2xl font-semibold text-gray-900">
        Drop your CSV file here
      </h3>

      <p className="mt-3 text-gray-500">
        or click to browse files
      </p>

      <span className="mt-6 inline-block rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600">
        Supported file: .csv (max 5 MB)
      </span>
    </div>
  );
}