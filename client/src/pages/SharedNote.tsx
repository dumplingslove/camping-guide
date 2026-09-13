import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { StickyNote, AlertCircle, Tent } from "lucide-react";
import { supabase, supabaseConfigured } from "@/lib/supabase";

interface SharedSnapshot {
  campground_name: string;
  note_text: string;
  note_date: string;
  created_at: string;
}

export default function SharedNote() {
  const params = useParams<{ token: string }>();
  const token = params.token;
  const [snapshot, setSnapshot] = useState<SharedSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    (async () => {
      if (!supabaseConfigured || !supabase || !token) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase.rpc("get_shared_note", {
        p_token: token,
      });
      if (!error && data && data.length > 0) {
        setSnapshot(data[0] as SharedSnapshot);
        setValid(true);
      }
      setLoading(false);
    })();
  }, [token]);

  return (
    <div className="min-h-screen topo-bg">
      <header className="bg-pine text-white">
        <div className="container py-4 flex items-center gap-2">
          <Tent size={20} />
          <span className="font-display font-bold">营地指南</span>
        </div>
      </header>
      <main className="container py-10 max-w-xl">
        {loading ? (
          <p className="text-muted-foreground">加载中...</p>
        ) : !supabaseConfigured ? (
          <div className="bg-white rounded-xl border border-border p-8 text-center">
            <AlertCircle size={28} className="mx-auto text-sunset mb-3" />
            <p className="font-medium">分享功能暂不可用</p>
            <p className="text-sm text-muted-foreground mt-1">云同步尚未启用，无法打开分享链接。</p>
          </div>
        ) : !valid || !snapshot ? (
          <div className="bg-white rounded-xl border border-border p-8 text-center">
            <AlertCircle size={28} className="mx-auto text-sunset mb-3" />
            <p className="font-medium">链接无效或已被取消</p>
            <p className="text-sm text-muted-foreground mt-1">这条分享可能已被作者撤回。</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-border p-6 sm:p-8">
            <div className="flex items-center gap-2 text-pine mb-4">
              <StickyNote size={18} />
              <span className="font-medium">{snapshot.campground_name || "营地笔记"}</span>
            </div>
            <p className="text-lg leading-relaxed whitespace-pre-wrap">{snapshot.note_text}</p>
            <p className="text-xs text-muted-foreground mt-4">笔记日期：{snapshot.note_date}</p>
            <div className="border-t border-border mt-6 pt-4 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">来自营地指南的分享</span>
              <Link href="/" className="text-xs text-lake hover:text-pine transition-colors">
                去看看营地指南
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
