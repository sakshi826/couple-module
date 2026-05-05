import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, CheckCircle2, Sparkles, Lightbulb, MessageCircle, BookOpen, Clock, Tag, HelpCircle } from 'lucide-react';
import { PremiumLayout } from '../../../components/shared/PremiumLayout';
import sampleData from '../data/sample_data.json';
import { Resource, Tip, Article, Story, Myth } from '../types';

const ResourceDetail = () => {
  const { concern, type, id } = useParams<{ concern: string; type: string; id: string }>();
  const navigate = useNavigate();
  
  const allResources = (sampleData as any)[type || ''] || [];
  const resource = allResources.find((r: any) => r.id === id) as Resource;

  if (!resource) {
    return (
      <PremiumLayout title="Not Found">
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Resource not found</p>
          <button onClick={() => navigate(-1)} className="text-primary font-bold text-sm">Go Back</button>
        </div>
      </PremiumLayout>
    );
  }

  const renderTip = (tip: Tip) => (
    <div className="w-full space-y-10 pb-12">
      <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-10 shadow-sm"
      >
        <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-6">Why It Helps</h2>
        <p className="text-slate-600 text-lg font-bold leading-relaxed">{tip.whyItHelps}</p>
      </motion.section>

      <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-8"
      >
        <h2 className="text-xl font-black text-slate-800 tracking-tight px-2">What You Can Do</h2>
        <div className="grid gap-4">
          {tip.whatYouCanDo.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="flex items-start gap-6 p-8 bg-slate-50 rounded-[2.5rem] border-2 border-transparent hover:bg-white hover:border-primary/20 transition-all group shadow-sm"
            >
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={20} strokeWidth={3} />
              </div>
              <span className="text-slate-700 text-base font-bold leading-relaxed">{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {tip.example && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-10 bg-emerald-50 rounded-[3rem] border-2 border-emerald-100 shadow-sm space-y-8"
        >
          <div className="flex items-center gap-3 text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
              <Lightbulb size={16} fill="currentColor" />
              Example
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Instead of</p>
              <p className="text-emerald-900/60 text-base font-bold leading-relaxed">{tip.example.instead}</p>
            </div>
            <div className="h-0.5 w-12 bg-emerald-100 rounded-full" />
            <div className="space-y-2">
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Try this</p>
              <p className="text-emerald-900 text-xl font-black leading-tight tracking-tight">{tip.example.tryThis}</p>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );

  const renderArticle = (article: Article) => (
    <div className="w-full space-y-10 pb-12">
      <header className="space-y-6">
        <div className="flex items-center gap-4">
          <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <Tag size={12} />
            {article.tag}
          </span>
          <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <Clock size={12} />
            {article.readTime}
          </span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">{article.title}</h1>
        <p className="text-xl text-slate-500 font-bold leading-relaxed border-l-4 border-primary/20 pl-6 italic">
          {article.deck}
        </p>
      </header>

      <article className="prose prose-slate max-w-none">
        <div 
          className="text-slate-700 text-lg leading-relaxed space-y-6 font-medium"
          dangerouslySetInnerHTML={{ __html: article.body }} 
        />
      </article>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-10 bg-slate-900 rounded-[3rem] text-white space-y-6 shadow-2xl"
      >
        <div className="flex items-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">
            <Sparkles size={16} />
            Key Takeaway
        </div>
        <p className="text-slate-200 text-xl font-bold italic leading-relaxed">
          "{article.takeaway}"
        </p>
      </motion.section>
    </div>
  );

  const renderMyth = (myth: Myth) => (
    <div className="w-full space-y-10 pb-12">
      <header className="space-y-6">
        <div className="flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-[0.3em]">
            <HelpCircle size={16} />
            Common Myth
        </div>
        <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">{myth.myth}</h1>
      </header>

      <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/5 rounded-[2.5rem] border-2 border-primary/20 p-10 shadow-sm"
      >
        <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">The Truth</h2>
        <p className="text-slate-800 text-2xl font-black leading-tight tracking-tight">{myth.truth}</p>
      </motion.section>

      <article className="prose prose-slate max-w-none p-10 bg-white rounded-[3rem] border-2 border-slate-100 shadow-sm">
        <div 
          className="text-slate-700 text-lg leading-relaxed space-y-6 font-medium"
          dangerouslySetInnerHTML={{ __html: myth.explanation }} 
        />
      </article>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-10 bg-slate-900 rounded-[3rem] text-white space-y-6 shadow-2xl"
      >
        <div className="flex items-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">
            <Sparkles size={16} />
            Insight
        </div>
        <p className="text-slate-200 text-xl font-bold italic leading-relaxed">
          "{myth.takeaway}"
        </p>
      </motion.section>
    </div>
  );

  const renderStory = (story: Story) => (
    <div className="w-full space-y-12 pb-20">
      <header className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary border-4 border-white shadow-lg">
             <BookOpen size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{story.name}, {story.age}</h1>
            <p className="text-primary font-black text-[10px] uppercase tracking-widest mt-1">{story.identity}</p>
          </div>
        </div>
        
        <div className="relative p-10 bg-white rounded-[3rem] border-2 border-slate-100 shadow-sm overflow-hidden group hover:border-primary/20 transition-all">
          <div className="absolute top-0 right-0 p-8 text-slate-50 pointer-events-none group-hover:text-primary/5 transition-colors">
            <MessageCircle size={100} strokeWidth={1} />
          </div>
          <p className="text-2xl font-black text-slate-800 leading-tight tracking-tight relative z-10 italic">
            "{story.quote}"
          </p>
        </div>
      </header>

      <div className="space-y-8 text-slate-600 text-lg leading-relaxed font-bold">
        {story.story.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-10 bg-primary/5 rounded-[3rem] border-2 border-primary/10 space-y-4"
      >
        <h3 className="text-primary font-black text-[10px] uppercase tracking-[0.3em]">Something to sit with</h3>
        <p className="text-primary font-black text-2xl leading-tight tracking-tight italic">
          "{story.highlight}"
        </p>
      </motion.section>

      <section className="p-10 bg-slate-50 rounded-[3rem] border-2 border-slate-100">
        <p className="text-slate-600 text-base font-bold leading-relaxed">
          {story.takeaway}
        </p>
      </section>
    </div>
  );

  return (
    <PremiumLayout 
      title={resource.title} 
      onSecondaryBack={() => navigate(-1)}
      secondaryBackLabel={`Back to ${type}`}
    >
      <div className="max-w-3xl mx-auto">
        {resource.type === 'tips' && renderTip(resource as Tip)}
        {resource.type === 'articles' && renderArticle(resource as Article)}
        {resource.type === 'stories' && renderStory(resource as Story)}
        {resource.type === 'myths' && renderMyth(resource as Myth)}
      </div>
    </PremiumLayout>
  );
};

export default ResourceDetail;
