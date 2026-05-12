import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { handlePlatformExit } from "../../lib/navigation";
import { useTranslation } from "react-i18next";
import { 
  ChevronLeft, 
  MessageCircle, 
  Heart, 
  Shield, 
  CloudRain,
  Brain,
  Zap,
  Users,
  Briefcase,
  Moon,
  Baby,
  Flame,
  Frown,
  TrendingUp,
  HeartPulse,
  Sparkles,
  UtensilsCrossed,
  RefreshCw,
  Star,
  Mail,
  Smile,
  Wind,
  Compass,
  Play,
  Pen,
  Newspaper,
  Lightbulb,
  BookMarked,
  Activity,
  Target,
  Pause,
  HelpCircle,
  ArrowRight,
  Search
} from "lucide-react";

interface TopicCard {
  id: string;
  icon: any;
  labelKey: string;
  bgColor: string;
  iconColor: string;
  url?: string;
}

const topicCards: TopicCard[] = [
  { id: "depression", icon: CloudRain, labelKey: "topics.depression.label", bgColor: "#E0F2FE", iconColor: "#0EA5E9" },
  { id: "anxiety", icon: Brain, labelKey: "topics.anxiety.label", bgColor: "#E0F7FA", iconColor: "#00BCD4" },
  { id: "stress", icon: Zap, labelKey: "topics.stress.label", bgColor: "#FFF4E5", iconColor: "#FFB347" },
  { id: "adolescent", icon: Users, labelKey: "topics.adolescent.label", bgColor: "#E8F8F5", iconColor: "#34D399" },
  { id: "relationship", icon: Heart, labelKey: "topics.relationship.label", bgColor: "#FFEBF0", iconColor: "#FF6B9D" },
  { id: "workplace", icon: Briefcase, labelKey: "topics.workplace.label", bgColor: "#F1F5F9", iconColor: "#64748B" },
  { id: "sleep", icon: Moon, labelKey: "topics.sleep.label", bgColor: "#F0F9FF", iconColor: "#0EA5E9" },
  { id: "parenting", icon: Baby, labelKey: "topics.parenting.label", bgColor: "#FCE7F3", iconColor: "#EC4899" },
  { id: "anger", icon: Flame, labelKey: "topics.anger.label", bgColor: "#FFF0EB", iconColor: "#F97316" },
  { id: "grief", icon: Frown, labelKey: "topics.grief.label", bgColor: "#F1F5F9", iconColor: "#475569" },
  { id: "ptsd", icon: Shield, labelKey: "topics.ptsd.label", bgColor: "#E6FAF5", iconColor: "#14B8A6" },
  { id: "acceptance", icon: TrendingUp, labelKey: "topics.acceptance.label", bgColor: "#E0F7FA", iconColor: "#00BCD4" },
  { id: "postpartum", icon: HeartPulse, labelKey: "topics.postpartum.label", bgColor: "#F0F9FF", iconColor: "#0EA5E9" },
  { id: "sexuality", icon: Sparkles, labelKey: "topics.sexuality.label", bgColor: "#E0F2FE", iconColor: "#0EA5E9" },
  { id: "eating-disorder", icon: UtensilsCrossed, labelKey: "topics.eating-disorder.label", bgColor: "#F7FEE7", iconColor: "#84CC16" },
  { id: "ocd", icon: RefreshCw, labelKey: "topics.ocd.label", bgColor: "#DBEAFE", iconColor: "#3B82F6" },
];

