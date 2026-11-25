interface ConfigurationStep {
  title: string;
  fields: readonly string[];
}

export const configurationSteps: readonly ConfigurationStep[] = [
  { title: 'Основные параметры', fields: ['quantity', 'heating', 'volume', 'density'] },
  { title: 'Измерение и контроль', fields: ['max_gas', 'max_gas_1', 'vagometer1', 'vagometer'] },
  { title: 'Комплектация', fields: ['pollution', 'vagometer2', 'closet', 'fittings'] },
];

export const requiredFields = configurationSteps.flatMap((step) => [...step.fields]);

export const nonSeparationValues: Record<string, string> = {
  max_gas: 'Не требуется',
  vagometer: 'Не требуется',
  vagometer2: 'Не требуется',
  vagometer1: 'Многофазный расходомер',
};

export const getIncompleteFields = (selection: Record<string, unknown> = {}, fields: readonly string[] = requiredFields) => {
  const incomplete = fields.filter((field) => {
    const value = selection[field];
    if (field === 'quantity') return !value;
    if (!Array.isArray(value) || value.length === 0) return true;
    return ['heating', 'density', 'volume', 'fittings'].includes(field) && value.length !== 1;
  });
  const nonSep = selection.max_gas_1;
  if (Array.isArray(nonSep) && nonSep.some((value) => value !== 'Не требуется')) {
    for (const [field, expected] of Object.entries(nonSeparationValues)) {
      const value = selection[field];
      if (fields.includes(field) && (!Array.isArray(value) || value.length !== 1 || value[0] !== expected) && !incomplete.includes(field)) {
        incomplete.push(field);
      }
    }
  }
  return incomplete;
};
