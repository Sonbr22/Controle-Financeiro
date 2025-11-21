const container = document.querySelector('main'); 
const allViews = () => Array.from(container.querySelectorAll('[data-view]'));

function showView(name) {
  const current = container.querySelector('.view.is-active');
  const next = container.querySelector(`[data-view="${name}"]`);

  if (!next) return console.warn(`View "${name}" não encontrada`);

  if (current === next) return;

  if (current) current.classList.remove('is-active');

  void next.offsetHeight;

  next.classList.add('is-active');

  const focusable = next.querySelector('button, a, input, [tabindex]:not([tabindex="-1"])');
  if (focusable) focusable.focus();
}

document.addEventListener('click', (ev) => {
  const btn = ev.target.closest('button[data-target]');
  if (!btn) return;
  const target = btn.dataset.target;
  showView(target);
  history.replaceState(null, '', `#${target}`);
});

window.addEventListener('load', () => {
  const hash = location.hash.replace('#', '');
  if (hash && container.querySelector(`[data-view="${hash}"]`)) {
    showView(hash);
  } else {
    const initial = container.querySelector('[data-view].is-active') || container.querySelector('[data-view]');
    if (initial) showView(initial.dataset.view);
  }
});

const menuViewContainer = document.querySelector('[data-view="menu"]');
const menuSelect = document.querySelector('select[name="select_menu"]');
const openFormButton = document.querySelector('.mais_extra');

function showMenuView(name) {
  const current = menuViewContainer.querySelector('.menu-view.is-active');
  const next = menuViewContainer.querySelector(`[data-menu-view="${name}"]`);

  if (current) current.classList.remove('is-active');
  if (next) {
    next.classList.add('is-active');
    // Mostra ou esconde o botão '+'
    if (name === 'extras') {
      openFormButton.style.display = 'block';
    } else {
      openFormButton.style.display = 'none';
    }
  }
}

menuSelect.addEventListener('change', (ev) => {
  const selectedValue = ev.target.value;
  showMenuView(selectedValue);
});

function hideThenShow(current, next) {
  if (!current) {
    next.classList.add('is-active');
    return;
  }

  const onEnd = (e) => {
    if (e.target !== current) return;
    current.removeEventListener('transitionend', onEnd);
    next.classList.add('is-active');
  };

  current.addEventListener('transitionend', onEnd);
  current.classList.remove('is-active');
}
allViews().forEach(v => v.setAttribute('aria-hidden', v.classList.contains('is-active') ? 'false' : 'true'));

document.addEventListener('DOMContentLoaded', () => {
  const formSection = document.querySelector('.form_Extra');
  const closeFormButton = document.querySelector('.close_form');

 
  if (formSection) {
    formSection.classList.add('form-is-hidden');
  }

  // Esconde o botão '+' inicialmente, pois a view padrão não é 'extras'
  openFormButton.style.display = 'none';

  if (openFormButton && formSection) {
    openFormButton.addEventListener('click', () => {
      formSection.classList.remove('form-is-hidden');
      formSection.classList.add('is-active');
      openFormButton.style.display = 'none'; // Esconde o botão '+' ao abrir o form
    });
  }

  if (closeFormButton && formSection) {
    closeFormButton.addEventListener('click', () => {
      formSection.classList.remove('is-active');
      formSection.classList.add('form-is-hidden');
      openFormButton.style.display = 'block'; // Reexibe o botão '+' ao fechar o form
    });
  }
});
