# About Page Design Spec

## Context

The portfolio site for Dr. Himanshi Baid currently has a home page with condensed sections (hero, highlights, journey timeline, philosophy, awards, blog posts, contact CTA). The navigation already links to `/about` but the page does not exist yet. The about page provides the full professional narrative — expanding on who she is beyond the summary shown on the home page.

## Approach

Fully CMS-driven with fallback constants (matching the existing pattern used by `JourneySection`, `AwardsSection`, etc.). New CMS query for `hb_certifications` (collection and mapper already exist). All other data comes from existing `getSiteConfig()` and `getEducation()` queries.

---

## Route & Files

### Route
- `app/about/page.tsx` — async server component

### New Components (`components/sections/about/`)
- `AboutHeaderSection.tsx`
- `BioSection.tsx`
- `ClinicalExpertiseSection.tsx`
- `TeachingSection.tsx`
- `ResearchInterestsSection.tsx`
- `CertificationsSection.tsx`
- `MembershipsSection.tsx`

### Modified Files
- `lib/cms/queries.ts` — add `getCertifications()` query
- `lib/cms/cache-tags.ts` — add `certifications` tag (if not present)

### Reused Components
- `components/ui/Container.tsx`
- `components/ui/ScrollReveal.tsx`
- `components/ui/Button.tsx`
- `components/PageWrapper.tsx`

---

## Data Flow

```
app/about/page.tsx
  └── Promise.all([
        getSiteConfig(),        // bio_full, philosophy, profile_photo
        getCertifications(),    // NEW — from hb_certifications
        getEducation(),         // for credentials in header
      ])
```

Clinical expertise, teaching highlights, research interests, and professional memberships use **fallback constants** inside their components (same pattern as `FALLBACK_TIMELINE` in `JourneySection` and `FALLBACK_AWARDS` in `AwardsSection`).

---

## Sections (top to bottom)

### 1. AboutHeaderSection
- **Background:** white
- **Layout:** centered text
- **Content:**
  - Label: "About" in accent uppercase tracking (`text-xs font-bold uppercase tracking-[0.2em] text-accent`)
  - Name: "Dr. Himanshi Baid" in `font-serif text-4xl font-bold text-navy md:text-5xl`
  - Credentials: "MD Emergency Medicine | MRCEM (UK) | PDCC (Emergency Toxicology)" in `text-muted`
  - Role: "Assistant Professor, Emergency Medicine — HIMS, SRHU, Dehradun" in `text-muted`
  - Accent line divider below (`h-[2px] w-12 bg-accent mx-auto`)
- **Data:** static (could pull from `siteConfig.site_title` for name)
- **Animation:** `anim-fade-up` on load (same as home hero pattern)

### 2. BioSection
- **Background:** white
- **Layout:** `Container` with `size="narrow"` for comfortable reading width
- **Content:** Renders `siteConfig.bio_full` as markdown using `marked` (already a dependency)
- **Fallback:** Professional summary from CV if `bio_full` is empty
- **Typography:** `prose` styling — `text-base leading-relaxed text-muted`
- **Animation:** `ScrollReveal`

### 3. ClinicalExpertiseSection
- **Background:** `bg-background-alt`
- **Layout:** Section header (label + h2) + 2x3 grid of cards (responsive: 1 col mobile, 2 col sm, 3 col lg)
- **Header:** Label "Expertise" in accent, heading "Clinical Skills & Expertise"
- **Cards:** Each has a Lucide icon in a colored circle, title, and short description
- **Expertise areas (fallback constants):**
  1. Emergency Resuscitation — `Heart` icon — ACLS, ATLS, cardiac/trauma/pediatric
  2. Point-of-Care Ultrasound — `ScanLine` icon — Basic to advanced POCUS applications
  3. Emergency Toxicology — `FlaskConical` icon — PDCC-trained, poisoning management
  4. Trauma Management — `Ambulance` icon — Medical, surgical, and pediatric trauma
  5. Airway Management — `Wind` icon — Difficult airway, rapid sequence intubation
  6. Critical Care — `Activity` icon — ICU care, hemodynamic monitoring, shock management
