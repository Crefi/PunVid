# 🎥 Svelte PunVid App (Frontend)

A modern Svelte 5-based frontend for video sharing and file management. Features include:

- 🔐 Authentication system
- 📤 File/video uploading
- 👤 User profiles
- 🛠️ Admin dashboard
- � Responsive design

Built with SvelteKit's latest file-based routing and component architecture.

---

## 🚀 Tech Stack

| Category       | Technologies                          |
|----------------|--------------------------------------|
| **Framework**  | Svelte 5 (with Runes)            |
| **Styling**    | SCSS (global + modular)              |
| **Routing**    | File-based routing                   |
| **State**      | Svelte stores                        |
| **Build**      | Vite                                 |

---

## 📂 Project Structure

```bash
src/
├── routes/
│   ├── +layout.svelte          # Root layout (sidebar + auth state)
│   ├── +page.svelte            # Auth page (login/register)
│   ├── home/                   # Landing page
│   │   └── +page.svelte        
│   ├── upload/                 # File upload interface
│   │   └── +page.svelte        
│   ├── my-videos/              # User video gallery
│   │   └── +page.svelte        
│   ├── my-files/               # User file manager
│   │   └── +page.svelte        
│   ├── my-profile/             # Profile settings
│   │   └── +page.svelte        
│   ├── admin/                  # Admin dashboard
│   │   └── +page.svelte        
│   └── styles/
│       └── global.scss         # Global SCSS styles
│
├── lib/
│   ├── components/
│   │   ├── Profile.svelte      # Reusable profile card
│   │   └── VideoCard.svelte    # Video thumbnail component
│   ├── layouts/
│   │   └── Sidebar.svelte      # Navigation sidebar
│   └── utils/
│       └── auth.js             # Authentication helpers
│
└── app.html                    # Main HTML template
```

### 🛠️ Development Guide
Prerequisites
Node.js 18+

npm 9+

Git (for version control)

### 🏁 Getting Started

# 1. Clone repository

```bash

git clone https://github.com/Crefi/PunVid.git
cd frontend

# 2. Install dependencies
npm install

# 3. Start dev server (with auto-open)
npm run dev --open

```

### 🏗️ Build Commands
### Command	Description
```bash
npm run dev	# Start development server
npm run build	# Production build
npm run preview	# Preview production build locally
npm run check	# Run Svelte and TypeScript checks

```

###  📜 License
MIT License - see LICENSE.md for details.

