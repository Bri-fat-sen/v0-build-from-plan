"use client"
import { useState } from "react"
import { SafeImage as Image } from "@/components/safe-image"
import { Upload, Video, Image as ImageIcon, X, Plus, Info, CheckCircle, Loader2, ChevronRight, Globe, DollarSign, Eye, Clock, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type UploadStep = "type" | "files" | "details" | "monetization" | "review"

const videoTypes = [
  { id: "video", name: "Video", description: "Standard video content", icon: Video },
  { id: "short", name: "Short", description: "Under 60 seconds", icon: Video },
  { id: "podcast", name: "Podcast", description: "Audio/video podcast", icon: Video },
]

const categories = ["Entertainment", "Music", "Comedy", "Education", "Lifestyle", "News", "Sports", "Technology", "Culture", "Documentary"]

export default function UploadVideoPage() {
  const [step, setStep] = useState<UploadStep>("type")
  const [videoType, setVideoType] = useState<string>("")
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    visibility: "public",
    scheduledDate: "",
    allowComments: true,
    ageRestricted: false,
  })

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnail(file)
      setThumbnailPreview(URL.createObjectURL(file))
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideoFile(file)
    }
  }

  const handleSubmit = async () => {
    setIsUploading(true)
    // Simulate upload with progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 200))
      setUploadProgress(i)
    }
    setIsUploading(false)
    setStep("review")
  }

  const steps: { id: UploadStep; name: string }[] = [
    { id: "type", name: "Type" },
    { id: "files", name: "Upload" },
    { id: "details", name: "Details" },
    { id: "monetization", name: "Monetize" },
    { id: "review", name: "Publish" },
  ]

  const currentStepIndex = steps.findIndex(s => s.id === step)

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-32 px-4">
      {/* Header */}
      <div className="pt-4">
        <h1 className="font-display text-2xl font-bold text-foreground">Upload Video</h1>
        <p className="text-sm text-muted-foreground">Share your content with fans across Africa and the diaspora</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div className={cn(
              "size-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
              i < currentStepIndex ? "bg-primary text-primary-foreground" :
              i === currentStepIndex ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background" :
              "bg-white/10 text-muted-foreground"
            )}>
              {i < currentStepIndex ? <CheckCircle className="size-4" /> : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className={cn("w-8 h-0.5 mx-1", i < currentStepIndex ? "bg-primary" : "bg-white/10")} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="glass-card rounded-2xl p-6">
        {step === "type" && (
          <div className="space-y-6">
            <h2 className="font-display text-lg font-semibold text-foreground">What are you uploading?</h2>
            <div className="grid grid-cols-3 gap-4">
              {videoTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => { setVideoType(type.id); setStep("files") }}
                  className={cn(
                    "glass-card rounded-xl p-6 text-center hover-lift transition-all",
                    videoType === type.id && "ring-2 ring-primary"
                  )}
                >
                  <type.icon className="size-8 mx-auto mb-3 text-primary" />
                  <p className="font-medium text-foreground">{type.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "files" && (
          <div className="space-y-6">
            <h2 className="font-display text-lg font-semibold text-foreground">Upload your video</h2>
            
            {/* Video Upload */}
            <label className="block w-full rounded-xl border-2 border-dashed border-white/20 hover:border-primary/50 transition-colors cursor-pointer p-12 text-center">
              {videoFile ? (
                <div className="flex items-center justify-center gap-4">
                  <Video className="size-10 text-primary" />
                  <div className="text-left">
                    <p className="font-medium text-foreground">{videoFile.name}</p>
                    <p className="text-sm text-muted-foreground">{(videoFile.size / 1024 / 1024).toFixed(1)} MB</p>
                  </div>
                  <button onClick={(e) => { e.preventDefault(); setVideoFile(null) }} className="p-2 hover:bg-white/10 rounded">
                    <X className="size-5 text-muted-foreground" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="size-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="font-medium text-foreground">Drag and drop your video</p>
                  <p className="text-sm text-muted-foreground mt-2">or click to browse</p>
                  <p className="text-xs text-muted-foreground mt-4">MP4, MOV, or WebM • Max 10GB • Up to 4K</p>
                </>
              )}
              <input type="file" accept="video/*" onChange={handleVideoUpload} className="sr-only" />
            </label>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Thumbnail</label>
              <div className="flex gap-4">
                <label className="relative w-48 aspect-video rounded-xl border-2 border-dashed border-white/20 hover:border-primary/50 transition-colors cursor-pointer overflow-hidden">
                  {thumbnailPreview ? (
                    <Image src={thumbnailPreview} alt="Thumbnail" fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                      <ImageIcon className="size-8 mb-2" />
                      <span className="text-xs">1280x720px</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleThumbnailUpload} className="sr-only" />
                </label>
                <div className="flex-1 text-sm text-muted-foreground space-y-1">
                  <p>A good thumbnail grabs attention</p>
                  <p>Recommended: 1280x720px (16:9)</p>
                  <p>JPG, PNG, or GIF</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("type")}>Back</Button>
              <Button onClick={() => setStep("details")} disabled={!videoFile}>
                Continue <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {step === "details" && (
          <div className="space-y-6">
            <h2 className="font-display text-lg font-semibold text-foreground">Video Details</h2>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Title</label>
              <Input 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Add a title that describes your video"
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground mt-1">{formData.title.length}/100</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[120px]"
                placeholder="Tell viewers about your video"
                maxLength={5000}
              />
              <p className="text-xs text-muted-foreground mt-1">{formData.description.length}/5000</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Visibility</label>
                <select 
                  value={formData.visibility}
                  onChange={e => setFormData({...formData, visibility: e.target.value})}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="public">Public</option>
                  <option value="unlisted">Unlisted</option>
                  <option value="private">Private</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Hash className="size-4 inline mr-1" /> Tags
              </label>
              <Input 
                value={formData.tags}
                onChange={e => setFormData({...formData, tags: e.target.value})}
                placeholder="Add tags separated by commas"
              />
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.allowComments}
                  onChange={e => setFormData({...formData, allowComments: e.target.checked})}
                  className="rounded"
                />
                <span className="text-sm text-foreground">Allow comments</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.ageRestricted}
                  onChange={e => setFormData({...formData, ageRestricted: e.target.checked})}
                  className="rounded"
                />
                <span className="text-sm text-foreground">Age-restricted (18+)</span>
              </label>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("files")}>Back</Button>
              <Button onClick={() => setStep("monetization")}>
                Continue <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {step === "monetization" && (
          <div className="space-y-6">
            <h2 className="font-display text-lg font-semibold text-foreground">Monetization</h2>
            
            <div className="space-y-4">
              <div className="glass-card rounded-xl p-4 flex items-center gap-4">
                <div className="size-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <DollarSign className="size-6 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Ad Revenue</p>
                  <p className="text-sm text-muted-foreground">Earn from ads shown on your video (70% to you)</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>

              <div className="glass-card rounded-xl p-4 flex items-center gap-4">
                <div className="size-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <DollarSign className="size-6 text-amber-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Tips & Gifts</p>
                  <p className="text-sm text-muted-foreground">Allow viewers to send you tips (80% to you)</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>

              <div className="glass-card rounded-xl p-4 flex items-center gap-4">
                <div className="size-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Eye className="size-6 text-purple-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Premium Content</p>
                  <p className="text-sm text-muted-foreground">Make this video exclusive to Premium/Platinum subscribers</p>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex gap-3">
              <Info className="size-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-foreground font-medium">User-Centric Earnings</p>
                <p className="text-sm text-muted-foreground">With AfriStream, your earnings come directly from viewers who watch YOUR content - not pooled with everyone else.</p>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("details")}>Back</Button>
              <Button onClick={handleSubmit} disabled={isUploading}>
                {isUploading ? (
                  <><Loader2 className="size-4 mr-2 animate-spin" /> Uploading {uploadProgress}%</>
                ) : "Publish Video"}
              </Button>
            </div>
          </div>
        )}

        {step === "review" && (
          <div className="space-y-6 text-center py-8">
            <div className="size-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
              <CheckCircle className="size-10 text-green-500" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Video Published!</h2>
              <p className="text-muted-foreground mt-2">Your video is now live and available to viewers.</p>
            </div>
            <div className="glass-card rounded-xl p-4 max-w-sm mx-auto">
              <div className="flex items-center gap-4">
                {thumbnailPreview && (
                  <div className="relative w-24 aspect-video rounded-lg overflow-hidden">
                    <Image src={thumbnailPreview} alt="Thumbnail" fill className="object-cover" />
                  </div>
                )}
                <div className="text-left flex-1">
                  <p className="font-medium text-foreground line-clamp-1">{formData.title || "Untitled"}</p>
                  <p className="text-sm text-muted-foreground">{formData.category}</p>
                  <p className="text-xs text-green-500 mt-1">Live</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => { setStep("type"); setVideoFile(null); setThumbnail(null); setThumbnailPreview(""); }}>
                Upload Another
              </Button>
              <Button>View Video</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