- **Card style:** matches existing card patterns (`rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all`)
- **Animation:** `ScrollReveal` with stagger per card

### 4. TeachingSection
- **Background:** white
- **Layout:** Section header + two-column grid (stacks on mobile)
- **Header:** Label "Teaching" in accent, heading "Education & Mentorship"
- **Left column — Teaching highlights:**
  - Bullet list with icons (`CheckCircle` or similar)
  - Items: UG & PG teaching (lectures, bedside, simulation), Thesis co-guide (4 PG students), Board of Studies member, Quizmaster at national/institutional forums, Simulation-based education faculty
- **Right column — Mentorship card:**
  - Highlighted card with count "4" large, "PG Thesis Students Supervised" subtitle
  - Brief note about simulation-based education involvement
- **Animation:** `ScrollReveal`

### 5. ResearchInterestsSection
- **Background:** `bg-navy` (dark section, matching `PhilosophySection` pattern)
- **Layout:** Section header (white text) + flex-wrap pill/tag layout centered
- **Header:** Label in accent, heading "Research Interests" in white
- **Pills:** Rounded pill tags with `bg-white/10 text-white border border-white/20 px-4 py-2 rounded-full`
- **Interest areas:**
  - Emergency Medicine Education
  - Point-of-Care Ultrasound
  - Resuscitation Science
  - Hemodynamic Monitoring
  - Simulation-Based Education
  - Emergency Toxicology
- **Animation:** `ScrollReveal` with stagger per pill

### 6. CertificationsSection
- **Background:** `bg-background-alt`
- **Layout:** Section header + grid (1 col mobile, 2 col sm, 3 col lg)
- **Header:** Label "Credentials" in accent, heading "Certifications & Training"
- **Data:** `hb_certifications` from CMS via new `getCertifications()` query
- **Fallback constants:**
  1. BLS & ACLS — American Heart Association
  2. ATLS — American College of Surgeons
  3. BCME & CISP — National Medical Commission
  4. Simulation-Based Medical Education
  5. Pedistars FDP Level 1 — Simulation-based teaching
- **Card style:** compact cards with cert name (bold), issuing body (muted), year badge
- **Animation:** `ScrollReveal` with stagger

### 7. MembershipsSection
- **Background:** white
- **Layout:** Section header + horizontal flex or grid of membership items
- **Header:** Label "Affiliations" in accent, heading "Professional Memberships"
- **Items (fallback constants):**
  1. Royal College of Emergency Medicine (UK) — `RCEM`
  2. Academic Emergency Medicine Association — `AEME`
  3. Emergency Medicine Association — `EMA`
  4. Pedistars
- **Card style:** Simple cards with organization name and abbreviation/badge
- **Animation:** `ScrollReveal`

---

## New CMS Query: `getCertifications()`

Add to `lib/cms/queries.ts`:

```typescript
export const getCertifications = cache(async (): Promise<HBCertification[]> => {
  const fn = taggedCache(
    'cms-certifications',
    [CMS_TAGS.certifications],  // add to cache-tags.ts
    async () => {
      const data = await safeCmsQuery(
        () =>
          directusClient.request(
            readItems('hb_certifications', {
              sort: ['sort'],
              limit: -1,
            }),
          ),
        [],
      )
      return mapArray(data, mapCertification)
    },
  )
  return fn()
})
```

`CMS_TAGS.certifications` already exists in `cache-tags.ts` — no changes needed there.

---

## SEO & Metadata

Export `metadata` from `app/about/page.tsx`:

```typescript
export const metadata = {
  title: 'About | Dr. Himanshi Baid',
  description: 'Emergency Medicine physician, academic faculty, and researcher...',
}
```

---

## Verification

1. `yarn dev` — navigate to `/about`, confirm all sections render
2. Scroll through — confirm `ScrollReveal` animations trigger correctly
3. Check responsive: mobile (375px), tablet (768px), desktop (1280px)
4. Check with CMS data disconnected — fallback content renders for all sections
5. Check bio markdown rendering with `bio_full` from CMS
6. Verify navbar "About" link shows active state on `/about`
7. Run `yarn lint` and `yarn type-check` — no errors
8. Run existing tests — no regressions
