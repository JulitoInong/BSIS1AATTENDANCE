# BSIS 1-A Attendance — Professional PWA (Local-First)

- 46-student final roster for BSIS 1-A.
- Automatic date based on the phone/device local date.
- Automatic day rollover every 30 seconds and when the app regains focus.
- QR scanning with automatic rear-camera preference, camera start/stop, and manual entry.
- Regular attendance stays on `index.html`: one scan records one daily present/check-in, unchanged from the original flow.
- Optional four-session attendance is on `session-attendance.html`, with its own `session-roster.html` and separate local records.
- In the session attendance page, select the slot before scanning:
- Morning time-in is present from 8:00–8:29 AM and late from 8:30 AM onwards; afternoon time-in is present from 1:00–1:29 PM and late from 1:30 PM onwards.
- Morning time-out is on time from 11:30 AM–12:00 PM; afternoon time-out is on time from 4:30–5:00 PM. Scans outside the selected session's expected time are still recorded and marked early or late.
- Duplicate prevention per student and session; attendance records remain stored by local date.
- Professional mobile-first UI with summary cards.
- Material 3-inspired light and dark themes with a header toggle; the selected theme is saved locally and shared across app pages.
- Branded launch splash with an animated loading indicator, shown only when the installed PWA opens from the home screen; internal page navigation skips it. Includes a short timeout fallback and reduced-motion support.
- The QR scanner library loads only when the camera is started, keeping the initial attendance page lighter on mobile.
- Each mode has its own attendance list and searchable roster page; session records show time and status per slot.
- CSV exports are deliberately separate: Regular Attendance exports its check-in record, while Time In / Out exports Morning Time In/Out and Afternoon Time In/Out with a separate status column for each slot. The session export's “Any Attendance Recorded?” column uses Yes/No so it cannot be confused with an individual slot status such as Late; the legacy regular check-in column is explicitly labeled.
- PWA manifest, install support, icons, and service-worker caching.
- No Supabase, cloud database, or cloud sync.

The first visit still needs internet to load the QR scanner library. After it is cached by the browser, the app is designed to remain usable offline.
