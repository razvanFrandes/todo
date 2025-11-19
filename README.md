# Todo App

A professional todo application built with React, TypeScript, and Vite. Features a clean UI with simple CSS (no frameworks), full test coverage, and local storage persistence.

## Features

- Add, complete, and delete todos
- Filter todos by status (All, Active, Completed)
- Real-time statistics (Total, Active, Completed)
- Local storage persistence
- Responsive design
- Full accessibility support
- Comprehensive test coverage

## Project Structure

```
todo/
├── src/
│   ├── components/
│   │   ├── TodoForm/
│   │   │   ├── TodoForm.tsx
│   │   │   ├── TodoForm.css
│   │   │   └── TodoForm.test.tsx
│   │   ├── TodoItem/
│   │   │   ├── TodoItem.tsx
│   │   │   ├── TodoItem.css
│   │   │   └── TodoItem.test.tsx
│   │   ├── TodoList/
│   │   │   ├── TodoList.tsx
│   │   │   ├── TodoList.css
│   │   │   └── TodoList.test.tsx
│   │   ├── TodoFilter/
│   │   │   ├── TodoFilter.tsx
│   │   │   ├── TodoFilter.css
│   │   │   └── TodoFilter.test.tsx
│   │   └── TodoStats/
│   │       ├── TodoStats.tsx
│   │       ├── TodoStats.css
│   │       └── TodoStats.test.tsx
│   ├── types/
│   │   └── todo.types.ts
│   ├── utils/
│   │   ├── todoHelpers.ts
│   │   └── todoHelpers.test.ts
│   ├── tests/
│   │   └── setup.ts
│   ├── App.tsx
│   ├── App.css
│   ├── App.test.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

## Testing

Run all tests:

```bash
npm test
```

Run tests with UI:

```bash
npm run test:ui
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Vitest** - Testing framework
- **Testing Library** - Component testing utilities
- **CSS3** - Styling (no frameworks)

## Architecture

### Components

- **TodoForm**: Input form for adding new todos
- **TodoItem**: Individual todo item with toggle and delete functionality
- **TodoList**: Container for rendering todo items with empty state
- **TodoFilter**: Filter buttons for showing All/Active/Completed todos
- **TodoStats**: Display statistics about todos

### State Management

- React useState for local state management
- useEffect for localStorage sync
- Props drilling for component communication

### Type Safety

- Strong TypeScript types for all components and utilities
- Interfaces for Todo, TodoFilter, and TodoStats
- Type-safe helper functions

### Testing

- Unit tests for all components
- Integration tests for App component
- Utility function tests
- Full accessibility testing with ARIA labels

## License

MIT
