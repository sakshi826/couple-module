import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ChevronRight, BookOpen, Heart, Newspaper, HelpCircle } from 'lucide-react';
import { PremiumLayout } from '../../../components/shared/PremiumLayout';
import sampleData from '../data/sample_data.json';
import { Resource } from '../types';

const ICON_MAP: Record<string, any> = {
  tips: Heart,
  articles: Newspaper,
  stories: BookOpen,
  myths: HelpCircle
};

const ResourceList = () => {
  const { concern, type } = useParams<{ concern: string; type: string }>();
  const navigate = useNavigate();
  
  // Filter data based on concern and type
  const resources = (sampleData as any)[type || '']?.filter((r: any) => r.concern === concern) || [];
  
  const Icon = ICON_MAP[type || 'tips'] || BookOpen;

  return (
    <PremiumLayout title={`${concern?.charAt(0).toUpperCase()}${concern?.slice(1)} ${type}`}>
      <div className="w-full space-y-10 pb-20">
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em]">
            <Sparkles size={14} />
            Self Care {type}
          </div>
          <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight capitalize">
            {concern} {type}
          </h1>
          <p className="text-slate-500 text-base font-bold leading-relaxed max-w-md">
            Explore resources to help you manage {concern} and improve your wellbeing.
          </p>
        </header>

        <div className="grid gap-4">
          {resources.length > 0 ? (
            resources.map((res: Resource, i: number) => (
              <motion.button
                key={res.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.01, x: 5 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => navigate(res.id)}
                className="w-full text-left p-6 rounded-[2.5rem] bg-white border-2 border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all flex items-center gap-6 group"
              >
                <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-all">
                  <Icon className="w-7 h-7 text-slate-300 group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-slate-800 text-lg group-hover:text-primary transition-colors leading-tight">
                    {res.title}
                  </h3>
                  <p className="text-slate-400 text-xs font-bold leading-relaxed mt-1.5 line-clamp-2">
                    {res.preview}
                  </p>
                </div>
                <ChevronRight className="w-6 h-6 text-slate-200 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </motion.button>
            ))
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="text-slate-200 flex justify-center">
                <Icon size={64} strokeWidth={1} />
              </div>
              <p className="text-slate-400 font-bold text-sm">No {type} found for this topic yet.</p>
            </div>
          )}
        </div>
      </div>
    </PremiumLayout>
  );
};

export default ResourceList;
