import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Mail, Lock, User, Eye, EyeOff, Loader2, Code, Briefcase } from 'lucide-react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';

import { DeveloperOnboardingModal } from '@/components/auth/DeveloperOnboardingModal';
import { ClientOnboardingModal } from '@/components/auth/ClientOnboardingModal';

const emailSchema = z.string().trim().email({ message: "Invalid email address" });
const passwordSchema = z.string().min(1, { message: "Please enter a password" });
const nameSchema = z.string().trim().min(2, { message: "Name must be at least 2 characters" });

type UserRole = 'developer' | 'client';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('developer');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeveloperOnboarding, setShowDeveloperOnboarding] = useState(false);
  const [showClientOnboarding, setShowClientOnboarding] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [newUserId, setNewUserId] = useState<string | undefined>(undefined);
  
  const { signIn, signUp, signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !showDeveloperOnboarding && !showClientOnboarding && !isSigningUp) {
      navigate('/');
    }
  }, [user, showDeveloperOnboarding, showClientOnboarding, isSigningUp, navigate]);

  const saveUserRole = async (userId: string, role: UserRole) => {
    // 1. Ensure user_roles has the selected role
    const { error: roleError } = await supabase
      .from('user_roles')
      .upsert({ user_id: userId, role }, { onConflict: 'user_id,role' });
    
    if (roleError) {
      console.error('Error saving user role:', roleError);
    }

    // 2. Set profile headline and developer_type cleanly
    const profileRole = role === 'client' ? 'Client' : 'Full Stack Developer';
    const developerType = role === 'client' ? null : 'Full Stack Developer';

    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        role: profileRole,
        developer_type: developerType,
      })
      .eq('id', userId);

    if (profileError) {
      console.error('Error updating profile headline:', profileError);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate inputs
      const emailResult = emailSchema.safeParse(email);
      if (!emailResult.success) {
        toast.error(emailResult.error.errors[0].message);
        setIsLoading(false);
        return;
      }

      const passwordResult = passwordSchema.safeParse(password);
      if (!passwordResult.success) {
        toast.error(passwordResult.error.errors[0].message);
        setIsLoading(false);
        return;
      }

      if (!isLogin) {
        const nameResult = nameSchema.safeParse(fullName);
        if (!nameResult.success) {
          toast.error(nameResult.error.errors[0].message);
          setIsLoading(false);
          return;
        }
      }

      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Welcome back!');
          navigate('/');
        }
      } else {
        setIsSigningUp(true);
        const { error, data } = await signUp(email, password, fullName, selectedRole);
        if (error) {
          setIsSigningUp(false);
          if (error.message.includes('already registered')) {
            toast.error('This email is already registered. Please sign in.');
          } else {
            toast.error(error.message);
          }
        } else {
          // Save user role after successful signup
          if (data?.user?.id) {
            await saveUserRole(data.user.id, selectedRole);
            setNewUserId(data.user.id);
          }
          
          if (selectedRole === 'developer') {
            setShowDeveloperOnboarding(true);
            toast.success('Account created! Let\'s set up your profile.');
          } else if (selectedRole === 'client') {
            setShowClientOnboarding(true);
            toast.success('Account created! Let\'s set up your company profile.');
          } else {
            toast.success('Account created successfully!');
            navigate('/');
          }
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">CX</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isLogin 
              ? 'Sign in to access your CollabriX account' 
              : 'Join CollabriX and start collaborating'}
          </p>
        </div>

        {/* Card */}
        <div className="card-base p-6 animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                {/* Role Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-bold uppercase tracking-wide">I AM A</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedRole('developer')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                        selectedRole === 'developer'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Code className="h-6 w-6" />
                      <span className="font-medium">Developer</span>
                      <span className="text-xs text-muted-foreground">I build projects</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole('client')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                        selectedRole === 'client'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Briefcase className="h-6 w-6" />
                      <span className="font-medium">Client</span>
                      <span className="text-xs text-muted-foreground">I hire talent</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Developer"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-medium"
              disabled={isLoading}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>

      <DeveloperOnboardingModal
        isOpen={showDeveloperOnboarding}
        onClose={() => {
          setShowDeveloperOnboarding(false);
          setIsSigningUp(false);
          navigate('/');
        }}
        userId={newUserId}
        onComplete={() => {
          setShowDeveloperOnboarding(false);
          setIsSigningUp(false);
          navigate('/');
        }}
      />

      <ClientOnboardingModal
        isOpen={showClientOnboarding}
        onClose={() => {
          setShowClientOnboarding(false);
          setIsSigningUp(false);
          navigate('/');
        }}
        userId={newUserId}
        onComplete={() => {
          setShowClientOnboarding(false);
          setIsSigningUp(false);
          navigate('/');
        }}
      />
    </div>
  );
}
