import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, AlertCircle } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("请填写邮箱和密码");
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        setError(data.error || "登录失败");
        return;
      }

      // Redirect to home after successful login
      window.location.href = "/";
    } catch (err: any) {
      setError("网络错误，请稍后重试");
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
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663328359702/ih5KuobX6RNPFjbp9hkXB2/logo-icon-WrmXjRpLUoFPAVuBPxkQwH.webp"
              alt="Logo"
              className="w-10 h-10"
            />
            <span className="font-display font-bold text-pine text-xl">
              营地指南
            </span>
          </div>
          <p className="text-sm text-muted-foreground">管理员登录</p>
        </div>

        {/* Login Form */}
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              密码
            </Label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9"
                autoComplete="current-password"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-pine hover:bg-pine/90"
            disabled={loading}
          >
            {loading ? "登录中..." : "登录"}
          </Button>
        </form>

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
