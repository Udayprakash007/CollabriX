import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Users,
  Plus,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  UserPlus,
  X,
  MessageSquare,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ConnectedDeveloper } from './MyConnections';
import { toast } from 'sonner';

export interface BatchMember {
  developer: ConnectedDeveloper;
  assignedRole: string;
}

export interface TeamBatch {
  id: string;
  name: string;
  domain: string;
  description: string;
  targetStack: string[];
  members: BatchMember[];
  synergyScore: number;
  coveredSkills: string[];
  missingSkills: string[];
  createdAt: string;
}

interface TeamFormationEngineProps {
  connections: ConnectedDeveloper[];
  preSelectedDeveloper?: ConnectedDeveloper | null;
  onClearPreSelected?: () => void;
  onOpenMessage?: (developer: ConnectedDeveloper, connectionId: string) => void;
}

const AVAILABLE_PROJECT_ROLES = [
  'Team Lead',
  'Frontend Engineer',
  'Backend Engineer',
  'Full Stack Engineer',
  'UI/UX Designer',
  'ML/AI Engineer',
  'DevOps Architect',
  'Mobile Developer',
  'QA & Testing Specialist',
];

const DOMAIN_RECOMMENDED_SKILLS: Record<string, string[]> = {
  'AI / Machine Learning': ['Python', 'Machine Learning', 'PyTorch', 'FastAPI', 'Docker', 'React'],
  'Fullstack Web App': ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'UI/UX Design', 'AWS'],
  'Mobile Application': ['Flutter', 'React Native', 'UI/UX Design', 'Node.js', 'Firebase'],
  'Web3 / FinTech': ['TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Security', 'React'],
  'General MVP Launch': ['React', 'TypeScript', 'Node.js', 'UI/UX Design'],
};

// Key for persisting team batches in local storage
const STORAGE_KEY = 'collabflow_team_batches';

