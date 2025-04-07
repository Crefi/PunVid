<script lang="ts">


  export let pages: { name: string; path: string }[] = [
    { name: "Home", path: "/home" },
    { name: "Upload", path: "/upload" },
    { name: "My Videos", path: "/my-videos" },
    { name: "My Files", path: "/my-files" },
    { name: "My Profile", path: "/my-profile" }
  ];

  import { page } from '$app/state';
  import { onMount } from 'svelte';
  
  // Get current path for highlighting active link
  $: currentPath = page?.url?.pathname;
  
  // Sidebar state
  let sidebarOpen = true;
  let isMobile = false;
  
  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }
  
  function checkMobile() {
    const newIsMobile = window.innerWidth < 768;
    if (newIsMobile !== isMobile) {
      isMobile = newIsMobile;
      if (isMobile) {
        sidebarOpen = false;
      } else {
        sidebarOpen = true;
      }
    }
  }
  
  // Theme switching functionality
  let currentTheme = "default"; 
  const themes = [
    { id: "default", name: "Punpun", color: "#3A86FF", icon: "🌙" },
    { id: "theme-aiko", name: "Aiko", color: "#FF9E9E", icon: "🌸" },
    { id: "theme-god", name: "God", color: "#FF5252", icon: "🌟" }
  ];
  
  function setTheme(themeId: string) {
  console.log(`Switching to theme: ${themeId}`);  // Debug line
  document.documentElement.classList.remove('default', 'theme-aiko', 'theme-god');
  document.documentElement.classList.add(themeId);
  localStorage.setItem('punvid-theme', themeId);
  currentTheme = themeId;
}

  
  // Load theme from localStorage on mount
  onMount(() => {
    const savedTheme = localStorage.getItem('punvid-theme');
    console.log(savedTheme);  // Debug line
    if (savedTheme) {
      setTheme(savedTheme);
    }
    
    // Initial check for mobile
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  });
</script>

