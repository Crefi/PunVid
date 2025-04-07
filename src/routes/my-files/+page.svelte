<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Profile from '$lib/components/Profile.svelte';

  let user = { name: "John Doe", avatar: "punpun.png" };
  let messages = ["2 new files ready for use!", "Storage: 65% used"];

  // Hardcoded files data
  let files = [
    {
      id: 1,
      name: "pun_script_final.txt",
      type: "Text",
      icon: "text",
      size: "24KB",
      dateModified: "2025-03-29",
      used: true
    },
    {
      id: 2,
      name: "dad_jokes_list.doc",
      type: "Document",
      icon: "document",
      size: "156KB",
      dateModified: "2025-03-25",
      used: true
    },
    {
      id: 3,
      name: "background_comedy.png",
      type: "Image",
      icon: "image",
      size: "1.2MB",
      dateModified: "2025-03-15",
      used: false
    },
    {
      id: 4,
      name: "laugh_track.mp3",
      type: "Audio",
      icon: "audio",
      size: "4.8MB",
      dateModified: "2025-03-10",
      used: true
    },
    {
      id: 5,
      name: "intro_music.mp3",
      type: "Audio",
      icon: "audio",
      size: "3.5MB",
      dateModified: "2025-02-28",
      used: true
    },
    {
      id: 6,
      name: "channel_banner.jpg",
      type: "Image",
      icon: "image",
      size: "2.1MB",
      dateModified: "2025-02-20",
      used: false
    }
  ];

  // View modes - removed list view
  let viewModes = ["grid", "compact"];
  let currentViewMode = "grid";

  // Search functionality
  let searchQuery = "";

  function setViewMode(mode: string) {
    currentViewMode = mode;
  }

  function handleSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    searchQuery = input.value;
    // In a real app, you would filter files based on searchQuery
  }

  // Sort options
  let sortOptions = ["Date (Newest)", "Date (Oldest)", "Size (Large to Small)", "Name (A-Z)"];
  let currentSort = "Date (Newest)";

  function handleSortChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    currentSort = select.value;
    // In a real app, you would sort files based on the selected option
  }

  // File type filter options
  let fileTypeOptions = ["All Types", "Documents", "Images", "Audio", "Video"];
  let currentFileType = "All Types";

  function handleFileTypeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    currentFileType = select.value;
    // In a real app, you would filter files based on the selected file type
  }

  // Function to get icon based on file type
  function getFileIcon(type: string) {
    switch(type) {
      case "Text":
      case "Document":
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>`;
      case "Image":
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>`;
      case "Audio":
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>`;
      default:
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="13 2 13 9 20 9"></polyline>
                </svg>`;
    }
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
      <h1 class="punvid__title">My <span>Files</span></h1>
      <p class="punvid__tagline">All your Files...</p>
    </header>

    <!-- Improved Search and Controls Bar -->
    <section class="punvid__controls">
      <div class="punvid__controls-row">
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
            placeholder="Search your files..." 
            value={searchQuery}
            on:input={handleSearch}
          />
        </div>
      </div>

      <div class="punvid__controls-row">
        <div class="punvid__filters">
          <div class="punvid__file-type">
            <select on:change={handleFileTypeChange} class="punvid__file-type-select">
              {#each fileTypeOptions as option}
                <option value={option} selected={currentFileType === option}>{option}</option>
              {/each}
            </select>
          </div>
          
          <div class="punvid__sort">
            <select on:change={handleSortChange} class="punvid__sort-select">
              {#each sortOptions as option}
                <option value={option} selected={currentSort === option}>{option}</option>
              {/each}
            </select>
          </div>
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
    </section>

    <!-- Files Section - Grid View (Improved) -->
    {#if currentViewMode === "grid"}
      <section class="punvid__files punvid__files--grid">
        {#each files as file}
          <div class="punvid__file-card">
            <div class="punvid__file-icon" class:punvid__file-icon--used={file.used}>
              {@html getFileIcon(file.type)}
            </div>
            <div class="punvid__file-info">
              <h3 class="punvid__file-name">{file.name}</h3>
              <div class="punvid__file-meta">
                <span class="punvid__file-type">{file.type}</span>
                <span class="punvid__file-size">{file.size}</span>
              </div>
              <div class="punvid__file-date">
                Modified on {new Date(file.dateModified).toLocaleDateString()}
              </div>
              <div class="punvid__file-actions">
                <button class="punvid__action-btn" title="Download">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
                <button class="punvid__action-btn" title="Edit">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </button>
                <button class="punvid__action-btn" title="Delete">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        {/each}
      </section>
    {/if}

    <!-- Files Section - Improved Compact View -->
    {#if currentViewMode === "compact"}
      <section class="punvid__files punvid__files--compact">
        <div class="punvid__table-container">
          <table class="punvid__file-table">
            <thead>
              <tr>
                <th class="punvid__th-name">Name</th>
                <th class="punvid__th-type">Type</th>
                <th class="punvid__th-size">Size</th>
                <th class="punvid__th-date">Modified</th>
                <th class="punvid__th-status">Status</th>
                <th class="punvid__th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each files as file}
                <tr class="punvid__file-table-row">
                  <td class="punvid__table-name">
                    <div class="punvid__table-name-with-icon">
                      <span class="punvid__table-icon" class:punvid__table-icon--used={file.used}>
                        {@html getFileIcon(file.type)}
                      </span>
                      <span class="punvid__table-filename">{file.name}</span>
                    </div>
                  </td>
                  <td class="punvid__table-type">{file.type}</td>
                  <td class="punvid__table-size">{file.size}</td>
                  <td class="punvid__table-date">{new Date(file.dateModified).toLocaleDateString()}</td>
                  <td class="punvid__table-status">
                    {#if file.used}
                      <span class="punvid__file-status--used">Used</span>
                    {:else}
                      <span class="punvid__file-status--unused">Unused</span>
                    {/if}
                  </td>
                  <td class="punvid__table-actions">
                    <div class="punvid__action-group">
                      <button class="punvid__action-btn--small" title="Download">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                      </button>
                      <button class="punvid__action-btn--small" title="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                      </button>
                      <button class="punvid__action-btn--small" title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </section>
    {/if}

    <!-- Empty state (shown if no files) -->
    {#if files.length === 0}
      <section class="punvid__empty">
        <div class="punvid__empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="13 2 13 9 20 9"></polyline>
          </svg>
        </div>
        <h3 class="punvid__empty-title">No files yet</h3>
        <p class="punvid__empty-text">Your uploaded files will appear here</p>
        <a href="/" class="punvid__empty-action">Upload your first file</a>
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

  $primary-color: #FF6B6B;

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

  // Improved Search and Controls Bar
  .punvid {
    &__controls {
      @include global.card-style;
      display: flex;
      flex-direction: column;
      padding: 1rem;
      margin-bottom: 1rem;
      animation: slideUp 0.6s ease-out;
    }

    &__controls-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      
      &:not(:last-child) {
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border-light);
      }
      
      @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
      }
    }
    
    &__search {
      position: relative;
      width: 100%;
    }
    
    &__search-icon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-tertiary);
      pointer-events: none;
    }
    
    &__search-input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border-radius: 4px;
      border: 1px solid var(--border-light);
      background: rgba(0, 0, 0, 0.3);
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

    &__filters {
      display: flex;
      gap: 1rem;
      
      @media (max-width: 768px) {
        width: 100%;
        justify-content: space-between;
      }
    }
    
    &__file-type, &__sort {
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
      
      @media (max-width: 768px) {
        flex: 1;
      }
    }
    
    &__file-type-select, &__sort-select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: 100%;
      padding: 0.75rem 2rem 0.75rem 1rem;
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
      
      @media (max-width: 768px) {
        margin-top: 1rem;
        justify-content: flex-end;
      }
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

  // Files - Grid View (improved)
  .punvid {
    &__files {
      animation: fadeIn 0.8s ease-out;
    }
    
    &__files--grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
      
      @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
      }
    }
    
    &__file-card {
      @include global.card-style;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      overflow: hidden;
      height: 100%;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
      }
    }
    
    &__file-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: rgba(0, 0, 0, 0.2);
      color: rgba(255, 255, 255, 0.7);
      position: relative;
      
      &--used::after {
        content: "";
        position: absolute;
        top: 10px;
        right: 10px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: var(--success-color, #4CAF50);
      }
    }
    
    &__file-info {
      padding: 1.25rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    &__file-name {
      margin: 0 0 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      word-break: break-word;
    }
    
    &__file-meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
      color: var(--text-secondary);
      font-size: 0.85rem;
    }
    
    &__file-date {
      color: var(--text-tertiary);
      font-size: 0.8rem;
      margin-bottom: 1rem;
    }
    
    &__file-actions {
      margin-top: auto;
      display: flex;
      gap: 0.5rem;
    }
    
    &__action-btn {
      background: none;
      border: 1px solid var(--border-light);
      border-radius: 4px;
      padding: 0.5rem;
      color: var(--text-tertiary);
      cursor: pointer;
      transition: all 0.2s ease;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        color: var(--text-secondary);
        border-color: var(--text-secondary);
        background-color: rgba(255, 255, 255, 0.05);
      }
    }
  }
  
  // Improved Compact View
  .punvid {
    &__files--compact {
      @include global.card-style;
      padding: 0; // Remove padding as table will take care of spacing
      overflow: hidden; // Hide overflow for rounded corners
    }
    
    &__table-container {
      width: 100%;
      overflow-x: auto; // Allow horizontal scrolling on small screens
    }
    
    &__file-table {
      width: 100%;
      border-collapse: collapse;
      
      th, td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid var(--border-light);
        
        @media (max-width: 768px) {
          padding: 0.75rem;
        }
      }
      
      th {
        background-color: rgba(0, 0, 0, 0.2);
        font-weight: 600;
        color: var(--text-secondary);
        font-size: 0.85rem;
        white-space: nowrap;
      }
      
      tr:last-child td {
        border-bottom: none;
      }
      
      tr:hover {
        background-color: rgba(255, 255, 255, 0.03);
      }
    }
    
    &__table-name-with-icon {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    &__table-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      
      &--used::after {
        content: "";
        position: absolute;
        top: -2px;
        right: -2px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--success-color, #4CAF50);
      }
    }
    
    &__table-filename {
      font-weight: 500;
      color: var(--text-primary);
    }
    
    &__th-type, &__th-size, &__th-status {
      @media (max-width: 768px) {
        display: none;
      }
    }
    
    &__table-type, &__table-size, &__table-status {
      color: var(--text-secondary);
      font-size: 0.85rem;
      
      @media (max-width: 768px) {
        display: none;
      }
    }
    
    &__table-date {
      color: var(--text-tertiary);
      font-size: 0.85rem;
      white-space: nowrap;
    }
    
    &__file-status {
      &--used {
        display: inline-block;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        background-color: rgba(76, 175, 80, 0.2);
        color: #4CAF50;
        font-size: 0.8rem;
      }
      
      &--unused {
        display: inline-block;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        background-color: rgba(158, 158, 158, 0.2);
        color: #9E9E9E;
        font-size: 0.8rem;
      }
    }
    
    &__action-group {
    display: flex;
    gap: 0.5rem;
  }
  
  &__action-btn--small {
    background: none;
    border: 1px solid var(--border-light);
    border-radius: 4px;
    padding: 0.25rem;
    color: var(--text-tertiary);
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      color: var(--text-secondary);
      border-color: var(--text-secondary);
      background-color: rgba(255, 255, 255, 0.05);
    }
  }
}

// Empty state styling
.punvid {
  &__empty {
    @include global.card-style;
    padding: 3rem 2rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  &__empty-icon {
    margin-bottom: 1.5rem;
    color: var(--text-tertiary);
  }
  
  &__empty-title {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  &__empty-text {
    margin: 0 0 2rem;
    color: var(--text-secondary);
  }
  
  &__empty-action {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    background-color: var(--primary-color);
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: color.adjust($primary-color, $lightness: -10%);
      transform: translateY(-2px);
    }
  }
}

// Layout and content styles
.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
}

// Header styles
.punvid {
  &__header {
    margin-bottom: 2rem;
  }
  
  &__title {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
    color: var(--text-primary);
    
    span {
      color: var(--primary-color);
    }
  }
  
  &__tagline {
    color: var(--text-secondary);
    margin: 0;
  }
  
  // Footer styles
  &__footer {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-light);
    text-align: center;
  }
  
  &__footer-text {
    color: var(--text-tertiary);
    font-size: 0.85rem;
  }
}

</style>