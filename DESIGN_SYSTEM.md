# Jiffy Crew Rider App — Design System
> Complete design token reference for developers building the rider app.
> All values are exact — do not approximate. When in doubt, reference the Paper design file.

---

## 1. Foundation

### Font
- **Family**: `Onest` (Google Font)
- **Fallback**: `system-ui, sans-serif`
- **No other fonts used anywhere in the app**

### Device Frame
- **Width**: 390px (iPhone 14 / 15)
- **Height**: 844px
- **Status bar**: 48px reserved at top
- **Safe area bottom**: 16px padding

### Spacing (strict values)
| Token | Value | Usage |
|-------|-------|-------|
| `space-xs` | 4px | Inline gaps, icon margins |
| `space-sm` | 8px | Between related items, badge gaps |
| `space-md` | 12px | Card internal section gaps |
| `space-base` | 16px | Screen margins L/R, card padding, section gaps |
| `space-lg` | 24px | Hero card internal padding, major section gaps |
| `space-xl` | 32px | Between major screen sections |
| `space-2xl` | 48px | Status bar height, large separators |

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 6px | Status badges, checkbox |
| `radius-md` | 8px | Info banners, tag chips |
| `radius-lg` | 12px | Cards, hero cards, input fields, tab chips |
| `radius-pill` | 28px | Primary/slide buttons |
| `radius-circle` | 50% | Phone button, step indicators, route numbers |
| `radius-sheet` | 24px | Bottom sheet top corners |

---

## 2. Color System

### Semantic Colors (primary)
| Token | Hex | Usage | Never |
|-------|-----|-------|-------|
| `blue` | `#2563EB` | CTAs, active states, pickup phase, selected borders, links | Decoration |
| `green` | `#00A344` | Earnings, online, ready, success, phone button | Non-money items |
| `orange` | `#FF6D00` | COD, timer, urgency, return phase, ETA | Static info |
| `red` | `#D92D20` | Errors, overdue, penalties, cancelled, destructive actions | Warning-only content |
| `purple` | `#7C4DFF` | Exchange, bonus, rewards | Regular delivery screens |

### Container Backgrounds (tinted)
| Token | Hex | Usage |
|-------|-----|-------|
| `blue-container` | `#F0F4FF` | At Store hero card, blue info banners |
| `green-container` | `#EDF7ED` | Delivery hero, earnings card, success hero, order count badge |
| `orange-container` | `#FFF6ED` | Return hero, timer warnings, ONGOING badge bg |
| `red-container` | `#FEF2F2` | Overdue hero, error banners, cancel banners, penalty warnings |
| `purple-container` | `#F0EEFF` | Exchange hero, exchange info banners |

### Neutrals
| Token | Hex | Usage |
|-------|-----|-------|
| `on-surface` | `#1A1A2E` | Primary text, headings, dark fills |
| `on-surface-variant` | `#71717A` | Secondary text, labels, captions, placeholder |
| `placeholder` | `#B0B5BD` | Input placeholders only |
| `outline` | `#E0E0E0` | 1px borders, dividers, unselected states |
| `input-bg` | `#F3F3F5` | Input field backgrounds, pending step bg |
| `card-bg` | `#FBFBFB` | Card backgrounds, info sections |
| `surface` | `#FFFFFF` | Screen background, bottom sheet bg |
| `scrim` | `rgba(0,0,0,0.75)` | Bottom sheet overlay / dimmed background |

### Phase Color Mapping
| Phase | Hero BG | Hero Text | When |
|-------|---------|-----------|------|
| **Pickup (At Store)** | `#F0F4FF` | `#2563EB` | Rider at store picking up |
| **Delivery (At Customer)** | `#EDF7ED` | `#00A344` | Rider delivering to customer |
| **Overdue** | `#FEF2F2` | `#D92D20` | Past delivery deadline |
| **Return** | `#FFF6ED` | `#FF6D00` | Return pickup flow |
| **Exchange** | `#F0EEFF` | `#7C4DFF` | Exchange flow |

---

## 3. Typography

All text uses `font-family: Onest, sans-serif`.

