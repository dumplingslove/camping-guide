import { Map as MapIcon, ExternalLink, MousePointerClick } from "lucide-react";
import { getSiteMap } from "@/data/siteMaps";

interface NumberedSiteMapProps {
  campgroundId: number;
  campgroundName: string;
  /** 在合并区块内渲染：无外层卡片，顶部带分隔线与次级标题 */
  bare?: boolean;
}

/**
 * 营地编号营位图：官方发布的标注了每个编号营位位置的平面图。
 * - static: 站内托管的官方 PDF（缩略图预览，点击看完整大图）
 * - interactive: 官方在线预订选位图（外链）
 * - 无：不渲染
 */
export function NumberedSiteMap({ campgroundId, campgroundName, bare }: NumberedSiteMapProps) {
  const info = getSiteMap(campgroundId);
  if (!info) return null;

  const content = (
    <>
      {info.kind === "static" ? (
        <>
          <a
            href={info.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`查看${campgroundName}完整营位编号地图（PDF）`}
            className="block rounded-lg overflow-hidden border border-border hover:border-pine transition-colors group"
          >
            {info.thumb ? (
              <img
                src={info.thumb}
                alt={`${campgroundName} 营位编号地图预览`}
                className="w-full h-auto group-hover:opacity-95 transition-opacity"
                loading="lazy"
              />
            ) : (
              <span className="block p-8 text-center text-muted-foreground text-sm">
                点击查看完整营位编号地图（PDF）
              </span>
            )}
          </a>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <a
              href={info.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pine/10 text-pine rounded-lg hover:bg-pine/20 transition-colors text-sm"
            >
              <ExternalLink size={14} />
              查看完整大图
            </a>
            <a
              href={info.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors text-sm"
            >
              来源：{info.source}
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            图上标注了每个编号营位的具体位置，预订前可对照选择心仪营位。
          </p>
        </>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-3">
            该营地官方未发布可下载的编号营位图，可在官方预订系统的交互地图上查看每个营位的位置与编号。
          </p>
          <a
            href={info.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-pine text-white rounded-lg hover:bg-pine-light transition-colors text-sm font-medium"
          >
            <MousePointerClick size={15} />
            打开{info.source}
            <ExternalLink size={13} />
          </a>
        </>
      )}
    </>
  );

  if (bare) {
    return (
      <div className="mt-6 pt-5 border-t border-border">
        <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2 mb-3">
          <MapIcon size={16} className="text-pine" />
          营位编号地图
        </h3>
        {content}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
        <MapIcon size={18} className="text-pine" />
        营位编号地图
      </h2>
      {content}
    </div>
  );
}
