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
- Each mode has its own attendance list and searchable roster page; session records show time and status per slot.
- CSV exports include attendance date, local export timestamp, attendance mode, student identity, overall status, and recorded check-in/session times. Session exports include a separate status column for each of the four time slots.
- PWA manifest, install support, icons, and service-worker caching.
- No Supabase, cloud database, or cloud sync.

The first visit still needs internet to load the QR scanner library. After it is cached by the browser, the app is designed to remain usable offline.
