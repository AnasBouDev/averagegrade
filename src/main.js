import './style.css'

const TRANSLATIONS = {
  en: {
    appTitle: 'My Grades',
    greeting: 'Hello',
    darkMode: 'Dark Mode',
    color: 'Color',
    generalAverage: 'General Average',
    reset: 'Reset All',
    welcome: 'Welcome!',
    welcomeDesc: 'Let\'s customize your experience.',
    nameLabel: 'Your Name',
    namePlaceholder: 'Ex: Karim',
    colorLabel: 'Pick your favorite color',
    start: "Let's go!",
    cancel: 'Cancel',
    confirm: 'Confirm',
    secretTitle: 'Secret Zone 🔒',
    secretDesc: 'Enter password to access hidden content.',
    password: 'Password',
    subjects: {
      'Mathématiques': 'Mathematics',
      'Français': 'French',
      'Arabe': 'Arabic',
      'SVT': 'Life & Earth Sciences',
      'Physique-Chimie': 'Physics-Chemistry',
      'Histoire-Géo': 'History-Geography',
      'Éducation Islamique': 'Islamic Education',
      'Anglais': 'English',
      'Technologie': 'Technology'
    }
  },
  fr: {
    appTitle: 'Mes Notes',
    greeting: 'Bonjour',
    darkMode: 'Mode Nuit',
    color: 'Couleur',
    generalAverage: 'Moyenne Générale',
    reset: 'Tout réinitialiser',
    welcome: 'Bienvenue !',
    welcomeDesc: 'Commençons par personnaliser ton expérience.',
    nameLabel: 'Ton prénom',
    namePlaceholder: 'Ex: Karim',
    colorLabel: 'Choisis ta couleur préférée',
    start: "C'est parti !",
    cancel: 'Annuler',
    confirm: 'Valider',
    secretTitle: 'Zone Secrète 🔒',
    secretDesc: 'Entrez le mot de passe pour accéder au contenu caché.',
    password: 'Mot de passe',
    subjects: {
      'Mathématiques': 'Mathématiques',
      'Français': 'Français',
      'Arabe': 'Arabe',
      'SVT': 'SVT',
      'Physique-Chimie': 'Physique-Chimie',
      'Histoire-Géo': 'Histoire-Géo',
      'Éducation Islamique': 'Éducation Islamique',
      'Anglais': 'Anglais',
      'Technologie': 'Technologie'
    }
  },
  ar: {
    appTitle: 'نقاطي',
    greeting: 'مرحباً',
    darkMode: 'الوضع الليلي',
    color: 'لون',
    generalAverage: 'المعدل العام',
    reset: 'إعادة تعيين الكل',
    welcome: 'مرحباً بك!',
    welcomeDesc: 'لنقم بتخصيص تجربتك.',
    nameLabel: 'اسمك',
    namePlaceholder: 'مثال: كريم',
    colorLabel: 'اختر لونك المفضل',
    start: 'لنبدأ!',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    secretTitle: 'منطقة سرية 🔒',
    secretDesc: 'أدخل كلمة المرور للوصول للمحتوى المخفي.',
    password: 'كلمة المرور',
    subjects: {
      'Mathématiques': 'رياضيات',
      'Français': 'فرنسية',
      'Arabe': 'عربية',
      'SVT': 'علوم الحياة والأرض',
      'Physique-Chimie': 'فيزياء وكيمياء',
      'Histoire-Géo': 'تاريخ وجغرافيا',
      'Éducation Islamique': 'تربية إسلامية',
      'Anglais': 'إنجليزية',
      'Technologie': 'تكنولوجيا'
    }
  }
};

const SUBJECTS_KEYS = [
  'Mathématiques', 'Français', 'Arabe', 'SVT',
  'Physique-Chimie', 'Histoire-Géo', 'Éducation Islamique',
  'Anglais', 'Technologie'
];

// Fallback to French names as keys
const SUBJECTS = SUBJECTS_KEYS.slice(); // Copy to avoid mutation issues if any

const COLORS = [
  { hue: 260, label: 'Purple' },
  { hue: 210, label: 'Blue' },
  { hue: 140, label: 'Green' },
  { hue: 25, label: 'Orange' },
  { hue: 330, label: 'Pink' },
  { hue: 0, label: 'Red' }
];

// State
let state = {
  userName: '',
  primaryHue: 260,
  darkMode: false,
  language: 'en', // default
  grades: {} // { 'Mathématiques': [null, null, null, null], ... }
};

