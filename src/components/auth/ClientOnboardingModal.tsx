import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { 
  Building2, 
  Globe, 
  MapPin, 
  Users, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Loader2, 
  Briefcase, 
  Sparkles
} from 'lucide-react';

const INDUSTRIES = [
  'SaaS & Software',
  'E-Commerce & Retail',
  'Fintech & Financial',
  'AI & Machine Learning',
  'Healthcare & Biotech',
  'Mobile & Web Apps',
  'Gaming & Entertainment',
  'Marketing & Agency'
];

const COMPANY_SIZES = [
  '1-10 employees (Startup)',
  '11-50 employees (Growth)',
  '51-200 employees (Mid-Market)',
  '200+ employees (Enterprise)'
];

const HIRING_GOALS = [
  'Individual Developers',
  'Full Cross-Functional Squads',
  'Long-Term Project Contracts',
  'Short-Term Milestone Tasks'
];

interface ClientOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
  onComplete?: () => void;
}

export const ClientOnboardingModal: React.FC<ClientOnboardingModalProps> = ({
  isOpen,
  onClose,
  userId,
  onComplete
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  // Client & Company Profile State
  const [companyName, setCompanyName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('SaaS & Software');
  const [companySize, setCompanySize] = useState('11-50 employees (Growth)');
  const [hiringGoal, setHiringGoal] = useState('Full Cross-Functional Squads');
  const [tagline, setTagline] = useState('');
  
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) {
      toast.error('Please enter your company name');
      return;
    }
    setStep(2);
  };

  const handleStep2Next = (e: React.FormEvent) => {
    e.preventDefault();
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
        const fullBio = tagline 
          ? tagline 
          : `${companyName} is a ${industry} company (${companySize}) looking to hire ${hiringGoal}. Website: ${websiteUrl}`;
        
        const { error } = await supabase
          .from('profiles')
          .update({
            full_name: companyName,
            developer_type: `${industry} • ${companySize.split(' ')[0]}`,
            bio: fullBio,
            region: location,
            role: 'Client'
          })
          .eq('id', targetUserId);

        if (error) throw error;
      }

      toast.success('Your company profile is ready and live!');
      if (onComplete) onComplete();
      onClose();
    } catch (err: any) {
      console.error('Error saving client profile:', err);
      toast.error('Failed to save company profile. Please try again.');
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
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                Company Profile Setup
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Step {step} of 3 — Build your client & company workspace
              </DialogDescription>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className={`h-2.5 w-6 rounded-full transition-all ${step >= 1 ? 'bg-emerald-500' : 'bg-muted'}`} />
            <div className={`h-2.5 w-6 rounded-full transition-all ${step >= 2 ? 'bg-emerald-500' : 'bg-muted'}`} />
            <div className={`h-2.5 w-6 rounded-full transition-all ${step >= 3 ? 'bg-emerald-500' : 'bg-muted'}`} />
          </div>
        </div>

        {/* STEP 1: COMPANY OVERVIEW */}
        {step === 1 && (
          <form onSubmit={handleStep1Next} className="space-y-6 animate-fade-in">
            <div className="text-center max-w-lg mx-auto space-y-1">
              <h2 className="text-2xl font-bold text-foreground">
                Tell us about your company
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Connect with top tech talent and software squads by setting up your organization profile.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="font-semibold flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-emerald-500" /> Company or Organization Name
                </Label>
                <Input
                  id="companyName"
                  placeholder="e.g. Acme Tech Solutions, Innovate Labs"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl" className="font-semibold flex items-center gap-1.5">
                    <Globe className="h-4 w-4 text-emerald-500" /> Company Website
                  </Label>
                  <Input
                    id="websiteUrl"
                    type="url"
                    placeholder="https://yourcompany.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="font-semibold flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-emerald-500" /> HQ Location / Region
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g. San Francisco, CA / Remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              {/* Industry Selector */}
              <div className="space-y-2">
                <Label className="font-semibold flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4 text-emerald-500" /> Primary Industry / Industry Field
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {INDUSTRIES.map((ind) => (
                    <button
                      key={ind}
                      type="button"
                      onClick={() => setIndustry(ind)}
                      className={`p-2.5 rounded-lg border text-xs font-medium transition-all text-center ${
                        industry === ind
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500 font-semibold'
                          : 'border-border hover:border-emerald-500/50 text-muted-foreground'
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                Next: Hiring Needs <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </form>
        )}

        {/* STEP 2: COMPANY SCALE & HIRING GOALS */}
        {step === 2 && (
          <form onSubmit={handleStep2Next} className="space-y-6 animate-fade-in">
            <div className="text-center max-w-lg mx-auto space-y-1">
              <h2 className="text-2xl font-bold text-foreground">
                Company Scale & Hiring Needs
              </h2>
              <p className="text-sm text-muted-foreground">
                Help us match you with individual developers or full engineering squads.
              </p>
            </div>

            <div className="space-y-4">
              {/* Company Size */}
              <div className="space-y-2">
                <Label className="font-semibold flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-emerald-500" /> Company Size
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {COMPANY_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setCompanySize(size)}
                      className={`p-3 rounded-lg border text-xs font-medium text-left transition-all ${
                        companySize === size
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500 font-semibold'
                          : 'border-border hover:border-emerald-500/50 text-muted-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Hiring Goal */}
              <div className="space-y-2">
                <Label className="font-semibold flex items-center gap-1.5">
                  <Target className="h-4 w-4 text-emerald-500" /> Primary Hiring Goal
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {HIRING_GOALS.map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setHiringGoal(goal)}
                      className={`p-3 rounded-lg border text-xs font-medium text-left transition-all ${
                        hiringGoal === goal
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500 font-semibold'
                          : 'border-border hover:border-emerald-500/50 text-muted-foreground'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tagline / Overview */}
              <div className="space-y-2">
                <Label htmlFor="tagline" className="font-semibold">
                  Company Mission & Bio (Optional)
                </Label>
                <Textarea
                  id="tagline"
                  rows={3}
                  placeholder="Describe your company culture, technology goals, or what makes your team exciting..."
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Back
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                Review Profile <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </form>
        )}

        {/* STEP 3: REVIEW & CONFIRM */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-1">
              <div className="inline-flex h-10 w-10 rounded-full bg-emerald-500/10 text-emerald-500 items-center justify-center mb-2">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Review Your Company Profile</h3>
              <p className="text-xs text-muted-foreground">
                This is how developers and squads will view your company on CollabriX.
              </p>
            </div>

            {/* Profile Card Preview */}
            <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white shadow-md">
                    <Building2 className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground">
                      {companyName || <span className="text-muted-foreground/60 font-normal italic">Your Company Name</span>}
                    </h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                      <span>{industry}</span> • 
                      <span>{location || <span className="text-muted-foreground/60 italic">Location not set</span>}</span>
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 bg-emerald-500/5">
                  Verified Client
                </Badge>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <Badge variant="secondary" className="gap-1">
                  <Users className="h-3 w-3" /> {companySize}
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Target className="h-3 w-3" /> {hiringGoal}
                </Badge>
                {websiteUrl ? (
                  <Badge variant="secondary" className="gap-1">
                    <Globe className="h-3 w-3" /> {websiteUrl.replace(/^https?:\/\//, '')}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="gap-1 text-muted-foreground/60 border-border/50 italic">
                    <Globe className="h-3 w-3" /> Website not specified
                  </Badge>
                )}
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed bg-muted/30 p-3 rounded-lg border border-border/50 italic">
                "{tagline || <span className="text-muted-foreground/60 italic">Add your company mission or bio here...</span>}"
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Button type="button" variant="outline" onClick={() => setStep(2)} disabled={isProcessing}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Edit Details
              </Button>
              <Button 
                onClick={handleSaveProfile} 
                disabled={isProcessing} 
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving Workspace...
                  </>
                ) : (
                  <>
                    Complete & Launch Workspace <CheckCircle2 className="h-4 w-4 ml-2" />
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
