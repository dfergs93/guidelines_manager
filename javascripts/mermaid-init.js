// Initialize Mermaid with theme that responds to dark mode
document$.subscribe(function() {
  // Detect if dark mode is active
  const isDarkMode = document.querySelector('[data-md-color-scheme="slate"]') !== null;
  
  mermaid.initialize({
    startOnLoad: true,
    theme: isDarkMode ? 'dark' : 'default',
    gantt: {
      barHeight: 40,
      barGap: 10,
      topPadding: 60,
      leftPadding: 100,
      fontSize: 14,
      axisFormat: '%M:%S'
    }
  });
  
  mermaid.contentLoaded();
});

// Re-render Mermaid diagrams when theme changes
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.attributeName === 'data-md-color-scheme') {
      location.reload(); // Simple approach: reload page when theme changes
    }
  });
});

observer.observe(document.querySelector('body'), {
  attributes: true,
  attributeFilter: ['data-md-color-scheme']
});