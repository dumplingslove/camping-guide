import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import {
  RefreshCw, Clock, Database, AlertCircle, CheckCircle2,
  Play, Pause, ArrowLeft, Loader2, BarChart3, Globe, MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminReviews() {
  const { user, loading: authLoading } = useAuth();
  const [updatingIds, setUpdatingIds] = useState<number[]>([]);

  const statusQuery = trpc.reviews.status.useQuery(undefined, {
    retry: false,
  });
  const statsQuery = trpc.reviews.campgroundStats.useQuery(undefined, {
    retry: false,
  });

  const triggerUpdateMutation = trpc.reviews.triggerUpdate.useMutation({
    onSuccess: (data) => {
      toast.success(`更新完成: ${data.newReviewsTotal} 条新评论, ${data.distilledCount} 个营地重新蒸馏`);
      statusQuery.refetch();
      statsQuery.refetch();
      setUpdatingIds([]);
    },
    onError: (error) => {
      toast.error(`更新失败: ${error.message}`);
      setUpdatingIds([]);
    },
  });

  const toggleCronMutation = trpc.reviews.toggleCron.useMutation({
    onSuccess: (data) => {
      toast.success(data.enabled ? "定时任务已启用" : "定时任务已暂停");
      statusQuery.refetch();
    },
    onError: (error) => {
      toast.error(`操作失败: ${error.message}`);
    },
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-pine" size={32} />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <AlertCircle size={48} className="text-sunset" />
        <h1 className="text-xl font-display font-bold">需要管理员权限</h1>
        <p className="text-muted-foreground">此页面仅限管理员访问</p>
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft size={16} className="mr-2" />
            返回首页
          </Button>
        </Link>
      </div>
    );
  }

  const status = statusQuery.data;
  const stats = statsQuery.data;

  const handleTriggerAll = () => {
    setUpdatingIds([-1]); // -1 means all
    triggerUpdateMutation.mutate({});
  };

  const handleTriggerSingle = (id: number) => {
    setUpdatingIds([id]);
    triggerUpdateMutation.mutate({ campgroundIds: [id] });
  };

  const handleToggleCron = () => {
    if (status) {
      toggleCronMutation.mutate({ enable: !status.cronJobEnabled });
    }
  };

  return (
    <div className="min-h-screen topo-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft size={16} className="mr-1" />
                返回
              </Button>
            </Link>
            <h1 className="font-display font-bold text-pine text-lg">评论系统管理</h1>
          </div>
          <Button
            onClick={handleTriggerAll}
            disabled={triggerUpdateMutation.isPending}
            className="bg-pine hover:bg-pine/90"
          >
            {triggerUpdateMutation.isPending ? (
              <Loader2 size={16} className="mr-2 animate-spin" />
            ) : (
              <RefreshCw size={16} className="mr-2" />
            )}
            全部更新
          </Button>
        </div>
      </header>

      <div className="container py-8 space-y-8">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Cron Status */}
          <div className="bg-white rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-sm text-muted-foreground">定时任务</h3>
              {status?.cronJobExists && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToggleCron}
                  disabled={toggleCronMutation.isPending}
                >
                  {status.cronJobEnabled ? (
                    <><Pause size={14} className="mr-1" /> 暂停</>
                  ) : (
                    <><Play size={14} className="mr-1" /> 启用</>
                  )}
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              {status?.cronJobEnabled ? (
                <CheckCircle2 size={20} className="text-emerald-500" />
              ) : (
                <AlertCircle size={20} className="text-amber-500" />
              )}
              <span className="font-mono text-sm">
                {status?.cronJobEnabled ? "运行中" : status?.cronJobExists ? "已暂停" : "未创建"}
              </span>
            </div>
            {status?.cronExpression && (
              <p className="text-xs text-muted-foreground mt-2 font-mono">
                Cron: {status.cronExpression}
              </p>
            )}
            {status?.nextExecution && (
              <p className="text-xs text-muted-foreground mt-1">
                下次执行: {new Date(status.nextExecution).toLocaleString("zh-CN")}
              </p>
            )}
          </div>

          {/* Last Update */}
          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="font-medium text-sm text-muted-foreground mb-3">上次更新</h3>
            {status?.lastUpdate ? (
              <>
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-lake" />
                  <span className="text-sm">
                    {new Date(status.lastUpdate.lastRun).toLocaleString("zh-CN")}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-emerald-50 rounded px-2 py-1">
                    <span className="text-emerald-700">
                      新评论: {status.lastUpdate.results?.reduce((s: number, r: any) => s + r.newReviewsCount, 0) ?? 0}
                    </span>
                  </div>
                  <div className="bg-blue-50 rounded px-2 py-1">
                    <span className="text-blue-700">
                      蒸馏: {status.lastUpdate.results?.filter((r: any) => r.distilled).length ?? 0}
                    </span>
                  </div>
                  <div className="bg-amber-50 rounded px-2 py-1">
                    <span className="text-amber-700">
                      耗时: {status.lastUpdate.duration ?? "N/A"}
                    </span>
                  </div>
                  <div className="bg-purple-50 rounded px-2 py-1">
                    <span className="text-purple-700">
                      触发: {status.lastUpdate.triggeredBy ?? "cron"}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">尚无更新记录</p>
            )}
          </div>

          {/* Source Breakdown */}
          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="font-medium text-sm text-muted-foreground mb-3">数据源分布</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database size={14} className="text-pine" />
                  <span className="text-sm">Recreation.gov (主)</span>
                </div>
                <span className="font-mono text-sm font-bold text-pine">
                  {status?.sourceBreakdown?.recreationGov ?? 10}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-sunset" />
                  <span className="text-sm">KOA (主)</span>
                </div>
                <span className="font-mono text-sm font-bold text-sunset">
                  {status?.sourceBreakdown?.koa ?? 1}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-lake" />
                  <span className="text-sm">Google Maps (唯一)</span>
                </div>
                <span className="font-mono text-sm font-bold text-lake">
                  {status?.sourceBreakdown?.googleMapsOnly ?? 13}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Per-campground Stats Table */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h2 className="font-display font-bold text-lg flex items-center gap-2">
              <BarChart3 size={20} className="text-pine" />
              各营地评论数据
            </h2>
            <span className="text-sm text-muted-foreground font-mono">
              {stats?.length ?? 0} 营地
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">ID</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">营地名称</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">主数据源</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">评论数</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">上次更新</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {statsQuery.isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      <Loader2 className="animate-spin mx-auto mb-2" size={20} />
                      加载中...
                    </td>
                  </tr>
                ) : stats?.map((camp) => (
                  <tr key={camp.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs">{camp.id}</td>
                    <td className="px-4 py-3 font-medium">{camp.name}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        camp.primarySource === "Recreation.gov" ? "bg-pine/10 text-pine" :
                        camp.primarySource === "KOA" ? "bg-sunset/10 text-sunset" :
                        "bg-lake/10 text-lake"
                      }`}>
                        {camp.primarySource}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {camp.totalReviews > 0 ? camp.totalReviews : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {camp.lastUpdated ? new Date(camp.lastUpdated).toLocaleDateString("zh-CN") : "—"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTriggerSingle(camp.id)}
                        disabled={updatingIds.includes(camp.id) || updatingIds.includes(-1)}
                      >
                        {updatingIds.includes(camp.id) ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <RefreshCw size={14} />
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Last Update Details */}
        {status?.lastUpdate?.results && (
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="p-5 border-b border-border">
              <h2 className="font-display font-bold text-lg">上次更新详情</h2>
              <p className="text-xs text-muted-foreground mt-1">
                {status.lastUpdate.lastRun ? new Date(status.lastUpdate.lastRun).toLocaleString("zh-CN") : ""} · 
                耗时 {status.lastUpdate.duration} · 
                触发方式: {status.lastUpdate.triggeredBy}
              </p>
            </div>
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full text-xs">
                <thead className="bg-secondary/50 sticky top-0">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium">营地</th>
                    <th className="text-right px-4 py-2 font-medium">新评论</th>
                    <th className="text-right px-4 py-2 font-medium">总评论</th>
                    <th className="text-center px-4 py-2 font-medium">蒸馏</th>
                    <th className="text-left px-4 py-2 font-medium">来源</th>
                    <th className="text-left px-4 py-2 font-medium">错误</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {status.lastUpdate.results.map((r: any) => (
                    <tr key={r.campgroundId} className={r.error ? "bg-red-50/50" : ""}>
                      <td className="px-4 py-2">{r.name}</td>
                      <td className="px-4 py-2 text-right font-mono">
                        {r.newReviewsCount > 0 ? (
                          <span className="text-emerald-600">+{r.newReviewsCount}</span>
                        ) : "0"}
                      </td>
                      <td className="px-4 py-2 text-right font-mono">{r.totalReviews}</td>
                      <td className="px-4 py-2 text-center">
                        {r.distilled ? <CheckCircle2 size={14} className="text-emerald-500 mx-auto" /> : "—"}
                      </td>
                      <td className="px-4 py-2">{r.sourceUsed || "—"}</td>
                      <td className="px-4 py-2 text-red-600 max-w-[200px] truncate">{r.error || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
