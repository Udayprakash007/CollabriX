import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UploadCloud, Image as ImageIcon, Link as LinkIcon, Trash2, Check, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface CoverImageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCoverUrl: string | null;
  onSelectCover: (coverUrl: string | null) => void;
  title?: string;
}

const PRESET_COVERS = [
  {
    id: 'tech-abstract',
    name: 'Tech Abstract',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=400&fit=crop',
  },
  {
    id: 'cyber-code',
    name: 'Cyber Code',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=400&fit=crop',
  },
  {
    id: 'modern-workspace',
    name: 'Modern Workspace',
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=400&fit=crop',
  },
  {
    id: 'aurora-gradient',
    name: 'Aurora Gradient',
    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop',
  },
  {
    id: 'deep-space',
    name: 'Deep Cosmos',
    url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1200&h=400&fit=crop',
  },
  {
    id: 'minimal-arch',
    name: 'Minimal Architecture',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=400&fit=crop',
  },
];

export const CoverImageSelectorModal: React.FC<CoverImageSelectorModalProps> = ({
  isOpen,
  onClose,
  currentCoverUrl,
  onSelectCover,
  title = 'Customize Background Picture',
}) => {
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [selectedUrl, setSelectedUrl] = useState<string | null>(currentCoverUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (PNG, JPG, WebP)');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      toast.error('Image size should be less than 8MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setSelectedUrl(dataUrl);
        onSelectCover(dataUrl);
        toast.success('Background profile picture updated!');
        onClose();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrlInput.trim()) {
      toast.error('Please enter a valid image URL');
      return;
    }

    setSelectedUrl(customUrlInput.trim());
    onSelectCover(customUrlInput.trim());
    toast.success('Background profile picture updated!');
    onClose();
  };

  const handleSelectPreset = (url: string) => {
    setSelectedUrl(url);
    onSelectCover(url);
    toast.success('Background profile picture updated!');
    onClose();
  };

  const handleRemoveCover = () => {
    setSelectedUrl(null);
    onSelectCover(null);
    toast.success('Background cover reset to default gradient');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg bg-card border-border shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
            <ImageIcon className="h-5 w-5 text-primary" />
            {title}
          </DialogTitle>
          <DialogDescription>
            Upload a custom background picture or choose from curated wallpapers to personalize your profile header cover.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="upload" className="w-full mt-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload" className="flex items-center gap-1.5 text-xs sm:text-sm">
              <UploadCloud className="h-4 w-4" />
              Upload Image
            </TabsTrigger>
            <TabsTrigger value="presets" className="flex items-center gap-1.5 text-xs sm:text-sm">
              <Sparkles className="h-4 w-4" />
              Wallpapers
            </TabsTrigger>
            <TabsTrigger value="url" className="flex items-center gap-1.5 text-xs sm:text-sm">
              <LinkIcon className="h-4 w-4" />
              Image URL
            </TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-4 pt-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border hover:border-primary/60 bg-muted/30 hover:bg-muted/60 transition-all rounded-xl p-8 text-center cursor-pointer space-y-3"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <UploadCloud className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">Click to upload background image</p>
                <p className="text-xs text-muted-foreground mt-1">Supports PNG, JPG, WebP up to 8MB</p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </TabsContent>

          {/* Presets Tab */}
          <TabsContent value="presets" className="pt-4">
            <div className="grid grid-cols-2 gap-3 max-h-[260px] overflow-y-auto pr-1">
              {PRESET_COVERS.map((preset) => {
                const isSelected = selectedUrl === preset.url;
                return (
                  <div
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.url)}
                    className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all group ${
                      isSelected ? 'border-primary shadow-lg ring-2 ring-primary/30' : 'border-transparent hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      className="h-20 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-2">
                      <span className="text-xs font-semibold text-white truncate flex-1">{preset.name}</span>
                      {isSelected && (
                        <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* URL Tab */}
          <TabsContent value="url" className="pt-4 space-y-4">
            <form onSubmit={handleApplyCustomUrl} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cover-url">Image Web Address (URL)</Label>
                <Input
                  id="cover-url"
                  placeholder="https://example.com/background.jpg"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Apply Cover Picture
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        {/* Footer Actions */}
        {selectedUrl && (
          <div className="pt-3 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Background image active</span>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleRemoveCover}
              className="gap-1.5 text-xs"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Reset Cover
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
