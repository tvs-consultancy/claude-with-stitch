import React, { useState } from 'react';
import { mockUploadedFiles, formatFileSize } from '../data/mock-data';
import type { UploadedFile } from '../data/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '../components/Icon';

const fileTypeConfig: Readonly<Record<string, { icon: string; bg: string; text: string }>> = {
  spreadsheet: { icon: 'table_chart', bg: 'bg-green-50', text: 'text-green-600' },
  pdf: { icon: 'picture_as_pdf', bg: 'bg-red-50', text: 'text-red-600' },
  archive: { icon: 'folder_zip', bg: 'bg-blue-50', text: 'text-blue-600' },
  video: { icon: 'videocam', bg: 'bg-purple-50', text: 'text-purple-600' },
  image: { icon: 'image', bg: 'bg-amber-50', text: 'text-amber-600' },
};

function getFileConfig(type: string) {
  return fileTypeConfig[type] ?? { icon: 'text_snippet', bg: 'bg-slate-100', text: 'text-slate-600' };
}

function categorizeFile(file: File): string {
  const mime = file.type;
  if (mime.startsWith('image/')) return 'image';
  if (mime.startsWith('video/')) return 'video';
  if (mime === 'application/pdf') return 'pdf';
  if (mime.includes('spreadsheet') || mime.includes('excel') || /\.(xlsx?|csv)$/i.test(file.name)) return 'spreadsheet';
  if (mime.includes('zip') || mime.includes('compressed') || /\.(zip|tar|gz|rar)$/i.test(file.name)) return 'archive';
  return 'document';
}

function toUploadedFile(file: File): UploadedFile {
  return {
    id: `local-${crypto.randomUUID()}`,
    name: file.name,
    size: file.size,
    type: categorizeFile(file),
    uploadedAt: new Date().toISOString(),
    progress: 100,
  };
}

export default function FileUpload() {
  const [files, setFiles] = useState<readonly UploadedFile[]>(mockUploadedFiles);
  const [isDragging, setIsDragging] = useState(false);

  function handleRemove(id: string) {
    setFiles(files.filter((f) => f.id !== id));
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    if (dropped.length === 0) return;
    setFiles([...dropped.map(toUploadedFile), ...files]);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar */}
      <header className="h-16 flex justify-between items-center px-12 bg-canvas-fog/80 backdrop-blur-md sticky top-0 z-40">
        <span className="text-lg font-bold text-deep-ink">Files</span>
        <div className="flex items-center gap-4">
          <div className="relative flex items-center bg-surface-container-low rounded-lg px-3 py-1.5">
            <Icon name="search" className="text-mid-zinc mr-2" size="sm" />
            <Input
              className="bg-transparent border-none focus-visible:ring-0 focus-visible:border-transparent text-sm w-64 h-auto p-0 text-deep-ink placeholder:text-muted-zinc/60"
              placeholder="Search archive..."
              type="text"
            />
          </div>
          <Button variant="ghost" size="icon" className="text-mid-zinc hover:text-corsair">
            <Icon name="notifications" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-12 max-w-7xl">
        {/* Page Header */}
        <header className="mb-10">
          <h2 className="text-2xl font-semibold text-deep-ink tracking-tight">Files</h2>
          <p className="text-[15px] text-mid-zinc mt-1">
            Upload and manage media assets & documents
          </p>
        </header>

        {/* Upload Zone */}
        <div
          className={`w-full h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer mb-12 transition-all ${
            isDragging
              ? 'border-corsair bg-corsair-wash scale-[1.01]'
              : 'border-zinc-border bg-white hover:bg-corsair-wash/30 hover:border-corsair/50'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <Icon
            name={isDragging ? 'cloud_download' : 'cloud_upload'}
            className={`text-[48px] mb-4 ${isDragging ? 'text-corsair' : 'text-mid-zinc'}`}
            size="xl"
          />
          <div className="text-center">
            <p className="text-lg font-medium text-deep-ink">Drag & drop files here</p>
            <p className="text-base text-corsair font-medium mt-1">or click to browse</p>
          </div>
          <p className="text-xs text-muted-zinc mt-6 tracking-wide">
            Supports images, PDFs, videos, documents, and spreadsheets
          </p>
        </div>

        {/* Uploaded Files */}
        <Card className="bg-white border-zinc-border/30 ring-0 shadow-sm gap-0 rounded-2xl">
          <div className="px-8 py-6 flex justify-between items-center border-b border-surface-container">
            <h3 className="text-lg font-semibold text-deep-ink">
              Uploaded Files{' '}
              <span className="text-mid-zinc font-normal ml-1 metric-lock text-sm">
                ({files.length})
              </span>
            </h3>
            <Button
              variant="ghost"
              onClick={() => setFiles([])}
              className="text-error-text hover:bg-error-surface"
            >
              Clear all
            </Button>
          </div>
          <div className="p-8 space-y-6">
            {files.map((file) => {
              const config = getFileConfig(file.type);
              const isUploading = file.progress < 100;

              return (
                <div key={file.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-5 flex-1">
                    <div
                      className={`w-12 h-12 ${config.bg} rounded-xl flex items-center justify-center ${config.text} shrink-0`}
                    >
                      <Icon name={config.icon} size="lg" />
                    </div>
                    <div className={isUploading ? 'flex-1 max-w-md' : ''}>
                      <h4 className="text-[15px] font-medium text-deep-ink group-hover:text-corsair transition-colors">
                        {file.name}
                      </h4>
                      {isUploading ? (
                        <>
                          <div className="mt-2 flex items-center gap-3">
                            <div className="flex-1 h-1.5 bg-surface-container rounded-full overflow-hidden">
                              <div
                                className="h-full bg-corsair rounded-full transition-all duration-300"
                                style={{ width: `${file.progress}%` }}
                              />
                            </div>
                            <span className="text-[11px] metric-lock text-corsair font-bold">
                              {file.progress}%
                            </span>
                          </div>
                          <p className="text-[11px] metric-lock text-mid-zinc mt-1">
                            {formatFileSize(file.size)}
                          </p>
                        </>
                      ) : (
                        <p className="text-xs metric-lock text-mid-zinc mt-0.5">
                          {formatFileSize(file.size)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    {isUploading ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemove(file.id)}
                        className="text-mid-zinc hover:text-error-text"
                      >
                        <Icon name="cancel" />
                      </Button>
                    ) : (
                      <>
                        <Badge className="bg-active-surface text-active-text border-0 rounded-full text-[13px] font-medium px-3 py-1 h-auto">
                          Uploaded
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(file.id)}
                          className="text-mid-zinc hover:text-deep-ink"
                        >
                          <Icon name="more_vert" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}

            {files.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <Icon name="folder_open" className="text-muted-zinc text-[48px] mb-4" size="xl" />
                <p className="text-lg font-medium text-deep-ink">No files uploaded yet</p>
                <p className="text-[15px] text-mid-zinc mt-1">
                  Upload files to get started with your media plan
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
