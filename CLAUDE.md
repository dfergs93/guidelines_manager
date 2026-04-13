# Guidelines Manager Platform

A MkDocs (Material theme) static site serving Imaging guidelines documentation with guidelines calculators, available via GitHub Pages at https://dfergs93.github.io/guidelines_manager/

Each guideline references an original paper, produces a JS calculator if applicable, and has a summary of the guideline.

Previously, a backend server was being used to generate a chatbot for the site, but this has been removed and is out of scope for this project. Now a sitemap.json is generated for use by an external agent to provide external reference to the guidelines. There are multiple clinical guidlines in clinical_guidelines_database/ which needs to be culled to the most important ones.
