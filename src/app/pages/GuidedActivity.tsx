import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Send, CheckCircle2, History } from 'lucide-react';
import { neon } from '@neondatabase/serverless';
import Loader from '../components/Loader';
import { COLORS } from '../misc/Colors';

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

export default function GuidedActivity() {
  const { concern, activityName } = useParams<{ concern: string; activityName: string }>();
  const navigate = useNavigate();
  const [reflection, setReflection] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const decodedName = decodeURIComponent(activityName || '');
  const userId = sessionStorage.getItem("user_id");

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
    if (!reflection.trim() || !userId || !DATABASE_URL) return;

    setIsSaving(true);
    try {
      const sql = neon(DATABASE_URL!);
      await sql`
        INSERT INTO guided_series_logs (user_id, concern, activity_name, entry_data)
        VALUES (${userId}, ${concern}, ${decodedName}, ${JSON.stringify({ reflection })})
      `;
      setSaveSuccess(true);
      setReflection('');
      fetchHistory();
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save your reflection. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronLeft size={20} className="text-slate-600" />
          </button>
          <h1 className="text-lg font-semibold text-slate-800 truncate max-w-[200px]">
            {decodedName}
          </h1>
        </div>
        <button 
          onClick={() => setShowHistory(!showHistory)}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors relative"
        >
          <History size={20} className={showHistory ? "text-blue-500" : "text-slate-400"} />
          {history.length > 0 && !showHistory && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
          )}
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">{decodedName}</h2>
            <p className="text-slate-500 leading-relaxed text-lg">
              Take a moment to reflect on this activity. Use the space below to write down your thoughts, feelings, or findings.
            </p>
          </div>

          <div className="relative">
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Start typing your reflection here..."
              className="w-full h-64 p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all resize-none text-slate-700 text-lg placeholder:text-slate-400"
            />
            
            <AnimatePresence>
              {saveSuccess && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-2xl backdrop-blur-sm z-10"
                >
                  <div className="text-center">
                    <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-800">Reflection Saved!</h3>
                    <p className="text-slate-500 mt-2">Your journey is being recorded.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={handleSave}
            disabled={!reflection.trim() || isSaving}
            className={`w-full mt-8 py-5 rounded-2xl flex items-center justify-center gap-3 text-lg font-bold transition-all shadow-lg shadow-blue-100 active:scale-[0.98] ${
              reflection.trim() && !isSaving 
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            {isSaving ? (
              <Loader size={24} color="#ffffff" />
            ) : (
              <>
                <Send size={20} />
                Save Reflection
              </>
            )}
          </button>
        </motion.div>

        {/* History Sidebar/Section */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 overflow-hidden"
            >
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Past Reflections</h3>
              {history.length > 0 ? (
                <div className="space-y-4">
                  {history.map((entry, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-medium text-slate-400">
                          {new Date(entry.created_at).toLocaleDateString(undefined, { 
                            month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      <p className="text-slate-600 italic leading-relaxed">
                        "{entry.entry_data.reflection}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-100/50 rounded-2xl p-8 text-center border border-dashed border-slate-200">
                  <p className="text-slate-400 text-sm">No previous entries yet.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