| Role | Size | Weight | Line-height | Tracking | Usage |
|------|------|--------|-------------|----------|-------|
| Hero Number | 40px | 700 | 48px | 0 | Timer countdown, hero earnings. **Max 1 per screen.** |
| Large Value | 28px | 700 | 36px | 0 | Stat card values (₹80, 4.2 km) |
| Stat Value | 24px | 700 | 32px | 0 | Medium stat numbers (timer in cards) |
| Screen Title | 18px | 600 | 24px | 0 | Header titles |
| Card Name | 17px | 600 | 22px | 0 | Customer name, picker name |
| Button Text | 16px | 600 | 20px | 0 | CTA labels, slide button text |
| Section Heading | 15px | 600 | 20px | 0 | Route names, sub-headings |
| Hero Label | 14px | 600 | 20px | 0 | Hero card label ("Before Time Delivery", "Pickup in") |
| Body | 14px | 400 | 20px | 0 | Descriptions, instructions |
| Value | 13px | 600 | 16px | 0 | Order ID values, amounts, item names |
| Caption | 13px | 400 | 18px | 0 | Info banners, secondary descriptions |
| Step Label | 12px | 500 | 16px | 0 | Step indicator text, address, quantities |
| Overline | 11px | 500 | 14px | 0.5px | CUSTOMER, ORDER ID, PAYMENT — always uppercase |
| Badge | 11px | 600 | 14px | 0.5px | READY, ONGOING, CANCELLED — always uppercase |
| Small Badge | 10px | 600 | 14px | 0.3px | Compact badge text in route cards |

### Typography Rules
- Nothing below 11px
- Body text minimum 14px
- Bold (700) = hero numbers only. When everything is bold, nothing is bold.
- Medium (600) = titles, labels, buttons, values
- Regular (400) = body text, descriptions, captions
- Overline labels: always `text-transform: uppercase; letter-spacing: 0.5px`
- Currency values: use `white-space: nowrap` to prevent ₹ splitting from number

---

## 4. Components

### 4.1 Slide-to-Confirm Button (Primary CTA)
Used for **all critical rider actions** — delivering, scanning, confirming, completing.

```
Height: 56px
Border-radius: 28px (pill)
Background: #2563EB (blue) or #D92D20 (red/destructive)
Layout: position: relative

Thumb (left):
  - position: absolute; left: 4px
  - 48×48px circle, bg: white
  - Arrow icon inside: → stroke color matches button bg

Label (center):
  - "Slide to [Action]"
  - 16px / 600 / white
  - margin-left: 24px (offset for thumb)

Chevron hints (right):
  - position: absolute; right: 16px
  - Two › chevrons, opacity: 0.4, white
```

**When to use**: Deliver, Scan, Confirm, Complete, Initiate Return
**Red variant**: Initiate Return, destructive actions — use `#D92D20`

### 4.2 Action Button (Popup CTA)
Used in **bottom sheet popups** for time-sensitive accept/decline.

```
Height: 56px
Border-radius: 28px
Background: #2563EB
Content: → arrow icon + "Accept [Type]" text
Text: 16px / 600 / white
```

### 4.3 Secondary Button (Outlined)
```
Height: 48px
Border-radius: 28px
Border: 1.5px solid #E0E0E0
Text: 14px / 500 / #71717A
```

### 4.4 Text Button (Decline)
```
Height: 40px (touch target)
No border, no background
Text: 14px / 500 / #71717A, centered
```

### 4.5 Hero Timer Card
The dominant visual element on every full-screen flow.

```
Margin: 0 16px
Border-radius: 12px
Padding: 24px 16px
Background: phase color container (see Phase Color Mapping)
Layout: flex column, align-items: center, gap: 4px

Content (top to bottom):
  1. Label — 14px/600, phase color ("Before Time Delivery", "Pickup in")
  2. Timer — 40px/700, phase color ("05:23", "00:15")
  3. Subtitle — 14px/600, #1A1A2E ("Smile & greet the customer!")
  4. Secondary — 13px/400, #71717A ("You are almost there")
```

