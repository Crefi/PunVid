<script lang="ts">
    import Sidebar from '$lib/components/Sidebar.svelte';
    import Profile from '$lib/components/Profile.svelte';
   
  
    // Hardcoded user data
    let user = { name: "John Doe", avatar: "punpun.png" };
    let messages = ["Upload limit: 100MB per file", "Storage: 65% used"];
  
    // Hardcoded upload types
    let uploadTypes = ["Video", "Audio", "Image", "Text", "Document"];
    let selectedType = "Video";
  
    // File input reference
    let fileInput: HTMLInputElement;
    
    // Selected file info
    let selectedFile: File | null = null;
    let filePreview: string | null = null;
    let uploadProgress = 0;
    let isUploading = false;
  
    // Handle file selection
    function handleFileSelect(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        selectedFile = input.files[0];
        
        // Create preview if it's an image
        if (selectedFile.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            filePreview = e.target?.result as string;
          };
          reader.readAsDataURL(selectedFile);
        } else {
          filePreview = null;
        }
      }
    }
    
    // Trigger file input click
    function triggerFileInput() {
      fileInput.click();
    }
    
    
    // Clear selected file
    function clearSelection() {
      selectedFile = null;
      filePreview = null;
      uploadProgress = 0;
    }



    // add skip script 


  // Add these variables to the script section at the top
let enableSkipIntro = false;
let introStartMin = 0;
let introStartSec = 0;
let introEndMin = 0;
let introEndSec = 30;

let enableSkipOutro = false;
let outroStartMin = 0;
let outroStartSec = 0;
let outroEndMin = 0;
let outroEndSec = 0;

