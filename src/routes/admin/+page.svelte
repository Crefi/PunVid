<script lang="ts">
    import Sidebar from '$lib/components/Sidebar.svelte';
    import Profile from '$lib/components/Profile.svelte';
    import { onMount } from 'svelte';
    
    // Hardcoded admin user data
    let admin = { name: "Admin Panel", avatar: "punpun.png" };
    
    interface User {
      id: number;
      username: string;
      email: string;
      status: string;
      joinDate: string;
      uploads: number;
      storageUsed: string;
      lastLogin: string;
    }

    interface Video {
      id: number;
      title: string;
      username: string;
      uploadDate: string;
      views: number;
      likes: number;
      status: string;
      fileSize: string;
      duration: string;
      flags: number;
    }

    // Search state
    let searchQuery = "";
    let searchCategory = "users";
    let searchResults: (User | Video)[] = [];
    let isSearching = false;
    
    // Filters
    let filterStatus = "all";
    let filterDateRange = "all";
    let filterContentType = "all";
    
    // Pagination
    let currentPage = 1;
    let totalPages = 5;
    
    // Stats data
    let statsData = {
      totalUsers: 15482,
      activeToday: 3421,
      totalVideos: 87633,
      storageUsed: "12.3 TB",
      avgUploadSize: "42 MB",
      weeklyUploads: 3245
    };
    
    // Mock data for users
    let mockUsers = [
      { id: 1, username: "JohnDoe", email: "john@example.com", status: "active", joinDate: "2023-11-14", uploads: 43, storageUsed: "2.3 GB", lastLogin: "2 hours ago" },
      { id: 2, username: "AliceSmith", email: "alice@example.com", status: "active", joinDate: "2023-10-05", uploads: 127, storageUsed: "5.7 GB", lastLogin: "1 day ago" },
      { id: 3, username: "BobJohnson", email: "bob@example.com", status: "inactive", joinDate: "2023-08-22", uploads: 12, storageUsed: "0.8 GB", lastLogin: "2 weeks ago" },
      { id: 4, username: "EmmaWilson", email: "emma@example.com", status: "active", joinDate: "2024-01-30", uploads: 89, storageUsed: "4.1 GB", lastLogin: "3 hours ago" },
      { id: 5, username: "MichaelBrown", email: "michael@example.com", status: "suspended", joinDate: "2023-05-17", uploads: 54, storageUsed: "3.6 GB", lastLogin: "1 month ago" }
    ];
    
    // Mock data for videos
    let mockVideos = [
      { id: 101, title: "Funny Cats Compilation", username: "JohnDoe", uploadDate: "2024-03-15", views: 12548, likes: 845, status: "active", fileSize: "34.2 MB", duration: "4:28", flags: 0 },
      { id: 102, title: "Cooking Tutorial", username: "AliceSmith", uploadDate: "2024-03-12", views: 5872, likes: 421, status: "active", fileSize: "128.5 MB", duration: "15:32", flags: 0 },
      { id: 103, title: "Gaming Stream Highlights", username: "BobJohnson", uploadDate: "2024-03-08", views: 3215, likes: 189, status: "under_review", fileSize: "215.7 MB", duration: "24:15", flags: 3 },
      { id: 104, title: "Travel Vlog: Paris", username: "EmmaWilson", uploadDate: "2024-03-02", views: 8956, likes: 723, status: "active", fileSize: "178.9 MB", duration: "18:47", flags: 1 },
      { id: 105, title: "Late Night Music", username: "MichaelBrown", uploadDate: "2024-01-25", views: 462, likes: 32, status: "blocked", fileSize: "42.3 MB", duration: "5:13", flags: 12 }
    ];
    
    // Action flags
    let showDeleteModal = false;
    let selectedItemId: number | null = null;
    
    // Search function
    function performSearch() {
      isSearching = true;
      
      setTimeout(() => {
        if (searchCategory === "users") {
          searchResults = mockUsers.filter(user => 
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
          );
        } else if (searchCategory === "videos") {
          searchResults = mockVideos.filter(video => 
            video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            video.username.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        // Apply filters
        if (filterStatus !== "all") {
          searchResults = searchResults.filter(item => item.status === filterStatus);
        }
        
        isSearching = false;
      }, 500);
    }

    // Handle pagination - parameter is a number
    function goToPage(page: number) {
      if (page >= 1 && page <= totalPages) {
        currentPage = page;
      }
    }

    // Define action types
    type AdminAction = "delete"  | "approve" | "block";

    // Handle action buttons - both parameters are typed
    function handleAction(action: AdminAction, id: number) {
      selectedItemId = id;
      
      if (action === "delete") {
        showDeleteModal = true;
      } else if (action === "approve") {
        alert(`Approved item ${id}`);
      } else if (action === "block") {
        alert(`Blocked item ${id}`);
      }
    }

    // Confirm delete
    function confirmDelete() {
      // Delete logic would go here
      alert(`Deleted item ${selectedItemId}`);
      showDeleteModal = false;
      selectedItemId = null;
    }
    

    // Close modals
    function closeModals() {
      showDeleteModal = false;
      selectedItemId = null;
    }
  </script>
  
  <div class="layout">
    <!-- Simplified Sidebar with admin profile only -->
    <Sidebar>
      <div class="sidebar__profile">
        <Profile user={admin} />
      </div>
    </Sidebar>
  
    <div class="content">
      <header class="punvid__header">
        <h1 class="punvid__title">Admin <span>Dashboard</span></h1>
        <p class="punvid__tagline">Monitor and manage all user content and activities</p>
      </header>
  
      <!-- Simplified Stats Overview Cards with modern styling -->
      <section class="admin__stats-grid">
        <div class="admin__stat-card">
          <div class="admin__stat-icon admin__stat-icon--users">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div class="admin__stat-content">
            <h3>{statsData.totalUsers.toLocaleString()}</h3>
            <p>Total Users</p>
          </div>
          <div class="admin__stat-detail">
            <span>+{statsData.activeToday.toLocaleString()} active today</span>
          </div>
        </div>
        
        <div class="admin__stat-card">
          <div class="admin__stat-icon admin__stat-icon--videos">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
          </div>
          <div class="admin__stat-content">
            <h3>{statsData.totalVideos.toLocaleString()}</h3>
            <p>Total Videos</p>
          </div>
          <div class="admin__stat-detail">
            <span>{statsData.weeklyUploads.toLocaleString()} new this week</span>
          </div>
        </div>
        
        <div class="admin__stat-card">
          <div class="admin__stat-icon admin__stat-icon--storage">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="12" x2="2" y2="12"></line>
              <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
              <line x1="6" y1="16" x2="6.01" y2="16"></line>
              <line x1="10" y1="16" x2="10.01" y2="16"></line>
            </svg>
          </div>
          <div class="admin__stat-content">
            <h3>{statsData.storageUsed}</h3>
            <p>Storage Used</p>
          </div>
          <div class="admin__stat-detail">
            <span>Avg file: {statsData.avgUploadSize}</span>
          </div>
        </div>
      </section>
  
      <!-- Simplified Search Section with modern styling -->
      <section class="admin__search-section">
        <div class="admin__search-header">
          <h2>Search & Filter</h2>
        </div>
        
        <div class="admin__search-container">
          <div class="admin__search-bar">
            <div class="admin__search-category">
              <select bind:value={searchCategory} class="admin__select">
                <option value="users">Users</option>
                <option value="videos">Videos</option>
                <option value="comments">Comments</option>
                <option value="reports">Reports</option>
              </select>
            </div>
            
            <div class="admin__search-input-container">
              <input 
                type="text" 
                bind:value={searchQuery} 
                placeholder={`Search ${searchCategory}...`} 
                class="admin__search-input"
              />
              <button class="admin__search-btn" on:click={performSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="admin__filter-options">
            <div class="admin__filter-group">
              <label>Status</label>
              <select bind:value={filterStatus} class="admin__select">
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="blocked">Blocked</option>
                <option value="under_review">Under Review</option>
              </select>
            </div>
            
            <div class="admin__filter-group">
              <label>Date Range</label>
              <select bind:value={filterDateRange} class="admin__select">
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            
            <div class="admin__filter-group">
              <label>Content Type</label>
              <select bind:value={filterContentType} class="admin__select">
                <option value="all">All Types</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
                <option value="image">Image</option>
                <option value="text">Text</option>
                <option value="document">Document</option>
              </select>
            </div>
            
            <button class="admin__filter-btn">
              Apply Filters
            </button>
          </div>
        </div>
      </section>
  
      <!-- Results Section -->
      <section class="admin__results-section">
        {#if isSearching}
          <div class="admin__loading">
            <div class="admin__loading-spinner"></div>
            <p>Searching...</p>
          </div>
        {:else if searchResults.length > 0}
          <div class="admin__results-header">
            <h3>Search Results ({searchResults.length})</h3>
            <div class="admin__results-actions">
              <button class="admin__action-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                Export
              </button>
              <button class="admin__action-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
                Bulk Actions
              </button>
            </div>
          </div>
          
          {#if searchCategory === "users"}
            <div class="admin__table-container">
              <table class="admin__table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Uploads</th>
                    <th>Storage</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {#each searchResults as user}
                    <tr>
                      <td class="admin__user-cell">
                        <div class="admin__user-avatar"></div>
                        <span>{user.username}</span>
                      </td>
                      <td>{"user.email"}</td>
                      <td>
                        <span class={`admin__status admin__status--${user.status}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>{"user.joinDate"}</td>
                      <td>{"user.uploads"}</td>
                      <td>{"user.storageUsed"}</td>
                      <td>{"user.lastLogin"}</td>
                      <td class="admin__actions-cell">
                
                        <button class="admin__row-action admin__row-action--danger" on:click={() => handleAction('delete', user.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          {:else if searchCategory === "videos"}
            <div class="admin__table-container">
              <table class="admin__table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Uploader</th>
                    <th>Date</th>
                    <th>Views</th>
                    <th>Likes</th>
                    <th>Status</th>
                    <th>Flags</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {#each searchResults as video}
                    <tr>
                      <td class="admin__video-cell">
                        <div class="admin__video-thumbnail"></div>
                        <span>{"video.title"}</span>
                      </td>
                      <td>{"video.username"}</td>
                      <td>{"video.uploadDate"}</td>
                      <td>{"video.views.toLocaleString()"}</td>
                      <td>{"video.likes.toLocaleString()"}</td>
                      <td>
                        <span class={`admin__status admin__status--${video.status}`}>
                          {video.status}
                        </span>
                      </td>
                      <td>{"video.flags"}</td>
                      <td class="admin__actions-cell">
                        <button class="admin__row-action" on:click={() => handleAction('approve', video.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </button>
                        <button class="admin__row-action" on:click={() => handleAction('block', video.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                          </svg>
                        </button>
                        <button class="admin__row-action admin__row-action--danger" on:click={() => handleAction('delete', video.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          {/if}
          
          <!-- Pagination -->
          <div class="admin__pagination">
            <button 
              class="admin__pagination-btn" 
              disabled={currentPage === 1}
              on:click={() => goToPage(currentPage - 1)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            {#each Array(totalPages) as _, i}
              <button 
                class="admin__pagination-btn" 
                class:admin__pagination-btn--active={currentPage === i + 1}
                on:click={() => goToPage(i + 1)}
              >
                {i + 1}
              </button>
            {/each}
            
            <button 
              class="admin__pagination-btn"
              disabled={currentPage === totalPages}
              on:click={() => goToPage(currentPage + 1)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        {:else if searchQuery.length > 0}
          <div class="admin__no-results">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h3>No Results Found</h3>
              <p>We couldn't find any {searchCategory} matching "{searchQuery}"</p>
              <button class="admin__search-again-btn" on:click={() => searchQuery = ""}>
                Clear Search
              </button>
            </div>
          {:else}
            <div class="admin__start-search">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <h3>Start Searching</h3>
              <p>Use the search bar above to find {searchCategory}</p>
            </div>
          {/if}
        </section>
      </div>
    </div>
    
    <!-- Modal for delete confirmation -->
    {#if showDeleteModal}
      <div class="admin__modal-overlay" on:click={closeModals}>
        <div class="admin__modal" on:click|stopPropagation>
          <div class="admin__modal-header">
            <h3>Confirm Delete</h3>
            <button class="admin__modal-close" on:click={closeModals}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="admin__modal-content">
            <div class="admin__modal-icon admin__modal-icon--warning">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </div>
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
          </div>
          <div class="admin__modal-footer">
            <button class="admin__modal-btn" on:click={closeModals}>Cancel</button>
            <button class="admin__modal-btn admin__modal-btn--danger" on:click={confirmDelete}>Delete</button>
          </div>
        </div>
      </div>
    {/if}

    <style>

      

      /* Stats Grid */
      .admin__stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 24px;
        margin-bottom: 36px;
      }
      

      
      .admin__stat-icon {
        margin-bottom: 16px;
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .admin__stat-icon--users {
        background-color: rgba(52, 152, 219, 0.1);
        color: #3498db;
      }
      
      .admin__stat-icon--videos {
        background-color: rgba(155, 89, 182, 0.1);
        color: #9b59b6;
      }
      
      .admin__stat-icon--storage {
        background-color: rgba(46, 204, 113, 0.1);
        color: #2ecc71;
      }
      
      .admin__stat-icon--flags {
        background-color: rgba(231, 76, 60, 0.1);
        color: #e74c3c;
      }
      
      .admin__stat-content h3 {
        font-size: 28px;
        font-weight: 700;
        margin: 0 0 4px;
        color: #2c3e50;
      }
      
      .admin__stat-content p {
        font-size: 14px;
        color: #7f8c8d;
        margin: 0;
      }
      
      .admin__stat-detail {
        margin-top: auto;
        padding-top: 16px;
        font-size: 13px;
        color: #95a5a6;
      }
      
      .admin__stat-detail--warning {
        color: #e74c3c;
      }
      
      /* Search Section */
      .admin__search-section {
        background-color: var(--background-card);
        border-radius: 8px;
        padding: 24px;
        margin-bottom: 36px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      }
      
      .admin__search-header {
        margin-bottom: 16px;
      }
      
      .admin__search-header h2 {
        font-size: 18px;
        font-weight: 600;
        margin: 0;
        color: #2c3e50;
      }
      
      .admin__search-bar {
        display: flex;
        margin-bottom: 16px;
      }
      
      .admin__search-category {
        width: 120px;
        flex-shrink: 0;
        margin-right: 16px;
      }
      
      .admin__search-input-container {
        position: relative;
        flex-grow: 1;
      }
      
      .admin__search-input {
        width: 100%;
        padding: 10px 48px 10px 16px;
        border: 1px solid var(--border-light);
        border-radius: 6px;
        font-size: 15px;
        color: #2c3e50;
        background-color: var(--background-card);
      }
      
      .admin__search-btn {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        border: none;
        background: none;
        color: #7f8c8d;
        cursor: pointer;
        padding: 8px;
        border-radius: 4px;
      }
      
      .admin__search-btn:hover {
        background-color: var(--background-highlight);
        color: #3498db;
      }
      
      .admin__filter-options {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        align-items: flex-end;
      }
      
      .admin__filter-group {
        flex: 1;
        min-width: 150px;
      }
      
      .admin__filter-group label {
        display: block;
        font-size: 12px;
        font-weight: 500;
        color: #7f8c8d;
        margin-bottom: 6px;
      }
      
      .admin__select {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid var(--background-light);
        border-radius: 6px;
        font-size: 14px;
        color: #2c3e50;
        background-color: var(--background-dark)f;
      }
      
      .admin__filter-btn {
        padding: 10px 16px;
        background-color: #3498db;
        color: #fff;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
      }
      
      .admin__filter-btn:hover {
        background-color: #2980b9;
      }
      
      /* Results Section */
      .admin__results-section {
        background-color: var(--background-card);
        border-radius: 8px;
        padding: 24px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      }
      
      .admin__results-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }
      
      .admin__results-header h3 {
        font-size: 16px;
        font-weight: 600;
        margin: 0;
        color: #2c3e50;
      }
      
      .admin__results-actions {
        display: flex;
        gap: 8px;
      }
      
      .admin__action-btn {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        background-color: var(--background-card);
        border: 1px solid #dfe6e9;
        border-radius: 6px;
        font-size: 13px;
        color: #7f8c8d;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .admin__action-btn:hover {
        background-color: #ecf0f1;
        color: #2c3e50;
      }
      
      .admin__action-btn svg {
        margin-right: 6px;
      }
      
      /* Table Styles */
      .admin__table-container {
        overflow-x: auto;
        margin-bottom: 16px;
      }
      
      .admin__table {
        width: 100%;
        border-collapse: collapse;
      }
      
      .admin__table th,
      .admin__table td {
        padding: 12px 16px;
        text-align: left;
        border-bottom: 1px solid #ecf0f1;
      }
      
      .admin__table th {
        font-size: 12px;
        font-weight: 600;
        color: #7f8c8d;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .admin__table tbody tr:hover {
        background-color: var(--primary-color);
      }
      
      .admin__user-cell,
      .admin__video-cell {
        display: flex;
        align-items: center;
      }
      
      .admin__user-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #dfe6e9;
        margin-right: 12px;
      }
      
      .admin__video-thumbnail {
        width: 48px;
        height: 32px;
        border-radius: 4px;
        background-color: #dfe6e9;
        margin-right: 12px;
      }
      
      .admin__status {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
        text-transform: capitalize;
      }
      
      .admin__status--active {
        background-color: rgba(46, 204, 113, 0.1);
        color: #2ecc71;
      }
      
      .admin__status--inactive {
        background-color: rgba(149, 165, 166, 0.1);
        color: #95a5a6;
      }
      

      
      .admin__status--blocked {
        background-color: rgba(231, 76, 60, 0.1);
        color: #e74c3c;
      }
      
      .admin__status--under_review {
        background-color: rgba(52, 152, 219, 0.1);
        color: #3498db;
      }
      
      .admin__flags {
        display: inline-block;
        padding: 2px 6px;
        background-color: rgba(231, 76, 60, 0.1);
        color: #e74c3c;
        font-weight: 500;
        border-radius: 4px;
      }
      
      .admin__actions-cell {
        display: flex;
        gap: 8px;
      }
      
      .admin__row-action {
        width: 28px;
        height: 28px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background-color: #f5f7fa;
        color: #7f8c8d;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .admin__row-action:hover {
        background-color: #ecf0f1;
        color: #2c3e50;
      }
      
      .admin__row-action--danger {
        color: #e74c3c;
      }
      
      .admin__row-action--danger:hover {
        background-color: rgba(231, 76, 60, 0.1);
        color: #e74c3c;
      }
      
      /* Pagination */
      .admin__pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 4px;
        padding-top: 16px;
      }
      
      .admin__pagination-btn {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #dfe6e9;
        border-radius: 6px;
        background-color: #fff;
        color: #7f8c8d;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .admin__pagination-btn:hover:not(:disabled) {
        background-color: #f5f7fa;
        color: #3498db;
        border-color: #3498db;
      }
      
      .admin__pagination-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .admin__pagination-btn--active {
        background-color: #3498db;
        color: #fff;
        border-color: #3498db;
      }
      
      /* Loading, No Results and Start Search States */
      .admin__loading,
      .admin__no-results,
      .admin__start-search {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 64px 16px;
        text-align: center;
      }
      
      .admin__loading-spinner {
        width: 48px;
        height: 48px;
        border: 4px solid rgba(52, 152, 219, 0.1);
        border-left-color: #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 16px;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      .admin__no-results svg,
      .admin__start-search svg {
        color: #bdc3c7;
        margin-bottom: 16px;
      }
      
      .admin__no-results h3,
      .admin__start-search h3 {
        font-size: 18px;
        font-weight: 600;
        color: #2c3e50;
        margin: 0 0 8px;
      }
      
      .admin__no-results p,
      .admin__start-search p {
        font-size: 14px;
        color: #7f8c8d;
        margin: 0 0 16px;
      }
      
      .admin__search-again-btn {
        padding: 8px 16px;
        background-color: #f5f7fa;
        border: 1px solid #dfe6e9;
        border-radius: 6px;
        font-size: 14px;
        color: #7f8c8d;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .admin__search-again-btn:hover {
        background-color: #ecf0f1;
        color: #2c3e50;
      }
      
      /* Modal Styles */
      .admin__modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
      
      .admin__modal {
        width: 100%;
        max-width: 500px;
        background-color: var(--background-card);
        border-radius: 8px;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
        overflow: hidden;
      }
      
      .admin__modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 24px;
        border-bottom: 1px solid #ecf0f1;
      }
      
      .admin__modal-header h3 {
        font-size: 18px;
        font-weight: 600;
        margin: 0;
        color: #2c3e50;
      }
      
      .admin__modal-close {
        width: 36px;
        height: 36px;
        border: none;
        background: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #7f8c8d;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .admin__modal-close:hover {
        background-color: #f5f7fa;
        color: #2c3e50;
      }
      
      .admin__modal-content {
        padding: 24px;
      }
      
      .admin__modal-icon {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 24px;
      }
      
      .admin__modal-icon--warning {
        background-color: rgba(231, 76, 60, 0.1);
        color: #e74c3c;
      }
      
      .admin__modal-content p {
        font-size: 15px;
        color: #2c3e50;
        margin: 0 0 16px;
        text-align: center;
      }
      
      .admin__form-group {
        margin-bottom: 16px;
      }
      

      .admin__textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #dfe6e9;
        border-radius: 6px;
        font-size: 14px;
        min-height: 80px;
        resize: vertical;
      }
      
      .admin__modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 16px 24px;
        border-top: 1px solid #ecf0f1;
      }
      
      .admin__modal-btn {
        padding: 10px 16px;
        border: 1px solid #dfe6e9;
        border-radius: 6px;
        background-color: #fff;
        font-size: 14px;
        font-weight: 500;
        color: #7f8c8d;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .admin__modal-btn:hover {
        background-color: #f5f7fa;
        color: #2c3e50;
      }
      
      .admin__modal-btn--danger {
        background-color: #e74c3c;
        border-color: #e74c3c;
        color: #fff;
      }
      
      .admin__modal-btn--danger:hover {
        background-color: #c0392b;
        border-color: #c0392b;
      }
      

      
      /* Responsive Adjustments */
      @media (max-width: 768px) {
        .layout {
          flex-direction: column;
        }
        
        .content {
          margin-left: 0;
          padding: 16px;
        }
        
        .admin__stats-grid {
          grid-template-columns: 1fr;
          gap: 16px;
        }
        
        .admin__filter-options {
          flex-direction: column;
        }
        
        .admin__filter-group {
          width: 100%;
        }
        
        .admin__search-bar {
          flex-direction: column;
        }
        
        .admin__search-category {
          width: 100%;
          margin-right: 0;
          margin-bottom: 16px;
        }
      }
    </style>