import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  HelpCircle, 
  Volume2, 
  Award, 
  Trophy, 
  BookMarked, 
  ChevronRight, 
  Compass, 
  MessageSquare, 
  Sparkles, 
  Check, 
  FileText,
  Speech,
  Notebook,
  AlertCircle
} from 'lucide-react';

// UI Texts in Armenian (ARM) and Russian (RUS)
const TRANSLATIONS = {
  arm: {
    title: "Իսպաներենի Ուսուցման Խաղ",
    subtitle: "Հայերենից Իսպաներեն աքսելերատոր",
    grammarQuiz: "Քերականության Թեստ",
    readingStory: "Ընթերցանություն (Սոֆիա)",
    oralAssistant: "Բանավոր Խոսք",
    dictionary: "Իմ Բառարան",
    score: "Միավորներ",
    correctRate: "Ճիշտ պատասխաններ",
    resetBtn: "Վերասկսել",
    explanation: "Բացատրություն",
    correct: "Ճիշտ է:",
    incorrect: "Սխալ է:",
    whyTitle: "Ինչու՞ է սա ճիշտ",
    next: "Հաջորդը",
    prev: "Նախորդը",
    congrats: "Շնորհավորում ենք:",
    completedText: "Դուք հաջողությամբ անցաք բոլոր վարժությունները:",
    speakBtn: "Լսել արտասանությունը",
    vocabulary: "Բառապաշար",
    textTitle: "Ընթերցանության Տեքստ՝ «En busca de amigos» (Ընկերների Որոնում)",
    presentationChecklist: "Բանավոր Ներկայացման Ուղեցույց (1-2 րոպե)",
    presentationDesc: "Փորձեք պատասխանել այս հարցերին իսպաներենով:",
    viewSample: "Տեսնել օրինակը",
    userNotes: "Ձեր նշումները / պատասխանի սևագիրը",
    placeholderNotes: "Գրեք ձեր պատասխանը այստեղ՝ մարզելու համար ձեր գրավոր իսպաներենը...",
    studyGoals: "Ուսումնական նպատակներ",
    streak: "Օրերի հաջորդականություն",
    level: "Մակարդակ",
    clickToSeeExplanation: "Պատասխանեք հարցին՝ բացատրությունը տեսնելու համար:",
    addWord: "Ավելացնել նոր բառ",
    wordPlholder: "Բառ (իսպաներեն)",
    translationPlholder: "Թարգմանություն",
    addBtn: "Ավելացնել",
    originalAppRecreated: "Հավելվածը վերստեղծված է բնօրինակ վարժությունների հիման վրա",
    aiTutorFeedback: "Թյութորի աջակցություն",
    generateAIFeedback: "Վերլուծել պատասխանը"
  },
  rus: {
    title: "Игра по испанскому языку",
    subtitle: "Интерактивный тренажер испанского",
    grammarQuiz: "Грамматический тест",
    readingStory: "Чтение (София)",
    oralAssistant: "Устная практика",
    dictionary: "Мой Словарь",
    score: "Очки",
    correctRate: "Точность",
    resetBtn: "Сбросить прогресс",
    explanation: "Объяснение",
    correct: "Правильно!",
    incorrect: "Неверно!",
    whyTitle: "Почему это правильно",
    next: "Дальше",
    prev: "Назад",
    congrats: "Поздравляем!",
    completedText: "Вы успешно завершили все упражнения курса!",
    speakBtn: "Прослушать произношение",
    vocabulary: "Словарь раздела",
    textTitle: "Текст для чтения: «En busca de amigos» (В поиске друзей)",
    presentationChecklist: "План устной презентации (на 1-2 минуты)",
    presentationDesc: "Попробуйте ответить на эти вопросы на испанском языке.",
    viewSample: "Посмотреть образец",
    userNotes: "Ваши заметки / черновик ответа",
    placeholderNotes: "Напишите свой ответ здесь, чтобы попрактиковаться в письме...",
    studyGoals: "Учебные цели",
    streak: "Ударный режим",
    level: "Уровень",
    clickToSeeExplanation: "Ответьте на вопрос, чтобы увидеть подробное объяснение.",
    addWord: "Добавить новое слово",
    wordPlholder: "Слово (исп.)",
    translationPlholder: "Перевод",
    addBtn: "Добавить",
    originalAppRecreated: "Приложение воссоздано на основе оригинальных упражнений",
    aiTutorFeedback: "Помощь AI-Тьютора",
    generateAIFeedback: "Проанализировать ответ с помощью AI"
  }
};

