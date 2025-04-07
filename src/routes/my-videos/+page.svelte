<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Profile from '$lib/components/Profile.svelte';

  let user = { name: "John Doe", avatar: "punpun.png" };
  let messages = ["Welcome to PunVid!", "2 new views on your latest video!"];

  // Hardcoded videos data with removed likes field
  let videos = [
    {
      id: 1,
      title: "The worst pun I've ever made",
      thumbnail: "thumbnail1.jpg",
      duration: "2:34",
      date: "2025-03-28"
    },
    {
      id: 2,
      title: "Dad jokes compilation volume 3",
      thumbnail: "thumbnail2.jpg",
      duration: "5:12",
      date: "2025-03-12"
    },
    {
      id: 3,
      title: "Pun battle with my sister (She won)",
      thumbnail: "thumbnail3.jpg",
      duration: "8:45",
      date: "2025-02-25"
    },
    {
      id: 4,
      title: "How many puns can I make in 60 seconds",
      thumbnail: "thumbnail4.jpg",
      duration: "1:17",
      date: "2025-02-10"
    }
  ];

  // View modes
  let viewModes = ["grid", "list", "compact"];
  let currentViewMode = "grid";

  // Search functionality
  let searchQuery = "";

  function setViewMode(mode: string) {
    currentViewMode = mode;
  }

  function handleSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    searchQuery = input.value;
    // In a real app, you would filter videos based on searchQuery
  }

  // Sort options
  let sortOptions = ["Date (Newest)", "Date (Oldest)"];
  let currentSort = "Date (Newest)";

  function handleSortChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    currentSort = select.value;
    // In a real app, you would sort videos based on the selected option
  }
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
      <h1 class="punvid__title">My <span>Videos</span></h1>
      <p class="punvid__tagline">Your collection ...</p>
    </header>

    <!-- Search and Controls Bar -->
    <section class="punvid__controls">
      <div class="punvid__controls-container">
        <div class="punvid__search">
          <div class="punvid__search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input 
            type="text" 
            class="punvid__search-input" 
            placeholder="Search your videos..." 
            value={searchQuery}
            on:input={handleSearch}
          />
        </div>

        <div class="punvid__view-controls">
          <div class="punvid__sort">
            <select on:change={handleSortChange} class="punvid__sort-select">
              {#each sortOptions as option}
                <option value={option} selected={currentSort === option}>{option}</option>
              {/each}
            </select>
          </div>

          <div class="punvid__view-modes">
            <!-- Grid View Button -->
            <button 
              class="punvid__view-btn" 
              class:punvid__view-btn--active={currentViewMode === "grid"}
              on:click={() => setViewMode("grid")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            
            <!-- List View Button -->
            <button 
              class="punvid__view-btn" 
              class:punvid__view-btn--active={currentViewMode === "list"}
              on:click={() => setViewMode("list")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
            
            <!-- Compact View Button -->
            <button 
              class="punvid__view-btn" 
              class:punvid__view-btn--active={currentViewMode === "compact"}
              on:click={() => setViewMode("compact")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Videos Section - Grid View -->
    {#if currentViewMode === "grid"}
      <section class="punvid__videos punvid__videos--grid">
        {#each videos as video}
          <div class="punvid__video-card">
            <div class="punvid__thumbnail-container">
              <div class="punvid__thumbnail">
                <div class="punvid__thumbnail-placeholder"></div>
                <span class="punvid__duration">{video.duration}</span>
              </div>
            </div>
            <div class="punvid__video-info">
              <h3 class="punvid__video-title">{video.title}</h3>
              <div class="punvid__video-meta">
                <span class="punvid__video-date">{new Date(video.date).toLocaleDateString()}</span>
                <div class="punvid__video-actions">
                  <button class="punvid__action-btn" aria-label="Edit video">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                  </button>
                  <button class="punvid__action-btn" aria-label="Delete video">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </section>
    {/if}

    <!-- Videos Section - List View -->
    {#if currentViewMode === "list"}
      <section class="punvid__videos punvid__videos--list">
        {#each videos as video}
          <div class="punvid__video-row">
            <div class="punvid__row-thumbnail">
              <div class="punvid__thumbnail-placeholder"></div>
              <span class="punvid__duration">{video.duration}</span>
            </div>
            <div class="punvid__row-info">
              <h3 class="punvid__video-title">{video.title}</h3>
              <div class="punvid__row-meta">
                <span class="punvid__video-date">{new Date(video.date).toLocaleDateString()}</span>
              </div>
            </div>
            <div class="punvid__row-actions">
              <button class="punvid__action-btn" aria-label="Edit video">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </button>
              <button class="punvid__action-btn" aria-label="Delete video">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        {/each}
      </section>
    {/if}

    <!-- Videos Section - Compact View -->
    {#if currentViewMode === "compact"}
      <section class="punvid__videos punvid__videos--compact">
        <table class="punvid__video-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each videos as video}
              <tr class="punvid__video-table-row">
                <td class="punvid__table-title">{video.title}</td>
                <td>{video.duration}</td>
                <td>{new Date(video.date).toLocaleDateString()}</td>
                <td class="punvid__table-actions">
                  <button class="punvid__action-btn--small" aria-label="Edit video">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                  </button>
                  <button class="punvid__action-btn--small" aria-label="Delete video">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </section>
    {/if}

    <!-- Empty state (shown if no videos) -->
    {#if videos.length === 0}
      <section class="punvid__empty">
        <div class="punvid__empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
          </svg>
        </div>
        <h3 class="punvid__empty-title">No videos yet</h3>
        <p class="punvid__empty-text">Your uploaded videos will appear here</p>
        <a href="/" class="punvid__empty-action">Upload your first video</a>
      </section>
    {/if}

    <footer class="punvid__footer">
      <p class="punvid__footer-text">©Crefi 2025</p>
    </footer>
  </div>
</div>

<style lang="scss">
@use '../styles/global.scss' as global;
@use "sass:color"; // For color functions like `color.adjust`

  // Variables
  $primary-color: #FF6B6B;
  $accent-color: #4ECDC4;

  // Animation keyframes
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }

  // Sidebar Profile styles
  .sidebar__profile {
    padding: 1rem 0;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--border-light);
  }

  // Header styles
  .punvid {
    &__header {
      text-align: center;
      margin-bottom: 1rem;
      animation: fadeIn 1s ease-out;
    }
    
    &__title {
      font-family: 'VT323', monospace;
      font-size: 4rem;
      font-weight: normal;
      letter-spacing: 3px;
      margin: 0;
      padding: 0;
      position: relative;
      text-shadow: 4px 4px 0px rgba(0, 0, 0, 0.7);
      color: var(--text-primary);
      
      span {
        color: var(--primary-color);
      }
      
      &::after {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 120px;
        height: 3px;
      }
    }
    
    &__tagline {
      font-size: 1rem;
      color: var(--text-secondary);
      font-style: italic;
      margin-top: 1.5rem;
      letter-spacing: 1px;
    }
  }

  // Search and Controls Bar
  .punvid {
    &__controls {
      @include global.card-style;
      padding: 1rem;
      margin-bottom: 1rem;
      animation: slideUp 0.6s ease-out;
    }
    
    &__controls-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      
      @media (max-width: 768px) {
        flex-direction: column;
        gap: 1rem;
      }
    }
    
    &__search {
      position: relative;
      flex: 1;
      max-width: 400px;
      
      @media (max-width: 768px) {
        width: 100%;
        max-width: 100%;
      }
    }
    
    &__search-icon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-tertiary);
    }
    
    &__search-input {
      width: 100%;
      padding: 0.5rem 1rem 0.5rem 2.5rem;
      border-radius: 4px;
      border: 1px solid var(--border-light);
      background: var(--background-dark);
      color: var(--text-primary);
      font-family: 'Space Mono', monospace;
      
      &:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px rgba($primary-color, 0.2);
      }
      
      &::placeholder {
        color: var(--text-tertiary);
      }
    }
    
    &__view-controls {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-shrink: 0;
      
      @media (max-width: 768px) {
        width: 100%;
        justify-content: space-between;
      }
    }
    
    &__sort {
      position: relative;
      
      &::after {
        content: "▼";
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 10px;
        color: var(--text-tertiary);
        pointer-events: none;
      }
    }
    
    &__sort-select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      padding: 0.5rem 2rem 0.5rem 1rem;
      border-radius: 4px;
      border: 1px solid var(--border-light);
      background: var(--background-dark);
      color: var(--text-secondary);
      font-family: 'Space Mono', monospace;
      font-size: 0.8rem;
      cursor: pointer;
      
      &:focus {
        outline: none;
        border-color: var(--primary-color);
      }
    }
    
    &__view-modes {
      display: flex;
      gap: 0.5rem;
    }
    
    &__view-btn {
      background: none;
      border: 1px solid var(--border-light);
      border-radius: 4px;
      padding: 0.5rem;
      color: var(--text-tertiary);
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        color: var(--text-secondary);
        border-color: var(--text-secondary);
      }
      
      &--active {
        background: rgba($primary-color, 0.2);
        color: var(--primary-color);
        border-color: var(--primary-color);
      }
    }
  }

  // Videos - Grid View
  .punvid {
    &__videos {
      animation: fadeIn 0.8s ease-out;
    }
    
    &__videos--grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    
    &__video-card {
      @include global.card-style;
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
        
        .punvid__thumbnail::after {
          opacity: 0.3;
        }
      }
    }
    
    &__thumbnail-container {
      position: relative;
      width: 100%;
      padding-top: 56.25%; // 16:9 aspect ratio
    }
    
    &__thumbnail {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, $primary-color 0%, $accent-color 100%);
        opacity: 0.2;
        transition: opacity 0.3s ease;
      }
    }
    
    &__thumbnail-placeholder {
      width: 100%;
      height: 100%;
      background: #1a1a1a;
      position: relative;
      
      &::before {
        content: "▶";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: rgba(255, 255, 255, 0.2);
        font-size: 2rem;
      }
    }
    
    &__duration {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.7);
      padding: 0.2rem 0.5rem;
      border-radius: 3px;
      font-size: 0.75rem;
      color: var(--text-primary);
      z-index: 1;
    }
    
    &__video-info {
      padding: 1rem;
    }
    
    &__video-title {
      font-size: 1rem;
      margin: 0 0 0.5rem 0;
      color: var(--text-primary);
      font-weight: normal;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    &__video-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8rem;
      color: var(--text-tertiary);
    }
    
    &__video-date {
      color: var(--text-tertiary);
    }
    
    &__video-actions {
      display: flex;
      gap: 0.5rem;
    }
    
    &__action-btn {
      background: none;
      border: none;
      padding: 5px;
      color: var(--text-tertiary);
      cursor: pointer;
      transition: color 0.2s ease;
      
      &:hover {
        color: var(--text-primary);
      }
    }
  }

  // Videos - List View
  .punvid {
    &__videos--list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    &__video-row {
      @include global.card-style;
      display: flex;
      align-items: center;
      padding: 1rem;
      gap: 1rem;
      
      &:hover {
        transform: translateX(5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
        border-left: 3px solid var(--primary-color);
      }
      
      @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
      }
    }
    
    &__row-thumbnail {
      position: relative;
      width: 160px;
      height: 90px;
      flex-shrink: 0;
      overflow: hidden;
      border-radius: 4px;
      
      @media (max-width: 768px) {
        width: 100%;
        height: 160px;
      }
    }
    
    &__row-info {
      flex: 1;
      min-width: 0; // Fix for text overflow
    }
    
    &__row-meta {
      display: flex;
      color: var(--text-tertiary);
      font-size: 0.8rem;
      
      @media (max-width: 768px) {
        flex-wrap: wrap;
        gap: 0.5rem;
      }
    }
    
    &__row-actions {
      display: flex;
      gap: 0.5rem;
      margin-left: auto;
      
      @media (max-width: 768px) {
        margin-left: 0;
        margin-top: 0.5rem;
      }
    }
  }

  // Videos - Compact View
  .punvid {
    &__video-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
      
      th {
        text-align: left;
        padding: 0.75rem 1rem;
        color: var(--text-secondary);
        font-weight: normal;
        border-bottom: 1px solid var(--border-light);
      }
      
      td {
        padding: 0.75rem 1rem;
        color: var(--text-tertiary);
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }
    }
    
    &__video-table-row {
      transition: background 0.3s ease;
      
      &:hover {
        background: rgba(255, 255, 255, 0.05);
        
        .punvid__table-title {
          color: var(--primary-color);
        }
      }
    }
    
    &__table-title {
      color: var(--text-primary);
      transition: color 0.3s ease;
      font-weight: 500;
      max-width: 300px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    &__table-actions {
      display: flex;
      gap: 0.5rem;
    }
    
    &__action-btn--small {
      background: none;
      border: none;
      color: var(--text-tertiary);
      cursor: pointer;
      padding: 3px;
      
      &:hover {
        color: var(--text-primary);
      }
    }
  }

  // Empty state
  .punvid {
    &__empty {
      @include global.card-style;
      padding: 3rem 2rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      animation: fadeIn 1s ease-out;
    }
    
    &__empty-icon {
      color: rgba(255, 255, 255, 0.15);
      margin-bottom: 1.5rem;
    }
    
    &__empty-title {
      color: var(--text-primary);
      margin: 0 0 0.5rem 0;
      font-size: 1.5rem;
      font-weight: normal;
    }
    
    &__empty-text {
      color: var(--text-tertiary);
      margin: 0 0 1.5rem 0;
    }
    
    &__empty-action {
      background: var(--primary-color);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      text-decoration: none;
      font-size: 0.9rem;
      transition: background 0.2s ease;
      
      &:hover {
        background: color.adjust($primary-color, $lightness: -10%);
      }
    }
  }
  
  // Footer
  .punvid {
    &__footer {
      text-align: center;
      margin-top: 1rem;
      position: relative;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-light);
    }
    
    &__footer-text {
      font-size: 0.85rem;
      color: var(--text-tertiary);
      font-style: italic;
    }
  }
  
  // Media queries
  @media (max-width: 768px) {
    .punvid {
      &__title {
        font-size: 3rem;
      }
      
      &__videos--compact {
        padding: 0.5rem;
      }
    }
    
    
    .content {
      padding: 1rem;
    }
  }
</style>