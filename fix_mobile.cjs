const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Header: Show language switcher on mobile, hide Book Now on mobile
html = html.replace(
  '<nav class="hidden md:flex gap-4 text-sm uppercase tracking-widest text-platinum-white">',
  '<nav class="flex gap-4 text-sm uppercase tracking-widest text-platinum-white">'
);
html = html.replace(
  '<button class="crm-trigger border border-matte-gold text-matte-gold px-6 py-2 uppercase tracking-wider text-sm hover:bg-matte-gold hover:text-dark-platinum transition-colors duration-300" data-i18n="nav_book_now">',
  '<button class="hidden md:block crm-trigger border border-matte-gold text-matte-gold px-6 py-2 uppercase tracking-wider text-sm hover:bg-matte-gold hover:text-dark-platinum transition-colors duration-300" data-i18n="nav_book_now">'
);

// 2. Menu: Fix mobile alignment (make row into column, then row for price/btn)
html = html.replace(
  /class="py-4 border-b border-white\/10 flex justify-between items-center group cursor-pointer crm-trigger"/g,
  'class="py-4 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 group cursor-pointer crm-trigger"'
);
html = html.replace(
  /<div class="flex items-center gap-4">/g,
  '<div class="flex items-center justify-between w-full md:w-auto md:justify-end gap-4">'
);

// 3. Footer: Align Googoosh to the left (same as icons), keep the rest centered on mobile
html = html.replace(
  'class="flex-1 space-y-6 flex flex-col items-center md:items-start text-left"',
  'class="flex-1 space-y-6 flex flex-col items-start text-left"'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Modifications applied successfully!');
