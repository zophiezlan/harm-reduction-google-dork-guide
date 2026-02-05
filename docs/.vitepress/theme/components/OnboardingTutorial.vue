<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { getStorageItemSimple, setStorageItem } from "../utils/storage";

const STORAGE_KEY = "onboarding-completed";

const isVisible = ref(false);
const currentStep = ref(0);

interface TutorialStep {
  title: string;
  description: string;
  icon: string;
  action?: string;
  link?: string;
}

const steps: TutorialStep[] = [
  {
    title: "Welcome to the Harm Reduction Dork Guide",
    description:
      "This guide helps you find harm reduction resources, research, and evidence using advanced Google search operators (dorks). Whether you're a peer worker, clinician, researcher, or advocate, we've got you covered.",
    icon: "👋",
  },
  {
    title: "Explore 700+ Pre-built Dorks",
    description:
      "Our Explorer contains over 700 ready-to-use search queries organized by topic. Filter by category, search for specific terms, and discover dorks for drug alerts, naloxone programs, policy documents, and more.",
    icon: "🔍",
    action: "Open Explorer",
    link: "/explorer",
  },
  {
    title: "Build Custom Queries",
    description:
      "The visual Dork Builder lets you create complex search queries by combining blocks. Add site filters, file types, date ranges, and keywords. Enable synonym expansion for comprehensive results.",
    icon: "🔧",
    action: "Open Builder",
    link: "/builder",
  },
  {
    title: "Quick Templates",
    description:
      "Start fast with our pre-made templates for common research tasks. Find government reports, clinical guidelines, service directories, and international best practices with one click.",
    icon: "📋",
  },
  {
    title: "Save Your Favorites",
    description:
      "Star any dork to save it to your Favorites. Your saved dorks persist across sessions and can be exported for backup. Build your personal collection of go-to searches.",
    icon: "⭐",
  },
  {
    title: "Learn the Operators",
    description:
      "Check out our Core Operators guide to understand how each search operator works. From site: to filetype: to the powerful AROUND() operator, master the syntax to find exactly what you need.",
    icon: "📚",
    action: "Read Guide",
    link: "/02-core-operators",
  },
  {
    title: "You're Ready!",
    description:
      "That's the basics! Remember: press / to search, ? for keyboard shortcuts. This guide is values-based and peer-centered. Share freely for harm reduction purposes.",
    icon: "🎉",
  },
];

const totalSteps = steps.length;
const progress = computed(() => ((currentStep.value + 1) / totalSteps) * 100);
const currentStepData = computed(() => steps[currentStep.value]);
const isFirstStep = computed(() => currentStep.value === 0);
const isLastStep = computed(() => currentStep.value === totalSteps - 1);

