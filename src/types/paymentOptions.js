const paymentOptionsRaw = {
  tunai: {
    label: "Tunai",
    value: "tunai",
  },
  kantongSemar: {
    label: "Kantong Semar",
    value: "kantongsemar",
  },
  BCA: {
    label: "Bank BCA",
    value: "bca",
  },
  BNI: {
    label: "Bank BNI",
    value: "bni",
  },
}

const paymentOptions = Object.values(paymentOptionsRaw)

export { paymentOptionsRaw, paymentOptions }
