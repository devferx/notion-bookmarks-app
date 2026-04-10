# Notion Bookmarks App

A bookmark manager built with Next.js and backed by a Notion database. The app lets you save links, organize them with tags, pin important items, and track visits from a responsive interface.

This project started from the Frontend Mentor bookmark manager challenge, but the current implementation is adapted to use Notion as the data source instead of a local mock dataset.

## Table of contents

- [Notion Bookmarks App](#notion-bookmarks-app)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Current features](#current-features)
  - [Tech stack](#tech-stack)
  - [Getting started](#getting-started)
    - [1. Install dependencies](#1-install-dependencies)
    - [2. Create environment variables](#2-create-environment-variables)
    - [3. Run the development server](#3-run-the-development-server)
  - [Notion database requirements](#notion-database-requirements)
  - [Available scripts](#available-scripts)
  - [Current limitations](#current-limitations)

## Overview

The application reads and writes bookmarks directly to a Notion database through the Notion API. Bookmarks are displayed in a card-based layout with tag filtering, optimistic pinning, visit tracking, and quick actions for opening or copying links.

## Screenshot

![Notion Bookmarks App screenshot](https://i.ibb.co/23yRbz8Z/image.png)

## Current features

- View bookmarks from a Notion database
- Add bookmarks with title, description, website URL, and tags
- Filter bookmarks by one or multiple tags
- Pin and unpin bookmarks
- Open bookmarked links in a new tab
- Track visit count and last visited date when a link is opened
- Copy bookmark URLs to the clipboard
- Show favicon, domain, tags, creation date, and usage metadata for each bookmark
- Use a responsive sidebar layout with a mobile menu
- Display loading skeletons while bookmark data is being fetched
- Browse archived bookmarks on a dedicated page

## Tech stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Redux Toolkit and React Redux
- React Hook Form with Zod validation
- Notion API via `@notionhq/client`
- Sonner for toast notifications

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment variables

Create a `.env.local` file in the project root with:

```bash
NOTION_API_KEY=your_notion_integration_secret
NOTION_DATABASE_ID=your_notion_database_id
```

Important:

- `NOTION_DATABASE_ID` must be the database ID from the Notion URL path, not the `v=` view identifier.
- The Notion database must be shared with the integration used by `NOTION_API_KEY`.

### 3. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Notion database requirements

The app expects the connected Notion database to contain these properties:

| Property      | Type         |
| ------------- | ------------ |
| `Title`       | Title        |
| `URL`         | URL          |
| `Description` | Rich text    |
| `Tags`        | Multi-select |
| `Pinned`      | Checkbox     |
| `Archived`    | Checkbox     |
| `VisitCount`  | Number       |
| `LastVisited` | Date         |
| `CreatedTime` | Created time |

Behavior notes:

- Archived entries are excluded from tag counts.
- Bookmarks are sorted with pinned items first, then by creation date.
- Favicons are derived from each bookmark URL at render time.

## Available scripts

- `npm run dev` starts the development server
- `npm run build` creates a production build
- `npm run start` runs the production server
- `npm run lint` runs ESLint
- `npm run format` formats the codebase with Prettier
- `npm run format:check` checks formatting without writing changes

## Current limitations

The codebase already includes some UI affordances that are not fully wired yet:

- The search input is present in the header, but bookmark searching by title is not connected to the data query yet.
- Dark mode styles exist in the UI, but a theme toggle is not currently implemented.
