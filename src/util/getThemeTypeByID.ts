export default function getThemeTypeByID(id: string) {
  switch (id) {
    case '0': {
      return 'OP'
    }
    case '1': {
      return 'ED'
    }
  }
}
