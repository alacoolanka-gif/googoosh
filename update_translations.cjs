const fs = require('fs');

['en','ru','tj'].forEach(lang => {
  const data = JSON.parse(fs.readFileSync(`public/locales/${lang}.json`));
  
  if (lang === 'en') {
    data.menu_button_full = "View Full Menu";
    data.footer_created = "Created by";
  } else if (lang === 'ru') {
    data.menu_button_full = "Смотреть полное меню";
    data.footer_created = "Создано";
  } else if (lang === 'tj') {
    data.menu_button_full = "Дидани менюи пурра";
    data.footer_created = "Таҳияи";
  }
  
  fs.writeFileSync(`public/locales/${lang}.json`, JSON.stringify(data, null, 2));
});

console.log("Translations updated!");
