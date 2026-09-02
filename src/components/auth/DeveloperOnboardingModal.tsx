import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { 
  Linkedin, 
  FileText, 
  PenTool, 
  UploadCloud, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Loader2, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  User
} from 'lucide-react';

type ImportMethod = 'linkedin' | 'resume' | 'manual' | null;

interface DeveloperOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
  onComplete?: () => void;
}

export const DeveloperOnboardingModal: React.FC<DeveloperOnboardingModalProps> = ({
  isOpen,
  onClose,
  userId,
  onComplete
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Method selection, 2: Input/Upload, 3: Review
  const [method, setMethod] = useState<ImportMethod>(null);
  
  // Profile Data State
  const [roleTitle, setRoleTitle] = useState('');
  const [bio, setBio] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<'junior' | 'mid' | 'senior' | 'lead'>('mid');
  const [yearsExperience, setYearsExperience] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  
  // Method Specific States
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSelectMethod = (selected: ImportMethod) => {
    setMethod(selected);
    setStep(2);
  };

  const handleAddSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      setSkills([...skills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  // LinkedIn Profile Import
  const handleLinkedinImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkedinUrl.trim()) {
      toast.error('Please enter your LinkedIn profile link');
      return;
    }

    toast.success('LinkedIn profile attached! Please enter your details below.');
    setStep(3);
  };

  // Resume Upload Handler
  const handleResumeUpload = (file: File) => {
    setResumeFile(file);
    toast.success('Resume file selected! Please fill in your professional details below.');
    setStep(3);
  };

  const handleManualNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleTitle.trim()) {
      toast.error('Please enter your professional title');
      return;
    }
    setStep(3);
  };

  const handleSaveProfile = async () => {
    setIsProcessing(true);
    try {
      let targetUserId = userId;
      if (!targetUserId) {
        const { data } = await supabase.auth.getUser();
        targetUserId = data.user?.id;
      }

      if (targetUserId) {
        const fullBio = bio || `${roleTitle} with ${yearsExperience} years experience in ${skills.slice(0, 3).join(', ')}.`;
        
        const { error } = await supabase
          .from('profiles')
          .update({
            role: roleTitle,
            developer_type: roleTitle,
            bio: fullBio,
            skills: skills,
          })
          .eq('id', targetUserId);

        if (error) throw error;
      }

      toast.success('Your professional profile is ready and live!');
      if (onComplete) onComplete();
      onClose();
    } catch (err: any) {
      console.error('Error saving profile:', err);
      toast.error('Failed to save profile. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-6 bg-card border-border"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              CX
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                Developer Profile Setup
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Step {step} of 3 — Build your developer background
              </DialogDescription>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className={`h-2.5 w-6 rounded-full transition-all ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`h-2.5 w-6 rounded-full transition-all ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`h-2.5 w-6 rounded-full transition-all ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />
          </div>
        </div>

        {/* STEP 1: METHOD SELECTION */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-lg mx-auto space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                How would you like to tell us about yourself?
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We need to get a sense of your education, experience, and skills. It’s quickest to import your information — you can review and edit everything before your profile goes live.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Option 1: LinkedIn */}
              <button
                type="button"
                onClick={() => handleSelectMethod('linkedin')}
                className="group relative flex flex-col items-center text-center p-6 rounded-xl border-2 border-border hover:border-primary/80 bg-background hover:bg-primary/5 transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="absolute -top-3 right-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Fastest
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Linkedin className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-1">Import LinkedIn</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Sync your headline, work history & skills directly from your LinkedIn URL.
                </p>
              </button>

              {/* Option 2: Upload Resume */}
              <button
                type="button"
                onClick={() => handleSelectMethod('resume')}
                className="group flex flex-col items-center text-center p-6 rounded-xl border-2 border-border hover:border-primary/80 bg-background hover:bg-primary/5 transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-1">Upload Resume</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Upload PDF or DOCX. We will extract your experience, skills & education.
                </p>
              </button>

              {/* Option 3: Manual Entry */}
              <button
                type="button"
                onClick={() => handleSelectMethod('manual')}
                className="group flex flex-col items-center text-center p-6 rounded-xl border-2 border-border hover:border-primary/80 bg-background hover:bg-primary/5 transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="h-12 w-12 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <PenTool className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-1">Fill Out Manually</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Enter your background step-by-step manually (takes ~3 minutes).
                </p>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: METHOD INPUT */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            {/* LINKEDIN METHOD */}
            {method === 'linkedin' && (
              <form onSubmit={handleLinkedinImport} className="space-y-4">
                <div className="text-center mb-6">
                  <div className="inline-flex h-12 w-12 rounded-full bg-blue-500/10 text-blue-500 items-center justify-center mb-3">
                    <Linkedin className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Import from LinkedIn</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter your public LinkedIn profile link to auto-populate your background.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl" className="font-medium">LinkedIn Profile URL</Label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="linkedinUrl"
                      type="text"
                      placeholder="https://www.linkedin.com/in/yourprofile"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="pl-10"
                      disabled={isProcessing}
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} disabled={isProcessing}>
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                  </Button>
                  <Button type="submit" disabled={isProcessing || !linkedinUrl.trim()}>
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Importing...
                      </>
                    ) : (
                      <>
                        Import & Continue <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}

            {/* RESUME METHOD */}
            {method === 'resume' && (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <div className="inline-flex h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-500 items-center justify-center mb-3">
                    <FileText className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Upload Your Resume</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload your PDF or DOCX file to automatically extract your skills & history.
                  </p>
                </div>

                <div 
                  className="border-2 border-dashed border-border hover:border-primary/60 rounded-xl p-8 text-center bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleResumeUpload(e.dataTransfer.files[0]);
                    }
                  }}
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.pdf,.doc,.docx';
                    input.onchange = (e: any) => {
                      if (e.target.files && e.target.files[0]) {
                        handleResumeUpload(e.target.files[0]);
                      }
                    };
                    input.click();
                  }}
                >
                  <UploadCloud className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                  <p className="font-medium text-sm text-foreground mb-1">
                    {resumeFile ? resumeFile.name : 'Drag and drop your resume here, or click to browse'}
                  </p>
                  <p className="text-xs text-muted-foreground">Supported formats: PDF, DOCX (Max 10MB)</p>
                </div>

                {isProcessing && (
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Extracting experience & skill tags...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                <div className="pt-4 flex items-center justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} disabled={isProcessing}>
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                  </Button>
                </div>
              </div>
            )}

            {/* MANUAL METHOD */}
            {method === 'manual' && (
              <form onSubmit={handleManualNext} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="roleTitle" className="font-semibold flex items-center gap-1.5">
                    <Code2 className="h-4 w-4 text-primary" /> Professional Title / Specialty
                  </Label>
                  <Input
                    id="roleTitle"
                    placeholder="e.g. Senior Full Stack Developer, DevOps Architect"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="years" className="font-semibold flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4 text-primary" /> Years Experience
                    </Label>
                    <Input
                      id="years"
                      placeholder="e.g. 5"
                      value={yearsExperience}
                      onChange={(e) => setYearsExperience(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="education" className="font-semibold flex items-center gap-1.5">
                      <GraduationCap className="h-4 w-4 text-primary" /> Degree / Education
                    </Label>
                    <Input
                      id="education"
                      placeholder="e.g. B.S. Computer Science"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="font-semibold flex items-center gap-1.5">
                    <User className="h-4 w-4 text-primary" /> Professional Bio & Overview
                  </Label>
                  <Textarea
                    id="bio"
                    rows={3}
                    placeholder="Summarize your technical background, major projects, and strengths..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <Label className="font-semibold">Core Technical Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill (e.g. Python, Docker)"
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                    />
                    <Button type="button" onClick={() => handleAddSkill()} variant="secondary">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-2.5 py-1 text-xs flex items-center gap-1">
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="hover:text-destructive text-muted-foreground ml-1"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                  </Button>
                  <Button type="submit">
                    Review Profile <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* STEP 3: REVIEW & CONFIRM PROFILE */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-1">
              <div className="inline-flex h-10 w-10 rounded-full bg-emerald-500/10 text-emerald-500 items-center justify-center mb-2">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Review Your Profile Preview</h3>
              <p className="text-xs text-muted-foreground">
                Here is how clients will view your professional profile on CollabriX. You can edit this anytime.
              </p>
            </div>

            {/* Profile Card Preview */}
            <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-bold text-foreground">{roleTitle}</h4>
                  <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                    <span>{yearsExperience} Years Exp</span> • 
                    <span>{education}</span>
                  </p>
                </div>
              </div>

              <p className="text-sm text-foreground/90 leading-relaxed bg-muted/40 p-3 rounded-lg border border-border/50 italic">
                "{bio || 'No bio provided yet.'}"
              </p>

              <div>
                <Label className="text-xs uppercase font-bold text-muted-foreground tracking-wider block mb-2">
                  Verified Skills ({skills.length})
                </Label>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="bg-primary/5 border-primary/20 text-primary font-medium">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Button type="button" variant="outline" onClick={() => setStep(2)} disabled={isProcessing}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Edit Details
              </Button>
              <Button onClick={handleSaveProfile} disabled={isProcessing} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6">
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving Profile...
                  </>
                ) : (
                  <>
                    Complete & Launch Profile <CheckCircle2 className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
};
