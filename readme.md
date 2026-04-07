# Artifacts Recordings

Post-production studio website — [artifactsrecordings.com](https://artifactsrecordings.com)

## Stack

- Jekyll (static site generator)
- Hosted on GitHub Pages

## Local development

Make sure Ruby and Bundler are installed, then run:

    bundle install

Start the local server with live reload:

    bundle exec jekyll clean
    bundle exec jekyll serve --livereload --force_polling

Open [http://localhost:4000](http://localhost:4000) in your browser.

## Project structure

    _layouts/       # Page templates
    _includes/      # Reusable components (header, footer, etc.)
    assets/         # Images, fonts, icons
    styles/         # CSS files
    scripts/        # JavaScript files
    data/           # JSON data
