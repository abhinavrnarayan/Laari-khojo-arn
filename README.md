# Laari Khojo Tech Intern — Mini MERN App

A minimal MERN application to manage street vendors.

## Features
- **Add Vendor** (form) — name, contact number, location.
- **List Vendors** — table view; vendors inactive for >3 days are marked **Inactive** (server-computed) and shown in red in UI.
- **Update Last Active** — button to set a vendor’s `lastActive` to **now**.

## Tech
- **Backend**: Node.js, Express, MongoDB (Mongoose), CORS, dotenv
- **Frontend**: React (Vite), Axios

---

## Quick Start

### 1) Backend
```bash
cd server
cp .env.example .env
# open .env and set MONGODB_URI
npm install
npm run dev    # starts on http://localhost:4000
```
**.env**
```
MONGODB_URI=mongodb://127.0.0.1:27017/laari_khojo
PORT=4000
```
> You can use local MongoDB or a free MongoDB Atlas cluster.

### 2) Frontend
```bash
cd client
npm install
npm run dev    # Vite dev server (shown in terminal)
```
The frontend expects backend at `http://localhost:4000`. If you change it, update `client/src/api.js`.

---

## API

- `GET /vendors` → returns all vendors with computed `status: "Active" | "Inactive"`.
- `POST /vendors` → add vendor; body: `{ name, contactNumber, location, lastActive? }`. If `lastActive` omitted, server uses current time.
- `PATCH /vendors/:id/active` → sets `lastActive` to **now** and returns the updated vendor (with computed `status`).

Inactive rule: if `now - lastActive > 3 days`, the vendor is considered **Inactive**.

---

## Debugging Challenge (Extra Task)
Given broken route:
```js
app.get('/vendors', async (req, res) => {
  const vendors = Vendor.find(); // Not returning properly
  res.send(vendors);
});
```
**Why broken?** `Vendor.find()` returns a **Promise**; sending it directly returns before it resolves.

**Fix:**
```js
app.get('/vendors', async (req, res) => {
  const vendors = await Vendor.find();
  res.json(vendors);
});
```
(Alternatively, use `.then()`.)

---

## What I’d Improve with More Time
- **Auth & Roles**: Admin/vendor separation.
- **Geo features**: Save precise coordinates; map view; filter nearby vendors.
- **Heartbeat/Background jobs**: Cron to auto-mark inactive and notify vendors.
- **CI/CD & Testing**: Unit + integration tests; GitHub Actions.
- **UX polish**: Pagination, search, sort; skeleton loaders; empty states.
```