const toolCards: TopicCard[] = [
  { id: "box-breathing", icon: Wind, labelKey: "tools.box-breathing", bgColor: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)", iconColor: "#00BCD4", url: "/exercises/box-breathing" },
  { id: "gratitude-tracker", icon: Star, labelKey: "tools.gratitude-tracker", bgColor: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)", iconColor: "#F9A825", url: "/trackers/gratitude-tracker" },
  { id: "deep-breathing", icon: Activity, labelKey: "tools.deep-breathing", bgColor: "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)", iconColor: "#EC407A", url: "/exercises/4-6-8-breathing" },
  { id: "affirmations", icon: Smile, labelKey: "tools.affirmations", bgColor: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)", iconColor: "#0EA5E9", url: "/tools/affirmations" },
  { id: "mindful-space", icon: Compass, labelKey: "tools.mindful-space", bgColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)", iconColor: "#66BB6A", url: "/tools/joyful-activities" },
  { id: "letter-to-self", icon: Mail, labelKey: "tools.letter-to-self", bgColor: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)", iconColor: "#FF9800", url: "/tools/a-letter-to-self" },
];

const topicDetails: Record<string, {
  descKey: string;
  guidedSeriesUrl?: string;
  exercises: { titleKey: string; icon: any; url?: string; action?: string }[];
  todos: { titleKey: string; icon: any; url?: string }[];
  resources: { titleKey: string; count: number; icon: any; url?: string }[];
}> = {
  depression: {
    descKey: "topics.depression.desc",
    guidedSeriesUrl: "https://app.mantracare.com/therapy/depression/depr-guided-series/",
    exercises: [
      { titleKey: "exercises.5_4_3_2_1_grounding", icon: Compass, url: "/exercises/5-4-3-2-1-grounding" },
      { titleKey: "exercises.guided_imagery", icon: Play, url: "https://web.mantracare.com/mindfulness/media/203/1", action: 'guided' },
      { titleKey: "tools.affirmations", icon: Smile, url: "/tools/affirmations" },
      { titleKey: "tools.mindful-space", icon: Sparkles, url: "/tools/joyful-activities" },
    ],
    todos: [
      { titleKey: "tools.gratitude-tracker", icon: Star, url: "/trackers/gratitude-tracker" },
      { titleKey: "tools.care_tracker", icon: Heart, url: "/trackers/care-tracker" },
      { titleKey: "tools.know_values", icon: Brain, url: "/tools/know-your-values" },
      { titleKey: "tools.letter-to-self", icon: Mail, url: "/tools/a-letter-to-self" },
    ],
    resources: [
      { titleKey: "hub.articles", count: 35, icon: Newspaper, url: "/resources/depression/articles" },
      { titleKey: "hub.tips", count: 25, icon: Lightbulb, url: "/tips/depression-tips" },
      { titleKey: "hub.stories", count: 18, icon: BookMarked, url: "/resources/depression/stories" },
      { titleKey: "hub.myths", count: 12, icon: HelpCircle, url: "/resources/depression/myths" },
    ],
  },
  anxiety: {
    descKey: "topics.anxiety.desc",
    guidedSeriesUrl: "https://app.mantracare.com/therapy/anxiety/anx-guided-series/",
    exercises: [
      { titleKey: "tools.box-breathing", icon: Wind, url: "/exercises/box-breathing" },
      { titleKey: "tools.deep-breathing", icon: Play, url: "/exercises/4-6-8-breathing" },
      { titleKey: "exercises.grounding_technique", icon: Compass, url: "/exercises/grounding-technique" },
      { titleKey: "exercises.diffusion_technique", icon: Brain, url: "/exercises/diffusion-technique" },
    ],
    todos: [
      { titleKey: "trackers.vibe_tracker", icon: TrendingUp, url: "/trackers/vibe-tracker" },
      { titleKey: "tools.know_values", icon: Brain, url: "/tools/know-your-values" },
      { titleKey: "exercises.diffusion_technique", icon: RefreshCw, url: "/exercises/diffusion-technique" },
      { titleKey: "tools.care_tracker", icon: Heart, url: "/trackers/care-tracker" },
    ],
    resources: [
      { titleKey: "hub.articles", count: 30, icon: Newspaper, url: "/resources/anxiety/articles" },
      { titleKey: "hub.tips", count: 22, icon: Lightbulb, url: "/tips/anxiety-tips" },
      { titleKey: "hub.stories", count: 15, icon: BookMarked, url: "/tools/real-stories-to-overcome-anxiety" },
      { titleKey: "hub.myths", count: 10, icon: HelpCircle, url: "/resources/anxiety/myths" },
    ],
  },
  stress: {
    descKey: "topics.stress.desc",
    guidedSeriesUrl: "https://app.mantracare.com/therapy/stress-home/strs-guided-series/",
    exercises: [
      { titleKey: "tools.box-breathing", icon: Wind, url: "/exercises/box-breathing" },
      { titleKey: "exercises.guided_imagery", icon: Play, url: "https://web.mantracare.com/mindfulness/media/203/1", action: 'guided' },
      { titleKey: "tools.doodle_burst", icon: Pen, url: "/tools/doodle-burst" },
      { titleKey: "exercises.5_4_3_2_1_grounding", icon: Compass, url: "/exercises/5-4-3-2-1-grounding" },
    ],
    todos: [
      { titleKey: "trackers.energy_tracker", icon: Zap, url: "/trackers/energy-tracker" },
      { titleKey: "tools.care_tracker", icon: Heart, url: "/trackers/care-tracker" },
      { titleKey: "tools.know_values", icon: Brain, url: "/tools/know-your-values" },
      { titleKey: "tools.environment_optimization", icon: Compass, url: "/tools/environment-optimization" },
    ],
    resources: [
      { titleKey: "hub.articles", count: 28, icon: Newspaper, url: "/resources/stress/articles" },
      { titleKey: "hub.tips", count: 20, icon: Lightbulb, url: "/tips/stress-tips" },
      { titleKey: "hub.stories", count: 10, icon: BookMarked, url: "/resources/stress/stories" },
      { titleKey: "hub.myths", count: 6, icon: HelpCircle, url: "/resources/stress/myths" },
    ],
  },
};

