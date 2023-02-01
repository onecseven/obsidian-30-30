export function seconds_to_mmss(num: number) {
  return new Date(num * 1000).toISOString().substr(14, 5);
}

