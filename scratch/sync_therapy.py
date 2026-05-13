import json
import os

i18n_dir = r"d:\Downloads\Therapy Merged\src\app\i18n"

# These are the keys missing from many languages in Therapy Merged
common_keys_to_sync = {
    "share": {
        "ar": "مشاركة", "bn": "শেয়ার", "cs": "Sdílet", "da": "Del", "de": "Teilen", "el": "Κοινοποίηση",
        "es": "Compartir", "fi": "Jaa", "fr": "Partager", "he": "שתף", "hi": "शेयर करें", "hu": "Megosztás",
        "id": "Bagikan", "it": "Condividi", "ja": "共有", "ko": "공유", "ms": "Kongsi", "nl": "Delen",
        "no": "Del", "pl": "Udostępnij", "pt": "Compartilhar", "ro": "Distribuiți", "ru": "Поделиться",
        "sv": "Dela", "ta": "பகிர்", "te": "భాగస్వామ్యం", "th": "แชร์", "tl": "Ibahagi", "tr": "Paylaş",
        "uk": "Поділитися", "ur": "شیئر کریں", "vi": "Chia sẻ", "zh": "分享", "zh-Hans": "分享", "zh-Hant": "分享"
    },
    "share_progress": {
        "ar": "مشاركة التقدم", "bn": "অগ্রগতি শেয়ার করুন", "cs": "Sdílet pokrok", "da": "Del fremskridt", 
        "de": "Fortschritt teilen", "el": "Κοινοποίηση προόδου", "es": "Compartir progreso", "fi": "Jaa edistyminen",
        "fr": "Partager vos progrès", "he": "שתף התקדמות", "hi": "प्रगति साझा करें", "hu": "Haladás megosztása",
        "id": "Bagikan kemajuan", "it": "Condividi i progressi", "ja": "進捗を共有", "ko": "진행 상황 공유",
        "ms": "Kongsi kemajuan", "nl": "Voortgang delen", "no": "Del fremgang", "pl": "Udostępnij postęp",
        "pt": "Compartilhar progresso", "ro": "Distribuiți progresul", "ru": "Поделиться прогрессом",
        "sv": "Dela framsteg", "ta": "முன்னேற்றத்தைப் பகிரவும்", "te": "పురోగతిని భాగస్వామ్యం చేయండి",
        "th": "แชร์ความคืบหน้า", "tl": "Ibahagi ang progreso", "tr": "İlerlemeyi paylaş", 
        "uk": "Поділитися прогресом", "ur": "پیشرفت شیئر کریں", "vi": "Chia sẻ tiến độ", "zh": "分享进度",
        "zh-Hans": "分享进度", "zh-Hant": "分享進度"
    },
    "inspire_others": {
        "es": "Inspira a otros hoy", "fr": "Inspirez les autres aujourd'hui", "de": "Inspirieren Sie heute andere",
        "hi": "आज दूसरों को प्रेरित करें", "ja": "今日、他の人をインスパイアしましょう", "ko": "오늘 다른 사람들에게 영감을 주세요",
        "zh-Hans": "今天就去激励别人吧"
        # Adding more for completeness if needed, but focused on requested ones
    },
    "reset_all": {
        "ar": "إعادة ضبط الكل", "bn": "সব রিসেট করুন", "cs": "Resetovat vše", "da": "Nulstil alt", 
        "de": "Alles zurücksetzen", "el": "Επαναφορά όλων", "es": "Restablecer todo", "fi": "Nollaa kaikki",
        "fr": "Tout réinitialiser", "he": "אפס הכל", "hi": "सब कुछ रीसेट करें", "hu": "Összes alaphelyzetbe állítása",
        "id": "Atur ulang semua", "it": "Ripristina tutto", "ja": "すべてリセット", "ko": "모두 초기화",
        "ms": "Set semula semua", "nl": "Alles herstellen", "no": "Nullstill alt", "pl": "Resetuj wszystko",
        "pt": "Redefinir tudo", "ro": "Resetează tot", "ru": "Сбросить все", "sv": "Återställ allt",
        "ta": "அனைத்தையும் மீட்டமை", "te": "అన్నింటినీ రీసెట్ చేయండి", "th": "รีเซ็ตทั้งหมด", "tl": "I-reset lahat",
        "tr": "Tümünü sıfırla", "uk": "Скинути все", "ur": "سب ری سیٹ کریں", "vi": "Đặt lại tất cả",
        "zh": "重置全部", "zh-Hans": "重置全部", "zh-Hant": "重置全部"
    },
    "copied": {
        "ar": "تم النسخ!", "bn": "কপি করা হয়েছে!", "cs": "Zkopírováno!", "da": "Kopieret!", "de": "Kopiert!",
        "el": "Αντιγράφηκε!", "es": "¡Copiado!", "fi": "Kopioitu!", "fr": "Copié !", "he": "הועתק!", 
        "hi": "कॉपी किया गया!", "hu": "Másolva!", "id": "Berhasil disalin!", "it": "Copiato!", "ja": "コピーしました！",
        "ko": "복사됨!", "ms": "Disalin!", "nl": "Gekopieerd!", "no": "Kopiert!", "pl": "Skopiowano!",
        "pt": "Copiado!", "ro": "Copiat!", "ru": "Скопировано!", "sv": "Kopierad!", "ta": "நகலெடுக்கப்பட்டது!",
        "te": "కాపీ చేయబడింది!", "th": "คัดลอกแล้ว!", "tl": "Nakopya!", "tr": "Kopyalandı!", "uk": "Скопійовано!",
        "ur": "کاپی ہو گیا!", "vi": "Đã sao chép!", "zh": "已复制！", "zh-Hans": "已复制！", "zh-Hant": "已複製！"
    },
    "copy_message": {
        "es": "Copiar mensaje", "fr": "Copier le message", "de": "Nachricht kopieren",
        "hi": "संदेश कॉपी करें", "ja": "メッセージをコピー", "ko": "메시지 복사", "zh-Hans": "复制消息"
    }
}

