// ============================================
//  Form Validation Helpers
//  Used by Person 2 (auth forms) and Person 3 (checkout, contact)
// ============================================

export const isValidEmail   = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const isValidPhone   = v => /^[\d\s\-\+\(\)]{7,15}$/.test(v);
export const isStrongPass   = v => v.length >= 8 && /[A-Z]/.test(v) && /[0-9]/.test(v);
export const isRequired     = v => v.trim().length > 0;
export const isMinLength    = (v, n) => v.trim().length >= n;
