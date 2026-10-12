# Sheher Bano - Portfolio (React + TypeScript + Vite)

## Run
    npm install
    npm run dev        # opens at http://localhost:5173
    npm run build      # creates the dist/ folder to host

## Update content
Everything you edit is in `src/data.ts`.
- New project: copy an object in `PROJECTS`, change the fields, set `cat` to "ds", "ml", "ai" or "genai".
- Screenshots: put images in `public/images/` and use `shots: ["images/name.png"]`.
- CV: put your file in `public/` as `cv.pdf`.
- Text in [square brackets] shows as a yellow to-do. Remove the brackets when done.
- Remove the yellow note at the top by deleting the `.note` div in `src/App.tsx`.

## Host (free)
Netlify: drag the `dist/` folder onto netlify.com/drop. GitHub Pages: push `dist/` or use the gh-pages package.
