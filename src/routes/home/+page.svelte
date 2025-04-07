<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Profile from '$lib/components/Profile.svelte';

  let user = { name: "John Doe", avatar: "punpun.png" };
</script>

<div class="layout">
  <!-- Sidebar with slot content -->
  <Sidebar>
    <!-- User Profile placed in the sidebar slot -->
    <div class="sidebar__profile">
      <Profile {user} />
    </div>
  </Sidebar>

  <div class="content">
    <header class="punvid__header">
      <h1 class="punvid__title">Pun<span>Vid</span></h1>

    </header>

    <!-- Main content - Info about upload page and rules -->
    <section class="punvid__info">
      <div class="punvid__info-inner">
        <h2 class="punvid__section-title">About PunVid</h2>
        
        <div class="punvid__welcome">
          <!-- Punpun reading image -->
          <div class="punvid__image-container">
            <img src="punpun-reading.png" alt="Punpun Reading" class="punvid__punpun-image">
          </div>
          
          <p class="punvid__welcome-text">
            Welcome to PunVid, where your perspective matters. 
          </p>
        </div>
        
        <div class="punvid__divider"></div>
        
        <div class="punvid__rules">
          <h3 class="punvid__rules-title">Upload Guidelines</h3>
          
          <ol class="punvid__rules-list">
            <li>
              <span class="punvid__rule-number">1.</span>
              <span class="punvid__rule-text">Videos must be in MP4, WebM, or AVI format</span>
            </li>
            <li>
              <span class="punvid__rule-number">2.</span>
              <span class="punvid__rule-text">Maximum file/video size: 5GB</span>
            </li>
            <li>
              <span class="punvid__rule-number">3.</span>
              <span class="punvid__rule-text">Videos should be between 30 seconds and 300 minutes long</span>
            </li>
            <li>
              <span class="punvid__rule-number">4.</span>
              <span class="punvid__rule-text">No explicit or harmful content</span>
            </li>
            <li>
              <span class="punvid__rule-number">5.</span>
              <span class="punvid__rule-text">For increasing the storage space contact Crefi</span>
            </li>
          </ol>
        </div>
        
        <div class="punvid__divider"></div>
      </div>
    </section>
    
    <!-- Flying Punpun animation -->
    <div class="flying-punpun-container">
      <img src="punpun-fly.png" alt="Flying Punpun" class="flying-punpun">
    </div>
    
    <footer class="punvid__footer">
      <p class="punvid__footer-text">©Crefi 2025</p>
    </footer>
  </div>
</div>

<style lang="scss">
@use '../styles/global.scss' as global;

  // Flying Punpun Animation
  .flying-punpun-container {
    position: fixed;
    pointer-events: none;
    z-index: 999;
  }
  
  .flying-punpun {
    width: 150px;
    height: auto;
    position: absolute;
    animation: flyAcross 15s linear infinite;
  }
  
  @keyframes flyAcross {
    0% {
      left: -100px;
      top: 20vh;
      transform: rotate(0deg);
    }
    25% {
      left: 30vw;
      top: 15vh;
      transform: rotate(10deg);
    }
    50% {
      left: 50vw;
      top: 25vh;
      transform: rotate(-5deg);
    }
    75% {
      left: 75vw;
      top: 35vh;
      transform: rotate(15deg);
    }
    100% {
      left: 100vw;
      top: 20vh;
      transform: rotate(0deg);
    }
  }

  // Info section
  .punvid {
    &__info {
      position: relative;
      animation: slideUp 0.8s ease-out;
    }
    
    &__info-inner {
      @include global.card-style;
      padding: 2rem;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
      }
    }
    
    &__section-title {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      text-align: center;
      color: var(--text-primary);
      font-weight: normal;
      letter-spacing: 1px;
    }
    
    &__welcome {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 2rem;
      
      @media (max-width: 600px) {
        flex-direction: column;
        text-align: center;
      }
    }
    
    &__image-container {
      max-width: 200px;
      flex-shrink: 0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    &__punpun-image {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.3s ease;
      
      &:hover {
        transform: scale(1.05);
      }
    }
    
    &__welcome-text {
      flex: 1;
      font-size: 1.1rem;
      line-height: 1.6;
      color: var(--text-secondary);
    }
    
    &__divider {
      width: 100%;
      height: 1px;
      background: var(--border-light);
      margin: 2rem 0;
      position: relative;
      
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
    }
    
    &__rules {
      margin-bottom: 2rem;
    }
    
    &__rules-title {
      font-size: 1.2rem;
      color: var(--text-primary);
      margin-bottom: 1.5rem;
      position: relative;
      display: inline-block;
      padding-bottom: 5px;
      
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
      }
    }
    
    &__rules-list {
      padding-left: 1.5rem;
      margin: 0;
      counter-reset: rule-counter;
      
      li {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
        transition: transform 0.3s ease;
        
        &:hover {
          transform: translateX(5px);
        }
      }
    }
    
    &__rule-number {
      font-weight: bold;
      color: var(--primary-color);
      font-size: 1.1rem;
    }
    
    &__rule-text {
      font-size: 1rem;
      color: var(--text-secondary);
    }
  }
  
  // Media queries
  @media (max-width: 768px) {
    .punvid {
      &__title {
        font-size: 3rem;
      }
      
      &__info-inner {
        padding: 1.5rem;
      }
      
      &__image-container {
        max-width: 150px;
        margin: 0 auto;
      }
    }
    
    .content {
      padding: 1rem;
    }
    
    .flying-punpun {
      width: 70px;
    }
    
  }
</style>