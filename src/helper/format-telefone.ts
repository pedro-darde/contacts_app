export default {
  doFormat(telefone: string) {
    if (telefone) {
      return telefone
        .replace(/\D/g, "")
        .replace(/(^\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4,5})(\d{4}$)/, "$1-$2");
    }
    return "";
  },
};