// DOM Elements
const userGreeting = document.getElementById('userGreeting');
const subjectsGrid = document.getElementById('subjectsGrid');
const generalAverageEl = document.getElementById('generalAverage');
const resetBtn = document.getElementById('resetBtn');
const welcomeModal = document.getElementById('welcomeModal');
const userNameInput = document.getElementById('userName');
const colorOptionsContainer = document.getElementById('colorOptions');
const startBtn = document.getElementById('startBtn');
const settingsToggle = document.getElementById('settingsToggle');
const settingsMenu = document.getElementById('settingsMenu');
const themeToggle = document.getElementById('themeToggle');
const modalThemeToggle = document.getElementById('modalThemeToggle');
const miniColorPicker = document.getElementById('miniColorPicker');
const appLogo = document.querySelector('.app-logo');
const secretModal = document.getElementById('secretModal');
const secretPassInput = document.getElementById('secretPass');
const confirmSecretBtn = document.getElementById('confirmSecretBtn');
const cancelSecretBtn = document.getElementById('cancelSecretBtn');

// Initialization
function init() {
  loadState();
  renderColorOptions();
  renderMiniColorOptions();
  renderSubjects();
  applyTheme();

  if (!state.userName) {
    showModal();
  } else {
    updateLanguage(); // Ensure language is applied on load
    updateUI();
  }

  setupEventListeners();
  setupSettingsListeners();
  setupEasterEgg();
}

function loadState() {
  const stored = localStorage.getItem('myGradesApp_v1');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Merge stored state with default structure to ensure robustness
      state = { ...state, ...parsed };
      // Ensure grades object has all subjects
      SUBJECTS.forEach(sub => {
        if (!state.grades[sub]) state.grades[sub] = [null, null, null, null];
      });
    } catch (e) {
      console.error("Error loading state", e);
    }
  } else {
    // First time setup
    SUBJECTS.forEach(sub => {
      state.grades[sub] = [null, null, null, null];
    });
  }
}

function saveState() {
  localStorage.setItem('myGradesApp_v1', JSON.stringify(state));
}

function updateUI() {
  userGreeting.textContent = state.userName ? `Bonjour, ${state.userName}` : '';

  // Update all calculations
  SUBJECTS.forEach(subject => {
    const avg = calculateSubjectAverage(subject);
    const avgEl = document.getElementById(`avg-${subject}`);
    if (avgEl) {
      const newValue = avg !== null ? formatNumber(avg) : '--';
      if (avgEl.textContent !== newValue) {
        avgEl.textContent = newValue;
        // Trigger reflow to restart animation
        avgEl.classList.remove('pulse');
        void avgEl.offsetWidth;
        avgEl.classList.add('pulse');
      }
    }
  });

  const genAvg = calculateGeneralAverage();
  const newValue = genAvg !== null ? `${formatNumber(genAvg)}/20` : '--/20';
  if (generalAverageEl.textContent !== newValue) {
    generalAverageEl.textContent = newValue;
    generalAverageEl.classList.remove('pulse');
    void generalAverageEl.offsetWidth;
    generalAverageEl.classList.add('pulse');
  }
}

function applyTheme() {
  const root = document.documentElement;
  root.style.setProperty('--primary-hue', state.primaryHue);

  if (state.darkMode) {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.removeAttribute('data-theme');
  }

  // Update modal selection
  document.querySelectorAll('.color-option').forEach(el => {
    el.classList.toggle('selected', parseInt(el.dataset.hue) === state.primaryHue);
  });

  // Update mini picker selection
  document.querySelectorAll('.mini-color-option').forEach(el => {
    el.classList.toggle('selected', parseInt(el.dataset.hue) === state.primaryHue);
  });
}

function updateLanguage() {
  const lang = state.language;
  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

  // Text Updates
  document.querySelector('h1').textContent = t.appTitle;
  if (state.userName) {
    document.getElementById('userGreeting').textContent = `${t.greeting}, ${state.userName}`;
  }

  // Settings
  document.querySelector('.settings-item span').textContent = t.darkMode; // First span is Dark Mode
  document.querySelectorAll('.settings-item span')[1].textContent = t.color; // Second is Color

  // Footer
  document.querySelector('.general-avg-label').textContent = t.generalAverage;
  document.getElementById('resetBtn').textContent = t.reset;

  // Modal (if needed dynamically, though usually rendered once)
  document.querySelector('.modal h2').textContent = t.welcome;
  document.querySelector('.modal p').textContent = t.welcomeDesc;
  document.querySelector('label[for="userName"]').textContent = t.nameLabel;
  document.getElementById('userName').placeholder = t.namePlaceholder;
  document.querySelectorAll('.form-group label')[1].textContent = t.colorLabel;
  document.getElementById('startBtn').textContent = t.start;
  document.querySelector('label[for="modalThemeToggle"]').textContent = t.darkMode;

  // Secret Modal
  document.querySelector('label[for="secretPass"]').textContent = t.password;
  document.getElementById('cancelSecretBtn').textContent = t.cancel;
  document.getElementById('confirmSecretBtn').textContent = t.confirm;

  // Update Subjects
  document.querySelectorAll('.subject-title').forEach(el => {
    // We stored the original key in data-key attribute or we infer it?
    // Let's add data-key to subjects render
    const key = el.dataset.key; // We need to add this in renderSubjects
    if (key && t.subjects[key]) {
      el.textContent = t.subjects[key];
    }
  });

  // Re-render subjects if needed to update placeholders or direction?
  // Input direction is handled by CSS [dir=rtl]
}

