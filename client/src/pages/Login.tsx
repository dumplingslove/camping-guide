import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, AlertCircle, CheckCircle2, CloudOff } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { supabaseConfigured } from "@/lib/supabase";

export default function Login() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, loading: authLoading, sendMagicLink } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      setLocation("/");
    }
  }, [authLoading, isAuthenticated, setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("请输入邮箱");
      return;
    }
    setLoading(true);
    try {
      await sendMagicLink(email.trim());
      setSent(true);
    } catch (err: any) {
      setError(err?.message || "发送失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen topo-bg flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <img
              src="/camping-guide/images/logo.svg"
              alt="Logo"
              className="w-10 h-10"
            />
            <span className="font-display font-bold text-pine text-xl">
              营地指南
            </span>
          </div>
          <p className="text-sm text-muted-foreground">登录后云端同步笔记、打卡与收藏</p>
        </div>

        {!supabaseConfigured ? (
          <div className="bg-white rounded-xl border border-border p-6 shadow-sm text-center">
            <CloudOff size={28} className="mx-auto text-muted-foreground mb-3" />
            <p className="font-medium">云同步尚未启用</p>
            <p className="text-sm text-muted-foreground mt-1">
              你的笔记和打卡记录会保存在本机浏览器中，登录功能暂不可用。
            </p>
          </div>
        ) : sent ? (
          <div className="bg-white rounded-xl border border-border p-6 shadow-sm text-center">
            <CheckCircle2 size={28} className="mx-auto text-emerald-500 mb-3" />
            <p className="font-medium">已发送，请去邮箱点击登录链接</p>
            <p className="text-sm text-muted-foreground mt-1">
              链接发往 {email}，点击后自动登录并回到本站。
            </p>
            <button
              onClick={() => setSent(false)}
              className="text-sm text-lake hover:text-pine transition-colors mt-4"
            >
              换个邮箱
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl border border-border p-6 shadow-sm space-y-4"
          >
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                邮箱
              </Label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  autoComplete="email"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                无需密码，输入邮箱后我们会发一封登录链接给你。
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-pine hover:bg-pine/90"
              disabled={loading}
            >
              {loading ? "发送中..." : "发送登录链接"}
            </Button>
          </form>
        )}

        {/* Back to home */}
        <div className="text-center mt-4">
          <button
            onClick={() => setLocation("/")}
            className="text-sm text-muted-foreground hover:text-pine transition-colors"
          >
            ← 返回首页
          </button>
        </div>
      </div>
    </div>
  );
}
