(function () {
  const details = document.querySelector('details.profile-details');
  if (!details) return;

  const tablist = details.querySelector('.profile-language-tabs');
  if (!tablist) return;

  const tabs = Array.from(tablist.querySelectorAll('.profile-language-tab'));
  const panels = Array.from(details.querySelectorAll('.profile-language-panel'));
  if (!tabs.length || !panels.length) return;

  function selectTab(tab, focus) {
    const panelId = tab.getAttribute('aria-controls');
    tabs.forEach(function (item) {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(function (panel) {
      panel.hidden = panel.id !== panelId;
    });
    if (focus) tab.focus();
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () { selectTab(tab, false); });
    tab.addEventListener('keydown', function (event) {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      let next;
      switch (event.key) {
        case 'ArrowLeft': next = (index - 1 + tabs.length) % tabs.length; break;
        case 'ArrowRight': next = (index + 1) % tabs.length; break;
        case 'Home': next = 0; break;
        case 'End': next = tabs.length - 1; break;
        default: return;
      }
      event.preventDefault();
      selectTab(tabs[next], true);
    });
  });

  selectTab(tabs.find(function (tab) { return tab.id === 'profile-language-en'; }) || tabs[0], false);
  tablist.hidden = false;
  details.dataset.languageReady = 'true';
})();
