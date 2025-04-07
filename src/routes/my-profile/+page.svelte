<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
    // Hardcoded user data
    const user = {
      name: "John Doe",
      username: "@johndoe",
      avatar: "punpun.png",
      storage: {
        total: 15, // in GB
        used: 8.7, // in GB
        percentUsed: 58 // pre-calculated percentage
      },
      stats: {
        totalUploads: 42,
        recentUploads: 5,
        largestFile: "4.2 GB",
        filesThisMonth: 12
      }
    };
  
    // Hardcoded storage breakdown
    const storageBreakdown = [
      { type: "Videos", size: 4.8, color: "#FF6B6B" },
      { type: "Images", size: 2.1, color: "#4ECDC4" },
      { type: "Audio", size: 1.5, color: "#FFC107" },
      { type: "Documents", size: 0.3, color: "#9B59B6" }
    ];
    // Define the pages for the sidebar
    const pages = [
    { name: "Home", path: "/home" },
    { name: "Upload", path: "/upload" },
    { name: "My Videos", path: "/my-videos" },
    { name: "My Files", path: "/my-files" },
    { name: "My Profile", path: "/my-profile" }
  ];
    // Hardcoded recent uploads
    const recentUploads = [
      { name: "Project_Demo.mp4", size: "1.8 GB", date: "Apr 01, 2025", type: "video" },
      { name: "Design_Assets.zip", size: "756 MB", date: "Mar 28, 2025", type: "archive" },
      { name: "Client_Presentation.pdf", size: "24 MB", date: "Mar 25, 2025", type: "document" }
    ];
  </script>
  
  <div class="app-container">
    <Sidebar {pages} />
    
    <div class="profile-page">
      <div class="profile-sidebar">
        <div class="profile-card">
          <div class="profile-header">
            <div class="profile-avatar">
              <img src={user.avatar} alt={user.name} />
            </div>
            <h1 class="profile-name">{user.name}</h1>
            <p class="profile-username">{user.username}</p>
          </div>
          
          <!-- REDESIGNED STORAGE SECTION -->
          <div class="storage-summary">
            <div class="storage-title">
              <h3>Storage</h3>
              <span class="storage-value">{user.storage.used} GB / {user.storage.total} GB</span>
            </div>
            
            <div class="storage-progress">
              <!-- Main storage bar -->
              <div class="storage-bar">
                <div class="storage-bar-filled" style="width: {user.storage.percentUsed}%"></div>
              </div>
              
              <!-- Individual storage type bars -->
              <div class="storage-type-bars">
                {#each storageBreakdown as item}
                  <div class="type-item">
                    <div class="type-label">
                      <span class="type-color" style="background-color: {item.color};"></span>
                      <span class="type-name">{item.type}</span>
                    </div>
                    <div class="type-bar-container">
                      <div class="type-bar" style="width: {(item.size/user.storage.total)*100}%; background-color: {item.color};"></div>
                    </div>
                    <span class="type-size">{item.size} GB</span>
                  </div>
                {/each}
                
                <!-- Free space bar -->
                <div class="type-item">
                  <div class="type-label">
                    <span class="type-color" style="background-color: #2C3E50;"></span>
                    <span class="type-name">Free Space</span>
                  </div>
                  <div class="type-bar-container">
                    <div class="type-bar" style="width: {((user.storage.total - user.storage.used)/user.storage.total)*100}%; background-color: #2C3E50;"></div>
                  </div>
                  <span class="type-size">{(user.storage.total - user.storage.used).toFixed(1)} GB</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="upload-limits">
            <h3 class="limits-title">Upload Limits</h3>
            <div class="limit-item">
              <span class="limit-label">Max file size:</span>
              <span class="limit-value">2 GB</span>
            </div>
            <div class="limit-item">
              <span class="limit-label">Supported formats:</span>
              <span class="limit-value">All common media types</span>
            </div>
            <div class="limit-item">
              <span class="limit-label">Plan tier:</span>
              <span class="limit-value pro-badge">Pro</span>
            </div>
            <div class="limit-item">
              <span class="limit-label">Plan renewal:</span>
              <span class="limit-value">May 15, 2025</span>
            </div>
          </div>
          
          <div class="profile-actions">
            <button class="btn btn-primary">Upgrade Storage</button>
            <button class="btn btn-secondary">Settings</button>
          </div>
        </div>
      </div>


    <div class="profile-content">
      <div class="content-header">
        <h2 class="section-title">My <span>Storage</span></h2>
        <p class="section-subtitle">Files, uploads and storage information</p>
      </div>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
          <div class="stat-info">
            <h3 class="stat-title">Total Uploads</h3>
            <p class="stat-value">{user.stats.totalUploads}</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <div class="stat-info">
            <h3 class="stat-title">This Month</h3>
            <p class="stat-value">{user.stats.filesThisMonth} files</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
          </div>
          <div class="stat-info">
            <h3 class="stat-title">Largest File</h3>
            <p class="stat-value">{user.stats.largestFile}</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div class="stat-info">
            <h3 class="stat-title">Recent Uploads</h3>
            <p class="stat-value">{user.stats.recentUploads} files</p>
          </div>
        </div>
      </div>
      
      <div class="recent-uploads">
        <div class="section-header">
          <h3>Recent Uploads</h3>
          <button class="btn btn-text">View All</button>
        </div>
        
        <div class="uploads-table">
          <div class="table-header">
            <div class="header-cell file-name">File Name</div>
            <div class="header-cell file-size">Size</div>
            <div class="header-cell file-date">Date</div>
            <div class="header-cell file-actions">Actions</div>
          </div>
          
          {#each recentUploads as file}
            <div class="table-row">
              <div class="table-cell file-name">
                <div class="file-icon">
                  {#if file.type === "video"}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="23 7 16 12 23 17 23 7"></polygon>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                    </svg>
                  {:else if file.type === "archive"}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 6v14c0 1-1 2-2 2H5c-1 0-2-1-2-2V6"></path>
                      <path d="M3 6l9-4 9 4"></path>
                      <path d="M12 10v8"></path>
                      <path d="M8 12l4-2 4 2"></path>
                    </svg>
                  {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  {/if}
                </div>
                {file.name}
              </div>
              <div class="table-cell file-size">{file.size}</div>
              <div class="table-cell file-date">{file.date}</div>
              <div class="table-cell file-actions">
                <button class="action-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
                <button class="action-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
                <button class="action-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>
              </div>
            </div>
          {/each}
        </div>
        
        <div class="storage-recommendation">
          <div class="recommendation-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div class="recommendation-content">
            <h4>Storage Usage Tip</h4>
            <p>You're approaching your storage limit. Consider deleting unused files or upgrading your plan to avoid interruptions.</p>
          </div>
          <button class="btn btn-small">Optimize</button>
        </div>
      </div>
    </div>
  </div>
</div>

  
  <style lang="scss">
    @use "sass:color";
    @use '../styles/global.scss' as global;


    $primary-color: #FF6B6B;
    $accent-color: #4ECDC4;
    $error-color: #EF4444;
  

   .app-container {
    display: flex;
    min-height: 100vh;
    background-color: var(--background-dark);
  }
  
  /* Profile page adjusted to work with sidebar */
  .profile-page {
    flex: 1;
    display: flex;
    min-height: 100vh;
    padding: 2rem;
    gap: 2rem;
    
    @media (max-width: 900px) {
      flex-direction: column;
    }
  }
  

    // Layout
    .profile-page {
      display: flex;
      min-height: 100vh;
      padding: 2rem;
      gap: 2rem;
      
      @media (max-width: 900px) {
        flex-direction: column;
      }
    }
  
    .profile-sidebar {
      width: 350px;
      flex-shrink: 0;
      
      @media (max-width: 900px) {
        width: 100%;
      }
    }
  
    .profile-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  
    // Profile Card
    .profile-card {
      @include global.card-style;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
  
    .profile-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  
    .profile-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
      border: 3px solid var(--primary-color);
      margin-bottom: 1rem;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  
    .profile-name {
      font-family: 'VT323', monospace;
      font-size: 2rem;
      margin: 0;
      letter-spacing: 1px;
    }
  
    .profile-username {
      color: var(--text-secondary);
      margin: 0.5rem 0 0;
    }

    .storage-summary {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border-light);
  }
  
  .storage-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    h3 {
      margin: 0;
      font-size: 1.2rem;
    }
    
    .storage-value {
      color: var(--text-secondary);
      font-size: 0.9rem;
    }
  }
  
  .storage-progress {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .storage-bar {
    height: 10px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    overflow: hidden;
    
    .storage-bar-filled {
      height: 100%;
      border-radius: 5px;
      background-color: var(--primary-color); /* Solid color instead of gradient */
    }
  }
  
  .storage-type-bars {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .type-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
  
  .type-label {
    width: 100px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .type-color {
    width: 10px;
    height: 10px;
    border-radius: 2px;
  }
  
  .type-name {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }
  
  .type-bar-container {
    flex: 1;
    height: 6px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
    overflow: hidden;
  }
  
  .type-bar {
    height: 100%;
    border-radius: 3px;
  }
  
  .type-size {
    width: 60px;
    text-align: right;
    font-size: 0.85rem;
    color: var(--text-primary);
  }

    // Upload Limits
    .upload-limits {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-light);
      
      .limits-title {
        margin: 0;
        font-size: 1.2rem;
      }
      
      .limit-item {
        display: flex;
        justify-content: space-between;
        font-size: 0.9rem;
        
        .limit-label {
          color: var(--text-secondary);
        }
        
        .limit-value {
          color: var(--text-primary);
        }
        
        .pro-badge {
          background-color: rgba(var(--pro-color), 0.2);
          color: var(--pro-color);
          padding: 0.1rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
        }
      }
    }
  
    // Profile Actions
    .profile-actions {
      display: flex;
      gap: 1rem;
      
      .btn {
        flex: 1;
        padding: 0.8rem;
        border-radius: 4px;
        font-family: 'Space Mono', monospace;
        border: none;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.2s ease;
      }
      
      .btn-primary {
        background: var(--primary-color);
        color: white;
        
        &:hover {
          background: color.adjust($primary-color, $lightness: 10%);
        }
      }
      
      .btn-secondary {
        background: transparent;
        border: 1px solid border-light;
        color: var(--text-secondary);
        
        &:hover {
          border-color: var(--text-primary);
          color: var(--text-primary);
        }
      }
    }
  
    // Content Header
    .content-header {
      text-align: center;
      margin-bottom: 1rem;
      
      .section-title {
        font-family: 'VT323', monospace;
        font-size: 3rem;
        font-weight: normal;
        letter-spacing: 2px;
        margin: 0;
        padding: 0;
        position: relative;
        text-shadow: 3px 3px 0px rgba(0, 0, 0, 0.7);
        
        span {
          color: var(--primary-color);
        }
        
        &::after {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 3px;
        }
      }
      
      .section-subtitle {
        font-size: 1rem;
        color: var(--text-secondary);
        font-style: italic;
        margin-top: 1.5rem;
        letter-spacing: 1px;
      }
    }
  
    // Stats Grid
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.5rem;
      
      .stat-card {
        @include global.card-style;
        padding: 1.5rem;
        display: flex;
        gap: 1rem;
        align-items: center;
        
        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          background: rgba($primary-color, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: $primary-color;
        }
        
        .stat-info {
          display: flex;
          flex-direction: column;
          
          .stat-title {
            margin: 0;
            font-size: 0.9rem;
            color: var(--text-secondary);
            font-weight: normal;
          }
          
          .stat-value {
            font-size: 1.5rem;
            margin: 0.2rem 0 0;
            font-weight: bold;
          }
        }
      }
    }
  
    // Recent Uploads
    .recent-uploads {
      @include global.card-style;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        h3 {
          margin: 0;
          font-size: 1.2rem;
        }
        
        .btn-text {
          background: transparent;
          border: none;
          color: var(--accent-color);
          cursor: pointer;
          font-family: 'Space Mono', monospace;
          font-size: 0.9rem;
          transition: color 0.2s ease;
          
          &:hover {
            color: lighten($accent-color, 10%);
          }
        }
      }
    }
  
    // Uploads Table
    .uploads-table {
      display: flex;
      flex-direction: column;
      
      .table-header, .table-row {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 0.5fr;
        padding: 0.8rem 0;
        
        &:not(:last-child) {
          border-bottom: 1px solid var(--border-light);
        }
      }
      
      .table-header {
        color: var(--text-secondary);
        font-size: 0.9rem;
        font-weight: bold;
      }
      
      .file-name {
        display: flex;
        align-items: center;
        gap: 0.8rem;
      }
      
      .file-icon {
        width: 32px;
        height: 32px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
      }
      
      .file-actions {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
        
        .action-btn {
          width: 28px;
          height: 28px;
          border-radius: 4px;
          border: 1px solid var(--border-light);
          background: transparent;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          
          &:hover {
            color: var(--text-primary);
            border-color: var(--text-primary);
          }
        }
      }
    }
  
    // Storage Recommendation
    .storage-recommendation {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: rgba($error-color, 0.1);
      border-left: 3px solid $error-color;
      padding: 1rem;
      border-radius: 4px;
      margin-top: 1rem;
      
      .recommendation-icon {
        color: $error-color;
        flex-shrink: 0;
      }
      
      .recommendation-content {
        flex: 1;
        
        h4 {
          margin: 0 0 0.2rem 0;
          font-size: 1rem;
        }
        
        p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.4;
        }
      }
      
      .btn-small {
        padding: 0.4rem 0.8rem;
        border-radius: 4px;
        background: var(--error-color);
        color: white;
        font-family: 'Space Mono', monospace;
        border: none;
        cursor: pointer;
        font-size: 0.8rem;
        flex-shrink: 0;
        
        &:hover {
          background: color.adjust($error-color,  $lightness: 10%);
        }
      }
    }
  </style>