### 4.6 Grey Info Card
The universal container for customer, order, and detail information.

```
Margin: 16px
Background: #FBFBFB
Border-radius: 12px
Padding: 16px
Layout: flex column, gap: 12px

Sections separated by: 1px #E0E0E0 divider

Customer section:
  - CUSTOMER overline (11px/500/#71717A uppercase)
  - Name (17px/600/#1A1A2E)
  - Address (13px/400/#71717A)
  - Phone button right-aligned (44px green circle)

Order details row:
  - Horizontal flex, gap: 16px
  - Each: overline label + value below
  - ORDER ID (13px/600/#1A1A2E)
  - PAYMENT: COD in orange, Prepaid in blue
  - AMOUNT: #1A1A2E with ₹ prefix
  - ITEMS: count
```

### 4.7 Info Banner
```
Margin: 0 16px (or 16px for full margin)
Background: #F0F4FF (blue) or #FEF2F2 (red) or #FFF6ED (orange) or #F0EEFF (purple)
Border-radius: 8px
Padding: 12px 16px
Layout: flex row, align-items: flex-start, gap: 8px

Icon: 16×16 SVG circle with (i), stroke matches banner color
Text: 13px/400/#1A1A2E, line-height: 18px
```

### 4.8 Status Badges
```
READY:     border: 1px solid #00A344, text: #00A344, 11px/600
ONGOING:   bg: #FFF6ED, border: 1px solid #FF6D00, text: #FF6D00, 11px/600
CANCELLED: border: 1px solid #D92D20, text: #D92D20, 11px/600
Order count: bg: #EDF7ED, text: #00A344, 12px/600, with green dot
Timer:     border: 1.5px solid #FF6D00 (or #7C4DFF), text matches, 12px/600

All badges: padding 4px 10px, border-radius: 6px (status) or 12px (count/timer)
```

### 4.9 Phone Button
```
Size: 44×44px (or 40×40px compact)
Border-radius: 50%
Background: #00A344
Icon: white phone SVG, 20×20 (or 18×18 compact)
```

### 4.10 Step Indicator
```
Layout: flex row, items centered, full width

Active step:   24px circle, bg: #2563EB, number: 12px/600/white
Completed step: 24px circle, bg: #2563EB, checkmark SVG: white
Pending step:  24px circle, bg: #F3F3F5, number: 12px/500/#71717A

Connector: height: 2px, flex: 1, margin: 0 8px
Active connector: bg: #2563EB
Pending connector: bg: #E0E0E0

Labels: 12px/500 (or 600 for active), color matches step state
```

### 4.11 Checkbox
```
Size: 22×22px
Border-radius: 6px

Checked: bg: #00A344, white checkmark SVG inside
Unchecked: border: 2px solid #E0E0E0, no fill
```

### 4.12 Radio Button
```
Size: 22×22px, border-radius: 50%

Selected: border: 2px solid #2563EB, inner 12px circle bg: #2563EB
  Container: bg: #F0F4FF, border: 2px solid #2563EB, radius: 12px
Unselected: border: 2px solid #E0E0E0
  Container: bg: #FBFBFB, border: 1.5px solid #E0E0E0, radius: 12px
```

### 4.13 Route Indicator (Pickup → Drop)
```
Container: bg: #FBFBFB, radius: 12px, padding: 16px

Pickup dot: 10px circle, border: 2.5px solid #2563EB (hollow)
Connector: width: 2px, height: 24px, bg: #E0E0E0, margin-left: center of dot
Drop dot: 10px circle, bg: #00A344 (filled)

Pickup label: 11px/500 uppercase, #FF6D00 or #2563EB
Drop label: 11px/500 uppercase, #00A344
Names: 14px/600/#1A1A2E
```

### 4.14 Order Tab Chips
```
Active: bg: #2563EB, text: 13px/600/white, padding: 8px 16px, radius: 8px
Inactive: bg: #FBFBFB, border: 1px solid #E0E0E0, text: 13px/500/#71717A
```

---

## 5. Screen Patterns

