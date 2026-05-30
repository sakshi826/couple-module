import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Send, CheckCircle2, History, Plus, X, Book, Target, Smile, Star } from 'lucide-react';
import { neon } from '@neondatabase/serverless';
import Loader from '../../components/Loader';
import { COLORS } from '../../misc/Colors';
import { useTranslation } from "react-i18next";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

const GUIDANCE_CONTENT: Record<string, {
  title: string;
  sections: Array<{
    title: string;
    type: 'text' | 'bullets';
    content: string | string[];
    bg: string;
    border: string;
    text: string;
    iconColor: string;
  }>;
  takeaway: string;
}> = {
  'growing-apart': {
    title: "Growing Apart",
    sections: [
      {
        title: "Understanding Growing Apart",
        type: 'text',
        content: "Most couples don't drift apart overnight. Distance often develops gradually through busy schedules, reduced communication, unresolved disappointments, and fewer shared experiences.",
        bg: "bg-blue-50/50",
        border: "border-blue-100",
        text: "text-blue-900",
        iconColor: "text-blue-500"
      },
      {
        title: "Common Signs",
        type: 'bullets',
        content: [
          "Conversations become mostly logistical.",
          "Quality time decreases.",
          "Partners stop sharing thoughts and feelings.",
          "Affection and appreciation become less frequent.",
          "Small misunderstandings feel harder to resolve."
        ],
        bg: "bg-slate-50/60",
        border: "border-slate-100",
        text: "text-slate-900",
        iconColor: "text-slate-500"
      },
      {
        title: "Why It Happens",
        type: 'text',
        content: "Relationships require ongoing attention. Major life transitions, work stress, parenting responsibilities, and personal challenges can unintentionally reduce connection.",
        bg: "bg-purple-50/50",
        border: "border-purple-100",
        text: "text-purple-900",
        iconColor: "text-purple-500"
      },
      {
        title: "Rebuilding Connection",
        type: 'bullets',
        content: [
          "Schedule dedicated time together each week.",
          "Show curiosity about your partner's experiences.",
          "Share small daily moments, not just major events.",
          "Express appreciation regularly."
        ],
        bg: "bg-emerald-50/50",
        border: "border-emerald-100",
        text: "text-emerald-900",
        iconColor: "text-emerald-500"
      }
    ],
    takeaway: "Growing apart is often a gradual process, which means reconnection can also happen through small, consistent efforts."
  },
  'small-fights': {
    title: "Why Small Fights Become Big",
    sections: [
      {
        title: "Understanding Escalation",
        type: 'text',
        content: "Many major conflicts begin with minor frustrations. The issue itself is often less important than the emotions underneath it.",
        bg: "bg-blue-50/50",
        border: "border-blue-100",
        text: "text-blue-900",
        iconColor: "text-blue-500"
      },
      {
        title: "Common Escalation Patterns",
        type: 'bullets',
        content: [
          "Defensiveness",
          "Criticism",
          "Assumptions about intentions",
          "Bringing up past conflicts",
          "Refusing to listen"
        ],
        bg: "bg-slate-50/60",
        border: "border-slate-100",
        text: "text-slate-900",
        iconColor: "text-slate-500"
      },
      {
        title: "What's Really Happening?",
        type: 'text',
        content: "Small disagreements can trigger deeper needs related to feeling respected, understood, valued, or emotionally safe.",
        bg: "bg-purple-50/50",
        border: "border-purple-100",
        text: "text-purple-900",
        iconColor: "text-purple-500"
      },
      {
        title: "Healthier Conflict Habits",
        type: 'bullets',
        content: [
          "Focus on one issue at a time.",
          "Listen before responding.",
          "Use calm and specific language.",
          "Address concerns early rather than letting resentment build."
        ],
        bg: "bg-emerald-50/50",
        border: "border-emerald-100",
        text: "text-emerald-900",
        iconColor: "text-emerald-500"
      }
    ],
    takeaway: "Successful couples are not conflict-free. They learn how to manage disagreements without damaging connection."
  },
  'lonely-love': {
    title: "Loving Someone But Feeling Lonely",
    sections: [
      {
        title: "Understanding Relationship Loneliness",
        type: 'text',
        content: "A person can deeply love their partner and still feel emotionally disconnected. Physical presence does not always create emotional closeness.",
        bg: "bg-blue-50/50",
        border: "border-blue-100",
        text: "text-blue-900",
        iconColor: "text-blue-500"
      },
      {
        title: "Possible Causes",
        type: 'bullets',
        content: [
          "Limited emotional conversations",
          "Different intimacy needs",
          "Stress and life pressures",
          "Feeling misunderstood",
          "Lack of shared experiences"
        ],
        bg: "bg-slate-50/60",
        border: "border-slate-100",
        text: "text-slate-900",
        iconColor: "text-slate-500"
      },
      {
        title: "Signs of Emotional Loneliness",
        type: 'bullets',
        content: [
          "Feeling unseen or unheard",
          "Hesitating to share feelings",
          "Missing emotional support",
          "Feeling disconnected despite spending time together"
        ],
        bg: "bg-purple-50/50",
        border: "border-purple-100",
        text: "text-purple-900",
        iconColor: "text-purple-500"
      },
      {
        title: "Strengthening Emotional Intimacy",
        type: 'bullets',
        content: [
          "Create distraction-free time together.",
          "Discuss feelings, not just events.",
          "Share personal hopes, fears, and experiences.",
          "Build rituals of connection."
        ],
        bg: "bg-emerald-50/50",
        border: "border-emerald-100",
        text: "text-emerald-900",
        iconColor: "text-emerald-500"
      }
    ],
    takeaway: "Loneliness in relationships is often a signal that emotional connection needs attention, not necessarily that love is absent."
  },
  'breaking-point': {
    title: "When Relationships Reach Breaking Point",
    sections: [
      {
        title: "Understanding Breaking Points",
        type: 'text',
        content: "Every relationship faces challenges. A breaking point is reached when ongoing issues overwhelm the couple's ability to feel connected, hopeful, or secure.",
        bg: "bg-blue-50/50",
        border: "border-blue-100",
        text: "text-blue-900",
        iconColor: "text-blue-500"
      },
      {
        title: "Warning Signs",
        type: 'bullets',
        content: [
          "Constant unresolved conflict",
          "Loss of trust",
          "Emotional withdrawal",
          "Feeling hopeless about improvement",
          "Repeated cycles of the same problems"
        ],
        bg: "bg-slate-50/60",
        border: "border-slate-100",
        text: "text-slate-900",
        iconColor: "text-slate-500"
      },
      {
        title: "Important Considerations",
        type: 'text',
        content: "Not every relationship at a breaking point must end. Sometimes couples need new tools, support, boundaries, or a different way of relating.",
        bg: "bg-purple-50/50",
        border: "border-purple-100",
        text: "text-purple-900",
        iconColor: "text-purple-500"
      },
      {
        title: "Paths Forward",
        type: 'bullets',
        content: [
          "Honest conversations about needs and expectations",
          "Rebuilding trust through consistent actions",
          "Establishing healthier boundaries",
          "Seeking professional support when needed"
        ],
        bg: "bg-emerald-50/50",
        border: "border-emerald-100",
        text: "text-emerald-900",
        iconColor: "text-emerald-500"
      }
    ],
    takeaway: "A breaking point can become an opportunity for clarity, growth, and intentional decision-making about the future of the relationship."
  }
};

