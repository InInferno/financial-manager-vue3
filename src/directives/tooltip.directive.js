import M from 'materialize-css';

export default {
  mounted(el, {value}) {
    M.Tooltip.init(el, {html: value});
  },
  destroy(el) {
    const tooltip = M.Tooltip.getInstance(el);

    if (tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  }
};
