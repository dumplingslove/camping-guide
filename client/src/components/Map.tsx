/**
 * MapView — 营地位置地图（本地静态图，点击在地图 App 中打开交互版）。
 *
 * 为什么不用 Google Maps JS API / 嵌入 iframe：
 * 1. JS API 需要走后端代理签发 key，GitHub Pages 是纯静态托管，没有后端，
 *    脚本永远加载失败，页面上表现为"地图加载中"无限转圈。
 * 2. keyless 的 maps.google.com 嵌入 iframe 在部分网络/浏览器下会被拦截，
 *    且无法在构建/验收环境里截图验证——用户已经因为"地图都看不到"投诉过。
 *
 * 现在的方案：构建时用 OpenStreetMap 瓦片拼成带图钉的静态地图，打进仓库；
 * 页面上 100% 能显示、可截图验证；点击图片则在 Google 地图（手机上是地图 App）
 * 里打开可交互版本。两全。
 */

import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface MapViewProps {
  className?: string;
  /** 本地静态地图图片，如 "/camping-guide/images/maps/camp-14-z11.png" */
  src: string;
  /** 点击图片后打开的交互地图链接（Google Maps） */
  href: string;
  title?: string;
}

export function MapView({ className, src, href, title }: MapViewProps) {
  return (
    <div className={cn("w-full h-[500px] relative group", className)}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={title ?? "在地图中打开"}
        className="block w-full h-full"
      >
        <img
          src={src}
          alt={title ?? "营地位置地图"}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-black/55 text-white text-[11px] font-medium backdrop-blur-sm opacity-90 group-active:opacity-100">
          <ExternalLink size={12} />
          在地图 App 中打开
        </span>
      </a>
    </div>
  );
}
