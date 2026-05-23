"use client"
import { useState } from "react"
import { SafeImage as Image } from "@/components/safe-image"
import { Upload, Music, Image as ImageIcon, X, Plus, Info, CheckCircle, Loader2, ChevronRight, Users, Globe, DollarSign, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { genres } from "@/lib/mock-data"

type UploadStep = "type" | "files" | "details" | "distribution" | "review"

const uploadTypes = [
  { id: "single", name: "Single", description: "One track release", icon: Music },
  { id: "ep", name: "EP", description: "2-6 tracks", icon: Music },
  { id: "album", name: "Album", description: "7+ tracks", icon: Music },
]

export default function UploadMusicPage() {
  const [step, setStep] = useState<UploadStep>("type")
  const [releaseType, setReleaseType] = useState<string>("")
  const [tracks, setTracks] = useState<File[]>([])
  const [coverArt, setCoverArt] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    genre: "",
    releaseDate: "",
    description: "",
    explicit: false,
    enableLyrics: true,
  })

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverArt(file)
      setCoverPreview(URL.createObjectURL(file))
    }
  }

  const handleTracksUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setTracks(prev => [...prev, ...files])
  }

  const removeTrack = (index: number) => {
    setTracks(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    setIsUploading(true)
    // Simulate upload
    await new Promise(r => setTimeout(r, 2000))
    setIsUploading(false)
    setStep("review")
  }

  const steps: { id: UploadStep; name: string }[] = [
    { id: "type", name: "Type" },
    { id: "files", name: "Files" },
    { id: "details", name: "Details" },
    { id: "distribution", name: "Distribution" },
    { id: "review", name: "Review" },
  ]

  const currentStepIndex = steps.findIndex(s => s.id === step)

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-32 px-4">
      {/* Header */}
      <div className="pt-4">
        <h1 className="font-display text-2xl font-bold text-foreground">Upload Music</h1>
        <p className="text-sm text-muted-foreground">Release your music to millions of listeners across Africa and the diaspora</p>
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
            <h2 className="font-display text-lg font-semibold text-foreground">What are you releasing?</h2>
            <div className="grid grid-cols-3 gap-4">
              {uploadTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => { setReleaseType(type.id); setStep("files") }}
                  className={cn(
                    "glass-card rounded-xl p-6 text-center hover-lift transition-all",
                    releaseType === type.id && "ring-2 ring-primary"
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
            <h2 className="font-display text-lg font-semibold text-foreground">Upload your files</h2>
            
            {/* Cover Art */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Cover Art</label>
              <div className="flex gap-4">
                <label className="relative size-40 rounded-xl border-2 border-dashed border-white/20 hover:border-primary/50 transition-colors cursor-pointer overflow-hidden">
                  {coverPreview ? (
                    <Image src={coverPreview} alt="Cover" fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                      <ImageIcon className="size-8 mb-2" />
                      <span className="text-xs">3000x3000px</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleCoverUpload} className="sr-only" />
                </label>
                <div className="flex-1 text-sm text-muted-foreground space-y-2">
                  <p>Upload a square image at least 3000x3000 pixels</p>
                  <p>Accepted formats: JPG, PNG</p>
                  <p>No text, logos, or explicit content on cover</p>
                </div>
              </div>
            </div>

            {/* Audio Files */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Audio Files</label>
              <label className="block w-full rounded-xl border-2 border-dashed border-white/20 hover:border-primary/50 transition-colors cursor-pointer p-8 text-center">
                <Upload className="size-10 mx-auto mb-3 text-muted-foreground" />
                <p className="font-medium text-foreground">Drag and drop or click to upload</p>
                <p className="text-sm text-muted-foreground mt-1">WAV or FLAC files, 16-bit/44.1kHz or higher</p>
                <input type="file" accept="audio/*" multiple onChange={handleTracksUpload} className="sr-only" />
              </label>

              {tracks.length > 0 && (
                <div className="mt-4 space-y-2">
                  {tracks.map((track, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <Music className="size-5 text-primary" />
                      <span className="flex-1 text-sm text-foreground truncate">{track.name}</span>
                      <span className="text-xs text-muted-foreground">{(track.size / 1024 / 1024).toFixed(1)} MB</span>
                      <button onClick={() => removeTrack(i)} className="p-1 hover:bg-white/10 rounded">
                        <X className="size-4 text-muted-foreground" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("type")}>Back</Button>
              <Button onClick={() => setStep("details")} disabled={tracks.length === 0 || !coverArt}>
                Continue <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {step === "details" && (
          <div className="space-y-6">
            <h2 className="font-display text-lg font-semibold text-foreground">Release Details</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Release Title</label>
                <Input 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Primary Artist</label>
                <Input 
                  value={formData.artist} 
                  onChange={e => setFormData({...formData, artist: e.target.value})}
                  placeholder="Artist name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Genre</label>
                <select 
                  value={formData.genre}
                  onChange={e => setFormData({...formData, genre: e.target.value})}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select genre</option>
                  {genres.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Release Date</label>
                <Input 
                  type="date" 
                  value={formData.releaseDate}
                  onChange={e => setFormData({...formData, releaseDate: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[100px]"
                placeholder="Tell listeners about this release..."
              />
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.explicit}
                  onChange={e => setFormData({...formData, explicit: e.target.checked})}
                  className="rounded"
                />
                <span className="text-sm text-foreground">Explicit content</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.enableLyrics}
                  onChange={e => setFormData({...formData, enableLyrics: e.target.checked})}
                  className="rounded"
                />
                <span className="text-sm text-foreground">Enable lyrics</span>
              </label>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("files")}>Back</Button>
              <Button onClick={() => setStep("distribution")}>
                Continue <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {step === "distribution" && (
          <div className="space-y-6">
            <h2 className="font-display text-lg font-semibold text-foreground">Distribution Settings</h2>
            
            <div className="space-y-4">
              <div className="glass-card rounded-xl p-4 flex items-center gap-4">
                <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Globe className="size-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Worldwide Release</p>
                  <p className="text-sm text-muted-foreground">Available on AfriStream in all 54 African countries + diaspora</p>
                </div>
                <CheckCircle className="size-5 text-primary" />
              </div>

              <div className="glass-card rounded-xl p-4 flex items-center gap-4">
                <div className="size-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <DollarSign className="size-6 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">User-Centric Royalties</p>
                  <p className="text-sm text-muted-foreground">70% of subscriber payments go directly to you</p>
                </div>
                <CheckCircle className="size-5 text-primary" />
              </div>

              <div className="glass-card rounded-xl p-4 flex items-center gap-4">
                <div className="size-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Users className="size-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Collaborator Splits</p>
                  <p className="text-sm text-muted-foreground">Add featured artists and producers to share royalties</p>
                </div>
                <Button variant="outline" size="sm">Add Splits</Button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex gap-3">
              <Info className="size-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-foreground font-medium">Ready for review</p>
                <p className="text-sm text-muted-foreground">Your release will be reviewed within 24-48 hours before going live.</p>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("details")}>Back</Button>
              <Button onClick={handleSubmit} disabled={isUploading}>
                {isUploading ? <><Loader2 className="size-4 mr-2 animate-spin" /> Uploading...</> : "Submit Release"}
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
              <h2 className="font-display text-2xl font-bold text-foreground">Release Submitted!</h2>
              <p className="text-muted-foreground mt-2">Your release is now being reviewed. We will notify you once it is approved.</p>
            </div>
            <div className="glass-card rounded-xl p-4 max-w-sm mx-auto">
              <div className="flex items-center gap-4">
                {coverPreview && (
                  <div className="relative size-16 rounded-lg overflow-hidden">
                    <Image src={coverPreview} alt="Cover" fill className="object-cover" />
                  </div>
                )}
                <div className="text-left">
                  <p className="font-medium text-foreground">{formData.title || "Untitled"}</p>
                  <p className="text-sm text-muted-foreground">{formData.artist || "Unknown Artist"}</p>
                  <p className="text-xs text-primary mt-1">Pending Review</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => { setStep("type"); setTracks([]); setCoverArt(null); setCoverPreview(""); }}>
                Upload Another
              </Button>
              <Button>View in Studio</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