// Logic
function calculateSubjectAverage(subject) {
  const notes = state.grades[subject];
  const validNotes = notes.filter(n => n !== null && n !== '');
  if (validNotes.length === 0) return null;
  const sum = validNotes.reduce((a, b) => a + parseFloat(b), 0);
  return sum / validNotes.length;
}

function calculateGeneralAverage() {
  let total = 0;
  let count = 0;

  SUBJECTS.forEach(subject => {
    const avg = calculateSubjectAverage(subject);
    if (avg !== null) {
      total += avg;
      count++;
    }
  });

  if (count === 0) return null;
  return total / count;
}

function formatNumber(num) {
  return num.toLocaleString('fr-MA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Rendering
function renderColorOptions() {
  colorOptionsContainer.innerHTML = '';
  COLORS.forEach(color => {
    const btn = document.createElement('div');
    btn.className = 'color-option';
    btn.style.backgroundColor = `hsl(${color.hue}, 60%, 50%)`;
    btn.dataset.hue = color.hue;
    btn.onclick = () => {
      state.primaryHue = color.hue;
      applyTheme();
    };
    colorOptionsContainer.appendChild(btn);
  });
}

function renderMiniColorOptions() {
  miniColorPicker.innerHTML = '';
  COLORS.forEach(color => {
    const btn = document.createElement('div');
    btn.className = 'mini-color-option';
    btn.style.backgroundColor = `hsl(${color.hue}, 60%, 50%)`;
    btn.dataset.hue = color.hue;
    btn.onclick = () => {
      state.primaryHue = color.hue;
      saveState();
      applyTheme();
    };
    miniColorPicker.appendChild(btn);
  });
}

function renderSubjects() {
  subjectsGrid.innerHTML = '';
  SUBJECTS.forEach(subject => {
    const card = document.createElement('div');
    card.className = 'subject-card';

    // Create Inputs HTML
    let inputsHtml = '';
    for (let i = 0; i < 4; i++) {
      const val = state.grades[subject][i];
      inputsHtml += `
        <div class="grade-input-wrapper">
          <input type="number" 
                 class="grade-input" 
                 data-subject="${subject}" 
                 data-index="${i}" 
                 min="0" max="20" step="0.25" 
                 placeholder="-"
                 value="${val !== null ? val : ''}"
          >
        </div>
      `;
    }

    card.innerHTML = `
      <div class="subject-header">
        <div class="subject-title" data-key="${subject}">${TRANSLATIONS[state.language].subjects[subject] || subject}</div>
        <div class="subject-avg" id="avg-${subject}">--</div>
      </div>
      <div class="grades-inputs">
        ${inputsHtml}
      </div>
    `;
    subjectsGrid.appendChild(card);
  });
}

function showModal() {
  welcomeModal.classList.add('active');
  // Reset steps
  document.querySelector('.step-container[data-step="1"]').classList.remove('hidden');
  document.querySelector('.step-container[data-step="2"]').classList.add('hidden');

  applyTheme();
}

function hideModal() {
  welcomeModal.classList.remove('active');
}

// Event Listeners
function setupEventListeners() {
  // Global input listener for delegation
  subjectsGrid.addEventListener('input', (e) => {
    if (e.target.classList.contains('grade-input')) {
      const subject = e.target.dataset.subject;
      const index = parseInt(e.target.dataset.index);
      let value = e.target.value;

      // Validation
      if (value === '') {
        state.grades[subject][index] = null;
      } else {
        let num = parseFloat(value);
        if (num < 0) num = 0;
        if (num > 20) num = 20;
        // Optional: clamp value visually? user might be typing, so only clamp if blur or valid? 
        // Let's just store the value. If it's > 20, calculation treats it as is or we can clamp.
        // Better to not interfere too much while typing, but let's clamp for safety in calc.
        state.grades[subject][index] = num;
      }

      saveState();
      updateUI();
    }
  });

  startBtn.addEventListener('click', () => {
    const name = userNameInput.value.trim();
    if (name) {
      state.userName = name;
      saveState();
      updateUI();
      hideModal();
    } else {
      userNameInput.style.borderColor = 'red';
      userNameInput.focus();
    }
  });

  // Language Selection (Modal)
  document.querySelectorAll('.lang-card').forEach(card => {
    card.addEventListener('click', () => {
      const lang = card.dataset.lang;
      setLanguage(lang);

      // Animate to next step
      const step1 = document.querySelector('.step-container[data-step="1"]');
      const step2 = document.querySelector('.step-container[data-step="2"]');

      step1.style.opacity = '0';
      step1.style.transform = 'translateY(-20px)';

      setTimeout(() => {
        step1.classList.add('hidden');
        step2.classList.remove('hidden');
        step2.classList.add('slide-up');
      }, 300);
    });
  });

  resetBtn.addEventListener('click', () => {
    // Translation might change, so we need dynamic confirm message?
    // For now simple alert or using translation text
    const lang = state.language;
    const msg = lang === 'ar' ?
      'هل تريد حقاً إعادة تعيين كل شيء؟ (سيتم الاحتفاظ بالاسم واللون)' :
      'Do you really want to reset everything? (Your name and color will be kept)';

    if (confirm(msg)) {
      // Re-initialize logic
      SUBJECTS_KEYS.forEach(sub => {
        state.grades[sub] = [null, null, null, null];
      });
      saveState();
      renderSubjects();
      updateUI();
      // Re-apply language to ensure subject titles are correct (though renderSubjects uses state, just to be safe)
      updateLanguage();
    }
  });
}

function setLanguage(lang) {
  state.language = lang;
  saveState();
  updateLanguage();

  // Visual feedback
  document.querySelectorAll('.lang-card').forEach(c => {
    c.classList.toggle('selected', c.dataset.lang === lang);
  });

  document.querySelectorAll('.mini-lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
}

function setupSettingsListeners() {
  settingsToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsMenu.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (settingsMenu.classList.contains('active') &&
      !settingsMenu.contains(e.target) &&
      !settingsToggle.contains(e.target)) {
      settingsMenu.classList.remove('active');
    }
  });

  // Settings Language Picker
  document.querySelectorAll('.mini-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
    });
  });

  themeToggle.addEventListener('click', () => {
    state.darkMode = !state.darkMode;
    saveState();
    applyTheme();
  });

  if (modalThemeToggle) {
    modalThemeToggle.addEventListener('click', () => {
      state.darkMode = !state.darkMode;
      // No saveState needed here necessarily if we only save on "Start", 
      // but saving immediately is fine and simpler for sync.
      // However, usually onboarding preferences are saved on "Complete", 
      // but theme is visual, so applying immediately is good.
      saveState();
      applyTheme();
    });
  }
}

