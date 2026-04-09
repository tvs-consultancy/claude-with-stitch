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

  const completedCount = files.filter((f) => f.progress >= 100).length;
  const uploadingCount = files.filter((f) => f.progress < 100).length;

  return (
    <div className="p-8 max-w-[1400px]">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0f172a]">Files</h1>
        <p className="text-[#64748b] mt-1 text-sm">Upload and manage media assets & documents</p>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200 mb-8 ${
          isDragging
            ? 'border-[#2563eb] bg-[#eff6ff] scale-[1.01]'
            : 'border-[#e2e8f0] hover:border-[#2563eb]/40 hover:bg-[#f9fafb]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors ${isDragging ? 'bg-[#2563eb]/10' : 'bg-[#f1f5f9]'}`}>
          <span className="text-4xl">{isDragging ? '📥' : '☁️'}</span>
        </div>
        <p className="text-lg font-semibold text-[#0f172a]">
          {isDragging ? 'Drop files here' : 'Drag & drop files here'}
        </p>
        <p className="text-sm text-[#94a3b8] mt-1.5">or click to browse your files</p>
        <div className="flex items-center justify-center gap-4 mt-5">
          {['Images', 'PDFs', 'Videos', 'Documents', 'Spreadsheets'].map((type) => (
            <span key={type} className="text-[11px] text-[#94a3b8] bg-[#f1f5f9] px-2.5 py-1 rounded-md font-medium">
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#e2e8f0]">
            <div className="flex items-center gap-3">
              <h2 className="font-semibold text-[#0f172a] text-sm">
                Uploaded Files ({files.length})
              </h2>
              {uploadingCount > 0 && (
                <span className="inline-flex items-center gap-1.5 text-[11px] text-[#2563eb] bg-[#eff6ff] px-2 py-0.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] animate-pulse" />
                  {uploadingCount} uploading
                </span>
              )}
              {completedCount > 0 && (
                <span className="text-[11px] text-[#10b981] bg-[#dcfce7] px-2 py-0.5 rounded-full font-medium">
                  {completedCount} completed
                </span>
              )}
            </div>
            <button
              onClick={() => setFiles([])}
              className="text-xs text-[#ef4444] hover:text-[#dc2626] font-medium transition-colors flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear all
            </button>
          </div>
          <div className="divide-y divide-[#f1f5f9]">
            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#f8fafc] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#f1f5f9] flex items-center justify-center shrink-0">
                  <span className="text-xl">{fileTypeIcon(file.type)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0f172a] truncate">{file.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-[#94a3b8]">{formatFileSize(file.size)}</span>
                    <span className="text-[11px] text-[#e2e8f0]">·</span>
                    <span className="text-[11px] text-[#94a3b8]">{file.type || 'Unknown type'}</span>
                  </div>
                  {file.progress < 100 && (
                    <div className="mt-2 w-full bg-[#f1f5f9] rounded-full h-1.5">
                      <div
                        className="bg-[#2563eb] h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {file.progress >= 100 ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#10b981]">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Uploaded
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#64748b] font-medium tabular-nums">{Math.round(file.progress)}%</span>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRemove(file.id); }}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[#94a3b8] hover:text-[#ef4444] hover:bg-[#fef2f2] transition-all"
                    title="Remove file"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {files.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-[#f1f5f9] flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📂</span>
          </div>
          <p className="font-semibold text-[#0f172a]">No files uploaded yet</p>
          <p className="text-sm text-[#94a3b8] mt-1">Drag files above or click to browse</p>
        </div>
      )}
    </div>
  );
}
