# 2SmartHome — Tracking Plan

- **Tools:** GA4 (`G-GS31FY434F`) + Vercel Analytics, both behind Consent Mode v2 (RGPD).
- **Primary goal:** generate qualified budget/visit requests. Conversions = form submit, WhatsApp, phone call.
- **Last updated:** 2026-06-26

## Events

Every custom event fires to **both** Vercel (`track`) and GA4 (`gtag('event', ...)`). The
delegated listener in `src/layouts/Layout.astro` instruments anchor-based events sitewide (ES + CA).

| Event | Properties | Trigger | Conversion? |
|---|---|---|---|
| `contact_form_submitted` | `lang` | Successful Web3Forms submit (`contacto.astro` + CA) | ✅ Yes |
| `whatsapp_click` | `page` | Floating WhatsApp button | ✅ Yes |
| `phone_click` | `page` | Any `tel:` link click | ✅ Yes |
| `contact_cta_clicked` | `page`, `text` | Link to `/contacto` from a non-contact page | ⬜ No (funnel/intent) |
| `email_click` | `page` | Any `mailto:` link click | ⬜ No (micro-conversion) |

## GA4 setup — mark conversions (Key Events)

Do this once in the GA4 UI so calls/WhatsApp/form-submits count as conversions and can be
imported into Google Ads.

1. **Send some test events first** so GA4 knows the event names exist:
   - Run `npm run dev`, open the site, **accept the cookie banner** (consent must be granted or
     GA4 receives nothing), then click the WhatsApp button, a phone link, and submit the form.
   - Verify in **GA4 → Admin → DebugView** (enable debug via the *Google Analytics Debugger*
     Chrome extension or `?debug_mode=1`). You should see `phone_click`, `whatsapp_click`,
     `contact_cta_clicked`, `email_click`, `contact_form_submitted` arrive with their parameters.
2. **Mark as Key Events:** GA4 → **Admin → Data display → Events**. New events can take up to
   24h to appear in this list. When they do, toggle **"Mark as key event"** for:
   `contact_form_submitted`, `whatsapp_click`, `phone_click`.
   - Faster alternative: **Admin → Key events → New key event**, type the exact name
     `phone_click` (etc.) manually — no 24h wait.
3. **Register custom dimensions** (so you can segment by them in reports): GA4 →
   **Admin → Custom definitions → Create custom dimension**, scope = *Event*, for:
   - `page` (event parameter `page`)
   - `lang` (event parameter `lang`)
   - `text` (event parameter `text`)
   Without this, the parameters are collected but won't be selectable as report dimensions.
4. **(Optional) Google Ads:** if you run Ads, link the GA4 property under
   **Admin → Product links → Google Ads**, then import the three key events as conversions.

## Vercel Analytics

Custom events appear automatically under the project's **Analytics → Events** tab — no config
needed. Use it to cross-check GA4 (Vercel is not consent-gated the same way, so counts will
differ from GA4, which only fires after consent).

## Notes / gaps

- GA4 only receives events **after** the user accepts cookies (Consent Mode default = denied).
  Expect GA4 conversion counts to undercount real calls/clicks from users who never accept.
- `phone_click` fires on the click, not on a completed call — it measures intent, which is the
  best a website can capture for tel: links.