<!-- Main layout wrapper -->
<div class="layout-wrapper">
  <!-- Sidebar -->
  <aside class="sidebar" class:sidebar--open={sidebarOpen} class:sidebar--mobile={isMobile}>
    <!-- Logo -->
    <div class="sidebar__logo">
      <h2 class="punvid__title"><span>Pun</span>Vid</h2>
    </div>
    
    <!-- Scrollable content area -->
    <div class="sidebar__scrollable">

      <!-- Navigation Menu -->
      <nav class="sidebar__nav">
        <ul class="sidebar__menu">
          {#each pages as page}
            <li class="sidebar__menu-item">
              <a 
                href={page.path} 
                class="sidebar__menu-link" 
                class:sidebar__menu-link--active={currentPath === page.path}
                aria-current={currentPath === page.path ? 'page' : undefined}
              >
                <span class="sidebar__menu-text">{page.name}</span>
              </a>
            </li>
          {/each}
        </ul>
      </nav>
      
      <!-- Slot for additional content -->
      {#if !isMobile || (isMobile && sidebarOpen)}
        <div class="sidebar__content">
          <slot></slot>
        </div>
      {/if}
    </div>
    
    <!-- Theme Switcher (footer) -->
    <div class="sidebar__footer">
      <div class="sidebar__theme-switcher">
        <div class="sidebar__theme-header">
          <span class="sidebar__theme-icon">◑</span>
          <span class="sidebar__theme-title">Theme</span>
        </div>
        
        <div class="sidebar__theme-row">
          {#each themes as theme}
            <button 
              class="sidebar__theme-item" 
              class:sidebar__theme-item--active={currentTheme === theme.id}
              on:click={() => setTheme(theme.id)}
              aria-label={`Switch to ${theme.name} theme`}
            >
              <div class="theme-item__color" style={`background-color: ${theme.color}`}>
                <div class="theme-item__icon">{theme.icon}</div>
              </div>
              <div class="theme-item__name">{theme.name}</div>
            </button>
          {/each}
        </div>
      </div>
    </div>
  </aside>

  <!-- Toggle Button  -->
  <button 
    class="sidebar__toggle" 
    class:sidebar__toggle--collapsed={!sidebarOpen}
    on:click={toggleSidebar} 
    aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
    aria-expanded={sidebarOpen}
  >
    <span class="sidebar__toggle-icon">
      {#if sidebarOpen}
        &#9664;   <!-- ◀ Left arrow  -->
      {:else}
        &#9654; <!--▶ Right arrow -->
      {/if}
    </span>
  </button>


  {#if isMobile && sidebarOpen}
  <div
    class="sidebar-overlay"
    role="button"
    tabindex="0"
    on:click={toggleSidebar}
    on:keydown={(e) => {
      if (e.key === "Enter" || e.key === " ") toggleSidebar();
    }}
    aria-label="Close sidebar overlay"
  ></div>
{/if}

  
  <!-- Mobile toggle button for closed state -->
  {#if isMobile && !sidebarOpen}
    <button 
      class="sidebar__mobile-toggle" 
      on:click={toggleSidebar} 
      aria-label="Open sidebar"
    >
      <span class="sidebar__toggle-icon">&#9654;</span>
    </button>
  {/if}
</div>

<style lang="scss">

  /* Sidebar styles */
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 240px; 
    background-color: var(--background-card);
    border-right: 1px solid var(--border-light);
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Mobile styles */
    &--mobile {
      transform: translateX(-100%);
      
      &.sidebar--open {
        transform: translateX(0);
      }
    }
    
    /* Desktop collapsed state */
    @media (min-width: 768px) {
      &:not(.sidebar--open) {
        transform: translateX(-240px);
        
        .sidebar__logo h2 span,
        .sidebar__menu-text,
        .sidebar__theme-title,
        .sidebar__theme-row,
        .sidebar__content {
          opacity: 0;
          visibility: hidden;
        }
        
        .sidebar__theme-header {
          justify-content: center;
        }
        
        .sidebar__theme-icon {
          margin-right: 0;
        }
      }
    }
  }
  
  /* Scrollable area */
  .sidebar__scrollable {
    flex: 1;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--primary-color) transparent;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: var(--primary-color);
      border-radius: 20px;
    }
  }
  
  /* Overlay for mobile */
  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    backdrop-filter: blur(2px);
    transition: opacity 0.3s ease;
  }
  
  /* Logo styles */
  .sidebar__logo {
    padding: 1.25rem;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: center;
    min-height: 60px;
  }

  /* Toggle button - */
  .sidebar__toggle {
    position: fixed;
    top: 20px;
    left: 20px;
    width: 32px;
    height: 32px;
    background-color: var(--background-highlight);
    color: var(--text-primary);
    border: 1px solid var(--border-light);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1010;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: var(--primary-color);
      transform: scale(1.1);
    }
    
    /* Position when sidebar is open */
    @media (min-width: 768px) {
      left: 210px; 
      
      &--collapsed {
        left: 20px; 
      }
    }
  }
  
  /* Mobile toggle for when sidebar is closed */
  .sidebar__mobile-toggle {
    position: fixed;
    top: 20px;
    left: 15px;
    width: 30px;
    height: 30px;
    background-color: var(--background-card);
    color: var(--text-primary);
    border: 1px solid var(--border-light);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1010;
    transition: all 0.3s ease;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    
    &:hover {
      background-color: var(--primary-color);
      transform: scale(1.1);
    }
  }
  
  .sidebar__toggle-icon {
    font-size: 12px;
    line-height: 1;
  }
  
  /* Navigation styles  */
  .sidebar__nav {
    padding: 0 0.5rem;
  }
  
  .sidebar__menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .sidebar__menu-item {
    margin-bottom: 4px;
  }
  
  .sidebar__menu-link {
    display: flex;
    align-items: center;
    padding: 0.75rem 1.25rem;
    color: var(--text-secondary);
    text-decoration: none;
    transition: all 0.25s ease;
    border-left: 3px solid transparent;
    font-size: 0.9rem;
    border-radius: 0 8px 8px 0;
    white-space: nowrap;
    
    &:hover {
      color: var(--text-primary);
      background-color: var(--background-highlight);
      border-left-color: var(--accent-color);
      transform: translateX(4px);
    }
    
    &--active {
      color: var(--text-primary);
      background-color: var(--background-highlight);
      border-left-color: var(--primary-color);
      font-weight: 600;
    }
    

  }
  
  /* Footer with theme switcher */
  .sidebar__footer {
    padding: 0.75rem;
    border-top: 1px solid var(--border-light);
    background-color: var(--background-card);
    margin-top: auto; /* Push to bottom */
  }
  
  /*  Theme switcher styles */
  .sidebar__theme-switcher {
    padding: 0.5rem;
  }
  
  .sidebar__theme-header {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    transition: all 0.3s ease;
  }
  
  .sidebar__theme-icon {
    font-size: 1rem;
    margin-right: 8px;
    color: var(--primary-color);
    transition: margin 0.3s ease;
  }
  
  .sidebar__theme-title {
    transition: opacity 0.2s ease, visibility 0.2s ease;
    font-weight: 500;
    font-size: 0.9rem;
  }
  
  /* Horizontal theme row */
  .sidebar__theme-row {
    display: flex;
    gap: 8px;
    transition: opacity 0.2s ease, visibility 0.2s ease;
  }
  
  .sidebar__theme-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 6px 4px;
    border-radius: 8px;
    cursor: pointer;
    background-color: var(--background-highlight);
    border: 1px solid var(--border-light);
    transition: all 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    &--active {
      border-color: var(--primary-color);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    }
  }
  
  .theme-item__color {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .theme-item__icon {
    font-size: 14px;
  }
  
  .theme-item__name {
    font-size: 0.7rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    color: var(--primary-color);
  }
  
  /* Content slot styles */
  .sidebar__content {
    padding: 0.75rem 1rem;
    margin-top: 0.5rem;
    border-top: 1px solid var(--border-light);
    transition: opacity 0.2s ease, visibility 0.2s ease;
  }
</style>