// 10 Core Grammar Questions with English/Spanish metadata and explanations in Armenian and Russian
const GRAMMAR_QUESTIONS = [
  {
    id: 1,
    question: "1. Yo ... estudiante.",
    options: ["estoy", "soy", "es"],
    correctAnswerIndex: 1, // soy
    explanation: {
      arm: "«Soy» (ser բայը) օգտագործվում է մշտական հատկանիշների դեպքում, ինչպիսիք են մասնագիտությունը, ազգությունը կամ կարգավիճակը (ես ուսանող եմ): «Estoy»-ը (estar բայը) օգտագործվում է ժամանակավոր վիճակների կամ տեղակայման համար («estoy en casa»): «Es»-ը երրորդ դեմքն է (նա է):",
      rus: "«Soy» (от глагола ser) используется для постоянных характеристик, таких как профессия или статус (я студент). «Estoy» (от глагола estar) выражает временное состояние или местонахождение (например, «estoy en casa»). «Es» — это форма третьего лица единственного числа (он/она есть)."
    }
  },
  {
    id: 2,
    question: "2. Mi madre tiene ... años",
    options: ["cuarenta y un", "quarenta y un", "cuarenta y uno"],
    correctAnswerIndex: 0, // cuarenta y un
    explanation: {
      arm: "Արական սեռի գոյականների դեպքում (años - տարիներ) «cuarenta y uno»-ն կրճատվում է և դառնում է «cuarenta y un»: «Quarenta» տարբերակը ուղղագրական սխալ է, քանի որ իսպաներենում այն միշտ գրվում է «c» տառով:",
      rus: "Перед существительными мужского рода (например, años — годы) числительное «cuarenta y uno» усекается до «cuarenta y un». Вариант «quarenta» ошибочен орфографически, так как в испанском языке пишется через букву «c»."
    }
  },
  {
    id: 3,
    question: "3. Mis amigos ahora ... en Francia",
    options: ["son", "están", "hay"],
    correctAnswerIndex: 1, // están
    explanation: {
      arm: "«Están»-ը (estar բայի հոգնակի ձևը) օգտագործվում է ֆիզիկական կամ աշխարհագրական գտնվելու վայրը նշելու համար (իմ ընկերներն այժմ Ֆրանսիայում են): «Son»-ն օգտագործվում է ծագումը կամ էական հատկանիշները նկարագրելու համար («son franceses»): «Hay»-ը նշանակում է անդեմ «կա/կան»:",
      rus: "Форма «están» (глагол estar) используется для указания географического нахождения субъектов (мои друзья сейчас во Франции). «Son» (глагол ser) выражает происхождение или постоянные качества. «Hay» означает безличную форму «имеется/есть»."
    }
  },
  {
    id: 4,
    question: "4. A mí me ... las rosas blancas",
    options: ["gusta", "gusto", "gustan"],
    correctAnswerIndex: 2, // gustan
    explanation: {
      arm: "Քանի որ այն ամենը, ինչ դուր է գալիս, հոգնակի թվով է (las rosas blancas - սպիտակ վարդերը), «gustar» բայը պետք է համաձայնեցվի հոգնակի թվով՝ «gustan»: «Gusta»-ն օգտագործվում է եզակի թվով գոյականների կամ բայերի անորոշ դերբայի հետ:",
      rus: "Так как подлежащее выражено множественным числом (las rosas blancas — белые розы), глагол согласуется во множественном числе — «gustan». Форма «gusta» используется только с единственным числом или инфинитивами."
    }
  },
  {
    id: 5,
    question: "5. Mi hija trabaja ...",
    options: ["muy", "mucho", "mucha"],
    correctAnswerIndex: 1, // mucho
    explanation: {
      arm: "«Trabaja mucho» (շատ է աշխատում) արտահայտության մեջ «mucho»-ն հանդես է գալիս որպես մակբայ, ուստի անփոփոխ է: «Mucha»-ն իգական սեռի ածական է և պահանջում է գոյական («mucha paciencia»): «Muy»-ն նշանակում է «շատ» և դրվում է միայն ածականների կամ այլ մակբայների հետևից («muy inteligente»):",
      rus: "В значении «работает много» используется наречие «mucho», которое неизменяемо. «Mucha» — это женский род прилагательного (требует существительное, например: mucha paciencia). «Muy» переводится как «очень» и употребляется только перед прилагательными или наречиями (например, muy bien)."
    }
  },
  {
    id: 6,
    question: "6. Me gusta beber agua ...",
    options: ["fría", "frío", "frio"],
    correctAnswerIndex: 0, // fría
    explanation: {
      arm: "«Agua»-ն (ջուր) իգական սեռի գոյական է: Չնայած այն հանգամանքին, որ եզակի թվում օգտագործվում է արական «el» հոդը (el agua) երկու «ա»-երի բախումից խուսափելու համար, դրան ուղեկցող ածականները միշտ պահպանում են իգական սեռը՝ «fría» (սառը ջուր):",
      rus: "Существительное «agua» (вода) женского рода. Хотя в единственном числе из-за стыка гласных используется артикль мужского рода «el» (el agua), согласуемые прилагательные всегда стоят в женском роде — «fría». «Frío» — мужской род."
    }
  },
  {
    id: 7,
    question: "7. El reloj está ... de la puerta.",
    options: ["sobre", "en", "encima"],
    correctAnswerIndex: 2, // encima
    explanation: {
      arm: "«Encima»-ն միշտ զուգակցվում է «de» նախդիրի հետ («encima de la puerta» - դռան վերևում): sobre նշանակում է՝ վրա, երբ առարկան դրված է ինչ-որ մակերեսի վրա։",
      rus: "Предлог «encima» используется в устойчивом сочетании со связкой «de» («encima de...» — над/поверх чего-то). Предлог «sobre» означает «на/над», когда предмет находится на поверхности."
    }
  },
  {
    id: 8,
    question: "8. Los niños ... en el parque",
    options: ["están", "hay", "tienen"],
    correctAnswerIndex: 0, // están
    explanation: {
      arm: "«Están» (estar բայը) օգտագործվում է որոշակի սուբյեկտների (երեխաները) գտնվելու վայրը նշելու համար: «Hay»-ը նշանակում է անորոշ առարկաների գոյություն և երբեք չի օգտագործվում որոշյալ հոդից հետո («los niños»): «Tienen» նշանակում է «ունեն»:",
      rus: "Глагол «están» (estar) используется для выражения нахождения конкретных определенных субъектов в пространстве (дети в парке). Безличная форма «hay» никогда не используется после существительных с определенным артиклем (los niños). «Tienen» означает «имеют»."
    }
  },
  {
    id: 9,
    question: "9. En la habitación hay ... cama",
    options: ["la", "una", "el"],
    correctAnswerIndex: 1, // una
    explanation: {
      arm: "«Hay» (կա/կան) բայաձևից հետո միշտ օգտագործվում է անորոշ հոդ («una»), երբ խոսվում է առարկայի գոյության մասին: «Cama»-(ն) (մահճակալ) իգական սեռի եզակի գոյական է: Որոշյալ հոդերը («la», «el») «hay»-ից հետո չեն օգտագործվում:",
      rus: "После безличного глагола «hay» (имеется) используется неопределенный артикль («una»), когда речь идет о наличии предмета. «Cama» (кровать) — существительное женского рода. Определенные артикли («la», «el») после «hay» не ставятся."
    }
  },
  {
    id: 10,
    question: "10. A mi hermana menor no le gustan los teatros",
    options: ["a mí tampoco", "a mí tampoco no", "a mí también"],
    correctAnswerIndex: 0, // a mí tampoco
    explanation: {
      arm: "Ժխտական նախադասությանը համաձայնություն արտահայտելու համար (իմ քրոջը դուր չեն գալիս թատրոնները, ինձ նույնպես) օգտագործվում է կայուն «a mí tampoco» արտահայտությունը: «A mí tampoco no»-ն սխալ է (կրկնակի ժխտում): «A mí también»-ն օգտագործվում է հաստատման հետ համաձայնվելու դեպքում (ինձ նույնպես):",
      rus: "Для выражения согласия с отрицательным утверждением (моей сестре не нравятся театры, и мне тоже) употребляется устойчивая формула «a mí tampoco» (мне тоже нет). Вариант «a mí tampoco no» ошибочен из-за двойного отрицания. «A mí также но» не употребляется. «A mí también» используется для согласия с утверждением."
    }
  }
];

// 6 reading comprehension questions about Sofia
const SOFIA_QUESTIONS = [
  {
    id: 11,
    question: "1. ¿Dónde vive Sofía?",
    options: ["en Valencia", "en Montevideo"],
    correctAnswerIndex: 1, // en Montevideo
    explanation: {
      arm: "Սոֆիան ծնունդով Վալենսիայից է («soy de Valencia»), բայց տեքստում նշում է, որ այժմ նոր է Մոնտեվիդեոյում և այնտեղ է ապրում ու ընկերներ փնտրում («Soy nueva en Montevideo»):",
      rus: "София родом из Валенсии («soy de Valencia»), но сейчас она живет в Монтевидео и ищет там друзей, о чем прямо пишет: «Soy nueva en Montevideo»."
    }
  },
  {
    id: 12,
    question: "2. ¿Qué busca Sofía?",
    options: ["amigos", "pareja"],
    correctAnswerIndex: 0, // amigos
    explanation: {
      arm: "Տեքստի վերնագիրը հուշում է ամեն ինչ՝ «En busca de amigos» (Ընկերների որոնումներում), և նա ցանկանում է գտնել մարդկանց ազատ ժամանակը միասին անցկացնելու համար («busco personas para pasar el tempo libre»):",
      rus: "Заголовок анкеты гласит «En busca de amigos» (В поиске друзей), и она ищет людей для совместного проведения досуга («busco personas para pasar el tiempo libre»)."
    }
  },
  {
    id: 13,
    question: "3. ¿A qué se dedica Sofía?",
    options: ["a la medicina", "a la biología"],
    correctAnswerIndex: 1, // a la biología
    explanation: {
      arm: "Նա նշում է իր մասնագիտությունը՝ «Trabajo como bióloga» (Աշխատում եմ որպես կենսաբան): Թեև նրան հետաքրքրում է նաև բժշկությունը («me interesan la medicina, la salud»), նրա մասնագիտությունը կենսաբանությունն է:",
      rus: "Она прямо называет свою профессию: «Trabajo como bióloga» (Работаю биологом). Хотя медицина и здоровье её тоже интересуют, сфера её деятельности — биология."
    }
  },
  {
    id: 14,
    question: "4. ¿Qué le gusta hacer a Sofía el fin de semana?",
    options: ["pasar tiempo en la naturaleza", "pasar tiempo tranquila en casa"],
    correctAnswerIndex: 0, // pasar tiempo en la naturaleza
    explanation: {
      arm: "Հանգստյան օրերին Սոֆիան սիրում է գնալ սարեր արշավների և հեծանիվ քշել («me gusta mucho ir de excursión a la montaña, montar en bici»), ինչը նշանակում է ժամանակ անցկացնել բնության մեջ:",
      rus: "По выходным Софии очень нравится ходить в походы в горы и кататься на велосипеде («me gusta mucho ir de excursión a la montaña, montar en bici»), что соответствует отдыху на природе."
    }
  },
  {
    id: 15,
    question: "5. ¿Qué NO le interesa mucho a Sofía?",
    options: ["la gastronomía", "la literatura"],
    correctAnswerIndex: 1, // la literatura
    explanation: {
      arm: "Սոֆիան նշում է. «Normalmente no leo mucho» (Սովորաբար ես շատ չեմ կարդում), ինչը նշանակում է, որ նրան գրականությունը քիչ է հետաքրքրում: Իսկ գաստրոնոմիան նրան շատ է դուր գալիս, քանի որ նա սիրում է եփել և ռեստորաններ այցելել:",
      rus: "Она упоминает: «Normalmente no leo mucho» (Обычно я мало читаю), что указывает на слабый интерес к литературе. При этом готовить и ходить по ресторанам она обожает, так что гастрономия ей интересна."
    }
  },
  {
    id: 16,
    question: "6. ¿Qué le gusta hacer a veces a Sofía?",
    options: ["ir de compras", "visitar una exposición"],
    correctAnswerIndex: 1, // visitar una exposición
    explanation: {
      arm: "Սոֆիան գրում է, որ չի սիրում գնումներ կատարել («no me gusta mucho ir de compras»), բայց սիրում է այցելել արվեստի ցուցահանդեսներ («sí me gusta visitar exposiciones de arte»):",
      rus: "София упоминает, что не любит ходить по магазинам за покупками («no me gusta mucho ir de compras»), но с удовольствием посещает художественные выставки («sí me gusta visitar exposiciones de arte»)."
    }
  }
];

