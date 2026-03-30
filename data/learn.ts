export interface LearnTopic {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  readTime: number;
  overview: string;
  symptoms: { title: string; items: string[] }[];
  causes: { title: string; description: string }[];
  treatments: { name: string; description: string; type: "therapy" | "lifestyle" | "medical" | "self-help" }[];
  myths: { myth: string; fact: string }[];
  relatedTests: string[];
  resources: { name: string; description: string }[];
  /** Multilingual titles & overviews */
  i18n?: {
    fr?: { title: string; subtitle: string; overview: string };
    es?: { title: string; subtitle: string; overview: string };
    zh?: { title: string; subtitle: string; overview: string };
  };
}

export const learnTopics: LearnTopic[] = [
  // ─── 1. DEPRESSION ─────────────────────────────────────────────────────────
  {
    id: "depression",
    title: "Understanding Depression",
    subtitle: "More than sadness — a complex condition that affects mind and body",
    icon: "🧠",
    color: "blue",
    readTime: 8,
    overview:
      "Depression (major depressive disorder) is a common and serious medical condition that negatively affects how you feel, the way you think, and how you act. It is not a weakness or a character flaw — it is a real medical condition with biological, psychological, and social components. 80–90% of people with depression respond well to treatment.",
    symptoms: [
      { title: "Emotional Symptoms", items: ["Persistent sad, anxious, or 'empty' mood", "Feelings of hopelessness or pessimism", "Feelings of worthlessness or excessive guilt", "Loss of interest or pleasure in activities", "Irritability, frustration, or restlessness"] },
      { title: "Physical Symptoms", items: ["Fatigue and decreased energy", "Difficulty sleeping or sleeping too much", "Changes in appetite — significant weight loss or gain", "Aches, pains, headaches without clear physical cause", "Psychomotor changes — moving or speaking more slowly"] },
      { title: "Cognitive Symptoms", items: ["Difficulty thinking, concentrating, or making decisions", "Memory problems", "Thoughts of death or suicidal ideation", "Negative thinking patterns"] },
    ],
    causes: [
      { title: "Biological Factors", description: "Differences in brain chemistry (serotonin, dopamine), genetics, hormonal imbalances, and changes in brain structure all contribute to depression." },
      { title: "Psychological Factors", description: "Negative thinking patterns, low self-esteem, perfectionism, history of trauma, and certain personality traits increase vulnerability." },
      { title: "Social & Environmental Factors", description: "Major life stressors, social isolation, financial hardship, and lack of support can trigger or worsen depression." },
      { title: "Medical Conditions", description: "Thyroid disorders, chronic pain, certain medications, and other medical conditions can contribute to depressive symptoms." },
    ],
    treatments: [
      { name: "Cognitive Behavioral Therapy (CBT)", description: "A highly effective therapy that identifies and changes negative thought patterns and behaviors contributing to depression.", type: "therapy" },
      { name: "Antidepressant Medication", description: "SSRIs, SNRIs, and other medications regulate brain chemistry. Most effective when combined with therapy.", type: "medical" },
      { name: "Exercise", description: "Regular physical activity is as effective as medication for mild-to-moderate depression. Even 30 min 3–5 days/week makes a difference.", type: "lifestyle" },
      { name: "Sleep Hygiene", description: "Improving sleep quality and consistency significantly impacts mood and recovery.", type: "lifestyle" },
      { name: "Interpersonal Therapy (IPT)", description: "Focuses on improving interpersonal relationships and communication patterns.", type: "therapy" },
      { name: "Mindfulness-Based Cognitive Therapy", description: "Combines mindfulness with cognitive therapy to prevent depressive relapse.", type: "therapy" },
    ],
    myths: [
      { myth: "Depression is just sadness or laziness.", fact: "Depression is a serious medical condition with neurobiological underpinnings. People cannot simply 'snap out of it'." },
      { myth: "Antidepressants change your personality.", fact: "Antidepressants relieve symptoms — not alter who you are. Many feel 'more themselves' once treated." },
      { myth: "Talking about depression makes it worse.", fact: "Talking openly about depression is one of the most helpful things you can do. Suppression tends to worsen symptoms." },
      { myth: "Depression only affects people with difficult lives.", fact: "Depression can affect anyone regardless of success, wealth, or circumstances." },
    ],
    relatedTests: ["phq9", "wellbeing", "motivation"],
    resources: [
      { name: "NAMI (US)", description: "1-800-950-NAMI · nami.org" },
      { name: "988 Suicide & Crisis Lifeline (US)", description: "Call or text 988" },
      { name: "3114 — Prévention suicide (FR)", description: "Disponible 24h/24, 7j/7" },
    ],
    i18n: {
      fr: { title: "Comprendre la dépression", subtitle: "Bien plus que de la tristesse — une condition complexe qui affecte le corps et l'esprit", overview: "La dépression est une condition médicale sérieuse qui affecte négativement votre humeur, votre pensée et vos actions. Ce n'est pas une faiblesse de caractère — c'est une maladie réelle avec des composantes biologiques, psychologiques et sociales. 80 à 90 % des personnes dépressives répondent bien au traitement." },
      es: { title: "Entender la depresión", subtitle: "Mucho más que tristeza — una condición compleja que afecta mente y cuerpo", overview: "La depresión (trastorno depresivo mayor) es una condición médica seria que afecta negativamente cómo se siente, piensa y actúa. No es debilidad ni un defecto de carácter — es una enfermedad real con componentes biológicos, psicológicos y sociales. El 80-90% de las personas con depresión responden bien al tratamiento." },
      zh: { title: "了解抑郁症", subtitle: "不只是悲伤——一种影响身心的复杂疾病", overview: "抑郁症（重度抑郁障碍）是一种常见的严重疾病，会对您的感受、思维和行为产生负面影响。这不是性格弱点——它是一种真实的医学疾病，具有生物、心理和社会成分。80-90%的抑郁症患者对治疗反应良好。" },
    },
  },

  // ─── 2. ANXIETY ────────────────────────────────────────────────────────────
  {
    id: "anxiety",
    title: "Understanding Anxiety",
    subtitle: "When worry becomes overwhelming — recognizing and managing anxiety",
    icon: "💜",
    color: "purple",
    readTime: 7,
    overview:
      "Anxiety is the mind and body's reaction to stressful, dangerous, or unfamiliar situations. A certain level of anxiety helps us stay alert — it is part of our natural threat-response system. However, when anxiety becomes excessive, persistent, and interferes with daily life, it may be an anxiety disorder. Anxiety disorders affect 284 million people worldwide and are highly treatable.",
    symptoms: [
      { title: "Psychological Symptoms", items: ["Excessive, uncontrollable worry", "Feeling of dread or impending doom", "Difficulty concentrating — mind going blank", "Irritability and restlessness", "Constant sense of being 'on edge'"] },
      { title: "Physical Symptoms", items: ["Racing or pounding heartbeat", "Shortness of breath or hyperventilation", "Sweating, trembling, or shaking", "Nausea or stomach upset", "Muscle tension and headaches"] },
      { title: "Behavioral Symptoms", items: ["Avoidance of anxiety-provoking situations", "Seeking constant reassurance", "Difficulty making decisions", "Procrastination driven by worry"] },
    ],
    causes: [
      { title: "Brain Chemistry", description: "Imbalances in GABA, serotonin, and norepinephrine, and overactivity in the amygdala are associated with anxiety." },
      { title: "Genetics", description: "Anxiety disorders tend to run in families, suggesting a genetic component." },
      { title: "Life Experiences", description: "Traumatic experiences, chronic stress, childhood adversity, and personality traits like perfectionism can contribute." },
      { title: "Medical Factors", description: "Thyroid issues, heart conditions, substance use, caffeine, and some medications can trigger anxiety." },
    ],
    treatments: [
      { name: "Cognitive Behavioral Therapy (CBT)", description: "The gold-standard treatment. Identifies anxious thoughts and gradually faces feared situations.", type: "therapy" },
      { name: "Exposure Therapy", description: "Gradually and safely facing situations that cause anxiety, reducing their power over time.", type: "therapy" },
      { name: "Medication (SSRIs/SNRIs)", description: "Several medications are effective for anxiety disorders. Most effective when combined with therapy.", type: "medical" },
      { name: "Relaxation Techniques", description: "Deep breathing, progressive muscle relaxation, and mindfulness meditation reduce anxiety significantly.", type: "self-help" },
      { name: "Regular Exercise", description: "Aerobic exercise reduces stress hormones and increases anxiety-relieving neurochemicals.", type: "lifestyle" },
    ],
    myths: [
      { myth: "Anxiety is just worry — everyone has it.", fact: "Anxiety disorders involve excessive, persistent fear that significantly impairs daily functioning — qualitatively different from everyday worry." },
      { myth: "You should avoid anxiety-provoking situations.", fact: "Avoidance maintains and worsens anxiety long-term. Gradual exposure to feared situations is key to reducing anxiety." },
      { myth: "Anxiety medication is addictive.", fact: "First-line medications (SSRIs/SNRIs) are not addictive. Some benzodiazepines carry dependency risk — discuss carefully with your doctor." },
      { myth: "Breathing exercises don't really work.", fact: "Controlled breathing directly activates the parasympathetic nervous system, physiologically reducing anxiety." },
    ],
    relatedTests: ["gad7", "spin", "pss"],
    resources: [
      { name: "ADAA (US)", description: "Anxiety & Depression Association of America — adaa.org" },
      { name: "No Panic (UK)", description: "nopanic.org.uk" },
    ],
    i18n: {
      fr: { title: "Comprendre l'anxiété", subtitle: "Quand l'inquiétude devient écrasante — reconnaître et gérer l'anxiété", overview: "L'anxiété est la réaction de l'esprit et du corps à des situations stressantes ou dangereuses. Un certain niveau d'anxiété est normal. Cependant, lorsqu'elle devient excessive et persistante, elle peut constituer un trouble anxieux. Les troubles anxieux touchent 284 millions de personnes dans le monde et sont très traitables." },
      es: { title: "Entender la ansiedad", subtitle: "Cuando la preocupación se vuelve abrumadora — reconocer y manejar la ansiedad", overview: "La ansiedad es la reacción de la mente y el cuerpo ante situaciones estresantes o peligrosas. Un cierto nivel de ansiedad es normal. Sin embargo, cuando se vuelve excesiva y persistente, puede ser un trastorno de ansiedad. Los trastornos de ansiedad afectan a 284 millones de personas en el mundo y son muy tratables." },
      zh: { title: "了解焦虑症", subtitle: "当担忧变得难以承受——识别和管理焦虑", overview: "焦虑是心身对压力或危险情境的反应。适度的焦虑是正常的。然而，当焦虑变得过度且持续，影响日常生活时，可能就是焦虑障碍了。焦虑障碍影响全球2.84亿人，且高度可治。" },
    },
  },

  // ─── 3. ADHD ───────────────────────────────────────────────────────────────
  {
    id: "adhd",
    title: "Understanding ADHD",
    subtitle: "A neurodevelopmental condition affecting attention, impulse control, and activity",
    icon: "⚡",
    color: "orange",
    readTime: 7,
    overview:
      "ADHD is a neurodevelopmental disorder characterized by persistent inattention, hyperactivity, and/or impulsivity that interferes with functioning. ADHD is not a disorder of intelligence or effort — people with ADHD often possess significant strengths including creativity, hyperfocus, and high energy. It affects approximately 5% of children and 2.5% of adults worldwide.",
    symptoms: [
      { title: "Inattention Symptoms", items: ["Difficulty sustaining attention", "Frequently making careless mistakes", "Not listening when spoken to directly", "Difficulty organizing tasks", "Frequently losing things", "Easily distracted", "Forgetful in daily activities"] },
      { title: "Hyperactivity & Impulsivity", items: ["Fidgeting or squirming", "Leaving seat unexpectedly", "Feeling inner restlessness (adults)", "Talking excessively", "Blurting out answers", "Difficulty waiting for turn", "Interrupting others"] },
    ],
    causes: [
      { title: "Genetics", description: "ADHD is highly heritable (70–80%). Specific genes involved in dopamine regulation play a significant role." },
      { title: "Brain Development", description: "Differences in development, size, and connectivity of brain regions involved in executive function and attention." },
      { title: "Environmental Factors", description: "Prenatal exposure to tobacco, alcohol, or toxins; premature birth; early lead exposure are associated with increased risk." },
      { title: "Neurotransmitter Differences", description: "Differences in dopamine and norepinephrine signaling affect attention, motivation, and impulse control." },
    ],
    treatments: [
      { name: "Stimulant Medication", description: "Methylphenidate and amphetamines are the most effective ADHD treatments, increasing dopamine and norepinephrine availability.", type: "medical" },
      { name: "Non-Stimulant Medication", description: "Atomoxetine, guanfacine, and clonidine are effective alternatives.", type: "medical" },
      { name: "Cognitive Behavioral Therapy", description: "Helps develop organizational skills, manage emotions, and challenge negative beliefs about ADHD.", type: "therapy" },
      { name: "ADHD Coaching", description: "Practical support for organization, time management, goal-setting, and accountability.", type: "self-help" },
      { name: "Exercise", description: "Regular aerobic exercise increases dopamine and norepinephrine, improving ADHD symptoms.", type: "lifestyle" },
    ],
    myths: [
      { myth: "ADHD isn't real — kids are just being kids.", fact: "ADHD is one of the most well-researched conditions in psychiatry, confirmed by decades of neuroimaging and genetic research." },
      { myth: "Medication will turn my child into a zombie.", fact: "When properly dosed, stimulant medication helps people function more naturally — not suppressing personality." },
      { myth: "People with ADHD can't focus on anything.", fact: "People with ADHD can hyperfocus intensely on engaging activities. The challenge is regulating attention — not an inability to focus at all." },
      { myth: "ADHD goes away when you grow up.", fact: "ADHD persists into adulthood for the majority of people. Hyperactivity may decrease while inattention and executive function challenges remain." },
    ],
    relatedTests: ["asrs", "impulsivity", "motivation"],
    resources: [
      { name: "CHADD (US)", description: "chadd.org — Children and Adults with ADHD" },
      { name: "ADDitude Magazine", description: "additudemag.com" },
      { name: "HyperSupers (FR)", description: "hypersupers.fr" },
    ],
    i18n: {
      fr: { title: "Comprendre le TDAH", subtitle: "Un trouble neurodéveloppemental affectant l'attention, l'impulsivité et l'activité", overview: "Le TDAH est un trouble neurodéveloppemental caractérisé par une inattention persistante, de l'hyperactivité et/ou de l'impulsivité. Ce n'est pas un manque d'intelligence ou d'effort — les personnes atteintes de TDAH possèdent souvent des forces significatives, notamment la créativité et la capacité de concentration intense." },
      es: { title: "Entender el TDAH", subtitle: "Una condición del neurodesarrollo que afecta la atención, el control de impulsos y la actividad", overview: "El TDAH es un trastorno del neurodesarrollo caracterizado por inatención persistente, hiperactividad y/o impulsividad que interfiere con el funcionamiento. No es un trastorno de inteligencia o esfuerzo — las personas con TDAH a menudo poseen fortalezas significativas, incluyendo creatividad e hiperfoco." },
      zh: { title: "了解多动症（ADHD）", subtitle: "一种影响注意力、冲动控制和活动水平的神经发育障碍", overview: "多动症是一种神经发育障碍，以持续的注意力不集中、多动和/或冲动为特征，干扰日常功能。这不是智力或努力的问题——多动症患者往往拥有显著的优势，包括创造力和超强专注力。" },
    },
  },

  // ─── 4. BURNOUT ────────────────────────────────────────────────────────────
  {
    id: "burnout",
    title: "Understanding Burnout",
    subtitle: "Chronic workplace stress that hasn't been successfully managed",
    icon: "🔥",
    color: "amber",
    readTime: 6,
    overview:
      "Burnout is a state of chronic stress that leads to physical and emotional exhaustion, cynicism and detachment, and feelings of ineffectiveness. The WHO officially recognizes burnout as an 'occupational phenomenon.' It develops gradually — often sneaking up on the most dedicated and resilient people. It is not a sign of weakness but a signal that something in the work environment needs to change.",
    symptoms: [
      { title: "Exhaustion", items: ["Feeling emotionally and physically drained", "Dreading going to work", "Feeling too tired to enjoy activities outside work", "Difficulty concentrating", "Neglecting personal needs"] },
      { title: "Depersonalization & Cynicism", items: ["Feeling detached from your work", "Loss of enjoyment in your job", "Increased cynicism or negativity", "Feeling irritable and impatient", "Distancing yourself emotionally from responsibilities"] },
      { title: "Reduced Effectiveness", items: ["Feeling your efforts don't make a difference", "Doubting your competence", "Decreased productivity", "Feeling trapped or defeated"] },
    ],
    causes: [
      { title: "Work Overload", description: "Consistently too much work, unrealistic expectations, and insufficient recovery time." },
      { title: "Lack of Control", description: "Feeling unable to influence decisions that affect your work, schedule, or workload." },
      { title: "Insufficient Reward", description: "Being under-recognized, under-compensated, or feeling that effort isn't valued." },
      { title: "Values Mismatch", description: "Working in environments or roles that conflict with your core values creates chronic psychological tension." },
    ],
    treatments: [
      { name: "Setting Boundaries", description: "Establishing clear limits on work hours, availability, and workload is essential for burnout recovery.", type: "self-help" },
      { name: "Rest & Recovery", description: "Prioritizing adequate sleep, vacation, and genuinely restorative activities allows the nervous system to recover.", type: "lifestyle" },
      { name: "Therapy", description: "A therapist can help you process the experience, identify contributing patterns, and develop sustainable strategies.", type: "therapy" },
      { name: "Organizational Changes", description: "Addressing structural causes — workload, autonomy, recognition — may require conversations with managers.", type: "self-help" },
    ],
    myths: [
      { myth: "Burnout is the same as stress.", fact: "Stress involves too much. Burnout involves too little — too little energy, motivation, and care." },
      { myth: "Burnout only happens to weak people.", fact: "Burnout is most common among the most dedicated, high-performing people." },
      { myth: "A vacation will fix burnout.", fact: "A vacation helps short-term but doesn't address structural causes. Full recovery requires meaningful changes." },
      { myth: "Just push through and it will get better.", fact: "Without addressing underlying causes, burnout tends to worsen over time." },
    ],
    relatedTests: ["burnout", "pss", "fatigue", "motivation"],
    resources: [
      { name: "Mind (UK)", description: "mind.org.uk" },
      { name: "Mental Health America", description: "mhanational.org" },
    ],
    i18n: {
      fr: { title: "Comprendre l'épuisement professionnel", subtitle: "Le stress chronique au travail qui n'a pas été géré avec succès", overview: "L'épuisement professionnel (burnout) est un état de stress chronique conduisant à une épuisement physique et émotionnel, du cynisme et un sentiment d'inefficacité. L'OMS reconnaît officiellement le burnout comme un 'phénomène lié au travail'. Il se développe progressivement, touchant souvent les personnes les plus dévouées." },
      es: { title: "Entender el agotamiento (Burnout)", subtitle: "El estrés laboral crónico que no se ha manejado con éxito", overview: "El burnout es un estado de estrés crónico que lleva al agotamiento físico y emocional, el cinismo y la sensación de ineficacia. La OMS reconoce oficialmente el burnout como un 'fenómeno ocupacional'. Se desarrolla gradualmente, afectando a menudo a las personas más dedicadas." },
      zh: { title: "了解职业倦怠", subtitle: "未能成功管理的长期工作压力", overview: "职业倦怠是一种慢性压力状态，导致身体和情感的精疲力竭、冷漠和无效感。世卫组织正式将职业倦怠认定为一种「职业现象」。它是逐渐发展的，往往悄悄袭击最敬业的人。" },
    },
  },

  // ─── 5. STRESS ─────────────────────────────────────────────────────────────
  {
    id: "stress",
    title: "Understanding Stress",
    subtitle: "How your body and mind respond to demands — and when it becomes too much",
    icon: "🌡️",
    color: "yellow",
    readTime: 6,
    overview:
      "Stress is the body's response to any demand or threat. In small doses, stress can be positive — helping you perform under pressure and even keeping you safe. But when stress becomes chronic, it takes a serious toll on physical and mental health. Chronic stress is associated with heart disease, immune suppression, digestive problems, and mental health conditions.",
    symptoms: [
      { title: "Physical Symptoms", items: ["Headaches and muscle tension", "Chest pain or rapid heartbeat", "Fatigue and sleep problems", "Stomach upset and digestive issues", "Frequent illness due to weakened immunity"] },
      { title: "Emotional Symptoms", items: ["Anxiety, restlessness, and worry", "Irritability or anger", "Feeling overwhelmed", "Sadness or depression", "Lack of motivation or focus"] },
      { title: "Behavioral Symptoms", items: ["Overeating or undereating", "Withdrawing from social activities", "Increased use of alcohol or substances", "Procrastination and avoidance"] },
    ],
    causes: [
      { title: "Work & Career", description: "Heavy workload, job insecurity, lack of control, poor relationships, and work-life imbalance." },
      { title: "Relationships", description: "Conflict with partners, family difficulties, social isolation, and caregiving responsibilities." },
      { title: "Financial Concerns", description: "Debt, financial insecurity, and economic uncertainty are among the most potent sources of chronic stress." },
      { title: "Major Life Changes", description: "Both positive (new job, marriage) and negative (divorce, bereavement, illness) life changes activate the stress response." },
    ],
    treatments: [
      { name: "Mindfulness & Meditation", description: "Regular mindfulness practice reduces cortisol levels and builds the capacity to respond rather than react.", type: "self-help" },
      { name: "Exercise", description: "Physical activity metabolizes stress hormones and produces mood-lifting endorphins.", type: "lifestyle" },
      { name: "Social Connection", description: "Talking with supportive friends and family activates the 'tend-and-befriend' response — a natural stress buffer.", type: "lifestyle" },
      { name: "Therapy", description: "Cognitive-behavioral approaches build resilience and help you manage stressors proactively.", type: "therapy" },
    ],
    myths: [
      { myth: "All stress is bad.", fact: "Eustress (positive stress) motivates and energizes. The goal is not to eliminate stress but to manage it effectively." },
      { myth: "Stress is just a state of mind — think your way out.", fact: "Stress has real physiological effects including hormonal changes, immune suppression, and cardiovascular impact." },
      { myth: "Relaxing means being unproductive.", fact: "Rest and recovery are essential for sustained performance — without them, stress accumulates and output eventually decreases." },
      { myth: "You have to figure it out alone.", fact: "Seeking support is one of the most effective stress management strategies available." },
    ],
    relatedTests: ["pss", "burnout", "wellbeing"],
    resources: [
      { name: "American Psychological Association", description: "apa.org/topics/stress" },
      { name: "Ameli.fr (FR)", description: "ameli.fr — ressources sur le stress" },
    ],
    i18n: {
      fr: { title: "Comprendre le stress", subtitle: "Comment votre corps et votre esprit réagissent aux exigences — et quand c'est trop", overview: "Le stress est la réponse du corps à toute demande ou menace. À petites doses, il peut être positif. Mais lorsqu'il devient chronique, il prend un sérieux impact sur la santé physique et mentale. Le stress chronique est associé aux maladies cardiovasculaires, à l'immunosuppression et aux troubles de santé mentale." },
      es: { title: "Entender el estrés", subtitle: "Cómo responden tu cuerpo y mente a las demandas — y cuándo se vuelve demasiado", overview: "El estrés es la respuesta del cuerpo a cualquier demanda o amenaza. En pequeñas dosis puede ser positivo. Pero cuando se vuelve crónico, tiene un impacto serio en la salud física y mental, asociándose con enfermedades cardiovasculares, supresión inmune y trastornos de salud mental." },
      zh: { title: "了解压力", subtitle: "您的身心如何应对需求——以及何时变得过多", overview: "压力是身体对任何需求或威胁的反应。适度的压力可以是积极的。但当压力变成慢性时，它对身心健康造成严重损害，与心脏病、免疫抑制、消化问题和心理健康状况相关。" },
    },
  },

  // ─── 6. SLEEP & INSOMNIA ───────────────────────────────────────────────────
  {
    id: "sleep",
    title: "Sleep & Insomnia",
    subtitle: "Understanding why good sleep is foundational to mental health",
    icon: "🌙",
    color: "indigo",
    readTime: 6,
    overview:
      "Sleep is not a luxury — it is a biological necessity as important as nutrition and exercise. During sleep, the brain consolidates memories, clears metabolic waste, and regulates emotions. Chronic sleep deprivation increases the risk of depression, anxiety, heart disease, and obesity. Insomnia affects approximately 10–30% of adults globally and is the most common sleep disorder.",
    symptoms: [
      { title: "Insomnia Symptoms", items: ["Difficulty falling asleep (sleep-onset insomnia)", "Frequent waking during the night", "Waking too early and unable to return to sleep", "Non-restorative sleep — feeling unrested despite sleeping", "Daytime fatigue and impaired functioning"] },
      { title: "Daytime Impact", items: ["Difficulty concentrating and memory problems", "Mood disturbances — irritability, anxiety, depression", "Reduced performance at work or school", "Increased risk of accidents", "Physical health effects — immune function, metabolism"] },
    ],
    causes: [
      { title: "Psychological Factors", description: "Stress, anxiety, depression, and hyperarousal (racing mind) are the leading causes of insomnia." },
      { title: "Poor Sleep Hygiene", description: "Irregular sleep schedules, excessive screen use before bed, caffeine, alcohol, and an unsuitable sleep environment." },
      { title: "Medical Conditions", description: "Pain conditions, sleep apnoea, restless leg syndrome, and various medications can disrupt sleep." },
      { title: "Life Events", description: "Major life changes, travel (jet lag), shift work, and aging all affect sleep architecture." },
    ],
    treatments: [
      { name: "CBT for Insomnia (CBT-I)", description: "The most effective treatment for chronic insomnia — more effective than medication long-term. Addresses underlying beliefs and behaviors.", type: "therapy" },
      { name: "Sleep Restriction Therapy", description: "Temporarily limits time in bed to consolidate sleep and build sleep pressure.", type: "therapy" },
      { name: "Sleep Hygiene", description: "Consistent schedule, cool dark room, limiting screens and caffeine, relaxing pre-sleep routine.", type: "lifestyle" },
      { name: "Relaxation Techniques", description: "Progressive muscle relaxation, body scan meditation, and deep breathing reduce pre-sleep hyperarousal.", type: "self-help" },
      { name: "Medication (short-term)", description: "Hypnotics can be useful short-term but are not recommended for chronic insomnia. Discuss with your doctor.", type: "medical" },
    ],
    myths: [
      { myth: "You can 'catch up' on sleep over the weekend.", fact: "Weekend sleep recovery partially compensates but does not fully reverse the cognitive and health effects of sleep deprivation." },
      { myth: "Alcohol helps you sleep.", fact: "Alcohol helps you fall asleep faster but severely disrupts sleep architecture, particularly REM sleep, leaving you less rested." },
      { myth: "Lying in bed even if you can't sleep is restful.", fact: "Lying awake in bed can worsen insomnia by conditioning the brain to associate bed with wakefulness. CBT-I addresses this directly." },
      { myth: "Everyone needs 8 hours.", fact: "Sleep needs vary by person. Most adults need 7–9 hours, but the right amount is whatever allows you to function well without daytime sleepiness." },
    ],
    relatedTests: ["isi", "fatigue", "phq9"],
    resources: [
      { name: "Sleepfoundation.org", description: "Comprehensive sleep education and research" },
      { name: "Réseau Morphée (FR)", description: "reseau-morphee.fr — troubles du sommeil" },
    ],
    i18n: {
      fr: { title: "Sommeil et insomnie", subtitle: "Comprendre pourquoi un bon sommeil est fondamental pour la santé mentale", overview: "Le sommeil n'est pas un luxe — c'est une nécessité biologique aussi importante que la nutrition et l'exercice. Pendant le sommeil, le cerveau consolide les souvenirs, élimine les déchets métaboliques et régule les émotions. L'insomnie touche 10 à 30 % des adultes dans le monde." },
      es: { title: "Sueño e insomnio", subtitle: "Entender por qué el buen sueño es fundamental para la salud mental", overview: "El sueño no es un lujo — es una necesidad biológica tan importante como la nutrición y el ejercicio. Durante el sueño, el cerebro consolida recuerdos, elimina desechos metabólicos y regula las emociones. El insomnio afecta al 10-30% de los adultos en todo el mundo." },
      zh: { title: "睡眠与失眠", subtitle: "了解良好睡眠对心理健康的基础性作用", overview: "睡眠不是奢侈品——它是和营养和运动一样重要的生物需求。睡眠期间，大脑巩固记忆、清除代谢废物并调节情绪。失眠影响全球10-30%的成年人。" },
    },
  },

  // ─── 7. TRAUMA & PTSD ──────────────────────────────────────────────────────
  {
    id: "trauma",
    title: "Trauma & PTSD",
    subtitle: "Understanding the lasting impact of difficult experiences — and pathways to healing",
    icon: "🌊",
    color: "teal",
    readTime: 8,
    overview:
      "Trauma is the emotional response to deeply distressing events that overwhelm our ability to cope. PTSD (Post-Traumatic Stress Disorder) can develop after experiencing or witnessing traumatic events including accidents, violence, natural disasters, and abuse. Not everyone who experiences trauma develops PTSD — resilience factors and support play a huge role. Healing is possible.",
    symptoms: [
      { title: "Re-experiencing", items: ["Unwanted, intrusive memories", "Flashbacks — reliving the trauma", "Nightmares", "Emotional or physical distress when reminded of the trauma"] },
      { title: "Avoidance", items: ["Avoiding thoughts or feelings related to the trauma", "Avoiding external reminders — places, people, situations"] },
      { title: "Negative Cognitions & Mood", items: ["Persistent negative beliefs about self or world", "Persistent negative emotional states", "Feeling detached or estranged from others", "Inability to experience positive emotions"] },
      { title: "Arousal & Reactivity", items: ["Hypervigilance and being easily startled", "Irritability or anger outbursts", "Difficulty sleeping", "Difficulty concentrating", "Reckless or self-destructive behavior"] },
    ],
    causes: [
      { title: "Types of Trauma", description: "Combat, sexual or physical assault, accidents, natural disasters, childhood abuse, sudden bereavement, witnessing violence." },
      { title: "Risk Factors", description: "Prior trauma, lack of social support, mental health history, severity and duration of trauma, and nature of the traumatic event." },
      { title: "Biological Response", description: "Trauma activates the HPA axis and stress response system. In PTSD, this system becomes dysregulated, maintaining a state of threat even when safe." },
      { title: "Childhood Trauma (Complex PTSD)", description: "Repeated childhood trauma can lead to Complex PTSD, affecting identity, relationships, and emotional regulation more pervasively." },
    ],
    treatments: [
      { name: "EMDR (Eye Movement Desensitization & Reprocessing)", description: "A highly evidence-based treatment where guided eye movements help process traumatic memories and reduce their emotional charge.", type: "therapy" },
      { name: "Trauma-Focused CBT (TF-CBT)", description: "Adapted cognitive behavioral therapy specifically designed to address trauma-related symptoms.", type: "therapy" },
      { name: "Prolonged Exposure (PE)", description: "Involves gradually approaching trauma-related memories and situations to reduce avoidance and fear.", type: "therapy" },
      { name: "Somatic Therapies", description: "Body-based approaches (somatic experiencing, yoga, breathwork) address trauma stored in the body.", type: "therapy" },
      { name: "Medication", description: "SSRIs and SNRIs can help manage symptoms. Medication is often used alongside therapy.", type: "medical" },
    ],
    myths: [
      { myth: "Only war veterans get PTSD.", fact: "PTSD can follow any traumatic event — accidents, assault, loss, childhood abuse, natural disasters. It affects people of all backgrounds." },
      { myth: "If you don't develop PTSD immediately, you won't.", fact: "PTSD can develop months or even years after the traumatic event ('delayed-onset PTSD')." },
      { myth: "Talking about trauma makes it worse.", fact: "In a safe, therapeutic context, processing trauma with a professional is one of the most effective paths to healing." },
      { myth: "Time heals all wounds.", fact: "Without proper processing, trauma can remain embedded in the nervous system. Active treatment is usually necessary for PTSD." },
    ],
    relatedTests: ["pcl5", "phq9", "gad7"],
    resources: [
      { name: "EMDR International Association", description: "emdria.org — Find EMDR therapists" },
      { name: "PSTD Association (UK)", description: "ptsduk.org" },
      { name: "3114 Numéro national (FR)", description: "3114 — 24h/24" },
    ],
    i18n: {
      fr: { title: "Traumatisme et PTSD", subtitle: "Comprendre l'impact durable des expériences difficiles — et les voies vers la guérison", overview: "Le traumatisme est la réponse émotionnelle à des événements profondément bouleversants. Le PTSD peut se développer après avoir vécu ou été témoin d'événements traumatiques. Tout le monde ne développe pas un PTSD après un traumatisme — les facteurs de résilience et le soutien jouent un rôle crucial. La guérison est possible." },
      es: { title: "Trauma y TEPT", subtitle: "Entender el impacto duradero de experiencias difíciles — y los caminos hacia la sanación", overview: "El trauma es la respuesta emocional a eventos profundamente angustiantes. El TEPT puede desarrollarse después de experimentar o presenciar eventos traumáticos. No todos desarrollan TEPT después de un trauma — los factores de resiliencia y el apoyo juegan un papel enorme. La sanación es posible." },
      zh: { title: "创伤与创伤后应激障碍", subtitle: "了解困难经历的持久影响——以及通往愈合的道路", overview: "创伤是对极度痛苦事件的情感反应。创伤后应激障碍（PTSD）可在经历或目睹创伤性事件后发展。并非每个经历创伤的人都会发展为PTSD——韧性因素和支持发挥着巨大作用。康复是可能的。" },
    },
  },

  // ─── 8. SELF-COMPASSION & SELF-ESTEEM ──────────────────────────────────────
  {
    id: "self-esteem",
    title: "Self-Compassion & Self-Esteem",
    subtitle: "Building a healthy, balanced relationship with yourself",
    icon: "💎",
    color: "pink",
    readTime: 6,
    overview:
      "Self-esteem is the subjective evaluation of your own worth. Self-compassion — treating yourself with the same kindness you would show a good friend — is increasingly recognized as more beneficial than self-esteem alone. Low self-esteem is associated with depression, anxiety, and relationship difficulties, but it can be meaningfully improved through practice and therapy.",
    symptoms: [
      { title: "Signs of Low Self-Esteem", items: ["Harsh self-criticism and negative self-talk", "Difficulty accepting compliments or success", "Fear of failure or of 'being found out' (impostor syndrome)", "Excessive need for external validation", "Difficulty setting or maintaining boundaries", "Comparing yourself negatively to others"] },
      { title: "Signs of Unhealthy High Self-Esteem", items: ["Fragile self-esteem — crumbling at any criticism", "Narcissistic traits — contempt for others", "Difficulty acknowledging mistakes or apologizing", "Overcompensating through achievement or status"] },
    ],
    causes: [
      { title: "Childhood Experiences", description: "Early experiences with caregivers, peers, and authority figures profoundly shape self-esteem through the messages received about worth and belonging." },
      { title: "Cultural & Social Factors", description: "Cultural standards, media portrayals, and social comparison (especially social media) can undermine self-esteem." },
      { title: "Negative Life Experiences", description: "Bullying, abuse, failure, rejection, and discrimination can damage self-esteem at any age." },
      { title: "Cognitive Patterns", description: "Negative automatic thoughts, catastrophizing, personalization, and perfectionism maintain low self-esteem." },
    ],
    treatments: [
      { name: "Self-Compassion Practice (MSC)", description: "Mindful Self-Compassion training teaches three components: mindfulness, common humanity, and self-kindness.", type: "self-help" },
      { name: "Cognitive Behavioral Therapy", description: "Identifies and challenges negative core beliefs about self-worth.", type: "therapy" },
      { name: "Schema Therapy", description: "Addresses deep-rooted negative beliefs (schemas) formed in childhood.", type: "therapy" },
      { name: "Journaling & Positive Self-Talk", description: "Structured practices to interrupt and reframe negative self-narrative.", type: "self-help" },
      { name: "Meaningful Engagement", description: "Building mastery through skill development and contribution to others strengthens genuine self-esteem.", type: "lifestyle" },
    ],
    myths: [
      { myth: "High self-esteem means thinking you're great at everything.", fact: "Healthy self-esteem involves accepting your whole self — strengths and limitations — with compassion, not grandiosity." },
      { myth: "Criticizing yourself helps you improve.", fact: "Harsh self-criticism activates the threat system, impairing learning. Self-compassion actually leads to greater growth and accountability." },
      { myth: "Self-compassion is just being self-indulgent.", fact: "Research consistently shows self-compassion increases motivation, resilience, and wellbeing — it is the opposite of complacency." },
      { myth: "If I love myself too much, I'll stop trying.", fact: "Self-compassion supports growth precisely because you care about yourself — not despite it." },
    ],
    relatedTests: ["rosenberg", "wellbeing", "emotional-regulation"],
    resources: [
      { name: "Self-Compassion.org (Kristin Neff)", description: "self-compassion.org — guided practices and research" },
      { name: "Mental Health Foundation", description: "mentalhealth.org.uk" },
    ],
    i18n: {
      fr: { title: "Autocompassion et estime de soi", subtitle: "Construire une relation saine et équilibrée avec soi-même", overview: "L'estime de soi est l'évaluation subjective de votre propre valeur. L'autocompassion — se traiter avec la même bienveillance que vous accorderiez à un bon ami — est de plus en plus reconnue comme bénéfique. La faible estime de soi est associée à la dépression et à l'anxiété, mais elle peut être améliorée par la pratique et la thérapie." },
      es: { title: "Autocompasión y autoestima", subtitle: "Construir una relación sana y equilibrada contigo mismo/a", overview: "La autoestima es la evaluación subjetiva de tu propio valor. La autocompasión — tratarte con la misma amabilidad que mostrarías a un buen amigo — se reconoce cada vez más como más beneficiosa que la autoestima sola. La baja autoestima está asociada con la depresión y la ansiedad, pero puede mejorarse." },
      zh: { title: "自我慈悲与自尊", subtitle: "建立与自己健康、平衡的关系", overview: "自尊是对自我价值的主观评估。自我慈悲——以对待好朋友同样的善意对待自己——越来越被认为比单纯的自尊更有益。低自尊与抑郁和焦虑相关，但通过练习和治疗可以显著改善。" },
    },
  },

  // ─── 9. GRIEF & LOSS ───────────────────────────────────────────────────────
  {
    id: "grief",
    title: "Grief & Loss",
    subtitle: "Navigating one of life's most profound emotional experiences",
    icon: "🕊️",
    color: "slate",
    readTime: 6,
    overview:
      "Grief is the natural response to loss — not only death, but also the end of relationships, significant life changes, loss of health, or any meaningful ending. There is no single 'right' way to grieve. The classic 'stages of grief' are guides, not a linear prescription. Grief can be intense, unpredictable, and long-lasting — and it is a completely human experience.",
    symptoms: [
      { title: "Emotional Responses", items: ["Deep sadness and crying", "Anger — often at the loss, at others, or at yourself", "Guilt and regret", "Anxiety and fear about the future", "Numbness or emotional absence", "Longing and yearning for what was lost"] },
      { title: "Physical Responses", items: ["Fatigue and low energy", "Sleep disturbances", "Changes in appetite", "Physical aches and heaviness", "Weakened immune system"] },
      { title: "Complicated Grief (Prolonged Grief Disorder)", items: ["Intense grief lasting more than 12 months with significant impairment", "Difficulty accepting the loss", "Bitterness or anger that persists", "Feeling that life is meaningless without the loved one"] },
    ],
    causes: [
      { title: "Types of Loss", description: "Death of a loved one, relationship breakdown, miscarriage, serious illness diagnosis, job loss, retirement, and major life transitions all cause grief." },
      { title: "Disenfranchised Grief", description: "Grief that is not socially recognized or validated — loss of a pet, pregnancy loss, estrangement — can be particularly isolating." },
      { title: "Cumulative Grief", description: "Multiple losses occurring close together can overwhelm normal coping mechanisms and require additional support." },
    ],
    treatments: [
      { name: "Grief Counseling / Therapy", description: "Provides a safe space to process loss, especially helpful when grief becomes complicated or stuck.", type: "therapy" },
      { name: "Support Groups", description: "Shared experience with others who have experienced similar loss provides powerful validation and community.", type: "self-help" },
      { name: "Meaning-Making", description: "Finding meaning or legacy in the loss (e.g., honoring a loved one's values) supports long-term integration.", type: "self-help" },
      { name: "Physical Self-Care", description: "Maintaining sleep, nutrition, and movement supports the body through the physiological stress of grief.", type: "lifestyle" },
      { name: "Medication (if needed)", description: "Antidepressants may help if grief triggers clinical depression. Discuss carefully with your doctor.", type: "medical" },
    ],
    myths: [
      { myth: "Grief follows predictable stages and has a timeline.", fact: "The 'five stages' model was descriptive, not prescriptive. Grief is highly individual, non-linear, and has no deadline." },
      { myth: "You should 'get over it' within a few months.", fact: "Grief has no fixed timeline. For significant losses, grief may be integrated but never fully disappears — and that is healthy." },
      { myth: "Crying shows weakness; you should stay strong.", fact: "Emotional expression is healthy and necessary. Suppressing grief tends to prolong and intensify it." },
      { myth: "Time heals all grief automatically.", fact: "Healing from grief is an active process. Without processing, grief can become stuck or complicated." },
    ],
    relatedTests: ["phq9", "wellbeing", "loneliness"],
    resources: [
      { name: "Cruse Bereavement Support (UK)", description: "0808 808 1677 · cruse.org.uk" },
      { name: "Alliance for Hope (Grief)", description: "afirm.life" },
      { name: "Empreintes (FR)", description: "empreintes.org — deuil" },
    ],
    i18n: {
      fr: { title: "Deuil et perte", subtitle: "Naviguer l'une des expériences émotionnelles les plus profondes de la vie", overview: "Le deuil est la réponse naturelle à une perte — pas seulement la mort, mais aussi la fin de relations, des changements de vie majeurs ou toute terminaison significative. Il n'y a pas de 'bonne façon' de faire son deuil. Le deuil peut être intense, imprévisible et durable — c'est une expérience profondément humaine." },
      es: { title: "Duelo y pérdida", subtitle: "Navegar una de las experiencias emocionales más profundas de la vida", overview: "El duelo es la respuesta natural a una pérdida — no solo la muerte, sino también el fin de relaciones, cambios de vida importantes o cualquier final significativo. No existe una 'manera correcta' de hacer el duelo. El duelo puede ser intenso, impredecible y duradero — es una experiencia profundamente humana." },
      zh: { title: "悲伤与失去", subtitle: "应对生命中最深刻的情感体验之一", overview: "悲伤是对失去的自然反应——不仅是死亡，还包括关系结束、重大生活变化或任何有意义的终结。没有一种「正确」的悲伤方式。悲伤可以是强烈的、不可预测的和持久的——这是完全人性化的体验。" },
    },
  },

  // ─── 10. ANGER MANAGEMENT ──────────────────────────────────────────────────
  {
    id: "anger",
    title: "Anger & Anger Management",
    subtitle: "Understanding anger as information — and learning to respond, not react",
    icon: "🌋",
    color: "red",
    readTime: 5,
    overview:
      "Anger is a normal and often healthy emotion. It signals that something important to us is being threatened or violated. The problem is rarely anger itself — it is what we do with it. Unmanaged anger can damage relationships, work, and physical health. Learning to recognize, understand, and express anger constructively is a learnable skill.",
    symptoms: [
      { title: "Physical Signs of Anger", items: ["Increased heart rate and blood pressure", "Muscle tension (fists, jaw, shoulders)", "Feeling hot or flushed", "Rapid breathing", "Adrenaline surge and heightened alertness"] },
      { title: "Behavioral Expressions", items: ["Verbal aggression — yelling, insults, threats", "Physical aggression", "Passive aggression — silent treatment, sarcasm", "Displacement — taking anger out on others", "Suppression — bottling up anger until it erupts"] },
      { title: "Problematic Anger Patterns", items: ["Disproportionate reactions to minor irritants", "Chronic low-level irritability", "Difficulty letting go of perceived wrongs", "Anger as a mask for underlying hurt, fear, or shame"] },
    ],
    causes: [
      { title: "Underlying Emotions", description: "Anger often masks vulnerability — hurt, fear, shame, or loss. Identifying the emotion beneath the anger is key." },
      { title: "Cognitive Triggers", description: "Interpretations of unfairness, disrespect, threat, or loss of control trigger angry responses." },
      { title: "Biology & Mental Health", description: "ADHD, PTSD, depression, bipolar disorder, and chronic pain can all manifest as increased irritability and anger." },
      { title: "Learned Patterns", description: "Growing up in environments where anger was modeled as a primary response to stress influences how we express anger as adults." },
    ],
    treatments: [
      { name: "Cognitive Behavioral Therapy (CBT)", description: "Identifies triggers, cognitive distortions, and teaches coping strategies and healthy expression.", type: "therapy" },
      { name: "Mindfulness-Based Approaches", description: "Creating a pause between stimulus and response — noticing anger without immediately acting on it.", type: "self-help" },
      { name: "Assertiveness Training", description: "Learning to express needs and frustrations respectfully and directly — neither passive nor aggressive.", type: "therapy" },
      { name: "Physical Release", description: "Exercise, particularly aerobic exercise, metabolizes stress hormones and reduces anger arousal.", type: "lifestyle" },
      { name: "Emotional Regulation Skills", description: "DBT (Dialectical Behavior Therapy) provides a specific toolkit for managing intense emotions including anger.", type: "therapy" },
    ],
    myths: [
      { myth: "Venting anger by hitting a pillow releases it.", fact: "Research shows that 'venting' tends to amplify anger rather than release it. Calming techniques are more effective." },
      { myth: "Anger always leads to aggression.", fact: "Anger and aggression are distinct. Anger is an emotion; aggression is a behavior. Anger can be expressed assertively and constructively." },
      { myth: "Calm people never feel angry.", fact: "Everyone experiences anger. The difference is in how it is recognized and expressed, not whether it is felt." },
      { myth: "If I suppress my anger, it will go away.", fact: "Suppressed anger tends to leak out — as passive aggression, depression, or physical symptoms — or erupt later." },
    ],
    relatedTests: ["emotional-regulation", "impulsivity", "pss"],
    resources: [
      { name: "BPS (UK)", description: "bps.org.uk — anger management resources" },
      { name: "APA Help Center", description: "apa.org — controlling anger" },
    ],
    i18n: {
      fr: { title: "Colère et gestion de la colère", subtitle: "Comprendre la colère comme une information — et apprendre à répondre plutôt qu'à réagir", overview: "La colère est une émotion normale et souvent saine. Elle signale qu'une chose importante pour nous est menacée ou violée. Le problème est rarement la colère elle-même, mais ce que nous en faisons. La colère non gérée peut endommager les relations, le travail et la santé physique." },
      es: { title: "Ira y manejo de la ira", subtitle: "Entender la ira como información — y aprender a responder, no a reaccionar", overview: "La ira es una emoción normal y a menudo saludable. Señala que algo importante para nosotros está siendo amenazado o violado. El problema rara vez es la ira en sí — es lo que hacemos con ella. La ira no gestionada puede dañar relaciones, el trabajo y la salud física." },
      zh: { title: "愤怒与愤怒管理", subtitle: "将愤怒理解为信息——学会回应而不是反应", overview: "愤怒是一种正常且通常健康的情感。它表明对我们重要的事物受到了威胁或侵犯。问题很少是愤怒本身——而是我们如何处理它。未加管理的愤怒会损害关系、工作和身体健康。" },
    },
  },

  // ─── 11. LONELINESS ────────────────────────────────────────────────────────
  {
    id: "loneliness",
    title: "Loneliness & Social Connection",
    subtitle: "One of the most universal human experiences — and a significant health risk",
    icon: "🤝",
    color: "blue",
    readTime: 5,
    overview:
      "Loneliness is the distressing experience of perceived social isolation — it is about the quality and subjective experience of connection, not the number of people around you. Chronic loneliness is associated with increased risk of heart disease, stroke, dementia, depression, and premature death. Former US Surgeon General Vivek Murthy declared loneliness a public health epidemic. You are far from alone in feeling alone.",
    symptoms: [
      { title: "Emotional Signs", items: ["Feeling disconnected or invisible even around others", "Feeling like no one truly understands you", "Sadness or emptiness related to social connection", "Longing for deeper relationships", "Feeling like you don't belong"] },
      { title: "Behavioral Signs", items: ["Withdrawing from social opportunities", "Difficulty trusting others", "Hypersensitivity to social cues and perceived rejection", "Excessive use of social media or screens as substitutes for connection", "Self-isolation as a coping strategy"] },
    ],
    causes: [
      { title: "Life Transitions", description: "Moving to a new city, starting a new job, retirement, bereavement, or becoming a parent can disrupt existing social networks." },
      { title: "Social Anxiety", description: "Fear of rejection or judgment can prevent meaningful engagement even when opportunities exist." },
      { title: "Structural Factors", description: "Urbanization, remote work, changing family structures, and reduced community institutions have increased chronic loneliness in modern societies." },
      { title: "Mental Health Conditions", description: "Depression, social anxiety, and autism spectrum conditions can make connection feel difficult or inaccessible." },
    ],
    treatments: [
      { name: "Gradual Social Exposure", description: "Gently increasing social activity — starting with low-stakes interactions — builds social confidence and connection.", type: "self-help" },
      { name: "Therapy (CBT for Loneliness)", description: "Addresses negative beliefs about social connection and self-worth that maintain loneliness.", type: "therapy" },
      { name: "Community Involvement", description: "Volunteering, joining clubs, religious communities, or interest groups provides structured opportunities for connection.", type: "lifestyle" },
      { name: "Quality over Quantity", description: "Investing in deepening a few existing relationships is often more impactful than expanding social networks broadly.", type: "self-help" },
      { name: "Pet Companionship", description: "Research consistently shows that pets — especially dogs — meaningfully reduce loneliness and increase social interaction.", type: "lifestyle" },
    ],
    myths: [
      { myth: "Loneliness means you have no friends.", fact: "You can feel deeply lonely surrounded by people. Loneliness is about the subjective experience of connection, not the number of contacts." },
      { myth: "If you're introverted, you expect to be lonely.", fact: "Introverts need less social interaction to recharge, but they still need meaningful connection. Introversion ≠ loneliness." },
      { myth: "Social media cures loneliness.", fact: "Passive social media use tends to worsen loneliness. Active, reciprocal connection — online or offline — is what matters." },
      { myth: "You should be able to overcome loneliness on your own.", fact: "Loneliness, by definition, requires connection with others to resolve. Seeking help is the appropriate and courageous response." },
    ],
    relatedTests: ["loneliness", "wellbeing", "life-satisfaction"],
    resources: [
      { name: "Campaign to End Loneliness (UK)", description: "campaigntoendingloneliness.org" },
      { name: "HelpGuide — Loneliness", description: "helpguide.org" },
    ],
    i18n: {
      fr: { title: "Solitude et connexion sociale", subtitle: "L'une des expériences humaines les plus universelles — et un risque de santé significatif", overview: "La solitude est l'expérience douloureuse d'un isolement social perçu — elle concerne la qualité et l'expérience subjective de la connexion, pas le nombre de personnes autour de soi. La solitude chronique est associée à un risque accru de maladies cardiaques, d'AVC, de démence et de dépression." },
      es: { title: "Soledad y conexión social", subtitle: "Una de las experiencias humanas más universales — y un riesgo de salud significativo", overview: "La soledad es la angustiante experiencia de aislamiento social percibido — se trata de la calidad de la conexión, no del número de personas alrededor. La soledad crónica se asocia con mayor riesgo de enfermedades cardíacas, accidentes cerebrovasculares, demencia y depresión." },
      zh: { title: "孤独与社会联系", subtitle: "最普遍的人类体验之一——也是重大健康风险", overview: "孤独是感知到社会隔离的痛苦体验——它关乎联系的质量和主观体验，而不是周围人的数量。慢性孤独与心脏病、中风、痴呆和抑郁风险增加相关。" },
    },
  },

  // ─── 12. SUBSTANCE USE ─────────────────────────────────────────────────────
  {
    id: "substance-use",
    title: "Substance Use & Addiction",
    subtitle: "Understanding dependence, recovery, and how to seek help without judgment",
    icon: "🍃",
    color: "green",
    readTime: 7,
    overview:
      "Substance use disorders (SUDs) are complex conditions characterized by the compulsive use of substances despite harmful consequences. They involve changes in brain structure and function that affect self-control, motivation, and the ability to experience pleasure. Addiction is not a moral failing — it is a chronic health condition with effective treatments. Recovery is possible and happens every day.",
    symptoms: [
      { title: "Behavioral Signs", items: ["Using substances in larger amounts or for longer than intended", "Unsuccessful efforts to cut down or control use", "Spending significant time obtaining, using, or recovering from substances", "Craving or strong urge to use", "Failing to fulfill major obligations at work, school, or home", "Continuing use despite social or interpersonal problems caused by it"] },
      { title: "Physical Signs", items: ["Tolerance — needing more to achieve the same effect", "Withdrawal symptoms when use is reduced", "Using to avoid withdrawal symptoms", "Changes in appearance, weight, and hygiene"] },
    ],
    causes: [
      { title: "Brain Reward System", description: "Substances hijack the brain's dopamine reward system, creating powerful associations between the substance and pleasure or relief." },
      { title: "Genetic Factors", description: "40–60% of addiction risk is hereditary. Having a family history significantly increases vulnerability." },
      { title: "Mental Health Conditions", description: "Anxiety, depression, PTSD, and ADHD often co-occur with SUDs ('dual diagnosis'). Substances may be used to self-medicate." },
      { title: "Social & Environmental Factors", description: "Adverse childhood experiences, trauma, social environment, peer use, and availability of substances influence risk." },
    ],
    treatments: [
      { name: "Motivational Interviewing", description: "A collaborative approach that helps individuals find their own motivation for change without pressure.", type: "therapy" },
      { name: "Cognitive Behavioral Therapy (CBT)", description: "Identifies triggers, develops coping strategies, and addresses underlying beliefs that maintain substance use.", type: "therapy" },
      { name: "Medication-Assisted Treatment (MAT)", description: "Medications (e.g., methadone, buprenorphine, naltrexone) reduce cravings and withdrawal. Highly effective for opioid and alcohol disorders.", type: "medical" },
      { name: "12-Step Programs (AA, NA)", description: "Community-based mutual support programs provide structure, accountability, and fellowship.", type: "self-help" },
      { name: "Harm Reduction", description: "Practical approaches (e.g., needle exchange, naloxone access) that reduce the risks of substance use without requiring abstinence.", type: "self-help" },
    ],
    myths: [
      { myth: "Addiction is a choice and a moral failing.", fact: "Addiction involves measurable changes in brain structure and function. No one chooses to become addicted, just as no one chooses to develop cancer." },
      { myth: "You have to hit 'rock bottom' before getting help.", fact: "Treatment is effective at any stage of addiction. Early intervention consistently produces better outcomes." },
      { myth: "Relapse means treatment failed.", fact: "Relapse rates for addiction are similar to those for other chronic conditions (asthma, hypertension). Relapse is a normal part of the recovery journey, not a failure." },
      { myth: "Willpower is enough to overcome addiction.", fact: "Addiction involves brain changes that override rational decision-making. Professional support and evidence-based treatment are essential." },
    ],
    relatedTests: ["audit", "wellbeing"],
    resources: [
      { name: "SAMHSA (US)", description: "1-800-662-HELP (4357) · samhsa.gov" },
      { name: "Addaction / With You (UK)", description: "wearewithyou.org.uk" },
      { name: "Alcool Info Service (FR)", description: "0 980 980 930" },
    ],
    i18n: {
      fr: { title: "Consommation de substances et addiction", subtitle: "Comprendre la dépendance, le rétablissement et comment chercher de l'aide sans jugement", overview: "Les troubles liés à l'usage de substances sont des conditions complexes caractérisées par une utilisation compulsive malgré les conséquences néfastes. L'addiction n'est pas un échec moral — c'est une condition de santé chronique avec des traitements efficaces. Le rétablissement est possible." },
      es: { title: "Uso de sustancias y adicción", subtitle: "Entender la dependencia, la recuperación y cómo buscar ayuda sin juicio", overview: "Los trastornos por uso de sustancias son condiciones complejas caracterizadas por el uso compulsivo a pesar de las consecuencias dañinas. La adicción no es un fracaso moral — es una condición de salud crónica con tratamientos efectivos. La recuperación es posible y ocurre todos los días." },
      zh: { title: "物质使用与成瘾", subtitle: "了解依赖、康复以及如何无偏见地寻求帮助", overview: "物质使用障碍是复杂的状况，以尽管存在有害后果仍强迫性使用物质为特征。成瘾不是道德失败——它是一种慢性健康状况，有有效的治疗方法。康复是可能的，每天都在发生。" },
    },
  },

  // ─── 13. OCD ───────────────────────────────────────────────────────────────
  {
    id: "ocd",
    title: "OCD — Obsessive-Compulsive Disorder",
    subtitle: "Far more than neatness — a misunderstood and treatable condition",
    icon: "🔄",
    color: "cyan",
    readTime: 6,
    overview:
      "OCD is characterized by unwanted, intrusive thoughts (obsessions) and repetitive behaviors or mental acts (compulsions) performed to reduce distress. OCD is widely misunderstood — it is not about being neat or organized, and the obsessions are ego-dystonic (felt as alien and unwanted, not reflecting the person's values). OCD responds well to specific treatments, particularly ERP therapy.",
    symptoms: [
      { title: "Common Obsession Themes", items: ["Contamination fears (germs, illness)", "Harm — fear of hurting oneself or others", "Symmetry and 'just right' sensations", "Unwanted sexual or violent thoughts", "Religious or moral scrupulosity", "Relationship obsessions (ROCD)"] },
      { title: "Common Compulsions", items: ["Washing and cleaning rituals", "Checking (locks, appliances, messages)", "Counting, repeating, or arranging", "Seeking reassurance from others", "Mental compulsions — reviewing, praying, neutralizing", "Avoidance of triggers"] },
    ],
    causes: [
      { title: "Brain Function", description: "Hyperactivity in specific brain circuits (orbitofrontal cortex, thalamus, caudate nucleus) is consistently found in OCD neuroimaging." },
      { title: "Genetics", description: "OCD has a significant heritable component, with approximately 40–65% genetic contribution." },
      { title: "Cognitive Factors", description: "Overestimation of threat, inflated responsibility, perfectionism, and difficulty tolerating uncertainty are key cognitive features of OCD." },
      { title: "Behavioral Factors", description: "Compulsions provide short-term relief but reinforce the cycle — maintaining and strengthening obsessions over time." },
    ],
    treatments: [
      { name: "Exposure & Response Prevention (ERP)", description: "The gold-standard OCD treatment. Involves gradually facing feared situations without performing compulsions, allowing anxiety to naturally decrease.", type: "therapy" },
      { name: "Cognitive Therapy", description: "Addresses distorted beliefs about obsessions — their meaning, responsibility, and the necessity of compulsions.", type: "therapy" },
      { name: "SSRIs (at high doses)", description: "SSRIs (especially at higher doses than for depression) significantly reduce OCD symptoms. Often combined with ERP.", type: "medical" },
      { name: "NOCD and Digital ERP", description: "Digital ERP programs provide accessible, evidence-based OCD treatment with therapist support.", type: "therapy" },
    ],
    myths: [
      { myth: "OCD just means being really neat or organized.", fact: "OCD involves intrusive, unwanted thoughts that cause significant distress, and time-consuming rituals. It is rarely about neatness." },
      { myth: "People with OCD are in control of their thoughts.", fact: "OCD obsessions are intrusive and ego-dystonic — they are experienced as alien and unwanted, not reflections of desires or values." },
      { myth: "You should try to suppress OCD thoughts.", fact: "Thought suppression makes intrusive thoughts more frequent and intense. Acceptance-based approaches are more effective." },
      { myth: "OCD is rare.", fact: "OCD affects 2–3% of the population worldwide — about 1 in 40 people." },
    ],
    relatedTests: ["ocd", "gad7"],
    resources: [
      { name: "IOCDF (US)", description: "iocdf.org — International OCD Foundation" },
      { name: "OCD-UK", description: "ocduk.org" },
      { name: "NOCD", description: "nocdhelp.com — digital ERP" },
    ],
    i18n: {
      fr: { title: "TOC — Trouble Obsessionnel Compulsif", subtitle: "Bien plus que la propreté — une condition mal comprise et traitable", overview: "Le TOC est caractérisé par des pensées intrusives et indésirables (obsessions) et des comportements répétitifs (compulsions) effectués pour réduire la détresse. Le TOC est largement mal compris — il ne s'agit pas d'être ordonné, et les obsessions sont vécues comme étrangères et indésirables." },
      es: { title: "TOC — Trastorno Obsesivo-Compulsivo", subtitle: "Mucho más que orden — una condición incomprendida y tratable", overview: "El TOC se caracteriza por pensamientos intrusivos no deseados (obsesiones) y comportamientos repetitivos (compulsiones) realizados para reducir el malestar. El TOC es ampliamente malentendido — no se trata de ser ordenado, y las obsesiones son vividas como ajenas e indeseadas." },
      zh: { title: "强迫症（OCD）", subtitle: "远不只是整洁——一种被误解但可治疗的疾病", overview: "强迫症以不想要的侵入性思想（强迫观念）和重复行为（强迫行为）为特征，后者是为了减少痛苦而进行的。强迫症被广泛误解——它不是关于整洁，强迫观念被体验为陌生的和不受欢迎的。" },
    },
  },

  // ─── 14. EATING DISORDERS ──────────────────────────────────────────────────
  {
    id: "eating-disorders",
    title: "Eating Disorders",
    subtitle: "Serious but treatable conditions — recovery is possible",
    icon: "🌿",
    color: "emerald",
    readTime: 7,
    overview:
      "Eating disorders are serious mental health conditions characterized by persistent disturbances in eating behavior and related thoughts and feelings. They have the highest mortality rate of any psychiatric condition. They affect people of all genders, ages, ethnicities, and body sizes. Early intervention is critical — the sooner treatment begins, the better the outcomes.",
    symptoms: [
      { title: "Anorexia Nervosa", items: ["Restriction of food intake leading to significantly low body weight", "Intense fear of gaining weight", "Distorted body image — seeing oneself as larger than one is", "Denial of the seriousness of low weight", "Excessive exercise"] },
      { title: "Bulimia Nervosa", items: ["Recurrent episodes of binge eating (eating large amounts rapidly)", "Recurrent compensatory behaviors (purging, excessive exercise, fasting)", "Self-evaluation unduly influenced by body shape and weight", "Shame and secrecy around eating behavior"] },
      { title: "Binge Eating Disorder", items: ["Recurrent episodes of binge eating without compensatory behaviors", "Eating rapidly or beyond fullness", "Eating when not hungry or alone due to embarrassment", "Feelings of disgust, guilt, or shame afterward"] },
      { title: "ARFID (Avoidant/Restrictive Food Intake)", items: ["Avoidance of foods based on sensory characteristics", "Lack of interest in eating", "Concern about adverse consequences of eating", "Significant nutritional deficiency or weight loss"] },
    ],
    causes: [
      { title: "Biological Factors", description: "Genetics, brain chemistry (especially serotonin), and hormonal factors contribute to eating disorder risk." },
      { title: "Psychological Factors", description: "Perfectionism, low self-esteem, trauma, anxiety, and difficulty tolerating emotions are strongly associated with eating disorders." },
      { title: "Sociocultural Factors", description: "Diet culture, media images of ideal bodies, weight stigma, and pressure to conform to beauty standards." },
      { title: "Family & Relationship Factors", description: "Family history of eating disorders or dieting, critical comments about weight, and certain family dynamics can increase risk." },
    ],
    treatments: [
      { name: "Family-Based Treatment (FBT)", description: "Particularly effective for adolescents with anorexia — involves the family as a key part of treatment.", type: "therapy" },
      { name: "Cognitive Behavioral Therapy (CBT-E)", description: "Enhanced CBT developed specifically for eating disorders — addresses distorted beliefs about food, shape, and weight.", type: "therapy" },
      { name: "Dialectical Behavior Therapy (DBT)", description: "Particularly helpful for binge eating and bulimia — builds emotional regulation and distress tolerance skills.", type: "therapy" },
      { name: "Medical Management", description: "Eating disorders require medical monitoring — nutritional rehabilitation, electrolyte management, and sometimes hospitalization.", type: "medical" },
      { name: "Dietetic Support", description: "Working with a dietitian experienced in eating disorder recovery to establish a healthy, sustainable relationship with food.", type: "medical" },
    ],
    myths: [
      { myth: "Eating disorders are a choice or a diet gone too far.", fact: "Eating disorders are serious mental health conditions with biological, psychological, and social components." },
      { myth: "Only thin, young women get eating disorders.", fact: "Eating disorders affect all genders, all body sizes, and all ages. Many cases go unrecognized in people who are not underweight." },
      { myth: "You can tell someone has an eating disorder by their weight.", fact: "People with eating disorders come in all body sizes. You cannot identify an eating disorder by appearance alone." },
      { myth: "Eating disorders aren't that serious.", fact: "Eating disorders have the highest mortality rate of any psychiatric condition." },
    ],
    relatedTests: ["scoff", "rosenberg", "wellbeing"],
    resources: [
      { name: "NEDA (US)", description: "1-800-931-2237 · nationaleatingdisorders.org" },
      { name: "BEAT (UK)", description: "beateatingdisorders.org.uk" },
      { name: "Anorexie Boulimie Info (FR)", description: "0 810 037 037" },
    ],
    i18n: {
      fr: { title: "Troubles des conduites alimentaires", subtitle: "Des conditions sérieuses mais traitables — la guérison est possible", overview: "Les troubles des conduites alimentaires (TCA) sont des conditions de santé mentale sérieuses caractérisées par des perturbations persistantes du comportement alimentaire. Ils ont le taux de mortalité le plus élevé de toutes les conditions psychiatriques. Ils touchent des personnes de tous genres, âges et tailles." },
      es: { title: "Trastornos alimentarios", subtitle: "Condiciones serias pero tratables — la recuperación es posible", overview: "Los trastornos alimentarios son condiciones de salud mental serias caracterizadas por perturbaciones persistentes en el comportamiento alimentario. Tienen la tasa de mortalidad más alta de cualquier condición psiquiátrica. Afectan a personas de todos los géneros, edades y tallas corporales." },
      zh: { title: "饮食失调", subtitle: "严重但可治疗的状况——康复是可能的", overview: "饮食失调是严重的心理健康状况，以饮食行为的持续紊乱为特征。它们在所有精神疾病中拥有最高的死亡率。它们影响所有性别、年龄、民族和体型的人。早期干预至关重要。" },
    },
  },

  // ─── 15. SOCIAL MEDIA & MENTAL HEALTH ──────────────────────────────────────
  {
    id: "social-media",
    title: "Social Media & Mental Health",
    subtitle: "Navigating the digital world while protecting your wellbeing",
    icon: "📱",
    color: "violet",
    readTime: 5,
    overview:
      "Social media platforms are designed to be engaging — they activate the same dopamine circuits as other rewarding behaviors. While they offer real benefits for connection and community, heavy or passive use is associated with increased anxiety, depression, loneliness, poor sleep, and negative body image. The relationship is complex and individual — what matters is how you use it.",
    symptoms: [
      { title: "Warning Signs of Problematic Use", items: ["Compulsive checking — feeling anxious when you can't check", "FOMO (Fear of Missing Out) — distress when not connected", "Spending more time on social media than intended", "Neglecting real-world relationships for online activity", "Mood deteriorating after social media use", "Comparing yourself negatively to others' curated lives"] },
    ],
    causes: [
      { title: "Design Psychology", description: "Infinite scroll, variable reward schedules, and notification systems are specifically designed to maximize engagement — often at the cost of user wellbeing." },
      { title: "Social Comparison", description: "Social media provides constant upward comparison opportunities. Curated highlight reels do not represent real life." },
      { title: "Cyberbullying", description: "Online harassment, trolling, and exclusion can cause significant psychological harm, particularly in adolescents." },
      { title: "Sleep Disruption", description: "Evening screen use suppresses melatonin and the mental stimulation delays sleep onset, disrupting crucial recovery sleep." },
    ],
    treatments: [
      { name: "Digital Boundaries", description: "Setting specific times and limits for social media use — e.g., no phones in the bedroom, social media-free mornings.", type: "self-help" },
      { name: "Mindful Consumption", description: "Actively choosing to engage with content that uplifts or educates rather than mindlessly scrolling.", type: "self-help" },
      { name: "Curating Your Feed", description: "Unfollowing accounts that trigger comparison or negative feelings, following content that adds genuine value.", type: "self-help" },
      { name: "Real-World Connection", description: "Prioritizing face-to-face interaction. Research consistently shows in-person connection provides stronger wellbeing benefits.", type: "lifestyle" },
    ],
    myths: [
      { myth: "Social media is just an amplified version of real life.", fact: "Social media shows highly curated, edited versions of people's best moments — it fundamentally distorts perception of how others live." },
      { myth: "More followers equals more social connection.", fact: "Broad, shallow online connections provide far fewer wellbeing benefits than a small number of deep, reciprocal relationships." },
      { myth: "Digital detoxes are the solution.", fact: "Short detoxes can help, but sustainable changes to how you use social media are more effective long-term." },
      { myth: "Social media only affects teenagers.", fact: "Adults are equally susceptible to the psychological effects of social comparison and compulsive use." },
    ],
    relatedTests: ["loneliness", "wellbeing", "pss"],
    resources: [
      { name: "Center for Humane Technology", description: "humanetech.com" },
      { name: "Common Sense Media", description: "commonsensemedia.org" },
    ],
    i18n: {
      fr: { title: "Réseaux sociaux et santé mentale", subtitle: "Naviguer dans le monde numérique en protégeant votre bien-être", overview: "Les plateformes de réseaux sociaux sont conçues pour être engageantes. Si elles offrent de réels avantages pour la connexion, une utilisation intense ou passive est associée à une augmentation de l'anxiété, de la dépression, de la solitude, du mauvais sommeil et d'une image corporelle négative." },
      es: { title: "Redes sociales y salud mental", subtitle: "Navegar el mundo digital mientras proteges tu bienestar", overview: "Las plataformas de redes sociales están diseñadas para ser atractivas. Si bien ofrecen beneficios reales para la conexión, el uso intenso o pasivo se asocia con mayor ansiedad, depresión, soledad, mal sueño e imagen corporal negativa. La relación es compleja e individual." },
      zh: { title: "社交媒体与心理健康", subtitle: "在保护心理健康的同时驾驭数字世界", overview: "社交媒体平台被设计为引人入胜的。虽然它们提供了真正的连接好处，但大量或被动使用与焦虑、抑郁、孤独、睡眠不足和负面身体形象的增加有关。关系是复杂的和个性化的。" },
    },
  },

  // ─── 16. MINDFULNESS ───────────────────────────────────────────────────────
  {
    id: "mindfulness",
    title: "Mindfulness & Meditation",
    subtitle: "The evidence-based practice of present-moment awareness",
    icon: "🧘",
    color: "teal",
    readTime: 5,
    overview:
      "Mindfulness is the intentional, non-judgmental awareness of the present moment — including thoughts, feelings, body sensations, and surrounding environment. It is not about emptying your mind. Decades of research confirm that regular mindfulness practice reduces anxiety, depression, and stress, while improving attention, emotional regulation, immune function, and overall wellbeing.",
    symptoms: [
      { title: "Signs You May Benefit From Mindfulness", items: ["Difficulty staying present — mind constantly wandering", "Reacting automatically to emotions without reflection", "Chronic stress or anxiety", "Difficulty sleeping due to racing thoughts", "Feeling disconnected from your body or experiences", "Tendency to ruminate on the past or worry about the future"] },
    ],
    causes: [
      { title: "The Default Mode Network", description: "Our brains are wired to wander to the past and future — the 'default mode network'. Mindfulness trains the ability to redirect attention to the present." },
      { title: "Neuroplasticity", description: "Mindfulness practice physically changes the brain — increasing grey matter density in areas associated with attention, compassion, and emotional regulation." },
    ],
    treatments: [
      { name: "Mindfulness-Based Stress Reduction (MBSR)", description: "The original 8-week mindfulness program developed by Jon Kabat-Zinn. Extensively researched and highly effective.", type: "therapy" },
      { name: "Mindfulness-Based Cognitive Therapy (MBCT)", description: "Combines mindfulness with CBT — particularly effective for preventing depressive relapse.", type: "therapy" },
      { name: "Body Scan Meditation", description: "A foundational practice of systematically attending to different body regions, developing body awareness and relaxation.", type: "self-help" },
      { name: "Mindful Movement (Yoga, Tai Chi)", description: "Embodied mindfulness practices that combine movement with present-moment awareness.", type: "lifestyle" },
      { name: "Daily Micro-Practices", description: "Brief mindful moments throughout the day — mindful eating, walking, or breathing — can have cumulative benefits.", type: "self-help" },
    ],
    myths: [
      { myth: "Mindfulness means emptying your mind.", fact: "Mindfulness is not about stopping thoughts — it is about observing them without judgment. The mind will always wander; the practice is noticing and returning." },
      { myth: "You need to meditate for hours to benefit.", fact: "Even 5–10 minutes of daily practice produces measurable benefits. Consistency matters more than duration." },
      { myth: "Mindfulness is just relaxation.", fact: "While relaxation can be a by-product, mindfulness is a training of attention and awareness. It can sometimes bring up difficult emotions as they become more visible." },
      { myth: "Mindfulness is a religious or spiritual practice.", fact: "The modern evidence-based form of mindfulness is a secular psychological skill, regardless of its Buddhist roots." },
    ],
    relatedTests: ["pss", "wellbeing", "emotional-regulation"],
    resources: [
      { name: "MBSR Courses (Jon Kabat-Zinn)", description: "umassmed.edu/cfm" },
      { name: "Headspace / Calm", description: "Guided meditation apps" },
      { name: "Petit Bambou (FR)", description: "Application de méditation en français" },
    ],
    i18n: {
      fr: { title: "Pleine conscience et méditation", subtitle: "La pratique fondée sur des preuves de la conscience du moment présent", overview: "La pleine conscience est la conscience intentionnelle et non-jugeante du moment présent. Des décennies de recherches confirment que la pratique régulière réduit l'anxiété, la dépression et le stress, tout en améliorant l'attention, la régulation émotionnelle et le bien-être général." },
      es: { title: "Mindfulness y meditación", subtitle: "La práctica basada en evidencia de la conciencia del momento presente", overview: "El mindfulness es la conciencia intencional y sin juicio del momento presente. Décadas de investigación confirman que la práctica regular reduce la ansiedad, la depresión y el estrés, mientras mejora la atención, la regulación emocional y el bienestar general." },
      zh: { title: "正念与冥想", subtitle: "基于证据的当下时刻觉知实践", overview: "正念是对当下时刻的有意、不评判的觉知。数十年的研究证实，定期练习可以减少焦虑、抑郁和压力，同时改善注意力、情绪调节、免疫功能和整体健康。" },
    },
  },

  // ─── 17. RESILIENCE ────────────────────────────────────────────────────────
  {
    id: "resilience",
    title: "Resilience & Coping",
    subtitle: "Building the capacity to adapt and recover from life's challenges",
    icon: "🌱",
    color: "green",
    readTime: 5,
    overview:
      "Resilience is not the absence of difficulty or distress — it is the ability to adapt well in the face of adversity, trauma, tragedy, threats, or significant sources of stress. Resilience is not a fixed trait; it is a set of skills and resources that can be developed over time. It involves both individual qualities and the strength of our support systems.",
    symptoms: [
      { title: "Signs of Lower Resilience", items: ["Being overwhelmed by setbacks that others navigate more easily", "Difficulty recovering from disappointments, criticism, or failure", "Catastrophizing — assuming the worst outcome", "Feeling helpless when facing challenges", "Emotional reactions that feel disproportionate to events"] },
      { title: "Signs of Resilient Functioning", items: ["Bouncing back from difficulties with learning", "Maintaining perspective during adversity", "Seeking support when needed", "Adapting to change with flexibility", "Finding meaning in challenging experiences"] },
    ],
    causes: [
      { title: "Protective Factors", description: "Strong social connections, self-efficacy, positive emotions, meaning and purpose, and access to resources all build resilience." },
      { title: "Risk Factors", description: "Adverse childhood experiences (ACEs), chronic stress, social isolation, and lack of coping skills reduce resilience capacity." },
      { title: "Post-Traumatic Growth", description: "Many people who experience significant adversity report positive psychological change as a result — growth in strength, relationships, and appreciation of life." },
    ],
    treatments: [
      { name: "Building Social Support", description: "Resilience is fundamentally relational — strong relationships are the single most powerful resilience factor.", type: "lifestyle" },
      { name: "Meaning-Making", description: "Finding purpose or learning in adversity — through reflection, narrative, or contribution — is central to resilient adaptation.", type: "self-help" },
      { name: "Cognitive Reappraisal", description: "Reframing the meaning of stressful events to reduce their emotional impact — a skill taught in CBT.", type: "self-help" },
      { name: "Self-Care Fundamentals", description: "Sleep, nutrition, exercise, and rest provide the physiological foundation for emotional resilience.", type: "lifestyle" },
      { name: "Therapy (when needed)", description: "Processing past adversity and building coping skills with a therapist strengthens resilience capacity.", type: "therapy" },
    ],
    myths: [
      { myth: "Resilient people don't struggle or feel pain.", fact: "Resilience involves feeling pain and difficulty — and continuing to function and adapt despite it. It is not invulnerability." },
      { myth: "Resilience is innate — you either have it or you don't.", fact: "Resilience is a set of learnable skills and cultivatable resources. It can be built at any age." },
      { myth: "Asking for help is a sign of low resilience.", fact: "Seeking support is one of the most resilient behaviors there is — resilience is fundamentally relational." },
      { myth: "Staying positive is the key to resilience.", fact: "Toxic positivity — denying negative emotions — actually reduces resilience. Authentic emotional processing is more effective." },
    ],
    relatedTests: ["wellbeing", "pss", "life-satisfaction"],
    resources: [
      { name: "APA — Road to Resilience", description: "apa.org/helpcenter/road-resilience" },
      { name: "Greater Good Science Center", description: "greatergood.berkeley.edu" },
    ],
    i18n: {
      fr: { title: "Résilience et coping", subtitle: "Développer la capacité à s'adapter et à récupérer des défis de la vie", overview: "La résilience n'est pas l'absence de difficulté — c'est la capacité à bien s'adapter face à l'adversité. La résilience n'est pas un trait fixe ; c'est un ensemble de compétences et de ressources qui peuvent être développées. Elle implique à la fois des qualités individuelles et la solidité de nos systèmes de soutien." },
      es: { title: "Resiliencia y afrontamiento", subtitle: "Construir la capacidad de adaptarse y recuperarse de los desafíos de la vida", overview: "La resiliencia no es la ausencia de dificultad — es la capacidad de adaptarse bien frente a la adversidad. La resiliencia no es un rasgo fijo; es un conjunto de habilidades y recursos que se pueden desarrollar. Involucra tanto cualidades individuales como la solidez de nuestros sistemas de apoyo." },
      zh: { title: "韧性与应对", subtitle: "建立适应和从生活挑战中恢复的能力", overview: "韧性不是困难的缺失——而是在逆境中适应良好的能力。韧性不是固定特质；它是一套可以随时间发展的技能和资源。它既涉及个人品质，也涉及支持系统的强度。" },
    },
  },

  // ─── 18. BIPOLAR DISORDER ──────────────────────────────────────────────────
  {
    id: "bipolar",
    title: "Bipolar Disorder",
    subtitle: "Understanding mood episodes and living well with bipolar",
    icon: "🎭",
    color: "violet",
    readTime: 7,
    overview:
      "Bipolar disorder involves episodes of mania or hypomania (elevated or irritable mood with increased energy) and depression. There are several types: Bipolar I, Bipolar II, and Cyclothymia. It affects approximately 2–4% of the global population. With proper diagnosis and treatment — typically including medication and therapy — most people with bipolar disorder can lead fulfilling, stable lives.",
    symptoms: [
      { title: "Manic Episode Signs", items: ["Abnormally elevated, expansive, or irritable mood", "Decreased need for sleep (feeling rested after only 3 hours)", "More talkative than usual or feeling pressure to keep talking", "Racing thoughts or flight of ideas", "Inflated self-esteem or grandiosity", "Increased goal-directed activity or agitation", "Risky behaviors — impulsive spending, sexual indiscretions, poor business investments"] },
      { title: "Hypomanic Episode", items: ["Similar to mania but less severe and not causing major functional impairment", "Noticeable to others but not leading to hospitalization"] },
      { title: "Depressive Episode Signs", items: ["Depressed mood or loss of interest or pleasure", "Significant weight or appetite changes", "Insomnia or hypersomnia", "Fatigue and loss of energy", "Feelings of worthlessness or excessive guilt", "Difficulty thinking or concentrating", "Thoughts of death or suicidal ideation"] },
    ],
    causes: [
      { title: "Genetics", description: "Bipolar disorder has one of the highest heritabilities of any psychiatric condition (~80%). Having a first-degree relative increases risk 8-10x." },
      { title: "Brain Structure & Chemistry", description: "Differences in brain structure, particularly in regions regulating mood and impulse control, and in neurotransmitter systems." },
      { title: "Triggers", description: "Sleep disruption, substance use, high stress, and major life changes can trigger episodes in biologically vulnerable individuals." },
    ],
    treatments: [
      { name: "Mood Stabilizers (Lithium)", description: "Lithium remains the gold standard for bipolar disorder — effective for both mania and depression, and reduces suicide risk.", type: "medical" },
      { name: "Anticonvulsants (Valproate, Lamotrigine)", description: "Several anticonvulsant medications are effective mood stabilizers, particularly for bipolar II and rapid cycling.", type: "medical" },
      { name: "Atypical Antipsychotics", description: "Often used for acute mania and sometimes depression. Some (e.g., quetiapine) are effective for both phases.", type: "medical" },
      { name: "Psychoeducation", description: "Understanding bipolar disorder, recognizing early warning signs, and learning to track mood protects against future episodes.", type: "therapy" },
      { name: "Interpersonal & Social Rhythm Therapy (IPSRT)", description: "Stabilizes daily routines (especially sleep) and addresses interpersonal issues — key triggers for bipolar episodes.", type: "therapy" },
    ],
    myths: [
      { myth: "Bipolar disorder means extreme mood swings every day.", fact: "Bipolar episodes can last weeks to months, with stable periods in between. Daily mood fluctuations are normal and different from bipolar disorder." },
      { myth: "People with bipolar are dangerous or unpredictable.", fact: "The vast majority of people with bipolar disorder are not violent. Stigma is often more damaging than the condition itself." },
      { myth: "Once you're on medication, you don't need therapy.", fact: "Medication and psychotherapy work best in combination. Therapy addresses patterns, coping, and life impacts that medication alone cannot." },
      { myth: "Bipolar disorder cannot be managed well.", fact: "With proper diagnosis and treatment, most people with bipolar disorder lead full, meaningful lives — many are high achievers." },
    ],
    relatedTests: ["mdq", "phq9", "wellbeing"],
    resources: [
      { name: "DBSA (US)", description: "Depression & Bipolar Support Alliance — dbsalliance.org" },
      { name: "Bipolar UK", description: "bipolaruk.org" },
      { name: "UNAFAM (FR)", description: "unafam.org" },
    ],
    i18n: {
      fr: { title: "Trouble bipolaire", subtitle: "Comprendre les épisodes d'humeur et bien vivre avec le trouble bipolaire", overview: "Le trouble bipolaire implique des épisodes de manie ou d'hypomanie (humeur élevée ou irritable avec énergie accrue) et de dépression. Avec un diagnostic et un traitement appropriés, la plupart des personnes atteintes peuvent mener une vie épanouie et stable." },
      es: { title: "Trastorno bipolar", subtitle: "Entender los episodios de estado de ánimo y vivir bien con el trastorno bipolar", overview: "El trastorno bipolar implica episodios de manía o hipomanía (estado de ánimo elevado o irritable con energía aumentada) y depresión. Con un diagnóstico y tratamiento adecuados, la mayoría de las personas con trastorno bipolar pueden llevar vidas plenas y estables." },
      zh: { title: "双相情感障碍", subtitle: "了解情绪发作并与双相情感障碍共同良好生活", overview: "双相情感障碍涉及躁狂或轻躁狂发作（情绪高涨或易激惹，精力增加）和抑郁发作。通过适当的诊断和治疗，大多数双相情感障碍患者可以过上充实、稳定的生活。" },
    },
  },

  // ─── 19. MEN'S MENTAL HEALTH ───────────────────────────────────────────────
  {
    id: "mens-mental-health",
    title: "Men's Mental Health",
    subtitle: "Breaking the stigma — mental health affects everyone, regardless of gender",
    icon: "💪",
    color: "blue",
    readTime: 6,
    overview:
      "Men experience mental health conditions at similar rates to women, but are significantly less likely to seek help, diagnose, or discuss them. Men account for approximately 75% of deaths by suicide in high-income countries. Cultural messages about masculinity, strength, and stoicism create barriers to help-seeking that cost lives. Mental health is not a weakness — and neither is asking for help.",
    symptoms: [
      { title: "How Depression May Present in Men", items: ["Irritability, anger, and aggression rather than sadness", "Risk-taking behaviors", "Increased alcohol or substance use", "Physical symptoms — fatigue, sleep problems, pain", "Withdrawing from relationships and responsibilities", "Working excessively as a distraction"] },
      { title: "Barriers Men Face", items: ["Cultural expectation to 'man up' and be self-sufficient", "Fear of appearing weak or vulnerable", "Lack of social support and emotional language", "Stigma within male peer groups", "Difficulty recognizing depression when it presents differently"] },
    ],
    causes: [
      { title: "Cultural Expectations", description: "'Traditional masculinity norms' — self-reliance, emotional stoicism, toughness — create barriers to acknowledging and seeking help for mental health difficulties." },
      { title: "Social Isolation", description: "Men typically have smaller social networks and fewer close confidants than women, reducing access to informal support." },
      { title: "Life Transitions", description: "Retirement, relationship breakdown, job loss, and fatherhood are particularly challenging transitional periods for men's mental health." },
    ],
    treatments: [
      { name: "Peer Support & Men's Groups", description: "Male-specific support groups (e.g., ManTherapy, Men's Sheds) provide community without the vulnerability of one-on-one disclosure.", type: "self-help" },
      { name: "Action-Oriented Approaches", description: "Problem-focused therapies, structured exercise, and practical CBT tend to be more engaging for men who prefer action to talking.", type: "therapy" },
      { name: "Therapy (online or in-person)", description: "Any form of therapy — CBT, ACT, EMDR — can be effective when accessed. Online therapy reduces barriers for many men.", type: "therapy" },
      { name: "Physical Activity", description: "Exercise provides a culturally acceptable outlet and has substantial evidence for improving male mental health.", type: "lifestyle" },
    ],
    myths: [
      { myth: "Real men don't have mental health problems.", fact: "Mental health conditions are biological and psychological — they have no relationship to strength, character, or masculinity." },
      { myth: "Men who seek help are weak.", fact: "Seeking help when struggling requires courage and self-awareness — qualities associated with genuine strength and leadership." },
      { myth: "Men don't get depressed — they just need to get on with it.", fact: "Men experience depression at high rates, but often express it differently. Unrecognized and untreated depression is a leading contributor to male suicide." },
      { myth: "Talking about problems makes them worse.", fact: "Talking about mental health difficulties — with friends, family, or professionals — consistently produces better outcomes." },
    ],
    relatedTests: ["phq9", "pss", "wellbeing", "burnout"],
    resources: [
      { name: "Movember Foundation", description: "movember.com — men's health" },
      { name: "HeadsUpGuys", description: "headsupguys.org — male depression" },
      { name: "CALM (UK)", description: "thecalmzone.net — 0800 58 58 58" },
      { name: "ManTherapy (US)", description: "mantherapy.org" },
    ],
    i18n: {
      fr: { title: "Santé mentale des hommes", subtitle: "Briser la stigmatisation — la santé mentale concerne tout le monde, indépendamment du genre", overview: "Les hommes vivent des troubles de santé mentale à des taux similaires aux femmes, mais sont nettement moins susceptibles de chercher de l'aide. Les hommes représentent environ 75 % des décès par suicide dans les pays à revenus élevés. Les messages culturels sur la masculinité créent des barrières qui coûtent des vies." },
      es: { title: "Salud mental masculina", subtitle: "Romper el estigma — la salud mental afecta a todos, independientemente del género", overview: "Los hombres experimentan condiciones de salud mental a tasas similares a las mujeres, pero son significativamente menos propensos a buscar ayuda. Los hombres representan aproximadamente el 75% de las muertes por suicidio en países de altos ingresos. Los mensajes culturales sobre la masculinidad crean barreras que cuestan vidas." },
      zh: { title: "男性心理健康", subtitle: "打破污名——心理健康影响每个人，无论性别", overview: "男性经历心理健康问题的比率与女性相似，但寻求帮助的可能性显著较低。男性约占高收入国家自杀死亡人数的75%。关于男子气概的文化观念创造了代价高昂的障碍。" },
    },
  },

  // ─── 20. RELATIONSHIPS ─────────────────────────────────────────────────────
  {
    id: "relationships",
    title: "Relationships & Attachment",
    subtitle: "How our earliest bonds shape how we connect — and how to build healthier relationships",
    icon: "💞",
    color: "rose",
    readTime: 6,
    overview:
      "Attachment theory explains how early experiences with caregivers shape our expectations, fears, and patterns in relationships throughout life. Understanding your attachment style — secure, anxious, avoidant, or disorganized — is one of the most powerful frameworks for improving your relationships with partners, friends, family, and yourself.",
    symptoms: [
      { title: "Anxious Attachment Signs", items: ["Fear of abandonment or rejection", "Needing constant reassurance from partners", "Difficulty being alone", "Interpreting ambiguous signals as rejection", "Emotional highs and lows in relationships"] },
      { title: "Avoidant Attachment Signs", items: ["Discomfort with emotional intimacy", "Valuing independence to the point of pushing others away", "Difficulty expressing needs or feelings", "Shutting down during conflict", "Feeling smothered by partners who want closeness"] },
      { title: "Signs of Unhealthy Relationship Patterns", items: ["Repeated cycles of conflict without resolution", "Difficulty setting or maintaining boundaries", "Using relationships to manage emotional pain", "Jealousy, control, or possessiveness", "Codependency — losing yourself in the relationship"] },
    ],
    causes: [
      { title: "Early Attachment Experiences", description: "The consistency, availability, and emotional attunement of early caregivers creates 'internal working models' of relationships that persist into adulthood." },
      { title: "Relational Trauma", description: "Experiences of betrayal, abandonment, abuse, or neglect in relationships create protective adaptations that can become problematic in adult relationships." },
      { title: "Communication Patterns", description: "The 'four horsemen' (criticism, contempt, defensiveness, stonewalling) identified by John Gottman predict relationship breakdown with high accuracy." },
    ],
    treatments: [
      { name: "Attachment-Focused Therapy", description: "Explores how early attachment experiences shape current relationship patterns and builds more secure ways of connecting.", type: "therapy" },
      { name: "Couples Therapy (Emotionally Focused Therapy)", description: "EFT is the most evidence-based couples therapy, directly addressing attachment fears and needs that drive conflict.", type: "therapy" },
      { name: "Communication Skills Training", description: "Learning to express needs assertively, listen actively, and navigate conflict constructively.", type: "self-help" },
      { name: "Boundary Work", description: "Understanding what healthy boundaries are and how to establish them without guilt.", type: "self-help" },
    ],
    myths: [
      { myth: "Secure attachment means having a perfect relationship.", fact: "Secure attachment means being able to use your partner as a safe base, tolerate temporary disconnection, and repair after conflict — not perfection." },
      { myth: "Attachment styles are fixed and cannot change.", fact: "'Earned security' — through positive relationship experiences, therapy, or conscious effort — can genuinely shift attachment patterns over time." },
      { myth: "Loving someone is enough to make a relationship work.", fact: "Love is necessary but insufficient. Skills — communication, conflict resolution, empathy, commitment — are equally essential." },
      { myth: "Needing others is a sign of weakness or codependency.", fact: "Healthy interdependence — needing and being needed — is the foundation of all meaningful human connection." },
    ],
    relatedTests: ["loneliness", "emotional-regulation", "wellbeing"],
    resources: [
      { name: "The Gottman Institute", description: "gottman.com — relationship research and tools" },
      { name: "PsychCentral — Attachment", description: "psychcentral.com" },
    ],
    i18n: {
      fr: { title: "Relations et attachement", subtitle: "Comment nos premiers liens façonnent nos connexions — et comment construire des relations plus saines", overview: "La théorie de l'attachement explique comment les expériences précoces avec les soignants façonnent nos attentes et nos schémas relationnels tout au long de la vie. Comprendre votre style d'attachement est l'un des cadres les plus puissants pour améliorer vos relations." },
      es: { title: "Relaciones y apego", subtitle: "Cómo nuestros primeros vínculos moldean cómo nos conectamos — y cómo construir relaciones más saludables", overview: "La teoría del apego explica cómo las experiencias tempranas con los cuidadores moldean nuestras expectativas y patrones en las relaciones a lo largo de la vida. Entender tu estilo de apego es uno de los marcos más poderosos para mejorar tus relaciones." },
      zh: { title: "关系与依恋", subtitle: "我们最早的纽带如何塑造我们的连接方式——以及如何建立更健康的关系", overview: "依恋理论解释了与照顾者的早期经历如何塑造我们在整个生命中的关系期望、恐惧和模式。了解您的依恋风格是改善关系最有力的框架之一。" },
    },
  },
];

export function getLearnTopic(id: string): LearnTopic | undefined {
  return learnTopics.find((t) => t.id === id);
}
