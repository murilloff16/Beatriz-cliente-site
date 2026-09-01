(function () {
  'use strict';

  /* ---------- Ano no rodapé ---------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- Header encolhe no scroll ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('shrink', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Menu mobile (hambúrguer acessível) ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      if (open) {
        var first = nav.querySelector('a');
        if (first) first.focus();
      }
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') &&
          !nav.contains(e.target) && !toggle.contains(e.target)) {
        setOpen(false);
      }
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    var panel = btn.parentElement.nextElementSibling;
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      panel.style.maxHeight = open ? null : panel.scrollHeight + 'px';
    });
  });

  /* ---------- Tracking: clique em WhatsApp ---------- */
  // Fallback silencioso se dataLayer não existir (GA4/GTM ainda não instalado).
  window.dataLayer = window.dataLayer || [];
  document.querySelectorAll('.wpp-link').forEach(function (el) {
    el.addEventListener('click', function () {
      try {
        window.dataLayer.push({
          event: 'whatsapp_click',
          origem: el.getAttribute('data-origem') || 'desconhecida'
        });
      } catch (err) { /* silencioso */ }
    });
  });

  /* ---------- Formulário de lead ---------- */
  var form = document.getElementById('leadForm');
  if (form) {
    var status = document.getElementById('formStatus');
    var material = document.getElementById('formMaterial');

    var showError = function (id, show) {
      var msg = document.getElementById('err-' + id);
      var input = document.getElementById('lf-' + id);
      if (msg) msg.hidden = !show;
      if (input) {
        if (show) { input.setAttribute('aria-invalid', 'true'); }
        else { input.removeAttribute('aria-invalid'); }
      }
      return !show;
    };

    var validate = function () {
      var nome = form.nome.value.trim();
      var fone = form.telefone.value.replace(/\D/g, '');
      var tipo = form.necessidade.value;
      var ok = true;
      ok = showError('nome', nome.length < 2) && ok;
      ok = showError('fone', fone.length < 10) && ok;
      ok = showError('tipo', tipo === '') && ok;
      return ok;
    };

    ['nome', 'fone', 'tipo'].forEach(function (id) {
      var input = document.getElementById('lf-' + id);
      if (input) input.addEventListener('input', function () { validate(); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form._honey && form._honey.value) return; // honeypot
      if (!validate()) {
        status.textContent = 'Confira os campos destacados.';
        status.className = 'form-status fail';
        var firstErr = form.querySelector('[aria-invalid="true"]');
        if (firstErr) firstErr.focus();
        return;
      }

      status.textContent = 'Enviando…';
      status.className = 'form-status';

      var done = function (sucesso) {
        if (sucesso) {
          status.textContent = 'Contato enviado! Retorno assim que possível.';
          status.className = 'form-status ok';
        } else {
          status.textContent = 'Não consegui enviar agora. Fale comigo pelo WhatsApp (11) 4452-2000.';
          status.className = 'form-status fail';
        }
        if (material) material.hidden = false; // libera o material rico
      };

      // Envio sem backend próprio via endpoint AJAX do formsubmit.co.
      // Ao publicar: confirme a ativação do e-mail no formsubmit.co (primeiro envio pede confirmação).
      if (window.fetch) {
        fetch('https://formsubmit.co/ajax/beatrizcamillo@creci.org.br', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            nome: form.nome.value.trim(),
            telefone: form.telefone.value.trim(),
            necessidade: form.necessidade.value,
            mensagem: form.mensagem.value.trim()
          })
        }).then(function (r) { done(r.ok); }).catch(function () { done(false); });
      } else {
        form.submit();
      }
    });
  }

  /* ---------- Fade-in das seções ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }
})();
