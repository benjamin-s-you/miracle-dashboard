# Miracle Dashboard

A pharmaceutical clinical trials analytics dashboard built with React, TypeScript, and Material-UI.

## Features

- **Clinical Trials Analytics**: View comprehensive charts and visualizations of clinical trial data
- **Customizable Dashboards**: Create and customize your own dashboard layouts
- **Font Size Toggle**: Adjustable font sizes for accessibility
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **React 19** with TypeScript
- **Material-UI v7** for components and theming
- **Recharts** for data visualization
- **React Router** for navigation
- **Zustand** for state management
- **PapaParse** for CSV parsing

## Code Quality & Formatting

This project uses Prettier and ESLint for consistent code formatting and quality:

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run format` - Formats all code with Prettier
- `npm run format:check` - Checks if code is formatted correctly
- `npm run lint` - Runs ESLint to check for code quality issues
- `npm run lint:fix` - Automatically fixes ESLint issues where possible

### VS Code Setup

The project includes VS Code settings that enable:

- Format on save with Prettier
- Auto-fix ESLint issues on save
- Consistent tab size and spacing

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the app

## AI Used

- ChatGPT
- Claude

## Architect Decisions

- Using **Component Library (MUI)** over Tailwind
  - Component Library are amazing when creating MVPs, especially that you don't have to reinvent components since they are out of the box. The components are focused on reusability and consistency. For Tailwind, the package helps with styling components fast and creates standardization when creating styles for components, but the developer will have to handle both styling and component behaviour, which would take a lot of time and resources. If there was an option to use Tailwind AND a Component Library, it's possible using Radix. Radix has component functionality is out of the box with minimal styling. It also supports easy integration with TailwindCSS for more custom styling.
- Using **Zustand** for global state
  - It's lightweight and good for MVPs compared to implementing Redux (requires more setup). It also handles re-render computations well and has persist functionality built-in.
- Using **Rechart** for rendering charts
  - Popular package on npmjs.org and well defined documentations. Also works well with React.
- Using **PapaParse** for parsing CSV
  - Lightweight package for CSV rather than building custom functionality

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── charts/         # Chart visualization components
│   │   ├── AgeGroupsChart.tsx
│   │   ├── CompletionYearChart.tsx
│   │   ├── ConditionsChart.tsx
│   │   ├── GenderChart.tsx
│   │   ├── SponsorsChart.tsx
│   │   ├── StartYearChart.tsx
│   │   ├── StudyStatusChart.tsx
│   │   └── TotalTrialsChart.tsx
│   ├── ChartRenderer.tsx    # Dynamic chart rendering component
│   ├── FiltersPanel.tsx     # Filter controls and search
│   ├── FontSizeToggle.tsx   # Font size adjustment widget
│   ├── SidebarLayout.tsx    # Main application layout
│   └── TopBar.tsx          # Application header
├── data/               # Data processing and utilities
│   └── utils/
│       └── dataUtils.ts    # Data normalization and processing
├── pages/              # Main application pages
│   ├── ChartsPage.tsx      # Charts overview page
│   ├── DashboardPage.tsx   # Custom dashboard layouts
│   └── HomePage.tsx        # Welcome page
├── stores/             # State management (Zustand)
│   ├── dashboardStore.ts   # Dashboard layouts and charts
│   ├── dataStore.ts        # Clinical trials data
│   ├── filterStore.ts      # Filter state and logic
│   └── fontSizeStore.ts    # Font size preferences
├── types/              # TypeScript type definitions
└── utils/              # General utility functions
```

### Components

The `components/` folder contains all reusable UI components:

- **`charts/`** - Individual chart components for data visualization
  - Each chart is a self-contained component with its own data processing
  - Uses Recharts library for consistent visualization
  - Supports responsive design and accessibility features

- **`ChartRenderer.tsx`** - Dynamic component that renders charts based on configuration
- **`FiltersPanel.tsx`** - Filter controls for data source, conditions, and date ranges
- **`FontSizeToggle.tsx`** - Accessibility widget for font size adjustment
- **`SidebarLayout.tsx`** - Main application layout with navigation sidebar
- **`TopBar.tsx`** - Application header with branding and controls

### Data

The `data/` folder handles all data processing and utilities:

- **`utils/dataUtils.ts`** - Core data processing functions
  - CSV parsing and normalization
  - Data source integration (ClinicalTrials.gov & EudraCT)
  - Field mapping and data cleaning
  - Statistical calculations for charts

### Pages

The `pages/` folder contains the main application views:

- **`HomePage.tsx`** - Welcome page with project overview
- **`ChartsPage.tsx`** - Grid view of all available charts
- **`DashboardPage.tsx`** - Custom dashboard layouts with chart management

### Stores

