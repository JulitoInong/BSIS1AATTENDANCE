# BSIS 1-A Attendance — Professional PWA (Local-First)

- 46-student final roster for BSIS 1-A.
- Automatic date based on the phone/device local date.
- Automatic day rollover every 30 seconds and when the app regains focus.
- QR scanning with automatic rear-camera preference, camera start/stop, and manual entry.
- Duplicate prevention within the same day.
- Professional mobile-first UI with summary cards.
- Attendance page lists only students marked present; the separate roster page lists all students with search, status filters, and student details.
- Local CSV export.
- PWA manifest, install support, icons, and service-worker caching.
- No Supabase, cloud database, or cloud sync.

The first visit still needs internet to load the QR scanner library. After it is cached by the browser, the app is designed to remain usable offline.
