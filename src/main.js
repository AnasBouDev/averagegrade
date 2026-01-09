import './style.css'

const SUBJECTS = [
  'Mathématiques',
  'Français',
  'Arabe',
  'SVT',
  'Physique-Chimie',
  'Histoire-Géo',
  'Éducation Islamique',
  'Anglais',
  'Technologie'
];

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
    updateUI();
  }

  setupEventListeners();
  setupSettingsListeners();
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
        <div class="subject-title">${subject}</div>
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
  // Pre-select default color
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

  resetBtn.addEventListener('click', () => {
    if (confirm('Voulez-vous vraiment tout effacer ? (Votre nom et couleur seront conservés)')) {
      SUBJECTS.forEach(sub => {
        state.grades[sub] = [null, null, null, null];
      });
      saveState();
      // Re-render inputs to clear values
      renderSubjects();
      updateUI();
    }
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

// Run
init();