function setupEasterEgg() {
  let logoClicks = 0;
  let clickTimeout;

  if (appLogo) {
    appLogo.addEventListener('click', () => {
      logoClicks++;

      // Reset clicks if user stops clicking for 2 seconds
      clearTimeout(clickTimeout);
      clickTimeout = setTimeout(() => {
        logoClicks = 0;
      }, 2000);

      if (logoClicks === 5) {
        secretModal.classList.add('active');
        secretPassInput.focus();
        logoClicks = 0;
      }
    });

    // Make it look interactive
    appLogo.style.cursor = 'pointer';
    appLogo.style.transition = 'transform 0.1s';
    appLogo.addEventListener('mousedown', () => appLogo.style.transform = 'scale(0.9)');
    appLogo.addEventListener('mouseup', () => appLogo.style.transform = 'scale(1)');
    appLogo.addEventListener('mouseleave', () => appLogo.style.transform = 'scale(1)');
  }

  function checkSecret() {
    if (secretPassInput.value === 'secret') {
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
      secretModal.classList.remove('active');
      secretPassInput.value = '';
    } else {
      secretPassInput.style.borderColor = 'red';
      secretPassInput.classList.add('pulse');
      setTimeout(() => {
        secretPassInput.style.borderColor = '';
        secretPassInput.classList.remove('pulse');
      }, 500);
    }
  }

  confirmSecretBtn.addEventListener('click', checkSecret);

  secretPassInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkSecret();
  });

  cancelSecretBtn.addEventListener('click', () => {
    secretModal.classList.remove('active');
    secretPassInput.value = '';
    secretPassInput.style.borderColor = '';
  });

  // Close when clicking outside
  secretModal.addEventListener('click', (e) => {
    if (e.target === secretModal) {
      secretModal.classList.remove('active');
    }
  });
}

// Run
init();
