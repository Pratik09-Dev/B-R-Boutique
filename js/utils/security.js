/**
 * Security, Input Sanitization & Schema Validation Utilities
 * Protects against DOM XSS, invalid input injection, and corrupted localStorage payloads.
 */
'use strict';

window.AppSecurity = (function () {
  const HTML_ENTITIES = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, function (ch) {
      return HTML_ENTITIES[ch];
    });
  }

  function isValidName(val) {
    return /^[\p{L}\p{M}][\p{L}\p{M} .'-]{1,59}$/u.test(String(val || '').trim());
  }

  function isOwnerPhone(val) {
    const digits = String(val || '').replace(/\D/g, '');
    return digits === '9777784991' || (digits.length > 10 && digits.slice(-10) === '9777784991');
  }

  function isValidPhone(val) {
    if (isOwnerPhone(val)) return false;
    const clean = String(val || '').trim().replace(/[\s()-]/g, '');
    const indianMobileOk = /^(?:\+?91|0)?[6-9]\d{9}$/.test(clean);
    const intlPhoneOk = /^(?:\+[1-9]\d{6,14}|00[1-9]\d{6,14})$/.test(clean);
    return indianMobileOk || intlPhoneOk;
  }

  function isValidOptionalEmail(val) {
    const trimmed = String(val || '').trim();
    if (!trimmed) return true;
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed);
  }

  function sanitizePhoneInput(raw) {
    let cleaned = String(raw || '').replace(/[^0-9+\s()-]/g, '');
    let digitsSeen = 0;
    let plusSeen = false;
    return cleaned.split('').filter(function (ch, idx) {
      if (ch === '+') {
        if (idx === 0 && !plusSeen) {
          plusSeen = true;
          return true;
        }
        return false;
      }
      if (/\d/.test(ch)) {
        digitsSeen++;
        return digitsSeen <= 15;
      }
      return /[\s()-]/.test(ch);
    }).join('');
  }

  return {
    escapeHtml: escapeHtml,
    isValidName: isValidName,
    isOwnerPhone: isOwnerPhone,
    isValidPhone: isValidPhone,
    isValidOptionalEmail: isValidOptionalEmail,
    sanitizePhoneInput: sanitizePhoneInput
  };
})();
