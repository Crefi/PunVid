<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  
  let email = "";
  let password = "";
  let isLogin = true;
  let loading = false;
  let showPunpunPasswordTip = false;
  
  // Form validation
  let emailError = '';
  let passwordError = '';
  
  function toggleForm() {
    isLogin = !isLogin;
    // Reset fields when switching forms
    email = "";
    password = "";
    emailError = "";
    passwordError = "";
  }
  
  function validateForm() {
    let valid = true;
    
    // Email validation
    if (!email) {
      emailError = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      emailError = 'Please enter a valid email';
      valid = false;
    } else {
      emailError = '';
    }
    
    // Password validation
    if (!password) {
      passwordError = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      passwordError = 'Password must be at least 6 characters';
      valid = false;
    } else {
      passwordError = '';
    }
    
    return valid;
  }
  
  function handlePasswordFocus() {
    if (!isLogin) { // Only show when registering
      showPunpunPasswordTip = true;
    }
  }
  
  function handlePasswordBlur() {
    showPunpunPasswordTip = false;
  }
  
  function handleSubmit() {
    if (validateForm()) {
      loading = true;
      
      // Simulate API call
      setTimeout(() => {
        loading = false;
        // Handle login/register logic here
      }, 1500);
    }
  }
</script>

<div class="auth">
  <!-- Background image with reduced opacity -->
  <div class="background-punpun-sit">
    <img src="punpun-sit.jpg" alt="Background" />
  </div>
  
  {#if showPunpunPasswordTip && !isLogin}
    <div class="punpun-password-tip" transition:fade={{duration: 200}}>
      <div class="punpun-password-tip__bubble">
        Punpun recommends choosing a strong, unique password that you don't use anywhere else!
      </div>
      <img src="punpun.png" alt="Punpun password tip" />
    </div>
  {/if}
  
  <div class="auth-container">
    <div class="auth-header">
      <h1 class="auth__title">Pun<span class="highlight">Vid</span></h1>
      <div class="title-punpun">
        <img src="punpun-eyes.png" alt="Punpun sitting" />
      </div>
    </div>

    <div class="form-container">
      <h2 class="form-title">{isLogin ? 'Login' : 'Register'}</h2>
      
      <form on:submit|preventDefault={handleSubmit}>
        <div class="input-group">
          <input 
            type="email" 
            placeholder="Email" 
            bind:value={email}
            class="form-input"
            class:input-error={emailError}
          />
          {#if emailError}
            <span class="error-message">{emailError}</span>
          {/if}
        </div>
        
        <div class="input-group">
          <input 
            type="password" 
            placeholder="Password" 
            bind:value={password}
            class="form-input"
            class:input-error={passwordError}
            on:focus={handlePasswordFocus}
            on:blur={handlePasswordBlur}
          />
          {#if passwordError}
            <span class="error-message">{passwordError}</span>
          {/if}
        </div>
        
        <button type="submit" class="submit-button" disabled={loading}>
          {#if loading}
            <span class="loader"></span>
          {:else}
            {isLogin ? 'Login' : 'Register'}
          {/if}
        </button>
      </form>
      
      <p class="toggle-link" on:click={toggleForm}>
        {isLogin ? 'Need an account? Register here.' : 'Already have an account? Login here.'}
      </p>
    </div>
  </div>
  
  <!-- Footer moved outside auth-container -->
  <footer class="site-footer">
    <div class="footer-links">
      <a href="https://discord.gg/w7Sk22XGfG" target="_blank" class="footer-link">
        <span class="icon discord-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="20" height="20" fill="currentColor">
            <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"/>
          </svg>
        </span>
        Join our Discord
      </a>
      <a href="mailto:crefitv@gmail.com" class="footer-link">
        <span class="icon mail-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" fill="currentColor">
            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
          </svg>
        </span>
        Contact Owner
      </a>
    </div>
    <div class="footer-copyright">
      ©2025 PunVid. All rights reserved.
    </div>
  </footer>
</div>

<style lang="scss">
  @use "sass:color"; // For color functions like `color.adjust`
  $primary-color: #FF6B6B;
  $accent-color: #4ECDC4;

  .auth {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: var(--background-dark);
    font-family: 'Space Mono', monospace;
    overflow: hidden;
  }

  .background-punpun-sit {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: blur(2px) brightness(0.6) contrast(0.9);
      opacity: 0.1;
    }
  }

  .auth-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 440px;
    z-index: 2;
    padding: 1rem;
  }

  .auth-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-bottom: 2rem;
    width: 100%;
  }

  .auth__title {
    font-family: 'VT323', monospace;
    font-size: 4rem;
    font-weight: normal;
    letter-spacing: 3px;
    margin-top: -7rem; /* Keep title up while using flexbox */
    text-shadow: 4px 4px 0px rgba(0, 0, 0, 0.7);
    color: var(--text-primary);
    position: relative;
    
    .highlight {
      color: var(--primary-color);
    }
  }

  .title-punpun {
    position: absolute;
    left: calc(100% - 120px); /* Adjust the 100px value as needed */
    top: -7rem;
    
    img {
      max-width: 70px;
      height: auto;
      filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5));
    }
  }

  .form-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
  }

  .form-title {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
    font-family: 'VT323', monospace;
    letter-spacing: 1px;
    text-align: center;
  }

  form {
    width: 100%;
  }

  .input-group {
    margin-bottom: 1.25rem;
    width: 100%;
  }

  .form-input {
    width: 100%;
    padding: 0.85rem 1.25rem;
    background-color: rgba(45, 45, 45, 0.5);
    color: var(--text-primary);
    border: 1px solid var(--border-light);
    border-radius: 6px;
    font-size: 1rem;
    transition: all 0.3s ease;
    font-family: 'Space Mono', monospace;

    &::placeholder {
      color: var(--text-tertiary);
    }

    &:focus {
      outline: none;
      border-color: var(--accent-color);
      box-shadow: 0 0 0 2px rgba(78, 205, 196, 0.2);
    }
  }

  .input-error {
    border-color: var(--status-error);
  }

  .error-message {
    display: block;
    font-size: 0.85rem;
    color: var(--status-error);
    margin-top: 0.5rem;
    padding-left: 0.5rem;
  }

  .submit-button {
    width: 100%;
    max-width: 200px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0.75rem;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0.5rem auto 0;
    text-align: center;
    display: block;
    font-family: 'VT323', monospace;
    letter-spacing: 1px;
    text-transform: uppercase;

    &:hover {
      background-color: color.adjust($primary-color, $lightness: -10%);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }

    &:disabled {
      background-color: var(--text-tertiary);
      cursor: not-allowed;
      transform: none;
    }
  }

  .loader {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
  }

  .toggle-link {
    margin-top: 1.5rem;
    font-size: 0.95rem;
    color: var(--text-secondary);
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      color: var(--accent-color);
      text-decoration: underline;
    }
  }

  .punpun-password-tip {
    position: fixed;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 10;
    pointer-events: none;

    img {
      max-width: 120px;
      height: auto;
      margin-top: 10px;
      filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5));
    }

    &__bubble {
      background-color: var(--background-card);
      color: var(--text-primary);
      padding: 14px 18px;
      border-radius: 12px;
      position: relative;
      margin-right: 20px;
      border: 1px solid var(--border-light);
      max-width: 200px;
      font-size: 0.95rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      
      &:after {
        content: '';
        position: absolute;
        right: -10px;
        bottom: 20px;
        width: 0;
        height: 0;
        border-left: 10px solid var(--background-card);
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
      }
    }
  }

  /* Footer Styles -  */
  .site-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(20, 20, 20, 0.7);
    backdrop-filter: blur(5px);
    padding: 1rem 0;
    z-index: 5;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
  }

  .footer-link {
    display: flex;
    align-items: center;
    color: var(--text-secondary);
    font-size: 0.9rem;
    text-decoration: none;
    transition: all 0.2s ease;
    
    &:hover {
      color: var(--accent-color);
      transform: translateY(-2px);
    }
    
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.5rem;
    }
  }

  .footer-copyright {
    font-size: 0.8rem;
    color: var(--text-tertiary);
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>