export default function GuidedActivity() {
  const { t } = useTranslation();
  const { concern, activityName } = useParams<{ concern: string; activityName: string }>();
  const navigate = useNavigate();
  const [reflection, setReflection] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const decodedName = decodeURIComponent(activityName || '');
  const userId = sessionStorage.getItem("user_id");

  // Specialized UI Type Detection
  const getUiType = () => {
    const n = decodedName.toLowerCase();
    if (n.includes('thought record')) return 'THOUGHT_RECORD';
    if (n.includes('reframe') || n.includes('transforming')) return 'REFRAME';
    if (n.includes('check') || n.includes('signs') || n.includes('checklist')) return 'CHECKLIST';
    if (n.includes('mood') || n.includes('stress') || n.includes('grief')) return 'ASSESSMENT';
    if (n.includes('log') || n.includes('habit')) return 'LOG';
    // Detect Relationship Guidance activities
    const guidanceActivities = ['growing-apart', 'growing apart', 'small-fights', 'small fights', 'lonely-love', 'lonely love', 'breaking-point', 'breaking point'];
    if (guidanceActivities.some(act => n.includes(act))) return 'GUIDANCE';
    return 'DEFAULT';
  };

  const uiType = getUiType();
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (userId && DATABASE_URL) {
      fetchHistory();
    }
  }, [userId, decodedName]);

  const fetchHistory = async () => {
    try {
      const sql = neon(DATABASE_URL!);
      const rows = await sql`
        SELECT entry_data, created_at 
        FROM guided_series_logs 
        WHERE user_id = ${userId} AND activity_name = ${decodedName} 
        ORDER BY created_at DESC 
        LIMIT 5
      `;
      setHistory(rows);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    }
  };

  const handleSave = async () => {
    const finalData = uiType === 'DEFAULT' ? { reflection } : formData;
    if (!userId || !DATABASE_URL) return;

    setIsSaving(true);
    try {
      const sql = neon(DATABASE_URL!);
      await sql`
        INSERT INTO guided_series_logs (user_id, concern, activity_name, entry_data)
        VALUES (${userId}, ${concern}, ${decodedName}, ${JSON.stringify(finalData)})
      `;
      setSaveSuccess(true);
      setReflection('');
      setFormData({});
      fetchHistory();
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const renderSpecializedUI = () => {
    switch (uiType) {
      case 'THOUGHT_RECORD':
        return (
          <div className="space-y-5">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <label className="text-[13px] font-bold text-slate-400 uppercase mb-2 block">{(typeof t !== "undefined" ? t : (k) => k)("the_situation")}</label>
              <input type="text" placeholder={(typeof t !== "undefined" ? t : (k) => k)("what_happened")} className="w-full bg-transparent outline-none text-slate-700 font-medium" 
                onChange={(e) => setFormData({...formData, situation: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <label className="text-[13px] font-bold text-slate-400 uppercase mb-2 block">{(typeof t !== "undefined" ? t : (k) => k)("emotion")}</label>
                <input type="text" placeholder={(typeof t !== "undefined" ? t : (k) => k)("e_g_anxiety")} className="w-full bg-transparent outline-none text-slate-700 font-medium"
                  onChange={(e) => setFormData({...formData, emotion: e.target.value})} />
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <label className="text-[13px] font-bold text-slate-400 uppercase mb-2 block">{(typeof t !== "undefined" ? t : (k) => k)("intensity")}</label>
                <input type="number" placeholder={(typeof t !== "undefined" ? t : (k) => k)("1_10")} className="w-full bg-transparent outline-none text-slate-700 font-medium"
                  onChange={(e) => setFormData({...formData, intensity: e.target.value})} />
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <label className="text-[13px] font-bold text-slate-400 uppercase mb-2 block">{(typeof t !== "undefined" ? t : (k) => k)("automatic_thought")}</label>
              <textarea placeholder={(typeof t !== "undefined" ? t : (k) => k)("what_was_your_mind_telling_you")} className="w-full bg-transparent outline-none text-slate-700 font-medium h-20 resize-none"
                onChange={(e) => setFormData({...formData, thought: e.target.value})} />
            </div>
          </div>
        );
      case 'REFRAME':
        return (
          <div className="space-y-4">
            <div className="p-6 bg-red-50/50 rounded-3xl border border-red-100">
              <h4 className="text-red-800 font-bold mb-3 flex items-center gap-2">
                <X size={16} />{(typeof t !== "undefined" ? t : (k) => k)("negative_thought")}</h4>
              <textarea placeholder={(typeof t !== "undefined" ? t : (k) => k)("the_original_thought")} className="w-full bg-white/60 p-4 rounded-xl border border-red-100 outline-none h-20 resize-none"
                onChange={(e) => setFormData({...formData, negative: e.target.value})} />
            </div>
            <div className="p-6 bg-green-50/50 rounded-3xl border border-green-100">
              <h4 className="text-green-800 font-bold mb-3 flex items-center gap-2">
                <Plus size={16} />{(typeof t !== "undefined" ? t : (k) => k)("empowered_reframe")}</h4>
              <textarea placeholder={(typeof t !== "undefined" ? t : (k) => k)("the_more_balanced_view")} className="w-full bg-white/60 p-4 rounded-xl border border-green-100 outline-none h-20 resize-none"
                onChange={(e) => setFormData({...formData, positive: e.target.value})} />
            </div>
          </div>
        );
      case 'CHECKLIST':
        const options = decodedName.includes('Postpartum') ? 
          [t('checklist.low_mood', 'Low mood'), t('checklist.anxiety', 'Anxiety'), t('checklist.sleep_issues', 'Sleep issues'), t('checklist.fatigue', 'Fatigue'), t('checklist.irritability', 'Irritability')] :
          [t('checklist.feeling_trapped', 'Feeling trapped'), t('checklist.lack_of_interest', 'Lack of interest'), t('checklist.changes_in_appetite', 'Changes in appetite'), t('checklist.sleep_disturbance', 'Sleep disturbance'), t('checklist.negative_self_talk', 'Negative self-talk')];
        
        return (
          <div className="space-y-3">
            <p className="text-slate-500 text-sm mb-4">{(typeof t !== "undefined" ? t : (k) => k)("select_all_that_apply_to_you_currently")}</p>
            {options.map((opt) => (
              <button 
                key={opt}
                onClick={() => {
                  const current = formData.checked || [];
                  const next = current.includes(opt) ? current.filter((c: any) => c !== opt) : [...current, opt];
                  setFormData({...formData, checked: next});
                }}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  (formData.checked || []).includes(opt) 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' 
                    : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-slate-200'
                }`}
              >
                <span className="font-medium">{opt}</span>
                {(formData.checked || []).includes(opt) && <CheckCircle2 size={18} />}
              </button>
            ))}
          </div>
        );
      case 'ASSESSMENT':
        return (
          <div className="space-y-6">
            <div className="text-center py-4">
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6">{(typeof t !== "undefined" ? t : (k) => k)("intensity_level")}</p>
              <div className="flex justify-between max-w-sm mx-auto">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setFormData({...formData, rating: num})}
                    className={`w-12 h-12 rounded-2xl font-black text-lg transition-all ${
                      formData.rating === num 
                        ? 'bg-blue-600 text-white scale-110 shadow-xl' 
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="flex justify-between max-w-sm mx-auto mt-2 px-1">
                <span className="text-[10px] font-bold text-slate-300">{(typeof t !== "undefined" ? t : (k) => k)("low")}</span>
                <span className="text-[10px] font-bold text-slate-300">{(typeof t !== "undefined" ? t : (k) => k)("high")}</span>
              </div>
            </div>
            <textarea 
              value={reflection}
              onChange={(e) => {
                setReflection(e.target.value);
                setFormData({...formData, note: e.target.value});
              }}
              placeholder={(typeof t !== "undefined" ? t : (k) => k)("start_typing_your_reflection_here")} 
              className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl outline-none h-40 resize-none text-slate-700"
            />
          </div>
        );
      case 'GUIDANCE':
        const normKey = decodedName.toLowerCase().replace(/ /g, '-');
        const data = GUIDANCE_CONTENT[normKey] || GUIDANCE_CONTENT[Object.keys(GUIDANCE_CONTENT).find(k => normKey.includes(k)) || 'growing-apart'];

        return (
          <div className="space-y-8 text-left">
            {data.sections.map((sec, index) => {
              const IconComponent = index === 0 ? Book : (index === 1 ? Target : (index === 2 ? Smile : Star));
              return (
                <div key={sec.title} className={`${sec.bg} p-6 rounded-[2rem] border ${sec.border}`}>
                  <h3 className={`${sec.text} font-extrabold text-lg mb-3 flex items-center gap-2`}>
                    <IconComponent size={20} className={sec.iconColor} />
                    {sec.title}
                  </h3>
                  {sec.type === 'bullets' && Array.isArray(sec.content) ? (
                    <ul className="space-y-2">
                      {sec.content.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">
                      {sec.content}
                    </p>
                  )}
                </div>
              );
            })}

            {/* Key Takeaway Section */}
            {data.takeaway && (
              <div className="bg-amber-50/50 p-6 rounded-[2rem] border border-amber-100">
                <h3 className="text-amber-900 font-extrabold text-base mb-2 flex items-center gap-2">
                  <Star size={18} className="text-amber-500 fill-amber-500" />
                  Key Takeaway
                </h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  {data.takeaway}
                </p>
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder={(typeof t !== "undefined" ? t : (k) => k)("start_typing_your_reflection_here")}
              className="w-full h-64 p-8 bg-[#F8FAFC] border border-slate-100 rounded-[32px] focus:ring-4 focus:ring-blue-100/50 focus:border-blue-400 transition-all resize-none text-slate-700 text-lg placeholder:text-slate-300 leading-relaxed"
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10 font-sans">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              navigate(-1);
            }}
            className="p-2.5 hover:bg-slate-100 rounded-full transition-colors bg-slate-50"
          >
            <ChevronLeft size={20} className="text-slate-600" />
          </button>
          <h1 className="text-lg font-bold text-slate-800 truncate max-w-[200px]">{(typeof t !== "undefined" ? t : (k) => k)("hub.guided_series")}</h1>
        </div>
        {uiType !== 'GUIDANCE' && (
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="p-2.5 hover:bg-slate-100 rounded-full transition-colors bg-slate-50 relative"
          >
            <History size={20} className={showHistory ? "text-blue-500" : "text-slate-400"} />
          </button>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[40px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100"
        >
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight leading-tight">{t(`guided_series.${decodedName}`, decodedName)}</h2>
            <p className="text-slate-400 leading-relaxed font-medium text-[16px]">
              {uiType === 'GUIDANCE' 
                ? "Read through these relationship insights and guidelines to support your connection."
                : (typeof t !== "undefined" ? t : (k) => k)("take_a_moment_to_reflect_on_this_activity_use_the_")
              }
            </p>
          </div>

          <div className="relative">
            {renderSpecializedUI()}
            
            <AnimatePresence>
              {saveSuccess && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-white/98 rounded-[32px] backdrop-blur-md z-10"
                >
                  <div className="text-center">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={48} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">{(typeof t !== "undefined" ? t : (k) => k)("entry_saved")}</h3>
                    <p className="text-slate-400 mt-2 font-medium">{(typeof t !== "undefined" ? t : (k) => k)("your_progress_is_safely_recorded")}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {uiType === 'GUIDANCE' ? (
            <button
              onClick={() => navigate(-1)}
              className="w-full mt-10 py-6 rounded-[24px] flex items-center justify-center gap-3 text-lg font-black transition-all active:scale-[0.98] bg-slate-900 text-white hover:bg-black shadow-2xl shadow-slate-200"
            >
              <ChevronLeft size={20} className="opacity-70" />
              {(typeof t !== "undefined" ? t : (k) => k)("back_to_topics", "Back to Guided Series")}
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`w-full mt-10 py-6 rounded-[24px] flex items-center justify-center gap-3 text-lg font-black transition-all active:scale-[0.98] ${
                !isSaving 
                  ? 'bg-slate-900 text-white hover:bg-black shadow-2xl shadow-slate-200' 
                  : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
              }`}
            >
              {isSaving ? (
                <Loader size={24} color="#ffffff" />
              ) : (
                <>
                  <Send size={20} className="opacity-70" />{(typeof t !== "undefined" ? t : (k) => k)("save_reflection")}</>
              )}
            </button>
          )}
        </motion.div>

        {/* History Section */}
        {uiType !== 'GUIDANCE' && (
          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12"
              >
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-4">{(typeof t !== "undefined" ? t : (k) => k)("previous_records")}</h3>
                
                {history.length > 0 ? (
                  <div className="space-y-4">
                    {history.map((entry, idx) => (
                      <div key={idx} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                            {new Date(entry.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <div className="space-y-3">
                          {Object.entries(entry.entry_data).map(([key, val]: [string, any]) => (
                            <div key={key} className="flex flex-col gap-1">
                              <span className="text-[10px] font-black text-slate-300 uppercase tracking-wider">{key}</span>
                              <span className="text-slate-700 font-medium leading-relaxed">{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-100/30 rounded-[32px] p-12 text-center border border-dashed border-slate-200">
                    <p className="text-slate-400 text-sm font-bold">{(typeof t !== "undefined" ? t : (k) => k)("no_history_available_yet")}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
