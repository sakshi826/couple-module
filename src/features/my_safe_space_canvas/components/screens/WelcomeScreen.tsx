import React from 'react';
import WelcomeIllustration from '../WelcomeIllustration';
import { PremiumIntro } from '../../../../components/shared/PremiumIntro';
import { Palette, History } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  onBegin: () => void;
  onShowHistory: () => void;
}

const WelcomeScreen: React.FC<Props> = ({ onBegin, onShowHistory }) => {
  const { t } = useTranslation();
  return (
    <div className="py-6">
      <PremiumIntro
        title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
        description={(typeof t !== "undefined" ? t : (k) => k)("app_description")}
        onStart={onBegin}
        icon={<Palette size={32} />}
        benefits={(typeof t !== "undefined" ? t : (k) => k)("welcome.benefits", { returnObjects: true }) as string[]}
        duration={(typeof t !== "undefined" ? t : (k) => k)("welcome.duration")}
      >
        <div className="flex justify-center mb-8">
          <WelcomeIllustration />
        </div>
        <div className="flex justify-center mt-4">
          <button 
            onClick={onShowHistory}
            className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <History size={16} />
            {(typeof t !== "undefined" ? t : (k) => k)("welcome.view_past")}
          </button>
        </div>
      </PremiumIntro>
    </div>
  );
};

export default WelcomeScreen;
