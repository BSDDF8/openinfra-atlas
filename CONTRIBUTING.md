# Contributing to OpenInfra Atlas

Thank you for your interest in contributing to **OpenInfra Atlas**! We welcome contributions that improve data integrity, expand geographic coverage, enhance visualizations, and optimize accessibility.

## Code of Conduct

We are committed to providing a welcoming and harassment-free environment for all contributors regardless of background or identity. Please maintain professional, collaborative, and evidence-grounded communication.

## Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/example/openinfra-atlas.git
   cd openinfra-atlas
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```

4. **Verify production compilation:**
   ```bash
   npm run build
   ```

## Contribution Principles

- **Data Integrity Over Hype:** Avoid marketing buzzwords or sensationalist claims. All indicators must carry explicit units, measurement years, and source citations.
- **Maintainable Architecture:** Keep components modular and isolated. Data queries and transformations belong in `src/services/dataService.ts`, not hardcoded inside UI components.
- **Type Safety:** Ensure all newly introduced indicators or data structures conform to the TypeScript definitions in `src/types/energy.ts`.

## Adding a New Country Profile

To add a new country to the platform:

1. Open `src/data/countries.ts` and append a new `Country` object with ISO-3166 codes, region, and grid specifications.
2. In `src/data/energyData.ts`, add the corresponding fuel mix history (2015–2024) to `FUEL_MIX_DATA` and capacity indicators to `CAPACITY_AND_INTENSITY_DATA`.
3. Verify that the sum of fuel inputs equals the `total` generation field.
4. Run `npm run build` to confirm type checking passes.

## Pull Request Guidelines

1. Create a feature branch (`git checkout -b feature/new-country-profile`).
2. Commit your changes with concise, descriptive commit messages.
3. Verify that `npm run build` succeeds without TypeScript or bundling errors.
4. Submit a pull request describing the rationale and data sources used.
