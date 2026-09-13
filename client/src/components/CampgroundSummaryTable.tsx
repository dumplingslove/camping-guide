import { useState, useMemo } from "react";
import { Link } from "wouter";
import { campgrounds, Campground, CampgroundTier } from "@/data/campgrounds";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Star,
  CheckCircle2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  TableIcon,
  Ban,
  AlertTriangle,
  MapPin,
} from "lucide-react";

type SortField = "id" | "nameCn" | "driveTime" | "sceneryRating" | "kidRating" | "tcRating" | "state" | "tier" | "visited";
type SortDir = "asc" | "desc";

interface VisitedGlobal {
  [key: string]: { name?: string; count: number; lastVisit: string; lastSites: string };
}

function MiniStars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-px">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={10}
          className={i < rating ? "fill-sand text-sand" : "text-border/40"}
        />
      ))}
    </span>
  );
}

function tierColor(tier?: CampgroundTier): string {
  switch (tier) {
    case "顶级热门": return "bg-red-50 text-red-700 border-red-200";
    case "明显热门": return "bg-orange-50 text-orange-700 border-orange-200";
    case "区域家庭优选": return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "商业度假型": return "bg-purple-50 text-purple-700 border-purple-200";
    case "2026受限": return "bg-amber-50 text-amber-700 border-amber-200";
    case "不适配": return "bg-gray-50 text-gray-500 border-gray-200";
    default: return "bg-gray-50 text-gray-500 border-gray-200";
  }
}

export function CampgroundSummaryTable({ visitedMap }: { visitedMap: VisitedGlobal }) {
  const [expanded, setExpanded] = useState(true);
  const [sortField, setSortField] = useState<SortField>("driveTime");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const sorted = useMemo(() => {
    const arr = [...campgrounds];
    arr.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "id": cmp = a.id - b.id; break;
        case "nameCn": cmp = a.nameCn.localeCompare(b.nameCn); break;
        case "driveTime": cmp = a.driveTime - b.driveTime; break;
        case "sceneryRating": cmp = a.sceneryRating - b.sceneryRating; break;
        case "kidRating": cmp = a.kidRating - b.kidRating; break;
        case "tcRating": cmp = a.tcRating - b.tcRating; break;
        case "state": cmp = a.state.localeCompare(b.state); break;
        case "tier": cmp = (a.tier || "").localeCompare(b.tier || ""); break;
        case "visited": {
          const aV = visitedMap[a.id] ? 1 : 0;
          const bV = visitedMap[b.id] ? 1 : 0;
          cmp = aV - bV;
          break;
        }
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [sortField, sortDir, visitedMap]);

  const visitedCount = Object.keys(visitedMap).length;

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown size={10} className="text-muted-foreground/40" />;
    return sortDir === "asc" ? <ArrowUp size={10} className="text-pine" /> : <ArrowDown size={10} className="text-pine" />;
  };

  const SortableHead = ({ field, children, className }: { field: SortField; children: React.ReactNode; className?: string }) => (
    <TableHead className={className}>
      <button
        onClick={() => toggleSort(field)}
        className="inline-flex items-center gap-1 hover:text-pine transition-colors"
      >
        {children}
        <SortIcon field={field} />
      </button>
    </TableHead>
  );

  return (
    <section id="summary-table" className="container pb-8">
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <TableIcon size={18} className="text-pine" />
            <h2 className="font-display font-bold text-lg text-foreground">
              营地总表
            </h2>
            <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
              {campgrounds.length}个营地
            </span>
            {visitedCount > 0 && (
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                已去过 {visitedCount}个
              </span>
            )}
          </div>
          {expanded ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
        </button>

        {/* Table */}
        {expanded && (
          <div className="border-t border-border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <SortableHead field="visited" className="w-10 text-center">#</SortableHead>
                  <SortableHead field="nameCn">营地名称</SortableHead>
                  <SortableHead field="state">州</SortableHead>
                  <SortableHead field="driveTime">车程</SortableHead>
                  <SortableHead field="tier">分类</SortableHead>
                  <SortableHead field="sceneryRating">风景</SortableHead>
                  <SortableHead field="kidRating">娃可玩</SortableHead>
                  <SortableHead field="tcRating">TC</SortableHead>
                  <TableHead className="text-center">状态</TableHead>
                  <TableHead>地图</TableHead>
                  <TableHead>上次去过</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((camp) => {
                  const visited = visitedMap[camp.id];
                  return (
                    <TableRow
                      key={camp.id}
                      className={`${visited ? "bg-emerald-50/30" : ""} hover:bg-muted/50`}
                    >
                      {/* Visited check */}
                      <TableCell className="text-center">
                        {visited ? (
                          <CheckCircle2 size={14} className="text-emerald-500 mx-auto" />
                        ) : (
                          <span className="text-[10px] text-muted-foreground/40 font-mono">{camp.id}</span>
                        )}
                      </TableCell>
                      {/* Name */}
                      <TableCell>
                        <Link href={`/campground/${camp.id}`} className="hover:text-pine transition-colors">
                          <span className="font-medium text-sm">{camp.nameCn}</span>
                          <span className="block text-[10px] text-muted-foreground font-mono leading-tight">{camp.name}</span>
                        </Link>
                      </TableCell>
                      {/* State */}
                      <TableCell>
                        <span className="text-xs font-mono">{camp.state}</span>
                      </TableCell>
                      {/* Drive time */}
                      <TableCell>
                        <span className="text-xs font-mono font-semibold text-pine">{camp.driveTimeLabel}</span>
                      </TableCell>
                      {/* Tier */}
                      <TableCell>
                        {camp.tier && (
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${tierColor(camp.tier)}`}>
                            {camp.tier}
                          </span>
                        )}
                      </TableCell>
                      {/* Scenery */}
                      <TableCell><MiniStars rating={camp.sceneryRating} /></TableCell>
                      {/* Kid */}
                      <TableCell><MiniStars rating={camp.kidRating} /></TableCell>
                      {/* TC */}
                      <TableCell><MiniStars rating={camp.tcRating} /></TableCell>
                      {/* Status */}
                      <TableCell className="text-center">
                        {camp.closureInfo ? (
                          <span className="inline-flex items-center gap-0.5 text-[10px] text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">
                            <Ban size={8} />关闭
                          </span>
                        ) : camp.warning ? (
                          <span className="inline-flex items-center gap-0.5 text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">
                            <AlertTriangle size={8} />注意
                          </span>
                        ) : (
                          <span className="text-[10px] text-emerald-600">正常</span>
                        )}
                      </TableCell>
                      {/* Google Maps */}
                      <TableCell className="text-center">
                        {camp.googleMapsUrl && (
                          <a
                            href={camp.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 text-[10px] text-lake hover:text-pine transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MapPin size={12} />
                          </a>
                        )}
                      </TableCell>
                      {/* Last visited */}
                      <TableCell>
                        {visited ? (
                          <div className="text-[11px]">
                            <span className="text-emerald-700 font-medium">{visited.lastVisit}</span>
                            {visited.count > 1 && (
                              <span className="ml-1 text-emerald-600 font-mono">({visited.count}次)</span>
                            )}
                            {visited.lastSites && (
                              <span className="ml-1 text-emerald-600 font-mono text-[10px]">Site {visited.lastSites}</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-[10px] text-muted-foreground/40">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </section>
  );
}