The `stores/` folder contains Zustand state management:

- **`dashboardStore.ts`** - Dashboard layouts, chart configurations, and layout management
- **`dataStore.ts`** - Clinical trials data, filtering, and data loading
- **`filterStore.ts`** - Filter state (data source, conditions, date ranges)
- **`fontSizeStore.ts`** - Font size preferences and accessibility settings

## Data Sources

This dashboard uses clinical trials data from:

- **ClinicalTrials.gov** (US trials)
- **EudraCT** (EU trials)

CSV files are located in `/public/data`. Data is normalized for consistent visualization across both sources.

## Assumptions

While implementing the project, the following assumptions were made:

- **Data Normalization**: The US (ClinicalTrials.gov) and EU (EudraCT) datasets have inconsistent schemas. To address this, normalization helper functions were implemented in `dataUtil.ts` (`/data/utils`) to standardize fields and clean values before visualization.
- **Filter Criteria**: The filters work based on the normalized `TrialData` interface:
  - **Region**: Based on a `source` tag (US or EU) assigned during data processing.
  - **Search Conditions**: Mapped from the `Conditions` column (US) and `Medical_Condition` column (EU).
  - **Date Range**: Filters on the `Start Date` field (other date fields exist but are noted in the UI).

## Feature Completion

Below is a checklist of all user stories from the assignment. ✅ = Completed, ❌ = Not yet implemented.

### Part 1: Project Setup

- [✅] As a user, I want to see a home page that welcomes me to Miracle.
- [✅] As a user, I want to be able to toggle the font sizes on the application using a widget
- [✅] As a user, I want to be able to navigate through the application using a lefthand side bar menu.

### Part 2: Charts

- [✅] As a user, I want to be able to go to the Charts page through the menu.
- [✅] As a user, I want to be able to see the different charts that are generated by Miracle in a grid/list format using data from ClinicalTrials and EudraCT.

### Part 3: Custom Dashboard Layouts

- [✅] As a user, I want to be able to go to the default layout under Dashboards through the menu.
- [✅] As an application, I want to make sure that the default layout under Dashboards can not be edited
- [✅] As a user, I want to be able to create a new dashboard from the leftside panel.
- [✅] As an application, I want to make sure that when a user creates a new dashboard, it prepopulates using the default dashboard charts.
- [✅] As a user, I want to be able to see my newly created dashboard under the Dashboard section from the leftside panel
- [❌] As a user, I want to be able to add a new chart to my dashboards.
  - **Next Step**: Create button to allow users to add a new chart to the dashboard. This button can be associated with a dropdown menu allowing a user to select what chart they would like to add. Also an easy MVP, the new chart can be append to the end of the grid/ list.
- [✅] As a user, I want to be able to delete a chart from my dashboards.
- [❌] As a user, I want to be able reorder my charts in my dashboards.
  - **Next Step**: This would require a drag-n-drop layout such as (react-grid-layout or dnd-kit) to be implemented in the DashboardPage.tsx. Currently the page is being rendered with a grid, which will require some refactoring if using one of those packages
- [❌] As a user, I want my dashboards to persist after refresh, leaving the browser, etc.
  - **Next Step**:
    - Currently the global state is being managed by Zustand(https://zustand.docs.pmnd.rs/getting-started/introduction). Zustand does have a built-in persist(https://zustand.docs.pmnd.rs/integrations/persisting-store-data) feature that allows developers to storage state objects into storage (localStorage) and retrieve as well.
    - Refactor the zustand global states in **/stores** to use persist.
    - When using the dashboard, check if browser storage has global state objects. If they do, receive data from storage and populate global state objects. If not, use default global state object.
    - When making any changes to filters, dashboards, etc., make sure that it updates both the global state and browser storage. Persist should handle syncing the global state to browser storage, but make sure to test all features.

### Part 4: Persistent Filters & Search

- [✅] As a user, I want to be able to filter based on specific criteria on my dashboard.
- [✅] As a user, I want to see my charts change after I apply filters.
- [✅] As a user, I want the filters to persist when I changed through my dashboards.
- [❌] As a user, I want the filters to persist after refresh, leaving the browser, etc.
  - **Next Step**: Reference **As a user, I want my dashboards to persist after refresh, leaving the browser, etc.** feature story

### Bonus Features

- [✅] As a user, I want to be able to reset my filters using a button.

### What can be improved

- Store types in **/types**
- Some helper methods can be put in **/utils**
- Support redirect if URL is not valid or better warning message.
- Implement unit testing and E2E testing
- Better linting/ prettier rules (have imports and parameters in alphabetical order)
- Standardizing and sanitizing data entries in **dataUtils.ts** can be better.
- Don't have the application process the csvs on load. Could implement a utils method to create a **processed** folder with clean data sets.
