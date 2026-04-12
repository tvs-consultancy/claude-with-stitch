import { useState, useRef, useCallback } from 'react';
import { type UploadedFile, formatFileSize } from '../data/mock-data';
import Icon from '../components/Icon';

let nextFileId = 1;

const fileTypeConfig: Record<string, { icon: string; color: string }> = {
  image: { icon: 'image', color: 'bg-emerald-50 text-emerald-600' },
  pdf: { icon: 'description', color: 'bg-red-50 text-red-600' },
  video: { icon: 'movie', color: 'bg-purple-50 text-purple-600' },
  audio: { icon: 'music_note', color: 'bg-pink-50 text-pink-600' },
  spreadsheet: { icon: 'table_chart', color: 'bg-green-50 text-green-600' },
  presentation: { icon: 'slideshow', color: 'bg-orange-50 text-orange-600' },
  document: { icon: 'article', color: 'bg-blue-50 text-blue-600' },
  design: { icon: 'architecture', color: 'bg-blue-50 text-blue-600' },
  default: { icon: 'attach_file', color: 'bg-slate-50 text-slate-600' },
};

function getFileConfig(type: string) {
  if (type.startsWith('image/')) return fileTypeConfig.image;
  if (type.includes('pdf')) return fileTypeConfig.pdf;
  if (type.includes('video')) return fileTypeConfig.video;
  if (type.includes('audio')) return fileTypeConfig.audio;
  if (type.includes('spreadsheet') || type.includes('excel') || type.includes('csv'))
    return fileTypeConfig.spreadsheet;
  if (type.includes('presentation') || type.includes('powerpoint'))
    return fileTypeConfig.presentation;
  if (type.includes('document') || type.includes('word')) return fileTypeConfig.document;
  return fileTypeConfig.default;
}

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

  const uploadingCount = files.filter((f) => f.progress < 100).length;

  return (
    <section className="max-w-6xl mx-auto p-8">
      {/* Page Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold tracking-tighter text-on-surface mb-2">
          File Assets
        </h2>
        <p className="text-on-surface-variant font-medium">
          Manage and curate your media planning workspace.
        </p>
      </div>

      {/* Drop Zone */}
      <div className="relative mb-12">
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`group relative flex flex-col items-center justify-center w-full h-80 border-2 border-dashed rounded-[2rem] transition-all cursor-pointer overflow-hidden ${
            isDragging
              ? 'border-primary-container bg-primary-container/10'
              : 'border-primary-container/40 bg-primary-container/5 hover:bg-primary-container/[0.08] hover:border-primary-container'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-container/10 to-transparent pointer-events-none" />
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-white shadow-xl shadow-primary/5 text-primary">
              <Icon name={isDragging ? 'download' : 'cloud_upload'} size="xl" />
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2 tracking-tight">
              {isDragging ? 'Drop files here' : 'Drag and drop files here or click to browse'}
            </h3>
            <p className="text-on-surface-variant text-sm max-w-sm">
              Support for images, PDFs, videos, documents, spreadsheets and more.
            </p>
          </div>
          <div className="absolute bottom-6 right-6">
            <button
              className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary-container text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
            >
              Select Files
            </button>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="bg-surface-container-lowest rounded-[2rem] shadow-sm overflow-hidden p-2">
          <div className="px-6 py-5 flex items-center justify-between border-b border-surface-container-low mb-2">
            <h4 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
              Active Uploads & Recent Files
            </h4>
            <div className="flex items-center gap-3">
              {uploadingCount > 0 && (
                <span className="text-xs font-semibold text-primary px-2.5 py-1 bg-primary/5 rounded-full">
                  {uploadingCount} Task{uploadingCount !== 1 ? 's' : ''} Remaining
                </span>
              )}
              <button
                onClick={() => setFiles([])}
                className="text-xs font-semibold text-danger hover:text-red-700 transition-colors"
              >
                Clear all
              </button>
            </div>
          </div>
          <div className="space-y-1">
            {files.map((file) => {
              const config = getFileConfig(file.type);
              const isComplete = file.progress >= 100;

              return (
                <div
                  key={file.id}
                  className="group flex items-center gap-6 px-6 py-4 rounded-xl hover:bg-surface-container-low transition-all"
                >
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${config.color}`}>
                    <Icon name={config.icon} size="lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-bold text-on-surface truncate">{file.name}</h5>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-medium text-on-surface-variant/70 uppercase">
                        {formatFileSize(file.size)}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${isComplete ? 'bg-tertiary' : 'bg-primary animate-pulse'}`} />
                        <span className={`text-[10px] font-bold uppercase tracking-tighter ${isComplete ? 'text-tertiary' : 'text-primary'}`}>
                          {isComplete ? 'Success' : 'In Progress'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-48">
                    <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${isComplete ? 'bg-tertiary' : 'bg-primary'}`}
                        style={{ width: `${Math.min(file.progress, 100)}%` }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(file.id)}
                    className="p-2 text-on-surface-variant hover:bg-white rounded-lg transition-colors"
                  >
                    <Icon name={isComplete ? 'more_vert' : 'close'} size="sm" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {files.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center mx-auto mb-4">
            <Icon name="folder_open" size="xl" className="text-on-surface-variant" />
          </div>
          <p className="font-bold text-on-surface text-lg">No files uploaded yet</p>
          <p className="text-sm text-on-surface-variant mt-1">
            Drag files above or click to browse
          </p>
        </div>
      )}

      {/* Storage Stats */}
      <div className="mt-12 grid grid-cols-3 gap-6">
        <div className="p-6 rounded-[2rem] bg-surface-container-low">
          <Icon name="storage" className="text-primary mb-4" />
          <h6 className="font-bold text-on-surface mb-1">Storage Usage</h6>
          <p className="text-xs text-on-surface-variant mb-4">4.2 GB of 20 GB used</p>
          <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[21%]" />
          </div>
        </div>
        <div className="p-6 rounded-[2rem] bg-surface-container-low">
          <Icon name="verified" className="text-tertiary mb-4" />
          <h6 className="font-bold text-on-surface mb-1">Encrypted Transfer</h6>
          <p className="text-xs text-on-surface-variant">
            All uploads are protected with AES-256 bank-grade encryption at rest and in transit.
          </p>
        </div>
        <div className="p-6 rounded-[2rem] bg-surface-container-low">
          <Icon name="hub" className="text-secondary mb-4" />
          <h6 className="font-bold text-on-surface mb-1">Auto-Sync</h6>
          <p className="text-xs text-on-surface-variant">
            Your files are automatically synced across your team workspace.
          </p>
        </div>
      </div>
    </section>
  );
}
