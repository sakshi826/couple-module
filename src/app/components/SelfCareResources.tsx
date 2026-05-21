import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { handlePlatformExit } from "../../lib/navigation";
import { useTranslation } from "react-i18next";
import { 
  ChevronLeft, 
  Heart, 
  Smile, 
  Play, 
  Mail, 
  Newspaper, 
  Lightbulb, 
  BookMarked, 
  Target, 
  HelpCircle, 
  ArrowRight,
  Star,
  Compass,
  RefreshCw
} from "lucide-react";

export function SelfCareResources() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const selectedTopic = "relationship";

  const prefetchTool = (id: string) => {
    const prefetchMap: Record<string, () => Promise<any>> = {
      "a-letter-to-self": () => import("../../features/a_letter_to_self"),
      "affirmations": () => import("../../features/affirmations"),
      "know-your-values": () => import("../../features/know_your_values"),
      "gratitude-tracker": () => import("../../features/gratitude_tracker"),
      "care-tracker": () => import("../../features/care_tracker"),
      "personal-mission-statement": () => import("../../features/personal_mission_statement"),
    };
    if (prefetchMap[id]) prefetchMap[id]();
  };

  useEffect(() => {
    const handlePopState = () => {
      handlePlatformExit();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const detail = {
    descKey: "topics.relationship.desc",
    exercises: [
      { titleKey: "tools.letter-to-self", icon: Mail, url: "/tools/a-letter-to-self" },
      { titleKey: "tools.affirmations", icon: Smile, url: "/tools/affirmations" },
      { titleKey: "exercises.guided_imagery", icon: Play, url: "https://web.mantracare.com/mindfulness/media/203/1", action: 'guided' },
      { titleKey: "exercises.diffusion_technique", icon: RefreshCw, url: "/exercises/diffusion-technique" },
    ],
    todos: [
      { titleKey: "tools.know_values", icon: Target, url: "/tools/know-your-values" },
      { titleKey: "tools.gratitude-tracker", icon: Star, url: "/trackers/gratitude-tracker" },
      { titleKey: "tools.care_tracker", icon: Heart, url: "/trackers/care-tracker" },
      { titleKey: "tools.personal-mission-statement", icon: Compass, url: "/tools/personal-mission-statement" },
    ],
    resources: [
      { titleKey: "hub.articles", count: 22, icon: Newspaper, url: "/resources/relationship/articles" },
      { titleKey: "hub.tips", count: 16, icon: Lightbulb, url: "/resources/relationship/tips" },
      { titleKey: "hub.stories", count: 12, icon: BookMarked, url: "/resources/relationship/stories" },
      { titleKey: "hub.myths", count: 8, icon: HelpCircle, url: "/resources/relationship/myths" },
    ],
  };

  return (
    <div className="flex min-h-screen bg-[#F6F8FB]">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-4xl w-full mx-auto px-4 md:px-6 py-6 pt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key="topic-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <button
                onClick={handlePlatformExit}
                className="flex items-center gap-2 text-[#64748B] hover:text-[#020817] transition-colors group mb-4"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">{(typeof t !== "undefined" ? t : (k) => k)("common.back")}</span>
              </button>

              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-[#020817]">{(typeof t !== "undefined" ? t : (k) => k)("topics.relationship.label")}</h1>
                <p className="text-base text-[#64748B] leading-relaxed max-w-2xl">{(typeof t !== "undefined" ? t : (k) => k)(detail.descKey)}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[#020817]">{(typeof t !== "undefined" ? t : (k) => k)("hub.guided_series")}</h2>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/guided-series/${selectedTopic}`)}
                  className="w-full bg-[#F5FBFF] border-2 border-[#E0F2FE] rounded-2xl p-6 flex items-center justify-between hover:border-primary hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                      <Play size={20} className="text-white fill-current" />
                    </div>
                    <div className="text-left">
                      <span className="block font-bold text-[#020817]">{(typeof t !== "undefined" ? t : (k) => k)("hub.start_guided_series")}</span>
                      <span className="text-xs text-[#64748B]">{(typeof t !== "undefined" ? t : (k) => k)("hub.guided_series_desc")}</span>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-[#64748B] group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              {detail.exercises.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-[#020817]">{(typeof t !== "undefined" ? t : (k) => k)("hub.exercises")}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {detail.exercises.map((ex, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ y: -4 }}
                        onClick={() => {
                          if (ex.action === 'guided') {
                            if (window.parent !== window) {
                              window.parent.postMessage({ action: 'guided' }, 'https://web.mantracare.com');
                            } else {
                              window.location.href = ex.url!;
                            }
                            return;
                          }
                          ex.url?.startsWith('http') ? window.location.href = ex.url : navigate(ex.url!)
                        }}
                        onMouseEnter={() => {
                          const slug = ex.url?.split('/').pop();
                          if (slug) prefetchTool(slug);
                        }}
                        className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all text-left space-y-3"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                          <ex.icon size={20} />
                        </div>
                        <p className="text-sm font-bold text-slate-800 leading-tight">{(typeof t !== "undefined" ? t : (k) => k)(ex.titleKey)}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {detail.todos.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-[#020817]">{(typeof t !== "undefined" ? t : (k) => k)("hub.todos")}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {detail.todos.map((todo, i) => {
                      const colors = [
                        { accent: '#3B82F6', bg: '#EFF6FF', iconBg: '#DBEAFE' },
                        { accent: '#10B981', bg: '#F0FDF4', iconBg: '#D1FAE5' },
                        { accent: '#F59E0B', bg: '#FFFBEB', iconBg: '#FEF3C7' },
                        { accent: '#EC4899', bg: '#FDF2F8', iconBg: '#FCE7F3' }
                      ];
                      const color = colors[i % colors.length];
                      return (
                        <motion.button
                          key={i}
                          whileHover={{ x: 4, scale: 1.02 }}
                          onClick={() => todo.url?.startsWith('http') ? (window.location.href = todo.url) : navigate(todo.url!)}
                          onMouseEnter={() => {
                            const slug = todo.url?.split('/').pop();
                            if (slug) prefetchTool(slug);
                          }}
                          className="p-5 rounded-2xl flex items-center gap-5 transition-all border border-slate-100/50 shadow-sm hover:shadow-xl group"
                          style={{ backgroundColor: color.bg }}
                        >
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-inner" style={{ backgroundColor: color.iconBg }}>
                            <todo.icon size={24} style={{ color: color.accent }} />
                          </div>
                          <div className="flex-1 text-left">
                            <span className="font-bold text-slate-800 text-base group-hover:text-primary transition-colors">{(typeof t !== "undefined" ? t : (k) => k)(todo.titleKey)}</span>
                          </div>
                          <ArrowRight size={18} className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {detail.resources && detail.resources.length > 0 && (
                <div className="space-y-6 pt-4">
                  <h2 className="text-xl font-bold text-[#020817]">{(typeof t !== "undefined" ? t : (k) => k)("hub.resources")}</h2>
                  <div className="space-y-3">
                    {detail.resources.map((res, i) => {
                      const ResIcon = res.icon;
                      const colors = [
                        { accent: '#F59E0B', bg: '#FFFBEB', bar: '#FDE68A', iconBg: '#FEF3C7' },
                        { accent: '#3B82F6', bg: '#EFF6FF', bar: '#BFDBFE', iconBg: '#DBEAFE' },
                        { accent: '#A855F7', bg: '#FAF5FF', bar: '#E9D5FF', iconBg: '#F3E8FF' },
                        { accent: '#10B981', bg: '#F0FDF4', bar: '#A7F3D0', iconBg: '#D1FAE5' }
                      ];
                      const color = colors[i % colors.length];
                      return (
                        <motion.button
                          key={i}
                          whileHover={{ x: 8, scale: 1.01 }}
                          onClick={() => res.url?.startsWith('http') ? window.location.href = res.url : navigate(res.url!)}
                          className="w-full rounded-2xl p-4 flex items-center gap-4 transition-all group relative overflow-hidden text-left"
                          style={{ backgroundColor: color.bg }}
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 group-hover:w-1.5 transition-all" style={{ backgroundColor: color.accent }}></div>
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform relative z-10" style={{ backgroundColor: color.iconBg }}>
                            <ResIcon size={22} style={{ color: color.accent }} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-[#020817] mb-0.5 leading-tight">{(typeof t !== "undefined" ? t : (k) => k)(res.titleKey)}</h3>
                            <div className="flex items-center gap-2">
                              <div className="h-1 w-12 rounded-full group-hover:w-16 transition-all" style={{ backgroundColor: color.bar }}></div>
                              <span className="text-xs text-[#64748B] opacity-0 group-hover:opacity-100 transition-opacity">{(typeof t !== "undefined" ? t : (k) => k)("hub.view_resource")}</span>
                            </div>
                          </div>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:shadow-md transition-all" style={{ backgroundColor: color.iconBg }}>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" style={{ color: color.accent }} />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
