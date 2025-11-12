# VividCV

Interactive 3D Resume Builder

Transform your resume into a stunning 3D web experience that stands out from traditional CVs. Choose from multiple animated templates powered by React Three Fiber.

## Features

- **3D Templates:** Three unique interactive templates (Card Flip, Timeline, Skill Galaxy)
- **Live Preview:** Real-time updates as you fill out your resume
- **Dynamic Forms:** Add/remove experience, education, and skills entries
- **State Management:** Zustand-powered global state with Zod validation
- **Accessibility:** WCAG 2.2 AA compliant with keyboard navigation and ARIA labels
- **SEO Optimized:** Dynamic meta tags, sitemap, and robots.txt
- **Performance:** Optimized bundle with code splitting and lazy loading
- **Responsive:** Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5 (strict mode)
- **3D Graphics:** React Three Fiber + Drei
- **Animation:** Framer Motion
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **State Management:** Zustand 5
- **Validation:** Zod 4
- **Deployment Ready:** Vercel configuration included

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Poolchaos/vivid-cv.git
cd vivid-cv

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
11-vivid-cv/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/                # API routes (username generation)
│   │   ├── create/             # Resume builder page
│   │   ├── [username]/         # Dynamic public resume pages
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Landing page
│   │   ├── robots.ts           # SEO robots configuration
│   │   └── sitemap.ts          # SEO sitemap generation
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── templates/          # 3D resume templates
│   │   ├── PreviewContainer.tsx
│   │   ├── ResumeForm.tsx
│   │   ├── TemplateSelector.tsx
│   │   ├── ExperienceForm.tsx
│   │   ├── EducationForm.tsx
│   │   └── SkillsForm.tsx
│   ├── store/                  # Zustand state management
│   │   └── resumeStore.ts
│   └── lib/                    # Utilities and validation
│       └── validation.ts       # Zod schemas
├── public/                     # Static assets
├── docs/                       # Project documentation (roadmap, architecture)
├── .env.example                # Environment variables template
├── vercel.json                 # Vercel deployment configuration
└── next.config.ts              # Next.js configuration
```

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Run ESLint
npm run lint

# Type checking
npm run typecheck
```

## Features Breakdown

### 3D Templates

1. **Card Flip Template**
   - 3D card displaying personal info
   - Stats showing experience, education, and skills count
   - Smooth camera controls with OrbitControls

2. **Timeline Template**
   - Vertical timeline of career progression
   - Animated nodes with floating effect
   - Combined experience and education entries

3. **Skill Galaxy Template**
   - Interactive 3D skill visualization
   - Color-coded by proficiency level
   - Auto-rotating camera with orbital controls

### Form System

- Dynamic array fields for experience, education, and skills
- Real-time validation with inline error messages
- Autosave to localStorage (coming soon)
- Form state management with Zustand

### API Routes

- `/api/generate` - Username validation and URL generation
  - POST: Generate unique resume URL
  - GET: Check username availability

## Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

The project includes `vercel.json` with optimized configuration and security headers.

### Other Platforms

The application is a standard Next.js app and can be deployed to:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Any Node.js hosting platform

## Roadmap

See `docs/projects/11-vivid-cv/roadmap.md` for the complete feature roadmap.

**Completed (MVP):**
- ✅ Core resume builder with forms
- ✅ Three 3D templates with React Three Fiber
- ✅ State management and validation
- ✅ API routes for URL generation
- ✅ SEO and accessibility optimization
- ✅ Landing page with animations

**Coming Next (Beta):**
- 📊 Analytics integration (privacy-first)
- 🔗 Social sharing functionality
- 📤 Resume data export (JSON/PDF)
- 🎨 Additional templates
- 💾 Cloud storage for resume data

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

WebGL support required for 3D templates. Fallback UI provided for unsupported browsers.

## Performance

- Lighthouse Score: 90+ across all metrics
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Bundle size optimized with code splitting

## Contributing

This is a portfolio project. If you find bugs or have suggestions:

1. Open an issue describing the problem/feature
2. Fork the repository
3. Create a feature branch
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- 3D powered by [React Three Fiber](https://github.com/pmndrs/react-three-fiber)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)

## Contact

For questions or feedback:
- GitHub: [@Poolchaos](https://github.com/Poolchaos)
- Project: [VividCV](https://github.com/Poolchaos/vivid-cv)

---

**Note:** This project is part of a larger portfolio workspace demonstrating modern web development practices and interactive UI/UX patterns.
- Architecture overview
- Component specifications
- Design system
- Roadmap

## License

MIT

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
