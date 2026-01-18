import './style.css'

const TRANSLATIONS = {
  en: {
    appTitle: 'My Grades',
    greeting: 'Hello',
    language: 'Language',
    darkMode: 'Dark Mode',
    color: 'Color',
    generalAverage: 'General Average',
    reset: 'Reset Grades',
    restoreDefaults: 'Restore Defaults',
    welcome: 'Welcome!',
    welcomeDesc: 'Let\'s customize your experience.',
    nameLabel: 'Your Name',
    namePlaceholder: 'Ex: Karim',
    colorLabel: 'Pick your favorite color',
    start: "Let's go!",
    cancel: 'Cancel',
    confirm: 'Confirm',
    add: 'Add',
    addSubject: 'Add Subject',
    subjectName: 'Subject Name',
    gradeCount: 'Number of Grades',
    coefficient: 'Coefficient',
    secretTitle: 'Secret Zone 🔒',
    secretDesc: 'Enter password to access hidden content.',
    password: 'Password',
    deleteConfirm: 'Delete this subject?',
    restoreConfirm: 'Restore default subjects and settings? This will delete custom subjects.',
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
    language: 'Langue',
    darkMode: 'Mode Nuit',
    color: 'Couleur',
    generalAverage: 'Moyenne Générale',
    reset: 'Réinitialiser les notes',
    restoreDefaults: 'Restaurer les défauts',
    welcome: 'Bienvenue !',
    welcomeDesc: 'Commençons par personnaliser ton expérience.',
    nameLabel: 'Ton prénom',
    namePlaceholder: 'Ex: Karim',
    colorLabel: 'Choisis ta couleur préférée',
    start: "C'est parti !",
    cancel: 'Annuler',
    confirm: 'Valider',
    add: 'Ajouter',
    addSubject: 'Ajouter une matière',
    subjectName: 'Nom de la matière',
    gradeCount: 'Nombre de notes',
    coefficient: 'Coefficient',
    secretTitle: 'Zone Secrète 🔒',
    secretDesc: 'Entrez le mot de passe pour accéder au contenu caché.',
    password: 'Mot de passe',
    deleteConfirm: 'Supprimer cette matière ?',
    restoreConfirm: 'Restaurer les paramètres par défaut ? Cela supprimera les matières personnalisées.',
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
    language: 'اللغة',
    darkMode: 'الوضع الليلي',
    color: 'لون',
    generalAverage: 'المعدل العام',
    reset: 'إعادة تعيين النقاط',
    restoreDefaults: 'استعادة الافتراضي',
    welcome: 'مرحباً بك!',
    welcomeDesc: 'لنقم بتخصيص تجربتك.',
    nameLabel: 'اسمك',
    namePlaceholder: 'مثال: كريم',
    colorLabel: 'اختر لونك المفضل',
    start: 'لنبدأ!',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    add: 'إضافة',
    addSubject: 'إضافة مادة',
    subjectName: 'اسم المادة',
    gradeCount: 'عدد الفروض',
    coefficient: 'المعامل',
    secretTitle: 'منطقة سرية 🔒',
    secretDesc: 'أدخل كلمة المرور للوصول للمحتوى المخفي.',
    password: 'كلمة المرور',
    deleteConfirm: 'حذف هذه المادة؟',
    restoreConfirm: 'استعادة الإعدادات الافتراضية؟ سيتم حذف المواد المخصصة.',
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

const DEFAULT_CONFIG = [
  { key: 'Mathématiques', coeff: 1 },
  { key: 'Français', coeff: 1 },
  { key: 'Arabe', coeff: 1 },
  { key: 'SVT', coeff: 1 },
  { key: 'Physique-Chimie', coeff: 1 },
  { key: 'Histoire-Géo', coeff: 1 },
  { key: 'Éducation Islamique', coeff: 1 },
  { key: 'Anglais', coeff: 1 },
  { key: 'Technologie', coeff: 1 }
];

const COLORS = [
  { hue: 260, label: 'Purple' },
  { hue: 210, label: 'Blue' },
  { hue: 140, label: 'Green' },
  { hue: 25, label: 'Orange' },
  { hue: 330, label: 'Pink' },
  { hue: 0, label: 'Red' }
];

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

// State
let state = {
  userName: '',
  primaryHue: 260,
  darkMode: false,
  language: 'en',
  subjects: [] // Array of { id, name (or key), coefficient, grades: [], isDefault: bool }
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

// New Elements
const addSubjectBtn = document.getElementById('addSubjectBtn');
const addSubjectModal = document.getElementById('addSubjectModal');
const newSubjectNameInput = document.getElementById('newSubjectName');
const newSubjectGradeCountInput = document.getElementById('newSubjectGradeCount');
const newSubjectCoeffInput = document.getElementById('newSubjectCoeff');
const newSubjectCoeffValue = document.getElementById('newSubjectCoeffValue');
const confirmAddSubjectBtn = document.getElementById('confirmAddSubjectBtn');
const cancelAddSubjectBtn = document.getElementById('cancelAddSubjectBtn');
const restoreDefaultsBtn = document.getElementById('restoreDefaultsBtn');

// Confirmation Modal Elements
const confirmModal = document.getElementById('confirmModal');
const confirmMessage = document.getElementById('confirmMessage');
const btnCancelConfirm = document.getElementById('btnCancelConfirm');
const btnConfirmAction = document.getElementById('btnConfirmAction');

// Initialization
function init() {
  // Safety Check
  const criticalElements = [
    { name: 'subjectsGrid', el: subjectsGrid },
    { name: 'generalAverageEl', el: generalAverageEl }
  ];

  const missing = criticalElements.filter(i => !i.el);
  if (missing.length > 0) {
    console.error('Critical elements missing:', missing.map(m => m.name));
    return; // Stop execution to prevent crashes
  }

  loadState();
  renderColorOptions();
  renderMiniColorOptions();
  renderSubjects();
  displaySafeTheme();

  if (!state.userName) {
    showModal();
  } else {
    updateLanguage();
    updateUI();
  }

  setupEventListeners();
  setupSettingsListeners();
  setupEasterEgg();
  setupDynamicSubjectsListeners();
}

function displaySafeTheme() {
  try {
    applyTheme();
  } catch (e) {
    console.warn('Theme application failed', e);
  }
}

function loadState() {
  const stored = localStorage.getItem('myGradesApp_v1');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Migration Logic
      if (parsed.grades && !parsed.subjects) {
        // Old format detected
        state.userName = parsed.userName || '';
        state.primaryHue = parsed.primaryHue || 260;
        state.darkMode = parsed.darkMode || false;
        state.language = parsed.language || 'en';

        state.subjects = DEFAULT_CONFIG.map(conf => ({
          id: generateId(),
          name: conf.key,
          coefficient: conf.coeff,
          grades: parsed.grades[conf.key] || [null, null, null, null],
          isDefault: true
        }));
      } else {
        // New format
        state = { ...state, ...parsed };
      }
    } catch (e) {
      console.error("Error loading state", e);
      initializeDefaultSubjects();
    }
  } else {
    initializeDefaultSubjects();
  }
}

function initializeDefaultSubjects() {
  state.subjects = DEFAULT_CONFIG.map(conf => ({
    id: generateId(),
    name: conf.key,
    coefficient: conf.coeff,
    grades: [null, null, null, null],
    isDefault: true
  }));
}

function saveState() {
  localStorage.setItem('myGradesApp_v1', JSON.stringify(state));
}

function updateUI() {
  userGreeting.textContent = state.userName ?
    `${TRANSLATIONS[state.language].greeting}, ${state.userName}` : '';

  state.subjects.forEach(subject => {
    const avg = calculateSubjectAverage(subject);
    const avgEl = document.getElementById(`avg-${subject.id}`);
    if (avgEl) {
      const newValue = avg !== null ? formatNumber(avg) : '--';
      if (avgEl.textContent !== newValue) {
        avgEl.textContent = newValue;
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
    void generalAverageEl.offsetWidth; // trigger reflow
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

  document.querySelectorAll('.color-option').forEach(el => {
    el.classList.toggle('selected', parseInt(el.dataset.hue) === state.primaryHue);
  });
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
  document.getElementById('settingLabelLanguage').textContent = t.language;
  document.getElementById('settingLabelTheme').textContent = t.darkMode;
  document.getElementById('settingLabelColor').textContent = t.color;
  restoreDefaultsBtn.textContent = t.restoreDefaults;

  // Footer
  document.querySelector('.general-avg-label').textContent = t.generalAverage;
  resetBtn.textContent = t.reset;

  // Modals
  document.querySelector('.modal h2').textContent = t.welcome;
  document.querySelector('.modal p').textContent = t.welcomeDesc;
  document.querySelector('label[for="userName"]').textContent = t.nameLabel;
  document.getElementById('userName').placeholder = t.namePlaceholder;
  document.querySelectorAll('.form-group label')[1].textContent = t.colorLabel; // fragile selector
  document.getElementById('startBtn').textContent = t.start;

  // Add Subject Modal
  document.getElementById('addSubjectTitle').textContent = t.addSubject;
  document.getElementById('labelSubjectName').textContent = t.subjectName;
  document.getElementById('labelSubjectGradeCount').textContent = `${t.gradeCount}: ${newSubjectGradeCountInput.value}`;
  document.getElementById('labelSubjectCoeff').firstChild.textContent = t.coefficient + ': ';
  document.getElementById('cancelAddSubjectBtn').textContent = t.cancel;
  document.getElementById('confirmAddSubjectBtn').textContent = t.add;
  document.getElementById('newSubjectName').placeholder = "Ex: Philosophie";

  // Secret modal
  document.getElementById('secretTitle').textContent = t.secretTitle;
  document.getElementById('secretDesc').textContent = t.secretDesc;
  document.getElementById('labelSecretPass').textContent = t.password;

  // Confirm Modal
  document.getElementById('confirmTitle').textContent = t.confirm;
  document.getElementById('btnCancelConfirm').textContent = t.cancel;
  document.getElementById('btnConfirmAction').textContent = t.confirm;

  // Subjects Rendering (Re-render to update titles)
  renderSubjects();
}

// Custom Confirmation Helper
function showConfirmation(message, onConfirm) {
  confirmMessage.textContent = message;
  confirmModal.classList.add('active');

  // Use onclick to replace any previous event handler
  btnConfirmAction.onclick = () => {
    onConfirm();
    confirmModal.classList.remove('active');
  };
}

btnCancelConfirm.addEventListener('click', () => {
  confirmModal.classList.remove('active');
});

function calculateSubjectAverage(subject) {
  const validNotes = subject.grades.filter(n => n !== null && n !== '');
  if (validNotes.length === 0) return null;
  const sum = validNotes.reduce((a, b) => a + parseFloat(b), 0);
  return sum / validNotes.length;
}

function calculateGeneralAverage() {
  let totalWeighted = 0;
  let totalCoeff = 0;

  state.subjects.forEach(subject => {
    const avg = calculateSubjectAverage(subject);
    if (avg !== null) {
      totalWeighted += avg * subject.coefficient;
      totalCoeff += parseFloat(subject.coefficient);
    }
  });

  if (totalCoeff === 0) return null;
  return totalWeighted / totalCoeff;
}

function formatNumber(num) {
  return num.toLocaleString('fr-MA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

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
  const t = TRANSLATIONS[state.language];

  state.subjects.forEach(subject => {
    const card = document.createElement('div');
    card.className = 'subject-card';
    card.dataset.id = subject.id;

    // Display Name: translate if default, else show custom name
    const displayName = subject.isDefault && t.subjects[subject.name]
      ? t.subjects[subject.name]
      : subject.name;

    // Grades Inputs
    let inputsHtml = '';
    const gradeCount = subject.grades.length;
    // Dynamic styling for grid based on count
    // default 4 cols. if > 4, maybe adjust grid in CSS? 
    // current CSS .grades-inputs has grid-template-columns: repeat(4, 1fr)
    // We can inline style if count != 4 or just let it wrap differently
    const gridStyle = gradeCount !== 4 ? `grid-template-columns: repeat(${Math.min(gradeCount, 6)}, 1fr)` : '';

    for (let i = 0; i < gradeCount; i++) {
      const val = subject.grades[i];
      inputsHtml += `
        <div class="grade-input-wrapper">
          <input type="number" 
                 class="grade-input" 
                 data-subject-id="${subject.id}" 
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
        <div class="subject-title">${displayName}</div>
        <div style="display:flex; gap:0.5rem; align-items:center;">
           <div class="subject-avg" id="avg-${subject.id}">--</div>
           <button class="delete-btn" data-subject-id="${subject.id}" aria-label="Delete">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
           </button>
        </div>
      </div>
      <div class="coeff-control">
        <span class="coeff-value" style="font-size:0.8rem; opacity:0.8;">×</span>
        <input type="range" 
               class="coeff-slider" 
               data-subject-id="${subject.id}" 
               min="1" max="10" step="0.5" 
               value="${subject.coefficient}"
        >
        <span class="coeff-value" id="coeff-val-${subject.id}">${subject.coefficient}</span>
      </div>
      <div class="grades-inputs" style="${gridStyle}">
        ${inputsHtml}
      </div>
    `;
    subjectsGrid.appendChild(card);
  });
}

function showModal() {
  welcomeModal.classList.add('active');
  document.querySelector('.step-container[data-step="1"]').classList.remove('hidden');
  document.querySelector('.step-container[data-step="2"]').classList.add('hidden');
  applyTheme();
}

function hideModal() {
  welcomeModal.classList.remove('active');
}

// Event Listeners
function setupEventListeners() {
  // Use event delegation for dynamic elements
  subjectsGrid.addEventListener('input', (e) => {
    // Grade Input
    if (e.target.classList.contains('grade-input')) {
      const id = e.target.dataset.subjectId;
      const index = parseInt(e.target.dataset.index);
      let value = e.target.value;
      const subject = state.subjects.find(s => s.id === id);

      if (subject) {
        if (value === '') {
          subject.grades[index] = null;
        } else {
          let num = parseFloat(value);
          if (num < 0) num = 0;
          if (num > 20) num = 20;
          subject.grades[index] = num;
        }
        saveState();
        updateUI();
      }
    }

    // Coefficient Slider
    if (e.target.classList.contains('coeff-slider')) {
      const id = e.target.dataset.subjectId;
      const subject = state.subjects.find(s => s.id === id);
      if (subject) {
        subject.coefficient = parseFloat(e.target.value);
        document.getElementById(`coeff-val-${id}`).textContent = subject.coefficient;
        saveState();
        updateUI();
      }
    }
  });

  // Delete Button Delegation
  subjectsGrid.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.delete-btn');
    if (deleteBtn) {
      const id = deleteBtn.dataset.subjectId;
      const t = TRANSLATIONS[state.language];

      showConfirmation(t.deleteConfirm, () => {
        const card = deleteBtn.closest('.subject-card');
        card.classList.add('fade-out-left');
        setTimeout(() => {
          state.subjects = state.subjects.filter(s => s.id !== id);
          saveState();
          renderSubjects();
          updateUI();
        }, 300);
      });
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

  document.querySelectorAll('.lang-card').forEach(card => {
    card.addEventListener('click', () => {
      const lang = card.dataset.lang;
      setLanguage(lang);
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
    const lang = state.language;
    const msg = lang === 'ar' ? 'هل أنت متأكد؟' : (lang === 'fr' ? 'Êtes-vous sûr de vouloir tout réinitialiser ?' : 'Are you sure you want to reset all grades?');

    showConfirmation(msg, () => {
      state.subjects.forEach(sub => {
        sub.grades = Array(sub.grades.length).fill(null);
      });
      saveState();
      renderSubjects();
      updateUI();
    });
  });
}

function setupDynamicSubjectsListeners() {
  // FAB
  if (addSubjectBtn) {
    addSubjectBtn.addEventListener('click', () => {
      newSubjectNameInput.value = '';
      newSubjectCoeffInput.value = 1;
      newSubjectCoeffValue.textContent = '1.0';
      if (newSubjectGradeCountInput) {
        newSubjectGradeCountInput.value = 4;
        const t = TRANSLATIONS[state.language];
        document.getElementById('labelSubjectGradeCount').textContent = `${t.gradeCount}: 4`;
      }
      addSubjectModal.classList.add('active');
    });
  }

  // Modal Cancel
  if (cancelAddSubjectBtn) {
    cancelAddSubjectBtn.addEventListener('click', () => {
      addSubjectModal.classList.remove('active');
    });
  }

  // Slider in Modal
  if (newSubjectCoeffInput) {
    newSubjectCoeffInput.addEventListener('input', (e) => {
      newSubjectCoeffValue.textContent = e.target.value;
    });
  }

  if (newSubjectGradeCountInput) {
    newSubjectGradeCountInput.addEventListener('input', (e) => {
      const t = TRANSLATIONS[state.language];
      document.getElementById('labelSubjectGradeCount').textContent = `${t.gradeCount}: ${e.target.value}`;
    });
  }

  // Add Confirm
  if (confirmAddSubjectBtn) {
    confirmAddSubjectBtn.addEventListener('click', () => {
      const name = newSubjectNameInput.value.trim();
      if (!name) {
        newSubjectNameInput.style.borderColor = 'red';
        return;
      }
      const coeff = parseFloat(newSubjectCoeffInput.value);
      const count = parseInt(newSubjectGradeCountInput ? newSubjectGradeCountInput.value : 4);

      const newSubject = {
        id: generateId(),
        name: name,
        coefficient: coeff,
        grades: Array(count).fill(null),
        isDefault: false
      };

      state.subjects.push(newSubject);
      saveState();
      addSubjectModal.classList.remove('active');
      renderSubjects(); // Re-render to show new subject
      // Optional: scroll to bottom
      setTimeout(() => {
        const cards = document.querySelectorAll('.subject-card');
        const last = cards[cards.length - 1];
        if (last) {
          last.scrollIntoView({ behavior: 'smooth' });
          last.classList.add('scale-up');
        }
      }, 100);
    });
  }

  // Restore Defaults
  if (restoreDefaultsBtn) {
    restoreDefaultsBtn.addEventListener('click', () => {
      const t = TRANSLATIONS[state.language];
      showConfirmation(t.restoreConfirm, () => {
        initializeDefaultSubjects();
        saveState();
        renderSubjects();
        updateUI();
        settingsMenu.classList.remove('active');
      });
    });
  }
}

function setLanguage(lang) {
  state.language = lang;
  saveState();
  updateLanguage();
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
      !settingsToggle.contains(e.target) &&
      e.target !== restoreDefaultsBtn) { // Allow click on restore btn
      settingsMenu.classList.remove('active');
    }
  });

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
    // ... hover effects ...
  }
  // ... rest of easter egg logic ...
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
  });
  secretModal.addEventListener('click', (e) => {
    if (e.target === secretModal) secretModal.classList.remove('active');
  });
}

init();