### 5.1 Full Screen (Delivery / At Store / Return / Exchange)
```
[Status bar — 48px]
[Header — ← back + 18px/600 title + ? help icon]
[Step indicator — optional, for multi-step flows]
[Hero timer card — centered, phase-colored]
[Grey card — customer + order details combined]
[Content — items checklist, instructions, payment options]
[Info banner — #F0F4FF with (i) icon]
[flex spacer]
[Slide CTA — 56px, pinned to bottom with 16px padding]
```

### 5.2 Bottom Sheet Popup (New Order / Return Accept / Exchange Accept / OTP / En-route)
```
[Dark scrim — rgba(0,0,0,0.75)]
[Status bar — white text on dark]
[flex spacer — pushes sheet down]
[White bottom sheet — 24px top radius]
  [Drag handle — 40×4px, #E0E0E0, centered]
  [Title + timer badge]
  [Earn + Distance stat cards — side by side]
  [Route card — Pickup → Drop with dots + connector]
  [Order details row — Order ID, Payment/Type, Weight]
  [Tags — Fresh, VIP, Heavy chips (optional)]
  [Slide to Accept CTA or Action CTA + Decline text]
```

### 5.3 Success Screen (Delivery Complete / Return Complete)
```
[Status bar — 48px]
[Title — centered, 18px/600, no back arrow]
[Green hero card — checkmark circle + "Order Delivered!" + ₹ earnings]
[Stats + Breakdown grey card — DISTANCE/TIME/RATING row, then key-value breakdown]
[Next order grey card — optional, blue circle number + customer + ETA]
[flex spacer]
[Navigation CTA — regular blue button, not slide]
```

### 5.4 Camera Screen (Scan QR / Take Photo)
```
[Status bar]
[Header — ← At Store + ?]
[Step indicator — current step active]
[Camera viewfinder area — centered]
[Instructions — title + subtitle, centered]
[Info banner — contextual help]
[Split CTA — Back/Retake (outlined) + Scan/Submit (blue)]
```

---

## 6. Interaction Patterns

### Slide-to-Confirm
- All critical actions use slide buttons to prevent accidental taps
- Rider drags white thumb circle from left to right
- Text says "Slide to [Verb]" — Deliver, Scan, Confirm, Complete, Initiate, Accept
- Red slide for destructive: Initiate Return
- Regular blue button for: Accept Order in popups (speed matters), navigational buttons

### Bottom Sheet
- Dark overlay covers scanning/map screen behind
- Sheet slides up from bottom with 24px top radius
- Drag handle at top (40×4px pill, #E0E0E0)
- Content inside uses same grey card patterns
- Accept + Decline pattern at bottom

### Timer UX
- Hero timer is always the dominant element
- Green = on time (delivery phase)
- Orange = time-sensitive (return phase, QR expiry)
- Red = overdue (past deadline)
- Timer counts down in real-time
- QR codes expire after 5 minutes with "Regenerate QR" option

---

## 7. Key Rules (Anti-Slop Checklist)

- [ ] Font is Onest everywhere — no system fonts
- [ ] Card background is `#FBFBFB`, never white or grey
- [ ] Card radius is always 12px
- [ ] Button radius is always 28px (pill)
- [ ] Slide buttons on all critical actions — never regular tap for deliver/scan/confirm
- [ ] Overline labels are always 11px/500/uppercase with letter-spacing
- [ ] ₹ amounts use `white-space: nowrap` — never let ₹ split from number
- [ ] Max 1 hero number (40px/700) per screen
- [ ] Phase colors are consistent — blue for pickup, green for delivery, orange for return, red for overdue, purple for exchange
- [ ] Phone button is always 44px green circle with white icon
- [ ] Dividers are always 1px `#E0E0E0`
- [ ] Screen margins are always 16px left/right
- [ ] No gradients, no shadows except card subtle elevation
- [ ] Info banners use `#F0F4FF` blue bg (not the semantic color of the flow)
- [ ] Bottom sheets use `rgba(0,0,0,0.75)` scrim, 24px top radius
- [ ] Status badges use colored border, not filled background (except ONGOING which has orange bg fill)
