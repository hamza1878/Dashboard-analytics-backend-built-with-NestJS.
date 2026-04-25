# Moviroo Mobility OS — NestJS Backend API

Backend for the **Moviroo** ride-hailing admin dashboard. Built with NestJS + TypeORM + PostgreSQL.

## Stack
- **NestJS** (modular, decorator-driven)
- **TypeORM** (entities mapped to your existing `Moviroo_DB_V2` schema)
- **PostgreSQL** (port 8001 by default)
- **Swagger** auto-generated at `/docs`
- **class-validator** for DTO validation

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your DB credentials

# 3. Run in development
npm run start:dev

# 4. Build for production
npm run build && npm start
```

## Environment Variables

| Variable     | Default         | Description              |
|-------------|-----------------|--------------------------|
| PORT        | 3000            | HTTP port                |
| DB_HOST     | localhost       | PostgreSQL host          |
| DB_PORT     | 8001            | PostgreSQL port          |
| DB_NAME     | Moviroo_DB_V2   | Database name            |
| DB_USER     | postgres        | DB username              |
| DB_PASSWORD | —               | DB password              |
| NODE_ENV    | development     | Environment              |

## API Endpoints

### Dashboard (powers the UI cards)
| Method | Path                              | Description                                      |
|--------|-----------------------------------|--------------------------------------------------|
| GET    | /api/dashboard/overview           | 4 KPI cards: rides, revenue, tickets, rating     |
| GET    | /api/dashboard/operational        | Avg duration, active drivers, safety, utilization|
| GET    | /api/dashboard/revenue-trend      | Line chart data (default: last 7 days)           |
| GET    | /api/dashboard/support-resolution | Hourly bar chart data for support tickets        |

### Rides
| Method | Path                       | Description                        |
|--------|----------------------------|------------------------------------|
| GET    | /api/rides                 | List with filters & pagination     |
| GET    | /api/rides/stats           | Totals, completion rate, revenue   |
| GET    | /api/rides/revenue-by-day  | Daily revenue trend                |
| GET    | /api/rides/:id             | Single ride with passenger/driver  |
| PATCH  | /api/rides/:id/cancel      | Cancel a ride                      |

### Drivers
| Method | Path                    | Description                    |
|--------|-------------------------|--------------------------------|
| GET    | /api/drivers            | List (filter by status)        |
| GET    | /api/drivers/top        | Top-rated drivers              |
| GET    | /api/drivers/active-count | Count of online drivers      |
| GET    | /api/drivers/:id        | Driver profile                 |
| PATCH  | /api/drivers/:id/status | Update availability status     |

### Vehicles
| Method | Path                    | Description              |
|--------|-------------------------|--------------------------|
| GET    | /api/vehicles           | Fleet list               |
| GET    | /api/vehicles/stats     | Breakdown by status      |
| GET    | /api/vehicles/:id       | Single vehicle           |
| PATCH  | /api/vehicles/:id/approve | Approve vehicle        |
| PATCH  | /api/vehicles/:id/reject  | Reject vehicle         |

### Passengers
| Method | Path                           | Description              |
|--------|--------------------------------|--------------------------|
| GET    | /api/passengers                | List all passengers      |
| GET    | /api/passengers/membership-stats | Tier breakdown         |
| GET    | /api/passengers/:id            | Passenger profile        |

### Support
| Method | Path                              | Description                    |
|--------|-----------------------------------|--------------------------------|
| GET    | /api/support/tickets              | List tickets (filter/category) |
| GET    | /api/support/tickets/stats        | Stats + hourly resolution data |
| GET    | /api/support/tickets/:id          | Ticket with messages           |
| PATCH  | /api/support/tickets/:id/resolve  | Resolve a ticket               |
| POST   | /api/support/tickets/:id/messages | Add message to ticket          |

### Ratings
| Method | Path                      | Description                        |
|--------|---------------------------|------------------------------------|
| GET    | /api/ratings              | All ratings                        |
| GET    | /api/ratings/stats        | Satisfaction rate + distribution   |
| GET    | /api/ratings/ride/:id     | Rating for a specific ride         |

### Dispatch
| Method | Path                          | Description                 |
|--------|-------------------------------|-----------------------------|
| GET    | /api/dispatch/offers          | List offers (filter status) |
| GET    | /api/dispatch/offers/stats    | Offers by status            |
| GET    | /api/dispatch/offers/ride/:id | Offers for a ride           |

### Users
| Method | Path                  | Description       |
|--------|-----------------------|-------------------|
| GET    | /api/users            | List users        |
| GET    | /api/users/:id        | Get user          |
| PATCH  | /api/users/:id/ban    | Ban user          |
| PATCH  | /api/users/:id/unban  | Unban user        |

## Project Structure

```
src/
├── main.ts                  ← Bootstrap + Swagger setup
├── app.module.ts            ← Root module, TypeORM config
└── modules/
    ├── dashboard/           ← All KPI aggregation queries
    ├── rides/               ← Ride lifecycle + revenue stats
    ├── drivers/             ← Driver profiles + availability
    ├── vehicles/            ← Fleet management
    ├── passengers/          ← Passenger profiles + loyalty
    ├── dispatch/            ← Dispatch offers & matching
    ├── support/             ← Tickets + messaging
    ├── ratings/             ← Ride ratings + satisfaction
    └── users/               ← Base user accounts
```

## Swagger

Interactive API docs available at **http://localhost:3000/docs** once the server is running.

> `synchronize: false` — The schema is never auto-migrated. Your existing `Moviroo_DB_V2` tables are used as-is.
