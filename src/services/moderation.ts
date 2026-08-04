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

// Malayalam Script Bad Words & Vulgarity Dictionary (മലയാളം)
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

  // 1. Check English Profanity & Leetspeak
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

  // 3. Check Manglish / Transliterated Bad Words
  for (const word of BAD_WORDS_MANGLISH) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    if (regex.test(cleanText)) {
      isClean = false;
      detectedWords.push(word);
      cleanText = cleanText.replace(regex, '****');
    }
  }

  const flagReason = !isClean 
    ? `Contains offensive language or inappropriate terms (${detectedWords.length} terms filtered)` 
    : undefined;

  return { isClean, cleanText, flagReason, detectedWords };
}

// Anti-Spam & Duplicate Post Detector
export function checkSpam(text: string, recentPosts: string[]): { isSpam: boolean; reason?: string } {
  const trimmed = text.trim();
  
  if (trimmed.length < 5) {
    return { isSpam: true, reason: 'Content is too short (minimum 5 characters).' };
  }

  // Check repeating characters (e.g., "aaaaaaaaaaaaaaaaa")
  if (/(.)\1{8,}/.test(trimmed)) {
    return { isSpam: true, reason: 'Spam detected: excessive repeated characters.' };
  }

  // Check duplicate posts in store
  const isDuplicate = recentPosts.some(
    (postText) => postText.toLowerCase().trim() === trimmed.toLowerCase()
  );

  if (isDuplicate) {
    return { isSpam: true, reason: 'Duplicate post detected. Please avoid duplicate spam.' };
  }

  return { isSpam: false };
}

// Sensitive Photo Safety Detector (NSFW / Graphic Blur Trigger)
export function inspectImageSensitivity(filenameOrUrl: string): { isSensitive: boolean; reason?: string } {
  const lower = filenameOrUrl.toLowerCase();
  
  const sensitiveKeywords = [
    'blood', 'victim', 'corpse', 'nude', 'nsfw', 'graphic', 'injury', 
    'casualty', 'gore', 'dead', 'body', 'trauma', 'accident'
  ];
  
  const hasKeyword = sensitiveKeywords.some((key) => lower.includes(key));

  if (hasKeyword) {
    return { isSensitive: true, reason: 'Photo flagged for sensitive or graphic content' };
  }

  return { isSensitive: false };
}
