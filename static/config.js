/**
 * HopeLine - Project Configuration
 * Department of Prisons and Correctional Services, Tamil Nadu
 *
 * This file contains ALL question data, options, scores, and flow logic.
 * The quiz engine (quiz.js) reads this config and renders everything dynamically.
 * To add a new project: create a new config object and set CONFIG = <your_config>.
 */

const HOPELINE_CONFIG = {
  name: {
    en: "Project HopeLine",
    ta: "நம்பிக்கை வழி திட்டம்"
  },
  project_id: 1,
  department: {
    en: "Department of Prisons & Correctional Services, Tamil Nadu",
    ta: "சிறைகள் மற்றும் சீர்திருத்தப் பணிகள் துறை, தமிழ்நாடு"
  },
  disclaimer: {
    en: "This tool is for screening purposes only. Not a diagnostic instrument.",
    ta: "இந்த கருவி screening நோக்கத்திற்கு மட்டுமே. இது diagnostic instrument அல்ல."
  },

  /* ─── BRANCH LABELS ──────────────────────────────────────────────────── */
  branchLabels: {
    normal:    { en: "General Questions",          ta: "பொது கேள்விகள்" },
    suicide:   { en: "⚠ Suicide Risk Screening",  ta: "⚠ தற்கொலை ஆபத்து" },
    phq:       { en: "Depression (PHQ)",           ta: "மனச்சோர்வு (PHQ)" },
    gad:       { en: "Anxiety (GAD)",              ta: "பதட்டம் (GAD)" },
    anger:     { en: "Anger",                      ta: "கோபம்" },
    substance: { en: "Substance Use",              ta: "போதைப் பழக்கம்" }
  },

  /* ─── DOMAIN SCORE DISPLAY ───────────────────────────────────────────── */
  domains: {
    mood:   { en: "Mood",          ta: "மனநிலை",       color: "#2563eb" },
    family: { en: "Family",        ta: "குடும்பம்",      color: "#10b981" },
    dep:    { en: "Depression",    ta: "மனச்சோர்வு",    color: "#6366f1" },
    anx:    { en: "Anxiety",       ta: "பதட்டம்",       color: "#0891b2" },
    anger:  { en: "Anger",         ta: "கோபம்",         color: "#f59e0b" },
    cage:   { en: "Substance CAGE",ta: "போதை CAGE",     color: "#d97706" },
    risk:   { en: "Suicide Risk",  ta: "தற்கொலை ஆபத்து",color: "#ef4444" }
  },

  /* ─── TIER OUTCOMES ──────────────────────────────────────────────────── */
  tiers: {
    1: {
      pill:  { en: "✓ Tier 1 – Normal",             ta: "✓ Tier 1 – சாதாரண நிலை" },
      title: { en: "Good mental state",             ta: "நல்ல நிலையில் இருக்கீங்க" },
      desc:  { en: "Responses indicate a normal range.", ta: "பதில்கள் சாதாரண மனநலத்தை காட்டுகின்றன." },
      msg:   { en: "🟢 Mental health appears stable.", ta: "🟢 மனநிலை நல்லா இருக்கு. தேவைப்பட்டால் உதவி கேட்கலாம்." },
      icon: "✅", bg: "#d1fae5", cls: "t1", alertCls: "ag"
    },
    2: {
      pill:  { en: "⚡ Tier 2 – Needs Monitoring",   ta: "⚡ Tier 2 – கவனிப்பு தேவை" },
      title: { en: "Needs attention",               ta: "கவனிக்க வேண்டிய நிலை" },
      desc:  { en: "Elevated stress detected. Please consult a Counsellor.", ta: "சில கேள்விகளில் அதிக அழுத்தம் தெரிகிறது. Counsellor-ஐ சந்திக்கவும்." },
      msg:   { en: "🟡 Counselling / mental health support recommended.", ta: "🟡 Counselling / மனநல ஆலோசனை பரிந்துரைக்கப்படுகிறது." },
      icon: "⚡", bg: "#fef3c7", cls: "t2", alertCls: "ay"
    },
    3: {
      pill:  { en: "⚠ Tier 3 – High Risk",           ta: "⚠ Tier 3 – உயர் ஆபத்து" },
      title: { en: "Immediate care needed",         ta: "உடனடி கவனிப்பு தேவை" },
      desc:  { en: "Serious mental health distress. See a Doctor immediately.", ta: "தீவிரமான மனநல அழுத்தம். Doctor-ஐ உடனே சந்திக்கவும்." },
      msg:   { en: "🔴 Immediately consult Psychologist/Doctor.", ta: "🔴 உடனடியாக Psychologist/Doctor-ஐ அணுகவும்." },
      icon: "⚠️", bg: "#fee2e2", cls: "t3", alertCls: "ar"
    },
    "s": {
      pill:  { en: "⚠ Tier 3 – Suicide Risk",        ta: "⚠ Tier 3 – தற்கொலை ஆபத்து" },
      title: { en: "Suicide Risk – Immediate Care", ta: "தற்கொலை ஆபத்து – உடனடி கவனிப்பு" },
      desc:  { en: "Thoughts of self-harm/suicide present. Immediate Psychologist attention required.", ta: "தற்கொலை/சுயகாயம் தொடர்பான எண்ணங்கள் இருக்கின்றன. Psychologist கவனிப்பு தேவை." },
      msg:   { en: "🔴 Immediately consult Psychologist/Doctor.", ta: "🔴 உடனடியாக Psychologist/Doctor-ஐ அணுகவும்." },
      icon: "⚠️", bg: "#fee2e2", cls: "t3", alertCls: "ar"
    }
  },

  /* ─── QUESTIONS ──────────────────────────────────────────────────────── */
  questions: [

    /* ── SECTION 1: PRESENT MOOD ── */
    {
      id: 1,
      section: { en: "Section 1 – Present Mood", ta: "பிரிவு 1 – தற்போதைய மனநிலை" },
      text: {
        en: "How is your mood or feeling at present?",
        ta: "இப்போ உங்கள் மனநிலை அல்லது உணர்வுகள் எப்படி இருக்குது?"
      },
      sub: { en: "", ta: "" },
      branch: "normal",
      opts: [
        { en: "Normal",                      ta: "சாதாரணமா இருக்கு",                              sc: { mood: 0 } },
        { en: "Dull or boring",              ta: "சலிப்பா / டல்லா இருக்கு",                       sc: { mood: 1 }, warn: true },
        { en: "Worried",                     ta: "கவலையா இருக்கு",                                sc: { mood: 1 }, warn: true },
        { en: "Frustrated",                  ta: "மனசு விரக்தியா / கஸ்டமா இருக்கு",              sc: { mood: 2 }, warn: true },
        { en: "Irritable",                   ta: "எரிச்சல் வருது",                                sc: { mood: 2 }, warn: true },
        { en: "Angry",                       ta: "கோபமா இருக்கு",                                 sc: { mood: 2 }, warn: true },
        { en: "Mood swings present",         ta: "முட் சரியில்லை",                               sc: { mood: 2 }, warn: true },
        { en: "Not interested in eating",    ta: "சாப்பிடவே பிடிக்கலை",                          sc: { mood: 2 }, warn: true },
        { en: "Sad / crying spells",         ta: "சோகமாவே இருக்கு / அழுகை வருது",               sc: { mood: 3 }, dng: true },
        { en: "Feeling useless / hopeless",  ta: "நான் பயனில்லாதவன் / ஏன் பிறந்தேன்",           sc: { mood: 3 }, dng: true },
        { en: "Feel like hurting myself",    ta: "என்னை காயப்படுத்திக்கணும் போலிருக்கு",        sc: { mood: 3 }, dng: true },
        { en: "Don't know",                  ta: "என்னனு சொல்ல தெரியல",                           sc: { mood: 1 } },
        { en: "Anxious",                     ta: "பதட்டமாக இருக்கு",                              sc: { mood: 2 }, warn: true }
      ]
    },

    /* ── SECTION 2: FAMILY SUPPORT ── */
    {
      id: 2,
      section: { en: "Section 2 – Family Support", ta: "பிரிவு 2 – குடும்ப ஆதரவு" },
      text: {
        en: "Is your family aware that you are here?",
        ta: "உங்கள் குடும்பத்துக்கு நீங்க இங்க இருக்கீங்கன்னு தெரியுமா?"
      },
      sub: { en: "", ta: "" },
      branch: "normal",
      opts: [
        { en: "Yes", ta: "ஆம்",    sc: { family: 0 } },
        { en: "No",  ta: "இல்லை", sc: { family: 1 }, warn: true }
      ]
    },
    {
      id: 3,
      section: { en: "Section 2 – Family Support", ta: "பிரிவு 2 – குடும்ப ஆதரவு" },
      text: {
        en: "How is your family support at present?",
        ta: "உங்க குடும்ப ஆதரவு இப்போ எப்படி இருக்கு?"
      },
      sub: { en: "", ta: "" },
      branch: "normal",
      opts: [
        { en: "Good",       ta: "நல்லா இருக்கு",              sc: { family: 0 } },
        { en: "Moderate",   ta: "சுமாரா இருக்கு",             sc: { family: 1 } },
        { en: "Poor",       ta: "சரியில்லை / மோசமா இருக்கு", sc: { family: 2 }, warn: true },
        { en: "No support", ta: "உதவி செய்ய யாரும் இல்லை",  sc: { family: 3 }, dng: true }
      ]
    },
    {
      id: 4,
      section: { en: "Section 2 – Family Support", ta: "பிரிவு 2 – குடும்ப ஆதரவு" },
      text: {
        en: "Who is the most supportive person for you?",
        ta: "உங்களுக்கு அதிக ஆதரவு தர்றது யாரு?"
      },
      sub: { en: "", ta: "" },
      branch: "normal",
      opts: [
        { en: "Father",      ta: "அப்பா",           sc: { sup: 1 } },
        { en: "Mother",      ta: "அம்மா",           sc: { sup: 1 } },
        { en: "Brother",     ta: "அண்ணன்/தம்பி",   sc: { sup: 1 } },
        { en: "Sister",      ta: "அக்கா/தங்கை",    sc: { sup: 1 } },
        { en: "Spouse",      ta: "மனைவி/கணவர்",    sc: { sup: 1 } },
        { en: "Son/Daughter",ta: "பிள்ளைகள்",       sc: { sup: 1 } },
        { en: "Relatives",   ta: "உறவினர்கள்",      sc: { sup: 1 } },
        { en: "Friends",     ta: "நண்பர்கள்",       sc: { sup: 1 } },
        { en: "No one",      ta: "யாரும் இல்லை",  sc: { sup: 0 }, dng: true }
      ]
    },
    {
      id: 5,
      section: { en: "Section 2 – Life Events", ta: "பிரிவு 2 – வாழ்க்கை நிகழ்வுகள்" },
      text: {
        en: "Any major problem or loss in the last 6 months?",
        ta: "கடந்த 6 மாதத்துல பெரிய பிரச்சனை அல்லது இழப்பு நடந்ததா?"
      },
      sub: { en: "", ta: "" },
      branch: "normal",
      opts: [
        { en: "No",                  ta: "இல்லை",                  sc: { stress: 0 } },
        { en: "Job loss",            ta: "வேலை போயிடுச்சி",        sc: { stress: 2 }, warn: true },
        { en: "Divorce / separation",ta: "விவாகரத்து / பிரிவு",    sc: { stress: 2 }, warn: true },
        { en: "Death of loved one",  ta: "மரணம்",                  sc: { stress: 3 }, dng: true },
        { en: "Serious illness",     ta: "பெரிய உடல்நல பிரச்சனை", sc: { stress: 2 }, warn: true },
        { en: "Family problem",      ta: "குடும்ப பிரச்சனை",        sc: { stress: 2 }, warn: true },
        { en: "Financial problem",   ta: "பண பிரச்சனை",            sc: { stress: 2 }, warn: true }
      ]
    },

    /* ── SECTION 3: CHILDHOOD ── */
    {
      id: 6,
      section: { en: "Section 3 – Childhood History (up to age 12)", ta: "பிரிவு 3 – குழந்தைப் பருவம் (12 வயது வரை)" },
      text: {
        en: "When you think about your childhood, how do you feel?",
        ta: "உங்க குழந்தை பருவத்தை நினைச்சா என்ன உணர்வு வருது?"
      },
      sub: { en: "", ta: "" },
      branch: "normal",
      opts: [
        { en: "Happy",         ta: "சந்தோசமா இருக்கு",              sc: { child: 0 } },
        { en: "Mixed feelings",ta: "மகிழ்ச்சியும் சோகமும் கலந்தது", sc: { child: 1 }, warn: true },
        { en: "Sad / painful", ta: "சோகமா / வலி மிகுந்தது",          sc: { child: 2 }, dng: true }
      ]
    },

    /* ── SECTION 4: HOME & ENVIRONMENT ── */
    {
      id: 7,
      section: { en: "Section 4 – Home & Environment", ta: "பிரிவு 4 – வீட்டு சூழல்" },
      text: {
        en: "How are your family relationship and situation at present?",
        ta: "வீட்டில உறவு நிலை மற்றும் சூழ்நிலை இப்போ எப்படி இருக்கிறது?"
      },
      sub: { en: "", ta: "" },
      branch: "normal",
      opts: [
        { en: "Good – understanding and caring",          ta: "நல்லாருக்கு – புரிஞ்சுகிட்டு பாத்துக்கிறாங்க",   sc: { home: 0 } },
        { en: "Moderate – frequent fights but together", ta: "அடிக்கடி சண்டை போட்டாலும் சேர்ந்து வாழ்கிறோம்", sc: { home: 1 }, warn: true },
        { en: "Affected / split – separated",            ta: "தனித்தனியாக / பிரிந்து வாழ்கிறோம்",               sc: { home: 2 }, dng: true }
      ]
    },
    {
      id: 8,
      section: { en: "Section 4 – Home & Environment", ta: "பிரிவு 4 – வீட்டு சூழல்" },
      text: {
        en: "How is the safety level of your family/home surroundings?",
        ta: "உங்கள் வீட்டுச் சூழலின் பாதுகாப்பு நிலை எப்படி இருக்குது?"
      },
      sub: { en: "", ta: "" },
      branch: "normal",
      opts: [
        { en: "Safe and secure",                       ta: "பாதுகாப்பா இருக்கு",                           sc: { safe: 0 } },
        { en: "Unsafe – crime-prone area",             ta: "பாதுகாப்பில்லை (குற்றம் நடக்கும் இடம்)",      sc: { safe: 1 }, warn: true },
        { en: "Police frequently visit for enquiry",   ta: "விசாரணைக்காக போலீஸ் அடிக்கடி வர்றாங்க",       sc: { safe: 2 }, warn: true }
      ]
    },

    /* ── SECTION 5: ASSOCIATES & INVOLVEMENT ── */
    {
      id: 9,
      section: { en: "Section 5 – Associates & Involvement", ta: "பிரிவு 5 – வழக்கில் சேர்வு" },
      text: {
        en: "How did you get into this case?",
        ta: "இந்த வழக்கில் எப்படி சேர்ந்தீங்க?"
      },
      sub: { en: "", ta: "" },
      branch: "normal",
      opts: [
        { en: "By yourself",  ta: "நான் தனியா மாட்டிகிட்டேன்",      sc: { case: 0 } },
        { en: "Family",       ta: "குடும்பத்தால்",                     sc: { case: 1 } },
        { en: "Friend",       ta: "நண்பன் மாட்டிவிட்டான்",           sc: { case: 1 } },
        { en: "Relative",     ta: "உறவினர்கள் மாட்டிவிட்டாங்க",       sc: { case: 1 } },
        { en: "Gang",         ta: "கூட்டாளிகளால்",                     sc: { case: 2 }, warn: true },
        { en: "False case",   ta: "பொய் வழக்கு",                      sc: { case: 0 } },
        { en: "Unknown",      ta: "தெரியாது",                          sc: { case: 0 } }
      ]
    },

    /* ── SECTION 6: LEISURE ACTIVITY ── */
    {
      id: 10,
      section: { en: "Section 6 – Leisure Activity", ta: "பிரிவு 6 – ஓய்வு நேரம்" },
      text: {
        en: "How do you like to spend your free time?",
        ta: "பொழுதுபோக்குக்கு என்ன செய்வீங்க?"
      },
      sub: { en: "", ta: "" },
      branch: "normal",
      opts: [
        { en: "Go out / hanging out",          ta: "வெளியே சுத்துவேன்",                     sc: { lei: 1 } },
        { en: "Time with family",              ta: "குடும்பத்தோட நேரம் செலவிடுவேன்",        sc: { lei: 1 } },
        { en: "Play with friends / children",  ta: "நண்பர்கள்/பிள்ளைகளோடு விளையாடுவேன்",  sc: { lei: 1 } },
        { en: "Online games / reels / TV",     ta: "மொபைல்/ரீல்ஸ்/டிவி",                   sc: { lei: 1 } },
        { en: "Beach / cinema / temple with family", ta: "குடும்பத்தோடு பீச்/கோவில் போவேன்", sc: { lei: 1 } },
        { en: "Read books",                    ta: "புத்தகம் படிப்பேன்",                    sc: { lei: 2 } },
        { en: "Listen / sing songs",           ta: "பாட்டு கேட்பேன்/படுவேன்",              sc: { lei: 2 } },
        { en: "Write songs / poetry / story",  ta: "கவிதை/கதை எழுதுவேன்",                  sc: { lei: 2 } },
        { en: "Dance",                         ta: "நடனமாட பிடிக்கும்",                     sc: { lei: 2 } },
        { en: "Drawing / painting",            ta: "ஓவியம் வரைவேன்",                        sc: { lei: 2 } },
        { en: "Nothing specific / keep quiet", ta: "சும்மாதான் இருப்பேன்",                  sc: { lei: 0 }, warn: true }
      ]
    },

    /* ── SECTION 7: PERSONALITY ── */
    {
      id: 11,
      section: { en: "Section 7 – Personality", ta: "பிரிவு 7 – ஆளுமை" },
      text: {
        en: "I see myself as:",
        ta: "நான் என்னை எப்படி பார்க்கிறேன்?"
      },
      sub: { en: "", ta: "" },
      branch: "normal",
      opts: [
        { en: "Reserved / Solitude person – Introversion",      ta: "ஒதுங்கி இருப்பவர் / தனிமையை விரும்புபவர் (Introvert)",  sc: { pers: 1 } },
        { en: "Outgoing / sociable – Extraversion",             ta: "எளிதா பழகுபவர் / ஃப்ரெண்ட்லி (Extrovert)",              sc: { pers: 2 } },
        { en: "Moderately outgoing – Ambivert",                 ta: "சற்று நேரம் எடுத்து பழகுபவர் (Ambivert)",                sc: { pers: 3 } }
      ]
    },

    /* ── SECTION 8: CONDUCT HISTORY ── */
    {
      id: 12,
      section: { en: "Section 8 – Conduct History", ta: "பிரிவு 8 – நடத்தை வரலாறு" },
      text: {
        en: "Ever been warned at school/college, or parents asked to come?",
        ta: "பள்ளி/கல்லூரியில் எச்சரிக்கை அல்லது பெற்றோரை வரச் சொன்னதுண்டா?"
      },
      sub: { en: "", ta: "" },
      branch: "normal",
      opts: [
        { en: "Yes", ta: "ஆம்",    sc: { cond: 1 }, warn: true },
        { en: "No",  ta: "இல்லை", sc: { cond: 0 } }
      ]
    },
    {
      id: 13,
      section: { en: "Section 8 – Conduct History", ta: "பிரிவு 8 – நடத்தை வரலாறு" },
      text: {
        en: "Ever broke things or harmed others out of anger?",
        ta: "கோவத்துல பொருட்களை உடைத்திருக்கீங்களா / யாரையாவது காயப்படுத்தியிருக்கீங்களா?"
      },
      sub: { en: "", ta: "" },
      branch: "normal",
      opts: [
        { en: "Yes", ta: "ஆம்",    sc: { cond: 2 }, warn: true },
        { en: "No",  ta: "இல்லை", sc: { cond: 0 } }
      ]
    },
    {
      id: 14,
      section: { en: "Section 8 – Conduct History", ta: "பிரிவு 8 – நடத்தை வரலாறு" },
      text: {
        en: "Whom do you think is responsible for your present state?",
        ta: "தற்போதைய நிலைக்கு யார் காரணம்னு நினைக்கிறீங்க?"
      },
      sub: { en: "", ta: "" },
      branch: "normal",
      opts: [
        { en: "Family",   ta: "குடும்பம்",    sc: { blame: 1 } },
        { en: "Relative", ta: "உறவினர்",       sc: { blame: 1 } },
        { en: "Friend",   ta: "நண்பர்",        sc: { blame: 1 } },
        { en: "Society",  ta: "சமூகம்",        sc: { blame: 1 } },
        { en: "Myself",   ta: "நானே காரணம்",  sc: { blame: 0 } }
      ]
    },

    /* ── SECTION 9: SUBSTANCE USE ── */
    {
      id: 15,
      section: { en: "Section 9 – Substance Use", ta: "பிரிவு 9 – போதைப் பழக்கம்" },
      text: {
        en: "Do you have a habit of using alcohol / smoking / any drugs?",
        ta: "குடி/புகை/கஞ்சா/போதை மாத்திரை பழக்கம் இருக்கா?"
      },
      sub: { en: "", ta: "" },
      branch: "substance",
      opts: [
        { en: "No",  ta: "இல்லை", sc: { sub: 0 } },
        { en: "Yes", ta: "ஆம்",    sc: { sub: 2 }, warn: true }
      ]
    },
    {
      id: 16,
      section: { en: "Section 9 – Substance Use", ta: "பிரிவு 9 – போதைப் பழக்கம்" },
      text: {
        en: "How often do you use?",
        ta: "எவ்வளவு அடிக்கடி எடுப்பீங்க?"
      },
      sub: { en: "", ta: "" },
      branch: "substance",
      opts: [
        { en: "Occasionally", ta: "அவ்வப்போது",          sc: { sub: 1 } },
        { en: "Monthly",      ta: "மாதத்திற்கு ஒரு நாள்",sc: { sub: 1 } },
        { en: "Weekly",       ta: "வாரத்துக்கு ஒரு நாள்",sc: { sub: 2 }, warn: true },
        { en: "Daily",        ta: "தினமும்",               sc: { sub: 3 }, dng: true }
      ]
    },
    {
      id: 17,
      section: { en: "Section 9 – CAGE (1/4)", ta: "பிரிவு 9 – CAGE (1/4)" },
      text: {
        en: "Have you ever felt you should cut down on your alcohol or drug usage?",
        ta: "பழக்கத்தை குறைக்கணும்னு எப்போதாவது தோணிர்க்கா?"
      },
      sub: { en: "CAGE (1/4)", ta: "CAGE (1/4)" },
      branch: "substance",
      opts: [
        { en: "Yes", ta: "ஆம்",    sc: { cage: 1 }, warn: true },
        { en: "No",  ta: "இல்லை", sc: { cage: 0 } }
      ]
    },
    {
      id: 18,
      section: { en: "Section 9 – CAGE (2/4)", ta: "பிரிவு 9 – CAGE (2/4)" },
      text: {
        en: "Do you get angry when someone criticises your drinking or drug use?",
        ta: "பழக்கத்தை பத்தி யாரோ சொன்னா கோபமாக இருக்குமா?"
      },
      sub: { en: "CAGE (2/4)", ta: "CAGE (2/4)" },
      branch: "substance",
      opts: [
        { en: "Yes", ta: "ஆம்",    sc: { cage: 1 }, warn: true },
        { en: "No",  ta: "இல்லை", sc: { cage: 0 } }
      ]
    },
    {
      id: 19,
      section: { en: "Section 9 – CAGE (3/4)", ta: "பிரிவு 9 – CAGE (3/4)" },
      text: {
        en: "Have you felt bad or guilty about drinking or using drugs?",
        ta: "குடிப்பது/போதை பத்தி குற்ற உணர்ச்சி வந்திருக்கா?"
      },
      sub: { en: "CAGE (3/4)", ta: "CAGE (3/4)" },
      branch: "substance",
      opts: [
        { en: "Yes", ta: "ஆம்",    sc: { cage: 1 }, warn: true },
        { en: "No",  ta: "இல்லை", sc: { cage: 0 } }
      ]
    },
    {
      id: 20,
      section: { en: "Section 9 – CAGE (4/4)", ta: "பிரிவு 9 – CAGE (4/4)" },
      text: {
        en: "Do you drink / use first thing in the morning to steady nerves or remove hangover?",
        ta: "காலையில் எழுந்ததும் நடுக்கம் குறைக்க குடிக்கணும்னு தோணிர்க்கா?"
      },
      sub: { en: "CAGE (4/4)", ta: "CAGE (4/4)" },
      branch: "substance",
      opts: [
        { en: "Yes", ta: "ஆம்",    sc: { cage: 1 }, dng: true },
        { en: "No",  ta: "இல்லை", sc: { cage: 0 } }
      ]
    },

    /* ── SECTION 10: MENTAL HEALTH ── */
    {
      id: 21,
      section: { en: "Section 10 – Mental Health", ta: "பிரிவு 10 – மனநலம்" },
      text: {
        en: "Are you under any medication or treatment for any illness?",
        ta: "ஏதாவது நோய்க்கு மருந்து எடுக்கிறீங்களா?"
      },
      sub: { en: "", ta: "" },
      branch: "normal",
      opts: [
        { en: "No",                   ta: "இல்லை",          sc: { med: 0 } },
        { en: "Yes – Physical health",ta: "ஆம் – உடல் நலம்",sc: { med: 1 }, warn: true },
        { en: "Yes – Mental health",  ta: "ஆம் – மன நலம்",  sc: { med: 2 }, warn: true }
      ]
    },
    {
      id: 22,
      section: { en: "Section 10 – Sleep", ta: "பிரிவு 10 – தூக்கம்" },
      text: {
        en: "In the past 7 days, how was your sleep quality?",
        ta: "கடந்த 7 நாட்களில் உங்கள் தூக்கம் எப்படி இருந்தது?"
      },
      sub: { en: "", ta: "" },
      branch: "normal",
      opts: [
        { en: "Good",             ta: "நல்லா இருந்துச்சு",                  sc: { sleep: 0 } },
        { en: "Average / Fair",   ta: "சுமாரா இருந்துச்சு",                  sc: { sleep: 1 } },
        { en: "Disturbed sleep",  ta: "நடுவில் விழிக்கிறேன் / சரியில்லை",    sc: { sleep: 2 }, warn: true },
        { en: "Sleeplessness",    ta: "தூக்கமே வரல",                          sc: { sleep: 3 }, dng: true }
      ]
    },

    /* PHQ-2 Screener */
    {
      id: 23,
      section: { en: "Section 10 – Depression Screen (PHQ-2)", ta: "பிரிவு 10 – மனச்சோர்வு (PHQ-2)" },
      text: {
        en: "Over the last 2 weeks – little interest or pleasure in doing things?",
        ta: "கடந்த 2 வாரமா, எந்த செயலிலும் ஆர்வம் இல்லாமல் இருக்கா?"
      },
      sub: {
        en: "0 = Not at all  1 = Few days  2 = More than half  3 = Nearly every day",
        ta: "0 = இல்லை  1 = சில நாட்கள்  2 = பாதிக்கும் மேல்  3 = தினமும்"
      },
      branch: "phq",
      opts: [
        { en: "Not at all (0)",        ta: "ஒருபோதும் இல்லை (0)",           sc: { dep: 0 } },
        { en: "Few days (1)",          ta: "சில நாட்கள் (1)",                sc: { dep: 1 } },
        { en: "More than half days (2)",ta: "பாதி நாட்களுக்கும் மேல் (2)",  sc: { dep: 2 }, warn: true },
        { en: "Nearly every day (3)",  ta: "கிட்டத்தட்ட எல்லா நாளும் (3)", sc: { dep: 3 }, dng: true }
      ]
    },
    {
      id: 24,
      section: { en: "Section 10 – Depression Screen (PHQ-2)", ta: "பிரிவு 10 – மனச்சோர்வு (PHQ-2)" },
      text: {
        en: "Over the last 2 weeks – feeling down, depressed, or hopeless?",
        ta: "கடந்த 2 வாரமா, மனச்சோர்வா / நம்பிக்கை இல்லாமை இருக்கா?"
      },
      sub: {
        en: "PHQ-2: Total ≥ 3 → Tier 2 screening",
        ta: "PHQ-2: மொத்தம் ≥ 3 → Tier 2"
      },
      branch: "phq",
      opts: [
        { en: "Not at all (0)",        ta: "ஒருபோதும் இல்லை (0)",           sc: { dep: 0 } },
        { en: "Few days (1)",          ta: "சில நாட்கள் (1)",                sc: { dep: 1 } },
        { en: "More than half days (2)",ta: "பாதி நாட்களுக்கும் மேல் (2)",  sc: { dep: 2 }, warn: true },
        { en: "Nearly every day (3)",  ta: "கிட்டத்தட்ட எல்லா நாளும் (3)", sc: { dep: 3 }, dng: true }
      ]
    },

    /* GAD-2 Screener */
    {
      id: 25,
      section: { en: "Section 10 – Anxiety Screen (GAD-2)", ta: "பிரிவு 10 – பதட்டம் (GAD-2)" },
      text: {
        en: "Over the last 2 weeks – feeling nervous, anxious or on edge?",
        ta: "கடந்த 2 வாரமா, பதட்டமா / இறுக்கமா உணர்ந்தீங்களா?"
      },
      sub: {
        en: "GAD-2: Total ≥ 3 → Tier 2 screening",
        ta: "GAD-2: மொத்தம் ≥ 3 → Tier 2"
      },
      branch: "gad",
      opts: [
        { en: "Not at all (0)",        ta: "ஒருபோதும் இல்லை (0)",           sc: { anx: 0 } },
        { en: "Few days (1)",          ta: "சில நாட்கள் (1)",                sc: { anx: 1 } },
        { en: "More than half days (2)",ta: "பாதி நாட்களுக்கும் மேல் (2)",  sc: { anx: 2 }, warn: true },
        { en: "Nearly every day (3)",  ta: "கிட்டத்தட்ட எல்லா நாளும் (3)", sc: { anx: 3 }, dng: true }
      ]
    },
    {
      id: 26,
      section: { en: "Section 12 – Anger", ta: "பிரிவு 12 – கோபம்" },
      text: {
        en: "Over the last 2 weeks – feeling more irritated or angry than usual?",
        ta: "கடந்த 2 வாரங்களாக, சின்ன விஷயங்களாலும் கோபம் / எரிச்சல் வந்ததா?"
      },
      sub: { en: "", ta: "" },
      branch: "anger",
      opts: [
        { en: "Not at all (0)",        ta: "ஒருபோதும் இல்லை (0)",           sc: { anger: 0 } },
        { en: "Few days (1)",          ta: "சில நாட்கள் (1)",                sc: { anger: 1 } },
        { en: "More than half days (2)",ta: "பாதி நாட்களுக்கும் மேல் (2)",  sc: { anger: 2 }, warn: true },
        { en: "Nearly every day (3)",  ta: "கிட்டத்தட்ட எல்லா நாளும் (3)", sc: { anger: 3 }, dng: true }
      ]
    },

    /* ── SECTION 13: SUPPORT NEEDED ── */
    {
      id: 27,
      section: { en: "Section 13 – Support Needed", ta: "பிரிவு 13 – உதவி" },
      text: {
        en: "How can we help or support you here?",
        ta: "இங்க இருக்கும்போது உங்களுக்கு நாங்கள் எப்படி உதவலாம்?"
      },
      sub: { en: "", ta: "" },
      branch: "normal",
      opts: [
        { en: "Family communication",   ta: "குடும்ப தொடர்பு",               sc: { need: 1 } },
        { en: "Legal aid",              ta: "சட்ட உதவி",                      sc: { need: 2 } },
        { en: "Health support",         ta: "மருத்துவ உதவி",                  sc: { need: 3 } },
        { en: "Mental health counselling",ta: "மனநல ஆலோசனை",                 sc: { need: 4 } },
        { en: "De-addiction treatment", ta: "போதை நிறுத்தும் சிகிச்சை",      sc: { need: 5 }, warn: true },
        { en: "Education",              ta: "கல்வி",                           sc: { need: 6 } },
        { en: "Work / Training",        ta: "வேலை / பயிற்சி",                  sc: { need: 7 } },
        { en: "Socializing",            ta: "மற்றவர்களோடு பழகுதல்",           sc: { need: 8 } }
      ]
    },

    /* ── SECTION 11: SUICIDE RISK SCREENING (HIGH PRIORITY) ── */
    {
      id: 28,
      section: { en: "Section 11 – Suicide Risk Screening ⚠ HIGH PRIORITY", ta: "பிரிவு 11 – தற்கொலை ஆபத்து மதிப்பீடு ⚠ உயர் முன்னுரிமை" },
      text: {
        en: "Do you have thoughts of actually hurting yourself?",
        ta: "உங்களை நீங்களே காயப்படுத்திக்கணும்னு எண்ணம் தோணுதா?"
      },
      sub: { en: "", ta: "" },
      branch: "suicide",
      opts: [
        { en: "No",                                  ta: "இல்லை",                                          sc: { risk: 0 } },
        { en: "Yes – hopeless / guilty",             ta: "ஆம் – நம்பிக்கையில்லை / குற்றம்",              sc: { risk: 2 }, dng: true },
        { en: "Yes – missing family / helpless",     ta: "ஆம் – குடும்பம் நினைவு / உதவி செய்ய முடியல",  sc: { risk: 2 }, dng: true },
        { en: "Yes – shame / extreme pain",          ta: "ஆம் – அவமானம் / உடல் வலி",                     sc: { risk: 2 }, dng: true },
        { en: "Yes – strong urge / plan",            ta: "ஆம் – தீவிரமான எண்ணம் / திட்டம்",              sc: { risk: 3 }, dng: true }
      ]
    },
    {
      id: 29,
      section: { en: "Section 11 – Past Week", ta: "பிரிவு 11 – கடந்த வாரம்" },
      text: {
        en: "Did you have any of these thoughts in the past week (including today)?",
        ta: "கடந்த ஒரு வாரத்தில் (இன்று உட்பட) இப்படியான எண்ணங்கள் வந்ததா?"
      },
      sub: { en: "", ta: "" },
      branch: "suicide",
      opts: [
        { en: "No",                   ta: "இல்லை",                    sc: { risk: 0 } },
        { en: "Yes – once / twice",   ta: "ஆம் – ஒரு/இரண்டு முறை",  sc: { risk: 1 }, warn: true },
        { en: "Yes – several times",  ta: "ஆம் – பலமுறை",            sc: { risk: 2 }, dng: true },
        { en: "Yes – almost daily",   ta: "ஆம் – கிட்டத்தட்ட தினமும்",sc: { risk: 3 }, dng: true }
      ]
    },
    {
      id: 30,
      section: { en: "Section 11 – Intent & Plan", ta: "பிரிவு 11 – தீவிரம் மற்றும் திட்டம்" },
      text: {
        en: "Did you have urge to attempt suicide or thought about how you can do it?",
        ta: "தற்கொலை செய்யணும்னு தீவிரமாக நினைத்தீங்களா / எப்படி செய்யலாம்னு திட்டமிட்டீங்களா?"
      },
      sub: { en: "", ta: "" },
      branch: "suicide",
      opts: [
        { en: "No – not to that extent",    ta: "இல்லை – அந்த அளவுக்கு இல்லை",  sc: { risk: 0 } },
        { en: "Yes – thoughts only",        ta: "ஆம் – எண்ணம் மட்டும்",           sc: { risk: 2 }, warn: true },
        { en: "Yes – thought about a plan", ta: "ஆம் – திட்டம் வரை யோசித்தேன்",  sc: { risk: 3 }, dng: true },
        { en: "Yes – actually attempted",   ta: "ஆம் – முயற்சி கூட செய்தேன்",    sc: { risk: 3 }, dng: true }
      ]
    },
    {
      id: 31,
      section: { en: "Section 11 – Immediate Support", ta: "பிரிவு 11 – உடனடி ஆதரவு" },
      text: {
        en: "If you want support, whom will you approach immediately?",
        ta: "உடனடி உதவி தேவைப்பட்டால் யாரை அணுகுவீர்கள்?"
      },
      sub: { en: "", ta: "" },
      branch: "suicide",
      opts: [
        { en: "Psychologist / Counsellor",  ta: "உளவியல் நிபுணர் / ஆலோசகர்",      sc: { rsup: 3 } },
        { en: "Doctor",                     ta: "மருத்துவர்",                        sc: { rsup: 3 } },
        { en: "Warder / Officials",         ta: "வார்டன் / அதிகாரிகள்",             sc: { rsup: 2 } },
        { en: "Gate Keeper / Security staff",ta: "கேட் கீப்பர் / பாதுகாப்பு பணியாளர்", sc: { rsup: 2 } },
        { en: "Co-inmate / Friend",         ta: "இணை கைதி / நண்பர்",                sc: { rsup: 1 } },
        { en: "Family member",              ta: "குடும்ப உறுப்பினர்",                sc: { rsup: 2 } }
      ]
    }
  ],

  /* ─── FLOW MAP ───────────────────────────────────────────────────────── */
  /*
   * Key format:  "<questionId>-<optionIndex>"   (optionIndex is 1-based)
   * Value:       next question ID  |  "END"
   *
   * Q1 opts 9,10,11 (dng – self-harm indicators) → jump to Suicide Risk (Q28)
   * Q15 opt 1 (No substance use) → skip CAGE, go to Q21
   * Q15 opt 2 (Yes) → Q16 (frequency) → Q17–Q20 CAGE
   */
  flow: {
    /* Q1 – Present Mood */
    "1-1":2, "1-2":2, "1-3":2, "1-4":2, "1-5":2, "1-6":2, "1-7":2, "1-8":2,
    "1-9":28,"1-10":28,"1-11":28,   // Red flag → Suicide screening
    "1-12":2,"1-13":2,

    /* Q2 – Family aware */
    "2-1":3, "2-2":3,

    /* Q3 – Family support */
    "3-1":4, "3-2":4, "3-3":4, "3-4":4,

    /* Q4 – Most supportive person */
    "4-1":5, "4-2":5, "4-3":5, "4-4":5, "4-5":5, "4-6":5, "4-7":5, "4-8":5, "4-9":5,

    /* Q5 – Major events */
    "5-1":6, "5-2":6, "5-3":6, "5-4":6, "5-5":6, "5-6":6, "5-7":6,

    /* Q6 – Childhood */
    "6-1":7, "6-2":7, "6-3":7,

    /* Q7 – Home relationship */
    "7-1":8, "7-2":8, "7-3":8,

    /* Q8 – Home safety */
    "8-1":9, "8-2":9, "8-3":9,

    /* Q9 – Case involvement */
    "9-1":10,"9-2":10,"9-3":10,"9-4":10,"9-5":10,"9-6":10,"9-7":10,

    /* Q10 – Leisure */
    "10-1":11,"10-2":11,"10-3":11,"10-4":11,"10-5":11,"10-6":11,
    "10-7":11,"10-8":11,"10-9":11,"10-10":11,"10-11":11,

    /* Q11 – Personality */
    "11-1":12,"11-2":12,"11-3":12,

    /* Q12 – School conduct */
    "12-1":13,"12-2":13,

    /* Q13 – Anger/harm history */
    "13-1":14,"13-2":14,

    /* Q14 – Responsibility */
    "14-1":15,"14-2":15,"14-3":15,"14-4":15,"14-5":15,

    /* Q15 – Substance habit */
    "15-1":21,   // No → skip to medication Q
    "15-2":16,   // Yes → frequency

    /* Q16 – Frequency */
    "16-1":17,"16-2":17,"16-3":17,"16-4":17,

    /* Q17–Q20 CAGE */
    "17-1":18,"17-2":18,
    "18-1":19,"18-2":19,
    "19-1":20,"19-2":20,
    "20-1":21,"20-2":21,

    /* Q21 – Medication */
    "21-1":22,"21-2":22,"21-3":22,

    /* Q22 – Sleep */
    "22-1":23,"22-2":23,"22-3":23,"22-4":23,

    /* Q23 – PHQ-2 Q1 */
    "23-1":24,"23-2":24,"23-3":24,"23-4":24,

    /* Q24 – PHQ-2 Q2 */
    "24-1":25,"24-2":25,"24-3":25,"24-4":25,

    /* Q25 – GAD-2 */
    "25-1":26,"25-2":26,"25-3":26,"25-4":26,

    /* Q26 – Anger */
    "26-1":27,"26-2":27,"26-3":27,"26-4":27,

    /* Q27 – Support needed → END */
    "27-1":"END","27-2":"END","27-3":"END","27-4":"END",
    "27-5":"END","27-6":"END","27-7":"END","27-8":"END",

    /* Q28 – Suicide thoughts */
    "28-1":29,"28-2":29,"28-3":29,"28-4":29,"28-5":29,

    /* Q29 – Past week */
    "29-1":30,"29-2":30,"29-3":30,"29-4":30,

    /* Q30 – Intent & plan */
    "30-1":31,"30-2":31,"30-3":31,"30-4":31,

    /* Q31 – Immediate support → END */
    "31-1":"END","31-2":"END","31-3":"END",
    "31-4":"END","31-5":"END","31-6":"END"
  }
};

/* ─── ACTIVE CONFIG ──────────────────────────────────────────────────────
 * To switch projects, change this one line only.
 * Example: const CONFIG = SCHOOL_CONFIG;
 * ───────────────────────────────────────────────────────────────────── */
const CONFIG = HOPELINE_CONFIG;