// Local Storage Keys
const SCORE_STORAGE_KEY = "spanish_learning_game_scores";
const PROGRESS_STORAGE_KEY = "spanish_learning_game_progress_v1";

export default function App() {
  const [lang, setLang] = useState<'arm' | 'rus'>('arm');
  const [activeTab, setActiveTab] = useState<'grammar' | 'reading' | 'oral' | 'dictionary'>('grammar');
  
  // Progress states for Grammar
  const [grammarAnswers, setGrammarAnswers] = useState<Record<number, number>>({});
  const [visibleGrammarExplanations, setVisibleGrammarExplanations] = useState<Record<number, boolean>>({});

  // Progress states for Sofia
  const [sofiaAnswers, setSofiaAnswers] = useState<Record<number, number>>({});
  const [visibleSofiaExplanations, setVisibleSofiaExplanations] = useState<Record<number, boolean>>({});
  const [readingParagraphsTranslation, setReadingParagraphsTranslation] = useState<Record<number, boolean>>({});

  // Oral Practise selected card
  const [selectedOralCard, setSelectedOralCard] = useState<number | null>(null);
  const [userSpeechDraft, setUserSpeechDraft] = useState<string>("");
  const [aiFeedbackText, setAiFeedbackText] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Custom Dictionary words
  const [customWords, setCustomWords] = useState<{word: string, translation: string}[]>([
    { word: "cómoda", translation: "уютная / հարմարավետ" },
    { word: "acogedora", translation: "уютная / հյուրընկալ" },
    { word: "piso", translation: "квартира / բնակարան" },
    { word: "libre", translation: "свободный / ազատ" },
    { word: "bici (bicicleta)", translation: "велосипед / հեծանիվ" },
    { word: "excursión", translation: "экскурсия / արշավ" }
  ]);
  const [newWord, setNewWord] = useState("");
  const [newTranslation, setNewTranslation] = useState("");

  const t = TRANSLATIONS[lang];

  // Load progress on start
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        if (parsed.grammarAnswers) setGrammarAnswers(parsed.grammarAnswers);
        if (parsed.visibleGrammarExplanations) setVisibleGrammarExplanations(parsed.visibleGrammarExplanations);
        if (parsed.sofiaAnswers) setSofiaAnswers(parsed.sofiaAnswers);
        if (parsed.visibleSofiaExplanations) setVisibleSofiaExplanations(parsed.visibleSofiaExplanations);
        if (parsed.customWords) setCustomWords(parsed.customWords);
        if (parsed.userSpeechDraft) setUserSpeechDraft(parsed.userSpeechDraft);
        if (parsed.lang) setLang(parsed.lang);
      }
    } catch (e) {
      console.error("Failed to load local storage state", e);
    }
  }, []);

  // Save progress on state change
  useEffect(() => {
    try {
      const stateToSave = {
        grammarAnswers,
        visibleGrammarExplanations,
        sofiaAnswers,
        visibleSofiaExplanations,
        customWords,
        userSpeechDraft,
        lang
      };
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Failed to save state to local storage", e);
    }
  }, [grammarAnswers, visibleGrammarExplanations, sofiaAnswers, visibleSofiaExplanations, customWords, userSpeechDraft, lang]);

  // Handle Option Click
  const handleGrammarOptionClick = (questionId: number, optionIndex: number) => {
    // Save selected answer if not answered yet
    if (grammarAnswers[questionId] !== undefined) return;

    setGrammarAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));

    // Instantly show explanation only after making a selection
    setVisibleGrammarExplanations(prev => ({
      ...prev,
      [questionId]: true
    }));
  };

  const handleSofiaOptionClick = (questionId: number, optionIndex: number) => {
    // Save selected answer if not answered yet
    if (sofiaAnswers[questionId] !== undefined) return;

    setSofiaAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));

    // Instantly show explanation only after making a selection
    setVisibleSofiaExplanations(prev => ({
      ...prev,
      [questionId]: true
    }));
  };

  // Text Pronunciation helper via Web Speech API
  const speakText = (textToSpeak: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'es-ES';
      utterance.rate = 0.85; // slightly slower for learners
      window.speechSynthesis.cancel(); // stop current utterance
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Speech synthesis is not supported on your browser.");
    }
  };

  // Add word to client custom dictionary
  const handleAddWord = (e: FormEvent) => {
    e.preventDefault();
    if (!newWord.trim() || !newTranslation.trim()) return;
    setCustomWords(prev => [
      { word: newWord.trim().toLowerCase(), translation: newTranslation.trim() },
      ...prev
    ]);
    setNewWord("");
    setNewTranslation("");
  };

  // Reset core states
  const handleResetProgress = () => {
    if (window.confirm(lang === 'arm' ? "Ցանկանու՞մ եք վերսկսել խաղը և ջնջել ձեր արդյունքները:" : "Вы уверены, что хотите сбросить весь прогресс?")) {
      setGrammarAnswers({});
      setVisibleGrammarExplanations({});
      setSofiaAnswers({});
      setVisibleSofiaExplanations({});
      setUserSpeechDraft("");
      setAiFeedbackText("");
      // Keep custom words but reset answers
      localStorage.removeItem(PROGRESS_STORAGE_KEY);
    }
  };

  // Calculate stats
  const totalQuestions = GRAMMAR_QUESTIONS.length + SOFIA_QUESTIONS.length;
  const answeredGrammarCount = Object.keys(grammarAnswers).length;
  const answeredSofiaCount = Object.keys(sofiaAnswers).length;
  const totalAnswered = answeredGrammarCount + answeredSofiaCount;

  // Correct counter
  const correctGrammarCount = GRAMMAR_QUESTIONS.reduce((acc, q) => {
    return acc + (grammarAnswers[q.id] === q.correctAnswerIndex ? 1 : 0);
  }, 0);

  const correctSofiaCount = SOFIA_QUESTIONS.reduce((acc, q) => {
    return acc + (sofiaAnswers[q.id] === q.correctAnswerIndex ? 1 : 0);
  }, 0);

  const totalCorrect = correctGrammarCount + correctSofiaCount;
  const accuracyPercent = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  // Checklist Sample Answers
  const ORAL_GUIDE = [
    {
      id: 1,
      q: "¿Dónde vive?",
      sample: "Yo vivo en un piso acogedor en la hermosa ciudad de Ereván.",
      translationArm: "Ես ապրում եմ հարմարավետ բնակարանում գեղեցիկ Երևան քաղաքում:",
      translationRus: "Я живу в уютной квартире в прекрасном городе Ереван."
    },
    {
      id: 2,
      q: "¿Con quién vive?",
      sample: "Vivo con mi familia y mi perro pequeño. Somos muy felices juntos.",
      translationArm: "Ես ապրում եմ իմ ընտանիքի և փոքրիկ շնիկիս հետ: Մենք շատ երջանիկ ենք միասին:",
      translationRus: "Я живу со своей семьей и маленькой собакой. Мы очень счастливы вместе."
    },
    {
      id: 3,
      q: "¿Vive en un piso de alquiler o el piso suyo?",
      sample: "Vivo en mi propio piso, es nuestro piso familiar, no es de alquiler.",
      translationArm: "Ես ապրում եմ իմ սեփական բնակարանում, դա մեր ընտանեկան բնակարանն է, վարձով չէ:",
      translationRus: "Я живу в собственной квартире, это наша семейная квартира, она не арендованная."
    },
    {
      id: 4,
      q: "¿Cómo es su casa?",
      sample: "Mi casa es espaciosa, luminosa y muy cómoda. Tiene tres habitaciones grandes.",
      translationArm: "Իմ տունը տարածուն է, լուսավոր և շատ հարմարավետ: Այն ունի երեք մեծ սենյակ:",
      translationRus: "Мой дом просторный, светлый и очень удобный. В нем три большие комнаты."
    },
    {
      id: 5,
      q: "¿Qué habitación le gusta más?",
      sample: "La habitación que más me gusta es el salón de estar porque tiene ventanas grandes y puedo leer libros con luz del sol.",
      translationArm: "Ամենաշատը սիրում եմ հյուրասենյակը, քանի որ այն ունի մեծ պատուհաններ, և ես կարող եմ գրքեր կարդալ արևի լույսի տակ:",
      translationRus: "Комната, которая мне нравится больше всего — это гостиная, потому что в ней большие окна и я могу читать книги при солнечном свете."
    }
  ];

  // AI interactive helper simulator for the oral drafts
  const handleAIFeedback = () => {
    if (!userSpeechDraft.trim()) {
      alert(lang === 'arm' ? "Խնդրում ենք նախ գրել ձեր նախագիծը սևագրի դաշտում:" : "Пожалуйста, сначала напишите ваш черновик текста!");
      return;
    }
    setIsAnalyzing(true);
    setAiFeedbackText("");
    
    // Simulate smart Spanish Tutor evaluation with highly precise customized grammar patterns
    setTimeout(() => {
      const draft = userSpeechDraft.toLowerCase();
      let feedback = "";
      
      if (lang === 'arm') {
        feedback += "🔍 **AI Թյութորի վերլուծություն.**\n\n";
        if (draft.includes("yo vivir") || draft.includes("mi vivir") || draft.includes("yo gustar")) {
          feedback += "⚠️ *Սխալ.* Դուք օգտագործել եք անորոշ դերբայ (vivir/gustar): Իսպաներենում բայերը պետք է խոնարհել: Օգտագործեք՝ «Yo vivo» (ես ապրում եմ) կամ «A mí me gusta» (ինձ դուր է գալիս):\n\n";
        }
        if (draft.includes("en mi casa hay") || draft.includes("en mi piso hay")) {
          feedback += "✅ *Գերազանց է.* Դուք ճիշտ եք կիրառել «hay» անդեմ բայական ձևը նոր առարկաներ նկարագրելիս:\n\n";
        }
        if (!draft.includes("piso") && !draft.includes("casa")) {
          feedback += "💡 *Խորհուրդ.* Փորձեք օգտագործել թեմատիկ բառեր, օրինակ՝ «piso» (բնակարան), «casa» (տուն), «habitación» (սենյակ):\n\n";
        }
        feedback += "✨ *Գնահատական.* Ձեր գրավոր խոսքը հրաշալի սկիզբ է: Շարունակեք մարզվել և փորձեք բարձրաձայն կարդալ ձեր նախադասությունները:";
      } else {
        feedback += "🔍 **Анализ AI-Тьютора:**\n\n";
        if (draft.includes("yo vivir") || draft.includes("mi vivir") || draft.includes("yo gustar")) {
          feedback += "⚠️ *Грамматика:* Вы использовали инфинитив глагола (vivir/gustar). Виспанском языке глаголы нужно спрягать лично. Пишите: «Yo vivo» (я живу) или «Me gusta» (мне нравится).\n\n";
        }
        if (draft.includes("en mi casa hay") || draft.includes("en mi piso hay")) {
          feedback += "✅ *Плюс:* Вы отлично использовали конструкцию «hay» для перечисления предметов в комнате.\n\n";
        }
        if (!draft.includes("piso") && !draft.includes("casa")) {
          feedback += "💡 *Рекомендация:* Рекомендуем вписать слова из прослушанной темы: «piso» (квартира), «casa» (дом), или «habitación» (комната).\n\n";
        }
        feedback += "✨ *Резюме:* Отличный тренировочный текст! Попробуйте сгенерировать произношение для написанных вами слов с помощью кнопки прослушивания.";
      }
      setAiFeedbackText(feedback);
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16 antialiased">
      {/* Upper Navigation / Settings Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-100 animate-float">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-display font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                {t.title}
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-mono font-bold">A1/A2</span>
              </h1>
              <p className="text-xs text-slate-500 font-medium">{t.subtitle}</p>
            </div>
          </div>

          {/* Controls: Language, Score, Reset */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Bilingual Flag Switcher */}
            <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1">
              <button 
                onClick={() => setLang('arm')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${lang === 'arm' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                🇦🇲 Հայ
              </button>
              <button 
                onClick={() => setLang('rus')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${lang === 'rus' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                🇷🇺 Рус
              </button>
            </div>

            {/* Score Indicators */}
            <div className="bg-teal-50 border border-teal-100 text-teal-800 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>{t.score}: {totalCorrect} / {totalQuestions}</span>
            </div>

            {/* Reset Stats */}
            <button 
              id="reset_progress_state"
              onClick={handleResetProgress}
              className="text-xs bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 p-2 rounded-xl transition-all"
              title={t.resetBtn}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Hero Banner Area */}
      <div className="bg-gradient-to-r from-teal-700 to-emerald-600 text-white py-8 px-4 shadow-sm mb-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-display font-extrabold">{lang === 'arm' ? 'Ինտերակտիվ Իսպաներեն' : 'Интерактивный Испанский'}</h2>
            <p className="text-sm text-emerald-100 max-w-xl">
              {lang === 'arm' 
                ? 'Կատարեք քերականական վարժություններ և ստացեք ակնթարթային բացատրություն յուրաքանչյուր ընտրությունից հետո:' 
                : 'Выполняйте грамматические упражнения и получайте мгновенные разъяснения грамматики сразу после нажатия ответа!'}
            </p>
          </div>

          {/* Linear Progress Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl w-full md:w-80">
            <div className="flex justify-between items-center text-xs text-white/90 font-bold mb-2">
              <span>{lang === 'arm' ? 'Ավարտվածություն' : 'Общий прогресс'}</span>
              <span>{totalAnswered} / {totalQuestions} ({Math.round(totalAnswered/totalQuestions * 100)}%)</span>
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-amber-400 h-full transition-all duration-500"
                style={{ width: `${(totalAnswered / totalQuestions) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-[11px] text-white/70 mt-3 font-mono">
              <span>{t.correctRate}: {accuracyPercent}%</span>
              <span>{lang === 'arm' ? 'Մակարդակ՝ Սկսնակ' : 'Уровень: Начинающий'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container Layout */}
      <main className="max-w-6xl mx-auto px-4">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b border-slate-200 gap-1 mb-6">
          <button 
            onClick={() => setActiveTab('grammar')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all ${activeTab === 'grammar' ? 'border-teal-600 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}`}
          >
            <BookMarked className="w-4 h-4" />
            {t.grammarQuiz}
            <span className="text-[10px] bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded-full font-mono font-bold">
              {answeredGrammarCount}/10
            </span>
          </button>
          
          <button 
            onClick={() => setActiveTab('reading')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all ${activeTab === 'reading' ? 'border-teal-600 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}`}
          >
            <BookOpen className="w-4 h-4" />
            {t.readingStory}
            <span className="text-[10px] bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded-full font-mono font-bold">
              {answeredSofiaCount}/6
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('oral')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all ${activeTab === 'oral' ? 'border-teal-600 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}`}
          >
            <Speech className="w-4 h-4" />
            {t.oralAssistant}
          </button>

          <button 
            onClick={() => setActiveTab('dictionary')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all ${activeTab === 'dictionary' ? 'border-teal-600 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}`}
          >
            <Notebook className="w-4 h-4" />
            {t.dictionary}
            <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-full font-mono">
              {customWords.length}
            </span>
          </button>
        </div>

        {/* Dynamic Inner Game Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Quest Content Block */}
          <section className="lg:col-span-8 space-y-6">
            
            {/* 1. GRAMMAR QUIZ TAB */}
            {activeTab === 'grammar' && (
              <div className="space-y-6">
                {GRAMMAR_QUESTIONS.map((q, idx) => {
                  const userAnswerIndex = grammarAnswers[q.id];
                  const hasAnswered = userAnswerIndex !== undefined;
                  const showExplanation = visibleGrammarExplanations[q.id];

                  return (
                    <div 
                      key={q.id}
                      id={`grammar_question_wrap_${q.id}`} 
                      className={`bg-white rounded-3xl p-6 border transition-all ${hasAnswered ? 'border-slate-200 shadow-xs' : 'border-slate-300 shadow-md ring-1 ring-slate-100'}`}
                    >
                      {/* Question Label */}
                      <div className="flex justify-between items-start gap-3 mb-4">
                        <h3 className="text-base text-slate-950 font-display font-semibold tracking-tight">
                          {q.question}
                        </h3>
                        <button 
                          onClick={() => speakText(q.question.replace(/^\d+\.\s*/, "").replace(/\.\.\./, "___"))} 
                          className="p-1 text-slate-400 hover:text-teal-600 rounded-md transition-all"
                          title={t.speakBtn}
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Custom Round Radio Buttons based on screenshots */}
                      <div className="space-y-3">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = userAnswerIndex === optIdx;
                          const isCorrectOpt = q.correctAnswerIndex === optIdx;
                          
                          // Style determination matching original app UI:
                          let optionClass = "border-slate-200 hover:bg-slate-50 text-slate-700";
                          let circleClass = "border-slate-300 text-transparent";
                          
                          if (hasAnswered) {
                            if (isSelected) {
                              if (isCorrectOpt) {
                                optionClass = "border-emerald-500 bg-emerald-50/40 text-emerald-800 font-medium";
                                circleClass = "border-emerald-500 bg-emerald-500 text-white";
                              } else {
                                optionClass = "border-rose-300 bg-rose-50/40 text-rose-800 font-medium";
                                circleClass = "border-rose-400 bg-rose-400 text-white";
                              }
                            } else if (isCorrectOpt) {
                              optionClass = "border-emerald-200 bg-emerald-50/20 text-emerald-700";
                              circleClass = "border-emerald-300";
                            } else {
                              optionClass = "border-slate-100 text-slate-400 opacity-60";
                              circleClass = "border-slate-200";
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={hasAnswered}
                              onClick={() => handleGrammarOptionClick(q.id, optIdx)}
                              className={`w-full text-left p-3.5 px-5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 text-sm focus:outline-hidden ${optionClass}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-5.5 h-5.5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${circleClass}`}>
                                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                                </div>
                                <span className="font-medium font-mono">{opt}</span>
                              </div>

                              {hasAnswered && isSelected && (
                                isCorrectOpt 
                                  ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                  : <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Box - SHOW ONLY AFTER CLICKING EXPLICITLY */}
                      {showExplanation && (
                        <div className="mt-5 pt-4 border-t border-slate-100 animate-pop">
                          <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-100/70 text-amber-900 text-xs">
                            <div className="flex items-center gap-2 font-display font-medium mb-1.5 text-amber-800">
                              <HelpCircle className="w-4 h-4 shrink-0 text-amber-600" />
                              <span>{t.whyTitle}</span>
                            </div>
                            <p className="leading-relaxed whitespace-pre-line text-slate-700">
                              {lang === 'arm' ? q.explanation.arm : q.explanation.rus}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* 2. READING COMPREHENSION STORY TAB */}
            {activeTab === 'reading' && (
              <div className="space-y-6">
                
                {/* Sofia's profile card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
                  <h3 className="text-lg font-display font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-teal-600" />
                    {t.textTitle}
                  </h3>

                  {/* Illustrated campsite content block */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-6">
                    
                    {/* Visual Art Representation */}
                    <div className="md:col-span-4 bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-2xl p-4 aspect-square flex flex-col items-center justify-center text-center border border-emerald-200/50 relative overflow-hidden">
                      <div className="absolute top-2 left-2 text-[10px] uppercase font-bold tracking-widest text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        Santiago
                      </div>
                      <div className="w-20 h-20 rounded-full bg-slate-300/40 border-4 border-white shadow-md flex items-center justify-center text-3xl font-bold text-slate-500 mb-3 overflow-hidden">
                        👧🏻
                      </div>
                      <span className="font-display font-bold text-slate-800 text-sm">Sofía (33)</span>
                      <span className="text-xs text-slate-500 mt-0.5">Montevideo</span>
                      <span className="text-[11px] bg-white border border-slate-200 px-2.5 py-1 rounded-xl mt-3 text-slate-600 font-medium">Bióloga</span>
                    </div>

                    {/* Spanish text block replicating original text precisely */}
                    <div className="md:col-span-8 bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">Español (A1-A2)</span>
                        <button 
                          onClick={() => speakText("Me llamo Sofía, soy de Valencia (España) y tengo 33 años. Soy nueva en Montevideo y busco personas para pasar el tiempo libre.")}
                          className="flex items-center gap-1 text-xs text-slate-500 hover:text-teal-700 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-white transition-all"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{lang === 'arm' ? 'Լսել սկիզբը' : 'Слушать начало'}</span>
                        </button>
                      </div>

                      {/* Interactive block-by-block translated reading list */}
                      <div className="space-y-2">
                        <div className="text-[11px] text-teal-700 bg-teal-50/80 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 w-fit">
                          <Sparkles className="w-3.5 h-3.5 shrink-0 text-teal-600 animate-pulse" />
                          <span>
                            {lang === 'arm' 
                              ? '💡 Սեղմեք պարբերությունների վրա՝ հայերեն թարգմանությունը տեսնելու համար' 
                              : '💡 Нажмите на текст, чтобы увидеть перевод на армянский'}
                          </span>
                        </div>

                        {/* Paragraph 1 */}
                        <div 
                          onClick={() => setReadingParagraphsTranslation(prev => ({ ...prev, 1: !prev[1] }))}
                          className={`p-3 rounded-xl border transition-all cursor-pointer text-justify group ${
                            readingParagraphsTranslation[1] 
                              ? 'bg-teal-50/30 border-teal-200 shadow-xs' 
                              : 'bg-slate-50/40 border-transparent hover:border-slate-200 hover:bg-white'
                          }`}
                          title={lang === 'arm' ? 'Կտտացրեք՝ թարգմանելու' : 'Кликните для перевода'}
                        >
                          <p className="text-slate-800 text-sm leading-relaxed font-semibold transition-colors group-hover:text-teal-950">
                            Me llamo <strong>Sofía</strong>, soy de Valencia (España) y tengo 33 años. Soy nueva en <strong>Montevideo</strong> y busco personas para pasar el tiempo libre. Soy una persona alegre, tranquila y responsable, pero un poco tímida.
                          </p>
                          {readingParagraphsTranslation[1] && (
                            <div className="mt-2.5 pt-2.5 border-t border-teal-100/80 text-teal-900 font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-line animate-pop font-medium bg-white/70 p-3 rounded-lg border border-teal-100/50">
                              Իմ անունը Սոֆիա է, ես Վալենսիայից եմ՝ Իսպանիայից, և 33 տարեկան եմ։ Ես նոր եմ Մոնտեվիդեոյում և փնտրում եմ մարդկանց՝ ազատ ժամանակը միասին անցկացնելու համար։
                              {"\n"}
                              Ես ուրախ, հանգիստ և պատասխանատու մարդ եմ, բայց մի քիչ ամաչկոտ եմ։
                            </div>
                          )}
                        </div>

                        {/* Paragraph 2 */}
                        <div 
                          onClick={() => setReadingParagraphsTranslation(prev => ({ ...prev, 2: !prev[2] }))}
                          className={`p-3 rounded-xl border transition-all cursor-pointer text-justify group ${
                            readingParagraphsTranslation[2] 
                              ? 'bg-teal-50/30 border-teal-200 shadow-xs' 
                              : 'bg-slate-50/40 border-transparent hover:border-slate-200 hover:bg-white'
                          }`}
                          title={lang === 'arm' ? 'Կտտացրեք՝ թարգմանելու' : 'Кликните для перевода'}
                        >
                          <p className="text-slate-800 text-sm leading-relaxed font-semibold transition-colors group-hover:text-teal-950">
                            Trabajo como <strong>bióloga</strong> y el fin de semana me gusta mucho ir de excursión a la montaña, montar en bici o ir al cine. Además, por mi profesión, me interesan la medicina, la salud y la ecología. ¡Ah! Me encanta cocinar, pero también me gusta ir a cenar a restaurantes.
                          </p>
                          {readingParagraphsTranslation[2] && (
                            <div className="mt-2.5 pt-2.5 border-t border-teal-100/80 text-teal-900 font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-line animate-pop font-medium bg-white/70 p-3 rounded-lg border border-teal-100/50">
                              Աշխատում եմ որպես կենսաբան, և շաբաթ-կիրակի օրերին ինձ շատ է դուր գալիս գնալ լեռներ զբոսանքի, հեծանիվ վարել կամ գնալ կինոթատրոն։
                              {"\n"}
                              Բացի այդ, իմ մասնագիտության պատճառով ինձ հետաքրքրում են բժշկությունը, առողջությունը և էկոլոգիան։
                              {"\n"}
                              Ա՜հ։ Ես շատ եմ սիրում պատրաստել, բայց նաև սիրում եմ գնալ ռեստորաններ՝ ընթրելու։
                            </div>
                          )}
                        </div>

                        {/* Paragraph 3 */}
                        <div 
                          onClick={() => setReadingParagraphsTranslation(prev => ({ ...prev, 3: !prev[3] }))}
                          className={`p-3 rounded-xl border transition-all cursor-pointer text-justify group ${
                            readingParagraphsTranslation[3] 
                              ? 'bg-teal-50/30 border-teal-200 shadow-xs' 
                              : 'bg-slate-50/40 border-transparent hover:border-slate-200 hover:bg-white'
                          }`}
                          title={lang === 'arm' ? 'Կտտացրեք՝ թարգմանելու' : 'Кликните для перевода'}
                        >
                          <p className="text-slate-800 text-sm leading-relaxed font-semibold transition-colors group-hover:text-teal-950">
                            Normalmente no leo mucho y no me gusta mucho ir de compras. Tampoco me gusta pintar, pero sí me gusta visitar exposiciones de arte.
                          </p>
                          {readingParagraphsTranslation[3] && (
                            <div className="mt-2.5 pt-2.5 border-t border-teal-100/80 text-teal-900 font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-line animate-pop font-medium bg-white/70 p-3 rounded-lg border border-teal-100/50">
                              Սովորաբար շատ չեմ կարդում և շատ չեմ սիրում գնումների գնալ։ Նաև չեմ սիրում նկարել, բայց սիրում եմ այցելել արվեստի ցուցահանդեսներ։
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Vocabulary matching items from original screens */}
                  <div className="bg-amber-50/40 border border-amber-100 p-4 rounded-2xl">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-amber-800 mb-2.5 flex items-center gap-1.5">
                      <BookMarked className="w-4 h-4 text-amber-600" />
                      <span>{t.vocabulary} (Словарь)</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-white p-3 rounded-xl border border-amber-100 text-center">
                        <button onClick={() => speakText("cómoda")} className="font-bold text-slate-800 text-xs hover:text-teal-600 flex items-center justify-center gap-1 mx-auto">
                          <span>cómoda</span> <Volume2 className="w-3 h-3" />
                        </button>
                        <p className="text-[11px] text-slate-500 mt-1">уютная / հարմարավետ</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-amber-100 text-center">
                        <button onClick={() => speakText("acogedora")} className="font-bold text-slate-800 text-xs hover:text-teal-600 flex items-center justify-center gap-1 mx-auto">
                          <span>acogedora</span> <Volume2 className="w-3 h-3" />
                        </button>
                        <p className="text-[11px] text-slate-500 mt-1">уютная / հյուրընկալ</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-amber-100 text-center">
                        <button onClick={() => speakText("piso")} className="font-bold text-slate-800 text-xs hover:text-teal-600 flex items-center justify-center gap-1 mx-auto">
                          <span>piso</span> <Volume2 className="w-3 h-3" />
                        </button>
                        <p className="text-[11px] text-slate-500 mt-1">квартира / բնակարան</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Comprehension Questions */}
                <div className="space-y-5">
                  {SOFIA_QUESTIONS.map((q) => {
                    const userAnswerIndex = sofiaAnswers[q.id];
                    const hasAnswered = userAnswerIndex !== undefined;
                    const showExplanation = visibleSofiaExplanations[q.id];

                    return (
                      <div 
                        key={q.id}
                        className={`bg-white rounded-3xl p-6 border transition-all ${hasAnswered ? 'border-slate-200' : 'border-slate-300 shadow-sm'}`}
                      >
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <h4 className="text-sm font-bold text-slate-900">{q.question}</h4>
                          <button 
                            onClick={() => speakText(q.question)} 
                            className="text-slate-400 hover:text-teal-600 rounded-md transition-all p-1"
                            title={t.speakBtn}
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = userAnswerIndex === optIdx;
                            const isCorrectOpt = q.correctAnswerIndex === optIdx;
                            
                            let optionClass = "border-slate-200 hover:bg-slate-50 text-slate-700";
                            let circleClass = "border-slate-300";

                            if (hasAnswered) {
                              if (isSelected) {
                                if (isCorrectOpt) {
                                  optionClass = "border-emerald-500 bg-emerald-50/40 text-emerald-800 font-medium";
                                  circleClass = "border-emerald-500 bg-emerald-500";
                                } else {
                                  optionClass = "border-rose-300 bg-rose-50/40 text-rose-800 font-medium";
                                  circleClass = "border-rose-400 bg-rose-400";
                                }
                              } else if (isCorrectOpt) {
                                optionClass = "border-emerald-200 bg-emerald-50/20 text-emerald-700";
                                circleClass = "border-emerald-300";
                              } else {
                                optionClass = "border-slate-100 text-slate-400 opacity-60";
                                circleClass = "border-slate-200";
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                disabled={hasAnswered}
                                onClick={() => handleSofiaOptionClick(q.id, optIdx)}
                                className={`text-left p-3 px-4 rounded-xl border-2 transition-all flex items-center justify-between gap-3 text-xs ${optionClass}`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${circleClass}`}>
                                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                                  </div>
                                  <span>{opt}</span>
                                </div>
                                {hasAnswered && isSelected && (
                                  isCorrectOpt 
                                    ? <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                    : <span className="text-rose-500 text-xs shrink-0 font-bold">X</span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation panel revealed ONLY AFTER selection */}
                        {showExplanation && (
                          <div className="mt-4 pt-4 border-t border-slate-100 animate-pop">
                            <p className="text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed">
                              <span className="font-bold text-teal-700 uppercase tracking-wider block mb-1 text-[10px]">{t.explanation}</span>
                              {lang === 'arm' ? q.explanation.arm : q.explanation.rus}
                            </p>
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* 3. ORAL SPEAKING ASSISTANT COMPONENT */}
            {activeTab === 'oral' && (
              <div className="space-y-6">
                
                {/* Oral Instruction Banner */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-3 mb-4">
                    <p className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 text-xl font-bold">
                      ℹ️
                    </p>
                    <div>
                      <h3 className="font-display font-bold text-slate-900 text-base">{t.presentationChecklist}</h3>
                      <p className="text-xs text-slate-500">{t.presentationDesc}</p>
                    </div>
                  </div>

                  {/* Question Checklist cards */}
                  <div className="space-y-3">
                    {ORAL_GUIDE.map((item, idx) => {
                      const isSelected = selectedOralCard === item.id;
                      
                      return (
                        <div 
                          key={item.id}
                          className={`rounded-2xl border transition-all ${isSelected ? 'border-teal-500 bg-teal-50/20' : 'border-slate-200 bg-white'}`}
                        >
                          <button 
                            onClick={() => setSelectedOralCard(isSelected ? null : item.id)}
                            className="w-full text-left p-4 flex items-center justify-between gap-4 font-semibold text-slate-800 text-xs sm:text-sm"
                          >
                            <span className="flex items-center gap-3 text-slate-900">
                              <span className="text-teal-600 bg-teal-50 w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono">
                                {idx + 1}
                              </span>
                              {item.q}
                            </span>
                            <span className="text-xs text-teal-600 hover:underline flex items-center gap-0.5 font-normal">
                              {t.viewSample} <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </button>

                          {isSelected && (
                            <div className="p-4 pt-0 border-t border-slate-100 space-y-3 animate-pop">
                              {/* Spanish sample speech helper */}
                              <div className="bg-white/80 border border-slate-200 p-3 rounded-xl flex items-start justify-between gap-3">
                                <div>
                                  <p className="font-mono text-xs sm:text-sm text-slate-900 font-bold select-all leading-relaxed">
                                    "{item.sample}"
                                  </p>
                                  <p className="text-xs text-slate-500 italic mt-2 leading-relaxed">
                                    {lang === 'arm' ? item.translationArm : item.translationRus}
                                  </p>
                                </div>
                                <button
                                  onClick={() => speakText(item.sample)}
                                  className="bg-teal-50 border border-teal-100 text-teal-700 p-2.5 rounded-full hover:bg-teal-100 transition-all shrink-0"
                                  title={t.speakBtn}
                                >
                                  <Volume2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                </div>

                {/* Practical Notepad Workspace */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                  <h4 className="font-display font-medium text-slate-900 text-sm flex items-center gap-2">
                    <Notebook className="w-4 h-4 text-teal-600" />
                    <span>{t.userNotes}</span>
                  </h4>
                  <textarea 
                    value={userSpeechDraft}
                    onChange={(e) => setUserSpeechDraft(e.target.value)}
                    placeholder={t.placeholderNotes}
                    className="w-full h-32 border border-slate-200 rounded-2xl p-4 text-xs font-mono focus:border-teal-500 focus:outline-hidden leading-relaxed"
                  />
                  
                  {/* AI Tutor Assistant analysis tool */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button 
                      onClick={() => speakText(userSpeechDraft)}
                      disabled={!userSpeechDraft}
                      className="text-xs border border-slate-200 bg-slate-50 text-slate-700 px-4 py-2 rounded-xl flex items-center gap-1.5 hover:bg-white transition-all disabled:opacity-50"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{t.speakBtn}</span>
                    </button>

                    <button 
                      onClick={handleAIFeedback}
                      disabled={isAnalyzing}
                      className="text-sm bg-teal-600 hover:bg-teal-700 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{isAnalyzing ? "..." : t.generateAIFeedback}</span>
                    </button>
                  </div>

                  {aiFeedbackText && (
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-3 animate-pop">
                      <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {aiFeedbackText}
                      </p>
                    </div>
                  )}

                </div>

              </div>
            )}

            {/* 4. PRIVATE DICTIONARY HELPER */}
            {activeTab === 'dictionary' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
                
                {/* EDUCATIONAL DETAILED INSIGHTS (BILINGUAL WIDGET) */}
                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-5 sm:p-6 border-2 border-teal-100/60 space-y-6">
                  <div className="flex items-center gap-2 pb-3 border-b border-teal-100">
                    <Sparkles className="w-5 h-5 text-teal-600 animate-pulse" />
                    <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900">
                      {lang === 'arm' ? "Բառապաշարի և Գրամատիկայի կարևոր նրբություններ" : "Важные нюансы словаря и грамматики"}
                    </h3>
                  </div>

                  {/* 1. Comoda vs Acogedora */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-xs space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">✅</span>
                      <h4 className="font-display font-extrabold text-sm sm:text-base text-slate-900">
                        {lang === 'arm' 
                          ? "Այո, cómoda և acogedora երկուսն էլ ածականներ են՝ adjetivos" 
                          : "Да, cómoda и acogedora оба являются прилагательными (adjetivos)"}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* comoda info */}
                      <div className="bg-slate-50/70 p-4 rounded-xl space-y-2 border border-slate-100">
                        <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md font-mono">
                          cómoda
                        </span>
                        <p className="text-sm font-semibold text-slate-800">
                          {lang === 'arm' ? "հարմարավետ / հարմար" : "удобный (физически)"}
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {lang === 'arm' 
                            ? "Օգտագործում ենք, երբ ինչ-որ բան հարմար է մարմնի համար կամ հարմար է օգտագործելու համար։" 
                            : "Используется, когда что-то комфортно физически для тела или удобно в использовании."}
                        </p>
                        <div className="pt-2 border-t border-slate-200/40 text-xs font-mono text-teal-800 space-y-1">
                          <p onClick={() => speakText("La silla es cómoda")} className="cursor-pointer hover:underline"><strong>La silla es cómoda.</strong> (Աթոռը հարմարավետ է:)</p>
                          <p onClick={() => speakText("La cama es cómoda")} className="cursor-pointer hover:underline"><strong>La cama es cómoda.</strong> (Մահճակալը հարմարավետ է:)</p>
                          <p onClick={() => speakText("La casa es cómoda")} className="cursor-pointer hover:underline"><strong>La casa es cómoda.</strong> (Տունը հարմար է ապրելու համար:)</p>
                        </div>
                      </div>

                      {/* acogedora info */}
                      <div className="bg-slate-50/70 p-4 rounded-xl space-y-2 border border-slate-100">
                        <span className="text-xs font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-md font-mono">
                          acogedora
                        </span>
                        <p className="text-sm font-semibold text-slate-800">
                          {lang === 'arm' ? "հարմարավետ, ջերմ, հաճելի մթնոլորտով / уютный" : "уютный, гостеприимный (атмосфера)"}
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {lang === 'arm' 
                            ? "Օգտագործում ենք, երբ տեղը ստեղծում է ջերմություն, հանգստություն, հաճելի մթնոլորտ։" 
                            : "Используется, когда место создает ощущение тепла, покоя и приятной домашней атмосферы."}
                        </p>
                        <div className="pt-2 border-t border-slate-200/40 text-xs font-mono text-teal-800 space-y-1">
                          <p onClick={() => speakText("La habitación es acogedora")} className="cursor-pointer hover:underline"><strong>La habitación es acogedora.</strong> (Սենյակը ջերմ ու հարմարավետ է:)</p>
                          <p onClick={() => speakText("La casa es acogedora")} className="cursor-pointer hover:underline"><strong>La casa es acogedora.</strong> (Տունը уютный է / ջերմ մթնոլորտ ունի:)</p>
                          <p onClick={() => speakText("El restaurante es acogedor")} className="cursor-pointer hover:underline"><strong>El restaurante es acogedor.</strong> (Ռեստորանը уютный է / հաճելի մթնոլորտ ունի:)</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-100 text-xs text-amber-900 leading-relaxed">
                      <strong>{lang === 'arm' ? "Կարճ տարբերությունը՝" : "Краткое отличие:"}</strong><br />
                      <strong>cómoda</strong> — {lang === 'arm' ? "ֆիզիկապես հարմար է" : "физически удобно"}<br />
                      <strong>acogedora</strong> — {lang === 'arm' ? "մթնոլորտով ջերմ ու հաճելի է" : "атмосферно тепло и приятно"}<br />
                      <span className="mt-2 block font-mono text-teal-950 font-semibold" onClick={() => speakText("Mi casa es cómoda y acogedora")}>
                        👉 <strong>Mi casa es cómoda y acogedora.</strong> (Ինչը նշանակում է՝ իմ տունը հարմար է ապրելու համար և ունի ջերմ, հաճելի մթնոլորտ:)
                      </span>
                    </div>
                  </div>

                  {/* 2. Piso de alquiler vs Su piso */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-xs space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🏠</span>
                      <h4 className="font-display font-extrabold text-sm sm:text-base text-slate-900">
                        {lang === 'arm' ? "piso de alquiler vs su piso (Բնակարանների սեփականություն)" : "piso de alquiler vs su piso (Собственность жилья)"}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* piso de alquiler */}
                      <div className="bg-slate-50/70 p-4 rounded-xl space-y-2 border border-slate-100">
                        <span className="text-xs font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-md font-mono">
                          piso de alquiler
                        </span>
                        <p className="text-sm font-semibold text-slate-800">
                          {lang === 'arm' ? "վարձով բնակարան / վարձակալվող բնակարան" : "арендованная квартира"}
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {lang === 'arm' 
                            ? "Այսինքն՝ բնակարանը իրենը չէ, նա այն վարձում է։" 
                            : "То есть квартира не принадлежит живущему, он её снимает/арендует."}
                        </p>
                        <div className="pt-2 border-t border-slate-200/40 text-xs font-mono text-teal-800">
                          <p onClick={() => speakText("Vivo en un piso de alquiler")} className="cursor-pointer hover:underline"><strong>Vivo en un piso de alquiler.</strong> (Ես ապրում եմ վարձով բնակարանում:)</p>
                        </div>
                      </div>

                      {/* su piso / el piso suyo */}
                      <div className="bg-slate-50/70 p-4 rounded-xl space-y-2 border border-slate-100">
                        <span className="text-xs font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-md font-mono">
                          su piso / el piso suyo
                        </span>
                        <p className="text-sm font-semibold text-slate-800">
                          {lang === 'arm' ? "իր բնակարանը / սեփական բնակարանը" : "его/её квартира"}
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {lang === 'arm' 
                            ? "Այսինքն՝ բնակարանը պատկանում է նրան կամ խոսում ենք կոնկրետ իր բնակարանի մասին։" 
                            : "То есть квартира принадлежит ему/ей или мы говорим именно про их квартиру."}
                        </p>
                        <div className="pt-2 border-t border-slate-200/40 text-xs font-mono text-teal-800 space-y-1">
                          <p onClick={() => speakText("Vive en su piso")} className="cursor-pointer hover:underline"><strong>Vive en su piso.</strong> (Նա ապրում է իր բնակարանում:)</p>
                          <p onClick={() => speakText("El piso es suyo")} className="cursor-pointer hover:underline"><strong>El piso es suyo.</strong> (Բնակարանը իրենն է:)</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-teal-50 p-3.5 rounded-xl border border-teal-100 text-xs text-teal-900 leading-relaxed space-y-1">
                      <p><strong>{lang === 'arm' ? "Կարճ՝" : "Кратко:"}</strong></p>
                      <p>🔹 <strong>piso de alquiler</strong> — {lang === 'arm' ? "վարձով բնակարան է" : "это арендованная квартира"}</p>
                      <p>🔹 <strong>su piso / el piso suyo</strong> — {lang === 'arm' ? "իր բնակարանն է" : "это его/своя квартира"}</p>
                      <p className="mt-2 text-slate-700">
                        💡 {lang === 'arm' 
                          ? "Ավելի բնական իսպաներենում ասում են su piso, ոչ թե շատ հաճախ el piso suyo:" 
                          : "В естественном испанском языке всегда предпочитают говорить su piso вместо el piso suyo."}
                      </p>
                      <span className="mt-2 block font-mono text-teal-950 font-semibold" onClick={() => speakText("¿Es un piso de alquiler o es su piso?")}>
                        👉 <strong>¿Es un piso de alquiler o es su piso?</strong> (Դա վարձով բնակարա՞ն է, թե՞ իր բնակարանն է:)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form to insert new vocabulary card */}
                <form onSubmit={handleAddWord} className="bg-slate-50/70 rounded-2xl p-4 sm:p-5 border border-slate-100 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-700 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-teal-600" />
                    <span>{t.addWord}</span>
                  </h4>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input 
                      type="text"
                      required
                      value={newWord}
                      onChange={(e) => setNewWord(e.target.value)}
                      placeholder={t.wordPlholder}
                      className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-mono focus:outline-hidden focus:border-teal-500 grow"
                    />
                    <input 
                      type="text"
                      required
                      value={newTranslation}
                      onChange={(e) => setNewTranslation(e.target.value)}
                      placeholder={t.translationPlholder}
                      className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs focus:outline-hidden focus:border-teal-500 grow"
                    />
                    <button 
                      type="submit"
                      className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold px-5 py-2 rounded-xl transition-all text-xs shrink-0"
                    >
                      {t.addBtn}
                    </button>
                  </div>
                </form>

                {/* Vocabulary Cards Deck */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {customWords.map((card, idx) => (
                    <div 
                      key={idx}
                      className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between gap-4"
                    >
                      <div>
                        <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md font-mono">
                          es
                        </span>
                        <h4 className="font-display font-semibold text-sm text-slate-900 mt-1 cursor-pointer hover:text-teal-600" onClick={() => speakText(card.word)}>
                          {card.word}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {card.translation}
                        </p>
                      </div>

                      <button 
                        onClick={() => speakText(card.word)}
                        className="text-slate-400 hover:text-teal-600 border border-slate-100 hover:bg-slate-50 p-2 rounded-full transition-all shrink-0"
                        title={t.speakBtn}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </section>

          {/* RIGHT SIDEBAR - STUDY BOARD / UTILITIES */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Mascot Tip box based on original Duolingo style guides */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-100">
                <span className="text-2xl">🦉</span>
                <div>
                  <h4 className="font-display font-bold text-xs text-slate-900">Eduardo (🦉 AI Tutor)</h4>
                  <p className="text-[10px] text-slate-400">Guía de aprendizaje</p>
                </div>
              </div>
              
              <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <p>
                  {lang === 'arm' 
                    ? 'Բարև՛: Իսպաներենում «Estar»-ը օգտագործվում է գտնվելու վայրի համար, իսկ «Ser»-ը՝ էության, մասնագիտության և ծագման համար:' 
                    : 'Привет! Запомни простое правило: глагол «Estar» мы используем для указания места, а «Ser» — для описания сути объекта, профессии и происхождения.'}
                </p>
                <p className="bg-teal-50 text-teal-800 p-2.5 rounded-xl border border-teal-100 text-[11px] font-mono">
                  💡 *Mi madre tiene ... años* → siempre usamos "tener" para la edad.
                </p>
              </div>
            </div>

            {/* Quick Goals checklist */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
              <h4 className="font-display font-bold text-xs text-slate-900 text-uppercase tracking-wider">
                {t.studyGoals}
              </h4>
              
              <div className="space-y-2 text-xs">
                <label className="flex items-start gap-2.5 p-1 cursor-pointer">
                  <input type="checkbox" checked={answeredGrammarCount >= 5} readOnly className="mt-0.5 accent-teal-600" />
                  <span className={answeredGrammarCount >= 5 ? "line-through text-slate-400" : ""}>
                    {lang === 'arm' ? 'Լրացնել առնվազն 5 քերականական հարց' : 'Пройти минимум 5 вопросов грамматики'}
                  </span>
                </label>
                
                <label className="flex items-start gap-2.5 p-1 cursor-pointer">
                  <input type="checkbox" checked={answeredGrammarCount === 10} readOnly className="mt-0.5 accent-teal-600" />
                  <span className={answeredGrammarCount === 10 ? "line-through text-slate-400" : ""}>
                    {lang === 'arm' ? 'Լրացնել ամբողջական թեստը (10/10)' : 'Завершить весь тест полностью (10/10)'}
                  </span>
                </label>

                <label className="flex items-start gap-2.5 p-1 cursor-pointer">
                  <input type="checkbox" checked={answeredSofiaCount >= 3} readOnly className="mt-0.5 accent-teal-600" />
                  <span className={answeredSofiaCount >= 3 ? "line-through text-slate-400" : ""}>
                    {lang === 'arm' ? '3+ հարց Սոֆիայի պատմությունից' : 'Ответить на 3+ вопроса по Софие'}
                  </span>
                </label>

                <label className="flex items-start gap-2.5 p-1 cursor-pointer">
                  <input type="checkbox" checked={userSpeechDraft.length > 10} readOnly className="mt-0.5 accent-teal-600" />
                  <span className={userSpeechDraft.length > 10 ? "line-through text-slate-400" : ""}>
                    {lang === 'arm' ? 'Գրել սեփական պատասխանը սևագրում' : 'Написать свой черновик речи'}
                  </span>
                </label>
              </div>
            </div>

            {/* Interactive Stats Panel */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs text-center space-y-2">
              <Award className="w-8 h-8 text-amber-500 mx-auto" />
              <div className="font-display font-extrabold text-lg text-slate-900">
                {totalCorrect === totalQuestions ? "🥇 Perfect Score!" : `${totalCorrect} / ${totalQuestions}`}
              </div>
              <p className="text-[11px] text-slate-500">
                {lang === 'arm' ? 'Ճշտություն և ջանասիրություն ուսման մեջ' : 'Точность и глубина прохождения курса'}
              </p>
            </div>

          </aside>

        </div>

      </main>

      {/* Decorative clean footer */}
      <footer className="max-w-6xl mx-auto px-4 mt-16 pt-6 border-t border-slate-200 text-center text-xs text-slate-400">
        <p>© 2026 {t.title}. {lang === 'arm' ? 'Բոլոր իրավունքները պաշտպանված են:' : 'Все права сохранены за учебной программой.'}</p>
        <p className="text-[11px] text-slate-500 mt-1 font-mono">Español A1 - Armenia y Rusia Escuela Integradora</p>
      </footer>
    </div>
  );
}