function nextStep() {
  if (currentStep.value < totalSteps - 1) {
    currentStep.value++;
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
}

function skipTutorial() {
  completeTutorial();
}

function completeTutorial() {
  setStorageItem(STORAGE_KEY, true);
  isVisible.value = false;
}

function startTutorial() {
  currentStep.value = 0;
  isVisible.value = true;
}

function goToStep(index: number) {
  currentStep.value = index;
}

function handleAction() {
  if (currentStepData.value.link) {
    completeTutorial();
    window.location.href = currentStepData.value.link;
  }
}

onMounted(() => {
  const completed = getStorageItemSimple<boolean>(STORAGE_KEY, false);
  if (!completed) {
    // Show tutorial after a short delay
    setTimeout(() => {
      isVisible.value = true;
    }, 1000);
  }
});

// Expose for manual triggering
defineExpose({ startTutorial });
</script>

<template>
  <Transition name="modal">
    <div v-if="isVisible" class="tutorial-overlay" @click.self="skipTutorial">
      <div class="tutorial-modal" role="dialog" aria-modal="true" aria-labelledby="tutorial-title">
        <!-- Progress bar -->
        <div class="tutorial-progress">
          <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
        </div>

        <!-- Step indicators -->
        <div class="step-indicators">
          <button
            v-for="(step, index) in steps"
            :key="index"
            :class="['step-dot', { active: index === currentStep, completed: index < currentStep }]"
            @click="goToStep(index)"
            :title="step.title"
            :aria-label="`Go to step ${index + 1}: ${step.title}`"
          ></button>
        </div>

        <!-- Content -->
        <div class="tutorial-content">
          <div class="tutorial-icon">{{ currentStepData.icon }}</div>
          <h2 id="tutorial-title" class="tutorial-title">{{ currentStepData.title }}</h2>
          <p class="tutorial-description">{{ currentStepData.description }}</p>

          <button v-if="currentStepData.action" class="action-btn" @click="handleAction">
            {{ currentStepData.action }} →
          </button>
        </div>

        <!-- Navigation -->
        <div class="tutorial-nav">
          <button v-if="!isFirstStep" class="nav-btn prev" @click="prevStep">← Previous</button>
          <button class="nav-btn skip" @click="skipTutorial">Skip Tutorial</button>
          <button v-if="!isLastStep" class="nav-btn next" @click="nextStep">Next →</button>
          <button v-else class="nav-btn finish" @click="completeTutorial">Get Started ✓</button>
        </div>

        <!-- Step counter -->
        <div class="step-counter">Step {{ currentStep + 1 }} of {{ totalSteps }}</div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.tutorial-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.tutorial-modal {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  max-width: 520px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.3);
}

.tutorial-progress {
  height: 4px;
  background: var(--bg-elevated);
}

.progress-bar {
  height: 100%;
  background: var(--accent);
  transition: width 0.3s ease;
}

.step-indicators {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 20px 20px 0;
}

.step-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid var(--border-subtle);
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}

.step-dot:hover {
  border-color: var(--accent);
}

.step-dot.active {
  border-color: var(--accent);
  background: var(--accent);
  transform: scale(1.2);
}

.step-dot.completed {
  border-color: var(--accent);
  background: var(--accent-subtle);
}

.tutorial-content {
  padding: 32px 40px;
  text-align: center;
}

.tutorial-icon {
  font-size: 64px;
  margin-bottom: 20px;
  animation: bounce 0.6s ease-out;
}

@keyframes bounce {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  60% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.tutorial-title {
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 16px;
  color: var(--text-primary);
}

.tutorial-description {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0 0 24px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  background: var(--accent-subtle);
  color: var(--accent);
  border: 1px solid var(--accent);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--accent);
  color: white;
  transform: translateY(-1px);
}

.tutorial-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  gap: 8px;
}

.nav-btn {
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 500;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-btn.prev {
  background: transparent;
  color: var(--text-secondary);
}

.nav-btn.prev:hover {
  background: var(--bg-surface);
  color: var(--text-primary);
}

.nav-btn.skip {
  background: transparent;
  color: var(--text-muted);
  margin-left: auto;
}

.nav-btn.skip:hover {
  color: var(--text-secondary);
}

.nav-btn.next {
  background: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
}

.nav-btn.next:hover {
  border-color: var(--accent-border);
}

.nav-btn.finish {
  background: var(--accent);
  color: white;
}

.nav-btn.finish:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.step-counter {
  text-align: center;
  padding: 8px;
  font-size: 11px;
  color: var(--text-muted);
  background: var(--bg-deep);
}

/* Transition */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .tutorial-modal,
.modal-leave-to .tutorial-modal {
  transform: scale(0.9) translateY(20px);
}

/* Responsive */
@media (max-width: 480px) {
  .tutorial-content {
    padding: 24px 20px;
  }

  .tutorial-icon {
    font-size: 48px;
  }

  .tutorial-title {
    font-size: 18px;
  }

  .tutorial-description {
    font-size: 14px;
  }

  .tutorial-nav {
    flex-wrap: wrap;
    gap: 8px;
  }

  .nav-btn {
    flex: 1;
    min-width: 80px;
  }

  .nav-btn.skip {
    margin-left: 0;
    order: 3;
    flex-basis: 100%;
    text-align: center;
  }
}
</style>