export function SelfCareResources() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handlePopState = () => {
      if (selectedTopic === null) {
        handlePlatformExit();
      } else {
        setSelectedTopic(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedTopic]);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  const filteredTopics = topicCards.filter(topic => 
    t(topic.labelKey).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F6F8FB]">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-4xl w-full mx-auto px-4 md:px-6 py-6 pt-10">
          <AnimatePresence mode="wait">
            {selectedTopic ? (() => {
              const topic = topicCards.find(t => t.id === selectedTopic)!;
              const detail = topicDetails[selectedTopic] || { 
                descKey: `topics.${selectedTopic}.desc`, 
                exercises: [], 
                todos: [], 
                resources: [] 
              };
              return (
                <motion.div
                  key="topic-detail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <button
                    onClick={() => setSelectedTopic(null)}
                    className="flex items-center gap-2 text-[#64748B] hover:text-[#020817] transition-colors group mb-4"
                  >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">{t("hub.back_to_topics")}</span>
                  </button>

                  <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-[#020817]">{t(topic.labelKey)}</h1>
                    <p className="text-base text-[#64748B] leading-relaxed max-w-2xl">{t(detail.descKey)}</p>
                  </div>

                  {detail.guidedSeriesUrl && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-[#020817]">{t("hub.guided_series")}</h2>
                      <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => window.location.href = detail.guidedSeriesUrl!}
                        className="w-full bg-[#F5FBFF] border-2 border-[#E0F2FE] rounded-2xl p-6 flex items-center justify-between hover:border-primary hover:shadow-lg transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                            <Play size={20} className="text-white fill-current" />
                          </div>
                          <div className="text-left">
                            <span className="block font-bold text-[#020817]">{t("hub.start_guided_series")}</span>
                            <span className="text-xs text-[#64748B]">Step-by-step therapeutic journey</span>
                          </div>
                        </div>
                        <ArrowRight size={20} className="text-[#64748B] group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  )}

                  {detail.exercises.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-[#020817]">{t("hub.exercises")}</h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {detail.exercises.map((ex, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ y: -4 }}
                            onClick={() => ex.url?.startsWith('http') ? window.location.href = ex.url : navigate(ex.url!, { replace: true })}
                            className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all text-left space-y-3"
                          >
                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                              <ex.icon size={20} />
                            </div>
                            <p className="text-sm font-bold text-slate-800 leading-tight">{t(ex.titleKey)}</p>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {detail.todos.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-[#020817]">{t("hub.todos")}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {detail.todos.map((todo, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ x: 4 }}
                            onClick={() => todo.url?.startsWith('http') ? (window.location.href = todo.url) : navigate(todo.url!, { replace: true })}
                            className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-4 hover:border-primary/20 transition-all"
                          >
                            <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center">
                              <todo.icon size={20} />
                            </div>
                            <span className="font-semibold text-slate-700">{t(todo.titleKey)}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {detail.resources && detail.resources.length > 0 && (
                    <div className="space-y-6 pt-4">
                      <h2 className="text-xl font-bold text-[#020817]">{t("hub.resources")}</h2>
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
                              onClick={() => res.url?.startsWith('http') ? window.location.href = res.url : navigate(res.url!, { replace: true })}
                              className="w-full rounded-2xl p-4 flex items-center gap-4 transition-all group relative overflow-hidden text-left"
                              style={{ backgroundColor: color.bg }}
                            >
                              <div className="absolute left-0 top-0 bottom-0 w-1 group-hover:w-1.5 transition-all" style={{ backgroundColor: color.accent }}></div>
                              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform relative z-10" style={{ backgroundColor: color.iconBg }}>
                                <ResIcon size={22} style={{ color: color.accent }} />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-sm font-semibold text-[#020817] mb-0.5 leading-tight">{t(res.titleKey)}</h3>
                                <div className="flex items-center gap-2">
                                  <div className="h-1 w-12 rounded-full group-hover:w-16 transition-all" style={{ backgroundColor: color.bar }}></div>
                                  <span className="text-xs text-[#64748B] opacity-0 group-hover:opacity-100 transition-opacity">{t("hub.view_resource")}</span>
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
              );
            })() : (
              <motion.div
                key="main-hub"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <button onClick={handlePlatformExit} className="p-2 -ml-2 text-slate-400 hover:text-slate-600">
                      <ChevronLeft size={24} />
                    </button>
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Sparkles size={20} className="text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">{t("hub.self_care_resources")}</h1>
                  </div>
                  <p className="text-slate-500 font-medium ml-12">{t("hub.explore_tools")}</p>
                </div>

                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type="text"
                    placeholder={t("hub.search_placeholder")}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-slate-900">{t("hub.tools")}</h2>
                  <motion.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 md:grid-cols-6 gap-4"
                  >
                    {toolCards.map((tool) => (
                      <motion.button
                        key={tool.id}
                        variants={item}
                        whileHover={{ y: -2 }}
                        onClick={() => tool.url?.startsWith('http') ? (window.location.href = tool.url) : navigate(tool.url!, { replace: true })}
                        className="p-5 rounded-2xl text-white flex flex-col justify-between h-28 shadow-sm relative overflow-hidden group"
                        style={{ background: tool.bgColor }}
                      >
                        <tool.icon size={28} className="relative z-10" />
                        <span className="text-[11px] font-bold uppercase tracking-tight text-left leading-tight relative z-10">{t(tool.labelKey)}</span>
                        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform">
                          <tool.icon size={80} />
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-slate-900">{t("hub.topics")}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {filteredTopics.map((topic) => (
                      <motion.button
                        key={topic.id}
                        whileHover={{ y: -2 }}
                        onClick={() => topic.url ? (window.location.href = topic.url) : setSelectedTopic(topic.id)}
                        className="p-6 bg-white border border-slate-100 rounded-2xl flex flex-col items-center gap-4 transition-all hover:shadow-md"
                      >
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: topic.bgColor }}>
                          <topic.icon size={28} style={{ color: topic.iconColor }} />
                        </div>
                        <span className="font-semibold text-slate-700 text-sm">{t(topic.labelKey)}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
