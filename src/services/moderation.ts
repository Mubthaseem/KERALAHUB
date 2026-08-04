// Comprehensive Automated Content Moderation & Safety Engine for KeralaHub.online

// English Bad Words & Abuse Dictionary
const BAD_WORDS_EN = [
  'fuck', 'fucking', 'fucked', 'fucker', 'fuckin', 'fck', 'f*ck', 'f**k',
  'shit', 'shitting', 'shitty', 'sh*t', 's**t',
  'bitch', 'bitches', 'bitchy', 'b*tch',
  'asshole', 'ass', 'arse', 'arsehole',
  'bastard', 'cunt', 'dick', 'dickhead', 'pussy', 'cock',
  'whore', 'slut', 'idiot', 'stupid', 'dumb', 'loser', 'scam', 'scammer', 'fake',
  'nigger', 'nigga', 'retard', 'faggot', 'chink', 'spic', 'kike'
];

// Malayalam Script Bad Words Dictionary (മലയാളം)
const BAD_WORDS_ML_SCRIPT = [
  'പൂറ്', 'മയിര്', 'തായോളി', 'പുലയാടി', 'പോടാ', 'തന്തയില്ലാത്ത', 'കുണ്ണ',
  'ചാപ്പ', 'വെടി', 'നായിന്റെ', 'നാറി', 'കൊണം', 'അണ്ടി', 'മൈര്',
  'ചരക്ക്', 'വഴിപിഴച്ച', 'കേട്ടവനെ', 'പെഴച്ചവൾ', 'കണ്ണിൽ ചോരയില്ലാത്ത',
  'പിഴച്ച', 'തുരപ്പൻ', 'മൈരൻ'
];

// Manglish / Transliterated Malayalam Bad Words Dictionary
const BAD_WORDS_MANGLISH = [
  'mayiru', 'mairu', 'mairen', 'mayiran', 'pooru', 'poor', 'poru',
  'thaayoli', 'thayoli', 'pulayadi', 'thanthayillatha', 'kunna', 'kunda',
  'nayinte', 'nairi', 'naari', 'konam', 'andi', 'vedchi', 'vedi',
  'charakku', 'kazhappu', 'kazhappan', 'oombu', 'oomfi', 'oombi'
];

// Explicit NSFW / Nudity / Sensitive Keywords
const NSFW_KEYWORDS = [
  'nude', 'naked', 'sexy', 'nsfw', 'porn', 'adult', 'erotic', 'bikini',
  'cleavage', 'lingerie', 'boobs', 'penis', 'vagina', 'sex', 'strip',
  'gore', 'corpse', 'blood', 'bloodied', 'mutilated'
];

export interface ModerationResult {
  isClean: boolean;
  cleanText: string;
  flagReason?: string;
  detectedWords: string[];
}

export function filterContent(text: string): ModerationResult {
  if (!text || !text.trim()) {
    return { isClean: true, cleanText: '', detectedWords: [] };
  }

  let cleanText = text;
  let isClean = true;
  const detectedWords: string[] = [];

  // 1. Check English Profanity
  for (const word of BAD_WORDS_EN) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    if (regex.test(cleanText)) {
      isClean = false;
      detectedWords.push(word);
      cleanText = cleanText.replace(regex, '****');
    }
  }

  // 2. Check Malayalam Script Bad Words
  for (const word of BAD_WORDS_ML_SCRIPT) {
    if (cleanText.includes(word)) {
      isClean = false;
      detectedWords.push(word);
      cleanText = cleanText.split(word).join('****');
    }
  }

  // 3. Check Manglish Bad Words
  for (const word of BAD_WORDS_MANGLISH) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    if (regex.test(cleanText)) {
      isClean = false;
      detectedWords.push(word);
      cleanText = cleanText.replace(regex, '****');
    }
  }

  const flagReason = !isClean 
    ? `Contains offensive language (${detectedWords.length} terms filtered)` 
    : undefined;

  return { isClean, cleanText, flagReason, detectedWords };
}

// Sensitive Photo Safety Detector (NSFW / Graphic Blur Trigger)
export function inspectImageSensitivity(filenameOrUrl: string): { isSensitive: boolean; reason?: string } {
  const trimmed = filenameOrUrl.trim();
  
  if (trimmed.length < 5) {
    return { isSensitive: true, reason: 'Content is too short (minimum 5 characters).' };
  }
  
  const isSensitive = NSFW_KEYWORDS.some((word) => trimmed.toLowerCase().includes(word));
  
  if (isSensitive) {
    return { isSensitive: true, reason: 'Image flagged as sensitive.' };
  }
  
  return { isSensitive: false };
}

// Anti-Spam Detector
export function checkSpam(text: string, recentPosts: string[]): { isSpam: boolean; reason?: string } {
  const trimmed = text.trim();
  
  if (trimmed.length < 5) {
    return { isSpam: true, reason: 'Content is too short (minimum 5 characters).' };
  }

  if (/(.)\1{8,}/.test(trimmed)) {
    return { isSpam: true, reason: 'Spam detected: excessive repeated characters.' };
  }

  const isDuplicate = recentPosts.some(
    (postText) => postText.toLowerCase().trim() === trimmed.toLowerCase()
  );

  if (isDuplicate) {
    return { isSpam: true, reason: 'Duplicate post detected.' };
  }

  return { isSpam: false };
}

// STRICT UPLOAD BLOCKER for Nudity / Sexy / Sensitive / Explicit Photos
export function validateImageFile(fileName: string, dataUrl?: string): Promise<{ isAllowed: boolean; reason?: string }> {
  return new Promise((resolve) => {
    const lowerName = fileName.toLowerCase();

    // 1. Check Filename for NSFW Keywords
    const matchedKeyword = NSFW_KEYWORDS.find((word) => lowerName.includes(word));
    if (matchedKeyword) {
      return resolve({
        isAllowed: false,
        reason: `Upload Blocked: Image name contains restricted adult/sensitive term ("${matchedKeyword}").`
      });
    }

    if (!dataUrl) {
      return resolve({ isAllowed: true });
    }

    // 2. Client-side Canvas RGB Skin Tone & Nudity Inspection
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve({ isAllowed: true });

        canvas.width = 100;
        canvas.height = 100;
        ctx.drawImage(img, 0, 0, 100, 100);

        const imgData = ctx.getImageData(0, 0, 100, 100).data;
        let skinPixels = 0;
        const totalPixels = 100 * 100;

        for (let i = 0; i < imgData.length; i += 4) {
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];

          // Standard RGB Skin-Tone Threshold Rule
          if (r > 95 && g > 40 && b > 20 && r > g && r > b && Math.abs(r - g) > 15) {
            skinPixels++;
          }
        }

        const skinRatio = skinPixels / totalPixels;

        // If image skin-tone ratio exceeds 45%, block upload for nudity/explicit content protection
        if (skinRatio > 0.45) {
          return resolve({
            isAllowed: false,
            reason: 'Upload Blocked: Image detected as inappropriate or explicit content (excessive skin exposure).'
          });
        }

        resolve({ isAllowed: true });
      } catch (err) {
        // Fallback to allow if canvas inspection fails
        resolve({ isAllowed: true });
      }
    };

    img.onerror = () => resolve({ isAllowed: true });
    img.src = dataUrl;
  });
}