export const TeamFormationEngine = ({
  connections,
  preSelectedDeveloper,
  onClearPreSelected,
  onOpenMessage,
}: TeamFormationEngineProps) => {
  const [batches, setBatches] = useState<TeamBatch[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [batchName, setBatchName] = useState('');
  const [domain, setDomain] = useState('Fullstack Web App');
  const [description, setDescription] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<BatchMember[]>([]);

  // Add People Selector Modal State
  const [isAddPeopleOpen, setIsAddPeopleOpen] = useState(false);
  const [peopleSearchQuery, setPeopleSearchQuery] = useState('');

  // Load existing batches from storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setBatches(JSON.parse(stored));
      } else {
        // Default initial demo batch
        const initialBatch: TeamBatch = {
          id: 'batch-demo-1',
          name: 'AI SaaS Platform Batch',
          domain: 'AI / Machine Learning',
          description: 'Next-generation AI automated workflow generator for remote team workflows.',
          targetStack: ['React', 'Python', 'Machine Learning', 'FastAPI', 'UI/UX Design'],
          members: [
            {
              developer: connections[0] || {
                id: 'demo-dev-1',
                full_name: 'Alex Rivera',
                avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                bio: 'Full Stack Engineer',
                skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
                developer_type: 'Full Stack Developer',
                role: 'developer',
                region: 'North America',
                connectionId: 'conn-demo-1',
              },
              assignedRole: 'Team Lead',
            },
            {
              developer: connections[2] || {
                id: 'demo-dev-3',
                full_name: 'Marcus Vance',
                avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
                bio: 'AI/ML Systems Specialist',
                skills: ['Python', 'PyTorch', 'Machine Learning', 'FastAPI'],
                developer_type: 'ML/AI Engineer',
                role: 'developer',
                region: 'Europe',
                connectionId: 'conn-demo-3',
              },
              assignedRole: 'ML/AI Engineer',
            },
          ],
          synergyScore: 88,
          coveredSkills: ['React', 'TypeScript', 'Node.js', 'Python', 'Machine Learning', 'FastAPI'],
          missingSkills: ['UI/UX Design', 'AWS'],
          createdAt: new Date().toISOString(),
        };
        setBatches([initialBatch]);
        localStorage.setItem(STORAGE_KEY, JSON.stringify([initialBatch]));
      }
    } catch (e) {
      console.error('Error reading saved batches:', e);
    }
  }, []);

  // Check if pre-selected developer passed from Connections tab
  useEffect(() => {
    if (preSelectedDeveloper) {
      setIsModalOpen(true);
      if (!selectedMembers.some(m => m.developer.id === preSelectedDeveloper.id)) {
        setSelectedMembers([
          {
            developer: preSelectedDeveloper,
            assignedRole: preSelectedDeveloper.developer_type || 'Full Stack Engineer',
          },
        ]);
      }
      if (onClearPreSelected) onClearPreSelected();
    }
  }, [preSelectedDeveloper]);

  // Calculate real-time synergy score & missing skills
  const calculateSynergy = (members: BatchMember[], selectedDomain: string) => {
    const recommended = DOMAIN_RECOMMENDED_SKILLS[selectedDomain] || DOMAIN_RECOMMENDED_SKILLS['Fullstack Web App'];
    const allMemberSkills = new Set<string>();

    members.forEach((m) => {
      m.developer.skills?.forEach((skill) => allMemberSkills.add(skill));
    });

    const covered: string[] = [];
    const missing: string[] = [];

    recommended.forEach((reqSkill) => {
      const hasSkill = Array.from(allMemberSkills).some(
        (s) => s.toLowerCase() === reqSkill.toLowerCase() || s.toLowerCase().includes(reqSkill.toLowerCase())
      );
      if (hasSkill) {
        covered.push(reqSkill);
      } else {
        missing.push(reqSkill);
      }
    });

    const coverageRatio = recommended.length > 0 ? covered.length / recommended.length : 1;
    // Synergy gets bonus from team role diversity
    const roleDiversityBonus = Math.min(members.length * 10, 30);
    const score = Math.min(Math.round(coverageRatio * 70 + roleDiversityBonus), 100);

    return {
      score: members.length === 0 ? 0 : score,
      covered: Array.from(allMemberSkills),
      missing,
    };
  };

  const currentSynergy = calculateSynergy(selectedMembers, domain);

  const saveBatchesToStorage = (updatedBatches: TeamBatch[]) => {
    setBatches(updatedBatches);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBatches));
    } catch (e) {
      console.error('Failed to persist batches:', e);
    }
  };

  const handleCreateBatch = () => {
    if (!batchName.trim()) {
      toast.error('Please enter a name for your team batch');
      return;
    }

    if (selectedMembers.length === 0) {
      toast.error('Please add at least 1 connected developer to your batch');
      return;
    }

    const { score, covered, missing } = calculateSynergy(selectedMembers, domain);

    const newBatch: TeamBatch = {
      id: `batch-${Date.now()}`,
      name: batchName.trim(),
      domain,
      description,
      targetStack: DOMAIN_RECOMMENDED_SKILLS[domain] || [],
      members: selectedMembers,
      synergyScore: score,
      coveredSkills: covered,
      missingSkills: missing,
      createdAt: new Date().toISOString(),
    };

    const updated = [newBatch, ...batches];
    saveBatchesToStorage(updated);

    toast.success(`Team Batch "${batchName}" successfully created!`);
    resetForm();
    setIsModalOpen(false);
  };

  const handleDeleteBatch = (batchId: string) => {
    const updated = batches.filter((b) => b.id !== batchId);
    saveBatchesToStorage(updated);
    toast.success('Team batch deleted');
  };

  const resetForm = () => {
    setBatchName('');
    setDomain('Fullstack Web App');
    setDescription('');
    setSelectedMembers([]);
  };

  const handleToggleMember = (dev: ConnectedDeveloper) => {
    const exists = selectedMembers.some((m) => m.developer.id === dev.id);
    if (exists) {
      setSelectedMembers(selectedMembers.filter((m) => m.developer.id !== dev.id));
    } else {
      setSelectedMembers([
        ...selectedMembers,
        {
          developer: dev,
          assignedRole: dev.developer_type || 'Team Member',
        },
      ]);
    }
  };

  const handleRoleChange = (devId: string, newRole: string) => {
    setSelectedMembers(
      selectedMembers.map((m) =>
        m.developer.id === devId ? { ...m, assignedRole: newRole } : m
      )
    );
  };

  const filteredConnectionsToAdd = connections.filter((dev) => {
    const q = peopleSearchQuery.toLowerCase();
    return (
      !q ||
      dev.full_name?.toLowerCase().includes(q) ||
      dev.developer_type?.toLowerCase().includes(q) ||
      dev.skills?.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/15 to-card border border-primary/20 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold">Team Formation Engine</h2>
            <Badge variant="default" className="gradient-primary">
              Batch Builder
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Form high-synergy project batches, map skill coverage, and assemble teams exclusively from your verified connection network.
          </p>
        </div>

        <Button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="gradient-primary shadow-md font-semibold gap-2 shrink-0"
        >
          <Plus className="h-4 w-4" />
          Form New Batch
        </Button>
      </div>

      {/* Batches Display */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Formed Batches ({batches.length})
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          {batches.map((batch) => (
            <Card key={batch.id} className="relative overflow-hidden border-border/80 hover:border-primary/50 transition-all shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
              
              <CardHeader className="pb-3 pt-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      {batch.name}
                    </CardTitle>
                    <CardDescription className="text-xs mt-0.5">
                      Domain: <span className="font-medium text-foreground">{batch.domain}</span>
                    </CardDescription>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Synergy Badge */}
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Synergy</span>
                      <Badge
                        variant={batch.synergyScore >= 80 ? 'default' : 'secondary'}
                        className={`text-xs font-bold ${
                          batch.synergyScore >= 80
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                        }`}
                      >
                        <Sparkles className="h-3 w-3 mr-1 inline" />
                        {batch.synergyScore}%
                      </Badge>
                    </div>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDeleteBatch(batch.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pt-0">
                {batch.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {batch.description}
                  </p>
                )}

                {/* Team Members List */}
                <div>
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    Connected Team Members ({batch.members.length})
                  </span>

                  <div className="space-y-2">
                    {batch.members.map((member, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 p-2 rounded-lg bg-muted/50 border border-border/40 text-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Avatar className="h-7 w-7 border">
                            <AvatarImage src={member.developer.avatar_url || ''} />
                            <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                              {member.developer.full_name?.charAt(0) || 'D'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-medium truncate">{member.developer.full_name}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{member.developer.developer_type}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] bg-background">
                            {member.assignedRole}
                          </Badge>
                          {onOpenMessage && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6 text-muted-foreground hover:text-primary"
                              onClick={() => onOpenMessage(member.developer, member.developer.connectionId)}
                            >
                              <MessageSquare className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Synergy Skill Breakdown */}
                <div className="pt-2 border-t border-border/40 space-y-2">
                  <div>
                    <span className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Covered Capabilities:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {batch.coveredSkills.slice(0, 5).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-[10px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                          <CheckCircle2 className="h-2.5 w-2.5 mr-1" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {batch.missingSkills.length > 0 && (
                    <div>
                      <span className="text-[11px] font-semibold text-muted-foreground block mb-1">
                        Skill Gaps to Consider:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {batch.missingSkills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-[10px] text-amber-600 dark:text-amber-400 border-amber-500/30">
                            <AlertTriangle className="h-2.5 w-2.5 mr-1" />
                            Needs {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {batches.length === 0 && (
            <div className="col-span-full text-center py-12 border-2 border-dashed border-border rounded-2xl p-8">
              <Sparkles className="h-12 w-12 mx-auto mb-3 text-primary opacity-50" />
              <h4 className="font-bold text-base">No Team Batches Formed Yet</h4>
              <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                Assemble high-performing project teams by selecting developers from your connected network and evaluating team synergy.
              </p>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 gradient-primary gap-2"
              >
                <Plus className="h-4 w-4" />
                Create First Batch
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* BATCH CREATOR MODAL */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Form Custom Team Batch
            </DialogTitle>
            <DialogDescription>
              Configure your project requirements and select team members exclusively from your connections.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {/* Batch Info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="batch-name">Batch / Team Name *</Label>
                <Input
                  id="batch-name"
                  placeholder="e.g. NextGen FinTech MVP"
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="domain-select">Project Domain</Label>
                <Select value={domain} onValueChange={setDomain}>
                  <SelectTrigger id="domain-select">
                    <SelectValue placeholder="Select Domain" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border z-50">
                    {Object.keys(DOMAIN_RECOMMENDED_SKILLS).map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="batch-desc">Batch Objective & Scope</Label>
              <Textarea
                id="batch-desc"
                placeholder="Briefly describe what this batch will collaborate on..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
            </div>

            {/* ADD PEOPLE SECTION (CONSTRAINED TO CONNECTIONS ONLY) */}
            <div className="space-y-3 pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-semibold flex items-center gap-1.5">
                    <UserPlus className="h-4 w-4 text-primary" />
                    Add People (Connections Only) *
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Only verified connections with <span className="font-semibold text-foreground font-mono">accepted</span> status can be selected.
                  </p>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 text-xs border-primary/40 text-primary hover:bg-primary/10"
                  onClick={() => setIsAddPeopleOpen(true)}
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  Select Connections ({selectedMembers.length})
                </Button>
              </div>

              {/* Selected Members List with Role Assignment */}
              {selectedMembers.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedMembers.map((m) => (
                    <div
                      key={m.developer.id}
                      className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-card border border-border shadow-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={m.developer.avatar_url || ''} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                            {m.developer.full_name?.charAt(0) || 'D'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold truncate">{m.developer.full_name}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{m.developer.developer_type}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Assign Role */}
                        <Select
                          value={m.assignedRole}
                          onValueChange={(val) => handleRoleChange(m.developer.id, val)}
                        >
                          <SelectTrigger className="h-7 text-[11px] w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border border-border z-[60]">
                            {AVAILABLE_PROJECT_ROLES.map((r) => (
                              <SelectItem key={r} value={r} className="text-xs">
                                {r}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          onClick={() => handleToggleMember(m.developer)}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-muted/40 border border-dashed rounded-lg">
                  <p className="text-xs text-muted-foreground">No connections added to this batch yet.</p>
                  <Button
                    size="sm"
                    variant="link"
                    className="text-xs text-primary font-semibold mt-1"
                    onClick={() => setIsAddPeopleOpen(true)}
                  >
                    + Add Connected Developers
                  </Button>
                </div>
              )}
            </div>

            {/* REAL-TIME AI SYNERGY ANALYZER */}
            {selectedMembers.length > 0 && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 via-accent/10 to-card border border-primary/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-primary" />
                    AI Synergy & Skill Match Analysis
                  </span>
                  <Badge
                    variant="outline"
                    className={`font-bold text-xs ${
                      currentSynergy.score >= 80
                        ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                    }`}
                  >
                    {currentSynergy.score}% Synergy Score
                  </Badge>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[11px] font-semibold text-muted-foreground">Combined Stack:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {currentSynergy.covered.length > 0 ? (
                        currentSynergy.covered.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-[10px]">
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-[11px] text-muted-foreground italic">No skills listed yet</span>
                      )}
                    </div>
                  </div>

                  {currentSynergy.missing.length > 0 && (
                    <div>
                      <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                        Missing Recommended Domain Skills:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {currentSynergy.missing.map((s) => (
                          <Badge key={s} variant="outline" className="text-[10px] border-amber-500/40 text-amber-600 dark:text-amber-400">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateBatch} className="gradient-primary gap-1.5 font-semibold">
              <CheckCircle2 className="h-4 w-4" />
              Assemble & Form Batch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* SELECT CONNECTIONS ONLY MODAL */}
      <Dialog open={isAddPeopleOpen} onOpenChange={setIsAddPeopleOpen}>
        <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto z-[70]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Add Connected People
            </DialogTitle>
            <DialogDescription className="text-xs">
              Select members from your verified connection network (<span className="font-semibold text-foreground">accepted connections</span>).
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <Input
              placeholder="Search connections..."
              value={peopleSearchQuery}
              onChange={(e) => setPeopleSearchQuery(e.target.value)}
              className="h-9 text-xs"
            />

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredConnectionsToAdd.map((dev) => {
                const isSelected = selectedMembers.some((m) => m.developer.id === dev.id);

                return (
                  <div
                    key={dev.id}
                    onClick={() => handleToggleMember(dev)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/10 shadow-xs'
                        : 'border-border hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="h-9 w-9 border">
                        <AvatarImage src={dev.avatar_url || ''} />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                          {dev.full_name?.charAt(0) || 'C'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-xs font-bold truncate">{dev.full_name}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{dev.developer_type}</p>
                        {dev.skills && (
                          <div className="flex gap-1 mt-0.5 truncate">
                            {dev.skills.slice(0, 2).map((s) => (
                              <span key={s} className="text-[9px] bg-muted px-1.5 py-0.2 rounded">
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant={isSelected ? 'default' : 'outline'}
                      className="h-7 text-xs px-2.5 shrink-0"
                    >
                      {isSelected ? 'Added' : '+ Add'}
                    </Button>
                  </div>
                );
              })}

              {filteredConnectionsToAdd.length === 0 && (
                <div className="text-center py-6 text-muted-foreground text-xs">
                  No accepted connections found matching search.
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsAddPeopleOpen(false)} className="w-full gradient-primary text-xs">
              Done Selecting ({selectedMembers.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamFormationEngine;
