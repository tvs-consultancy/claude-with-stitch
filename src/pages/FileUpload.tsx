import { useState, useRef, useCallback } from 'react';
import { type UploadedFile, formatFileSize } from '../data/mock-data';

let nextFileId = 1;

export default function FileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = useCallback((file: File) => {
    const uploadedFile: UploadedFile = {
      id: String(nextFileId++),
      name: file.name,
      size: file.size,
      type: file.type || 'unknown',
      uploadedAt: new Date().toISOString(),
      progress: 0,
    };

    setFiles((prev) => [uploadedFile, ...prev]);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30 + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setFiles((prev) =>
        prev.map((f) => (f.id === uploadedFile.id ? { ...f, progress } : f))
      );
    }, 300);
  }, []);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach(simulateUpload);
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(e.target.files ?? []);
    selectedFiles.forEach(simulateUpload);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function handleRemove(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  const fileTypeIcon = (type: string): string => {
    if (type.startsWith('image/')) return '🖼️';
    if (type.includes('pdf')) return '📄';
    if (type.includes('video')) return '🎬';
    if (type.includes('audio')) return '🎵';
    if (type.includes('spreadsheet') || type.includes('excel') || type.includes('csv')) return '📊';
    if (type.includes('presentation') || type.includes('powerpoint')) return '📽️';
    if (type.includes('document') || type.includes('word')) return '📝';
    return '📎';
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Files</h1>
        <p className="text-gray-500 mt-1">Upload and manage media assets & documents</p>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all mb-8 ${
          isDragging
            ? 'border-primary bg-primary/5 scale-[1.01]'
            : 'border-gray-200 hover:border-primary/40 hover:bg-gray-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <div className="text-5xl mb-4">{isDragging ? '📥' : '☁️'}</div>
        <p className="text-lg font-medium text-gray-900">
          {isDragging ? 'Drop files here' : 'Drag & drop files here'}
        </p>
        <p className="text-sm text-gray-400 mt-1">or click to browse</p>
        <p className="text-xs text-gray-300 mt-3">
          Supports images, PDFs, videos, documents, spreadsheets and more
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">
              Uploaded Files ({files.length})
            </h2>
            <button
              onClick={() => setFiles([])}
              className="text-sm text-danger hover:text-red-700 font-medium"
            >
              Clear all
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50/50">
                <span className="text-2xl">{fileTypeIcon(file.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-gray-400">{formatFileSize(file.size)}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-400">{file.type || 'Unknown type'}</span>
                  </div>
                  {file.progress < 100 && (
                    <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {file.progress >= 100 ? (
                    <span className="text-xs font-medium text-success">Uploaded</span>
                  ) : (
                    <span className="text-xs text-gray-400">{Math.round(file.progress)}%</span>
                  )}
                  <button
                    onClick={() => handleRemove(file.id)}
                    className="p-1 text-gray-400 hover:text-danger transition-colors"
                    title="Remove file"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {files.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-3">📂</p>
          <p className="font-medium">No files uploaded yet</p>
          <p className="text-sm mt-1">Upload files to get started</p>
        </div>
      )}
    </div>
  );
}