// Modify the startUpload function to include this data
function startUpload() {
  if (!selectedFile) return;
  
  isUploading = true;
  uploadProgress = 0;
  
  // Collect skip markers data
  const skipData = {
    skipIntro: enableSkipIntro ? {
      start: (introStartMin * 60) + introStartSec,
      end: (introEndMin * 60) + introEndSec
    } : null,
    skipOutro: enableSkipOutro ? {
      start: (outroStartMin * 60) + outroStartSec,
      end: (outroEndMin * 60) + outroEndSec
    } : null
  };
  
  // For debug purposes 
  console.log("File upload with skip data:", skipData);
  
  // Rest of your upload function...
  const interval = setInterval(() => {
    uploadProgress += Math.random() * 10;
    
    if (uploadProgress >= 100) {
      uploadProgress = 100;
      isUploading = false;
      clearInterval(interval);
      
      // Reset after 2 seconds
      setTimeout(() => {
        selectedFile = null;
        filePreview = null;
        uploadProgress = 0;
        // Don't reset skip settings to keep them for next upload
      }, 2000);
    }
  }, 300);
}

  </script>
  
  <div class="layout">
    <!-- Sidebar with user profile -->
    <Sidebar>
      <div class="sidebar__profile">
        <Profile {user} />
      </div>
    </Sidebar>
  
    <div class="content">
      <header class="punvid__header">
        <h1 class="punvid__title">Upload <span>File</span></h1>
        <p class="punvid__tagline">Add some content to your collection...</p>
      </header>
  

      <!-- Upload Section -->
      <section class="punvid__upload-section">
        <!-- File Type Selection -->
        <div class="punvid__upload-type">
          <h3 class="punvid__upload-type-title">Select File Type</h3>
          <div class="punvid__upload-type-options">
            {#each uploadTypes as type}
              <button 
                class="punvid__type-btn" 
                class:punvid__type-btn--active={selectedType === type}
                on:click={() => selectedType = type}
              >
                <span class="punvid__type-icon">
                  {#if type === "Video"}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="23 7 16 12 23 17 23 7"></polygon>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                    </svg>
                  {:else if type === "Audio"}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 18V5l12-2v13"></path>
                      <circle cx="6" cy="18" r="3"></circle>
                      <circle cx="18" cy="16" r="3"></circle>
                    </svg>
                  {:else if type === "Image"}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  {:else if type === "Text"}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                      <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                  {/if}
                </span>
                <span class="punvid__type-label">{type}</span>
              </button>
            {/each}
          </div>
        </div>
  
        <!-- File Upload Area -->
        <div class="punvid__upload-area">
          <input 
            type="file" 
            bind:this={fileInput}
            on:change={handleFileSelect} 
            class="punvid__file-input" 
            accept={selectedType === "Video" ? "video/*" : 
                    selectedType === "Audio" ? "audio/*" : 
                    selectedType === "Image" ? "image/*" : 
                    selectedType === "Text" ? "text/*" : 
                    "*"}
          />
  
          {#if !selectedFile}
            <div class="punvid__upload-dropzone" on:click={triggerFileInput}>
              <div class="punvid__upload-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              <h3 class="punvid__upload-title">Drag & Drop or Click to Upload</h3>
              <p class="punvid__upload-info">
                Max file size: 100MB<br>
                Supported formats: {selectedType === "Video" ? "MP4, MOV, AVI" : 
                                   selectedType === "Audio" ? "MP3, WAV, OGG" : 
                                   selectedType === "Image" ? "JPG, PNG, GIF" : 
                                   selectedType === "Text" ? "TXT, MD" : 
                                   "DOC, PDF, DOCX"}
              </p>
            </div>
          {:else}
            <div class="punvid__selected-file">
              {#if filePreview}
                <div class="punvid__file-preview">
                  <img src={filePreview} alt="Preview" />
                </div>
              {:else}
                <div class="punvid__file-icon">
                  {#if selectedFile.type.includes('video')}
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <polygon points="23 7 16 12 23 17 23 7"></polygon>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                    </svg>
                  {:else if selectedFile.type.includes('audio')}
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M9 18V5l12-2v13"></path>
                      <circle cx="6" cy="18" r="3"></circle>
                      <circle cx="18" cy="16" r="3"></circle>
                    </svg>
                  {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                      <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                  {/if}
                </div>
              {/if}
  
              <div class="punvid__file-details">
                <h3 class="punvid__file-name">{selectedFile.name}</h3>
                <p class="punvid__file-meta">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  <span class="punvid__file-type">{selectedFile.type || 'Unknown type'}</span>
                </p>
  
                {#if isUploading}
                  <div class="punvid__progress">
                    <div class="punvid__progress-bar" style="width: {uploadProgress}%"></div>
                    <span class="punvid__progress-text">{Math.round(uploadProgress)}%</span>
                  </div>
                {:else}
                  <div class="punvid__file-actions">
                    <button class="punvid__action-btn punvid__action-btn--primary" on:click={startUpload}>
                      Upload Now
                    </button>
                    <button class="punvid__action-btn punvid__action-btn--secondary" on:click={clearSelection}>
                      Cancel
                    </button>
                  </div>
                {/if}
              </div>
            </div>
          {/if}
        </div>
  
     <!-- skip section -->

     <!-- Add this right before the closing </section> tag in your upload section -->

<!-- Skip Intro/Outro Options -->
<div class="punvid__skip-options" style="display: {selectedType === 'Video' ? 'block' : 'none'}">
  <div class="punvid__upload-type">
    <h3 class="punvid__upload-type-title">Video Navigation Options</h3>
    
    <!-- Skip Intro Toggle -->
    <div class="punvid__option-row">
      <label class="punvid__toggle-label">
        <input type="checkbox" bind:checked={enableSkipIntro} class="punvid__toggle-input" />
        <span class="punvid__toggle-switch"></span>
        <span>Enable "Skip Intro" Button</span>
      </label>
      
      {#if enableSkipIntro}
        <div class="punvid__timestamp-inputs">
          <div class="punvid__timestamp-group">
            <label>Intro starts at:</label>
            <div class="punvid__time-input">
              <input type="number" min="0" bind:value={introStartMin} class="punvid__time-field" /> :
              <input type="number" min="0" max="59" bind:value={introStartSec} class="punvid__time-field" />
            </div>
          </div>
          
          <div class="punvid__timestamp-group">
            <label>Intro ends at:</label>
            <div class="punvid__time-input">
              <input type="number" min="0" bind:value={introEndMin} class="punvid__time-field" /> :
              <input type="number" min="0" max="59" bind:value={introEndSec} class="punvid__time-field" />
            </div>
          </div>
        </div>
      {/if}
    </div>
    
    <!-- Skip Outro Toggle -->
    <div class="punvid__option-row">
      <label class="punvid__toggle-label">
        <input type="checkbox" bind:checked={enableSkipOutro} class="punvid__toggle-input" />
        <span class="punvid__toggle-switch"></span>
        <span>Enable "Skip Outro" Button</span>
      </label>
      
      {#if enableSkipOutro}
        <div class="punvid__timestamp-inputs">
          <div class="punvid__timestamp-group">
            <label>Outro starts at:</label>
            <div class="punvid__time-input">
              <input type="number" min="0" bind:value={outroStartMin} class="punvid__time-field" /> :
              <input type="number" min="0" max="59" bind:value={outroStartSec} class="punvid__time-field" />
            </div>
          </div>
          
          <div class="punvid__timestamp-group">
            <label>Outro ends at:</label>
            <div class="punvid__time-input">
              <input type="number" min="0" bind:value={outroEndMin} class="punvid__time-field" /> :
              <input type="number" min="0" max="59" bind:value={outroEndSec} class="punvid__time-field" />
            </div>
          </div>
        </div>
      {/if}
    </div>
    
    <div class="punvid__option-info">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      <span>Adding skip markers will improve viewer experience by letting them bypass intro and outro sequences.</span>
    </div>
  </div>
</div>


      </section>
  
      <footer class="punvid__footer">
        <p class="punvid__footer-text">©Crefi 2025</p>
      </footer>
    </div>
  </div>
  
  <style lang="scss">
// Base variables
$primary-color: #FF6B6B;
$secondary-color: #4ECDC4;
$dark-bg: #1E1E2E;
$card-bg: rgba(30, 30, 46, 0.7);
$border-light: rgba(255, 255, 255, 0.1);
$text-primary: #FFFFFF;
$text-secondary: rgba(255, 255, 255, 0.8);
$text-tertiary: rgba(255, 255, 255, 0.6);

@mixin card-style {
  background: var(--background-card, $card-bg);
  border: 1px solid var(--border-light, $border-light);
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

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

// Main layout using flexbox
.layout {
  display: flex;
  min-height: 100vh;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

// Upload Section - Flexbox
.punvid {
  &__upload-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    animation: slideUp 0.6s ease-out;
  }
  
  // Header
  &__header {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
  }
  
  &__title {
    font-size: 2.5rem;
    margin: 0;
    color: var(--text-primary, $text-primary);
    
    span {
      color: var(--primary-color, $primary-color);
    }
  }
  
  &__tagline {
    color: var(--text-secondary, $text-secondary);
    margin-top: 0.5rem;
  }
  
  // File Type Selection - Flexbox
  &__upload-type {
    @include card-style;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
  }
  
  &__upload-type-title {
    color: var(--text-primary, $text-primary);
    font-size: 1.2rem;
    margin-top: 0;
    margin-bottom: 1rem;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -6px;
      width: 40px;
      height: 3px;
      background: var(--primary-color, $primary-color);
      border-radius: 3px;
    }
  }
  
  &__upload-type-options {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  &__type-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid var(--border-light, $border-light);
    border-radius: 12px;
    color: var(--text-secondary, $text-secondary);
    cursor: pointer;
    transition: all 0.3s ease;
    flex: 1;
    min-width: 100px;
    max-width: 120px;
    
    &:hover {
      transform: translateY(-3px);
      border-color: var(--primary-color, $primary-color);
      box-shadow: 0 5px 15px rgba(var(--primary-color-rgb, 255, 107, 107), 0.3);
    }
    
    &--active {
      background: rgba(var(--primary-color-rgb, 255, 107, 107), 0.15);
      color: var(--primary-color, $primary-color);
      border-color: var(--primary-color, $primary-color);
    }
  }
  
  &__type-icon {
    margin-bottom: 0.8rem;
    transition: transform 0.3s ease;
    
    svg {
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    }
    
    .punvid__type-btn:hover & {
      transform: scale(1.1);
    }
  }
  
  &__type-label {
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  // Upload Area - Flexbox
  &__upload-area {
    @include card-style;
    padding: 2rem;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  &__file-input {
    display: none;
  }
  
  &__upload-dropzone {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 2px dashed var(--border-light, $border-light);
    border-radius: 12px;
    padding: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: var(--primary-color, $primary-color);
      background: rgba(var(--primary-color-rgb, 255, 107, 107), 0.05);
      
      .punvid__upload-icon {
        transform: translateY(-5px);
        color: var(--primary-color, $primary-color);
      }
    }
  }
  
  &__upload-icon {
    margin-bottom: 1.5rem;
    color: var(--text-tertiary, $text-tertiary);
    transition: all 0.3s ease;
  }
  
  &__upload-title {
    color: var(--text-primary, $text-primary);
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
    font-weight: normal;
  }
  
  &__upload-info {
    color: var(--text-tertiary, $text-tertiary);
    max-width: 300px;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  // Selected File - Flexbox
  &__selected-file {
    width: 100%;
    display: flex;
    gap: 2rem;
    align-items: center;
    
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
  
  &__file-preview {
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 12px;
    flex-shrink: 0;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  &__file-icon {
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    color: var(--text-secondary, $text-secondary);
    flex-shrink: 0;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  }
  
  &__file-details {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  &__file-name {
    color: var(--text-primary, $text-primary);
    margin: 0 0 0.5rem 0;
    word-break: break-all;
  }
  
  &__file-meta {
    color: var(--text-tertiary, $text-tertiary);
    font-size: 0.9rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    
    .punvid__file-type {
      padding: 0.25rem 0.75rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      font-size: 0.8rem;
    }
  }
  
  &__progress {
    height: 10px;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    position: relative;
    margin-bottom: 1.5rem;
    overflow: hidden;
  }
  
  &__progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-color, $primary-color), var(--secondary-color, $secondary-color));
    border-radius: 10px;
    transition: width 0.3s ease;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0)
      );
      animation: shine 1.5s infinite;
    }
  }
  
  @keyframes shine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  &__progress-text {
    position: absolute;
    top: -20px;
    right: 0;
    color: var(--text-secondary, $text-secondary);
    font-weight: 500;
  }
  
  &__file-actions {
    display: flex;
    gap: 1rem;
    margin-top: auto;
  }
  
  &__action-btn {
    padding: 0.85rem 1.5rem;
    border-radius: 8px;
    font-family: 'Space Mono', monospace;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    
    &--primary {
      background: var(--primary-color, $primary-color);
      color: white;
      flex: 1;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(var(--primary-color-rgb, 255, 107, 107), 0.4);
      }
      
      &:active {
        transform: translateY(0px);
      }
    }
    
    &--secondary {
      background: transparent;
      border: 1px solid var(--border-light, $border-light);
      color: var(--text-secondary, $text-secondary);
      
      &:hover {
        border-color: var(--text-primary, $text-primary);
        color: var(--text-primary, $text-primary);
        background: rgba(255, 255, 255, 0.05);
      }
    }
  }
  
  // Footer - Flexbox
  &__footer {
    margin-top: auto;
    padding-top: 2rem;
    display: flex;
    justify-content: center;
  }
  
  &__footer-text {
    color: var(--text-tertiary, $text-tertiary);
    font-size: 0.9rem;
  }
  
  // Skip Options - Modern Redesign with Flexbox
  &__skip-options {
    margin-top: 2rem;
    animation: slideUp 0.8s ease-out;
  }
  
  &__option-row {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border-light, $border-light);
    display: flex;
    flex-direction: column;
    
    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
  }
  
  &__toggle-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: var(--text-primary, $text-primary);
    font-weight: 500;
    margin-bottom: 1rem;
    transition: all 0.2s ease;
    
    &:hover {
      .punvid__toggle-switch {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }
  
  &__toggle-input {
    display: none;
    
    &:checked + .punvid__toggle-switch {
      background-color: var(--primary-color, $primary-color);
      
      &:before {
        transform: translateX(18px);
      }
    }
  }
  
  &__toggle-switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 22px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 34px;
    margin-right: 12px;
    transition: all 0.3s;
    
    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      border-radius: 50%;
      transition: all 0.3s;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    }
  }
  
  &__timestamp-inputs {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding: 1.25rem;
    border-left: 2px solid var(--primary-color, $primary-color);
    margin-left: 0.75rem;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 0 8px 8px 0;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }
  }
  
  &__timestamp-group {
    display: flex;
    flex-direction: column;
    min-width: 200px;
    flex: 1;
    
    label {
      color: var(--text-secondary, $text-secondary);
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      
      &:before {
        content: '•';
        color: var(--primary-color, $primary-color);
        margin-right: 0.5rem;
        font-size: 1.2rem;
      }
    }
  }
  
  &__time-input {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary, $text-secondary);
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 0.5rem;
    border: 1px solid var(--border-light, $border-light);
  }
  
  &__time-field {
    width: 60px;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid var(--border-light, $border-light);
    border-radius: 6px;
    color: var(--text-primary, $text-primary);
    text-align: center;
    font-family: 'Space Mono', monospace;
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color, $primary-color);
      box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb, 255, 107, 107), 0.2);
    }
    
    // Remove spinner buttons for number inputs
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    
    &[type=number] {
      -moz-appearance: textfield;
    }
  }
  
  &__option-info {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    margin-top: 1.5rem;
    color: var(--text-tertiary, $text-tertiary);
    font-size: 0.85rem;
    line-height: 1.5;
    border-left: 2px solid var(--primary-color, $primary-color);
    
    svg {
      flex-shrink: 0;
      color: var(--primary-color, $primary-color);
      margin-top: 0.1rem;
    }
  }
}
  </style>