# Simplified share_text mappings
share_text_mappings = {
    "es": "He realizado esta {{activityName}} en TherapyMantra y realmente la disfruto, tú también puedes hacerlo simplemente sigue el enlace a la aplicación de Android {{androidUrl}} o la aplicación de iOS {{iosUrl}}",
    "fr": "J'ai fait cette {{activityName}} dans TherapyMantra et j'apprécie vraiment, vous pouvez le faire aussi il suffit de suivre le lien vers l'application Android {{androidUrl}} ou l'application iOS {{iosUrl}}",
    "hi": "मैंने TherapyMantra में यह {{activityName}} की है और वास्तव में इसका आनंद ले रहा हूँ, आप भी ऐसा कर सकते हैं बस Android ऐप {{androidUrl}} या iOS ऐप {{iosUrl}} के लिंक का पालन करें",
    "de": "Ich habe diese {{activityName}} in TherapyMantra gemacht und genieße sie wirklich. Du kannst das auch tun, folge einfach dem Link zur Android-App {{androidUrl}} oder zur iOS-App {{iosUrl}}"
}

for filename in os.listdir(i18n_dir):
    if not filename.endswith(".json"):
        continue
    
    lang = filename.replace(".json", "")
    file_path = os.path.join(i18n_dir, filename)
    
    with open(file_path, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
        except:
            continue
            
    if "common" not in data:
        data["common"] = {}
        
    updated = False
    
    # Sync basic common keys
    for key, lang_map in common_keys_to_sync.items():
        val = lang_map.get(lang)
        if not val:
            # Fallback to English if missing in map
            val = common_keys_to_sync[key].get("en", key.replace("_", " ").capitalize())
            
        if key not in data["common"] or data["common"][key] == key.replace("_", " ").capitalize():
            data["common"][key] = val
            updated = True
            
    # Sync share_text
    if lang in share_text_mappings:
        if "share_text" not in data["common"] or "android app" in data["common"]["share_text"]:
             data["common"]["share_text"] = share_text_mappings[lang]
             updated = True
    
    if updated:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Updated {lang}")
