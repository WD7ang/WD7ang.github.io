(function () {
  const section = document.querySelector('.home-experience');
  if (!section) return;

  const tabs = Array.from(section.querySelectorAll('.experience-tab'));
  const panels = Array.from(section.querySelectorAll('.timeline-period[role="tabpanel"]'));
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

  selectTab(tabs.find(function (tab) { return tab.getAttribute('aria-selected') === 'true'; }) || tabs[0], false);
})();
