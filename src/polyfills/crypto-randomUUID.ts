if (typeof crypto !== 'undefined' && typeof crypto.randomUUID !== 'function') {
  // @ts-expect-error: we're polyfilling an internal function
  crypto.randomUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
}

